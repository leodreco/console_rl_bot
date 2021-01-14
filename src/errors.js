const Console = require('./Console');
const { TimeoutError } = require('puppeteer').errors;
const errorText = require('./language').errors;

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
        Console.error(errorText.MissingEnvError);
        process.exit();
    }else if(ex instanceof BadCredentialsError){
        Console.error(errorText.BadCredentialsError);
        process.exit();
    }else if(ex instanceof TimeoutError){
        Console.error(errorText.TimeoutError);
    }else{
        Console.error(errorText.default, ex);
    }
}

module.exports = {
    MissingEnvError,
    BadCredentialsError,
    errorManager
};