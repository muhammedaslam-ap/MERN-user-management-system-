import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin",'user'],
        default:'user'
    },
    profileImage:{
        type:String,
        required:false
    }
})

export const userModel = mongoose.model('user',userSchema)