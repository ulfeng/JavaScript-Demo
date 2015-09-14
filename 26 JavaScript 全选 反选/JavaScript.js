function gehang() {
    // 获取tr节点
    var tr = document.getElementsByTagName("tr");
    // 为第一行添加背景颜色
    tr[0].style.background = "#00FF66";
    // 为最后一行添加背景颜色
    tr[tr.length - 1].style.background = "#00FF66";
}

// 创建全选反选函数
function xuan(type) {
    // 获取name值
    var qcheck = document.getElementsByName("check[]");
    // 获取选的按钮
    if (type == "qx") {
        for (var i = 0; i < qcheck.length; i++) {
            qcheck[i].check = true;
        }
    }

    // 获取反选按钮
    if (type == "fx") {
        for (var i = 0; i < qcheck.length; i++) {
            qcheck[i].checked = false;
        }
    }

    // 取消全选
    if (type == "qxx") {
        for (var i = 0; i < qcheck.length; i++) {
            if (qcheck[i].checked) {
                qcheck[i].checked = false;
            }
            else {
                qcheck[i].checked = true;
            }
            
        }
    }
}

function del() {
    var input = document.getElementsByName("check[]");
    for (var i = input.length; i >= 0; i--) {
        if (input[i].checked == true) {
            // 获取td节点
            var td = input[i].parentNode;
            // 获取tr节点
            var tr = td.parentNode;
            // 获取table
            var table = tr.parentNode;s
            // 移除子节点
            table.removeChild(tr);
        }
    }
}