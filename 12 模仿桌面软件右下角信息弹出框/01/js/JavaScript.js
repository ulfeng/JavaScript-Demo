// 添加事件响应函数
function addEventSimple(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}

addEventSimple(window, "load", initMessage);
addEventSimple(window, "load", start);

var messageHeight = 200;
var messageWidth = 200;
var messageHeight1 = 0;
var messageWidth1 = 0;
var messageBox;
messageBox = document.createElement("box");
messageBox.style.position = "fixed";
messageBox.style.border = "1px solid #222";
messageBox.style.height = messageHeight + "px";
messageBox.style.width = messageWidth + "px";
messageBox.style.bottom = "0";
messageBox.style.right = "0";
var str = "<h2>实例消息</h2>";
str += "<p><a href='http://www.baidu.com'>我是弹出消息的内容。</a></p>";

// 显示信息
function initMessage() {
    messageBox.innerHTML = str;
    document.body.appendChild(messageBox);
}

function boxFadeOut() {
    messageHeight = 0;
    messageWidth = 0;
    alert("xx");
}

function start() {
    setTimeout("boxFadeOut()", 5000);
}
