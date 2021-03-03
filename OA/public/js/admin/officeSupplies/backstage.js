//注册办公用品组件
const officeSuppliesDiv = {
    props:['val','fun'],
    template:`<div @click='fun(val)'>
                <p><span>ID：</span>{{val.id}}</p>
                <p><span>名称：</span>{{val.name}}</p>
                <p><span>单价：</span>{{val.money}}</p>
                <p><span>所属部门：</span>{{val.department}}</p>
                <p><span>购入时间：</span>{{val.time_str}}</p>
                <p><span>数量：</span>{{val.num}}</p>
                <p><span>小计：</span>{{val.sum}}</p>
            </div>`
}


//操作框状态
let states = false;

//实例化Vue对象
//内容
let main = new Vue({
    el:'#main',
    data:{
        officeSupplies:[],
        search:''
    },
    methods:{
        getOfficeSupplies(arr){
            this.officeSupplies = [];
            for(let val of arr){
                let time = new Date(val.time);
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
                val.time_str = time_str;
                val.sum = val.money*val.num;
                // console.log(time_str);
                let t = {};
                for(let v in val){
                    t[v] = val[v];
                }
                this.officeSupplies.push(t);
            }
            // this.ife = true;
        },
        getALL(){
            let that = this;
            axios.get('/admin/material/materialAll')
            .then(function(res){
                // console.log(res.data);
                that.getOfficeSupplies(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getSome(val){
            let that = this;
            let data = {name:val};
            // console.log(data);
            // return;
            axios.post('/admin/material/materialSome',data)
            .then(function(res){
                // console.log(res.data);
                that.getOfficeSupplies(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        update(officeSupplies){
            // alert(officeSupplies.id);
            window.location.href = 'http://' + window.location.host + '/admin/material/officeSuppliesUpdate?id='+officeSupplies.id;
        },
        insert(){
            // alert('insert')
            window.location.href = 'http://' + window.location.host + '/admin/material/officeSuppliesInsert';
        },
        deletes(){
            // alert('deletes')
            let that = this;
            let id = prompt('请输入想要删除的办公用品的ID：');
            if(id == null){
                return;
            }
            // console.log(iden);
            axios.post('/admin/material/officeSuppliesDelete',{id:id})
            .then(function(res){
                // alert(res.data.msg);
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
        officeSuppliesDiv
    }
});


//尾部
let footer = new Vue({
    el:'#footer',
    methods:{
        persons(){
            window.location.href = 'http://' + window.location.host + '/admin/backstage';
        },
        meeting(){
            window.location.href = 'http://' + window.location.host + '/admin/meeting';
        }
    }
});