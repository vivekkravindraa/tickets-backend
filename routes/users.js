const express = require('express');
const { Employee } = require('../models/employee');
const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');
const { authenticateUser } = require('../middlewares/authentication');
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

// signup route
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

// login route
router.post('/login',(req,res) => {
    let body = _.pick(req.body, ['email','password']);
    User.findByEmailAndPassword(body.email, body.password)
    .then((user) => {
        return user.generateToken();
    })
    .then((token) => {
        res.header('x-auth',token).send();
    })
    .catch((err) => {
        res.send(err);
    })
})

// logout route
router.delete('/logout', authenticateUser, (req,res) => {
    req.locals.user.deleteToken(req.locals.token)
    .then(() => {
        res.send();
    })
    .catch(() => {
        res.send(err);
    })
})

// user profile
// between functions if we want to pass along the data, we can attach it through req.locals object
router.get('/profile',authenticateUser,(req,res) => {
    res.send(req.locals.user);
})

module.exports = {
    usersRouter: router
}