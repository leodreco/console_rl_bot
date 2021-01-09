const CronJob  = require('cron').CronJob;
const moment = require('moment');
const tradeManager = require('./TradeManager');
var browserManager;

const everyMinute = new CronJob('* * * * *', async () => {
    let minute = new Date().getMinutes();
    let trades = tradeManager.getTradesByMinute(minute % 15);
    

    if(trades.length > 0){
        console.log(moment().format('HH:mm:ss'), `Bumpeando ${trades.length} ${trades.length == 1 ? 'anuncio' : 'anuncios'}`);
        let bumpTrades = await browserManager.bump(trades);
        tradeManager.update(bumpTrades);
    }else{
        console.log(moment().format('HH:mm:ss'), '...');
    }
});

module.exports = async function(){
    browserManager = await require('./BrowserManager')();
    everyMinute.start();
}