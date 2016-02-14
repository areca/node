var mongoose    =   require("mongoose");
var dbUrl = 'mongodb://bitcher:sharethis@ds055525.mongolab.com:55525/bitch';

mongoose.connection.once('connected',function(){
    console.log('Connected to DB ' + dbUrl);
});

mongoose.connect(dbUrl,function(err){
    if(err) console.log(err);
});

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);