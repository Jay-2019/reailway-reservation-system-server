//Services - The services contains the database queries and returning objects or throwing errors.

const userProfile = require('../model/userSchema');

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

// return currentUser Id
exports.currentUser = (req, res) => {
    let { email, password } = req.params;
    userProfile.findOne({ email: email, confirmPassword: password }, (err, userProfile) => err ? console.log(err.message) : res.json(userProfile))
}

