module.exports = function (error, req, res, next) {
    logger.error(error)
    return res.status(500).send("something went wrong");
};