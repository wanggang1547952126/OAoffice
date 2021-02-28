// $('#hidden_frame').load(function(){
//     var text=$(this).contents().find("body").text();
//     console.log(text);
//     return;
//        // 根据后台返回值处理结果
//     var j=$.parseJSON(text);
//     if(j.status!=0) {
//         alert(j.msg);
//     } else {
//         alert('导入成功');
//         //location.href='BookResourceList.jsp'
//     }
// });

//实例化Vue
let all = new Vue({
    el:'#all',
    data:{
        
    },
    methods:{
        back(){
            window.location.href = 'http://' + window.location.host + '/admin/meeting';
        }
    }
});