const express = require('express');
const { Employee } = require('../models/employee');
const { Ticket } = require('../models/ticket');
const _ = require('lodash');

const router = express.Router();

router.get('/:id/tickets',(req,res) => {
    let id = req.params.id;

    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Ticket.find({ employee: id }).populate('employee')
    .then((tickets) => {
        if(tickets.length === 0) {
            res.send({
                notice: 'no tickets found'
            })
        }
        res.send({
            tickets,
            notice: 'Displaying the tickets belonging to employee id'
        });
    })
    .catch((err) => {
        res.send(err);
    })
})

// GET /employees/list?sort=name&order=ASC
router.get('/list',(req,res) => {
    let params = req.query;
    let orderBy = params.order == "ASC" ? 1: -1;
    let query = {};
    query[params.sort] = orderBy;

    Employee.find().sort(query)
    .then((employees) => {
        res.send(employees);
    })
    .catch((err) => {
        res.send(err);
    })
})

// GET /employees/listByAge?min=20&max=30
router.get('/listByAge',(req,res) => {
    let params = req.query;
    
    Employee.where('ageWhileJoining').gte(parseInt(params.min)).lte(parseInt(params.max))
    .then((employees) => {
        res.send(employees);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/',(req,res) => {
    Employee.find()
    .then((employees) => {
        res.send(employees);
    })
    .catch((err) => {
        res.send(err);
    })
})

// calling an user-defined 'instance method' shortInfo()
router.get('/:id',(req,res) => {
    Employee.findById(req.params.id).populate('tickets')
    .then((employee) => {
        res.send(employee.shortInfo());
    })
    .catch((err) => {
        res.send(err);
    });
});

// calling 'instance method' on the value returned [{},{},{},...] by the class 'Employee' 
router.get('/show/short_info',(req,res) => {
    Employee.find()
    .then((employees) => {
        // using 'for - of' as a substitute for 'forEach'
        // let result = [];
        // for(let emp of employees) {
        //    result.push(emp.shortInfo())
        // }
        // res.send(result);
        let result = employees.map(emp => emp.shortInfo());
        res.send(result);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.get('/:id',(req,res) => {
    let id = req.params.id;

    // checking whether the id is valid or not
    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Employee.findById(id)
    .then((employee) => {
        // checking whether the id is available or not
        if(employee) {
            res.send({
                employee,
                notice: 'Successfully obtained the employee'
            });
        } else {
            res.send({
                notice: 'Employee not found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/',(req,res) => {
    // let body = req.body;

    // _.pick() provided by lodash library
    // strong parameter check
    let body = _.pick(req.body, ['name','email','department','salary','ageWhileJoining','address','hobbies','luckyNumbers','mobileNumbers','tickets']);
    let employee = new Employee(body);

    employee.save()
    .then((employee) => {
        res.send({
            employee,
            notice: 'Successfully created the employee'
        });
    })
    .catch((err) => {
        res.send(err);
    })
})

// router.put('/:id',(req,res) => {
//     let id = req.params.id;
//     let body = req.body;

//     // if(!ObjectId.isValid(id)) {
//     //     res.send({
//     //         notice: 'invalid object id'
//     //     })
//     // }

//     // parameters allowed to be updated
//     // let body = _.pick(req.body, []);

//     Employee.findByIdAndUpdate(id, { $set: body}, { new: true})
//     .then((employee) => {
//         if(employee) {
//             res.send({
//                 employee,
//                 notice: 'Successfully updated the employee'
//             });
//         } else {
//             res.send({
//                 notice: 'Employee not found'
//             });
//         }
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// })

// applying runValidators to perform the validations
router.put('/:id',(req,res) => {
    let id = req.params.id;
    let body = req.body;

    Employee.findByIdAndUpdate(id, { $set: body}, { new: true, runValidators: true})
    .then((employee) => {
        if(employee) {
            res.send({
                employee,
                notice: 'Successfully updated the employee'
            });
        } else {
            res.send({
                notice: 'Employee not found'
            });
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.delete('/:id',(req,res) => {
    let id = req.params.id;
    
    // if(!ObjectId.isValid(id)) {
    //     res.send({
    //         notice: 'invalid object id'
    //     })
    // }

    Employee.findByIdAndRemove(id)
    .then((employee) => {
        if(employee) {
            res.send({
                employee,
                notice: 'Successfully deleted the employee'
            });
        } else {
            res.send({
                notice: 'Employee not found'
            });
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/:id/mobile_numbers',(req,res) => {
    let id = req.params.id;
    
    Employee.findById(id).select(['id','name','mobileNumbers'])
    .then((employee) => {
        if(employee) {
            res.send(employee);
        }
        res.send({
            notice:  'Employee not found'
        })
    }).catch((err) => {
        res.send(err);
    })
})

router.post('/:id/mobile_numbers',(req,res) => {
    let id = req.params.id;
    let body = req.body;

    Employee.findById(id)
    .then((employee) => {
        if(employee) {
            employee.mobileNumbers.push(body);
            return employee.save();                 // resolving the promise in the next .then(){} block
        }
        res.send({
            notice: 'Employee not found'
        })
    })
    .then((employee) => {
        let newMobile = employee.mobileNumbers[employee.mobileNumbers.length - 1];
        res.send({
            newMobile,
            notice: 'Successfully added mobile number'
        })
    }).catch((err) => {
        res.send(err);
    })
})

router.put('/:id/mobile_numbers/:mobile_id',(req,res) => {
    let id = req.params.id;
    let mobileId = req.params.mobile_id;
    let body = _.pick(req.body, ['numType','mobileNumber']);

    Employee.findById(id)
    .then((employee) => {
        if(employee) {
            let mobileDetail = employee.mobileNumbers.id(mobileId);
            mobileDetail.numType = body.numType ? body.numType : mobileDetail.numType;
            mobileDetail.mobileNumber = body.mobileNumber ? body.mobileNumber : mobileDetail.mobileNumber;
            return employee.save()
        }
        res.send({
            notice: 'Employee not found'
        })
    })
    .then((employee) => {
        res.send({
            mobileNumber: employee.mobileNumbers.id(mobileId),
            notice: 'Successfully updated mobile number'
        })
    })
    .catch((err) => {
        res.send(err)
    })
})

router.delete('/:id/mobile_numbers/:mobile_id',(req,res) => {
    let id = req.params.id;
    let mobileId = req.params.mobile_id;
    
    Employee.findById(id)
    .then((employee) => {
        if(employee) {
            employee.mobileNumbers.remove(mobileId);
            return employee.save()
        }
        res.send({
            notice: 'Employee not found'
        })
    }).then((employee) => {
        res.send({
            notice: 'Successfully removed the contact number'
        })
    })
    .catch((err) => {
        res.send(err);
    })
})

module.exports = {
    employeesRouter: router
}