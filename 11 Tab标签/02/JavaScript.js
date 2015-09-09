window.onload = function () {
    var box = document.getElementById("box");
    var input = box.getElementsByTagName("input");
    var div = box.getElementsByTagName("div");

    for (var i = 0; i < input.length; i++) {
        input[i].index = i;
        input[i].onclick = function () {
            for (var i = 0; i < input.length; i++) {
                input[i].className = "";
                div[i].style.display = "none";
            };
            this.className = "active";
            div[this.index].style.display = "block";
        }
    }
}