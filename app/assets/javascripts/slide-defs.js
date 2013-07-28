

	// -------------------------------------------------------------------------------------
	// INSTRUCTIONS
	// -------------------------------------------------------------------------------------
			
		/**
		 *
		 * How it works
		 *
		 * Each "slide" is a class. It controls its own rendering and animation.
		 *
		 * Add new Slide subclasses using Slide.addDefinition() and passing in properties
		 *
		 * Slides are then created in the App class, by first loading data from the model,
		 * and calling Slide.factory(), which gets a new Slide type
		 *
		 * To add new Slide types
		 * 
		 * 1 - Define new Slide properties at the end of this Add new Slide classes at the end
		 * 2 - Override the "template" property and "animate" method
		 * 3 - Add the Class definition (definition, not string!) to the slideClasses array in the factory() block below
		 * 4 - ensure each animation() method has an onComplete callback!
		 * 5 - ensure each slide has a matching script template block in the main index file!
		 * 
		 */
	
	// -------------------------------------------------------------------------------------
	// Red Slide
			
		props =
		{
			animate:function(onComplete)
			{
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
	
				TweenMax.to('.mashifesto', 2, {top: '2546px', left: '1721px', delay: 8.5, onComplete:onComplete});
			}
		}
		
		Slide.addDefinition('RedSlide', 'red',  props);
		
	// -------------------------------------------------------------------------------------
	// Red Slide
			
		props =
		{
			animate:function(onComplete)
			{
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
	
				TweenMax.to('.mashifesto', 2, {top: '-2456px', left: '-1721px', delay: 9, onComplete:onComplete});

			}
		}
		
		Slide.addDefinition('MichaelSlide', 'michael', props);


	// -------------------------------------------------------------------------------------
	// Kevin Slide
			
		props =
		{
			animate:function(onComplete)
			{
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
				
				TweenMax.to('.mashifesto', 2, {top: '-2456px', left: '-1721px', delay: 9, onComplete:onComplete});
			}
		}
		
		Slide.addDefinition('KevinSlide', 'kevin', props);



	// -------------------------------------------------------------------------------------
	// Red Slide
			
		props =
		{
			animate:function(onComplete)
			{
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
				
				TweenMax.to('.mashifesto', 2, {top: '-2456px', left: '-1721px', delay: 9, onComplete:onComplete});
			}
		}
		
		Slide.addDefinition('BenSlide', 'ben', props);


