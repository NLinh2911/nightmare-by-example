/**
 * Created by Linh Ngô in 12/07/2017
 */
// DEMO DOWNLOAD MP3 TRÊN CHIASENHAC Gọi module Nightmare để sử dụng
const Nightmare = require('nightmare');
const async = require('async');
// module shell giúp viết các câu lệnh của command line cho Node
const shell = require('shelljs');
const fs = require('fs');
const request = require('request');
// khởi tạo nightmare
const nightmare = new Nightmare({
  show: true
});

nightmare
  .goto('http://chiasenhac.vn/')
  .wait(2000)
  .type('#s', 'Charlie Puth') // điền thông tin tìm kiếm
  .wait(1000)
  .type('#s', "\u000d") // nhấn enter
  .wait(3000)
  .click('#cmusic') // lọc chỉ hiển thị file nhạc
  .click(".tk-tbt input[type='submit']") // click công cụ tùy chỉnh
  .wait(3000)
  .evaluate(function () {
    // lấy các url của bài hát
    let musicTable = document.querySelector('tbody');
    let songs = musicTable.querySelectorAll('tr:not(:first-child) a.musictitle');
    // chạy qua từng thẻ và lấy đường dẫn để tải
    let musicUrls = [];
    songs.forEach(song => {
      musicUrls.push(song.getAttribute('href'));
    })
    // mảng musicUrls có tất cả 25 bài hát
    // lấy 5 bài để chạy thử 
    return musicUrls.slice(0, 5);
  })
  .end()
  .then(musicUrls => {
    // musicUrls này mới là url trang bài hát trên chiasenhac, chưa phải là link để
    // download cần chạy nightmare vào từng link để lấy đường dẫn tải nhạc
    crawl(musicUrls, function (err, res) {
      if (err) {
        console.log(err.message);
      }
      console.log('Hoàn thành chạy crawl()');
    });

  })
  .catch(error => {
    console.log('ERROR: ', error);
  })

/**
 * Hàm cào dữ liệu chính nhận 1 mảng các url và tạo nightmare đọc dữ liệu của từng link
 * @param {array} arr - mảng chứa tất cả các url của sản phẩm
 * @param {function} cb - hàm callback khi hoàn thành 1 tiến trình nightmare tải nhạc
 */
function crawl(arr, cb) {
  function crawlEachUrl(item, cb) {
    // item is each url
    let nightmare = new Nightmare();
    nightmare
      .goto(item)
      .wait(2000)
      .evaluate(function () {
        return document
          .querySelector('.datelast a:not(.gen)')
          .href;
      })
      .end()
      .then(downloadLink => {
        console.log('Đến lượt tải: ', downloadLink);
        let nightmare2 = new Nightmare();
        nightmare2
          .goto(downloadLink)
          .evaluate(function () {
            let link = document
              .querySelector('#downloadlink a')
              .href;
            let songTitle = document
              .querySelector('.viewtitle')
              .innerText;
            return [link, songTitle];
          })
          .end()
          .then(result => {
            if (!result) {
              cb(null, {});
            }
            try {
              request
                .get(result[0])
                .on('error', function (err) {
                  // handle error
                  if (err)
                    throw err;
                })
                .pipe(fs.createWriteStream(`${destPath}/${result[1]}.mp3`));
              cb(null, result); // tải xong gọi hàm cb báo với async để chạy tiến trình mới
            } catch (err) {
              console.log(err.message);
              cb(null, {});
            }
          })
          .catch(error => {
            console.log('ERROR: ', error);
          })
      })
      .catch(error => {
        console.log('ERROR: ', error);
      })
  }
  // tạo folder để chứa file nhạc
  let destPath = __dirname + '/music';
  shell.mkdir('-p', destPath);
  // dùng module async để giới hạn số tiến trình nightmare chạy 1 lúc
  async.mapLimit(arr, 2, crawlEachUrl, function (err, res) {
    cb(null, res);
  });
}