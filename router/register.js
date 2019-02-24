const Router = require('koa-router');
const router = new Router();
const path = require('path');//绝对路径
const db = require(path.resolve('mysql/mysql'))


router.post('/',async ctx => {
    let {user_name,password} = ctx.request.body
    await db.startTransaction();
    await db.executeTransaction("select * from user_table where user_name=?", [user_name]).then(res => {
        try {
            if(res.length === 0){
                db.executeTransaction("INSERT INTO user_table (user_name, password) VALUES (?,?)",[user_name,password])
                ctx.body = {
                    msg: '用户添加成功',
                    code: 1
                }
            }else{
                ctx.body = {
                    msg: '用户名已存在，请重新输入',
                    code: 0
                }
            }
        }catch(e){
            console.log(e)
        }
    });

    await db.stopTransaction();

    
})

module.exports = router.routes();