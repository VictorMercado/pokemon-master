if(!self.define){let e,r={};const i=(i,n)=>(i=new URL(i+".js",n).href,r[i]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=r,document.head.appendChild(e)}else e=i,importScripts(i),r()})).then((()=>{let e=r[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(r[s])return;let d={};const t=e=>i(e,s),f={module:{uri:s},exports:d,require:t};r[s]=Promise.all(n.map((e=>f[e]||t(e)))).then((e=>(o(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BLx7tKtL.css",revision:null},{url:"assets/index-CLIjEfkd.js",revision:null},{url:"assets/workbox-window.prod.es5-D4B6ZjPj.js",revision:null},{url:"index.html",revision:"63068164c20a4672007cebd860dd3f39"},{url:"favicon.png",revision:"ddc7574953929ad7d634cff3303ba0e3"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"apple-touch-icon.png",revision:"78dafd7f571c791fce6e6d465c936f21"},{url:"android-chrome-192x192.png",revision:"7544febbd35ebecee9ad709ac9d166d8"},{url:"android-chrome-512x512.png",revision:"6d627213d96bfde91c649fd1274e6baf"},{url:"icons/arrow-left.svg",revision:"5344bb894484f478b2ad912ef0440436"},{url:"fonts/Inter-Bold.woff2",revision:"444a7284663a3bc886683eb81450b294"},{url:"fonts/Inter-Medium.woff2",revision:"75db5319e7e87c587019a5df08d7272c"},{url:"fonts/Inter-Regular.woff2",revision:"dc131113894217b5031000575d9de002"},{url:"manifest.webmanifest",revision:"4c417b71264f19ddf24a3c098e324410"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
