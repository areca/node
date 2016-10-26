var firebase = require('firebase');
var config = {
   apiKey: "AIzaSyDOx7CfksSc7NvsQVAU_HnMjOxBZm84S5s",
   authDomain: "albumz-7548e.firebaseapp.com",
   databaseURL: "https://albumz-7548e.firebaseio.com",
   storageBucket: "albumz-7548e.appspot.com",
   messagingSenderId: "814348511439"
 };

firebase.initializeApp(config);

module.exports = firebase;
