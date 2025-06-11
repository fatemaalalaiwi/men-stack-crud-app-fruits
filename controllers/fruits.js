
// redirect -> same page
// render -> it will call it as new page


// to link
const Fruit = require('../models/fruit');

const router = require('express').Router();


router.get('/fruits/new', async (req,res)=>{
    res.render("fruits/new.ejs")
});



// POST /fruits
router.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});

//read all -index page
router.get("/fruits", async(req,res)=> {
  const fruits = await Fruit.find();
res.render("fruits/index.ejs",{fruits})})

// Read one - show page
router.get("/fruits/:fruitId", async (req,res) =>{
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", {fruit});
});

// GET - Edit page
router.get("/fruits/:fruitId/edit", async (req, res) =>{
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", { fruit });
});

// PUT - Update 
router.put("/fruits/:fruitId", async (req, res) => {
  if(req.body.isReadyToEat === "on"){
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  res.redirect(`/fruits/${req.params.fruitId}`);
});

// Delete
router.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

module.exports=router;