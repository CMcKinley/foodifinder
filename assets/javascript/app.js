$(document).ready(function(){

$('.login').on('click', function(){

	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		console.log(token);
		// The signed-in user info.
		var user = result.user;
		console.log(user);
		firebase.auth().onAuthStateChanged(function(user) {
		if (user) {

		$('body').text('Logged in!')
			} else {
			// No user is signed in.
			}

	})

  // ...
	}).catch(function(error) {
  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});

});

$('body').on('click', '.logout', function(){


	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
	});

});


});