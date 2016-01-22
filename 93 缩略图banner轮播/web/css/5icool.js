var foucsbox = function(time) {
    var time = time || 3500,
        $ = function(id) {
            return document.getElementById(id);
        },
        topCon = $('divimgplay'),
        big = $('divimginfog_imgPlayer'),
        samll = $('divpageinfog_imgPlayer'),
        nextPrev = $('focus_switch'),
        bigimgs = big.getElementsByTagName('li'),
        samllimgs = samll.getElementsByTagName('li'),
        slide = function(z) {
            samllimgs[lastIndex].className = '';
            samllimgs[z].className = 'current';
            bigimgs[lastIndex].style.display = 'none';
            bigimgs[z].style.display = 'block';
            lastIndex = i = z;
        },
        helper = function(z) {
            return function(e) {
                var na;
                if (!e) {
                    e = window.event;
                    na = e.srcElement.nodeName;
                } else {
                    na = e.target.nodeName;
                }
                if (na === 'IMG') {
                    slide(z);
                }
            }
        },
        lastIndex = i = 0,
        x, y = bigimgs.length,
        getPrevI = function(q) {
            return i - q < 0 ? y - q : i - 1;
        },
        getNextI = function(q) {
            return i + q >= y ? i + q - y : i + 1;
        }
    var s = setInterval(function() {
        slide(i);
        i = getNextI(1);
    }, time);
    
    for (x = 1; x < y; x += 1) {
        bigimgs[x].style.display = 'none';
    }
    for (x = 0; x < y; x += 1) {
        samllimgs[x].onmouseover = helper(x);
    }
    nextPrev.onclick = function(e) {
        i = lastIndex;
        var t;
        if (!e) {
            e = window.event;
            t = e.srcElement;
        } else {
            t = e.target;
        }
        switch (t.className) {
            case 'icon_prev':
                slide(getPrevI(1));
                break;
            case 'icon_next':
                slide(getNextI(1));
                break;
        }
    };
    // topCon.onmouseover = function() {
    //     clearInterval(s);
    // };
    // topCon.onmouseout = function() {
    //     s = setInterval(function() {
    //         slide(i);
    //         i = getNextI(1);
    //     }, time);
    // }; 
};
