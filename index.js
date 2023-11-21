require('dotenv').config();
const express = require("express")
const connectToMongo = require('./db')
connectToMongo()

const port = process.env.PORT
const app = express()

app.use(express.json())

app.use("/api/admin", require('./Routes/admin_route'))

app.listen(port, ()=>{
    console.log(`App Listening on port number ${port}`);
})
