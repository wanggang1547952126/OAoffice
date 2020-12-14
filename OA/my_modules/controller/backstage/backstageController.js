//导入数据库操作组件
let Base = require('../../model/Base');

//首页
exports.index = function(req,res){
    res.render('admin/backstage',{});
}
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