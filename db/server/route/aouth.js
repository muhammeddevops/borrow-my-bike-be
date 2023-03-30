const express = require("express");
const passport = require("passport");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const {loginUserController} = require("../../controllers/user.controllers")

router.post("/login", passport.authenticate("local"), loginUserController);
module.exports = router
