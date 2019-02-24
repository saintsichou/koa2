const Router = require('koa-router');
const router = new Router();
const path = require('path');//绝对路径
const db = require(path.resolve('mysql/mysql'));
const t = require(path.resolve('util/time'))

//获取ip
const getUserIp = (req) => {
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  }
router.post('/',async ctx => {
    let {user_id,user_name,message,star,vip} = ctx.request.body;
    let time = t();
    let ip = getUserIp(ctx.req)
    // console.log(ip)
    await db.startTransaction();
    await db.executeTransaction("INSERT INTO msg_table (user_id,user_name,message,star,time,vip) VALUES (?,?,?,?,?,?)",[user_id,user_name,message,star,time,vip]).then(res => {
        console.log(res)
        try {
            if(res.length === 0){
                ctx.body = {
                    msg: '添加失败',
                    code: 0
                }
            }else{
                ctx.body = {
                    status:200,
                    code: 1
                }
            }
        }catch(e){
            console.log(e)
        }
    });

    await db.stopTransaction();

    
})

module.exports = router.routes();