var Goods = require("../model/shops");
var User = require("../model/user");
var express = require("express");
var router = express.Router();


router.post('/', function (req, res, next) {
  var page = parseInt(req.body.page);//当前页码
  var pageSize = parseInt(req.body.pageSize);//每一页总数
  var sort = req.body.sortFlag;//排序方式
  var priceLevel = req.body.priceLevel;//数据过滤
  var skip = (page - 1) * pageSize;//过滤的数量
  var parma = {};//搜索参数设置
  var priceGt = '';//开始价格
  var priceLte = '';//结束价格
  if (priceLevel != "all") {
    switch (priceLevel) {
      case '0':
        priceGt = 0;
        priceLte = 100;
        break;
      case '1':
        priceGt = 500;
        priceLte = 1000;
        break;
      case '2':
        priceGt = 1000;
        priceLte = 2000;
        break;
      case '3':
        priceGt = 2000;
        priceLte = 3000;
        break;
      case '4':
        priceGt = 3000;
        priceLte = 4000;
        break;
    }
    parma = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }


  var goodsModel = Goods.find(parma).skip(skip).limit(pageSize);//商品数据的过滤以及数量的限制
  //查询成功后返回数据
  goodsModel.sort({'salePrice': sort});
  goodsModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: 1000,
        msg: err.msg
      });
      return;
    }
    res.json({
      status: 2000,
      list: doc,
      len: doc.length
    })
  })
})

//访问添加到购物车
router.post("/addCart", function (req, res, next) {
  var userId = '100000077', productId = req.body.productId;
  User.findOne({userId: userId}, function (err, userDoc) {
    if(err){
        res.json({
          status: "1",
          msg: err.message
        })
    } else {
        var goodsItem = '';
        userDoc.cartList.forEach(function (item) {
          if (item.productId == productId) {
            goodsItem = item;
            item.productNum++;
          }
        });
        if (goodsItem) {
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: "1",
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          Goods.findOne({productId: productId}, function (err1, doc) {
            if (err1) {
              res.json({
                status: "1",
                msg: err1.message
              })
            } else {
              if (doc) {
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: "1",
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          });
        }

    }
  })


})


module.exports = router;
