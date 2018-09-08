const express = require('express');
const { Ticket } = require('../models/ticket');
const { authenticateUser } = require('../middlewares/authentication');
const _ = require('lodash');

const router = express.Router();

router.get('/', authenticateUser, (req,res) => {
    Ticket.find()
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/:id', authenticateUser, (req,res) => {
    let id = req.params.id;

    // checking whether the id is valid or not
    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Ticket.findById(id).populate('employee')
    .then((ticket) => {
        // checking whether the id is available or not
        if(ticket) {
            res.send({
                ticket,
                notice: 'Successfully obtained the ticket'
            });
        } else {
            res.send({
                notice: 'Ticket not found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/status/open', authenticateUser, (req,res) => {
    Ticket.openTickets().then((tickets) => {
        res.send(tickets);
    })
})

router.get('/status/completed', authenticateUser, (req,res) => {
    Ticket.completedTickets().then((tickets) => {
        res.send(tickets);
    })
})

router.get('/priority/:value', authenticateUser, (req,res) => {
    let value = req.params.value;
    Ticket.findByPriority(value).then((tickets) => {
        res.send(tickets);
    })
})

router.post('/', authenticateUser, (req,res) => {
    // let body = req.body;

    // _.pick() provided by lodash library
    // strong parameter check
    let body = _.pick(req.body, ['name', 'department', 'priority', 'message','employee']);
    let ticket = new Ticket(body);
    ticket.user = req.locals.user._id;

    ticket.save()
    .then((ticket) => {
        res.send({
            ticket,
            notice: 'Successfully created the ticket'
        });
    })
    .catch((err) => {
        res.send(err);
    })
})

router.put('/:id', authenticateUser, (req,res) => {
    let id = req.params.id;
    // let body = req.body;

    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    // parameters allowed to be updated
    let body = _.pick(req.body, ['name', 'department', 'priority', 'message', 'status', 'employee']);

    Ticket.findByIdAndUpdate(id, { $set: body}, { new: true})
    .then((ticket) => {
        if(ticket) {
            res.send({
                ticket,
                notice: 'Successfully updated the ticket'
            });
        } else {
            res.send({
                notice: 'Ticket not found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.delete('/:id', authenticateUser, (req,res) => {
    let id = req.params.id;
    
    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Ticket.findByIdAndRemove(id)
    .then((ticket) => {
        if(ticket) {
            res.send({
                ticket,
                notice: 'Successfully deleted the employee'
            });
        } else {
            res.send({
                notice: 'Employee not found'
            });
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/latest/:value', authenticateUser, (req,res) => {
    let value = req.params.value;
    Ticket.find().limit(parseInt(value))
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/department/:name', authenticateUser, (req,res) => {
    let name = req.params.name;  
    Ticket.find({ department: `${name}` })
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    })
})

module.exports = {
    ticketsRouter: router
}