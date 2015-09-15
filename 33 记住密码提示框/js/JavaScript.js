// 方法1
window.onload = function () {
    var check = document.getElementsByTagName("label")[0];
    var tips = document.getElementById("tips");
    check.onmouseover = function () {
        tips.style.display = "block";
    }
    check.onmouseout = function () {
        tips.style.display = "none";
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