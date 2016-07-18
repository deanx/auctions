"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AuctionRepository = require("./AuctionRepository");

var _AuctionRepository2 = _interopRequireDefault(_AuctionRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuctionRoom = function () {
  function AuctionRoom() {
    _classCallCheck(this, AuctionRoom);

    this.auctionRepository = new _AuctionRepository2.default();
  }

  _createClass(AuctionRoom, [{
    key: "openRoom",
    value: function openRoom(items) {
      var roomItems = items || this.fetchItems();
      this.setCurrentItem(roomItems[0]);
    }
  }, {
    key: "fetchItems",
    value: function fetchItems(callback) {
      return this.auctionRepository.fetchItems().then(function (result) {
        return callback(result);
      });
    }
  }, {
    key: "setCurrentItem",
    value: function setCurrentItem(newItem) {
      this.item = Object.assign({}, newItem);
    }
  }, {
    key: "canBid",
    value: function canBid(user, item) {
      return !user.disabled;
    }
  }, {
    key: "getHighestBid",
    value: function getHighestBid(item, callback) {
      this.auctionRepository.findHighestBidForItem(item).then(function (result) {
        return callback(result);
      });
    }
  }, {
    key: "placeBid",
    value: function placeBid(item, user, value, callback) {
      this.auctionRepository.addBid({
        "item": item,
        "user": user,
        "value": value,
        "date": new Date()
      }).then(function (result) {
        return callback(result);
      });
    }
  }, {
    key: "addItem",
    value: function addItem() {
      this.auctionRepository.addItem();
    }
  }]);

  return AuctionRoom;
}();

exports.default = AuctionRoom;