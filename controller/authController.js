const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("../model/userModel");
const productModel = require("../model/productModel");

router.use(cookieParser());

module.exports.registerUserController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.send("fill all details");
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      req.flash("error", "user already exists");
      res.redirect("/");
      return;
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send("Server error");

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).send("Server error");

        const newUser = new User({ fullname, email, password: hash });
        await newUser.save();
        jwt.sign(
          { email, id: newUser._id },
          process.env.JWT_KEY,
          (err, token) => {
            if (err) return res.status(500).send("Token generation error");
            res.cookie("token", token);
            req.flash("success", "User registered successfully");
            res.redirect("/product/shop");
            return;
          }
        );
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please fill all details");
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      req.flash("error", "Something wennt wrong.");
      res.redirect("/");
      return;
    }

    bcrypt.compare(password, existUser.password, async (err, result) => {
      if (err)
        return res.status(500).send("Server error during password comparison");

      if (result) {
        jwt.sign(
          { email, id: existUser._id },
          process.env.JWT_KEY,
          (err, token) => {
            if (err) return res.status(500).send("Token generation error");
            res.cookie("token", token);
            // console.log(req.cookies)
            req.flash("success", "Login successful");
            res.redirect("/product/shop");
            return;
          }
        );
      } else {
        req.flash("error", "Something went wrong.");
        res.redirect("/");
        return;
      }
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};
module.exports.logoutUserController = async (req, res) => {
  try {
    res.cookie("token", "");
    // console.log("logged out yay");
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
};

module.exports.productCreate = async (req, res) => {
  try {
    const { name, price, discount, brand, panelcolor, textcolor } = req.body;
    const newProduct = new productModel({
      image: req.file.buffer,
      name,
      price,
      discount,
      brand,
      panelcolor,
      textcolor,
    });
    await newProduct.save();
    req.flash("success", "Product Created");
    res.redirect("/product/shop");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.productShop = async (req, res) => {
  const products = await productModel.find({});
  const success = req.flash("success");
  res.render("shop", { products, success });
};
module.exports.productAddtocart = async (req, res) => {
  // console.log(req.user);
  const { id } = req.params;
  const findUser = await UserModel.findOne({ email: req.user.email });
  findUser.cart.push(id);
  await findUser.save();
  req.flash("success", "added to cart");
  res.redirect("/product/shop");
};
