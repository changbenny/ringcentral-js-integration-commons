'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enum = require('../../lib/enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  pending: 'PENDING', // after init, before status from platform is determined
  notLoggedIn: 'NOT_LOGGED_IN',
  loggingIn: 'LOGGING_IN',
  loggedIn: 'LOGGED_IN',
  loggingOut: 'LOGGING_OUT'
};

exports.default = new _enum2.default(definition);
//# sourceMappingURL=login-status.js.map
