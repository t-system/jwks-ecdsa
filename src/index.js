const regeneratorRuntime = require("regenerator-runtime");
const createJwksClient = require('./jwksClient');
const expressJwtSecret = require('./expressJwtSecret');

module.exports = options => {
  return createJwksClient(options);
};

module.exports.expressJwtSecret = expressJwtSecret;