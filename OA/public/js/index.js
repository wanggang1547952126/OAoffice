// 按钮点击动画
let loginClick = false;
let registerClick = false;
let $bf = $('#bf');

$bf.on('click','.login',function(){
    if(loginClick){
        return;
    }
    loginClick = true;
    LRANIMATE('.login');
});

$bf.on('click','.register',function(){
    if(registerClick){
        return;
    }
    registerClick = true;
    LRANIMATE('.register');
});

function LRANIMATE(cobj){
    let $obj = $(cobj);
    $obj.animate({opacity:'1'},200,function(){
        $obj.animate({opacity:'0.8'},200,function(){
            loginClick = false;
            registerClick = false;
            if(cobj == '.register'){
                $('#login').css({display:'none'});
            }else{
                $('#register').css({display:'none'});
            }
            $bf.animate({opacity : '0'},1000,function(){
                $bf.css({display:'none'});
            });
        });
    });
}