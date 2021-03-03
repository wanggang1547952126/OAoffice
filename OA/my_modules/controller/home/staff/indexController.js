
//导入数据库操作组件
let Base = require('../../../model/Base');

//导入文件操作组件
let upload = require('../../../common/upload');

//首页
exports.index = function(req,res){
    res.render('home/staff/index',{});
}

//发邮件
exports.sendEmail = function(req,res){
    res.render('home/staff/sendEmail',{});
}

//邮件详情
exports.email = function(req,res){
    // console.log(req.query);
    req.session.emailId = req.query.id;
    req.session.emailPerson = req.query.person;
    req.session.sa = req.query.sa;
    res.render('home/staff/email',{});
}

//获取所有收到邮件
exports.acceptEmailAll = function(req,res){
    let base = new Base('email');
    base.order({id:'desc'}).where({accept_person_id:req.session.user.person_id,accept_del:1}).select(function(result){
        let base2 = new Base('person');
                // console.log(result)
        let i = 0;
        for(let val of result){
            base2.where({id:val.send_person_id}).select(function(result2){
                val.send_person = result2[0].name;
                // console.log(i);
                // console.log(result.length)
                // console.log(result2)
                // console.log(val)
                // base2.where({id:val.accept_person_id}).select(function(result3){
                    // val.accept_person = result2[0].name;
                    i++;
                    if(i == result.length){
                        // console.log(123)
                        res.send(result);
                    }
                // });
            });
        }
    });
}

//获取个别收到邮件
exports.acceptEmailSome = function(req,res){
    let base = new Base('person');
    let name = '%'+req.body.name+'%';
    let ls = [];
    
    // console.log(name)
    // return;
    base.order({id:'desc'}).where([{name:name,lim:'like'}]).select(function(result){
        let base2 = new Base('email');
                // console.log(result)
        let i = 0;
        for(let val of result){
            base2.where({send_person_id:val.id,accept_person_id:req.session.user.person_id,accept_del:1}).select(function(result2){
                for(let v of result2){
                    v.send_person = val.name;
                }
                ls.push(result2);
                i++;
                // console.log(i);
                // console.log(result.length)
                console.log(result2)
                // console.log(val)
                if(i == result.length){
                    // console.log(123)
                    let l = [];
                    for(let a of ls){
                        for(let b of a){
                            l.push(b);
                        }
                    }
                    res.send(l);
                }
            });
        }
    });
}

//获取所有发送邮件
exports.sendEmailAll = function(req,res){
    let base = new Base('email');
    base.order({id:'desc'}).where({send_person_id:req.session.user.person_id,send_del:1}).select(function(result){
        let base2 = new Base('person');
                // console.log(result)
        let i = 0;
        for(let val of result){
            base2.where({id:val.accept_person_id}).select(function(result2){
                val.accept_person = result2[0].name;
                // console.log(i);
                // console.log(result.length)
                // console.log(result2)
                // console.log(val)
                // base2.where({id:val.accept_person_id}).select(function(result3){
                    // val.accept_person = result2[0].name;
                    i++;
                    if(i == result.length){
                        // console.log(123)
                        res.send(result);
                    }
                // });
            });
        }
    });
}

//获取个别发送邮件
exports.sendEmailSome = function(req,res){
    let base = new Base('person');
    let name = '%'+req.body.name+'%';
    let ls = [];
    
    // console.log(name)
    // return;
    base.order({id:'desc'}).where([{name:name,lim:'like'}]).select(function(result){
        let base2 = new Base('email');
                // console.log(result)
        let i = 0;
        for(let val of result){
            base2.where({send_person_id:req.session.user.person_id,accept_person_id:val.id,send_del:1}).select(function(result2){
                for(let v of result2){
                    v.accept_person = val.name;
                }
                ls.push(result2);
                i++;
                // console.log(i);
                // console.log(result.length)
                console.log(result2)
                // console.log(val)
                if(i == result.length){
                    // console.log(123)
                    let l = [];
                    for(let a of ls){
                        for(let b of a){
                            l.push(b);
                        }
                    }
                    res.send(l);
                }
            });
        }
    });
}

