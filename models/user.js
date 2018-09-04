const mongoose = require('mongoose');

const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
                return validator.isNumeric(value) && validator.isLength(value, {min: 10, max: 10});
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

// toJSON instance method is specific to users model in this case
userSchema.methods.toJSON = function() {
    return _.pick(this, ['_id','username','email','mobile']);
}

userSchema.methods.generateToken = function() {
    let tokenData = {
        _id: this._id
    };
    
    let generatedTokenInfo = {
        access: 'auth',
        token: jwt.sign(tokenData, 'supersecret')
    }

    this.tokens.push(generatedTokenInfo);
    return this.save().then((user) => {
        return generatedTokenInfo.token;
    });
}

const User = mongoose.model('User',userSchema);

module.exports = {
    User
}