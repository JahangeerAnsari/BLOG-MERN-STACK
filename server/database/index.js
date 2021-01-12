const mongoose = require('mongoose')
mongoose
.connect("mongodb://localhost/instadata",
{
    useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>{
    console.log("mongodb is connected");
}).catch((err) =>{
    console.log(err);
})



