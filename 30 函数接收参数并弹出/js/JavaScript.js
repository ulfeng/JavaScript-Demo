// 方法1
//var inputValue = document.getElementsByTagName("input");
//var commitBtn = document.getElementsByTagName("button")[0];
//window.onload = function () {
//    getParameters();
//}

//function getParameters() {
//    commitBtn.onclick = function () {
//        alert(inputValue[0].value);
//        alert(inputValue[1].value);
//    }
//}

// 方法2
var myFun = function (a, b) {
    alert(a.value);
    alert(b.value);
}
window.onload = function () {
    var oInput = document.getElementsByTagName("input");
    var oBtn = document.getElementsByTagName("button")[0];
    oBtn.onclick = function () {
        myFun(oInput[0], oInput[1]);
    }
}
  