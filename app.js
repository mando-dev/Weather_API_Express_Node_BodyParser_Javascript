const express = require("express");
const https = require("https");//no need to download, its native
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));/// code necessary to be able to parse through the body of the post request

app.get("/", function(require, response){
response.sendFile(__dirname + "/index.html");//sending html over to the browswer
    })
app.post("/", function (request, response){// had to download npm i body-parser
     //catching the post request being asked fro the html file 
    const query = request.body.cityName;     //calling from html //body-parser allows to fetch data from hmtl body
    const apiKey = "9b858447449a325ebb734eb0b20c3060";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey  + "&units=" + unit ;

https.get(url, function(res){//'url' hre is same as url above. //this callback function is going to get us back a resonse
    console.log(res.statusCode);// this will display the 200 
    res.on("data", function(data){//the 'on()' method-this will be called when we receive some 'data'
    const weatherData = JSON.parse(data)//json parsing/analyzing/breaking downs the weather api data. Or turning into js objects. Once json is parsed into a js object its stored in memory                   
    const temp = weatherData.main.feels_like // from json file. Now its an js object
    const weatherDescription = weatherData.weather[0].description// weather description is our json object
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    response.write("<p>weather is currently " + weatherDescription +  " </p>");
    response.write("<h1>the temp in " + query + " is " + temp + " degress Celcius </h1>")// we can only have one 'response.send()'
    response.write("<img src=" + imageURL + ">")
    response.send()
}) 
})
})


app.listen(3005, function(){
console.log("server runnin");
})