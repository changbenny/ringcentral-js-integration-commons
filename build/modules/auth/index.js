'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _symbolMap = require('../../lib/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _loginStatus = require('../../enums/login-status');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _authActions = require('./auth-actions');

var _authActions2 = _interopRequireDefault(_authActions);

var _authReducer = require('./auth-reducer');

var _authReducer2 = _interopRequireDefault(_authReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['defaultBrand', 'platform', 'handlers']);

var Auth = function (_RcModule) {
  (0, _inherits3.default)(Auth, _RcModule);

  function Auth(_ref) {
    var registerStoreHandler = _ref.registerStoreHandler;
    var stateMapper = _ref.stateMapper;
    var prefix = _ref.prefix;
    var defaultBrand = _ref.defaultBrand;
    var platform = _ref.platform;
    (0, _classCallCheck3.default)(this, Auth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Auth).call(this, {
      registerStoreHandler: registerStoreHandler,
      stateMapper: stateMapper,
      prefix: prefix,
      actions: _authActions2.default
    }));

    _this[symbols.defaultBrand] = defaultBrand;
    _this[symbols.platform] = platform;
    _this[symbols.handlers] = new _map2.default();

    platform.on(platform.events.loginSuccess, function () {
      _this.store.dispatch({
        type: _this.actions.loginSuccess
      });
    });
    platform.on(platform.events.loginError, function (error) {
      _this.store.dispatch({
        type: _this.actions.loginError,
        error: error
      });
    });
    platform.on(platform.events.logoutSuccess, function () {
      _this.store.dispatch({
        type: _this.actions.logoutSuccess
      });
    });
    platform.on(platform.events.refreshError, function (error) {
      _this.store.dispatch({
        type: _this.actions.refreshError,
        error: error
      });
    });

    platform.loggedIn().then(function (status) {
      _this.store.dispatch({
        type: _this.actions.initAuth,
        status: status ? _loginStatus2.default.userAccess : _loginStatus2.default.notLoggedIn
      });
    });
    return _this;
  }

  (0, _createClass3.default)(Auth, [{
    key: 'login',

    /**
     * @function ensureClientCredential
     * @description ensure that a valid token with at least client credential access is obtained
     * @return {Promise}
     * */
    // async ensureClientAccess() {
    //   // if (await this.getLoggedInStatus() === loginStatus.notLoggedIn) {
    //   const resp = await this[symbols.platform]._tokenRequest('/restapi/oauth/token', {
    //     grant_type: 'client_credentials',
    //     brand_id: this[symbols.defaultBrand].id,
    //   });
    //   this[symbols.platform].auth().setData(resp.json());
    //   // }
    // }

    /**
     * @typedef LoginOptions
     * @type Object
     * @property {string} username
     * @property {string} password
     * @property {string} extension
     * @property {boolean} remember
     */

    /**
     * @function
     * @description async login function
     * @param {LoginOptions} options
     * @return {Promise}
     */
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var username = _ref2.username;
        var password = _ref2.password;
        var extension = _ref2.extension;
        var remember = _ref2.remember;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // dispatch a login action to change status to userAccessPending
                this.store.dispatch({
                  type: this.actions.login,
                  payload: {
                    username: username,
                    password: password,
                    extension: extension,
                    remember: remember
                  }
                });
                _context.next = 3;
                return this[symbols.platform].login({
                  username: username,
                  password: password,
                  extension: extension,
                  remember: remember
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x) {
        return ref.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'logout',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this[symbols.platform].logout();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logout() {
        return ref.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: 'getStatus',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this[symbols.platform].loggedIn();

              case 2:
                return _context3.abrupt('return', this.state.status);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getStatus() {
        return ref.apply(this, arguments);
      }

      return getStatus;
    }()
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _authReducer2.default)({
        status: _loginStatus2.default.pending,
        error: null
      }, this.prefix);
    }
  }]);
  return Auth;
}(_rcModule2.default);

exports.default = Auth;
//# sourceMappingURL=index.js.map
