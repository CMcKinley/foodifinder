
$(document).ready(function(){

var app = {
	user:undefined,
	lat:undefined,
	long:undefined,
	search: undefined,
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
		$('#auth').html('<a class="waves-effect waves-light btn txtbtn red darken-4" id="logout">Logout</a>')
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
	$('form').html('<div class="row center"><div class="input-field col l4 push-l4 m8 push-m2 s10 push-s1"><input id="user_food" type="text" class="validate" required="" aria-required="true"><label for="user_food">Search</label></div><div class="input-field col s12"><button id="search" class="waves-effect waves-light btn-large txtbtn red darken-4" type="submit" name="action" value="Submit">Submit</button></div></div>');



	},
	mark: function(displayName,lat,long,item){
	var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    animation: google.maps.Animation.DROP,
    map: map,
    title: displayName + ' likes ' + item

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
		//Johns API codefunction getNutrition(searchTerm){

		// ajax to retrieve one specific item from nutritionix and append into a Nutrition Facts Table(JR)
		// can be easily changed to allow for a for loop 
		  var nutTerm = searchTerm; 
		  var api = 'https://api.nutritionix.com/v1_1/search/'+nutTerm+'?results=0:1&fields=*&appId=43d52858&appKey=ff2334d3f72d7f6eab7c3e5bc182846a'
		  var i = 0;
		  var request = {
		    url: api,
		    method: 'GET'
		   };

		   $.ajax(request).done(function(response) {
		    console.log(response);
		    
		    console.log(response.hits[0].fields.item_name);

		        $('#facts').empty();
		        $('#facts').append('<div id="nutritionTable"></div>');
		        $('#nutritionTable').append('<p id="nutH1">Nutrition Facts</p>');
		        $('#nutritionTable').append('<p id="nutH2">'+response.hits[i].fields.item_name+'<p>');
		        $('#nutritionTable').append('<p id="nutH2">Serving Size: '+response.hits[i].fields.nf_serving_size_qty+' '+response.hits[i].fields.nf_serving_size_unit+' ('+response.hits[i].fields.nf_serving_weight_grams+'g)<p>');
		        $('#nutritionTable').append('<hr id="hrLarge">');
		        $('#nutritionTable').append('<p id="nutH3"><b>Amount per Serving</b></p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3"><b>Calories</b> '+Math.round(response.hits[i].fields.nf_calories)+'<span id="textRightH3">Calories from Fat '+Math.round(response.hits[i].fields.nf_calories_from_fat)+'</span></p><hr id="hrMedium">');
		        $('#nutritionTable').append('<p id="nutH3"><span id="textRightH3"><b>% Daily Value</b></span></p><br>');
		        $('#nutritionTable').append('<hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3"><b>Total Fat</b> '+Math.round(response.hits[i].fields.nf_total_fat)+'g<span id=textRightH3><b>'+Math.round(response.hits[i].fields.nf_total_fat/65*100)+'%</b></p><hr id="hrSmallRight">');
		        $('#nutritionTable').append('<p id="nutH3Indent">Saturated Fat '+Math.round(response.hits[i].fields.nf_saturated_fat)+'g<span id=textRightH3><b>'+Math.round(response.hits[i].fields.nf_saturated_fat/20*100)+'%</b></p><hr id="hrSmallRight">');
		        $('#nutritionTable').append('<p id="nutH3Indent"><span id="tIndent">Trans</span> Fat '+Math.round(response.hits[i].fields.nf_trans_fatty_acid)+'g</p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3"><b>Cholesterol</b> '+Math.round(response.hits[i].fields.nf_cholesterol)+'mg<span id=textRightH3><b>'+Math.round(response.hits[i].fields.nf_cholesterol/300*100)+'%</b></p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3"><b>Sodium</b> '+Math.round(response.hits[i].fields.nf_sodium)+'mg<span id=textRightH3><b>'+Math.round(response.hits[i].fields.nf_sodium/2400*100)+'%</b></p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3"><b>Total Carbohydrates</b> '+Math.round(response.hits[i].fields.nf_total_carbohydrate)+'g<span id=textRightH3><b>'+Math.round(response.hits[i].fields.nf_total_carbohydrate/300*100)+'%</b></p><hr id="hrSmallRight">');
		        $('#nutritionTable').append('<p id="nutH3Indent">Dietary Fiber '+Math.round(response.hits[i].fields.nf_dietary_fiber)+'g<span id=textRightH3><b>'+Math.round(response.hits[i].fields.nf_dietary_fiber/25*100)+'%</b></p><hr id="hrSmallRight">');
		        $('#nutritionTable').append('<p id="nutH3Indent">Sugars '+Math.round(response.hits[i].fields.nf_sugars)+'g</p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3"><b>Protein</b> '+Math.round(response.hits[i].fields.nf_protein)+'g</p><hr id="hrLarge">');
		        $('#nutritionTable').append('<p id="nutH3">Vitamin A<span id=textRightH3>'+Math.round(response.hits[i].fields.nf_vitamin_a_dv)+'%</p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3">Vitamin C<span id=textRightH3>'+Math.round(response.hits[i].fields.nf_vitamin_c_dv)+'%</p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3">Calcium<span id=textRightH3>'+Math.round(response.hits[i].fields.nf_calcium_dv)+'%</p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3">Iron<span id=textRightH3>'+Math.round(response.hits[i].fields.nf_iron_dv)+'%</p><hr id="hrSmall">');
		        $('#nutritionTable').append('<p id="nutH3">* Percent Daily Values are based on a 2000 calorie diet.</p>');

		   }); // end $.ajax(request).done(function(response)

		// end ajax code nutritionix (JR)
		  


	 //$('#nutritionTable').append(<p>'<hr></p>');
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
	app.mark(snapshot.val().username,snapshot.val().lat,snapshot.val().long, snapshot.val().item)
});


$('#mark').on('click', function(){
	if(app.search){
		if (app.user){
		app.mark(app.user.displayName,app.lat,app.long);
		app.appRef.push({username:app.user.displayName,
					  lat:app.lat,
					  long:app.long,
					  item: app.searchTerm})
		}
	else{
		app.login();
		}
	}
})

//click function logs  user in with google
$('body').on('click', '#login', function(){
	app.login();
});

//click function logs user out
$('body').on('click', '#logout', function(){
	firebase.auth().signOut().then(function() {
	  $('form').html('<div class="row center"><ul><li id="auth"><a class="waves-effect waves-light btn-large txtbtn red darken-4" id="login">Login</a></li></ul></div><br><br>');
	  $('#auth').empty();
	  app.user = null;
	}, function(error) {
	  // An error happened.
	});
});

//click function runs search and stores user search
$('body').on('click','#search', function(e){
	e.preventDefault();
	
		if( $('#user_food').val().trim() ){
		app.searchTerm = $('#user_food').val().trim();
	
		app.getNutrition(app.searchTerm);
		app.search = true;
	}
	else{




	}

	
	
	
	return false;
});











});