const bcrypt = require('bcryptjs');

const password = 'secret123';

// sign up / registration - hashing user password

console.log('password',password);

// generation of salt value
bcrypt.genSalt(10)
.then((salt) => {
    console.log('salt', salt);
    
    // hashing the password with salt value
    bcrypt.hash(password,salt)
    .then((hashedPassword) => {
        console.log('hashed password', hashedPassword);
    });

})
.catch((err) => {
    console.log(err);
})

// OUTPUT
// password secret123
// salt $2a$10$fq1QY4zg6jfjVshaXs1gMe
// hashed password $2a$10$fq1QY4zg6jfjVshaXs1gMepilaCFLiK3I5FCScktQqhQYAnvGl4Ra