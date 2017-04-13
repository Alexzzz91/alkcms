import nconf  from 'nconf';
import path  from 'path';

let config = nconf.argv()
    .env()
    .file({file: path.join(__dirname, 'config.json')});

module.exports = config;