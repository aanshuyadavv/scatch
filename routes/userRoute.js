const express = require("express");
const router = express.Router();

const {
  registerUserController, loginUserController, logoutUserController
} = require("../controller/authController");

const {isLoggedIn} = require("../middleware/isLoggedIn")

router.post("/register", registerUserController);
  router.post("/login", loginUserController);
router.post("/logout", isLoggedIn, logoutUserController);

module.exports = router;
