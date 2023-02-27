const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const dotenv = require('dotenv')
dotenv.config({path:'../.env'})
const jwt_sec = process.env.JWT_SECRET
module.exports = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:"First Login"})
    }
    const token = authorization.replace("Bearer ","")

    jwt.verify(token,jwt_sec,(err,payload)=>{
       if(err){
        return res.status(401).json({error:"First Logged in"})
       }

       const {_id} = payload
       User.findById(_id).then(userdata =>{
        req.user = userdata
        next()
       })
       
    })
}