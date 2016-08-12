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

var STORE = (0, _symbol2.default)();

var RcBase = function () {
  function RcBase(init) {
    (0, _classCallCheck3.default)(this, RcBase);

    this[STORE] = null;
    init();
  }

  (0, _createClass3.default)(RcBase, [{
    key: "subscribe",
    value: function subscribe() {
      var _STORE;

      return (_STORE = this[STORE]).subscribe.apply(_STORE, arguments);
    }
  }, {
    key: "state",
    get: function get() {
      return this[STORE].getState();
    }
  }]);
  return RcBase;
}();

exports.default = RcBase;
//# sourceMappingURL=rc-base.js.map
