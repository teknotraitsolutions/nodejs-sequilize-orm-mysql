const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('../models/index');
const {User, Question, Exam, Branch} = db.sequelize.models;

const registerUser = async(req, res)=> {  // register user
    const saltRounds            = 10;
    const myPlaintextPassword   = req.body.password;

    const salt          = bcrypt.genSaltSync(saltRounds);
    const hashPassword  = bcrypt.hashSync(myPlaintextPassword, salt); // bcypt hashing
    const email = req.body.email;
    const createUser = {
        name        : req.body.name,
        email       : email,
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        role_id     : req.body.role_id,
        password    : hashPassword
    }
    
    getUniqueEmail = await User.findAll({
        where: {email: email}
    });

    if(getUniqueEmail.length){
        return {status:'Error', message : 'Email already Registered'}
    }else{  
        return { status:'Success', data: await User.create(createUser)};
    }    
};

const checkAuth = async(req, res)=>{ // login
    const email     = req.body.email;
    const password  = req.body.password;

    const Credential = await User.findAll({
        where: {email: email}, 
        raw: true
    }); // const datafetch = Credential.map(el=> el.get({ plain:true }));
    
    let filteredResult = JSON.parse(JSON.stringify(Credential));    

    if(Credential.length){  // validate for email
        const match = await bcrypt.compare(password, filteredResult[0].password); // validate for password

        if(match){ 
            return { status:'Success',message: 'Logged In', userData: filteredResult[0]};
        }else{
            return { status:'Error',message: 'Invalid Credentials'};
        }
    }else{
        return {status:'Error', message : 'Invalid Credentials'}
    }
};

const getUsers = async(req, res)=>{  // get user details
    const role = req.params.role;
    var getUser;
    if(role == '1' || role=='2'){
        getUser = await User.findAll({
            where:{
                role_id: role,
            }
        })
    }else{
        getUser = await User.findAll({});
    }
    return {status:200, data : getUser};
};

const addQuestion = async(req, res)=> { // Adding questions
    const createQuestion = {
        title       : req.body.title,
        type        : req.body.type,
        marks       : req.body.marks,        
    };
    return { status:'Success', data: await Question.create(createQuestion)};
};

const addExam = async(req, res)=> { // Adding Exams
    const createExam = {
        name            : req.body.name,
        date            : req.body.date,
        duration        : req.body.duration,   
        question_count  : req.body.question_count   
    };
    return { status:'Success', data: await Exam.create(createExam)};
};

const addBranch = async(req, res)=> { // Adding Branch
    const createBranch = {
        name            : req.body.name,
        capacity        : req.body.capacity        
    };
    return { status:'Success', data: await Branch.create(createBranch)};
};

const getQuestions = async(req, res)=>{  // Listing Questions
    getQues = await Question.findAll({});
    return {status:200, data : getQues};
};

const getExams = async(req, res)=>{ // Listing Exams
    getExam = await Exam.findAll({});
    return {status:200, data : getExam};
}

const getBranches = async(req, res) => { // Listing Branches
     getBranch = await Branch.findAll({});
     return {status:200, data : getBranch};
}

module.exports = {
    registerUser,
    checkAuth,  
    getUsers,
    addQuestion,
    addExam,
    addBranch,
    getQuestions,
    getExams,
    getBranches
}