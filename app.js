const express=require("express");
const app=express();
const bd=require("body-parser");
const mongoose= require("mongoose");
mongoose.set("strictQuery",false);
mongoose. connect("mongodb+srv://mehulkumar:mehul%402401@cluster0.8qvjaia.mongodb.net/form");
app.use(express.static("public")); 
app.use(bd.urlencoded({extended:true}))   
app.set("view engine","ejs")
const FruitSchema= new mongoose.Schema({
  fname:String,
  lname:String,
  email:String
});  
const forms=mongoose.model("submit",FruitSchema);
app.get("/cust",function(req,res){
 forms.find(function(err,found){
    res.render("list",{arr:found});
 })
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){ 
const form= new forms({
fname:req.body.first,
lname:req.body.second,
email:req.body.email
});

form.save();
res.sendFile(__dirname+"/success.html");
});
app.post("/cus",function(req,res){
forms.findByIdAndRemove(req.body.check,function(err){
if(err)
console.log(err)
else{
  res.redirect("/cust");
}
});
});
app.listen(process.env.PORT || 3000,function(){
console.log("server is running on 3000");
});


