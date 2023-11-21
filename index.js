require('dotenv').config();
const express = require("express")
const connectToMongo = require('./db')
connectToMongo()

const port = process.env.PORT
const app = express()

app.use(express.json())

app.use("/api/teacher", require('./Routes/teacher_route'))

app.listen(port, ()=>{
    console.log(`App Listening on port number ${port}`);
})
