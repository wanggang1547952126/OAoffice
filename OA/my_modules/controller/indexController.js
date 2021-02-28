//导入数据库操作组件
let Base = require('../model/Base');

//首页
exports.index = function(req,res){
    res.render('index',{});
}

//登录验证
exports.login = function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    let data = {};
    // console.log(username,password);
    let base = new Base('user');
    base.where({username:username,password:password}).select(function(result){//判断用户名密码是否正确
        // console.log(result);
        if(result.length>0){
            req.session.user = {
                id : result[0].id,
                username : result[0].username,
                password : result[0].password,
                person_id : result[0].person_id
            };
            let base2 = new Base('person');
            base2.where({id:result[0].person_id}).select(function(result2){//根据权限判断跳到哪个页面
                // console.log(result2);
                if(result2[0].jurisdiction_id == 2){
                    data = {
                        code:1,
                        url:'/admin/backstage',//跳转到后台
                        msg:'登录成功，三秒后跳转'
                    }
                    res.send(data);
                }else if(result2[0].jurisdiction_id == 1){
                    data = {
                        code:1,
                        url:'/home/manager/index',//跳转到经理页面
                        msg:'登录成功，三秒后跳转'
                    }
                    res.send(data);
                }else{
                    data = {
                        code:1,
                        url:'/home/staff/index',//跳转到员工页面
                        msg:'登录成功，三秒后跳转'
                    }
                    res.send(data);
                }
            });
            // return;
        }else{
            data = {
                code:0,
                url:'',
                msg:'用户名或密码错误'
            }
            res.send(data);
        }
    });
}

//注册验证
exports.register = function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    let identity = req.body.identity;
    let data = {};
    // console.log(username,password,identity);
    // return;
    let base = new Base('user');
    base.where({username:username}).select(function(result){//判断用户名是否已存在
        // console.log(result);
        if(result.length>0){
            data = {
                code:0,
                url:'',
                msg:'用户名已存在'
            }
            res.send(data);
        }else{
            let base2 = new Base('person');
            base2.where({identity:identity}).select(function(result2){//判断员工档案是否存在
                if(result2.length>0){
                    base.data({username:username,password:password,person_id:result2[0].id}).insert(function(result3){//数据加入数据库
                        // console.log(result3);
                        if(result3.insertId>0){
                            data = {
                                code:1,
                                url:'/index',
                                msg:'注册成功，三秒后跳转'
                            }
                            res.send(data);
                        }else{
                            data = {
                                code:0,
                                url:'',
                                msg:'注册失败'
                            }
                            res.send(data);
                        }
                    })
                }else{
                    data = {
                        code:0,
                        url:'',
                        msg:'你的档案不存在，请联系经理添加'
                    }
                    res.send(data);
                }
            })
        }
    });
}