const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const yahooFinance = require('yahoo-finance');

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT=process.env.PORT||8080;
let stocks = [];

const getData = (quotes) => {
  quotes.forEach((item) => {
    console.log(item.date);
    const parsedUnixTime = new Date(item.date).getTime();
    item.date = parsedUnixTime;
  });
  quotes.reverse();
  let array = [];
  quotes.forEach((item) => {
    array.push([item.date, item.close]);
  });
  return {
    name: quotes[0]
      .symbol
      .toUpperCase(),
    data: array,
    tooltip: {
      valueDecimals: 2
    }
  };
};

io.on('connection', (socket) => {
  console.error('socket.io connection');

  socket.on('disconnect', () => {
    console.log(`Disconnected - ${socket.id}`);
  });

  socket.on('takeFresh', () => {
    io.emit('returnNewStocks', stocks);
  })

  socket.on('deleteStock', (name) => {
    stocks = stocks.filter(item => {
      return item.name !== name;
    })
    io.emit('returnNewStocks', stocks);
  })

  socket.on('tryStock', (name) => {
    yahooFinance.historical({
      symbol: name,
      from: '2012-01-01',
      to: '2017-01-31',
      period: 'd'
    }, (err, quotes) => {
      if (err) {
        console.log(err);
      }
      if (quotes.length < 1) {
        console.log('nothing');
        io.emit('returnNewStocks', stocks);
      } else {
        console.log('I got stocks for you');

        stocks = [
          ...stocks,
          getData(quotes)
        ];
        io.emit('returnNewStocks', stocks);

      }
    });

  });
});

http.listen(PORT);
