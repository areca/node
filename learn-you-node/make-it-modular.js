var mymodule = require('./mymodule');

mymodule(process.argv[2], process.argv[3], function(err, result){
	
	if(err) return console.error('Error!', err);
	else{	
		result.forEach(function(item){
			console.log(item);	
		});
	}
});

