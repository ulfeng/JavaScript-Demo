var zIndex = 1;
window.onload = function () {
    var oDrag1 = document.getElementById("drag1");
    var oDrag2 = document.getElementById("drag2");
    drag(oDrag1);
    drag(oDrag2);
};
function drag(oDrag) {
    var disX = disY = 0;
    oDrag.onmousedown = function (event) {
        var event = event || window.event;
        disX = event.clientX - this.offsetLeft;
        disY = event.clientY - this.offsetTop;

        var oTemp = document.createElement("div");
        oTemp["id"] = "temp";
        oTemp.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"];
        oTemp.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this,null)["top"];
        oTemp.style.zIndex = zIndex++;
        document.body.appendChild(oTemp);

        document.onmousemove = function (event) {
            var event = event || window.event;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;
            var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
            var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;

            iL <= 0 && (iL = 0);
            iT <= 0 && (iT = 0);
            iL >= maxL && (iL = maxL);
            iT >= maxT && (iT = maxT);

            oTemp.style.left = iL + "px";
            oTemp.style.top = iT + "px";
            return false;
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            oDrag.style.left = oTemp.style.left;
            oDrag.style.top = oTemp.style.top;
            oDrag.style.zIndex = oTemp.style.zIndex;
            document.body.removeChild(oTemp);
            oDrag.releaseCapture && oDrag.releaseCapture()
        };

        this.setCapture && this.setCapture();
        return false;
    }
}