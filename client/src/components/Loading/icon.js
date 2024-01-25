import { gsap } from "gsap"
// import { MorphSVGPlugin } from "gsap-trial/MorphSVGPlugin";

// gsap.registerPlugin(MorphSVGPlugin);
let duration = 0.44;
let timeout = 200;
let loop = true;

export function morphShapes(step){

    // document.querySelector('button').style.display = 'none';

    switch(step){
      case 1: 
        gsap.to("#path-1", { duration: duration, morphSVG: "#path-2-1" });

        gsap.to("#gradient", { attr: { x1: "256", x2: "256", y1: "0", y2: "481.825" }, duration: duration });
        gsap.to("#gradient stop:first-child", { attr: { "stop-color": "#00E8DB", offset: "0" }, duration: duration });
        gsap.to("#gradient stop:last-child", { attr: { "stop-color": "#00B1A7", offset: "1" }, duration: duration });

        gsap.to("#path-2", { duration: duration, morphSVG: "#path-2-2", fill: "#00B1A7", fillOpacity: 1 });
        gsap.to("#path-3", { duration: duration, morphSVG: "#path-2-3", onComplete: function(){

          setTimeout(function(){ morphShapes(2) }, timeout);

        }});

      break;

      case 2: 
      
        gsap.to("#path-1", { duration: duration, morphSVG: "#path-3-1" });

        gsap.to("#gradient", { attr: { x1: "260.5", x2: "260.5", y1: "0", y2: "494" }, duration: duration });
        gsap.to("#gradient stop:first-child", { attr: { "stop-color": "#8697FF", offset: "0" }, duration: duration });
        gsap.to("#gradient stop:last-child", { attr: { "stop-color": "#5468FF", offset: "1" }, duration: duration });

        gsap.to("#path-2", { duration: duration, morphSVG: "#path-3-2", fill: "#596EFF", fillOpacity: 1 });
        gsap.to("#path-3", { duration: duration, morphSVG: "#path-3-3", onComplete: function(){

          if(loop)
            setTimeout(function(){ morphShapes(3) }, timeout);

        }});

      break;

      case 3: 
      
        gsap.to("#path-1", { duration: duration, morphSVG: "#path-1-1" });

        gsap.to("#gradient", { attr: { x1: "256", x2: "256", y1: "0", y2: "493.597" }, duration: duration });
        gsap.to("#gradient stop:first-child", { attr: { "stop-color": "#ADB8FA", offset: "0" }, duration: duration });
        gsap.to("#gradient stop:last-child", { attr: { "stop-color": "#8D9DFC", offset: "1" }, duration: duration });

        gsap.to("#path-2", { duration: duration, morphSVG: "#path-1-2", fill: "#8D9DFC", fillOpacity: 0.92 });
        gsap.to("#path-3", { duration: duration, morphSVG: "#path-1-3", onComplete: function(){

          setTimeout(function(){ morphShapes(1) }, timeout);

        }});

      break;
    }
    
  }