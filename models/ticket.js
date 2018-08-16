const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Ticket = mongoose.model('Tickets', ticketSchema);

module.exports = { Ticket }