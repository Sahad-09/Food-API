require('dotenv').config();
const express = require("express")
const connectToMongo = require('./db')
const corrs=require('cors')
connectToMongo()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(corrs())

app.use("/api/admin", require('./Routes/admin_route'))

app.use("/api/order", require('./Routes/Order_route'))


// admin part
app.use("/register", express.static('./Register.html'))
app.use("/addfood", express.static('./Food.html'))
app.use("/viewfood", express.static('./FrontEnd/User/View.html'))

app.use("/api/user", require('./Routes/user_route'))
app.use("/api/user", require('./Routes/feedback_route'))





// user part








app.listen(port, ()=>{
    console.log(`App Listening on port number ${port}`);
})
