//Services - The services contains the database queries and returning objects or throwing errors.

const userProfile = require('../model/userSchema');
const train = require('../model/trainSchema');
const ticket = require('../model/ticketSchema');
const adminProfile = require('../model/adminSchema');

// authentication routes
exports.authentication = (req, res) => {
    userProfile.find((err, userProfile) => {
        err ? console.log(err.message) : res.json(userProfile);
    });
};

exports.adminAuthentication = (req, res) => {
    adminProfile.find((err, adminProfile) => {
        err ? console.log(err.message) : res.json(adminProfile);
    });
};

exports.getMyProfile = (req, res) => {
    let { userId } = req.params;
    userProfile.findOne({ _id: userId }, (err, userProfile) => {
        err ? console.log(err.message) : res.json(userProfile);
    });
}

// return currentUser profile
exports.currentUser = (req, res) => {
    let { email, password } = req.params;
    userProfile.findOne({ email: email, confirmPassword: password }, (err, userProfile) => {
        err ? console.log(err.message) : res.json(userProfile);
    });
}

exports.currentAdmin = (req, res) => {
    let { email, password } = req.params;
    adminProfile.findOne({ email: email, confirmPassword: password }, (err, adminProfile) => {
        err ? console.log(err.message) : res.json(adminProfile);
    });
}

//signUp routes
exports.signUp = (req, res) => {
    let newUser = new userProfile(req.body);
    newUser.save()
        .then(signUp => {
            res.status(200).json({ 'signUp': 'signUp successfully' });
        })
        .catch(err => {
            res.status(400).send('signUp failed');
            console.log(err.message);
        });
};


//signUp routes
exports.AdminSignUp = (req, res) => {
    let newUser = new adminProfile(req.body);
    newUser.save()
        .then(signUp => {
            res.status(200).json({ 'signUp': 'signUp successfully' });
        })
        .catch(err => {
            res.status(400).send('signUp failed');
            console.log(err.message);
        });
};



exports.createTrain = (req, res) => {
    let newTrain = new train(req.body);
    newTrain.save()
        .then(train => {
            res.status(200).json({ 'train': 'train created successfully' });
        })
        .catch(err => {
            res.status(400).send('failed');
            console.log(err.message);
        });
};

exports.getStation = (req, res) => {
    train.find((err, train) => {
        if (err) {
            console.log(err.message);
        } else {
            let setStation = [];
            for (let i of train) {
                setStation.push(i.from);
                setStation.push(i.to);
            }
            let getStation = new Set(setStation);
            res.json(Array.from(getStation));
        }
    })
}

exports.listTrain = (req, res) => {
    train.find((err, train) => {
        err ? console.log(err.message) : res.json(train);
    })
};

exports.editTrain = (req, res) => {
    const id = req.params.id;
    train.findById(id, (err, train) => {
        err ? console.log(err) : res.json(train);
    })
};

// store updated  train
exports.updateTrain = (req, res) => {
    train.findById(req.params.id, (err, train) => {
        if (!train)
            res.status(404).send("train is not found");
        else {
            train.trainNumber = req.body.trainNumber;
            train.trainName = req.body.trainName;
            train.from = req.body.from;
            train.to = req.body.to;
            train.totalSeat = req.body.totalSeat;
            train.fair = req.body.fair;

            train.save().then(train => {
                res.json('Train updated!');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }

    });
};

// Delete particular train
exports.deleteTrain = (req, res) => {
    // let id = req.params.id;
    train.findByIdAndRemove(req.params.id, (err) => {
        err ? err.message : res.json({ message: "Train Deleted Successfully" });
    });
};

exports.resultTrain = (req, res) => {
    const { from, to } = req.params;
    train.find({ from: from, to: to }, (err, train) => err ? console.log(err.message) : res.json(train));
};

exports.bookTrain = (req, res) => {
    const { trainNumber } = req.params;
    train.findOne({ trainNumber: trainNumber }, (err, train) => err ? console.log(err.message) : res.json(train));
};

exports.confirmTicket = (req, res) => {
    let newTicket = new ticket(req.body);
    newTicket.user.push(req.params.userId);
    newTicket.save()
        .then(status => {
            res.status(200).json({ 'status': 'Booking Confirm' });
        })
        .catch(err => {
            res.status(400).send('Booking  failed');
            console.log(err.message);
        });
};

// update total seat count
exports.updateAvailableSeatCount = (req, res) => {
    train.findOne({ trainNumber: req.params.trainNumber }, (err, train) => {
        if (!train) {
            res.status(404).send("train not found");
        } else {

            train.totalSeat = train.totalSeat - 1;

            train.save().then(train => {
                res.json("update Available Seat");
            })
                .catch(err => {
                    res.status(400).send("seat update not possible");
                });
        }
    });
};

exports.myTicket = (req, res) => {
    ticket.find((err, ticket) => {
        if (err) {
            console.log(err.message);
        } else {
            let arr = ticket;
            let test = arr.map(data => {
                if (data.user[0] == req.params.userId) {
                    return data;
                }
            })
            res.json(test);
        }
    });
};
