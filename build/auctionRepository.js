'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bidModel = require('./bidModel');

var _bidModel2 = _interopRequireDefault(_bidModel);

var _itemModel = require('./itemModel');

var _itemModel2 = _interopRequireDefault(_itemModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://auctiondata:data2016@ds023445.mlab.com:23445/auctiondata');

var AuctionRepository = function () {
  function AuctionRepository() {
    _classCallCheck(this, AuctionRepository);

    this.bidModel = _bidModel2.default;
    this.itemModel = _itemModel2.default;
  }

  _createClass(AuctionRepository, [{
    key: 'fetchItems',
    value: function fetchItems() {
      return this.itemModel.find({}, '_id picture description code name, highestBid').exec();
    }
  }, {
    key: 'findHighestBidForItem',
    value: function findHighestBidForItem(item) {
      var queryPromise = this.bidModel.find({ 'item.code': item.code }).sort({ value: -1, date: 1 }).limit(1).exec();
      return queryPromise;
    }
  }, {
    key: 'addBid',
    value: function addBid(bid) {
      return this.bidModel(bid).save();
    }
  }, {
    key: 'addItem',
    value: function addItem(item) {
      return this.itemModel(item).save();
    }
  }, {
    key: 'clearAll',
    value: function clearAll() {
      var _this = this;

      return this.bidModel.remove({}, function (err, res) {
        _this.itemModel.remove({}, function (err, res) {});
      });
    }
  }, {
    key: 'findItem',
    value: function findItem(item, callback) {
      this.itemModel.findOne({ code: item.code }).exec().then(function (result) {
        return callback(result);
      });
    }
  }, {
    key: 'saveItem',
    value: function saveItem(item, callback) {
      this.itemModel(item).save().then(function (result) {
        return callback(result);
      });
    }
  }]);

  return AuctionRepository;
}();

exports.default = AuctionRepository;