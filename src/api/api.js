import {
    wxRequest
} from '../api/request';
import {
    HOST,
    BUYHOST
} from '../api/setting';

// HOST:https://api.news18a.com

// 登录
const LOGINURL = (params) => wxRequest(params, HOST + "/init.php?m=program&c=user_related&a=login",false);

// 首页推荐
const GETTUIJIAN = (params) => wxRequest(params, HOST + "/init.php?m=ina_app_new&c=index_js&a=getStoryListNew&wts_app=yes",false);

// 文章详情
const GETSTORY = (params) => wxRequest(params, HOST + "/init.php?m=ina_app&c=index_test&a=getStoryInfoById",false);


module.exports = {
    GETTUIJIAN,
    GETSTORY,
    LOGINURL
}