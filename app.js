const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express(); 
const port = 3000;

app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use(morgan('short'));
// app.use(morgan('tiny'));

app.get('/',(req,res) => {
    res.send({
        msg: 'Welcome to ticket master'
    })
})

app.listen(port, () => {
    console.log('Listening on port',port);
})