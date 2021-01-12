const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const morgan = require('morgan');
require("./database/index");
require("./model/user");
require("./model/post");

const dotenv = require("dotenv");
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//initail route
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

//middleware
const customiddleware = (req, res, next) => {
  console.log("middleware is executed");
  next();
};

// app.use("/", });

app.get("/", (req, res) => {
  console.log(" home");
  res.send(" hello from backend ");
});

app.get("/about", customiddleware, (req, res) => {
  console.log("about");
  res.send(" about Page ");
});


app.listen(PORT, () => {
  console.log("backend running on ", PORT);
});
