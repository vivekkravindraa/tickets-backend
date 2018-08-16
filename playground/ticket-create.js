const mongoose = require('../config/db');           // requiring mongoose for db connectivity
const { Ticket } = require('../models/ticket');     // requiring Class/Model file

// Model.create() ---> available @ http://mongoosejs.com/docs/api.html#Model

// for 'posting' multiple records
// calling .create() method on Class/Model as 'static'
Ticket.create(
    {
        name: "Ravi",
        department: "HR",
        priority: "Low",
        message: "Opening in company"
    },
    {
        name: "Kusuma",
        department: "HR",
        priority: "High",
        message: "Applied for vacancy"
    }
)
.then((tickets) => {
    console.log(tickets);
})
.catch((err) => {
    console.log(err);
})