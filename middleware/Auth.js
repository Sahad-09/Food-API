var jwt = require('jsonwebtoken')
let env = require('dotenv')
env.config()

const Auth=(req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "please authenticate using valid token"})
    }
    try{
        const data = jwt.verify(token, process.env.KEY)
        req.user = data.user
        console.log(data, 27864328764273864872662876786);
        next()
    }
    catch{
        //401 : Authentication error
        res.status(401).send({error: "catch: please authenticate using a valid token"})
    }
}

module.exports = Auth