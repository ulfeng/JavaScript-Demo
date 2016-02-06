define([
    'jquery',
    'globalVideo',
    'require',
    'Loader'
    ],function($,globalVideo,require,Loader){

        var page={};

        page.subItems=[];

        page.index=0;

        var tl1;
        var tl2;
        var currentIndex=1;
        var oldIndex=1;
        var currentThumbIndex=1;
        var global;
        var timer;
        var isMousewheel=false;
        page.content=$("#fightingTemplate").html();
        page.imgLoadStatus;
        page.name="fighting";
        page.loader=new Loader(page);
        page.init=function(){
            
            $(".fightDetailCnt").hide();
            TweenMax.set($(".item"), {opacity:0});
            TweenMax.set($(".item1"), {opacity:1});
            TweenMax.set($(".detailTitle"), {opacity:0});
            TweenMax.set($(".detailTitle1"), {opacity:1});
            TweenMax.set($(".imgHover"), {opacity:1});
            TweenMax.set($(".thumb-1 .imgHover"), {opacity:0});
            TweenMax.set($(".fightDetailCnt .detailNavCnt"),{left:"100%",alpha:0});
            global=require('global');

        }

        page.moveIn=function(){
            globalVideo.playVoice(0);
            $(".g-pageCnt .m-page-fighting .fightVideo").html('<video src="http://v.tianyu.netease.com/2015/0511/bg/fight.mp4" autoplay loop></video>');
            TweenMax.set($(".g-pageCnt .m-page-fighting .fightVideo"), {opacity:0});
            TweenMax.to($(".g-pageCnt .m-page-fighting .fightVideo"),.5,{opacity:1,delay:1});
            TweenMax.set($(".g-pageCnt .boxImg"),{alpha:0})
            //左侧按钮
            tl1=new TimelineMax();
            tl1.addLabel("start");            
            tl1.add(TweenMax.to($(".g-pageCnt .fightLeft .bigBorder"),.5,{left:0}));
            tl1.add(TweenMax.set($(".g-pageCnt .fightLeft .box"),{display:"none"}));
            tl1.add(TweenMax.set($(".g-pageCnt .fightLeft .txt"),{alpha:0}));
            tl1.addCallback(function(){
                $(".g-pageCnt .fightLeft .box").show();
            })
            tl1.add([TweenMax.to($(".g-pageCnt .fightLeft .box1"),.5,{left:-129,top:-129,ease:Power1.easeOut}),TweenMax.to($(".g-pageCnt .fightLeft .box2"),.5,{left:129,top:129,ease: Power1.easeOut}),TweenMax.to($(".g-pageCnt .fightLeft .box3"),.5,{left:-129,top:129,ease: Power1.easeOut})]);
            tl1.add(TweenMax.to($(".g-pageCnt .fightLeft .boxImg"),.3,{alpha:.5}));
            tl1.add(TweenMax.to($(".g-pageCnt .fightLeft .txt"),.5,{alpha:1}));
            tl1.addLabel("end");
            tl1.play();


            // 右侧按钮
            tl2=new TimelineMax();
            tl2.addLabel("start");            
            tl2.add(TweenMax.to($(".g-pageCnt .fightRight .bigBorder"),.5,{left:0}));
            tl2.add(TweenMax.set($(".g-pageCnt .fightRight .box"),{display:"none"}));
            tl2.add(TweenMax.set($(".g-pageCnt .fightRight .txt"),{alpha:0}));
            tl2.add(TweenMax.set($(".g-pageCnt .fightRight .boxImg"),{alpha:0}));
            tl2.addCallback(function(){
                $(".g-pageCnt .fightRight .box").show();
            })
            tl2.add([TweenMax.to($(".g-pageCnt .fightRight .box1"),.5,{left:129,top:-129}),TweenMax.to($(".g-pageCnt .fightRight .box2"),.5,{left:129,top:129})]);
            tl2.add(TweenMax.to($(".g-pageCnt .fightRight .boxImg"),.3,{alpha:.5}));
            tl2.add(TweenMax.to($(".g-pageCnt .fightRight .txt"),.2,{alpha:1}));
            tl2.addLabel("end");
            tl2.play();


            $(".box").hover(function(){
                TweenMax.to($(this).find(".boxImg"),.5,{alpha:1});
            },function(){
                TweenMax.to($(this).find(".boxImg"),.5,{alpha:.5});
            })

            $(".box").click(function(){
                var num=$(this).attr("data-box");
                num=parseInt(num);
                resetDetail(num);
                pgcheck_code("page=feature&btn="+num,"战斗内页按钮"+num);
            })

            function resetDetail(num){
                TweenMax.set($(".detailItem"),{left:"100%"});
                $(".fightDetailCnt").show();
                TweenMax.to($(".detailItem-"+num),.5,{left:0,ease: Power1.easeOut});
                currentIndex=num;
                $(".fighttingTitle").hide();
                if(num==2){
                    globalVideo.addVideo($(".g-pageCnt .detailItem-2 .detailVideoCnt"),"http://v.tianyu.netease.com/2015/0520/fight.mp4"); 
                }else if(num==4){
                    globalVideo.addVideo($(".g-pageCnt .detailItem-4 .detailVideoCnt"),"http://v.tianyu.netease.com/2015/0520/fight2.mp4"); 
                }else{
                    globalVideo.removeVideo($(".detailVideoCnt"))
                }
                TweenMax.to($(".detailNavCnt"),.5,{left:"50%",ease: Power1.easeOut,alpha:1});
                TweenMax.set($(".fightDetailCnt .slideBg"),{left:posArray[num]});
                $(".fightDetailCnt .tabBtn").removeClass("active");
                $(".fightDetailCnt .tabBtn-"+num).addClass('active');
                if(num==3){
                    startTimer();
                }

            }

            function gotoPage(index){
                if(index==currentIndex){
                    return;
                }
                oldIndex=currentIndex; 
                currentIndex=index;
                TweenMax.set($(".detailItem-"+currentIndex),{left:"100%"});
                TweenMax.to($(".detailItem-"+oldIndex),.5,{left:"-100%",ease: Power1.easeOut});
                TweenMax.to($(".detailItem-"+currentIndex),.5,{left:0,ease: Power1.easeOut});
                TweenMax.to($(".nextFightBtn"),.5,{alpha:0,onComplete:function(){
                    $(".nextFightBtn").removeClass("txt1 txt2 txt3 txt4 txt5");
                    $(".nextFightBtn").addClass("txt"+currentIndex);
                    TweenMax.to($(".nextFightBtn"),.5,{alpha:1});
                }}); 
                if(currentIndex==2){
                    globalVideo.addVideo($(".g-pageCnt .detailItem-2 .detailVideoCnt"),"http://v.tianyu.netease.com/2015/0520/fight.mp4"); 
                }else if(currentIndex==4){
                    globalVideo.addVideo($(".g-pageCnt .detailItem-4 .detailVideoCnt"),"http://v.tianyu.netease.com/2015/0520/fight2.mp4"); 
                }else{
                    globalVideo.removeVideo($(".detailVideoCnt"))
                }

                $(".fightDetailCnt .tabBtn").removeClass("active");
                $(".fightDetailCnt .tabBtn-"+index).addClass('active');
                TweenMax.to($(".fightDetailCnt .slideBg"),.5,{left:posArray[index],onComplete:function(){
                    isMousewheel=false;
                }});
                if(index==3){
                    startTimer();
                }else{
                    stopTimer();
                }
            }


            function closeDetail(){
                $(".fightDetailCnt").hide();
                $(".fighttingTitle").show();
            }

            

            $(".nextFightBtn").click(function(){
                // next();
            })

            $(".fightDetailCnt .closeBtn").click(function(){
                TweenMax.to($(".detailItem-"+currentIndex),.5,{left:"100%",ease: Power1.easeOut,onComplete:closeDetail});
                TweenMax.to($(".fightDetailCnt .detailNavCnt"),.5,{left:"100%",ease: Power1.easeOut,alpha:0});
                globalVideo.removeVideo($(".detailVideoCnt"));
                stopTimer();
            })

            var posArray=[0,3,103,203,303,403];

            $(".fightDetailCnt .tabBtn").click(function(){
                var index=$(this).attr("data-tab");
                gotoPage(index);
            })

            $(".fightDetailCnt").mousewheel(function(event,detal){  
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
                        index=5;
                    }
                }else{
                    index=parseInt(currentIndex)+1;
                    if(index>=6){
                        index=1;
                    }
                }
                isMousewheel=true;
                gotoPage(index); 
            });

            function startTimer(){
                clearInterval(timer);
                timer=setInterval(onTimer,3000);
            }
            function stopTimer(){
                clearInterval(timer);
            } 

            function onTimer(){
                currentThumbIndex++;
                if(currentThumbIndex>=4){
                    currentThumbIndex=1;
                }
                showImg(currentThumbIndex);
            }
            function showImg(currentThumbIndex){
               TweenMax.to($(".thumb .imgHover"),.5,{alpha:1,ease: Power1.easeOut});  
               TweenMax.to($(".thumb-"+currentThumbIndex).find(".imgHover"),.5,{alpha:0,ease: Power1.easeOut}); 
               TweenMax.to($(".detailTitle"),0.5,{alpha:0});
               TweenMax.to($(".detailTitle"+currentThumbIndex),0.5,{alpha:1});  
               TweenMax.to($(".item"),1,{alpha:0});
               TweenMax.to($(".item"+currentThumbIndex),1,{alpha:1});  
               TweenMax.to($(".lifeColorful"),1,{alpha:0});
               TweenMax.to($(".lifeColorful-"+currentThumbIndex),1,{alpha:1}); 
            }

            $(".thumb").hover(function(){
                var index=$(this).attr("data-thumb");
                showImg(index);
                currentThumbIndex=index;
                stopTimer();
            },function(){
                startTimer();
            })

            pgcheck_code("page=feature&btn=fight","到达战斗");

        }

        page.moveOut=function(){
            if(tl1){
                tl1.kill();
            }
            if(tl2){
                tl2.kill();
            }
            TweenMax.set($(".fightLeft .box"),{display:"none"});
            TweenMax.set($(".fightRight .box"),{display:"none"});
            $(".fightDetailCnt").unbind("mousewheel");
            $(".box").unbind('hover');
            $(".box").unbind('click');
        }

        return page;

})