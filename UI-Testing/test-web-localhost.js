// DEMO UI TESTING TRANG THANHQUAN MOBILE

const Nightmare = require('nightmare')
const assert = require('assert')

describe('UI Flow Tests', function () {
  // bên trong này sẽ có nhiều test con kiểm tra tải trang, đăng kí, mua sản
  // phẩm,...

  // khai báo và khởi tạo nightmare trước khi chạy mỗi test
  let nightmare = null
  beforeEach('khởi tạo nightmare', function () {
    nightmare = new Nightmare({show: true})
  })
  
  describe('Test trang công khai', function () {
    describe('/ (Trang chủ)', function () {
      // set thời gian tải trang chủ không quá 5s
      this.timeout('10s')

      it('Trang chủ ok', function (done) {
        nightmare
          .goto('http://localhost:3002/')
          .end()
          .then(function (result) {
            done()
          })
          .catch(done)
      })
    })

    describe('Trang sản phẩm', function () {
      it('Trang sản phẩm ok', function (done) {
        nightmare
          .goto('http://localhost:3002/dien-thoai')
          .scrollTo(500, 0)
          .end()
          .then(result => {
            done()
          })
          .catch(done)
      })
    })
  })

  // Test chức năng đăng kí tài khoản
  describe('Đăng kí tài khoản', function () {
    // Test trường hợp thất bại
    describe('Đăng kí với thông tin sai', function () {
      it('Đăng kí thất bại - tài khoản trùng', function (done) {
        nightmare
          .goto('http://localhost:3002/')
          .wait(3000)
          .click('#login')
          .click("span[data-target='#registerModal']")
          .wait(3000)
          .insert("input[name='fullname']", 'Test Name 1')
          .wait(3000)
          .insert("input[name='phone']", '0912345678')
          .wait(3000)
          .insert("input[name='password2']", 'fakepassword3')
          .wait(3000)
          .select("select[name='gender']", 'Nữ')
          .wait(1000)
          .insert("textarea[name='address']", 'fake address')
          .wait(1000)
          .check("input[name='agreement']")
          .wait(1000)
          .click('#signup-submit')
          .wait(5000)
          .type("input[name='email']", 'fake3@gmail.com')
          .wait(3000)
          .click('#signup-submit')
          .type("input[name='password']", 'fakepassword3')
          .wait(3000)
          .click('#signup-submit')
          .wait(5000)
          // sau khi đăng kí -> đăng kí thất bại sẽ trở về trang chủ vs alert báo lỗi lấy
          // alert báo lỗi để so sánh xem là lỗi gì
          .evaluate(function () {
            let alert = document
              .querySelector('.alert.alert-danger')
              .innerText;
            return alert;
          })
          .end()
          .then(function (alert) {
             // console.log(alert); 
             // trang web báo lại alert tùy theo lỗi
            if (alert === 'Account already exists. Please log in or register another account!') {
              done()
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      })

      it('Đăng kí thất bại vs password k khớp', function (done) {
        nightmare
          .goto('http://localhost:3002/')
          .wait(3000)
          .click('#login')
          .click("span[data-target='#registerModal']")
          .wait(3000)
          .insert("input[name='fullname']", 'Test Name 4')
          .wait(3000)
          .insert("input[name='phone']", '0912345678')
          .wait(3000)
          .insert("input[name='password2']", 'fakepassword4')
          .wait(3000)
          .select("select[name='gender']", 'Nữ')
          .wait(1000)
          .insert("textarea[name='address']", 'fake address')
          .wait(1000)
          .check("input[name='agreement']")
          .wait(1000)
          .click('#signup-submit')
          .wait(5000)
          .type("input[name='email']", 'fake4@gmail.com')
          .wait(3000)
          .click('#signup-submit')
          .type("input[name='password']", 'fakepassword3')
          .wait(3000)
          .click('#signup-submit')
          .wait(5000)
          .evaluate(function () {
            let alert = document.querySelector('.alert.alert-danger') 
              .innerText;
            return alert;
          })
          .end()
          .then(function (alert) {
            // console.log(alert); 
            // trang web báo lại alert tùy theo lỗi
            if (alert === 'Passwords do not match') {
              done()
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      })
    })
  })

  // Test thêm sản phẩm vào giỏ hàng
  describe('Mua sản phẩm', function () {
    it('Click mua sản phẩm ok', function (done) {
      nightmare
        .goto('http://localhost:3002/dien-thoai')
        .wait(3000)
        .click('#buy_rJBsc-wRe a')
        .wait(5000)
        .evaluate(function () {
          let productNumber = document.querySelector('.my-cart-badge') // số lượng sản phẩm hiển thị trên icon giỏ hàng
            .innerText;
          return productNumber;
        })
        .end()
        .then(productNumber => {
          // console.log(productNumber);
          if (productNumber == '1') { // thêm 1 sản phẩm nên số lượng phải bằng 1
            done()
          }
        })
        .catch(done)
    })
  })
  
})
