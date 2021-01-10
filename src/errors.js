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



module.exports = {
    MissingEnvError,
    BadCredentialsError
};