const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  signup,
  registerUser,
  login,
  homepage,
  logoutUser
} = require("../controllers/userControllers");
const { login_required, noauth_required } = require("../utils/permissions");


/*
 * url patterns
 **/

router.route("/")
  .get(login_required, homepage)


router.route("/signup")
  .get(noauth_required, signup)
  .post(registerUser)


router.route("/logout")
  .get(login_required, logoutUser)


router.route("/signin")
  .get(noauth_required, login)
  .post(passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "signin",
    failureFlash: true
  }))


module.exports = router;

