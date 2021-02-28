//注册组件
const trtd = {
    props:['index','val','fun','fun2'],
    template:`<tr @click="fun(index)">
                <td><input type="checkbox" name="acb"></td>
                <td>{{val.title}}</td>
                <td>{{val.person}}</td>
                <td>{{val.state}}</td>
                <td>{{val.time_str}}</td>
                <td @click="fun2(index)">查看</td>
            </tr>`
}

//实例化Vue
let main = new Vue({
    el:'#main',
    data:{
        email:[],
        search:'',
        sa:'a'
    },
    methods:{
        accept(){
            // alert(1);
            $("#s").removeClass();
            $("#a").attr("class","on");
            this.sa = 'a';
            this.search = '';
            this.getAllAcceptEmail();
            this.noallChecked();
        },
        send(){
            // alert(2);
            $("#s").attr("class","on");
            $("#a").removeClass();
            this.sa = 's';
            this.search = '';
            this.getAllSendEmail();
            this.noallChecked();
        },
        allChecked(){
            // alert("allChecked");
            let that = this;
            for(let i=0;i<that.email.length;i++){
                $('tr:nth-of-type('+(i+1)+') input').prop("checked",true);
            }
        },
        backChecked(){
            // alert("backChecked");
            let that = this;
            for(let i=0;i<that.email.length;i++){
                that.checked(i);
            }
        },
        noallChecked(){
            // alert("noallChecked");
            let that = this;
            for(let i=0;i<that.email.length;i++){
                $('tr:nth-of-type('+(i+1)+') input').prop("checked",false);
            }
        },
        sendEmail(){
            // alert("sendEmail");
            window.location.href = 'http://' + window.location.host + '/Home/staff/sendEmail';
        },
        del(){
            // alert("del");
            let flag = true;
            let es = [];
            for(let i=0;i<this.email.length;i++){
                if($('tr:nth-of-type('+(i+1)+') input').is(":checked")){
                    flag = false;
                    es.push(this.email[i].id);
                }
            }
            if(flag){
                alert("未选择任何邮件");
            }else{
                console.log(es);
                // return;
                let that = this;
                // return;
                axios.post('/home/staff/delEmail',{ids:es,sa:that.sa})
                .then(function(res){
                    // console.log(res.data);
                    // console.log(that.email);
                    if(res.data.code){
                        for(let i=0;i<es.length;i++){
                            for(let j=0;j<that.email.length;j++){
                                if(that.email[j].id == es[i]){
                                    that.email.splice(j,1);
                                    break;
                                }
                            }
                        }
                        // console.log(that.email);
                        that.noallChecked();
                    }else{
                        alert('删除失败');
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
                
            }
        },
        checked(i){
            // alert(i);
            // console.log($('tr:nth-of-type('+(i+1)+') input'));
            let input = $('tr:nth-of-type('+(i+1)+') input');
            if(input.prop("checked")){
                input.prop("checked",false);
            }else{
                input.prop("checked",true);
            }
            
        },
        look(i){
            // alert("look");
            // alert(i);
            window.location.href = 'http://' + window.location.host + '/Home/staff/email?id='+this.email[i].id+'&person='+this.email[i].person+'&sa='+this.sa;
        },
        getEmail(arr,num){
            // console.log(arr);
            this.email = [];
            for(val of arr){
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
                // console.log(this.sa);
                if(num){
                    val.person = val.accept_person;
                }else{
                    val.person = val.send_person;
                }
                if(val.state){
                    val.state = '已读';
                }else{
                    val.state = '未读';
                }
                if(val.title.length > 3){
                    val.title = val.title.substring(0,3)+'...';
                }
                let t = {};
                for(v in val){
                    t[v] = val[v];
                }
                // console.log(val.url);
                // console.log(val.flag)
                this.email.push(t);
            }
        },
        getAllAcceptEmail(){
            let that = this;
            // console.log(data);
            // return;
            axios.post('/home/staff/acceptEmailAll')
            .then(function(res){
                // console.log(res.data);
                that.getEmail(res.data,0);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getAllSendEmail(){
            let that = this;
            // console.log(data);
            // return;
            axios.post('/home/staff/sendEmailAll')
            .then(function(res){
                // console.log(res.data);
                that.getEmail(res.data,1);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getSomeAcceptEmail(name){
            let that = this;
            // console.log(data);
            // return;
            axios.post('/home/staff/acceptEmailSome',{name:name})
            .then(function(res){
                // console.log(res.data);
                that.getEmail(res.data,0);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getSomeSendEmail(name){
            let that = this;
            // console.log(data);
            // return;
            axios.post('/home/staff/sendEmailSome',{name:name})
            .then(function(res){
                // console.log(res.data);
                that.getEmail(res.data,1);
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
                if(this.sa == 'a'){
                    this.getAllAcceptEmail();
                }else{
                    this.getAllSendEmail();
                }
                // console.log(321)
            }else{
                if(this.sa == 'a'){
                    this.getSomeAcceptEmail(newValue);
                }else{
                    this.getSomeSendEmail(newValue);
                }
                // console.log(123)
            }
        }
    },
    created(){
        this.getAllAcceptEmail();
    },
    components:{
        trtd
    }
});