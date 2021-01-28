'use strict';

var createJwksClient = require('./jwksClient');
var expressJwtSecret = require('./expressJwtSecret');

module.exports = function (options) {
  return createJwksClient(options);
};

module.exports.expressJwtSecret = expressJwtSecret;