const moment = require('moment');

const reset = '\x1b[0m';
const red = '\x1b[31m';
const green = '\x1b[32m';

class Console{
    static green(str){
        console.log(green + str + reset);
    }

    static log(...str){
        console.log(green + moment().format('HH:mm:ss'), reset, ...str);
    }

    static error(...str){
        console.log(red + moment().format('HH:mm:ss'), reset, ...str);
    }
}

module.exports = Console;