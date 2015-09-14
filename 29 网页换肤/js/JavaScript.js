// 方法1
window.onload = function () {
    var oLink = document.getElementById("changeStyle");
    var oSkin = document.getElementById("skin").getElementsByTagName("li");

    for (var i = 0; i < oSkin.length; i++) {
        oSkin[i].onclick = function () {
            for (var p in oSkin) {
                oSkin[p].className = "";
                this.className = "current";
                oLink.href = "css/" + this.id + ".css";
            }
        }
    }
}


// 方法2
  