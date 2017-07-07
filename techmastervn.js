// Demo lấy bài viết trên Techmastervn Blog và lưu vào 1 file json
/*
 */
const fs = require('fs');
// Gọi module Nightmare để sử dụng
const Nightmare = require('nightmare');
// khởi tạo nightmare
const nightmare = new Nightmare({show: true});
let allPosts = {};
// truy cập vào
nightmare.goto('http://techmaster.vn/posts') // vào trang blog
  .evaluate(function () {
    // posts là 1 mảng chứa các thẻ <a> tiêu đề của bài viết trong 1 trang 1 trang
    // của Techmaster có 12 bài
    let posts = document.querySelectorAll('.card-title a');
    let urls = [];
    // chạy qua mảng này và lấy đg dẫn url vào từng bài viết
    posts.forEach((article) => {
      urls.push(article.href);
    })
    return urls;
  })
  .end()
  .then(function (urls) {
    console.log(urls);
    console.log('Số lượng bài viết: ', urls.length);
    // urls là 1 mảng chứa các url của bài viết truy xuất vào từng bài và lấy thông tin bài viết
    // khi chạy forEach thế này, tất cả 12 electron process sẽ gần như chạy đồng thời
    // vì thế thứ tự hoàn thành mỗi process lấy tin bài là không bắt buộc giống với thứ tự bài viết xuất hiện trên trang Techmaster
    urls.forEach(url => {
      // khởi tạo 1 nightmare mới để chạy - tạo 1 tiến trình electron mới
      let nightmare2 = new Nightmare({show: true})
      nightmare2
        .goto(url)
        .evaluate(function () {
          //let contentObj = {}
          let content = document
            .querySelector('.content')
            .innerText;
          let title = document
            .querySelector('title')
            .innerText;
          return [title, content];
        })
        .end()
        .then((result) => {
          // allPosts là 1 global obj
          // sau mỗi bài viết đc lấy tin -> lại tạo thành cặp {title: content} 
          allPosts[result[0]] = result[1];
          // mỗi lần thêm 1 bài viết đc cào, lại viết vào file 'content.json'
          // viết 12 lần chứ không phải là lấy 12 bài xong rồi viết 1 lần
          let jsonString = JSON.stringify(allPosts)
          fs.writeFile('content.json', jsonString, (err) => {
            if (err) 
              throw err;
            console.log('The file has been saved!');
          });
        })
        .catch(error => {
          console.log('ERROR: ', error);
        })
    })
  })
  .catch(error => {
    console.log('ERROR: ', error);
  })