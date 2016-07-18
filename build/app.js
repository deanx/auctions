'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _auctionRoom = require('./auctionRoom.js');

var _auctionRoom2 = _interopRequireDefault(_auctionRoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auctionRoom = new _auctionRoom2.default();
var app = (0, _express2.default)();

app.engine('handlebars', (0, _expressHandlebars2.default)({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  var accept = req.headers.accept;

  var items = auctionRoom.fetchItems(function (items) {
    accept === 'application/json' ? res.send(items) : res.render('index', { items: items });
  });
});
app.listen(process.env.npm_package_config_port);