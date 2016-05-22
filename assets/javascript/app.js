$(document).ready(function(){

var app = {
	user:undefined,
	lat:undefined,
	long:undefined,
	appRef: new Firebase('https://foodifinder.firebaseio.com/'),
	searchTerm:undefined,
	login: function(){
	
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		console.log(token);
		// The signed-in user info.
		app.user = result.user;
		console.log(app.user);
		console.log(app.user.uid);
		firebase.auth().onAuthStateChanged(function(user) {
		if (app.user) {
			userid = app.user.uid
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
	},
	mark: function(displayName,lat,long){
	var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    animation: google.maps.Animation.DROP,
    map: map,
    title: displayName

	});
	
		function toggleBounce() {
	  if (marker.getAnimation() !== null) {
	    marker.setAnimation(null);
	  } else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}
	marker.addListener('click', toggleBounce);
	
	},
	getNutrition: function(searchTerm){
		//Johns API code
	},
	getLocationandRenderMap: function(){
		navigator.geolocation.getCurrentPosition(function(position) { 
			console.log(position)
			app.lat = position.coords.latitude
			app.long = position.coords.longitude;
			map = new google.maps.Map(document.getElementById('map'), {
	  			center: {lat: app.lat, lng: app.long},
	  			zoom: 10

			});

		})
	},		
}

app.getLocationandRenderMap();

app.appRef.on("child_added", function(snapshot){
	console.log(snapshot.val().username);
	app.mark(snapshot.val().username,snapshot.val().lat,snapshot.val().long)
});


$('#mark').on('click', function(){
	if (app.user){
		app.mark(app.user.displayName,app.lat,app.long);
		app.appRef.push({username:app.user.displayName,
					  lat:app.lat,
					  long:app.long})
		}
	else{
		app.login();
		}
})

//click function logs  user in with google
$('body').on('click', '#login', function(){
	app.login();
});

//click function logs user out
$('body').on('click', '#logout', function(){
	firebase.auth().signOut().then(function() {
	  $('#auth').html('<a class="waves-effect waves-light btn" id="login">Login</a>')
	  app.user = null;
	}, function(error) {
	  // An error happened.
	});
});

//click function runs search and stores user search
$('.search').on('click', function(){
	
	app.searchTerm = $('.input').val.trim();
	
	//need to call getNutrition 
});











});