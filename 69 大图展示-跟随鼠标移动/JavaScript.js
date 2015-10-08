window.onload = function () {
    var aLi = document.getElementsByTagName("li");
    var oBig = document.getElementById("big");
    var oLoading = oBig.getElementsByTagName("div")[0];
    var i = 0;

    for (i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        // 鼠标划过，预加载图片插入容器并显示
        aLi[i].onmouseover = function () {
            var oImg = document.createElement("img");
            // 图片预加载
            var img = new Image();
            img.src = oImg.src = aLi[this.index].getElementsByTagName("img")[0].src.replace(".jpg", "_big.jpg");
            oBig.appendChild(oImg);
            // 鼠标移过样式
            this.className = "active";
            // 显示big


        }

    }





}