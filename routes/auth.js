const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
//get route
router.get('/', (req,res) => {
    res.send("Hello!");
})
//posting username and password for signup
router.post('/signup',(req,res)=> {
    //deconstruct the parameters
    const {name,email,password} = req.body
    if(!name || !email || !password) {
        res.status(422).json({error:"please add all the required fields"})
    }
    //check to see if the email exists by running a query with that email
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists"})
        }
        //create a user variable to hold the User constructor Schema object
        const user = new User({
            email,
            name,
            password
        })
        //call the user object to save, then respond with json that its saved. catch any errors in console.
        user.save()
        .then(userData=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err);
        })
    })
    //catch error if the find one does work
 .catch(err => {
     console.log(err);
 })
    
})


module.exports = router;