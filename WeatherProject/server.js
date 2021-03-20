//jshint esversion:6

const { ESRCH } = require("constants");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/weather.html");
});

app.post("/",function(req,res){
    const name1 = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+name1+"&units=metric&appid=562989c6c539d44664921f186572914e";
    https.get(url,function(response){

        console.log(response.statusCode);
        response.on("data",function(data){

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p><h1>The weather is currently "+weatherDescription+"</h1></p>");
            res.write("<h1>The temperature in "+name1+" is "+temp+" degree Celcius .  </h1>");
            res.write("<img src="+imageURL+">");
            res.send()
        });


    });



})


app.listen(3000,function(){
    console.log("server is starting at port 3000");
});