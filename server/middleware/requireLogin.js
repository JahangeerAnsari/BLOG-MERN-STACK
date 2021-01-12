const { json } = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  // get token from header
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      status: 0,
      error: "You must be logged in first",
    });
  }
  let token = authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 0,
        error: "you must be logged in first",
        error: err,
      });
    }
    else {
      const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
     
      next();
    });
    }
    
  });
};
