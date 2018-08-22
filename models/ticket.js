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

// Do not define instance or class methods in arrow functions
ticketSchema.statics.openTickets = function() {
    return this.find({status: 'open'});
    // 'this' here refers to the class 'Ticket'
}

ticketSchema.statics.completedTickets = function() {
    return this.find({status: 'completed'});
}

ticketSchema.statics.findByPriority = function(priority) {
    return this.find({ priority: priority });
}

const Ticket = mongoose.model('Tickets', ticketSchema);

module.exports = { Ticket }