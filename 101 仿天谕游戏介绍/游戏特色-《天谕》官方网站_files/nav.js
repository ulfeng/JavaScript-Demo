define([
    'jquery'
    ],function($,scrollUtils){
        var navItems = ["首页","简史","职业","形象","大陆","飞行","战斗","帮会","生活"];
        var nav = {};
        var tl = new TimelineMax();
        var navIndexArray=[4,14,24,34,44,54,64,74,84];
        var navOrien = {
            targetNum: 5,
            currentNum: 0
        };

        nav.init = function(){
            // insertUI();
            // animationInit();
            // bindEvent();
            navOrien.roll = function () {
                var _navOrien = navOrien;
                if (_navOrien.targetNum > _navOrien.currentNum) {
                    _navOrien.currentNum++;
                    setTimeout(_navOrien.roll, 50);
                
                } else if (_navOrien.targetNum < _navOrien.currentNum) {
                    _navOrien.currentNum--;
                    setTimeout(_navOrien.roll, 50);
                }

                $('.lineCnt .line').removeClass('red');
                var cn=_navOrien.currentNum;
                for (var i = cn - 4, l = cn + 4, j = -4; i <=l; i++, j++) {
                    var $line = $('.lineCnt .line:eq(' + i + ')');
                    $line.width(-1 * Math.abs(j) * 10 + 50).addClass('red');
                }
            };
            // nav.navTo(0);
        }

        nav.navTo = function(num){
            navOrien.targetNum=navIndexArray[num];
            navOrien.roll();
            $(".navItem").removeClass("active");
            $(".navItem").eq(num).addClass("active");
            // tl.tweenTo("item"+num,{ease:Strong.easeOut});
        }

        function insertUI(){
            var navHtml='';
            for(var i =0; i<navItems.length;i++){
                navHtml+='<span class="navItem navItem'+i+'">'+navItems[i]+'</span>';
            }
            $(".navNameCnt").html(navHtml);
            navHtml='';
            for(i=0;i<navItems.length;i++){
                navHtml+='<span></span>';
                navHtml+='<span></span>';
                navHtml+='<span></span>';
                navHtml+='<span class="long" data-index="'+i+'"></span>';
                navHtml+='<span></span>';
                navHtml+='<span></span>';
                navHtml+='<span></span>';
            }
            $('.lineCnt').html(navHtml);
        }

        function animationInit(){
            $(".lineCnt span").each(function(index){
                var element=$(this);                
                if(element.hasClass("long")){
                    tl.add( TweenMax.to(element, .2, {width:45,backgroundColor:"#b2150d"}),"-=0.6");
                    tl.addLabel("item"+element.attr("data-index"));
                    tl.add( TweenMax.to(element, .2, {width:18,backgroundColor:"#998867"}));                         
                }else{
                    tl.add( TweenMax.to(element, .2, {width:30,backgroundColor:"#b2150d"}),"-=0.6");
                    tl.add( TweenMax.to(element, .2, {width:12,backgroundColor:"#998867"}));                                 
                }           
                 
            })
            
            tl.seek("item0");
            tl.pause();
        }

        function bindEvent(){
            // $(".navItem").click(function(){
            //    var num=$(this).index();
            //    nav.navTo(num);
            // })
        }

        return nav;
    }
 );