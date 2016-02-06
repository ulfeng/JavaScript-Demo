define([
    'jquery',
    'swfobject'
    ],function($){

        var player={};   
        var voice=[
        '',
        'http://v.tianyu.netease.com/2015/0507/home.mp3',
        'http://v.tianyu.netease.com/2015/0507/history.mp3',
        'http://v.tianyu.netease.com/2015/0507/role.mp3',
        '',
        '',
        '',
        '',
        '',
        ''
        ]  
        player.init=function(){
            $(".m-videoMask .closeBtn").click(function(){
                player.closeGlobalVideo();
            })
        }
        player.addVideo=function(cnt,url){
            cnt.flash(
                {
                    swf: 'http://res.tianyu.netease.com/gw/14v4/player/player_no_hd.swf',
                    height: '100%',
                    width: '100%',
                    allowFullScreen: true,
                    wmode: 'transparent',
                    flashvars: {
                        v1:url,
                        v2:url
                    }
                }
            );
            player.pauseVoice();
        }

        player.removeVideo=function(cnt){
            cnt.empty();
            player.resumeVoice();
        }

        player.openGlobalVideo=function(url){
            $(".m-videoMask").fadeIn();            
            showOverlay(url);          
        }

        player.closeGlobalVideo=function(){
            hideOverlay();      
            
        }

        player.playVoice=function(index){
            $("#voice").attr("src",voice[index]);
        }

        player.pauseVoice=function(){
            $("#voice")[0].pause();
        }

        player.resumeVoice=function(){
            $("#voice")[0].play();
        }

        function showOverlay(url) {
            player.pauseVoice();
            var activeOverlay=$(".globalVideoCnt .swfCnt");
            TweenMax.set(activeOverlay, {zIndex:1100,left:0,top:0});
            TweenMax.set(activeOverlay, {scale:0.5, rotationX:90, autoAlpha:0, y:-300, z:-600, xPercent:-0, yPercent:-0,x:0, transformPerspective:600, display:"block"});
            TweenMax.to(activeOverlay, 0.25, {autoAlpha:1, scale:1, ease:Back.easeOut.config(1.5),delay:0.35});
            TweenMax.to(activeOverlay, 0.4, {rotationX:0, x:0,y:0, z:0, ease:Back.easeOut.config(1), delay:0.35,onComplete:function(){
                player.addVideo($(".m-videoMask .swfCnt"),url);  
            }});
            return false;
        }

        function hideOverlay() {
                player.resumeVoice();
                var activeOverlay=$(".globalVideoCnt .swfCnt");
                TweenMax.set(activeOverlay, {transformPerspective:600});
                TweenMax.to(activeOverlay, 0.25, {rotationX:70, y:-300, z:-500, autoAlpha:0, display:"none", ease:Power1.easeIn, onComplete:function() {
                    TweenMax.set(activeOverlay, {clearProps:"zIndex"});
                    $(".m-videoMask").fadeOut();
                    $(".m-videoMask .swfCnt").empty();
                }});
        }

        return player;

})