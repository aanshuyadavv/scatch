const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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

  isAdmin: {
    type: Boolean,
    required: true,
  },

  profilepic: {
    type: String,
    default: "anshu.jpg",
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
