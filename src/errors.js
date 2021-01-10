const Console = require('./Console');
const { TimeoutError } = require('puppeteer').errors;

class MissingEnvError extends Error{
    constructor(message){
        super(message);
        this.name = 'MissingEnvError';
    }
}

class BadCredentialsError extends Error{
    constructor(message){
        super(message);
        this.name = 'BadCredentialsError';
    }
}

function errorManager(ex){
    if(ex instanceof MissingEnvError){
        Console.error('Credenciales indefinidas y/o archivo .env inexistente');
        process.exit();
    }else if(ex instanceof BadCredentialsError){
        Console.error('Credenciales incorrectas\nCambialas en el archivo .env');
        process.exit();
    }else if(ex instanceof TimeoutError){
        Console.error('Tiempo de respuesta exedido');
    }else{
        Console.error('Error desconocido', ex);
    }
}

module.exports = {
    MissingEnvError,
    BadCredentialsError,
    errorManager
};