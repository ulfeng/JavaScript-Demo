window.onload = function () {
    var oBut = document.getElementById('list');
    var oTop = document.getElementById('top');

    var aLi = oBut.getElementsByTagName('li');
    var aA = oBut.getElementsByTagName('a');
    var oTli = oTop.getElementsByTagName('li');

    var aP = getClass(oBut, 'b_tit');
    var oSmall = getClass(oTop, 'small')[0];

    var i = iNow = 0;
    var timer = null;
    var aSort = [];
    var aPosition = [
        { width: 344, height: 440, top: 0, left: 352, zIndex: 10 },
        { width: 260, height: 332, top: 56, left: 148, zIndex: 8 },
        { width: 204, height: 260, top: 92, left: 0, zIndex: 6 },
        { width: 140, height: 180, top: 132, left: 148, zIndex: 4 },
        { width: 110, height: 140, top: 172, left: 232, zIndex: 2 },
        { width: 110, height: 140, top: 172, left: 708, zIndex: 2 },
        { width: 140, height: 180, top: 132, left: 770, zIndex: 4 },
        { width: 204, height: 260, top: 92, left: 844, zIndex: 6 },
        { width: 260, height: 332, top: 56, left: 640, zIndex: 8 },
    ]
    for (i = 0; i<oTli.length; i++){
        oTli[i].index = i;
    }
}
// 
function getClass(oParent, sClass) {
    var aElem = document.getElementsByName('*');
    var aClass = [];
    var i = 0;
    for (i = 0; i < aElem.length; i++) if (aElem[i].className == sClass) aClass.push(aElem[i]);
    return aClass;
}

// #top li
function myAddEvent(obj, sEvent, fn) {
    if (obj.attachEvent) {
        obj.attachEvent('on' + sEvent, function () {
            fn.call(obj);
        });
    }
    else {
        obj.addEventListener(sEvent, fn, false);
    }
}