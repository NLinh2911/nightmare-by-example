// Demo đăng nhập facebook
/*
 * Chủ đề chính: type() để điền thông tin tự động
 * click() nhấn vào 1 selector
 */
const Nightmare = require('nightmare');
// khởi tạo nightmare
const nightmare = Nightmare({show: true});
// truy cập vào vnexpress.net
nightmare
  .goto('https://www.facebook.com/')
  .wait(1000)
  .type('#email', 'fb email')
  .type('#pass', 'pass facebook')
  .click('#loginbutton')
  .wait(4000)
  .evaluate(function () {
    return 'login success';
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(error => {
    console.log('ERROR: ', error);
  })