require('babel-polyfill');

const env = process.env.NODE_ENV || 'development';
  require('babel-register');
  module.exports = require('./src');
// if(env !== 'production'){
//   module.exports = require('./dist');
// } else {

// }

