
const routeStudent = (req,res,next)=>{  // check for student role
    const role     = req.res.locals.user.role_id; 
    if(role == 2){
        next();
    }else{
        return res.status(401).json({"Error":'User Not Authorized'});
    }
}; 

const routeAdmin = (req,res,next)=>{ // check for admin roles
    const role     = req.res.locals.user.role_id;  
    if(role == 1){
        next();
    }else{
        return res.status(401).json({"Error":'Student cant access Admin routes'});
    }
}; 

module.exports = {
    routeStudent,
    routeAdmin    
};