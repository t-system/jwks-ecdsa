'use strict';

var createJwksClient = require('./jwksClient');
var jwkToPem = require('jwk-to-pem');

var expressJwtSecret = function expressJwtSecret(options) {
  if (options === null || options === undefined) {
    throw new Error('An options object must be provided when initializing expressJwtSecret');
  }

  var client = createJwksClient(options);

  return function secretProvider(req, header, payload, done) {
    var kid = header.kid;


    client.getSigningKey(kid).then(function (key) {
      var cert = jwkToPem(key);

      return done(null, cert);
    }).catch(function (error) {
      done(error);
    });
  };
};

module.exports = expressJwtSecret;