const express = require('express');
const { Ticket } = require('../models/ticket');
const _ = require('lodash');

const router = express.Router();

router.get('/',(req,res) => {
    Ticket.find()
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/:id',(req,res) => {
    let id = req.params.id;

    // checking whether the id is valid or not
    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Ticket.findById(id)
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

router.get('/status/open',(req,res) => {
    Ticket.openTickets().then((tickets) => {
        res.send(tickets);
    })
})

router.get('/status/completed',(req,res) => {
    Ticket.completedTickets().then((tickets) => {
        res.send(tickets);
    })
})

router.get('/priority/:value',(req,res) => {
    let value = req.params.value;
    Ticket.findByPriority(value).then((tickets) => {
        res.send(tickets);
    })
})

router.post('/',(req,res) => {
    // let body = req.body;

    // _.pick() provided by lodash library
    // strong parameter check
    let body = _.pick(req.body, ['name', 'department', 'priority', 'message']);
    let ticket = new Ticket(body);

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

router.put('/:id',(req,res) => {
    let id = req.params.id;
    // let body = req.body;

    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    // parameters allowed to be updated
    let body = _.pick(req.body, ['name', 'department', 'priority', 'message', 'status']);

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

// FIXME:
router.get('/latest/3',(req,res) => {
    Ticket.find().limit(3)
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    })
})

// FIXME:
router.get('/:department',(req,res) => {
    Ticket.find({department: 'Technical'})
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