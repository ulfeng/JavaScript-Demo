// 方法1
window.onload = function () {
    var sumBtn = document.getElementById("sumBtn");
    var oInput = document.getElementsByTagName("input")[0]
	oInput.onkeyup = function ()
	{
		this.value = this.value.replace(/[^(\d)|(,)]/, "")   // 将不为数字的替换为空
	}
    
    sumBtn.onclick = function () {
        var sum = 0;
        var arr = document.getElementById("num").value.split(",");
        this.value = this.value.replace(/[^(\d)|(,)]/,"")
        for (var i in arr) {
            sum += Number(arr[i]);
        }
        
        alert(sum);
    }
}

// 方法2
//window.onload = function () {
//    var oDiv = document.getElementById("container");
//    oDiv.onmouseover = function () {
//        oDiv.className = "hover";
//    };
//    oDiv.onmouseout = function () {
//        oDiv.className = "";
//    }
//}