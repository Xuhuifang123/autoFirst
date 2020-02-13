import {
    wxRequest
} from './request';
import {
    HOST,
    BUYHOST
} from './setting';

// HOST:https://api.news18a.com

// 登录
const LOGINURL = (params) => wxRequest(params, HOST + "/init.php?m=program&c=user_related&a=login",false);

// 首页栏目展示
const GETMENU = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=firstColumn",false);

// 首页栏目type为index时
const GETTYPEINDEX = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=indexList",false);

// 首页栏目type为hand时
const GETTYPEHAND = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=storyListHandle",false);

// 首页栏目type为auto时
const GETTYPEAUTO = (params) => wxRequest(params, HOST + "/init.php?m=api&c=index&a=storyList",false);



// 文章详情
const GETSTORY = (params) => wxRequest(params, HOST + "/init.php?m=program&c=story_related&a=getStoryInfo",false);



// 关于我们
const ABOUTUS = (params) => wxRequest(params, HOST + "/init.php?m=api&c=api&a=withUs",false);


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

    GETSTORY,
    LOGINURL,
    ABOUTUS,
    toast:showToast,
    empty:showEmpty,
    loading:showLoading,
    loadingWithText:showLoadingWithText,
    finishLoading:finishLoading
}