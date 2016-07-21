const should = require('chai').should();

const sinon = require('sinon');
import AuctionRoom from '../build/auctionRoom.js';
import AuctionRepository from '../build/auctionRepository.js';

describe('Auction user test', () => {
  context(`As a potential buyer in an online auction
          I want to be able to bid on an item
          So that I can participate in the auction`, () => {

            context('􀀊􀂋􀂘􀂇􀂐􀀃􀀌􀀃􀂃􀂏􀀃􀂋􀂐􀀃􀂖􀂊􀂇􀀃􀂃􀂗􀂅􀂖􀂋􀂑􀂐􀀃􀂔􀂑􀂑􀂏Given I am in the auction room', () => {
              let auctionRoom = new AuctionRoom();
              let auctionRepository = new AuctionRepository();

              before((done) => {
                auctionRepository.clearAll().then(() => {
                  let item = {code: 'A0001', name:'item one',picture: 'a_picture', description: 'my item',
                  highestBid: {value:100.00, date: '2016-07-18T04:11:47.468Z',
                  user:{name: 'John Doe'}}};
                  auctionRoom.addItem(item).then(done());
                });
              });

              it('Then I see the current item picture, description and name', (done) => {
                let validations = (item) => {
                  should.exist(item.picture);
                  should.exist(item.name);
                  should.exist(item.description);
                  done();
                };

                auctionRepository.findItem({code:'A0001'}).then((item) => {
                  validations(item);
                });

              });


                it('And I see the current highest bid with a button to place a new bid', (done) => {
                auctionRepository.findItem({code:'A0001'}).then((item) => {
                  should.equal(auctionRoom.getHighestBid(item).value,100.00);
                  auctionRoom.canBid({},{}).should.be.true;
                  done();
                });

              });

              context('When I place a bid on an item', () => {
                beforeEach((done) => {
                  auctionRepository.clearAll().then(() => {
                    let item = {code: 'A0001', name:'item one',picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwWiOGCFGh_gakXkbQxPn_YvBO40RKat1-JAqAP9_z7Kj1l1c2A', description: 'my item',
                    highestBid: {value:100.00, date: '2016-07-18T04:11:47.468Z',
                    user:{name: 'John Doe'}}};
                    auctionRoom.addItem(item).then(done());
                  });

                });
                describe('And I am the only bidder', () => {
                  it('Then I am the highest bidder', (done) => {
                    let user = {'name':'John Doe'};
                    let item = {code: 'A0001', name:'item one',picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwWiOGCFGh_gakXkbQxPn_YvBO40RKat1-JAqAP9_z7Kj1l1c2A', description: 'my item'};
                    let value = 120;

                    auctionRoom.placeBid(item, user, value).then(() => {
                      auctionRepository.findItem(item).then((result) => {
                        should.equal(120, result.highestBid.value);
                        done();
                      });
                    });
                  }).timeout(5000);;
                });
                describe('And I am not the only bidder', () => {
                  describe('And my bid was placed first', () => {
                    it('Then I am the highest bidder', (done) => {
                      let userOne = {'name':'John Doe'};
                      let userTwo = {'name': 'Jane Doe'};
                      let item = {code: 'A0001', name:'item one',picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwWiOGCFGh_gakXkbQxPn_YvBO40RKat1-JAqAP9_z7Kj1l1c2A', description: 'my item'};
                      let value = 150;


                      auctionRoom.placeBid(item, userOne, value).then(() => {
                          auctionRoom.placeBid(item, userOne, value).then(() => {
                            auctionRepository.findItem(item).then((result) => {
                              should.equal(result.highestBid.value, 150);
                              done();
                            });
                          });
                      });
                    }).timeout(5000);
                  });

                  describe('And my bid was not placed first', () => {
                    it('Then I am not the highest bidder', (done) => {
                      let userOne = {'name':'james Doe'};
                      let userTwo = {'name': 'Jane Doe'};
                      let item = {code: 'A0001', name:'item one',picture: 'a_picture', description: 'my item'};
                      let value = 200;

                      let secondBid = () => {
                        auctionRoom.placeBid(item, userOne, value).then((response) => {
                          validateUser()
                        });
                      };

                      let validateUser = () => {
                        auctionRepository.findItem(item).then((result) => {
                          should.equal(result.highestBid.user.name, userTwo.name);
                          done();
                        });
                      };

                      auctionRoom.placeBid(item, userTwo, value).then((response) => {

                        secondBid()
                      });

                    }).timeout(5000);
                  });
                });
              });
            });
  });
});
