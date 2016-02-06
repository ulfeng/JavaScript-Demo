define([
    'jquery',
    'globalVideo',
    'Loader'
    ],function($,globalVideo,Loader){

        var page={};

        page.subItems=[];
        page.subIndex=0;

        page.index=1;
        page.content=$("#roleTemplate").html();  
        page.imgLoadStatus;
        page.name="role";
        page.loader=new Loader(page);
        page.init=function(){
                   
            reset();
            
        }

        page.moveIn=function(){
            reset();

            $(".m-page-role .role").hover(function(){
                var txt=$(this).find(".txt");
                var p=$(this).find(".txt p");

                TweenMax.to($(".role .txt p"),.5,{opacity:0,top:-100}); 
                TweenMax.to($(".role .txt"),.5,{opacity:0}); 
                TweenMax.to($(".role"),.5,{opacity:.4});  
                TweenMax.to($(this),.5,{opacity:1}); 
                TweenMax.to(txt,.5,{opacity:1});  
                TweenMax.to(p,.5,{opacity:1,top:10});  
            },function(){
                TweenMax.to($(".role .txt p"),.5,{opacity:0,top:-100}); 
                TweenMax.to($(".role .txt"),.5,{opacity:0}); 
                TweenMax.to($(".role"),.5,{opacity:1}); 
            })
            
            //-74px         
            TweenMax.to($(".rhombus"),.5,{opacity:1,top:"50%"});
            TweenMax.to($(".rhombus .h1"),.5,{opacity:1,delay:.2});
            TweenMax.to($(".rhombus .h2"),.5,{opacity:1,delay:.3});
            TweenMax.to($(".rhombus .line"),.5,{opacity:1,delay:.4});
            TweenMax.staggerTo([$(".role-3"),$(".role-2"),$(".role-1")],.5,{bottom:-74,opacity:1,ease: Expo.easeOut,scale:1,delay:.5},0.1);
            TweenMax.staggerTo([$(".role-4"),$(".role-5"),$(".role-6")],.5,{bottom:-74,opacity:1,ease: Expo.easeOut,scale:1,delay:.5},0.1);
            $(".g-pageCnt .m-page-role .videoCnt").html('<video src="http://v.tianyu.netease.com/2015/0511/bg/fire.mp4" autoplay loop></video><div class="videoBlack"></div>');
            TweenMax.set($(".m-page-role .videoCnt"), {opacity:0});
            TweenMax.to($(".m-page-role .videoCnt"),.5,{opacity:1,delay:1});
            globalVideo.playVoice(3);
            pgcheck_code("page=feature&btn=role","到达职业");

        }

        page.moveOut=function(){
            reset();
            $(".m-page-role .videoCnt").empty();
        }

        function reset(){
            TweenMax.set($(".role"), {bottom:-100, opacity:0,scale:.2});
            TweenMax.set($(".rhombus"), {opacity:0,top:"60%"});
            TweenMax.set($(".rhombus .h1"),{opacity:0});
            TweenMax.set($(".rhombus .h2"),{opacity:0});
            TweenMax.set($(".rhombus .line"),{opacity:0});
            TweenMax.set($(".role .txt"),{opacity:0}); 
            TweenMax.set($(".role .txt p"),{opacity:0,top:-100});   
        }

        return page;

})