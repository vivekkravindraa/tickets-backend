const mongoose = require('mongoose');       // requiring mongoose

const Schema = mongoose.Schema;             // obtaining the Schema object

const employeeSchema = new Schema({         // creating the Schema
    name: {
        type: String,  
        required: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z ]*$/.test(value); 
            },
            message: function(props) {
                return `${props.path} must contain only alphabets`;
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(userInput) {
                return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(userInput);
            },
            message: function(props) {
                return `${props.path} is not valid`;
            }
        }
    },
    department: {
        type: String,
        enum: ['Technical', 'Sales', 'HR'],
        required: true
    },
    salary: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 10000 ? true : false;
            },
            message: function(props) {
                return `${props.path} is not valid`
            }
        }
    },
    ageWhileJoining: {
        type: Number,
        min: 18,
        max: 65
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        pinCode: {
            type: Number
        }
    },
    hobbies: [ String ],        // hobbies: ['singing','drawing','reading']
    luckyNumbers: [ Number ],   // luckyNumbers: [7,13,19]
    mobileNumbers: [
        {
            numType: {
                type: String
            },
            mobileNumber: {
                type: String
            }
        }
    ],
    tickets: [ {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    } ]
});

employeeSchema.methods.shortInfo = function() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        numberCount: this.mobileNumbers.length,
        tickets: this.tickets
    }
}

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = {
    Employee
}

// Sample Object

// {
// 	"name": "Ram",
// 	"email": "ram@gmail.com",
// 	"department": "Technical",
// 	"salary": 30000,
// 	"ageWhileJoining": 24,
// 	"address": {
// 		"street": "29th Main Road",
// 		"city": "Bangalore",
// 		"pinCode": 560021 },
// 	"hobbies": ["Singing","Web Designing"],
// 	"luckyNumbers": [7,13,19],
// 	"mobileNumbers": [{
// 		"numType": "Home",
// 		"mobileNumber": "9140234567" }]
// }