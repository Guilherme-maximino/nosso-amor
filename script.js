/* Música */
function startExperience(){
const music=document.getElementById("bgMusic");
music.volume=0.3;
music.play();
goTo('timeline');
}

window.onload = function() {
    document.getElementById("home").style.display = "flex";
};

function goTo(screenId) {
    // esconde todas
document.querySelectorAll(".screen").forEach(screen => {
    screen.style.display = "none";
});

    // mostra apenas a escolhida
document.getElementById(screenId).style.display = "flex";

    // volta para o topo
window.scrollTo(0, 0);
}

/* Envelope */
function openLetter(seal){
const flap=seal.parentElement.querySelector(".flap");
flap.style.transform="rotateX(180deg)";
createParticles(seal);
seal.style.display="none";
setTimeout(()=>{
seal.parentElement.parentElement.querySelector(".letter-content").style.display="block";
},800);
}

function createParticles(element){
for(let i=0;i<20;i++){
const p=document.createElement("div");
p.style.position="absolute";
p.style.width="6px";
p.style.height="6px";
p.style.background="#fff";
p.style.borderRadius="50%";
p.style.left=(element.getBoundingClientRect().left)+"px";
p.style.top=(element.getBoundingClientRect().top)+"px";
p.style.pointerEvents="none";
p.style.transition="1s ease";
document.body.appendChild(p);

setTimeout(()=>{
p.style.transform=`translate(${Math.random()*200-100}px,${Math.random()*200-100}px)`;
p.style.opacity=0;
},10);

setTimeout(()=>p.remove(),1000);
}
}

/* Cronômetro exato */
const startDate=new Date(2024,2,19,0,0,0);
let lastHours=null;
let lastMinutes=null;
let lastSeconds=null;

function animateNumber(id,newValue){
const el=document.getElementById(id);
if(el.innerText==newValue)return;

el.classList.add("slide-up");

setTimeout(()=>{
el.innerText=newValue;
el.classList.remove("slide-up");
el.classList.add("glow");
setTimeout(()=>el.classList.remove("glow"),800);
},300);
}

function updateStatic(id,value){
const el=document.getElementById(id);
if(el.innerText!=value){
el.innerText=value;
el.classList.add("glow");
setTimeout(()=>el.classList.remove("glow"),800);
}
}

function updateCounter(){
const now=new Date();

let years=now.getFullYear()-startDate.getFullYear();
let months=now.getMonth()-startDate.getMonth();
let days=now.getDate()-startDate.getDate();

if(days<0){
months--;
const prevMonth=new Date(now.getFullYear(),now.getMonth(),0);
days+=prevMonth.getDate();
}

if(months<0){
years--;
months+=12;
}

const weeks=Math.floor(days/7);
const remainingDays=days%7;

const hours=now.getHours();
const minutes=now.getMinutes();
const seconds = now.getSeconds();

updateStatic("years",years);
updateStatic("months",months);
updateStatic("weeks",weeks);
updateStatic("days",remainingDays);

if(lastHours!==hours){
animateNumber("hours",hours);
lastHours=hours;
}

if(lastMinutes!==minutes){
animateNumber("minutes",minutes);
lastMinutes=minutes;
}

if(lastSeconds !== seconds){
    animateNumber("seconds", seconds);
    lastSeconds = seconds;
}
}

setInterval(updateCounter,1000);
updateCounter();

/* Estrelas em órbita */
const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let stars=[];
for(let i=0;i<70;i++){
stars.push({
x:canvas.width/2,
y:canvas.height/2,
radius:Math.random()*250+50,
angle:Math.random()*Math.PI*2,
speed:0.001+Math.random()*0.002
});
}

function animateStars(){
ctx.clearRect(0,0,canvas.width,canvas.height);
stars.forEach(s=>{
s.angle+=s.speed;
const x=s.x+Math.cos(s.angle)*s.radius;
const y=s.y+Math.sin(s.angle)*s.radius;
ctx.beginPath();
ctx.arc(x,y,2,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();
});
requestAnimationFrame(animateStars);
}
animateStars();