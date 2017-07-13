const Nightmare = require('nightmare');
const fs = require('fs');
const request = require('request');
// khởi tạo nightmare
const nightmare = new Nightmare({
  show: true
});

nightmare
.goto('http://m1.chiasenhac.vn/mp3/vietnam/v-pop/dua-em-di-khap-the-gian~bich-phuong~ts' +
    'vdrcqqqmavee.html')
  .wait(2000)
  .evaluate(function () {
    return document.querySelector('.datelast a:not(.gen)').href;
  })
  .end()
  .then(downloadLink => {
    console.log(downloadLink);
    let nightmare2 = new Nightmare();
    nightmare2
      .goto(downloadLink)
      .evaluate(function () {
        let link = document.querySelector('#downloadlink a').href;
        let songTitle = document.querySelector('.viewtitle').innerText;
        return [link, songTitle];
      })
      .end()
      .then(result => {
        request
          .get(result[0])
          .on('error', function (err) {
            // handle error
            if (err)
              throw err;
          })
          .pipe(fs.createWriteStream(`${result[1]}.mp3`));
      })
  })
  .catch(error => {
    console.log('ERROR: ', error);
  })