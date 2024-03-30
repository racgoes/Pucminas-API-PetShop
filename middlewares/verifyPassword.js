const usersService = require('../services/users.service');

async function verifyPassword(req, res, next) {
    const { name, password } = req.body;

    console.log('req.body', req.body);

    const user = await usersService.getOneUserByUsername(name);
    console.log('user', user);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const isPasswordValid = await usersService.comparePasswords(password, user[0].password);
    console.log('isPasswordValid', isPasswordValid);
    if (!isPasswordValid) {
        res.status(401).json({ 'message': 'Invalid password' });
        return;
    }
    console.log('Password verified');
    next();
}

module.exports = verifyPassword;