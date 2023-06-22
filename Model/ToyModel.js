var mongoose = require('mongoose')
var ToySchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      origin: String,
      material: String, 
      quantity: String,
      image: String,
      price: Number
   }
)
var ToyModel = mongoose.model("TOY", ToySchema, "toy_story");
module.exports = ToyModel;
