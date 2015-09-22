// 方法1
window.onload = function () {
    var oLi = document.getElementsByTagName("li");

    for (var i in oLi) {
        oLi[i].onmouseover = function () {
            this.style.cssText = "width:150px; height:150px;";

        }
        oLi[i].onmouseout = function () {
            this.style.opacity = "0.4";
        }
    }
    
}

