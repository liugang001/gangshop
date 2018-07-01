var mongoose=require("mongoose");
//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/gang-shop');
//已连接请求响应
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});
//链接发生错误请求响应
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});
//断开连接请求响应
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
})
module.exports=mongoose;
