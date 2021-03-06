const passport = require("passport");
const User = require("../models/user")

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (email, done) {
  User.findOne({ email }).lean().exec((err, user) => {
    if (err) {
      return done(err, null);
    }
    return done(null, user)
  })
});

const LoginStrategy = require("./SigninStrategy");
const SignupStrategy = require("./SignupStrategy");

passport.use("local-signin", LoginStrategy);
passport.use("local-signup", SignupStrategy);

module.exports = passport;