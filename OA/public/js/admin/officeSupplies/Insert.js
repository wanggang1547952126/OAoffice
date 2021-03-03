

//实例化Vue
let all = new Vue({
    el:'#all',
    data:{
        officeSupply:{
            name:'',
            money:'',
            time:'',
            num:'',
            department_id:1
        },
        department:[]
    },
    methods:{
        insert(){
            if(this.officeSupply.name == ''||
            this.officeSupply.money == ''||
            this.officeSupply.time == ''||
            this.officeSupply.num == ''){
                $('#msg').text('不能为空');
                return;
            }
            // console.log(this.officeSupply);
            let t = {};
            for(let val in this.officeSupply){
                t[val] = this.officeSupply[val];
            }
            t.time = new Date(t.time).getTime();
            // console.log(this.officeSupply);
            // return;
            axios.post('/admin/material/officeSuppliesInsert',t)
            .then(function(res){
                $('#msg').text(res.data.msg);
                if(res.data.code){
                    setTimeout(function(){
                        window.location.href = 'http://' + window.location.host + '/admin/material';
                    },3000);
                }
            })
            .catch(function(err){
                console.log(err);
            });
        },
        back(){
            window.location.href = 'http://' + window.location.host + '/admin/material';
        }
    },
    created(){
        let that = this;
        axios.get('/admin/backstage/getAllDepartment')
        .then(function(res){
            for(let val of res.data){
                let t ={};
                for(let v in val){
                    t[v] = val[v];
                }
                that.department.push(t);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }
});