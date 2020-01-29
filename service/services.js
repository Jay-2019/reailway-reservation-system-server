//Services - The services contains the database queries and returning objects or throwing errors.

const userProfile = require('../model/userSchema');
const train = require('../model/trainSchema');

// authentication routes
exports.authentication = (req, res) => {
    userProfile.find((err, userProfile) => {
        err ? console.log(err.message) : res.json(userProfile);
    });
};

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

exports.listTrain = (req, res) => {
    train.find((err, train) => {
        err ? console.log(err) : res.json(train);
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
            res.status(404).send("data is not found");
        else


            train.trainNumber = req.body.trainNumber;
        train.trainName = req.body.trainName;
        train.from = req.body.from;
        train.to = req.body.to;
        train.totalSeat = req.body.totalSeat;
        train.fair = req.body.fair;

        train.save().then(todos => {
            res.json('Train updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
};

// Delete particular train
exports.deleteTrain = (req, res) => {
    // let id = req.params.id;
    train.findByIdAndRemove(req.params.id, (err) => {
        err ? err.message : res.json({ message: "Train Deleted Successfully" });
    });
};

// return currentUser Id
exports.currentUser = (req, res) => {
    let { email, password } = req.params;
    userProfile.findOne({ email: email, confirmPassword: password }, (err, userProfile) => err ? console.log(err.message) : res.json(userProfile))
}

