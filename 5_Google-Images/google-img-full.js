// DEMO DOWNLOAD ẢNH TRÊN GOOGLE

// Gọi module Nightmare để sử dụng
const Nightmare = require('nightmare');
// module 'image-downloader' để tải ảnh và lưu vào trong máy
const imageDownloader = require('image-downloader');
// module shell giúp viết các câu lệnh của command line cho Node
const shell = require('shelljs');
const fs = require('fs');
// khởi tạo nightmare
const nightmare = new Nightmare({show: true});

nightmare
  .goto('https://www.google.com/')
  .type('#lst-ib', 'Ảnh top 10 món ăn việt nam') // điền thông tin tìm kiếm
  .wait(1000)
  .type('#lst-ib', "\u000d") // nhấn enter
  .wait(3000)
  .click('g-more-link a') // click xem thêm ảnh
  .wait(2000)
  .click(".hdtb-mn-hd[aria-label='Kích thước'] span") // click công cụ tùy chỉnh
  .mouseover('#isz_lt') // hover phần kích thước lớn hơn
  .click('#iszlt_vga') // chọn size ảnh 640x480
  .wait(3000)
  .evaluate(function () {
    // lấy các thẻ img
    let imgTags = document.querySelectorAll('.rg_ic.rg_i');
    //
    let imgArr = []
    // chạy qua từng thẻ và lấy đường dẫn để tải
    imgTags.forEach(img => {
      imgArr.push(img.getAttribute('src'));
    })
    return imgArr.slice(0, 10);
  })
  .end()
  .then(imgArr => {
    //console.log(imgArr);
    console.log('Length: ', imgArr.length);
    // tạo folder để lưu ảnh
    let destPath = __dirname + '/google-images';
    shell.mkdir('-p', destPath);
    // chạy qua từng đg đẫn rồi tải về
    imgArr.forEach((img, index) => {
      if (img.match(/^data:image\/\w+;base64,/)) { // nếu là hình ảnh dạng encoded base64
        // tìm và thay các phần k cần thiết với ''
        let data = img.replace(/^data:image\/\w+;base64,/, '')
        //
        fs.writeFile(`${destPath}/_${index}.jpg`, data, {
          encoding: 'base64'
        }, (error) => {
          if (error) 
            throw error;
          console.log('File saved ok');
        })

      } else { // nếu là ảnh có đường dẫn url bình thường, ví dụ 'https://.....'
        let options = {
          url: img,
          dest: `${destPath}/_${index}.jpg`
        }
        imageDownloader
          .image(options)
          .then(({filename, image}) => {
            console.log('File saved ok')
          })
          .catch((err) => {
            throw err
          });
      }
    })
  })
  .catch(error => {
    console.log('ERROR: ', error);
  })