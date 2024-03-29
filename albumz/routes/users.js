var express = require('express');
var router = express.Router();
var firebase = require('../config/firebase');
var fbRef = firebase.database().ref();

router.get('/register', function(req, res, next) {
  	res.render('users/register');
});

router.get('/login', function(req, res, next) {
  	res.render('users/login');
});

router.post('/register', function(req, res, next) {
  var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var location = req.body.location;
	var fav_artists = req.body.fav_artists;
	var fav_genres = req.body.fav_genres;

	// Validation
	req.checkBody('first_name', 'First name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('users/register', {
			errors: errors
		});
	} else {

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(userData){
        console.log('user object:' + user);
        //you can save the user data here.
        console.log("Successfully created user with uid:",userData.uid);
				var user = {
					uid: userData.uid,
					email: email,
					first_name: first_name,
					last_name: last_name,
					location: location,
					fav_genres: fav_genres,
					fav_artists: fav_artists
				}

				var userRef = fbRef.child('users');
				userRef.push().set(user);

				req.flash('success_msg', 'You are now registered and can login');
				res.redirect('/users/login');

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error creating user: ", errorMessage);
      // ...
    });

	}
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('users/login', {
			errors: errors
		});
	} else {

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(authData){
      //console.log("Authenticated user with uid:",authData);

      req.flash('success_msg', 'You are now logged in');
      res.redirect('/albums');

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Login Failed: ", errorMessage);
      req.flash('error_msg', 'Login Failed');
      res.redirect('/users/login');
      // ...
    });
	}
});

// Logout User
router.get('/logout', function(req, res){
	// Unauthenticate the client
	firebase.auth().signOut().then(function() {
    req.flash('success_msg', 'You are logged out');
  	res.redirect('/users/login');
  }, function(error) {
    // An error happened.
    console.log("Logout Failed: ", error.message);
  });

});
module.exports = router;
