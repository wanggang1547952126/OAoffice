//导入数据库操作组件
let Base = require('../../model/Base');
let upload = require('../../common/upload');
// let fs = require('fs');
// const { response } = require('express');

//首页
exports.index = function(req,res){
    res.render('admin/meeting/backstage',{});
}

//添加会议记录页面
exports.meetingInsert = function(req,res){
    res.render('admin/meeting/Insert',{});
}

//更新会议记录页面
exports.meetingUpdate = function(req,res){
    // console.log(req.query);
    req.session.updateId = req.query.id;
    res.render('admin/meeting/Update',{});
}

//获取所有会议记录
exports.meetingAll = function(req,res){
    let base = new Base('meeting');
    base.select(function(result){
        res.send(result);
    });
}

//获取个别会议记录
exports.meetingSome = function(req,res){
    let base = new Base('meeting');
    let name = '%'+req.body.name+'%';
    // console.log(name)
    // return;
    base.where([{name:name,lim:'like'}]).select(function(result){
        res.send(result);
    });
}

//添加会议记录
exports.meetingAdd = function(req,res){
    // console.log(req.body)
    // console.log(req.files)
    
    let base = new Base('meeting');
    if(req.files.length>0){
        upload.upload(req,[".doc",".docx"],function(result){
            if(result.code == 1){
                let data2 = {
                    name:req.body.name,
                    remarks:req.body.remark,
                    time:new Date(req.body.time).getTime(),
                    url:result.file_url
                }
                // console.log(data);
                base.data(data2).insert(function(result){
                    if(result.insertId > 0){
                        let t = {
                            code:1,
                            msg:'添加成功，三秒后跳转'
                        };
                        // res.send(data);
                        // console.log(t);
                        res.render('admin/meeting/backstage',{});
                    }else{
                        let t = {
                            code:0,
                            msg:'网络链接错误'
                        };
                        // res.send(data);
                        // console.log(t);
                        res.type('txt').send('Not found');
                    }
                });
            }else{
                let t = {
                    code:0,
                    msg:'网络链接错误'
                };
                // res.send(data);
                console.log(t);
            }
        });
    }else{
        let data2 = {
            name:req.body.name,
            remarks:req.body.remark,
            time:new Date(req.body.time).getTime(),
            url:0
        }
        // console.log(data);
        base.data(data2).insert(function(result){
            if(result.insertId > 0){
                let t = {
                    code:1,
                    msg:'添加成功，三秒后跳转'
                };
                // res.send(data);
                // console.log(t);
                res.render('admin/meeting/backstage',{});
            }else{
                let t = {
                    code:0,
                    msg:'网络链接错误'
                };
                // res.send(data);
                // console.log(t);
                res.type('txt').send('Not found');
            }
        });
    }
}

//删除会议记录
exports.meetingDelete = function(req,res){
    let base = new Base('meeting');
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