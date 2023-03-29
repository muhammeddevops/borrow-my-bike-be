const express = require("express");
const passport = require("passport");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;


router.post("/register_login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err});
    }
    if (!user) {
      return res.status(400).json({ errors: "no user found"});
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ succes: "logged in" });
    });
  })(req, res, next);
});

module.exports = {router};
