const express = require('express');
const router = express.Router();
const User=require("../model/user");//用户列表数据库模型

//登录接口
router.post("/login",function(req,res){
    let params={
        userName:req.body.userName,
        userPwd:req.body.userPwd
    };
    User.findOne(params,function(err,result){
        if(err){
          res.json({
            status:1,
            msg:err.message
          });
          return;
        }
        //如果登录成功则执行后续操作 保存cookie
        if(!result)return;
        res.cookie("userId",result.userId,{
          httpOnly:true,
          maxAge:99999
        });
        res.cookie("userName",result.userName,{
          httpOnly:true,
          maxAge:99999
        });
        res.json({
          status:0,
          msg:'登录成功',
          result:{
            userName:result.userName,
            userId:result.userId
          }
        });
    });
});


//登出接口
router.post("/logout", function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});


//检验登录状态
router.post("/checkLogin",function(req,res,next){
      if(req.cookies.userId){
            res.json({
              status:0,
              msg:'',
              result:req.cookies.userName || ''
            });
      }else{
            res.json({
              status:1,
              msg:'未登录',
              result:''
            });
      }
});





module.exports = router;
