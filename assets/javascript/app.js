$(document).ready(function(){
var user;
var lat;
var long;

navigator.geolocation.getCurrentPosition(function(position) { 
console.log(position)
lat = position.coords.latitude
long = position.coords.longitude;
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: lat, lng: long},
  zoom: 10

});

})
$('#mark').on('click', function(){
if (user){
	mark();
}
else{
	login();
}
})




function getNutrition(searchTerm){
	//Johns API code
}






//click function logs  user in with google
$('body').on('click', '#login', function(){
	login();

});

//click function logs user out
$('body').on('click', '#logout', function(){

	var appRef = new Firebase('https://foodifinder.firebaseio.com/');
	firebase.auth().signOut().then(function() {
	  $('#auth').html('<a class="waves-effect waves-light btn" id="login">Login</a>')
	  userRef = appRef.child('users').child(userid);
           userRef.update({status: 'loggedOut'});
	}, function(error) {
	  // An error happened.
	});
	
});

//click function runs search and stores user search
$('.search').on('click', function(){
	var appRef = new Firebase('https://foodifinder.firebaseio.com/');
	var searchTerm = $('.input').val.trim();
	userRef = appRef.child('users').child(userid);
	//need to call getNutrition and getRecipe
});

//click function runs search on trending buttons


//links the uid given by google to an id in our firebase app
function linkAuthwReal(userid, appRef) {
	appRef.once("value", function(snapshot) {
		var userExists = snapshot.child('users').child(userid).exists();
		var userRef;
		if(userExists){  
           userRef = appRef.child('users').child(userid);
           userRef.update({status: 'loggedIn'});
           console.log(userRef);
        }

        else{  userRef = appRef.child('users').child(userid);
        	   userRef.set({userid: userid});
              console.log(userRef);
        }
	});

}

function login(){
	var appRef = new Firebase('https://foodifinder.firebaseio.com/');
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		console.log(token);
		// The signed-in user info.
		 user = result.user;
		console.log(user);
		console.log(user.uid);
		firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			userid = user.uid
			linkAuthwReal(userid, appRef);
		$('#auth').html('<a class="waves-effect waves-light btn" id="logout">Logout</a>')
			} else {
			userid = null;
			}
			
	console.log(userid);
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
}

function mark(){
	var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    animation: google.maps.Animation.DROP,
    map: map,
    title: 'Hello World!'

  });
	function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
marker.addListener('click', toggleBounce);

}


});