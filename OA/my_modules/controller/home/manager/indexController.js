//导入数据库操作组件
let Base = require('../../../model/Base');

//首页
exports.index = function(req,res){
    res.render('home/manager/index',{});
}

