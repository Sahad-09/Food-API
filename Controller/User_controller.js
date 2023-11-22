const express = require('express')
const UserSchema = require('../Models/User')
const MenuSchema = require('../Models/Menu')
const { body, validationResult} = require('express-validator')

const bcrypt = require('bcryptjs')
const env = require('dotenv')
env.config()
const jwt = require('jsonwebtoken')


const Register = async (req, res)=>{
    try{

        const {name,address,phone,email, password} = req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
            const success = false
            return res.status(400).json({success, error: error.array()})
        }
        const check = await UserSchema.findOne({email:email})
        if(check){
            return res.json({message: "Email Already exist"})
        }
        else{
            // salt is a random number is generated to decrypt the password
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(password, salt)
            const data = await new UserSchema({
                //schema name: variable names of this file
                name: name,
                phone: phone,
                email: email,
                password: secPass,
                address: address,
            })
            
            await data.save()
            
            return res.send({
                // data varaible can be anything: data variable of this file
                message: "Registered Successfull", data: data
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
            const check = await UserSchema.findOne({email:email})
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
                const data = await UserSchema.findById(id)
                res.json({success:true, data:data})
            }
            else{
                const data = await UserSchema.find()
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
            const data = await UserSchema.findById(id)
            if(!data){
                res.json({success:false, message:"Not found"})
            }
            else{
                const DeletedData = await UserSchema.findByIdAndDelete(id)
                return res.json({success: true, DeletedData: DeletedData})
            }

        }
        catch(err){
            console.log("catch error " + err.message);
            res.status(500).send("Internal server error !!")
        }
    }



    //UPDATE METHOD
    const Update = async (req, res) => {
        try{
            const {id} = req.params
            const data = await UserSchema.findById(id)
            if(!data){
                return res.json({success:false, message: "Not found"})
            }
            else{
                const {name, phone, email, address} = req.body
                let newData = {}
                if (name) {newData.name =  name}
                if (phone) {newData.phone =  phone}
                if (email) {newData.email =  email}
                if (address) {newData.address =  address}

                const UpdatedData = await UserSchema.findByIdAndUpdate(id, {$set:newData}, {new:true})
                return res.json({success: true, UpdatedData: UpdatedData})

            }
            
        }
        catch(err){
            console.log("catch error " + err.message);
            res.status(500).send("Internal server error !!")
        }
    }


    const ViewFood = async (req, res) => {
        try {
            let id = req.params.id
            if (id) {
                const data = await MenuSchema.findById(id)
                res.json({ success: true, data: data })
            }
            else {
                const data = await MenuSchema.find()
                res.json({ success: true, data: data })
            }
        }
        catch (err) {
            console.log("catch error " + err.message);
            res.status(500).send("Internal server error !!")
        }
    }
    const AddtoCard = async (req, res) => {
        try {
    
            const { itemName, price, description } = req.body
           
            const check = await MenuSchema.findOne({ itemName: itemName })
            if (check) {
                return res.json({ message: "Food Already exist" })
            }
            else {
                // salt is a random number is generated to decrypt the password
    
                const data = await new MenuSchema({
                    //schema name: variable names of this file
                    itemName: itemName,
                    price: price,
                    description: description
                })
    
                await data.save()
    
                return res.send({
                    // data varaible can be anything: data variable of this file
                    message: "Food added successfull", data: data
                })
            }
        }
        catch (err) {
            console.log("catch error " + err.message);
            res.status(500).send("Internal server error !!")
        }
    
    }

    
module.exports = {Register, View, Delete, Update, Login, ViewFood,AddtoCard}