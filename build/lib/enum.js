"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = {}.hasOwnProperty;
var DEFINITION = (0, _symbol2.default)();
var VALUES = (0, _symbol2.default)();

var Enum = function () {
  function Enum(definition) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Enum);

    this[DEFINITION] = (0, _assign2.default)({}, definition);
    this[VALUES] = new _set2.default();

    var _loop = function _loop(key) {
      if (hasOwnProperty.call(definition, key)) {
        (0, _defineProperty2.default)(_this, key, {
          get: function get() {
            return this[DEFINITION][key];
          },

          enumerable: true
        });
        _this[VALUES].add(_this[DEFINITION][key]);
      }
    };

    for (var key in definition) {
      _loop(key);
    }
  }

  (0, _createClass3.default)(Enum, null, [{
    key: "hasValue",
    value: function hasValue(value) {
      return this[VALUES].has(value);
    }
  }]);
  return Enum;
}();

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
