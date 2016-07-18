import Express from 'express';
import ExpressHBS from 'express-handlebars';
import AuctionRoom from './auctionRoom.js';

const auctionRoom = new AuctionRoom();
const app = Express();

app.engine('handlebars', ExpressHBS({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  let accept = req.headers.accept;
  

  let items = auctionRoom.fetchItems((items) => {
    accept === 'application/json' ? res.send(items) : res.render('index',{items});
  });

});
app.listen(process.env.npm_package_config_port);
