// Demo lấy các tiêu đề bài báo trong trang kenh14.vn mảng du lịch
/*
 * Main topics: wait, click, scrollTo
 */
const Nightmare = require('nightmare');
// khởi tạo nightmare
const nightmare = Nightmare({show: true});
// truy cập vào kenh14.vn
nightmare
.goto('http://kenh14.vn/')
  .wait(5000) // chờ tại trang chủ 5s
  .click(".kmli a[title='Du lịch']") // click vào mục du lịch
  .wait(1000)
  .scrollTo(5000, 0) // kéo xuống trang web để load thêm bài viết
  .wait(5000)
  .scrollTo(10000, 0)
  .wait(5000)
  .scrollTo(15000, 0)
  .wait(5000)
  .evaluate(function () {
    // news là 1 mảng chứa các thẻ <a> nằm trong <div> có class 'tn-title'
    let news = document.querySelectorAll('.tn-title a');
    let titles = [];
    // chạy qua mảng này và lấy tiêu đề
    news.forEach((article) => {
      titles.push(article.innerText);
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