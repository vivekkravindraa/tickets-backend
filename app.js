const express = require('express');                             // requiring express package
const { ObjectId } = require('mongodb');                        // requiring mongodb package
const _ = require('lodash');                                    // requiring lodash package

const bodyParser = require('body-parser');                      // requiring bodyParser package
const morgan = require('morgan');                               // requiring morgan package

const mongoose = require('./config/db');                        // requiring configured-db
const { Ticket } = require('./models/ticket');                  // requiring model-ticket
const { Employee } = require('./models/employee');              // requiring model-employee
const { User } = require('./models/user');                      // requiring model-user

const { ticketsRouter } = require('./routes/tickets');          // requiring routes-tickets
const { employeesRouter } = require('./routes/employees');      // requiring routes-employees
const { usersRouter } = require('./routes/users');              // requiring routes-users

const app = express();                                          // obtaining express() returned function 
const port = 3000;                                              // setting localhost port number

app.use(bodyParser.json());

// app.use(morgan('dev'));
app.use(morgan('short'));
// app.use(morgan('tiny'));

app.use('/tickets',ticketsRouter);
app.use('/employees',employeesRouter);
app.use('/users',usersRouter);

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

// Results 'CAST ERROR'
// app.param(':id',(req,res,next) => {
//     let id = req.params.id;
//     if(!ObjectId.isValid(id)) {
//         res.send({
//             notice: 'invalid object id'
//         })
//         return false;
//     }
//     next();
// })

// app.METHOD(PATH,HANDLER)
app.get('/',(req,res) => {
    res.send({
        msg: 'Welcome to ticket master'
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})