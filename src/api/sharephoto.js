import wepy from 'wepy'

let Width,
    Height,
    ctx;

//参数依次为  二维码图片，
const Share =  (  code,storyImage,storyCanvas,storyTitle  ) => {

    //获取系统信息，具体的属性请前往微信小程序官网查看
    wx.getSystemInfo({
        success: res => {
            console.log(res);
            Width = res.screenWidth;
            Height = res.screenHeight;
        }
    })
    
    var qrcode = code//二维码图片一般为网络图片后台生成
    var bgImgPath = storyImage //首先你需要准备一张背景图
    var bgborder = './../../res/images/border_icon.png'
    ctx = wx.createCanvasContext(storyCanvas)//创建 canvas 绘图上下文
    
    //画矩形 设置背景颜色
    ctx.rect(0,0,282,365);
    ctx.fillStyle = "#fff";
    ctx.fill();
    
    //将文章图绘制到画布中
    ctx.drawImage(bgImgPath, 0, 0, 282, 188)
    ctx.save() 

    //下面你需要描述的文字，因为canvas文字不能够换行，所以这里我们按行一行一行写，当然你也可以自己写一个函数将文字截成一段一段的循环放入画布中
    //标题
    let title = {
        x: 12,
        y: 198,
        width: 258,
        height: 20,
        line: 2,
        color: '#000',
        size: 15,
        align: 'left',
        baseline: 'top',
        text: storyTitle,
        bold: true
    };
    textWrap(title);

    // 标题下直线
    ctx.drawImage(bgborder, 12, 248, 259, 1);
    ctx.save();
    
    // 绘制二维码
    ctx.drawImage(qrcode, 24, 258, 98, 98);
    ctx.save();

    // 提示阅读
    ctx.setFillStyle('#000000');
    ctx.setFontSize(12);
    ctx.setTextAlign('left');
    ctx.setTextBaseline('top');
    ctx.fillText( '长按图片识别小程序码', 138, 294);
    ctx.fillText( '进入汽势传媒阅读全文', 138, 310);
    ctx.draw()
    let CanvasRes = '';
    //将canvas画布转化为图片
    return new Promise(function(resolve,reject){
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: Width,
            height: Height,
            destWidth: Width,
            destHeight: Height,
            canvasId: storyCanvas,
            success: function (res) {
                /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
                // CanvasRes = res.tempFilePath;
                resolve({'value':res.tempFilePath});
            },
            fail: function (res) {
                resolve({'value':'图片加载失败，刷新重试 ~'});　　
            }
        })
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