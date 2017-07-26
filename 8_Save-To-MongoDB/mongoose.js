const mongoose = require('mongoose');

// Kết nối với mongodb
// Nếu connect tới 1 database chưa tồn tại, Mongo sẽ tự động tạo ra db đấy
mongoose.connect('mongodb://localhost/test_product')
// lắng nghe sự kiện (connection event) xem khi nào kết nối đc vs mongo
// 'once' - chỉ lắng nghe sự kiện 'open' này 1 lần duy nhất
mongoose.connection.once('open', function () {
  console.log('Connection success !!!');
}).on('error', function (error) {
  console.log('Connection error: ', error);
})

// Tạo 1 Schema - mỗi 1 schema sẽ tương ứng với 1 MongoDB collection
// Schema này giúp định nghĩa trước cấu trúc của các đối tượng (documents) trong 1 collection
const productSchema = new mongoose.Schema({
  product_name: String,
  manufacturer: String,
  price: Number,
  main_property: Object,
})
// Tạo 1 model sản phẩm để chúng ta sử dụng
const Product = mongoose.model('Product', productSchema);

module.exports = Product;