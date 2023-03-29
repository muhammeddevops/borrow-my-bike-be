const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptJs = require("bcryptjs");
const User = require("../../index");
const session = require("express-session");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});




passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },

    (username, password, done) => {

      User.findOne({ username: username }, (err, user) => {

        if (err) {
          return done(err);
        }
        if (!user) {
          newUser = new User({ email, password, username });
          newUser
            .save()
            .then((user) => {
              return done(null, user);
            })
            .catch((err) => {
              return done(null, false, { message: "save error" });
            });
        } else {
          bcryptJs.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              console.log("line 32");
              return done(null, user);
            } else {
              console.log("line 35");

              return done(null, false);
            }
          });
        }
      });
    }
  )
);

// exports.isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   else res.status(401).send({ loggedIn: false });
// };

module.exports = { passport };
