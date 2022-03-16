const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post");

//creating a post rpite
router.post('/createpost',requireLogin,(req,res)=>{
    //deconstruct the request to an object
    const {title,body} = req.body
    if(!title || !body) {
       return res.status(422).json({err:"you must include a title and body"})
    }
    //console.log(req.body)
    //res.send("ok")
    //if there is enough data, create the post, but ensure the password does not pass through
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.user
    })

    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;