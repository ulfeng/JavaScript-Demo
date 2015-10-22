var Animate = function (oElement, options, callback) {
    this.initialize.apply(this, arguments);
};

Animate.prototype = {
    initialize: function (oElement, options, callback) {
        var oThis = this;
        this.options = options;
        this.callback = callback;
        this.oElement = typeof oElement === "string" ? document.getElementById(oElement) : oElement;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            oThis.doMove();
        }, 30)
    },
    css: function (attr, value) {
        if (arguments.length == 1) {
            return parseFloat(this.oElement.currrentStyle ? this.oElement.currrentStyle[attr] : getComputedStyle(this.oElement, null)[attr]);
        }
        else if (arguments.length == 2) {
            attr == "opacity" ? (this.oElement.style.filter = "alpha(opacity=" + value + ")", this.oElement.style.opacity = value / 100) : this.oElement.style[attr] = value + "px";
        }
    },
    doMove: function () {
        var opt = this.options;
        var bComplete = true;
        for (var p in opt) {
            var iCur = p == "opacity" ? parseInt(this.css(p).toFixed(2) * 100) : this.css(p);
            var iSpeed = (opt[p] - iCur) / 5;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            opt[p] == iCur || (bComplete = false, this.css(p, iCur + iSpeed));
        }
        bComplete && (clearInterval(this.timer), this.callback && this.callback.call(this));
    }
};

// 运动框架应用
window.onload = function () {
    var oSpan = document.getElementsByTagName("span")[0];
    var oInput = document.getElementsByTagName("input")[0];
    // 定义运动路径
    var aData = [
        { width: 20, height: 20 },
        { width: 80, height: 80 },
        { left: 10 },
        { left: 408 },
        { opacity: 100 },
        { opacity: 0 },
        { opacity: 100 },
        { width: 80, height: 80, left: 408 },
        { top: 10 },
        { width: 20, height: 20, left: 468 },
        { top: 70 },
        { left: 10 },
        { top: 10 },
        { left: 468 },
        { width: 20, height: 20, left: 468 },
        { width: 80, height: 80, left: 408 }
    ];
    var bOrder = true;
    var i = 0;
    oInput.disabled = false;
    // 按钮点击事件(开始/返回)
    oInput.onclick = function () {
        var oThis = this;
        oThis.disabled = true;
        function begin() {
            bOrder ? i++ : i--;
            var obj = new Animate(oSpan, aData[i], begin);
            if (i == aData.length || i < 0) {
                clearInterval(obj.timer);
                bOrder = !bOrder;
                oThis.value = bOrder ? "\u5f00\u59cb" : "\u539f\u8def\u8fd4\u56de";
                oThis.disabled = false;
                return;
            }
        }
        begin()
    };

    // 去除按钮虚线
    oInput.onfocus = function () {
        this.blur();
    }

}