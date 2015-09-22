// 方法1
window.onload = function () {
    var aSelect = document.getElementById("allSelect");
    var fSelcet = document.getElementById("fSelect");
    var oInput = document.getElementsByTagName("input");

    function isCheckAll() {
        for (var i = 1, n = 0; i < oInput.length; i++) {
            oInput[i].checked && n++;
        }
        oInput[0].checked = n == oInput.length - 1;
        aSelect.innerHTML = oInput[0].checked ? "全不选" : "全选";
    };

    // 全选/全不选
    aSelect.onclick = function () {
        for (var i = 0; i < oInput.length; i++) {
            oInput[i].checked = this.checked;
        }
        isCheckAll();
    }
}

// 方法2：

