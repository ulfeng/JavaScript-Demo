define([
    'jquery',
    'home',
    'role',
    'fly',
    'history',
    'figure',
    'fighting',
    'faction',
    'map',
    'globalVideo',
    'life'
    ],function($,home,role,fly,history,figure,fighting,faction,map,globalVideo,life){

    var global={};
    //是否在运动中
    global.isMoving=false;
    //当前页面编号
    global.currentPageIndex=0;

    global.pageCntIndex=1;

    //页面容器编号
    global.oldPageCntIndex=1;
    global.newPageCntIndex=2;

    global.oldPage=fly;

    global.changePageCnt=function(){
        var temp=global.oldPageCntIndex;        
        global.oldPageCntIndex=global.newPageCntIndex;
        global.newPageCntIndex=temp;
    }

    global.pages=[
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

    global.init=function(){
        // home.init();
        // role.init();
        // fly.init();
        // history.init();
        // figure.init();
        // fighting.init();
        // faction.init();
        // map.init();
        globalVideo.init();
        // life.init();
    }

    return global;
})