import wepy from 'wepy'

let winWidth,
    winHeight,
    ctx,
    rpx,
    ratio,
    canvasWidth = 846,
    canvasHeight = 1095;

//参数依次为  二维码图片，
const Share =  (  code,storyImage,storyCanvas,storyTitle  ) => {

    //获取系统信息，具体的属性请前往微信小程序官网查看
    wx.getSystemInfo({
        success: res => {
            console.log( res );
            winWidth = res.windowHeight;
            winHeight = res.windowWidth;
            rpx = 3;
            ratio = res.pixelRatio;
            // canvasWidth = canvasWidth * rpx;
            // canvasHeight = canvasHeight * rpx;
        }
    })

    if( storyCanvas == 'videoCanvas' ){
        canvasHeight = 1008;
    }
    
    var qrcode = code//二维码图片一般为网络图片后台生成
    var bgImgPath = storyImage //首先你需要准备一张背景图
    var bgborder = './../../res/images/border_icon.png'
    ctx = wx.createCanvasContext(storyCanvas)//创建 canvas 绘图上下文
    
    //画矩形 设置背景颜色
    ctx.rect( 0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    
    //将文章图绘制到画布中
    if( storyCanvas == 'videoCanvas' ){
        ctx.drawImage(bgImgPath, 0, 0, canvasWidth, 159*rpx)
        var bt_y = 169*rpx,
            line_y = 219*rpx,
            code_y = 229*rpx,
            tip1_y = 265*rpx,
            tip2_y = 281*rpx;
    }else{
        ctx.drawImage(bgImgPath, 0, 0, canvasWidth, 188*rpx)
        var bt_y = 198*rpx,
            line_y = 248*rpx,
            code_y = 258*rpx,
            tip1_y = 294*rpx,
            tip2_y = 310*rpx;
    }
    ctx.save()

    //下面你需要描述的文字，因为canvas文字不能够换行，所以这里按行一行一行写
    //标题
    let title = {
        x: 12*rpx,
        y: bt_y,
        width: 258*rpx,
        height: 20*rpx,
        line: 2,
        color: '#000',
        size: 15*rpx,
        align: 'left',
        baseline: 'top',
        text: storyTitle,
        bold: true
    };
    textWrap(title);

    // 标题下直线
    ctx.drawImage(bgborder, 12*rpx, line_y, 259*rpx, rpx);
    ctx.save();
    
    // 绘制二维码
    ctx.drawImage(qrcode, 24*rpx, code_y, 98*rpx, 98*rpx);
    ctx.save();

    // 提示阅读
    ctx.setFillStyle('#000000');
    ctx.setFontSize(12*rpx);
    ctx.setTextAlign('left');
    ctx.setTextBaseline('top');
    ctx.fillText( '长按图片识别小程序码', 138*rpx, tip1_y);
    ctx.fillText( '进入汽势传媒阅读全文', 138*rpx, tip2_y);
    // ctx.draw()

    console.log( canvasWidth,canvasHeight );

    //将canvas画布转化为图片
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            ctx.draw(false,function(){
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: canvasWidth,
                    height: canvasHeight,
                    destWidth: canvasWidth,
                    destHeight: canvasHeight,
                    canvasId: storyCanvas,
                    quality:1,
                    success: function (res) {
                        console.log( res );
                        /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
                        resolve({'value':res.tempFilePath});
                    },
                    fail: function (res) {
                        console.log( res );
                        resolve({'value':'图片保存失败，刷新重试 ~'});　　
                    }
                })
            })
        },300)
    });
    
}

// 文本换行
const textWrap = (obj) => {
    let tr = getTextLine(obj);
    for (let i = 0; i < tr.length; i++) {
        if (i < obj.line){
            let txt = {
                x: obj.x,
                y: obj.y + (i * obj.height),
                color: obj.color,
                size: obj.size,
                align: obj.align,
                baseline: obj.baseline,
                text: tr[i],
                bold: obj.bold
            };
            // if (i == obj.line - 1) {
                // console.log( txt.text );
                // txt.text = txt.text.substring(0, txt.text.length - 3) + '......';
            // }
            drawText(txt);
        }
    }
};

// 获取文本折行
const getTextLine = (obj) => {
    ctx.setFontSize(obj.size);
    let arrText = obj.text.split('');
    let line = '';
    let arrTr = [];
    for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        var metrics = ctx.measureText(testLine);
        var width = metrics.width;
        if (width > obj.width && i > 0) {
            arrTr.push(line);
            line = arrText[i];
        } else {
            line = testLine;
        }
        if (i == arrText.length - 1) {
            arrTr.push(line);
        }
    }
    return arrTr;
};

// 渲染文字
const drawText = (obj) => {
    ctx.save();
    ctx.setFillStyle(obj.color);
    ctx.setFontSize(obj.size);
    ctx.setTextAlign(obj.align);
    ctx.setTextBaseline(obj.baseline);
    if (obj.bold) {
        ctx.fillText(obj.text, obj.x, obj.y - 0.5);
        ctx.fillText(obj.text, obj.x - 0.5, obj.y);
    }
    ctx.fillText(obj.text, obj.x, obj.y);
    if (obj.bold) {
        ctx.fillText(obj.text, obj.x, obj.y + 0.5);
        ctx.fillText(obj.text, obj.x + 0.5, obj.y);
    }
    ctx.restore();
};

module.exports = {
    Share
}