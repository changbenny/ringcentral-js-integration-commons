'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbolMap = require('./symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _reduxHelper = require('./redux-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['store', 'mapper', 'prefix', 'actions']);

function defaultReducer(state) {
  if (typeof state === 'undefined') return {};
  return state;
}
function defaultMapper(state) {
  return state;
}

var RcModule = function () {
  function RcModule(_ref) {
    var _this = this;

    var registerStoreHandler = _ref.registerStoreHandler;
    var _ref$stateMapper = _ref.stateMapper;
    var stateMapper = _ref$stateMapper === undefined ? defaultMapper : _ref$stateMapper;
    var prefix = _ref.prefix;
    var actions = _ref.actions;
    (0, _classCallCheck3.default)(this, RcModule);

    this[symbols.mapper] = stateMapper;
    this[symbols.prefix] = prefix;
    this[symbols.actions] = actions && (0, _reduxHelper.prefixActions)(actions, prefix);
    registerStoreHandler(function (store) {
      _this[symbols.store] = store;
    });
  }

  (0, _createClass3.default)(RcModule, [{
    key: 'state',
    get: function get() {
      return this[symbols.mapper](this[symbols.store].getState());
    }
  }, {
    key: 'reducer',
    get: function get() {
      return defaultReducer;
    }
  }, {
    key: 'store',
    get: function get() {
      return this[symbols.store];
    }
  }, {
    key: 'prefix',
    get: function get() {
      return this[symbols.prefix];
    }
  }, {
    key: 'actions',
    get: function get() {
      return this[symbols.actions];
    }
  }]);
  return RcModule;
}();

/*

  //need away to return reducer for store creation
  //and accept created store to dispatch events

  class TestModule extends RcModule {

  }


  class RcPhone extends RcModule {
    constructor({
      settings,
      getStore,
    }) {

    }


  }


*/


exports.default = RcModule;
//# sourceMappingURL=rc-module.js.map
