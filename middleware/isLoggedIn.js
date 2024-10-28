const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Log in first");
    res.redirect("/login");
    return;
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await User.findOne({ email: decoded.email });
    req.user = user;
    next();
  } catch (error) {
    req.flash("Log in first");
    res.redirect("/");
  }
};
