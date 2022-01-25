const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function(roles){
    return  function(req, res, next){
        if (req.method === "OPTIONS"){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(token === undefined){
                return res.status(401).json({message: "User is not authentificated"});
            }
            console.log('lalalal')
            const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
            if(!roles.includes(decoded.role)){
                return res.status(403).json({message: "You do not have access"});
            }
            req.user = decoded;

            next();
        } catch(e) {
            console.log(e)
            return res.status(401).json({message: "User is not authentificated"})
        }
    }
}