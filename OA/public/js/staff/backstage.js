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
        emailPage:[],
        PageAll:[],
        page:1,
        search:'',
        sa:'a'
    },
    methods:{
        // 收件箱
        accept(){
            // alert(1);
            $('#pagenum span').eq(this.page-1).removeClass();
            this.page = 1;
            $("#s").removeClass();
            $("#a").attr("class","on");
            this.sa = 'a';
            this.search = '';
            this.getAllAcceptEmail();
            this.noallChecked();
        },
        // 发信箱
        send(){
            // alert(2);
            $('#pagenum span').eq(this.page-1).removeClass();
            this.page = 1;
            $("#s").attr("class","on");
            $("#a").removeClass();
            this.sa = 's';
            this.search = '';
            this.getAllSendEmail();
            this.noallChecked();
        },
        // 全选
        allChecked(){
            // alert("allChecked");
            let that = this;
            for(let i=0;i<that.email.length;i++){
                $('tr:nth-of-type('+(i+1)+') input').prop("checked",true);
            }
        },
        // 反选
        backChecked(){
            // alert("backChecked");
            let that = this;
            for(let i=0;i<that.email.length;i++){
                that.checked(i);
            }
        },
        // 清除选择
        noallChecked(){
            // alert("noallChecked");
            let that = this;
            for(let i=0;i<that.email.length;i++){
                $('tr:nth-of-type('+(i+1)+') input').prop("checked",false);
            }
        },
        // 发邮件
        sendEmail(){
            // alert("sendEmail");
            window.location.href = 'http://' + window.location.host + '/Home/staff/sendEmail';
        },
        // 删除邮件
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
        // 选取邮件
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
        // 查看邮件
        look(i){
            // alert("look");
            // alert(i);
            window.location.href = 'http://' + window.location.host + '/Home/staff/email?id='+this.email[i].id+'&person='+this.email[i].person+'&sa='+this.sa;
        },
        // 获取邮件
        getEmail(arr,num){
            // console.log(arr);
            this.email = [];
            let i = 0;
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
                i++;
                if(i == arr.length){
                    this.getPage();
                }
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
        },
        // 上一页
        prePage(){
            $('#pagenum span').eq(this.page-1).removeClass();
            this.page--;
            this.getPage();
        },
        // 点击页码
        pageChange(i){
            $('#pagenum span').eq(this.page-1).removeClass();
            this.page = i;
            this.getPage();
        },
        // 下一页
        nextPage(){
            $('#pagenum span').eq(this.page-1).removeClass();
            this.page++;
            this.getPage();
        },
        // 获取页面数据
        getPage(){
            this.noallChecked();
            let num = 8;
            let off = this.email.length%num>0?this.email.length/num+1:this.email.length/num;
            let end = this.email.length<num*this.page?this.email.length:num*this.page;
            this.emailPage = [];
            this.PageAll = [];
            for(let i=(this.page-1)*num;i<end;i++){
                this.emailPage.push(this.email[i]);
            }
            for(let j=1;j<=off;j++){
                this.PageAll.push(j);
            }
            if(this.page == 1){
                $('#pre').css('display','none')
            }else{
                $('#pre').css('display','block')
            }
            if(this.page == this.PageAll.length){
                $('#next').css('display','none')
            }else{
                $('#next').css('display','block')
            }
            $('#pagenum span').eq(this.page-1).attr("class","on");
        }
    },
    watch:{
        search:function(newValue,oldValue){
            // console.log(newValue);
            // return;
            this.page = 1;
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