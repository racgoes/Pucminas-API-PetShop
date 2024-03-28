
const httpStatus = require('http-status-codes');

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log('Token verified');
        next();
    } else {
        console.log('Token not valid');
        res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
    }
    
}

module.exports = verifyToken;