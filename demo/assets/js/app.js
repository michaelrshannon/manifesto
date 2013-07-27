
	App =
	{
		// -------------------------------------------------------------------------------------
		// properties
		
			/** @type {DataModel}	The DataModel */
			model:null,
		
		
		// -------------------------------------------------------------------------------------
		// methods
		
			initialize:function()
			{
				// debug
					console.log('init');
					
				// set up model
					this.model = new DataModel();
					this.getNext();
					
				// blah
				
			},
			
			getNext:function()
			{
				this.model.getNext(this.onNext);
			},
			
		// -------------------------------------------------------------------------------------
		// handlers
		
			onNext:function(data)
			{
				// debug
					console.log(data);
					
				// stuff
			}
		
	}
	
	
	$(function(){
		App.initialize();
		});