//Models - The schema definition of the Model

const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

let adminProfileSchema = new Schema({

    userName: {
        type: String,
        // unique: true,
        required: true
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        // lowercase: true,
        // unique: true,
        required: true
    },
    createPassword: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },

    termsAndConditions: {
        type: Boolean,
        required: true
    },
    signupDate: {
        type: Date,
        default: Date.now
    },
    isUserExist: {
        type: Boolean
    }
});
adminProfileSchema.plugin(timestamps);
module.exports = mongoose.model('admin', adminProfileSchema, 'adminProfile');