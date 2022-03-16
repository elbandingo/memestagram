const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req,res, next)=> {
    //deconstruct the request header into an object
    const {authorization} = req.headers
    //check if auth isnt present
    if(!authorization) {
      return res.status(401).json({error:"you must be logged in to view this page"})
    }
    //if its present
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({error:"you must be logged in to view this page"})
        }
        //deconstruct the payload, and get the ID
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata;
            next();
        })
        
    })
}