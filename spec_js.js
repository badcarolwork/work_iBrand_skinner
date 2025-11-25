var panelWidth;
      var centerWidth;

      window.onload = function () {
        scrollbarWidth = getScrollbarWidth();
        centerWidth = document.getElementById("center").offsetWidth;
        centerHeight = document.getElementById("center").offsetHeight;
        const logoWidth = document.querySelector("#logo").offsetWidth;
        
        // panelWidth = (window.innerWidth - centerWidth )/2; // for local preview
        panelWidth = (window.innerWidth - centerWidth / 0.8) / 2;
        panelHeight = centerHeight + 500;
        gsap.set(".left, .right", { width: panelWidth });
        // gsap.set(".cta", { width: panelWidth - 20 });
        gsap.set("#titleTop", { left: logoWidth});
        addEvents();
      };

      const topPanel =  myFT.$(".top");
      const bottomPanel =  myFT.$(".bottom");
      const leftPanel =  myFT.$(".left");
      const rightPanel =  myFT.$(".right");
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
        gsap.set(".cta", { width: panelWidth - 20 });

        let posTopPanel = panelWidth / 2;
        if (posTopPanel < 180) {
          leftPanelContent.style.top = panelWidth / 2 + "px";
          rightPanelContent.style.top = panelWidth / 2 + "px";
        } else {
          leftPanelContent.style.top = "40px";
          rightPanelContent.style.top = "40px";
        }
      }

      function startAnim() {
        gsap.set(".skinner-container", { autoAlpha: 1 });
        const tl = gsap.timeline({onComplete: repeatTopEffect});
        tl
        .to("#logo",{scale:1})
        .to("#titleTop",{ opacity: 1, duration: 0.5, ease: "power2.out" },"-=.1")
        .to("#titleTopEffect",{ opacity: 1, duration: 1, ease: "power2.out" },"+=.3") 
        .to("#titleTopEffect",{ opacity: 0, duration: 1, ease: "power2.out" }) 
        .to(".panel.left", { opacity: 1, duration: 0.5, ease: "power2.out" },"-=3")
        .to(".panel.right", { opacity: 1, duration: 0.5, ease: "power2.out" }, "<")
        .fromTo(".left .cta-box",{left:-600},{left:0, duration: 0.5, ease: "power2.out"},"-=2.5") 
        .fromTo(".right .cta-box",{left:600},{left:0, duration: 0.5, ease: "power2.out"},"<") 
         gsap.set(".panel.left, .panel.right", { clearProps: "transform" })
         
      }
      function repeatTopEffect(){
        const tl2 = gsap.timeline({repeat:-1,repeatDelay:1});
        tl2 .to("#titleTopEffect",{ opacity: 1, duration: 1, ease: "power2.out" }) 
        .to("#titleTopEffect",{ opacity: 0, duration: 1, ease: "power2.out"}) 
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
      window.addEventListener("message", function (event) {
        const message = event.data;
        if (message && message.data && typeof message.data.text === "string") {
          if(message.data.text === "kscrollReveal"){
            showKPanelBg(true); 
          }
        if(message.data.text === "kscrollTop"){
            showKPanelBg(false);
          }
        }
      });


      function showKPanelBg(state){
        const panel = document.querySelector('.panel.top');
          if(state && !bgApplied){
            document.querySelector(".left .panel-logo").style.display = "block";
            document.querySelector(".right .panel-logo").style.display = "block";
            // panel.classList.add("topPanelScroll");
            // panel.style.backgroundImage = 'url(purebg.jpg)'; 
            // panel.style.backgroundRepeat = 'no-repeat';
            // panel.style.backgroundPosition = 'center top';
            // panel.style.backgroundSize = '1920px 1080px';
            bgApplied = true;// prevent reapplying
          }else if(!state && bgApplied){
             document.querySelector(".left .panel-logo").style.display = "none";
            document.querySelector(".right .panel-logo").style.display = "none";
            // panel.classList.remove("topPanelScroll");
            // panel.style.backgroundImage = 'unset'; 
            // panel.style.backgroundRepeat = 'no-repeat';
            // panel.style.backgroundPosition = 'unset';
            // panel.style.backgroundSize = 'unset';
            bgApplied = false; // prevent reapplying
          }

      }