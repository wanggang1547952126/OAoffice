

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
        update(){
            if(this.officeSupply.name == ''||
            this.officeSupply.money == ''||
            this.officeSupply.time == ''||
            this.officeSupply.num == ''){
                $('#msg').text('不能为空');
                return;
            }
            let t = {};
            for(let val in this.officeSupply){
                t[val] = this.officeSupply[val];
            }
            t.time = new Date(t.time).getTime();
            axios.post('/admin/material/officeSupplyUpdate',t)
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
            axios.post('/admin/material/getOfficeSupplyById')
            .then(function(res){
                for(let val in res.data){
                    if(val == 'time'){
                        let time = new Date(res.data[val]);
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
                        that.officeSupply[val] = time_str;
                    }else{
                        that.officeSupply[val] = res.data[val];
                    }
                }
                // console.log(that.person);
            })
            .catch(function(err){
                console.log(err);
            });
        })
        .catch(function(err){
            console.log(err);
        });
    }
});