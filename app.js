const express = require('express');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('./config/db');
const { Ticket } = require('./models/ticket');
const { Employee } = require('./models/employee');

const { ticketsRouter } = require('./routes/tickets');
const { employeesRouter } = require('../../react/employees');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// app.use(morgan('dev'));
app.use(morgan('short'));
// app.use(morgan('tiny'));

app.use('/tickets',ticketsRouter);
app.use('/employees',employeesRouter);

// app.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens['response-time'](req, res), 'ms',
//       new Date()
//     ].join(' ')
// }));

// NOT FEASIBLE
// app.use('tickets/:id',(req,res,next) => {
//     let id = req.params.id;
//     if(!ObjectId.isValid(id)) {
//         res.send({
//             notice: 'invalid object id'
//         })
//     }
//     next();
// })

app.param('id',(req,res,next) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)) {
        res.send({
            notice: 'invalid object id'
        })
        return false;
    }
    next();
})

app.get('/',(req,res) => {
    res.send({
        msg: 'Welcome to ticket master'
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})