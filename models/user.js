const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: 'the email id is incorrect'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isNumeric(value) && validator.isLength(10);
            },
            message: 'should be 10 digits'
        }
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
})

const User = mongoose.model('User',userSchema);

module.exports = {
    User
}