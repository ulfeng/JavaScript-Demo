// 方法1

window.onload = function () {
    var oDiv = document.getElementById("container");

    oDiv.onmouseover = function () {
        oDiv.style.cssText = "width: 180px;heigth: 180px;background: #fff; color: #0ff;font: 12px; margin: 0 auto; padding: 20px; border:5px solid #0ff;cursor: crosshair;";
    }
    oDiv.onmouseout = function () {
        oDiv.style.cssText = "width: 180px;heigth: 180px;background: #000; color: #fff;font: 12px; margin: 0 auto; padding: 20px;";
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