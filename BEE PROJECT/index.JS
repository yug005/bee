class OrderBook {
  constructor(symbol = "BTCUSD") {
    this.bids = [];
    this.asks = [];
    this._nextId = 1; // (auto increment) -> private (naming convention)
    this.lastTradedPrice = null;
  }

  // helper
  _genOrder() {
    return this._nextId++;
  }

  _sort(side) {
    if (side === "BUY") {
      this.bids.sort((a, b) => {
        if (a.price != b.price) return b.price - a.price;
        else return a.timestamp - b.timestamp;
      });
    } else if (side === "SELL") {
      this.asks.sort((a, b) => {
        if (a.price != b.price) return a.price - b.price;
        else return a.timestamp - b.timestamp;
      });
    }
  }
}

// Create an order book
let BTCUSDOrderBook = new OrderBook();

// Push some example orders
BTCUSDOrderBook.bids.push({
  orderId: 1,
  side: "BUY",
  type: "LIMIT",
  price: 100,
  quantity: 10,
  timestamp: Date.now(),
  user: "Shiva",
});

BTCUSDOrderBook.bids.push({
  orderId: 2,
  side: "BUY",
  type: "LIMIT",
  price: 105,
  quantity: 8,
  timestamp: Date.now(),
  user: "Alice",
});

BTCUSDOrderBook.asks.push({
  orderId: 3,
  side: "SELL",
  type: "LIMIT",
  price: 110,
  quantity: 5,
  timestamp: Date.now(),
  user: "Bob",
});

// Sort both sides
BTCUSDOrderBook._sort("BUY");
BTCUSDOrderBook._sort("SELL");

// Display
console.log("Bids:", BTCUSDOrderBook.bids);
console.log("Asks:", BTCUSDOrderBook.asks);

// placeOrder(){
  
// }
// _marketMatch(){

// }

// _limitMatch(){

// }