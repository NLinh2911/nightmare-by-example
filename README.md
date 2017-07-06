# Nightmarejs
* Nightmare là một thư viện tự động hóa chạy browser. Nightmare sử dụng electron để truy cập web, mỗi lần truy xuất vào 1 url và lấy dữ liệu trên trang này, sẽ dùng mở bằng electron, hoàn thành tác vụ thì ngắt và đóng electron  
* Nightmare bắt chước các tương tác của người dùng trên 1 trang web như:
  * Truy xuất: `goto`
  * Đánh chữ: `type` 
  * Nhấn chuột: `click`
* Thường được sử dụng cho kiểm thử UI hoặc cào dữ liệu

## Cài đặt: 
* Nightmare là module của Nodejs nên máy các bạn cần cài đặt Nodejs

* Cài đặt Nightmarejs với npm
```bash
$ npm install --save nightmare
```
* Các file nightmare chúng ta sẽ viết là javascript nên ví dụ để chạy 1 file cào dữ liệu từ vnexpress, tên file là vnexpress.js
```bash
$ node vnexpress.js
```

## VÍ DỤ LẤY TIÊU ĐỀ CÁC BÀI BÁO TRÊN TRANG CHỦ VNEXPRESS
#### CÁC BƯỚC: 
* Cài đặt nodejs
* Cài đặt nightmarejs
```bash
$ npm install nightmare
```
* Gọi module và khởi tạo nightmare
```js
// Gọi module Nightmare để sử dụng
const Nightmare = require('nightmare');
// khởi tạo nightmare
const nightmare = Nightmare();
```

* `goto(url)`: truy xuất 1 trang web theo địa chị url truyền vào
  * Có thể đặt thời gian thoát - ném ra lỗi trong qua trình chạy chương trình (throw an exception - exception là lỗi xảy ra trong runtime) nếu `goto()` không hoàn thành loading trong khoảng thời gian nhất định với `gotoTimeout`. Lưu ý, chỉ ném lỗi khi hết thời gian mà DOM chưa đc tải (chứ không phải là tất cả các resources trên trang web)
```js
  // thêm option lúc khởi tạo nightmare
  const nightmare = Nightmare({
    gotoTimeout: 1000 // tính theo ms -> 1000ms là 1s
  })
```
  * `{show: true}` option để hiển thị electron web khi chạy chương trình nightmare
```js
  // thêm option lúc khởi tạo nightmare
  const nightmare = Nightmare({
    gotoTimeout: 1000,
    show: true // hiển thị web khi chạy, nếu không có option này thì chạy ẩn
  })
  // sau khi khởi tạo -> truy xuất vào trang vnexpress.net
  nightmare.goto('http://vnexpress.net/') 
```

* `evaluate(function(){...})` dùng để lấy thông tin từ 1 website. Thực hiện hàm bên trong evaluate() trên trang web đang truy cập để lấy thông tin sau đó trả về dữ liệu đc return từ hàm đó
```js
  nightmare.goto('http://vnexpress.net/')
  .evaluate(function () {
    // news là 1 mảng chứa các thẻ <a> nằm trong <div> có class 'title_news'
    let news = document.querySelectorAll('.title_news a');
    // khai báo 1 mảng rỗng để chứa các tiêu đề
    let titles = [];
    // chạy qua mảng này và lấy tiêu đề
    news.forEach((article) => { // article ở đây là mỗi phần tử trong mảng news
      titles.push(article.innerText); // lần lượt đẩy các tiêu đề vào mảng titles
    })
    return titles; // kết thúc hàm trả về mảng titles
  })
```
* Lưu ý: `document.querySelectorAll('.title_news a')` sẽ tìm tất cả các <a> là con của thẻ có class `.title_news`
* `end()` kết thúc 1 quy trình trên 1 website, ngắt kết nối và đống cửa sổ electron
* Nếu sử dụng promise `then()` phải đc gọi sau khi `end()`. Trong `then()`, ta có thể hứng kết quả trả về từ đoạn lấy dữ liệu trang web trong `evaluate()`
```js
  .end() // kết thúc quy trình trên electron -> đóng electron
  .then(function (titles) { // titles trong then() này chính là kết quả titles đc trả về ở trên
    console.log(titles);
    console.log('Số lượng bài viết: ', titles.length);
  })
  .catch(error => { // xử lý trong trường hợp gặp lỗi 
    console.log('ERROR: ', error);
  })
```
## VÍ DỤ TỰ ĐỘNG ĐĂNG NHẬP VÀO FACEBOOK
* `type(selector, text)` sẽ tự động điền chuỗi `text` vào `selector`. Nếu `text` trống thì sẽ xóa giá trị trong `selector`
* Có thể gọi sự kiện keypress với `type` sử dụng unicode thay cho keypress, ví dụ, muốn thực hiện sự kiện nhấn phím 'enter' `.type('body', '\u000d')` (ở đây, selector chính là thẻ <body>, '\u000d' sẽ thay cho nút 'enter')

* `insert(selector, text)` tương tự như `type` nhưng không có chức nặng gọi sự kiện liên quan đến keyboard => nếu chỉ điền chữ thì dùng `insert` sẽ nhanh hơn 

```bash
$ node fb.js // đăng nhập fb sử dụng type() và click()

$ node fb2.js // sử dụng insert() và type()
```
