var fs = require('fs');
var path = require('path');

module.exports = function(dir, ext, callback){
	var result = [];

	fs.readdir(dir, function(err, list){

		if(err) callback(err);
		else {
			list.forEach(function(item){
				if(path.extname(item)=='.' + ext) result.push(item);
			});

			callback(null, result);
		}
	});
}
