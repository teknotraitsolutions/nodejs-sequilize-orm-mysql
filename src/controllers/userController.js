const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const authService = require('../shared/auth.service');

const registerUser = async(req, res) =>{
        const error = validationResult(req);
        
        if(!error.isEmpty()){
            return res.status(401).json(error);
        }
        
        try{
            const registerUserData = await userService.registerUser(req, res);

            if(registerUserData.status == 'Error'){
                return res.status(401).json(registerUserData.message);
            }else if(registerUserData.status == 'Success'){
                return res.status(200).json(registerUserData.data);
            }    
        }catch(err){
            return res.status(401).json({"Error":'Some Error Occurred',err});
        }   
};

const doLogin = async(req, res)=>{
    const error = validationResult(req);
        
    if(!error.isEmpty()){
            return res.status(401).json(error);
        }
    
    try{
        const loginData = await userService.checkAuth(req, res);

        if(loginData.status == 'Error'){
            return res.status(401).json(loginData.message);
        }else if(loginData.status == 'Success'){
            const userData = loginData.userData;
            delete userData['password'];
            const token = authService.generateToken(userData);        
            return res.status(200).json({'Success':loginData.message,'token': token});
        }    
    }catch(err){
        return res.status(401).json({"Error":'Some Error Occurred',err});
    }   
};

const getUsers = async(req, res)=>{
    
    try{
        const userData = await userService.getUsers(req, res);
        const role     = req.res.locals.user.role_id;
    
        if(userData.status == 200){
            return res.status(200).json({'Success':'Data retrieved','data': userData.data});
        }
    }catch(err){
        return res.status(401).json({"Error":'Some Error Occurred',err});
    }   
};

const addQuestion = async(req,res)=>{
    const error = validationResult(req);        
        if(!error.isEmpty()){
            return res.status(401).json(error);
        }
   
    try{
        const quesAdd = await userService.addQuestion(req,res);
        if(quesAdd.status == 'Success'){
            return res.status(200).json({'Success':'Question added successfully','data': quesAdd.data});
        }
    }catch(err){
        return res.status(401).json({"Error":'Some Error Occurred',err});
    }   
};

const addExam = async(req,res)=>{
    const error = validationResult(req);        
        if(!error.isEmpty()){
            return res.status(401).json(error);
        }
    
    try{
        const examAdd = await userService.addExam(req,res);
        if(examAdd.status == 'Success'){
            return res.status(200).json({'Success':'Question added successfully','data': examAdd.data});
        }
    }catch(err){
        return res.status(401).json({"Error":'Some Error Occurred',err});
    }   
};

const addBranch = async(req,res)=>{
    const error = validationResult(req);        
        if(!error.isEmpty()){
            return res.status(401).json(error);
        }
   
    try{
        const branchAdd = await userService.addBranch(req,res);
            if(branchAdd.status == 'Success'){
                return res.status(200).json({'Success':'Question added successfully','data': branchAdd.data});
            }
        }catch(err){
            return res.status(401).json({"Error":'Some Error Occurred',err});
        }   
};

const getQuestions = async(req, res)=>{    
    try{
        const getQues = await userService.getQuestions(req, res);       
        if(getQues.status == 200){
            return res.status(200).json({'Success':'Data retrieved','data': getQues.data});
        }
    }catch(err){
        return res.status(401).json({"Error":'Some Error Occurred',err});
    }   
};

const getExams = async(req, res)=>{    
    try{
        const getExam = await userService.getExams(req, res);

        if(getExam.status == 200){
            return res.status(200).json({'Success':'Data retrieved','data': getExam.data});
        }
    }catch(err){
        return res.status(401).json({"Error":'Some Error Occurred',err});
    }   
};

const getBranches = async(req, res)=>{    
    try{
        const getBranch = await userService.getBranches(req, res);

        if(getBranch.status == 200){
            return res.status(200).json({'Success':'Data retrieved','data': getBranch.data});
        }
    }catch(err){
        return res.status(401).json({"Error":'Some Error Occurred',err});
    }   
};


module.exports={
    registerUser,
    doLogin,
    getUsers,
    addQuestion,
    addExam,
    addBranch,
    getQuestions,
    getExams,
    getBranches
}