const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const {productCreate, productShop, productAddtocart} = require("../controller/authController")

router.post("/create", isLoggedIn, upload.single("image"), productCreate);

router.get("/shop", isLoggedIn, productShop);

router.get("/addtocart/:id", isLoggedIn, productAddtocart)

module.exports = router;
