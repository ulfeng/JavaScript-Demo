// 方法1
window.onload = function () {
    var oSkin = document.getElementById("skin").getElementsByTagName("li");

    for (var i = 0; i < oSkin.length; i++) {
        oSkin.onclick = function () {
            for (var p in oSkin) {
                oSkin[p].className = "";
                this.className = "current";
            }
        }
    }
}

// 方法2
  