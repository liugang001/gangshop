
var Goods=require("../model/shops");
var express=require("express");
var router=express.Router();

router.get('/',function(req,res,next){
  Goods.find({},function(err,doc){
      if(err){
          res.json({
              status:2000,
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
