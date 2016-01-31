var fs = require('fs');
var result = 0;
var content = fs.readFile(process.argv[2], function finishedReading(error, content){
	result = content.toString().split('\n').length;
	console.log(result - 1);
});

