// 方法1
window.onload = function () {
    var oLi = document.getElementsByTagName("li");

    for (var i in oLi) {
        oLi[i].onmouseover = function () {
            this.style.opacity = "1";
        }
        oLi[i].onmouseout = function () {
            this.style.opacity = "0.4";
        }
    }
    
}

