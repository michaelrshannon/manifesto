// ----------------------------------------------------------------------------------------------------
// UTILS
// ----------------------------------------------------------------------------------------------------


	if( ! Function.bind )
	{
		Function.bind = function(scope, params)
		{
			var that = this;
			return (function(){that.apply(scope, params)});
		}
	}

	require = function(src)
	{
		if(src instanceof Array)
		{
			$(src).each(require);
		}
		else
		{
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('async', false);
			//script.setAttribute('defer', 'defer');
			script.setAttribute('src', src);
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
	
	// Adapted this from somewhere. Feel horrible for not remembering.
	$.fn.autoSelect = function(){
		var selectTarget = this[0]; // Select first element from jQuery collection
		if(selectTarget != null) {
			 if(selectTarget.tagName == 'TEXTAREA' || (selectTarget.tagName == "INPUT" && selectTarget.type == "text")) {
				 selectTarget.select();
			 } else if(window.getSelection) { // FF, Safari, Opera
				 var sel = window.getSelection();
				 var range = document.createRange();
				 range.selectNode(selectTarget);
				 sel.removeAllRanges();
				 sel.addRange(range);
			 } else { // IE
				 document.selection.empty();
				 var range = document.body.createTextRange();
				 range.moveToElementText(selectTarget);
				 range.select();
			 };
		};
		return this; // Don't break the chain
	};


	jQuery.expr[':'].invisible = function(element)
	{ 
		return jQuery(element).is(':hidden') && jQuery(element).css('display') != 'none'; 
	};


	/**
	 * Match a pattern and extract to named properties
	 * @param	{RegExp}	pattern		A RegExp pattern
	 * @param	{Array}		keys		An Array of key names to extract matches to
	 * @param	{String}	keys		A String of key names, separated by non-word characters, to extract matches to
	 * @param	{Object}	keys		An object with existing keys to extract matches to
	 * @returns	{Object}				A hash of named matches
	 */
	String.prototype.extract = function(pattern, keys)
	{
		// grab keys
			keys = keys instanceof Array
						? keys
						: typeof keys === 'string'
							? String(keys).split(/\W+/)
							: (function(){var arr = []; for(var i in keys){ arr.push(i) }; return arr})();
			keys			= ['match'].concat(keys);
			
		// match
			var matches		= this.match(pattern) || [];
			
		// extract values
			var obj			= {};
			for(var i = 0; i < keys.length; i++)
			{
				obj[keys[i]] = matches[i];
			}
			
		// return
			return obj;
	}
	
	String.prototype.htmlEscape= function()
	{
		return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	
	$.fn.trace = function()
	{
		console.log(this);
		return this;
	}
	
	trace = window.trace ? trace : function(){ console.log.apply(console, arguments); };
	
	Utils = 
	{
		
		classify:function(subclass, properties, superclass)
		{
			if(superclass)
			{
				subclass.prototype = new superclass;
				subclass.prototype.constructor = subclass;
			}
			jQuery.extend(subclass.prototype, properties);
		},
		
		/**
		 * Clones an object
		 * @param	{Object}	obj		The object reference
		 * @returns	{Object}			The cloned object
		 */
		clone:function(obj)
		{
			return jQuery.extend(true, {}, obj);
		},

		/**
		 * Extends an object or array with more properties or elements
		 *
		 * @param	{Object}	obj			A source Object to be extended
		 * @param	{Object}	source		The properties to be added
		 * @returns	{Object}				The modified object
		 *
		 * @param	{Array}		obj			A source Array to be extended
		 * @param	{Array}		source		The elements to be added
		 * @returns	{Array}					The modified array
		 */
		extend:function(obj, source)
		{
			// variables
				var prop;
				
			// throw error if obj is null
				if(obj == undefined)
				{
					throw new Error('Error in Utils.extend(): obj is undefined');
				}

			// extend array
				if(Utils.isArray(obj) && Utils.isArray(source))
				{
					for(var i = 0; i < source.length; i++)
					{
						obj.push(source[i]);
					}
				}

			// extend object
				else if (typeof source === "object")
				{
					for (var name in source)
					{
						obj[name] = source[name];
					}
				}

			// return
				return obj;
		},

		regex:
		{
			/**
			 * Escapes a string for use in RegExp constructors
			 * @param	{String}	value	The string to be RegExp escaped
			 * @returns	{String}			The escaped string
			 */
			escape:function(value)
			{
				return String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
			},
			
			/**
			 * Unescapes a string used in RegExp constructors
			 * @param	{String}	value	The string to be RegExp escaped
			 * @returns	{String}			The unescaped string
			 */
			unescape:function(value)
			{
				 return String(value).replace(/\\\//g, '/');
			},
		
			/**
			 * Converts a wildcard (*) string into a non-greedy RegExp
			 * @param	{String}	value		The wildcard string to convert
			 * @param	{Boolean}	exactMatch	An optional Boolean to force an exact match
			 * @returns	{RegExp}				The new RegExp
			 */
			create:function(value, exactMatch)
			{
				var str = Utils.regex.escape(value).replace(/\\\*/g, '.*?');
				if(exactMatch)
				{
					str = '^' + str + '$';
				}
				return new RegExp(str);
			},
		},

		getSearch:function(target)
		{
			var props = {};
			(target || window.location.hash).replace(/([^?=&]+)(?:=([^&]*))?/g, function($0, $1, $2) { props[$1] = $2; });
			return props;
		},
		
		/**
		 * Gets properties from an object's namespace via a dot.syntax.path String
		 * @param	{Object}	obj			The root object from which to extract the deep value
		 * @param	{String}	path		The dot-path to an existing object property
		 * @returns	{Value}					The value of the property, if it exists
		 */
		getValue:function(obj, path)
		{
			path = String(path);
			if(path.indexOf('.') == -1)
			{
				return obj[path];
			}
			else
			{
				var key;
				var keys = path.split('.');
				while(keys.length > 1)
				{
					key = keys.shift();
					if(key in obj)
					{
						obj = obj[key];
					}
					else
					{
						return;
					}
				}
				return obj[keys[0]];
			}
			return;
		},

		/**
		 * Add nested properties to an object's namespace via a dot.syntax.path String
		 * @param	{Object}	obj			The root object on which to create the deep value
		 * @param	{String}	path		A dot-syntax path to a new object property
		 * @param	{Object}	value		A value to add to the new namespace
		 */
		setValue:function(obj, path, value)
		{
			
			path		= String(path);
			var keys	= path.split('.');

			if(typeof obj !== 'object')
			{
				throw new Error('Parameter obj must be an Object; '+ (typeof obj) +' "' +obj+ '" given');
			}
			
			//console.log(keys, value)
			do
			{
				// get the next key
					var key = keys.shift();
					if(key == '')
					{
						throw new Error('Empty key in path "' +path+ '"');
					}
					
				// extend
					if(keys.length > 0)
					{
						if( ! (key in obj) )
						{
							obj[key] = {};
						}
						obj = obj[key];
					}

				// assign
					else
					{
						obj[key] = value;
					}
			}
			while(keys.length);
		},
		
		createRegex:function(value, flags, exact)
		{
			if(exact)
			{
				value = '^' +value+ '$';
			}
			try
			{
				if(flags instanceof Array)
				{
					flags = flags.join('');
				}
				return new RegExp(value, flags);
			}
			catch(err)
			{
				return err;
			}
		},
		
		isArray:function(value)
		{
			return Object.prototype.toString.call(value) === '[object Array]';
		},
		
		getArguments:function(args, start, end)
		{
			return Array.prototype.slice.call(args, start, end);
		},
		
		getValues:function(obj)
		{
			var arr = [];
			for(var name in obj)
			{
				arr.push(obj[name]);
			}
			return arr;
		},
		
		/**
		 * Inject values into a template string
		 * @param	{String}	source	A template string of the format "a {template} string"
		 * @param	{Object}	values	A hash of values
		 * @param	{Function}	values	A currently-executing function
		 * @returns	{String}			The populated template string
		 */
		inject:function(source, values)
		{
			// if the value is a function, extract its current values into a hash
				if(typeof values === 'function')
				{
					var params	= String(values).match(/\((.+)?\)/)[1].split(/[, ]+/);
					var fn		= values;
					values		= {};
					for(var i = 0; i < params.length; i++)
					{
						values[params[i]] = fn.arguments[i];
					}
				}
			
			// replace the source template with the hash values
				for(var name in values)
				{
					var param	= name.substr(0, 1) == '$' ? '\\' + name : name;
					var find	= new RegExp('{' +param+ '}', 'g');
					var replace	= values[name];
					source		= source.replace(find, replace);
				}
				
			// return the populated source
				return source;
		},
		
		parametize:function(fn, parameters, scope)
		{
			return (function(){
				var args = Utils.getArguments(arguments).concat(Utils.getValues(parameters));
				return fn.apply(scope || fn, args);
			})
		}
	}

	/*	
	clear()
	var fn = Utils.createFunc('1 == 1');
	
	//trace(fn instanceof Error)
	
	inspect(fn.message)

	//trace(fn(1))
	
	
clear();
	var rx = Utils.createRegex('[a-e]', 'gim')

	trace(rx instanceof Error)
	inspect(rx)

	inspect('hello there'.match(rx))
	inspect(rx)

	*/
