
// placeholder 兼容性问题(IE6-9 or 其它低版本浏览器)
var JPlaceHolder = {
    // 判断浏览器是否支持 placeholder 
    _check: function () {
        return 'placeholder' in document.createElement('input');
    },
    init: function () {
        if (!this._check()) {
            this.fix();
        }
    },
    // 主体函数对象
    fix: function () {
        jQuery(':input[placeholder]').each(function (index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({ position: 'relative', zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({ position: 'absolute', left: pos.left + 70, height: h, color: '#fff', font: "bolder 17px/44px Arial" }).appendTo(self.parent());
            self.focusin(function (e) {
                holder.hide();
            }).focusout(function (e) {
                if (!self.val()) {
                    holder.show();
                }
            });
            holder.click(function (e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
// 函数调用
jQuery(function () {
    JPlaceHolder.init();
});