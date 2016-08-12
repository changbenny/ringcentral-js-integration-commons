'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getUserReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _userActions = require('./user-actions');

var _userActions2 = _interopRequireDefault(_userActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  accountInfo: null,
  extensionInfo: null,
  dialingPlans: [],
  phoneNumbers: [],
  forwardingNumbers: [],
  blockedNumbers: []
};

function getUserReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_userActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.loadUserInfo:
        return (0, _assign2.default)({}, state, action.payload);

      case actions.clearUserInfo:
        return (0, _assign2.default)({}, state, initialState);

      default:
        return state;
    }
  };
}
//# sourceMappingURL=user-reducer.js.map
