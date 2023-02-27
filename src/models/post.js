const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    place:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        required: true
      },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})


module.exports=mongoose.model("Post",postSchema)