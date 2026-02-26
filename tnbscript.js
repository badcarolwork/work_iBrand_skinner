var panelWidth;
var centerWidth;
var scrollbarWidth;
const topPanel =  myFT.$(".top");
const bottomPanel =  myFT.$(".bottom");
const leftPanel =  myFT.$(".left");
const rightPanel =  myFT.$(".right");
const datetime = "6/2/2026 23:59:59"

window.onload = function () {
  scrollbarWidth = getScrollbarWidth();
  centerWidth = document.getElementById("center").offsetWidth;
  centerHeight = document.getElementById("center").offsetHeight;
  
  // panelWidth = (window.innerWidth - centerWidth )/2; // for local preview
  panelWidth = (window.innerWidth - centerWidth / 0.85) / 2 - 38;
  panelHeight = centerHeight + 500;
  gsap.set(".left, .right", { width: panelWidth });
  addEvents();  
 
};


function addEvents() {
  topPanel.on("click", function () {
    myFT.clickTag(1);
  });
  bottomPanel.on("click", function () {
    myFT.clickTag(1);
  });
  leftPanel.on("click", function () {
    myFT.clickTag(1);
  });

  rightPanel.on("click", function () {
    myFT.clickTag(1);
  });
  startAnim();
}

function setExpandIframe() {
  window.parent.postMessage(
    {
      source: "iframe",
      event: "requestFullscreen",
    },
    "*"
  );
  console.log("expand");
}

function setCollapseFrame() {
  window.parent.postMessage(
    {
      source: "iframe",
      event: "requestCollapseScreen",
    },
    "*"
  );
  console.log("collapse");
}

function updateSize() {
  centerWidth = document.getElementById("center").offsetWidth;
  centerHeight = document.getElementById("center").offsetHeight;
  panelWidth = (window.innerWidth - centerWidth / 0.8) / 2;
  panelHeight = centerHeight + 500;
  gsap.set(".left, .right", { width: panelWidth });

  // let posTopPanel = panelWidth / 2;
  // if (posTopPanel < 180) {
  //   leftPanelContent.style.top = panelWidth / 2 + "px";
  //   rightPanelContent.style.top = panelWidth / 2 + "px";
  // } else {
  //   leftPanelContent.style.top = "40px";
  //   rightPanelContent.style.top = "40px";
  // }
}

function startAnim() {
  gsap.set(".skinner-container", { autoAlpha: 1 });
  topAnimate();
}

function startSideAnimate() {
  countdown();
  const sideTl = gsap.timeline({onComplete:ctaAni});
  sideTl.to(".panel.left",  { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=3")
  .to(".panel.right", { opacity: 1, duration: 0.5, ease: "power2.out" }, "<")
  .set(".left .title",{ duration: .2, className: "pos-ab title bounce-left" },"+=.2")
  .set(".right .title",{ duration: .2, className: "pos-ab title bounce-left" },"<")
  
  .to(".left .cta", {opacity: 1, duration: 0.5, ease: "power2.out" })
  .to(".right .cta", {opacity: 1, duration: 0.5, ease: "power2.out" },"<")
  .to(".left .tnbLogo", {opacity: 1, duration: 0.5, ease: "power2.out" })
  .to(".right .tnbLogo", {opacity: 1, duration: 0.5, ease: "power2.out" },"<")
  .to(".right #icon1", {opacity: 1, duration: 0.5, ease: "power2.out" },"<")
  .to(".right #icon2", {opacity: 1, duration: 0.5, ease: "power2.out" })
  .to(".right #icon3", {opacity: 1, duration: 0.5, ease: "power2.out" })
}

function ctaAni(){
  document.querySelector(".left .cta").classList.add("blink-1");
  document.querySelector(".right .cta").classList.add("blink-1");
}

function topAnimate() {
  let yIn;
  let yOut;
  if (window.innerWidth >= 1024) {
    yIn = 37;
    yOut = 11;
  } else {
    yIn = 22;
    yOut = 11;
  }
  const topTl = gsap.timeline();
  topTl
    .to("#icon", { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" })
    .to("#rightLogo", { x: 10, opacity: 1, duration: 0.8, ease: "power2.out" })
    .to("#leftLogo", { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },"<")
    // .to(".top #topLockup", { opacity: 1, duration: 0.5, ease: "power2.out" })
    // .to(".top #lockupBox .text1", { opacity: 1, y: yIn, duration: 0.5, ease: "power2.out" })
    // .to(".top #lockupBox .text1", { opacity: 0, y: yOut, duration: 0.3, ease: "power2.out" }, "+=0.5")
    // .to(".top #lockupBox .text2", { opacity: 1, y: yIn, duration: 0.5, ease: "power2.out" }, "-=0.1")
    // .to(".top #lockupBox .text2", { opacity: 0, y: yOut, duration: 0.3, ease: "power2.out" }, "+=0.5")
    // .to(".top #lockupBox .text3", { opacity: 1, y: yIn, duration: 0.5, ease: "power2.out" }, "-=0.1")
    // .to(".top #lockupBox .text3", { opacity: 0, y: yOut, duration: 0.3, ease: "power2.out" }, "+=0.5")
    // .to(".top #lockupBox .text4", { opacity: 1, y: yIn, duration: 0.5, ease: "power2.out" }, "-=0.1")
    // .to(".top #lockupBox .text4", { opacity: 0, y: yOut, duration: 0.3, ease: "power2.out" }, "+=0.5")
    // .to(".top #lockupBox .text5", { opacity: 1, y: yIn, duration: 0.5, ease: "power2.out" }, "-=0.1")
  
    setTimeout(() => {
      startSideAnimate()
    }, 2000);
}


function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

window.addEventListener("resize", updateSize); 
let bgApplied = false; 

function countdown() {
  
  function padZero(value) {
    return value < 10 ? "0" + value : value;
  }

  var x = setInterval(function () {
    var future = new Date(datetime);
    var now = new Date().getTime();
    var timeLeft = future - now;

    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.querySelector("#day").innerHTML = padZero(days);
    document.querySelector("#hour").innerHTML = padZero(hours);
    document.querySelector("#minute").innerHTML = padZero(minutes);
    document.querySelector("#second").innerHTML = padZero(seconds);
  }, 1000);
}

// window.addEventListener("message", function (event) {
//   const message = event.data;
//   if (message && message.data && typeof message.data.text === "string") {
//     if(message.data.text === "kscrollReveal"){
//       showKPanelBg(true); 
//     }
//   if(message.data.text === "kscrollTop"){
//       showKPanelBg(false);
//     }
//   }
// });


// function showKPanelBg(state){
//     if(state && !bgApplied){
//       document.querySelector(".left .logo").style.display = "block";
//       console.log("show logo left")
//     }else if(!state && bgApplied){
//       document.querySelector(".left .logo").style.display = "none";
//       bgApplied = false; // prevent reapplying
//       console.log("run hide logo left")
//     }

// }