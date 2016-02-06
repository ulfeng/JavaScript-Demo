define([
    'jquery',
    'require',
    'globalVideo',
    'Loader'
    ],function($,require,globalVideo,Loader){

        var page={};

        page.subItems=[];
        page.subIndex=0;
        page.index=3;
        var currentFrame=0;
        var oldFrame=0;
        var movieClip;
        var isMoving=false;
        page.flyState="start";
        var timer;
        var switchBtn=1;
        var image=new Image; 
        page.imagesList=[];
        var currentLoadedNum=0;
        var global;
        var btnIsShow=false;
        var flyTitleCntIsShow=false;
        var currentIndex=1;
        var oldIndex=1;
        var isMousewheel=false;
        page.content=$("#flyTemplate").html();
        page.imgLoadStatus;
        page.name="fly";
        page.loader=new Loader(page);
        for(var i=1;i<=43;i++){
            page.imagesList.push('http://res.nie.netease.com/tianyu/qt/15/feature_0511/images/fly/frames3/'+i+'.jpg');
            // page.imagesList.push('images/fly/frames3/'+i+'.jpg');
        }
        page.init=function(){       

            TweenMax.set($(".wing"),{opacity:0});
            TweenMax.set($(".wing1"),{opacity:1});
            TweenMax.set($(".sw .swNum"),{opacity:.5});
            TweenMax.set($(".sw .swLine"),{opacity:0});
            TweenMax.set($(".sw1 .swNum"),{opacity:1});
            TweenMax.set($(".sw1 .swLine"),{opacity:1});
            TweenMax.set($(".leftBtn"), {opacity:0,right:-108,display:"none"});
            TweenMax.set($(".rightBtn"), {opacity:0,left:-108,display:"none"});
            global=require('global');
            TweenMax.set($(".displayCnt .detailNavCnt"),{left:"100%",alpha:0});
            $(".flyImg").attr("src",page.imagesList[oldFrame]); 
            $(".flyTitleCnt").fadeIn();
        }

        function btnIn(){
            isMoving=true;
            if(btnIsShow){
                return;
            }
            TweenMax.set($(".leftBtn"), {display:"block"});
            TweenMax.set($(".rightBtn"), {display:"block"});
            TweenMax.to($(".leftBtn"),.5, {opacity:1,right:108,onComplete:animateEnd});
            TweenMax.to($(".rightBtn"),.5, {opacity:1,left:108});
            btnIsShow=true;
        }

        function hideBtn(){
            if(!btnIsShow){
                return;
            }
            TweenMax.to($(".leftBtn"),.5, {opacity:0,right:-108});
            TweenMax.to($(".rightBtn"),.5, {opacity:0,left:-108});
            btnIsShow=false;
        }

        function animateEnd(){
            isMoving=false;
            page.flyState="end";     

        }     

        

        function animationFlyIn(){   
            
            clearInterval(timer);
            timer=setInterval(onTimer,60);
            
            $(document).mousewheel(function(event,detal){     
                if(global.isMoving){
                    return;
                }    

                if(detal>0){
                    currentFrame=0;
                }else{
                    currentFrame=page.imagesList.length-1;
                }
                pgcheck_code("page=feature&btn=mousewheel","特色飞行滚动操作");            
                
            });

            
            function onTimer(){
                if(oldFrame==0){
                    page.flyState="start";
                    if(!flyTitleCntIsShow){
                        $(".flyTitleCnt").fadeIn();
                        flyTitleCntIsShow=true;
                    }
                    
                }else if(oldFrame>=page.imagesList.length-1){
                    // page.flyState="end";
                    btnIn();
                }else{
                    page.flyState="in";
                    hideBtn();
                    if(flyTitleCntIsShow){
                      $(".flyTitleCnt").fadeOut();  
                      flyTitleCntIsShow=false;
                    }
                    
                }
                if(currentFrame==oldFrame){
                    isMoving=false;
                    return;
                }
                if(currentFrame>oldFrame){
                    oldFrame++;
                }
                if(currentFrame<oldFrame){
                    oldFrame--;
                }           
                $(".flyImg").attr("src",page.imagesList[oldFrame]);     
            }

            
            $(".m-page-fly .btn").click(function(){
                var index=$(this).attr("data-fly");
                resetDetail(index);
            })

            $(".displayCnt .closeBtn").click(function(){
                TweenMax.to($(".flyDetail-"+currentIndex),.5,{left:"100%",ease: Power1.easeOut,onComplete:closeDetail});
                TweenMax.to($(".displayCnt .detailNavCnt"),.5,{left:"100%",ease: Power1.easeOut,alpha:0});
            })

            $(".toVideoName").click(function(){
                next();
            })

            $(".flyMouseCnt").click(function(){
                currentFrame=page.imagesList.length-1;
                pgcheck_code("page=feature&btn=spaceMouseBtn","特色飞行鼠标点击操作"); 
            })

            function gotoPage(index){
                if(index==currentIndex){
                    return;
                }
                oldIndex=currentIndex; 
                currentIndex=index;
                TweenMax.set($(".flyDetail-"+currentIndex),{left:"100%"});
                TweenMax.to($(".flyDetail-"+oldIndex),.5,{left:"-100%",ease: Power1.easeOut});
                TweenMax.to($(".flyDetail-"+currentIndex),.5,{left:0,ease: Power1.easeOut});
                if(currentIndex==1){
                    globalVideo.addVideo($(".g-pageCnt .flyVideo"),"http://v.tianyu.netease.com/2015/0520/fly.mp4"); 
                }else{
                    globalVideo.removeVideo($(".g-pageCnt .flyVideo"));
                }

                $(".displayCnt .tabBtn").removeClass("active");
                $(".displayCnt .tabBtn-"+index).addClass('active');
                TweenMax.to($(".displayCnt .slideBg"),.5,{left:posArray[index],onComplete:function(){
                    isMousewheel=false;
                }});   
            }

            var posArray=[0,3,103,203,303,403];

            $(".displayCnt .tabBtn").click(function(){
                var index=$(this).attr("data-tab");                                   
                gotoPage(index);
            })


            function closeDetail(){
                $(".displayCnt").hide();
            }

            function resetDetail(num){
                num=parseInt(num);
                TweenMax.set($(".flyDetail"),{left:"100%"});
                $(".displayCnt").show();
                TweenMax.to($(".flyDetail-"+num),.5,{left:0,ease: Power1.easeOut});
                currentIndex=num;
                if(currentIndex==1){
                    globalVideo.addVideo($(".g-pageCnt .flyVideo"),"http://v.tianyu.netease.com/2015/0520/fly.mp4");
                }
                TweenMax.to($(".detailNavCnt"),.5,{left:"50%",ease: Power1.easeOut,alpha:1});
                TweenMax.set($(".displayCnt .slideBg"),{left:posArray[num]});
                $(".displayCnt .tabBtn").removeClass("active");
                $(".displayCnt .tabBtn-"+num).addClass('active');
            }

            function next(){   
                oldIndex=currentIndex;      
                if(currentIndex>=2){
                    currentIndex=1;
                }else{
                   currentIndex++; 
                }
                
                TweenMax.set($(".flyDetail-"+currentIndex),{left:"100%"});
                TweenMax.to($(".flyDetail-"+oldIndex),.5,{left:"-100%",ease: Power1.easeOut});
                TweenMax.to($(".flyDetail-"+currentIndex),.5,{left:0,ease: Power1.easeOut});
                TweenMax.to($(".toVideoName"),.5,{alpha:0,onComplete:function(){
                    $(".toVideoName").removeClass("txt1 txt2");
                    $(".toVideoName").addClass("txt"+currentIndex);
                    TweenMax.to($(".toVideoName"),.5,{alpha:1});
                    
                }});
                if(currentIndex==1){
                    // 视频
                    globalVideo.addVideo($(".g-pageCnt .flyVideo"),"http://v.tianyu.netease.com/2015/0520/fly.mp4");
                }
                else{
                    globalVideo.removeVideo($(".g-pageCnt .flyVideo"));
                }
                
            }           

            $(".sw").hover(function(){
                var wingIndex=$(this).attr("data-wingIndex");                
                TweenMax.to($(".wing"),.5, {opacity:0});
                TweenMax.to($(".wing"+wingIndex),.5, {opacity:1});
                TweenMax.set($(".sw .swNum"),{opacity:.5});
                TweenMax.set($(".sw .swLine"),{opacity:0});
                TweenMax.set($(".sw"+wingIndex).find(".swNum"),{opacity:1});
                TweenMax.set($(".sw"+wingIndex).find(".swLine"),{opacity:1});
            })

            $(".displayCnt").mousewheel(function(event,detal){  
                event.stopPropagation();   
                if(global.isMoving){
                    return;
                } 
                if(isMousewheel){
                    return;
                }
                var index;
                if(detal>0){
                    index=parseInt(currentIndex)-1;
                    if(index<=0){
                        index=2;
                    }
                }else{
                    index=parseInt(currentIndex)+1;
                    if(index>=3){
                        index=1;
                    }
                }
                isMousewheel=true;
                gotoPage(index); 

            });

            $(window).bind('keydown', function(e){      
                if (e.keyCode==32){
                    $(".flyMouseCnt").click();   
                } 
                pgcheck_code("page=feature&btn=spaceBtn","特色飞行键盘操作");  
                                     
            });

        }

        page.moveIn=function(){
            page.flyState="start";
            currentLoadedNum=0;
            oldFrame=0;
            currentFrame=0;
            globalVideo.playVoice(0);
            animationFlyIn();
            pgcheck_code("page=feature&btn=fly","到达飞行");
        }

        page.moveOut=function(){
            clearInterval(timer);
            TweenMax.set($(".wing"),{opacity:0});
            TweenMax.set($(".wing1"),{opacity:1});
            TweenMax.set($(".sw .swNum"),{opacity:.5});
            TweenMax.set($(".sw .swLine"),{opacity:0});
            TweenMax.set($(".sw1 .swNum"),{opacity:1});
            TweenMax.set($(".sw1 .swLine"),{opacity:1});
            TweenMax.set($(".leftBtn"), {opacity:0,right:-108,display:"none"});
            TweenMax.set($(".rightBtn"), {opacity:0,left:-108,display:"none"});
            oldFrame=0;
            currentFrame=0;
            $(".flyImg").attr("src",page.imagesList[oldFrame]); 
            $(".sw").unbind("hover");
            $(".toVideoName").unbind("hover");
            $(".displayCnt .closeBtn").unbind("hover");
            $(".m-page-fly .btn").unbind("hover");
        }

        return page;

})