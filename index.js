require('dotenv').config();
const express = require("express")
const connectToMongo = require('./db')
connectToMongo()

const port = process.env.PORT
const app = express()

app.use(express.json())

app.use("/api/admin", require('./Routes/admin_route'))

// admin part
app.use("/register", express.static('./Register.html'))
app.use("/addfood", express.static('./Food.html'))





// user part








app.listen(port, ()=>{
    console.log(`App Listening on port number ${port}`);
})
