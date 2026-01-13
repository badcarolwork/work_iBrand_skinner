var panelWidth;
var centerWidth;
var scrollbarWidth;
const topPanel =  myFT.$(".top");
const bottomPanel =  myFT.$(".bottom");
const leftPanel =  myFT.$(".left");
const rightPanel =  myFT.$(".right");


window.onload = function () {
  scrollbarWidth = getScrollbarWidth();
  centerWidth = document.getElementById("center").offsetWidth;
  centerHeight = document.getElementById("center").offsetHeight;
  
  // panelWidth = (window.innerWidth - centerWidth )/2; // for local preview
  panelWidth = (window.innerWidth - centerWidth / 0.85) / 2;
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
  const sideTl = gsap.timeline();
  sideTl.to(".panel.left",  { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=3")
  .to(".panel.right", { opacity: 1, duration: 0.5, ease: "power2.out" }, "<")
  .to(".left .left-text",{opacity:1,duration:.5,ease: "power2.out"})
  .to(".right .right-text",{opacity:1,duration:.5,ease: "power2.out"},"<")
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
    .to(".top #tagline", { opacity: 1, duration: 0.5, ease: "power2.out" }) 
    .to(".top #char", { opacity: 1, duration: 0.8, ease: "power2.out" },"<") 
    .to(".top #pc.logo", {scale: 0.9,opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1") 
    .to(".top #mobile.logo", {scale: 0.9,opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1")
    .to(".top #cast", { opacity: 1, duration: 0.8, ease: "power2.out" },"<")  
    setTimeout(() => {
      startSideAnimate()
    }, 1700);
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