// 用于文件上传的模块
// 需要用到的模块进行加载
const fs = require('fs')     

exports.upload = function(file, file_arr, fun){
    let arr = file.originalname.split('.')
    let file_type = '.'+ arr[arr.length-1]       // 得到的是原文件的后缀名

    // if(!(file_type in file_arr)){
    //     fun({code:0, msg:"上传文件格式不对"})
    //     return
    // }
    let type_status = false
    for(let val of file_arr){
        if(val == file_type){
            type_status = true
        }
    }
    if(!type_status){
        fun({code:0, msg:"上传文件格式不对"})
        return
    }

    let file_name = new Date().getTime()+ file_type
    let file_path = process.cwd() + '/public/uploads/'+ file_name;
    let file_url = '/uploads/'+ file_name;
    console.log(file_path)
    console.log(file_url)
        // 读取文件
        fs.readFile( file.path, function (err, data) {
            // fs.writeFile() 把内容写入文件中，如果已经存在该文件就把它覆盖
            fs.writeFile(file_path, data, function (err) {
                if( err ){
                    console.log( err );
                }else{
                   fun({code:1, file_url:file_url, msg:"上传成功！"})
                }
            });
        });
}