'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enum = require('../../lib/enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  pending: 'PENDING',
  subscribed: 'SUBSCRIBED',
  notSubscribed: 'NOT_SUBSCRIBED'
};

exports.default = new _enum2.default(definition);
//# sourceMappingURL=subscription-status.js.map
