define([
    'jquery',
    'require',
    'globalVideo',
    'Loader'
    ],function($,require,globalVideo,Loader){

        var page={};

        page.subItems=[];

        page.index=0;

        page.content=$("#historyTemplate").html();
        var pageIndex=2;
        var global;
        var scrollUtils;
        var isFliping=false;
        page.imgLoadStatus;
        page.name="history";
        page.loader=new Loader(page);
        page.init=function(){
            global=require('global');
            scrollUtils=require("scrollUtils");
            TweenMax.set($(".magazine"),{opacity:0});
        }

        page.moveIn=function(){
            pageIndex=2;
            $('.g-pageCnt .magazine').turn({
                display: 'double',
                acceleration: true,
                gradients: true,
                elevation:500,
                page:2,
                duration:1500,
                when: {
                    turning: function(event, page, pageObject) {
                        isFliping=true;   
                    },
                    turned: function(e, page) {
                        isFliping=false;   
                        // $(window).resize();                     
                    }
                }
            });
            TweenMax.to($(".g-pageCnt .magazine"),.5, {opacity:1});

            $(window).resize(function(){
                resize();
                isFliping=false;
            })

            function resize(){
                $('.g-pageCnt .magazine').turn("size",$(window).width(),$(window).height());
                var scale=389/960;
                var width=Math.floor(scale*$(window).width()/2);
                var height=Math.floor(218/389*width);
                $(".pageVideoBtn").css({'width':width,"height":height,"left":$(window).width()/4-width/2});
                var totalHeight=height*3+20;
                var top=$(window).height()/2-totalHeight/2;
                $(".pageVideoBtn1").css({"top":top});
                top=height+top+10;
                $(".pageVideoBtn3").css({"top":top});
                top=height+top+10;
                $(".pageVideoBtn2").css({"top":top});
                scale=438/960;
                width=Math.floor(scale*$(window).width()/2);
                height=Math.floor(619/438*width);
                $(".videoBtn").css({'width':width,"height":height,"left":$(window).width()/4-width/2,"top":$(window).height()/2-height/2});
            }

            $(window).resize();

            $(".g-pageCnt .magazine").bind("start", function(event, pageObject, corner) {
              // if (corner=="tl" || corner=="tr"||corner=="bl"||corner=="br") {
                // event.preventDefault();
              // }
                resize();
            });

            $(".pageVideoBtn1,.pageVideoBtn2,.pageVideoBtn3").live("click",function(){

                if(isFliping){
                    return;
                }
                var index=$(this).index();              
                if(index==0){
                    $('.g-pageCnt .magazine').turn('page', 4);
                    pageIndex=3;
                }else if(index==1){
                    $(".g-pageCnt .magazine").turn('page',6);
                    pageIndex=4;
                }else if(index==2){
                    $(".g-pageCnt .magazine").turn('page',8);
                    pageIndex=5;
                }
                checkPageNum();
            })

            $(".prevBtn").click(function(){
                prev();
            })
            $(".nextBtn").click(function(){
                next();
            })
            function prev(){
                if(isFliping){
                    return;
                }
                if(pageIndex<=2){
                    scrollUtils.gotoPrev();
                    return;
                }
                pageIndex--;
                checkPageNum();
                $('.g-pageCnt .magazine').turn('previous');
            }
            function next(){
                if(isFliping){
                    return;
                }
                if(pageIndex>=5){
                    scrollUtils.gotoNext();
                    return;
                }
                pageIndex++;
                checkPageNum();
                $('.g-pageCnt .magazine').turn('next');
            }

            $(".g-pageCnt .m-page-history").mousewheel(function(event,detal){
                event.stopPropagation();
                if(detal>0){
                    prev();
                }else{
                    next();
                }
            })
            // checkPageNum();
            $(".prevBtn").hide();
            function checkPageNum(){
                $(".prevBtn").fadeIn();
                $(".nextBtn").fadeIn();
                if(pageIndex<=2){
                    $(".prevBtn").fadeOut();
                }
                if(pageIndex>=5){
                    $(".nextBtn").fadeOut();
                }
            }

            $(".videoBtn1").live('click',function(){
                globalVideo.openGlobalVideo("http://v.tianyu.netease.com/2015/0520/history3.mp4");
            })

            $(".videoBtn2").live('click',function(){
                globalVideo.openGlobalVideo("http://v.tianyu.netease.com/2015/0520/history1.mp4");
            })
            globalVideo.playVoice(2);
            pgcheck_code("page=feature&btn=faction","到达简史");
        }

        page.moveOut=function(){
            pageIndex=2;
            $(".prevBtn").unbind("click");
            $(".nextBtn").unbind("click");
            $(".pageVideoBtn1,.pageVideoBtn2,.pageVideoBtn3").unbind("click");
            $(".m-page-history").unbind("mousewheel");
            $('.g-pageCnt .magazine').turn("stop");            
            $('.g-pageCnt .magazine').turn("destroy");
            $(".prevBtn").hide();
            $(window).unbind('resize');
        }

        return page;

})