//身份证手机号验证正则
const identityReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
const telphoneReg = /^1(3|4|5|7|8)+/;


//实例化Vue
let all = new Vue({
    el:'#all',
    data:{
        person:{
            name:'',
            identity:'',
            telphone:'',
            salary:'',
            department_id:1,
            state:1,
            jurisdiction_id:0
        },
        department:[]
    },
    methods:{
        update(){
            if(this.person.name == ''||
            this.person.identity == ''||
            this.person.telphone == ''||
            this.person.salary == ''){
                $('#msg').text('不能为空');
                return;
            }
            if(!identityReg.test(this.person.identity)){
                $('#msg').text('身份证号错误');
                return;
            }
            if(!telphoneReg.test(this.person.telphone)){
                $('#msg').text('电话号错误');
                return;
            }
            axios.post('/admin/backstage/personUpdate',this.person)
            .then(function(res){
                $('#msg').text(res.data.msg);
                if(res.data.code){
                    setTimeout(function(){
                        window.location.href = 'http://' + window.location.host + '/admin/backstage';
                    },3000);
                }
            })
            .catch(function(err){
                console.log(err);
            });
        },
        back(){
            window.location.href = 'http://' + window.location.host + '/admin/backstage';
        }
    },
    created(){
        let that = this;
        axios.get('/admin/backstage/getAllDepartment')
        .then(function(res){
            for(val of res.data){
                let t ={};
                for(v in val){
                    t[v] = val[v];
                }
                that.department.push(t);
            }
            axios.post('/admin/backstage/getPersonById')
            .then(function(res){
                for(val in res.data){
                    that.person[val] = res.data[val];
                }
                console.log(that.person);
            })
            .catch(function(err){
                console.log(err);
            });
        })
        .catch(function(err){
            console.log(err);
        });
    }
});