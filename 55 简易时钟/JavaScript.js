
function getTime() {
    var oSapn = document.getElementsByTagName("span");
    var d = new Date();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    oSapn[0].innerHTML = hour;
    oSapn[1].innerHTML = min;
    oSapn[2].innerHTML = sec;
    setTimeout("getTime()", 1000);
}
window.onload = function () {
    getTime();
}