const jwt = require('jsonwebtoken');

const CONSTANTS = require('./constants');

const generateToken = userData =>{ // generate token
    const option = {
        expiresIn : CONSTANTS.JWT_TOKEN_EXPIRY,
        issuer :    CONSTANTS.JWT_ISSUER
    }
    return token = jwt.sign(userData, CONSTANTS.JWT_SECRET_KEY, option);    
}

// authenticate token
    const validateToken = (req,res,next) =>{
        const authToken = req.headers.token;
        
        if(authToken){
            try{
            var token = authToken.split(' ')[1];
            const option = {
                expiresIn : CONSTANTS.JWT_TOKEN_EXPIRY,
                issuer :    CONSTANTS.JWT_ISSUER
            };
                token = jwt.verify(token, CONSTANTS.JWT_SECRET_KEY, option);
                res.locals.user = token;
                next(); 
                
            }catch(err){
                return res.status(401).json({"Error":'Invalid Token',err});
            }            
        }else{
            return res.status(401).json({"Error":'No Token Found'});
        }
    }
    

module.exports = {
    generateToken,
    validateToken
};