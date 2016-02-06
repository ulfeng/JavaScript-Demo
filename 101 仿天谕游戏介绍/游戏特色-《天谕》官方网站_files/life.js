define([
    'jquery',
    'globalVideo',
    'require',
    'Loader'
    ],function($,globalVideo,require,Loader){

        var page={};

        page.subItems=[];

        page.index=0;

        page.content;
        var currentIndex=1;
        var oldIndex=1;
        var currentThumbIndex=1;
        var tl1;
        var tl2;
        var scrollUtils;
        var timer;
        page.content=$("#lifeTemplate").html();
        page.imgLoadStatus;
        page.name="life";
        page.loader=new Loader(page);
        var isMoving=false;
        page.init=function(){
            // page.content=$(".m-page-life");

            TweenMax.set($(".innerImg"),{alpha:0})
            TweenMax.set($(".lifeThumb .img"),{alpha:1})
            TweenMax.set($(".lifeColorful"),{alpha:0});
            TweenMax.set($(".lifeColorful-1"),{alpha:1})
            TweenMax.set($(".lifeThumb-1 .img"),{alpha:0});
            TweenMax.set($(".lifeDetailCnt"),{left:"0"}); 
            TweenMax.set($(".detailNavCnt"),{alpha:1});            
            $(".m-page-life .tabBtn").removeClass("active");
            $(".m-page-life .tabBtn-1").addClass('active');
            TweenMax.set($(".m-page-life .slideBg"),{left:3});  
            scrollUtils=require("scrollUtils");
            pgcheck_code("page=feature&btn=life","到达生活");
        }

        page.moveIn=function(){
            globalVideo.playVoice(0);
            TweenMax.set($(".lifeDetailCnt"),{left:"0"}); 
            $(".m-page-life .tabBtn").removeClass("active");
            $(".m-page-life .tabBtn-1").addClass('active');
            TweenMax.set($(".m-page-life .slideBg"),{left:3});  
            tl1=new TimelineMax();
            tl1.addLabel("start");            
            tl1.to([$(".lifeBtn-1").find('.lifeBtnline-1'),$(".lifeBtn-1").find('.lifeBtnline-3')],1,{width:0,ease:Power4.easeOut});
            tl1.to([$(".lifeBtn-1").find('.lifeBtnline-2'),$(".lifeBtn-1").find('.lifeBtnline-4')],1,{height:0,ease:Power4.easeOut},"-=1");
            tl1.to($(".lifeBtn-1").find(".innerImg"),1,{alpha:1,ease:Power4.easeOut},"-=.5");
            tl1.addLabel("end"); 
            tl1.pause();

            tl2=new TimelineMax();
            tl2.addLabel("start");            
            tl2.to([$(".lifeBtn-2").find('.lifeBtnline-1'),$(".lifeBtn-2").find('.lifeBtnline-3')],1,{width:0,ease:Power4.easeOut});
            tl2.to([$(".lifeBtn-2").find('.lifeBtnline-2'),$(".lifeBtn-2").find('.lifeBtnline-4')],1,{height:0,ease:Power4.easeOut},"-=1");
            tl2.to($(".lifeBtn-2").find(".innerImg"),1,{alpha:1,ease:Power4.easeOut},"-=.5");
            tl2.addLabel("end");
            tl2.pause();

            $(".lifeBtn-1").hover(function(){
                tl1.tweenTo("end");
            },function(){
                tl1.tweenTo("start");
            })

            $(".lifeBtn-2").hover(function(){
                tl2.tweenTo("end");
            },function(){
                tl2.tweenTo("start");
            })

            $(".lifeBtn").click(function(){
                var index=$(this).attr("data-life");
                resetDetail(index);
            })

            function resetDetail(num){
                TweenMax.set($(".lifeDetail"),{left:"100%"});
                $(".lifeDetailCnt").show();
                TweenMax.to($(".lifeDetail-"+num),.5,{left:0,ease: Power1.easeOut});
                currentIndex=num;
                $(".nextLifeBtn").removeClass("txt1 txt2");
                $(".nextLifeBtn").addClass("txt"+num);
            }

            function next(){   
                oldIndex=currentIndex;      
                if(currentIndex>=2){
                    currentIndex=1;
                }else{
                   currentIndex++;
                }
                
                TweenMax.set($(".lifeDetail-"+currentIndex),{left:"100%"});
                TweenMax.to($(".lifeDetail-"+oldIndex),.5,{left:"-100%",ease: Power1.easeOut});
                TweenMax.to($(".lifeDetail-"+currentIndex),.5,{left:0,ease: Power1.easeOut});
                TweenMax.to($(".nextLifeBtn"),.5,{alpha:0,onComplete:function(){
                    $(".nextLifeBtn").removeClass("txt1 txt2");
                    $(".nextLifeBtn").addClass("txt"+currentIndex);
                    TweenMax.to($(".nextLifeBtn"),.5,{alpha:1});
                }}); 
       
            }

            function closeDetail(){
                $(".lifeDetailCnt").hide();
            }


            $(".nextLifeBtn").click(function(){
                next();
            })

            $(".lifeDetailCnt .closeBtn").click(function(){
                TweenMax.to($(".lifeDetail-"+currentIndex),.5,{left:"100%",ease: Power1.easeOut,onComplete:closeDetail});
            })


           

            $(".lifeItem").hover(function(){
                TweenMax.to($(this).find(".lifeItemBg"),4,{scale:1.1});                 
            },function(){
                TweenMax.to($(this).find(".lifeItemBg"),1,{scale:1,ease: Power1.easeOut}); 
            })

            var posArray=[0,3,103];

            $(".g-pageCnt .m-page-life .tabBtn").click(function(){
                if(isMoving){
                    return;
                }
                isMoving=true;
                var index=$(this).attr("data-tab");
                if(index==1){
                    TweenMax.to($(".g-pageCnt .lifeDetailCnt"),.5,{left:"0",ease: Power1.easeOut}); 
                }else{
                    TweenMax.to($(".g-pageCnt .lifeDetailCnt"),.5,{left:"-100%",ease: Power1.easeOut}); 
                }
                $(".g-pageCnt .m-page-life .tabBtn").removeClass("active");
                $(this).addClass('active');
                TweenMax.to($(".g-pageCnt .m-page-life .slideBg"),.5,{left:posArray[index],onComplete:function(){
                    isMoving=false;
                }}); 
                currentIndex=index;                    
            })

            $(".g-pageCnt .m-page-life").mousewheel(function(event,detal){
                event.stopPropagation();
                if(isMoving){
                    return;
                }
                isMoving=true;                
                if(detal>0){
                    if(currentIndex==1){
                        scrollUtils.gotoPrev();
                    }
                    currentIndex=1;
                    TweenMax.to($(".g-pageCnt .lifeDetailCnt"),.5,{left:"0",ease: Power1.easeOut}); 
                    stopTimer();
                }else{
                    currentIndex=2;
                    TweenMax.to($(".g-pageCnt .lifeDetailCnt"),.5,{left:"-100%",ease: Power1.easeOut}); 
                    startTimer();
                }
                $(".g-pageCnt .m-page-life .tabBtn").removeClass("active");
                $(".g-pageCnt .m-page-life .tabBtn-"+currentIndex).addClass('active');
                TweenMax.to($(".g-pageCnt .m-page-life .slideBg"),.5,{left:posArray[currentIndex],onComplete:function(){
                    isMoving=false;
                }}); 
            })

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
               TweenMax.to($(".lifeThumb .img"),.5,{alpha:1,ease: Power1.easeOut});  
               TweenMax.to($(".lifeThumb-"+currentThumbIndex).find(".img"),.5,{alpha:0,ease: Power1.easeOut});   
               TweenMax.to($(".lifeColorful"),1,{alpha:0});
               TweenMax.to($(".lifeColorful-"+currentThumbIndex),1,{alpha:1}); 
            }

            $(".lifeThumb").hover(function(){
               var index=$(this).attr("data-thumb");
                showImg(index); 
                currentThumbIndex=index;
                stopTimer();
            },function(){
                startTimer();
            })
        }

        page.moveOut=function(){
            TweenMax.set($(".g-pageCnt .lifeDetailCnt"),{left:"0"}); 
            $(".g-pageCnt .m-page-life .tabBtn").removeClass("active");
            $(".g-pageCnt .m-page-life .tabBtn-1").addClass('active');
            TweenMax.set($(".g-pageCnt .m-page-life .slideBg"),{left:3});  

            TweenMax.set($(".lifeThumb .img"),{alpha:1})
            TweenMax.set($(".lifeColorful"),{alpha:0});
            TweenMax.set($(".lifeColorful-1"),{alpha:1})
            TweenMax.set($(".lifeThumb-1 .img"),{alpha:0});
            clearInterval(timer);
        }

        return page;

})