var fs = require('fs');
var path = require('path');
fs.readdir(process.argv[2], function(err, list){

	if(err) console.log('hata!');
	else {
		list.forEach(function(item){
			if(path.extname(item)=='.' + process.argv[3]) console.log(item);
		});
	}
});


