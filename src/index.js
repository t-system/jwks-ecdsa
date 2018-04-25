var createJwksClient = require('./jwksClient');
const expressJwtSecret = require('./expressJwtSecret');

module.exports = options => {
  return createJwksClient(options);
};

module.exports.expressJwtSecret = expressJwtSecret;