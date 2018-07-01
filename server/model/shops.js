var mongoose=require("mongoose");
var Schema=mongoose.Schema;//创建数据库表对象
var produtSchema=new Schema({
  "productId":String,//商品的ID
  "productName":String,//商品的名称
  "salePrice":Number,//商品的价格
  "checked":String,//是否选中
  "productNum":Number,//商品的数据
  "productImage":String//商品图片地址
});
module.exports=mongoose.model('Good',produtSchema);

