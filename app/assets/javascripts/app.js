
	App =
	{
		// -------------------------------------------------------------------------------------
		// properties
		
			/** @type {DataModel}	The DataModel */
			model:null,
			
		
		// -------------------------------------------------------------------------------------
		// initialize
		
			/**
			 * Main initialalization function
			 * Sets up document, template stettings, etc
			 */
			initialize:function()
			{
				// debug
					console.log('init');
					
				// underscore template settings
					_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
					
				// functions
					function setTransform(el, value)
					{
						el.css('-o-transform', value)
							.css('-webkit-transform', value)
							.css('-moz-transform', value)
							.css('transform', value);
					}
				
					function setScale()
					{
						// Set up the scaling
						var totalWidth		= 900;
						var scale			= $(window).height() / totalWidth;
						var wrapper			= $('#wrapper');
						setTransform(wrapper, 'scale('+ scale +')');
						wrapper.css('margin-top', - (totalWidth / 2) * scale);
					}
				
				// window
					$(window)
						.resize(setScale)
						.trigger('resize');
			},
			
		// -------------------------------------------------------------------------------------
		// methods
		
			/**
			 * Kicks off the application once initialized, loads model data
			 */
			start:function()
			{
				// set up model
					this.model = new DataModel();
					
				// get next statement
					this.getNext();
			},
		
			/**
			 * Gets the next sattement from the database
			 */
			getNext:function()
			{
				this.model.getNext($.proxy(this.onNext, this));
			},
			
		// -------------------------------------------------------------------------------------
		// handlers
		
			/**
			 * Handler for the completion of getNext() statement
			 * @param	{Object}	data	JSON statement Object
			 */
			onNext:function(data)
			{
				// create a new Statement instance
					var statement = new Statement(data);
					
				// create a new slide object (slides control their own HTML creation and injection)
					var slide = Slide.factory('#wrapper', statement);
					
				// debug
					console.log(slide);
					
				// tell the slide to animate
					slide.animate($.proxy(this.onComplete, this));
			},
			
			/**
			 * Handler for the completion of slide animation 
			 */
			onComplete:function()
			{
				this.getNext();
			}
			
		
	}
	
	$(function(){
		App.initialize();
		App.start();
		});
	
	