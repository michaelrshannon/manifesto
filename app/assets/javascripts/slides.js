
	// -------------------------------------------------------------------------------------
	// STATIC SLIDE FACTORY METHODS - Use these to register classes and return new instances
	// -------------------------------------------------------------------------------------
			
		(function(){
			
			// Slide defintions
				var slideDefs = [ ];
				
				/**
				 * Returns a new slide instance. Use this to get a different kind than before
				 * 
				 * THIS IS THE MAIN FACTORY METHOD - it cycles the slide definitions and returns a new Slide instance
				 * 
				 * @param	{String}	container	An identifier to add the rendered slide to
				 * @param	{Statement}	statement	A Statement instance
				 * @returns	{Slide}					A new Slide instance / subclass
				 */
				Slide.factory = function(container, statement)
				{
					// resolve slideclass
						var def		= slideDefs[0];
						slideDefs	= slideDefs.concat(slideDefs.shift())
					
					// return new instance
						return new def(container, statement);
				}
				
				/**
				 * Static method to add new class definitions
				 * 
				 * THIS FUMCTION REGISTERS A NEW SLIDE DEFINITION IN THE MASTER LIST OF DEFS
				 * 
				 * @param	{String}	name	The name of the class
				 * @param	{Object}	props	The new class properties
				 * @returns	{Function}			The newly-created class definition
				 */
				Slide.addDefinition = function(name, template, props)
				{
					// create constructor
						var def = function(container, statement)
						{
							Slide.call(this, container, template, statement);
						}
						
					// expose to window
						window[name] = def;
						
					// extend
						def.prototype = new Slide;
						def.prototype.constructor = def;
						_.extend(def.prototype, props);
					
					// register definition
						slideDefs.push(def);
				}
	
		})();
		
			
	// -------------------------------------------------------------------------------------
	// SLIDE SUPERCLASS
	// -------------------------------------------------------------------------------------
			
		function Slide(container, template, statement)
		{
			if(container && statement)
			{
				this.container		= container;
				this.template		= template;
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
				
				/** @type {String}		The name of the template */
				template				:'',
				
				/** @type {Statement}	A Statement instance */
				statement				:null,
				
				/** @type {String}		The rendered HTML string */
				html					:'',
				
				
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
          $('body').attr('class', this.template);
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
		