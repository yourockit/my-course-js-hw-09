const t={body:document.querySelector("body"),btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};const e=new class{start(){this.intervalId=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.btnStart.disabled=!0,console.log("Интервал запущен")}stop(){clearInterval(this.intervalId),t.body.removeAttribute("style"),t.btnStart.disabled=!1,console.log("Интервал остановлен")}constructor(){this.intervalId=null}};t.btnStart.addEventListener("click",(()=>{e.start()})),t.btnStop.addEventListener("click",(()=>{e.stop()}));
//# sourceMappingURL=01-color-switcher.f48aba8a.js.map