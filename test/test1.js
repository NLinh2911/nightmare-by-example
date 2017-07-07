// UI TESTING ======LOAD A PAGE=========

const Nightmare = require('nightmare')
const assert = require('assert') // sử dụng để viết các trường hợp tests, cho phép kiểm tra giá trị trả về và giá trị đc mong đợi

// describe() là 1 bộ test (test suite), bên trong có thể dựng nhiều test case
describe('Tải trang web', function () {
  // console.log(this); 'this' ở đây đc gắn với mocha, không nên sử dụng arrow
  // function '(..)=>{...}' vì 'this' sẽ bị gán với hàm bao đóng của nó là
  this.timeout('10s') // '.timeout()' là 1 hàm của mocha, thời gian của bộ test này là 10s
  // Gợi ý: đặt timeout khi trang web chạy trên local 5s, trên remote web server
  // 10s khai báo biến nightmare và gán giá trị null - 1 giá trị rỗng làm 1 biến
  // để ta khởi tạo nightmare
  let nightmare = null;
  // vì mỗi bộ test con bên trong lại cần sử dụng 1 tiến trình nightmare
  // beforeEach() chính là 1 hook trong Mocha -> đc gọi trc khi chạy mỗi bộ test
  // con
  beforeEach('khởi tạo nightmare', function () {
    nightmare = new Nightmare({show: true})
  })

  describe('/ (Trang chủ)', function () {
    it('nên tải trong khung thời gian và không gặp lỗi', function (done) {
      // nếu muốn kiểm tra 1 trang local `http://localhost:port/path`
      nightmare
        .goto('https://vnexpress.net')
        .end()
        .then(function () {
          done()
        })
        .catch(done)
    })
  })

  describe('Trang tin giải trí', function () {
    it('nên tải trang tin tức ok', function (done) {
      nightmare
        .goto('http://giaitri.vnexpress.net/')
        .end()
        .then(function () {
          done()
        })
        .catch(done)
    })
  })
})