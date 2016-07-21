"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = function schema() {
  return _mongoose2.default.Schema({
    "description": String,
    "picture": String,
    "code": String,
    "name": String,
    "highestBid": {
      value: Number,
      date: Date,
      user: Object
    }
  });
};

var itemModel = _mongoose2.default.model('Item', schema());

module.exports = itemModel;