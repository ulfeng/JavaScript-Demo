requirejs.config({
    baseUrl: 'http://res.nie.netease.com/tianyu/qt/15/feature_0511/v2/js',
    // baseUrl:'js',
    paths: {
        jquery: 'lib/jquery-1.7.2.min',
        turn: 'lib/turn.min',
        // jpreloader:'lib/jpreloader.min',
        jpreloader:'lib/jpreloader',
        swfobject:'lib/jquery.swfobject.1-1-1',
        nav:'module/nav',
        TweenMax:'lib/TweenMax.min',
        TweenLite:'lib/TweenLite.min',
        EasePack:'lib/EasePack.min',
        TimelineMax:'lib/TimelineMax.min',
        scrollUtils:'utils/scrollUtils',
        mousewheel:'lib/jquery.mousewheel.min',
        global:'module/global',
        home:'module/home',
        role:'module/role',
        fly:'module/fly',
        history:'module/history',
        figure:'module/figure',
        fighting:'module/fighting',
        faction:'module/faction',
        map:'module/map',
        life:'module/life',
        globalVideo:'utils/globalVideo',
        Loader:'utils/Loader'
    },
    shim: {
    	'turn': {
    		deps: ['jquery']
    	},
        'jpreloader':{
            deps: ['jquery']
        },
        'swfobject':{
            deps: ['jquery']
        },
        'nav':{
            deps: ['TimelineMax','TweenMax','EasePack']
        },
        'scrollUtils':{
            deps: ['TimelineMax','TweenMax','EasePack']
        },
        'EasePack':{
            deps: ['TweenMax']
        }
    },
    waitSeconds:30

});
require([
	'jquery',
	'nav',
	'scrollUtils',	
	'mousewheel',
	'turn',
	'TweenMax',
	'EasePack',
    'jpreloader',
    'swfobject',
    'global'
	], 
	function($,nav,scrollUtils, global) {
		$(function(){
            if($.browser.msie&&$.browser.version<9){ 
                // $(".IE_tips").show();
                window.location.href="http://tianyu.163.com/feature/index2.html?IE";
            }else{
                nav.init();         
                scrollUtils.init();
            }
			
		})
});


