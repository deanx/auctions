import AuctionRepository from './AuctionRepository';

export default class AuctionRoom {
  constructor() {
      this.auctionRepository = new AuctionRepository();
  }

  fetchItems(callback) {
    this.auctionRepository.fetchItems().then(result => callback(result));
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

  placeBid(item, user, value, callback) {
    let bidDate = new Date();
    this.auctionRepository.addBid({
      "item": item,
      "user": user,
      "value": value,
      "date": bidDate
    }).then(result => updateHighestBid());

    let updateHighestBid = () => this.auctionRepository.findItem(item, (itemFound) => {
      createHighestBid(itemFound, value, user, bidDate);
    });

    let createHighestBid = (item, value, user, date) => {
        if(!item.highestBid.value || item.highestBid.value < value ) {

          Object.assign(item, {highestBid: {
            value: value, date: date,
            user: user
          }});
          this.auctionRepository.saveItem(item,callback);
        } else callback(false);
    };
  }

  addItem(item) {
    return this.auctionRepository.addItem(item);
  }
}
