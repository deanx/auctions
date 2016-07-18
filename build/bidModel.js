"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = function schema() {
  return _mongoose2.default.Schema({
    "item": {
      "code": String,
      "name": String
    },
    "user": {
      "name": String
    },
    "value": Number,
    "date": Date
  });
};

var bidModel = _mongoose2.default.model('Bid', schema());

module.exports = bidModel;