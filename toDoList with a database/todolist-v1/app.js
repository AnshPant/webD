//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const app = express();

app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/todolistDB', {  useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const itemsSchema = {
  name: String 
};
const Item  = mongoose.model("Item",itemsSchema) ;

const item1 = new Item({
  name  : "Welcome to your TO DO LIST ! "
});
const item2 = new Item({
  name : " Hit + button to add to your list ! "
});

const item3 = new Item({
  name : "<-- Hit this to delete the item . "
});

const defaultItems = [item1 , item2 , item3];

const listSchema ={
 name:String ,
  items: [itemsSchema]
};
const List = mongoose.model("List",listSchema);

// Item.insertMany(defaultItems,function(err){
//   if(err){
//     console.log(err);

//   }

//   else{
//     console.log("Successfully saved default item to database ! ");
//   }
// });









app.get("/", function(req, res) {

const day = date.getDate();
 


Item.find({},function(err,foundItems){
  if(foundItems.length===0){
  if(err){
    console.log(err);
  }
  else{
  console.log("successfully logged ! ");
  res.redirect("/");
  }
} else {
  res.render("list", {listTitle: day, newListItems: foundItems});
}
}) ;




  

});

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  
  List.findOne({name: customListName},function(err,foundList){
    if(!err){
      if(!foundList) {
        //create a new list
        const list = new List({
          name: customListName ,
          items : defaultItems
        }) ;
        list.save(); 
        res.redirect("/"+customListName);
      }
      else{
        //show the existing list 
        res.render("list", {listTitle: foundList.name , newListItems: foundList.items});
      }
      
    
  }
});
  
});

app.post("/", function(req, res){

 const itemName = req.body.newItem;
 const listName = req.body.list;

 const item = new Item({
    name : itemName 
 });
 
 if(listName==="Today"){
   
 item.save();
 res.redirect("/");

 }
 else {
   List.findOne({name: listName} , function(err , foundList){
     foundList.items.push(item);
     foundList.save();
     res.redirect("/"+ listName);
   });
 }
  
});


app.post("/delete",function(req,res){
  const check_id = req.body.checkbox ;
  const listName = req.body.listName ;  

if(listName=== "Today"){
  Item.findByIdAndRemove(check_id,function(err){
    if(err) console.log(err);
    else console.log("successfully removed checked item ");   //this function delete only when callback is received
    res.redirect("/")
  });
}
else {
  List.findOneAndUpdate({name: listName},{$pull: {items: {_id: check_id}}}, function(err){
    if(!err) res.redirect("/"+listName); 
  });
}

  
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
