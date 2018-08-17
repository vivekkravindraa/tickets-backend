const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    department: {
        type: String,
        enum: ['Technical', 'Sales', 'HR'],
        required: true
    },
    salary: {
        type: Number
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
    ]
});

const Employee = mongoose.model('Employees',employeeSchema);

module.exports = {
    Employee
}

// {
// 	"name": "Ram",
// 	"email": "ram@gmail.com",
// 	"department": "Technical",
// 	"salary": "30000",
// 	"ageWhileJoining": "24",
// 	"address": {
// 		"street": "29th Main Road",
// 		"city": "Bangalore",
// 		"pinCode": "560021" },
// 	"hobbies": ["Singing","Web Designing"],
// 	"luckyNumbers": [7,13,19],
// 	"mobileNumbers": [{
// 		"numType": "Home",
// 		"mobileNumber": "9140234567" }]
// }