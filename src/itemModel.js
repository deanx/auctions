import Mongoose from 'mongoose';

let schema = () => {
  return Mongoose.Schema({
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
}

let itemModel = Mongoose.model('Item', schema());

module.exports = itemModel;
