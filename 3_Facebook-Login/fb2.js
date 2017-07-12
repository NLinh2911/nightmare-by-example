// Demo đăng nhập facebook
/*
 * Chủ đề chính: type() để điền thông tin tự động và nhấn phím enter
 */
const Nightmare = require('nightmare');
// khởi tạo nightmare
const nightmare = Nightmare({show: true});
// truy cập vào vnexpress.net
nightmare
  .goto('https://www.facebook.com/')
  .wait(1000)
  .insert('#email', 'fb email')
  .type('#pass', 'fb pass')
  .type('#pass', '\u000d')
  .wait(4000)
  .evaluate(function () {
    return 'login successs';
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(error => {
    console.log('ERROR: ', error);
  })