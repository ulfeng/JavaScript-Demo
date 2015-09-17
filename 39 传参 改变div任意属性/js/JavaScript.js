// 方法1
var changeStyle = function (elem, name, value) {
    elem.style[name] = value;
}

window.onload = function () {
    var oDiv = document.getElementById("div1");
    var oBtn = document.getElementsByTagName("button");
    var oInput = document.getElementsByTagName("input");

    oBtn[0].onclick = function () {
        changeStyle(oDiv, oInput[0].value, oInput[1].value);
    },
    oBtn[1].onclick = function () {
        oDiv.removeAttribute("style");
    }
}

//var changeStyle = function (elem, name, value) {
//    elem.style[name] = value
//}
//window.onload = function () {
//    var oDiv = document.getElementById("div1");
//    var oBtn = document.getElementsByTagName("button");
//    var oInput = document.getElementsByTagName("input");
//    oBtn[0].onclick = function () {
//        changeStyle(oDiv, oInput[0].value, oInput[1].value)
//    },
//	oBtn[1].onclick = function () {
//	    oDiv.removeAttribute("style")
//	}
//}

// 方法2
