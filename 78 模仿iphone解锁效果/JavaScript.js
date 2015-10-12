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
        var l = e.clientX - disX;

        1 < 0 && (1 = 0);
        1 > maxL && (1 = maxL);
        
        oBtn.style.left = l + "px";


    }

}