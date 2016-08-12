"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE = (0, _symbol2.default)();

/**
 * @class Wrapper
 * Base wrapper class that provide easy access to the wrapped object.
 */

var Wrapper = function () {
  function Wrapper(base) {
    (0, _classCallCheck3.default)(this, Wrapper);

    this[BASE] = base;
  }

  (0, _createClass3.default)(Wrapper, [{
    key: "base",
    get: function get() {
      return this[BASE];
    }
  }]);
  return Wrapper;
}();

exports.default = Wrapper;
//# sourceMappingURL=wrapper.js.map
