totalDays = 23;
routeNodes = [];

$(function() {
  setTimeout(function() { initRouteNodes(); }, 300);
  for (var i = 1; i <= totalDays; i++) {
    var rest_day_class = invRoute[i][0][1] ? '' : 'class="rest-day" ';
    var day_string = '<li data-day=' + i + ' data-toggle="collapse" ' + rest_day_class + 'data-target="#day' + i + '">Day ' + i + ': ' + invRoute[i][0][0] + '</li>'
    if (invRoute[i][0][1]) {
      day_string = day_string + '<div id="day' + i + '" class="collapse">Distance: ' + invRoute[i][0][1] + 'km</div>'
    }
    $('ul', '#route-menu').append(day_string);
  }
});

function initRouteNodes() {
  try {
    for(var i=1; i <= totalDays; i++) {
      routeNodes[i] = [];
      for(var j=1; j < invRoute[i][1].length; j++) {
        routeNodes[i].push(new google.maps.LatLng(invRoute[i][1][j][1], invRoute[i][1][j][0]))
      }
    }
    isolateAB(1, totalDays);
    activateCurrentDay();
  }
  catch(err) { console.log(err); setTimeout(function() {initRouteNodes(); }, 300) }
}

function activateCurrentDay() {
  var distance_from_start = $('#route-menu').data('startoffset');
  if (distance_from_start >= 0) {
    var current_day = $('li[data-day="' + distance_from_start + '"]');
    current_day.trigger('click');
    var pos = current_day.offset().top - 140;
    $('#day-wrapper').animate({
      scrollTop: pos
    }, 1000, 'easeInOutCubic');
  }
}

function plotCurrentRoute(day) {
  clearAB(1, totalDays);
  if (day > 1) { drawAB(1, day-1, 0.7); }
  drawDayLine(day, 1, '#2980B9');
  clearDayMarkers();
  plotDayMarkers(day);
  if (day < totalDays) { drawAB(day + 1, totalDays, 0.7); }
}

// Core functions
dayMarkers = [];
function plotDayMarkers(day) {
  dayMarkers[day] = [];
  dayMarkers[day].push(new google.maps.Marker({
    position: routeNodes[day][0],
    map: window.map,
    icon: '../assets/map-marker.png'
  }));

  dayMarkers[day].push(new google.maps.Marker({
    position: routeNodes[day][routeNodes[day].length - 1],
    map: window.map,
    icon: '../assets/map-marker.png'
  }));
}

function clearDayMarkers() {
  for (var i = 1; i <= totalDays; i++) {
    if (dayMarkers[i]) {
      dayMarkers[i][0].setMap(null);
      dayMarkers[i][1].setMap(null);
    }
  }
}
function isolateAB(a, b, opacity) {
  if(typeof(opacity)==='undefined') opacity = 1;
  clearAB(1, a-1);
  drawAB(a, b, opacity);
  clearAB(b+1, totalDays);
}

function drawAB(a, b, opacity) {
  if(typeof(opacity)==='undefined') opacity = 1;
  for(var i = a; i <= b; i++) {
    drawDayLine(i, opacity);
  }
}

function clearAB(a, b) {
  for(var i = a; i <= b; i++) {
    clearDayLine(i);
  }
}

function clearDayLine(day) {
  routePath[day].setMap(null);
}


routePath = []; //Set globally
function drawDayLine(day, opacity, color) {
  if(typeof(color)==='undefined') color = '#3498DB';
  if(typeof(opacity)==='undefined') opacity = 1.0;
  routePath[day] = new google.maps.Polyline({
    path: routeNodes[day],
    strokeColor: color,
    strokeOpacity: opacity,
    strokeWeight: 4
  });

  routePath[day].setMap(map);
}
