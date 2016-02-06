define([
    'jquery',
    'globalVideo',
    'require',
    'Loader'
    ],function($,globalVideo,require,Loader){

        var page={};

        page.subItems=[];

        page.index=0;

        page.content=$("#mapTemplate").html();
        var currentIndex=1;
        var oldIndex=1;
        var global;
        var video=[
            "",
            "http://v.tianyu.netease.com/2015/0629/map1.mp4",
            "http://v.tianyu.netease.com/2015/0629/map2.mp4",
            "http://v.tianyu.netease.com/2015/0629/map3.mp4"
        ];
        var isMousewheel=false;
        page.imgLoadStatus;
        page.name="map";
        page.loader=new Loader(page);
        page.init=function(){
            // page.content=$(".m-page-map");
            
            $(".mapDetailCnt").hide();
            global=require('global');
            TweenMax.set($(".mapDetailCnt .detailNavCnt"),{left:"100%",alpha:0});
        }

        page.moveIn=function(){
            globalVideo.playVoice(0);
            $(".city").hover(function(){
                TweenMax.set($(this).find(".cityIntro"),{alpha:0,display:"block"});
                TweenMax.to($(this).find(".cityIntro"),1,{alpha:1});  
            },function(){
                var intro=$(this).find(".cityIntro");
                TweenMax.to(intro,.2,{alpha:0,onComplete:function(){
                    TweenMax.set(intro,{display:"none"});
                }});  
            })

            $(".city").click(function(){
                // return;
                var index=$(this).attr("data-city");
                index=parseInt(index);
                resetDetail(index);
                // globalVideo.openGlobalVideo(video[index]);
            });

            $(".mapDetailCnt .tabBtn").click(function(){
                var index=$(this).attr("data-tab");
                gotoPage(index);
            })
            var posArray=[0,3,103,203,303,403];
            function gotoPage(index){
                if(index==currentIndex){
                    return;
                }
                oldIndex=currentIndex; 
                currentIndex=index;
                TweenMax.set($(".detailItem-"+currentIndex),{left:"100%"});
                TweenMax.to($(".detailItem-"+oldIndex),.5,{left:"-100%",ease: Power1.easeOut});
                TweenMax.to($(".detailItem-"+currentIndex),.5,{left:0,ease: Power1.easeOut});
                if(currentIndex==1){
                    globalVideo.addVideo($(".g-pageCnt .mapDetailCnt .detailItem-1 .detailVideoCnt"),video[1]); 
                }else if(currentIndex==2){
                    globalVideo.addVideo($(".g-pageCnt .mapDetailCnt .detailItem-2 .detailVideoCnt"),video[2]); 
                }else if(currentIndex==3){
                    globalVideo.addVideo($(".g-pageCnt .mapDetailCnt .detailItem-3 .detailVideoCnt"),video[3]); 
                }else{
                    globalVideo.removeVideo($(".detailVideoCnt"))
                }

                $(".mapDetailCnt .tabBtn").removeClass("active");
                $(".mapDetailCnt .tabBtn-"+index).addClass('active');
                TweenMax.to($(".mapDetailCnt .slideBg"),.5,{left:posArray[index],onComplete:function(){
                    isMousewheel=false;
                }});
            }

            function resetDetail(num){
                TweenMax.set($(".detailItem"),{left:"100%"});
                $(".mapDetailCnt").show();
                TweenMax.to($(".detailItem-"+num),.5,{left:0,ease: Power1.easeOut});
                currentIndex=num;
                if(num==1){
                    globalVideo.addVideo($(".g-pageCnt .mapDetailCnt .detailItem-1 .detailVideoCnt"),video[1]); 
                }else if(num==2){
                    globalVideo.addVideo($(".g-pageCnt .mapDetailCnt .detailItem-2 .detailVideoCnt"),video[2]); 
                }else if(num==3){
                    globalVideo.addVideo($(".g-pageCnt .mapDetailCnt .detailItem-3 .detailVideoCnt"),video[3]); 
                }else{
                    globalVideo.removeVideo($(".detailVideoCnt"));
                }
                TweenMax.to($(".detailNavCnt"),.5,{left:"50%",ease: Power1.easeOut,alpha:1});
                TweenMax.set($(".mapDetailCnt .slideBg"),{left:posArray[num]});
                $(".mapDetailCnt .tabBtn").removeClass("active");
                $(".mapDetailCnt .tabBtn-"+num).addClass('active');
            }

            $(".mapDetailCnt").mousewheel(function(event,detal){  
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
                        index=3;
                    }
                }else{
                    index=parseInt(currentIndex)+1;
                    if(index>=4){
                        index=1;
                    }
                }
                isMousewheel=true;
                gotoPage(index); 
            });

            $(".mapDetailCnt .closeBtn").click(function(){
                TweenMax.to($(".detailItem-"+currentIndex),.5,{left:"100%",ease: Power1.easeOut,onComplete:closeDetail});
                TweenMax.to($(".mapDetailCnt .detailNavCnt"),.5,{left:"100%",ease: Power1.easeOut,alpha:0});
                globalVideo.removeVideo($(".detailVideoCnt"));
            })
            function closeDetail(){
                $(".mapDetailCnt").hide();
            }

            pgcheck_code("page=feature&btn=map","到达大陆");
        }

        page.moveOut=function(){
            $(".mapDetailCnt").unbind("mousewheel");
        }

        return page;

})