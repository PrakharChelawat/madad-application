const express=require('express')
const router=express.Router()
const mongoose= require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const { JWT_SECRET }=require('../keys')
const requiredLogin =require('../middleware/requiredLogin')
router.get('/protected',requiredLogin,(req,res)=>{
    res.send("hello User")
})
router.post('/signin',(req,res)=>{
    // res.send("Get")
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error : "Please add all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error : "Invalid Email"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"SuccessFull Sign In"})
                // token given to a user
                const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
                // saved user will give list of id,name,email,followers,following
                const {_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=>{
            //error form devloper side
            console.log(err)
        })
            
        
    })
})

router.post('/signup',(req,res)=>{
    // res.send("Post")
    // console.log(req.body)
    const {name,email,password,pic}=req.body
    if (!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Already Exists Email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic:pic
            })
            user.save()
            .then(user=>{
                res.json({message:"Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router