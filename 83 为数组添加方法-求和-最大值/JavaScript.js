// 求和
Array.prototype.sum = function () {
    var i,
        sum = 0;
    for (i = 0; i < this.length; i++) {
        sum += parseInt(this[i]);
    }
    return sum;
};

// 求最大值
Array.prototype.maxima = function () {
    for (var i = 0, maxValue = Number.MIN_VALUE; i < this.length; i++) {
        //if (parseInt(this[i]) > maxValue) {
        //    maxValue = this[i];
        //}
        parseInt(this[i]) > maxValue && (maxValue = this[i]);
    }
    return maxValue;
}

var arr = [-1, -2, "fsdafds"];
alert(arr.join("+") + " = " + arr.sum());

// alert("数组中的最大值是: " + arr.maxima());