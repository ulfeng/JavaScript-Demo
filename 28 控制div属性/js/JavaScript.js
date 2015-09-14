// 方法1
//var demo = document.getElementById("demo");
    //function changeWidth() {
    //    demo.style.width = "200px";
    //}
    //function changeHeight() {
    //    demo.style.height = "200px";
    //}
    //function changeColor() {
    //    demo.style.backgroundColor = "#0ff";
    //}
    //function hideDemo() {
    //    demo.style.display = "none";
    //}
    //function reSet() {
    //    //demo.style.height = "100px";
    //    //demo.style.width = "100px";
    //    //demo.style.backgroundColor = "#000";
    //    //demo.style.display = "block";
    //    demo.style.cssText="width: 100px;height: 100px; background: #0ff; display: block;"
    //}

// 方法2
var changeStyle = function (elem, attr, value) {
    elem.style[attr] = value;
}
window.onload = function () {
    var oBtn = document.getElementsByTagName("input");
    var oDiv = document.getElementById("demo");
    var oAtt = ["width", "height", "background", "display", "display"];
    var oVal = ["200px", "200px", "red", "none", "block"];

    for (var i = 0; i < oBtn.length; i++) {
        oBtn.index = i;
        oBtn[i].onclick = function () {
            this.index == oBtn.length - 1 && (oDiv.style.cssText = "");
            changeStyle(oDiv, oAtt[this.index], oVal[this.index]);
        }
    }
}


