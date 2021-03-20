//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app  = express() ;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){

    const firstName = req.body.fname ;
    const lastName = req.body.lname ;
    const email = req.body.email ;
    const data = {   //elements of data whether they are array or objects , what are the elements all are seen from mail monkey developer api and audience api 
        members: [{
            email_address : email ,
            status  : "subscribed ",
            merge_fields:{
                FNAME : firstName ,
                LNAME : lastName 
            }
        }
    ]//member is array of object , all objects are seen from mail monkey website 
    
};

const jsonDATA =  JSON.stringify(data);      // this data is the data in above formate requested from mail monkey 
 const url = "https://<dc>.api.mailchimp.com/3.0/lists/4bcf3cbb34";  // this user end point part is from code example of  mail monkey and /4b---- is the audience api id (all printed at the end of mail monkey)
 
var options = { //this is the second parameter of https request call , containing the method post()b,coz we are not just receiving
    method : "POST" ,
    auth : "ANSH_PANT:ee53ccd15f34925bdfd32e5817cfc0c6-us1"  //this is authentication and how to authenticate is written in the end

}

 https.request(url , options ,function(response){     //we were using https get method earlier  but now we will be using https request method to request data from mail monkey

    
    const request = https.request(url , options , function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonDATA);
    request.end();

});
});

app.listen(3000,function(){
    console.log("server is running at port 3000");
});

//api key
// ee53ccd15f34925bdfd32e5817cfc0c6-us1

//for authentication one just need  a random name  folloed by colon and then followed by api ID acting like password .

//audience id
//b4520f4828

//https://usX.aoi.mailchip.com/3.0/lists/4bcf3cbb34     supposed but we replace X with the value us1 //written in end of api id