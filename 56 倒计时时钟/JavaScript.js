window.onload = function () {
    var oBtn = document.getElementsByTagName("button")[0];
    var timer = null;

    oBtn.onclick = function () {
        this.className == "" ? (timer = setInterval(updateTime, 1000), updateTime()) : (clearInterval(timer));
        this.className = this.className == '' ? "cancel" : '';
    };

    function format(a) {
        return a.toString().replace(/^(\d)$/, '0$1');
    }

    function updateTime() {
        var oSpan = document.getElementsByTagName("span");
        var oRemain = oSpan[0].innerHTML.replace(/^0/, '') * 60 + parseInt(oSpan[1].innerHTML.replace(/^0/, ''));
        if (oRemain <= 0) {
            clearInterval(timer);
            return;
        }
        oRemain--;
        oSpan[0].innerHTML = format(parseFloat(oRemain / 60));
        oRemain %= 60;
        oSpan[1].innerHTML = format(parseInt(oRemain));

    }

}