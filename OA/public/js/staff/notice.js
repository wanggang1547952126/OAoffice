
//注册公告组件
const notice = {
    props:['val'],
    template:`<div>
                <h1>{{val.title}}</h1>
                <p>时间：{{val.time_str}}</p>
                <p>发送的人：{{val.person}}</p>
                <p>内容：<br><span v-html='val.content'></span></p>
            </div>`
}

//实例化vue
let main = new Vue({
    el:'#main',
    data:{
        notice:[],
        search:''
    },
    methods:{
        getAllNotice(){
            let that = this;
            axios.post('/Home/staff/notice')
            .then(function(res){
                // console.log(res.data);
                that.getnotice(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getnotice(arr){
            this.notice = [];
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
                val.content = val.content.replace(/\n/g,"<br>");
                // console.log(time_str);
                let t = {};
                for(v in val){
                    t[v] = val[v];
                }
                this.notice.push(t);
            }
            // this.ife = true;
        }
    },
    watch:{
        search:function(newValue,oldValue){
            // console.log(newValue);
            // return;
            this.page = 1;
            if(newValue == ''){
                this.getAllNotice();
            }else{
                let l = [];
                for(let val of this.notice){
                    if(val.person.indexOf(newValue) != -1){
                        l.push(val);
                    }
                }
                this.notice = [];
                for(let v of l){
                    this.notice.push(v);
                }
            }
        }
    },
    created(){
        this.getAllNotice();
    },
    components:{
        notice
    }
});

// 尾部
let footer = new Vue({
    el:'#footer',
    methods:{
        email(){
            window.location.href = 'http://' + window.location.host + '/home/staff/index';
        },
        note(){
            window.location.href = 'http://' + window.location.host + '/home/staff/note';
        },
        me(){
            // alert('111')
            window.location.href = 'http://' + window.location.host + '/Home/staff/me';
        }
    }
});