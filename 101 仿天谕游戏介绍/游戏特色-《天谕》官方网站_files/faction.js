define([
    'jquery',
    'globalVideo',
    'Loader'
    ],function($,globalVideo,Loader){

        var page={};

        page.subItems=[];

        page.index=0;
        page.content=$("#factionTemplate").html();
        page.imgLoadStatus;
        page.name="faction";
        page.loader=new Loader(page);
        page.init=function(){
                        
        }

        page.moveIn=function(){
            globalVideo.playVoice(0);
            $(".g-pageCnt .m-page-faction .factionVideo").click(function(){
                globalVideo.openGlobalVideo("http://v.tianyu.netease.com/2015/0520/faction.mp4");
            })
            pgcheck_code("page=feature&btn=faction","到达帮会");
        }

        page.moveOut=function(){
            $(".m-page-faction .factionVideoCnt").empty();
            $(".g-pageCnt .m-page-faction .factionVideo").unbind('click');
        }

        return page;

})