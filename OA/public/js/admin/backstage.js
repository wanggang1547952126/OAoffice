//注册人员档案组件
const persondiv = {
    props:['val','fun'],
    template:`<div @click='fun(val)'>
                <p><span>姓名：</span>{{val.name}}</p>
                <p><span>手机号：</span>{{val.telphone}}</p>
                <p><span>身份证：</span>{{val.identity}}</p>
                <p><span>部门：</span>{{val.department}}</p>
                <p><span>状态：</span>{{val.state}}</p>
                <p><span>职位：</span>{{val.position}}</p>
                <p><span>薪资：</span>{{val.salary}}</p>
            </div>`
}


//操作框状态
let states = false;

//实例化Vue对象
//内容
let main = new Vue({
    el:'#main',
    data:{
        persons:[],
        search:''
    },
    methods:{
        getPerson(arr){
            this.persons = [];
            for(let val of arr){
                let t = {};
                if(val.state == 0){
                    val.state = '离职';
                }
                if(val.state == 1){
                    val.state = '在职';
                }
                if(val.state == 2){
                    val.state = '出差';
                }
                if(val.state == 3){
                    val.state = '请假';
                }
                if(val.jurisdiction_id == 0){
                    val.position = '员工';
                }
                if(val.jurisdiction_id == 1){
                    val.position = '经理';
                }
                if(val.jurisdiction_id == 2){
                    val.position = '管理员';
                }
                for(let v in val){
                    t[v] = val[v];
                }
                this.persons.push(t);
            }
            // this.ife = true;
        },
        getALL(){
            let that = this;
            axios.get('/admin/backstage/personsAll')
            .then(function(res){
                that.getPerson(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getSome(val){
            let that = this;
            let data = {name:val};
            console.log(data);
            // return;
            axios.post('/admin/backstage/personsSome',data)
            .then(function(res){
                // console.log(res.data);
                that.getPerson(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        update(person){
            // alert(person.id);
            window.location.href = 'http://' + window.location.host + '/admin/backstage/personUpdate?id='+person.id;
        },
        insert(){
            // alert('insert')
            window.location.href = 'http://' + window.location.host + '/admin/backstage/personInsert';
        },
        deletes(){
            // alert('deletes')
            let that = this;
            let iden = prompt('请输入想要删除的人员档案的身份证号：');
            if(iden == null){
                return;
            }
            // console.log(iden);
            axios.post('/admin/backstage/personDelete',{identity:iden})
            .then(function(res){
                alert(res.data.msg);
                that.getALL();
            })
            .catch(function(err){
                console.log(err);
            });
        },
        operation(){
            if(states){
                $('#header img').css({animation:'r0 0.3s linear forwards'});
                $('#header .operation').css({animation:'in 0.3s linear forwards'});
                states = false;
            }else{
                $('#header img').css({animation:'r45 0.3s linear forwards'});
                $('#header .operation').css({animation:'out 0.3s linear forwards'});
                states = true;
            }
            // alert(123)
        }
    },
    watch:{
        search:function(newValue,oldValue){
            // console.log(newValue);
            // return;
            if(newValue == ''){
                this.getALL();
                // console.log(321)
            }else{
                this.getSome(newValue);
                // console.log(123)
            }
        }
    },
    created:function(){
        this.getALL();
    },
    components:{
        persondiv
    }
});

//尾部
let footer = new Vue({
    el:'#footer',
    methods:{
        officeSupplies(){
            window.location.href = 'http://' + window.location.host + '/admin/material';
        },
        meeting(){
            window.location.href = 'http://' + window.location.host + '/admin/meeting';
        }
    }
});