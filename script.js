const mainAreWidth=400;
const mainAreaHeight=375;
let horizontPadding=(window.innerWidth-mainAreWidth)/2;
let verticalPadding=(window.innerHeight-mainAreaHeight)/2;
let gameStarted;
let balloonX;
let balloonY;
let verticalVelocity;
let horizontalVelocity;
let fuel;
let heating;
let trees;
let backgroundTrees;
const hill1BaseHeight=80;
const hill1Speed=0.2;
const hill1Stretch=1;
const hill1Amplitude=10;
const hill2BaseHeight=60;
const hill2Speed=0.3;
const hill2Stretch=1.2;
const hill2Amplitude=20;
const hill3BaseHeight=40;
const hill3Speed=0.4;
const hill3Stretch=.4;
const hill3Amplitude=30;
const hill4BaseHeight=20;
const hill4Speed=0.5;
const hill4Stretch=1.1;
const hill4Amplitude=40;
const hill5BaseHeight=50;
const hill5Speed=0.6;
const hill5Stretch=.8;
const hill5Amplitude=50;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const introductionElement = document.getElementById('introduction');
const restartButton = document.getElementById('restart');
Math.sinus=function(degree){
    return Math.sin(degree*Math.PI/180);
};
function resetGame(){
    gameStarted=false;
    verticalVelocity=5;
    horizontalVelocity=5;
    balloonX=0;
    balloonY=567450;
    fuel=100;introductionElement.style.opacity=1;
    restartButton.style.display='none';
    trees=[];
    for(let i=0;i<window.innerWidth/50;i++){
        generateTree();
    }
    backgroundTrees=[];
    for(let i=0;i<window.innerWidth/30;i++){
        generateBackgroundTrees();
    }
    draw();
}
const exports = {};
resetGame();
function generateBackgroundTrees(){
    const minimumGap=30;
    const maximunGap=150;
    const lastTree=backgroundTrees[backgroundTrees.length-1];
    let furtestX=lastTree?lastTree.x:0;
    const x=furtestX.minimumGap+Math.floor(Math.random()*(maximunGap-minimumGap));
    const treeColors=["#6D8821","#7D9821","#8DA821","#9DB821","#AEC821","#BFD821","#CFE821","#DFE821","#EFE821","#FFE821","#FFD821","#FFC821","#FFB821","#FFA821","#FF9821","#FF8821","#FF7721","#FF6621","#FF5521","#FF4421","#FF3321","#FF2221","#FF1121","#FF0021","#FF0011","#FF0022","#FF0033","#FF0044","#FF0055","#FF0066","#FF0077","#FF0088","#FF0099","#FF00AA","#FF00BB","#FF00CC","#FF00DD","#FF00EE","#FF"];
    const color=treeColors[Math.floor(Math.random()*treeColors.length)];
    backgroundTrees.push({x,color})
}
function draw(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    drawSky();
    ctx.save();
    ctx.translate(0,verticalPadding+mainAreaHeight);
    drawBackgroundHills();
    ctx.translate(horizontPadding,0)
    ctx.translate(-balloonX,0)
    drawTrees();
    ctx.restore();
    drawHeader();
}
function drawHeader(){
    ctx.strokeStyle=fuel<=30?"red":"white";
    ctx.strokeRect(30,30,150,30)
    ctx.fillStyle=fuel<=30?"rgba(255,0,0,0.5)":"rgba(150,150,200,0.5)";
    ctx.fillRect(30,30,150*fuel/100,30);
    const score=Math.floor(balloonX/30);
    ctx.fillStyle="black";
    ctx.font="bold 30px Arial";
    ctx.textAlign="end";
    ctx.textBaseline="top";
    ctx.fillText(`${score}m`,window.innerWidth-30,30);
}
function drawSky(){
    var gradient=ctx.createLinearGradient(0,0,0,window.innerHeight);
    gradient.addColorStop(0,"#AADBEA");
    gradient.addColorStop(1,"#FEF1E1");
    ctx.fillStyle=gradient;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
}
function drawBackgroundHills(){
    drawHill(hill1BaseHeight,hill1Speed,hill1Amplitude,hill1Stretch,"#00d131");
    drawHill(hill2BaseHeight,hill2Speed,hill2Amplitude,hill2Stretch,"#008e21");
    drawHill(hill3BaseHeight,hill3Speed,hill3Amplitude,hill3Stretch,"#004b11");
    drawHill(hill4BaseHeight,hill4Speed,hill4Amplitude,hill4Stretch,"#6cff8f");
    drawHill(hill5BaseHeight,hill5Speed,hill5Amplitude,hill5Stretch,"#3cff5f");
}
function drawHill(baseHeight,speedMultiplier,amplitude,stretch,color){
    ctx.beginPath();
    ctx.moveTo(0,window.innerHeight);
    ctx.lineTo(0,getHillY(0,baseHeight,speedMultiplier,amplitude,stretch));
    for(let i=0;i<window.innerWidth;i++){
        ctx.lineTo(i,getHillY(i,baseHeight,speedMultiplier,amplitude,stretch));
    }
    ctx.lineTo(window.innerWidth,window.innerHeight);
    ctx.fillStyle=color;
    ctx.fill();
}
function getHillY(x,baseHeight,speedMultiplier,amplitude,stretch){
    const sinewBaseY=-baseHeight;
    return (
        Math.sinus((balloonX*speedMultiplier+x)*stretch)*amplitude+sinewBaseY
    )
}
function drawTrees(){
    trees.forEach(({x,h,r1,r2,r3,r4,r5,r6,r7,color})=>{
        ctx.save();
        ctx.translate(x,0);
        const trunkWidth=40;
        ctx.fillStyle='#885f37';
        ctx.beginPath();
        ctx.moveTo(-trunkWidth/2,0);
        ctx.quadraticCurveTo(
            -trunkWidth/4,-h/2,-trunkWidth/2,-h
        )
        ctx.lineTo(trunkWidth/2,-h);
        ctx.quadraticCurveTo(
            trunkWidth/4,-h/2,trunkWidth/2,0
        )
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle=color;
        drawCircle(-20,-h-15,r1);
        drawCircle(-30,-h-25,r2);
        drawCircle(-20,-h-35,r3);
        drawCircle(0,-h-45,r4);
        drawCircle(20,-h-35,r5);
        drawCircle(30,-h-25,r6);
        drawCircle(20,-h-15,r7);
        ctx.restore();
    })
}
function drawCircle(cx,cy,radius){
    ctx.beginPath();
    ctx.arc(cx,cy,radius,0,2*Math.PI);
    ctx.fill();
}
function getTreeY(x,baseHeight,amplitude){
    const sinewBaseY=-baseHeight;
    return (
        Math.sinus(x)*amplitude+sinewBaseY
    )
}
function generateTree(){
    const minimumGap=50
    const maximumGap=600
    const x=trees.length ?trees[trees.length-1].x+minimumGap+Math.floor(Math.random()*(maximumGap-minimumGap)):400;
    const h=60+Math.random()*100;
    const r1=32+Math.random()*16;
    const r2=32+Math.random()*16;
    const r3=32+Math.random()*16;
    const r4=32+Math.random()*16;
    const r5=32+Math.random()*16;
    const r6=32+Math.random()*16;
    const r7=32+Math.random()*16;
    const r8=32+Math.random()*16;
    const r9=32+Math.random()*16;
    const r10=32+Math.random()*16;
    const treesColor=[
        '#00d131',
        '#008e21',
        '#004b11',
        '#6cff8f',
        '#3cff5f',
        '#00ff2f',
        '#00b11f',
    ];
    const color=treesColor[Math.floor(Math.random()*treesColor.length)];
    trees.push({x,h,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,color})
}