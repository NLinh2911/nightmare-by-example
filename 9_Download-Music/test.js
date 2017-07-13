const fs = require('fs');
const request = require('request');

request
.get('http://data27.chiasenhac.com/downloads/1486/3/1485155-cff116a4/128/7_%20See%20Yo' +
    'u%20Again%20Wiz%20Khalifa%20feat_%20Charl%20[MP3%20128kbps].mp3')
  .on('error', function (err) {
    // handle error
  })
  .pipe(fs.createWriteStream('test.mp3'));