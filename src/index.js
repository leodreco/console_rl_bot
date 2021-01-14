require('dotenv').config();
const Console = require('./Console');
const { errorManager } = require('./errors');
Console.green(`    ___  __     ___  ____  ______\n   / _ \\/ /    / _ )/ __ \\/_  __/\n  /   _/ /__  / _  / /_/ / / /   \n /_/|_/____/ /____/\\____/ /_/${process.env.npm_package_version}`);
Console.green('\n      A bot for rl garage\n');
console.log(Console.underscore('https://github.com/leodreco/console_rl_bot\n'));

async function main(){
    
    let browserManager = await require('./BrowserManager')();
    Console.log('Cargando...');

    try{
        let usuario = await browserManager.login(process.env.EMAIL, process.env.PASSWORD);
        Console.log(`Logueado como ${usuario}`);
    }catch(ex){
        errorManager(ex);
    }

    require('./jobs')();

}

main();