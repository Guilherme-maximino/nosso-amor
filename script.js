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
const flap = seal.parentElement.querySelector(".flap");
flap.style.transform = "rotateX(180deg)";

createParticles(seal);
seal.style.display = "none";

setTimeout(()=>{
    const content = seal.parentElement.parentElement.querySelector(".letter-content");
    content.style.display = "flex";
    content.style.animation = "fadeUp 1s ease forwards";
},800);
}

function createParticles(seal){

    const envelope = seal.parentElement;
    const rect = seal.getBoundingClientRect();
    const envelopeRect = envelope.getBoundingClientRect();

    const flash = document.createElement("div");
    flash.style.position = "absolute";
    flash.style.width = "20px";
    flash.style.height = "20px";
    flash.style.borderRadius = "50%";
    flash.style.background = "radial-gradient(circle, #fff 0%, #c77dff 40%, transparent 70%)";
    flash.style.left = (rect.left - envelopeRect.left + rect.width/2 - 10) + "px";
    flash.style.top = (rect.top - envelopeRect.top + rect.height/2 - 10) + "px";
    flash.style.pointerEvents = "none";
    flash.style.opacity = "1";
    flash.style.transition = "all 0.4s ease";
    envelope.appendChild(flash);

    setTimeout(()=>{
        flash.style.transform = "scale(4)";
        flash.style.opacity = "0";
    },10);

    setTimeout(()=> flash.remove(),400);

    for(let i = 0; i < 35; i++){

        const p = document.createElement("div");

        const size = Math.random()*6 + 4;

        p.style.position = "absolute";
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.borderRadius = "50%";
        p.style.pointerEvents = "none";

        const colors = ["#ffffff", "#e0aaff", "#c77dff", "#9d4edd"];
        p.style.background = colors[Math.floor(Math.random()*colors.length)];

        p.style.boxShadow = `
            0 0 6px ${p.style.background},
            0 0 12px ${p.style.background}
        `;

        p.style.left = (rect.left - envelopeRect.left + rect.width/2) + "px";
        p.style.top = (rect.top - envelopeRect.top + rect.height/2) + "px";

        p.style.transition = "all 1s cubic-bezier(.17,.67,.83,.67)";
        p.style.opacity = "1";

        envelope.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 180 + 40;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        setTimeout(() => {
            p.style.transform = `translate(${x}px, ${y}px) scale(0.3)`;
            p.style.opacity = "0";
        }, 10);

        setTimeout(() => p.remove(), 1000);
    }
}

const modal = document.getElementById("photoModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");

document.querySelectorAll(".polaroid").forEach(photo => {

    photo.addEventListener("click", () => {

        const img = photo.querySelector("img");
        const caption = photo.querySelector(".caption");

        modalImg.src = img.src;
        modalCaption.textContent = caption.textContent;

        modal.classList.add("active");

    });

});

modal.addEventListener("click", () => {
    modal.classList.remove("active");
});

document.querySelector(".photo-overlay").addEventListener("click", () => {

    document.querySelectorAll(".polaroid").forEach(photo => {
        photo.classList.remove("active");
    });

    document.querySelector(".photo-overlay").classList.remove("active");

});

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
