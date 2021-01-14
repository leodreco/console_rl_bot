const strings = require('../languages.json');

var lang_strings;

switch(process.env.LANG.toLowerCase()){
    case 'es':
        lang_strings = strings['en'];
        break;
    default:
        lang_strings = strings['en'];
        break;
}

module.exports = lang_strings;