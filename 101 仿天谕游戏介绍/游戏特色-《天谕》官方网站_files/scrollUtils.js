define([
    'jquery',
    'global',
    'nav',
    'home',
    'fly',
    'history',
    'figure',
    'fighting',
    'faction',
    'map',
    'life',
    'role',
    'Loader'
    ],function($,global,nav,home,fly,history,figure,fighting,faction,map,life,role,Loader){

    var scrollUtils={};
    var hash;
    var initPage;
    scrollUtils.init=function(){

        global.init();
        var oldPageCnt=$("#page"+global.oldPageCntIndex);
        hash=window.location.hash;
        switch(hash)
        {
            case '#home':
                initPage=home;
                global.currentPageIndex=0;
                break;
            case '#history':
                initPage=history; 
                global.currentPageIndex=1;
                break;
            case '#map':
                initPage=map; 
                global.currentPageIndex=2;
                break;
            case '#role':
                initPage=role; 
                global.currentPageIndex=3;
                break;
            case '#fly':
                initPage=fly; 
                global.currentPageIndex=4;
                break;
            case '#fight':
                initPage=fighting; 
                global.currentPageIndex=5;
                break;
            case '#faction':
                initPage=faction; 
                global.currentPageIndex=6;
                break;
            case '#figure':
                initPage=figure;
                global.currentPageIndex=7;
                break;
            case '#life':
                initPage=life;
                global.currentPageIndex=8;
                break;
            default:
                initPage=home;
                global.currentPageIndex=0;

        }
        oldPageCnt.html(initPage.content);
        if(initPage.imgLoadStatus=="complete"){
            oldPageCnt.find('.m-page').show();
            initPage.init();
            initPage.moveIn();
        }else{
            oldPageCnt.append($("#moduleLoader").html());  
        }
        
        nav.navTo(global.currentPageIndex);
        ascynLoadImg(global.currentPageIndex);

        $(document).mousewheel(function(event,detal){
            if(detal>0){
                if(fly.flyState!="start"&&global.currentPageIndex==4){
                    return;
                }
                scrollUtils.gotoPrev();
            }else{
                if(fly.flyState!="end"&&global.currentPageIndex==4){
                    return;                   
                }
                scrollUtils.gotoNext();   
            }
        });

        $(".navItem").click(function(){
            var num=$(this).index();
            scrollUtils.gotoPage(num);
        });
    }

    scrollUtils.gotoPrev=function(){
        if(global.isMoving){
            return;
        }
        if(global.currentPageIndex>0){
            var index=global.currentPageIndex-1;
            scrollUtils.gotoPage(index);
        }
    }

    scrollUtils.gotoNext=function(){
        if(global.isMoving){
            return;
        }
        if(global.currentPageIndex<global.pages.length-1){
            var index=global.currentPageIndex+1;
            scrollUtils.gotoPage(index);
        }
    }

    scrollUtils.gotoPage=function(index){
        if(global.isMoving){
            return;
        }

        if(global.currentPageIndex==index){
            return;
        }

        // loadImg(index, null, true);

        global.oldPage=global.pages[global.currentPageIndex];
        var isUP=true;
        if(index>global.currentPageIndex){
            isUP=false;
        }
        global.currentPageIndex=index;
        var newPageCnt=$("#page"+global.newPageCntIndex)
        var page=global.pages[global.currentPageIndex];        
        newPageCnt.html(page.content); 
        // newPageCnt.find(".m-page").show();
        if(navs[global.currentPageIndex].imgLoadStatus=="complete"){
            newPageCnt.find('.m-page').show();
            global.pages[global.currentPageIndex].init(); 
        }else{
            newPageCnt.append($("#moduleLoader").html());  
        }    

        var oldPageCnt=$("#page"+global.oldPageCntIndex); 

        if(isUP){
            newPageCnt.css({"top":"-100%"}); 
            global.isMoving=true;          
            TweenMax.to(oldPageCnt,1,{top:"100%",ease:Expo.easeOut});
            TweenMax.to(newPageCnt,1,{top:0,onComplete :moveComplete,ease:Expo.easeOut});
        }else{
            newPageCnt.css({"top":"100%"}); 
            global.isMoving=true;          
            TweenMax.to(oldPageCnt,1,{top:"-100%",ease:Expo.easeOut});
            TweenMax.to(newPageCnt,1,{top:0,onComplete :moveComplete,ease:Expo.easeOut});
        }    
        nav.navTo(index);
        ascynLoadImg(index);
    }

    function moveComplete(){
        global.isMoving=false;
        global.changePageCnt();
        global.oldPage.moveOut();
        if(navs[global.currentPageIndex].imgLoadStatus=="complete"){
            global.pages[global.currentPageIndex].moveIn();
        }        
        
    }


    var lastLoad = 0;
    var thread=0;
    var navs = [
        home,
        history,
        map,
        role,
        fly,
        fighting,
        faction,
        figure,
        life
    ];

    function loadImg(index,showOverlay){
        if(navs[index].imgLoadStatus !== undefined){
            return;
        }
        thread++;
        navs[index].loader.startLoad(function(){
            thread--;
            if(thread==0){
                getNextAssetIndex();
            }
            if(index==global.currentPageIndex){
                $(".m-page-"+navs[index].name).parent().find(".loadingCnt").fadeOut();
                navs[index].init();
                $(".m-page-"+navs[index].name).fadeIn();
                navs[index].moveIn();
            }
        });
    }

    function ascynLoadImg(index){
        var isShow=false;
        if(index==0){
            isShow=true;
        }        
        loadImg(index,isShow);
    }

    function getNextAssetIndex(){
        for(var i=0;i<navs.length;i++){            
            if(navs[i].imgLoadStatus===undefined){
                ascynLoadImg(i);
                break;
            }            
        }
    }

    return scrollUtils;

})