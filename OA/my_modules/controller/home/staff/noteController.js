//导入数据库操作组件
let Base = require('../../../model/Base');


//便签页
exports.index = function(req,res){
    res.render('home/staff/note/note',{});
}