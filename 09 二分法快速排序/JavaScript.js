window.onload = function () {
    var myArray = [5,3,8,10,80,73,65];
    quickSort(myArray);
    alert(myArray);
}

function quickSort(arr) {
    //if (arr.length <= 1) { return arr; }
    //var pivotIndex = Math.floor(arr.length / 2);  // floor() 向下取整函数
    // var pivot = arr.splice(pivotIndex, 1)[0];     // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
    //// 语法arrayObject.splice(index,howmany,item1,.....,itemX)
    //// var pivot = arr[pivotIndex];
    //var left = [];
    //var right = [];
    //for (var i = 0; i < arr.length; i++) {
    //    if (arr[i] < pivot) {
    //        left.push(arr[i]);
    //    }
    //    else {
    //        right.push(arr[i]);
    //    }
    //}
    //return quickSort(left).concat([pivot], quickSort(right));
    arr.sort(function (a, b) { return b - a;});
};



