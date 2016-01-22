$(function () {
    // 活动时间字体弯曲
    $(".activity_date").arctext({ radius: 2500 });

    // 锤子
    var eggModel = function (e) {
        var n = $("#hammer"),
            l = $(".hit_egg").offset().left,
            d = $(".hit_egg").offset().top,
            a,
            t = $(".hit_egg .egg"),
            i = -1,
            r = -1,
            o = !1;
        s = $.map(t, function (e) {
            return {
                left: $(e).offset().left,
                top: $(e).offset().top,
                width: $(e).width(),
                height: $(e).height()
            }
        }),
        c = function (e, a) {
            for (var t = 0, n = s.length; n > t; t++) {
                var i = s[t];
                if (i.left < e && e < i.left + i.width && i.top < a && a < i.top + i.height) return t
            }
            return -1
        };

        $(".hit_egg").mousemove(function (e) {
            r = c(e.pageX, e.pageY),
            i != r && (a && clearTimeout(a), a = setTimeout(function () {
                -1 == r ? (t.removeClass("hover").removeClass("unhover"), n.hide()) : t.eq(r).addClass("hover").removeClass("unhover").siblings().removeClass("hover").addClass("unhover")
            },
            50), i = r),
            n.css({
                left: e.pageX - l,
                top: e.pageY - d,
             });
        }).mouseleave(function () {
            n.hide()
        }).mouseenter(function () {
            n.show()
        });
       
    }();

    // 鸡蛋/银弹/金蛋 可点击次数
    var normalCount = 30,
        silverCount = 10,
        goldCount = 1;

    // 鸡蛋点击事件
    $(".hit_egg .normal").click(function () {
        $("#hammer").css("display","none");
        if (normalCount > 0) {
            $(".normal").addClass("pt-normal-hit");
            $(".normal .img_1").addClass("pt-hammer");
            $(".normal .img_1").removeClass("hide");
            $(".normal .img_1").css("display", "block");

            setTimeout(function () {
                $(".normal .prize").addClass("show").removeClass("hide");
                $(".normal .hit_count").addClass("show").removeClass("hide");
                $(".hit_egg .normal").addClass("normal_hit");
            }, 500);

            setTimeout(function () {
                $(".hit_egg .normal").addClass("normal_hit_light");
            }, 1700)
            setTimeout(function () {
                $(".hit_egg .normal").removeClass("normal_hit_light");
            }, 1800)
            setTimeout(function () {
                $(".hit_egg .normal").addClass("normal_hit_light");
            }, 1900)
            setTimeout(function () {
                $(".hit_egg .normal").removeClass("normal_hit_light");
                $(".hit_egg .normal").addClass("normal_hit_crackle");
                $(".normal .prize").addClass("hide").removeClass("show");
                $(".normal .hit_count").addClass("hide").removeClass("show");
            }, 2000);

            setTimeout(function () {
                $(".normal").removeClass("pt-normal-hit");
                $(".normal").removeClass("normal_hit");
                $(".normal").removeClass("normal_hit_crackle");
                $(".normal .img_1").removeClass("pt-hammer");
                $(".normal .img_1").css("display", "none");
                $(".hit_egg .normal").addClass("normal_hit_over");
                $(".lottery").css("display", "block");
                $(".lottery").click(function () {
                    $(".lottery").css("display", "none");
                    $(".hit_egg .normal").removeClass("normal_hit_over");
                });

                normalCount -= 1;
                $("#normal_count").text(normalCount);

                $(".normal .prize").removeClass("hide");
                $(".normal .hit_count").removeClass("hide");
            }, 2500)
        }
        else {
            $(".tip_box").css("display", "block");
            $(".tip_box").click(function () {
                $(".tip_box").css("display", "none");
            })
        };
    })

    // 银蛋点击事件
    $(".silver").click(function () {
        $("#hammer").css("display", "none");
        if (silverCount > 0) {
            $(".silver").addClass("pt-silver-hit");
            $(".silver .img_1").addClass("pt-hammer");
            $(".silver .img_1").removeClass("hide");
            $(".silver .img_1").css("display", "block");

            setTimeout(function () {
                $(".silver .prize").addClass("show").removeClass("hide");
                $(".silver .hit_count").addClass("show").removeClass("hide");
                $(".hit_egg .silver").addClass("silver_hit");
            }, 500)

            setTimeout(function () {
                $(".hit_egg .silver").addClass("silver_hit_light");
            }, 1700)
            setTimeout(function () {
                $(".hit_egg .silver").removeClass("silver_hit_light");
            }, 1800)
            setTimeout(function () {
                $(".hit_egg .silver").addClass("silver_hit_light");
            }, 1900)
            setTimeout(function () {
                $(".hit_egg .silver").removeClass("silver_hit_light");
                $(".hit_egg .silver").addClass("silver_hit_crackle");
                $(".silver .prize").addClass("hide").removeClass("show");
                $(".silver .hit_count").addClass("hide").removeClass("show");
            }, 2000);

            setTimeout(function () {
                $(".silver").removeClass("pt-silver-hit");
                $(".silver").removeClass("silver_hit");
                $(".silver").removeClass("silver_hit_crackle");
                $(".silver .img_1").removeClass("pt-hammer");
                $(".silver .img_1").css("display", "none");
                $(".hit_egg .silver").addClass("silver_hit_over");
                $(".lottery").css("display", "block");
                $(".lottery").click(function () {
                    $(".lottery").css("display", "none");
                    $(".hit_egg .silver").removeClass("silver_hit_over")
                });
                silverCount -= 1;
                $("#silver_count").text(silverCount);
                $(".silver .prize").removeClass("hide");
                $(".silver .hit_count").removeClass("hide");
            }, 2500)
        }
        else {
            $(".tip_box").css("display", "block");
            $(".tip_box").click(function () {
                $(".tip_box").css("display", "none");
            })
        };
    })

    // 金蛋点击事件
    $(".gold").click(function () {
        $("#hammer").css("display", "none");
        if (goldCount > 0) {
            $(".gold").addClass("pt-gold-hit");
            $(".gold .img_1").addClass("pt-hammer");
            $(".gold .img_1").removeClass("hide");
            $(".gold .img_1").css("display", "block");

            setTimeout(function () {
                $(".gold .prize").addClass("show").removeClass("hide");
                $(".gold .hit_count").addClass("show").removeClass("hide");
                $(".hit_egg .gold").addClass("gold_hit");
            }, 500)

            setTimeout(function () {
                $(".hit_egg .gold").addClass("gold_hit_light");
            }, 1700)
            setTimeout(function () {
                $(".hit_egg .gold").removeClass("gold_hit_light");
            }, 1800)
            setTimeout(function () {
                $(".hit_egg .gold").addClass("gold_hit_light");
            }, 1900)
            setTimeout(function () {
                $(".hit_egg .gold").removeClass("gold_hit_light");
                $(".hit_egg .gold").addClass("gold_hit_crackle");
                $(".gold .prize").addClass("hide").removeClass("show");
                $(".gold .hit_count").addClass("hide").removeClass("show");
            }, 2000);

            setTimeout(function () {
                $(".gold").removeClass("pt-gold-hit");
                $(".gold").removeClass("gold_hit");
                $(".gold").removeClass("gold_hit_crackle");
                $(".gold .img_1").removeClass("pt-hammer");
                $(".gold .img_1").css("display", "none");
                $(".hit_egg .gold").addClass("gold_hit_over")
                $(".lottery").css("display", "block");
                $(".lottery").click(function () {
                    $(".lottery").css("display", "none");
                    $(".hit_egg .gold").removeClass("gold_hit_over")
                });

                goldCount -= 1;
                $("#gold_count").text(goldCount);

                $(".gold .prize").removeClass("hide");
                $(".gold .hit_count").removeClass("hide");
            }, 2500)
        }
        else {
            $(".tip_box").css("display", "block");
            $(".tip_box").click(function () {
                $(".tip_box").css("display", "none");
            })
        };
    })

});
