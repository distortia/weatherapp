var https = require('https');
function printMessage(summary, temp, chill, wind, future){
 var message =  "The current weather is " + summary +
                ".\nTemperature: " + temp + "\u00b0F, with wind chill: " + chill + 
                "\u00b0F.\nWindspeed: " + wind + 
                "MPH.\nIt will be " + future;  
  console.log(message);
}
//print error messages
function printError(error){
  console.error(error.message);
}
//static location based on office location for now
var latitude = "39.9670768";
var longitude = "-83.0027349";
var request = https.get('https://api.forecast.io/forecast/80f71455dfe8a1e882ba6adf75b6ccf1/' + latitude + ',' + longitude, function(response) {
    var body = "";
  //Read the data
   response.on('data', function (chunk) {
    body += chunk;      
      });
  response.on('end',function(){
    if(response.statusCode === 200){
      try{
      var weatherapp = JSON.parse(body);
      printMessage(weatherapp.currently.summary, 
                   weatherapp.currently.temperature,
                   weatherapp.currently.apparentTemperature,
                   weatherapp.currently.windSpeed,
                   weatherapp.hourly.summary);
      }
      catch(error){
        //parse error
        printError(error);
      }
  }
    else{
      //status code error
      printError({message: "There was an error getting the weather for " + location +           ". (" + http.STATUS_CODES[response.statusCode] +")"});
    }
    });
  });  
  //connection error
  request.on("error", printError);        
