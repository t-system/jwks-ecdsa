# jwks-ecdsa
 A small library to retrieve ECDSA signing keys from a JWKS (JSON Web Key Set) endpoint

> npm install --save jwks-ecdsa

If you are looking for a similar library but for RSA algorithms, see [node-jwks-rsa](https://github.com/auth0/node-jwks-rsa)

## Usage

You'll provide the client with the JWKS endpoint which exposes your signing keys. Using the `getSigningKey` you can then get the signing key that matches a specific `kid`.

```js
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://your.jwks.endpoint.com'
});

const kid = 'abcdefghijklmnopqrstuvwxyz';
client.getSigningKey(kid).then(key => {
    // do something with key, i.e. verify a token, configure an express/hapi middleware, etc. 
});
```

## Express Integration

The `jwks-ecdsa` library provides a small helper that makes it easy to configure `express-jwt`. 

Using `expressJwtSecret` you can generate a secret provider that will provide the right signing key to `express-jwt` based on the `kid` in the JWT header.

```js
var express = require('express');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

...

// Initialize the app.
var app = new express();

app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'https://your.jwks.endpoint.com'
  }),

  // Validate the audience and the issuer.
  audience: 'myaudience',
  issuer: 'myissuer',
  
  // If you need to pass the token through a query parameter or a cookie
  getToken: function fromHeaderOrQuerystring(req) {
    // extract token
  }
}));
```

In this scenario, `express-jwt` is handling the verification of the token. If you'd rather use your own solution/middleware you can also use [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) or another library to verify

```js
var jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');

...

var client = createJwksClient(options);
client.getSigningKey(kid).then(function (key) {
  var secret = jwkToPem(key);
  jwt.verify(token, secret);
});
```