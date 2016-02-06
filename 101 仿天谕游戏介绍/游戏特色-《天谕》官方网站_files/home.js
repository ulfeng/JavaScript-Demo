define([
    'jquery',
    'globalVideo',
    'Loader'
    ],function($,globalVideo,Loader){

        var page={};

        page.subItems=[];

        page.index=0;

        page.content=$("#homeTemplate").html(); 
        var maskShow=true;
        page.imgLoadStatus;
        page.name="home";
        page.loader=new Loader(page);
        page.init=function(){
  
        }

        page.moveIn=function(){
            globalVideo.playVoice(1);
            TweenMax.to($(".m-page-home"),1,{alpha:1,ease:Power4.easeOut});
            $(".m-page-home .mask").click(function(){
                if(maskShow){
                    TweenMax.to($(this),1,{scale:1,alpha:0,ease:Power4.easeOut});
                    TweenMax.to($(".mouseCnt"),1,{alpha:0});
                    TweenMax.to($(".m-page-home .intro"),1,{alpha:0}); 
                    maskShow=false;
                }else{
                    TweenMax.to($(this),1,{alpha:1,delay:.4,ease:Power4.easeOut});
                    TweenMax.to($(".mouseCnt"),1,{alpha:1});
                    TweenMax.to($(".m-page-home .intro"),1,{alpha:1}); 
                    maskShow=true;
                }
                               
            })
            pgcheck_code("page=feature&btn=home","到达首页");
        }

        page.moveOut=function(){
            TweenMax.set($(".mouseCnt"),{alpha:1});
            TweenMax.set($(".m-page-home .intro"),{alpha:1}); 
            $(".m-page-home .mask").unbind("click");
        }

        return page;

})