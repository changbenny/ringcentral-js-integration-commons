'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enum = require('../../lib/enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  flip: 'FLIPPED',
  recording: 'RECORDING',
  holding: 'HOLDING',
  muted: 'MUTED',
  parked: 'PARKED',
  transfered: 'TRANSFERRED',
  forwarded: 'FOWARDED'
};

exports.default = new _enum2.default(definition);
//# sourceMappingURL=call-status.js.map
