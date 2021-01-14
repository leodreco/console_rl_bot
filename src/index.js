require('dotenv').config();
const Console = require('./Console');
const { errorManager } = require('./errors');
const indexText = require('./language').index;

Console.green(`    ___  __     ___  ____  ______\n   / _ \\/ /    / _ )/ __ \\/_  __/\n  /   _/ /__  / _  / /_/ / / /   \n /_/|_/____/ /____/\\____/ /_/${process.env.npm_package_version}`);
Console.green(indexText.intro);
console.log(Console.underscore('https://github.com/leodreco/console_rl_bot\n'));

async function main(){
    
    let browserManager = await require('./BrowserManager')();
    Console.log(indexText.loading);

    try{
        let usuario = await browserManager.login(process.env.EMAIL, process.env.PASSWORD);
        Console.log(`${indexText.logged_in} ${usuario}`);
    }catch(ex){
        errorManager(ex);
    }

    require('./jobs')();

}

main();