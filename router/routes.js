//Routes - The API routes maps to the Controllers
// List All EndPoints

const express = require('express');
const router = express.Router();
// const todoController = require('../controller/todoController');
const services = require('../service/services')

//signUp routes
router.post('/signUp', services.signUp);

// user Authentication ('/signIn)
router.get('/authentication', services.authentication);

//get current User(logged-In) Id
// router.get('/currentUser/:email/:password', services.currentUser);

module.exports = router;