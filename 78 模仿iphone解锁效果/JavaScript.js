window.onload = function () {
    var iPhone = document.getElementById("iphone");
    var oLock = document.getElementById("lock");
    var oBtn = document.getElementsByTagName("span")[0];
    var disX = 0;
    var maxL = oLock.clientWidth - oBtn.offsetWidth;
    var oBg = document.createElement("img");
    oBg.src = "http://fgm.cc/iphone/2.jpg";   // 预加载第二张图片
    
    oBtn.onmousedown = function (e) {
        var e = e || window.event;
        disX = e.clientX - this.offsetLeft;

        document.onmousemove = function (e) {
            var e = e || window.event;
            var l = e.clientX - disX;

            l < 0 && (l = 0);
            l > maxL && (l = maxL);

            oBtn.style.left = l + "px";

            oBtn.offsetLeft == maxL && (iPhone.style.background = "url(" + oBg.src + ")", oLock.style.display = "none");
            return false;
        }
        
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            // setCapture() 设置捕获范围; releaseCapture()取消捕获范围
            oBtn.releaseCapture && oBtn.releaseCapture();

            oBtn.offsetLeft > maxL / 2 ?
                startMove(maxL, function () {
                    iPhone.style.background = "url(" + oBg.src + ")";
                    oLock.style.display = "none";
                }) :
            startMove(0)
        };

        this.setCapture && this.setCapture();
        return false;

    };

    function startMove(iTarget, onEnd) {
        clearInterval(oBtn.timer);
        oBtn.timer = setInterval(function () {
            doMove(iTarget,onEnd)
        },30)
    }

    function doMove(iTarget, onEnd) {
        var iSpeed = (iTarget - oBtn.offsetLeft) / 5;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        iTarget == oBtn.offsetLeft ? (clearInterval(oBtn.timer).onEnd && onEnd()) : oBtn.style.left = iSpeed + oBtn.offsetLeft + "px";
    }
}