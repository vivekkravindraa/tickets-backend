const express = require('express');
const { Employee } = require('../models/employee');
const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');
const _ = require('lodash');

const router = express.Router();

router.get('/',(req,res) => {
    User.find()
    .then((user) => {
        res.send(user);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/',(req,res) => {
    let body = _.pick(req.body, ['username','email','password','mobile']);
    let user = new User(body);

    user.save()
    .then((user) => {
        // console.log(user);
        return user.generateToken();
    })
    .then((token) => {
        // console.log(token);
        // console.log(user);
        res.header('x-auth', token).send(user);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
})

module.exports = {
    usersRouter: router
}