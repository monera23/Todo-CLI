const mongoose = require('mongoose');

//define which Promise type to use - the ES6 one 
mongoose.Promise = global.Promise;
let url = "mongodb://localhost:27017/TodoCli";

if (process.env.NODE_ENV == 'test') {
	url += 'Test';
}
mongoose.connect(url, {
  useMongoClient: true
});

//Get the default connection

module.exports = { mongoose }