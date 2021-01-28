'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios');

var JwksClient = function () {
  function JwksClient(options) {
    (0, _classCallCheck3.default)(this, JwksClient);

    this.options = options;
  }

  (0, _createClass3.default)(JwksClient, [{
    key: 'getJwks',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _ref2, keys;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get(this.options.jwksUri);

              case 3:
                _ref2 = _context.sent;
                keys = _ref2.data.keys;
                return _context.abrupt('return', keys);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function getJwks() {
        return _ref.apply(this, arguments);
      }

      return getJwks;
    }()
  }, {
    key: 'getSigningKeys',
    value: function getSigningKeys(keys) {
      if (!keys || !keys.length) {
        throw new Error('The JWKS endpoint did not contain any keys');
      }

      var signingKeys = keys.filter(function (key) {
        return key.kty === 'EC' && key.kid && key.use === 'sig' && key.alg && key.x && key.y && key.crv;
      });

      if (!signingKeys.length) {
        throw new Error('The JWKS endpoint did not contain any signing keys');
      }

      return signingKeys;
    }
  }, {
    key: 'getSigningKey',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(kid) {
        var jwks, signingKeys, key;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getJwks();

              case 2:
                jwks = _context2.sent;
                signingKeys = this.getSigningKeys(jwks);
                key = signingKeys.find(function (k) {
                  return k.kid === kid;
                });

                if (key) {
                  _context2.next = 7;
                  break;
                }

                throw new Error('Unable to find a signing key that matches \'' + kid + '\'');

              case 7:
                return _context2.abrupt('return', key);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSigningKey(_x) {
        return _ref3.apply(this, arguments);
      }

      return getSigningKey;
    }()
  }]);
  return JwksClient;
}();

module.exports = function (options) {
  return new JwksClient(options);
};