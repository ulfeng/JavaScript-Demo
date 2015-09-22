window.onload = function () {
    var oLi = document.getElementsByTagName("li");
    var oImg=document.getElementById("changeSrc");
    for (var i = 1; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onmouseover = function () {
            oImg.src = "images/small_"+this.index+".jpg";
        }
    }
}
