import Mongoose from 'mongoose';

let schema = () => {
  return Mongoose.Schema({
    "description": String,
    "picture": String,
    "code": String
  });
}

let itemModel = Mongoose.model('Item', schema());

module.exports = itemModel;
