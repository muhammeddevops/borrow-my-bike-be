const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptJs = require("bcryptjs");
const User = require("../../db/index.js")
const session = require('express-session');


passport.use(
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcryptJs.compare(password, user.password, (err, res)=>{
        if(res){
            return done(null, user)
        }else{
            return done(null, false)
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });


  exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.status(401).send({ loggedIn: false });
  };

  module.exports = passport;

