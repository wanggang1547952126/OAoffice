let register = new Vue({
    el:'#register',
    data:{
        username:'',
        password:'',
        identity:'',
        msg:''
    },
    methods:{
        register(){
            // console.log(this.username,this.password);
            let that = this;
            if(this.username == ''||this.password == ''||this.identity == ''){//判断用户名、密码或身份证号是否为空
                this.msg='用户名，密码或身份证号不能为空';
                return;
            }
            let post = {
                username:this.username,
                password:this.password,
                identity:this.identity
            };
            axios.post('/register',post)
            .then(function(response){
                // console.log(response.data);
                that.msg = response.data.msg;
                if(response.data.code){
                    setTimeout(function(){
                        window.location.href = 'http://' + window.location.host + response.data.url;
                    },3000);
                }
            })
            .catch(function(err){
                console.log(err);
            });
        },
        login(){
            $('#login').css({display:'flex',zIndex:'0'});
            $('#register').css({zIndex:'1'});
            $('#register').animate({opacity:'0'},1000,function(){
                $('#register').css({display:'none',opacity:'1'});
            })
        }
    }
});