import AuctionRepository from './AuctionRepository';

export default class AuctionRoom {
  constructor() {
      this.auctionRepository = new AuctionRepository();
  }

  openRoom(items) {
    let roomItems = items || this.fetchItems();
    this.setCurrentItem(roomItems[0]);
  };

  fetchItems(callback) {
    return this.auctionRepository.fetchItems().then(result => callback(result));
  };

  setCurrentItem(newItem) {
    this.item = Object.assign({}, newItem);
  };

  canBid(user, item) {
    return !user.disabled;
  }

  getHighestBid(item, callback) {
    this.auctionRepository.findHighestBidForItem(item).then(result => callback(result));
  }

  placeBid(item, user, value, callback) {
    this.auctionRepository.addBid({
      "item": item,
      "user": user,
      "value": value,
      "date": new Date()
    }).then(result => callback(result));
  }

  addItem() {
    this.auctionRepository.addItem();
  }
}
