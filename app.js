const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const userModel = require("./model/userModel");
const ownerModel = require("./model/ownerModel");
const productModel = require("./model/productModel");

const userRoute = require("./routes/userRoute");
const ownerRoute = require("./routes/ownerRoute");
const productRoute = require("./routes/productRoute");

const db = require("./config/mongoose-connection");
db();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/user", userRoute);
app.use("/owner", ownerRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
