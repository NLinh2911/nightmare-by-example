// Demo vào youtube.com để lấy cookies 
/*
 * Main topics: cookies
 */
const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});

nightmare
  .goto('https://www.youtube.com/')
  .cookies.get({}) // lấy tất cả cookies trong đg dẫn 'https://www.youtube.com/'
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

/*
 * Lấy tất cả cookies của tất cả các url có trong phần cookies khi mở youtube.com (có 2 urls: youtube.com và 1 đg dẫn quảng cáo)
 */
/*
nightmare
  .goto('https://www.youtube.com/')
  .wait(10000)
  .cookies.get({url: null}) // lấy tất cả cookies trong của tất cả url
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
*/