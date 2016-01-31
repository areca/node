var fs = require('fs');
var content = fs.readFileSync(process.argv[2]);
var arr = content.toString().split('\n');
console.log(arr.length-1);
