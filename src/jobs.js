const CronJob  = require('cron').CronJob;
const Console = require('./Console');
const tradeManager = require('./TradeManager');
var browserManager;

const everyMinute = new CronJob('* * * * *', async () => {
    let minute = new Date().getMinutes();
    let trades = tradeManager.getTradesByMinute(minute % 15);
    

    if(trades.length > 0){
        Console.log(`Bumpeando ${trades.length} ${trades.length == 1 ? 'anuncio' : 'anuncios'}`);
        let bumpTrades = await browserManager.bump(trades);
        tradeManager.update(bumpTrades);
    }else{
        Console.log('...');
    }
});

module.exports = async function(){
    browserManager = await require('./BrowserManager')();
    everyMinute.start();
}