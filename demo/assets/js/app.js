
	App =
	{
		// -------------------------------------------------------------------------------------
		// properties
		
			/** @type {DataModel}	The DataModel */
			model:null,
			
			//styles = ['red', 'blue']
		
		
		// -------------------------------------------------------------------------------------
		// initialize
		
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
						var wrapper			= $('.wrapper');
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
		
			start:function()
			{
				// set up model
					this.model = new DataModel();
					this.getNext();
			},
		
			getNext:function(data)
			{
				this.model.getNext($.proxy(this.onNext, this));
			},
			
		// -------------------------------------------------------------------------------------
		// handlers
		
			onNext:function(data)
			{
				// debug
					var statement = new Statement(data);
					console.log('Loaded statement:' , statement);
					
				// stuff
					var slide = new Slide('.wrapper', statement);
					console.log(this);
					slide.animate($.proxy(this.onComplete, this));
			},
			
			onComplete:function()
			{
				this.getNext();
			}
			
		
	}
	
	
	$(function(){
		App.initialize();
		App.start();
		});