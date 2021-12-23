const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(null, false);
        if (!user) return done({username:"wrong username"} , false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return done(null, false);
          if (result) return done(null, user);
          else return done({passw:"wrong password"}, false);
        })
      })
    })
  )

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
