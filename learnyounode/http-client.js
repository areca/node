var http = require('http');
var url = process.argv[2];

http.get(url, function callback(response){

	response.setEncoding('utf8');

	response.on('error', function(err){
		 console.error('Error!' , err);	
	});

	response.on('data', function (data) { 
		console.log(data); 
	});
	
});


