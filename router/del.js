const Router = require('koa-router');
const router = new Router();
const path = require('path');//绝对路径
const db = require(path.resolve('mysql/mysql'))




router.post('/',async ctx => {
   let de = ctx.request.body.user_id;
   console.log(de)
    await db.startTransaction();
    await db.executeTransaction("delete from msg_table where user_id=?",[de]).then(res => {
        try {
           
                ctx.body = {
                    msg:'删除成功',
                    status:200,
                    code: 1
                }
        }catch(e){
            console.log(e)
        }
    });

    await db.stopTransaction();

    
})

module.exports = router.routes();