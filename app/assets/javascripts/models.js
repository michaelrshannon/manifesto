// -------------------------------------------------------------------------------------
// DataModel
		
	function DataModel(app)
	{
		this.server = location.protocol === 'file:'
						? 'api/'
						: 'http://staging.mashifesto.org/';
						// 'http://mashifesto-staging.herokuapp.com/'
		
	}
	
	DataModel.prototype =
	{
		// -------------------------------------------------------------------------------------
		// values
		
			/** @type {App}		The application  */
			app					:null,
		
			/** @type {String}	server string */
			server				:'',
			
			/** @type {Array}	Array of data objects */
			data				:[],
			

		// -------------------------------------------------------------------------------------
		// methods
		
			getAll:function(onLoad)
			{
				var that = this;
				this.load(this.server + 'statements/all.json', function(data)
				{
					for (var i=0; i < data.length; i++)
					{
						that.statements.push(new Statement(data[i]));
					}
				});
			},
		
			getNext:function(onLoad)
			{
				// temp variable
					var that = this;
					
				// temp callback
					function fn(data)
					{
						// check the last 
							var last = that.getLast();
							
						// if the same data is being returned, return a random cached bit of data
							if(last && data.id == last.id)
							{
								console.log('No next statement!');
								data = that.getRandom();
							}
						
						// otherwise, add the new data to the cache
							else
							{
								that.data.push(data);
							}
						
						// load
							onLoad(data);
					}
				
				// call load
					this.load(this.server + 'statement/next.json', fn);
			},
			
			load:function(url, onLoad)
			{
				// why isn't the success callback working?
				// $.getJSON(url, function(data){ console.log(data) } );
				
				// variables
					var that = this;
	
				// load data
					$.get(url, function(json){
						
						// grab data
							var data = json;
	
						// blatant hack, as JSON does not seem to be loading locally
							if(typeof json === 'string')
							{
								json	= json.replace(/[\r\n]/g, '');
								data	= JSON.parse(json);
							}
	
						// debug
							//console.log(data);
	
						// call handler
							onLoad(data);
						}, 'JSON');
			},
			
			find:function(id)
			{
				var data;
				for (var i = 0; i < this.data.length; i++)
				{
					data = this.data[i];
					if(data.id == id)
					{
						return data[i];
					}
				}
				return null;
			},
			
			getLast:function()
			{
				return this.data[this.data.length - 1];
			},
			
			getRandom:function()
			{
				var index = Math.floor(Math.random() * this.data.length);
				return this.data[index];
			},

		// -------------------------------------------------------------------------------------
		// utilities
		
			toString:function()
			{
				return '[object DataModel]';
			}
		
		}
	

	// -------------------------------------------------------------------------------------
	// Statement
			
		function Statement(values)
		{
			// properties
				this.id			= values.id;
				this.date		= new Date(values.date);
				this.user		= new User(values.user);
				this.fragments	= values.fragments;
				if(values.tweets)
				{
					for (var i=0; i < values.tweets.length; i++)
					{
						this.tweets.push(new Tweet(values.tweets[i]));
					}
				}
		}
		
		Statement.prototype =
		{
			// -------------------------------------------------------------------------------------
			// values
			
				id				:null,
				date			:null,
				user			:null,
				tweets			:[],
				fragments		:[],
				
				
			// -------------------------------------------------------------------------------------
			// methods
			
	
			// -------------------------------------------------------------------------------------
			// utilities
			
				toString:function()
				{
					return '[object Statement]';
				}
			
		}
		
		
	// -------------------------------------------------------------------------------------
	// Tweet
			
		function Tweet(tweet)
		{
			if(tweet)
			{
				this.url		= tweet.url;
				this.text		= tweet.text;
				this.location	= new Location(tweet.location);
			}
		}
		
		Tweet.prototype =
		{
			// -------------------------------------------------------------------------------------
			// values
			
				url			:'',
				text		:'',
				location	:null,
				
				
			// -------------------------------------------------------------------------------------
			// utilities
			
				toString:function()
				{
					return '[object Tweet]';
				}
			
		}
		
		
	// -------------------------------------------------------------------------------------
	// User
			
		function User(user)
		{
			if(user)
			{
				this.screenName	= user.screen_name;
				this.image		= user.image;
				this.name		= user.name;
			}
		}
		
		User.prototype =
		{
			// -------------------------------------------------------------------------------------
			// values
			
				screenName	:'',
				image		:'',
				name		:'',
				
			// -------------------------------------------------------------------------------------
			// utilities
			
				toString:function()
				{
					return '<a href="http://www.twitter.com/' +this.name+ '">' +this.screenName+ '</a>';
				}
			
		}


	// -------------------------------------------------------------------------------------
	// User
			
		function Location(location, name)
		{
			if(location)
			{
				this.lng		= location.lng || 0;
				this.lat		= location.lat || 0;
				this.name		= name || null;
			}
		}
		
		Location.prototype =
		{
			// -------------------------------------------------------------------------------------
			// values
			
				lng			:0,
				lat			:0,
				name		:null,
				
				
			// -------------------------------------------------------------------------------------
			// utilities
			
				toString:function()
				{
					return 'lng:' +this.lng+ ', lat:' + this.lat;
				}
			
		}
