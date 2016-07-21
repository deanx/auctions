'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bidModel = require('./bidModel');

var _bidModel2 = _interopRequireDefault(_bidModel);

var _itemModel = require('./itemModel');

var _itemModel2 = _interopRequireDefault(_itemModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
//mongoose.connect('mongodb://auctiondata:data2016@ds023445.mlab.com:23445/auctiondata');
_mongoose2.default.connect('mongodb://localhost:27017/auctiondata');

var AuctionRepository = function () {
  function AuctionRepository() {
    (0, _classCallCheck3.default)(this, AuctionRepository);

    this.bidModel = _bidModel2.default;
    this.itemModel = _itemModel2.default;
  }

  (0, _createClass3.default)(AuctionRepository, [{
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
      return this.itemModel.findOne({ code: item.code }).exec();
    }
  }, {
    key: 'saveItem',
    value: function saveItem(item) {
      return this.itemModel(item).save();
    }
  }]);
  return AuctionRepository;
}();

exports.default = AuctionRepository;