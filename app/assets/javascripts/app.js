
	App =
	{
		// -------------------------------------------------------------------------------------
		// properties
		
			/** @type {DataModel}	The DataModel */
			model					:null,
			
			/** @type {Number}		The play count */
			count					:0,
			
			/** @type {Number}		The max number of slides to play between video */
			maxCount				:5,

			/** @type {Number}		The ID of the statement to display, if we're only showing one. */
			staticStatementId : 0,
			
		
		// -------------------------------------------------------------------------------------
		// initialize
		
			/**
			 * Main initialalization function
			 * Sets up document, template stettings, etc
			 */
			initialize:function(staticStatementId)
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

					this.staticStatementId = staticStatementId;
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
				console.log('next slide');
				// We don't show the video when displaying a 
				// specific statement.
				this.count % this.maxCount == 0 && !this.staticStatementId
					? this.showVideo()
					: this.model.getNext(this.staticStatementId, $.proxy(this.onNext, this));
			},
			
			showVideo:function()
			{
				// debug
					console.log('video');
					
				// set html
					var html = $('#video').html();
					$('#wrapper').html(html);
					$('body').attr('class', 'video');
					
				// determine width and height
					var width	= $(document).width() * 0.6;
					var height	= width / 16 * 9;
					
				// update video size depending on screen size
					$('iframe')
						.attr('width', width)
						.attr('height', height);

					$('#wrapper, #content').attr('style', 'height:100%')
					
				// set timeout to load next slide
					setTimeout($.proxy(this.onComplete, this), 10 * 1000);
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
					var statement	= new Statement(data);
					
				// create a new slide object (slides control their own HTML creation and injection)
					var slide		= statement.fragments
										? Slides.getNext('#wrapper', statement)
										: new EmptySlide('#wrapper', statement);
					
				// debug
					console.log(slide);
					
				// tell the slide to animate
					slide.animate($.proxy(this.onComplete, this));
				// make sure the scaling is set correctly
					$(window).trigger('resize')
			},
			
			/**
			 * Handler for the completion of slide animation 
			 */
			onComplete:function()
			{
				this.count++;
				this.getNext();
			}
			
		
	}
	
	$(function(){
		App.initialize(window.staticStatementId || 0);
		App.start();
		});
	
	
