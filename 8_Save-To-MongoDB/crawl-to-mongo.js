/**
 * Created by Linh Ngo in 12/07/2017
 */
//=========USING NIGHTMARE JS TO CRAWL MOBILE PHONE PRODUCT PAGE===============

const Nightmare = require('nightmare');
const async = require('async');
let nightmare = Nightmare({
  show: true
});

//----- connect to db with pg-promise--------
const mongoose = require('mongoose');
const Product = require('./mongoose.js');
// Mảng có mỗi phần tử là 1 object chứa thông tin một sản phẩm
let realdata = [];

//=========NIGHTMARE PROCESS ĐẦU TIÊN LẤY CÁC URL===================
nightmare
  .goto('https://hoanghamobile.com/dien-thoai-di-dong-c14.html')
  .wait(1000)
  .evaluate(function () {
    let res = document.querySelectorAll('.mosaic-overlay');
    let arr = [];
    res.forEach(a => {
      let url = a.href;
      arr.push(url);
    })
    // chạy lấy thử 6 sản phẩm
    let newarr = arr.slice(0, 6);
    return newarr;
  })
  .end()
  .then(function (result) {
    // console.log(result); gọi hàm crawl() - tạo các nightmare process con để chạy
    // vào từng url sản phẩm
    crawl(result, function (err, res) {
      if (err) {
        console.log(err.message);
      }
      console.log('Hoàn thành chạy crawl()');
      // Ngắt kết nối của mongoose với CSDL
      mongoose.connection.close(function () { 
        console.log('Mongoose connection ends !!');  
      }); 
    });
  })
  .catch(function (err) {
    console.error('Search failed:', err.message);
  });

/**
 * Hàm cào dữ liệu chính nhận 1 mảng các url và tạo nightmare đọc dữ liệu của từng link
 * @param {array} arr - mảng chứa tất cả các url của sản phẩm
 * @param {function} cb - hàm callback khi hoàn thành 1 tiến trình nightmare đọc dữ liệu của 1 sản phẩm
 */
function crawl(arr, cb) {
  function crawlEachUrl(item, cb) {
    // item is each url
    let night = new Nightmare();
    night
      .goto(item)
      .wait(1000)
      .evaluate(function () {
        try {
          let obj = {};
          let name = document
            .querySelector('h1[itemprop=name] strong')
            .innerText
            .split('-')[0]
            .trim();
          let manufacturer = document
            .querySelector('.simple-prop p span a')
            .innerText
            .split('-')[0]
            .split(' ')[0]
            .trim();
          let price = parseInt(document.querySelector("[itemprop='price']").innerText.split('₫')[0].split(".").join("").trim());
          let mainPropertyAll = document.querySelectorAll('.simple-prop p');

          obj['product_name'] = name;
          obj['manufacturer'] = manufacturer;
          obj['price'] = price;

          // main property
          let mainProp = {}
          mainPropertyAll.forEach(p => {
            let prop = p
              .querySelector('label')
              .innerText
              .replace(":", "");
            let value = p
              .querySelector('span')
              .innerText
              .trim();
            mainProp[prop] = value
          })
          obj['main_property'] = mainProp;
          return obj;

        } catch (err) {
          console.log(err.message);
          return {};
        }
      })
      .end()
      .then(function (res) {
        if (!res) {
          cb(null, {});
        }
        try {
          // update data every crawl time 
          // -----------Export to database directly---------
          let newProduct = new Product(res)
            .save()
            .then(function (newProduct) {
              console.log(newProduct);
              console.log('Insert to Mongo success');
              cb(null, res);
            })
            .catch(error => {
              console.log(error.message);
            })

        } catch (err) {
          console.log(err.message);
          cb(null, {});
        }
      });
  }
  // dùng module async để giới hạn số tiến trình nightmare chạy 1 lúc
  async
  .mapLimit(arr, 2, crawlEachUrl, function (err, res) {
    cb(null, res);
  });
}