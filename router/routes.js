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

router.post('/createTrain', services.createTrain);

router.get('/listTrain', services.listTrain);

router.get('/editTrain/:id', services.editTrain);

router.post('/updateTrain/:id', services.updateTrain);

router.get('/deleteTrain/:id', services.deleteTrain);

// router.get('/searchTrain', services.deleteTrain);

router.get('/resultTrain/:from/:to', services.resultTrain);

router.get('/bookTrain/:trainNumber', services.bookTrain);


//get current User(logged-In) Id
// router.get('/currentUser/:email/:password', services.currentUser);

module.exports = router;