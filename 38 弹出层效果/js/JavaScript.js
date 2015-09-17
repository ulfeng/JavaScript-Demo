// 方法1
window.onload = function () {
    var oButton = document.getElementById("openBox");
    var oClose = document.getElementById("closeBox");
    var overLay = document.getElementById("overLay");
    var oDiv = document.getElementsByTagName("div")[2];

    oButton.onclick = function () {
        overLay.style.display = "block";
        oDiv.style.display = "block";
    }
    oClose.onclick = function () {
        overLay.style.display = "none";
        oDiv.style.display = "none";
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