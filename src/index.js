require('dotenv').config();
const Console = require('./Console');

Console.green(`    ___  __     ___  ____  ______\n   / _ \\/ /    / _ )/ __ \\/_  __/\n  /   _/ /__  / _  / /_/ / / /   \n /_/|_/____/ /____/\\____/ /_/${process.env.npm_package_version}`);
Console.green('\n     A bot for rl garage\n');

async function main(){
    let browserManager = await require('./BrowserManager')();
    Console.log('Cargando...');
    let usuario = await browserManager.login(process.env.EMAIL, process.env.PASSWORD);
    Console.log(`Logueado como ${usuario}`);
    require('./jobs')();
}

main();