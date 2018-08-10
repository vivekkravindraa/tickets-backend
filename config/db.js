const mongoose = require('mongoose');   // requiring mongoose // asynchronous // odm
mongoose.Promise = global.Promise;      // native es6 promise library being used for mongoose

mongoose.connect('mongodb://localhost:27017/ticketmaster',{ useNewUrlParser: true });

module.exports = mongoose;