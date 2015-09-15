// 1、参数说明：
// city: 城市;
// offset: 当地时间与格林维治标准时间(GMT)的时差，如北京东八区(localTime("BeiJing", "+8");)
// 2、部分城市与时区：
// 北京:localTime("BeiJing","+8");  伦敦:localTime("London", "+1"); 巴黎:localTime("Paris","+1");  柏林:localTime("Paris","+1");
// 华盛顿:localTime("Washington","-5"); 渥太华:localTime("Ottawa","-5");  东京:localTime("Tokyo", "+9");   孟买：localTime("Bombay", "+5.5");

function localTime(city, offset) {    // 创建函数对象
    var d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);  // 格林维治标准时间(GMT)
    var nd = new Date(utc + (3600000 * offset));          // 通过(GMT)获得当地时间
    var day = nd.getDate();
    var month = nd.getMonth();
    var year = nd.getYear();
    var hours = nd.getHours(); 
    var min = nd.getMinutes();
    var sec = nd.getSeconds();
    var ap;                      // AM or PM
    if (year < 1000) {
        year += 1900
    }

    // 月份
    var monthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec");
    var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");

    // 闰年
    if (year % 4 == 0) {
        monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    }

    // 平年
    if (year % 100 == 0 && year % 400 != 0) {
        monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    }

    // 星期
    var weekday = new Array("Sun","Mon","Tues","Wed","Thur","Fri","Sat");
    var weekToday = weekday[nd.getDay()];

    // 小时
    if (hours >= 24) {
        hours = hours - 24
        day -= -1
    }
    if (hours > 12 && hours < 24) {
        hours = "0" + hours - 12;
        ap = "PM";
    } else {
        ap = "AM";
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (hours < 0) {
        hours -= -24
        day -= 1
    }   
    
    // 分钟
    if (min < 10) {
        min = "0" + min
    }

    // 秒
    if (sec < 10) {
        sec = "0" + sec
    }

    if (day <= 0) {
        if (month == 0) {
            month = 11
            year -= 1
        }
        else {
            month = month - 1
        }
        day = monthDays[month]
    }
    if (day > monthDays[month]) {
        day = 1
        if (month == 11) {
            month = 0
            year -= -1
        }
        else {
            month -= -1
        }
    }

    return city + " GMT" + offset + ":" + " " + hours + ":" + min + ":" + sec + " " + ap + " " + weekToday+", " + monthArray[month] + " " + day;
}
function worldClockZone() {     // localTime()函数调用
    document.getElementById("BeiJing").innerHTML = localTime("BeiJing", "+8");
    document.getElementById("London").innerHTML = localTime("London", "+1");
    document.getElementById("Bombay").innerHTML = localTime("Bombay", "+5.5");
    document.getElementById("Tokyo").innerHTML = localTime("Tokyo", "+9");
    setTimeout("worldClockZone()", 1000);     // 每一秒执行一次
}
window.onload = function () {
    worldClockZone();
};