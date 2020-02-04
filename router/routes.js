//Routes - The API routes maps to the Controllers
// List All EndPoints

const express = require('express');
const router = express.Router();
// const todoController = require('../controller/todoController');
const services = require('../service/services')

//signUp routes
router.post('/signUp', services.signUp);

router.post('/adminSignUp', services.AdminSignUp);

// user Authentication ('/signIn)
router.get('/authentication', services.authentication);

router.get('/adminAuthentication', services.adminAuthentication);

router.get('/getMyProfile/:userId', services.getMyProfile);


//get current User(signIn-user)
router.get('/currentUser/:email/:password', services.currentUser);

router.get('/currentAdmin/:email/:password', services.currentAdmin);


router.post('/createTrain', services.createTrain);

router.get('/getStation', services.getStation);

router.get('/listTrain', services.listTrain);

router.get('/editTrain/:id', services.editTrain);

router.post('/updateTrain/:id', services.updateTrain);

router.get('/deleteTrain/:id', services.deleteTrain);

// router.get('/searchTrain', services.deleteTrain);

router.get('/resultTrain/:from/:to', services.resultTrain);

router.get('/bookTrain/:trainNumber', services.bookTrain);

router.post('/confirmTicket/:userId', services.confirmTicket);

router.post('/updateAvailableSeatCount/:trainNumber/:userId', services.updateAvailableSeatCount);

router.get('/myTicket/:userId', services.myTicket);


module.exports = router;