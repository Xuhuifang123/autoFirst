import {
    wxRequest
} from './request';
import {
    HOST,
    BUYHOST
} from './setting';

// HOST:https://api.news18a.com

// 获取openid
const GETOPEN = (params) => wxRequest(params, HOST + "/init.php?m=api&c=program&a=getOpen",false);

// 授权登录
const GETLOGIN = (params) => wxRequest(params, HOST + "/init.php?m=api&c=program&a=login",false);

// 获取验证码
const GETCODE = (params) => wxRequest(params, HOST + "/init.php?m=api&c=program&a=code",false);

// 手机号登录
const GETPHONE = (params) => wxRequest(params, HOST + "/init.php?m=api&c=program&a=phone_login",false);

// 首页栏目展示
const GETMENU = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=firstColumn",false);

// 首页栏目type为index时
const GETTYPEINDEX = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=indexList",false);

// 首页栏目type为hand时
const GETTYPEHAND = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=storyListHandle",false);

// 首页栏目type为auto时
const GETTYPEAUTO = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=storyList",false);

// 直播列表
const GETLIVELIST = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=get_live_list",false);

// 视频列表 
const GETVIDEOLIST = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=videoList",false);

// 汽势号列表
const GETARTLIST = (params) => wxRequest(params, HOST + "/init.php?m=api&c=user&a=qiShiList",false);

// 热门作者列表
const GETAUTHORLIST = (params) => wxRequest(params, HOST + "/init.php?m=api&c=user&a=hotAuthorList",false);

// 专题列表
const GETSPECIALLIST = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=splicestoryList",false);

// 文章详情
const GETSTORY = (params) => wxRequest(params, HOST + "/init.php?m=api&c=program&a=storyInfo",false);

// 作者详情
const GETAUTHORDETAIL = (params) => wxRequest(params, HOST + "/init.php?m=api&c=user&a=uCenter",false);

// 图库详情
const GETPHOTODETAIL = (params) => wxRequest(params, HOST + "/init.php?m=api&c=user&a=photoInfo",false);

// 视频详情 
const GETVIDEODETAIL = (params) => wxRequest(params, HOST + "/init.php?m=api&c=user&a=videoInfo",false);

// 直播详情
const GETLIVEDETAIL = (params) => wxRequest(params, HOST + "/init.php?m=api&c=user&a=liveInfo",false);

// 关于我们
const ABOUTUS = (params) => wxRequest(params, HOST + "/init.php?m=api&c=api&a=withUs",false);

// 意见反馈
const RECOMMEND = (params) => wxRequest(params, HOST + "/init.php?m=api&c=user&a=recommend",false);


/**
 *公用的Toast
 * @param {toas的文本} res
 */
const showToast = (res) => {
    wx.showToast({
      title: res,
      icon: "none"
    });
}
  
const showEmpty = () => {
    showToast("暂无数据");
}
  
const showLoading = () => {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
}
  
const showLoadingWithText = (title) => {
    wx.showLoading({
      title: title,
      mask: true
    });
}

const finishLoading = () => {
    wx.hideLoading();
}

module.exports = {
    GETMENU,
    GETTYPEINDEX,
    GETTYPEHAND,
    GETTYPEAUTO,
    GETLIVELIST,
    GETVIDEOLIST,
    GETARTLIST,
    GETAUTHORLIST,
    GETSPECIALLIST,
    GETSTORY,
    GETAUTHORDETAIL,
    GETPHOTODETAIL,
    GETVIDEODETAIL,
    GETLIVEDETAIL,
    GETOPEN,
    GETLOGIN,
    GETCODE,
    GETPHONE,
    ABOUTUS,
    RECOMMEND,
    toast:showToast,
    empty:showEmpty,
    loading:showLoading,
    loadingWithText:showLoadingWithText,
    finishLoading:finishLoading
}