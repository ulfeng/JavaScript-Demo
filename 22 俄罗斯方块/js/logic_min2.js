// copyright Benjamin Joffe, 2010

function CubicMotion(duration)
{this._duration=duration||1000;this._date=new Date()*1;this._path=[0,0,0,0];this._target=0;}
CubicMotion.prototype={reset:function()
{this._path=[0,0,0,0];this._target=0;},setTarget:function(targ)
{var pos=this.getPosition();var x=(new Date()-this._date);var vel=0;this._date+=x;x/=this._duration;if(x>=0&&x<1)
{vel=(3*this._path[0]*x+2*this._path[1])*x+this._path[2];}
this._target=targ;targ-=pos;this._path=[(vel-2*targ),(3*targ-2*vel),vel,pos];},getPosition:function()
{var x=(new Date()-this._date)/this._duration;if(x<0||x>=1)
{return this._target;}
return((this._path[0]*x+this._path[1])*x+this._path[2])*x+this._path[3];}};var Game=new function()
{var self=this;var ctx=null;var nextType=null;var dropping=0;var pieceCount;var block;var x=-2;var posY;var type;var rotated;this.displayGold=0;this.innerRadius=40;this.mode=0;this.lines=0;this.score=0;this.time=0;this.paused=true;var field;var viewPort=new CubicMotion(250);function iso(x,y,r,theta){r=r?Game.innerRadius:60;var v=30;return{x:r*Math.cos((2*Math.PI)*((x-theta)/15-1/4))*(y+v)/v,y:200-y*20*(y/2+60)/60-0.3*r*Math.sin((2*Math.PI)*((x-theta)/15-1/4))}}
CanvasRenderingContext2D.prototype.drawFront=function(x,y,r,theta,joinLeft,joinRight,joinTop,joinBottom)
{this.beginPath();var co=[iso(x-0.015,y+0.015,r,theta),iso(x+1.015,y+0.015,r,theta),iso(x+1.015,y-1.015,r,theta),iso(x-0.015,y-1.015,r,theta)];this.moveTo(co[0].x,co[0].y);this.lineTo(co[1].x,co[1].y);this.lineTo(co[2].x,co[2].y);this.lineTo(co[3].x,co[3].y);this.closePath();this.fill();if(joinTop||joinBottom||joinLeft||joinRight)
{this.beginPath();if(joinTop)
{this.moveTo(co[1].x,co[1].y);}
else
{this.moveTo(co[0].x,co[0].y);this.lineTo(co[1].x,co[1].y);}
if(joinRight){this.moveTo(co[2].x,co[2].y);}else{this.lineTo(co[2].x,co[2].y);}
if(joinBottom)
{this.moveTo(co[3].x,co[3].y);}
else
{this.lineTo(co[3].x,co[3].y);}
if(!joinLeft){this.lineTo(co[0].x,co[0].y);}}
this.stroke();};CanvasRenderingContext2D.prototype.drawTop=function(x,y,theta,joinLeft,joinRight,noLines)
{var co=[iso(x-0.015,y,false,theta),iso(x-0.015,y,true,theta),iso(x+1.015,y,true,theta),iso(x+1.015,y,false,theta)]
this.beginPath();this.moveTo(co[0].x,co[0].y);this.lineTo(co[1].x,co[1].y);this.lineTo(co[2].x,co[2].y);this.lineTo(co[3].x,co[3].y);this.closePath();this.fill();if(noLines){return;}
if(joinLeft||joinRight)
{this.beginPath();if(joinLeft)
{this.moveTo(co[1].x,co[1].y);}
else
{this.moveTo(co[0].x,co[0].y);this.lineTo(co[1].x,co[1].y);}
this.lineTo(co[2].x,co[2].y);if(joinRight)
{this.moveTo(co[3].x,co[3].y);}
else
{this.lineTo(co[3].x,co[3].y);}
this.lineTo(co[0].x,co[0].y);}
this.stroke();};CanvasRenderingContext2D.prototype.drawSide=function(x,y,theta,joinTop,joinBottom)
{var co=[iso(x,y-1.015,false,theta),iso(x,y+0.015,false,theta),iso(x,y+0.015,true,theta),iso(x,y-1.015,true,theta)];this.beginPath();this.moveTo(co[0].x,co[0].y);this.lineTo(co[1].x,co[1].y);this.lineTo(co[2].x,co[2].y);this.lineTo(co[3].x,co[3].y);this.closePath();this.fill();if(joinTop||joinBottom)
{this.beginPath();this.moveTo(co[0].x,co[0].y);this.lineTo(co[1].x,co[1].y);if(joinTop){this.moveTo(co[2].x,co[2].y);}else{this.lineTo(co[2].x,co[2].y);}
this.lineTo(co[3].x,co[3].y);if(!joinBottom)
{this.lineTo(co[0].x,co[0].y);}}
this.stroke();}
var blockData=[{view:0.08,theme:0,frequency:1,coords:[[{x:1,y:0},{x:2,y:0},{x:1,y:1},{x:2,y:1}]]},{view:0.25,theme:1,frequency:1,coords:[[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],[{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:1,y:2}]]},{view:0.5,theme:2,frequency:1,coords:[[{x:1,y:1},{x:0,y:0},{x:1,y:0},{x:2,y:0}],[{x:1,y:1},{x:2,y:0},{x:1,y:-1},{x:1,y:0}],[{x:2,y:0},{x:1,y:-1},{x:0,y:0},{x:1,y:0}],[{x:1,y:1},{x:0,y:0},{x:1,y:-1},{x:1,y:0}]]},{view:0.5,theme:3,frequency:1,coords:[[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1}],[{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:2,y:1}],[{x:0,y:0},{x:2,y:0},{x:1,y:0},{x:2,y:-1}],[{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:0,y:-1}]]},{view:0.5,theme:4,frequency:1,coords:[[{x:2,y:0},{x:1,y:0},{x:0,y:0},{x:2,y:1}],[{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:2,y:-1}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:-1}],[{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:0,y:1}]]},{view:0.5,theme:5,frequency:1,coords:[[{x:2,y:1},{x:1,y:1},{x:1,y:0},{x:0,y:0}],[{x:1,y:1},{x:1,y:0},{x:0,y:2},{x:0,y:1}]]},{view:0.5,theme:6,frequency:1,coords:[[{x:1,y:1},{x:0,y:1},{x:2,y:0},{x:1,y:0}],[{x:1,y:1},{x:1,y:0},{x:2,y:2},{x:2,y:1}]]},{view:-0.15,theme:0,frequency:0.025,coords:[[{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0},{x:3,y:0}],[{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0},{x:1,y:-1}],[{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0},{x:0,y:1}],[{x:2,y:2},{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0}]]},{view:0.15,theme:0,frequency:0.025,coords:[[{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0},{x:0,y:0}],[{x:1,y:2},{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0}],[{x:1,y:1},{x:3,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0}],[{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:0},{x:2,y:-1}]]},{view:0.5,theme:1,frequency:0.025,coords:[[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],[{x:1,y:-2},{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:1,y:2}]]},{view:0.5,theme:1,frequency:0.025,coords:[[{x:0,y:0},{x:1,y:0},{x:2,y:0}],[{x:1,y:1},{x:1,y:0},{x:1,y:-1}]]},{view:0.5,theme:2,frequency:0.05,coords:[[{x:1,y:2},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:0}],]},{view:0.25,theme:3,frequency:0.05,coords:[[{x:1,y:1},{x:1,y:0},{x:2,y:0}],[{x:1,y:1},{x:2,y:1},{x:1,y:0}],[{x:1,y:1},{x:2,y:1},{x:2,y:0}],[{x:2,y:1},{x:1,y:0},{x:2,y:0}]]},{view:0.25,theme:4,frequency:0.05,coords:[[{x:2,y:1},{x:1,y:0},{x:2,y:0}],[{x:1,y:1},{x:1,y:0},{x:2,y:0}],[{x:1,y:1},{x:2,y:1},{x:1,y:0}],[{x:1,y:1},{x:2,y:1},{x:2,y:0}]]},{view:0.5,theme:5,frequency:0.025,coords:[[{x:2,y:2},{x:1,y:2},{x:1,y:1},{x:1,y:0},{x:0,y:0}],[{x:0,y:2},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:2,y:0}]]},{view:0.5,theme:6,frequency:0.025,coords:[[{x:0,y:2},{x:1,y:2},{x:1,y:1},{x:1,y:0},{x:2,y:0}],[{x:2,y:2},{x:2,y:1},{x:1,y:1},{x:0,y:1},{x:0,y:0}]]},{view:0.5,theme:7,frequency:0.025,coords:[[{x:0,y:1},{x:2,y:1},{x:1,y:0},{x:0,y:0},{x:2,y:0}],[{x:1,y:1},{x:2,y:1},{x:1,y:0},{x:1,y:-1},{x:2,y:-1}],[{x:1,y:0},{x:0,y:0},{x:2,y:0},{x:0,y:-1},{x:2,y:-1}],[{x:1,y:1},{x:0,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1}]]},{view:0.5,theme:7,frequency:0.025,coords:[[{x:1,y:2},{x:0,y:2},{x:2,y:2},{x:1,y:1},{x:1,y:0}],[{x:2,y:2},{x:1,y:1},{x:2,y:1},{x:0,y:1},{x:2,y:0}],[{x:1,y:2},{x:1,y:1},{x:1,y:0},{x:0,y:0},{x:2,y:0}],[{x:0,y:2},{x:1,y:1},{x:0,y:1},{x:2,y:1},{x:0,y:0}]]},{view:0.5,theme:7,frequency:0.05,coords:[[{x:1,y:0}]]},{view:0.5,theme:7,frequency:0.01,coords:[[{x:1,y:0},{x:0,y:0},{x:14,y:0},{x:2,y:0},{x:13,y:0},{x:3,y:0},{x:12,y:0},{x:4,y:0},{x:11,y:0},{x:5,y:0},{x:10,y:0},{x:6,y:0},{x:9,y:0},{x:7,y:0},{x:8,y:0}]]}];var totalFrequency=0;for(var i=0;i<blockData.length;i++)
{totalFrequency+=blockData[i].frequency;}
function getRandomPieceType()
{var r=Math.random()*totalFrequency;var sum=0;for(var i=0;i<blockData.length;i++)
{sum+=blockData[i].frequency;if(r<sum)
{return i;}}
return i-1;}
this.init=function()
{ctx=g('canvas').getContext('2d');ctx.translate(100,150);ctx.lineJoin=ctx.lineCap='round';ctx.globalAlpha=0.9;ctx.lineWidth=0.7;ctx.strokeStyle='#000';}
var frameInterval=0;var lastFrameTime=0;var lastMoveTime=0;var pieceSpawnTime=0;var animating=0;var animatingStartTime=0;var animatingLines=null;function nextFrame(junk,keyForce)
{var now=new Date().getTime();var elapsed=(now-lastFrameTime);elapsed=Math.max(0,Math.min(1000,elapsed));self.time+=elapsed;if(self.mode==2&&self.time>181*1000)
{Control.gameOver();}
else
{var t=self.mode==2?(181*1000-self.time):self.time;g('time').innerHTML=niceTime(t);}
var delay=(self.mode==3?1000:(20+2980*Math.exp(-Game.lines/35))>>0);if(keysDown.down)
{Game.score+=elapsed/100;if(self.mode!=3)
{g('score').innerHTML=Math.floor(Game.score);}
delay=Math.min(delay,30);}
posY-=Math.max(0,Math.min(1,elapsed/delay));lastFrameTime=now;if(animating==1)
{elapsed=(self.time-animatingStartTime)/Math.sqrt(animatingLines.length);if(elapsed>300||elapsed<0)
{animating=0;afterPlace();return;}
else
{Game.drawCylinder(false,false,elapsed/300,animatingLines);return;}}
if(keyForce||(keysDown.left^keysDown.right)&&(now-lastMoveTime>150))
{lastMoveTime=now;Game.move(keyForce=='left'?-1:keyForce=='right'?1:keysDown.left?-1:keysDown.right?1:0);}
slotY=Math.floor(posY);if(block.length==1)
{for(var y=slotY;y>=0;y--)
{if(!field[((x+block[0].x)%15+15)%15][y])
{break;}}
if(y<0)
{place(slotY+1);return;}}
else
{for(var i=block.length-1;i>=0;i--)
{if(slotY+block[i].y<0||field[((x+block[i].x)%15+15)%15][slotY+block[i].y])
{place(slotY+1);return;}}}
Game.drawCylinder(true);}
this.setMode=function(mode)
{self.mode=mode;self.clear();};this.start=function()
{nextType=getRandomPieceType();self.prepare();self.pause();self.resume();self.drawCylinder();self.time=0;}
this.pause=function()
{if(Game.paused){return;}
Game.paused=true;document.removeEventListener('keyup',keyup,false);document.removeEventListener('keydown',keydown,false);clearInterval(frameInterval);frameInterval=0;};this.resume=function()
{if(!Game.paused){return;}
Game.paused=false;document.addEventListener('keyup',keyup,false);document.addEventListener('keydown',keydown,false);keysDown.left=false;keysDown.right=false;keysDown.down=false;lastFrameTime=new Date().getTime();frameInterval=setInterval(nextFrame,0);};this.gameOver=function()
{self.pause();}
var keysDown={down:false};function keyup(evt)
{switch(evt.keyCode)
{case 65:case 37:keysDown.left=false;break;case 68:case 39:keysDown.right=false;break;case 83:case 40:keysDown.down=false;break;}
evt.preventDefault();return false;};function keydown(evt)
{switch(evt.keyCode)
{case 65:case 37:if(!keysDown.left)
{keysDown.left=true;nextFrame(null,'left');}
break;case 68:case 39:if(!keysDown.right)
{keysDown.right=true;nextFrame(null,'right');}
break;case 83:case 40:if(keysDown.down===false)
{keysDown.down=true;nextFrame();}
break;case 87:case 38:Game.rotate(+1);break;case 32:Game.rotate(-1);break;}
evt.preventDefault();return false;}
function getBlockColor(type,intensity,lightness)
{if(type<20)
{type=blockData[type].theme;}
var L=lightness||0;switch(type){case 0:return'rgb('+((intensity*255)>>0)+','+((intensity*L)>>0)+','+((intensity*L)>>0)+')';case 1:return'rgb('+((intensity*L)>>0)+','+((intensity*255)>>0)+','+((intensity*L)>>0)+')';case 2:return'rgb('+((intensity*L)>>0)+','+((intensity*L)>>0)+','+((intensity*255)>>0)+')';case 3:return'rgb('+((intensity*255)>>0)+','+((intensity*255)>>0)+','+((intensity*L)>>0)+')';case 4:return'rgb('+((intensity*255)>>0)+','+((intensity*L)>>0)+','+((intensity*255)>>0)+')';case 5:return'rgb('+((intensity*L)>>0)+','+((intensity*255)>>0)+','+((intensity*255)>>0)+')';case 6:return'rgb('+((intensity*220)>>0)+','+((intensity*220)>>0)+','+((intensity*220)>>0)+')';case 20:return'rgb('+((intensity*100)>>0)+','+((intensity*100)>>0)+','+((intensity*100)>>0)+')';case 30:return'rgb('+((intensity*190)>>0)+','+((intensity*190)>>0)+','+((intensity*0)>>0)+')';default:return'rgb('+((intensity*220)>>0)+','+((intensity*220)>>0)+','+((intensity*220)>>0)+')';}
return'black';}
this.drawPiece=function()
{var theta=(viewPort.getPosition()%15+15)%15;var thetaTarget=(viewPort._target%15+15)%15;var ghost=Control.config.ghost;var slotY=Math.floor(posY);var intensity=Math.sin(new Date().getTime()/150)*0.05+0.95;ctx.fillStyle=getBlockColor(type,intensity,140);var joinTop;var joinBottom;var joinLeft;var joinRight;var opacityMultiplier=self.time>pieceSpawnTime?Math.min(1,(self.time-pieceSpawnTime)/250):1;if(ghost)
{var shadowDrop=solveShadow();if(Game.innerRadius==0)Game.innerRadius=41;ctx.globalAlpha=0.4*opacityMultiplier;var j;for(i=0;i<block.length;i++)
{joinBottom=joinRight=false;for(j=block.length-1;j>=0;j--)
{if(j!=i)
{if(block[j].x==block[i].x&&block[j].y==block[i].y-1)
{joinBottom=true;}
else if(block[j].y==block[i].y&&block[j].x==block[i].x+1)
{joinRight=true;}}}
ctx.drawFront(x+block[i].x,shadowDrop+block[i].y,false,theta);ctx.drawTop(x+block[i].x,shadowDrop+block[i].y,theta);ctx.drawTop(x+block[i].x,shadowDrop+block[i].y,theta);ctx.drawSide(x+block[i].x,shadowDrop+block[i].y,theta);if(!joinRight)
{ctx.drawSide(x+block[i].x+1,shadowDrop+block[i].y,theta);}
if(!joinBottom)
{ctx.drawTop(x+block[i].x,shadowDrop+block[i].y-1,theta);}}
if(Game.innerRadius==41)Game.innerRadius=0;}
ctx.globalAlpha=0.9*opacityMultiplier;ctx.fillStyle=getBlockColor(type,intensity);var j;for(var i=block.length-1;i>=0;i--)
{joinTop=joinBottom=joinLeft=joinRight=false;for(j=block.length-1;j>=0;j--)
{if(j!=i)
{if(block[j].x==block[i].x)
{if(block[j].y==block[i].y+1)
{joinTop=true;}
else if(block[j].y==block[i].y-1)
{joinBottom=true;}}
else if(block[j].y==block[i].y)
{if(block[j].x==(block[i].x+14)%15)
{joinLeft=true;}
else if(block[j].x==(block[i].x+1)%15)
{joinRight=true;}}}}
ctx.drawFront(x+block[i].x,posY+block[i].y,false,thetaTarget,joinLeft,joinRight,joinTop,joinBottom);if(block[i].x+blockData[type].view<1&&!field[((x+block[i].x+1)%15+15)%15][posY+block[i].y])
{for(j=block.length-1;j>=0;j--)
{if(block[j].x==1&&block[j].y==block[i].y)
{break;}}
if(j<0)
{ctx.drawSide(x+block[i].x+1,posY+block[i].y,thetaTarget,joinTop,joinBottom);}}
if(block[i].x+blockData[type].view>2&&!field[((x+block[i].x-1)%15+15)%15][slotY+block[i].y])
{for(j=block.length-1;j>=0;j--)
{if(block[j].x==block[i].x-1&&block[j].y==block[i].y)
{break;}}
if(j<0)
{ctx.drawSide(x+block[i].x,posY+block[i].y,thetaTarget,joinTop,joinBottom);}}
if(1||!field[((x+block[i].x)%15+15)%15][slotY+block[i].y+1])
{for(j=block.length-1;j>=0;j--)
{if(block[j].x==block[i].x&&block[j].y-1==block[i].y)
{break;}}
if(j<0)
{ctx.drawTop(x+block[i].x,posY+block[i].y,thetaTarget,joinLeft,joinRight);}}}}
this.drawCylinder=function(includePiece,hideTop,progress,clearing)
{var theta=(viewPort.getPosition()%15+15)%15;ctx.clearRect(-100,-150,200,400);var xOff=((theta)%15+15)%15>>0;var x=0;var y;var i;var j;var yPos=0;var xSlot=0;var intensity;var now=new Date();var block_type;var obj;var clearedBelow=0;var maxBlock=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<15;i++)
{x=[7,8,6,9,5,10,4,11,3,12,2,13,1,14,0][i];clearedBelow=0;for(y=0;y<15;y++)
{xSlot=(x+xOff)%15;if(field[xSlot][y])
{maxBlock[xSlot]=y;intensity=0.6+0.4*Math.cos(2*Math.PI*(xSlot-theta)/15);var block_type=field[xSlot][y][0]-1;var theme=blockData[block_type].theme;if(self.mode==3&&y>=3)theme=20;if(self.displayGold)theme=30;if(progress&&clearing.contains(y))
{clearedBelow++;ctx.globalAlpha=Math.max(0,Math.min(1,intensity*(1-progress*1.5)));yPos=y;}
else
{if(self.mode==3)
{ctx.globalAlpha=Math.max((intensity-0.3)/0.7,0);}
else
{ctx.globalAlpha=0.9;}
yPos=y-clearedBelow*Math.pow(Math.max(0,progress||0),5);}
intensity*=1+Math.sin(xSlot*77777+now/871)*Math.sin(xSlot*31247+now/1713)*Math.sin(y*41996+now/1713)*Math.sin(y*85555+now/797)/3;intensity=intensity<0?0:intensity>1?1:intensity;switch(theme)
{case 0:ctx.fillStyle='rgb('+((intensity*255)>>0)+','+((intensity*0)>>0)+','+((intensity*0)>>0)+')';break;case 1:ctx.fillStyle='rgb('+((intensity*0)>>0)+','+((intensity*255)>>0)+','+((intensity*0)>>0)+')';break;case 2:ctx.fillStyle='rgb('+((intensity*0)>>0)+','+((intensity*0)>>0)+','+((intensity*255)>>0)+')';break;case 3:ctx.fillStyle='rgb('+((intensity*255)>>0)+','+((intensity*255)>>0)+','+((intensity*0)>>0)+')';break;case 4:ctx.fillStyle='rgb('+((intensity*255)>>0)+','+((intensity*0)>>0)+','+((intensity*255)>>0)+')';break;case 5:ctx.fillStyle='rgb('+((intensity*0)>>0)+','+((intensity*255)>>0)+','+((intensity*255)>>0)+')';break;case 6:ctx.fillStyle='rgb('+((intensity*220)>>0)+','+((intensity*220)>>0)+','+((intensity*220)>>0)+')';break;case 20:ctx.fillStyle='rgb('+((intensity*100)>>0)+','+((intensity*100)>>0)+','+((intensity*100)>>0)+')';break;case 30:ctx.fillStyle='rgb('+((intensity*190)>>0)+','+((intensity*190)>>0)+','+((intensity*0)>>0)+')';break;default:ctx.fillStyle='rgb('+((intensity*220)>>0)+','+((intensity*220)>>0)+','+((intensity*220)>>0)+')';break;}
var angle=((xSlot-theta)%15+15)%15;ctx.drawFront(xSlot,yPos,angle>3.3&&angle<10.7,theta,(angle>11.9||angle<10.9)&&((obj=field[(xSlot+14)%15][y])&&obj[1]==field[xSlot][y][1]),(angle<2.1||angle>3.1)&&((obj=field[(xSlot+1)%15][y])&&obj[1]==field[xSlot][y][1]),((obj=field[xSlot][y+1])&&obj[1]==field[xSlot][y][1]),((obj=field[xSlot][y-1])&&obj[1]==field[xSlot][y][1]));if(!field[xSlot][y+1]||(obj=clearing&&clearing.contains(y+1)))
{ctx.drawTop(xSlot,yPos,theta,((obj||!field[(xSlot+14)%15][y+1])&&(obj=field[(xSlot+14)%15][y])&&obj[1]==field[xSlot][y][1]),((obj||!field[(xSlot+1)%15][y+1])&&(obj=field[(xSlot+1)%15][y])&&obj[1]==field[xSlot][y][1]))}
if(angle>6.5&&angle<14)
{if(!field[((x+1+xOff)%15+15)%15][y])
{ctx.drawSide(xSlot+1,yPos,theta,((obj=field[xSlot][y+1])&&obj[1]==field[xSlot][y][1]),((obj=field[xSlot][y-1])&&obj[1]==field[xSlot][y][1]));}}
if(angle<7.5)
{if(!field[((x-1+xOff)%15+15)%15][y])
{ctx.drawSide(xSlot,yPos,theta,((obj=field[xSlot][y+1])&&obj[1]==field[xSlot][y][1]),((obj=field[xSlot][y-1])&&obj[1]==field[xSlot][y][1]));}}}}}
for(i=0;i<15&&!hideTop;i++)
{intensity=maxBlock[i];for(j=1;j<5;j++)
{intensity=Math.max(intensity,maxBlock[(i+j)%15]-j,maxBlock[(i-j+15)%15]-j);}
if(intensity>9)
{ctx.globalAlpha=(intensity-9)/5;ctx.fillStyle='rgb('+(255*(Math.sin(new Date()/200)/2+1/2)>>0)+',30,0)';ctx.drawTop(i,14,theta,null,null,true);}}
if(includePiece)
{Game.drawPiece();}}
this.clear=function()
{var i,j,r;x=0;field=[];for(i=0;i<15;i++)
{field[i]=new Array(15);}
viewPort.reset();Game.lines=0;Game.score=0;g('score').innerHTML=(self.mode==3)?'+6':'0';if(self.mode==1)
{var f=field;f[10][0]=f[11][0]=f[10][1]=f[11][1]=[1,1];f[9][0]=f[9][1]=f[9][2]=f[9][3]=[2,2];f[8][0]=f[7][0]=f[7][1]=f[6][0]=[3,3];f[12][0]=f[13][0]=f[13][1]=f[13][2]=[4,4];f[3][0]=f[4][0]=f[5][0]=f[5][1]=[5,5];f[1][0]=f[2][0]=f[2][1]=f[3][1]=[6,6];f[7][3]=f[7][2]=f[6][2]=f[6][1]=[7,7];pieceCount=8;}
if(self.mode==2)
{var f=field;f[0][0]=f[3][0]=f[6][0]=f[9][0]=f[12][0]=[(Math.random()*6+1)>>0,0];pieceCount=1;}
if(self.mode==3)
{for(i=0;i<9;i++){for(j=0;j<5;j++){r=(Math.random()*15)>>0;if(field[r][i]){j--;continue;}
else field[r][i]=[1,0];}}
pieceCount=1;}}
this.change=function(){type=nextType;nextType=getRandomPieceType();g('next').style.backgroundPosition=(-blockData[nextType].theme*80)+'px 0';rotated=0;posY=16;viewPort.setTarget(viewPort._target-blockData[type].view);block=blockData[type].coords[0];pieceSpawnTime=self.time;}
function solveShadow(){slotY=Math.floor(posY);var j;var i;if(block.length==1)
{for(var i=0;;i++)
{if(!field[(((x+block[0].x)%15)+15)%15][i])
{return i;}}}
for(j=0;;j++)
{for(i=block.length-1;i>=0;i--)
{if(slotY+block[i].y-j<0||field[((x+block[i].x)%15+15)%15][slotY+block[i].y-j])
{return slotY-j+1;}}}}
function place(slotY)
{keysDown.down=null;lastDrop=new Date().getTime();for(var i=block.length-1;i>=0;i--)
{if(slotY+block[i].y>14)
{self.drawCylinder(false,true);Control.gameOver();return;}}
for(var i=block.length-1;i>=0;i--)
{field[((x+block[i].x)%15+15)%15][slotY+block[i].y]=[type+1,pieceCount];}
++pieceCount;var cleared=[];for(var j=0;j<15;j++)
{for(i=0;i<15;i++)
{if(!field[i][j])break;}
if(i==15)
{for(i=0;i<15;i++)
{field[i][j]=[field[i][j][0],0];}
cleared.push(j);}}
if(cleared.length)
{animating=1;animatingStartTime=self.time;animatingLines=cleared;}
else
{afterPlace();}}
function afterPlace()
{var cleared=0;for(var j=0;j<15;j++)
{for(i=0;i<15;i++)
{if(!field[i][j])break;}
if(i==15)
{for(i=0;i<15;i++)
{field[i].splice(j,1);}
j--;Game.lines++;cleared++;}}
Game.score+=[0,100,250,400,600,1000][cleared];if(self.mode==3)
{for(j=14;j>2;j--)
{for(i=0;i<15;i++)if(field[i][j])break;if(i<15)break;}
g('score').innerHTML='+'+(j-2);if(j==2)
{Game.change();Game.drawCylinder();Control.gameOver(true);viewPort.setTarget(viewPort._target+blockData[type].view);return;}}
else
{g('score').innerHTML=Math.floor(Game.score);}
viewPort.setTarget(viewPort._target+blockData[type].view);Game.change();}
this.prepare=function(){x=-2;this.change();}
function overlaps(){var X,Y;var slotY=Math.floor(posY);var i;if(block.length==1)
{for(Y=slotY;Y>=0;Y--)
{if(!field[((x+block[0].x)%15+15)%15][Y])
{return false;}}
return true;}
for(i=block.length-1;i>=0;i--)
{X=((x+block[i].x)%15+15)%15;Y=slotY+block[i].y;if(Y<0||field[X][Y])return true;}
if(posY%1>1/2)
{slotY=Math.ceil(posY);for(i=block.length-1;i>=0;i--)
{X=((x+block[i].x)%15+15)%15;Y=slotY+block[i].y;if(Y<0||field[X][Y])return true;}}
return false;}
this.move=function(xDir)
{x+=xDir;if(overlaps())
{x-=xDir;return false;}
viewPort.setTarget(viewPort._target+xDir);return true;}
this.rotate=function(dir,idle)
{if(type==0)return false;rotated=(rotated+dir+4)%blockData[type].coords.length;block=blockData[type].coords[rotated];if(idle)return false;if(overlaps()&&!this.move(1)&&!this.move(-1))
{this.rotate(-dir,true);return false;}
return true;}};var MENU_QUOTES=['"If you love someone, put their name in a <B>circle</B>; because hearts can be broken, but <B>circles</B> never end."<BR><SPAN>- Brian Littrell</SPAN>','"I made a <B>circle</B> with a smile for a mouth on yellow paper, because it was sunshiny and bright."<BR><SPAN>- Harvey Ball</SPAN>','"A <B>circle</B> may be small, yet it may be as mathematically beautiful and perfect as a large one."<BR><SPAN>- Isaac Disraeli</SPAN>','"When the tribe first sat down in a <B>circle</B> and agreed to allow only one person to speak at a time - that was the longest step forward in the history of law"<BR><SPAN>- Judge Curtis Bok</SPAN>','"The nature of God is a <B>circle</B> of which the center is everywhere and the circumference is nowhere"<BR><SPAN>- Empedocles</SPAN>','"The mind petrifies if a <B>circle</B> be drawn around it, and it can hardly be that dogma draws a <B>circle</B> round the mind."<BR><SPAN>- George Moore</SPAN>','"Let mathematicians and geometrician \'talk of <B>circles</B>\' and triangles\' charms, The figure I prize is a girl with bright eyes, And the <B>circle</B> that\'s formed by her arms"<BR><SPAN>- Anonymous</SPAN>','"Round, like a <B>circle</B> in a spiral<BR>Like a wheel within a wheel."<BR><SPAN>- Sting</SPAN>'];var UI=new function()
{var active_menu=true;function scrollMenu(x0,x1,dir,funct){active_menu=false;var x;var i=0;var dist;if(dir=='x')dir='scrollLeft';if(dir=='y')dir='scrollTop';var loopy=setInterval(function(){i++;dist=(1-Math.cos(i*Math.PI/20))/2;dist=i==20?x1:(x0*(1-dist)+x1*dist);g('menu_area')[dir]=dist>>0;if(i==20){active_menu=true;clearInterval(loopy);if(funct)funct();}},30);}
function menuMode(){window.widget&&window.resizeTo(460,450);g('menu').style.display='block';g('menu_area').scrollLeft=321;g('menu_area').scrollTop=157;active_menu=true;g('gameover').style.display='none';g('close').style.top='264px';g('close').style.left='425px';Game.mode=1;Game.clear();Game.drawCylinder();}
this.init=function()
{menuMode();function applyBase(n){var str='url(img/base'+Control.config.skin+'.png)';g('playing').style.backgroundImage=str;}
g('set_base').options.selectedIndex=Control.config.skin;applyBase(Control.config.skin);g('set_base').onchange=function(){var skin=Control.config.skin=this.options.selectedIndex;applyBase(skin);setCookie('base',skin);};g('but_main4').onclick=function(){Control.gameOver(false);menuMode();}
g('go1').onclick=function(){Control.startGame(1);}
g('go2').onclick=function(){Control.startGame(2);}
g('go3').onclick=function(){Control.startGame(3);}
g('close').onclick=Control.close;g('bestType').onchange=function()
{var n=this.options.selectedIndex;for(var i=0;i<3;i++)
{g('best'+(i+1)).style.display=(i==n)?'block':'none';}}
g('set_ghost').onclick=function()
{Control.config.ghost=this.checked;setCookie('ghost',(this.checked?1:0));}
if(Control.config.ghost)
{g('set_ghost').checked=true;}
window.onblur=function()
{if(!active_menu)
{Control.pauseGame();}};g('quote').innerHTML=MENU_QUOTES[(Math.random()*MENU_QUOTES.length)>>0];g('but_play').onclick=function()
{if(active_menu)scrollMenu(321,0,'x');}
g('but_settings').onclick=function(){if(active_menu)scrollMenu(157,314,'y');}
g('but_high').onclick=function(){if(active_menu)scrollMenu(321,642,'x');Game.displayGold=true;Game.drawCylinder();}
g('but_help').onclick=function(){if(active_menu)
{scrollMenu(157,0,'y',function()
{g('helpBox').style.display='block';});}}
g('but_main0').onclick=function()
{if(active_menu)
{g('helpBox').style.display='none';scrollMenu(0,157,'y');}}
g('but_main1').onclick=function()
{if(active_menu)
{scrollMenu(0,321,'x');}}
g('but_main2').onclick=function()
{if(active_menu)scrollMenu(642,321,'x');Game.displayGold=false;Game.drawCylinder();}
g('but_main3').onclick=function()
{if(active_menu)scrollMenu(314,157,'y');};g('but_pause').onclick=function()
{Game.paused?Control.resumeGame():Control.pauseGame();};g('but_resume').onclick=Control.resumeGame;g('but_restart').onclick=g('but_restart2').onclick=Control.restartGame;g('but_quit').onclick=function()
{Game.pause();g('canvas').style.opacity='';g('paused').style.display=g('panel').style.display='none';Control.gameOver(false);menuMode();}};this.setGameMode=function(mode)
{active_menu=false;g('menu').style.display='none';g('gameover').style.display='none';window.widget&&window.resizeTo(380,450);for(var i=1;i<=3;i++)g('title'+i).style.display=(i==mode?'block':'none');g('panel').style.display='block';var x,y;if(mode==1)x=328,y=202;if(mode==2)x=328,y=197;if(mode==3)x=330,y=170;g('close').style.left=x+'px';g('close').style.top=y+'px';};this.pauseGame=function()
{pauseAnimation.start(true);};this.resumeGame=function()
{pauseAnimation.start(false);};var pauseAnimation={motion:new CubicMotion(300),interval:0,frame:function()
{var self=pauseAnimation;var pos=self.motion.getPosition();g('canvas').style.opacity=1-pos;g('paused').style.opacity=pos;g('paused').style.display=pos?'block':'none';if(pos==self.motion._target)
{clearInterval(self.interval);self.interval=0;}},start:function(doPause)
{this.motion.setTarget(doPause?1:0);if(!this.interval)
{this.interval=setInterval(this.frame,0);}}}
this.gameOver=function()
{g('panel').style.display='none';g('paused').style.display='none';g('close').style.left='435px';g('close').style.top='185px';window.widget&&window.resizeTo(470,450);}};(function(){var list=[];Function.prototype.wait=function(){var i=list.length;while(i-->0)
{if(list[i][0]==this)return;}
i=arguments;list[list.length]=[this,setTimeout(function()
{list.shift()[0].apply(window,i);},1)];}})();Array.prototype.contains=function(obj)
{for(var i=this.length-1;i>=0;i--)
{if(this[i]===obj)
{return true;}}
return false;};Number.prototype.toLength=function(n)
{var str=this.toString();while(str.length<n)str='0'+str;return str;};function setCookie(name,value)
{if(window.widget)
{widget.setPreferenceForKey(encodeURIComponent(value),name)}
else
{document.cookie=name+"="+encodeURIComponent(value)+"; expires="+(new Date(new Date().getTime()+(360*24*60*60*1000))).toGMTString()+"; path=/";}};function getCookie(name)
{if(window.widget)
{return decodeURIComponent(widget.preferenceForKey(name))||null;}
if(new RegExp(name+'\=([^;]*);','').test(document.cookie+';'))
{return decodeURIComponent(RegExp.$1);}
return null;}
function niceTime(t)
{t/=1000;t>>=0;return((t/60)>>0)+':'+(t%60).toLength(2)}
window.addEventListener('load',function()
{g('loading').style.display='none';g('container').style.visibility='visible';Game.init();Control=new Control();UI.init();},false);function g(e){return document.getElementById(e);}
function Control()
{this.config={ghost:(getCookie('ghost')!=='0'),skin:parseInt(getCookie('base'))||0};function storeBest()
{var pos;for(var gameType=0;gameType<3;gameType++)
{for(pos=0;pos<3;pos++)
{setCookie('best'+gameType+''+pos+'score',best[gameType][pos][0]);setCookie('best'+gameType+''+pos+'name',best[gameType][pos][1]);}}}
function getBestStr(i){str='<B>'+['Traditional','Time Attack','Garbage'][i]+'</B>';for(j=0;j<3;j++)
{str+='<BR>'+(j+1)+'. '+best[i][j][1]+' ('+(i==2?niceTime(best[i][j][0]):best[i][j][0])+')';}
return str;}
function displayBest(){var str,j;for(var i=0;i<3;i++)
{g('best'+(i+1)).innerHTML=getBestStr(i);}}
var best=[[['0','Empty'],['0','Empty'],['0','Empty']],[['0','Empty'],['0','Empty'],['0','Empty']],[['3599000','Empty'],['3599000','Empty'],['3599000','Empty']]];if(getCookie('best11score')==null)
{storeBest();}
else
{for(var gameType=0;gameType<3;gameType++)
{for(pos=0;pos<3;pos++){best[gameType][pos][0]=Number(getCookie('best'+gameType+''+pos+'score'))||0;best[gameType][pos][1]=getCookie('best'+gameType+''+pos+'name');}}}
displayBest();this.gameOver=function(complete)
{Game.gameOver();var score=Math.floor(Game.score);var time=Game.time;if(complete===false)return;var message='Your score of '+score+' did not achieve a high score.';var hasWon=false;if(Game.mode==1)
{if(score>best[0][2][0])hasWon=true;}
if(Game.mode==2)
{if(time>181*1000)
{if(score>best[1][2][0])hasWon=true;}
else
{message='Failure. You must survive for 3 minutes to qualify for a high score in <I>Time Attack</I>.';}}
if(Game.mode==3)
{if(!complete)
{message='Failure. You must clear all but three rows to qualify for a high score in <I>Garbage</I>.';}
else if(time<best[2][2][0])
{hasWon=true;}
else
{message='Your time of '+niceTime(time)+' did not achieve a high score.';}}
UI.gameOver();g('winner').style.display=hasWon?'block':'none';g('newgame').style.display=hasWon?'none':'block';g('sorryText').innerHTML=hasWon?"":message;g('gameover').style.display='block';};this.close=function()
{window.close();};this.restartGame=function()
{Game.gameOver(false);Control.startGame(Game.mode);};this.startGame=function(mode)
{UI.setGameMode(mode||1);Game.setMode(mode);Game.start();};this.pauseGame=function()
{Game.pause();UI.pauseGame();};this.resumeGame=function()
{Game.resume();UI.resumeGame();}
g('high_form').onsubmit=function()
{var str=g('high_name').value;if(!str)return;g('winner').style.display='none';g('newgame').style.display='block';var score=Game.mode<3?Math.floor(Game.score):Game.time;for(var i=2;i>=0;i--)
{if(Game.mode<3&&score>best[Game.mode-1][i][0]||Game.mode==3&&score<best[2][i][0])
{if(i<2)
{best[Game.mode-1][i+1][0]=best[Game.mode-1][i][0];best[Game.mode-1][i+1][1]=best[Game.mode-1][i][1];}}
else break;}
i++;best[Game.mode-1][i][0]=score;best[Game.mode-1][i][1]=str;storeBest();displayBest();g('sorryText').innerHTML='<div style="padding-left:60px;">'+getBestStr(Game.mode-1)+'</div>';return false;}
document.getElementsByTagName('body')[0].style.visibility='visible';}