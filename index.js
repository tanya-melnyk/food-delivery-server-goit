'use strict';

const connectDB = require('./src/db');
const runServer = require('./src/server');

connectDB().then(runServer);
