const config = require('config');

module.exports = function () {
    if (!config.get("JWT_SECRET")) {
        console.error("FAIL TO RUN");
        process.exit(1);
    }
}