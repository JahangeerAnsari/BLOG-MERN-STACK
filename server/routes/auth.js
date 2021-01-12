const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// user is present in mongoose model (User)
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const requireLogin = require("../middleware/requireLogin");
router.get("/", (req, res) => {
  res.send(" hello from router");
});

router.post("/signup", (req, res) => {
  // distructure the fields
  console.log("======>--=====");
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    // we show processing error 422
    // we dont want further action when it comes to error
    return res.status(422).json({
      error: "Please add all the fields ",
    });
  }
  // lets save the user
  User.findOne({ email: email })
    .then((saveUser) => {
      if (saveUser) {
        // if save email  already present then return error
        res.json({
          error: "the email already present in db try another one ",
        });
      }
      // we are going to bcrypt pasaaword before creating new user

      bcrypt.hash(password, 10).then((hashedPassword) => {
        // in case new email not present save into the db
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({
              status: 1,
              message: "saved  successfully ",
              data: user,
            });
          })
          .catch((err) => {
            return res.json({
              error: err,
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: " not valid email or password" });
  }
  // check the valid email from user
  User.findOne({ email: email }).then((saveUser) => {
    // in db email is not present
    if (!saveUser) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    // in case of valid email lets comoare wt password
    bcrypt
      .compare(password, saveUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // return res.json({ message: "successfully login" });
          //in case of user login we generate the token
          // generating user id based on saveUser

          const token = jwt.sign({ _id: saveUser._id }, process.env.JWT_SECRET);
          const { _id, name, email } = saveUser;
          return res.json({
            token,
            user: { _id, name, email },
          });
        } else {
          return res.status(422).json({
            error: "Invalid email or password",
          });
        }
      })
      .catch((err) => {
        console.log(
          "=============>error while generatinh token" + JSON.stringify(err)
        );
      });
  });
});

// Lets token verify

module.exports = router;
