'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _brandActions = require('./brand-actions');

var _brandActions2 = _interopRequireDefault(_brandActions);

var _brandReducer = require('./brand-reducer');

var _brandReducer2 = _interopRequireDefault(_brandReducer);

var _symbolMap = require('../../lib/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['initialState']);

var Brand = function (_RcModule) {
  (0, _inherits3.default)(Brand, _RcModule);

  function Brand(_ref) {
    var registerStoreHandler = _ref.registerStoreHandler;
    var _ref$stateMapper = _ref.stateMapper;
    var stateMapper = _ref$stateMapper === undefined ? function (state) {
      return state.brand;
    } : _ref$stateMapper;
    var prefix = _ref.prefix;
    var id = _ref.id;
    var name = _ref.name;
    (0, _classCallCheck3.default)(this, Brand);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Brand).call(this, {
      registerStoreHandler: registerStoreHandler,
      stateMapper: stateMapper,
      prefix: prefix,
      actions: _brandActions2.default
    }));

    _this[symbols.initialState] = {
      id: id,
      name: name
    };
    return _this;
  }

  (0, _createClass3.default)(Brand, [{
    key: 'reducer',
    get: function get() {
      return (0, _brandReducer2.default)(this[symbols.initialState], this.prefix);
    }
  }, {
    key: 'id',
    get: function get() {
      return this.state.id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.state.name;
    }
  }]);
  return Brand;
}(_rcModule2.default);

exports.default = Brand;
//# sourceMappingURL=index.js.map
