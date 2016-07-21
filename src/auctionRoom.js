import AuctionRepository from './AuctionRepository';

export default class AuctionRoom {
  constructor() {
      this.auctionRepository = new AuctionRepository();
  }

  fetchItems(callback) {
    return this.auctionRepository.fetchItems();
  };

  setCurrentItem(newItem) {
    this.item = newItem;
  };

  canBid(user, item) {
    return !user.disabled;
  }

  getHighestBid(item) {
    return item.highestBid;
  }

  async placeBid(itemBidded, user, value, callback) {
    let bidDate = new Date();
    await this.auctionRepository.addBid({
      "item": itemBidded,
      "user": user,
      "value": value,
      "date": bidDate
    });

    let item = await this.auctionRepository.findItem(itemBidded);
  
    if(!item.highestBid.value || item.highestBid.value < value) {
      Object.assign(item, {highestBid: {
        value: value, date: bidDate,
        user: user
      }});
      await this.auctionRepository.saveItem(item);
        return true;
    } else {
      return false;
    }
  }

  addItem(item) {
    return this.auctionRepository.addItem(item);
  }
}
