//注册组件
const emaildiv = {
    props:['email','flag'],
    template:`<div>
                <h1>{{email.title}}</h1>
                <p>时间：{{email.time_str}}</p>
                <p>发送的人：{{email.person}}</p>
                <p v-if = "flag"><span>附件：</span><a :href="email.url">{{email.name}}</a></p>
                <p v-if = "!flag"><span>附件：</span>无</p>
                <p>内容：<br><span v-html='email.content'></span></p>
            </div>`
}

//实例化Vue
let main = new Vue({
    el:'#main',
    data:{
        email:{},
        flag:true
    },
    methods:{
        getEmail(){
            let that = this;
            axios.post('/home/staff/lookEmail')
            .then(function(res){
                if(res.data.url == 0){
                    that.flag = false;
                }
                for(let val in res.data){
                    Vue.set(that.email,val,res.data[val]);
                }
                // console.log(that.email);
                // that.$forceUpdate();
            })
            .catch(function(err){
                console.log(err);
            });
        },
        back(){
            window.location.href = 'http://' + window.location.host + '/home/staff/index';
        }
    },
    created(){
        this.getEmail();
    },
    components:{
        emaildiv
    }
});