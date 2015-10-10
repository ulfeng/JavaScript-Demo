window.onload = function () {
    var oBox = document.getElementById("box");
    var oList = oBox.getElementsByTagName("ul")[0];
    var aImg = oBox.getElementsByTagName("img");
    var timer = playTimer = null;
    var index = i = 0;
    var bOrder = true;
    var aTmp = [];
    var aBtn = null;

    // 生成数字按钮
    for (i = 0; i < aImg.length; i++) aTmp.push("<li>" + (i + 1) + "</li>");

    // 插入元素
    var oCount = document.createElement("ul");
    oCount.className = "count";
    oCount.innerHTML = aTmp.join("");  // join方法把数组中数据，放入一个字符串中
    oBox.appendChild(oCount);  // appendChild() 向节点添加最后一个节点对象
    aBtn = oBox.getElementsByTagName("ul")[1].getElementsByTagName("li");

    // 初始化状态
    cutover();

    // 按钮点击切换
    for (i = 0; i < aBtn.length; i++) {
        aBtn[i].index = i;
        aBtn[i].onmouseover = function () {
            index = this.index;
            cutover();
        }
    }

    function cutover() {
        for (i = 0; i < aBtn.length; i++) aBtn[i].className = "";
        aBtn[index].className = "current";
        startMove(-(index * aImg[0].offsetHeight));
    }

    function next() {
        bOrder ? index++ : index--;
        index <= 0 && (index = 0, bOrder = true);
        index >= aBtn.length - 1 && (index = aBtn.length - 1, bOrder = false);
        cutover();
    }

    playTimer = setInterval(next, 3000);

    // 鼠标移入展示区停止自动播放
    oBox.onmouseover = function () {
        clearInterval(playTimer);
    }

    // 鼠标离开展示区开始自动播放
    oBox.onmouseout = function () {
        playTimer = setInterval(next, 3000);
    }

    function startMove(iTarget) {
        clearInterval(timer);
        timer = setInterval(function () {
            doMove(iTarget)
        },30)
    }

    function doMove(iTarget) {
        var iSpeed = (iTarget - oList.offsetTop) / 10;
        // ceil() 上舍入  floor()下舍入
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        oList.offsetTop == iTarget ? clearInterval(timer) : oList.style.top = oList.offsetTop + iSpeed + "px";
    }

}