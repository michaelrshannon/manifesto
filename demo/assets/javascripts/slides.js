
	// -------------------------------------------------------------------------------------
	// Static Slide factory methods
	
		(function(){
			
			// DEFINE ALL SLIDE CLASSES HERE!
				var slideClasses =
				[
					RedSlide
					// BlueSlide
					// PinkSlide
				];
				
			// THIS IS THE MAIN FACTORY METHOD - it cycles the slide definitions and returns a new Slide instance
				Slide.factory = function(container, statement)
				{
					// resolve slideclass
						var slideClass	= slideClasses[0];
						slideClasses	= slideClasses.concat(slideClasses.shift())
					
					// return new instance
						return new slideClass(container, statement);
				}
			
		})();
		

			
	// -------------------------------------------------------------------------------------
	// Slide
			
		function Slide(container, statement)
		{
			if(container && statement)
			{
				this.container		= container;
				this.statement		= statement;
				this.build();
			}
		}
		
		Slide.prototype =
		{
			// -------------------------------------------------------------------------------------
			// values
			
				/** @type {jQuery}		A jQuery object */
				container				:null,
				
				/** @type {Statement}	A Statement instance */
				statement				:null,
				
				/** @type {String}		The rendered HTML string */
				html					:'',
				
				/** @type {String}		The name of the template */
				template				:'red',
				
				
			// -------------------------------------------------------------------------------------
			// methods
			
				build:function()
				{
					// populate template
						var values		= this.getValues();
						var template	= $('#' + this.template).html();
						
					// debug
						//console.log(values);
						
					// set html
						this.html = _.template(template, values);
						
					// build
						$(this.container).html(this.html);
				},
			
				animate:function(onComplete)
				{
					// animate in subclass
					alert('The animate method needs to be overridden in Slide subclasses');
				},
				
					
				getValues:function()
				{
					var values =
					{
						name		:this.statement.user.name,
						fragment_0	:this.statement.fragments[0],
						fragment_1	:this.statement.fragments[1],
						fragment_2	:this.statement.fragments[2],
						fragment_3	:this.statement.fragments[3]
					};
					return values;
				},

	
			// -------------------------------------------------------------------------------------
			// utilities
			
				toString:function()
				{
					return '[object Slide]';
				}
			
		}
		
	
	// -------------------------------------------------------------------------------------
	// Red Slide
			
		// should possibly zupgrade to Backbone or something and automate this class-extendion...
		
		function RedSlide(container, statement)
		{
			Slide.call(this, container, statement);
		}
		
		var props =
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
			},
			
			toString:function()
			{
				return '[object RedSlide]';
			}
		}
		
		RedSlide.prototype = new Slide;
		RedSlide.prototype.constructor = RedSlide;
		_.extend(RedSlide.prototype, props);
