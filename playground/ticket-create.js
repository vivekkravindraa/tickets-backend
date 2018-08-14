const mongoose = require('../config/db');
const { Ticket } = require('../models/ticket');

// Model.create() ---> available @ http://mongoosejs.com/docs/api.html#Model

// for 'posting' multiple records
// calling .create() method on Class/Model as 'static'
Ticket.create({
    name: "Ravi",
    department: "HR",
    priority: "Low",
    message: "Opening in company"
})
.then((ticket) => {
    console.log(ticket);
})
.catch((err) => {
    console.log(err);
})