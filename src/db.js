'use strict';

const config = require('config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoDB connection URL and database name
const dbName = config.get('dbName');
const dbURI = config.get('dbURI');
// or
// const dbURI =
//   "mongodb+srv://Test-user:" +
//   process.env.MONGO_ATLAS_PW +
//   "@test-so7gz.mongodb.net/test";

const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName,
  w: 'majority',
  retryWrites: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, connectionOptions);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
