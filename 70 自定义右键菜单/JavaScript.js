window.onload = function () {
    var oMenu = document.getElementById("menu");
    var aLi = oMenu.getElementsByTagName("li");
    // 加载后隐藏自定义右键菜单
    oMenu.style.display = "none";
    // 菜单鼠标移入移出样式
    for (i = 0; i < aLi.length; i++) {
        // 鼠标移入样式
        aLi[i].onmouseover = function () {
            this.className = "active";
        };
        // 鼠标移出样式
        aLi[i].onmouseout = function () {
            this.className = "";
        }
    }

    // 自定义菜单
    document.oncontextmenu = function (event) {
        var event = event || window.event;
        var style = oMenu.style;
        style.display = "block";
        style.top = event.clientY + "px";
        style.left = event.clientX + "px";
        return false;
    };

    // 页面点击后自定义菜单消失
    document.onclick = function () {
        oMenu.style.display = "none";
    }



}