'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getReducer;

var _authActions = require('./auth-actions');

var _authActions2 = _interopRequireDefault(_authActions);

var _reduxHelper = require('../../lib/redux-helper');

var _loginStatus = require('../../enums/login-status');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getReducer(initialState, prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_authActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);

    if (!action) return state;

    switch (action.type) {

      case actions.initAuth:
        return (0, _assign2.default)({}, state, { status: action.status });

      case actions.login:
        return (0, _assign2.default)({}, state, {
          status: _loginStatus2.default.userAccessPending,
          error: null
        });

      case actions.loginSuccess:
        return (0, _assign2.default)({}, state, {
          status: _loginStatus2.default.userAccess,
          error: null
        });

      case actions.logoutSuccess:
        return (0, _assign2.default)({}, state, {
          status: _loginStatus2.default.notLoggedIn,
          error: null
        });

      case actions.loginError:
        return (0, _assign2.default)({}, state, {
          state: _loginStatus2.default.notLoggedIn,
          error: action.error
        });

      case actions.logoutError:
        return (0, _assign2.default)({}, state, {
          error: action.error
        });

      default:
        return state;
    }
  };
}
//# sourceMappingURL=auth-reducer.js.map
