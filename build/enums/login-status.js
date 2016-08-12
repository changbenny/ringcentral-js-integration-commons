'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enum = require('../lib/enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  pending: 0, // after init, before status from platform is determined
  notLoggedIn: 1,
  clientAccessPending: 2,
  clientAccess: 3,
  userAccessPending: 4,
  userAccess: 5
};

exports.default = new _enum2.default(definition);
//# sourceMappingURL=login-status.js.map
