const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptJs = require("bcryptjs");
const User = require("../../models/user.models");
const session = require("express-session");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, ).then((user) => {
      bcryptJs.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false); // always getting to this point no matter what
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.find({ _id: _id }).then((data) => {
    done(null, data);
  });
});

// exports.isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   else res.status(401).send({ loggedIn: false });
// };

module.exports = passport;
