const express = require("express");
const router = express.Router();
const ownerModel = require("../model/ownerModel");
const { isLoggedIn } = require("../middleware/isLoggedIn");

if (process.env.NODE_ENV) {
  router.post("/create", isLoggedIn, async (req, res) => {
    try {
      const owners = await ownerModel.find({});
      if (owners.length > 0) {
        return res.send("you don't have permission to create a new owner");
      }
      const { fullname, email, password } = req.body;
      const newOwner = new ownerModel({ fullname, email, password });
      newOwner.save();
      res.send("owner created successfully");
    } catch (error) {
      consoel.log(error.message);
    }
  });
}

router.get("/admin", isLoggedIn, async (req, res) => {
  res.render("createProducts");
});


module.exports = router;
