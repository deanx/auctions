import Mongoose from 'mongoose';

let schema = () => {
  return Mongoose.Schema({
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
}

let bidModel = Mongoose.model('Bid', schema());

module.exports = bidModel;
