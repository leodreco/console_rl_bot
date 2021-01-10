const moment = require('moment');
const green = '\x1b[32m';
const reset = '\x1b[0m';

class Console{
    static green(str){
        console.log(green + str + reset);
    }
    static log(...str){
        console.log(green + moment().format('HH:mm:ss'), reset, ...str);
    }
}

module.exports = Console;