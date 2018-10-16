const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String
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
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Do not define instance or class methods in 'arrow' ()=>{} functions
ticketSchema.statics.openTickets = function() {
    return this.find({ status: 'open' });       // 'this' here refers to the class 'Ticket'
}

ticketSchema.statics.completedTickets = function() {
    return this.find({ status: 'completed' });
}

ticketSchema.statics.findByPriority = function(priority) {
    return this.find({ priority: priority });
}

ticketSchema.pre('save', function(next) {
    if(!this.code) {
        // this.code = 'DCT-' + Math.ceil(Math.random() * 1000);
        this.code = 'DCT-' + this._id.toString().slice(12);
    }
    next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Ticket }

// Sample Object

// {
//     "name": "Ravi",
//     "department": "Technical",
//     "priority": "High",
//     "message": "Net is down",
//     "employee": "5bc59e9f2206fc325133a0e1",
//     "user": "5bc59d2e23447a309eebbe0d"
// }