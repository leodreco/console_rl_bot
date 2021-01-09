const trades = require('../data.json').trades;

class TradeManager{
    trades = [];
    constructor(trades){
        for(let trade of trades){
            trade.ignore = false;
            this.trades.push(trade)
        }
    }

    getTradesByMinute(minute){
        return this.trades.filter(trade => {
            if(trade.bump_minute == minute){
                if(trade.ignore){
                    trade.ignore = false;
                    return false;
                }
                return true;
            }
        });
    }

    update(trades){
        for(let i = 0; i< this.trades.length; i++){
            for(let trade of trades){
                if(this.trades[i].cod == trade.cod){
                    this.trades[i] = trade;
                }
            }
        }
    }
}

module.exports = new TradeManager(trades);
