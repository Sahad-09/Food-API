const mongoose = require('mongoose')

const  {Schema} = mongoose

const MenuSchema = new Schema({
    itemName:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    price:{
        type:String,
        
        require: true
    },
   
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports=mongoose.model("menu", MenuSchema)