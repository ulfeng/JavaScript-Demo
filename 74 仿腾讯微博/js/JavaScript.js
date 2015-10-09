/*----------------------- +
获取id,class,tagName
 +---------------------- */
var get = {
    byId: function (id) {
        return typeof id === "string" ? document.getElementById(id) : id;
    },
    byClass: function (sClass, oParent) {
        var aClass = [];
        // RegExp()对象用于存储检索模式，有三个方法：test(),exec(),compile()
        var reClass = new RegExp("(^|)" + sClass + "(|$)");
        var aElem = this.byTagName("*", oParent);
        // test() 方法检索字符串中的指定值
        for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
        return aClass;
    },
    byTagName: function (elem, obj) {
        return (obj || document).getElementsByTagName(elem);
    }
};

/*-------------------------- +
事件绑定，删除
+-------------------------- */
var EventUtil = {
    addHandler: function (oElement, sEvent, fnHandler) {
        oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function () { oElement["_" + sEvent + fnHandler]() }, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
    },
    removeHandler: function (oElement, sEvent, fnHandler) {
        oElement.removeEventLister ? oElement.removeEventLister(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
    },
    addLoadHandler: function (fnHandler) {
        this.addHandler(window, "load", fnHandler)
    }
};

/*-------------------- +
设置css样式
读取css样式
+-------------------- */
function css(obj, attr, value) {
    switch (arguments.length) {
        case 2:
            if (typeof arguments[1] == "object") {
                for (var i in attr) i == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + attr[i] + ")", obj.style[i] = attr[i] = attr[i] / 100) : obj.style[i] = attr[i];
            }
            else {
                // 获取计算后的样式，currentStyle for IE、Opera,getComputedStyle for FF、Chrome、Sarfri
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
            }
            break;
        case 3:
            attr == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + value + ")", obj.style[attr] = value / 100) : obj.style[attr] = value;
            break;
    }
};

EventUtil.addLoadHandler(function () {
    var oMsgBox = get.byId("msgBox");
    var oUserName = get.byId("userName");
    var oConBox = get.byId("conBox");
    var oSendBtn = get.byId("sendBtn");
    var oMaxNum = get.byClass("maxNum")[0];
    var oCountTxt = get.byClass("countTxt")[0];
    var oList = get.byClass("list")[0];
    var oUl = get.byTagName("ul", oList)[0];
    var aLi = get.byTagName("li", oList);
    var aFtxt = get.byClass("f-text".oMsgBox);
    var aImg = get.byTagName("img", get.byId("face"));
    var bSend = false;
    var timer = null;
    var oTmp = "";
    var i = 0;
    var maxNum = 140;

    // 禁止表单提交
    EventUtil.addHandler(get.byTagName("form", oMsgBox)[0], "submit", function () { return false });

    // 为广播按钮绑定发送事件
    EventUtil.addHandler(oSendBtn, "click", fnSend);

    // 为Ctrl+Enter快捷键绑定发送事件
    EventUtil.addHandler(document, "keyup", function (event) {
        var event = event || window.event;
        event.ctrlKey && event.keyCode == 13 && fnSend();
    });

    // 发送广播函数
    function fnSend() {
        var reg = /^\s*$/g;
    }




})