"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _AuctionRepository = require("./AuctionRepository");

var _AuctionRepository2 = _interopRequireDefault(_AuctionRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuctionRoom = function () {
  function AuctionRoom() {
    (0, _classCallCheck3.default)(this, AuctionRoom);

    this.auctionRepository = new _AuctionRepository2.default();
  }

  (0, _createClass3.default)(AuctionRoom, [{
    key: "fetchItems",
    value: function fetchItems(callback) {
      return this.auctionRepository.fetchItems();
    }
  }, {
    key: "setCurrentItem",
    value: function setCurrentItem(newItem) {
      this.item = newItem;
    }
  }, {
    key: "canBid",
    value: function canBid(user, item) {
      return !user.disabled;
    }
  }, {
    key: "getHighestBid",
    value: function getHighestBid(item) {
      return item.highestBid;
    }
  }, {
    key: "placeBid",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(itemBidded, user, value, callback) {
        var bidDate, item;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                bidDate = new Date();
                _context.next = 3;
                return this.auctionRepository.addBid({
                  "item": itemBidded,
                  "user": user,
                  "value": value,
                  "date": bidDate
                });

              case 3:
                _context.next = 5;
                return this.auctionRepository.findItem(itemBidded);

              case 5:
                item = _context.sent;

                if (!(!item.highestBid.value || item.highestBid.value < value)) {
                  _context.next = 13;
                  break;
                }

                (0, _assign2.default)(item, { highestBid: {
                    value: value, date: bidDate,
                    user: user
                  } });
                _context.next = 10;
                return this.auctionRepository.saveItem(item);

              case 10:
                return _context.abrupt("return", true);

              case 13:
                return _context.abrupt("return", false);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function placeBid(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return placeBid;
    }()
  }, {
    key: "addItem",
    value: function addItem(item) {
      return this.auctionRepository.addItem(item);
    }
  }]);
  return AuctionRoom;
}();

exports.default = AuctionRoom;