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

// 首页推荐
const GETTUIJIAN = (params) => wxRequest(params, HOST + "/init.php?m=ina_app_new&c=index_js&a=getStoryListNew&wts_app=yes",false);

// 文章详情
const GETSTORY = (params) => wxRequest(params, HOST + "/init.php?m=program&c=story_related&a=getStoryInfo",false);






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
    GETTUIJIAN,
    GETSTORY,
    LOGINURL,
    toast:showToast,
    empty:showEmpty,
    loading:showLoading,
    loadingWithText:showLoadingWithText,
    finishLoading:finishLoading
}