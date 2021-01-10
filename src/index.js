require('dotenv').config();
const Console = require('./Console');
const { TimeoutError } = require('puppeteer').errors;
const { MissingEnvError, BadCredentialsError } = require('./errors');
Console.green(`    ___  __     ___  ____  ______\n   / _ \\/ /    / _ )/ __ \\/_  __/\n  /   _/ /__  / _  / /_/ / / /   \n /_/|_/____/ /____/\\____/ /_/${process.env.npm_package_version}`);
Console.green('\n      A bot for rl garage\n');

async function main(){
    let browserManager = await require('./BrowserManager')();
    Console.log('Cargando...');
    try{
        let usuario = await browserManager.login(process.env.EMAIL, process.env.PASSWORD);
        Console.log(`Logueado como ${usuario}`);
        require('./jobs')();
    }catch(ex){
        if(ex instanceof MissingEnvError){
            Console.log('Credenciales indefinidas y/o archivo .env inexistente');
        }else if(ex instanceof BadCredentialsError){
            Console.log('Credenciales incorrectas\nCambialas en el archivo .env');
        }else if(ex instanceof TimeoutError){
            Console.log('Tiempo de respuesta exedido');
        }else{
            Console.log('Error desconocido', ex)
        }
        process.exit();
    }
}

main();