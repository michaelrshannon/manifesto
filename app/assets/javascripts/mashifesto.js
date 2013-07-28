//= require TweenMax.min
//= require ICanHaz.min

$(function () {
	function setTransform(el, value) {
		el.css('-o-transform', value)
			.css('-webkit-transform', value)
			.css('-moz-transform', value)
			.css('transform', value);
	}

	function animate(templateName) {
		$('#animation').html(ich[templateName]({part1:'We must unite'}));

		if(templateName === 'red') {
			TweenMax.to('.mashifesto', 0, {top: '0px', left: '0px'});
			TweenMax.from('#stmt-0', 1, {left: '-2000px'});
			TweenMax.from('#block-0', 1, {left: '-2000px', delay: 0.25});

			TweenMax.from('#stmt-1', 1, {left: '2000px', delay: 2.25});
			TweenMax.from('#block-1', 1, {right: '-2000px', delay: 2.5});

			TweenMax.from('#block-2', 1, {top: '2000px', delay: 3.25});
			TweenMax.from('#block-3', 1, {top: '2000px', delay: 3.5});
			TweenMax.from('#stmt-2', 1, {top: '2000px', delay: 3.75});

			TweenMax.from('#stmt-3', 1, {left: '2000px', delay: 4.5});
			TweenMax.from('#handle', 1, {left: '2000px', delay: 4.75});

			TweenMax.to('.mashifesto', 2, {top: '2456px', left: '1721px', delay: 8.5});

		} else if(templateName === 'michael') {

			TweenMax.to('.mashifesto', 0, {top: '0px', left: '0px'});
			
			TweenMax.from('#block-0', 1, {top: '-2000px'});
			TweenMax.from('#stmt-0', 1, {top: '-2000px', delay: 0.25});
			
			TweenMax.from('#stmt-1', 1, {bottom: '-2000px', delay: 2.25});
			TweenMax.from('#avatar', 1, {right: '-2000px', delay: 2.5});

			TweenMax.from('#block-2', 1, {left: '3000px', top: '-2000px', delay: 3.25});
			TweenMax.from('#circle', 1, {left: '2000px', delay: 3.75});

			TweenMax.from('#block-3', 1, {top: '2000px', delay: 4});
			TweenMax.from('#stmt-2', 1, {top: '2000px', delay: 4.5});

			TweenMax.from('#stmt-3', 1, {top: '2000px', delay: 5.25});
			TweenMax.from('#handle', 1, {left: '2000px', delay: 5.75});
			TweenMax.from('#mashifesto-handle', 1, {left: '2000px', delay: 6});

			TweenMax.to('.mashifesto', 2, {top: '-2456px', left: '-1721px', delay: 9});

		} else if(templateName === 'kevin') {

			TweenMax.to('.mashifesto', 0, {top: '0px', left: '0px'});
			
			TweenMax.from('#stmt-0', 1, {bottom: '-2000px'});
			TweenMax.from('#block-0', 1, {bottom: '-2000px', delay: 0.25});

			TweenMax.from('#stmt-1', 1, {bottom: '-2000px', delay: 2.25});
			TweenMax.from('#block-1', 1, {right: '-2000px', delay: 2.5});
			TweenMax.from('#left-block', 1, {right: '-2000px', delay: 2.75});			
			TweenMax.from('#block-3', 1, {right: '-2000px', delay: 2.75});

			TweenMax.from('#hands-left', 1, {'background-position-y': '650%', delay: 3.5});
			TweenMax.from('#hands-right', 1, {'background-position-y': '650%', delay: 3.5});

			TweenMax.from('#stmt-2', 1, {top: '2000px', delay: 4.5});

			TweenMax.from('#stmt-3', 1, {top: '2000px', delay: 5});
			TweenMax.from('#handle', 1, {left: '2000px', delay: 5.5});
			TweenMax.from('#mashifesto-handle', 1, {left: '2000px', delay: 5.75});
			
			TweenMax.to('.mashifesto', 2, {top: '-2456px', left: '-1721px', delay: 9});

		} else if(templateName === 'ben') {

			TweenMax.to('.mashifesto', 0, {top: '0px', left: '0px'});
			
			TweenMax.from('#arrow', 1, {left: '-2000px'});
			TweenMax.from('#stmt-0', 1, {bottom: '-2000px', delay: 0.25});
			TweenMax.from('#block-0', 1, {bottom: '-2000px', delay: 0.5});

			TweenMax.from('#stmt-1', 1, {left: '-2000px', delay: 2.25});
			TweenMax.from('#circle', 1, {right: '-2000px', delay: 2.75});
			TweenMax.from('#avatar', 1, {top: '-2000px', delay: 2.85});
			TweenMax.from('#block-3', 1, {right: '-2000px', delay: 2.95});			

			TweenMax.from('#stmt-2', 1, {top: '2000px', delay: 4});

			TweenMax.from('#stmt-3', 1, {top: '2000px', delay: 4.25});
			TweenMax.from('#handle', 1, {left: '2000px', delay: 4.75});
			TweenMax.from('#mashifesto-handle', 1, {left: '2000px', delay: 4.9});
			
			TweenMax.to('.mashifesto', 2, {top: '-2456px', left: '-1721px', delay: 9});
		}
	}

	function setScale() {
		// Set up the scaling
		var totalWidth = 900;
		var scale = $(window).height() / totalWidth;
		var wrapper = $('#animation');
		setTransform(wrapper, 'scale('+ scale +')');
		wrapper.css('margin-top', - (totalWidth / 2) * scale);
	}

	setScale();
	$(window).resize(setScale);

	function pickTemplate() {
		var index = Math.floor(Math.random()*4);
		return ['red', 'michael', 'kevin', 'ben'][index];	
	}
	
	animate(pickTemplate());
	setInterval(function() { animate(pickTemplate()); }, 10000);
});