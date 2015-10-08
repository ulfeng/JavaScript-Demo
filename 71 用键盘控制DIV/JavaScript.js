window.onload = function () {
    var oBox = document.getElementById("box");
    var bLeft = bTop = bRight = bBottom = bCtrlKey = false;

    setInterval(function () {
        if (bLeft) {
            oBox.style.left = oBox.offsetLeft - 10 + "px";
        }
        else if (bRight) {
            oBox.style.left = oBox.offsetLeft + 10 + "px";
        }

        if (bTop) {
            oBox.style.top = oBox.offsetTop - 10 + "px";
        }
        else if (bBottom) {
            oBox.style.top = oBox.offsetTop + 10 + "px";
        }
        // 防止溢出
        limit();
    }, 30);

    document.onkeydown = function (event) {
        var event = event || window.event;
        bCtrlKey = event.ctrlKey;

        switch (event.keyCode) {
            case 37:
                bLeft = true;
                break;
            case 38:
                
        }
    }


    // 防止溢出
    function limit() {
        var doc = [document.documentElement.clientWidth, document.documentElement.clientHeight];
        // 防止左侧溢出
        oBox.offsetLeft <= 0 && (oBox.style.left = 0);
        // 防止顶部溢出
        oBox.offsetTop <= 0 && (oBox.style.top = 0);
        // 防止右侧溢出
        doc[0] - oBox.offsetLeft - oBox.offsetWidth <= 0 && (oBox.style.left = doc[0] - oBox.offsetWidth + "px");
        // 防止底部溢出
        doc[1] - oBox.offsetTop - oBox.offsetHeight <= 0 && (oBox.style.top = doc[1] - offsetHeight + "px");

    }

}