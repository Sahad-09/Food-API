const mongoose = require('mongoose')

const  {Schema} = mongoose

const UserSchema = new Schema({

    name:{
        type:String,
        require: true
    },
    phone:{
        type:Number,
        require: true
    },
    email:{
        type:String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address:{
        type:String,
        require: true
    },
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports=mongoose.model("user", UserSchema)