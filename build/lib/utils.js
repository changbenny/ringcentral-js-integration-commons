'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = exports.fetchList = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var fetchList = exports.fetchList = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fn) {
    var fetchedPages, totalPages, list, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetchedPages = 0;
            totalPages = 1;
            list = [];

          case 3:
            if (!(fetchedPages < totalPages)) {
              _context.next = 12;
              break;
            }

            fetchedPages++;
            _context.next = 7;
            return fn({
              page: fetchedPages
            });

          case 7:
            data = _context.sent;

            totalPages = data.paging.totalPages;
            list = list.concat(data.records);
            _context.next = 3;
            break;

          case 12:
            return _context.abrupt('return', list);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function fetchList(_x) {
    return ref.apply(this, arguments);
  };
}();

/**
 * @function
 * @param {String} eventType
 * @param {String} event
 * @description Helper function to emit eventTyped events and the event itself
 */


/**
 * @function
 * @param {Number} t
 */

var sleep = exports.sleep = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(t) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _promise2.default(function (resolve) {
              setTimeout(resolve, t);
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function sleep(_x2) {
    return ref.apply(this, arguments);
  };
}();

exports.extractData = extractData;
exports.emit = emit;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractData(model) {
  if (Array.isArray(model)) {
    return model.map(function (item) {
      return extractData(item);
    });
  } else if ((typeof model === 'undefined' ? 'undefined' : (0, _typeof3.default)(model)) === 'object') {
    var data = {};
    for (var key in model) {
      if (key[0] !== '_' && model.hasOwnProperty(key)) {
        data[key] = extractData(model[key]);
      }
    }
    return data;
  }
  return model;
}

function emit(eventType, event) {
  for (var _len = arguments.length, payloads = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    payloads[_key - 2] = arguments[_key];
  }

  this.emit.apply(this, [event].concat(payloads));
  this.emit.apply(this, [eventType, event].concat(payloads));
}
//# sourceMappingURL=utils.js.map
