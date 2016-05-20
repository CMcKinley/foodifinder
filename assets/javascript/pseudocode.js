//This file should be used as a reference for the flow of the javascript code for the overall app.

//first we will need to define our api search functions

//Dawn's code will go in here, the earched term the we get either from onCLick of searchbox, buttons, or the initial data we get from firebase will get passed into this function
function getPinterest(searchTerm){

} 
//This code will take the search term, pass it into the search query url to search for 3 pins to then grab from the response and dynamically update to the screen with jquery

//John's code will go in here
function getNutrition(searchTerm){



} 
//This code will take the search term, pass it into the search query  to search for nutrition facts to then grab from the response and dynamically update to the screen with jquery


//The user logs in with facebook
if (user already exists in firebase) {
	grab their data
}
else{
	create new user object in firebase
}
//the data that is grabbed on login will be that user's last searched item and the top 6 trending searches from its own seperate object in firebase
//the trending info will be used to dynamically create buttons and display to screen
//the user's last searched term will be passed into our api search functions to then show suggested recipies to the screen using jquery

//an onclick function will be assigned to the search box submit button. When clicked, the value will be grabbed (and validated) and stored in our searchTerm variable that gets passed into our api functions
// then we call our API functions
// the searchTerm will also be used to update our last searched item in our user object in firebase and be sent to our trending items object in firebase
$('searchBox').on('click', function(){

getPinterest(searchTerm);
getNutrition(searchTerm);
});

//a second on click function is needed for the trending buttons that takes the text from the button and uses that as the searchTerm and does the same thing as our previous onn click function.
$('trendingButtons').on('click', function(){

getPinterest(searchTerm);
getNutrition(searchTerm);
});
