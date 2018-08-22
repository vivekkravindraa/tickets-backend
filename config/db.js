const mongoose = require('mongoose');   // requiring mongoose // asynchronous // ODM
mongoose.Promise = global.Promise;      // native es6 promise library being used for mongoose

mongoose.connect('mongodb://localhost:27017/ticketmaster',{ useNewUrlParser: true });   // DB Connection

module.exports = mongoose;

// the role of the ODM is to map:

/*
    > a model/class to a collection
    > model's object to a collection's document
    > object's property to a document's field
*/