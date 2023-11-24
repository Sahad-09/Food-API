const express = require('express')
const { Feedback,View} = require('../Controller/Feedback_controller')
const routes = express.Router()

// const Auth = require('../middleware/Auth')

routes.post('/feedback', Feedback)
routes.get('/feedback/view/:id', View)
routes.get('/feedback/view', View)



module.exports = routes