var appHandle = document.getElementById('app');
var countHandle = document.getElementById('count');

var submitHandle = document.getElementById('submit');
var empNamesHandle = document.getElementById('empNames');
var numTypesHandle = document.getElementById('numTypes');
var mobNumberHandle = document.getElementById('mobNumber');

var employees;

function clickToRemove(empId, mobId) {
    var id = empId;
    var mobile_id = mobId;
    axios.delete(`http://localhost:3000/employees/${id}/mobile_numbers/${mobile_id}`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

function buildList(employee) {
    var nameh3 = document.createElement('h3');
    var nameh3Text = document.createTextNode(`${employee.name}`.toUpperCase());
    nameh3.appendChild(nameh3Text);

    var mobh4 = document.createElement('h4');
    var mobh4Text = document.createTextNode('Mobile Numbers:');
    mobh4.appendChild(mobh4Text);

    appHandle.appendChild(nameh3);
    appHandle.appendChild(mobh4);

    var ol = document.createElement('ol'); 
    employee.mobileNumbers.forEach((mobNumber) => {
        
        var li = document.createElement('li');
        li.setAttribute('type','1');
        var liText = document.createTextNode(`${mobNumber.numType} - ${mobNumber.mobileNumber} `);
        
        var a = document.createElement('a');
        var aText = document.createTextNode('Remove');
        a.setAttribute('data-method','DELETE');
        a.setAttribute('href',`http://localhost:3000/employees/${employee._id}/mobile_numbers/${mobNumber._id}`);
        a.setAttribute('empId',`${employee._id}`);
        a.setAttribute('mobId',`${mobNumber._id}`);
        a.setAttribute('onclick','clickToRemove(this.empId, this.mobId)')
        a.appendChild(aText);
        
        li.appendChild(liText);
        li.appendChild(a);
        console.log(li);
        ol.appendChild(li);
    })
    appHandle.appendChild(ol);
}

axios.get(`http://localhost:3000/employees`)
.then((response) => {
    employees = response.data;
    countHandle.innerHTML = employees.length;
    
    employees.forEach((employee) => {
        var option = document.createElement('option');
        var optionText = document.createTextNode(`${employee.name}`);
        option.setAttribute('value',`${employee._id}`);
        option.appendChild(optionText);
        empNamesHandle.appendChild(option);
        
        buildList(employee);
    })
})
.catch((err) => {
    console.log(err);
})

submitHandle.addEventListener('click',(e) => {
    e.preventDefault();

    var id = empNamesHandle.value;
    var formData = {
        numType: numTypesHandle.value,
        mobileNumber: mobNumberHandle.value
    }

    axios.post(`http://localhost:3000/employees/${id}/mobile_numbers`,formData)
    .then((response) => {
        var mobNumObj = response.data;
        console.log(mobNumObj);
    })
    .catch((err) => {
        console.log(err);
    })

}, false);