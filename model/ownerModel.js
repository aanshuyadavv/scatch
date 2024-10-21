const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  profilepic: {
    type: String,
    default: "anshu.jpg",
  },
  products: {
    type: Array,
    default: [],
  },
  gstin: {
    type: String,
    required: true,
  },
});

const OwnerModel = mongoose.model("OwnerModel", ownerSchema);
module.exports = OwnerModel;
