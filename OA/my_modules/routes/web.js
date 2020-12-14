// 加载自定控制器模块
// 前台控制器
const indexController = require('../controller/indexController');
const backstageController = require('../controller/backstage/backstageController');
const managerIndexController = require('../controller/home/manager/indexController');
const staffIndexController = require('../controller/home/staff/indexController');

// 后台控制器


module.exports = function(app){
    //通用路由
    app.get('/',indexController.index)
    app.get('/index',indexController.index)
    app.post('/login',indexController.login)
    app.post('/register',indexController.register)
    

    // 前台路由
    app.get('/home/manager/index',managerIndexController.index)
    app.get('/home/staff/index',staffIndexController.index)

    
    // 后台路由
    app.get('/admin/backstage',backstageController.index)
    app.get('/admin/backstage/personsAll',backstageController.personsAll)
    app.post('/admin/backstage/personsSome',backstageController.personsSome)
}


