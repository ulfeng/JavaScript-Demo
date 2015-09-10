
function checkLength() {
    var maxChars = 20;
    var text = document.getElementById("textArea").value;
    if (text.length > maxChars) {
        alert("您输入的字数超出了限制！");
        text = text.substring(0, maxChars);
        return false;
    }
    else {
        var cur = maxChars - text.length;
        document.getElementById("sy").innerHTML = cur.toString();
        return true;
    }
}
