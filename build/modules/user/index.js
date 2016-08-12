'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var loadInfo = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var _this = this;

    var _map, _map2, accountInfo, extensionInfo, dialingPlans, phoneNumbers, forwardingNumbers, blockedNumbers;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _promise2.default.all([this[symbols.api].account().loadAccount(), this[symbols.api].extension().loadExtensionInfo(), _utils.fetchList.call(this, function (options) {
              return _this[symbols.api].account().listDialingPlans(options);
            }), _utils.fetchList.call(this, function (options) {
              return _this[symbols.api].extension().listExtensionPhoneNumbers(options);
            }), _utils.fetchList.call(this, function (options) {
              return _this[symbols.api].forwardingNumbers().listExtensionForwardingNumbers(options);
            }), _utils.fetchList.call(this, function (options) {
              return _this[symbols.api].blockedNumbers().listBlockedNumbers(options);
            })]);

          case 3:
            _context.t0 = function (data) {
              return (0, _utils.extractData)(data);
            };

            _map = _context.sent.map(_context.t0);
            _map2 = (0, _slicedToArray3.default)(_map, 6);
            accountInfo = _map2[0];
            extensionInfo = _map2[1];
            dialingPlans = _map2[2];
            phoneNumbers = _map2[3];
            forwardingNumbers = _map2[4];
            blockedNumbers = _map2[5];


            this.store.dispatch({
              type: this.actions.loadUserInfo,
              payload: {
                accountInfo: accountInfo,
                extensionInfo: extensionInfo,
                dialingPlans: dialingPlans,
                phoneNumbers: phoneNumbers,
                forwardingNumbers: forwardingNumbers,
                blockedNumbers: blockedNumbers
              }
            });
            this[symbols.emitter].emit(_userEvents2.default.userInfoLoaded);
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t1 = _context['catch'](0);

            // TODO send error out
            console.log(_context.t1);
            this[symbols.auth].logout();

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 16]]);
  }));
  return function loadInfo() {
    return ref.apply(this, arguments);
  };
}();

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _symbolMap = require('../../lib/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _utils = require('../../lib/utils');

var _loginStatus = require('../../enums/login-status');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _userActions = require('./user-actions');

var _userActions2 = _interopRequireDefault(_userActions);

var _userReducer = require('./user-reducer');

var _userReducer2 = _interopRequireDefault(_userReducer);

var _componentEmitter = require('component-emitter');

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _userEvents = require('../../enums/user-events');

var _userEvents2 = _interopRequireDefault(_userEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['api', 'auth', 'platform', 'emitter', 'settings']);

var initialState = {
  test: true
};

function getUserSettingsReducer(prefix) {
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {
      default:
        return state;
    }
  };
}

var User = function (_RcModule) {
  (0, _inherits3.default)(User, _RcModule);

  function User(options) {
    var _this3 = this;

    (0, _classCallCheck3.default)(this, User);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(User).call(this, (0, _extends3.default)({}, options, {
      actions: _userActions2.default
    })));

    var api = options.api;
    var auth = options.auth;
    var platform = options.platform;
    var settings = options.settings;

    _this2[symbols.api] = api;
    _this2[symbols.auth] = auth;
    _this2[symbols.platform] = platform;
    _this2[symbols.emitter] = new _componentEmitter2.default();
    _this2[symbols.settings] = settings;

    settings.registerReducer('user', getUserSettingsReducer());

    // load info on login
    platform.on(platform.events.loginSuccess, function () {
      loadInfo.call(_this2);
    });
    // unload info on logout
    platform.on(platform.events.logoutSuccess, function () {
      _this2.store.dispatch({
        type: _this2.actions.clearUserInfo
      });
      _this2[symbols.emitter].emit(_userEvents2.default.userInfoCleared);
    });
    // load info if already logged in
    (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return auth.getStatus();

            case 2:
              _context2.t0 = _context2.sent;
              _context2.t1 = _loginStatus2.default.userAccess;

              if (!(_context2.t0 === _context2.t1)) {
                _context2.next = 7;
                break;
              }

              _context2.next = 7;
              return loadInfo.call(_this2);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this3);
    }))();

    /**
     * TODO:
     *   1. Dialing Plan Checking
     */
    return _this2;
  }

  (0, _createClass3.default)(User, [{
    key: 'on',
    value: function on(event, handler) {
      var _this4 = this;

      this[symbols.emitter].on(event, handler);
      return function () {
        _this4.off(event, handler);
      };
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      this[symbols.emitter].off(event, handler);
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _userReducer2.default)(this.prefix);
    }
  }, {
    key: 'directNumbers',
    get: function get() {
      return this.state.phoneNumbers.filter(function (n) {
        return n.usageType === 'DirectNumber';
      });
    }
  }, {
    key: 'mainCompanyNumber',
    get: function get() {
      return this.state.phoneNumbers.find(function (n) {
        return n.usageType === 'MainCompanyNumber';
      });
    }
  }, {
    key: 'dialingPlans',
    get: function get() {
      return this.state.dialingPlans;
    }
  }, {
    key: 'extensionNumber',
    get: function get() {
      return this.state.extensionInfo.extensionNumber;
    }
  }, {
    key: 'smsNumbers',
    get: function get() {
      return this.state.phoneNumbers.filter(function (n) {
        return n.features.indexOf('SmsSender') > -1;
      });
    }
  }]);
  return User;
}(_rcModule2.default);

exports.default = User;
//# sourceMappingURL=index.js.map
