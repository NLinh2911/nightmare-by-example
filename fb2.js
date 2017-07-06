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
  .insert('#email', 'andorea_2911@yahoo.com')
  .type('#pass', 'Taeny3981')
  .type('#pass', '\u000d')
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