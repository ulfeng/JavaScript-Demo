// 方法1
window.onload = function () {
    var oLi = document.getElementsByTagName("li");
    var oA = document.getElementsByTagName("a");
    var oImg = document.getElementsByTagName("img");

    for (var i = 0; i < oLi.length; i++) {
        oA[i].index = oImg[i].index = i;
        oA[i].onmouseover = function () {
            oLi[this.index].className = "zindex";
            oImg[this.index].style.display = "block";
        };
        oA[i].onmouseout = function () {
            oLi[this.index].className = "";
            oImg[this.index].style.display = "none";
        };
        oImg[i].onmouseover = function () {
            oLi[this.index].className = "zindex";
            this.style.display = "block";
        };
        oImg[i].onmouseout = function () {
            oLi[this.index].className = "";
            this.style.display = "none";
        }
    }
}

