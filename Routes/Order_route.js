const express = require('express')
const { View, Delete, Insert} = require('../Controller/Order_controller')
const routes = express.Router()

// const Auth = require('../middleware/Auth')

routes.post('/insert', Insert)

routes.get("/view", View)

routes.get("/view/:id", View)

routes.delete('/delete/:id', Delete)



module.exports = routes