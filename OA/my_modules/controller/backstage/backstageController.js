//导入数据库操作组件
let Base = require('../../model/Base');

//首页
exports.index = function(req,res){
    res.render('admin/backstage',{});
}

//添加人员档案页面
exports.personInsert = function(req,res){
    res.render('admin/personInsert',{});
}

//更新人员档案页面
exports.personUpdates = function(req,res){
    // console.log(req.query);
    req.session.updateId = req.query.id;
    res.render('admin/personUpdate',{});
}

//获取所有人员档案
exports.personsAll = function(req,res){
    let base = new Base('person');
    base.select(function(result){
        let base2 = new Base('department');
                // console.log(result)
        let i = 0;
        for(let val of result){
            base2.where({id:val.department_id}).select(function(result2){
                val.department = result2[0].name;
                i++;
                // console.log(i);
                // console.log(result.length)
                // console.log(result2)
                // console.log(val)
                if(i == result.length){
                    // console.log(123)
                    res.send(result);
                }
            });
        }
    });
}

//获取个别人员档案
exports.personsSome = function(req,res){
    let base = new Base('person');
    let name = '%'+req.body.name+'%';
    // console.log(name)
    // return;
    base.where([{name:name,lim:'like'}]).select(function(result){
        let base2 = new Base('department');
                // console.log(result)
        let i = 0;
        for(let val of result){
            base2.where({id:val.department_id}).select(function(result2){
                val.department = result2[0].name;
                i++;
                // console.log(i);
                // console.log(result.length)
                // console.log(result2)
                // console.log(val)
                if(i == result.length){
                    // console.log(123)
                    res.send(result);
                }
            });
        }
    });
}

//添加人员档案
exports.personAdd = function(req,res){
    // console.log(req.body)
    // return;
    let base = new Base('person');
    base.where({identity:req.body.identity}).select(function(result){
        if(result.length>0){
            let data = {
                code:0,
                msg:'该身份证已被使用'
            };
            res.send(data);
        }else{
            base.where({telphone:req.body.telphone}).select(function(result){
                if(result>0){
                    let data = {
                        code:0,
                        msg:'该电话已被使用'
                    };
                    res.send(data);
                }else{
                    base.data(req.body).insert(function(result){
                        if(result.insertId > 0){
                            let data = {
                                code:1,
                                msg:'添加成功，三秒后跳转'
                            };
                            res.send(data);
                        }else{
                            let data = {
                                code:0,
                                msg:'网络链接错误'
                            };
                            res.send(data);
                        }
                    });
                }
            });
        }
    });
}

//删除人员档案
exports.personDelete = function(req,res){
    let base = new Base('person');
    let identity = req.body.identity;
    // console.log(name)
    // return;
    base.where({identity:identity}).select(function(result){
        if(result.length>0){
            base.where({identity:identity}).delete(function(result2){
                if(result2.affectedRows > 0){
                    let data = {
                        code:1,
                        msg:'删除成功'
                    };
                    res.send(data);
                }else{
                    let data = {
                        code:0,
                        msg:'网络链接错误'
                    };
                    res.send(data);
                }
            })
        }else{
            let data = {
                code:0,
                msg:'查无此人'
            };
            res.send(data);
        }
    });
}

//更改人员档案
exports.personUpdate = function(req,res){
    let base = new Base('person');
    let id = req.body.id;
    let person = req.body;
    // console.log(req.body);
    // return;
    base.where({id:id}).data(person).update(function(result){
        if(result.affectedRows > 0){
            let data = {code: 1, msg: "更新成功，三秒后跳转"}
            res.send(data);
        }else{
            let data = {
                code:0,
                msg:'网络链接错误'
            };
            res.send(data);
        }
    });
}

//获取需要修改的人员档案
exports.getPersonById = function(req,res){
    let base = new Base('person');
    let id = req.session.updateId;
    // console.log(id);
    // return;
    base.where({id:id}).select(function(result){
        res.send(result[0]);
    });
}

//获取所有部门名称
exports.getAllDepartment = function(req,res){
    let base = new Base('department');
    // console.log(id);
    // return;
    base.select(function(result){
        res.send(result);
    });
}