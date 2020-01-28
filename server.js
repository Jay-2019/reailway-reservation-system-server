const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./router/routes');
const port = 4000;
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
server.use(cookieParser());

//mongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/railwayReservationSystem', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

server.use('/railwayReservationSystem', routes);
server.listen(port, () => console.log(`!!!Express Server is Running on port => ${port}`));