// Base用于层操作数据库的对象
// 加载模块
const mysql = require('mysql');

// 当前模块返回的是一个构造函数
module.exports = Base;

// 让本模块继承mysql这个模块
Base.prototype.__proto__ = mysql;
// console.log(Base.prototype.constructor);


// 创建一个大的数据库类。使用面向对象的方法来实现
function Base(table){
    // 设置需要的属性
    this.table = table;                     // 当前对象需要操作的表名
    this.where_str = '';                    // 用于拼接当前操作的where条件字符串
    this.field_str = '*';                   // 用于拼接当前操作显示字段的字符串
    this.order_str = '';                    // 用于拼接当前操作排序的字符串
    this.limit_str = '';                    // 用于拼接当前操作限制行输出的字符串
    this.insert_str = '';                   // 用于插入数据数操作时需要插入的数据
    this.update_str = '';                   // 用于修改数据数操作时需要修改的数据
    let that = this;

    function handleDisconnection(){
        // 创建NODE连接数据库方法
        that.connection = that.createConnection({
            host: "localhost", 			// 服务器地址
            user: "root", 				// 登录名
            password: "123456", 		// 登录密码
            port: "3306", 				// 服务器端口
            database: "oa" 			// 连接的数据库名
        });

        // 进行连接
        that.connection.connect((err)=>{
            if(err){
                handleDisconnection();
                console.log(err);
                return ;
            }
            console.log('	数据库连接成功!');
        });

        that.connection.once('error', function(err) {
            // logger.error('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                // logger.error('db error执行重连:'+err.message);
                console.log('重连');
                handleDisconnection();
            } else {
                console.log(err);
            }
        });
    }
    handleDisconnection();
}

/**
 * where Object|Array|String   设置需要搜索条件,这是一个中间方法
 * where有三种写法。
 * 1、是最简单的 = 的且多个条件使用and来连接。
 *      例子： {username:'alex', password:'123'}=>where `username`='alex' and `password`='123'
 * 2、数组与对象的组合
 *      例子：[{age:'18', lim:'<'}, {status:0, lim:'>'}] => where `age`<'18' and `status`>'0'
 * 3、直接写入搜索条件。对于更加复杂的条件可以直接写入完整的搜索条件
 */
Base.prototype.where = function(where){
    if(typeof where == 'object'){
        let where_arr = [];
        if(Array.isArray(where)){
            // [{age:'18', lim:'<'}, {status:0, lim:'>'}]
            where.forEach((val)=>{
                let i=0
                for( key in val){
                    if(i==0){
                        where_arr.push("`"+key+"` "+val.lim+" '"+val[key]+"'");
                    }
                    i++;
                }
            });
        }else{
            for(key in where){
                where_arr.push("`"+key+"`='"+where[key]+"'");
            }
        }
        this.where_str = 'where '+ where_arr.join(' and ');
    }

    if(typeof where == 'string'){
        this.where_str = 'where '+ where;
    }

    return this;        // 为了实现方法的连写，可以直接把当前对象返回
}

/**
 * 设置搜索的字段方法
 * field Array|String   可以使用数组或才直接写入字符来设置需要搜索的字段
 * 数组的例子：['username', 'email'] = > `username`, `email`
 */
Base.prototype.field = function(field){
    if(Array.isArray(field)){
        for(let i=0; i<field.length; i++){
            field[i] = '`'+field[i]+'`';
        }
       this.field_str = field.join(' , ');
    }

    if(typeof field == 'string'){
        this.field_str = field;
    }
    return this;
}

/**
 * 设置搜索的排序方法
 * field Object|String   可以使用数组或才直接写入字符来设置需要搜索的字段
 * 对象的例子：{id:'desc'} = > order by `id` desc
 */
Base.prototype.order = function(order){
    if(typeof order == 'object' ){
        for( key in order){
            this.order_str = ' order by `'+key+'` '+order[key]+' '
        }
    }

    if(typeof field == 'string'){
        this.order_str = order;
    }
    return this;
}

/**
 * 设置搜索结果输出限制的方法
 * offset Number   开始输出的偏移量
 * number Number    输出的条数
 * 10, 10 = > limit 10, 10
 */
Base.prototype.limit = function(offset, number){
    this.limit_str = ' limit '+offset+', '+number;
    return this;
}

Base.prototype.initValue = function(){
    this.where_str = '';                    // 用于拼接当前操作的where条件字符串
    this.field_str = '*';                   // 用于拼接当前操作显示字段的字符串
    this.order_str = '';                    // 用于拼接当前操作排序的字符串
    this.limit_str = '';                    // 用于拼接当前操作限制行输出的字符串
    this.insert_str = '';
    this.update_str = '';
}

// 是用于搜索用的终结方法
Base.prototype.select = function(fun){
    let sql = `select ${this.field_str} from ${this.table} ${this.where_str} ${this.order_str} ${this.limit_str}`
    console.log(sql);
    let that = this
    this.connection.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return false;
        }
        // 初始化搜索用的数据
        that.initValue()

        // console.log(result)
        fun(result)
    })
}


/**
 * 设置当前SQL语句使用数据的方法
 * data Object   需要执行数据
 * 例子： {id:1, name:"alex"}
 * 123456
 * 012345
 */
Base.prototype.data = function(data){
    let field_str = ""
    let values_str = ""
    let update_str = ""
    for( key in data){
        field_str += "`"+key+"`, "
        values_str +=  '"'+data[key]+'", '
        update_str += "`"+key+"`='"+data[key]+"', "
    }
    field_str = field_str.substring(0, field_str.length-2)
    values_str = values_str.substring(0, values_str.length-2)

    this.insert_str = `(${field_str}) values (${values_str})`
    this.update_str = update_str.substring(0, update_str.length-2)
    return this
}

// 数据插入方法
Base.prototype.insert = function(fun){
    // insert into news (id, title, content) values (123, '小明我爱你', '1231231')
    let sql = `insert into ${this.table} ${this.insert_str}`
    console.log(sql)
    let that = this
    this.connection.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return false;
        }
        // 初始化搜索用的数据
        that.initValue()

        console.log(result)
        fun(result)
    })
}

Base.prototype.delete = function(fun){
     // delete from news where id=1
     let sql = `delete from ${this.table} ${this.where_str}`
     let that = this
     this.connection.query(sql, (err, result)=>{
         if(err){
             console.log(err)
             return false;
         }
         // 初始化搜索用的数据
         that.initValue()
 
        //  console.log(result)
         fun(result)
     })
}

Base.prototype.update = function(fun){
     // update news set title="表妹你好么", content="广西老表" where id=1
     let sql = `update ${this.table} set ${this.update_str} ${this.where_str}`
     console.log(sql);
     let that = this
     this.connection.query(sql, (err, result)=>{
         if(err){
             console.log(err)
             return false;
         }
         // 初始化搜索用的数据
         that.initValue()
 
        //  console.log(result)
         fun(result)
     })
}
// Base.prototype.getList = function(fun){
//     let sql = "select * from "+this.table

//     this.connection.query(sql, (err, list)=>{
//         if(err){
//             console.log(err)
//             return false
//         }
//         console.log(list)
//         // return list
//         fun(list)
//     })
// }
