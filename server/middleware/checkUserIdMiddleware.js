const jwt = require('jsonwebtoken');
const {Collection} = require('../models/models')

module.exports = function(){
    return  async function(req, res, next){
        const id = req.params.id;
        const collection = await Collection.findOne({where: {id}})
        const userId = collection.userId;
        if (req.method === "OPTIONS"){
            next();
        }
        try{

            const token = req.headers.authorization.split(' ')[1];
            console.log(token)
            if(!token){
                return res.status(401).json({message: "User is not authentificated"});
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.id !== userId){
                return res.status(403).json({message: "You do not have access"});
            }

            req.user = decoded;
            next();
        } catch(e) {
            return res.status(401).json({message: "User is not authentificated"})
        }
    }
}