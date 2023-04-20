const express=require("express");
const bodyParser = require("body-parser");
const app = express();

const date = require(__dirname + "/date.js");   // importing the date module

// console.log(date);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine","ejs");

var items = ["I got the Job"," I am very happy","I am very very happy"];
var workItems=[];
app.get("/", (req, res) => {

    const day = date.getDate();

    res.render("list",{listTitle: day, newListItems: items });
});


app.listen(3000,()=>{
    console.log("listening on 3000");
});

app.post("/",function(req,res){
    console.log(req.body);
    const item = (req.body.newItem);

    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workItems});
});

app.post("/work",function(req,res){
    const item = (req.body.newItem);
    workItems.push(item);
    res.redirect("/");
});

app.get("/about",function(req,res){
    res.render("about");
})