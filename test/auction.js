const should = require('chai').should();

const sinon = require('sinon');
import AuctionRoom from '../build/auctionRoom.js';
import AuctionRepository from '../build/auctionRepository.js';

describe('Auction user test', () => {
  context(`As a potential buyer in an online auction
          I want to be able to bid on an item
          So that I can participate in the auction`, () => {

            context('􀀊􀂋􀂘􀂇􀂐􀀃􀀌􀀃􀂃􀂏􀀃􀂋􀂐􀀃􀂖􀂊􀂇􀀃􀂃􀂗􀂅􀂖􀂋􀂑􀂐􀀃􀂔􀂑􀂑􀂏Given I am in the auction room', () => {
              before(() => {
                auctionRepository.clearAll();
                let user = {'name':'John Doe'};
                let item = {code: 'A0001', name:'item one',picture: 'a_picture', description: 'my item'};
                let value = 123.34;
                auctionRoom.placeBid(item, user, value);
              });

              let auctionRoom = new AuctionRoom();
              let auctionRepository = new AuctionRepository();
              let fetchItems = sinon.stub(auctionRoom, 'fetchItems');
              fetchItems.returns([{name:'item one',picture: 'a_picture', description: 'my item', code:'A0001'}]);

              auctionRoom.openRoom();

              it('Then I see the current item picture, description and name', () => {
                should.exist(auctionRoom);
                should.exist(auctionRoom.item);
                should.exist(auctionRoom.item.picture);
                should.exist(auctionRoom.item.description);
                should.exist(auctionRoom.item.name);

                fetchItems.restore();
              });


                it('And I see the current highest bid with a button to place a new bid', (done) => {

                auctionRoom.getHighestBid(auctionRoom.item, (result) => {
                  should.equal(result[0].value,123.34);
                  done();
                });

                auctionRoom.canBid({},{}).should.be.true;
              }).timeout(10000);

              context('When I place a bid on an item', () => {
                beforeEach(() => {
                  auctionRepository.clearAll();
                });
                describe('And I am the only bidder', () => {
                  it('Then I am the highest bidder', (done) => {
                    let user = {'name':'John Doe'};
                    let item = {code: 'A0001', name:'item one',picture: 'a_picture', description: 'my item'};
                    let value = 100;
                    auctionRoom.placeBid(item, user, value, (result) => {
                      auctionRoom.getHighestBid(item, result => {
                        should.equal(result[0].user.name, user.name);
                        done();
                      });
                    });

                  });
                });
                describe('And I am not the only bidder', () => {
                  describe('And my bid was placed first', () => {
                    it('Then I am the highest bidder', (done) => {
                      let userOne = {'name':'John Doe'};
                      let userTwo = {'name': 'Jane Doe'};
                      let item = {code: 'A0001', name:'item one',picture: 'a_picture', description: 'my item'};
                      let value = 100;

                      let bidOne = auctionRoom.placeBid(item, userOne, value);
                      let bidTwo = auctionRoom.placeBid(item, userTwo, value);
                      Promise.all([bidOne, bidTwo]).then(function (results) {
                        auctionRoom.getHighestBid(item, result => {
                          should.equal(result[0].user.name, userOne.name);
                          done();
                        });
                      });
                    }).timeout(5000);
                  });

                  describe('And my bid was not placed first', () => {
                    it('Then I am not the highest bidder', (done) => {
                      let userOne = {'name':'John Doe'};
                      let userTwo = {'name': 'Jane Doe'};
                      let item = {code: 'A0001', name:'item one',picture: 'a_picture', description: 'my item'};
                      let value = 100;


                      let bidTwo = auctionRoom.placeBid(item, userTwo, value);
                      let bidOne = auctionRoom.placeBid(item, userOne, value);
                      Promise.all([bidTwo, bidOne]).then(function (results) {
                        auctionRoom.getHighestBid(item, result => {
                          should.equal(result[0].user.name, userTwo.name);
                          done();
                        });
                      });
                    }).timeout(5000);
                  });
                });
              });
            });
  });
});
