const config = require('config');

module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        console.error("FAIL TO RUN");
        process.exit(1);
    }
}