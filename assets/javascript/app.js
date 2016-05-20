//--------------------------------------------------------
//               App.js for Foodifinder
//--------------------------------------------------------

$(document).ready(function(){
  

// ajax to retrieve specific info from nutritionix

  var searchItem='lasagna';
  var api = 'https://api.nutritionix.com/v1_1/search/'+searchItem+'?results=0:1&fields=item_id,images_front_full_url&appId=43d52858&appKey=ff2334d3f72d7f6eab7c3e5bc182846a'

  var request = {
    url: api,
    method: 'GET'
   };

   $.ajax(request).done(function(response) {
    console.log(response);
    
    console.log(response.hits[0].fields.item_id);
    
    var searchFood = response.hits[0].fields.item_id;

    
   }); // end $.ajax(request).done(function(response)
   
// end ajax code nutritionix


  }); // end $(document).ready(function(){