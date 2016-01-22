$(function() {

    //美化select的统一调用
    if ($(".select").length != 0) {
        $(".select").each(function() {
            new SameSelect($(this));
        });
    }

});

//select 替换类
function SameSelect(obj) {
    this.obj = obj;
    this.opts = $("option", obj);
    this.top = $(".top", obj);
    this.btn = $(".btn", obj);
    this.lis = $("li", obj);
    this.load();
}

SameSelect.prototype = {
    constructor: this,
    load: function() {
        var _this = this;

        this.btn.click(function() {
            if (_this.obj.hasClass("select_hover")) {
                _this.hide();
            } else {
                _this.show();
            }
        });
        this.top.click(function() {
            if (_this.obj.hasClass("select_hover")) {
                _this.hide();
            } else {
                _this.show();
            }
        });
        this.lis.mouseover(function() {
            _this.lis.removeClass("hover");
            $(this).addClass("hover");
        });
        this.lis.each(function(num) {
            $(this).click(function() {
                _this.set(num);
            });
        });
        this.obj.mouseout(function() {
            _this.wait = setTimeout(function() {
                _this.hide();
            }, 2000000);
        });
        $("*", this.obj).mouseover(function() {
            if (!!_this.wait) {
                clearTimeout(_this.wait);
            }
        });
    },
    show: function() {
        var _this = this;
        //和top相同的li隐藏一下
        this.lis.show();
        this.lis.each(function() {
            if ($(this).html() == _this.top.html()) {
                $(this).hide();
            }
        });

        this.obj.addClass("select_hover");
    },
    hide: function() {
        this.obj.removeClass("select_hover");
    },
    set: function(num) {
        var _this = this;
        this.hide();
        this.top.html($(this.lis[num]).html());
        this.opts.removeAttr("selected");
        $(this.opts[num]).attr("selected", "selected");
    }
};

window.SameSelect = SameSelect;
//select 替换类
