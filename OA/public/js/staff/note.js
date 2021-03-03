//主体
let main = new Vue({
    el:'#main',
    data:{
        search:'',
        notes:[],
        personid:0,
        text:'',
        index:0
    },
    methods:{
        add(){
            // alert('add');
            $('.note').css('display','none');
            $('#add').css('display','none');
            $('#search').css('display','none');
            $('#text').css('display','block');
            $('#save').css('display','block');
            $('#back').css('display','block');
        },
        save(){
            let that = this;
            this.getnotes(function(){
                let content = that.text.replace(/\n/g,"<br>");
                let l = {
                    personid:that.personid,
                    content:content
                }
                that.notes.push(l);
                for(let i=0;i<that.notes.length;i++){
                    that.notes[i].id = i+1;
                }
                // console.log(that.notes);
                let note = JSON.stringify(that.notes);
                // console.log(note);
                let los = window.localStorage;
                los.setItem(that.personid,note);
                alert('保存成功');
                that.back();
            });
            
        },
        back(){
            $('.note').css('display','block');
            $('#add').css('display','block');
            $('#search').css('display','flex');
            $('#text').css('display','none');
            $('#save').css('display','none');
            $('#back').css('display','none');
            $('#update').css('display','none');
            this.text = '';
        },
        ud(index){
            $('.note').css('display','none');
            $('#add').css('display','none');
            $('#search').css('display','none');
            $('#text').css('display','block');
            $('#update').css('display','block');
            $('#back').css('display','block');


            this.text = this.notes[index].content.replace(/<br>/g,"\n");
            this.index = index;
        },
        update(){
            let that = this;
            let l = this.notes[that.index];
            this.getnotes(function(){
                let content = that.text.replace(/\n/g,"<br>");
                for(let i=0;i<that.notes.length;i++){
                    if(that.notes[i].id = l.id){
                        that.notes[i].content = content;
                        break;
                    }
                }
                let note = JSON.stringify(that.notes);
                let los = window.localStorage;
                los.setItem(that.personid,note);
                alert('更改成功');
                that.back();
            });
            
        },
        del(index){
            let that = this;
            let l = this.notes[index];
            this.getnotes(function(){
                for(let i=0;i<that.notes.length;i++){
                    if(that.notes[i].id = l.id){
                        that.notes.splice(i,1);
                        break;
                    }
                }
                let note = JSON.stringify(that.notes);
                let los = window.localStorage;
                los.setItem(that.personid,note);
            });
        },
        getnotes(fun = function(){}){
            this.notes = [];
            let that = this;
            let los = window.localStorage;
            axios.post('/session/user')
            .then(function(res){
                that.personid = res.data.person_id;
                let note = JSON.parse(los.getItem(that.personid));
                for(let val of note){
                    that.notes.push(val);
                }
                // console.log(that.notes);
                fun();
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
                this.getnotes();
            }else{
                let l = [];
                for(let val of this.notes){
                    if(val.content.indexOf(newValue) != -1){
                        l.push(val);
                    }
                }
                this.notes = [];
                for(let v of l){
                    this.notes.push(v);
                }
            }
        }
    },
    created(){
        this.getnotes();
    }
});

// 尾部
let footer = new Vue({
    el:'#footer',
    methods:{
        email(){
            window.location.href = 'http://' + window.location.host + '/home/staff/index';
        },
        notice(){
            // alert('111')
            window.location.href = 'http://' + window.location.host + '/Home/staff/notice';
        },
        me(){
            // alert('111')
            window.location.href = 'http://' + window.location.host + '/Home/staff/me';
        }
    }
});