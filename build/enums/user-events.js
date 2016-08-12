'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enum = require('../lib/enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  userInfoLoaded: 'USER_INFO_LOADED',
  userInfoCleared: 'USER_INFO_CLEARED',
  dialingPlanUpdated: 'DIALING_PLAN_UPDATED'
};

exports.default = new _enum2.default(definition);
//# sourceMappingURL=user-events.js.map