//删除邮件
exports.delEmail = function(req,res){
    let ids = req.body.ids;
    let sa = req.body.sa;
    let base = new Base('email');
    let data;
    // console.log(ids,sa);
    // return;
    let i = 0;
    for(let id of ids){
        if(sa == 'a'){
            base.where({id:id}).data({accept_del:0}).update(function(result){
                if(result.affectedRows > 0){
                    data = {code: 1, msg: "删除成功"}
                    // res.send(data);
                }else{
                    data = {
                        code:0,
                        msg:'网络链接错误'
                    };
                    // res.send(data);
                }
                i++;
                if(i == ids.length){
                    res.send(data);
                }
            });
        }else{
            base.where({id:id}).data({send_del:0}).update(function(result){
                if(result.affectedRows > 0){
                    data = {code: 1, msg: "删除成功"}
                    // res.send(data);
                }else{
                    data = {
                        code:0,
                        msg:'网络链接错误'
                    };
                    // res.send(data);
                }
                i++;
                if(i == ids.length){
                    res.send(data);
                }
            });
        }
    }
}

//邮件详情
exports.lookEmail = function(req,res){
    let id = req.session.emailId;
    let person = req.session.emailPerson;
    let sa = req.session.sa;
    let base = new Base('email');
    // console.log(sa);
    // return;
    if(sa == 'a'){
        base.where({id:id}).data({state:1}).update(function(r){
            if(r.affectedRows > 0){
                base.where({id:id}).select(function(result){
                    let ls = result[0];
                    let time = new Date(ls.time);
                    let y = time.getFullYear();
                    let m = time.getMonth()+1;
                    if(m<10){
                        m = '0' + m;
                    }
                    let d = time.getDate();
                    if(d<10){
                        d = '0' + d;
                    }
                    let time_str = y+'-'+m+'-'+d;
                    ls.time_str = time_str;
                    ls.person = person;
                    ls.content=ls.content.replace(/\n/g,"<br>");
                    // console.log(ls);
                    res.send(ls);
                });
            }else{
                // let data = {
                //     code:0,
                //     msg:'网络链接错误'
                // };
                // res.send(data);
                res.type('txt').send('Not found');
            }
        });
    }else{
        base.where({id:id}).select(function(result){
            let ls = result[0];
            let time = new Date(ls.time);
            let y = time.getFullYear();
            let m = time.getMonth()+1;
            if(m<10){
                m = '0' + m;
            }
            let d = time.getDate();
            if(d<10){
                d = '0' + d;
            }
            let time_str = y+'-'+m+'-'+d;
            ls.time_str = time_str;
            ls.person = person;
            ls.content=ls.content.replace(/\n/g,"<br>");
            // console.log(ls);
            res.send(ls);
        });
    }
    
}

//添加邮件
exports.addEmail = function(req,res){
    // console.log(req.body)
    // console.log(req.files)
    let title = req.body.title;
    let person = req.body.person;
    let content = req.body.content;


    if(title == ''||
        person == 0||
        content == ''){
            res.type('txt').send('标题、发送的人、内容不能为空');
        }
    // return;
    let base = new Base('email');
    if(req.files.length>0){
        let file = req.files[0];
        let name = file.originalname;
        upload.upload(req,[".doc",".docx",".zip"],function(result){
            if(result.code == 1){
                let data2 = {
                    send_person_id:req.session.user.person_id,
                    accept_person_id:person,
                    title:title,
                    content:content,
                    url:result.file_url,
                    name:name,
                    state:0,
                    time:new Date().getTime(),
                    accept_del:1,
                    send_del:1
                }
                // console.log(data);
                base.data(data2).insert(function(result){
                    if(result.insertId > 0){
                        // let t = {
                        //     code:1,
                        //     msg:'添加成功，三秒后跳转'
                        // };
                        // res.send(data);
                        // console.log(t);
                        res.render('home/staff/index',{});
                    }else{
                        // let t = {
                        //     code:0,
                        //     msg:'网络链接错误'
                        // };
                        // res.send(data);
                        // console.log(t);
                        res.type('txt').send('文件格式错误');
                    }
                });
            }else{
                // let t = {
                //     code:0,
                //     msg:'网络链接错误'
                // };
                // res.send(data);
                // console.log(t);
                res.type('txt').send('Not found');
            }
        });
    }else{
        let data2 = {
            send_person_id:req.session.user.person_id,
                    accept_person_id:person,
                    title:title,
                    content:content,
                    url:0,
                    name:0,
                    state:0,
                    time:new Date().getTime(),
                    accept_del:1,
                    send_del:1
        }
        // console.log(data);
        base.data(data2).insert(function(result){
            if(result.insertId > 0){
                // let t = {
                //     code:1,
                //     msg:'添加成功，三秒后跳转'
                // };
                // res.send(data);
                // console.log(t);
                res.render('home/staff/index',{});
            }else{
                // let t = {
                //     code:0,
                //     msg:'网络链接错误'
                // };
                // res.send(data);
                // console.log(t);
                res.type('txt').send('Not found');
            }
        });
    }
}