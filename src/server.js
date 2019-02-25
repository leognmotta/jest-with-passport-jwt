const http = require('http');
const mongoose = require('mongoose').set('debug', true);
const mongoDB = 'mongodb://localhost:27017/testdb';

const app = require('./app');
const server = http.createServer(app);

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('connected to databse'))
  .on('error', error => console.warn('error: ' + error));

server.listen(process.env.PORT || 3001, () =>
  console.log(`server listening on port ${process.env.PORT || 3001}`)
);

module.exports = server;
