// 内容
let main = new Vue({
    el:'#main',
    data:{

    },
    methods:{
        // 签到
        Sign(){
            // 检测浏览器是否支持地理定位功能
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition,this.showError);
            
            } else {
                alert('浏览器不支持定位功能！');
            }
        },
        // 得到坐标信息
        showPosition(position){
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            // alert("经度: " + longitude + "纬度: " + latitude);
            
                // 使用百度地图JS API
            var point = new BMap.Point(longitude,latitude);
            
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs){
                var addComp = rs.addressComponents;
                alert('签到成功：'+addComp.city);
            });
        },
        // 得到错误信息
        showError(error){
            switch(error.code) 
            {
            case error.PERMISSION_DENIED:
              alert("用户拒绝对获取地理位置的请求。");
              break;
            case error.POSITION_UNAVAILABLE:
                alert("位置信息是不可用的。");
              break;
            case error.TIMEOUT:
                alert("请求用户地理位置超时。");
              break;
            case error.UNKNOWN_ERROR:
                alert("未知错误。");
              break;
            }
        }

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
        note(){
            window.location.href = 'http://' + window.location.host + '/home/staff/note';
        }
    }
});