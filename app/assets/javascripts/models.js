// -------------------------------------------------------------------------------------
// DataModel
		
	function DataModel(app)
	{
		this.server = location.protocol === 'file:'
						? 'api/'
						: '/';		
	}
	
	DataModel.prototype =
	{
		// -------------------------------------------------------------------------------------
		// values
		
			/** @type {App}		The application  */
			app					:null,
		
			/** @type {String}	server string */
			server				:'',
			
			

		// -------------------------------------------------------------------------------------
		// methods
		
			getNext:function(staticStatementId, onLoad)
			{
				// call load
					var url;
					if(staticStatementId) {
						url = this.server + 'statement/'+ staticStatementId +'.json';
					} else {
						url = this.server + 'statement/next.json';
					}

					this.load(url, onLoad);
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
