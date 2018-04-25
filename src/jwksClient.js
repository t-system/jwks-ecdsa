var axios = require('axios');

class JwksClient {
  constructor(options) {
    this.options = options;
  }

  async getJwks() {
    try {
      const { data: { keys } } = await axios.get(this.options.jwksUri);
      return keys;
    } catch (error) {
      throw error;
    }
  }

  getSigningKeys(keys) {
    if (!keys || !keys.length) {
      throw new Error('The JWKS endpoint did not contain any keys');
    }

    const signingKeys = keys.filter(
      key =>
        key.kty === 'EC' &&
        key.kid &&
        key.use === 'sig' &&
        key.alg &&
        key.x &&
        key.y &&
        key.crv
    );

    if (!signingKeys.length) {
      throw new Error('The JWKS endpoint did not contain any signing keys');
    }

    return signingKeys;
  }

  async getSigningKey(kid) {
    const jwks = await this.getJwks();
    const signingKeys = this.getSigningKeys(jwks);
    const key = signingKeys.find(k => k.kid === kid);
    if (!key) {
      throw new Error(`Unable to find a signing key that matches '${kid}'`);
    }

    return key;
  }
}

module.exports = options => {
  return new JwksClient(options);
};
