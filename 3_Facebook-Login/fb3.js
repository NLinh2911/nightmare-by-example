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
  .insert('#email', 'fb email')
  .type('#pass', 'fb pass')
  .type('#pass', '\u000d')
  .wait(4000)
  .click("#navItem_116493792264133 a[title='Lớp bơi Techmaster']")
  .wait(5000)
  .scrollTo(5000, 0)
  .wait(2000)
  .scrollTo(10000, 0)
  .wait(2000)
  .scrollTo(16000, 0)
  .wait(2000)
  .evaluate(function () {
    // lấy đường đẫn tất cả các profile viết bài trong group
    let profiles = document.querySelectorAll('.clearfix._5va3 .clearfix._42ef .fwb a');
    let profileNames = [];
    profiles.forEach(a => {
      let name = a.innerText;
      profileNames.push(name);
    })
    return profileNames;
  })
  .end()
  .then(function (profileNames) {
    console.log(profileNames);
    let countName = profileNames.reduce((prev, next) => {
      let name = next;
      prev[name] = prev[name] + 1 || 1;
      return prev
    }, {})
    console.log(countName);
  })
  .catch(error => {
    console.log('ERROR: ', error);
  })