
const { name } = require('ejs');

// (1) Create the schema
// (2) Link the schema to a Model
// (3) Export the Model
// Before we define our model, we must first import the mongoose library 
const mongoose = require('mongoose');

//defining our schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean
})



// create model
//use a capital letter for database model names, so name your model Fruit
// This method takes two arguments: the name of the model and the schema to apply to that model.
const Fruit = mongoose.model("Fruit", fruitSchema);

module.exports = Fruit;