module.exports = function (error, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send('something failed');
};