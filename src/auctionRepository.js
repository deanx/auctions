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
    return this.itemModel.find({},'_id picture description').exec();
  }
  findHighestBidForItem(item) {
    let queryPromise = this.bidModel.find({'item.code':item.code}).sort({value:-1,date:1}).limit(1).exec();
    return queryPromise;
  }

  addBid(bid) {
    return this.bidModel(bid).save();
  }

  addItem() {
    this.itemModel(
      {

          "description": 'Mona Lisa',
          "picture": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwWiOGCFGh_gakXkbQxPn_YvBO40RKat1-JAqAP9_z7Kj1l1c2A',
          "code": 'A0001'
      }
    ).save();
  }

  clearAll() {
    this.bidModel.remove({}, function(err, res) {
    });
  }
}
