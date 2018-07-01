
var Goods=require("../model/shops");
var express=require("express");
var router=express.Router();

router.get('/',function(req,res,next){
  var page=parseInt(req.param("page"));
  var pageSize=parseInt(req.param("pageSize"));
  var sort=req.param('sortFlag');
  var skip=(page-1)*pageSize;//过滤的数量
  var goodsModel=Goods.find({}).skip(skip).limit(pageSize);//商品数据的过滤以及数量的限制
  //查询成功后返回数据
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function(err,doc){
      if(err){
        res.json({
          status:1000,
          msg:err.msg
        });
        return;
      }
      res.json({
        status:2000,
        list:doc,
        len:doc.length
      })
  })
})

module.exports=router;
