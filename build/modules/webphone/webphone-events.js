'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webphoneEvents = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _enum = require('../../lib/enum');

var _enum2 = _interopRequireDefault(_enum);

var _webphoneStatus = require('./webphone-status');

var _webphoneStatus2 = _interopRequireDefault(_webphoneStatus);

var _callStatus = require('./call-status');

var _callStatus2 = _interopRequireDefault(_callStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventDefinitions = (0, _extends3.default)({}, _webphoneStatus2.default, _callStatus2.default);

var webphoneEvents = exports.webphoneEvents = new _enum2.default(eventDefinitions);
//# sourceMappingURL=webphone-events.js.map
