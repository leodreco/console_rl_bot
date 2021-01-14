const strings = require('../languages.json');

var lang_strings;

switch(process.env.LANGUAGE.toLowerCase()){
    case 'es':
        lang_strings = strings['es'];
        break;
    default:
        lang_strings = strings['en'];
        break;
}

module.exports = lang_strings;