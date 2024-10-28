const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
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
  },
});

const OwnerModel = mongoose.model("OwnerModel", ownerSchema);
module.exports = OwnerModel;
