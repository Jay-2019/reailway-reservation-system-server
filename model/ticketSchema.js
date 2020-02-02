//Models - The schema definition of the Model

const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

let ticketSchema = new Schema({

    trainName: {
        type: String,
        required: true
    },
    trainNumber: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    fair: {
        type: Number,
        required: true
    },
    passengerName: {
        type: String,
        required: true
    },
    passengerAge: {
        type: Number,
        required: true
    },
    passengerGender: {
        type: String,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]

});
ticketSchema.plugin(timestamps);
module.exports = mongoose.model('ticket', ticketSchema, 'ticket');