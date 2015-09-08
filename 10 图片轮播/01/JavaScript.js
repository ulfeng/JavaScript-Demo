window.onload = function () {
    var banner = document.getElementById("banner");
    var bannerCon = document.getElementById("bannerCon");
    var liList = bannerCon.getElementsByTagName("li");
    var spanList = banner.getElementsByTagName("span");
    var liLen = liList.length;
    var start, a=0, j;
    var liWidth = liList[0].offsetWidth;      // li可见区域宽度
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    bannerCon.style.width = liLen * liWidth + "px";
    function init() {
            spanList.onclick = function () {
                for (var i = 0; i < spanList.length; i++) {
                    spanList[j].className = "";
                }
                this.className = "current";
                a = this.index;
                bannerCon.style.left = -a * liWidth + "px";

                start = setInterval(setTime, 2000);
        }
        start = setInterval(setTime, 2000);
    }
    init();

    function setTime() {
        ++a;    // 先加再赋值
        // a++; 先赋值再加
        if (a > 5) { a = 0; }
        getActive();
    }

    function getActive() {
        for (var i = 0; i < spanList.length; i++) {
                spanList[i].className = "";          // 清空 spanList 类名 "current" 
            }
        spanList[a].className = "current";          
        bannerCon.style.left = -a*liWidth+"px";      // bannerCon left值
    }

    //function run(i) {
    //    spanList.index = i;
    //    spanList.onclick = function () {
    //        for (var i = 0; i < spanList.length; i++) {
    //            spanList[j].className = "";
    //        }
    //        this.className = "current";
    //        a = this.index;
    //        bannerCon.style.left = -a * liWidth + "px";

    //        start = setInterval(setTime, 2000);
    //    }
    //}

    left.onclick = function () {
        a--;
        if (a < 0) {
            a = 5;
        }
        getActive();
    };

    right.onclick = function () {
        a++;
        if (a > 5) {
            a = 0;
        }
        getActive();
    }

    liList.onmouseover = function () {
        clearInterval(start);
    };

    liList.onmouseout = function () {
        start = setInterval(setTime, 5000);
    }

    function css(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        else {
            return getComputedStyle(obj, false)[attr];
        }
    }
    


}