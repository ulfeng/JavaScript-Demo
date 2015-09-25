var get = {
    byId: function (id) {
        return document.getElementById(id);
    },
    byClass: function (sClass, oParent) {
        var aClass = [];
        var reClass = new RegExp("(^|)" + sClass + "(|$)");
        var aElem = this.byTagName("*", oParent);
        for (var i = 0; i < aElem.length; i++) {
            reClass.test(aElem[i].className) && aClass.push(aElem[i]);
            return aClass;
        }
    },
    byTagName: function (elem, obj) {
        return (obj || document).getElementsByTagName(elem);
    }
};

window.onload = function () {
    var oNav = get.byId("nav");
    var aLi = get.byTagName("li", oNav);
    var aSubNav = get.byClass("subnav", oNav);
    var oSubNav = oEm = time = null;
    var i = 0;

    for (i = 1; i < aLi.length; i++) {
        aLi[i].onmouseover = function () {
            // 隐藏所有子菜单
            for (i = 0; i < aSubNav.length; i++) {
                aSubNav[i].style.display = "none";
            }
        }

        

    }

}
