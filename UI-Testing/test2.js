const Nightmare = require('nightmare')
const assert = require('assert')

// LƯU Ý: SỬ DỤNG ANONYMOUS FUNCTION THAY VÌ ARROW FUNCTION KHI MUỐN SỬ DỤNG MOCHA CONTEXT
// Ví dụ dưới đây muốn sử dụng hàm 'timeout()' của Mocha
// Nếu sử dụng arrow function thì sẽ không sử dụng đc các hàm của mocha vì 'this' không đc bind với mocha
// Mocha không khuyến khích việc sử dụng arrow function nên chúng ta sẽ viết hoàn toàn là hàm vô danh 'function () {}' trong các ví dụ sau

describe('Bộ test',  function () {
  //console.log(this); // nếu sử dụng arrow function thì 'this' đc gán với 1 object rỗng {} => error: this.timeout() is not a function
  this.timeout(1000); // sử dụng function() {} thì 'this' đc gán vs mocha context là 'Bộ test' test suite
  console.log('hàm timeout ở ngoài ok');
  it('my test', function () { 
    // hàm bên trong test case này nếu dùng arrow function thì vẫn ok 
    // vì arrow function binds 'this' với hàm bao đóng nó ở ngoài -> 'this' bên trong giống vs 'this' bên ngoài -> có mocha context
    this.timeout(1000);
    console.log('hàm timeout ở trong ok');
    assert.ok(true);
  });
});