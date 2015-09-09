
// 图片抖动
function JumpObj(elem, range, startFunc, endFunc) {
    var curMax = range = range || 6;
    startFunc = startFunc || function () { };
    endFunc = endFunc || function () { };
    var drct = 0;
    var step = 1;

    init();

    function init() { elem.style.position = 'relative'; active() }
    function active() { elem.onmouseover = function (e) { if (!drct) jump() } }
    function deactive() { elem.onmouseover = null }

    function jump() {
        var t = parseInt(elem.style.top);
        if (!drct) motionStart();
        else {
            var nextTop = t - step * drct;
            if (nextTop >= -curMax && nextTop <= 0) elem.style.top = nextTop + 'px';
            else if (nextTop < -curMax) drct = -1;
            else {
                var nextMax = curMax / 2;
                if (nextMax < 1) { motionOver(); return; }
                curMax = nextMax;
                drct = 1;
            }
        }
        setTimeout(function () { jump() }, 200 / (curMax + 4) + drct * 4);
    }
    function motionStart() {
        startFunc.apply(this);
        elem.style.top = '0';
        drct = 1;
    }
    function motionOver() {
        endFunc.apply(this);
        curMax = range;
        drct = 0;
        elem.style.top = '0';
    }

    this.jump = jump;
    this.active = active;
    this.deactive = deactive;
}

// 视频弹出

