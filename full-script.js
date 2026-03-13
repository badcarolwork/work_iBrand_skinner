const expanded = document.getElementById("expanded");
// const closeBtn = document.getElementById("close_btn");
let parentW;
let parentH;
function setCollapseFrame() {
    window.parent.postMessage(
        {source: "iframe",
            event: "requestCollapseFrame",
        },
        "*"
    );
}
window.addEventListener("message", function (event) {
    const msg = JSON.parse(event.data);
    console.log(msg)
    if (message && message.data) {
        if (message.data.text === "kultFSE") {
            parentW = message.data.width;
            parentH = message.data.height;
        }
    }
});
function playTear() {
    console.log("har  "+parentW)
    const tl = gsap.timeline({onComplete:handleresize});
    tl
        .to("#cut1 #cut1text", { opacity: 0, ease: "power2.out", duration: 1, })
        .to("#cut1 .torn-ani", { x: window.innerWidth, ease: "power2.out", duration: 1 }, "-=.3")
        .to("#cut1P", { opacity: 1, ease: "power2.out", duration: 1 }, "-=0.7")
        .to("#logo", { opacity: 1, ease: "power4.out", duration: .7 }, "<")
        .to("#tornTop", { y: -window.innerWidth, ease: "power2.out", duration: 1.5 })
        .to("#tornbottom", { y: window.innerHeight, ease: "power2.out", duration: 1.5 }, "<")
        .to("#logo", {
            scale: .6,
            yPercent: window.innerHeight > 1000 ? -82 : -80,
            xPercent: window.innerWidth > 1000 ? -54 : -20, ease: "power4.out", duration: .7
        }, "<")
        .to("#cut1P", { opacity: 1, scale: 1, rotationZ: 10, ease: "elastic.out(1,0.3)", duration: .8 }, "-=.5")
        .to("#nut", { opacity: 1, ease: "power4.out", duration: .5 }, "<")
        .to("#close_btn", { opacity: 1, ease: "power4.out", duration: .5 }, "<")
        .to("#cut2text", { opacity: 1, ease: "power4.out", duration: .8 })
        .to(".shine-wrapper", { opacity: 1, ease: "power4.out", duration: .8 })
}

function handleresize(){
     window.addEventListener("resize", (e) => {
        console.log(e)
        gsap.set(".torn-ani",{x: window.innerWidth})
      })
}

function handleClickthrough(e) {
    e.stopPropagation();
    e.preventDefault();
    myFT.clickTag(1);
}

function init() {
    setTimeout(() => {
        if (window.innerWidth && window.innerHeight) {
            playTear();
        }
    }, 1000);
    expanded.addEventListener("click", handleClickthrough)
}

window.onload = function () {
    init();
   
}

