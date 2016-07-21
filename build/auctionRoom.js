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
    key: "fetchItems",
    value: function fetchItems(callback) {
      this.auctionRepository.fetchItems().then(function (result) {
        return callback(result);
      });
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
    value: function placeBid(item, user, value, callback) {
      var _this = this;

      var bidDate = new Date();
      this.auctionRepository.addBid({
        "item": item,
        "user": user,
        "value": value,
        "date": bidDate
      }).then(function (result) {
        return updateHighestBid();
      });

      var updateHighestBid = function updateHighestBid() {
        return _this.auctionRepository.findItem(item, function (itemFound) {
          createHighestBid(itemFound, value, user, bidDate);
        });
      };

      var createHighestBid = function createHighestBid(item, value, user, date) {
        if (!item.highestBid.value || item.highestBid.value < value) {

          Object.assign(item, { highestBid: {
              value: value, date: date,
              user: user
            } });
          _this.auctionRepository.saveItem(item, callback);
        } else callback(false);
      };
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      return this.auctionRepository.addItem(item);
    }
  }]);

  return AuctionRoom;
}();

exports.default = AuctionRoom;