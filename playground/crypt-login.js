const bcrypt = require('bcryptjs');

const password = 'secret123';
const hashedPasswordFromDB = '$2a$10$fq1QY4zg6jfjVshaXs1gMepilaCFLiK3I5FCScktQqhQYAnvGl4Ra';

bcrypt.compare(password, hashedPasswordFromDB)
.then((res) => {
    console.log(res);   // true
})
.catch((err) => {
    console.log(err);   // false
})