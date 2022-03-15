const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin')

//how to validate someone by token using middleware
router.get('/protected', requireLogin, (req,res)=>{
    //verify a user that they are carrying the appropriate token
    res.send("hello user")
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
        //create a user variable to hold the User constructor Schema object, ensure the password is hashed
        bcrypt.hash(password, 12)
        .then(hashedPass=>{
            const user = new User({
                email,
                name,
                password:hashedPass
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

    })
    //catch error if the find one does work
 .catch(err => {
     console.log(err);
 })
    
})

//post route to validate the sign in if no email, send that, if password doesnt match, send that.
router.post('/signin', (req,res) => {
    const {email,password} = req.body
    if(!email || !password) {
        return res.status(422).json({error: "Please provide email or password"})
    }

    User.findOne({email:email})
    .then(user => {
        if(!user) {
            return res.status(422).json({error:"Invalid Username or does not exist!"})
        }

        //check if the password matches
        bcrypt.compare(password, user.password)
        .then(doMatch=>{
            if(doMatch) {
                //res.json({message:"successful sign in!"})
                //send them a token if successfully signed in
                const token = jwt.sign({_id:user._id}, JWT_SECRET)
                res.json({token})


            } else {
                return res.status(422).json({error:"invalid password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router;