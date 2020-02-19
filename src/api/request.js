import wepy from 'wepy'
// import tip from './tip'
// import MINI_APPS_VERSION from './setting'

const wxRequest = async (params = {}, url, noLoadingStatus, navigateBackStatus) => {
    if (!noLoadingStatus) {
        // tip.loading()
    }
    let data = params.query || {}
    //let header = params.header || {'Content-Type': 'application/json'}
    let ContentType = params.header || 'application/x-www-form-urlencoded';
    var session_id = wepy.$instance.globalData.session || '';

    let header = {
        "Content-Type": ContentType,
        Cookie: "session_id=" + session_id
    }
    // header.version = MINI_APPS_VERSION
    try {
        let res = await wepy.request({
            url: url,
            method: params.method || 'POST',
            data: data,
            header: header
        })
        if (!noLoadingStatus) {
            // tip.loaded()
        }
        return res
    } catch (err) {
      // tip.loaded();
        let getErr = err.errMsg || ''
        getErr = getErr.replace('request:fail', '')
        // await tip.confirm(getErr, false)
        if (navigateBackStatus) {
            wx.navigateBack({
                delta: 1
            })
        }
        return err
    }
}

module.exports = {
    wxRequest
}