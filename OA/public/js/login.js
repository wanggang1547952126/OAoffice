
let login = new Vue({
    el:'#login',
    data:{
        username:'',
        password:'',
        msg:''
    },
    methods:{
        login(){
            // console.log(this.username,this.password);
            let that = this;
            let post = {
                username:this.username,
                password:this.password
            };
            axios.post('/login',post)
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
        register(){
            $('#register').css({display:'flex',zIndex:'0'});
            $('#login').css({zIndex:'1'});
            $('#login').animate({opacity:'0'},1000,function(){
                $('#login').css({display:'none',opacity:'1'});
            })
        }
    }
});