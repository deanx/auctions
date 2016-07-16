const should = require('chai').should();

describe('Auction user test', () => {
  context(`As a potential buyer in an online auction
          I want to be able to bid on an item
          So that I can participate in the auction`, () => {
            context('􀀊􀂋􀂘􀂇􀂐􀀃􀀌􀀃􀂃􀂏􀀃􀂋􀂐􀀃􀂖􀂊􀂇􀀃􀂃􀂗􀂅􀂖􀂋􀂑􀂐􀀃􀂔􀂑􀂑􀂏Given I am in the auction room', () => {
              it('Then I see the current item picture, description and name', () => {

              });
              it('And I see the current highest bid with a button to place a new bid', () => {

              });

              context('When I place a bid on an item', () => {
                describe('And I am the only bidder', () => {
                  it('Then I am the highest bidder', () => {
                  });
                });
                describe('And I am not the only bidder', () => {
                  describe('And my bid was placed first', () => {
                    it('Then I am the highest bidder', () => {

                    });
                  });

                  describe('And my bid was not placed first', () => {
                    it('Then I am not the highest bidder', () => {

                    });
                  });
                });
              });
            });
  });
});
