const express = require('express')
const {Register, View, Delete, Update, Login, ViewFood,AddtoCard} = require('../Controller/User_controller')
const routes = express.Router()
const {body} = require('express-validator')
const Auth = require('../middleware/Auth')



routes.post('/register',[
    body('name', "name must be more than 3 character").isLength({min:3}),
    body('phone', "Phone no must be max of 10 charactor").isLength({min:10, max:10}),
    body('email', "name must be more than 5 character").isEmail(),
    body('password', "Password must be more than 5 character").isLength({min: 5}),
    body('address', "name must be more than 5 character").isLength({min:3}),
], Register)



routes.post('/login', Login)

routes.get("/viewfood", ViewFood)

routes.get("/viewfood/:id", ViewFood)

routes.get('/view/:id',Auth, View)
routes.get('/view',Auth, View)
routes.delete('/delete/:id',Auth, Delete)
routes.put('/update/:id',Auth, Update)


module.exports = routes