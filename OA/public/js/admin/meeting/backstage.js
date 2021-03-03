//注册会议记录组件
const meetingDiv = {
    props:['val'],
    template:`<div>
                <p><span>ID：</span>{{val.id}}</p>
                <p><span>主题：</span>{{val.name}}</p>
                <p><span>备注：</span>{{val.remarks}}</p>
                <p><span>时间：</span>{{val.time_str}}</p>
                <p v-show = "val.flag"><span>附件：</span><a :href="val.url">下载</a></p>
                <p v-show = "!val.flag"><span>附件：</span>无</p>
            </div>`
}

//操作框状态
let states = false;

//实例化Vue对象
//内容
let main = new Vue({
    el:'#main',
    data:{
        meeting:[],
        search:''
    },
    methods:{
        getmeeting(arr){
            this.meeting = [];
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
                // console.log(time_str);
                if(val.url == 0){
                    val.flag = false;
                }else{
                    val.flag = true;
                }
                let t = {};
                for(let v in val){
                    t[v] = val[v];
                }
                // console.log(val.url);
                // console.log(val.flag)
                this.meeting.push(t);
            }
            // this.ife = true;
        },
        getALL(){
            let that = this;
            axios.get('/admin/meeting/meetingAll')
            .then(function(res){
                // console.log(res.data);
                that.getmeeting(res.data);
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
            axios.post('/admin/meeting/meetingSome',data)
            .then(function(res){
                // console.log(res.data);
                that.getmeeting(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        insert(){
            // alert('insert')
            window.location.href = 'http://' + window.location.host + '/admin/meeting/meetingInsert';
        },
        deletes(){
            // // alert('deletes')
            let that = this;
            let id = prompt('请输入想要删除的会议记录的ID：');
            if(id == null){
                return;
            }
            // console.log(iden);
            axios.post('/admin/meeting/meetingDelete',{id:id})
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
        meetingDiv
    }
});


//尾部
let footer = new Vue({
    el:'#footer',
    methods:{
        officeSupplies(){
            window.location.href = 'http://' + window.location.host + '/admin/material';
        },
        persons(){
            window.location.href = 'http://' + window.location.host + '/admin/backstage';
        }
    }
});