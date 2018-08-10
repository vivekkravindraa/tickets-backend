const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('./config/db');
const { Ticket } = require('./models/ticket');

const app = express(); 
const port = 3000;

app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use(morgan('short'));
// app.use(morgan('tiny'));

// app.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens['response-time'](req, res), 'ms',
//       new Date()
//     ].join(' ')
// }));

app.get('/',(req,res) => {
    res.send({
        msg: 'Welcome to ticket master'
    })
})

app.get('/tickets',(req,res) => {
    Ticket.find()
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.get('/tickets/:id',(req,res) => {
    let id = req.params.id;
    Ticket.findById(id)
    .then((ticket) => {
        res.send(ticket);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.post('/tickets',(req,res) => {
    let body = req.body;
    let ticket = new Ticket(body);
    ticket.save()
    .then((ticket) => {
        res.send(ticket);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.put('/tickets/:id',(req,res) => {
    let id = req.params.id;
    let body = req.body;
    Ticket.updateOne(id,body)
    .then((ticket) => {
        res.send(ticket);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.delete('/tickets/:id',(req,res) => {
    let id = req.params.id;
    Ticket.deleteOne(id)
    .then((ticket) => {
        res.send(ticket);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})