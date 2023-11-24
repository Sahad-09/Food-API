const express = require('express')
// const UserSchema = require('../Models/User')
// const MenuSchema = require('../Models/Menu')
const FeedbackSchema = require('../Models/Feedback')


const bcrypt = require('bcryptjs')
const env = require('dotenv')
env.config()
const jwt = require('jsonwebtoken')


const Feedback = async (req, res)=>{
    try{

        const {Menu_id, User_id ,feedback} = req.body
        // const error = validationResult(req)
       
        const check = await FeedbackSchema.findOne({feedback:feedback})
        if(check){
            return res.json({message: "Feedback Already submitted"})
        }
        else{
            const data = await new FeedbackSchema({
                //schema name: variable names of this file
                Menu_id: Menu_id,
                User_id: User_id,
                feedback:feedback
            })
            
            await data.save()
            
            return res.send({
                // data varaible can be anything: data variable of this file
                message: "Feedback sent Successfull", data: data
            })
        }
    }
    catch(err){
        console.log("catch error " + err.message);
        res.status(500).send("Internal server error !!")
    }

}

   

    //GET METHOD AND WITH ID

    const View = async (req, res)=>{
        try{
            let id = req.params.id
            if(id){
                const data = await FeedbackSchema.findById(id)
                res.json({success:true, data:data})
            }
            else{
                const data = await FeedbackSchema.find()
                res.json({success:true, data:data})
            }
        }
        catch(err){
            console.log("catch error " + err.message);
            res.status(500).send("Internal server error !!")
        }
    }


    

    //DELETE METHOD

   

    
module.exports = { View,Feedback}