//导入数据库操作组件
let Base = require('../../model/Base');

//首页
exports.index = function(req,res){
    res.render('admin/officeSupplies/backstage',{});
}

//添加办公用品页面
exports.officeSuppliesInsert = function(req,res){
    res.render('admin/officeSupplies/Insert',{});
}

//更新办公用品页面
exports.officeSuppliesUpdate = function(req,res){
    // console.log(req.query);
    req.session.updateId = req.query.id;
    res.render('admin/officeSupplies/Update',{});
}

//获取所有办公用品
exports.materialAll = function(req,res){
    let base = new Base('material');
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

//获取个别办公用品
exports.materialSome = function(req,res){
    let base = new Base('material');
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

//添加办公用品
exports.materialAdd = function(req,res){
    // console.log(req.body)
    // return;
    let name = req.body.name;
    let department_id = req.body.department_id;
    let money = req.body.money;
    let time = req.body.time;
    let num = req.body.num;
    let basedata = {name:name,department_id:department_id,money:money,time:time};
    let base = new Base('material');
    base.where(basedata).select(function(result){
        if(result.length>0){
            base.where(basedata).data({num:((result[0].num*1)+(num*1))}).update(function(result2){
                if(result2.affectedRows > 0){
                    let data = {code: 1, msg: "添加成功，三秒后跳转"}
                    res.send(data);
                }else{
                    let data = {
                        code:0,
                        msg:'网络链接错误'
                    };
                    res.send(data);
                }
            });
        }else{
            base.data(req.body).insert(function(result2){
                if(result2.insertId > 0){
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

//删除办公用品
exports.materialDelete = function(req,res){
    let base = new Base('material');
    let id = req.body.id;
    // console.log(name)
    // return;
    base.where({id:id}).select(function(result){
        if(result.length>0){
            base.where({id:id}).delete(function(result2){
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
                msg:'ID不存在'
            };
            res.send(data);
        }
    });
}

//更改办公用品
exports.materialUpdate = function(req,res){
    let base = new Base('material');
    let id = req.body.id;
    let material = req.body;
    // console.log(req.body);
    // return;
    base.where({id:id}).data(material).update(function(result){
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

//获取需要修改的办公用品
exports.getmaterialById = function(req,res){
    let base = new Base('material');
    let id = req.session.updateId;
    // console.log(id);
    // return;
    base.where({id:id}).select(function(result){
        res.send(result[0]);
    });
}