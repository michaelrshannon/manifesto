
	// -------------------------------------------------------------------------------------
	// INSTRUCTIONS
	// -------------------------------------------------------------------------------------
			
		/**
		 *
		 * To add new Slide types
		 * 
		 * 1 - Add new Slide classes at the end
		 * 2 - Override the "template" property and "animate" method
		 * 3 - Add the Class definition (definition, not string!) to the slideClasses array in the factory() block below
		 * 4 - ensure each animation() method has an onComplete callback!
		 * 5 - ensure each slide has a matching script template block in the main index file!
		 * 
		 */
	
	// -------------------------------------------------------------------------------------
	// STATIC SLIDE FACTORY METHODS
	// -------------------------------------------------------------------------------------
			
		(function(){
			
			// DEFINE ALL SLIDE CLASSES HERE!
				var slideDefs =
				[
					RedSlide,
					MichaelSlide,
					KevinSlide,
					BenSlide
				];
				
			// THIS IS THE MAIN FACTORY METHOD - it cycles the slide definitions and returns a new Slide instance
				Slide.factory = function(container, statement)
				{
					// resolve slideclass
						var def		= slideDefs[0];
						slideDefs	= slideDefs.concat(slideDefs.shift())
					
					// return new instance
						return new def(container, statement);
				}
				
			// THIS FUMCTION REGISTERS A NEW SLIDE DEFINITION IN THE MASTER LIST OF DEFS
				Slide.registerSlide = function(def)
				{
					slideDefs.push(def);
				}
			
		})();
		

			
	// -------------------------------------------------------------------------------------
	// SLIDE SUPERCLASS
	// -------------------------------------------------------------------------------------
			
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
				template				:'',
				
				
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
						image		:this.statement.user.image,
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
					return '[object Slide template="' +this.template+ '"]';
				}
			
		}
		
	// -------------------------------------------------------------------------------------
	// SLIDES
	// -------------------------------------------------------------------------------------
	
		// temporary props object for extension
			var props;
			
			function createSlide(name, props)
			{
				// get slide ClassName
					var id = name.substr(0,1).toUpperCase() + name.substr(1);
					
				// create constructor
					var constructor = function(container, statement)
					{
						Slide.call(this, container, statement);
					}
					
				// expose to window
					window[id] = constructor;
					
				// extend
					constructor.prototype = new Slide;
					constructor.prototype.constructor = constructor;
					_.extend(constructor.prototype, props);
				
				// register definition
			}
			
		// -------------------------------------------------------------------------------------
		// Red Slide
				
			/**
			 * should proably upgrade to Backbone or something and automate class-extendion...
			 */
			
			function RedSlide(container, statement)
			{
				Slide.call(this, container, statement);
			}
			
			props =
			{
				template: 'red',
				
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
			
			RedSlide.prototype = new Slide;
			RedSlide.prototype.constructor = RedSlide;
			_.extend(RedSlide.prototype, props);


		// -------------------------------------------------------------------------------------
		// Red Slide
				
			/**
			 * should proably upgrade to Backbone or something and automate class-extendion...
			 */
			
			function MichaelSlide(container, statement)
			{
				Slide.call(this, container, statement);
			}
			
			props =
			{
				template: 'michael',
				
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
			
			MichaelSlide.prototype = new Slide;
			MichaelSlide.prototype.constructor = MichaelSlide;
			_.extend(MichaelSlide.prototype, props);


		// -------------------------------------------------------------------------------------
		// Red Slide
				
			/**
			 * should proably upgrade to Backbone or something and automate class-extendion...
			 */
			
			function KevinSlide(container, statement)
			{
				Slide.call(this, container, statement);
			}
			
			props =
			{
				template: 'kevin',
				
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
			
			KevinSlide.prototype = new Slide;
			KevinSlide.prototype.constructor = KevinSlide;
			_.extend(KevinSlide.prototype, props);



		// -------------------------------------------------------------------------------------
		// Red Slide
				
			/**
			 * should proably upgrade to Backbone or something and automate class-extendion...
			 */
			
			function BenSlide(container, statement)
			{
				Slide.call(this, container, statement);
			}
			
			props =
			{
				template: 'ben',
				
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
			
			BenSlide.prototype = new Slide;
			BenSlide.prototype.constructor = BenSlide;
			_.extend(BenSlide.prototype, props);


