const mongoose = require('../config/db');
const {Employee} = require('../models/employee');

// updating after adding or removing ::

// adding into an array
// finding the record in which the value need to be added, by its '_id'

// Employee.findById('5b753a9c4287de2e72b2d28a')
// .then((employee) => {
//     employee.hobbies.push('Swimming');
//     employee.save()
//     .then((employee) => {
//         console.log(employee);
//     })
// })

// removing from an array
// finding the record in which the value need to be removed, by its '_id'

// Employee.findById('5b753a9c4287de2e72b2d28a')
// .then((employee) => {
//     let index = employee.luckyNumbers.indexOf(13);
//     if(index >= 0) {
//         employee.luckyNumbers.splice(index, 1);
//     }
//     employee.save()
//     .then((employee) => {
//         console.log(employee);
//     })
// })

// remove an element from an array of objects

// Employee.findById('5b753a9c4287de2e72b2d28a')
// .then((employee) => {
//     employee.mobileNumbers.remove('5b753a9c4287de2e72b2d28b');
//     employee.save()
//     .then((employee) => {
//         console.log(employee);
//     })
// })

// finding an object inside an array by .id and updating

// Employee.findById('5b753a9c4287de2e72b2d28a')
// .then((employee) => {
//     let contact = employee.mobileNumbers.id('5b7673c2b935721520b6f8fc');
//     contact.numType = 'Personal';
//     employee.save()
//     .then((employee) => {
//         console.log(employee);
//     })
// })

// adding a new object into an array

// Employee.findById('5b753a9c4287de2e72b2d28a')
// .then((employee) => {
//     employee.mobileNumbers.push({
//         numType: 'Home',
//         mobileNumber: '1376457923'
//     })
//     employee.save()
//     .then((employee) => {
//         console.log(employee);
//     })
// })

// updating an object

// Employee.findById('5b753a9c4287de2e72b2d28a')
// .then((employee) => {
//     employee.address = {
//         street: 'Periyar Street',
//         city: 'Chennai',
//         pinCode: 234156
//     }
//     employee.save()
//     .then((employee) => {
//         console.log(employee);
//     })
// })