const mongoose = require('mongoose')

const  {Schema} = mongoose

const AdminSchema = new Schema({
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
    menu: [
        {
            itemName: {
                type: String,
                required: false,
            },
            description: String,
            price: {
                type: Number,
                required: false,
            },
        },
    ],
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports=mongoose.model("admin", AdminSchema)