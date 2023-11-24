const mongoose = require('mongoose')

const  {Schema} = mongoose

const FeedbackSchema = new Schema({
    Menu_id:{
        type:Schema.ObjectId,
        ref:"menu",
        require: true
    }, 
    User_id:{
        type:Schema.ObjectId,
        ref:"user",
        require: true
    }, 

  feedback:{
    type:String,
    require:true
  },
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports=mongoose.model("feedback", FeedbackSchema)