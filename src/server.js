const app = require('./app');
const config = require('config');

const defaultPort = config.get('PORT');
const PORT = process.env.PORT || defaultPort;

const runServer = () => {
  app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = runServer;
