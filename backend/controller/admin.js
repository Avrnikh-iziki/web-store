
const User = require("../models/User");
const connectDB = require('../config/db');
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../config/pasportConfig")(passport);


const register = async (req, res, next) => {
  connectDB();
  if (req.body.username) {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.json({ errs: { user: "User Already Exists" } });
      else {
        if (req.body.username.length < 10) {
          res.json({ errs: { user: "username should be more than 10 characters" } })
        } else {
          if (req.body.password) {
            if (req.body.password.length < 8) {
              res.json({ errs: { password: "password is to short" } })
            } else {
              if (/(?=.*\d)(?=.*[a-z])/.test(req.body.password)) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                  username: req.body.username,
                  password: hashedPassword,
                });
                await newUser.save();
                res.json({ success: "user created" });

              } else {
                res.json({ errs: { password: "password must contain letter and number" } })
              }
            }
          } else {
            res.json({ errs: { password: "password is required" } })
          }
        }
      }
    })
  } else res.json({ errs: { user: "username is required" } })
}

const getuser = async (req, res, next) => {
  connectDB();
  try {
    const users = await User.find({});
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getoneuser = async (req, res, next) => {
  connectDB();
  try {
    const users = await User.findById(req.params.id);
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const login = async (req, res, next) => {
  connectDB();
  passport.authenticate("local", (err, user) => {
    if (err) res.json({ stat: false, errs: err });
    else {
      req.logIn(user, (err) => {
        if (err) res.json({ stat: false, errs: err });
        else res.json({ stat: req.session.passport.user });
      });
    }
  })(req, res, next);
}

const delet = async (req, res, next) => {
  connectDB();
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: "user deleted" }))
    .catch(err => res.json({ faild: "faild to remove user" }));
}

const updateUser = async (req, res, next) => {
  connectDB();
  if (req.body.username) {
    User.findById(req.params.id)
      .then(use => {
        User.findOne({ username: req.body.username, _id: { $ne: req.params.id } }, (err, user) => {
          if (err) throw (err)
          if (user) res.json({ errs: { user: "user already exists " } })
          else {
            if (req.body.username.length < 10) {
              res.json({ errs: { user: "username should be more than 10 characters" } })
            } else {
              if (req.body.password) {
                if (req.body.password.length < 8) {
                  res.json({ errs: { pass1: "password is to short" } })
                } else {
                  if (/(?=.*\d)(?=.*[a-z])/.test(req.body.password)) {
                    use.username = req.body.username;
                    bcrypt.compare(req.body.password2, use.password, async (err, result) => {
                      if (err) throw err
                      if (result) {
                        use.password = await bcrypt.hash(req.body.password, 10);
                        use.save()
                          .then(() => res.json({ success: { success: "product updated" } }))
                          .catch(err => res.json({ success: { err: "faild to updat user" } }))
                      } else {
                        res.json({ errs: { pass2: "password don't match" } })
                      }
                    })
                  } else res.json({ errs: { pass1: "password1 must contain letter and number" } })
                }
              } else res.json({ errs: { pass1: "password1 is required" } })
            }
          }
        })
      })
      .catch(err => res.json({ succes: { err: "faild to updat user" } }))
  } else res.json({ errs: { user: "username is required" } })
}

module.exports = {
  getuser,
  register,
  login,
  delet,
  getoneuser,
  updateUser,
};