// 方法1

window.onload = function () {
    var oBtn = document.getElementsByTagName("button")[0];

    var oLi = document.getElementsByTagName("li");
    oBtn.onclick = function () {
        for (var i = 0; i < oLi.length; i++) {
            oLi[i].style.backgroundColor = "red";
        }
    }
}

// 方法2
