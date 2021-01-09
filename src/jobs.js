const CronJob  = require('cron').CronJob;
const moment = require('moment');
const tradeManager = require('./TradeManager');
var browserManager;

const everyMinute = new CronJob('* * * * *', async () => {
    let minute = new Date().getMinutes();
    let trades = tradeManager.getTradesByMinute(minute % 15);
    console.log(moment().format('HH:mm:ss'), trades);

    if(trades.length > 0){
        let bumpTrades = await browserManager.bump(trades);
        tradeManager.update(bumpTrades);
    }
});

module.exports = async function(){
    browserManager = await require('./BrowserManager')();
    everyMinute.start();
}