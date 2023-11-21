const mongoose = require('mongoose')


const MongoURI = "mongodb://localhost:27017/food"

const connectToMongo = async() => {
    try{
        await mongoose.connect(MongoURI)
        console.log("Connect to mongodb succesfull");
    }
    catch(err){
        console.log("Connect to mongo Error", err);
    }
}

module.exports=connectToMongo