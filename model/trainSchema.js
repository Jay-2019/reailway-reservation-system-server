//Models - The schema definition of the Model

const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

let trainSchema = new Schema({

    trainNumber: {
        type: Number,
        unique: true,
        required: true
    },
    trainName: {
        type: String,
        unique: true,
        required: true
    },
    from: {
        type: String,
        uppercase: true,
        required: true
    },
    to: {
        type: String,
        uppercase: true,
        required: true
    },
    totalSeat: {
        type: Number,
        required: true
    },
    fair: {
        type: Number,
        required: true
    }
});
trainSchema.plugin(timestamps);
module.exports = mongoose.model('train', trainSchema, 'train');