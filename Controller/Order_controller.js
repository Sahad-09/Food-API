const express = require('express')
const UserSchema = require('../Models/User')
const MenuSchema = require('../Models/Menu')
const OrderSchema = require('../Models/Order')
const { body, validationResult} = require('express-validator')

const bcrypt = require('bcryptjs')
const env = require('dotenv')
env.config()
const jwt = require('jsonwebtoken')


const Insert = async (req, res)=>{
    try{

        const {Menu_id, User_id, itemName} = req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
            const success = false
            return res.status(400).json({success, error: error.array()})
        }
        const check = await OrderSchema.findOne({itemName:itemName})
        if(check){
            return res.json({message: "Item Already exist"})
        }
        else{
            const data = await new OrderSchema({
                //schema name: variable names of this file
                Menu_id: Menu_id,
                User_id: User_id,
                itemName: itemName
            })
            
            await data.save()
            
            return res.send({
                // data varaible can be anything: data variable of this file
                message: "Insert Successfull", data: data
            })
        }
    }
    catch(err){
        console.log("catch error " + err.message);
        res.status(500).send("Internal server error !!")
    }

}

    const Login = async(req, res)=>{
        try{
            const {email, password} = req.body
            const check = await OrderSchema.findOne({email:email})
            if(!check){
                return res.json({message: "Invalid email"})
            }
            else{
                const passwordCompare = await bcrypt.compare(password, check.password)
                if(!passwordCompare){
                    const success = false
                    return  res.status(400).json({success, error: "incorrect password"})
                }
                else{
                    let data = check.id
                    let token = jwt.sign(data, process.env.KEY)
                    return res.json({success:true, message:"Login successfull", token})
                }
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
                const data = await OrderSchema.findById(id)
                res.json({success:true, data:data})
            }
            else{
                const data = await OrderSchema.find()
                res.json({success:true, data:data})
            }
        }
        catch(err){
            console.log("catch error " + err.message);
            res.status(500).send("Internal server error !!")
        }
    }


    

    //DELETE METHOD

    const Delete = async (req, res)=>{
        try{
            const id = req.params.id
            const data = await OrderSchema.findById(id)
            if(!data){
                res.json({success:false, message:"Not found"})
            }
            else{
                const DeletedData = await OrderSchema.findByIdAndDelete(id)
                return res.json({success: true, DeletedData: DeletedData})
            }

        }
        catch(err){
            console.log("catch error " + err.message);
            res.status(500).send("Internal server error !!")
        }
    }

    
module.exports = { View, Delete, Insert}