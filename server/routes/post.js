const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin")
 const Post = mongoose.model("Post");
 

 // fetch all the postw
 router.get('/allpost',(req,res) => {
      Post.find()
      .populate("postedBy","_id name")      
      .then(posts => {
          res.json({posts})
      })
      .catch(err => {
          console.log(err);
      })
 })

router.post("/createpost" ,requireLogin, (req,res) => {
    const {title,body,photo} = req.body
    if(!title || !body || !photo){
        console.log(title,body,photo);
     return   res.status(422).json("Please add all the fields")
    }
    req.user.password =undefined
    const post = new Post({
        title,
        body,
        photo:photo,
        postedBy: req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err);
    })
})

  // myProfile post

  router.get('/mypost',requireLogin,(req,res) => {
      Post.find({postedBy:req.user._id})
      .populate("postedBy","_id name")  
      .then(mypost =>{
        //   console.log(mypost)
          res.json(mypost)
      })
      .catch(err=>{
          console.log(err)
      })
  })

  // update the likes
  router.put('/like',requireLogin,(req,res) =>{
      Post.findByIdAndUpdate(req.body.postId,{
          // pushing the likes in who has like 
          $push:{likes:req.user._id}
      },{
        // old record  
        new:true
      }).exec((err,result) => {
          if(err){
              return res.status(422).json({error:err})
          }else{
              res.json(result)
          }
      })
  })


   // update the likes
   router.put('/unlike',requireLogin,(req,res) =>{
    Post.findByIdAndUpdate(req.body.postId,{
        // pushing the likes in who has like 
        $pull:{likes:req.user._id}
    },{
      // old record  
      new:true
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

 // update the likes
 router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})




module.exports = router;