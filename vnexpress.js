// Demo lấy các tiêu đề bài báo trong trang vnexpress.net
/*
 * Chủ đề chính: gọi module nightmare để sử dụng, khởi tạo nightmare
 * truy xuất vào web goto()
 * xử lý khi ở 1 trang web evaluate
 */

// Gọi module Nightmare để sử dụng
const Nightmare = require('nightmare');
// khởi tạo nightmare
const nightmare = Nightmare();
// truy cập vào vnexpress.net
nightmare
  .goto('http://vnexpress.net/')
  .evaluate(function () {
    // news là 1 mảng chứa các thẻ <a> nằm trong <div> có class 'title_news'
    let news = document.querySelectorAll('.title_news a');
    let titles = [];
    // chạy qua mảng này và lấy tiêu đề
    news.forEach((article) => {
      titles.push(article.innerText.trim());
    })
    return titles;
  })
  .end()
  .then(function (titles) {
    console.log(titles);
    console.log('Số lượng bài viết: ', titles.length);
  })
  .catch(error => {
    console.log('ERROR: ', error);
  })