const Router = require('koa-router');
const router = new Router();
const path = require('path');//绝对路径
const db = require(path.resolve('mysql/mysql'))




router.get('/',async ctx => {
   
    await db.startTransaction();
    await db.executeTransaction("select * from msg_table", []).then(res => {
        try {
            if(res.length === 0){
                ctx.body = {
                    msg: '无此信息',
                    code: 0
                }
            }else{
                ctx.body = {
                    data:res,
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