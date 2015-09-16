// 方法1
window.onload = function () {
    var shuRu = document.getElementById("shuRu");
    var select = document.getElementById("select");
    var close = document.getElementById("close");
    var styleValue = select.style;

    shuRu.onclick = function ()
    {
        styleValue.display = styleValue.display == "block" ? "none" : "block";  // 如果是block,则为nobe,否则为block ，三元操作符。
    }
    close.onclick = function () {
        styleValue.display = "none";
    }
}


// 方法2
//window.onload = function () {
//    var oDiv = document.getElementById("container");
//    oDiv.onmouseover = function () {
//        oDiv.className = "hover";
//    };
//    oDiv.onmouseout = function () {
//        oDiv.className = "";
//    }
//}