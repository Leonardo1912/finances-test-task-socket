'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

let tickers = [
    {ticker: 'AAPL', disabled: false}, // Apple
    {ticker: 'GOOGL', disabled: false}, // Alphabet
    {ticker: 'MSFT', disabled: false}, // Microsoft
    {ticker: 'AMZN', disabled: false}, // Amazon
    {ticker: 'FB', disabled: false}, // Facebook
    {ticker: 'TSLA', disabled: false}, // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
    const random = Math.random() * (max - min) + min;
    return random.toFixed(precision);
}

function utcDate() {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {

    const quotes = tickers.map(ticker => (ticker.disabled
        ? ticker
        : {
            ...ticker,
            exchange: 'NASDAQ',
            price: randomValue(100, 300, 2),
            change: randomValue(0, 200, 2),
            change_percent: randomValue(0, 1, 2),
            dividend: randomValue(0, 1, 2),
            yield: randomValue(0, 2, 2),
            last_trade_time: utcDate(),
        }));

    socket.emit('ticker', quotes);
}

function trackTickers(socket, time) {
    // run the first time immediately
    getQuotes(socket);
    // every N seconds
    const timer = setInterval(function () {
        console.log(time)
        getQuotes(socket);
    }, time);

    socket.on('disconnect', function () {
        console.log("bye")
        clearInterval(timer);
    });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
    cors: {
        origin: "*",
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.delete("/:ticker", cors(), (req, res) => {
    tickers = tickers.filter((item) => item.ticker !== req.params.ticker);
    res.status(200);
});

app.post("/:ticker", cors(), (req, res) => {
    const ticker = req.params.ticker.toUpperCase()
    tickers.push({ticker, disabled: false});
    res.status(200);
});
app.put("/disable/:ticker", cors(), (req, res) => {
    const ticker = req.params.ticker.toUpperCase()
    tickers = tickers.map(item => item.ticker === ticker ? {...item, disabled: true} : item)
    res.status(200);
});
app.put("/activate/:ticker", cors(), (req, res) => {
    const ticker = req.params.ticker.toUpperCase()
    tickers = tickers.map(item => item.ticker === ticker ? {...item, disabled: false} : item)
    res.status(200);
});

socketServer.on('connection', (socket) => {
    socket.on('start', (time) => {
        console.log("start")
        trackTickers(socket, time);
    });
});

server.listen(PORT, () => {
    console.log(`Streaming service is running on http://localhost:${PORT}`);
});
