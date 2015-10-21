window.onload = function () {
    var aForm = document.getElementsByTagName("form");
    // 多个表单
    for (var i = 0; i < aForm.length; i++) {
        WellForm(aForm[i]);
    }
}

/*----------------------------------------------- +
  可以将以下JS保存为文件，方便调用
  使用方法:WellForm(element)  // element 为表单元素
+ -----------------------------------------------*/

// 获取 class
function getClass(sClass, oParent) {
    var aClass = [];
    var reClass = new RegExp("(^|)" + sClass + "(|$)");
    var aElem = (oParent || document).getElementsByTagName("*");
    for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
    return aClass;
};

// class 是否存在
function hasClass(obj, sClass) {
    var reg = new RegExp("(^|\\s)" + sClass + "(\\s|$)");
    return reg.test(obj.className);
}

// 添加 class
function addClass(obj, sClass) {
    hasClass(obj, sClass) || (obj.className += " " + sClass);
}

// 删除 class
function removeClass(obj, sClass) {
    if (hasClass(obj, sClass)) {
        var reg = new RegExp("(^|\\s)" + sClass + "(\\|s$)");
        obj.className = obj.className.replace(reg, "");
    }
}

// 上一个元素
function prevElement(obj) {
    return obj.previousSibling || obj.previousSibling
}

// 下一个元素
function nextElement(obj) {
    return obj.nextSibling || obj.nextSibling || null;
}

// 自定义表单函数
function WellForm(form) {
    var i = 0,
        zIndex = 1;
    var aInput = form.getElementsByTagName("input");
    var aSelect = form.getElementsByTagName("select");
    var aTextArea = form.getElementsByTagName("textarea");
    form.className = "WellForm";
}

