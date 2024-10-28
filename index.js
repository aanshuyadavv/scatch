const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const userModel = require("./model/userModel");

const session = require("express-session");
const flash = require("connect-flash");
const cookies = require("cookie-parser");

const dotenv = require("dotenv").config();

const userRoute = require("./routes/userRoute");
const ownerRoute = require("./routes/ownerRoute");
const productRoute = require("./routes/productRoute");

const db = require("./config/mongoose-connection");
const { isLoggedIn } = require("./middleware/isLoggedIn");
db();

app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// console.log(process.env.NODE_ENV);

app.use(
  session({
    secret: "session-flash",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

app.use("/user", userRoute);
app.use("/owner", ownerRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error });
});

app.get("/login", (req, res) => {
  const error = req.flash("error")
  res.render("login", {error});
});

app.get("/cart", isLoggedIn, async (req, res) => {
  const cartData = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  const carts = cartData.cart;
  const totalPrice = carts.reduce((acc, item) => acc + (item.price || 0), 0);
  // console.log(totalPrice)
  res.render("cart", { carts, totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
