const { verifyToken } = require('../utils/token');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('no token provided');
    try {
        req.user = verifyToken(token);
        next();
    } catch (ex) {
        res.status(400).send(ex.message);
    }
}