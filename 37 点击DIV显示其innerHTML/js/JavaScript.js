// 方法1
window.onload = function () {
    var oDiv = document.getElementById("container").getElementsByTagName("div");
    
    for (var i = 0; i < oDiv.length; i++) {
        oDiv[i].onclick = function () {
            alert(this.innerHTML);
        }
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