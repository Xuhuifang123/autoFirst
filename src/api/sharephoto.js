//参数依次为  二维码图片，
const share =  (  code  ) => {
    // var that = this;
    let Width,
        Height;
    
    //获取系统信息，具体的属性请前往微信小程序官网查看
    wx.getSystemInfo({
        success: res => {
            console.log(res);
            Width = res.screenWidth;
            Height = res.screenHeight;
        }
    })
    
    var qrcode = code//二维码图片一般为网络图片后台生成
    var bgImgPath = that.storyImage //首先你需要准备一张背景图
    var bgborder = './../res/images/border_icon.png'
    var width = that.Width
    var height = that.Height
    that.ctx = wx.createCanvasContext('storyCanvas')//创建 canvas 绘图上下文
    
    //画矩形 设置背景颜色
    that.ctx.rect(0,0,282,365);
    that.ctx.fillStyle = "#fff";
    that.ctx.fill();
    
    //将文章图绘制到画布中
    that.ctx.drawImage(bgImgPath, 0, 0, 282, 188)
    that.ctx.save() 

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
        text: that.storyInfo.title,
        bold: true
    };
    that.textWrap(title);

    // 标题下直线
    that.ctx.drawImage(bgborder, 12, 248, 259, 1);
    that.ctx.save();
    
    // 绘制二维码
    that.ctx.drawImage(qrcode, 24, 258, 98, 98);
    that.ctx.save();

    // 提示阅读
    that.ctx.setFillStyle('#000000');
    that.ctx.setFontSize(12);
    that.ctx.setTextAlign('left');
    that.ctx.setTextBaseline('top');
    that.ctx.fillText( '长按图片识别小程序码', 138, 294);
    that.ctx.fillText( '进入汽势传媒阅读全文', 138, 310);
    that.ctx.draw()

    //将canvas画布转化为图片
    wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.Width,
        height: that.Height,
        destWidth: that.Width,
        destHeight: that.Height,
        canvasId: 'storyCanvas',
        success: function (res) {
            console.log('imagePath'+res.tempFilePath);
            /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
            that.imagePath = res.tempFilePath;
            that.$apply();
        },
        fail: function (res) {
            console.log(res)
        }
    })
}

// 保存文章题图到本地
const saveImageLocal = () => {
    let that = this;
    wx.downloadFile({
        url: that.storyInfo.title_pic1,
        success: function(res) {
            if (res.statusCode === 200){
                let img = res.tempFilePath;
                that.storyImage = img;
                console.log( that.storyImage );
                that.share();
            }
        }
    })
}

// 文本换行
textWrap (obj) {
    let that = this;
    let tr = that.getTextLine(obj);
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
            that.drawText(txt);
        }
    }
};

// 获取文本折行
getTextLine (obj){
    let that = this;
    that.ctx.setFontSize(obj.size);
    let arrText = obj.text.split('');
    let line = '';
    let arrTr = [];
    for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        var metrics = that.ctx.measureText(testLine);
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
drawText(obj) {
    let that = this;
    that.ctx.save();
    that.ctx.setFillStyle(obj.color);
    that.ctx.setFontSize(obj.size);
    that.ctx.setTextAlign(obj.align);
    that.ctx.setTextBaseline(obj.baseline);
    if (obj.bold) {
        console.log('字体加粗')
        that.ctx.fillText(obj.text, obj.x, obj.y - 0.5);
        that.ctx.fillText(obj.text, obj.x - 0.5, obj.y);
    }
    that.ctx.fillText(obj.text, obj.x, obj.y);
    if (obj.bold) {
        that.ctx.fillText(obj.text, obj.x, obj.y + 0.5);
        that.ctx.fillText(obj.text, obj.x + 0.5, obj.y);
    }
    that.ctx.restore();
};





module.exports = {
    share
}