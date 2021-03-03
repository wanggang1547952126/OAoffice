
//导入数据库操作组件
let Base = require('../../../model/Base');


//公告页
exports.index = function(req,res){
    res.render('home/staff/notice/notice',{});
}

//获取公告
exports.getnotice = function(req,res){
    let base = new Base('person');
    base.where({id:req.session.user.person_id}).select(function(result){
        // console.log(result)
        let department_id = result[0].department_id;
        // console.log(department_id)
        let base2 = new Base('notice');
        base2.order({id:'desc'}).where({department_id:department_id}).select(function(result2){
            let i = 0;
            for(let val of result2){
                base.where({id:val.person_id}).select(function(r){
                    val.person = r[0].name;
                    i++;
                    if(i == result2.length){
                        res.send(result2);
                    }
                });
            }
        });
    });
}