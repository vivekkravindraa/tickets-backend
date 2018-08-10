const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('./config/db');

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

})

app.listen(port, () => {
    console.log('Listening on port',port);
})