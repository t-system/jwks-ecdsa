var createJwksClient = require('./jwksClient');
var jwkToPem = require('jwk-to-pem');

const expressJwtSecret = options => {
  if (options === null || options === undefined) {
    throw new Error(
      'An options object must be provided when initializing expressJwtSecret'
    );
  }

  const client = createJwksClient(options);

  return function secretProvider(req, header, payload, done) {
    const { kid } = header;

    client
      .getSigningKey(kid)
      .then(key => {
        var cert = jwkToPem(key);

        return done(null, cert);
      })
      .catch(error => {
        done(error);
      });
  };
};

module.exports = expressJwtSecret;
