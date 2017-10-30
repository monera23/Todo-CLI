const mongoose = require('mongoose');

//define which Promise type to use - the ES6 one 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoCli', {
  useMongoClient: true
});

//Get the default connection

module.exports = { mongoose }