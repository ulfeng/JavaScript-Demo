define([
    'jquery',
    'require',
    'globalVideo',
    'Loader'
    ],function($,require,globalVideo,Loader){

        var page={};

        page.subItems=[];

        page.index=0;

        page.content=$("#figureTemplate").html(); 
        var curentFigureFemale=1;
        var curentFigureMale=1;
        var isMoving=false;
        var tl;
        var tl2;
        var ismale=false;
        var scrollUtils;
        page.imgLoadStatus;
        page.name="figure";
        page.loader=new Loader(page);
        page.init=function(){
            TweenMax.set($(".male"),{alpha:0});      
            TweenMax.set($(".model"),{height:0});
            TweenMax.set($(".model1"),{height:"100%"});  
            scrollUtils=require("scrollUtils");
            $(".figureTips").hide();
            TweenMax.set($(".gender .slideBg"),{top:38});

            $(window).resize(function(){
                var scale=228/960;
                var width=scale*$(".figureRightPart").width();
                var height=786/228*width;
                $(".female").css({'width':width,"height":height,"top":-height/2,"left":-width/2});
                $(".female .modelBg").css({'width':width,"height":height});

                scale=421/960;
                width=scale*$(".figureRightPart").width();
                height=786/421*width;
                $(".male").css({'width':width,"height":height,"top":-height/2,"left":-width/2});
                $(".male .modelBg").css({'width':width,"height":height});
            })
            $(window).resize();
            
        }

        page.moveIn=function(){

            globalVideo.playVoice(0);
            $(".femaleBtn").click(function(event){
                event.stopPropagation();
                toFemale();                
            })

            $(".maleBtn").click(function(event){
                event.stopPropagation();
                toMale();                
            })

            $(".figureVideoBtn").click(function(event){
                event.stopPropagation();
                globalVideo.openGlobalVideo("http://v.tianyu.netease.com/2015/0520/figure.mp4");
            })

            $(".m-page-figure").click(function(){
                if(isMoving){
                    return;
                }
                isMoving=true;
                var oldIndex;
                if(!ismale){
                  oldIndex=curentFigureFemale;
                  curentFigureFemale++;
                  if(curentFigureFemale>=5){
                      curentFigureFemale=1;
                  }
                  $(".female .model"+oldIndex).removeClass("bottom top").addClass("bottom");
                  $(".female .model"+oldIndex).find(".modelBg").removeClass("bottom top").addClass("bottom");
                  $(".female .model"+curentFigureFemale).removeClass("bottom top").addClass("top");
                  $(".female .model"+curentFigureFemale).find(".modelBg").removeClass("bottom top").addClass("top");
                  TweenMax.to($(".female .model"+oldIndex),1,{height:"0"});
                  TweenMax.to($(".female .model"+curentFigureFemale),1,{height:"100%",onComplete:function(){
                    isMoving=false;
                  }});
                }else{
                    oldIndex=curentFigureMale;
                    curentFigureMale++;
                    if(curentFigureMale>=5){
                       curentFigureMale=1;
                    }
                    $(".male .model"+oldIndex).removeClass("bottom top").addClass("bottom");
                    $(".male .model"+oldIndex).find(".modelBg").removeClass("bottom top").addClass("bottom");
                    $(".male .model"+curentFigureMale).removeClass("bottom top").addClass("top");
                    $(".male .model"+curentFigureMale).find(".modelBg").removeClass("bottom top").addClass("top");
                    TweenMax.to($(".male .model"+oldIndex),1,{height:0});
                    TweenMax.to($(".male .model"+curentFigureMale),1,{height:"100%",onComplete:function(){
                        isMoving=false;
                    }});
                }
                pgcheck_code("page=feature&btn=figureScreen","特色形象全屏点击");
            })

            $(".changeClothingBtn").click(function(){
                pgcheck_code("page=feature&btn=figureBtn","特色形象按钮点击");
            })

            
            pgcheck_code("page=feature&btn=figure","到达形象");
        }

        function hideTips(){
            $(".figureTips").fadeOut();
        }

        page.moveOut=function(){
            $(".figureTips").hide();
            TweenMax.set($(".female .model"),{height:0});
            TweenMax.set($(".female .model1"),{height:"100%"});
            curentFigureFemale=1;
            curentFigureMale=1;
            TweenMax.set($(".male"),{alpha:0});      
            TweenMax.set($(".model"),{height:0});
            TweenMax.set($(".model1"),{height:"100%"}); 
            TweenMax.set($(".female"),{alpha:1});
            TweenMax.set($(".male"),{alpha:0});
            ismale=false;
            $(".maleBtn").removeClass("active");
            $(".femaleBtn").addClass("active");
            TweenMax.to($(".gender .slideBg"), .4, {top:38});
            $(".m-page-figure").unbind("click");
             TweenMax.set($(".gender .slideBg"),{top:38});
        }       

        function toMale(){
            $(".maleBtn").addClass("active");
            $(".femaleBtn").removeClass("active");
            TweenMax.to($(".gender .slideBg"), .4, {top:3});
            TweenMax.to($(".female"), 1, {alpha:0});
            TweenMax.to($(".male"), 1, {alpha:1});
            ismale=true;

        }

        function toFemale(){
            TweenMax.to($(".gender .slideBg"), .4, {top:38});
            $(".maleBtn").removeClass("active");
            $(".femaleBtn").addClass("active");
            TweenMax.to($(".female"), 1, {alpha:1});
            TweenMax.to($(".male"), 1, {alpha:0});
            ismale=false;

        }

        function changePoint(i){
            $(".figureFocus .fpoint").removeClass("active");
            $(".figureFocus .fpoint").eq(i).addClass("active");
            $(window).unbind("resize");
        }

        return page;

})