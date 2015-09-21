// 方法1
//window.onload = function () {
//    var oLi = document.getElementById("tab").getElementsByTagName("li");
//    var main = document.getElementById("mc").getElementsByTagName("div");

//    for (var i = 0; i < oLi.length; i++) {
//        oLi[i].onclick = function () {
//            change(this);
//        }
//    }

//    function change(obj) {
//        for (var i = 0; i < oLi.length; i++) {
//            if (oLi[i] == obj) {
//                oLi[i].className = "tab_selected";
//                main[i].className = "main_selected";
//            }
//            else {
//                oLi[i].className = "";
//                main[i].className = "";
//            }
//        }
//    }
    
//}

// 方法2：
window.onload = function () {
    var oLi = document.getElementById("tab").getElementsByTagName("li");
    var oDiv = document.getElementById("mc").getElementsByTagName("div");

    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function () {
            for (var n = 0; n < oLi.length; n++) {
                oLi[n].className = "";
                oDiv[n].className = "";
                this.className = "tab_selected";
                oDiv[this.index].className = "main_selected";
            }
        }
    }
}

