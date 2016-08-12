'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enum = require('../../lib/enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  // For registering
  preRegister: 'PRE_REGISTER',
  registerSuccessed: 'REGISTER_SUCCESSED',
  registerFailed: 'REGISTER_FAILED',
  // For callout and active call
  callConnecting: 'CALL_CONNECTING',
  callConnected: 'CALL_CONNECTED',
  callFailed: 'CALL_FAILED',
  // For incoming call
  callIncoming: 'CALL_INCOMING'
};

exports.default = new _enum2.default(definition);
//# sourceMappingURL=webphone-status.js.map
