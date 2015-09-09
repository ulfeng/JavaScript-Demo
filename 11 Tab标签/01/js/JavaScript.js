
// jquery 实现方法
//$(document).ready(function () {
//    var $li = $(".container .mh li");
//    var $tab_main = $(".container .mc .main");

//    $li.mouseover(function () {
//        var $this = $(this);
//        var $index = $this.index();
//        $li.removeClass();
//        $this.addClass("tab_selected");

//        $tab_main.css("display", "none");
//        $tab_main.eq($index).css("display", "block");
//    })
//})

// js 实现方法
    var tabs = document.getElementById("tab").getElementsByTagName("li");
    var divs = document.getElementById("mc").getElementsByTagName("div");
    for (var i = 0; i < tabs.length; i++) {
        // tabs[i].onclick = function () { change(this);}
        tabs[i].onmouseover = function () { change(this); }
    }

function change(obj) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i] == obj) {
            tabs[i].className = "tab_selected";
            divs[i].className = "main_selected";
        }
        else {
            tabs[i].className = "";
            divs[i].className = "";
        }
    }
}














//var li_item = GetObj(".container .mh li");
//var main_item = GetObj(".container .mc .main");

//li_item.onmouseover = function () {
//    var li_this = GetObj(this);
//    var q = li_this.index();
//    li_item.removeClass();
//    li_this.addClass();

//    main_item.style.display = "none";
//    main_item.eq(q).style.display = "block";
//}

// 获得指定对象
//function GetObj(objName) {
//    if (document.getElementById) {
//        return eval("document.getElementById('" + objName + "')");
//    }
//    else {
//        return eval("document.all."+objName)
//    }
//}

//function hasClass(obj, cls) {
//    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
//}

//function addClass(obj, cls) {
//    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
//}

//function removeClass(obj, cls) {
//    if (hasClass(obj, cls)) {
//        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
//        obj.className = obj.className.replace(reg, ' ');
//    }
//}


