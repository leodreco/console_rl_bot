require('dotenv').config();
const moment = require('moment');

console.log(`    ___  __     ___  ____  ______\n   / _ \\/ /    / _ )/ __ \\/_  __/\n  /   _/ /__  / _  / /_/ / / /   \n /_/|_/____/ /____/\\____/ /_/`);
console.log('\n     A bot for rl garage\n');

async function main(){
    let browserManager = await require('./BrowserManager')();
    console.log(moment().format('HH:mm:ss'), 'Cargando...');
    let usuario = await browserManager.login(process.env.EMAIL, process.env.PASSWORD);
    console.log(moment().format('HH:mm:ss'), `Logueado como ${usuario}`);
    require('./jobs')();
}

main();