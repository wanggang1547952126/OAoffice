// 尾部
let footer = new Vue({
    el:'#footer',
    methods:{
        email(){
            window.location.href = 'http://' + window.location.host + '/home/staff/index';
        },
        notice(){
            // alert('111')
            window.location.href = 'http://' + window.location.host + '/Home/staff/notice';
        },
        note(){
            window.location.href = 'http://' + window.location.host + '/home/staff/note';
        }
    }
});