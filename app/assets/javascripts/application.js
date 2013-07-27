// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui-1.10.3.custom.min
//= require bootstrap
//= require_tree .

// handle jQuery plugin naming conflict between jQuery UI and Bootstrap
/*
$.widget.bridge('uibutton', $.ui.button);
$.widget.bridge('uitooltip', $.ui.tooltip);
*/

function initialize(day) {
  // Enable the visual refresh

  google.maps.visualRefresh = true;
  if(typeof(day)==='undefined') day = 19;
  europe = new google.maps.LatLng(44.902578,12.788086);
  var mapOptions = {
    center: europe,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.TERRAIN

  }
  window.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  var infowindow = new google.maps.InfoWindow();
  var tweets = $('.tweet');

  drawMarkers(tweets, infowindow);
}

markers = [];
function drawMarkers(tweets, infowindow) {
  for(var i = 0; i < tweets.size(); i++) {
    var this_tweet = $(tweets[i]);
    createMarker(map, this_tweet.data('lat'), this_tweet.data('lon'), this_tweet.attr('id'), infowindow, i);
  }

  function createMarker(map, lat, lon, id, infowindow, order) {
    var tweet = $('#' + id);
    var tweet_content =$('#' + id + ' .info-content');
    //order = order <= 3 ? order : 3;
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat,lon),
      map: map,
      icon: '../assets/tweet-marker.png',
      /*icon: '../assets/red-dot-' + order + 'stop.png',*/
      title:tweet.data('date')

    });
    markers.push(marker);

    google.maps.event.addListener(marker, "click", function() {
      openInfo(tweet, marker)
    });

    tweet.bind('click', function() {
      if ($(this).parent().parent().hasClass('click')) {
        openInfo(tweet, marker);
      }
    });

    function openInfo(tweet, marker) {
      infowindow.setContent('<div id="content">' + tweet_content.html() + '</div>');
      infowindow.open(map, marker);
      $('.tweet').removeClass('active');
      tweet.addClass('active');
      map.setZoom(14);
      map.setCenter(new google.maps.LatLng(tweet.data('lat'), tweet.data('lon')));
    }
    return marker;
  }
}


function clearMarkers() {
  for(var i=0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  markers = [];
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyCOAuh5WPMYEkwzXuQgjiZSftXdlikPfBc&sensor=false&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;


$(function() {
  $( "#tweets, #route-menu" ).draggable({
    distance: 20,
    snap: ".snap",
    start: function(event, ui) {
      $(this).removeClass('click');
    }
  });

  $( "#menu" ).draggable({
    distance: 20,
    axis: "x",
    start: function(event, ui) {
      $(this).removeClass('click');
    }
  });

  var modal = $('#infoModal');
  if ($('body').data('newvisit')) {
    modal.modal('show');
  } else {
    modal.css('display', 'none');
  }
  modal.on('hidden', function() {
    modal.css('display', 'none')
  });
  modal.on('show', function() {
    modal.css('display', 'block')
  });

  afterLoad();
  setTimeout(function() { checkRefresh(30000); }, 30000);

  $('a.country-filter, a.hashtag, img.weather', '#tweets').tooltip()
});

function refreshContent() {
  initialize();
  afterLoad();
}

function afterLoad() {
  $('.media img').click(function() {
    $(this).toggleClass('large');
  });

  $('#dismiss').click(function(e) {
    e.preventDefault();
    $('#blurb').css('display', 'none')
  });

  $('#refresh').click(function() {
    $(this).addClass('disabled');
  })
}

function checkRefresh(timeout) {
  var data_url = $('#tweets').data('url');
  var url = data_url ? data_url : '/';
  $.ajax({
    url: url,
    cache: false,
    dataType: 'json'
  }) .done(function( tweets ) {
        if (tweets[0]['tweet_id_str'] != $($('.tweet', '#tweets')[0]).attr('id')) {
          $('#refresh').trigger('click');
        }
      });
  setTimeout(function() { checkRefresh(timeout); }, timeout)
}

$(function() {
  var day = 19;
  $('#route-menu li').click(function() {
    var parent = $(this).parent().parent().parent();
    if (parent.hasClass('click')) {
      $('ul li', '#route-menu').removeClass('active');
      $('ul div', '#route-menu').removeClass('in').css('height', '0');
      var day = $(this).data('day');
      $('ul li', '#route-menu').removeClass('active');
      $(this).addClass('active');
      plotCurrentRoute(day);
      var day_midpoint = Math.round(routeNodes[day].length / 2)
      day_midpoint = day_midpoint > 0 ? day_midpoint : 1;
      map.setCenter(routeNodes[day][day_midpoint]);
      map.setZoom(8);
      if (day == $('#route-menu').data('startoffset')) {
        $('#reset-route').addClass('btn-info')
      } else {
        $('#reset-route').removeClass('btn-info')
      }
    }
  });

  $('#reset-route').click(function() {
    var parent = $(this).parent().parent().parent();
    if (parent.hasClass('click')) {
      /* $('ul li', '#route-menu').removeClass('active');
       $('ul div', '#route-menu').removeClass('in').css('height', '0');

       clearAB(1, totalDays);
       drawAB(1, totalDays);
       clearDayMarkers();*/
      activateCurrentDay()
    }
  });


  $('.toggle input', '#menu').click(function() {
    var target = $($(this).data('target'));
    target.toggleClass('closed');
    if ($(this).data('target') == '#tweets') {
      var heading = $('.heading-wrapper', '#tweets');
      if (target.hasClass('closed')) {
        setTimeout(function() { heading.toggleClass('closed'); }, 200);
      } else {
        heading.toggleClass('closed');
      }
    }
  })

  $('#tweets *, #route-menu *').mouseup(function() {
    if ($(this).parents().is("#route-menu")) {
      setTimeout(function() { $('#route-menu').addClass('click') },100); }
    if ($(this).parents().is("#tweets")) {
      setTimeout(function() { $('#tweets').addClass('click') },100); }
  })

  var filter_button = $('#filter-button');
  $('a:not(#filter-button)', '#filter-button-wrapper').click(function() {
    if (filter_button.parent().hasClass('open')) { filter_button.dropdown('toggle')}
  })
});

