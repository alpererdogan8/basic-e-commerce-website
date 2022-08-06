const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  img: String,
  productName: String,
  price: Number,
  quantity: Number,
});
module.exports = mongoose.model("Products", ProductsSchema);
