require("dotenv").config()
let express = require("express")
let app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
let path = require("path");

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended : true}))
app.use(methodOverride('_method'))

let users = [
    {   
        id: uuidv4(),
        username :"Adarsh",
        posts:"I am learning node.js"
    },
    { 
        id: uuidv4(),
        username :"sahas",
        posts:"I am learning backend"
    },
    {
         id: uuidv4(),
        username :"raj",
        posts:"I am learning backend in free"
    }
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{users})
})
app.get("/",(req,res)=>{
    res.redirect("/posts");
})
app.get("/posts/new",(req,res)=>{
    res.render("new_posts.ejs")
})

app.post("/posts",(req,res) =>{
    // console.log(req.body);
    // res.send("posts send sucessfully")
    let id = uuidv4();
    let {username ,posts} = req.body;
    users.push({ id,username,posts})
    res.redirect("/posts")
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    let post = users.find(e => id === e.id)
    res.render("show.ejs",{post})
})
app.get("/post/:id/editPost",(req,res)=>{
    let {id} = req.params;
    let particular = users.find(e=> id == e.id);
    // console.log(particular);
    res.render("editpage.ejs",{particular});
})
app.patch("/:id/editdedo",(req,res)=>{
    let {id} = req.params;
    let {posted} = req.body;
    let finds = users.find(e=> e.id == id);
    finds.posts = posted   
   res.redirect("/posts");
})
app.delete("/:id/deletededo",(req,res)=>{
    let {id} = req.params;
    let finds= users.find(e=> e.id == id);
    let now= users.filter(e=> e != finds);
    users = now;
    // console.log(finds);
    // console.log("now",now);
    res.redirect("/posts")
})
app.listen(process.env.PORT,()=>{
    console.log(`Adarsh port ${process.env.PORT} is listening Continously`);
})