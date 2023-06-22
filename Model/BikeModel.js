var mongoose = require('mongoose')
var BikeSchema = mongoose.Schema(
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
var BikeModel = mongoose.model("BIKE", BikeSchema, "bike");
module.exports = BikeModel;