// 加载自定控制器模块
// 前台控制器
const indexController = require('../controller/indexController');
const sessionController = require('../controller/sessionController');
const managerIndexController = require('../controller/home/manager/indexController');
const staffIndexController = require('../controller/home/staff/indexController');
const noticeController = require('../controller/home/staff/noticeController');
const noteController = require('../controller/home/staff/noteController');
const meController = require('../controller/home/staff/meController');

// 后台控制器
const backstageController = require('../controller/backstage/backstageController');
const officeSuppliesController = require('../controller/backstage/officeSuppliesController');
const meetingController = require('../controller/backstage/meetingController');

module.exports = function(app){
    //通用路由
    app.get('/',indexController.index)
    app.get('/index',indexController.index)
    app.post('/login',indexController.login)
    app.post('/register',indexController.register)

    //获取session的数据
    app.post('/session/user',sessionController.getUser)
    

    // 前台路由
    //经理
    app.get('/home/manager/index',managerIndexController.index)

    
    //员工
    //邮件
    app.get('/home/staff/index',staffIndexController.index)
    app.get('/Home/staff/email',staffIndexController.email)
    app.get('/Home/staff/sendEmail',staffIndexController.sendEmail)

    //公告
    app.get('/Home/staff/notice',noticeController.index)

    // 便签
    app.get('/Home/staff/note',noteController.index)

    // 我的
    app.get('/Home/staff/me',meController.index)


    //邮件
    app.post('/home/staff/acceptEmailAll',staffIndexController.acceptEmailAll)
    app.post('/home/staff/acceptEmailSome',staffIndexController.acceptEmailSome)
    app.post('/home/staff/sendEmailAll',staffIndexController.sendEmailAll)
    app.post('/home/staff/sendEmailSome',staffIndexController.sendEmailSome)
    app.post('/home/staff/delEmail',staffIndexController.delEmail)
    app.post('/home/staff/lookEmail',staffIndexController.lookEmail)
    app.post('/Home/staff/sendEmail',staffIndexController.addEmail)

    //公告
    app.post('/Home/staff/notice',noticeController.getnotice)
    
    // 后台路由
    //人员档案
    app.get('/admin/backstage',backstageController.index)
    app.get('/admin/backstage/personsAll',backstageController.personsAll)
    app.get('/admin/backstage/personInsert',backstageController.personInsert)
    app.get('/admin/backstage/personUpdate',backstageController.personUpdates)
    app.get('/admin/backstage/getAllDepartment',backstageController.getAllDepartment)


    app.post('/admin/backstage/personsSome',backstageController.personsSome)
    app.post('/admin/backstage/personInsert',backstageController.personAdd)
    app.post('/admin/backstage/personDelete',backstageController.personDelete)
    app.post('/admin/backstage/getPersonById',backstageController.getPersonById)
    app.post('/admin/backstage/personUpdate',backstageController.personUpdate)


    //办公用品
    app.get('/admin/material',officeSuppliesController.index)
    app.get('/admin/material/materialAll',officeSuppliesController.materialAll)
    app.get('/admin/material/officeSuppliesInsert',officeSuppliesController.officeSuppliesInsert)
    app.get('/admin/material/officeSuppliesUpdate',officeSuppliesController.officeSuppliesUpdate)


    app.post('/admin/material/materialSome',officeSuppliesController.materialSome)
    app.post('/admin/material/officeSuppliesInsert',officeSuppliesController.materialAdd)
    app.post('/admin/material/officeSuppliesDelete',officeSuppliesController.materialDelete)
    app.post('/admin/material/getOfficeSupplyById',officeSuppliesController.getmaterialById)
    app.post('/admin/material/officeSupplyUpdate',officeSuppliesController.materialUpdate)

    //会议记录
    app.get('/admin/meeting',meetingController.index)
    app.get('/admin/meeting/meetingInsert',meetingController.meetingInsert)
    app.get('/admin/meeting/meetingAll',meetingController.meetingAll)


    app.post('/admin/meeting/meetingInsert',meetingController.meetingAdd)
    app.post('/admin/meeting/meetingSome',meetingController.meetingSome)
    app.post('/admin/meeting/meetingDelete',meetingController.meetingDelete)
}


