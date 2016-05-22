function getNutrition(searchTerm){

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

        $('#facts').html('');
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
  


} //$('#nutritionTable').append(<p>'<hr></p>');