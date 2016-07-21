import Express from 'express';
import ExpressHBS from 'express-handlebars';
import AuctionRoom from './auctionRoom.js';

const auctionRoom = new AuctionRoom();
const app = Express();

app.engine('handlebars', ExpressHBS({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use("/public", Express.static(__dirname + "/../views/js"));

app.get('/', (req, res) => {
  let accept = req.headers.accept;
  let items = auctionRoom.fetchItems().then((items) => {
  accept === 'application/json' ? res.send(items) : res.render('index',{items});
  });
});

app.post('/', (req, res) => {
  let item = {code:req.query.item};

  let bid = req.query.bid;

  auctionRoom.placeBid(item,{'name':'nothing now'}, bid).then((result) => {
    if(result === false) res.send(false);
    else res.send(true);
  });
});
app.listen(process.env.npm_package_config_port);
