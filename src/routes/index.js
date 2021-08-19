const express = require('express');

const routes = express.Router();
const { body } = require('express-validator');
const tokenValidation = require('../shared/auth.service');  // token validation
const middleware    = require('../middleware/route.protect'); // admin and student middleware
//Include all Controllers
const userController = require('../controllers/userController');

routes.post('/register',[
    body('name').isAlpha().withMessage('Name should be String Only').isLength({min:1}).withMessage('Name should not be empty'),
    body('email').isEmail().withMessage('Invalid Email Format'),
    body('password').isLength({min:3}).withMessage('Minimum 3 Characters')
],
userController.registerUser);
routes.post('/login', [
    body('email').isEmail().withMessage('Email is Required'),
    body('password').isLength({min:3}).withMessage('Password is Required')
], userController.doLogin);

routes.get('/getusers/:role', tokenValidation.validateToken, middleware.routeAdmin, userController.getUsers);

routes.post('/addques',[
    body('title').isLength({min:1}).withMessage('Title should not be empty')  
],  tokenValidation.validateToken, middleware.routeAdmin, userController.addQuestion);

routes.post('/addexam',[
    body('name').isLength({min:1}).withMessage('Exam Name should not be empty')  
], tokenValidation.validateToken, middleware.routeAdmin, userController.addExam);

routes.post('/addbranch',[
    body('name').isLength({min:1}).withMessage('Branch Name should not be empty')  
], tokenValidation.validateToken,middleware.routeAdmin, userController.addBranch);

routes.get('/getquestions', tokenValidation.validateToken, middleware.routeAdmin, userController.getQuestions);

routes.get('/getexams', tokenValidation.validateToken, middleware.routeAdmin, userController.getExams);

routes.get('/getbranches', tokenValidation.validateToken, middleware.routeStudent ,userController.getBranches);


module.exports = routes;
