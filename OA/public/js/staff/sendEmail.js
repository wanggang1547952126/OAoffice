
//实例化Vue
let main = new Vue({
    el:'#main',
    data:{
        persons:[],
        personid:0,
        personname:'',
        search:'',
        flag:true,
        flag2:false
    },
    methods:{
        back(){
            window.location.href = 'http://' + window.location.host + '/home/staff/index';
        },
        getperson(){
            this.search = '';
            $('form').css('display','none');
            let that = this;
            axios.get('/admin/backstage/personsAll')
            .then(function(res){
                // console.log(res.data);
                axios.post('/session/user')
                .then(function(res2){
                    // console.log(res2.data);
                    that.persons = [];
                    for(val of res.data){
                        if(val.id != res2.data.person_id&&val.id != 8){
                            that.persons.push(val);
                        }
                    }
                    $('div').css('display','block');
                })
                .catch(function(err){
                    console.log(err);
                });
            })
            .catch(function(err){
                console.log(err);
            });
        },
        select(index){
            // console.log(index)
            this.personid = this.persons[index].id;
            this.personname = this.persons[index].name;
            // console.log(this.personid);
            // console.log(this.personname);
            $('div').css('display','none');
            $('form').css('display','block');
            this.flag2 = true;
        }
    },
    watch:{
        search:function(newValue,oldValue){
            // console.log(newValue);
            // return;
            if(newValue == ''){
                this.getperson();
                // console.log(321)
            }else{
                let person = [];
                for(let val of this.persons){
                    if(val.name.indexOf(newValue) != -1){
                        // console.log(val.name);
                        // let t = {};
                        // for(let v in val){
                        //     t[v] = val[v]
                        // }
                        person.push(val);
                    }
                }
                this.persons = [];
                // console.log(person);
                for(vl of person){
                    this.persons.push(vl);
                }
                // console.log(123)
            }
        }
    }
});