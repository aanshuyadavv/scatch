const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
  },
  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  panelcolor: {
    type: String,
    required: true,
  },
  textcolor: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("ProductModel", productSchema);
module.exports = ProductModel;
