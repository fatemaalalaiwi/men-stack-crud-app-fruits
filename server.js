


const dotenv =require('dotenv');
// Loads the environment variables from .env file
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");
 const path = require("path");

//database connection
// Connect to MongoDB using the connection string in the .env file (MONGODB_URI)
mongoose.connect(process.env.MONGODB_URL);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


const app= express();
const port = 3003;



// DB connection code

 //parse the form body data -> reterive the data from the form body
// order matters in the middleware)
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method")); 
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));


// Import the Fruit model from models directiry
const Fruit = require("./models/fruit.js");



//=================================
// //Require Abort Controller

const fruitCtrl = require('./controllers/fruits');

// //use Controller
app.use('/', fruitCtrl)
//=================================

//API / Router
app.get("/", async(req,res)=> {
    res.render("index.ejs");
});



// we keep them in controller folder
// GET /fruits
// app.get("/fruits", async (req, res) => {
//   const allFruits = await Fruit.find();
//   console.log(allFruits); // log the fruits!
//   res.send("Welcome to the index page!");
// });


// we keep them in controller folder
// GET /fruits/new
// app.get("/fruits/new", (req, res) => {
//  res.render("fruits/new.ejs");
// });






// we keep them in controller folder
// POST /fruits //  to handle form submissions for creating new fruits in our database
// app.post("/fruits", async (req, res) => {
//   if (req.body.isReadyToEat === "on") {
//     req.body.isReadyToEat = true;
//   } else {
//     req.body.isReadyToEat = false;
//   }
//   await Fruit.create(req.body);
//   res.redirect("/fruits/new");
// });




app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
});
