const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const e = require('express');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

const articleSchema = {
title:String ,
content: String
};

const Article = mongoose.model("Article",articleSchema);


app.route("/articles")

//////////////request targetting all articles
.get(function(req,res){
    Article.find(function(err  , foundItems){
        if(!err){
        res.send(foundItems);}
        else{
            res.send(err);
        }
    });
})


.post(function(req,res){
   
    

    const newArticle = new Article({
        title :  req.body.title ,
        content : req.body.content
    });
    newArticle.save();
    })
    
    
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles");
        }
        else 
        {
            res.send(err);
        }
    });
});


///////request targeting specific articles

app.route("/articles/:articleTitle")
.get(function(req,res){
    
    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("no article was found");
        }

    });
})
.put(function(req,res){
    Article.updateOne(
        { title:req.params.articleTitle} ,
        {title:req.body.title , content : req.body.content},
        {overwrite:true},
        function(err){
        if(!err){
            res.send("successfully updated the article");
        }
        }
        )
})
.patch(function(req,res){
    Article.updateOne(
        {title: req.params.articleTitle },
        {$set: req.body},
        function(err){
            if(!err){
                res.send("successfully patched");
            }
            else {
                res.send(err);
            }
        }
    )
})
.delete(function(req,res){
    Article.deleteOne(
        {title : req.params.articleTitle},
        function(err){
            if(!err)
            res.send("successfully deleted!");
            else
            res.send(err);
        }
        
    );
});













app.listen("3000",function(){
    console.log("server is working on local host 3000 ");

});