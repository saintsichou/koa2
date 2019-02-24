const Koa = require('koa');
const app = new Koa();
const path = require('path');
const bodyparser = require('koa-bodyparser');
const login = require(path.resolve('./router/login'));
const register = require(path.resolve('./router/register'));
const checkmsg = require(path.resolve('./router/checkmsg'));
const addmsg = require(path.resolve('./router/addmsg'));
const del = require(path.resolve('./router/del'));
const router = require('koa-router')();
const cors = require('koa2-cors');
require(path.resolve('./token/proving'));

//bodyparser
app.use(bodyparser())

app.use(cors({
	origin: function(ctx) {
		if (ctx.url === '/login') {
			return "*"; // 允许来自所有域名请求
		}
		return '*';
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    
}));


// 登陆
router.use('/login', login);
//注册
router.use('/register', register);
//查评价
router.use('/checkmsg', checkmsg);
//添加评价
router.use('/addmsg', addmsg);
//删除
router.use('/del',del);

let port = 3888;
app
	.use(router.routes())
	.use(router.allowedMethods());
app.listen(port)
console.log(`server is running at ${port}`)