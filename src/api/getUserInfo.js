import wepy from 'wepy'

export const _timer = (context) => {
    return new Promise((resolve, reject) => {
        let _timer = null;
        clearInterval(_timer);
        _timer = setInterval(() =>{
            resolve(author(context))
        },500)
        context.data.timer = _timer; 
    })
}

export const author = (context) => {
    return new Promise((resolve,reject) => {
        var that = context;
        wepy.getUserInfo({
            success: (res) =>{
                var userInfo = res.userInfo;
                that.data.userInfo = userInfo;
                resolve(res.userInfo);
            },
            fail: (res) =>{
                console.log('.......getUserInfo fail.........')
                clearInterval(context.data.timer)
                wepy.showModal({
                    title: '警告',
                    content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                    success:function(res){
                        if (res.confirm) {
                            wepy.openSetting({
                                success: (res) => {
                                    if (res.authSetting["scope.userInfo"] || res.authSetting["scope.userLocation"]){////如果用户重新同意了授权登录
                                        wepy.getUserInfo({
                                            success:function(res){
                                                resolve(res.userInfo)
                                                that.$parent.globalData.userInfo = res.userInfo;
                                            }
                                        })
                                    }
                                },
                                fail: function(res){
                                    resolve({'userName':'','userImg':''})
                                    console.log('没有选择授权')
                                }
                            })               
                        }else{
                            console.log('还是不同意授权')
                        }
                    }
                })
            },
            complete: function (res){
            }
        })
    })
}

let isBoolen = true;
export const location = (context) => {
    return new Promise((resolve, reject) => {
        if( context.$parent.globalData.location != null ){
            resolve(context.$parent.globalData.location)
            console.log('已获取location')
        }else{
            console.log('没有获取到location ')
            wepy.getSetting({
                success(res) {
                    console.log(res)
                    if(!res.authSetting['scope.userLocation']) {
                        wx.showModal({
                            title: '温馨提醒',
                            content: '需要获取您的地理位置才能使用小程序',
                            cancelText: '不使用',
                            confirmText: '获取位置',
                            success: function(res) {
                                if(res.confirm) {
                                    getLocation(context).then((res) => {
                                        // console.log(res)
                                        if (res.code == 1){
                                            if(isBoolen){ //第一次不执行
                                                isBoolen = false;
                                            }else{
                                                wepy.openSetting({  //  点击自带取消定位健会调用这个面板
                                                    success: (res) => {
                                                        if (res.authSetting["scope.userLocation"]){////如果用户在面板重新同意了授权地理位置
                                                            console.log('--有了scope.userLocation--')
                                                            resolve(getLocation(context)) //点击面板后再次调用getLocation返回参数
                                                        }
                                                    },
                                                    fail: function(res){
                                                        console.log('--没有scope.userLocation--')
                                                    }
                                                })
                                            }
                                        }else{
                                            resolve(getLocation(context))
                                        }
                                    })
                                } else if(res.cancel) {
                                    //resolve(getLocation(context))
                                    //不做任何操作
                                }
                            }
                        })
                    }                    
                }
            })
        }
    })
}

export const getLocation = (context) => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                context.$parent.globalData.location = {'code': 0, 'latitude':latitude, 'longitude':longitude, 'speed':speed, 'accuracy':accuracy}
                resolve(context.$parent.globalData.location);
            },
            fail: function(res){
                resolve({'code': 1, 'latitude':'', 'longitude':'', 'speed':'', 'accuracy':''})
            }
        })
    })
}

