//注册人员档案组件
const persondiv = {
    props:['val'],
    template:`<div>
                <p><span>姓名：</span>{{val.name}}</p>
                <p><span>身份证：</span>{{val.identity}}</p>
                <p><span>部门：</span>{{val.department}}</p>
                <p><span>状态：</span>{{val.state}}</p>
                <p><span>职位：</span>{{val.position}}</p>
                <p><span>薪资：</span>{{val.salary}}</p>
            </div>`
}



//实例化Vue对象
let main = new Vue({
    el:'#main',
    data:{
        persons:[],
        search:''
    },
    methods:{
        getPerson(arr){
            this.persons = [];
            for(val of arr){
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
                for(v in val){
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