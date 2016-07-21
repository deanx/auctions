import mongoose from 'mongoose';
import BidModel from './bidModel';
import ItemModel from './itemModel';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://auctiondata:data2016@ds023445.mlab.com:23445/auctiondata');

export default class AuctionRepository {
  constructor() {
    this.bidModel = BidModel;
    this.itemModel = ItemModel;
  }

  fetchItems() {
    return this.itemModel.find({},'_id picture description code name, highestBid').exec();
  }
  findHighestBidForItem(item) {
    let queryPromise = this.bidModel.find({'item.code':item.code}).sort({value:-1,date:1}).limit(1).exec();
    return queryPromise;
  }

  addBid(bid) {
    return this.bidModel(bid).save();
  }

  addItem(item) {
    return this.itemModel(item).save();
  }

  clearAll() {
    return this.bidModel.remove({}, (err, res) => {
      this.itemModel.remove({}, (err, res) => {
      });
    });
  }

  findItem(item, callback) {
    this.itemModel.findOne({code: item.code}).exec().then(result => callback(result));
  }

  saveItem(item, callback) {
    this.itemModel(item).save().then(result => callback(result));
  }
}
