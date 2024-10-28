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
  profilepic: {
    type: String,
    default: "anshu.jpg",
  },
  cart: [{ type: Schema.Types.ObjectId, ref: 'ProductModel' }],
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
  },
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
