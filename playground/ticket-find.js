const mongoose = require('../config/db');           // requiring mongoose for db connectivity
const { Ticket } = require('../models/ticket');     // requiring Class/Model file

// find all tickets
// Ticket.find().then((tickets) => {
//     console.log(tickets);
// })

// find all the tickets based on priority
// Ticket.find({ priority: 'High' }).then((tickets) => {
//     console.log(tickets);
// })

// find all the tickets based on department
// Ticket.find({ department: 'Technical' }).then((tickets) => {
//     console.log(tickets);
// })

// find all the tickets based on priority and department
// Ticket.find({ priority: 'High', department: 'Technical' }).then((tickets) => {
//     console.log(tickets);
// })

// to find count of documents in a collection
// Ticket.countDocuments().then((value) => {
//     console.log(value);
// })

// to find one record
// Ticket.findOne({ department: 'Technical', priority: 'High' }).then((ticket) => {
//     console.log(ticket);
// })

// used to find and return documents with only selected properties
// Ticket.find().select(['name','department']).then((tickets) => {
//     console.log(tickets);
// })

// limits number of objs to be sent back
// Ticket.find({ department: 'Technical' }).limit(2).then((tickets) => {
//     console.log(tickets);
// })

// useful for pagination
// .skip(0).limit(2) ---> skips nothing, and limits to 2
// .skip(2).limit(2) ---> skips first 2, and limits to 2
// .skip(3).limit(2) ---> skips first 3, and limits to 2
// Ticket.find().skip(2).limit(2).then((tickets) => {
//     console.log(tickets);
// })

// sort name based on descending order
// Ticket.find().sort({ name: -1}).then((tickets) => {
//     console.log(tickets);
// })

// sort name based on ascending order
// Ticket.find().sort({ name: 1 }).then((tickets) => {
//     console.log(tickets);
// })

// sort createdAt based on descending order
// Ticket.find().sort({ createdAt: -1 }).then((tickets) => {
//     console.log(tickets);
// })