'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

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

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _wrapper = require('../lib/wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HANDLERS = (0, _symbol2.default)();
var FILTERS = (0, _symbol2.default)();

var Subscription = function (_Wrapper) {
  (0, _inherits3.default)(Subscription, _Wrapper);

  function Subscription(_ref) {
    var sdk = _ref.sdk;
    (0, _classCallCheck3.default)(this, Subscription);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Subscription).call(this, sdk.createSubscription()));

    _this[FILTERS] = new _set2.default();
    _this[HANDLERS] = new _map2.default();
    _this.base.on(_this.events.notification, function (m) {
      if (_this[HANDLERS].has(m.event)) {
        _this[HANDLERS].get(m.event).forEach(function (handler) {
          try {
            handler(m);
          } catch (e) {
            console.error('Error occurs when invoking subscription notification handler for "' + m.event + '":', e);
          }
        });
      }
    });
    return _this;
  }

  (0, _createClass3.default)(Subscription, [{
    key: 'subscribe',
    value: function subscribe(event, handler) {
      if (event && typeof handler === 'function') {
        if (!this[HANDLERS].has(event)) {
          this[HANDLERS].set(event, new _set2.default());
        }
        if (!this[FILTERS].has(event)) {
          this[FILTERS].add(event);
          this.base.setEventFilters((0, _from2.default)(this[FILTERS]));
          this.base.register();
        }
        this[HANDLERS].get(event).add(handler);
      }
    }
  }, {
    key: 'events',
    get: function get() {
      return this.base.events;
    }
  }]);
  return Subscription;
}(_wrapper2.default);

exports.default = Subscription;
//# sourceMappingURL=subscription.js.map
