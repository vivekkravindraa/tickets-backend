const { User } = require('../models/user');

let authenticateUser = ((req,res,next) => {
    let token = req.header('x-auth');
    User.findByToken(token)
    .then((user) => {
        // between functions if we want to pass along the data, we can attach it through req.locals object
        // req.user = user;
        // req.token = token;

        // to make these data available, not only in the next function, but also to make it available in views
        req.locals = {
            user,
            token
        }
        
        // console.log('User Found',user.username);
        next();
    })
    .catch((err) => {
        res.status(401).send(err);
    })
})

module.exports = {
    authenticateUser
}