const Router = require('koa-router');
const router = new Router();
const path = require('path');
const bodyParser = require('koa-bodyparser')
// const db = require('../mysql/mysql');
const db = require(path.resolve('mysql/mysql'))
const addtoken = require(path.resolve('token/addtoken'))
const proving = require(path.resolve('token/proving'))
router.post('/',async ctx => {
  try{
    let {user_name,password} = ctx.request.body
    await db.startTransaction();
    if(user_name){
      await db.executeTransaction("select * from user_table where user_name=? and password=?",[user_name,password]).then(res => {
          if(res.length === 0){
              ctx.body = {
                  code: 0,
                  status: 999,
                  msg: 'error'
                }
          }else{
              let token = addtoken(res[0]);
              ctx.body = {
                  user: res[0].user_name,
                  vip: res[0].vip,
                  token,
                  code: 1,
                  status: 200
                }
          }
      });
    }else{
      ctx.status=400
    }
  }catch(e){
    console.log(e)
  }
    await db.stopTransaction();  
})
router.get('/test',async (ctx,next) => {
    let token = ctx.request.header.authorization;
    if (token){
    //  获取到token
      let res = proving(token);
        if (res && res.exp <= new Date()/1000){
          ctx.body = {
            message: 'token过期',
            code:3
          };
        } else {
          ctx.body = {
            message: '解析成功',
            code:1
          }
        }
    } else{  // 没有token
      ctx.body = {
        msg:'没有token',
        code:0
      }
    }
});
module.exports = router.routes();