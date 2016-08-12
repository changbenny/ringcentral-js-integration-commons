'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = {}.hasOwnProperty;

var Enum = function (_Wrapper) {
  (0, _inherits3.default)(Enum, _Wrapper);

  function Enum(definition) {
    (0, _classCallCheck3.default)(this, Enum);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Enum).call(this, (0, _assign2.default)({}, definition)));

    var _loop = function _loop(key) {
      if (hasOwnProperty.call(definition, key)) {
        // defineProperty can be a performance hit
        (0, _defineProperty2.default)(_this, key, {
          get: function get() {
            return this.base[key];
          },

          enumerable: true
        });
      }
    };

    for (var key in definition) {
      _loop(key);
    }
    return _this;
  }

  return Enum;
}(_wrapper2.default);

/*
 * //with Proxy support
 *const enumHandler = {
 *  get(target, key) {
 *    return target[key];
 *  },
 *  set() {
 *    return;
 *  }
 *};
 *Enum = class Enum extends Proxy {
 *  constructor(definition) {
 *    super(Object.assign({}, definition), enumHandler);
 *  }
 *}
 */


exports.default = Enum;
//# sourceMappingURL=enum.js.map
