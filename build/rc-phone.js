'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _addModule = require('./lib/add-module');

var _addModule2 = _interopRequireDefault(_addModule);

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _ringcentralClient = require('ringcentral-client');

var _ringcentralClient2 = _interopRequireDefault(_ringcentralClient);

var _rcModule = require('./lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _settings = require('./modules/settings');

var _settings2 = _interopRequireDefault(_settings);

var _brand = require('./modules/brand');

var _brand2 = _interopRequireDefault(_brand);

var _auth = require('./modules/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./modules/user');

var _user2 = _interopRequireDefault(_user);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REDUCER = (0, _symbol2.default)();

function getStoreRegisterAndResolver() {
  var handlers = new _set2.default();
  return [function (fn) {
    return handlers.add(fn);
  }, function (store) {
    return handlers.forEach(function (fn) {
      return fn(store);
    });
  }];
}

var RcPhone = function (_RcModule) {
  (0, _inherits3.default)(RcPhone, _RcModule);

  function RcPhone(_ref) {
    var registerStoreHandler = _ref.registerStoreHandler;
    var stateMapper = _ref.stateMapper;
    var _ref$prefix = _ref.prefix;
    var prefix = _ref$prefix === undefined ? 'rc' : _ref$prefix;
    var sdkSettings = _ref.sdkSettings;
    var defaultBrand = _ref.defaultBrand;
    (0, _classCallCheck3.default)(this, RcPhone);

    var register = registerStoreHandler;
    var resolve = void 0;
    if (!register) {
      var _getStoreRegisterAndR = getStoreRegisterAndResolver();

      var _getStoreRegisterAndR2 = (0, _slicedToArray3.default)(_getStoreRegisterAndR, 2);

      register = _getStoreRegisterAndR2[0];
      resolve = _getStoreRegisterAndR2[1];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RcPhone).call(this, {
      registerStoreHandler: register,
      stateMapper: stateMapper
    }));

    _addModule2.default.call(_this, 'sdk', new _ringcentral2.default((0, _extends3.default)({

      cachePrefix: prefix + '-'
    }, sdkSettings)));

    _addModule2.default.call(_this, 'platform', _this.sdk.platform());

    _addModule2.default.call(_this, 'api', new _ringcentralClient2.default(_this.sdk));

    _addModule2.default.call(_this, 'settings', new _settings2.default({
      registerStoreHandler: register,
      stateMapper: function stateMapper(state) {
        return state.settings;
      }
    }));

    _addModule2.default.call(_this, 'defaultBrand', new _brand2.default((0, _extends3.default)({
      registerStoreHandler: register,
      prefix: prefix + '-default',
      stateMapper: function stateMapper(state) {
        return state.defaultBrand;
      }
    }, defaultBrand)));
    _addModule2.default.call(_this, 'auth', new _auth2.default({
      registerStoreHandler: register,
      stateMapper: function stateMapper(state) {
        return state.auth;
      },
      prefix: prefix,
      defaultBrand: _this.defaultBrand,
      platform: _this.platform
    }));

    _addModule2.default.call(_this, 'user', new _user2.default({
      registerStoreHandler: register,
      stateMapper: function stateMapper(state) {
        return state.user;
      },
      prefix: prefix,
      api: _this.api,
      auth: _this.auth,
      platform: _this.platform,
      settings: _this.settings
    }));

    // combine reducers
    _this[REDUCER] = (0, _redux.combineReducers)({
      defaultBrand: _this.defaultBrand.reducer,
      auth: _this.auth.reducer,
      user: _this.user.reducer,
      settings: _this.settings.reducer
    });

    if (resolve) {
      resolve((0, _redux.createStore)(_this.reducer));
    }
    return _this;
  }

  (0, _createClass3.default)(RcPhone, [{
    key: 'reducer',
    get: function get() {
      return this[REDUCER];
    }
  }]);
  return RcPhone;
}(_rcModule2.default);

/**
 * @class RcPhone
 * Default RingCentral phone class, provide feature complete ringcentral phone without UI.
 * Application builders can directly use RcBase and build their own phone class if they need
 * different sets of modules.
 */
// export default class RcPhone extends RcBase {
//   constructor({
//     sdkSettings: {
//       appKey,
//       appSecret,
//       cachePrefix = 'rc',
//       server,
//     },
//     brandSettings, // TODO: should we default to rcus?
//   }) {
//     super();

//     this.addModule('sdk', new RingCentral({
//       appKey,
//       appSecret,
//       cachePrefix: `${cachePrefix}`,
//       server,
//     }));

//     const client = new RingCentralClient(this.sdk);
//     this.addModule('client', client);

//     this.addModule('brand', new Brand(brandSettings));
//     this.addModule('auth', new Auth({
//       ...this,
//       platform: this.sdk.platform(),
//     }));
//   }
// }


exports.default = RcPhone;
//# sourceMappingURL=rc-phone.js.map
