const logger = require('./utils/logger');
const express = require('express');
const app = express();

require("express-async-errors");
require('./startup/unHandledCaught')();
require('./startup/routes')(app);
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}... 🚀 🐘 `));