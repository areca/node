const got = require('got');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const keyMap = new Map();
keyMap.set('a', 'AAPL');
keyMap.set('b', 'BA');
keyMap.set('c', 'CSCO');
keyMap.set('d', 'DD');
keyMap.set('e', 'XOM');
keyMap.set('f', 'FB');
keyMap.set('g', 'GOOGL');
keyMap.set('m', 'MSFT');

function getStockQuote(symbol) {
  const url = `http://finance.google.com/finance/info?client=ig&q=${symbol}`;
  got(url)
    .then(response => {
      // Must remove the first three characters of the Google finance text returned to parse JSON.
      const stock = JSON.parse(response.body.substr(3));
      const quote = stock[0];
      console.log(`${quote.t} ${quote.l_cur} ${quote.c} (${quote.cp}%) as of ${quote.lt}`);
    })
    .catch(error => {
      console.log(error.response.body);
    });
}

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit(); // eslint-disable-line no-process-exit
  } else {
    if (keyMap.has(str)) {
      getStockQuote(keyMap.get(str));
    } else {
      console.log(`No symbol defined for "${str}" key.`);
    }
  }
});

console.log('Press a key to retrieve a stock price');
