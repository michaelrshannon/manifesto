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
		$('.wrapper').html(ich[templateName]({part1:'We must unite'}));

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

			TweenMax.to('.mashifesto', 2, {top: '2546px', left: '1721px', delay: 8.5});

		} else if(templateName === 'michael') {

			TweenMax.to('.mashifesto', 0, {top: '0px', left: '0px'});
			
			TweenMax.from('#block-0', 1, {top: '-2000px'});
			TweenMax.from('#stmt-0', 1, {top: '-2000px', delay: 0.25});
			
			TweenMax.from('#stmt-1', 1, {bottom: '-2000px', delay: 2.25});
			TweenMax.from('#block-1', 1, {right: '-2000px', delay: 2.5});

			TweenMax.from('#block-2', 1, {left: '3000px', top: '-2000px', delay: 3.25});
			TweenMax.from('#circle', 1, {left: '2000px', delay: 3.75});

			TweenMax.from('#block-3', 1, {top: '2000px', delay: 4});
			TweenMax.from('#stmt-2', 1, {top: '2000px', delay: 4.5});

			TweenMax.from('#stmt-3', 1, {top: '2000px', delay: 5.25});
			TweenMax.from('#handle', 1, {left: '2000px', delay: 5.75});
			TweenMax.from('#mashifesto-handle', 1, {left: '2000px', delay: 6});

			//TweenMax.to('.mashifesto', 2, {top: '2546px', left: '1721px', delay: 9});
		}
	}

	function setScale() {
		// Set up the scaling
		var totalWidth = 900;
		var scale = $(window).height() / totalWidth;
		var wrapper = $('.wrapper');
		setTransform(wrapper, 'scale('+ scale +')');
		wrapper.css('margin-top', - (totalWidth / 2) * scale);
	}

	setScale();
	$(window).resize(setScale);

	var template = 'michael';
	animate(template);
	//setInterval(function() { animate(template); }, 10000);
});