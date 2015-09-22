// 方法1
window.onload = function () {
    var oLi = document.getElementById("calendar").getElementsByTagName("li");
    var oNote = document.getElementById("note");
    var arr = ["1 月节日元旦：1月1日至3日放假三天。",
               "2 月节日元旦：1月1日至3日放假三天。",
               "3 月节日元旦：1月1日至3日放假三天。",
               "4 月节日元旦：1月1日至3日放假三天。",
               "5 月节日元旦：1月1日至3日放假三天。",
               "6 月节日元旦：1月1日至3日放假三天。",
               "7 月节日元旦：1月1日至3日放假三天。",
               "8 月节日元旦：1月1日至3日放假三天。",
               "9 月节日元旦：1月1日至3日放假三天。",
               "10 月节日元旦：1月1日至3日放假三天。",
               "11 月节日元旦：1月1日至3日放假三天。",
               "12 月节日元旦：1月1日至3日放假三天。"
    ];
    
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onmouseover = function () {
            for (var n = 0; n < oLi.length; n++) {
                oNote.innerHTML = arr[this.index];
            }
        }
    }
    
}

// 方法2：

