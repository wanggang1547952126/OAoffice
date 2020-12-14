// 加载模块
const express = require('express');
const app = express();                          // 执行express返回express实例对象
const path = require('path');
const bodyparser = require('body-parser');      // 这个模块是用于简化网页提交方法的模块
const ejs = require('ejs');         // 加载ejs模块,这个模块是node中常用的模板渲染引擎模板
const session = require('express-session');     // 需要用到session的模块
const multer  = require('multer');              // 文件上传需要用的到模块

// 加载自定义模块
let web = require('./my_modules/routes/web')       // 正常页面路由模块
let api = require('./my_modules/routes/api')       // Api接口路由模块


// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));


// 设定view engine变量，意为网页模板后缀名
app.set('view engine', 'html');

// 当前框架使用的是hbs引擎
app.engine('html', ejs.__express);

// use() 是express模块的中间件方法
app.use(express.static(__dirname + '/public'))	// 设置静态资源文件夹
app.use(multer({ dest: '/tmp/'}).array('image'));       // 设置文件上传的配置

// 使用body这个模块方便输入数据的操作
app.use(bodyparser.json());     // 使用boddyparser中间件
app.use(bodyparser.urlencoded({extended:true}));

// 配置session
app.use(session({
    secret: 'secret',   //对session id 相对应cookie 的签名
    resave: true,
    saveUninitialized: false,   // 是否保存未初始化的会话
    cookie: {
        maxAge: 60 * 20 * 1000,  // 设置session的有效时长，单位为毫秒
    },
}));

// 调用路由模块, 并且把服务器实例对象进行传参
api(app)
web(app)



app.listen(8888, (err)=>{
    if(err){
        console.log('服务器开启失败，详细信息为：')
        console.log(err)
    }else{
        console.log('服务器开启成功：端口为：8888')
    }
})