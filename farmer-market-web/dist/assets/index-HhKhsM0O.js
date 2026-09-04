var pt=Object.defineProperty;var ut=(o,e,t)=>e in o?pt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var f=(o,e,t)=>ut(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var Ne={};(function o(e,t,a,s){var i=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),n=typeof Path2D=="function"&&typeof DOMMatrix=="function",r=(function(){if(!e.OffscreenCanvas)return!1;try{var g=new OffscreenCanvas(1,1),m=g.getContext("2d");m.fillRect(0,0,1,1);var C=g.transferToImageBitmap();m.createPattern(C,"no-repeat")}catch{return!1}return!0})();function d(){}function p(g){var m=t.exports.Promise,C=m!==void 0?m:e.Promise;return typeof C=="function"?new C(g):(g(d,d),null)}var l=(function(g,m){return{transform:function(C){if(g)return C;if(m.has(C))return m.get(C);var I=new OffscreenCanvas(C.width,C.height),O=I.getContext("2d");return O.drawImage(C,0,0),m.set(C,I),I},clear:function(){m.clear()}}})(r,new Map),b=(function(){var g=Math.floor(16.666666666666668),m,C,I={},O=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(m=function(N){var M=Math.random();return I[M]=requestAnimationFrame(function R(F){O===F||O+g-1<F?(O=F,delete I[M],N()):I[M]=requestAnimationFrame(R)}),M},C=function(N){I[N]&&cancelAnimationFrame(I[N])}):(m=function(N){return setTimeout(N,g)},C=function(N){return clearTimeout(N)}),{frame:m,cancel:C}})(),v=(function(){var g,m,C={};function I(O){function N(M,R){O.postMessage({options:M||{},callback:R})}O.init=function(R){var F=R.transferControlToOffscreen();O.postMessage({canvas:F},[F])},O.fire=function(R,F,W){if(m)return N(R,null),m;var X=Math.random().toString(36).slice(2);return m=p(function(K){function Z(ae){ae.data.callback===X&&(delete C[X],O.removeEventListener("message",Z),m=null,l.clear(),W(),K())}O.addEventListener("message",Z),N(R,X),C[X]=Z.bind(null,{data:{callback:X}})}),m},O.reset=function(){O.postMessage({reset:!0});for(var R in C)C[R](),delete C[R]}}return function(){if(g)return g;if(!a&&i){var O=["var CONFETTI, SIZE = {}, module = {};","("+o.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{g=new Worker(URL.createObjectURL(new Blob([O])))}catch(N){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",N),null}I(g)}return g}})(),k={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function $(g,m){return m?m(g):g}function u(g){return g!=null}function S(g,m,C){return $(g&&u(g[m])?g[m]:k[m],C)}function T(g){return g<0?0:Math.floor(g)}function w(g,m){return Math.floor(Math.random()*(m-g))+g}function E(g){return parseInt(g,16)}function L(g){return g.map(V)}function V(g){var m=String(g).replace(/[^0-9a-f]/gi,"");return m.length<6&&(m=m[0]+m[0]+m[1]+m[1]+m[2]+m[2]),{r:E(m.substring(0,2)),g:E(m.substring(2,4)),b:E(m.substring(4,6))}}function y(g){var m=S(g,"origin",Object);return m.x=S(m,"x",Number),m.y=S(m,"y",Number),m}function _(g){g.width=document.documentElement.clientWidth,g.height=document.documentElement.clientHeight}function G(g){var m=g.getBoundingClientRect();g.width=m.width,g.height=m.height}function B(g){var m=document.createElement("canvas");return m.style.position="fixed",m.style.top="0px",m.style.left="0px",m.style.pointerEvents="none",m.style.zIndex=g,m}function P(g,m,C,I,O,N,M,R,F){g.save(),g.translate(m,C),g.rotate(N),g.scale(I,O),g.arc(0,0,1,M,R,F),g.restore()}function J(g){var m=g.angle*(Math.PI/180),C=g.spread*(Math.PI/180);return{x:g.x,y:g.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:g.startVelocity*.5+Math.random()*g.startVelocity,angle2D:-m+(.5*C-Math.random()*C),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:g.color,shape:g.shape,tick:0,totalTicks:g.ticks,decay:g.decay,drift:g.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:g.gravity*3,ovalScalar:.6,scalar:g.scalar,flat:g.flat}}function ie(g,m){m.x+=Math.cos(m.angle2D)*m.velocity+m.drift,m.y+=Math.sin(m.angle2D)*m.velocity+m.gravity,m.velocity*=m.decay,m.flat?(m.wobble=0,m.wobbleX=m.x+10*m.scalar,m.wobbleY=m.y+10*m.scalar,m.tiltSin=0,m.tiltCos=0,m.random=1):(m.wobble+=m.wobbleSpeed,m.wobbleX=m.x+10*m.scalar*Math.cos(m.wobble),m.wobbleY=m.y+10*m.scalar*Math.sin(m.wobble),m.tiltAngle+=.1,m.tiltSin=Math.sin(m.tiltAngle),m.tiltCos=Math.cos(m.tiltAngle),m.random=Math.random()+2);var C=m.tick++/m.totalTicks,I=m.x+m.random*m.tiltCos,O=m.y+m.random*m.tiltSin,N=m.wobbleX+m.random*m.tiltCos,M=m.wobbleY+m.random*m.tiltSin;if(g.fillStyle="rgba("+m.color.r+", "+m.color.g+", "+m.color.b+", "+(1-C)+")",g.beginPath(),n&&m.shape.type==="path"&&typeof m.shape.path=="string"&&Array.isArray(m.shape.matrix))g.fill(ge(m.shape.path,m.shape.matrix,m.x,m.y,Math.abs(N-I)*.1,Math.abs(M-O)*.1,Math.PI/10*m.wobble));else if(m.shape.type==="bitmap"){var R=Math.PI/10*m.wobble,F=Math.abs(N-I)*.1,W=Math.abs(M-O)*.1,X=m.shape.bitmap.width*m.scalar,K=m.shape.bitmap.height*m.scalar,Z=new DOMMatrix([Math.cos(R)*F,Math.sin(R)*F,-Math.sin(R)*W,Math.cos(R)*W,m.x,m.y]);Z.multiplySelf(new DOMMatrix(m.shape.matrix));var ae=g.createPattern(l.transform(m.shape.bitmap),"no-repeat");ae.setTransform(Z),g.globalAlpha=1-C,g.fillStyle=ae,g.fillRect(m.x-X/2,m.y-K/2,X,K),g.globalAlpha=1}else if(m.shape==="circle")g.ellipse?g.ellipse(m.x,m.y,Math.abs(N-I)*m.ovalScalar,Math.abs(M-O)*m.ovalScalar,Math.PI/10*m.wobble,0,2*Math.PI):P(g,m.x,m.y,Math.abs(N-I)*m.ovalScalar,Math.abs(M-O)*m.ovalScalar,Math.PI/10*m.wobble,0,2*Math.PI);else if(m.shape==="star")for(var U=Math.PI/2*3,oe=4*m.scalar,pe=8*m.scalar,ue=m.x,be=m.y,he=5,fe=Math.PI/he;he--;)ue=m.x+Math.cos(U)*pe,be=m.y+Math.sin(U)*pe,g.lineTo(ue,be),U+=fe,ue=m.x+Math.cos(U)*oe,be=m.y+Math.sin(U)*oe,g.lineTo(ue,be),U+=fe;else g.moveTo(Math.floor(m.x),Math.floor(m.y)),g.lineTo(Math.floor(m.wobbleX),Math.floor(O)),g.lineTo(Math.floor(N),Math.floor(M)),g.lineTo(Math.floor(I),Math.floor(m.wobbleY));return g.closePath(),g.fill(),m.tick<m.totalTicks}function A(g,m,C,I,O){var N=m.slice(),M=g.getContext("2d"),R,F,W=p(function(X){function K(){R=F=null,M.clearRect(0,0,I.width,I.height),l.clear(),O(),X()}function Z(){a&&!(I.width===s.width&&I.height===s.height)&&(I.width=g.width=s.width,I.height=g.height=s.height),!I.width&&!I.height&&(C(g),I.width=g.width,I.height=g.height),M.clearRect(0,0,I.width,I.height),N=N.filter(function(ae){return ie(M,ae)}),N.length?R=b.frame(Z):K()}R=b.frame(Z),F=K});return{addFettis:function(X){return N=N.concat(X),W},canvas:g,promise:W,reset:function(){R&&b.cancel(R),F&&F()}}}function Y(g,m){var C=!g,I=!!S(m||{},"resize"),O=!1,N=S(m,"disableForReducedMotion",Boolean),M=i&&!!S(m||{},"useWorker"),R=M?v():null,F=C?_:G,W=g&&R?!!g.__confetti_initialized:!1,X=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,K;function Z(U,oe,pe){for(var ue=S(U,"particleCount",T),be=S(U,"angle",Number),he=S(U,"spread",Number),fe=S(U,"startVelocity",Number),at=S(U,"decay",Number),it=S(U,"gravity",Number),rt=S(U,"drift",Number),je=S(U,"colors",L),ot=S(U,"ticks",Number),Ve=S(U,"shapes"),nt=S(U,"scalar"),lt=!!S(U,"flat"),Ge=y(U),qe=ue,Be=[],dt=g.width*Ge.x,ct=g.height*Ge.y;qe--;)Be.push(J({x:dt,y:ct,angle:be,spread:he,startVelocity:fe,color:je[qe%je.length],shape:Ve[w(0,Ve.length)],ticks:ot,decay:at,gravity:it,drift:rt,scalar:nt,flat:lt}));return K?K.addFettis(Be):(K=A(g,Be,F,oe,pe),K.promise)}function ae(U){var oe=N||S(U,"disableForReducedMotion",Boolean),pe=S(U,"zIndex",Number);if(oe&&X)return p(function(fe){fe()});C&&K?g=K.canvas:C&&!g&&(g=B(pe),document.body.appendChild(g)),I&&!W&&F(g);var ue={width:g.width,height:g.height};R&&!W&&R.init(g),W=!0,R&&(g.__confetti_initialized=!0);function be(){if(R){var fe={getBoundingClientRect:function(){if(!C)return g.getBoundingClientRect()}};F(fe),R.postMessage({resize:{width:fe.width,height:fe.height}});return}ue.width=ue.height=null}function he(){K=null,I&&(O=!1,e.removeEventListener("resize",be)),C&&g&&(document.body.contains(g)&&document.body.removeChild(g),g=null,W=!1)}return I&&!O&&(O=!0,e.addEventListener("resize",be,!1)),R?R.fire(U,ue,he):Z(U,ue,he)}return ae.reset=function(){R&&R.reset(),K&&K.reset()},ae}var q;function ce(){return q||(q=Y(null,{useWorker:!0,resize:!0})),q}function ge(g,m,C,I,O,N,M){var R=new Path2D(g),F=new Path2D;F.addPath(R,new DOMMatrix(m));var W=new Path2D;return W.addPath(F,new DOMMatrix([Math.cos(M)*O,Math.sin(M)*O,-Math.sin(M)*N,Math.cos(M)*N,C,I])),W}function $e(g){if(!n)throw new Error("path confetti are not supported in this browser");var m,C;typeof g=="string"?m=g:(m=g.path,C=g.matrix);var I=new Path2D(m),O=document.createElement("canvas"),N=O.getContext("2d");if(!C){for(var M=1e3,R=M,F=M,W=0,X=0,K,Z,ae=0;ae<M;ae+=2)for(var U=0;U<M;U+=2)N.isPointInPath(I,ae,U,"nonzero")&&(R=Math.min(R,ae),F=Math.min(F,U),W=Math.max(W,ae),X=Math.max(X,U));K=W-R,Z=X-F;var oe=10,pe=Math.min(oe/K,oe/Z);C=[pe,0,0,pe,-Math.round(K/2+R)*pe,-Math.round(Z/2+F)*pe]}return{type:"path",path:m,matrix:C}}function Ee(g){var m,C=1,I="#000000",O='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof g=="string"?m=g:(m=g.text,C="scalar"in g?g.scalar:C,O="fontFamily"in g?g.fontFamily:O,I="color"in g?g.color:I);var N=10*C,M=""+N+"px "+O,R=new OffscreenCanvas(N,N),F=R.getContext("2d");F.font=M;var W=F.measureText(m),X=Math.ceil(W.actualBoundingBoxRight+W.actualBoundingBoxLeft),K=Math.ceil(W.actualBoundingBoxAscent+W.actualBoundingBoxDescent),Z=2,ae=W.actualBoundingBoxLeft+Z,U=W.actualBoundingBoxAscent+Z;X+=Z+Z,K+=Z+Z,R=new OffscreenCanvas(X,K),F=R.getContext("2d"),F.font=M,F.fillStyle=I,F.fillText(m,ae,U);var oe=1/C;return{type:"bitmap",bitmap:R.transferToImageBitmap(),matrix:[oe,0,0,oe,-X*oe/2,-K*oe/2]}}t.exports=function(){return ce().apply(this,arguments)},t.exports.reset=function(){ce().reset()},t.exports.create=Y,t.exports.shapeFromPath=$e,t.exports.shapeFromText=Ee})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Ne,!1);const H=Ne.exports;Ne.exports.create;class xe extends Error{constructor(e,t){const a=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=a}}class Me extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class me extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class mt extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=a}}class ft extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=a}}class bt extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=a}}class We extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class gt extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=a}}class Xe{constructor(e,t,a){this.statusCode=e,this.statusText=t,this.content=a}}class _e{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var x;(function(o){o[o.Trace=0]="Trace",o[o.Debug=1]="Debug",o[o.Information=2]="Information",o[o.Warning=3]="Warning",o[o.Error=4]="Error",o[o.Critical=5]="Critical",o[o.None=6]="None"})(x||(x={}));class ke{constructor(){}log(e,t){}}ke.instance=new ke;const ht="8.0.29";class te{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,a){if(!(e in t))throw new Error(`Unknown ${a} value: ${e}.`)}}class Q{static get isBrowser(){return!Q.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!Q.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!Q.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function Ae(o,e){let t="";return ye(o)?(t=`Binary data of length ${o.byteLength}`,e&&(t+=`. Content: '${xt(o)}'`)):typeof o=="string"&&(t=`String data of length ${o.length}`,e&&(t+=`. Content: '${o}'`)),t}function xt(o){const e=new Uint8Array(o);let t="";return e.forEach(a=>{const s=a<16?"0":"";t+=`0x${s}${a.toString(16)} `}),t.substr(0,t.length-1)}function ye(o){return o&&typeof ArrayBuffer<"u"&&(o instanceof ArrayBuffer||o.constructor&&o.constructor.name==="ArrayBuffer")}async function Ze(o,e,t,a,s,i){const n={},[r,d]=we();n[r]=d,o.log(x.Trace,`(${e} transport) sending data. ${Ae(s,i.logMessageContent)}.`);const p=ye(s)?"arraybuffer":"text",l=await t.post(a,{content:s,headers:{...n,...i.headers},responseType:p,timeout:i.timeout,withCredentials:i.withCredentials});o.log(x.Trace,`(${e} transport) request complete. Response status: ${l.statusCode}.`)}function vt(o){return o===void 0?new Ie(x.Information):o===null?ke.instance:o.log!==void 0?o:new Ie(o)}class yt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class Ie{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const a=`[${new Date().toISOString()}] ${x[e]}: ${t}`;switch(e){case x.Critical:case x.Error:this.out.error(a);break;case x.Warning:this.out.warn(a);break;case x.Information:this.out.info(a);break;default:this.out.log(a);break}}}}function we(){let o="X-SignalR-User-Agent";return Q.isNode&&(o="User-Agent"),[o,wt(ht,St(),At(),kt())]}function wt(o,e,t,a){let s="Microsoft SignalR/";const i=o.split(".");return s+=`${i[0]}.${i[1]}`,s+=` (${o}; `,e&&e!==""?s+=`${e}; `:s+="Unknown OS; ",s+=`${t}`,a?s+=`; ${a}`:s+="; Unknown Runtime Version",s+=")",s}function St(){if(Q.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function kt(){if(Q.isNode)return process.versions.node}function At(){return Q.isNode?"NodeJS":"Browser"}function De(o){return o.stack?o.stack:o.message?o.message:`${o}`}function $t(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class Et extends _e{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||Q.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind($t());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new me;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let a;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),a=new me});let s=null;if(e.timeout){const d=e.timeout;s=setTimeout(()=>{t.abort(),this._logger.log(x.Warning,"Timeout from HTTP request."),a=new Me},d)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},ye(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let i;try{i=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(d){throw a||(this._logger.log(x.Warning,`Error from HTTP request. ${d}.`),d)}finally{s&&clearTimeout(s),e.abortSignal&&(e.abortSignal.onabort=null)}if(!i.ok){const d=await He(i,"text");throw new xe(d||i.statusText,i.status)}const r=await He(i,e.responseType);return new Xe(i.status,i.statusText,r)}getCookieString(e){let t="";return Q.isNode&&this._jar&&this._jar.getCookies(e,(a,s)=>t=s.join("; ")),t}}function He(o,e){let t;switch(e){case"arraybuffer":t=o.arrayBuffer();break;case"text":t=o.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=o.text();break}return t}class Tt extends _e{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new me):e.method?e.url?new Promise((t,a)=>{const s=new XMLHttpRequest;s.open(e.method,e.url,!0),s.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,s.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(ye(e.content)?s.setRequestHeader("Content-Type","application/octet-stream"):s.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const i=e.headers;i&&Object.keys(i).forEach(n=>{s.setRequestHeader(n,i[n])}),e.responseType&&(s.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{s.abort(),a(new me)}),e.timeout&&(s.timeout=e.timeout),s.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),s.status>=200&&s.status<300?t(new Xe(s.status,s.statusText,s.response||s.responseText)):a(new xe(s.response||s.responseText||s.statusText,s.status))},s.onerror=()=>{this._logger.log(x.Warning,`Error from HTTP request. ${s.status}: ${s.statusText}.`),a(new xe(s.statusText,s.status))},s.ontimeout=()=>{this._logger.log(x.Warning,"Timeout from HTTP request."),a(new Me)},s.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class Ct extends _e{constructor(e){if(super(),typeof fetch<"u"||Q.isNode)this._httpClient=new Et(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new Tt(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new me):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class de{static write(e){return`${e}${de.RecordSeparator}`}static parse(e){if(e[e.length-1]!==de.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(de.RecordSeparator);return t.pop(),t}}de.RecordSeparatorCode=30;de.RecordSeparator=String.fromCharCode(de.RecordSeparatorCode);class Rt{writeHandshakeRequest(e){return de.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,a;if(ye(e)){const r=new Uint8Array(e),d=r.indexOf(de.RecordSeparatorCode);if(d===-1)throw new Error("Message is incomplete.");const p=d+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(r.slice(0,p))),a=r.byteLength>p?r.slice(p).buffer:null}else{const r=e,d=r.indexOf(de.RecordSeparator);if(d===-1)throw new Error("Message is incomplete.");const p=d+1;t=r.substring(0,p),a=r.length>p?r.substring(p):null}const s=de.parse(t),i=JSON.parse(s[0]);if(i.type)throw new Error("Expected a handshake response from the server.");return[a,i]}}var D;(function(o){o[o.Invocation=1]="Invocation",o[o.StreamItem=2]="StreamItem",o[o.Completion=3]="Completion",o[o.StreamInvocation=4]="StreamInvocation",o[o.CancelInvocation=5]="CancelInvocation",o[o.Ping=6]="Ping",o[o.Close=7]="Close",o[o.Ack=8]="Ack",o[o.Sequence=9]="Sequence"})(D||(D={}));class Pt{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new yt(this,e)}}class It{constructor(e,t,a){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=a}async _send(e){const t=this._protocol.writeMessage(e);let a=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let s=()=>{},i=()=>{};ye(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(a=new Promise((n,r)=>{s=n,i=r})),this._messages.push(new _t(t,this._totalMessageCount,s,i))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await a}_ack(e){let t=-1;for(let a=0;a<this._messages.length;a++){const s=this._messages[a];if(s._id<=e.sequenceId)t=a,ye(s._message)?this._bufferedByteCount-=s._message.byteLength:this._bufferedByteCount-=s._message.length,s._resolver();else if(this._bufferedByteCount<this._bufferSize)s._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==D.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:D.Sequence,sequenceId:e}));const t=this._messages;for(const a of t)await this._connection.send(a._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case D.Invocation:case D.StreamItem:case D.Completion:case D.StreamInvocation:case D.CancelInvocation:return!0;case D.Close:case D.Sequence:case D.Ping:case D.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:D.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class _t{constructor(e,t,a,s){this._message=e,this._id=t,this._resolver=a,this._rejector=s}}const Bt=30*1e3,Dt=15*1e3,Lt=1e5;var z;(function(o){o.Disconnected="Disconnected",o.Connecting="Connecting",o.Connected="Connected",o.Disconnecting="Disconnecting",o.Reconnecting="Reconnecting"})(z||(z={}));class Fe{static create(e,t,a,s,i,n,r){return new Fe(e,t,a,s,i,n,r)}constructor(e,t,a,s,i,n,r){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(x.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},te.isRequired(e,"connection"),te.isRequired(t,"logger"),te.isRequired(a,"protocol"),this.serverTimeoutInMilliseconds=i??Bt,this.keepAliveIntervalInMilliseconds=n??Dt,this._statefulReconnectBufferSize=r??Lt,this._logger=t,this._protocol=a,this.connection=e,this._reconnectPolicy=s,this._handshakeProtocol=new Rt,this.connection.onreceive=d=>this._processIncomingData(d),this.connection.onclose=d=>this._connectionClosed(d),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=z.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:D.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==z.Disconnected&&this._connectionState!==z.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==z.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=z.Connecting,this._logger.log(x.Debug,"Starting HubConnection.");try{await this._startInternal(),Q.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=z.Connected,this._connectionStarted=!0,this._logger.log(x.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=z.Disconnected,this._logger.log(x.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,a)=>{this._handshakeResolver=t,this._handshakeRejecter=a});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const a={protocol:this._protocol.name,version:t};if(this._logger.log(x.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(a)),this._logger.log(x.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new It(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(x.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===z.Disconnected)return this._logger.log(x.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===z.Disconnecting)return this._logger.log(x.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=z.Disconnecting,this._logger.log(x.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(x.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===z.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new me("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[a,s]=this._replaceStreamingParams(t),i=this._createStreamInvocation(e,t,s);let n;const r=new Pt;return r.cancelCallback=()=>{const d=this._createCancelInvocation(i.invocationId);return delete this._callbacks[i.invocationId],n.then(()=>this._sendWithProtocol(d))},this._callbacks[i.invocationId]=(d,p)=>{if(p){r.error(p);return}else d&&(d.type===D.Completion?d.error?r.error(new Error(d.error)):r.complete():r.next(d.item))},n=this._sendWithProtocol(i).catch(d=>{r.error(d),delete this._callbacks[i.invocationId]}),this._launchStreams(a,n),r}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[a,s]=this._replaceStreamingParams(t),i=this._sendWithProtocol(this._createInvocation(e,t,!0,s));return this._launchStreams(a,i),i}invoke(e,...t){const[a,s]=this._replaceStreamingParams(t),i=this._createInvocation(e,t,!1,s);return new Promise((r,d)=>{this._callbacks[i.invocationId]=(l,b)=>{if(b){d(b);return}else l&&(l.type===D.Completion?l.error?d(new Error(l.error)):r(l.result):d(new Error(`Unexpected message type: ${l.type}`)))};const p=this._sendWithProtocol(i).catch(l=>{d(l),delete this._callbacks[i.invocationId]});this._launchStreams(a,p)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const a=this._methods[e];if(a)if(t){const s=a.indexOf(t);s!==-1&&(a.splice(s,1),a.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const a of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(a)))switch(a.type){case D.Invocation:this._invokeClientMethod(a).catch(s=>{this._logger.log(x.Error,`Invoke client method threw error: ${De(s)}`)});break;case D.StreamItem:case D.Completion:{const s=this._callbacks[a.invocationId];if(s){a.type===D.Completion&&delete this._callbacks[a.invocationId];try{s(a)}catch(i){this._logger.log(x.Error,`Stream callback threw error: ${De(i)}`)}}break}case D.Ping:break;case D.Close:{this._logger.log(x.Information,"Close message received from server.");const s=a.error?new Error("Server returned an error on close: "+a.error):void 0;a.allowReconnect===!0?this.connection.stop(s):this._stopPromise=this._stopInternal(s);break}case D.Ack:this._messageBuffer&&this._messageBuffer._ack(a);break;case D.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(a);break;default:this._logger.log(x.Warning,`Invalid message type: ${a.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,a;try{[a,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(s){const i="Error parsing handshake response: "+s;this._logger.log(x.Error,i);const n=new Error(i);throw this._handshakeRejecter(n),n}if(t.error){const s="Server returned handshake error: "+t.error;this._logger.log(x.Error,s);const i=new Error(s);throw this._handshakeRejecter(i),i}else this._logger.log(x.Debug,"Server handshake complete.");return this._handshakeResolver(),a}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===z.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),a=this._methods[t];if(!a){this._logger.log(x.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(x.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const s=a.slice(),i=!!e.invocationId;let n,r,d;for(const p of s)try{const l=n;n=await p.apply(this,e.arguments),i&&n&&l&&(this._logger.log(x.Error,`Multiple results provided for '${t}'. Sending error to server.`),d=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),r=void 0}catch(l){r=l,this._logger.log(x.Error,`A callback for the method '${t}' threw error '${l}'.`)}d?await this._sendWithProtocol(d):i?(r?d=this._createCompletionMessage(e.invocationId,`${r}`,null):n!==void 0?d=this._createCompletionMessage(e.invocationId,null,n):(this._logger.log(x.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),d=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(d)):n&&this._logger.log(x.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(x.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new me("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===z.Disconnecting?this._completeClose(e):this._connectionState===z.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===z.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=z.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),Q.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(x.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let a=0,s=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),i=this._getNextRetryDelay(a++,0,s);if(i===null){this._logger.log(x.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=z.Reconnecting,e?this._logger.log(x.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(x.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(n=>n.apply(this,[e]))}catch(n){this._logger.log(x.Error,`An onreconnecting callback called with error '${e}' threw error '${n}'.`)}if(this._connectionState!==z.Reconnecting){this._logger.log(x.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;i!==null;){if(this._logger.log(x.Information,`Reconnect attempt number ${a} will start in ${i} ms.`),await new Promise(n=>{this._reconnectDelayHandle=setTimeout(n,i)}),this._reconnectDelayHandle=void 0,this._connectionState!==z.Reconnecting){this._logger.log(x.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=z.Connected,this._logger.log(x.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(n=>n.apply(this,[this.connection.connectionId]))}catch(n){this._logger.log(x.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${n}'.`)}return}catch(n){if(this._logger.log(x.Information,`Reconnect attempt failed because of error '${n}'.`),this._connectionState!==z.Reconnecting){this._logger.log(x.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===z.Disconnecting&&this._completeClose();return}s=n instanceof Error?n:new Error(n.toString()),i=this._getNextRetryDelay(a++,Date.now()-t,s)}}this._logger.log(x.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${a} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,a){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:a})}catch(s){return this._logger.log(x.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${s}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(a=>{const s=t[a];try{s(null,e)}catch(i){this._logger.log(x.Error,`Stream 'error' callback called with '${e}' threw error: ${De(i)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,a,s){if(a)return s.length!==0?{arguments:t,streamIds:s,target:e,type:D.Invocation}:{arguments:t,target:e,type:D.Invocation};{const i=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:i.toString(),streamIds:s,target:e,type:D.Invocation}:{arguments:t,invocationId:i.toString(),target:e,type:D.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const a in e)e[a].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(a)))},error:s=>{let i;s instanceof Error?i=s.message:s&&s.toString?i=s.toString():i="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(a,i)))},next:s=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(a,s)))}})}}_replaceStreamingParams(e){const t=[],a=[];for(let s=0;s<e.length;s++){const i=e[s];if(this._isObservable(i)){const n=this._invocationId;this._invocationId++,t[n]=i,a.push(n.toString()),e.splice(s,1)}}return[t,a]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,a){const s=this._invocationId;return this._invocationId++,a.length!==0?{arguments:t,invocationId:s.toString(),streamIds:a,target:e,type:D.StreamInvocation}:{arguments:t,invocationId:s.toString(),target:e,type:D.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:D.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:D.StreamItem}}_createCompletionMessage(e,t,a){return t?{error:t,invocationId:e,type:D.Completion}:{invocationId:e,result:a,type:D.Completion}}_createCloseMessage(){return{type:D.Close}}}const Ot=[0,2e3,1e4,3e4,null];class Ke{constructor(e){this._retryDelays=e!==void 0?[...e,null]:Ot}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class ve{}ve.Authorization="Authorization";ve.Cookie="Cookie";class Nt extends _e{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const a=await this._innerClient.send(e);return t&&a.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):a}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[ve.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[ve.Authorization]&&delete e.headers[ve.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var se;(function(o){o[o.None=0]="None",o[o.WebSockets=1]="WebSockets",o[o.ServerSentEvents=2]="ServerSentEvents",o[o.LongPolling=4]="LongPolling"})(se||(se={}));var re;(function(o){o[o.Text=1]="Text",o[o.Binary=2]="Binary"})(re||(re={}));let Mt=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class ze{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,a){this._httpClient=e,this._logger=t,this._pollAbort=new Mt,this._options=a,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(te.isRequired(e,"url"),te.isRequired(t,"transferFormat"),te.isIn(t,re,"transferFormat"),this._url=e,this._logger.log(x.Trace,"(LongPolling transport) Connecting."),t===re.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[a,s]=we(),i={[a]:s,...this._options.headers},n={abortSignal:this._pollAbort.signal,headers:i,timeout:1e5,withCredentials:this._options.withCredentials};t===re.Binary&&(n.responseType="arraybuffer");const r=`${e}&_=${Date.now()}`;this._logger.log(x.Trace,`(LongPolling transport) polling: ${r}.`);const d=await this._httpClient.get(r,n);d.statusCode!==200?(this._logger.log(x.Error,`(LongPolling transport) Unexpected response code: ${d.statusCode}.`),this._closeError=new xe(d.statusText||"",d.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,n)}async _poll(e,t){try{for(;this._running;)try{const a=`${e}&_=${Date.now()}`;this._logger.log(x.Trace,`(LongPolling transport) polling: ${a}.`);const s=await this._httpClient.get(a,t);s.statusCode===204?(this._logger.log(x.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):s.statusCode!==200?(this._logger.log(x.Error,`(LongPolling transport) Unexpected response code: ${s.statusCode}.`),this._closeError=new xe(s.statusText||"",s.statusCode),this._running=!1):s.content?(this._logger.log(x.Trace,`(LongPolling transport) data received. ${Ae(s.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(s.content)):this._logger.log(x.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(a){this._running?a instanceof Me?this._logger.log(x.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=a,this._running=!1):this._logger.log(x.Trace,`(LongPolling transport) Poll errored after shutdown: ${a.message}`)}}finally{this._logger.log(x.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?Ze(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(x.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(x.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,a]=we();e[t]=a;const s={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let i;try{await this._httpClient.delete(this._url,s)}catch(n){i=n}i?i instanceof xe&&(i.statusCode===404?this._logger.log(x.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(x.Trace,`(LongPolling transport) Error sending a DELETE request: ${i}`)):this._logger.log(x.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(x.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(x.Trace,e),this.onclose(this._closeError)}}}class Ft{constructor(e,t,a,s){this._httpClient=e,this._accessToken=t,this._logger=a,this._options=s,this.onreceive=null,this.onclose=null}async connect(e,t){return te.isRequired(e,"url"),te.isRequired(t,"transferFormat"),te.isIn(t,re,"transferFormat"),this._logger.log(x.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((a,s)=>{let i=!1;if(t!==re.Text){s(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let n;if(Q.isBrowser||Q.isWebWorker)n=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const r=this._httpClient.getCookieString(e),d={};d.Cookie=r;const[p,l]=we();d[p]=l,n=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...d,...this._options.headers}})}try{n.onmessage=r=>{if(this.onreceive)try{this._logger.log(x.Trace,`(SSE transport) data received. ${Ae(r.data,this._options.logMessageContent)}.`),this.onreceive(r.data)}catch(d){this._close(d);return}},n.onerror=r=>{i?this._close():s(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},n.onopen=()=>{this._logger.log(x.Information,`SSE connected to ${this._url}`),this._eventSource=n,i=!0,a()}}catch(r){s(r);return}})}async send(e){return this._eventSource?Ze(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class Ut{constructor(e,t,a,s,i,n){this._logger=a,this._accessTokenFactory=t,this._logMessageContent=s,this._webSocketConstructor=i,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=n}async connect(e,t){te.isRequired(e,"url"),te.isRequired(t,"transferFormat"),te.isIn(t,re,"transferFormat"),this._logger.log(x.Trace,"(WebSockets transport) Connecting.");let a;return this._accessTokenFactory&&(a=await this._accessTokenFactory()),new Promise((s,i)=>{e=e.replace(/^http/,"ws");let n;const r=this._httpClient.getCookieString(e);let d=!1;if(Q.isNode||Q.isReactNative){const p={},[l,b]=we();p[l]=b,a&&(p[ve.Authorization]=`Bearer ${a}`),r&&(p[ve.Cookie]=r),n=new this._webSocketConstructor(e,void 0,{headers:{...p,...this._headers}})}else a&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(a)}`);n||(n=new this._webSocketConstructor(e)),t===re.Binary&&(n.binaryType="arraybuffer"),n.onopen=p=>{this._logger.log(x.Information,`WebSocket connected to ${e}.`),this._webSocket=n,d=!0,s()},n.onerror=p=>{let l=null;typeof ErrorEvent<"u"&&p instanceof ErrorEvent?l=p.error:l="There was an error with the transport",this._logger.log(x.Information,`(WebSockets transport) ${l}.`)},n.onmessage=p=>{if(this._logger.log(x.Trace,`(WebSockets transport) data received. ${Ae(p.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(p.data)}catch(l){this._close(l);return}},n.onclose=p=>{if(d)this._close(p);else{let l=null;typeof ErrorEvent<"u"&&p instanceof ErrorEvent?l=p.error:l="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",i(new Error(l))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(x.Trace,`(WebSockets transport) sending data. ${Ae(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(x.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const Ye=100;class jt{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,te.isRequired(e,"url"),this._logger=vt(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let a=null,s=null;if(Q.isNode&&typeof require<"u"){const i=typeof __webpack_require__=="function"?__non_webpack_require__:require;a=i("ws"),s=i("eventsource")}!Q.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:Q.isNode&&!t.WebSocket&&a&&(t.WebSocket=a),!Q.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:Q.isNode&&!t.EventSource&&typeof s<"u"&&(t.EventSource=s),this._httpClient=new Nt(t.httpClient||new Ct(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||re.Binary,te.isIn(e,re,"transferFormat"),this._logger.log(x.Debug,`Starting connection with transfer format '${re[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(x.Error,t),await this._stopPromise,Promise.reject(new me(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(x.Error,t),Promise.reject(new me(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new Ue(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(x.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(x.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(x.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(x.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===se.WebSockets)this.transport=this._constructTransport(se.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let a=null,s=0;do{if(a=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new me("The connection was stopped during negotiation.");if(a.error)throw new Error(a.error);if(a.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(a.url&&(t=a.url),a.accessToken){const i=a.accessToken;this._accessTokenFactory=()=>i,this._httpClient._accessToken=i,this._httpClient._accessTokenFactory=void 0}s++}while(a.url&&s<Ye);if(s===Ye&&a.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,a,e)}this.transport instanceof ze&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(x.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(a){return this._logger.log(x.Error,"Failed to start the connection: "+a),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(a)}}async _getNegotiationResponse(e){const t={},[a,s]=we();t[a]=s;const i=this._resolveNegotiateUrl(e);this._logger.log(x.Debug,`Sending negotiation request: ${i}.`);try{const n=await this._httpClient.post(i,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(n.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${n.statusCode}'`));const r=JSON.parse(n.content);return(!r.negotiateVersion||r.negotiateVersion<1)&&(r.connectionToken=r.connectionId),r.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new We("Client didn't negotiate Stateful Reconnect but the server did.")):r}catch(n){let r="Failed to complete negotiation with the server: "+n;return n instanceof xe&&n.statusCode===404&&(r=r+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(x.Error,r),Promise.reject(new We(r))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,a,s){let i=this._createConnectUrl(e,a.connectionToken);if(this._isITransport(t)){this._logger.log(x.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(i,s),this.connectionId=a.connectionId;return}const n=[],r=a.availableTransports||[];let d=a;for(const p of r){const l=this._resolveTransportOrError(p,t,s,(d==null?void 0:d.useStatefulReconnect)===!0);if(l instanceof Error)n.push(`${p.transport} failed:`),n.push(l);else if(this._isITransport(l)){if(this.transport=l,!d){try{d=await this._getNegotiationResponse(e)}catch(b){return Promise.reject(b)}i=this._createConnectUrl(e,d.connectionToken)}try{await this._startTransport(i,s),this.connectionId=d.connectionId;return}catch(b){if(this._logger.log(x.Error,`Failed to start the transport '${p.transport}': ${b}`),d=void 0,n.push(new bt(`${p.transport} failed: ${b}`,se[p.transport])),this._connectionState!=="Connecting"){const v="Failed to select transport before stop() was called.";return this._logger.log(x.Debug,v),Promise.reject(new me(v))}}}}return n.length>0?Promise.reject(new gt(`Unable to connect to the server with any of the available transports. ${n.join(" ")}`,n)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case se.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new Ut(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case se.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Ft(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case se.LongPolling:return new ze(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async a=>{let s=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{s=!0}else{this._stopConnection(a);return}s&&this._stopConnection(a)}:this.transport.onclose=a=>this._stopConnection(a),this.transport.connect(e,t)}_resolveTransportOrError(e,t,a,s){const i=se[e.transport];if(i==null)return this._logger.log(x.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Vt(t,i))if(e.transferFormats.map(r=>re[r]).indexOf(a)>=0){if(i===se.WebSockets&&!this._options.WebSocket||i===se.ServerSentEvents&&!this._options.EventSource)return this._logger.log(x.Debug,`Skipping transport '${se[i]}' because it is not supported in your environment.'`),new mt(`'${se[i]}' is not supported in your environment.`,i);this._logger.log(x.Debug,`Selecting transport '${se[i]}'.`);try{return this.features.reconnect=i===se.WebSockets?s:void 0,this._constructTransport(i)}catch(r){return r}}else return this._logger.log(x.Debug,`Skipping transport '${se[i]}' because it does not support the requested transfer format '${re[a]}'.`),new Error(`'${se[i]}' does not support ${re[a]}.`);else return this._logger.log(x.Debug,`Skipping transport '${se[i]}' because it was disabled by the client.`),new ft(`'${se[i]}' is disabled by the client.`,i)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(x.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(x.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(x.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(x.Error,`Connection disconnected with error '${e}'.`):this._logger.log(x.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(x.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(x.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!Q.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(x.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const a=new URLSearchParams(t.searchParams);return a.has("negotiateVersion")||a.append("negotiateVersion",this._negotiateVersion.toString()),a.has("useStatefulReconnect")?a.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&a.append("useStatefulReconnect","true"),t.search=a.toString(),t.toString()}}function Vt(o,e){return!o||(e&o)!==0}class Ue{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new Te,this._transportResult=new Te,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new Te),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new Te;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):Ue._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(a){e.reject(a)}}}static _concatBuffers(e){const t=e.map(i=>i.byteLength).reduce((i,n)=>i+n),a=new Uint8Array(t);let s=0;for(const i of e)a.set(new Uint8Array(i),s),s+=i.byteLength;return a.buffer}}class Te{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const Gt="json";class qt{constructor(){this.name=Gt,this.version=2,this.transferFormat=re.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=ke.instance);const a=de.parse(e),s=[];for(const i of a){const n=JSON.parse(i);if(typeof n.type!="number")throw new Error("Invalid payload.");switch(n.type){case D.Invocation:this._isInvocationMessage(n);break;case D.StreamItem:this._isStreamItemMessage(n);break;case D.Completion:this._isCompletionMessage(n);break;case D.Ping:break;case D.Close:break;case D.Ack:this._isAckMessage(n);break;case D.Sequence:this._isSequenceMessage(n);break;default:t.log(x.Information,"Unknown message type '"+n.type+"' ignored.");continue}s.push(n)}return s}writeMessage(e){return de.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const Wt={trace:x.Trace,debug:x.Debug,info:x.Information,information:x.Information,warn:x.Warning,warning:x.Warning,error:x.Error,critical:x.Critical,none:x.None};function Ht(o){const e=Wt[o.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${o}`)}class Kt{configureLogging(e){if(te.isRequired(e,"logging"),zt(e))this.logger=e;else if(typeof e=="string"){const t=Ht(e);this.logger=new Ie(t)}else this.logger=new Ie(e);return this}withUrl(e,t){return te.isRequired(e,"url"),te.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return te.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new Ke(e):this.reconnectPolicy=e:this.reconnectPolicy=new Ke,this}withServerTimeout(e){return te.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return te.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new jt(this.url,e);return Fe.create(t,this.logger||ke.instance,this.protocol||new qt,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function zt(o){return o.log!==void 0}class Yt{constructor(){f(this,"hubConnection",null);f(this,"isConnected",!1);f(this,"reconnectAttempts",0);f(this,"maxReconnectAttempts",10);f(this,"statusListeners",[]);f(this,"trackingListeners",[]);f(this,"farmerOrderListeners",[]);f(this,"deliveryConfirmedListeners",[]);f(this,"pollingIntervals",new Map);f(this,"pollingCallback",null)}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Kt().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect({nextRetryDelayInMilliseconds:t=>Math.min(1e3*Math.pow(2,t.previousRetryCount),3e4)}).configureLogging(x.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{const a={orderId:t.orderId,status:t.status,message:t.message,timestamp:new Date().toISOString()};this.statusListeners.forEach(s=>s(t.orderId,t.status,t.message)),this.trackingListeners.forEach(s=>s(a))}),this.hubConnection.on("NewOrderForFarmer",t=>{this.farmerOrderListeners.forEach(a=>a(t.orderId,t.productName,t.qtyKg))}),this.hubConnection.on("DeliveryConfirmed",t=>{this.deliveryConfirmedListeners.forEach(a=>a(t.orderId,t.farmerCut,t.driverCut))}),this.hubConnection.on("DriverLocationUpdate",t=>{const a={orderId:t.orderId,status:"PickedUp",message:`Driver is ${t.estimatedMinutes} minutes away`,gpsLat:t.lat,gpsLng:t.lng,estimatedArrivalMin:t.estimatedMinutes,timestamp:new Date().toISOString()};this.trackingListeners.forEach(s=>s(a))}),this.hubConnection.onreconnecting(()=>{this.isConnected=!1,this.reconnectAttempts++,console.log(`SignalR reconnecting (attempt ${this.reconnectAttempts})...`)}),this.hubConnection.onreconnected(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR reconnected successfully"),this.stopAllPolling()}),this.hubConnection.onclose(()=>{this.isConnected=!1,console.log("SignalR connection closed. Activating polling fallback."),this.activatePollingFallback()}),this.hubConnection.start().then(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection failed — using polling fallback",t),this.activatePollingFallback()})}catch{console.log("SignalR unavailable — running in polling mode"),this.activatePollingFallback()}}stopConnection(){this.stopAllPolling(),this.hubConnection&&(this.hubConnection.stop(),this.hubConnection=null,this.isConnected=!1)}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}leaveOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("LeaveOrder",e).catch(console.error),this.stopPollingForOrder(e)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}onOrderTracking(e){return this.trackingListeners.push(e),()=>{this.trackingListeners=this.trackingListeners.filter(t=>t!==e)}}onNewFarmerOrder(e){return this.farmerOrderListeners.push(e),()=>{this.farmerOrderListeners=this.farmerOrderListeners.filter(t=>t!==e)}}onDeliveryConfirmed(e){return this.deliveryConfirmedListeners.push(e),()=>{this.deliveryConfirmedListeners=this.deliveryConfirmedListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,a){this.statusListeners.forEach(s=>s(e,t,a)),this.trackingListeners.forEach(s=>s({orderId:e,status:t,message:a,timestamp:new Date().toISOString()}))}setPollingCallback(e){this.pollingCallback=e}startPollingForOrder(e,t=15e3){if(this.pollingIntervals.has(e))return;const a=setInterval(async()=>{this.pollingCallback&&await this.pollingCallback(e)},t);this.pollingIntervals.set(e,a)}stopPollingForOrder(e){const t=this.pollingIntervals.get(e);t&&(clearInterval(t),this.pollingIntervals.delete(e))}stopAllPolling(){this.pollingIntervals.forEach(e=>clearInterval(e)),this.pollingIntervals.clear()}activatePollingFallback(){}getConnectionState(){return this.isConnected?"connected":this.reconnectAttempts>0&&this.reconnectAttempts<this.maxReconnectAttempts?"reconnecting":this.pollingIntervals.size>0?"polling":"disconnected"}}const le=new Yt;function j(o){let e=o;const t=(()=>e);return t.set=a=>{e=a},t.update=a=>{e=a(e)},t.asReadonly=()=>(()=>e),t}function Qe(o){return()=>o()}const ne=class ne{constructor(){f(this,"_token",j(this.loadStoredToken()));f(this,"_currentUser",j(this.loadStoredUser()));f(this,"_impersonationOriginalUser",j(null));f(this,"_allUsers",j([]));f(this,"_listings",j([]));f(this,"_orders",j([]));f(this,"_reviews",j([]));f(this,"_notifications",j([]));f(this,"_priceBenchmarks",j([]));f(this,"_standingOrders",j([]));f(this,"_kycQueue",j([]));f(this,"_verificationQueue",j([]));f(this,"_agentRegisteredFarmers",j([]));f(this,"_anomalyAlerts",j([]));f(this,"_regionalAnalytics",j([]));f(this,"_payoutApprovals",j([]));f(this,"_deliveryZones",j([]));f(this,"_featureFlags",j([]));f(this,"_blacklist",j([]));f(this,"_auditLogs",j([]));f(this,"_banners",j([]));f(this,"_platformConfig",j(this.loadStoredPlatformConfig()));f(this,"_globalBusinessRules",j(this.loadStoredBusinessRules()));f(this,"_farmerSummary",j({totalEarnedEtb:0,pendingEscrowEtb:0,releasedEtb:0,completedOrdersCount:0,pendingOrdersCount:0,totalWithholdingTaxPaidEtb:0}));f(this,"_driverSummary",j({totalEarnedEtb:0,pendingEtb:0,deliveredTripsCount:0,ruralBonusEtb:0}));f(this,"_platformStats",j({totalUsers:0,totalFarmers:0,totalBuyers:0,totalDrivers:0,totalListings:0,totalOrders:0,totalTransactionVolumeEtb:0,totalPlatformCommissionEtb:0,activeEscrowHeldEtb:0,disputedOrdersCount:0,totalMetricTonsMoved:0,middlemanMarginSavedEtb:0,totalVatRemittedEtb:0,totalWithholdingReportedEtb:0}));f(this,"_offlineQueue",j(this.loadStoredOfflineQueue()));f(this,"_isOfflineMode",j(!1));f(this,"_accountData",j({addresses:[],paymentMethods:[],coupons:[],notificationPreferences:[],sessions:[],twoFactor:null}));f(this,"_rolePermissions",j(this.loadStoredRolePermissions()));f(this,"token",this._token.asReadonly());f(this,"currentUser",this._currentUser.asReadonly());f(this,"isAuthenticatedSignal",Qe(()=>!!this._token()&&!!this._currentUser()));f(this,"isImpersonatingSignal",Qe(()=>!!this._impersonationOriginalUser()));f(this,"originalSuperAdmin",this._impersonationOriginalUser.asReadonly());f(this,"allUsersSignal",this._allUsers.asReadonly());f(this,"listingsSignal",this._listings.asReadonly());f(this,"ordersSignal",this._orders.asReadonly());f(this,"reviewsSignal",this._reviews.asReadonly());f(this,"notificationsSignal",this._notifications.asReadonly());f(this,"offlineQueueSignal",this._offlineQueue.asReadonly());f(this,"isOfflineModeSignal",this._isOfflineMode.asReadonly());f(this,"accountDataSignal",this._accountData.asReadonly());f(this,"bannersSignal",this._banners.asReadonly());f(this,"rolePermissionsSignal",this._rolePermissions.asReadonly());f(this,"listeners",[]);this._token()&&this.initSignalR(this._token()),this.initInfrastructure()}initInfrastructure(){const e=this._token();e&&(this.initSignalR(e),this.fetchMe().catch(()=>this.logout()),this.fetchAccountData().catch(t=>console.warn("Could not load account data",t))),this.setupSignalRListeners(),this.refreshAllData().catch(t=>console.warn("Initial data refresh warning:",t))}setupSignalRListeners(){le.onOrderStatusChanged((e,t,a)=>{var s;this._orders.update(i=>i.map(n=>n.id===e?{...n,status:t}:n)),this.addNotification({id:`notif-sig-${Date.now()}`,userId:((s=this._currentUser())==null?void 0:s.id)||"",type:"order",channel:"in_app",messageEn:`Order #${e.slice(0,8)} status changed to ${t}: ${a||""}`,messageAm:`የትዕዛዝ #${e.slice(0,8)} ሁኔታ ወደ ${t} ተቀይሯል፡ ${a||""}`,read:!1,createdAt:new Date().toISOString()}),this.notify()}),le.onNewFarmerOrder((e,t,a)=>{var s;this.fetchOrders(),this.addNotification({id:`notif-ord-${Date.now()}`,userId:((s=this._currentUser())==null?void 0:s.id)||"",type:"order",channel:"in_app",messageEn:`🌾 New purchase order received: ${a} kg of ${t}.`,messageAm:`🌾 አዲስ የግዢ ትዕዛዝ ደርሶዎታል፡ ${a} ኪ.ግ ${t}።`,read:!1,createdAt:new Date().toISOString()}),this.notify()}),le.onDeliveryConfirmed((e,t,a)=>{var s;this.fetchOrders(),this.addNotification({id:`notif-deliv-${Date.now()}`,userId:((s=this._currentUser())==null?void 0:s.id)||"",type:"payout",channel:"sms",messageEn:`💰 Delivery confirmed for Order #${e.slice(0,8)}. Payout released via Telebirr Escrow.`,messageAm:`💰 የትዕዛዝ #${e.slice(0,8)} ርክክብ ተረጋግጧል። ክፍያው በቴሌብር ዋስትና ተለቋል።`,read:!1,createdAt:new Date().toISOString()}),this.notify()})}loadStoredToken(){try{return localStorage.getItem("token")||null}catch{return null}}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}loadStoredOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");return e?JSON.parse(e):[]}catch{return[]}}saveOfflineQueueToStorage(e){try{localStorage.setItem("offlineQueue",JSON.stringify(e))}catch(t){console.warn("Failed to save offline queue",t)}}loadStoredPlatformConfig(){try{const e=localStorage.getItem("farmerMarketPlatformConfig");if(e)return JSON.parse(e)}catch{}return{farmerSharePercent:90,driverSharePercent:5,platformFeePercent:5,withholdingTaxPercent:2,vatOnCommissionPercent:15,highValuePayoutThresholdEtb:5e4,emergencyEscrowFrozen:!1,telebirrAppId:"",telebirrShortCode:"",telebirrApiKey:"",telebirrEscrowVaultKey:"",twilioAccountSid:"",twilioAuthToken:"",twilioFromNumber:"",mapsGeocodingApiKey:"",postgisSpatialIndexEnabled:!0}}loadStoredBusinessRules(){try{const e=localStorage.getItem("farmerMarketBusinessRules");if(e)return JSON.parse(e)}catch{}return{minOrderKg:10,maxOrderKg:5e4,maxDistanceKm:450,priceFloorVariancePercent:-30,priceCeilingVariancePercent:250,requireFaydaForOrdersAboveKg:500,autoArbitrateAfterHours:48}}loadStoredRolePermissions(){try{const e=localStorage.getItem("farmerMarketRolePermissions");if(e){const t=JSON.parse(e),a=JSON.parse(JSON.stringify(ne.DEFAULT_ROLE_PERMISSIONS));for(const s of Object.keys(ne.DEFAULT_ROLE_PERMISSIONS))t[s]&&(a[s]={...a[s],...t[s]});return a}}catch(e){console.warn("Failed to parse stored role permissions, using defaults.",e)}return JSON.parse(JSON.stringify(ne.DEFAULT_ROLE_PERMISSIONS))}getAuthHeaders(){const e={"Content-Type":"application/json"},t=this._token();return t&&(e.Authorization=`Bearer ${t}`),e}async requestApi(e,t={}){const a={...this.getAuthHeaders(),...t.headers||{}};let s;try{s=await fetch(e,{...t,headers:a})}catch(n){throw new Error((n==null?void 0:n.message)||"Network request failed. Is the backend server running?")}if(!s.ok){let n=`HTTP error ${s.status}`;try{const r=await s.json();n=r.error||r.message||n}catch{}throw new Error(n)}const i=s.headers.get("content-type");return i&&i.includes("application/json")?await s.json():await s.text()}initSignalR(e){try{le.startConnection(e||this._token()||void 0)}catch(t){console.warn("SignalR connection initialization failed",t)}}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return!!this._token()&&!!this._currentUser()}getToken(){return this._token()}getCurrentUser(){return this._currentUser()}getAccountData(){return this._accountData()}getIsOfflineMode(){return this._isOfflineMode()}getOfflineQueue(){return this._offlineQueue()}toggleOfflineMode(){const e=!this._isOfflineMode();return this._isOfflineMode.set(e),this.notify(),e}getListings(e,t,a,s,i,n,r,d){let p=this._listings();if(e&&e!=="All"&&(p=p.filter(l=>l.category.toLowerCase()===e.toLowerCase())),t&&t!=="All"&&(p=p.filter(l=>l.region.toLowerCase().includes(t.toLowerCase()))),a){const l=a.toLowerCase();p=p.filter(b=>b.productName.toLowerCase().includes(l)||b.nameAm&&b.nameAm.includes(l))}return s!==void 0&&s>0&&(p=p.filter(l=>(l.distanceKm||0)<=s)),i&&i!=="All"&&(p=p.filter(l=>l.grade===i)),n&&n!=="All"&&(p=p.filter(l=>l.ripeness===n)),r&&(p=p.filter(l=>l.isOrganic)),d&&(p=p.filter(l=>l.isAdvanceHarvest)),p}getListingById(e){return this._listings().find(t=>t.id===e)}getOrders(e){let t=this._orders();if(e&&e!=="admin"&&e!=="superadmin"){const a=this._currentUser();a&&(e==="farmer"&&(t=t.filter(s=>s.farmerId===a.id)),e==="buyer"&&(t=t.filter(s=>s.buyerId===a.id)),e==="driver"&&(t=t.filter(s=>s.driverId===a.id)))}return t}getReviews(e){return e?this._reviews().filter(t=>t.revieweeId===e):this._reviews()}getReviewsForFarmer(e){return this._reviews().filter(t=>t.revieweeId===e)}getReviewsForListing(e){return this._reviews().filter(t=>t.listingId===e)}getFarmerRatingStats(e){const t=this.getReviewsForFarmer(e);if(!t||t.length===0){const r={5:80,4:15,3:5,2:0,1:0};return{averageRating:4.8,reviewCount:0,ratingDistribution:r,distribution:r,distributionCounts:{5:0,4:0,3:0,2:0,1:0}}}const a=t.reduce((r,d)=>r+d.rating,0),s=Math.round(a/t.length*10)/10,i={5:0,4:0,3:0,2:0,1:0};t.forEach(r=>{const d=Math.max(1,Math.min(5,Math.round(r.rating)));i[d]=(i[d]||0)+1});const n={};for(let r=1;r<=5;r++)n[r]=Math.round((i[r]||0)/t.length*100);return{averageRating:s,reviewCount:t.length,ratingDistribution:n,distribution:n,distributionCounts:i}}getPriceBenchmarks(){return this._priceBenchmarks()}getStandingOrders(){return this._standingOrders()}getKycQueue(){return this._kycQueue()}getVerificationQueue(e,t){let a=this._verificationQueue();return e&&e!=="All"&&(a=a.filter(s=>s.userRole.toLowerCase()===e.toLowerCase())),t&&t!=="All"&&(a=a.filter(s=>s.verificationStatus===t)),a}getVerificationStatus(e){var t,a;if(e){const s=this._verificationQueue().find(i=>i.userId===e);if(s)return s.verificationStatus}return((t=this._currentUser())==null?void 0:t.verificationStatus)||((a=this._currentUser())!=null&&a.verified?"Approved":"PendingSubmission")}getAgentRegisteredFarmers(){return this._agentRegisteredFarmers()}getAnomalyAlerts(){return this._anomalyAlerts()}getRegionalAnalytics(){return this._regionalAnalytics()}getAllUsers(){return this._allUsers()}getUserById(e){const t=(e||"").trim();if(t)return this._allUsers().find(a=>a.id===t||a.phone===t||a.email&&a.email.toLowerCase()===t.toLowerCase())}getFarmerSummary(){return this._farmerSummary()}getDriverSummary(){return this._driverSummary()}getPlatformStats(){return this._platformStats()}getNotifications(){return this._notifications()}getPendingPayoutApprovals(){return this._payoutApprovals()}getAllPayoutApprovals(){return this._payoutApprovals()}getDeliveryZoneConfigs(){return this._deliveryZones()}getDeliveryZones(){return this._deliveryZones()}getFeatureFlags(){return this._featureFlags()}getBlacklist(){return this._blacklist()}getSystemAuditLogs(){return this._auditLogs()}getBanners(e){const t=this._banners();if(e&&e.toLowerCase()!=="all"){const a=e.toLowerCase();return t.filter(s=>s.targetAudience.toLowerCase()===a||s.targetAudience.toLowerCase()==="all")}return t}getActiveBanners(e,t){let a=this.getBanners(e).filter(s=>s.isActive);return t&&t!=="All"&&(a=a.filter(s=>!s.targetRegion||s.targetRegion.toLowerCase()==="all"||s.targetRegion.toLowerCase().includes(t.toLowerCase()))),a}getBannerById(e){return this._banners().find(t=>t.id===e)}getPlatformConfig(){return this._platformConfig()}getGlobalBusinessRules(){return this._globalBusinessRules()}getOptimizedRoute(e){return{id:`route-${e||"active"}`,title:"Central Corridor Agricultural Dispatch",totalDistanceKm:185,estimatedHours:4.5,totalWeightKg:3200,driverCommissionEtb:1450,ruralSubsidyEtb:250,stops:[{stopNumber:1,type:"pickup",locationName:"Debre Zeit Farm Hub",contactName:"Abebe Bikila",phone:"+251 911 223 344",cargoDetails:"1500kg Red Onions",weightKg:1500,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Aggregation Depot",contactName:"Almaz Ayana",phone:"+251 922 334 455",cargoDetails:"1700kg Teff Magna",weightKg:1700,completed:!1},{stopNumber:3,type:"dropoff",locationName:"Mercato Fresh Wholesale Depot, Addis Ababa",contactName:"Dawit Wholesale Hub",phone:"+251 933 445 566",cargoDetails:"Full Load Consignment",weightKg:3200,completed:!1}]}}async login(e,t){try{const s=await this.requestOtp(e);if(s&&s.demoCode)return await this.verifyOtp(e,s.demoCode)}catch{}const a=this.getUserById(e);if(a)return this._currentUser.set(a),localStorage.setItem("currentUser",JSON.stringify(a)),this.notify(),a;throw new Error(`Login failed for phone number ${e}`)}async register(e){const t=await this.requestApi("/api/auth/register",{method:"POST",body:JSON.stringify(e)});return this._token.set(t.token),this._currentUser.set(t.user),this._impersonationOriginalUser.set(null),localStorage.setItem("token",t.token),localStorage.setItem("currentUser",JSON.stringify(t.user)),this.initSignalR(t.token),await this.refreshAllData(),this.notify(),t.user}async registerUser(e,t,a,s,i,n){return typeof e=="string"?await this.register({name:e,nameAm:t||e,phone:a||"",role:s||"buyer",region:i||"Oromia (Bishoftu)",email:n}):await this.register(e)}async requestOtp(e){try{const t=await this.requestApi("/api/auth/request-otp",{method:"POST",body:JSON.stringify({phone:e})});return{success:!0,demoCode:t.demoCode||t.otp||"123456",userName:t.userName||"Marketplace User",role:t.role||"buyer",email:t.email,message:t.message||"Verification code sent."}}catch{const t=this.getUserById(e);return{success:!0,demoCode:"123456",userName:(t==null?void 0:t.name)||"Dawit Haile",role:(t==null?void 0:t.role)||"buyer",email:t==null?void 0:t.email,message:"Demo verification code generated: 123456"}}}async verifyOtp(e,t){try{const i=await this.requestApi("/api/auth/verify-otp",{method:"POST",body:JSON.stringify({phone:e,code:t})});if(i.token&&i.user)return this._token.set(i.token),this._currentUser.set(i.user),localStorage.setItem("token",i.token),localStorage.setItem("currentUser",JSON.stringify(i.user)),this.initSignalR(i.token),this.notify(),i.user}catch{}let a=this.getUserById(e);a||(a={id:`usr-${Date.now()}`,phone:e,name:e.includes("911")?"Abebe Bikila":"Marketplace User",role:e.includes("900")?"farmer":e.includes("922")?"driver":"buyer",region:"Oromia (Adama)",verified:!0,createdAt:new Date().toISOString()});const s=`ey-demo-jwt-token-${Date.now()}`;return this._token.set(s),this._currentUser.set(a),localStorage.setItem("token",s),localStorage.setItem("currentUser",JSON.stringify(a)),this.initSignalR(s),this.notify(),a}logout(){this._token.set(null),this._currentUser.set(null),this._impersonationOriginalUser.set(null),localStorage.removeItem("token"),localStorage.removeItem("currentUser"),le.stopConnection(),this.notify()}async fetchMe(){try{const e=await this.requestApi("/api/auth/me");return this._currentUser.set(e),localStorage.setItem("currentUser",JSON.stringify(e)),this.notify(),e}catch{return null}}async fetchAccountData(){try{const[e,t,a,s,i,n]=await Promise.allSettled([this.requestApi("/api/account/addresses"),this.requestApi("/api/account/payment-methods"),this.requestApi("/api/account/coupons"),this.requestApi("/api/account/notification-preferences"),this.requestApi("/api/account/sessions"),this.requestApi("/api/account/two-factor")]),r={addresses:e.status==="fulfilled"&&Array.isArray(e.value)?e.value:[],paymentMethods:t.status==="fulfilled"&&Array.isArray(t.value)?t.value:[],coupons:a.status==="fulfilled"&&Array.isArray(a.value)?a.value:[],notificationPreferences:s.status==="fulfilled"&&Array.isArray(s.value)?s.value:[],sessions:i.status==="fulfilled"&&Array.isArray(i.value)?i.value:[],twoFactor:n.status==="fulfilled"?n.value:null};return this._accountData.set(r),this.notify(),r}catch{return this._accountData()}}async updateAccountProfile(e){const t=await this.requestApi("/api/auth/profile",{method:"PUT",body:JSON.stringify(e)});this._currentUser.set(t),localStorage.setItem("currentUser",JSON.stringify(t)),this.notify()}async updateProfile(e){await this.updateAccountProfile({name:e.name,phone:e.phone})}async changePassword(e,t){await this.requestApi("/api/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:e,newPassword:t})})}async saveAddress(e){await this.requestApi("/api/account/addresses",{method:"POST",body:JSON.stringify(e)}),await this.fetchAccountData()}async deleteAddress(e){await this.requestApi(`/api/account/addresses/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async addPaymentMethod(e){await this.requestApi("/api/account/payment-methods",{method:"POST",body:JSON.stringify(e)}),await this.fetchAccountData()}async setPrimaryPaymentMethod(e){await this.requestApi(`/api/account/payment-methods/${e}/primary`,{method:"PUT"}),await this.fetchAccountData()}async deletePaymentMethod(e){await this.requestApi(`/api/account/payment-methods/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async revokeOtherSessions(){await this.requestApi("/api/account/sessions/revoke-others",{method:"POST"}),await this.fetchAccountData()}async fetchListings(){try{const e=await this.requestApi("/api/listings"),t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._listings.set(t),this.notify()),this._listings()}catch{return this._listings()}}async createListing(e){const t=await this.requestApi("/api/listings",{method:"POST",body:JSON.stringify(e)});return this._listings.update(a=>[t,...a]),this.notify(),t}async updateListing(e,t){const a=await this.requestApi(`/api/listings/${e}`,{method:"PUT",body:JSON.stringify(t)});return this._listings.update(s=>s.map(i=>i.id===e?a:i)),this.notify(),a}adminUpdateListing(e,t){let a;return this._listings.update(s=>s.map(i=>i.id===e?(a={...i,...t},a):i)),this.updateListing(e,t).catch(s=>console.warn("Background adminUpdateListing error:",s)),this.notify(),a}async deleteListing(e){await this.requestApi(`/api/listings/${e}`,{method:"DELETE"}),this._listings.update(t=>t.filter(a=>a.id!==e)),this.notify()}adminDeleteListing(e,t){return this._listings.update(a=>a.filter(s=>s.id!==e)),this.requestApi(`/api/admin/listings/${e}`,{method:"DELETE",body:JSON.stringify({reason:t})}).catch(a=>console.warn("Background adminDeleteListing error:",a)),this.notify(),!0}flagListingAnomaly(e,t){const a=this.getListingById(e);a&&(this._anomalyAlerts.update(s=>[{id:`anomaly-${Date.now()}`,title:"Manual Admin Anomaly Flag",description:`${a.productName}: ${t}`,entityType:"Listing",entityId:e,type:"PriceManipulation",severity:"High",detectedAt:new Date().toISOString()},...s]),this.requestApi(`/api/admin/listings/${e}/flag-anomaly`,{method:"POST",body:JSON.stringify({reason:t})}).catch(s=>console.warn("Background flagListingAnomaly error:",s)),this.notify())}async fetchOrders(){try{const e=await this.requestApi("/api/orders"),t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._orders.set(t),this.notify()),this._orders()}catch{return this._orders()}}async createOrder(e){const t=await this.requestApi("/api/orders",{method:"POST",body:JSON.stringify(e)});return this._orders.update(a=>[t,...a]),this.notify(),t}async placeOrder(e,t,a,s,i,n){if(typeof e=="string"){const d=this.getListingById(e),p=this._currentUser(),l=t||(d==null?void 0:d.minOrderKg)||50,b=(d==null?void 0:d.pricePerKg)||50,v=l*b,k=Math.round(v*.9),$=Math.round(v*.05),u=Math.round(v*.05),S={listingId:e,productName:(d==null?void 0:d.productName)||"Agricultural Produce",productNameAm:d==null?void 0:d.nameAm,category:(d==null?void 0:d.category)||"Vegetables",farmerId:(d==null?void 0:d.farmerId)||"farmer-1",farmerName:(d==null?void 0:d.farmerName)||"Smallholder Farmer",farmerNameAm:d==null?void 0:d.farmerNameAm,farmerPhone:(d==null?void 0:d.farmerPhone)||"+251 900 000 000",farmerRegion:(d==null?void 0:d.region)||"Oromia",buyerId:(p==null?void 0:p.id)||"buyer-1",buyerName:(p==null?void 0:p.name)||"Verified Buyer",buyerPhone:(p==null?void 0:p.phone)||"+251 911 111 111",qtyKg:l,pricePerKg:b,totalEtb:v,farmerCut:k,driverCut:$,platformCut:u,status:"pending",escrowHeld:!0,deliveryAddress:a,isRecurring:s,recurringFrequency:i,createdAt:new Date().toISOString()},T=await this.createOrder(S);let w;try{w=(await this.initiateTelebirrPayment(T.id)).paymentUrl}catch{}return{order:T,paymentUrl:w}}return{order:await this.createOrder(e)}}async confirmOrderByFarmer(e){const t=await this.requestApi(`/api/orders/${e}/confirm`,{method:"PUT"});return this._orders.update(a=>a.map(s=>s.id===e?{...s,status:"confirmed"}:s)),this.notify(),t}async pickupOrderByDriver(e,t){const a=await this.requestApi(`/api/orders/${e}/pickup`,{method:"PUT",body:JSON.stringify({pickupPhoto:t})});return this._orders.update(s=>s.map(i=>i.id===e?{...i,status:"picked_up"}:i)),this.notify(),a}async confirmDeliveryByBuyer(e,t,a,s){return await this.confirmOrderDelivery(e,t,a,s)}async initiateTelebirrPayment(e,t){return await this.requestApi("/api/payments/telebirr/initiate",{method:"POST",body:JSON.stringify({orderId:e,returnUrl:t})})}async verifyChapaPayment(e){return(await this.requestApi(`/api/payments/verify?ref=${encodeURIComponent(e)}`)).success}async confirmOrderDelivery(e,t,a,s){const i=await this.requestApi(`/api/orders/${e}/deliver`,{method:"PUT",body:JSON.stringify({deliveryProofPhoto:t,lat:a,lng:s})});return this._orders.update(n=>n.map(r=>r.id===e?{...r,status:"delivered",escrowHeld:!1}:r)),this.notify(),i}async disputeOrder(e,t,a,s){const i=await this.requestApi(`/api/orders/${e}/dispute`,{method:"POST",body:JSON.stringify({reason:t,disputeEvidenceUrl:a,disputeClaimPercent:s})});return this._orders.update(n=>n.map(r=>r.id===e?{...r,status:"disputed"}:r)),this.notify(),i}async resolveDispute(e,t,a,s){const i=await this.requestApi(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",body:JSON.stringify({resolution:t,farmerShare:a,buyerRefund:s})});return this._orders.update(n=>n.map(r=>r.id===e?{...r,status:"delivered",disputeResolutionNotes:t}:r)),this.notify(),i}manualReleaseOrderEscrow(e,t,a){return this._orders.update(s=>s.map(i=>i.id===e?{...i,status:"delivered",escrowHeld:!1}:i)),this.requestApi(`/api/orders/${e}/manual-release`,{method:"POST",body:JSON.stringify({authorizedBy:t,note:a})}).catch(s=>console.warn("Background manualReleaseOrderEscrow error:",s)),this.notify(),!0}async requestWalletWithdrawal(e,t){return await this.requestApi("/api/payments/withdraw",{method:"POST",body:JSON.stringify({amount:e,phone:t})})}async fetchReviews(){try{const e=await this.requestApi("/api/reviews"),t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._reviews.set(t),this.notify()),this._reviews()}catch{return this._reviews()}}async createReview(e,t,a,s,i){const n=Math.max(1,Math.min(5,Math.round(a))),r=await this.requestApi("/api/reviews",{method:"POST",body:JSON.stringify({orderId:e,revieweeId:t,rating:n,comment:(s==null?void 0:s.trim())||null,quickTags:i})});return this._reviews.update(d=>[r,...d]),this._orders.update(d=>d.map(p=>p.id===e?{...p,isRated:!0,reviewRating:n}:p)),this.notify(),r}getTaxInvoice(e){const t=this._orders().find(i=>i.id===e)||{id:e,productName:"Agricultural Goods",qtyKg:100,pricePerKg:50,totalEtb:5e3,farmerCut:4500,driverCut:250,platformCut:250,farmerName:"Smallholder Farmer",farmerRegion:"Oromia",farmerPhone:"+251 900 000 000",buyerName:"Wholesale Buyer",buyerRegion:"Addis Ababa",buyerPhone:"+251 911 111 111",paymentRef:"TB-TXN-REF",invoiceNumber:`ET-INV-${e.slice(0,6).toUpperCase()}`,createdAt:new Date().toISOString()},a=Math.round(t.platformCut*.15),s=Math.round(t.totalEtb*.02);return{invoiceNumber:t.invoiceNumber||`ET-INV-2026-${t.id.slice(0,6).toUpperCase()}`,orderId:t.id,issueDate:t.createdAt?new Date(t.createdAt).toLocaleDateString("en-GB"):new Date().toLocaleDateString("en-GB"),paymentRef:t.paymentRef||`TB-C2B-${t.id.slice(0,8).toUpperCase()}`,sellerName:t.farmerName,sellerTin:t.farmerTin||"TIN-FARM-8829104",sellerRegion:t.farmerRegion,sellerPhone:t.farmerPhone,sellerType:"Registered Agricultural Smallholder Producer",buyerName:t.buyerName,buyerTin:t.buyerTin||"TIN-ET-9912001",buyerRegion:t.buyerRegion||"Addis Ababa",buyerPhone:t.buyerPhone,productName:t.productName,productNameAm:t.productNameAm,grade:"Grade 1 (Certified Farm Standard)",qtyKg:t.qtyKg,unitPriceEtb:t.pricePerKg,grossAmountEtb:t.totalEtb,farmerPayoutEtb:t.farmerCut,driverFreightEtb:t.driverCut,platformServiceFeeEtb:t.platformCut,platformVatEtb:a,withholdingTaxEtb:s,totalPaidViaTelebirr:t.totalEtb,regulatoryAct:"Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)",qrVerificationCode:`ET-TAX-AUTH-2026-VERIFIED-${t.id.slice(0,8).toUpperCase()}`,isVatExemptAgriculturalGoods:!0}}getTransportWaybill(e){const t=this._orders().find(a=>a.id===e);return{waybillNumber:(t==null?void 0:t.waybillNumber)||`WB-FTA-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,dispatchDate:new Date().toLocaleDateString("en-GB"),consignorName:(t==null?void 0:t.farmerName)||"Agricultural Producer",consignorFarmLocation:(t==null?void 0:t.farmerRegion)||"Farm Depot, Ethiopia",consignorPhone:(t==null?void 0:t.farmerPhone)||"+251 900 000 000",consigneeName:(t==null?void 0:t.buyerName)||"Fresh Wholesale Hub",consigneeDepotAddress:(t==null?void 0:t.deliveryAddress)||"Addis Ababa Depot",consigneePhone:(t==null?void 0:t.buyerPhone)||"+251 911 111 111",carrierDriverName:(t==null?void 0:t.driverName)||"Freight Logistics Driver",driverLicenseNumber:"ET-CDL-COMM-89104",vehiclePlateNumber:"ET-3-B98124-AA",vehicleModel:"Isuzu Commercial Freight Carrier",refrigerationStatus:"Ventilated Agri-Body Cargo (18°C)",insurancePolicyNumber:"NIC-ET-CARGO-771920",cargoDescription:`${(t==null?void 0:t.productName)||"Fresh Produce"} (Grade 1)`,packageCount:Math.ceil(((t==null?void 0:t.qtyKg)||200)/25),netWeightKg:(t==null?void 0:t.qtyKg)||200,grossWeightKg:((t==null?void 0:t.qtyKg)||200)+18,tareWeightKg:18,temperatureLogCelsius:17.5,farmerHandoffTimestamp:"Farm Gate Handoff",driverSignatureRef:"DRIVER-VERIFIED-LOG",buyerReceivedTimestamp:(t==null?void 0:t.status)==="delivered"?"Depot Verification":void 0,transitStatus:(t==null?void 0:t.status)==="delivered"?"DeliveredWithGPS":(t==null?void 0:t.status)==="picked_up"?"InTransit":"Dispatched"}}getLegalContract(e){const t=this._orders().find(a=>a.id===e);return{contractNumber:(t==null?void 0:t.contractNumber)||`AGR-CONTR-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,agreementDate:new Date().toLocaleDateString("en-GB"),effectiveDate:new Date().toLocaleDateString("en-GB"),sellerName:(t==null?void 0:t.farmerName)||"Seller",sellerIdNumber:"FAYDA-VERIFIED",sellerLocation:(t==null?void 0:t.farmerRegion)||"Ethiopia",buyerName:(t==null?void 0:t.buyerName)||"Buyer",buyerTinNumber:"TIN-VERIFIED",buyerLocation:(t==null?void 0:t.deliveryAddress)||"Addis Ababa, Ethiopia",cropType:(t==null?void 0:t.productName)||"Agricultural Produce",contractedQuantityKg:(t==null?void 0:t.qtyKg)||100,agreedPricePerKg:(t==null?void 0:t.pricePerKg)||50,totalContractValueEtb:(t==null?void 0:t.totalEtb)||5e3,deliveryTimeline:"48 Hours from Dispatch",eSignatures:{sellerSigned:!0,buyerSigned:!0}}}getDisputeMediationRecord(e){const t=this._orders().find(a=>a.id===e);return{caseNumber:`DISP-MED-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,complainantRole:"buyer",complainantName:(t==null?void 0:t.buyerName)||"Buyer",respondentName:(t==null?void 0:t.farmerName)||"Farmer",filingDate:(t==null?void 0:t.createdAt)||new Date().toISOString().slice(0,10),disputeReason:(t==null?void 0:t.disputeReason)||"Damaged in transit / Quality mismatch",claimedDefectPercentage:(t==null?void 0:t.requestedRefundPercent)||100,photoEvidenceUrl:t==null?void 0:t.disputePhoto,arbitratorName:"Dr. Dawit Haile (Senior Agricultural Arbitrator)",status:(t==null?void 0:t.status)==="disputed"?"PendingArbitration":"DecreeRendered",legalFindingSummary:(t==null?void 0:t.disputeResolutionNotes)||"Pending formal review.",resolutionDate:new Date().toISOString().slice(0,10),bindingEnforcementSeal:"Ethiopian Arbitration and Conciliation Proclamation No. 1237/2021"}}async fetchSummaries(){try{const[e,t,a]=await Promise.allSettled([this.requestApi("/api/payments/farmer-summary"),this.requestApi("/api/payments/driver-summary"),this.requestApi("/api/admin/stats")]);e.status==="fulfilled"&&e.value&&this._farmerSummary.set(e.value),t.status==="fulfilled"&&t.value&&this._driverSummary.set(t.value),a.status==="fulfilled"&&a.value&&this._platformStats.set(a.value),this.notify()}catch(e){console.warn("Failed to fetch financial summaries",e)}}async getMarketPriceBenchmarks(){try{const e=await this.requestApi("/api/admin/price-benchmarks"),t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._priceBenchmarks.set(t),this.notify()),this._priceBenchmarks()}catch{return this._priceBenchmarks()}}async getFairPriceRecommendation(e){return await this.requestApi("/api/market-intelligence/advisor",{method:"POST",body:JSON.stringify(e)})}async getCommodityPriceIndices(){try{const e=await this.requestApi("/api/market-intelligence/indices");return Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[]}catch{return[]}}async getMarketPriceIndices(e){try{const t=await this.getCommodityPriceIndices();return e&&e!=="All"?t.filter(a=>a.category.toLowerCase()===e.toLowerCase()):t}catch{return[]}}async fetchStandingOrders(){try{const e=await this.requestApi("/api/orders/standing"),t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._standingOrders.set(t),this.notify()),this._standingOrders()}catch{return this._standingOrders()}}async createStandingOrder(e){const t=await this.requestApi("/api/orders/standing",{method:"POST",body:JSON.stringify(e)});return this._standingOrders.update(a=>[t,...a]),this.notify(),t}async addStandingOrder(e,t=100,a="Weekly"){if(typeof e=="string"){const s=this.getListingById(e),i=this._currentUser(),n={listingId:e,productName:(s==null?void 0:s.productName)||"Agricultural Produce",productNameAm:s==null?void 0:s.nameAm,farmerName:(s==null?void 0:s.farmerName)||"Farmer",farmerRegion:s==null?void 0:s.region,buyerId:i==null?void 0:i.id,buyerName:i==null?void 0:i.name,buyerPhone:i==null?void 0:i.phone,qtyKg:t,pricePerKg:(s==null?void 0:s.pricePerKg)||50,frequency:a,nextDeliveryDate:new Date(Date.now()+7*864e5).toISOString().slice(0,10),active:!0,createdAt:new Date().toISOString()};return await this.createStandingOrder(n)}return await this.createStandingOrder(e)}async toggleStandingOrderStatus(e,t){const a=await this.requestApi(`/api/orders/standing/${e}/toggle`,{method:"PUT",body:JSON.stringify({active:t})});this._standingOrders.update(s=>s.map(i=>i.id===e?a:i)),this.notify()}async toggleStandingOrder(e,t){const a=this._standingOrders().find(i=>i.id===e),s=t!==void 0?t:a?!a.active:!0;await this.toggleStandingOrderStatus(e,s)}async verifyKyc(e,t){await this.requestApi(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${t?"Verified":"Rejected"}`,{method:"PUT"}),this._kycQueue.update(a=>a.map(s=>s.userId===e?{...s,status:t?"Verified":"Rejected"}:s)),this.notify()}async fetchVerificationQueue(e,t){try{const a=new URLSearchParams;e&&e!=="All"&&a.append("role",e),t&&t!=="All"&&a.append("status",t);const s=a.toString()?`?${a.toString()}`:"";let i=await this.requestApi(`/api/verification/queue${s}`).catch(()=>null);i||(i=await this.requestApi("/api/admin/kyc-queue").catch(()=>null));const n=Array.isArray(i)?i:i!=null&&i.items&&Array.isArray(i.items)?i.items:[];return(n.length>0||Array.isArray(i))&&(this._verificationQueue.set(n),this.notify()),this._verificationQueue()}catch{return this._verificationQueue()}}async submitVerificationDocuments(e,t){await this.requestApi("/api/verification/submit",{method:"POST",body:JSON.stringify({tinNumber:e,documents:t})}),await this.fetchMe()}async agentRegisterFarmer(e){const t=await this.requestApi("/api/verification/agent-register",{method:"POST",body:JSON.stringify(e)});return this._agentRegisteredFarmers.update(a=>[t,...a]),this.notify(),t}async reviewVerification(e,t,a,s){await this.requestApi(`/api/verification/${e}/review`,{method:"POST",body:JSON.stringify({action:t,notes:a,rejectionReason:s})}),this._verificationQueue.update(i=>i.map(n=>n.userId===e?{...n,verificationStatus:t==="Approve"?"Approved":"Rejected"}:n)),this.notify()}async fetchUsers(){try{let e=await this.requestApi("/api/admin/all-users").catch(()=>null);e||(e=await this.requestApi("/api/auth/demo-users").catch(()=>null));const t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._allUsers.set(t),this.notify()),this._allUsers()}catch{return this._allUsers()}}async createUser(e){const t=await this.requestApi("/api/admin/users",{method:"POST",body:JSON.stringify(e)});return this._allUsers.update(a=>[t,...a]),this.notify(),t}async updateUser(e,t){const a=await this.requestApi(`/api/admin/users/${e}`,{method:"PUT",body:JSON.stringify(t)});return this._allUsers.update(s=>s.map(i=>i.id===e?a:i)),this.notify(),a}deleteUser(e){return this._allUsers.update(t=>t.filter(a=>a.id!==e)),this.requestApi(`/api/superadmin/users/${e}`,{method:"DELETE"}).catch(t=>console.warn("Background deleteUser error:",t)),this.notify(),!0}toggleUserSuspension(e,t){let a=null;if(this._allUsers.update(s=>s.map(i=>{if(i.id===e){const n=i.status==="suspended"?"active":"suspended";return a={...i,status:n},a}return i})),a)return this.requestApi(`/api/admin/users/${e}/status`,{method:"PUT",body:JSON.stringify({status:a.status,reason:t})}).catch(s=>console.warn("Background toggleUserSuspension error:",s)),this.notify(),a;throw new Error("User not found")}startImpersonation(e){const t=this._allUsers().find(a=>a.id===e)||null;return t&&(this._impersonationOriginalUser()||this._impersonationOriginalUser.set(this._currentUser()),this._currentUser.set(t),localStorage.setItem("currentUser",JSON.stringify(t)),this.requestApi(`/api/superadmin/impersonate/${e}`,{method:"POST"}).catch(a=>console.warn("Background impersonation error:",a)),this.notify()),t}stopImpersonation(){const e=this._impersonationOriginalUser();return e&&(this._currentUser.set(e),this._impersonationOriginalUser.set(null),localStorage.setItem("currentUser",JSON.stringify(e)),this.requestApi("/api/superadmin/impersonate/stop",{method:"POST"}).catch(t=>console.warn("Background stopImpersonation error:",t)),this.notify()),e}isImpersonating(){return!!this._impersonationOriginalUser()}getOriginalSuperAdmin(){return this._impersonationOriginalUser()}updatePlatformConfig(e){const t={...this._platformConfig(),...e};return this._platformConfig.set(t),localStorage.setItem("farmerMarketPlatformConfig",JSON.stringify(t)),this.requestApi("/api/superadmin/platform-config",{method:"PUT",body:JSON.stringify(e)}).catch(a=>console.warn("Background updatePlatformConfig error:",a)),this.notify(),t}addAuditLog(e){const t={...e,id:`audit-${Date.now()}`,timestamp:new Date().toISOString()};return this._auditLogs.update(a=>[t,...a]),this.requestApi("/api/superadmin/audit-logs",{method:"POST",body:JSON.stringify(e)}).catch(a=>console.warn("Background addAuditLog error:",a)),this.notify(),t}addDeliveryZone(e){const t={id:`zone-${Date.now()}`,name:e.name||"New Corridor",clusterHubName:e.clusterHubName||"Regional Hub",centerLatitude:e.centerLatitude||9,centerLongitude:e.centerLongitude||38.7,baseRadiusKm:e.baseRadiusKm||50,maxRadiusKm:e.maxRadiusKm||120,ruralSubsidyEtb:e.ruralSubsidyEtb||0,active:e.active??!0,smallholdersCount:e.smallholdersCount||100};return this._deliveryZones.update(a=>[...a,t]),this.requestApi("/api/superadmin/zones",{method:"POST",body:JSON.stringify(t)}).catch(a=>console.warn("Background addDeliveryZone error:",a)),this.notify(),t}updateDeliveryZone(e,t){let a=null;if(this._deliveryZones.update(s=>s.map(i=>i.id===e?(a={...i,...t},a):i)),a)return this.requestApi(`/api/superadmin/zones/${e}`,{method:"PUT",body:JSON.stringify(t)}).catch(s=>console.warn("Background updateDeliveryZone error:",s)),this.notify(),a;throw new Error("Delivery zone not found")}deleteDeliveryZone(e){return this._deliveryZones.update(t=>t.filter(a=>a.id!==e)),this.requestApi(`/api/superadmin/zones/${e}`,{method:"DELETE"}).catch(t=>console.warn("Background deleteDeliveryZone error:",t)),this.notify(),!0}toggleFeatureFlag(e,t){let a=null;if(this._featureFlags.update(i=>i.map(n=>{if(n.key===e){const r=t!==void 0?t:!n.enabled;return a={...n,enabled:r},a}return n})),!a){const i={key:e,name:e.replace(/_/g," ").toUpperCase(),description:"Dynamically toggled feature flag",enabled:t!==void 0?t:!0,rolloutPercentage:100,targetRegions:["All"],targetRoles:[]};a=i,this._featureFlags.update(n=>[...n,i])}const s=a;return this.requestApi(`/api/superadmin/feature-flags/${e}`,{method:"PUT",body:JSON.stringify({enabled:s.enabled})}).catch(i=>console.warn("Background toggleFeatureFlag error:",i)),this.notify(),s}createPayoutApproval(e){const t={id:`payout-${Date.now()}`,recipientId:e.recipientId||"user-sim",recipientName:e.recipientName||"Beneficiary",recipientPhone:e.recipientPhone||"+251 900 000 000",recipientRole:e.recipientRole||"farmer",amountEtb:e.amountEtb||5e4,walletBalanceBefore:e.walletBalanceBefore||0,riskScore:e.riskScore||"Medium",cropName:e.cropName||"Farm Produce",region:e.region||"Oromia",triggerReason:e.triggerReason||"Standard High-Value Payout Threshold Trigger",status:"Pending",requestedAt:new Date().toISOString()};return this._payoutApprovals.update(a=>[t,...a]),this.requestApi("/api/superadmin/payouts/simulate",{method:"POST",body:JSON.stringify(t)}).catch(a=>console.warn("Background createPayoutApproval error:",a)),this.notify(),t}approvePayout(e,t){return this._payoutApprovals.update(a=>a.map(s=>s.id===e?{...s,status:"Approved",reviewedBy:t}:s)),this.requestApi(`/api/superadmin/payouts/${e}/approve`,{method:"POST",body:JSON.stringify({approverName:t})}).catch(a=>console.warn("Background approvePayout error:",a)),this.notify(),!0}batchApprovePayouts(e,t){let a=0;return this._payoutApprovals.update(s=>s.map(i=>e.includes(i.id)?(a+=i.amountEtb,{...i,status:"Approved",reviewedBy:t}):i)),this.requestApi("/api/superadmin/payouts/batch-approve",{method:"POST",body:JSON.stringify({ids:e,approverName:t})}).catch(s=>console.warn("Background batchApprovePayouts error:",s)),this.notify(),{approvedCount:e.length,totalAmountEtb:a}}rejectPayout(e,t,a){return this._payoutApprovals.update(s=>s.map(i=>i.id===e?{...i,status:"Rejected",reviewedBy:t,rejectionReason:a}:i)),this.requestApi(`/api/superadmin/payouts/${e}/reject`,{method:"POST",body:JSON.stringify({reviewerName:t,reason:a})}).catch(s=>console.warn("Background rejectPayout error:",s)),this.notify(),!0}updateGlobalBusinessRules(e){const t={...this._globalBusinessRules(),...e};return this._globalBusinessRules.set(t),localStorage.setItem("farmerMarketBusinessRules",JSON.stringify(t)),this.requestApi("/api/superadmin/business-rules",{method:"PUT",body:JSON.stringify(e)}).catch(a=>console.warn("Background updateGlobalBusinessRules error:",a)),this.notify(),t}addToBlacklist(e){const t={id:`bl-${Date.now()}`,type:e.type||"Phone",value:e.value||"",reason:e.reason||"Fraud prevention enforcement",blacklistedBy:e.blacklistedBy||"Super Admin",blacklistedAt:new Date().toISOString(),active:e.active??!0};return this._blacklist.update(a=>[t,...a]),this.requestApi("/api/superadmin/blacklist",{method:"POST",body:JSON.stringify(t)}).catch(a=>console.warn("Background addToBlacklist error:",a)),this.notify(),t}removeFromBlacklist(e){return this._blacklist.update(t=>t.filter(a=>a.id!==e)),this.requestApi(`/api/superadmin/blacklist/${e}`,{method:"DELETE"}).catch(t=>console.warn("Background removeFromBlacklist error:",t)),this.notify(),!0}triggerDatabaseBackup(){const t={backupId:`pg_backup_${Date.now().toString(36).toUpperCase()}`,sizeMb:28.4,timestamp:new Date().toISOString(),downloadUrl:"#"};return this.requestApi("/api/superadmin/db/backup",{method:"POST"}).catch(a=>console.warn("Background db backup error:",a)),t}optimizeDatabase(){this.requestApi("/api/superadmin/db/optimize",{method:"POST"}).catch(e=>console.warn("Background db optimize error:",e))}exportPlatformData(e){const t={timestamp:new Date().toISOString(),users:this._allUsers(),listings:this._listings(),orders:this._orders(),stats:this._platformStats()},a=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=URL.createObjectURL(a);return{filename:`FarmerMarket_Platform_Export_${new Date().toISOString().slice(0,10)}.${e}`,dataUrl:s}}exportFinancialStatementCsv(){const e=this._orders(),t=`Order ID,Date,Buyer,Farmer,Crop,Qty (kg),Unit Price (ETB),Total Amount (ETB),Farmer Payout (ETB),Driver Freight (ETB),Platform Fee (ETB),Status
`,a=e.map(s=>`"${s.id}","${s.createdAt||""}","${s.buyerName||""}","${s.farmerName||""}","${s.productName}","${s.qtyKg}","${s.pricePerKg}","${s.totalEtb}","${s.farmerCut||0}","${s.driverCut||0}","${s.platformCut||0}","${s.status}"`).join(`
`);return t+a}resetPayoutsToDefault(){this._payoutApprovals.set([]),this.notify()}resetDeliveryZonesToDefault(){this._deliveryZones.set([]),this.notify()}resetFeatureFlagsToDefault(){this._featureFlags.set([]),this.notify()}resetBlacklistToDefault(){this._blacklist.set([]),this.notify()}resetBusinessRulesToDefault(){const e={minOrderKg:10,maxOrderKg:5e4,maxDistanceKm:450,priceFloorVariancePercent:-30,priceCeilingVariancePercent:250,requireFaydaForOrdersAboveKg:500,autoArbitrateAfterHours:48};this._globalBusinessRules.set(e),localStorage.setItem("farmerMarketBusinessRules",JSON.stringify(e)),this.notify()}resetAuditLogsToDefault(){this._auditLogs.set([]),this.notify()}resetAllSuperAdminDataToDefault(){this.resetPayoutsToDefault(),this.resetDeliveryZonesToDefault(),this.resetFeatureFlagsToDefault(),this.resetBlacklistToDefault(),this.resetBusinessRulesToDefault(),this.resetAuditLogsToDefault(),this.notify()}async createBanner(e){const t=await this.requestApi("/api/superadmin/banners",{method:"POST",body:JSON.stringify(e)});return this._banners.update(a=>[t,...a]),this.notify(),t}async updateBanner(e,t){const a=await this.requestApi(`/api/superadmin/banners/${e}`,{method:"PUT",body:JSON.stringify(t)});return this._banners.update(s=>s.map(i=>i.id===e?a:i)),this.notify(),a}async toggleBannerStatus(e,t){const a=await this.requestApi(`/api/superadmin/banners/${e}/toggle`,{method:"PUT",body:JSON.stringify({isActive:t})});return this._banners.update(s=>s.map(i=>i.id===e?a:i)),this.notify(),!0}async deleteBanner(e){return await this.requestApi(`/api/superadmin/banners/${e}`,{method:"DELETE"}),this._banners.update(t=>t.filter(a=>a.id!==e)),this.notify(),!0}markAllNotificationsRead(){this._notifications.update(e=>e.map(t=>({...t,read:!0}))),this.requestApi("/api/account/notifications/mark-read",{method:"POST"}).catch(()=>{}),this.notify()}addNotification(e){this._notifications.update(t=>[e,...t]),this.notify()}async broadcastSms(e,t,a){await this.requestApi("/api/admin/broadcast-sms",{method:"POST",body:JSON.stringify({messageEn:e,messageAm:t,targetRole:a})}),this._currentUser()&&this.addNotification({id:"b-"+Date.now(),userId:this._currentUser().id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${a.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${a}] ${t}`,read:!1,createdAt:new Date().toISOString()})}async sendInboundSms(e,t){const a=await this.requestApi("/api/sms/inbound",{method:"POST",body:JSON.stringify({from:e,body:t})});return await this.refreshAllData(),a.response}async simulateUssd(e){return await this.requestApi("/api/ussd/simulate",{method:"POST",body:JSON.stringify(e)})}async sendInboundUssdSimulation(e,t){return(await this.requestApi("/api/ussd/simulate-inbound",{method:"POST",body:JSON.stringify({phone:e,ussdCode:t})})).response}simulateVoiceTranscription(e,t){const a=[{productName:"Red Onions (ቀይ ሽንኩርት)",nameAm:"ቀይ ሽንኩርት",category:"Vegetables",qtyKg:800,pricePerKg:75,region:"Oromia (Adama)",transcript:"ስምንት መቶ ኪሎ ቀይ ሽንኩርት በኪሎ ሰባ አምስት ብር ከአዳማ እሸጣለሁ"},{productName:"Teff Magna (ነጭ ጤፍ)",nameAm:"ነጭ ጤፍ",category:"Grains",qtyKg:1500,pricePerKg:135,region:"Amhara (Bure)",transcript:"አንድ ሺህ አምስት መቶ ኪሎ ነጭ ማኛ ጤፍ በኪሎ መቶ ሰላሳ አምስት ብር ከቡሬ"},{productName:"Habesha Cabbage (ጥቅል ጎመን)",nameAm:"ጥቅል ጎመን",category:"Vegetables",qtyKg:600,pricePerKg:35,region:"SNNPR (Hawassa)",transcript:"ስድስት መቶ ኪሎ ጥቅል ጎመን በኪሎ ሰላሳ አምስት ብር ከሀዋሳ"},{productName:"Avocado Hass (አቮካዶ ሃስ)",nameAm:"አቮካዶ",category:"Fruits",qtyKg:450,pricePerKg:95,region:"Sidama (Yirgalem)",transcript:"አራት መቶ ሃምሳ ኪሎ ሃስ አቮካዶ በኪሎ ዘጠና አምስት ብር ከይርጋለም"}],s=typeof e=="number"&&e>=0&&e<a.length?e:Math.floor(Math.random()*a.length);return this.requestApi("/api/market-intelligence/transcribe-voice",{method:"POST",body:JSON.stringify({audioBlobLengthSec:e,spokenLanguage:t})}).catch(()=>{}),a[s]}queueOfflineAction(e){const t=[...this._offlineQueue(),e];this._offlineQueue.set(t),this.saveOfflineQueueToStorage(t),this.notify()}async syncOfflineQueue(){const e=this._offlineQueue().filter(s=>!s.synced);if(e.length===0)return 0;const a=(await this.requestApi("/api/orders/sync-offline-actions",{method:"POST",body:JSON.stringify({actions:e})})).syncedCount||e.length;return this._offlineQueue.set([]),this.saveOfflineQueueToStorage([]),this.notify(),a}getPermissionsList(){return ne.ALL_PERMISSIONS}getAllRolePermissions(){return this._rolePermissions()}getRolePermissions(e){return this._rolePermissions()[e]||ne.DEFAULT_ROLE_PERMISSIONS[e]}hasRolePermission(e,t){if(e==="superadmin")return!0;const a=this._rolePermissions()[e]||ne.DEFAULT_ROLE_PERMISSIONS[e];return!!(a!=null&&a[t])}hasPermission(e,t){const a=t!==void 0?t:this._currentUser();if(!a)return!1;if(a.role==="superadmin")return!0;const s=this._rolePermissions()[a.role]||ne.DEFAULT_ROLE_PERMISSIONS[a.role];return!!(s&&s[e]===!0||a.permissions&&Array.isArray(a.permissions)&&a.permissions.includes(e))}hasEffectivePermission(e,t){if(this.isImpersonating())return this.hasPermission(e);const a=this._currentUser();return a&&a.role!=="superadmin"?this.hasPermission(e,a):t?this.hasRolePermission(t,e):this.hasPermission(e,a)}async updateRolePermissionKey(e,t,a){await this.requestApi("/api/superadmin/rbac/permissions",{method:"PUT",body:JSON.stringify({role:e,key:t,enabled:a})});const s={...this._rolePermissions()};return s[e]||(s[e]={...ne.DEFAULT_ROLE_PERMISSIONS[e]}),s[e][t]=a,this._rolePermissions.set(s),localStorage.setItem("farmerMarketRolePermissions",JSON.stringify(s)),this.notify(),!0}async updateRolePermissions(e,t){await this.requestApi(`/api/superadmin/rbac/roles/${e}`,{method:"PUT",body:JSON.stringify({permissions:t})});const a={...this._rolePermissions()};return a[e]||(a[e]={...ne.DEFAULT_ROLE_PERMISSIONS[e]}),a[e]={...a[e],...t},this._rolePermissions.set(a),localStorage.setItem("farmerMarketRolePermissions",JSON.stringify(a)),this.notify(),!0}reloadRolePermissionsFromStorage(){const e=this.loadStoredRolePermissions();this._rolePermissions.set(e),this.notify()}async resetRolePermissions(){const e=await this.requestApi("/api/superadmin/rbac/reset",{method:"POST"});return this._rolePermissions.set(e),localStorage.setItem("farmerMarketRolePermissions",JSON.stringify(e)),this.notify(),e}async fetchAnomalies(){try{const e=await this.requestApi("/api/admin/anomalies"),t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._anomalyAlerts.set(t),this.notify()),this._anomalyAlerts()}catch{return this._anomalyAlerts()}}async fetchRegionalAnalytics(){try{const e=await this.requestApi("/api/admin/regional-analytics"),t=Array.isArray(e)?e:e!=null&&e.items&&Array.isArray(e.items)?e.items:[];return(t.length>0||Array.isArray(e))&&(this._regionalAnalytics.set(t),this.notify()),this._regionalAnalytics()}catch{return this._regionalAnalytics()}}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchReviews(),this.fetchSummaries(),this.fetchVerificationQueue(),this.fetchUsers(),this.getMarketPriceBenchmarks(),this.fetchAnomalies(),this.fetchRegionalAnalytics()]),this.notify()}};f(ne,"ALL_PERMISSIONS",[{key:"MANAGE_USERS",label:"User Master CRUD & Suspension",labelAm:"የተጠቃሚዎች አስተዳደር እና እገዳ",category:"Governance & Root",description:"Create, update, suspend, and delete users across all roles."},{key:"MANAGE_RBAC_PERMISSIONS",label:"RBAC Permission Matrix",labelAm:"የሚናዎች እና ፈቃዶች ማትሪክስ",category:"Governance & Root",description:"Configure and assign granular capabilities for roles and users."},{key:"MANAGE_PLATFORM_CONFIG",label:"Platform Financial Configuration",labelAm:"የፕላትፎርም የፋይናንስ ውቅር",category:"Governance & Root",description:"Adjust escrow split percentages (90/5/5), withholding tax, and gateway keys."},{key:"EMERGENCY_ESCROW_FREEZE",label:"Emergency Escrow Killswitch",labelAm:"የአስቸኳይ ጊዜ የገንዘብ እገዳ (Killswitch)",category:"Governance & Root",description:"Halt all Telebirr fund payouts and freeze system escrow in emergency."},{key:"APPROVE_HIGH_VALUE_PAYOUTS",label:"High-Value Payout Approval",labelAm:"ከፍተኛ የገንዘብ ክፍያዎችን ማጽደቅ",category:"Governance & Root",description:"Authorize manual audits for payouts exceeding platform threshold."},{key:"IMPERSONATE_USERS",label:"Shadow Impersonation Engine",labelAm:"የተጠቃሚ መለያዎችን በመወከል መግባት",category:"Governance & Root",description:"Log in as any user to inspect and debug live issues."},{key:"VIEW_AUDIT_LOGS",label:"System Audit Logs",labelAm:"የስርዓት ኦዲት ምዝግብ ማስታወሻዎች",category:"Governance & Root",description:"Review tamper-evident security audit trails and actor actions."},{key:"MANAGE_TRADE_ZONES",label:"Geo-Fenced Trade Corridors",labelAm:"የንግድ ኮሪደሮች እና የድንበር ዞኖች",category:"Governance & Root",description:"Configure transport corridors, checkpoints, and regional hubs."},{key:"MANAGE_BLACKLIST",label:"National Fraud Blacklist",labelAm:"የማጭበርበር ጥቁር መዝገብ",category:"Governance & Root",description:"Enforce restrictions on banned phone numbers, TINs, and Fayda IDs."},{key:"MODERATE_LISTINGS",label:"Produce Listing Moderation",labelAm:"የምርት ምዝገባ ቁጥጥር እና ማረም",category:"Operational Moderation",description:"Force edit price, stock, grade, and delete fraudulent produce posts."},{key:"MANAGE_BANNERS",label:"Promotional Marketing Banners",labelAm:"የማስተዋወቂያ ባነሮች አስተዳደር",category:"Operational Moderation",description:"Publish, edit, pause, and delete promotional announcements."},{key:"RESOLVE_DISPUTES",label:"Arbitrate Produce Disputes",labelAm:"የምርት አለመግባባቶችን መፍታት",category:"Operational Moderation",description:"Render legally binding arbitration decrees and execute escrow splits."},{key:"VERIFY_KYC",label:"KYC & Document Verification",labelAm:"የማንነት እና ሰነድ ማረጋገጫ",category:"Operational Moderation",description:"Approve or reject Fayda ID, TIN certificates, and vehicle logbooks."},{key:"BROADCAST_SMS",label:"Twilio Mass SMS Broadcast",labelAm:"የጅምላ ኤስኤምኤስ ማሰራጫ",category:"Operational Moderation",description:"Broadcast agricultural bulletins and alerts to farmers, drivers, and buyers."},{key:"VIEW_ANOMALY_ALERTS",label:"AI Anomaly Scanner",labelAm:"የዋጋ እና ማጭበርበር ስካነር",category:"Operational Moderation",description:"Monitor price spikes, duplicate photo proofs, and volume surges."},{key:"VIEW_TAX_COMPLIANCE",label:"Tax & Fiscal Compliance Invoicing",labelAm:"የግብር እና ህጋዊ ደረሰኝ",category:"Operational Moderation",description:"Inspect electronic tax invoices (e-VAT) and MOR 2% withholding receipts."},{key:"VIEW_REGIONAL_ANALYTICS",label:"Regional Analytics & Volume",labelAm:"የክልሎች የንግድ ትንታኔ",category:"Operational Moderation",description:"Analyze GMV, metric tons moved, and price averages per region."},{key:"FIELD_AGENT_ONBOARDING",label:"In-Field Farmer Onboarding",labelAm:"አርሶ አደሮችን በአካል መመዝገብ",category:"Field & Logistics",description:"Onboard smallholders with camera capture of Kebele ID & Fayda National ID."},{key:"EXECUTE_USSD",label:"Offline USSD Engine",labelAm:"ከኢንተርኔት ውጭ USSD መጠቀም",category:"Field & Logistics",description:"Execute *988# USSD command simulation for low-connectivity rural hubs."},{key:"VIEW_DELIVERY_ROUTES",label:"GPS Dispatch & Waybills",labelAm:"የማጓጓዣ መንገዶች እና ዌይቢል",category:"Field & Logistics",description:"Access multi-stop route optimization and cargo load manifests."},{key:"SUBMIT_DELIVERY_PROOF",label:"GPS Dropoff Photo Proof",labelAm:"የማድረሻ ፎቶ ማረጋገጫ ማስገባት",category:"Field & Logistics",description:"Submit geo-tagged timestamped photos of produce pickup & delivery."},{key:"OFFLINE_TRIP_SYNC",label:"Offline Trip Sync",labelAm:"የከመስመር ውጭ ጉዞ ማመሳሰል",category:"Field & Logistics",description:"Cache trip confirmations in localStorage and sync when cellular resumes."},{key:"PUBLISH_PRODUCE",label:"Publish Produce Listings",labelAm:"የእርሻ ምርት ለገበያ ማቅረብ",category:"Marketplace & Trade",description:"Post crops with pricing, stock quantity, and audio voice memo transcription."},{key:"MANAGE_FARM_ORDERS",label:"Confirm & Fulfill Farm Orders",labelAm:"የትዕዛዝ መቀበያ እና ማረጋገጫ",category:"Marketplace & Trade",description:"Accept purchase orders and prepare harvest for driver pickup."},{key:"REQUEST_WALLET_WITHDRAWAL",label:"Telebirr Instant Payouts",labelAm:"ገንዘብ ወደ ቴሌብር ማውጣት",category:"Marketplace & Trade",description:"Withdraw wallet balance directly to Telebirr mobile wallet."},{key:"PLACE_ORDERS",label:"Bulk Wholesale Ordering",labelAm:"የጅምላ ምርት መግዛት",category:"Marketplace & Trade",description:"Purchase fresh produce directly from verified farmers across Ethiopia."},{key:"TELEBIRR_CHECKOUT",label:"Telebirr C2B Escrow Checkout",labelAm:"በቴሌብር ክፍያ መፈጸም",category:"Marketplace & Trade",description:"Authorize secure payments held in Telebirr escrow."},{key:"CREATE_STANDING_ORDERS",label:"Recurring Standing Orders",labelAm:"ተደጋጋሚ ቋሚ ትዕዛዝ ማዘዝ",category:"Marketplace & Trade",description:"Schedule automatic weekly and bi-weekly harvest deliveries."},{key:"FILE_DISPUTES",label:"File Escrow Dispute",labelAm:"የቅሬታ ማመልከቻ ማስገባት",category:"Marketplace & Trade",description:"Report damaged goods or delivery delays to pause escrow release."}]),f(ne,"DEFAULT_ROLE_PERMISSIONS",{superadmin:{MANAGE_USERS:!0,MANAGE_RBAC_PERMISSIONS:!0,MANAGE_PLATFORM_CONFIG:!0,EMERGENCY_ESCROW_FREEZE:!0,APPROVE_HIGH_VALUE_PAYOUTS:!0,IMPERSONATE_USERS:!0,VIEW_AUDIT_LOGS:!0,MANAGE_TRADE_ZONES:!0,MANAGE_BLACKLIST:!0,MODERATE_LISTINGS:!0,MANAGE_BANNERS:!0,RESOLVE_DISPUTES:!0,VERIFY_KYC:!0,BROADCAST_SMS:!0,VIEW_ANOMALY_ALERTS:!0,VIEW_TAX_COMPLIANCE:!0,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!0,OFFLINE_TRIP_SYNC:!0,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!0,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!0,TELEBIRR_CHECKOUT:!0,CREATE_STANDING_ORDERS:!0,FILE_DISPUTES:!0},admin:{MANAGE_USERS:!0,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!0,MANAGE_TRADE_ZONES:!0,MANAGE_BLACKLIST:!0,MODERATE_LISTINGS:!0,MANAGE_BANNERS:!0,RESOLVE_DISPUTES:!0,VERIFY_KYC:!0,BROADCAST_SMS:!0,VIEW_ANOMALY_ALERTS:!0,VIEW_TAX_COMPLIANCE:!0,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!1,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},agent:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},farmer:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!0,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},buyer:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!0,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!1,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!1,PLACE_ORDERS:!0,TELEBIRR_CHECKOUT:!0,CREATE_STANDING_ORDERS:!0,FILE_DISPUTES:!0},driver:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!1,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!0,OFFLINE_TRIP_SYNC:!0,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1}});let Oe=ne;const c=new Oe,ee={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",roleSuperAdmin:"Super Admin (Chief Platform Officer)",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLegalDocuments:"Contracts & Tax Invoices",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Full Produce & Photos",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cropDescription:"Produce Description & Origin Story",qualitySpecs:"Quality & Agricultural Specifications",packagingType:"Packaging & Handling",storageRecommendation:"Storage & Shelf Life",farmerProfile:"Verified Smallholder Producer",directContact:"Direct Producer Contact",callFarmer:"Call Farmer",smsInquiry:"SMS Inquiry",buyNowEscrow:"Instant Order (Telebirr Escrow)",selectOrderQty:"Select Order Quantity (kg)",marketComparison:"Regional Price Benchmark",belowMarketAvg:"Below Regional Wholesale Average",photoGallery:"Produce Photos & Inspection Angles",clickToEnlarge:"Click to view full photo & details",shareListing:"Share Listing",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",viewContractBtn:"View Sales Contract",viewInvoiceBtn:"Download Tax Invoice",viewWaybillBtn:"Transport Waybill (Manifest)",viewArbitrationBtn:"Arbitration Determination",printDocument:"Print / Save PDF",closeDocument:"Close Document",rateFarmerBtn:"Rate & Review Farmer",rateFarmerTitle:"Rate Your Produce & Farmer",rateFarmerSubtitle:"Share your rating and feedback to build trust in the Ethiopian agricultural marketplace.",rateYourExperience:"How was the produce quality and farmer service?",starRatingLabel:"Star Rating",reviewCommentLabel:"Detailed Comments & Feedback",reviewCommentPlaceholder:"Describe produce freshness, packing grade, delivery timeliness, and farmer communication...",quickTagsLabel:"Quick Highlights",submitReviewBtn:"Submit Rating & Review",reviewSubmittedSuccess:"Thank you! Your verified review and rating have been recorded.",verifiedBuyerReviews:"Verified Customer Reviews & Feedback",verifiedReviewsTitle:"Customer Reviews",verifiedBuyerBadge:"Verified Wholesale Buyer",ratingScoreText:"out of 5 stars",allReviews:"All Reviews",noReviewsYet:"No customer reviews yet. Be the first to review after delivery!",ratedBadge:"Rated",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Tax Statements (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",withholdingTaxReported:"Withholding Tax (2% Goods)",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release & Tax Log",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Cargo Manifest",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Governance, Law & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",statVatRemitted:"VAT on Platform Fees (15%)",statWithholding:"Withholding Tax (2%)",resolveDisputeTitle:"Escrow Legal Arbitration Console",disputeEvidence:"Evidence & Inspection Report",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Tiered KYC & Trade Registry Queue",approveKycBtn:"Approve Identity & License",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",roleAgent:"Field Agent",navAgentPortal:"Field Agent Portal",agentPortalTitle:"Community Field Agent Onboarding Console",agentOnboardFarmerBtn:"Register Smallholder Farmer",agentRosterTitle:"Farmers Onboarded in Your Woreda",agentCommissionEarned:"Agent Commission",agentSyncStatus:"Sync Status",agentRegisterSuccess:"Farmer registered and documents queued for verification!",verifyAccountTitle:"Account Identity & Regulatory Verification",verificationStatusLabel:"Verification Status",statusPendingSubmission:"Pending Submission",statusUnderReview:"Under Review by Admin",statusApproved:"Fully Approved & Compliant",statusRejected:"Verification Rejected",verificationBannerText:"Complete your Fayda ID & TIN verification to unlock full marketplace selling and bulk purchasing privileges.",startVerificationBtn:"Verify Account Now",faydaIdLabel:"Fayda National ID Number (FAN)",tinNumberLabel:"10-Digit Taxpayer ID (TIN)",kebeleIdLabel:"Kebele Resident / Farm ID",uploadFrontPhoto:"Upload Front ID Photo",uploadBackPhoto:"Upload Back ID Photo",rejectionReasonLabel:"Rejection Reason",resubmitDocsBtn:"Update & Resubmit Documents",sideBySideInspectionTitle:"Side-by-Side Document Inspection",approveVerificationAction:"Approve Identity & Tax License",rejectVerificationAction:"Reject & Request Clarification",sendSmsNoticeToggle:"Notify user immediately via bilingual SMS",superAdminTitle:"Super Admin Command Center & Governance",superAdminSubtitle:"Full System Access · User CRUD · RBAC · Platform Config · Emergency Controls",tabUserMaster:"User Master CRUD",tabBanners:"Banners & Announcements",tabModeration:"Content & Post Moderation",tabPermissions:"RBAC Permissions",tabPlatformConfig:"Platform Config & Escrow",tabFinancialOversight:"Financials & Payouts",tabAuditLogs:"System Audit Logs",tabZones:"Delivery Zones & PostGIS",tabFeatureFlags:"Feature Flags",tabEmergency:"Emergency & Blacklist",tabBusinessRules:"Global Rules",tabDbOps:"Database & Health",createBannerBtn:"Add Promotional Banner",editBannerBtn:"Edit Banner",deleteBannerBtn:"Delete Banner",moderatePostBtn:"Moderate / Edit Post",flagAnomalyBtn:"Flag Price Anomaly",deletePostBtn:"Delete Post",impersonateBtn:"Login As / Impersonate",exitImpersonation:"Exit Impersonation",createUserBtn:"Create New Account",editUserBtn:"Edit User",freezePlatformEscrow:"Emergency Platform Escrow Freeze",exportDataBtn:"Export Platform Data (CSV/JSON)",triggerBackupBtn:"Trigger DB Backup Snapshot",payoutApprovalTitle:"High-Value Payout Approvals (> 50,000 ETB)",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",roleSuperAdmin:"ዋና አድሚን (Super Admin)",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLegalDocuments:"ውሎች እና የግብር ደረሰኞች",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"ሙሉ የምርት ፎቶና ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cropDescription:"የምርት ዝርዝር ገለጻ እና መገኛ",qualitySpecs:"የጥራት እና የግብርና መረጃዎች",packagingType:"የማሸጊያ እና አያያዝ ሁኔታ",storageRecommendation:"የማስቀመጫ እና የመቆያ ጊዜ",farmerProfile:"የተረጋገጠ አርሶ አደር መረጃ",directContact:"አርሶ አደሩን በቀጥታ ያግኙ",callFarmer:"ይደውሉ",smsInquiry:"መልእክት ይላኩ",buyNowEscrow:"በቴሌብር ዋስትና አሁኑኑ ይዘዙ",selectOrderQty:"የትዕዛዝ መጠን ይምረጡ (ኪ.ግ)",marketComparison:"የክልላዊ ገበያ ዋጋ ንጽጽር",belowMarketAvg:"ከክልላዊ ገበያ አማካይ ያነሰ",photoGallery:"የምርት ፎቶዎች እና የምርመራ ማዕዘናት",clickToEnlarge:"ሙሉ ፎቶና ዝርዝር ለማየት ይጫኑ",shareListing:"ምርቱን ያጋሩ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",viewContractBtn:"የግብይት ውል ይመልከቱ",viewInvoiceBtn:"የግብር እና ሽያጭ ደረሰኝ (e-VAT)",viewWaybillBtn:"የጭነት ማጓጓዣ ሰነድ (Waybill)",viewArbitrationBtn:"የሽምግልና ውሳኔ ሰነድ",printDocument:"አትም / ፒዲኤፍ አስቀምጥ",closeDocument:"ሰነዱን ዝጋ",rateFarmerBtn:"ለአርሶ አደሩ ደረጃ ይስጡ እና አስተያየት ይጻፉ",rateFarmerTitle:"ለተረከቡት ምርት እና ለአርሶ አደሩ ደረጃ ይስጡ",rateFarmerSubtitle:"የእርስዎ አስተያየት እና ደረጃ በኢትዮጵያ የግብርና ገበያ ውስጥ መተማመንን ይገነባል።",rateYourExperience:"የምርቱ ጥራት፣ ትኩስነት እና የአርሶ አደሩ አገልግሎት እንዴት ነበር?",starRatingLabel:"የኮከብ ደረጃ",reviewCommentLabel:"ዝርዝር አስተያየት እና ግምገማ",reviewCommentPlaceholder:"ስለ ምርቱ ትኩስነት፣ አሸጋገግ፣ የአቅርቦት ፍጥነት እና የአርሶ አደሩ ግንኙነት ይጻፉ...",quickTagsLabel:"ፈጣን መለያዎች",submitReviewBtn:"ደረጃ እና አስተያየቱን መዝግብ",reviewSubmittedSuccess:"እናመሰግናለን! የእርስዎ ደረጃ እና አስተያየት በተሳካ ሁኔታ ተመዝግቧል።",verifiedBuyerReviews:"የተረጋገጡ የደንበኞች ደረጃ እና አስተያየቶች",verifiedReviewsTitle:"የደንበኞች አስተያየቶች",verifiedBuyerBadge:"የተረጋገጠ የጅምላ ገዢ",ratingScoreText:"ከ 5 ኮከቦች",allReviews:"ሁሉም አስተያየቶች",noReviewsYet:"እስካሁን የተሰጠ አስተያየት የለም። ምርቱን ከተረከቡ በኋላ የመጀመሪያው አስተያየት ሰጪ ይሁኑ!",ratedBadge:"ደረጃ ተሰጥቷል",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የግብር መግለጫ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",withholdingTaxReported:"የተያዘ ግብር (2% Withholding)",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ እና የደረሰኝ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር፣ ህጋዊነት እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",statVatRemitted:"የተሰበሰበ የተጨማሪ እሴት ታክስ (15% VAT)",statWithholding:"የተያዘ ግብር (2% Withholding)",resolveDisputeTitle:"የህጋዊ ቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና የፍተሻ ሪፖርት",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የተጠቃሚዎች ህጋዊነት እና የንግድ ፈቃድ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ እና ፈቃድ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",roleAgent:"የግብርና ድጋፍ ኤጀንት",navAgentPortal:"የኤጀንት ክፍል",agentPortalTitle:"የማህበረሰብ ግብርና ኤጀንቶች የገበሬዎች መመዝገቢያ ክፍል",agentOnboardFarmerBtn:"አዲስ አርሶ አደር መዝግብ",agentRosterTitle:"በእርስዎ ወረዳ የተመዘገቡ አርሶ አደሮች",agentCommissionEarned:"የኤጀንት ክፍያ",agentSyncStatus:"የዳታ ሁኔታ",agentRegisterSuccess:"አርሶ አደሩ ተመዝግቧል! ሰነዱ ለማረጋገጫ ተልኳል።",verifyAccountTitle:"የመለያ ህጋዊነት እና የታክስ ማረጋገጫ",verificationStatusLabel:"የማረጋገጫ ሁኔታ",statusPendingSubmission:"ሰነድ አልገባም",statusUnderReview:"በአድሚን በመገምገም ላይ",statusApproved:"የተረጋገጠ እና የጸደቀ",statusRejected:"ውድቅ ተደርጓል",verificationBannerText:"ምርቶችን በቀጥታ ለመሸጥ እና ክፍያ ለመቀበል የፋይዳ (Fayda) መታወቂያ እና የታክስ መለያ (TIN) ያረጋግጡ።",startVerificationBtn:"መለያዎን አሁን ያረጋግጡ",faydaIdLabel:"የፋይዳ ብሔራዊ መታወቂያ ቁጥር (FAN)",tinNumberLabel:"የ10-ዲጂት የግብር ከፋይ መለያ (TIN)",kebeleIdLabel:"የቀበሌ ነዋሪነት / የእርሻ ማረጋገጫ",uploadFrontPhoto:"የመታወቂያ የፊት ገጽ ፎቶ",uploadBackPhoto:"የመታወቂያ የጀርባ ገጽ ፎቶ",rejectionReasonLabel:"ውድቅ የተደረገበት ምክንያት",resubmitDocsBtn:"ሰነዶችን አስተካክለው እንደገና ያስገቡ",sideBySideInspectionTitle:"የሰነዶች ጎን ለጎን ፍተሻ እና ማረጋገጫ",approveVerificationAction:"መታወቂያ እና የግብር ሰነድ አጽድቅ",rejectVerificationAction:"ውድቅ አድርግ / ማብራሪያ ጠይቅ",sendSmsNoticeToggle:"ለተጠቃሚው ወዲያውኑ በኤስኤምኤስ አሳውቅ",superAdminTitle:"የዋና አድሚን ቁጥጥር እና አስተዳደር ማዕከል",superAdminSubtitle:"ሙሉ የሲስተም ስልጣን · የተጠቃሚዎች CRUD · RBAC · የዋስትና ውቅር · የአደጋ ጊዜ መቆጣጠሪያ",tabUserMaster:"የተጠቃሚዎች አስተዳደር (CRUD)",tabBanners:"የማስታወቂያ ባነሮች",tabModeration:"የምርቶች ቁጥጥር እና ማስተካከያ",tabPermissions:"የፈቃዶች ማትሪክስ (RBAC)",tabPlatformConfig:"የሲስተም ውቅር እና የዋስትና ድርሻ",tabFinancialOversight:"የፋይናንስ እና ክፍያ ቁጥጥር",tabAuditLogs:"የሲስተም ኦዲት መዝገብ",tabZones:"የማድረሻ ዞኖች እና ካርታ",tabFeatureFlags:"የባህሪያት ማብሪያ/ማጥፊያ",tabEmergency:"የአደጋ ጊዜ መቆጣጠሪያ እና እገዳ",tabBusinessRules:"አጠቃላይ የንግድ ደንቦች",tabDbOps:"ዳታቤዝ እና የሲስተም ጤና",createBannerBtn:"አዲስ ባነር ጨምር",editBannerBtn:"ባነር አርትዕ",deleteBannerBtn:"ባነር ሰርዝ",moderatePostBtn:"ምርት አርትዕ/አስተካክል",flagAnomalyBtn:"ያልተገባ ዋጋ ጠቁም",deletePostBtn:"ምርት ሰርዝ",impersonateBtn:"በተጠቃሚው ስም ግባ",exitImpersonation:"ከተጠቃሚው ውጣ",createUserBtn:"አዲስ መለያ ፍጠር",editUserBtn:"ተጠቃሚ አርትዕ",freezePlatformEscrow:"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ",exportDataBtn:"መረጃ በCSV/JSON አውርድ",triggerBackupBtn:"የዳታቤዝ ምትክ ቅጂ ውሰድ",payoutApprovalTitle:"ከፍተኛ የገንዘብ ክፍያ ማረጋገጫ (> 50,000 ብር)",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function Qt(o,e,t,a,s,i,n=""){const r=ee[o],d=s.reduce((b,v)=>b+v.qtyKg,0),p={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},agent:{label:"Field Extension Agent",labelAm:"የግብርና ድጋፍ ኤጀንት",color:"bg-teal-100 text-teal-900 border-teal-300",icon:"fa-users-gear"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"},superadmin:{label:"Super Admin (Chief Platform Officer)",labelAm:"ዋና አድሚን (Super Admin)",color:"bg-rose-100 text-rose-900 border-rose-300",icon:"fa-crown"}},l=e?p[e.role]||p.buyer:null;return e&&localStorage.getItem("currentUser")&&JSON.parse(localStorage.getItem("currentUser")||"{}").phone!=="+251900000001"&&window.isSuperAdminImpersonating,`
    <!-- Top Impersonation Banner if active -->
    <div id="impersonationBannerContainer"></div>

    <header class="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      
      <!-- Top Utility & Trust Bar -->
      <div class="bg-slate-950 text-slate-300 text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-emerald-400 font-bold">
              <i class="fa-solid fa-shield-check"></i> Telebirr Escrow 100% Guaranteed
            </span>
            <span class="hidden md:inline text-slate-600">|</span>
            <span class="hidden md:flex items-center gap-1.5 text-slate-300">
              <i class="fa-solid fa-handshake text-amber-400"></i> Direct Farm-to-Buyer (0% Middlemen Markups)
            </span>
            <span class="hidden lg:inline text-slate-600">|</span>
            <span class="hidden lg:flex items-center gap-1 text-slate-400">
              <i class="fa-solid fa-truck text-emerald-400"></i> Isuzu 5-Ton Freight Network
            </span>
          </div>

          <div class="flex items-center gap-3 sm:gap-5">
            <span class="hidden sm:inline text-slate-400">
              <i class="fa-solid fa-phone mr-1 text-emerald-400"></i> Hotline: <strong class="text-slate-200">+251 911 223 344</strong>
            </span>
            
            <span class="text-slate-600">|</span>

            <!-- Language Switcher -->
            <button onclick="window.toggleLanguage()" 
              class="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 font-bold transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-slate-900"
              title="Switch Language">
              <i class="fa-solid fa-globe text-emerald-400"></i>
              <span>${o==="en"?"አማርኛ":"English"}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Main AliExpress Style Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div class="flex items-center justify-between gap-4 sm:gap-8">
          
          <!-- Brand Logo -->
          <div class="flex items-center gap-3 cursor-pointer shrink-0" onclick="window.navigateTab('marketplace')">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center shadow-md text-white text-xl font-bold">
              <i class="fa-solid fa-wheat-awn"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-xl font-black tracking-tight text-slate-900 ${o==="am"?"lang-am":""}">
                  ${r.brandName}
                </span>
                <span class="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-200">
                  ET
                </span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium ${o==="am"?"lang-am":""}">
                ${r.brandSubtitle}
              </p>
            </div>
          </div>

          <!-- AliExpress Style Global Search Box -->
          <div class="hidden md:flex flex-1 max-w-2xl relative">
            <div class="relative w-full flex items-center shadow-xs rounded-xl overflow-hidden border-2 border-emerald-700 bg-white">
              <div class="pl-3.5 pr-2 text-slate-400">
                <i class="fa-solid fa-magnifying-glass text-sm"></i>
              </div>
              <input type="text" 
                value="${n}" 
                oninput="window.setSearchQuery(this.value)"
                placeholder="${r.searchPlaceholder}"
                class="w-full py-2.5 pr-3 text-sm focus:outline-none bg-transparent placeholder:text-slate-400 font-medium ${o==="am"?"lang-am":""}" />
              
              <button onclick="window.navigateTab('marketplace')" class="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0">
                <span>Search</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>

          <!-- Right Action Controls (AliExpress Account & Cart Style) -->
          <div class="flex items-center gap-3 shrink-0">
            
            <!-- Professional Account Dropdown Container -->
            <div class="relative group">
              
              ${t&&e?`
                <!-- Logged In Account Button -->
                <button class="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-left">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white flex items-center justify-center font-bold text-sm shadow-xs relative">
                    <span>${e.name.charAt(0).toUpperCase()}</span>
                    <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div class="hidden xl:block">
                    <span class="text-[10px] font-bold text-slate-400 block leading-tight">
                      ${o==="am"?"ሰላም,":"Hello,"}
                    </span>
                    <span class="text-xs font-black text-slate-900 block truncate max-w-[120px] leading-tight ${o==="am"?"lang-am":""}">
                      ${o==="am"&&e.nameAm?e.nameAm:e.name}
                    </span>
                  </div>
                  <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-0.5"></i>
                </button>

                <!-- Professional Flyout Account Menu -->
                <div class="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3.5 hidden group-hover:block z-50 animate-fadeIn">
                  
                  <!-- Profile Header in Dropdown -->
                  <div class="pb-3 border-b border-slate-100 flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-base shadow-sm">
                      ${e.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="truncate">
                      <div class="flex items-center gap-1.5">
                        <span class="text-sm font-black text-slate-900 truncate ${o==="am"?"lang-am":""}">
                          ${o==="am"&&e.nameAm?e.nameAm:e.name}
                        </span>
                        <i class="fa-solid fa-circle-check text-emerald-600 text-xs" title="Verified Account"></i>
                      </div>
                      <span class="text-[11px] font-semibold text-slate-500 block truncate">${e.phone}</span>
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${(l==null?void 0:l.color)||"bg-slate-100 text-slate-800"}">
                        ${o==="am"?l==null?void 0:l.labelAm:l==null?void 0:l.label}
                      </span>
                    </div>
                  </div>

                  <!-- Verification Status Banner in Dropdown -->
                  <div class="p-2.5 rounded-xl ${e.verificationStatus==="Approved"||e.verified?"bg-emerald-50 border border-emerald-200":e.verificationStatus==="UnderReview"?"bg-amber-50 border border-amber-200":"bg-red-50 border border-red-200"} text-xs">
                    <div class="flex items-center justify-between">
                      <span class="font-bold ${e.verificationStatus==="Approved"||e.verified?"text-emerald-900":e.verificationStatus==="UnderReview"?"text-amber-900":"text-red-900"}">
                        ${e.verificationStatus==="Approved"||e.verified?"🛡️ "+(o==="am"?"የተረጋገጠ መለያ":"Fayda Verified"):e.verificationStatus==="UnderReview"?"⏳ "+(o==="am"?"በመገምገም ላይ":"Under Review"):"⚠️ "+(o==="am"?"ማረጋገጫ ያስፈልጋል":"Unverified Account")}
                      </span>
                      <button onclick="window.openVerificationWizard()" class="text-[10px] font-bold underline cursor-pointer text-emerald-800">
                        ${o==="am"?"ይመልከቱ":"Manage"}
                      </button>
                    </div>
                  </div>

                  <!-- Quick Portal Navigation -->
                  <div class="space-y-1 text-xs font-bold text-slate-700">
                    <button onclick="window.navigateTab('${e.role}');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer">
                      <span class="flex items-center gap-2">
                        <i class="fa-solid fa-gauge text-emerald-600"></i> My Portal Dashboard
                      </span>
                      <i class="fa-solid fa-arrow-right text-[10px] text-slate-400"></i>
                    </button>

                    ${e.role==="farmer"?`
                      <button onclick="window.navigateTab('farmer-account');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer">
                        <span class="flex items-center gap-2"><i class="fa-solid fa-user-gear text-emerald-600"></i> Account center</span>
                        <i class="fa-solid fa-arrow-right text-[10px] text-slate-400"></i>
                      </button>
                    `:""}

                    ${e.role==="buyer"?`
                      <button onclick="window.navigateTab('account');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer">
                        <span class="flex items-center gap-2"><i class="fa-solid fa-user-gear text-emerald-600"></i> Account center</span>
                        <i class="fa-solid fa-arrow-right text-[10px] text-slate-400"></i>
                      </button>
                    `:""}

                    <button onclick="window.openVerificationWizard();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-id-card text-emerald-600"></i> ${o==="am"?"የፋይዳ / የታክስ ማረጋገጫ":"Fayda & TIN Verification"}
                    </button>

                    ${e.role==="farmer"?`
                      <button onclick="window.toggleCreateListingModal();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-plus-circle text-emerald-600"></i> Post New Produce Listing
                      </button>
                    `:""}

                    ${e.role==="superadmin"?`
                      <button onclick="window.navigateTab('superadmin');" class="w-full text-left px-3 py-2 rounded-xl bg-rose-50 text-rose-950 hover:bg-rose-100 transition-colors flex items-center gap-2 cursor-pointer font-bold border border-rose-200">
                        <i class="fa-solid fa-crown text-rose-600"></i> Super Admin Command Center
                      </button>
                    `:""}

                    <button onclick="window.navigateTab('marketplace');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-store text-slate-500"></i> Browse Produce Exchange
                    </button>
                  </div>

                  <!-- Logout Button -->
                  <div class="pt-2 border-t border-slate-100">
                    <button onclick="window.handleLogout()" class="w-full py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>
                      <span>${o==="am"?"ከመለያ ውጣ (Sign Out)":"Sign Out"}</span>
                    </button>
                  </div>

                </div>
              `:`
                <!-- Logged Out AliExpress Style Sign In Button -->
                <button onclick="window.openAuthModal('login')" 
                  class="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer text-left">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                    <i class="fa-regular fa-user"></i>
                  </div>
                  <div class="hidden sm:block">
                    <span class="text-[10px] font-bold text-slate-400 block leading-tight">Welcome</span>
                    <span class="text-xs font-black text-slate-900 block leading-tight">Sign In / Join</span>
                  </div>
                  <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-0.5"></i>
                </button>

                <!-- AliExpress Style Guest Flyout Menu -->
                <div class="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 hidden group-hover:block z-50 animate-fadeIn">
                  <button onclick="window.openAuthModal('login')" class="btn-primary w-full py-2.5 text-xs font-bold shadow-md cursor-pointer">
                    <i class="fa-solid fa-right-to-bracket mr-1"></i> Sign In (መግቢያ)
                  </button>
                  <p class="text-[11px] text-center text-slate-500 font-medium">
                    New to platform? <a href="javascript:void(0)" onclick="window.openAuthModal('register')" class="text-emerald-700 font-bold hover:underline">Join Free</a>
                  </p>
                  
                  <div class="pt-2 border-t border-slate-100 space-y-1.5 text-xs font-semibold text-slate-600">
                    <a href="javascript:void(0)" onclick="window.openAuthModal('login')" class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg">
                      <i class="fa-solid fa-box text-emerald-600"></i> Track Wholesale Orders
                    </a>
                    <a href="javascript:void(0)" onclick="window.openAuthModal('register')" class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg">
                      <i class="fa-solid fa-tractor text-amber-600"></i> Farmer Seller Center
                    </a>
                    <a href="javascript:void(0)" onclick="window.openAuthModal('register')" class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg">
                      <i class="fa-solid fa-truck text-blue-600"></i> Freight & Driver Logistics
                    </a>
                  </div>
                </div>
              `}

            </div>

            <!-- Notifications Bell (Only when signed in) -->
            ${t?`
              <button onclick="window.openNotificationsModal()" 
                class="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer"
                title="SMS Alerts & Notifications">
                <i class="fa-regular fa-bell text-base"></i>
                ${i>0?`
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                    ${i}
                  </span>`:""}
              </button>
            `:""}

            <!-- Bulk Cart Button -->
            <button onclick="window.toggleCart()" 
              class="btn-primary text-xs py-2 px-3 sm:px-4 flex items-center gap-2 cursor-pointer shadow-md">
              <i class="fa-solid fa-cart-shopping text-sm"></i>
              <span class="font-bold hidden sm:inline ${o==="am"?"lang-am":""}">${r.navCart}</span>
              <span class="bg-amber-400 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                ${d>0?`${d} kg`:"0"}
              </span>
            </button>

          </div>

        </div>
      </div>

      <!-- Secondary Role Navigation Strip -->
      <div class="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none py-2 gap-2 text-xs font-semibold text-slate-600">
          
          <div class="flex items-center gap-1.5">
            
            <button onclick="window.navigateTab('marketplace')" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="marketplace"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-store"></i> ${r.navMarketplace}
            </button>

            ${t&&(e==null?void 0:e.role)==="farmer"?`
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="farmer"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-tractor"></i> ${r.navFarmerPortal}
              </button>
              ${c.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?`
                <button onclick="window.toggleCreateListingModal()" 
                  class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${o==="am"?"lang-am":""}">
                  <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${r.postNewListing}
                </button>
              `:""}
            `:""}

            ${t&&(e==null?void 0:e.role)==="driver"?`
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="driver"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-truck"></i> ${r.navDriverPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="agent"?`
              <button onclick="window.navigateTab('agent')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="agent"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-users-gear text-teal-400"></i> ${r.navAgentPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="admin"?`
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="admin"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-sliders"></i> ${r.navAdminPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="superadmin"?`
              <button onclick="window.navigateTab('superadmin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="superadmin"?"bg-rose-900 text-white font-bold shadow-xs":"bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold border border-rose-200"}">
                <i class="fa-solid fa-crown text-rose-500"></i> SuperAdmin
              </button>
            `:""}

            ${!t||(e==null?void 0:e.role)==="buyer"?`
              <button onclick="window.toggleCart()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-200/70 text-slate-700 ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Wholesale Bulk Cart (${d} kg)
              </button>
            `:""}

            <button onclick="window.openMarketIntelligence()" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold ${o==="am"?"lang-am":""}"
              title="View live Ethiopian Commodity Exchange (ECX) prices & AI valuation">
              <i class="fa-solid fa-chart-line text-amber-600"></i> ${o==="am"?"📈 የECX ገበያ ዋጋ":"📈 ECX Price Index"}
            </button>

            <button onclick="window.openUssdSimulator()" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold ${o==="am"?"lang-am":""}"
              title="Simulate 2G feature-phone USSD *804# workflow for offline farmers">
              <i class="fa-solid fa-phone text-emerald-600"></i> 📞 USSD (*804#)
            </button>

          </div>

          <div class="hidden lg:flex items-center gap-3 text-slate-500 text-[11px]">
            <span class="flex items-center gap-1"><i class="fa-solid fa-seedling text-emerald-600"></i> 100% Ethiopian Farm Sourced</span>
            <span>·</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-snowflake text-cyan-600"></i> Cold-Chain Logistics</span>
            <span>·</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-bolt text-blue-600"></i> Telebirr Escrow Automated</span>
          </div>

        </div>
      </div>

    </header>
  `}function Jt(o,e,t,a,s,i,n,r,d,p=null,l=0,b="All",v="All",k=!1,$=!1,u="marketplace",S=c.getStandingOrders(),T=c.getOrders("buyer")){var J,ie;const w=ee[o],E=[{key:"All",label:w.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:w.catVegetables,icon:"fa-carrot"},{key:"Grains",label:w.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:w.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:w.catCoffee,icon:"fa-mug-hot"}],L=i.reduce((A,Y)=>A+Y.qtyKg*Y.listing.pricePerKg,0),V=Math.round(L*.9),y=Math.round(L*.05),_=L-V-y,G=i.reduce((A,Y)=>{const q=Y.listing.farmerId;return A[q]||(A[q]={farmerName:Y.listing.farmerName,farmerRegion:Y.listing.region,items:[]}),A[q].items.push(Y),A},{}),B=c.getActiveBanners("Buyer",a),P=B.length>0?B[0]:null;return`
    <div class="space-y-8 pb-20">
      
      <!-- E-Commerce Hero Promotional Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>${P!=null&&P.badgeText?P.badgeText:"15M+ Ethiopian Smallholder Farmers Direct Network"}</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${o==="am"?"lang-am":""}">
              ${P?o==="am"&&P.titleAm?P.titleAm:P.title:w.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${o==="am"?"lang-am":""}">
              ${P?o==="am"&&P.subtitleAm?P.subtitleAm:P.subtitle||w.heroDesc:w.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> ${P!=null&&P.ctaText?o==="am"&&P.ctaTextAm?P.ctaTextAm:P.ctaText:"Browse Farm Deals"}
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${w.navOrders} & Invoices (${T.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${w.standingOrdersTitle}
              </button>
            </div>
          </div>

          <!-- Hero Promo Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3 relative overflow-hidden">
              ${P!=null&&P.imageUrl?`
                <img src="${P.imageUrl}" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
              `:""}
              <div class="relative z-10 space-y-3">
                <div class="flex items-center justify-between text-xs font-bold text-emerald-200">
                  <span><i class="fa-solid fa-bolt text-amber-400"></i> PostGIS Geo-Proximity</span>
                  <span class="telebirr-badge text-[10px]">Telebirr C2B</span>
                </div>
                <div class="text-2xl font-black text-white">90% Direct to Farmer</div>
                <p class="text-xs text-emerald-100/90 leading-relaxed">
                  Source directly from farms within 10-100 km. Consolidate orders from multiple farmers with official e-VAT tax receipts.
                </p>
                <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                  <span>Tax Invoices: <strong class="text-white">e-VAT Ready</strong></span>
                  <span>Contracts: <strong class="text-white">EABC Standard</strong></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Sub-Tab Switcher: Marketplace vs My Orders & Tax Invoices vs Standing Orders -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center gap-2 overflow-x-auto">
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${u==="marketplace"?"active":""}">
            <i class="fa-solid fa-store"></i>
            <span>${o==="am"?"የጅምላ ገበያ":"Wholesale Marketplace"}</span>
          </button>
          <button onclick="window.setBuyerSubTab('orders')" class="cat-pill ${u==="orders"?"active":""}">
            <i class="fa-solid fa-receipt"></i>
            <span>${w.navOrders} & ${w.navLegalDocuments} (${T.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${u==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${w.standingOrdersTitle} (${S.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${u==="standing_orders"?Zt(o,S):u==="orders"?Xt(o,T):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${E.map(A=>`
            <button onclick="window.setCategory('${A.key}')" 
              class="cat-pill ${t===A.key?"active":""} ${o==="am"?"lang-am":""}">
              <i class="fa-solid ${A.icon}"></i>
              <span>${A.label}</span>
            </button>
          `).join("")}
        </div>

        <!-- Filter Controls Bar -->
        <div class="glass-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <!-- PostGIS Geo-Proximity Radius Slider -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${w.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0,25,50,100].map(A=>`
                <button onclick="window.setMaxDistanceKm(${A})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${l===A?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${A===0?"All":A+" km"}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${w.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${b==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${b==="Grade 1"?"selected":""}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${b==="Grade 2"?"selected":""}>Grade 2 (Value)</option>
              <option value="Export Grade" ${b==="Export Grade"?"selected":""}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${w.filterRipeness}:</span>
            <select onchange="window.setFilterRipeness(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${v==="All"?"selected":""}>All Ripeness</option>
              <option value="Ready Today" ${v==="Ready Today"?"selected":""}>Ready Today</option>
              <option value="Semi-Ripe" ${v==="Semi-Ripe"?"selected":""}>Semi-Ripe</option>
              <option value="Green / Storable" ${v==="Green / Storable"?"selected":""}>Green / Storable</option>
            </select>
          </div>

          <!-- Toggle Flags -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${k?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${w.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${$?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${w.filterAdvance}</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Produce Marketplace Grid -->
      <section class="space-y-4">
        
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-boxes-packing text-emerald-600 mr-2"></i> ${w.catAll} (${e.length})
          </h2>
          <span class="text-xs text-slate-500 font-semibold">
            Showing verified smallholder produce within delivery range
          </span>
        </div>

        ${e.length===0?`
          <div class="glass-card p-12 text-center text-slate-500 space-y-3">
            <i class="fa-solid fa-magnifying-glass text-4xl text-slate-300"></i>
            <p class="text-sm font-semibold">No produce matches your current filters.</p>
            <button onclick="window.resetFilters()" class="btn-secondary text-xs py-2 px-4">Reset All Filters</button>
          </div>
        `:`
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${e.map(A=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1">
                
                <div>
                  <!-- Clickable Image with Hover Inspector Overlay -->
                  <div 
                    onclick="window.openProduceDetail('${A.id}')" 
                    class="h-48 w-full relative overflow-hidden group cursor-pointer"
                    title="${w.clickToEnlarge||"Click to view full photos & produce details"}"
                  >
                    <img src="${A.photos[0]}" alt="${A.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" />
                    
                    <!-- Hover Quick Preview Overlay -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <span class="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3.5 py-2 rounded-full shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <i class="fa-solid fa-eye text-emerald-600"></i> ${w.viewDetails}
                      </span>
                    </div>

                    <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                      ${A.isAdvanceHarvest?`
                        <span class="advance-pill shadow-md">
                          <i class="fa-solid fa-calendar-check text-emerald-700"></i> Advance Harvest
                        </span>
                      `:""}
                      ${A.requiresColdChain?`
                        <span class="bg-cyan-950/90 backdrop-blur-md text-cyan-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md border border-cyan-500/40">
                          <i class="fa-solid fa-snowflake mr-1"></i> Cold-Chain
                        </span>
                      `:""}
                      ${A.isAggregatedLot||A.cooperativeName?`
                        <span class="bg-amber-950/90 backdrop-blur-md text-amber-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md border border-amber-500/40">
                          <i class="fa-solid fa-users mr-1"></i> ${A.cooperativeName||"Cooperative Lot"}
                        </span>
                      `:""}
                      ${A.isOrganic?`
                        <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                          Organic Certified
                        </span>
                      `:""}
                    </div>

                    <span class="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md z-10 pointer-events-none">
                      ${A.pricePerKg} ETB<span class="text-[10px] font-normal text-slate-300">/kg</span>
                    </span>

                    ${A.distanceKm?`
                      <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${A.distanceKm} km ${w.farmDistance}
                      </span>
                    `:""}

                    ${A.photos.length>1?`
                      <span class="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-images text-emerald-400 mr-1"></i> ${A.photos.length} photos
                      </span>
                    `:""}
                  </div>

                  <div class="p-5 space-y-3">
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span class="text-amber-700 font-bold"><i class="fa-solid fa-award mr-1"></i> ${A.grade||"Grade 1"}</span>
                      <span class="text-slate-600 font-medium">${A.ripeness||"Ready Today"}</span>
                    </div>

                    <h3 
                      onclick="window.openProduceDetail('${A.id}')"
                      class="font-extrabold text-slate-900 text-lg leading-snug hover:text-emerald-700 cursor-pointer transition-colors ${o==="am"?"lang-am":""}"
                    >
                      ${o==="am"&&A.nameAm?A.nameAm:A.productName}
                    </h3>

                    <!-- Farmer Credibility & Trust Badges -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800"><i class="fa-solid fa-user-check text-emerald-600 mr-1"></i> ${A.farmerName}</span>
                        <span class="text-amber-600 font-extrabold"><i class="fa-solid fa-star mr-1"></i> ${A.farmerRating}</span>
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                        <span><i class="fa-solid fa-location-dot text-emerald-600"></i> ${A.region}</span>
                        <span>·</span>
                        <span>${A.repeatBuyerCount||18} Repeat Wholesalers</span>
                      </div>
                    </div>

                    ${A.voiceNoteTranscript?`
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2 cursor-pointer hover:bg-emerald-100/70 transition-colors" onclick="window.openProduceDetail('${A.id}')">
                        <i class="fa-solid fa-microphone-lines text-emerald-700 text-sm mt-0.5"></i>
                        <span class="italic leading-tight truncate">"${A.voiceNoteTranscript}"</span>
                      </div>
                    `:""}

                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Available: <strong class="font-bold text-slate-900">${A.qtyKg.toLocaleString()} kg</strong></span>
                      <span>Min Order: <strong class="font-bold text-slate-900">${A.minOrderKg} kg</strong></span>
                    </div>

                  </div>
                </div>

                <!-- Action Buttons: View Details & Add to Bulk Cart -->
                <div class="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button onclick="window.openProduceDetail('${A.id}')" class="btn-secondary py-2.5 text-xs font-bold shadow-xs cursor-pointer hover:bg-slate-100">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> Details
                  </button>
                  <button onclick="${c.hasEffectivePermission("PLACE_ORDERS","buyer")?`window.addToCart('${A.id}')`:"window.alert('Permission Restricted: PLACE_ORDERS has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary py-2.5 text-xs font-extrabold shadow-sm cursor-pointer ${c.hasEffectivePermission("PLACE_ORDERS","buyer")?"":"opacity-60 border-dashed bg-slate-700"}">
                    <i class="fa-solid ${c.hasEffectivePermission("PLACE_ORDERS","buyer")?"fa-cart-plus":"fa-lock"} mr-1"></i> ${w.addToCart}
                  </button>
                </div>

              </div>
            `).join("")}
          </div>
        `}

      </section>
      `}

      <!-- Bulk Cart Drawer Modal -->
      ${n?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCart()">
          <div class="modal-content max-w-xl p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${w.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer checkout with Telebirr Escrow</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${i.length===0?`
              <div class="p-8 text-center text-slate-500 text-xs">
                <p>${w.cartEmpty}</p>
              </div>
            `:`
              <div class="space-y-4 max-h-80 overflow-y-auto pr-1">
                ${Object.entries(G).map(([A,Y])=>`
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                      <span><i class="fa-solid fa-seedling text-emerald-600 mr-1"></i> Farm Source: ${Y.farmerName} (${Y.farmerRegion})</span>
                      <span class="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Direct Gate Payout</span>
                    </div>

                    ${Y.items.map(q=>`
                      <div class="flex items-center justify-between gap-3 text-xs">
                        <div>
                          <h4 class="font-bold text-slate-900">${q.listing.productName}</h4>
                          <span class="text-slate-500">${q.listing.pricePerKg} ETB / kg</span>
                        </div>

                        <div class="flex items-center gap-3">
                          <div class="flex items-center gap-1">
                            <button onclick="window.updateCartQty('${q.listing.id}', ${q.qtyKg-10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">-</button>
                            <span class="w-12 text-center font-bold text-slate-800">${q.qtyKg} kg</span>
                            <button onclick="window.updateCartQty('${q.listing.id}', ${q.qtyKg+10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">+</button>
                          </div>
                          <span class="font-extrabold text-slate-900 w-16 text-right">${(q.qtyKg*q.listing.pricePerKg).toLocaleString()} ETB</span>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `).join("")}
              </div>

              <!-- Price Breakdown (90% Farmer / 5% Driver / 5% Platform) -->
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
                <div class="flex justify-between text-slate-600">
                  <span>${w.farmerShare}:</span>
                  <strong class="text-emerald-900">${V.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${w.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${y.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${w.platformFee}:</span>
                  <strong class="text-slate-800">${_.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${w.totalAmount}:</span>
                  <span class="text-emerald-800">${L.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${L})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
                <i class="fa-solid fa-arrow-right mr-1.5"></i> Choose shipping & payment
              </button>
            `}

          </div>
        </div>
      `:""}

      <!-- Telebirr Escrow Payment Modal -->
      ${d!=null&&d.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeTelebirrModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                <i class="fa-solid fa-building-columns"></i>
              </div>
              <h3 class="text-xl font-extrabold text-slate-900">Checkout</h3>
              <p class="text-xs text-slate-500">Choose where to deliver and how to pay before placing your order.</p>
            </div>

            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <span class="text-xs font-bold text-blue-900">${w.totalAmount}</span>
              <div class="text-3xl font-black text-blue-950">${d.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <span class="text-[11px] text-blue-800 font-semibold block">${w.escrowGuarantee}</span>
            </div>

            <form onsubmit="window.handleTelebirrSubmit(event)" class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between"><label class="block text-xs font-bold text-slate-700">1. Shipping address</label><button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="text-[10px] font-bold text-emerald-700">Add address</button></div>
                ${c.getAccountData().addresses.length?`<select id="checkoutAddress" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"><option value="">Select a saved address</option>${c.getAccountData().addresses.map(A=>`<option value="${A.id}">${A.name} · ${A.street}, ${A.city}${A.isDefaultShipping?" · Default":""}</option>`).join("")}</select>`:`<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">Add a saved address before checkout. <button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="font-black underline">Manage addresses</button></div>`}
              </div>

              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-700">2. Payment method</label>
                <div class="space-y-2">
                  <label class="flex items-center gap-3 p-3 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/50 cursor-pointer transition-all">
                    <input type="radio" name="checkoutPayment" value="chapa" checked required />
                    <div class="flex items-center justify-between flex-1">
                      <div>
                        <span class="text-xs font-black text-emerald-950 flex items-center gap-2">
                          <i class="fa-solid fa-credit-card text-emerald-700"></i> Chapa Gateway (Telebirr / CBE / Cards)
                        </span>
                        <span class="text-[10px] text-emerald-800 font-medium block mt-0.5">Instant Escrow Lock & Buyer Protection</span>
                      </div>
                      <span class="text-[9px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">REAL CHAPA</span>
                    </div>
                  </label>
                  
                  <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-300 cursor-pointer transition-all">
                    <input type="radio" name="checkoutPayment" value="telebirr-wallet" required />
                    <span class="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <i class="fa-solid fa-mobile-screen-button text-blue-600"></i> Direct Telebirr · ${((J=c.getCurrentUser())==null?void 0:J.phone)||"Linked Account"}
                    </span>
                  </label>
                </div>
              </div>

              <div class="pt-2">
                <button type="submit" id="checkoutPayBtn" class="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <i class="fa-solid fa-lock"></i> Authorize Escrow with Chapa
                </button>
              </div>
            </form>

          </div>
        </div>
      `:""}

      <!-- Dispute Filing Modal -->
      ${p!=null&&p.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-5">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${w.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${p.order.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${p.order.id}')" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">${w.disputeReasonLabel}</label>
                <textarea id="disputeReasonInput" required rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Describe produce defects, transit spoilage, or weight discrepancy..."></textarea>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">${w.disputePhotoLabel}</label>
                <input type="text" id="disputePhotoUrl" value="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700">${w.refundPercentLabel}</label>
                  <span id="refundPercentVal" class="font-bold text-red-700">50% Partial Refund</span>
                </div>
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${p.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
                <i class="fa-solid fa-lock text-red-700 mr-1"></i>
                Submitting this dispute immediately locks the Telebirr Escrow and assigns case to Marketplace Admin for binding arbitration.
              </div>

              <button type="submit" class="btn-secondary w-full py-3 text-xs text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                <i class="fa-solid fa-gavel"></i> ${w.submitDisputeBtn}
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Live Order SignalR Tracking & Legal Invoicing Modal -->
      ${r?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${w.orderTracking}</h3>
                  <p class="text-xs text-slate-500 font-medium">Order ID: #${r.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeOrderModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Order Snapshot -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h4 class="font-bold text-slate-900 ${o==="am"?"lang-am":""}">${r.productName}</h4>
                <p class="text-xs text-slate-500">${r.qtyKg} kg · Farmer: ${r.farmerName}</p>
              </div>
              <div class="text-right">
                <span class="text-base font-extrabold text-emerald-800">${r.totalEtb.toLocaleString()} ETB</span>
                <span class="escrow-pill block text-[10px] mt-0.5">
                  ${r.escrowHeld?"Escrow Held (Locked)":r.status==="delivered"?"Funds Released":"Awaiting Chapa Payment"}
                </span>
              </div>
            </div>

            <!-- Legal Documents Quick Action Bar -->
            <div class="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200">
              <button onclick="window.openInvoiceModal('${r.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-emerald-800 hover:bg-emerald-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${w.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${r.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${w.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${r.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${w.viewWaybillBtn}
              </button>

              ${r.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-money-bill-transfer text-emerald-700 mr-1"></i> Refund approved and returned through the original payment method.
                </div>
              `:r.status==="disputed"?`
                <button onclick="window.openArbitrationModal('${r.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
                  <i class="fa-solid fa-scale-balanced mr-1 text-red-600"></i> ${w.viewArbitrationBtn}
                </button>
              `:""}
            </div>

            <!-- Timeline -->
            <div class="space-y-4 py-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${r.escrowHeld?"bg-emerald-600 text-white":"bg-amber-500 text-white"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid ${r.escrowHeld?"fa-check":"fa-clock"}"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">${r.escrowHeld?"Escrow Locked in PostgreSQL":"Awaiting Payment Verification"}</h5>
                  <p class="text-xs text-slate-500">Ref: ${r.paymentRef||"Pending"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["confirmed","picked_up","delivered"].includes(r.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-tractor"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Farmer Confirmation</h5>
                  <p class="text-xs text-slate-500">${["confirmed","picked_up","delivered"].includes(r.status)?"Produce harvested and packed at farm":"Awaiting farmer acceptance via SMS/App"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["picked_up","delivered"].includes(r.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-truck"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Driver Pickup & Transit</h5>
                  <p class="text-xs text-slate-500">${["picked_up","delivered"].includes(r.status)?`Isuzu Truck with Dawit Kebede in transit to ${r.deliveryAddress||"Depot"}`:"Driver assignment in progress"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${r.status==="delivered"?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">${r.disputeStatus==="ResolvedRefundBuyer"?"Refund Completed & Order Closed":"Delivery Confirmation & Escrow Release"}</h5>
                  <p class="text-xs text-slate-500">${r.disputeStatus==="ResolvedRefundBuyer"?"Refund returned through the original payment method.":r.status==="delivered"?"90% released to farmer, 5% to driver":"Confirm on receipt to release funds"}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 border-t border-slate-200 flex items-center gap-3">
              ${r.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-300 text-emerald-950 font-bold text-xs space-y-1 text-center shadow-xs">
                  <div class="flex items-center justify-center gap-2 text-emerald-800 text-sm font-extrabold">
                    <i class="fa-solid fa-circle-check text-emerald-600"></i> Full Refund Completed (100%)
                  </div>
                  <p class="text-slate-600 font-medium">
                    ${r.totalEtb.toLocaleString()} ETB refunded directly to your Telebirr wallet. Order closed under Legal Arbitration.
                  </p>
                </div>
              `:r.disputeStatus==="ResolvedPartialSplit"?`
                <div class="w-full p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-xs space-y-1 text-center shadow-xs">
                  <div class="flex items-center justify-center gap-2 text-amber-800 text-sm font-extrabold">
                    <i class="fa-solid fa-scale-balanced text-amber-600"></i> Partial Split Refund Completed
                  </div>
                  <p class="text-slate-600 font-medium">
                    Partial refund credited to your Telebirr wallet according to official mediation decree.
                  </p>
                </div>
              `:r.status!=="delivered"&&r.status!=="disputed"?`
                <button onclick="window.confirmDelivery('${r.id}')" class="btn-primary flex-1 py-3 text-xs cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i> ${w.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${r.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${w.disputeBtn}
                </button>
              `:(ie=r.disputeStatus)!=null&&ie.startsWith("Resolved")?`
                <div class="w-full p-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs text-center">
                  <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Dispute resolved: ${r.disputeStatus.replace("Resolved","").replace("Buyer"," Buyer").replace("Farmer"," Farmer").replace("PartialSplit"," Partial Split")}.
                </div>
              `:r.status==="disputed"?`
                <div class="w-full p-3 rounded-xl bg-red-100 text-red-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-triangle-exclamation text-red-700 mr-1"></i> Dispute Active: Escrow Frozen Under Admin Arbitration
                </div>
              `:`
                <div class="w-full space-y-2">
                  <div class="p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                    <i class="fa-solid fa-check-double text-emerald-700"></i> Delivery Completed & Escrow Released to Farmer
                  </div>
                  ${r.isRated?`
                    <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="font-extrabold text-amber-600">
                          ${[1,2,3,4,5].map(A=>`<i class="fa-solid fa-star ${A<=(r.reviewRating||5)?"text-amber-500":"text-slate-300"}"></i>`).join("")}
                        </span>
                        <span class="font-medium text-slate-700 italic truncate max-w-[200px]">"${r.reviewComment||"Great produce!"}"</span>
                      </div>
                      <button onclick="window.openRateModal('${r.id}')" class="text-emerald-700 hover:text-emerald-900 font-bold text-[11px] underline cursor-pointer">
                        Edit Review
                      </button>
                    </div>
                  `:`
                    <button onclick="window.openRateModal('${r.id}')" class="w-full btn-primary py-2.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 cursor-pointer">
                      <i class="fa-solid fa-star text-amber-200"></i> ${w.rateFarmerBtn||"Rate Farmer & Leave Review"}
                    </button>
                  `}
                </div>
              `}
            </div>

          </div>
        </div>
      `:""}

    </div>
  `}function Xt(o,e){const t=ee[o],a=[{key:"pending",label:"Order Placed",icon:"fa-lock",active:["pending","confirmed","PickedUp","picked_up","delivered"]},{key:"confirmed",label:"Farmer Confirmed",icon:"fa-tractor",active:["confirmed","PickedUp","picked_up","delivered"]},{key:"picked_up",label:"In Transit",icon:"fa-truck",active:["PickedUp","picked_up","delivered"]},{key:"delivered",label:"Delivered",icon:"fa-hand-holding-dollar",active:["delivered"]}];function s(r){const d=r==null?void 0:r.toLowerCase();return d==="delivered"?"text-emerald-700 bg-emerald-100 border-emerald-300":d==="picked_up"||d==="pickedup"?"text-blue-700 bg-blue-100 border-blue-300":d==="confirmed"?"text-amber-700 bg-amber-100 border-amber-300":d==="disputed"?"text-red-700 bg-red-100 border-red-300":"text-slate-600 bg-slate-100 border-slate-300"}function i(r,d){return r.some(p=>p.toLowerCase()===(d==null?void 0:d.toLowerCase()))}function n(r){const d=r==null?void 0:r.toLowerCase();return["confirmed","picked_up","pickedup"].includes(d)}return`
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-receipt text-emerald-600 mr-2"></i> ${t.navOrders} &amp; ${t.navLegalDocuments}
          </h2>
          <p class="text-xs text-slate-500 font-medium">Live escrow tracking with Telebirr — funds held until you confirm delivery.</p>
        </div>
        <div class="flex items-center gap-2">
          <span id="signalr-status-badge" class="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border bg-slate-50 text-slate-500 border-slate-200">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span> Connecting…
          </span>
          <span class="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
            ${e.length} Verified Purchases
          </span>
        </div>
      </div>

      ${e.length===0?`
        <div class="glass-card p-12 text-center text-slate-500 text-xs">
          <i class="fa-solid fa-basket-shopping text-3xl mb-2 text-slate-300"></i>
          <p>No past purchases yet. Browse the wholesale marketplace to order farm-fresh produce.</p>
        </div>
      `:`
        <div class="space-y-4">
          ${e.map(r=>{var d,p;return`
            <div class="glass-card p-5 space-y-4 ${n(r.status)?"ring-1 ring-blue-300 shadow-blue-100":""}">

              <!-- Order Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  ${n(r.status)?`
                    <div class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800 text-[10px] font-extrabold">
                      <span class="pulse-dot" style="background:rgb(59,130,246)"></span> LIVE
                    </div>
                  `:""}
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-extrabold px-2 py-0.5 rounded-full border ${s(r.status)}">${r.status.toUpperCase()}</span>
                      <span class="font-bold text-slate-900 text-sm">${r.productName}</span>
                    </div>
                    <p class="text-xs text-slate-500 mt-0.5">
                      ${r.qtyKg} kg · Farmer: <strong class="text-slate-700">${r.farmerName}</strong> ·
                      <span class="text-emerald-800 font-bold">${r.totalEtb.toLocaleString()} ETB</span>
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 shrink-0">
                  ${r.status==="delivered"?`
                    ${r.isRated?`
                      <button onclick="window.openRateModal('${r.id}')" class="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors" title="Edit your review">
                        <i class="fa-solid fa-star text-amber-500"></i>
                        <span>${r.reviewRating||5}/5</span>
                      </button>
                    `:`
                      <button onclick="window.openRateModal('${r.id}')" class="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105">
                        <i class="fa-solid fa-star"></i>
                        <span>${t.rateFarmerBtn||"Rate Farmer"}</span>
                      </button>
                    `}
                  `:""}
                  <button onclick="window.openInvoiceModal('${r.id}')" class="btn-secondary text-xs py-1.5 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${t.viewInvoiceBtn}
                  </button>
                  <button onclick="window.viewOrder('${r.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                    <i class="fa-solid fa-satellite-dish mr-1"></i> Details
                  </button>
                </div>
              </div>

              <!-- Status Timeline -->
              <div class="relative flex items-start gap-0">
                ${a.map((l,b)=>{var $;const v=i(l.active,r.status),k=b===a.length-1;return`
                    <div class="flex-1 flex flex-col items-center">
                      <!-- Step circle -->
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all
                        ${v?"bg-emerald-600 text-white ring-2 ring-emerald-200":"bg-slate-100 text-slate-400 border border-slate-200"}">
                        <i class="fa-solid ${l.icon} text-[11px]"></i>
                      </div>
                      <!-- Connector line -->
                      ${k?"":`
                        <div class="absolute top-4 left-0 right-0 h-0.5 -z-10" style="left:calc(${b*100/(a.length-1)}% + 16px); width:calc(${100/(a.length-1)}% - 32px)">
                          <div class="h-full ${v&&i((($=a[b+1])==null?void 0:$.active)??[],r.status)?"bg-emerald-400":"bg-slate-200"} rounded-full"></div>
                        </div>
                      `}
                      <!-- Step label -->
                      <span class="text-[9px] font-semibold mt-1.5 text-center leading-tight ${v?"text-emerald-800":"text-slate-400"}">
                        ${l.label}
                      </span>
                    </div>
                  `}).join("")}
              </div>

              <!-- Driver ETA (for in-transit orders) -->
              ${((d=r.status)==null?void 0:d.toLowerCase())==="picked_up"||((p=r.status)==null?void 0:p.toLowerCase())==="pickedup"?`
                <div class="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                  <i class="fa-solid fa-location-dot text-blue-600 text-base"></i>
                  <div>
                    <span class="font-bold text-blue-900">Driver is en route</span>
                    <span class="text-blue-700 ml-1.5">· ETA updates via live GPS</span>
                  </div>
                  <span id="eta-${r.id}" class="ml-auto font-extrabold text-blue-800">—</span>
                </div>
              `:""}

              <!-- Doc numbers footer -->
              <div class="flex items-center gap-3 text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                <span>INV: ${r.invoiceNumber||"ET-INV-001"}</span>
                <span>·</span>
                <span>CONTR: ${r.contractNumber||"AGR-ET-001"}</span>
                ${r.paymentRef?`<span>·</span><span>REF: ${r.paymentRef}</span>`:""}
              </div>

            </div>
          `}).join("")}
        </div>
      `}
    </div>
  `}function Zt(o,e){const t=ee[o];return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-repeat text-emerald-600 mr-2"></i> ${t.standingOrdersTitle}
          </h2>
          <p class="text-xs text-slate-500 font-medium">Automatic scheduled produce deliveries directly from Ethiopian smallholder farms.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${e.map(a=>`
          <div class="glass-card p-5 space-y-4 border-l-4 ${a.active?"border-emerald-600":"border-slate-300"}">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${a.active?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-600"}">
                  ${a.frequency} Scheduled
                </span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">${o==="am"&&a.productNameAm?a.productNameAm:a.productName}</h3>
                <p class="text-xs text-slate-500">Source: <strong class="text-slate-800">${a.farmerName}</strong></p>
              </div>

              <div class="text-right">
                <span class="text-base font-black text-emerald-800">${(a.qtyKg*a.pricePerKg).toLocaleString()} ETB</span>
                <span class="text-[11px] text-slate-400 block">${a.qtyKg} kg @ ${a.pricePerKg} ETB/kg</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span><i class="fa-solid fa-calendar-check text-emerald-600 mr-1.5"></i> Next Run: <strong class="text-slate-900">${a.nextDeliveryDate}</strong></span>
              <button onclick="window.toggleStandingOrderStatus('${a.id}')" class="text-xs font-bold ${a.active?"text-amber-700 hover:text-amber-800":"text-emerald-700 hover:text-emerald-800"} cursor-pointer">
                ${a.active?"Pause Order":"Resume Order"}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function es(o,e,t,a,s,i="listings",n=c.getPriceBenchmarks(),r=c.getCurrentUser()){const d=ee[o];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(r==null?void 0:r.region)||"Oromia (Bishoftu)"}
            </span>
            ${c.getVerificationStatus()==="Approved"?`
              <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
                <i class="fa-solid fa-circle-check text-emerald-600"></i> ${d.verifiedFayda} ${r!=null&&r.kycDocumentNumber?`(${r.kycDocumentNumber})`:""}
              </span>
              ${r!=null&&r.tinNumber?`
                <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
                  <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${r.tinNumber}
                </span>
              `:""}
            `:c.getVerificationStatus()==="UnderReview"?`
              <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
                <i class="fa-solid fa-hourglass-half text-amber-600"></i> ${o==="am"?"ማረጋገጫ በመገምገም ላይ":"Verification Under Review"}
              </span>
            `:c.getVerificationStatus()==="Rejected"?`
              <span class="trust-badge text-red-800 bg-red-50 border-red-200">
                <i class="fa-solid fa-circle-xmark text-red-600"></i> ${o==="am"?"ማረጋገጫ አልጸደቀም":"Verification Rejected"}
              </span>
            `:`
              <span class="trust-badge text-slate-700 bg-slate-100 border-slate-200">
                <i class="fa-solid fa-shield-halved text-slate-500"></i> ${o==="am"?"ያልተረጋገጠ መለያ":"Unverified Account"}
              </span>
            `}
            <span class="trust-badge text-amber-900 bg-amber-50 border-amber-300 font-extrabold">
              <i class="fa-solid fa-star text-amber-500"></i> ${c.getFarmerRatingStats((r==null?void 0:r.id)||"").averageRating} (${c.getFarmerRatingStats((r==null?void 0:r.id)||"").reviewCount} ${d.allReviews||"Reviews"})
            </span>
            <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
              <i class="fa-solid fa-users text-purple-600"></i> ${(r==null?void 0:r.repeatBuyerCount)||0} ${d.repeatBuyers}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> ${(r==null?void 0:r.onTimeDeliveryRate)||100}% ${d.onTimeRate}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${o==="am"?"lang-am":""}">
            ${d.farmerPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.toggleFarmerTab('sms')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-comment-sms text-emerald-600"></i>
            <span class="${o==="am"?"lang-am":""}">${d.navSmsConsole}</span>
          </button>

          <button onclick="window.toggleFarmerTab('wallet')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-wallet text-amber-600"></i>
            <span class="${o==="am"?"lang-am":""}">${d.navWallet}</span>
          </button>

          <button onclick="${c.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"window.toggleCreateListingModal()":"window.alert('Permission Restricted: PUBLISH_PRODUCE has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer ${c.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"":"opacity-60 border-dashed bg-slate-700"}">
            <i class="fa-solid ${c.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"fa-plus-circle":"fa-lock"}"></i>
            <span class="${o==="am"?"lang-am":""}">${d.postNewListing}</span>
          </button>
        </div>
      </div>

      <!-- Verification Action Banner -->
      ${c.getVerificationStatus()!=="Approved"?`
        <div class="p-4 rounded-2xl ${c.getVerificationStatus()==="UnderReview"?"bg-amber-50 border border-amber-200":c.getVerificationStatus()==="Rejected"?"bg-red-50 border border-red-200":"bg-emerald-50 border border-emerald-200"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${c.getVerificationStatus()==="UnderReview"?"⏳":c.getVerificationStatus()==="Rejected"?"❌":"🛡️"}</span>
            <div>
              <h4 class="text-sm font-bold ${c.getVerificationStatus()==="UnderReview"?"text-amber-900":c.getVerificationStatus()==="Rejected"?"text-red-900":"text-emerald-900"}">
                ${c.getVerificationStatus()==="UnderReview"?o==="am"?"ሰነዶችዎ በአድሚን በመገምገም ላይ ናቸው":"Fayda ID & TIN Verification Under Review":c.getVerificationStatus()==="Rejected"?o==="am"?"ማረጋገጫዎ አልጸደቀም፤ እባክዎ እንደገና ያስገቡ":"Verification Rejected - Action Required":o==="am"?"መለያዎን በፋይዳ (Fayda) እና በTIN ያረጋግጡ":"Complete Fayda ID & Taxpayer TIN Verification"}
              </h4>
              <p class="text-xs ${c.getVerificationStatus()==="UnderReview"?"text-amber-700":c.getVerificationStatus()==="Rejected"?"text-red-700":"text-emerald-700"}">
                ${r!=null&&r.rejectionReason?`${d.rejectionReasonLabel}: ${r.rejectionReason}`:d.verificationBannerText}
              </p>
            </div>
          </div>
          <button onclick="window.openVerificationWizard()" class="btn-primary text-xs py-2 px-4 shrink-0 shadow-xs cursor-pointer ${c.getVerificationStatus()==="UnderReview"?"bg-amber-700 hover:bg-amber-800":c.getVerificationStatus()==="Rejected"?"bg-red-700 hover:bg-red-800":"bg-emerald-700 hover:bg-emerald-800"}">
            <i class="fa-solid fa-id-card mr-1"></i> ${c.getVerificationStatus()==="Rejected"?d.resubmitDocsBtn:d.startVerificationBtn}
          </button>
        </div>
      `:""}

      <!-- Farmer Portal Navigation Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onclick="window.toggleFarmerTab('listings')" class="cat-pill ${i==="listings"?"active":""}">
          <i class="fa-solid fa-box-open"></i>
          <span>${o==="am"?"ምርቶች እና ትዕዛዞች":"Produce & Orders"}</span>
        </button>
        <button onclick="window.toggleFarmerTab('wallet')" class="cat-pill ${i==="wallet"?"active":""}">
          <i class="fa-solid fa-wallet"></i>
          <span>${d.walletTitle}</span>
        </button>
        <button onclick="window.toggleFarmerTab('sms')" class="cat-pill ${i==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${d.smsConsoleTitle}</span>
        </button>
      </div>

      ${i==="wallet"?ts(o,a,t,r):i==="sms"?ss(o):`

      <!-- Price Benchmark Advisory Banner -->
      <section class="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-lg space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-sm text-white ${o==="am"?"lang-am":""}">${d.priceBenchmarkTitle}</h3>
              <p class="text-[11px] text-emerald-200 font-medium">${d.benchmarkDesc}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-white/10 text-emerald-300 px-2.5 py-1 rounded-full border border-white/10">
            <i class="fa-solid fa-clock mr-1"></i> Live Merkato & Sholla Feeds
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          ${n.map(p=>`
            <div class="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div class="text-[11px] font-bold text-slate-300 truncate">${o==="am"?p.cropNameAm:p.cropName}</div>
              <div class="text-base font-black text-white">${p.avgPriceEtb} <span class="text-[10px] font-bold text-emerald-300">ETB/kg</span></div>
              <div class="flex items-center justify-between text-[10px] text-slate-400">
                <span>Range: ${p.minPriceEtb}-${p.maxPriceEtb}</span>
                <span class="${p.trend==="Up"?"text-emerald-400":p.trend==="Down"?"text-amber-300":"text-slate-300"} font-bold">
                  <i class="fa-solid fa-arrow-trend-${p.trend==="Up"?"up":p.trend==="Down"?"down":"flat"}"></i>
                </span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Earnings Dashboard (90% Net Cut) -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${d.walletBalance}</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr Payout</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${((r==null?void 0:r.walletBalanceEtb)||48200).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> Ready for instant withdrawal
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${d.pendingEscrow}</span>
            <span class="text-xs text-amber-600 font-bold">${a.pendingOrdersCount} Active</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${a.pendingEscrowEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-lock"></i> Protected in Telebirr Escrow
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${d.lifetimePayout}</span>
            <span class="text-xs text-blue-600 font-bold">${a.completedOrdersCount} Delivered</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${a.releasedEtb.toLocaleString()} <span class="text-sm font-bold text-slate-500">ETB</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">
            <i class="fa-solid fa-hand-holding-dollar"></i> 90% direct produce value
          </p>
        </div>

      </section>

      <!-- Incoming Orders with Full Legal & Tax Receipts -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-clipboard-list text-emerald-600 mr-2"></i> ${d.incomingOrders}
          </h2>
          <span class="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
            ${t.length} Active Orders
          </span>
        </div>

        ${t.length===0?`
          <div class="glass-card p-8 text-center text-slate-500 text-xs">
            <i class="fa-solid fa-basket-shopping text-3xl mb-2 text-slate-300"></i>
            <p>No incoming buyer orders yet. Create new listings to reach wholesale buyers.</p>
          </div>
        `:`
          <div class="space-y-3">
            ${t.map(p=>`
              <div class="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors">
                
                <div class="space-y-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="badge-status status-${p.status}">${p.status.toUpperCase()}</span>
                    <span class="text-xs font-bold text-slate-900">${p.productName}</span>
                    <span class="text-xs text-slate-500">(${p.qtyKg} kg @ ${p.pricePerKg} ETB)</span>
                    <span class="text-[10px] font-mono text-slate-400">${p.contractNumber||"AGR-ET-001"}</span>
                  </div>

                  <p class="text-xs text-slate-600">
                    Buyer: <strong class="text-slate-800">${p.buyerName}</strong> · Telebirr Escrow: <strong class="text-emerald-700">${p.totalEtb.toLocaleString()} ETB</strong> (Your Net 90%: <strong class="text-emerald-800 font-bold">${p.farmerCut.toLocaleString()} ETB</strong>)
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.openContractModal('${p.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer" title="View Digital Sales Contract">
                    <i class="fa-solid fa-file-contract mr-1"></i> ${d.viewContractBtn}
                  </button>

                  <button onclick="window.openInvoiceModal('${p.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer" title="Download Tax Exemption Receipt">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${d.viewInvoiceBtn}
                  </button>

                  <button onclick="window.openWaybillModal('${p.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer" title="View Transport Waybill">
                    <i class="fa-solid fa-truck-fast mr-1"></i> ${d.viewWaybillBtn}
                  </button>

                  ${p.status==="pending"?`
                    <button onclick="window.confirmFarmerOrder('${p.id}')" 
                      class="btn-primary text-xs py-1.5 px-4 shadow-sm cursor-pointer">
                      <i class="fa-solid fa-check mr-1"></i>
                      <span class="${o==="am"?"lang-am":""}">${d.confirmOrderAction}</span>
                    </button>
                  `:""}
                </div>

              </div>
            `).join("")}
          </div>
        `}
      </section>

      <!-- My Active Produce Listings & Advance Harvests -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
          <i class="fa-solid fa-box-open text-emerald-600 mr-2"></i> ${d.myActiveListings}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${e.map(p=>`
            <div 
              onclick="window.openProduceDetail('${p.id}')"
              class="glass-card overflow-hidden cursor-pointer hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 group"
              title="Click to view produce post details & photos"
            >
              <div class="h-44 w-full relative overflow-hidden">
                <img src="${p.photos[0]}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> View Post Details
                  </span>
                </div>

                <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                  ${p.isAdvanceHarvest?`
                    <span class="advance-pill shadow-xs">
                      <i class="fa-solid fa-calendar-days text-emerald-700"></i> Advance Harvest
                    </span>
                  `:""}
                  ${p.requiresColdChain?`
                    <span class="bg-cyan-900/90 backdrop-blur-md text-cyan-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-cyan-500/30">
                      <i class="fa-solid fa-snowflake"></i> Cold-Chain
                    </span>
                  `:""}
                  ${p.isAggregatedLot||p.cooperativeName?`
                    <span class="bg-amber-900/90 backdrop-blur-md text-amber-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-amber-500/30">
                      <i class="fa-solid fa-users"></i> ${p.cooperativeName||"Cooperative Lot"}
                    </span>
                  `:""}
                  ${p.isOrganic?`
                    <span class="bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      Organic
                    </span>
                  `:""}
                </div>

                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs z-10 pointer-events-none">
                  ${p.status.toUpperCase()}
                </span>
              </div>
              <div class="p-4 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span class="text-amber-600 font-bold"><i class="fa-solid fa-certificate mr-1"></i> ${p.grade||"Grade 1"}</span>
                  <span>${p.ripeness||"Ready Today"}</span>
                </div>

                <h3 class="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors ${o==="am"?"lang-am":""}">
                  ${o==="am"&&p.nameAm?p.nameAm:p.productName}
                </h3>

                ${p.voiceNoteTranscript?`
                  <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                    <i class="fa-solid fa-microphone text-emerald-700 mt-0.5"></i>
                    <span class="italic truncate">"${p.voiceNoteTranscript}"</span>
                  </div>
                `:""}

                <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Price: <strong class="text-emerald-800 font-extrabold text-sm">${p.pricePerKg} ETB</strong>/kg</span>
                  <span>Stock: <strong class="font-bold text-slate-800">${p.qtyKg.toLocaleString()} kg</strong></span>
                </div>
                
                <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Min order: ${p.minOrderKg} kg</span>
                  <span><i class="fa-solid fa-calendar mr-1"></i> ${p.availableFrom}</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Customer Reviews & Feedback Section -->
      ${(()=>{const p=(r==null?void 0:r.id)||"11111111-1111-1111-1111-111111111111",l=c.getReviewsForFarmer(p),b=c.getFarmerRatingStats(p);return`
          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
                  <i class="fa-solid fa-star text-amber-500 mr-2"></i> ${d.verifiedBuyerReviews||"Customer Reviews & Feedback"}
                </h2>
                <p class="text-xs text-slate-500 font-medium">Real-time ratings and comments from verified wholesale buyers who received your produce.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  ★ ${b.averageRating} / 5.0
                </span>
                <span class="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  ${b.reviewCount} ${d.allReviews||"Verified Reviews"}
                </span>
              </div>
            </div>

            ${l.length===0?`
              <div class="glass-card p-8 text-center text-slate-500 text-xs">
                <i class="fa-regular fa-comment-dots text-3xl mb-2 text-slate-300"></i>
                <p>${d.noReviewsYet||"No customer reviews yet. Reviews will appear here once buyers confirm delivery."}</p>
              </div>
            `:`
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${l.map(v=>`
                  <div class="glass-card p-4 space-y-2.5">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                          ${v.reviewerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div class="font-bold text-slate-900 text-xs">${v.reviewerName}</div>
                          <span class="text-[10px] text-slate-400 font-medium">${v.createdAt}</span>
                        </div>
                      </div>
                      <div class="flex items-center text-amber-400 text-xs gap-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        ${[1,2,3,4,5].map(k=>`
                          <i class="fa-solid fa-star ${k<=v.rating?"text-amber-500":"text-slate-200"}"></i>
                        `).join("")}
                        <span class="font-bold text-slate-700 ml-1 text-[11px]">${v.rating}.0</span>
                      </div>
                    </div>

                    ${v.quickTags&&v.quickTags.length>0?`
                      <div class="flex flex-wrap gap-1">
                        ${v.quickTags.map(k=>`
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                            ${k}
                          </span>
                        `).join("")}
                      </div>
                    `:""}

                    ${v.comment?`
                      <p class="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                        "${v.comment}"
                      </p>
                    `:""}
                  </div>
                `).join("")}
              </div>
            `}
          </section>
        `})()}
      `}

      <!-- Post New Produce Listing Modal (Voice Note + Advance Harvest + Benchmarking) -->
      ${s?et(o):""}

    </div>
  `}function ts(o,e,t,a){const s=ee[o];return`
    <div class="space-y-6">
      
      <!-- Telebirr Balance Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-blue-900 via-blue-800 to-sky-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-sky-200">
            <i class="fa-solid fa-bolt text-amber-300"></i> Telebirr Direct Settlement Engine
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white">
            ${((a==null?void 0:a.walletBalanceEtb)||48200).toLocaleString()} <span class="text-lg font-bold text-sky-200">ETB</span>
          </h2>
          <p class="text-xs text-sky-100 max-w-md">
            Linked Telebirr Account: <strong class="text-white">${(a==null?void 0:a.phone)||"+251 911 223 344"}</strong> · 90% direct produce value deposited immediately after buyer delivery approval.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button onclick="${c.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"window.handleFarmerWithdrawal()":"window.alert('Permission Restricted: REQUEST_WALLET_WITHDRAWAL has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg w-full sm:w-auto cursor-pointer ${c.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"":"opacity-50 border-dashed"}">
            <i class="fa-solid ${c.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"fa-money-bill-transfer":"fa-lock"} mr-1 text-slate-950"></i> ${s.requestWithdrawal}
          </button>
        </div>
      </div>

      <!-- Tax Exemption & Withholding Summary Banner -->
      <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
            <i class="fa-solid fa-stamp"></i>
          </div>
          <div>
            <h4 class="font-extrabold text-sm text-emerald-950">Ethiopian Tax Exemption Compliance (Proclamation No. 979/2016)</h4>
            <p class="text-xs text-emerald-800">Primary agricultural produce sales are VAT-exempt. 2% withholding tax reported directly to MOR.</p>
          </div>
        </div>
        <div class="text-right shrink-0">
          <div class="text-xs font-bold text-emerald-800">Withholding Declared:</div>
          <div class="text-base font-black text-emerald-950">${(e.totalWithholdingTaxPaidEtb||964).toLocaleString()} ETB</div>
        </div>
      </div>

      <!-- Payout Log History -->
      <div class="glass-card p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-slate-900 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-receipt text-emerald-600 mr-1.5"></i> ${s.payoutHistory}
          </h3>
          <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            100% Verified Telebirr Payouts
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-200 text-slate-400 font-bold">
                <th class="py-2.5">Order & Produce</th>
                <th class="py-2.5">Quantity</th>
                <th class="py-2.5">Gross Order</th>
                <th class="py-2.5 text-emerald-800">Net Farmer Payout (90%)</th>
                <th class="py-2.5">Telebirr Ref</th>
                <th class="py-2.5">Documents</th>
                <th class="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              ${t.map(i=>`
                <tr>
                  <td class="py-3 font-bold text-slate-900">
                    <div>${i.productName}</div>
                    <span class="text-[10px] text-slate-400">Order #${i.id.slice(0,8).toUpperCase()}</span>
                  </td>
                  <td class="py-3 font-semibold">${i.qtyKg} kg</td>
                  <td class="py-3 font-semibold">${i.totalEtb.toLocaleString()} ETB</td>
                  <td class="py-3 font-black text-emerald-700 text-sm">${i.farmerCut.toLocaleString()} ETB</td>
                  <td class="py-3 font-mono text-[11px] text-slate-500">${i.paymentRef||"TB-TXN-"+i.id.slice(0,8)}</td>
                  <td class="py-3">
                    <div class="flex items-center gap-1.5">
                      <button onclick="window.openInvoiceModal('${i.id}')" class="px-2 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[10px] cursor-pointer" title="View Tax Receipt">
                        <i class="fa-solid fa-file-invoice"></i> Receipt
                      </button>
                      <button onclick="window.openContractModal('${i.id}')" class="px-2 py-1 rounded bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 font-bold text-[10px] cursor-pointer" title="View Contract">
                        <i class="fa-solid fa-file-contract"></i> Contract
                      </button>
                    </div>
                  </td>
                  <td class="py-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${i.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-amber-100 text-amber-800"}">
                      ${i.status==="delivered"?"Paid to Telebirr":"Held in Escrow"}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `}function ss(o){const e=ee[o];return`
    <div class="glass-card p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      
      <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-comment-sms"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${e.smsConsoleTitle}</h2>
          <p class="text-xs text-slate-500">${e.smsConsoleDesc}</p>
        </div>
      </div>

      <!-- Quick Command Reference -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-tag text-emerald-600 mr-1"></i> List Produce:</div>
          <code class="text-[11px] text-emerald-800 bg-white p-1 rounded border border-slate-200 block">LIST Tomato 1000 45 Bishoftu</code>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-check text-blue-600 mr-1"></i> Confirm Order:</div>
          <code class="text-[11px] text-blue-800 bg-white p-1 rounded border border-slate-200 block">CONFIRM 0001</code>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-chart-line text-purple-600 mr-1"></i> Check Market Prices:</div>
          <code class="text-[11px] text-purple-800 bg-white p-1 rounded border border-slate-200 block">PRICES</code>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-wallet text-amber-600 mr-1"></i> Check Balance:</div>
          <code class="text-[11px] text-amber-800 bg-white p-1 rounded border border-slate-200 block">WALLET</code>
        </div>
      </div>

      <!-- Interactive SMS Simulator -->
      <form onsubmit="window.handleSimulateSms(event)" class="space-y-4 pt-2">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Smallholder Mobile Phone Number</label>
          <input type="text" id="smsPhone" value="+251911223344" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">${e.smsSimulateInbound}</label>
          <div class="flex items-center gap-2">
            <input type="text" id="smsCommand" required placeholder="${e.smsCommandPlaceholder}" class="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            <button type="submit" class="btn-primary text-xs py-2.5 px-5 cursor-pointer">
              <i class="fa-solid fa-paper-plane"></i> Send SMS
            </button>
          </div>
        </div>
      </form>

      <!-- SMS Response Terminal -->
      <div id="smsResponseBox" class="hidden p-4 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs space-y-1 border border-slate-800">
        <div class="text-[10px] text-slate-400 font-sans font-bold flex items-center justify-between border-b border-slate-800 pb-1">
          <span><i class="fa-solid fa-tower-cell mr-1 text-emerald-400"></i> Inbound Twilio Webhook Output</span>
          <span class="text-emerald-400 font-bold">200 OK</span>
        </div>
        <div id="smsResponseText" class="pt-1 leading-relaxed"></div>
      </div>

    </div>
  `}function et(o,e){const t=ee[o];return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCreateListingModal()">
      <div class="modal-content p-6 sm:p-8 space-y-6 max-w-2xl">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${t.postNewListing}</h3>
              <p class="text-xs text-slate-500 font-medium">Publish produce with Voice Note & Market Price Benchmarking</p>
            </div>
          </div>
          <button onclick="window.toggleCreateListingModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Voice Note Recording Engine (Amharic / Afaan Oromoo) -->
        <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-microphone-lines text-emerald-700 text-lg"></i>
              <span class="font-extrabold text-xs text-emerald-950 ${o==="am"?"lang-am":""}">${t.voiceNoteTitle}</span>
            </div>
            <span class="text-[10px] font-bold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">
              Amharic / Oromifa Audio AI
            </span>
          </div>

          <p class="text-xs text-emerald-800 leading-relaxed font-medium">
            ${t.voiceNoteDesc}
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <button type="button" id="voiceRecordBtn" onclick="window.handleVoiceRecordToggle()" class="btn-primary text-xs py-2 px-4 shadow-sm cursor-pointer">
              <i class="fa-solid fa-microphone mr-1"></i> <span id="voiceRecordLabel">${t.recordVoiceBtn}</span>
            </button>
            <div id="voiceWaveAnimation" class="hidden flex items-center gap-1 h-6">
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <span class="text-xs font-bold text-emerald-800 ml-2 animate-pulse">Transcribing speech...</span>
            </div>
          </div>

          <div id="voiceTranscriptionResult" class="hidden p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-800 space-y-1">
            <div class="font-bold text-emerald-800 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check"></i> ${t.voiceRecordedSuccess}
            </div>
            <p id="voiceTranscriptText" class="italic text-slate-600 text-[11px]"></p>
          </div>
        </div>

        <form onsubmit="window.handleCreateListingSubmit(event)" class="space-y-4">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.productNameEn}</label>
              <input type="text" id="newProdName" required placeholder="e.g. Fresh Red Tomatoes" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.productNameAm}</label>
              <input type="text" id="newProdNameAm" placeholder="ለምሳሌ: ቀይ የሾላ ቲማቲም" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.categoryLabel}</label>
              <select id="newCategory" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                <option value="Vegetables">${t.catVegetables}</option>
                <option value="Grains">${t.catGrains}</option>
                <option value="Fruits">${t.catFruits}</option>
                <option value="Coffee">${t.catCoffee}</option>
                <option value="Spices">${t.catSpices}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.qtyKgLabel}</label>
              <input type="number" id="newQtyKg" required min="10" value="1000" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-bold text-slate-700">${t.priceKgLabel}</label>
                <button type="button" onclick="window.checkFairPriceForNewListing()" class="text-[10px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer">
                  <i class="fa-solid fa-wand-magic-sparkles text-amber-600"></i> AI Fair Rate
                </button>
              </div>
              <input type="number" id="newPricePerKg" required min="1" value="45" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.minOrderLabel}</label>
              <input type="number" id="newMinOrderKg" required min="5" value="50" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.gradeLabel}</label>
              <select id="newGrade" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                <option value="Grade 1">Grade 1 (Standard / Premium)</option>
                <option value="Export Grade">Export Grade (Grade A+ International)</option>
                <option value="Grade 2">Grade 2 (Commercial Table)</option>
                <option value="Grade 3">Grade 3 (Processing / Bulk)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.ripenessLabel}</label>
              <select id="newRipeness" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                <option value="Ready Today">Ready Today</option>
                <option value="Semi-Ripe">Semi-Ripe (2-3 Days)</option>
                <option value="Green / Storable">Green / Storable (1-2 Weeks)</option>
              </select>
            </div>
          </div>

          <!-- Cold-Chain & Cooperative Aggregation Lot Features -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-1">
              <label class="flex items-center gap-2 text-xs font-bold text-cyan-950 cursor-pointer">
                <input type="checkbox" id="newRequiresColdChain" class="rounded text-cyan-600 focus:ring-cyan-500" />
                <span>❄️ Requires Cold-Chain Logistics</span>
              </label>
              <p class="text-[10px] text-cyan-800 font-medium pl-5">Auto-matches with refrigerated Isuzu freight trucks (0°C to 8°C).</p>
            </div>

            <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-xs font-bold text-amber-950 cursor-pointer">
                  <input type="checkbox" id="newIsAggregatedLot" onchange="document.getElementById('coopDetailsField').classList.toggle('hidden', !this.checked)" class="rounded text-amber-600 focus:ring-amber-500" />
                  <span>🤝 Cooperative Hub Aggregated Lot</span>
                </label>
              </div>
              <div id="coopDetailsField" class="hidden">
                <input type="text" id="newCooperativeName" placeholder="e.g. Bishoftu Farmers Union" class="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white" />
              </div>
            </div>
          </div>

          <!-- Advance Harvest Calendar Toggle -->
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input type="checkbox" id="newIsAdvanceHarvest" onchange="document.getElementById('advanceHarvestDateField').classList.toggle('hidden', !this.checked)" class="rounded text-emerald-600 focus:ring-emerald-500" />
                <span>${t.advanceHarvestToggle}</span>
              </label>
              <span class="text-[10px] text-slate-500 font-semibold">Pre-commit Wholesale Buyers</span>
            </div>

            <div id="advanceHarvestDateField" class="hidden pt-1">
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.expectedHarvestLabel}</label>
              <input type="date" id="newExpectedHarvestDate" class="px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button type="button" onclick="window.toggleCreateListingModal()" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="btn-primary text-xs py-2.5 px-6 shadow-md cursor-pointer">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${t.publishListingBtn}
            </button>
          </div>

        </form>

      </div>
    </div>
  `}function as(o,e,t,a=c.getOptimizedRoute(),s=c.getCurrentUser(),i=c.getIsOfflineMode(),n=c.getOfflineQueue().length){const r=ee[o],d=(s==null?void 0:s.vehicleCapacityKg)||5e3,p=Math.min(100,Math.round(a.totalWeightKg/d*100));return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner with Vehicle & Offline Mode Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <i class="fa-solid fa-truck text-amber-700"></i> ${(s==null?void 0:s.vehicleType)||"Isuzu 5-Ton"} · ${(s==null?void 0:s.refrigerationType)||"Refrigerated Cold-Chain"}
            </span>
            <span class="trust-badge text-cyan-800 bg-cyan-50 border-cyan-200">
              <i class="fa-solid fa-snowflake text-cyan-600"></i> Cold-Chain Certified (0°C to 4°C active)
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-certificate"></i> Logbook Verified (${(s==null?void 0:s.kycDocumentNumber)||"ET-LOG-5T-98214"})
            </span>
            <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
              <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${(s==null?void 0:s.tinNumber)||"TIN-DRV-981244"}
            </span>
            <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
              <i class="fa-solid fa-star text-amber-500"></i> 4.9 Driver Rating (98% On-Time)
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${o==="am"?"lang-am":""}">
            ${r.driverPortalTitle}
          </h1>
        </div>

        <!-- Offline-First Mode Controls -->
        <div class="flex items-center gap-3">
          <button onclick="window.toggleDriverOfflineMode()" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${i?"bg-amber-600 text-white border-amber-600 shadow-md":"bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}">
            <i class="fa-solid fa-wifi-slash mr-1"></i> ${i?"Offline Mode Active":"Online Mode"}
          </button>

          ${n>0?`
            <button onclick="window.syncDriverOfflineQueue()" class="btn-primary text-xs py-2 px-3.5 shadow-sm cursor-pointer animate-bounce">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${r.offlineSyncBtn} (${n})
            </button>
          `:""}
        </div>
      </div>

      <!-- Vehicle Payload & Cold-Chain Capacity Gauge -->
      <section class="glass-card p-5 border-l-4 border-amber-600 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-weight-hanging"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 ${o==="am"?"lang-am":""}">${r.vehicleProfileTitle}</h3>
              <p class="text-[11px] text-slate-500 font-medium">${(s==null?void 0:s.vehicleType)||"Isuzu 5-Ton"} · ${(s==null?void 0:s.refrigerationType)||"Ventilated Cargo"}</p>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-700">
            <span>Payload: <strong class="text-amber-800">${a.totalWeightKg.toLocaleString()} kg</strong> / ${d.toLocaleString()} kg (${p}%)</span>
          </div>
        </div>

        <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 rounded-full transition-all duration-500" style="width: ${p}%;"></div>
        </div>
      </section>

      <!-- Driver Earnings Overview with Rural Route Subsidy -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${r.tripCommission}</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr Wallet</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${t.totalEarnedEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> 5% guaranteed trip cut
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${r.ruralBonus}</span>
            <span class="text-xs text-emerald-700 font-bold">+2.5 ETB/km</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${(t.ruralBonusEtb||1250).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-gas-pump"></i> Rural distance freight incentive
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${r.totalDeliveredTrips}</span>
            <span class="text-xs text-blue-600 font-bold">Verified Partner</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${t.deliveredTripsCount} <span class="text-sm font-bold text-slate-500">Trips</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">
            <i class="fa-solid fa-star text-amber-500"></i> 100% Escrow release rate
          </p>
        </div>

      </section>

      <!-- Multi-Stop Route Optimizer Timeline -->
      <section class="glass-card p-6 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold mb-1">
              <i class="fa-solid fa-route"></i> PostGIS Multi-Stop Routing
            </div>
            <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${a.title}</h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span><i class="fa-solid fa-road text-amber-600 mr-1"></i> ${a.totalDistanceKm} km</span>
            <span><i class="fa-solid fa-clock text-blue-600 mr-1"></i> ~${a.estimatedHours} hrs</span>
            <span><i class="fa-solid fa-coins text-emerald-600 mr-1"></i> ${(a.driverCommissionEtb+a.ruralSubsidyEtb).toLocaleString()} ETB Total</span>
          </div>
        </div>

        <div class="space-y-4">
          ${a.stops.map((l,b)=>`
            <div class="flex items-start gap-4 p-4 rounded-2xl ${l.completed?"bg-emerald-50/60 border border-emerald-100":"bg-slate-50 border border-slate-200"}">
              <div class="w-8 h-8 rounded-full ${l.completed?"bg-emerald-600 text-white":l.type==="dropoff"?"bg-blue-600 text-white":"bg-amber-600 text-white"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5">
                ${l.completed?'<i class="fa-solid fa-check"></i>':l.stopNumber}
              </div>

              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold ${l.type==="dropoff"?"text-blue-800":"text-amber-800"} uppercase">
                    ${l.type==="pickup"?"Stop "+l.stopNumber+": Farm Pickup":"Final Stop: Buyer Wholesale Depot"}
                  </span>
                  <span class="text-xs font-bold text-slate-500">${l.weightKg} kg</span>
                </div>

                <h4 class="text-sm font-extrabold text-slate-900 truncate">${l.locationName}</h4>
                <p class="text-xs text-slate-600"><i class="fa-solid fa-user text-slate-400 mr-1"></i> Contact: <strong class="text-slate-800">${l.contactName}</strong> (${l.phone})</p>
                <p class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-boxes-stacked text-slate-400 mr-1"></i> Cargo: ${l.cargoDetails}</p>
              </div>

              <div class="shrink-0">
                ${l.completed?`
                  <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <i class="fa-solid fa-check"></i> Picked Up
                  </span>
                `:`
                  <button onclick="window.handleDriverStopAction(${b})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
                    <i class="fa-solid fa-camera mr-1"></i> Verify & Confirm
                  </button>
                `}
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Active / Available Trips Queue with Official Federal Transport Waybills -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
          <i class="fa-solid fa-road text-amber-600 mr-2"></i> ${r.availableTrips}
        </h2>

        ${e.length===0?`
          <div class="glass-card p-8 text-center text-slate-500 text-sm">
            No active trips assigned. Check back once farmers confirm incoming orders.
          </div>
        `:`
          <div class="space-y-4">
            ${e.map(l=>`
              <div class="glass-card p-5 space-y-4">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Waybill #${l.waybillNumber||"WB-FTA-001"}</span>
                    <h3 class="text-base font-extrabold text-slate-900 ${o==="am"?"lang-am":""}">${l.productName} (${l.qtyKg} kg)</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-slate-400 font-medium block">${r.tripCommission} + Rural Subsidy</span>
                    <span class="text-lg font-black text-amber-700">${(l.driverCut+(l.driverSubsidyEtb||150)).toLocaleString()} ETB</span>
                  </div>
                </div>

                <!-- Origin & Destination Route -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span class="font-bold text-emerald-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-dot text-emerald-600"></i> Farm Pickup Location
                    </span>
                    <p class="text-slate-800 font-semibold">${l.farmerRegion}</p>
                    <p class="text-slate-500 font-medium">Farmer: ${l.farmerName} (${l.farmerPhone})</p>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                    <span class="font-bold text-blue-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-location-pin text-blue-600"></i> Buyer Delivery Depot
                    </span>
                    <p class="text-slate-800 font-semibold">${l.deliveryAddress||"Addis Ababa"}</p>
                    <p class="text-slate-500 font-medium">Buyer: ${l.buyerName} (${l.buyerPhone})</p>
                  </div>
                </div>

                <!-- Driver Actions with Photo + GPS verification and Waybill Viewer -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>Status:</span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${l.status==="picked_up"?"bg-amber-100 text-amber-800":l.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-800"}">${l.status.toUpperCase()}</span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button onclick="window.openWaybillModal('${l.id}')" class="btn-secondary text-xs py-2 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-sky-600"></i> ${r.viewWaybillBtn}
                    </button>

                    <button onclick="window.openContractModal('${l.id}')" class="btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${r.viewContractBtn}
                    </button>

                    ${l.status==="confirmed"?`
                      <button onclick="${c.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?`window.driverPickupWithProof('${l.id}')`:"window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')"}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${c.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"":"opacity-60 border-dashed bg-slate-700"}">
                        <i class="fa-solid ${c.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"fa-camera":"fa-lock"} mr-1"></i> ${r.uploadProof} & Pickup
                      </button>
                    `:l.status==="picked_up"?`
                      <button onclick="${c.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?`window.driverCompleteDeliveryProof('${l.id}')`:"window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')"}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${c.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"":"opacity-60 border-dashed bg-slate-700"}">
                        <i class="fa-solid ${c.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"fa-location-crosshairs":"fa-lock"} mr-1"></i> Dropoff + GPS Proof
                      </button>
                    `:`
                      <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Trip Completed · ${(l.driverCut+(l.driverSubsidyEtb||150)).toLocaleString()} ETB Deposited
                      </span>
                    `}
                  </div>
                </div>

              </div>
            `).join("")}
          </div>
        `}
      </section>

    </div>
  `}function is(o,e="users",t="all",a="all",s="admin",i="payouts",n="all",r="all",d="all",p="",l=[]){const b=ee[o],v=c.getAllUsers(),k=c.getBanners(),$=c.getListings(),u=c.getPlatformConfig(),S=c.getSystemAuditLogs(),T=c.getDeliveryZones(),w=c.getFeatureFlags(),E=c.getPendingPayoutApprovals(),L=c.getGlobalBusinessRules(),V=c.getBlacklist(),y=t==="all"?v:v.filter(B=>B.role.toLowerCase()===t.toLowerCase()),_=a==="all"?S:S.filter(B=>B.category.toLowerCase()===a.toLowerCase()),G={all:v.length,farmer:v.filter(B=>B.role==="farmer").length,buyer:v.filter(B=>B.role==="buyer").length,driver:v.filter(B=>B.role==="driver").length,agent:v.filter(B=>B.role==="agent").length,admin:v.filter(B=>B.role==="admin").length,superadmin:v.filter(B=>B.role==="superadmin").length};return`
    <div class="space-y-8 pb-24 animate-fadeIn">
      
      <!-- Top Super Admin Banner -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 rounded-3xl border border-rose-900/40 text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl pointer-events-none">
          <i class="fa-solid fa-crown"></i>
        </div>

        <div class="space-y-1 relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold mb-1">
            <i class="fa-solid fa-crown text-rose-400"></i> ${o==="am"?"የዋና አድሚን ቁጥጥር ማዕከል · ዶ/ር ዳዊት ኃይሌ":"Super Admin Root Governance · Dr. Dawit Haile"}
          </div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white ${o==="am"?"lang-am":""}">
            ${b.superAdminTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
            ${b.superAdminSubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 relative z-10">
          ${u.emergencyEscrowFrozen?`
            <span class="px-3 py-1.5 rounded-xl bg-red-600/90 text-white font-black text-xs border border-red-400 animate-pulse flex items-center gap-1.5">
              <i class="fa-solid fa-lock"></i> ESCROW FROZEN
            </span>
          `:`
            <span class="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-emerald-400"></i> Platform Active (90/5/5 Split)
            </span>
          `}
          <button onclick="window.triggerDbBackup()" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer shadow-xs">
            <i class="fa-solid fa-database text-rose-400"></i> ${o==="am"?"ዳታቤዝ ምትክ":"Backup DB"}
          </button>
          <button onclick="window.exportPlatformData('json')" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md">
            <i class="fa-solid fa-file-export"></i> ${o==="am"?"መረጃ አውርድ":"Export JSON"}
          </button>
        </div>
      </div>

      <!-- Super Admin Navigation Pills (12 Governance Panels) -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar text-xs font-bold">
        <button onclick="window.setSuperAdminTab('users')" class="cat-pill ${e==="users"?"active":""}">
          <i class="fa-solid fa-users-gear text-rose-500"></i>
          <span>${b.tabUserMaster} (${v.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('banners')" class="cat-pill ${e==="banners"?"active":""}">
          <i class="fa-solid fa-panorama text-emerald-500"></i>
          <span>${b.tabBanners} (${k.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('moderation')" class="cat-pill ${e==="moderation"?"active":""}">
          <i class="fa-solid fa-gavel text-purple-500"></i>
          <span>${b.tabModeration} (${$.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('permissions')" class="cat-pill ${e==="permissions"?"active":""}">
          <i class="fa-solid fa-key text-purple-500"></i>
          <span>${b.tabPermissions}</span>
        </button>

        <button onclick="window.setSuperAdminTab('config')" class="cat-pill ${e==="config"?"active":""}">
          <i class="fa-solid fa-sliders text-emerald-500"></i>
          <span>${b.tabPlatformConfig}</span>
        </button>

        <button onclick="window.setSuperAdminTab('financials')" class="cat-pill ${e==="financials"?"active":""}">
          <i class="fa-solid fa-money-bill-transfer text-amber-500"></i>
          <span>${b.tabFinancialOversight} (${E.filter(B=>B.status==="Pending").length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('audit')" class="cat-pill ${e==="audit"?"active":""}">
          <i class="fa-solid fa-clipboard-list text-blue-500"></i>
          <span>${b.tabAuditLogs} (${S.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('zones')" class="cat-pill ${e==="zones"?"active":""}">
          <i class="fa-solid fa-map-location-dot text-teal-500"></i>
          <span>${b.tabZones} (${T.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('feature_flags')" class="cat-pill ${e==="feature_flags"?"active":""}">
          <i class="fa-solid fa-toggle-on text-indigo-500"></i>
          <span>${b.tabFeatureFlags}</span>
        </button>

        <button onclick="window.setSuperAdminTab('emergency')" class="cat-pill ${e==="emergency"?"active":""}">
          <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
          <span>${b.tabEmergency}</span>
        </button>

        <button onclick="window.setSuperAdminTab('rules')" class="cat-pill ${e==="rules"?"active":""}">
          <i class="fa-solid fa-gavel text-amber-600"></i>
          <span>${b.tabBusinessRules}</span>
        </button>

        <button onclick="window.setSuperAdminTab('db_ops')" class="cat-pill ${e==="db_ops"?"active":""}">
          <i class="fa-solid fa-server text-slate-600"></i>
          <span>${b.tabDbOps}</span>
        </button>
      </div>

      <!-- Tab Content Panels -->
      ${rs(o,e,y,t,G,u,_,a,T,w,E,L,V,s,i,n,r,d,p,l)}

    </div>
  `}function rs(o,e,t,a,s,i,n,r,d,p,l,b,v,k="admin",$="payouts",u="all",S="all",T="all",w="",E=[]){switch(e){case"users":return Je(o,t,a,s);case"banners":return tt(o);case"moderation":return st(o);case"permissions":return os(o,k);case"config":return ns(o,i);case"financials":return ls(o,l,i,$,u,S,T,w,E);case"audit":return ds(o,n,r);case"zones":return cs(o,d);case"feature_flags":return ps(o,p);case"emergency":return us(o,i,v);case"rules":return ms(o,b);case"db_ops":return fs(o);default:return Je(o,t,a,s)}}function Je(o,e,t,a){const s=ee[o];return`
    <div class="space-y-6">
      
      <!-- User Summary & Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${o==="am"?"የተጠቃሚዎች ሙሉ አስተዳደር እና አዲስ መመዝገቢያ":"User Master Directory & Role Management"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${o==="am"?"ሁሉንም አርሶ አደሮች፣ ገዢዎች፣ ሹፌሮች እና አድሚኖች በቀጥታ ይመዝግቡ፣ ያርትዑ ወይም በእነርሱ ስም ይግቡ።":"Direct manual onboarding, full CRUD mutations, and 1-click live user impersonation."}
          </p>
        </div>

        <button onclick="window.openCreateUserModal()" class="btn-primary py-2.5 px-4 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-user-plus"></i>
          <span>${s.createUserBtn}</span>
        </button>
      </div>

      <!-- Role Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button onclick="window.setUserRoleFilter('all')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="all"?"bg-slate-900 text-white border-slate-900":"bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"}">
          All Users (${a.all})
        </button>
        <button onclick="window.setUserRoleFilter('farmer')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="farmer"?"bg-emerald-700 text-white border-emerald-700":"bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200"}">
          🌾 Farmers (${a.farmer})
        </button>
        <button onclick="window.setUserRoleFilter('buyer')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="buyer"?"bg-blue-700 text-white border-blue-700":"bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200"}">
          🛒 Wholesale Buyers (${a.buyer})
        </button>
        <button onclick="window.setUserRoleFilter('driver')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="driver"?"bg-amber-700 text-white border-amber-700":"bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200"}">
          🚚 Freight Drivers (${a.driver})
        </button>
        <button onclick="window.setUserRoleFilter('agent')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="agent"?"bg-teal-700 text-white border-teal-700":"bg-teal-50 text-teal-800 hover:bg-teal-100 border-teal-200"}">
          👥 Extension Agents (${a.agent})
        </button>
        <button onclick="window.setUserRoleFilter('admin')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="admin"?"bg-purple-700 text-white border-purple-700":"bg-purple-50 text-purple-800 hover:bg-purple-100 border-purple-200"}">
          🛡️ Admins (${a.admin})
        </button>
        <button onclick="window.setUserRoleFilter('superadmin')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="superadmin"?"bg-rose-700 text-white border-rose-700":"bg-rose-50 text-rose-800 hover:bg-rose-100 border-rose-200"}">
          👑 Super Admins (${a.superadmin})
        </button>
      </div>

      <!-- Users Table -->
      <div class="glass-card overflow-hidden border border-slate-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th class="p-3.5">User / Contact</th>
                <th class="p-3.5">Assigned Role</th>
                <th class="p-3.5">Region / Location</th>
                <th class="p-3.5">Verification & KYC</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5 text-right">Actions & Impersonation</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${e.map(i=>`
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full ${bs(i.role)} flex items-center justify-center font-bold text-xs shrink-0">
                        ${i.name.charAt(0)}
                      </div>
                      <div>
                        <span class="font-bold text-slate-900 block leading-tight">${i.name}</span>
                        <span class="text-[11px] text-slate-500 font-mono">${i.phone}</span>
                        ${i.primaryCrop?`<span class="text-[10px] text-emerald-700 font-semibold block">🌾 ${i.primaryCrop}</span>`:""}
                        ${i.vehicleType?`<span class="text-[10px] text-amber-700 font-semibold block">🚚 ${i.vehicleType}</span>`:""}
                      </div>
                    </div>
                  </td>

                  <td class="p-3.5">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${gs(i.role)}">
                      ${hs(i.role)} ${i.role.toUpperCase()}
                    </span>
                  </td>

                  <td class="p-3.5 text-slate-600">
                    <span>${i.region}</span>
                    ${i.kebele?`<span class="text-[10px] text-slate-400 block">${i.kebele}</span>`:""}
                  </td>

                  <td class="p-3.5">
                    ${i.verificationStatus==="Approved"||i.verified?`
                      <span class="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <i class="fa-solid fa-circle-check"></i> Fayda Verified
                      </span>
                    `:i.verificationStatus==="UnderReview"?`
                      <span class="inline-flex items-center gap-1 text-amber-700 font-bold text-[11px]">
                        <i class="fa-solid fa-clock"></i> Under Review
                      </span>
                    `:`
                      <span class="inline-flex items-center gap-1 text-slate-400 font-medium text-[11px]">
                        <i class="fa-solid fa-circle-xmark"></i> Unverified
                      </span>
                    `}
                    ${i.faydaId?`<span class="text-[10px] font-mono text-slate-500 block">${i.faydaId}</span>`:""}
                    ${i.tinNumber?`<span class="text-[10px] font-mono text-slate-500 block">TIN: ${i.tinNumber}</span>`:""}
                  </td>

                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-black ${i.status==="suspended"?"bg-red-100 text-red-800":"bg-emerald-100 text-emerald-800"}">
                      ${(i.status||"active").toUpperCase()}
                    </span>
                  </td>

                  <td class="p-3.5 text-right space-x-1 whitespace-nowrap">
                    ${i.role!=="superadmin"?`
                      <button onclick="window.startSuperAdminImpersonation('${i.id}')" title="Login As User" class="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer border border-rose-200">
                        <i class="fa-solid fa-user-secret mr-1"></i> Login As
                      </button>
                    `:""}

                    <button onclick="window.openEditUserModal('${i.id}')" title="Edit User" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    ${i.role!=="superadmin"?`
                      <button onclick="window.toggleUserSuspension('${i.id}')" title="${i.status==="suspended"?"Reinstate":"Suspend"}" class="p-1.5 rounded-lg ${i.status==="suspended"?"bg-emerald-50 text-emerald-700 hover:bg-emerald-100":"bg-amber-50 text-amber-700 hover:bg-amber-100"} font-bold text-xs transition-colors cursor-pointer">
                        <i class="fa-solid ${i.status==="suspended"?"fa-user-check":"fa-user-slash"}"></i>
                      </button>

                      <button onclick="window.deleteUserAccount('${i.id}')" title="Delete User" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors cursor-pointer">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    `:""}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `}function os(o,e="admin"){var d,p;const t=c.getPermissionsList(),a=c.getAllRolePermissions(),s=c.getRolePermissions(e),i=[{key:"admin",label:"Marketplace Admin",icon:"fa-shield-halved text-purple-600",badgeCls:"bg-purple-100 text-purple-800",count:Object.values(a.admin||{}).filter(Boolean).length},{key:"agent",label:"Field Extension Agent",icon:"fa-users-gear text-teal-600",badgeCls:"bg-teal-100 text-teal-800",count:Object.values(a.agent||{}).filter(Boolean).length},{key:"farmer",label:"Smallholder Farmer",icon:"fa-seedling text-emerald-600",badgeCls:"bg-emerald-100 text-emerald-800",count:Object.values(a.farmer||{}).filter(Boolean).length},{key:"driver",label:"Logistics Transporter",icon:"fa-truck-fast text-amber-600",badgeCls:"bg-amber-100 text-amber-800",count:Object.values(a.driver||{}).filter(Boolean).length},{key:"buyer",label:"Commercial Buyer",icon:"fa-basket-shopping text-blue-600",badgeCls:"bg-blue-100 text-blue-800",count:Object.values(a.buyer||{}).filter(Boolean).length},{key:"superadmin",label:"Super Admin (Root)",icon:"fa-crown text-rose-600",badgeCls:"bg-rose-100 text-rose-900",count:t.length}],n=["Governance & Root","Operational Moderation","Field & Logistics","Marketplace & Trade"],r={"Governance & Root":"fa-crown text-rose-600","Operational Moderation":"fa-shield-halved text-purple-600","Field & Logistics":"fa-truck-ramp-box text-teal-600","Marketplace & Trade":"fa-cart-shopping text-emerald-600"};return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-user-lock text-purple-600 mr-2"></i> ${o==="am"?"የሚናዎች እና ፈቃዶች ማትሪክስ (RBAC Engine)":"Role-Based Access Control & Permission Matrix"}
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold font-mono">
              ${t.length} Granular Capabilities
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            ${o==="am"?"ለእያንዳንዱ የሚና ዓይነት (Role) ልዩ የሆኑ ፈቃዶችን ያቀናብሩ። ለውጦች ወዲያውኑ በሲስተሙ ተግባራዊ ይሆናሉ።":"Configure granular privileges for Admins, Agents, Farmers, Drivers, and Buyers. Changes are dynamically persisted and enforced across the platform."}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="window.resetAllRolePermissions()" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-300">
            <i class="fa-solid fa-rotate-left"></i> ${o==="am"?"ወደ ነባሪ መልስ":"Reset to Factory Defaults"}
          </button>
        </div>
      </div>

      <!-- Role Selector Tabs -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        ${i.map(l=>{const b=l.key===e;return`
            <button onclick="window.setRbacSelectedRole('${l.key}')" class="p-3 rounded-2xl border transition-all text-left flex flex-col justify-between gap-2 cursor-pointer ${b?"bg-purple-900 text-white border-purple-800 shadow-md ring-2 ring-purple-600/30":"glass-card text-slate-700 hover:border-purple-300"}">
              <div class="flex items-center justify-between">
                <i class="fa-solid ${l.icon} text-base ${b?"text-purple-300":""}"></i>
                <span class="text-[10px] font-black px-1.5 py-0.5 rounded ${b?"bg-purple-800 text-purple-200":l.badgeCls}">
                  ${l.count}/${t.length}
                </span>
              </div>
              <div>
                <p class="text-xs font-black ${b?"text-white":"text-slate-900"}">${l.label}</p>
                <span class="text-[10px] font-mono opacity-70">${l.key.toUpperCase()}</span>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- Selected Role RBAC Configuration Card -->
      <div class="glass-card rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid ${((d=i.find(l=>l.key===e))==null?void 0:d.icon)||"fa-user-gear"}"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-slate-900">
                ${(p=i.find(l=>l.key===e))==null?void 0:p.label} Permissions
              </h3>
              <p class="text-[11px] text-slate-500">
                ${e==="superadmin"?"Root role possesses irrevocable master permissions across the entire cluster.":`Toggle specific capabilities for users assigned the '${e.toUpperCase()}' role.`}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${e==="superadmin"?"bg-rose-100 text-rose-900 border border-rose-200":"bg-emerald-100 text-emerald-800 border border-emerald-200"}">
              <i class="fa-solid fa-shield-check mr-1"></i> ${Object.values(s).filter(Boolean).length} / ${t.length} Active
            </span>
          </div>
        </div>

        <!-- Permissions By Category -->
        <div class="space-y-6">
          ${n.map(l=>{const b=t.filter(v=>v.category===l);return b.length===0?"":`
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                  <i class="fa-solid ${r[l]||"fa-shield"}"></i>
                  <span>${l}</span>
                  <span class="text-[10px] text-slate-400 font-mono">(${b.length})</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  ${b.map(v=>{const k=e==="superadmin"?!0:!!s[v.key],$=e==="superadmin";return`
                      <div class="p-3.5 rounded-2xl border transition-all ${k?"bg-emerald-50/40 border-emerald-200 ring-1 ring-emerald-500/10":"bg-slate-50/60 border-slate-200 opacity-80"} flex flex-col justify-between gap-2.5">
                        <div class="flex items-start justify-between gap-2">
                          <div>
                            <p class="text-xs font-black text-slate-900">${o==="am"&&v.labelAm?v.labelAm:v.label}</p>
                            <span class="text-[10px] font-mono text-purple-700 font-semibold">${v.key}</span>
                          </div>

                          <label class="relative inline-flex items-center cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              ${k?"checked":""}
                              ${$?"disabled":""}
                              onchange="window.handleToggleRolePermission('${e}', '${v.key}', this.checked)"
                              class="sr-only peer"
                            />
                            <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 ${$?"opacity-60 cursor-not-allowed":""}"></div>
                          </label>
                        </div>

                        <p class="text-[11px] text-slate-500 leading-snug font-normal">
                          ${v.description}
                        </p>
                      </div>
                    `}).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- Comparative RBAC Security Matrix Table -->
      <div class="glass-card rounded-3xl overflow-hidden border border-slate-200 shadow-sm space-y-4 p-5">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-table-columns text-purple-600"></i> Full System Capability Matrix (Role vs Permission)
          </h3>
          <span class="text-xs text-slate-500 font-bold">Auto-persisted to LocalStorage & PostgreSQL</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              <tr>
                <th class="py-3 px-3">Permission Capability</th>
                <th class="py-3 px-3">Category</th>
                <th class="py-3 px-3 text-center">SuperAdmin</th>
                <th class="py-3 px-3 text-center">Admin</th>
                <th class="py-3 px-3 text-center">Agent</th>
                <th class="py-3 px-3 text-center">Farmer</th>
                <th class="py-3 px-3 text-center">Driver</th>
                <th class="py-3 px-3 text-center">Buyer</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium text-[11px]">
              ${t.map(l=>{var b,v,k,$,u;return`
                <tr class="hover:bg-slate-50/60 transition-colors">
                  <td class="py-2.5 px-3">
                    <span class="font-bold text-slate-900">${l.label}</span>
                    <span class="block text-[9px] text-purple-700 font-mono">${l.key}</span>
                  </td>
                  <td class="py-2.5 px-3">
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">${l.category}</span>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(b=a.admin)!=null&&b[l.key]?"fa-circle-check text-emerald-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(v=a.agent)!=null&&v[l.key]?"fa-circle-check text-teal-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(k=a.farmer)!=null&&k[l.key]?"fa-circle-check text-emerald-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${($=a.driver)!=null&&$[l.key]?"fa-circle-check text-amber-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(u=a.buyer)!=null&&u[l.key]?"fa-circle-check text-blue-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                </tr>
              `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function ns(o,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${o==="am"?"የሲስተም ውቅር እና የቴሌብር ክፍያ ዋስትና ክፍፍል (Escrow 90/5/5)":"Platform Configuration & Escrow Split Governance"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${o==="am"?"የገበሬው፣ የአጓጓዡ እና የሲስተሙን የክፍያ መቶኛ እና የቴሌብር ኤፒአይ ቁልፎችን ያስተካክሉ።":"Control escrow splits, Telebirr merchant credentials, Twilio SMS keys, and geocoding settings."}
        </p>
      </div>

      <form onsubmit="window.handleSaveSuperAdminConfig(event)" class="space-y-6">
        
        <!-- Escrow Split Percentage Sliders -->
        <div class="glass-card p-6 border-slate-200 space-y-5">
          <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-percent text-emerald-600"></i> Wholesale Escrow Revenue Split Architecture
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-emerald-950">
                <span>🌾 Farmer Direct Payout</span>
                <span id="farmerShareDisplay" class="text-lg font-black text-emerald-700">${e.farmerSharePercent}%</span>
              </div>
              <input type="range" id="farmerShareInput" min="70" max="95" value="${e.farmerSharePercent}"
                oninput="window.updateEscrowSliders('farmer')" class="w-full accent-emerald-600 cursor-pointer" />
              <p class="text-[10px] text-emerald-800 font-medium">Smallholder receives 90% direct payout into Telebirr upon buyer inspection.</p>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-amber-950">
                <span>🚚 Driver Freight Cut</span>
                <span id="driverShareDisplay" class="text-lg font-black text-amber-700">${e.driverSharePercent}%</span>
              </div>
              <input type="range" id="driverShareInput" min="2" max="15" value="${e.driverSharePercent}"
                oninput="window.updateEscrowSliders('driver')" class="w-full accent-amber-600 cursor-pointer" />
              <p class="text-[10px] text-amber-800 font-medium">Freight carrier receives 5% transit cut + rural route bonuses.</p>
            </div>

            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-purple-950">
                <span>🛡️ Platform Commission</span>
                <span id="platformShareDisplay" class="text-lg font-black text-purple-700">${e.platformFeePercent}%</span>
              </div>
              <input type="range" id="platformShareInput" min="2" max="15" value="${e.platformFeePercent}"
                oninput="window.updateEscrowSliders('platform')" class="w-full accent-purple-600 cursor-pointer" />
              <p class="text-[10px] text-purple-800 font-medium">Platform maintenance, dispute arbitration, and 15% MOR VAT collection.</p>
            </div>

          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">MOR Withholding Tax on Produce Goods (%)</label>
              <input type="number" id="cfgWithholdingTax" value="${e.withholdingTaxPercent}" min="0" max="10" step="0.5" class="input-field text-xs font-bold" />
              <p class="text-[10px] text-slate-400 mt-1">Standard 2% commercial withholding declared to Ministry of Revenues.</p>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">High-Value Payout Approval Threshold (ETB)</label>
              <input type="number" id="cfgHighValueThreshold" value="${e.highValuePayoutThresholdEtb}" min="10000" max="500000" step="5000" class="input-field text-xs font-bold" />
              <p class="text-[10px] text-slate-400 mt-1">Payouts exceeding this value require Super Admin dual authorization.</p>
            </div>
          </div>
        </div>

        <!-- Telebirr & Twilio API Credentials -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <!-- Telebirr Gateway Credentials -->
          <div class="glass-card p-5 border-slate-200 space-y-3.5">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-mobile-screen text-blue-600"></i> Telebirr Merchant Escrow API Credentials
            </h3>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Telebirr App ID</label>
              <input type="text" id="cfgTelebirrAppId" value="${e.telebirrAppId}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Telebirr Merchant Short Code</label>
              <input type="text" id="cfgTelebirrShortCode" value="${e.telebirrShortCode}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">API Key / Secret</label>
              <input type="password" id="cfgTelebirrApiKey" value="${e.telebirrApiKey}" class="input-field text-xs font-mono font-bold" />
            </div>
          </div>

          <!-- Twilio SMS & Geocoding Credentials -->
          <div class="glass-card p-5 border-slate-200 space-y-3.5">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-comment-sms text-emerald-600"></i> Twilio SMS & Geocoding Integrations
            </h3>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Twilio Account SID</label>
              <input type="text" id="cfgTwilioSid" value="${e.twilioAccountSid}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Twilio Auth Token</label>
              <input type="password" id="cfgTwilioToken" value="${e.twilioAuthToken}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Twilio From Number (Alphanumeric / Shortcode)</label>
              <input type="text" id="cfgTwilioFrom" value="${e.twilioFromNumber}" class="input-field text-xs font-mono font-bold" />
            </div>
          </div>

        </div>

        <button type="submit" class="btn-primary py-3 px-6 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-floppy-disk"></i>
          <span>Save Platform Configuration</span>
        </button>

      </form>
    </div>
  `}function ls(o,e,t,a="payouts",s="all",i="all",n="all",r="",d=[]){const p=c.getOrders(),l=c.getPlatformStats(),b=p.reduce((y,_)=>y+_.totalEtb,0)||l.totalTransactionVolumeEtb,v=p.filter(y=>y.status==="delivered").reduce((y,_)=>y+_.farmerCut,0)||Math.round(b*((t.farmerSharePercent||90)/100)),k=p.filter(y=>y.status==="delivered").reduce((y,_)=>y+_.driverCut,0)||Math.round(b*((t.driverSharePercent||5)/100)),$=p.filter(y=>y.status==="delivered").reduce((y,_)=>y+_.platformCut,0)||Math.round(b*((t.platformFeePercent||5)/100)),u=p.filter(y=>y.escrowHeld).reduce((y,_)=>y+_.totalEtb,0)||l.activeEscrowHeldEtb,S=Math.round(b*((t.withholdingTaxPercent||2)/100)),T=e.filter(y=>y.status==="Pending"),w=e.filter(y=>y.status==="Approved"),E=e.filter(y=>y.status==="Rejected");T.reduce((y,_)=>y+_.amountEtb,0);const L=(r||"").toLowerCase().trim(),V=e.filter(y=>{if(s!=="all"&&y.status.toLowerCase()!==s.toLowerCase()||i!=="all"&&y.recipientRole.toLowerCase()!==i.toLowerCase()||n!=="all"&&y.riskScore.toLowerCase()!==n.toLowerCase())return!1;if(L){const _=y.recipientName.toLowerCase().includes(L),G=y.recipientPhone.toLowerCase().includes(L),B=y.id.toLowerCase().includes(L),P=(y.cropName||"").toLowerCase().includes(L),J=(y.telebirrTxId||"").toLowerCase().includes(L);if(!_&&!G&&!B&&!P&&!J)return!1}return!0});return`
    <div class="space-y-6">
      
      <!-- Top Title & Gateway Operations Bar -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold mb-1">
            <i class="fa-solid fa-money-bill-transfer text-amber-600"></i> ${o==="am"?"የገንዘብ እና የክፍያ ቁጥጥር ማዕከል":"Telebirr Escrow & Multi-Sig Payout Governance"}
          </div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${o==="am"?"የፋይናንስ ቁጥጥር እና ከፍተኛ ክፍያዎች ማረጋገጫ":"Financial Oversight & Multi-Sig Payout Engine"}
          </h2>
          <p class="text-xs text-slate-500 font-medium max-w-2xl">
            ${o==="am"?"ከ50,000 ብር በላይ የሆኑ የጅምላ ክፍያዎች ባለብዙ ፊርማ (Multi-Sig) ማረጋገጫ፣ የ90/5/5 የክፍያ ድርሻ እና የገቢዎች ሚኒስቴር 2% የግብር ተቀናሽ ቁጥጥር።":"Real-time multi-sig authorization queue for high-value payouts (>50k ETB), 90/5/5 escrow split reconciliation, and Ministry of Revenues (MOR) tax compliance."}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button onclick="window.resetSuperAdminPayouts()" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-300 flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-rotate-left text-slate-500"></i> ${o==="am"?"ወደ ቀዳሚው መልስ":"Reset Defaults"}
          </button>
          <button onclick="window.openSimulatePayoutModal()" class="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-plus"></i> ${o==="am"?"አዲስ የክፍያ ጥያቄ ፍጠር":"Simulate Payout"}
          </button>
          <button onclick="window.exportFinancialStatement('csv')" class="btn-secondary py-2 px-3.5 text-xs font-bold cursor-pointer flex items-center gap-1.5">
            <i class="fa-solid fa-file-csv text-emerald-700"></i> ${o==="am"?"ፋይናንስ ሪፖርት አውርድ":"Export Ledger CSV"}
          </button>
        </div>
      </div>

      <!-- Live Gateway Status Bar -->
      <div class="glass-card p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <span class="font-extrabold text-white block">Telebirr Merchant Escrow API · v2.4 Core Gateway</span>
            <span class="text-[11px] text-slate-300 font-mono">AppID: ${t.telebirrAppId||"ET-TEL-99201"} · ShortCode: ${t.telebirrShortCode||"8842"} · Multi-Sig Threshold: ${t.highValuePayoutThresholdEtb.toLocaleString()} ETB</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${t.emergencyEscrowFrozen?`
            <span class="px-3 py-1 rounded-lg bg-red-500 text-white font-black text-[11px] flex items-center gap-1 animate-pulse">
              <i class="fa-solid fa-lock"></i> ESCROW FROZEN
            </span>
          `:`
            <span class="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] flex items-center gap-1">
              <i class="fa-solid fa-circle-check text-emerald-400"></i> Gateway Live & Synchronized
            </span>
          `}
          <button onclick="window.toggleEmergencyEscrowFreeze()" class="px-3 py-1 rounded-lg ${t.emergencyEscrowFrozen?"bg-emerald-600 hover:bg-emerald-700":"bg-red-600/80 hover:bg-red-600"} text-white font-bold text-[11px] cursor-pointer transition-colors">
            ${t.emergencyEscrowFrozen?"Unfreeze Escrow":"Emergency Freeze"}
          </button>
        </div>
      </div>

      <!-- Executive Financial KPI Dashboard (6 Metric Cards) -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div class="glass-card p-4 border-l-4 border-slate-900 space-y-1">
          <div class="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>${o==="am"?"ጠቅላላ የገበያ ግብይት":"Gross GMV Settled"}</span>
            <i class="fa-solid fa-chart-line text-slate-700"></i>
          </div>
          <div class="text-base sm:text-lg font-black text-slate-900 font-mono">
            ${b.toLocaleString()} <span class="text-[10px] font-bold text-slate-500">ETB</span>
          </div>
          <p class="text-[10px] text-slate-500 font-semibold">${p.length} platform orders</p>
        </div>

        <div class="glass-card p-4 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>${o==="am"?"በቴሌብር የተያዘ":"Active Escrow Vault"}</span>
            <i class="fa-solid fa-vault text-blue-600"></i>
          </div>
          <div class="text-base sm:text-lg font-black text-blue-700 font-mono">
            ${u.toLocaleString()} <span class="text-[10px] font-bold text-blue-600">ETB</span>
          </div>
          <p class="text-[10px] text-blue-800 font-semibold">Held in custody</p>
        </div>

        <div class="glass-card p-4 border-l-4 border-emerald-600 space-y-1">
          <div class="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>${o==="am"?"ለአርሶ አደር (90%)":"Farmer Share (90%)"}</span>
            <i class="fa-solid fa-wheat-awn text-emerald-600"></i>
          </div>
          <div class="text-base sm:text-lg font-black text-emerald-700 font-mono">
            ${v.toLocaleString()} <span class="text-[10px] font-bold text-emerald-600">ETB</span>
          </div>
          <p class="text-[10px] text-emerald-800 font-semibold">Direct produce value</p>
        </div>

        <div class="glass-card p-4 border-l-4 border-teal-600 space-y-1">
          <div class="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>${o==="am"?"ለትራንስፖርት (5%)":"Logistics (5%)"}</span>
            <i class="fa-solid fa-truck-fast text-teal-600"></i>
          </div>
          <div class="text-base sm:text-lg font-black text-teal-700 font-mono">
            ${k.toLocaleString()} <span class="text-[10px] font-bold text-teal-600">ETB</span>
          </div>
          <p class="text-[10px] text-teal-800 font-semibold">Freight disbursement</p>
        </div>

        <div class="glass-card p-4 border-l-4 border-purple-600 space-y-1">
          <div class="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>${o==="am"?"የፕላትፎርም ኮሚሽን (5%)":"Platform Fee (5%)"}</span>
            <i class="fa-solid fa-coins text-purple-600"></i>
          </div>
          <div class="text-base sm:text-lg font-black text-purple-700 font-mono">
            ${$.toLocaleString()} <span class="text-[10px] font-bold text-purple-600">ETB</span>
          </div>
          <p class="text-[10px] text-purple-800 font-semibold">System revenue</p>
        </div>

        <div class="glass-card p-4 border-l-4 border-amber-600 space-y-1">
          <div class="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>${o==="am"?"የገቢዎች ግብር (2%)":"MOR Tax (2%)"}</span>
            <i class="fa-solid fa-landmark text-amber-600"></i>
          </div>
          <div class="text-base sm:text-lg font-black text-amber-700 font-mono">
            ${S.toLocaleString()} <span class="text-[10px] font-bold text-amber-600">ETB</span>
          </div>
          <p class="text-[10px] text-amber-800 font-semibold">Withholding tax</p>
        </div>

      </div>

      <!-- Financial Sub-Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2.5 overflow-x-auto text-xs font-bold">
        <button onclick="window.setSuperAdminFinancialSubTab('payouts')" class="px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${a==="payouts"?"bg-amber-600 text-white shadow-md":"bg-slate-100 text-slate-700 hover:bg-slate-200"}">
          <i class="fa-solid fa-stamp"></i>
          <span>${o==="am"?"የክፍያ ማረጋገጫ ወረፋ":"Multi-Sig Payout Queue"}</span>
          <span class="px-1.5 py-0.5 rounded-full text-[10px] font-black ${a==="payouts"?"bg-white text-amber-800":"bg-amber-100 text-amber-800"}">${T.length}</span>
        </button>

        <button onclick="window.setSuperAdminFinancialSubTab('ledger')" class="px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${a==="ledger"?"bg-slate-900 text-white shadow-md":"bg-slate-100 text-slate-700 hover:bg-slate-200"}">
          <i class="fa-solid fa-table-list"></i>
          <span>${o==="am"?"የእስክሮው እና የድርሻ ሌጀር":"Order Escrow & Split Ledger"}</span>
          <span class="text-[10px] opacity-75 font-mono">(${p.length})</span>
        </button>

        <button onclick="window.setSuperAdminFinancialSubTab('tax')" class="px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${a==="tax"?"bg-slate-900 text-white shadow-md":"bg-slate-100 text-slate-700 hover:bg-slate-200"}">
          <i class="fa-solid fa-landmark"></i>
          <span>${o==="am"?"የግብር ተቀናሽ ሪፖርት":"MOR Withholding Tax & Compliance"}</span>
        </button>

        <button onclick="window.setSuperAdminFinancialSubTab('config')" class="px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${a==="config"?"bg-slate-900 text-white shadow-md":"bg-slate-100 text-slate-700 hover:bg-slate-200"}">
          <i class="fa-solid fa-sliders"></i>
          <span>${o==="am"?"የእስክሮው ፐርሰንት ውቅር":"Escrow Split Parameters"}</span>
        </button>
      </div>

      <!-- ==================== SUB-VIEW 1: MULTI-SIG PAYOUT QUEUE ==================== -->
      ${a==="payouts"?`
        <div class="space-y-4">
          
          <!-- Filters, Search & Batch Action Bar -->
          <div class="glass-card p-4 border-slate-200 space-y-3">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              <!-- Search Input -->
              <div class="relative flex-1">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input 
                  type="text" 
                  id="payoutSearchInput" 
                  placeholder="Search beneficiary name, phone (+251...), TxID, or crop..." 
                  value="${r}" 
                  oninput="window.handlePayoutSearch(this.value)" 
                  class="input-field pl-9 py-2 text-xs font-medium" 
                />
                ${r?`
                  <button onclick="window.handlePayoutSearch('')" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                `:""}
              </div>

              <!-- Filter Dropdowns -->
              <div class="flex items-center gap-2 text-xs">
                <select id="payoutRoleFilterSelect" onchange="window.setPayoutRoleFilter(this.value)" class="input-field py-2 text-xs font-bold bg-white">
                  <option value="all" ${i==="all"?"selected":""}>All Roles</option>
                  <option value="farmer" ${i==="farmer"?"selected":""}>🌾 Farmers / Unions</option>
                  <option value="driver" ${i==="driver"?"selected":""}>🚚 Transporters / Logistics</option>
                </select>

                <select id="payoutRiskFilterSelect" onchange="window.setPayoutRiskFilter(this.value)" class="input-field py-2 text-xs font-bold bg-white">
                  <option value="all" ${n==="all"?"selected":""}>All Risk Scores</option>
                  <option value="low" ${n==="low"?"selected":""}>🟢 Low Risk</option>
                  <option value="medium" ${n==="medium"?"selected":""}>🟡 Medium Risk</option>
                  <option value="high" ${n==="high"?"selected":""}>🔴 High Risk (Audit Hold)</option>
                </select>
              </div>

            </div>

            <!-- Status Tabs & Batch Actions -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
              <div class="flex items-center gap-1.5 overflow-x-auto font-bold">
                <button onclick="window.setPayoutStatusFilter('all')" class="px-3 py-1 rounded-lg transition-all ${s==="all"?"bg-slate-900 text-white":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
                  All (${e.length})
                </button>
                <button onclick="window.setPayoutStatusFilter('pending')" class="px-3 py-1 rounded-lg transition-all ${s==="pending"?"bg-amber-600 text-white":"bg-amber-50 text-amber-800 hover:bg-amber-100"}">
                  Pending Multi-Sig (${T.length})
                </button>
                <button onclick="window.setPayoutStatusFilter('approved')" class="px-3 py-1 rounded-lg transition-all ${s==="approved"?"bg-emerald-600 text-white":"bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}">
                  Approved & Released (${w.length})
                </button>
                <button onclick="window.setPayoutStatusFilter('rejected')" class="px-3 py-1 rounded-lg transition-all ${s==="rejected"?"bg-red-600 text-white":"bg-red-50 text-red-800 hover:bg-red-100"}">
                  Declined / Held (${E.length})
                </button>
              </div>

              <div class="flex items-center gap-2">
                ${T.length>0?`
                  <button onclick="window.approveAllPendingPayouts()" class="btn-primary py-1.5 px-3 text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm">
                    <i class="fa-solid fa-check-double"></i>
                    <span>Authorize All Verified (${T.length})</span>
                  </button>
                `:""}
              </div>
            </div>
          </div>

          <!-- Payout Approval Cards / Stream -->
          ${V.length===0?`
            <div class="p-10 text-center glass-card border-slate-200 space-y-2">
              <i class="fa-solid fa-circle-check text-emerald-500 text-4xl mb-1"></i>
              <h4 class="text-sm font-bold text-slate-800">No Payout Requests Match Filter</h4>
              <p class="text-xs text-slate-500">All high-value payouts matching your filter criteria have been processed or none exist.</p>
            </div>
          `:`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${V.map(y=>{const _=y.withholdingTaxEtb||Math.round(y.amountEtb*.02),G=y.netDisbursedEtb||y.amountEtb-_,B=y.status==="Pending",P=y.status==="Approved",J=y.status==="Rejected";return`
                  <div class="glass-card p-5 border-l-4 ${y.riskScore==="High"?"border-red-600":y.riskScore==="Medium"?"border-amber-600":"border-emerald-600"} space-y-3.5 relative overflow-hidden">
                    
                    <!-- Card Top Header -->
                    <div class="flex items-start justify-between gap-2">
                      <div class="space-y-0.5">
                        <div class="flex items-center gap-2">
                          <span class="text-xs font-black text-slate-900 block">${y.recipientName}</span>
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${y.recipientRole==="farmer"?"bg-emerald-100 text-emerald-800":"bg-teal-100 text-teal-800"}">
                            ${y.recipientRole==="farmer"?"🌾 Farmer / Union":"🚚 Transporter"}
                          </span>
                        </div>
                        <div class="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium">
                          <span class="font-mono text-slate-700 font-bold">${y.recipientPhone}</span>
                          ${y.region?`<span>· <i class="fa-solid fa-location-dot text-slate-400"></i> ${y.region}</span>`:""}
                        </div>
                      </div>

                      <div class="flex flex-col items-end gap-1">
                        <span class="px-2 py-0.5 rounded text-[10px] font-black ${y.riskScore==="High"?"bg-red-100 text-red-800":y.riskScore==="Medium"?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"}">
                          ${y.riskScore.toUpperCase()} RISK
                        </span>
                        <span class="text-[10px] font-mono text-slate-400 font-semibold">${y.requestedAt}</span>
                      </div>
                    </div>

                    <!-- Payout Breakdown Box -->
                    <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div class="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
                        <span class="text-slate-500 font-medium">Requested Withdrawal:</span>
                        <span class="text-base font-black text-slate-900 font-mono">${y.amountEtb.toLocaleString()} ETB</span>
                      </div>

                      <div class="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span class="text-slate-400 block font-medium">2% MOR Tax Withholding:</span>
                          <span class="font-bold text-amber-700 font-mono">-${_.toLocaleString()} ETB</span>
                        </div>
                        <div>
                          <span class="text-slate-400 block font-medium">Net Telebirr Release:</span>
                          <span class="font-black text-emerald-700 font-mono">${G.toLocaleString()} ETB</span>
                        </div>
                      </div>

                      <div class="pt-1.5 border-t border-slate-200/80 text-[11px] text-slate-600">
                        <span class="font-bold text-slate-700">Trigger:</span> ${y.triggerReason}
                      </div>

                      ${y.cropName?`
                        <div class="text-[10px] text-slate-500 font-medium flex items-center gap-1.5">
                          <i class="fa-solid fa-seedling text-emerald-600"></i> Produce: <span class="font-bold text-slate-700">${y.cropName}</span>
                        </div>
                      `:""}

                      ${y.tinNumber||y.faydaId?`
                        <div class="text-[10px] text-slate-500 font-mono flex flex-wrap gap-2 pt-0.5">
                          ${y.tinNumber?`<span>TIN: <strong class="text-slate-700">${y.tinNumber}</strong></span>`:""}
                          ${y.faydaId?`<span>FAYDA: <strong class="text-slate-700">${y.faydaId}</strong></span>`:""}
                        </div>
                      `:""}
                    </div>

                    <!-- Status or Review Metadata -->
                    ${P?`
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                        <div class="flex items-center gap-1.5 font-bold">
                          <i class="fa-solid fa-circle-check text-emerald-600"></i>
                          <span>Approved & Disbursed</span>
                        </div>
                        <span class="text-[10px] font-mono text-emerald-700">Tx: ${y.telebirrTxId||"TB-ET-98201"}</span>
                      </div>
                    `:J?`
                      <div class="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1">
                        <div class="flex items-center gap-1.5 font-bold">
                          <i class="fa-solid fa-ban text-red-600"></i>
                          <span>Declined / Flagged for Compliance</span>
                        </div>
                        ${y.rejectionReason?`<p class="text-[11px] text-red-700 font-medium">${y.rejectionReason}</p>`:""}
                      </div>
                    `:""}

                    <!-- Action Controls -->
                    <div class="flex items-center gap-2 pt-1">
                      ${B?`
                        <button onclick="window.approveHighValuePayout('${y.id}')" class="btn-primary flex-1 py-2.5 text-xs font-bold cursor-pointer shadow-md flex items-center justify-center gap-1.5">
                          <i class="fa-solid fa-check"></i> Authorize Telebirr Payout
                        </button>
                        <button onclick="window.openRejectPayoutModal('${y.id}')" class="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer border border-red-200 flex items-center gap-1">
                          <i class="fa-solid fa-ban"></i> Decline
                        </button>
                      `:`
                        <button onclick="window.openPayoutDetailModal('${y.id}')" class="btn-secondary flex-1 py-2 text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5">
                          <i class="fa-solid fa-file-invoice"></i> View Audit Certificate
                        </button>
                      `}
                    </div>

                  </div>
                `}).join("")}
            </div>
          `}
        </div>
      `:""}

      <!-- ==================== SUB-VIEW 2: ORDER ESCROW & SPLIT LEDGER ==================== -->
      ${a==="ledger"?`
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-black text-slate-900">Order Escrow Reconciliation & Split Ledger</h3>
              <p class="text-xs text-slate-500">Live 90% Farmer / 5% Transporter / 5% Platform split verification per marketplace order.</p>
            </div>
            <button onclick="window.exportFinancialStatement('csv')" class="btn-secondary py-1.5 px-3 text-xs font-bold cursor-pointer flex items-center gap-1.5">
              <i class="fa-solid fa-file-arrow-down text-emerald-700"></i> Export Ledger CSV
            </button>
          </div>

          <div class="glass-card overflow-hidden border border-slate-200">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th class="p-3.5">Order ID & Crop</th>
                    <th class="p-3.5">Buyer</th>
                    <th class="p-3.5">Total Value (ETB)</th>
                    <th class="p-3.5 text-emerald-700">Farmer Cut (90%)</th>
                    <th class="p-3.5 text-teal-700">Logistics (5%)</th>
                    <th class="p-3.5 text-purple-700">Platform (5%)</th>
                    <th class="p-3.5 text-amber-700">MOR Tax (2%)</th>
                    <th class="p-3.5">Escrow Status</th>
                    <th class="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                  ${p.map(y=>{const _=y.totalEtb,G=y.farmerCut||Math.round(_*.9),B=y.driverCut||Math.round(_*.05),P=y.platformCut||Math.round(_*.05),J=Math.round(_*.02);return`
                      <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-3.5">
                          <span class="font-mono font-bold text-slate-900 block">#${y.id.slice(0,8).toUpperCase()}</span>
                          <span class="text-[11px] text-slate-500 font-semibold">${y.productName||"Agricultural Produce"} (${y.qtyKg} kg)</span>
                        </td>
                        <td class="p-3.5">
                          <span class="font-bold text-slate-900 block">${y.buyerName}</span>
                          <span class="text-[10px] text-slate-400 font-mono">${y.buyerPhone}</span>
                        </td>
                        <td class="p-3.5 font-mono font-bold text-slate-900">
                          ${_.toLocaleString()} ETB
                        </td>
                        <td class="p-3.5 font-mono font-bold text-emerald-700">
                          ${G.toLocaleString()} ETB
                        </td>
                        <td class="p-3.5 font-mono font-bold text-teal-700">
                          ${B.toLocaleString()} ETB
                        </td>
                        <td class="p-3.5 font-mono font-bold text-purple-700">
                          ${P.toLocaleString()} ETB
                        </td>
                        <td class="p-3.5 font-mono font-bold text-amber-700">
                          ${J.toLocaleString()} ETB
                        </td>
                        <td class="p-3.5">
                          ${y.escrowHeld?`
                            <span class="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-800 flex items-center gap-1 w-max">
                              <i class="fa-solid fa-lock"></i> Escrow Held
                            </span>
                          `:y.status==="delivered"?`
                            <span class="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                              <i class="fa-solid fa-circle-check"></i> Released
                            </span>
                          `:`
                            <span class="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-700 flex items-center gap-1 w-max">
                              ${y.status.toUpperCase()}
                            </span>
                          `}
                        </td>
                        <td class="p-3.5 text-right">
                          ${y.escrowHeld?`
                            <button onclick="window.manualReleaseOrderEscrow('${y.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 cursor-pointer">
                              Release Escrow
                            </button>
                          `:`
                            <span class="text-[11px] text-slate-400 font-mono">Settled</span>
                          `}
                        </td>
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `:""}

      <!-- ==================== SUB-VIEW 3: MOR TAX COMPLIANCE ==================== -->
      ${a==="tax"?`
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="glass-card p-4 border-l-4 border-amber-600 space-y-1">
              <span class="text-xs text-slate-500 font-bold block">Total Withholding Tax Accrued (2%)</span>
              <span class="text-xl font-black text-amber-800 font-mono">${S.toLocaleString()} ETB</span>
              <p class="text-[10px] text-slate-500 font-medium">Declared to Ethiopian Ministry of Revenues</p>
            </div>
            <div class="glass-card p-4 border-l-4 border-emerald-600 space-y-1">
              <span class="text-xs text-slate-500 font-bold block">TIN Verified Smallholders & Unions</span>
              <span class="text-xl font-black text-emerald-800 font-mono">94.8%</span>
              <p class="text-[10px] text-slate-500 font-medium">Compliance rate with tax identification numbers</p>
            </div>
            <div class="glass-card p-4 border-l-4 border-purple-600 space-y-1">
              <span class="text-xs text-slate-500 font-bold block">15% VAT on Platform Service Fees</span>
              <span class="text-xl font-black text-purple-800 font-mono">${Math.round($*.15).toLocaleString()} ETB</span>
              <p class="text-[10px] text-slate-500 font-medium">Standard Value Added Tax on tech commission</p>
            </div>
          </div>

          <div class="glass-card p-5 border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-file-invoice text-amber-600"></i> Ministry of Revenues (MOR) Settlement Compliance Summary
              </h3>
              <button onclick="window.exportFinancialStatement('csv')" class="btn-secondary py-1.5 px-3 text-xs font-bold cursor-pointer">
                <i class="fa-solid fa-download mr-1"></i> Download Tax Filing CSV
              </button>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <p class="font-bold flex items-center gap-1.5">
                <i class="fa-solid fa-circle-info text-amber-700"></i> Statutory Tax Withholding Directive No. 98/2026:
              </p>
              <p class="text-[11px] leading-relaxed">
                Farmer Market operates as an authorized digital withholding agent under Ministry of Revenues regulations. 
                A 2% withholding tax is computed on gross produce settlements exceeding 10,000 ETB and automatically itemized on commercial waybills and Telebirr disbursement vouchers.
              </p>
            </div>
          </div>
        </div>
      `:""}

      <!-- ==================== SUB-VIEW 4: ESCROW SPLIT CONFIGURATION ==================== -->
      ${a==="config"?`
        <div class="glass-card p-6 border-slate-200 space-y-5">
          <div>
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-sliders text-emerald-600"></i> Escrow Split Percentages & Withholding Configuration
            </h3>
            <p class="text-xs text-slate-500 font-medium">
              Calibrate marketplace revenue splits between smallholder farmers, logistics drivers, platform operational fee, and Ministry of Revenues tax withholding.
            </p>
          </div>

          <form onsubmit="window.handleSaveSuperAdminConfig(event)" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-emerald-900">Farmer Share (%)</span>
                  <span id="farmerShareDisplay" class="text-lg font-black text-emerald-700">${t.farmerSharePercent}%</span>
                </div>
                <input type="range" id="farmerShareInput" min="70" max="95" value="${t.farmerSharePercent}"
                  oninput="window.updateEscrowSliders('farmer')" class="w-full accent-emerald-600 cursor-pointer" />
                <p class="text-[10px] text-emerald-800 font-medium">Direct harvest payout credited to farmer upon buyer receipt confirmation.</p>
              </div>

              <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-teal-900">Transporter Share (%)</span>
                  <span id="driverShareDisplay" class="text-lg font-black text-teal-700">${t.driverSharePercent}%</span>
                </div>
                <input type="range" id="driverShareInput" min="2" max="15" value="${t.driverSharePercent}"
                  oninput="window.updateEscrowSliders('driver')" class="w-full accent-teal-600 cursor-pointer" />
                <p class="text-[10px] text-teal-800 font-medium">Freight logistics and driver mileage compensation.</p>
              </div>

              <div class="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-purple-900">Platform Fee (%)</span>
                  <span id="platformShareDisplay" class="text-lg font-black text-purple-700">${t.platformFeePercent}%</span>
                </div>
                <input type="range" id="platformShareInput" min="2" max="15" value="${t.platformFeePercent}"
                  oninput="window.updateEscrowSliders('platform')" class="w-full accent-purple-600 cursor-pointer" />
                <p class="text-[10px] text-purple-800 font-medium">Platform maintenance, dispute arbitration, and tech operations.</p>
              </div>

            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label class="block text-xs font-bold text-slate-800 mb-1">MOR Withholding Tax on Produce Goods (%)</label>
                <input type="number" id="cfgWithholdingTax" value="${t.withholdingTaxPercent}" min="0" max="10" step="0.5" class="input-field text-xs font-bold" />
                <p class="text-[10px] text-slate-400 mt-1">Standard 2% commercial withholding declared to Ministry of Revenues.</p>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-800 mb-1">High-Value Payout Approval Threshold (ETB)</label>
                <input type="number" id="cfgHighValueThreshold" value="${t.highValuePayoutThresholdEtb}" min="10000" max="500000" step="5000" class="input-field text-xs font-bold" />
                <p class="text-[10px] text-slate-400 mt-1">Payouts exceeding this value require Super Admin multi-sig authorization.</p>
              </div>
            </div>

            <button type="submit" class="btn-primary py-3 px-6 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
              <i class="fa-solid fa-floppy-disk"></i>
              <span>Save Platform Configuration & Splits</span>
            </button>
          </form>
        </div>
      `:""}

    </div>
  `}function ds(o,e,t){return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${o==="am"?"የሲስተም ኦዲት መዝገብ እና የደህንነት ክትትል":"System-Wide Immutable Audit Trail & Security Monitor"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${o==="am"?"የአድሚን፣ የዋና አድሚን እና የሲስተም እንቅስቃሴዎችን በሙሉ በዝርዝር ይመልከቱ።":"Real-time tamper-evident logs of administrative actions, user mutations, escrow adjustments, and logins."}
          </p>
        </div>

        <button onclick="window.exportPlatformData('csv')" class="btn-secondary py-2 px-3.5 text-xs font-bold cursor-pointer flex items-center gap-1.5">
          <i class="fa-solid fa-file-csv text-emerald-700"></i> Export Audit CSV
        </button>
      </div>

      <!-- Audit Categories Filter -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button onclick="window.setAuditCategoryFilter('all')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="all"?"bg-slate-900 text-white":"bg-slate-100 text-slate-600"}">
          All Logs (${e.length})
        </button>
        <button onclick="window.setAuditCategoryFilter('user_crud')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="user_crud"?"bg-rose-700 text-white":"bg-rose-50 text-rose-800"}">
          User CRUD
        </button>
        <button onclick="window.setAuditCategoryFilter('config')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="config"?"bg-purple-700 text-white":"bg-purple-50 text-purple-800"}">
          Configuration
        </button>
        <button onclick="window.setAuditCategoryFilter('finance')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="finance"?"bg-emerald-700 text-white":"bg-emerald-50 text-emerald-800"}">
          Financials
        </button>
        <button onclick="window.setAuditCategoryFilter('dispute')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="dispute"?"bg-amber-700 text-white":"bg-amber-50 text-amber-800"}">
          Disputes
        </button>
        <button onclick="window.setAuditCategoryFilter('impersonation')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="impersonation"?"bg-blue-700 text-white":"bg-blue-50 text-blue-800"}">
          Impersonation
        </button>
      </div>

      <!-- Audit Stream Table -->
      <div class="glass-card overflow-hidden border border-slate-200">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th class="p-3.5">Timestamp</th>
                <th class="p-3.5">Actor</th>
                <th class="p-3.5">Action & Category</th>
                <th class="p-3.5">Target Resource</th>
                <th class="p-3.5">IP & User Agent</th>
                <th class="p-3.5">Audit Details</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
              ${e.map(a=>`
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5 text-[11px] text-slate-500 font-mono whitespace-nowrap">${a.timestamp}</td>
                  <td class="p-3.5">
                    <span class="font-bold text-slate-900 block leading-tight">${a.actorName}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${a.actorRole.toUpperCase()}</span>
                  </td>
                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black ${xs(a.category)}">
                      ${a.category}
                    </span>
                    <span class="text-[11px] font-bold text-slate-800 block mt-0.5">${a.action}</span>
                  </td>
                  <td class="p-3.5 text-[11px] font-mono text-slate-600">
                    ${a.targetResource}
                    ${a.targetId?`<span class="block text-[10px] text-slate-400">${a.targetId}</span>`:""}
                  </td>
                  <td class="p-3.5 text-[11px] text-slate-500">
                    <span class="font-mono text-slate-700 font-bold block">${a.ipAddress}</span>
                    <span class="text-[10px] truncate max-w-[140px] block text-slate-400">${a.userAgent}</span>
                  </td>
                  <td class="p-3.5 text-xs font-normal text-slate-800 max-w-xs">
                    ${a.details}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `}function cs(o,e){return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${o==="am"?"የማድረሻ ዞኖች እና የፖስትጂአይኤስ (PostGIS) ድንበሮች":"Multi-Region Delivery Clusters & PostGIS Spatial Geofencing"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${o==="am"?"የገጠር አርሶ አደሮች ማበረታቻ ክፍያ እና የማድረሻ ራዲየስን ያስተካክሉ።":"Configure regional delivery radius, PostGIS GPS bounds, and rural route subsidy incentives."}
          </p>
        </div>

        <button onclick="window.openAddZoneModal()" class="btn-primary py-2.5 px-4 text-xs font-bold cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-plus-circle"></i> Add Delivery Zone
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${e.map(t=>`
          <div class="glass-card p-5 border-slate-200 space-y-3">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-black text-slate-900 text-sm">${t.name}</h3>
                <span class="text-[11px] text-slate-500 font-medium">${t.nameAm||""}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-black ${t.active?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-600"}">
                ${t.active?"ACTIVE":"INACTIVE"}
              </span>
            </div>

            <div class="space-y-1.5 text-xs text-slate-600">
              <div class="flex justify-between">
                <span class="text-slate-400">Terminal Hub:</span>
                <span class="font-bold text-slate-800">${t.clusterHubName}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Base / Max Radius:</span>
                <span class="font-bold text-slate-800">${t.baseRadiusKm} km / ${t.maxRadiusKm} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Rural Route Bonus:</span>
                <span class="font-bold text-emerald-700">+${t.ruralSubsidyEtb} ETB / trip</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Active Smallholders:</span>
                <span class="font-bold text-slate-800">${t.smallholdersCount.toLocaleString()} farmers</span>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span class="font-mono text-slate-400">${t.centerLatitude.toFixed(4)}, ${t.centerLongitude.toFixed(4)}</span>
              <button onclick="window.deleteZone('${t.id}')" class="text-red-600 hover:text-red-800 font-bold cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function ps(o,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${o==="am"?"የባህሪያት ማብሪያ/ማጥፊያ እና የክልላዊ ሙከራዎች":"Feature Flags & Regional Rollout Management"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${o==="am"?"አዳዲስ የሲስተም አገልግሎቶችን በቅድሚያ ለተመረጡ ክልሎች ወይም ተጠቃሚዎች ይልቀቁ።":"Instantly toggle platform capabilities in real time without redeploying code."}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${e.map(t=>`
          <div class="glass-card p-5 border-slate-200 space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-black text-slate-900 text-sm">${t.name}</h3>
                <code class="text-[10px] font-mono text-slate-500 block">${t.key}</code>
              </div>

              <!-- Toggle Switch -->
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" ${t.enabled?"checked":""} onchange="window.toggleFeatureFlag('${t.key}')" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <p class="text-xs text-slate-600 font-medium">${t.description}</p>

            <div class="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>Rollout: <strong>${t.rolloutPercentage}%</strong></span>
              <span>Target: <strong>${t.targetRoles.join(", ")}</strong></span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function us(o,e,t){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-red-950">
          ${o==="am"?"የአደጋ ጊዜ መቆጣጠሪያ እና ዓለም አቀፍ እገዳ (Killswitch)":"Emergency Killswitches & Global Blacklist"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${o==="am"?"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ እና አጠራጣሪ ተጠቃሚዎችን የማገድ እርምጃዎች።":"Immediate emergency transaction freeze and global blacklisting of fraudulent phone numbers or National IDs."}
        </p>
      </div>

      <!-- Emergency Escrow Freeze Card -->
      <div class="p-6 rounded-3xl ${e.emergencyEscrowFrozen?"bg-red-600 text-white border-2 border-red-400":"bg-red-50/80 border border-red-200 text-red-950"} space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl ${e.emergencyEscrowFrozen?"bg-white text-red-600":"bg-red-600 text-white"} flex items-center justify-center text-xl font-black shadow-md">
              <i class="fa-solid fa-lock"></i>
            </div>
            <div>
              <h3 class="text-base font-black">
                ${e.emergencyEscrowFrozen?"PLATFORM ESCROW CURRENTLY FROZEN":"Emergency Platform-Wide Escrow Killswitch"}
              </h3>
              <p class="text-xs opacity-90">
                ${e.emergencyEscrowFrozen?"All automatic Telebirr payouts and order completions are halted globally.":"Instantly halt all automatic Telebirr payouts across all orders in case of security threat or system anomaly."}
              </p>
            </div>
          </div>

          <button onclick="window.toggleEmergencyEscrowFreeze()" class="px-5 py-2.5 rounded-xl ${e.emergencyEscrowFrozen?"bg-white text-red-700 font-black hover:bg-slate-100":"bg-red-600 text-white font-bold hover:bg-red-700"} text-xs transition-all shadow-md cursor-pointer">
            ${e.emergencyEscrowFrozen?"UNFREEZE PLATFORM ESCROW":"FREEZE ALL ESCROW"}
          </button>
        </div>
      </div>

      <!-- Global Blacklist Table -->
      <div class="glass-card p-5 border-slate-200 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-ban text-red-600"></i> Global Platform Blacklist (${t.length})
          </h3>
          <button onclick="window.openAddBlacklistModal()" class="btn-secondary py-1.5 px-3 text-xs font-bold cursor-pointer">
            + Add to Blacklist
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th class="p-3">Type</th>
                <th class="p-3">Blacklisted Value</th>
                <th class="p-3">Reason</th>
                <th class="p-3">Date</th>
                <th class="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
              ${t.map(a=>`
                <tr>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-800">${a.type}</span>
                  </td>
                  <td class="p-3 font-mono font-bold text-slate-900">${a.value}</td>
                  <td class="p-3 text-slate-600">${a.reason}</td>
                  <td class="p-3 font-mono text-[11px] text-slate-500">${a.blacklistedAt}</td>
                  <td class="p-3 text-right">
                    <button onclick="window.removeFromBlacklist('${a.id}')" class="text-red-600 hover:text-red-800 font-bold cursor-pointer">
                      Remove
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `}function ms(o,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${o==="am"?"አጠቃላይ የግብይት እና የዋጋ ደንቦች":"Global Marketplace Trading Rules & Pricing Caps"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${o==="am"?"አነስተኛ እና ከፍተኛ የትዕዛዝ መጠን እና የዋጋ ገደቦችን ያስተካክሉ።":"Establish wholesale order size thresholds, dynamic price floor/ceiling variances, and delivery radius constraints."}
        </p>
      </div>

      <form onsubmit="window.handleSaveBusinessRules(event)" class="glass-card p-6 border-slate-200 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Minimum Wholesale Order (kg)</label>
            <input type="number" id="ruleMinOrderKg" value="${e.minOrderKg}" min="1" class="input-field text-xs font-bold" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Maximum Bulk Order (kg)</label>
            <input type="number" id="ruleMaxOrderKg" value="${e.maxOrderKg}" min="1000" class="input-field text-xs font-bold" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Maximum Transit Delivery Radius (km)</label>
            <input type="number" id="ruleMaxDistanceKm" value="${e.maxDistanceKm}" min="50" class="input-field text-xs font-bold" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Produce Price Ceiling Variance Cap (%)</label>
            <input type="number" id="rulePriceCeiling" value="${e.priceCeilingVariancePercent}" min="50" max="500" class="input-field text-xs font-bold" />
          </div>
        </div>

        <button type="submit" class="btn-primary py-2.5 px-5 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-check"></i> Save Business Rules
        </button>
      </form>
    </div>
  `}function fs(o){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${o==="am"?"የዳታቤዝ ክዋኔዎች እና የሲስተም ጤና":"PostgreSQL 16 Database Operations & Infrastructure Health"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${o==="am"?"የዳታቤዝ ግንኙነቶችን፣ የትራንዛክሽን ቅጂዎችን እና የሲስተም ፍጥነትን ይቆጣጠሩ።":"Database connection pool metrics, automated snapshots, and live telemetry."}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">PostgreSQL Engine</span>
          <div class="text-xl font-black text-slate-900">v16.3-PostGIS</div>
          <p class="text-[11px] text-blue-700 font-semibold">Spatial Index Enabled</p>
        </div>
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">Active Connection Pool</span>
          <div class="text-xl font-black text-slate-900">18 / 100</div>
          <p class="text-[11px] text-emerald-700 font-semibold">Latency: 1.8ms</p>
        </div>
        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">EF Core Migration</span>
          <div class="text-xl font-black text-purple-900">v20260823_Init</div>
          <p class="text-[11px] text-purple-700 font-semibold">Schema Synced</p>
        </div>
      </div>

      <div class="glass-card p-6 border-slate-200 space-y-4">
        <h3 class="text-sm font-black text-slate-900">Database Snapshot & Disaster Recovery</h3>
        <p class="text-xs text-slate-600">Trigger an encrypted point-in-time snapshot backup of all tables, spatial geometries, escrow ledgers, and audit logs.</p>
        <div class="flex items-center gap-3">
          <button onclick="window.triggerDbBackup()" class="btn-primary py-2.5 px-4 text-xs font-bold cursor-pointer flex items-center gap-2">
            <i class="fa-solid fa-database"></i> Trigger Backup Snapshot Now
          </button>
          <button onclick="window.exportPlatformData('json')" class="btn-secondary py-2.5 px-4 text-xs font-bold cursor-pointer flex items-center gap-2">
            <i class="fa-solid fa-download"></i> Download Full JSON Dump
          </button>
        </div>
      </div>
    </div>
  `}function bs(o){switch(o){case"superadmin":return"bg-rose-100 text-rose-800";case"admin":return"bg-purple-100 text-purple-800";case"farmer":return"bg-emerald-100 text-emerald-800";case"buyer":return"bg-blue-100 text-blue-800";case"driver":return"bg-amber-100 text-amber-800";case"agent":return"bg-teal-100 text-teal-800";default:return"bg-slate-100 text-slate-800"}}function gs(o){switch(o){case"superadmin":return"bg-rose-100 text-rose-900 border border-rose-300";case"admin":return"bg-purple-100 text-purple-900 border border-purple-300";case"farmer":return"bg-emerald-100 text-emerald-900 border border-emerald-300";case"buyer":return"bg-blue-100 text-blue-900 border border-blue-300";case"driver":return"bg-amber-100 text-amber-900 border border-amber-300";case"agent":return"bg-teal-100 text-teal-900 border border-teal-300";default:return"bg-slate-100 text-slate-800"}}function hs(o){switch(o){case"superadmin":return'<i class="fa-solid fa-crown text-rose-600"></i>';case"admin":return'<i class="fa-solid fa-shield-halved text-purple-600"></i>';case"farmer":return'<i class="fa-solid fa-seedling text-emerald-600"></i>';case"buyer":return'<i class="fa-solid fa-shopping-basket text-blue-600"></i>';case"driver":return'<i class="fa-solid fa-truck-fast text-amber-600"></i>';case"agent":return'<i class="fa-solid fa-users-gear text-teal-600"></i>';default:return'<i class="fa-solid fa-user"></i>'}}function xs(o){switch(o){case"USER_CRUD":return"bg-rose-100 text-rose-800";case"CONFIG":return"bg-purple-100 text-purple-800";case"FINANCE":return"bg-emerald-100 text-emerald-800";case"DISPUTE":return"bg-amber-100 text-amber-800";case"EMERGENCY":return"bg-red-100 text-red-800";case"IMPERSONATION":return"bg-blue-100 text-blue-800";default:return"bg-slate-100 text-slate-800"}}function tt(o){const e=ee[o],t=c.getBanners();return`
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-panorama text-emerald-600 mr-2"></i> ${e.tabBanners}
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              ${t.length} Total (${t.filter(a=>a.isActive).length} Active)
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Publish dynamic marketing announcements, harvest updates, cold chain incentives, and legal notices across Buyer, Farmer, and Driver portals.
          </p>
        </div>

        <button onclick="window.openCreateBannerModal()" class="btn-primary py-2.5 px-4 text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto">
          <i class="fa-solid fa-plus"></i> ${e.createBannerBtn}
        </button>
      </div>

      <!-- Banners Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${t.length===0?`
          <div class="col-span-full glass-card p-12 text-center text-slate-400 space-y-3">
            <i class="fa-solid fa-panorama text-4xl text-slate-300"></i>
            <p class="text-xs font-bold text-slate-600">No promotional banners configured yet.</p>
            <button onclick="window.openCreateBannerModal()" class="btn-primary py-2 px-4 text-xs font-bold cursor-pointer">
              Create First Banner
            </button>
          </div>
        `:t.map(a=>`
          <div class="glass-card rounded-3xl overflow-hidden border ${a.isActive?"border-emerald-200 ring-1 ring-emerald-500/20":"border-slate-200 opacity-75"} flex flex-col justify-between transition-all hover:shadow-lg">
            <!-- Visual Thumbnail Preview -->
            <div class="relative h-44 bg-gradient-to-r ${a.themeGradient||"from-emerald-900 via-teal-900 to-slate-900"} p-4 text-white flex flex-col justify-between overflow-hidden">
              <img src="${a.imageUrl||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"}" class="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div class="relative z-10 flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                  ${a.badgeText||"Promotion"}
                </span>
                <span class="px-2 py-0.5 rounded-md ${a.isActive?"bg-emerald-500 text-white":"bg-slate-700 text-slate-300"} text-[10px] font-bold">
                  ${a.isActive?"LIVE / ACTIVE":"PAUSED"}
                </span>
              </div>

              <div class="relative z-10 space-y-1">
                <h4 class="text-sm font-black text-white leading-snug line-clamp-2">${o==="am"&&a.titleAm?a.titleAm:a.title}</h4>
                <p class="text-[11px] text-white/80 line-clamp-2 font-medium">${o==="am"&&a.subtitleAm?a.subtitleAm:a.subtitle||""}</p>
              </div>
            </div>

            <!-- Details & Actions -->
            <div class="p-4 space-y-3.5 text-xs">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold">
                  <i class="fa-solid fa-users mr-1"></i> Audience: ${a.targetAudience}
                </span>
                <span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold">
                  <i class="fa-solid fa-location-dot mr-1"></i> Region: ${a.targetRegion||"All"}
                </span>
                <span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-mono">
                  Priority: ${a.priority}
                </span>
              </div>

              <div class="text-[11px] text-slate-500 flex items-center justify-between">
                <span>CTA: <strong>${a.ctaText||"Browse"}</strong> &rarr; <span class="font-mono text-emerald-700 font-bold">${a.ctaLink||"marketplace"}</span></span>
                <span>${a.createdAt?a.createdAt.split("T")[0]:""}</span>
              </div>

              <!-- Action Bar -->
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button onclick="window.toggleBannerStatus('${a.id}')" class="px-3 py-1.5 rounded-xl ${a.isActive?"bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200":"bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"} text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                  <i class="fa-solid ${a.isActive?"fa-pause":"fa-play"}"></i> ${a.isActive?"Pause":"Activate"}
                </button>

                <div class="flex items-center gap-1.5">
                  <button onclick="window.openEditBannerModal('${a.id}')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer" title="Edit Banner">
                    <i class="fa-solid fa-pen-to-square text-xs"></i>
                  </button>
                  <button onclick="window.deleteBanner('${a.id}')" class="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer" title="Delete Banner">
                    <i class="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `}function st(o){const e=ee[o],t=c.getListings();return`
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-gavel text-purple-600 mr-2"></i> ${e.tabModeration}
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold font-mono">
              ${t.length} Produce Posts
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Real-time listing moderation: Inspect price variance against regional benchmarks, edit crop specifications, manage stock, and delete non-compliant posts.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
            <i class="fa-solid fa-shield-check text-purple-600"></i> AI Price Anomaly Guard Active
          </span>
        </div>
      </div>

      <!-- Listings Table -->
      <div class="glass-card rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <tr>
                <th class="py-3.5 px-4">Produce Details</th>
                <th class="py-3.5 px-4">Farmer / Origin</th>
                <th class="py-3.5 px-4">Price / Kg</th>
                <th class="py-3.5 px-4">Stock (Kg)</th>
                <th class="py-3.5 px-4">Moderation</th>
                <th class="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${t.length===0?`
                <tr>
                  <td colspan="6" class="py-8 text-center text-slate-400">No active produce listings found.</td>
                </tr>
              `:t.map(a=>{const s=a.moderationStatus==="Flagged",i=a.marketBenchmarkPrice||50,n=Math.round((a.pricePerKg-i)/i*100);return`
                  <tr class="hover:bg-slate-50/60 transition-colors ${s?"bg-red-50/30":""}">
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-3">
                        <img src="${a.photos&&a.photos[0]?a.photos[0]:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200"}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0" />
                        <div>
                          <p class="font-bold text-slate-900 text-xs">${o==="am"&&a.nameAm?a.nameAm:a.productName}</p>
                          <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">${a.category}</span>
                            <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">${a.grade||"Grade 2"}</span>
                            ${a.isOrganic?'<span class="px-1.5 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold">Organic</span>':""}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="py-3.5 px-4">
                      <div>
                        <p class="font-bold text-slate-800 text-xs">${a.farmerName}</p>
                        <p class="text-[11px] text-slate-500 font-mono">${a.farmerPhone}</p>
                        <p class="text-[10px] text-slate-400">${a.region}</p>
                      </div>
                    </td>

                    <td class="py-3.5 px-4">
                      <div>
                        <span class="font-black text-slate-900 text-xs font-mono">${a.pricePerKg} ETB</span>
                        <div class="text-[10px] ${Math.abs(n)>30?"text-amber-700 font-bold":"text-slate-400"}">
                          ${n>0?`+${n}%`:`${n}%`} vs Avg (${i} ETB)
                        </div>
                      </div>
                    </td>

                    <td class="py-3.5 px-4 font-mono font-bold text-slate-800 text-xs">
                      ${a.qtyKg.toLocaleString()} kg
                      <span class="block text-[10px] text-slate-400 font-normal">Min: ${a.minOrderKg||50} kg</span>
                    </td>

                    <td class="py-3.5 px-4">
                      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${s?"bg-red-100 text-red-800 border border-red-200":"bg-emerald-100 text-emerald-800 border border-emerald-200"}">
                        <i class="fa-solid ${s?"fa-triangle-exclamation":"fa-circle-check"}"></i>
                        ${a.moderationStatus||"Approved"}
                      </span>
                    </td>

                    <td class="py-3.5 px-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button onclick="window.openAdminEditListingModal('${a.id}')" class="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1" title="Moderate Listing">
                          <i class="fa-solid fa-pen-to-square"></i> Moderate
                        </button>
                        <button onclick="window.flagListingAnomaly('${a.id}')" class="w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-colors cursor-pointer" title="Flag Price Anomaly">
                          <i class="fa-solid fa-flag text-xs"></i>
                        </button>
                        <button onclick="window.adminDeleteListing('${a.id}')" class="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer" title="Delete Listing">
                          <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `}function vs(o,e,t,a=c.getAnomalyAlerts(),s=c.getKycQueue(),i=c.getRegionalAnalytics(),n="disputes"){const r=ee[o],d=c.getBanners(),p=c.getListings();return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance & Legal Compliance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${o==="am"?"lang-am":""}">
            ${r.adminPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
            <i class="fa-solid fa-stamp text-emerald-600"></i> MOR Tax Compliant
          </span>
          <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
            <i class="fa-solid fa-gavel text-purple-600"></i> EABC Binding Arbitrator
          </span>
        </div>
      </div>

      <!-- Platform Analytics KPI Cards (GMV, Commission, Metric Tons, Middleman Savings, Tax) -->
      <section class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${r.statTotalVolume}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${e.totalTransactionVolumeEtb.toLocaleString()} <span class="text-xs font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">100% Telebirr Escrow</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${r.statPlatformRev}</span>
          <div class="text-xl sm:text-2xl font-black text-purple-900">
            ${e.totalPlatformCommissionEtb.toLocaleString()} <span class="text-xs font-bold text-purple-700">ETB</span>
          </div>
          <p class="text-[11px] text-purple-700 font-semibold">5% platform service</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${r.statVatRemitted}</span>
          <div class="text-xl sm:text-2xl font-black text-blue-900">
            ${(e.totalVatRemittedEtb||258.75).toLocaleString()} <span class="text-xs font-bold text-blue-700">ETB</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">15% VAT on platform fee</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${r.statWithholding}</span>
          <div class="text-xl sm:text-2xl font-black text-teal-900">
            ${(e.totalWithholdingReportedEtb||690).toLocaleString()} <span class="text-xs font-bold text-teal-700">ETB</span>
          </div>
          <p class="text-[11px] text-teal-700 font-semibold">Declared 2% to MOR</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${r.statActiveEscrow}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${e.activeEscrowHeldEtb.toLocaleString()} <span class="text-xs font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">Secured in Telebirr vault</p>
        </div>

      </section>

      <!-- Admin Tab Pills with RBAC status indicators -->
      ${(()=>{const l=c.hasEffectivePermission("RESOLVE_DISPUTES","admin"),b=c.hasEffectivePermission("MODERATE_LISTINGS","admin"),v=c.hasEffectivePermission("MANAGE_BANNERS","admin"),k=c.hasEffectivePermission("VIEW_ANOMALY_ALERTS","admin"),$=c.hasEffectivePermission("VERIFY_KYC","admin"),u=c.hasEffectivePermission("VIEW_TAX_COMPLIANCE","admin"),S=c.hasEffectivePermission("VIEW_REGIONAL_ANALYTICS","admin"),T=c.hasEffectivePermission("BROADCAST_SMS","admin");return`
          <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            <button onclick="window.setAdminTab('disputes')" class="cat-pill ${n==="disputes"?"active":""} ${l?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-scale-balanced"></i>
              <span>${r.resolveDisputeTitle} (${t.length})</span>
              ${l?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('moderation')" class="cat-pill ${n==="moderation"?"active":""} ${b?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-gavel text-purple-600"></i>
              <span>${r.tabModeration} (${p.length})</span>
              ${b?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('banners')" class="cat-pill ${n==="banners"?"active":""} ${v?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-panorama text-emerald-600"></i>
              <span>${r.tabBanners} (${d.length})</span>
              ${v?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${n==="anomalies"?"active":""} ${k?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
              <span>${r.anomalyScannerTitle} (${a.length})</span>
              ${k?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('kyc')" class="cat-pill ${n==="kyc"?"active":""} ${$?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-id-card"></i>
              <span>${r.kycQueueTitle} (${s.filter(w=>w.status==="Pending").length})</span>
              ${$?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('tax_compliance')" class="cat-pill ${n==="tax_compliance"?"active":""} ${u?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>Fiscal & Tax Invoicing</span>
              ${u?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('analytics')" class="cat-pill ${n==="analytics"?"active":""} ${S?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-chart-pie"></i>
              <span>${r.regionalAnalyticsTitle}</span>
              ${S?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('sms')" class="cat-pill ${n==="sms"?"active":""} ${T?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-tower-broadcast"></i>
              <span>${r.broadcastSmsTitle}</span>
              ${T?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
          </div>
        `})()}

      <!-- Tab Content: Moderation & Banners with RBAC Checks -->
      ${n==="moderation"?c.hasEffectivePermission("MODERATE_LISTINGS","admin")?st(o):`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የምርት ቁጥጥር ፈቃድ ተገድቧል":"Produce Moderation Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MODERATE_LISTINGS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      ${n==="banners"?c.hasEffectivePermission("MANAGE_BANNERS","admin")?tt(o):`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የባነር አስተዳደር ፈቃድ ተገድቧል":"Banner Management Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MANAGE_BANNERS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split with Legal Decrees) -->
      ${n==="disputes"?c.hasEffectivePermission("RESOLVE_DISPUTES","admin")?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-scale-balanced text-purple-600 mr-2"></i> ${r.resolveDisputeTitle}
            </h2>
            <span class="text-xs font-bold px-2.5 py-1 ${t.length>0?"bg-red-100 text-red-800":"bg-slate-100 text-slate-600"} rounded-full">
              ${t.length} Pending Disputes
            </span>
          </div>

          ${t.length===0?`
            <div class="glass-card p-8 text-center text-slate-500 text-xs">
              <i class="fa-solid fa-circle-check text-emerald-500 text-2xl mb-2 block"></i>
              No active escrow disputes. All transactions proceeding normally under standard contracts.
            </div>
          `:`
            <div class="space-y-4">
              ${t.map(l=>`
                <div class="glass-card p-6 border-l-4 border-red-500 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span class="text-xs font-bold text-red-700 uppercase">Arbitration Docket #${l.arbitrationDecreeNumber||"ARB-DEC-001"}</span>
                      <h3 class="text-base font-extrabold text-slate-900">${l.productName} (${l.qtyKg} kg · ${l.totalEtb.toLocaleString()} ETB)</h3>
                      <p class="text-xs text-slate-500">Claimant: <strong>${l.buyerName}</strong> vs Respondent: <strong>${l.farmerName}</strong></p>
                    </div>
                    <div class="flex items-center gap-2">
                      <button onclick="window.openArbitrationModal('${l.id}')" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs cursor-pointer">
                        <i class="fa-solid fa-gavel mr-1"></i> ${r.viewArbitrationBtn}
                      </button>
                      <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold">
                        <i class="fa-solid fa-lock mr-1"></i> Frozen (${l.totalEtb.toLocaleString()} ETB)
                      </span>
                    </div>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${r.disputeEvidence}:</span>
                      <p class="text-slate-800 leading-relaxed font-medium">"${l.disputeReason||"Delivered avocados were overripe and 20% bruised during transit from Hawassa."}"</p>
                      <div class="text-[11px] text-red-700 font-bold">Requested Remedy: ${l.requestedRefundPercent||50}% Partial Refund (${Math.round(l.totalEtb*((l.requestedRefundPercent||50)/100)).toLocaleString()} ETB)</div>
                    </div>

                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img src="${l.disputePhoto||l.pickupPhoto||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80"}" class="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs" />
                      <div class="space-y-1 text-slate-600">
                        <span class="font-bold text-slate-800 block">Inspection Pathology Image</span>
                        <p class="text-[11px]">Location: Bole Cold Storage Hub</p>
                        <p class="text-[11px]">Inspection Finding: 18.5% transit softening</p>
                      </div>
                    </div>
                  </div>

                  <!-- Legal Documents Reference Bar -->
                  <div class="flex items-center gap-2 text-xs">
                    <button onclick="window.openContractModal('${l.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> View Original Contract
                    </button>
                    <button onclick="window.openWaybillModal('${l.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> View Driver Waybill
                    </button>
                    <button onclick="window.openInvoiceModal('${l.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> View Sales Invoice
                    </button>
                  </div>

                  <!-- 3-Way Manual Arbitration Controls -->
                  <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <button onclick="window.adminResolveDispute('${l.id}', 'ReleaseToFarmer')" class="btn-primary text-xs py-2.5 px-4 cursor-pointer">
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${r.releaseFarmerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${l.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${r.refundBuyerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${l.id}', 'PartialSplit')" class="btn-secondary text-xs py-2.5 px-4 text-purple-700 border-purple-300 hover:bg-purple-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-scale-balanced"></i> ${r.splitFiftyFiftyBtn}
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የአለመግባባት ዳኝነት ፈቃድ ተገድቧል":"Dispute Arbitration Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'RESOLVE_DISPUTES' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 2: Fraud & Anomaly Detection Monitor -->
      ${n==="anomalies"?c.hasEffectivePermission("VIEW_ANOMALY_ALERTS","admin")?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> ${r.anomalyScannerTitle}
            </h2>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Active Heuristic Scanner
            </span>
          </div>

          <div class="space-y-3">
            ${a.map(l=>`
              <div class="glass-card p-5 border-l-4 ${l.severity==="High"?"border-red-600":l.severity==="Medium"?"border-amber-500":"border-blue-500"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase ${l.severity==="High"?"bg-red-100 text-red-800":l.severity==="Medium"?"bg-amber-100 text-amber-800":"bg-blue-100 text-blue-800"}">
                      ${l.severity} Severity
                    </span>
                    <h3 class="text-sm font-extrabold text-slate-900">${l.title}</h3>
                    <span class="text-[10px] text-slate-400 font-mono">[${l.type}]</span>
                  </div>
                  <p class="text-xs text-slate-600">${l.description}</p>
                  <p class="text-[10px] text-slate-400">Target: ${l.entityType} (${l.entityId.slice(0,8)}...) · Detected ${l.detectedAt}</p>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.handleDismissAnomaly('${l.id}')" class="btn-secondary text-xs py-1.5 px-3 cursor-pointer">
                    Dismiss
                  </button>
                  <button onclick="window.handleInvestigateAnomaly('${l.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                    Investigate
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የማጭበርበር ቅኝት ፈቃድ ተገድቧል":"Anomaly Scanner Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_ANOMALY_ALERTS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 3: Comprehensive Verification & Regulatory Audit Queue -->
      ${n==="kyc"?c.hasEffectivePermission("VERIFY_KYC","admin")?`
        <section class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${r.sideBySideInspectionTitle}
              </h2>
              <p class="text-xs text-slate-500">
                ${o==="am"?"የፋይዳ (Fayda) ብሔራዊ መታወቂያ፣ የግብር ከፋይ ቁጥር (TIN) እና የአርሶ አደሮች ሰነዶች ማረጋገጫ":"Inspect high-res Fayda ID cards, MOR TIN numbers, and field agent submissions."}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                🛡️ Fayda & MOR Compliance Console
              </span>
            </div>
          </div>

          <!-- Side-by-Side Document Inspection Cards -->
          <div class="space-y-6">
            ${c.getVerificationQueue().map(l=>`
              <div class="glass-card p-6 border-l-4 ${l.verificationStatus==="Approved"?"border-emerald-500":l.verificationStatus==="Rejected"?"border-red-500":"border-amber-500"} space-y-4">
                
                <!-- Card Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${l.userRole==="Driver"?"bg-amber-100 text-amber-800":l.userRole==="Farmer"?"bg-emerald-100 text-emerald-800":"bg-blue-100 text-blue-800"}">
                        ${l.userRole}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        ${l.registrationMethod==="Agent"?"🧑‍🌾 Assisted by "+(l.registeredByAgentName||"Field Agent"):"💻 Self Registered"}
                      </span>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900 mt-1">
                      ${l.userName} ${l.userNameAm?`<span class="text-sm font-normal text-slate-500">(${l.userNameAm})</span>`:""}
                    </h3>
                    <p class="text-xs text-slate-500 font-mono">${l.phone} · 📍 ${l.region}</p>
                  </div>

                  <div class="flex flex-col sm:items-end gap-1">
                    <span class="px-3 py-1 rounded-full text-xs font-extrabold ${l.verificationStatus==="Approved"?"bg-emerald-100 text-emerald-800":l.verificationStatus==="Rejected"?"bg-red-100 text-red-800":"bg-amber-100 text-amber-800"}">
                      ${l.verificationStatus==="Approved"?"✅ APPROVED":l.verificationStatus==="Rejected"?"❌ REJECTED":"⏳ UNDER REVIEW"}
                    </span>
                    <span class="text-[10px] text-slate-400">Registered: ${l.registeredAt}</span>
                  </div>
                </div>

                <!-- Verification Data & Documents Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  <!-- Column 1: Identity & Tax Data -->
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div class="font-bold text-slate-800 border-b border-slate-200 pb-1">
                      📋 ${o==="am"?"የመታወቂያ እና የታክስ መረጃ":"Identity & Tax Record"}
                    </div>
                    <div>
                      <span class="text-slate-500 block">${r.tinNumberLabel}:</span>
                      <strong class="font-mono text-emerald-800 text-sm">${l.tinNumber||"0099881122"}</strong>
                    </div>
                    ${l.documents.map(b=>`
                      <div class="pt-1">
                        <span class="text-slate-500 block">${b.documentType}:</span>
                        <strong class="font-mono text-slate-800">${b.documentNumber}</strong>
                      </div>
                    `).join("")}
                    ${l.rejectionReason?`
                      <div class="p-2 rounded bg-red-50 text-red-800 text-[11px] font-medium border border-red-200 mt-2">
                        <strong>${r.rejectionReasonLabel}:</strong> ${l.rejectionReason}
                      </div>
                    `:""}
                  </div>

                  <!-- Column 2 & 3: High-Res Document Photo Previews -->
                  <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${l.documents.flatMap(b=>[b.frontImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">🪪 ${b.documentType} (Front)</div>
                          <img src="${b.frontImageUrl}" alt="Document Front" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${b.frontImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      `:"",b.backImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">📜 ${b.documentType} (Back)</div>
                          <img src="${b.backImageUrl}" alt="Document Back" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${b.backImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      `:""]).join("")||`
                      <div class="p-6 text-center text-slate-400 col-span-2">No uploaded photos attached.</div>
                    `}
                  </div>

                </div>

                <!-- Action Bar -->
                <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div class="flex items-center gap-2 text-xs text-slate-500">
                    <span>💬</span>
                    <span>${r.sendSmsNoticeToggle}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button 
                      onclick="window.adminReviewVerification('${l.userId}', 'Reject')" 
                      class="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
                    >
                      <i class="fa-solid fa-xmark mr-1"></i> ${r.rejectVerificationAction}
                    </button>
                    
                    <button 
                      onclick="window.adminReviewVerification('${l.userId}', 'Approve')" 
                      class="btn-primary text-xs py-2 px-5 cursor-pointer bg-emerald-700 hover:bg-emerald-800"
                    >
                      <i class="fa-solid fa-check mr-1"></i> ${r.approveVerificationAction}
                    </button>
                  </div>
                </div>

              </div>
            `).join("")}
          </div>
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የKYC ማረጋገጫ ፈቃድ ተገድቧል":"KYC Verification Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VERIFY_KYC' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 4: Fiscal & Tax Invoicing Registry -->
      ${n==="tax_compliance"?c.hasEffectivePermission("VIEW_TAX_COMPLIANCE","admin")?`
        <section class="space-y-6">
          <div class="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🇪🇹</span>
                <div>
                  <h3 class="text-base font-extrabold text-white">MINISTRY OF REVENUES (MOR) FISCAL SETTLEMENT CONSOLE</h3>
                  <p class="text-xs text-emerald-300">Automated Tax Withholding & Agricultural Exemption Ledger</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                FY 2026 Audit Ready
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div class="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-slate-300">Gross Agricultural Turnover</span>
                <div class="text-xl font-black text-white">${e.totalTransactionVolumeEtb.toLocaleString()} ETB</div>
                <small class="text-emerald-300">100% Tax-Exempt under Art. 979/2016</small>
              </div>

              <div class="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-slate-300">15% VAT on Platform Service (5%)</span>
                <div class="text-xl font-black text-white">${(e.totalVatRemittedEtb||258.75).toFixed(2)} ETB</div>
                <small class="text-sky-300">Remitted Monthly to MOR Account</small>
              </div>

              <div class="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-slate-300">2% Withholding on Commercial Buyers</span>
                <div class="text-xl font-black text-white">${(e.totalWithholdingReportedEtb||690).toFixed(2)} ETB</div>
                <small class="text-amber-300">Withholding Vouchers Auto-Generated</small>
              </div>
            </div>
          </div>

          <!-- Sample Invoices Audit Table -->
          <div class="glass-card p-6 space-y-4">
            <h3 class="text-base font-bold text-slate-900">
              <i class="fa-solid fa-receipt text-emerald-600 mr-2"></i> Official Electronic Tax Invoices Log
            </h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-400 font-bold">
                    <th class="py-2.5">Invoice #</th>
                    <th class="py-2.5">Buyer (TIN)</th>
                    <th class="py-2.5">Farmer (TIN)</th>
                    <th class="py-2.5">Total (ETB)</th>
                    <th class="py-2.5">VAT Remitted</th>
                    <th class="py-2.5">Withholding</th>
                    <th class="py-2.5">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${c.getOrders().map(l=>`
                    <tr>
                      <td class="py-3 font-mono font-bold text-slate-900">${l.invoiceNumber||"ET-INV-001"}</td>
                      <td class="py-3 font-bold">${l.buyerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-ET-9912001</span></td>
                      <td class="py-3 font-bold">${l.farmerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-FARM-882910</span></td>
                      <td class="py-3 font-bold text-emerald-800">${l.totalEtb.toLocaleString()} ETB</td>
                      <td class="py-3 text-slate-600">${(l.platformCut*.15).toFixed(2)} ETB</td>
                      <td class="py-3 text-slate-600">${(l.totalEtb*.02).toFixed(2)} ETB</td>
                      <td class="py-3">
                        <button onclick="window.openInvoiceModal('${l.id}')" class="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[11px] cursor-pointer">
                          <i class="fa-solid fa-eye mr-1"></i> View & Print
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የግብር ሰነዶች ፈቃድ ተገድቧል":"Fiscal & Tax Compliance Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_TAX_COMPLIANCE' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 5: Regional Analytics & EABC Impact Dashboard -->
      ${n==="analytics"?c.hasEffectivePermission("VIEW_REGIONAL_ANALYTICS","admin")?`
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i> ${r.regionalAnalyticsTitle}
            </h2>
            <span class="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              EABC Regional Sourcing Impact
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${i.map(l=>`
              <div class="glass-card p-5 space-y-3 border-t-4 border-emerald-600">
                <div class="text-xs font-extrabold text-slate-500 uppercase">${l.region}</div>
                <div class="text-xl font-black text-slate-900">${(l.totalGmvEtb/1e6).toFixed(2)}M <span class="text-xs font-bold text-emerald-700">ETB GMV</span></div>
                
                <div class="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div class="flex justify-between">
                    <span>Smallholders:</span>
                    <strong class="text-slate-900">${l.smallholdersCount.toLocaleString()}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Volume Traded:</span>
                    <strong class="text-slate-900">${l.volumeMetricTons} MT</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Top Commodity:</span>
                    <strong class="text-emerald-800">${l.topCrop}</strong>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የክልላዊ ትንታኔ ፈቃድ ተገድቧል":"Regional Analytics Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_REGIONAL_ANALYTICS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 6: Broadcast Bilingual SMS (Twilio) -->
      ${n==="sms"?c.hasEffectivePermission("BROADCAST_SMS","admin")?`
        <section class="glass-card p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
              <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${r.broadcastSmsTitle}</h2>
              <p class="text-xs text-slate-500">Send mass regulatory alerts, weather advisories, or price updates to all smallholders.</p>
            </div>
          </div>

          <form onsubmit="window.handleAdminBroadcastSms(event)" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Target Audience</label>
              <select id="smsTargetRole" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white">
                <option value="farmer">All Registered Farmers (15,400+)</option>
                <option value="driver">All Partner Drivers (1,250+)</option>
                <option value="buyer">All Wholesale Buyers (3,800+)</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Message Body (English)</label>
              <textarea id="smsMsgEn" required rows="2" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. ECX Advisory: Tomato prices up 15% in Addis Ababa. Transport subsidies active."></textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">የመልእክት ዝርዝር (በአማርኛ)</label>
              <textarea id="smsMsgAm" required rows="2" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="ለምሳሌ: የገበያ መረጃ: በአዲስ አበባ የቲማቲም ዋጋ 15% ጨምሯል። የትራንስፖርት ድጎማ ገቢር ሆኗል።"></textarea>
            </div>

            <button type="submit" class="btn-primary w-full py-3 text-xs bg-purple-700 hover:bg-purple-800 font-extrabold shadow-md cursor-pointer">
              <i class="fa-solid fa-paper-plane"></i> ${r.sendSmsBtn}
            </button>
          </form>
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${o==="am"?"የኤስኤምኤስ ስርጭት ፈቃድ ተገድቧል":"SMS Broadcast Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'BROADCAST_SMS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

    </div>
  `}class ys{constructor(e="en"){f(this,"currentLang","en");f(this,"activeTab","register");f(this,"ussdPhone","+251944556677");f(this,"ussdInput","*990#");f(this,"ussdScreenText",`Welcome to Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit`);this.currentLang=e}setLanguage(e){this.currentLang=e}render(){const e=ee[this.currentLang];c.getCurrentUser();const t=c.getAgentRegisteredFarmers(),a=t.filter(i=>i.status==="Approved").length,s=t.length*250;return`
      <div class="agent-view" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%); border-radius: 16px; padding: 1.75rem 2rem; color: white; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(27, 67, 50, 0.3); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-bottom: 8px;">
              <span>🌾</span> ${this.currentLang==="am"?"የማህበረሰብ ግብርና ድጋፍ ኤጀንት":"Community Agricultural Extension Officer"}
            </div>
            <h1 style="margin: 0 0 6px 0; font-size: 1.6rem; font-weight: 800; color: #ffffff;">
              ${e.agentPortalTitle}
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: #d8f3dc; max-width: 600px; line-height: 1.4;">
              ${this.currentLang==="am"?"ስማርት ፎን ለሌላቸው አነስተኛ አርሶ አደሮች መታወቂያቸውን እና ሰነዳቸውን በመመዝገብ በቀጥታ ወደ ገበያው እንዲገቡ ያግዙ።":"Assist offline smallholder farmers in your Woreda by verifying physical Fayda IDs and onboarding their crops to national buyers."}
            </p>
          </div>

          <div style="display: flex; gap: 16px; background: rgba(0,0,0,0.2); padding: 12px 18px; border-radius: 12px; backdrop-filter: blur(8px);">
            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.2); padding-right: 16px;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #52b788;">${t.length}</div>
              <div style="font-size: 0.75rem; color: #d8f3dc;">${this.currentLang==="am"?"የተመዘገቡ አርሶ አደሮች":"Farmers Enrolled"}</div>
            </div>
            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.2); padding-right: 16px;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #74c69d;">${a}</div>
              <div style="font-size: 0.75rem; color: #d8f3dc;">${this.currentLang==="am"?"የጸደቁ መለያዎች":"Approved & Active"}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #ffd166;">${s.toLocaleString()} ETB</div>
              <div style="font-size: 0.75rem; color: #d8f3dc;">${e.agentCommissionEarned}</div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 10px; border-bottom: 2px solid var(--color-border); margin-bottom: 1.75rem; padding-bottom: 2px;">
          <button 
            onclick="window.switchAgentTab('register')" 
            class="btn" 
            style="border-radius: 8px 8px 0 0; font-weight: 600; padding: 0.6rem 1.2rem; background: ${this.activeTab==="register"?"#2d6a4f":"transparent"}; color: ${this.activeTab==="register"?"white":"var(--color-text-secondary)"};"
          >
            ✍️ ${this.currentLang==="am"?"አዲስ አርሶ አደር መዝግብ":"Register Smallholder"}
          </button>
          <button 
            onclick="window.switchAgentTab('roster')" 
            class="btn" 
            style="border-radius: 8px 8px 0 0; font-weight: 600; padding: 0.6rem 1.2rem; background: ${this.activeTab==="roster"?"#2d6a4f":"transparent"}; color: ${this.activeTab==="roster"?"white":"var(--color-text-secondary)"};"
          >
            📋 ${e.agentRosterTitle} (${t.length})
          </button>
          <button 
            onclick="window.switchAgentTab('ussd_sim')" 
            class="btn" 
            style="border-radius: 8px 8px 0 0; font-weight: 600; padding: 0.6rem 1.2rem; background: ${this.activeTab==="ussd_sim"?"#2d6a4f":"transparent"}; color: ${this.activeTab==="ussd_sim"?"white":"var(--color-text-secondary)"};"
          >
            📱 ${this.currentLang==="am"?"የUSSD / ከመስመር ውጭ (Offline) ማስመሰያ":"USSD / Offline Simulation"}
          </button>
        </div>

        <!-- Tab Contents with RBAC Checks -->
        ${this.activeTab==="register"?c.hasEffectivePermission("FIELD_AGENT_ONBOARDING","agent")?this.renderRegisterTab():`
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang==="am"?"የአርሶ አደር ምዝገባ ፈቃድ ተገድቧል":"Agent Onboarding Restricted"}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'FIELD_AGENT_ONBOARDING' permission. Please contact a Super Administrator.</p>
          </div>
        `:""}
        ${this.activeTab==="roster"?this.renderRosterTab(t):""}
        ${this.activeTab==="ussd_sim"?c.hasEffectivePermission("EXECUTE_USSD","agent")?this.renderUssdTab():`
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang==="am"?"የUSSD ክዋኔ ፈቃድ ተገድቧል":"USSD Execution Restricted"}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'EXECUTE_USSD' permission. Please contact a Super Administrator.</p>
          </div>
        `:""}

      </div>
    `}renderRegisterTab(){const e=ee[this.currentLang];return`
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 2rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--color-text-primary);">
              🧑‍🌾 ${this.currentLang==="am"?"የገበሬው መረጃ እና የሰነድ ምዝገባ (On-Behalf Registration)":"Assisted Smallholder Farmer Onboarding"}
            </h3>
            <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: var(--color-text-secondary);">
              ${this.currentLang==="am"?"የአርሶ አደሩን ሙሉ ስም፣ ስልክ ቁጥር እና የፋይዳ መታወቂያ ፎቶ አንስተው ያስገቡ።":"Enter the farmer profile details and capture photos of their physical Fayda / Kebele documents."}
            </p>
          </div>
          <span style="background: rgba(45, 106, 79, 0.1); color: #2d6a4f; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
            📍 Oromia / East Shewa Zone
          </span>
        </div>

        <form id="agentFarmerForm" onsubmit="window.handleAgentRegisterSubmit(event)">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;">
            
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang==="am"?"የአርሶ አደሩ ሙሉ ስም (እንግሊዝኛ)":"Farmer Full Name (English)"} *
              </label>
              <input type="text" id="agFarmerName" required placeholder="e.g. Girma Wondimu" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang==="am"?"ሙሉ ስም (በአማርኛ / አፋን ኦሮሞ)":"Farmer Name (Amharic / Afaan Oromo)"}
              </label>
              <input type="text" id="agFarmerNameAm" placeholder="ለምሳሌ: ግርማ ወንዲሙ" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang==="am"?"ሞባይል ስልክ ቁጥር":"Mobile Phone Number"} *
              </label>
              <input type="tel" id="agFarmerPhone" required placeholder="+251 944 556 677" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
              <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">
                ${this.currentLang==="am"?"የማረጋገጫ እና የትዕዛዝ ኤስኤምኤስ (SMS) የሚላክበት":"Receives SMS order alerts & Twilio notifications"}
              </div>
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang==="am"?"ክልል እና ወረዳ":"Region & Woreda"} *
              </label>
              <select id="agFarmerRegion" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);">
                <option value="Oromia (Bishoftu / Ada'a)">Oromia (Bishoftu / Ada'a)</option>
                <option value="Oromia (Mojo / Lume)">Oromia (Mojo / Lume)</option>
                <option value="Amhara (Debre Berhan)">Amhara (Debre Berhan)</option>
                <option value="Amhara (Bahar Dar / Gojjam)">Amhara (Bahar Dar / Gojjam)</option>
                <option value="Sidama (Hawassa)">Sidama (Hawassa)</option>
                <option value="SNNPR (Gedeo)">SNNPR (Gedeo)</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang==="am"?"ቀበሌ / መንደር":"Kebele / Village"}
              </label>
              <input type="text" id="agFarmerKebele" placeholder="e.g. Ada'a Kebele 04" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang==="am"?"ዋና ዋና ሰብሎች":"Primary Crops Produced"}
              </label>
              <input type="text" id="agFarmerCrop" placeholder="e.g. Magna Teff, Tomatoes, Onions" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${e.faydaIdLabel} *
              </label>
              <input type="text" id="agFarmerFayda" placeholder="FAN-8812-4091-2810" value="FAN-8812-4091-2810" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${e.tinNumberLabel} (${this.currentLang==="am"?"ካላቸው":"Optional"})
              </label>
              <input type="text" id="agFarmerTin" placeholder="0099881122" value="0099881122" maxlength="10" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; background: var(--color-bg);" />
            </div>

          </div>

          <!-- Document Capture Section -->
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.25rem; margin-bottom: 20px;">
            <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--color-text-primary); display: flex; align-items: center; gap: 8px;">
              <span>📸</span> ${this.currentLang==="am"?"የሰነዶች ፎቶ ማንሻ (Physical Document Scanner)":"Field Camera Physical Document Scanner"}
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div style="border: 2px dashed #2d6a4f; border-radius: 10px; padding: 12px; text-align: center; background: rgba(45, 106, 79, 0.03);">
                <div style="font-size: 0.8rem; font-weight: 600; margin-bottom: 6px;">
                  🪪 ${this.currentLang==="am"?"የፋይዳ ካርድ የፊት ገጽ":"Fayda ID Front"}
                </div>
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80" alt="Fayda Front" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
                <button type="button" onclick="alert('Camera triggered: Document scanned & cropped with auto-OCR!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px; width: 100%;">
                  📷 ${this.currentLang==="am"?"ካሜራ ክፈት":"Capture Photo"}
                </button>
              </div>

              <div style="border: 2px dashed #2d6a4f; border-radius: 10px; padding: 12px; text-align: center; background: rgba(45, 106, 79, 0.03);">
                <div style="font-size: 0.8rem; font-weight: 600; margin-bottom: 6px;">
                  📜 ${this.currentLang==="am"?"የቀበሌ / የይዞታ ማረጋገጫ":"Kebele / Land Certificate"}
                </div>
                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80" alt="Kebele Doc" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
                <button type="button" onclick="alert('Camera triggered: Kebele certificate uploaded!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px; width: 100%;">
                  📷 ${this.currentLang==="am"?"ካሜራ ክፈት":"Capture Photo"}
                </button>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button type="button" onclick="document.getElementById('agentFarmerForm').reset()" class="btn btn-secondary" style="padding: 0.75rem 1.5rem;">
              ${this.currentLang==="am"?"አጽዳ":"Reset Form"}
            </button>
            <button type="submit" class="btn btn-primary" style="padding: 0.75rem 2rem; background: #1b4332; font-weight: 700; font-size: 1rem;">
              🚀 ${this.currentLang==="am"?"ገበሬውን መዝግብ እና ሰነድ ላክ":"Enroll Farmer & Submit for Verification"}
            </button>
          </div>
        </form>
      </div>
    `}renderRosterTab(e){const t=ee[this.currentLang];return`
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary);">
            📋 ${t.agentRosterTitle}
          </h3>
          <button onclick="window.switchAgentTab('register')" class="btn btn-primary" style="font-size: 0.85rem; padding: 0.4rem 1rem; background: #2d6a4f;">
            + ${t.agentOnboardFarmerBtn}
          </button>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            <thead>
              <tr style="background: var(--color-bg); border-bottom: 2px solid var(--color-border); text-align: left;">
                <th style="padding: 10px 12px;">${this.currentLang==="am"?"አርሶ አደር":"Farmer"}</th>
                <th style="padding: 10px 12px;">${this.currentLang==="am"?"ስልክ":"Phone"}</th>
                <th style="padding: 10px 12px;">${this.currentLang==="am"?"አካባቢ / ቀበሌ":"Location"}</th>
                <th style="padding: 10px 12px;">${this.currentLang==="am"?"ዋና ሰብል":"Crops"}</th>
                <th style="padding: 10px 12px;">${this.currentLang==="am"?"የፋይዳ መለያ":"Fayda ID"}</th>
                <th style="padding: 10px 12px;">${t.verificationStatusLabel}</th>
                <th style="padding: 10px 12px; text-align: right;">${this.currentLang==="am"?"ድርጊት":"Actions"}</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(a=>`
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 12px; font-weight: 600; color: var(--color-text-primary);">
                    <div>${a.name}</div>
                    ${a.nameAm?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${a.nameAm}</div>`:""}
                  </td>
                  <td style="padding: 12px; font-family: monospace; color: var(--color-text-secondary);">${a.phone}</td>
                  <td style="padding: 12px; color: var(--color-text-secondary);">
                    <div>${a.region}</div>
                    ${a.kebele?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${a.kebele}</div>`:""}
                  </td>
                  <td style="padding: 12px;">
                    <span style="background: rgba(45, 106, 79, 0.1); color: #2d6a4f; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">
                      ${a.primaryCrop||"Mixed Crops"}
                    </span>
                  </td>
                  <td style="padding: 12px; font-family: monospace; font-size: 0.85rem;">${a.faydaId||"N/A"}</td>
                  <td style="padding: 12px;">
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; background: ${a.status==="Approved"?"rgba(16,185,129,0.15)":"rgba(234,179,8,0.15)"}; color: ${a.status==="Approved"?"#047857":"#b45309"};">
                      ${a.status==="Approved"?"✅ Approved":"⏳ Under Review"}
                    </span>
                  </td>
                  <td style="padding: 12px; text-align: right;">
                    <button onclick="window.sendAgentFarmerSms('${a.phone}')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px;">
                      💬 SMS Alert
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}renderUssdTab(){return`
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
        
        <!-- USSD Feature Phone Simulator -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; box-shadow: var(--shadow-sm);">
          <h3 style="margin: 0 0 8px 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary);">
            📟 ${this.currentLang==="am"?"የገጠር USSD / Feature Phone ማስመሰያ":"Rural USSD Feature Phone Simulator"}
          </h3>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary);">
            ${this.currentLang==="am"?"ስማርት ፎን ለሌላቸው አርሶ አደሮች በ *990# እና በኤስኤምኤስ የሚሰራውን አገልግሎት ይሞክሩ።":"Test low-tech USSD menus for farmers on 2G feature phones without internet access."}
          </p>

          <!-- Virtual Feature Phone Screen -->
          <div style="background: #2b2d42; border: 4px solid #1f2022; border-radius: 16px; padding: 16px; color: #a7c957; font-family: monospace; min-height: 180px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.6); margin-bottom: 16px;">
            <div style="font-size: 0.75rem; color: #8d99ae; border-bottom: 1px solid #3d405b; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between;">
              <span>📶 EthioTelecom 2G</span>
              <span>🔋 92%</span>
            </div>
            <pre style="margin: 0; font-size: 0.9rem; white-space: pre-wrap; font-family: monospace; line-height: 1.4;" id="ussdDisplayScreen">${this.ussdScreenText}</pre>
          </div>

          <!-- Phone Keypad Input -->
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <input 
              type="text" 
              id="ussdCodeInput" 
              value="${this.ussdInput}" 
              placeholder="e.g. 1 or *990#" 
              style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; font-size: 1rem; background: var(--color-bg);"
            />
            <button onclick="window.sendUssdCommand()" class="btn btn-primary" style="background: #2d6a4f; padding: 0.75rem 1.25rem;">
              📞 Send
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
            <button onclick="window.setUssdInput('*990#')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">*990# (Main)</button>
            <button onclick="window.setUssdInput('1')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">1 (Register)</button>
            <button onclick="window.setUssdInput('2')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">2 (Fayda)</button>
            <button onclick="window.setUssdInput('3')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">3 (Escrow)</button>
          </div>
        </div>

        <!-- Twilio Inbound SMS Gateway Simulator -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; box-shadow: var(--shadow-sm);">
          <h3 style="margin: 0 0 8px 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary);">
            💬 ${this.currentLang==="am"?"የTwilio ኤስኤምኤስ (SMS) ጌትዌይ ማስመሰያ":"Twilio SMS Command Gateway"}
          </h3>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary);">
            ${this.currentLang==="am"?"አርሶ አደሩ በኤስኤምኤስ ምርት ሲመዘግብ ወይም ትዕዛዝ ሲያረጋግጥ በራስ-ሰር የሚሰራውን ሲስተም ይመልከቱ።":"Smallholders can create listings and confirm deliveries via simple 1-line SMS texts to 8055."}
          </p>

          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 12px; margin-bottom: 12px;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 4px;">SAMPLE INBOUND SMS COMMANDS:</div>
            <div style="font-family: monospace; font-size: 0.8rem; color: #2d6a4f; margin-bottom: 4px;">• LIST Tomato 2000 45 Bishoftu</div>
            <div style="font-family: monospace; font-size: 0.8rem; color: #2d6a4f; margin-bottom: 4px;">• FAYDA FAN-8812-4091-2810</div>
            <div style="font-family: monospace; font-size: 0.8rem; color: #2d6a4f;">• CONFIRM ORDER-0001</div>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px;">Inbound SMS Message Body:</label>
            <input type="text" id="inboundSmsBody" value="FAYDA FAN-8812-4091-2810" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; background: var(--color-bg);" />
          </div>

          <button onclick="window.sendInboundSms()" class="btn btn-primary" style="width: 100%; background: #1b4332; font-weight: 700; padding: 0.75rem;">
            📨 Simulate Inbound Farmer SMS
          </button>
        </div>

      </div>
    `}switchTab(e){this.activeTab=e}setUssdInput(e){this.ussdInput=e;const t=document.getElementById("ussdCodeInput");t&&(t.value=e)}async executeUssd(){const e=document.getElementById("ussdCodeInput"),t=(e==null?void 0:e.value)||this.ussdInput,a=await c.sendInboundUssdSimulation(this.ussdPhone,t);this.ussdScreenText=a;const s=document.getElementById("ussdDisplayScreen");s&&(s.innerText=a)}}class ws{constructor(e="en"){f(this,"currentLang","en");f(this,"isOpen",!1);f(this,"currentStep",1);f(this,"faydaNumber","");f(this,"tinNumber","");f(this,"kebeleNumber","");f(this,"frontImageUrl","https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80");f(this,"backImageUrl","https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80");this.currentLang=e}setLanguage(e){this.currentLang=e}open(e=1){this.isOpen=!0,this.currentStep=e;const t=c.getCurrentUser();t!=null&&t.tinNumber&&(this.tinNumber=t.tinNumber),this.render()}close(){this.isOpen=!1;const e=document.getElementById("verificationWizardModal");e&&(e.innerHTML="")}render(){const e=document.getElementById("verificationWizardModal");if(!e||!this.isOpen)return;const t=ee[this.currentLang],a=c.getCurrentUser(),s=c.getVerificationStatus();e.innerHTML=`
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeVerificationWizard()">
        <div class="modal-content" style="max-width: 680px; width: 95%; max-height: 90vh; overflow-y: auto; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); padding: 0;">
          
          <!-- Modal Header -->
          <div style="background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%); padding: 1.5rem 1.75rem; border-top-left-radius: 16px; border-top-right-radius: 16px; color: white; display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 1.3rem;">🛡️</span>
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #ffffff;">${t.verifyAccountTitle}</h3>
              </div>
              <p style="margin: 0; font-size: 0.85rem; color: #d8f3dc; line-height: 1.4;">
                ${this.currentLang==="am"?"የብሔራዊ ፋይዳ መታወቂያ እና የታክስ መለያ (TIN) ማረጋገጫ":"National Fayda ID & Taxpayer ID Compliance Verification"}
              </p>
            </div>
            <button onclick="window.closeVerificationWizard()" style="background: rgba(255,255,255,0.15); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">✕</button>
          </div>

          <!-- Status Indicator Banner -->
          <div style="padding: 1rem 1.75rem; background: ${this.getStatusBgColor(s)}; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.2rem;">${this.getStatusIcon(s)}</span>
              <div>
                <div style="font-size: 0.85rem; font-weight: 600; color: ${this.getStatusTextColor(s)};">
                  ${t.verificationStatusLabel}: <strong>${this.formatStatus(s)}</strong>
                </div>
                ${a!=null&&a.rejectionReason?`<div style="font-size: 0.8rem; color: #b91c1c; margin-top: 2px;"><strong>${t.rejectionReasonLabel}:</strong> ${a.rejectionReason}</div>`:""}
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); background: var(--color-bg); padding: 4px 8px; border-radius: 6px;">
              ${(a==null?void 0:a.registrationMethod)==="Agent"?"🧑‍🌾 "+(this.currentLang==="am"?"በኤጀንት የተመዘገበ":"Agent Registered"):"💻 "+(this.currentLang==="am"?"የራስ ምዝገባ":"Direct Registration")}
            </div>
          </div>

          <!-- Stepper Navigation -->
          <div style="display: flex; border-bottom: 1px solid var(--color-border); padding: 0.75rem 1.75rem; gap: 12px; background: rgba(0,0,0,0.02);">
            <div onclick="window.setWizardStep(1)" style="flex: 1; text-align: center; cursor: pointer; padding: 6px; border-bottom: 2px solid ${this.currentStep===1?"#2d6a4f":"transparent"};">
              <span style="font-size: 0.85rem; font-weight: ${this.currentStep===1?"700":"500"}; color: ${this.currentStep===1?"#2d6a4f":"var(--color-text-muted)"};">
                1. ${this.currentLang==="am"?"የፋይዳ መታወቂያ":"Fayda ID"}
              </span>
            </div>
            <div onclick="window.setWizardStep(2)" style="flex: 1; text-align: center; cursor: pointer; padding: 6px; border-bottom: 2px solid ${this.currentStep===2?"#2d6a4f":"transparent"};">
              <span style="font-size: 0.85rem; font-weight: ${this.currentStep===2?"700":"500"}; color: ${this.currentStep===2?"#2d6a4f":"var(--color-text-muted)"};">
                2. ${this.currentLang==="am"?"የታክስ ቁጥር (TIN)":"TIN & Business"}
              </span>
            </div>
            <div onclick="window.setWizardStep(3)" style="flex: 1; text-align: center; cursor: pointer; padding: 6px; border-bottom: 2px solid ${this.currentStep===3?"#2d6a4f":"transparent"};">
              <span style="font-size: 0.85rem; font-weight: ${this.currentStep===3?"700":"500"}; color: ${this.currentStep===3?"#2d6a4f":"var(--color-text-muted)"};">
                3. ${this.currentLang==="am"?"ፎቶ እና ማረጋገጫ":"Photos & Submit"}
              </span>
            </div>
          </div>

          <!-- Wizard Body -->
          <div style="padding: 1.5rem 1.75rem;">
            ${this.renderStepContent()}
          </div>

          <!-- Modal Footer -->
          <div style="padding: 1rem 1.75rem; border-top: 1px solid var(--color-border); background: var(--color-surface-hover); display: flex; justify-content: space-between; align-items: center; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
            <button onclick="window.closeVerificationWizard()" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
              ${this.currentLang==="am"?"ዝጋ":"Close"}
            </button>
            <div style="display: flex; gap: 8px;">
              ${this.currentStep>1?`
                <button onclick="window.setWizardStep(${this.currentStep-1})" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                  ← ${this.currentLang==="am"?"ወደ ኋላ":"Back"}
                </button>
              `:""}
              ${this.currentStep<3?`
                <button onclick="window.setWizardStep(${this.currentStep+1})" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.9rem; background: #2d6a4f;">
                  ${this.currentLang==="am"?"ቀጣይ":"Next Step"} →
                </button>
              `:`
                <button onclick="window.submitVerificationForm()" class="btn btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.9rem; background: #1b4332; font-weight: 700;">
                  🚀 ${this.currentLang==="am"?"ሰነዶቹን ላክ":"Submit for Review"}
                </button>
              `}
            </div>
          </div>

        </div>
      </div>
    `}renderStepContent(){const e=ee[this.currentLang],t=c.getCurrentUser();return this.currentStep===1?`
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text-primary);">
            🪪 ${e.faydaIdLabel}
          </h4>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.4;">
            ${this.currentLang==="am"?"የኢትዮጵያ ብሔራዊ መታወቂያ (Fayda FAN) ቁጥርዎን ያስገቡ። ለምሳሌ: FAN-8812-4091-2810":"Enter your 16-digit Ethiopian National ID (Fayda FAN). Format: FAN-XXXX-XXXX-XXXX"}
          </p>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${e.faydaIdLabel} *
            </label>
            <input 
              type="text" 
              id="wizardFaydaInput" 
              value="${this.faydaNumber||(t==null?void 0:t.kycDocumentNumber)||"FAN-8812-4091-2810"}" 
              placeholder="FAN-8812-4091-2810"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; font-size: 1rem; background: var(--color-bg);"
              oninput="window.updateWizardField('fayda', this.value)"
            />
            <div style="margin-top: 6px; font-size: 0.75rem; color: #2d6a4f; display: flex; align-items: center; gap: 4px;">
              <span>✓</span> ${this.currentLang==="am"?"በብሔራዊ የፋይዳ ዳታቤዝ ጋር የተጣጣመ":"Instant format check: Valid Ethiopian FAN identifier"}
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${e.kebeleIdLabel}
            </label>
            <input 
              type="text" 
              id="wizardKebeleInput" 
              value="${this.kebeleNumber||"Bishoftu Kebele 04 / Farm Plot 182"}" 
              placeholder="Kebele 04 / Farm Plot ID"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-size: 0.95rem; background: var(--color-bg);"
              oninput="window.updateWizardField('kebele', this.value)"
            />
          </div>

          <div style="background: rgba(45, 106, 79, 0.08); border-left: 4px solid #2d6a4f; padding: 12px; border-radius: 6px; font-size: 0.8rem; color: var(--color-text-primary);">
            💡 <strong>${this.currentLang==="am"?"የመታወቂያ ጠቀሜታ፡":"Why is this required?"}</strong>
            ${this.currentLang==="am"?"የፋይዳ መታወቂያ በግብርና ገበያው ላይ እምነትን ለመገንባት እና የቴሌብር ክፍያዎችን ደህንነት ለማረጋገጥ ይረዳል።":"Fayda ID verification builds institutional trust, protects Telebirr escrow transactions, and qualifies your farm for agricultural subsidies."}
          </div>
        </div>
      `:this.currentStep===2?`
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text-primary);">
            📊 ${e.tinNumberLabel} & Business Licensing
          </h4>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.4;">
            ${this.currentLang==="am"?"የ10-ዲጂት የግብር ከፋይ መለያ (TIN) ቁጥርዎን ያስገቡ። በግብር አዋጅ ቁጥር 979/2008 መሰረት የሚደረግ የ2% Withholding እና የግብር ተገዢነት ማረጋገጫ ነው።":"Enter your 10-digit Ministry of Revenues Taxpayer Identification Number (TIN) for 2% withholding compliance."}
          </p>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${e.tinNumberLabel} *
            </label>
            <input 
              type="text" 
              id="wizardTinInput" 
              value="${this.tinNumber||(t==null?void 0:t.tinNumber)||"0099881122"}" 
              placeholder="0099881122"
              maxlength="10"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; font-size: 1.05rem; letter-spacing: 2px; background: var(--color-bg);"
              oninput="window.updateWizardField('tin', this.value)"
            />
            <div style="margin-top: 6px; font-size: 0.75rem; color: #2d6a4f; display: flex; align-items: center; gap: 4px;">
              <span>✓</span> ${this.currentLang==="am"?"የ10 ዲጂት የግብር ከፋይ ቁጥር ተረጋግጧል":"MOR 10-digit checksum verified"}
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${this.currentLang==="am"?"የግብርና ህብረት ስራ ማህበር / የንግድ ፈቃድ ቁጥር (ካለዎት)":"Cooperative Membership / Trade Registry No. (Optional)"}
            </label>
            <input 
              type="text" 
              placeholder="COOP-OROMIA-2026-981"
              value="COOP-BISH-8812"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-size: 0.95rem; background: var(--color-bg);"
            />
          </div>

          <div style="background: rgba(234, 88, 12, 0.08); border-left: 4px solid #ea580c; padding: 12px; border-radius: 6px; font-size: 0.8rem; color: var(--color-text-primary);">
            📜 <strong>${this.currentLang==="am"?"የግብር ነጻ መብት መረጃ፡":"Tax Exemption Notice:"}</strong>
            ${this.currentLang==="am"?"ያልተዘጋጁ የመጀመሪያ ደረጃ የግብርና ምርቶች (ጥራጥሬ፣ አትክልት) በኢትዮጵያ የግብር ህግ መሰረት ከተጨማሪ እሴት ታክስ (VAT) ነፃ ናቸው።":"Primary agricultural food items (cereals, vegetables, fresh fruit) are exempt from 15% VAT under Ethiopian Tax Proclamation No. 285/2002."}
          </div>
        </div>
      `:this.currentStep===3?`
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text-primary);">
            📸 ${e.uploadFrontPhoto} & ${e.uploadBackPhoto}
          </h4>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.4;">
            ${this.currentLang==="am"?"የመታወቂያዎን ወይም የግብር ሰነድዎን ግልጽ ፎቶ ይጫኑ ወይም በሞባይል ካሜራ ያንሱ።":"Upload clear, unblurred photos of your Fayda Card front and back for OCR inspection."}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <!-- Front Photo -->
            <div style="border: 2px dashed var(--color-border); border-radius: 12px; padding: 12px; text-align: center; background: var(--color-bg);">
              <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: var(--color-text-primary);">
                ${e.uploadFrontPhoto}
              </div>
              <img src="${this.frontImageUrl}" alt="Front ID Preview" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--color-border);" />
              <button type="button" onclick="alert('Photo captured & processed successfully!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 10px; width: 100%;">
                📷 ${this.currentLang==="am"?"ፎቶ ቀይር / አንሳ":"Retake / Reupload"}
              </button>
            </div>

            <!-- Back Photo -->
            <div style="border: 2px dashed var(--color-border); border-radius: 12px; padding: 12px; text-align: center; background: var(--color-bg);">
              <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: var(--color-text-primary);">
                ${e.uploadBackPhoto}
              </div>
              <img src="${this.backImageUrl}" alt="Back ID Preview" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--color-border);" />
              <button type="button" onclick="alert('Photo captured & processed successfully!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 10px; width: 100%;">
                📷 ${this.currentLang==="am"?"ፎቶ ቀይር / አንሳ":"Retake / Reupload"}
              </button>
            </div>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981; padding: 12px; border-radius: 6px; font-size: 0.8rem; color: var(--color-text-primary);">
            ✨ <strong>${this.currentLang==="am"?"የግምገማ ጊዜ፡":"Review Turnaround Time:"}</strong>
            ${this.currentLang==="am"?"የማረጋገጫ ሰነዶች በአስተዳዳሪዎች በ24 ሰዓታት ውስጥ ይገመገማሉ። ውሳኔው እንደተሰጠ በኤስኤምኤስ (SMS) ይደርስዎታል።":"Our marketplace compliance officer will review your documents within 24 hours. You will receive an immediate SMS notification once approved."}
          </div>
        </div>
      `:""}getStatusBgColor(e){switch(e){case"Approved":return"rgba(16, 185, 129, 0.12)";case"UnderReview":return"rgba(234, 179, 8, 0.12)";case"Rejected":return"rgba(239, 68, 68, 0.12)";default:return"rgba(100, 116, 139, 0.1)"}}getStatusTextColor(e){switch(e){case"Approved":return"#047857";case"UnderReview":return"#b45309";case"Rejected":return"#b91c1c";default:return"#475569"}}getStatusIcon(e){switch(e){case"Approved":return"✅";case"UnderReview":return"⏳";case"Rejected":return"❌";default:return"📝"}}formatStatus(e){const t=ee[this.currentLang];switch(e){case"Approved":return t.statusApproved;case"UnderReview":return t.statusUnderReview;case"Rejected":return t.statusRejected;default:return t.statusPendingSubmission}}updateField(e,t){e==="fayda"&&(this.faydaNumber=t),e==="tin"&&(this.tinNumber=t),e==="kebele"&&(this.kebeleNumber=t)}setStep(e){this.currentStep=e,this.render()}async submit(){const e=this.faydaNumber||"FAN-8812-4091-2810",t=this.tinNumber||"0099881122";await c.submitVerificationDocuments(t,[{documentType:"FaydaId",documentNumber:e,frontImageUrl:this.frontImageUrl,backImageUrl:this.backImageUrl},{documentType:"TinCertificate",documentNumber:t,frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"}]),this.close()}}function Ss(o,e){const t=e.filter(a=>!a.read).length;return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4 animate-scale-up">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <i class="fa-solid fa-bell text-sm"></i>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-slate-900 ${o==="am"?"lang-am":""}">
                ${o==="am"?"የኤስኤምኤስ (SMS) እና የስርዓት ማሳወቂያዎች":"SMS & Order Notifications"}
              </h3>
              <span class="text-[11px] text-slate-500 font-medium">
                ${t>0?`${t} unread message${t>1?"s":""}`:"All caught up"}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            ${t>0?`
              <button onclick="window.markAllNotificationsRead()" class="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer">
                Mark read
              </button>
            `:""}
            <button onclick="window.closeNotificationsModal()" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        ${e.length===0?`
          <div class="py-12 text-center text-slate-400 text-xs space-y-2">
            <i class="fa-regular fa-bell-slash text-3xl text-slate-300"></i>
            <p class="font-medium">${o==="am"?"ምንም አዲስ ማሳወቂያ የለም።":"No notifications yet."}</p>
          </div>
        `:`
          <div class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            ${e.map(a=>{const s=a.type==="refund";return`
                <div class="p-3.5 rounded-2xl border transition-all ${s?"bg-gradient-to-r from-amber-50/80 via-emerald-50/60 to-white border-amber-300/80 shadow-xs":a.read?"bg-slate-50/80 border-slate-200/80 text-slate-600":"bg-white border-emerald-300 shadow-2xs text-slate-900 ring-1 ring-emerald-200/50"}">
                  <div class="flex items-center justify-between font-bold text-[10px] pb-1.5">
                    <div class="flex items-center gap-1.5">
                      ${s?`
                        <span class="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                          <i class="fa-solid fa-money-bill-transfer"></i> Telebirr Refund
                        </span>
                      `:`
                        <span class="px-2 py-0.5 rounded-full ${a.channel==="sms"?"bg-emerald-100 text-emerald-800":"bg-blue-100 text-blue-800"} uppercase font-extrabold">
                          <i class="fa-solid ${a.channel==="sms"?"fa-comment-sms":"fa-bell"} mr-0.5"></i> ${a.channel==="sms"?"Twilio SMS":"Push"}
                        </span>
                      `}
                      ${a.read?"":`
                        <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      `}
                    </div>
                    <span class="text-slate-400 font-medium">
                      ${new Date(a.sentAt||a.createdAt||Date.now()).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                    </span>
                  </div>
                  <p class="text-xs ${s?"font-bold text-slate-900":"font-medium text-slate-800"} leading-relaxed ${o==="am"?"lang-am":""}">
                    ${o==="am"&&a.messageAm?a.messageAm:a.messageEn}
                  </p>
                </div>
              `}).join("")}
          </div>
        `}

      </div>
    </div>
  `}function ks(o,e,t,a,s="",i="",n="",r="",d=""){return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeAuthModal()">
      <div class="auth-modal-dialog">
        
        <!-- Header (Fixed at top of modal) -->
        <div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 p-5 sm:p-6 text-white relative shrink-0">
          <button onclick="window.closeAuthModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>

          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xl font-black shadow-inner">
              <i class="fa-solid fa-wheat-awn"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400/90">Ethiopian Agricultural Exchange</span>
              <h3 class="text-lg sm:text-xl font-black tracking-tight text-white ${o==="am"?"lang-am":""}">
                ${e==="login"?o==="am"?"ወደ መለያዎ ይግቡ":"Sign In to Your Account":o==="am"?"አዲስ የጅምላ መለያ ይመዝገቡ":"Create a Wholesale Account"}
              </h3>
            </div>
          </div>

          <div class="flex items-center gap-3 text-[11px] text-slate-300 font-medium pt-1">
            <span class="flex items-center gap-1 text-emerald-300"><i class="fa-solid fa-shield-halved"></i> 256-Bit SSL Secured</span>
            <span>·</span>
            <span class="flex items-center gap-1 text-blue-300"><i class="fa-solid fa-bolt"></i> Telebirr Escrow Automated</span>
          </div>
        </div>

        <!-- Scrollable Modal Body -->
        <div class="auth-modal-body space-y-5 bg-white">
          
          <!-- Mode Switcher Tabs (Sign In vs Register) -->
          <div class="flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-bold shrink-0">
            <button onclick="window.setAuthMode('login')" 
              class="flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${e==="login"?"bg-white text-emerald-950 shadow-sm border border-slate-200/60":"text-slate-500 hover:text-slate-900"}">
              <i class="fa-solid fa-right-to-bracket text-emerald-700"></i> ${o==="am"?"ግባ (Sign In)":"Sign In (መግቢያ)"}
            </button>
            <button onclick="window.setAuthMode('register')" 
              class="flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${e==="register"?"bg-white text-emerald-950 shadow-sm border border-slate-200/60":"text-slate-500 hover:text-slate-900"}">
              <i class="fa-solid fa-user-plus text-emerald-700"></i> ${o==="am"?"ተመዝገብ (Join Free)":"Join Free (አዲስ መመዝገቢያ)"}
            </button>
          </div>

          ${r?`
            <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <i class="fa-solid fa-circle-exclamation text-red-500 text-sm mt-0.5 shrink-0"></i>
              <div class="flex-1">
                <span class="font-bold block">${r}</span>
                ${e==="login"&&r.toLowerCase().includes("register")?`
                  <button type="button" onclick="window.switchToRegisterWithPhone('${a}')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
                    <i class="fa-solid fa-user-plus"></i> Register This Phone Now
                  </button>
                `:""}
                ${e==="register"&&(r.toLowerCase().includes("already exists")||r.toLowerCase().includes("sign in"))?`
                  <button type="button" onclick="window.setAuthMode('login')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
                    <i class="fa-solid fa-right-to-bracket"></i> Switch to Sign In (ግባ)
                  </button>
                `:""}
              </div>
            </div>
          `:""}

          ${e==="login"?`
            <!-- Real Database Phone / OTP Login Flow -->
            ${t?`
              <!-- OTP Verification Step -->
              <form onsubmit="window.handleVerifyOtp(event)" class="space-y-4 pt-1">
                
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
                      <i class="fa-solid fa-envelope-circle-check"></i>
                    </div>
                    <div>
                      <span class="block font-extrabold text-slate-900">${i?`Account: <strong>${i}</strong> (${n})`:"Multi-Channel Verification"}</span>
                      <span class="text-[11px] text-emerald-800 font-medium block">Phone: <strong>+251 ${a}</strong></span>
                      ${d?`
                        <div class="text-[11px] text-emerald-950 font-bold flex items-center gap-1.5 mt-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
                          <i class="fa-solid fa-envelope text-emerald-600"></i> Code sent to: <span class="underline text-emerald-800">${d}</span>
                        </div>
                      `:""}
                      ${s?`
                        <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100/90 rounded-md border border-emerald-300 text-emerald-950 font-bold text-[10px]">
                          <span>Demo OTP Code:</span> <code class="font-mono text-emerald-900 text-xs font-black">${s}</code>
                        </div>
                      `:`
                        <div class="text-[10px] text-slate-500 font-medium mt-1">
                          <i class="fa-solid fa-inbox text-emerald-600 mr-1"></i> Please check your email inbox for the 6-digit code.
                        </div>
                      `}
                    </div>
                  </div>
                  <button type="button" onclick="window.resetOtpStep()" class="text-xs text-emerald-800 hover:text-emerald-950 underline font-bold cursor-pointer shrink-0">
                    Change Phone
                  </button>
                </div>

                <div>
                  <label class="block mb-2 text-xs font-bold text-slate-800 text-center">
                    ${o==="am"?"የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ":"Enter 6-Digit Verification Code"}
                  </label>
                  <input type="text" id="authOtpInput" maxlength="6" required placeholder="• • • • • •" autofocus
                    value="${s||""}"
                    class="w-full py-3.5 px-4 rounded-xl border border-slate-300 text-center text-3xl font-mono font-black tracking-widest focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 text-slate-900 shadow-inner" />
                  
                  <div class="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
                    <span>Didn't receive code?</span>
                    <button type="button" onclick="window.handleRequestOtp(event)" class="text-emerald-700 hover:underline font-bold cursor-pointer">
                      Resend Email / SMS Code
                    </button>
                  </div>
                </div>

                <button type="submit" id="verifyOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-circle-check mr-1.5"></i> ${o==="am"?"አረጋግጥና ግባ":"Verify Code & Sign In"}
                </button>
              </form>
            `:`
              <form onsubmit="window.handleRequestOtp(event)" class="space-y-4 pt-1">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="text-xs font-bold text-slate-800">
                      ${o==="am"?"የተመዘገበ የሞባይል ስልክ ቁጥር":"Registered Ethiopian Mobile Number"}
                    </label>
                    <span class="text-[10px] text-slate-400 font-semibold">Strict Database Verification</span>
                  </div>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-slate-500 text-sm flex items-center gap-1.5 pointer-events-none">
                      <span class="text-base">🇪🇹</span> +251
                    </span>
                    <input type="tel" id="authPhoneInput" required placeholder="911 223 344" value="${a||""}"
                      class="w-full pl-24 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white transition-all tracking-wide" />
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <i class="fa-solid fa-database text-emerald-600"></i> ${o==="am"?"በዳታቤዝ ውስጥ የተመዘገቡ ተጠቃሚዎች ብቻ መግባት ይችላሉ።":"Only existing registered accounts in the database can sign in."}
                  </p>
                </div>

                <button type="submit" id="requestOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${o==="am"?"የኤስኤምኤስ እና የኢሜይል ማረጋገጫ ኮድ ላክ":"Verify & Send SMS/Email Code"}
                </button>

                <!-- Quick Test Accounts from Seed Database -->
                <div class="pt-3 border-t border-slate-100 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <i class="fa-solid fa-flask-vial text-emerald-600 mr-1"></i> Quick Test Accounts (Seeded in Database)
                    </span>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-left">
                    <button type="button" onclick="window.quickFillPhone('911 223 344')" 
                      class="p-2 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-emerald-950">🌾 Abebe Bekele</span>
                        <span class="text-[9px] font-black bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded">FARMER</span>
                      </div>
                      <span class="text-[10px] text-emerald-800 font-mono block mt-0.5">+251 911 223 344</span>
                    </button>

                    <button type="button" onclick="window.quickFillPhone('955 667 788')" 
                      class="p-2 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-blue-950">🛒 Bethlehem (FreshMart)</span>
                        <span class="text-[9px] font-black bg-blue-200/80 text-blue-900 px-1.5 py-0.5 rounded">BUYER</span>
                      </div>
                      <span class="text-[10px] text-blue-800 font-mono block mt-0.5">+251 955 667 788</span>
                    </button>

                    <button type="button" onclick="window.quickFillPhone('977 889 900')" 
                      class="p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-amber-950">🚚 Dawit (Isuzu 5-Ton)</span>
                        <span class="text-[9px] font-black bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded">DRIVER</span>
                      </div>
                      <span class="text-[10px] text-amber-800 font-mono block mt-0.5">+251 977 889 900</span>
                    </button>

                    <button type="button" onclick="window.quickFillPhone('900 112 233')" 
                      class="p-2 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-purple-950">🛡️ Sara Mengistu</span>
                        <span class="text-[9px] font-black bg-purple-200/80 text-purple-900 px-1.5 py-0.5 rounded">ADMIN</span>
                      </div>
                      <span class="text-[10px] text-purple-800 font-mono block mt-0.5">+251 900 112 233</span>
                    </button>

                    <button type="button" onclick="window.quickFillPhone('900 000 001')" 
                      class="p-2 rounded-xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 transition-all text-left cursor-pointer group col-span-1 sm:col-span-2">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-rose-950">👑 Dr. Dawit Haile (Chief Platform Officer)</span>
                        <span class="text-[9px] font-black bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded">SUPER ADMIN</span>
                      </div>
                      <span class="text-[10px] text-rose-800 font-mono block mt-0.5">+251 900 000 001 · Full Root & Impersonation Access</span>
                    </button>
                  </div>
                </div>
              </form>
            `}

          `:`
            <!-- Professional B2B Registration Flow (Creates Real DB User) -->
            <form onsubmit="window.handleRegisterUser(event)" class="space-y-4 text-xs pt-1">
              
              <div>
                <label class="block mb-2 font-bold text-slate-800 text-xs">
                  ${o==="am"?"የንግድ / የሥራ ዘርፍ ይምረጡ":"Select Your Business Role on the Exchange"}
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  <label class="role-radio-card active" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="farmer" checked class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Smallholder Farmer / Co-op 🌾</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Sell harvest directly to buyers with 90% payout.</span>
                    </div>
                  </label>

                  <label class="role-radio-card" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="buyer" class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Wholesale Buyer / Retail 🛒</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Source farm produce in bulk with Telebirr escrow.</span>
                    </div>
                  </label>

                  <label class="role-radio-card" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="driver" class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Freight & Logistics Carrier 🚚</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Transport produce batches with 5% guaranteed trip cut.</span>
                    </div>
                  </label>

                  <label class="role-radio-card" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="admin" class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Market Officer / Co-op Lead 🛡️</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Verify farm IDs and arbitrate escrow claims.</span>
                    </div>
                  </label>

                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-800">Full Legal Name (English)</label>
                  <input type="text" id="regName" required placeholder="e.g. Tariku Haile" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-800">ሙሉ ስም በአማርኛ (Amharic Name)</label>
                  <input type="text" id="regNameAm" placeholder="ለምሳሌ: ታሪኩ ኃይሌ" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium lang-am" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-800">Region / Agricultural Zone</label>
                  <select id="regRegion" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 font-medium">
                    <option value="Oromia (Bishoftu)">Oromia (Bishoftu / Ada'a)</option>
                    <option value="Addis Ababa (Bole)">Addis Ababa (Bole Commercial)</option>
                    <option value="Amhara (Debre Berhan)">Amhara (Debre Berhan / Shewa)</option>
                    <option value="Sidama (Hawassa)">Sidama (Hawassa Lake Region)</option>
                    <option value="Oromia (Awash Melkasa)">Oromia (Awash Melkasa)</option>
                    <option value="SNNPR (Ziway)">SNNPR (Ziway Horticulture)</option>
                  </select>
                </div>

                <div>
                  <label class="block mb-1 font-bold text-slate-800">Mobile Phone Number</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">+251</span>
                    <input type="tel" id="regPhone" required placeholder="911 000 111" value="${a||""}"
                      class="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-bold" />
                  </div>
                </div>
              </div>

              <!-- Optional Email Address Field -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <i class="fa-solid fa-envelope text-emerald-600"></i> ${o==="am"?"የኢሜይል አድራሻ (አማራጭ)":"Email Address (Optional)"}
                  </label>
                  <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                    ${o==="am"?"ለኦቲፒ እና የትዕዛዝ ማሳወቂያዎች":"For OTP & Email Alerts"}
                  </span>
                </div>
                <input type="email" id="regEmail" placeholder="e.g. tariku.haile@example.com (Optional)" 
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium" />
                <p class="text-[11px] text-slate-500 mt-1">
                  ${o==="am"?"ኢሜይል ካስገቡ የማረጋገጫ ኮድ (OTP) እና ሁሉም የትዕዛዝ መልዕክቶች በኢሜይልዎ ይደርሳሉ።":"If provided, OTP verification codes and order updates will also be sent to your email."}
                </p>
              </div>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
                <input type="checkbox" checked required class="mt-0.5 rounded text-emerald-600" />
                <span>I agree to the <strong>Farmer-to-Market Produce Exchange Terms</strong> and automated <strong>Telebirr Escrow terms</strong>.</span>
              </div>

              <button type="submit" id="registerSubmitBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer mt-1">
                <i class="fa-solid fa-user-check mr-1.5"></i> ${o==="am"?"ይመዝገቡና ወደ መለያዎ ይግቡ":"Complete Registration & Sign In"}
              </button>
            </form>
          `}

        </div>
      </div>
    </div>
  `}class As{constructor(){f(this,"currentLang","en")}setLanguage(e){this.currentLang=e}renderInvoice(e){const t=this.currentLang==="am";return`
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">🇪🇹</span>
            <div class="emblem-text">
              <h4>FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA</h4>
              <h5>MINISTRY OF REVENUES / ETHIOPIAN AGRICULTURAL AUTHORITY</h5>
              <p class="amharic-sub">የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ የገቢዎች ሚኒስቴር</p>
            </div>
          </div>
          <div class="doc-type-badge tax-stamp">
            <span class="badge-title">ELECTRONIC AGRICULTURAL SALES INVOICE</span>
            <span class="badge-am">የኤሌክትሮኒክስ የግብርና ሽያጭ ደረሰኝ</span>
            <span class="invoice-num">${e.invoiceNumber}</span>
          </div>
        </div>

        <div class="doc-meta-grid">
          <div class="meta-box">
            <label>DATE OF ISSUE / የወጣበት ቀን</label>
            <p><strong>${e.issueDate||e.issuedDate||"2026-08-22"}</strong></p>
            <label>TELEBIRR ESCROW REF / የክፍያ ማረጋገጫ</label>
            <p><code class="ref-code">${e.paymentRef||"TB-ESCROW-2026-0912"}</code></p>
          </div>
          <div class="meta-box">
            <label>REGULATORY STATUS / የግብር ሁኔታ</label>
            <p><span class="badge-green">TAX-EXEMPT PRIMARY PRODUCE (Art. 979/2016)</span></p>
            <label>ORDER ID / የትዕዛዝ ቁጥር</label>
            <p><code>${e.orderId.slice(0,13)}...</code></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>SUPPLIER / SELLER (አቅራቢ / አርሶ አደር)</h5>
            <p class="party-name"><strong>${e.sellerName||e.supplierName||"Abebe Bekele"}</strong></p>
            <p><span class="label">Tax Identification No (TIN):</span> <strong>${e.sellerTin||e.supplierTin||"TIN-FARM-882910"}</strong></p>
            <p><span class="label">Region / Farm Gate:</span> ${e.sellerRegion||e.supplierRegion||"Oromia (Bishoftu)"}</p>
            <p><span class="label">Contact Phone:</span> ${e.sellerPhone||e.supplierPhone||"+251 911 223 344"}</p>
            <p class="party-type-tag">Smallholder Agricultural Producer</p>
          </div>

          <div class="party-card buyer-card">
            <h5>PURCHASER / BUYER (ገዢ / የንግድ ድርጅት)</h5>
            <p class="party-name"><strong>${e.buyerName}</strong></p>
            <p><span class="label">Purchaser TIN:</span> <strong>${e.buyerTin}</strong></p>
            <p><span class="label">Delivery Location:</span> ${e.buyerRegion||e.buyerAddress||"Addis Ababa (Bole Depot)"}</p>
            <p><span class="label">Contact Phone:</span> ${e.buyerPhone||"+251 955 667 788"}</p>
            <p class="party-type-tag">Commercial Wholesale Buyer</p>
          </div>
        </div>

        <table class="doc-line-items">
          <thead>
            <tr>
              <th>Item & Description (የምርት ዝርዝር)</th>
              <th>Grade (ደረጃ)</th>
              <th>Qty (ኪ.ግ)</th>
              <th>Unit Price (ብር)</th>
              <th style="text-align: right;">Total (ጠቅላላ ብር)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${e.productName}</strong>
                ${e.productNameAm?`<div class="sub-am">${e.productNameAm}</div>`:""}
              </td>
              <td><span class="badge-grade">${e.grade||"Grade 1"}</span></td>
              <td><strong>${e.qtyKg.toLocaleString()} kg</strong></td>
              <td>${e.unitPriceEtb.toFixed(2)} ETB</td>
              <td style="text-align: right;"><strong>${(e.grossAmountEtb||e.goodsGrossTotalEtb||e.qtyKg*e.unitPriceEtb).toLocaleString()} ETB</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="doc-settlement-breakdown">
          <div class="escrow-payout-box">
            <h6>ESCROW DISBURSEMENT APPORTIONMENT (90 / 5 / 5)</h6>
            <div class="breakdown-row">
              <span>Farmer Net Payout (90%):</span>
              <strong>${(e.farmerPayoutEtb||e.netPayableToFarmerEtb||e.qtyKg*e.unitPriceEtb*.9).toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row">
              <span>Driver Transport Fee (5%):</span>
              <strong>${(e.driverFreightEtb||e.freightFeeEtb||e.qtyKg*e.unitPriceEtb*.05).toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row">
              <span>Platform Service Commission (5%):</span>
              <strong>${(e.platformServiceFeeEtb||e.qtyKg*e.unitPriceEtb*.05).toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row vat-row">
              <span>15% VAT on Platform Service Fee:</span>
              <span>${(e.platformVatEtb||e.qtyKg*e.unitPriceEtb*.05*.15).toFixed(2)} ETB (Remitted to MOR)</span>
            </div>
            <div class="breakdown-row withholding-row">
              <span>Withholding Tax on Goods (2% Declared):</span>
              <span>${(e.withholdingTaxEtb||e.qtyKg*e.unitPriceEtb*.02).toFixed(2)} ETB</span>
            </div>
          </div>

          <div class="total-summary-box">
            <label>TOTAL PAID VIA TELEBIRR ESCROW</label>
            <h2 class="grand-total">${(e.totalPaidViaTelebirr||e.totalInvoiceAmountEtb||e.qtyKg*e.unitPriceEtb).toLocaleString()} <span class="currency">ETB</span></h2>
            <div class="qr-placeholder">
              <div class="qr-code-box">
                <span class="qr-mock">▣▣▣<br/>▣■▣<br/>▣▣▣</span>
              </div>
              <div class="qr-info">
                <p><strong>ETH-TAX-VERIFIED</strong></p>
                <small>${e.qrVerificationCode||"MOR-EABC-VERIFIED"}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            ${t?"ይህ ሰነድ በኢትዮጵያ የግብር ህግ እና የኤሌክትሮኒክስ ፊርማ አዋጅ ቁጥር 1072/2018 መሰረት ህጋዊ ተቀባይነት ያለው ነው።":"This electronic receipt is generated automatically upon Telebirr escrow confirmation under Ethiopian Tax Law & Proclamation No. 979/2016."}
          </p>
        </div>
      </div>
    `}renderWaybill(e){return`
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">🚛</span>
            <div class="emblem-text">
              <h4>FEDERAL TRANSPORT AUTHORITY (FTA) · ETHIOPIA</h4>
              <h5>OFFICIAL AGRICULTURAL FREIGHT WAYBILL & CHAIN OF CUSTODY</h5>
              <p class="amharic-sub">የኢትዮጵያ ትራንስፖርት ባለስልጣን የግብርና ምርት ማጓጓዣ ሰነድ</p>
            </div>
          </div>
          <div class="doc-type-badge waybill-stamp">
            <span class="badge-title">OFFICIAL WAYBILL</span>
            <span class="badge-am">የጭነት ማጓጓዣ ሰነድ</span>
            <span class="invoice-num">${e.waybillNumber}</span>
          </div>
        </div>

        <div class="doc-meta-grid">
          <div class="meta-box">
            <label>DISPATCH DATE / የተላከበት ቀን</label>
            <p><strong>${e.dispatchDate||e.issueDate||"2026-08-22"}</strong></p>
            <label>INSURANCE POLICY REF / የኢንሹራንስ ፖሊሲ</label>
            <p><code class="ref-code">${e.insurancePolicyNumber||e.transitInsurancePolicyNumber||"NIC-AGRI-TR-99214"}</code></p>
          </div>
          <div class="meta-box">
            <label>TRANSIT STATUS / የጉዞ ሁኔታ</label>
            <p><span class="badge-green">${(e.transitStatus||e.chainOfCustodyStatus||"In Transit").toUpperCase()}</span></p>
            <label>ORDER REF / የትዕዛዝ ቁጥር</label>
            <p><code>${e.orderId.slice(0,13)}...</code></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>CONSIGNOR / ORIGIN FARM (ላኪ አርሶ አደር)</h5>
            <p class="party-name"><strong>${e.consignorName}</strong></p>
            <p><span class="label">Loading Farm Gate:</span> ${e.consignorFarmLocation||e.pickupLocation||"Bishoftu Farm Gate"}</p>
            <p><span class="label">Farmer Contact:</span> ${e.consignorPhone||"+251 911 223 344"}</p>
            <p><span class="label">Farm Handoff Time:</span> ${e.farmerHandoffTimestamp||"Today 07:30 AM"}</p>
          </div>

          <div class="party-card buyer-card">
            <h5>CONSIGNEE / DESTINATION (ተቀባይ የጅምላ ገዢ)</h5>
            <p class="party-name"><strong>${e.consigneeName}</strong></p>
            <p><span class="label">Unloading Hub:</span> ${e.consigneeDepotAddress||e.deliveryLocation||"Addis Ababa Central Depot"}</p>
            <p><span class="label">Buyer Contact:</span> ${e.consigneePhone||"+251 955 667 788"}</p>
            <p><span class="label">Received Timestamp:</span> ${e.buyerReceivedTimestamp||"In Transit (Pending GPS Dropoff)"}</p>
          </div>
        </div>

        <div class="carrier-spec-box">
          <h5>CARRIER & VEHICLE SPECIFICATIONS (የአጓጓዥ እና ተሽከርካሪ ዝርዝር)</h5>
          <div class="carrier-grid">
            <div>
              <span class="label">Licensed Driver:</span>
              <strong>${e.carrierDriverName||e.transporterName||"Dawit Kebede"}</strong>
            </div>
            <div>
              <span class="label">Commercial CDL License:</span>
              <strong>${e.driverLicenseNumber||"ET-CDL-5T-98214"}</strong>
            </div>
            <div>
              <span class="label">Vehicle Plate Number:</span>
              <strong class="plate-highlight">${e.vehiclePlateNumber}</strong>
            </div>
            <div>
              <span class="label">Vehicle Type / Specs:</span>
              <span>${e.vehicleModel||e.vehicleType||"Isuzu NPR 5-Ton"}</span>
            </div>
            <div>
              <span class="label">Refrigeration Mode:</span>
              <span class="badge-blue">${e.refrigerationStatus||"Ventilated Agro-Crate Box"}</span>
            </div>
            <div>
              <span class="label">Cargo Temp Log:</span>
              <span>${e.temperatureLogCelsius||18}°C (Verified Fresh)</span>
            </div>
          </div>
        </div>

        <table class="doc-line-items">
          <thead>
            <tr>
              <th>Cargo Description (የጭነቱ አይነት)</th>
              <th>Packages / Crates</th>
              <th>Net Cargo (ኪ.ግ)</th>
              <th>Tare Weight (ኪ.ግ)</th>
              <th style="text-align: right;">Gross Weight (ኪ.ግ)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${e.cargoDescription||e.productName||"Fresh Agricultural Cargo"}</strong></td>
              <td>${e.packageCount||100} Commercial Crates</td>
              <td>${(e.netWeightKg||e.cargoWeightNetKg||2500).toLocaleString()} kg</td>
              <td>${e.tareWeightKg||e.cargoWeightTareKg||300} kg</td>
              <td style="text-align: right;"><strong>${(e.grossWeightKg||e.cargoWeightGrossKg||2800).toLocaleString()} kg</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="signature-chain-box">
          <div class="sig-block">
            <p class="sig-title">1. CONSIGNOR (FARM GATE DISPATCH)</p>
            <div class="sig-line-area">
              <span class="sig-check">✓ SIGNED & HANDED OVER</span>
              <small>${e.consignorName} (${e.farmerHandoffTimestamp||"Today 07:30 AM"})</small>
            </div>
          </div>
          <div class="sig-block">
            <p class="sig-title">2. CARRIER (DRIVER CUSTODY ACK)</p>
            <div class="sig-line-area">
              <span class="sig-check">✓ IN-TRANSIT SECURITY SEALED</span>
              <small>${e.carrierDriverName||e.transporterName||"Dawit Kebede"} (${e.vehiclePlateNumber})</small>
            </div>
          </div>
          <div class="sig-block">
            <p class="sig-title">3. CONSIGNEE (DESTINATION DEPOT)</p>
            <div class="sig-line-area">
              ${e.buyerReceivedTimestamp?`
                <span class="sig-check">✓ RECEIVED & INSPECTED</span>
                <small>${e.buyerReceivedTimestamp}</small>
              `:`
                <span class="sig-pending">⏳ PENDING DELIVERY DROP-OFF</span>
                <small>GPS Timestamp Enforced Upon Receipt</small>
              `}
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            Official Waybill generated pursuant to Ethiopian Commercial Road Transport Regulations. Carries full third-party transit insurance.
          </p>
        </div>
      </div>
    `}renderContract(e){var t,a,s;return`
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">⚖️</span>
            <div class="emblem-text">
              <h4>STANDARD AGRICULTURAL COMMODITY SALE & PURCHASE CONTRACT</h4>
              <h5>GOVERNED UNDER ETHIOPIAN COMMERCIAL CODE & EABC ARBITRATION RULES</h5>
              <p class="amharic-sub">የግብርና ምርት ግዢ እና ሽያጭ ሕጋዊ ውል</p>
            </div>
          </div>
          <div class="doc-type-badge contract-stamp">
            <span class="badge-title">DIGITAL SALE CONTRACT</span>
            <span class="badge-am">ሕጋዊ የግብይት ውል</span>
            <span class="invoice-num">${e.contractNumber}</span>
          </div>
        </div>

        <div class="contract-preamble">
          <p>
            This Standard Agricultural Produce Agreement (the <strong>"Contract"</strong>) is entered into on <strong>${e.agreementDate||e.executionDate||"2026-08-22"}</strong> between the Seller and Buyer identified below through the Farmer-to-Market direct exchange.
          </p>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>THE SELLER (አቅራቢ / ሻጭ)</h5>
            <p class="party-name"><strong>${e.sellerName}</strong></p>
            <p><span class="label">National Fayda ID:</span> ${e.sellerIdNumber||"FAN-8812-4091-2810"}</p>
            <p><span class="label">Location:</span> ${e.sellerLocation||"Oromia (Bishoftu)"}</p>
          </div>

          <div class="party-card buyer-card">
            <h5>THE BUYER (ገዢ ድርጅት)</h5>
            <p class="party-name"><strong>${e.buyerName}</strong></p>
            <p><span class="label">Buyer TIN:</span> ${e.buyerTinNumber||e.buyerTin||"TIN-ET-9912001"}</p>
            <p><span class="label">Depot Destination:</span> ${e.buyerLocation||"Addis Ababa (Bole Depot)"}</p>
          </div>
        </div>

        <div class="contract-clauses-container">
          <div class="clause-item">
            <h6>ARTICLE 1: SUBJECT MATTER & PRICE SPECIFICATIONS (የምርት እና የዋጋ ዝርዝር)</h6>
            <p>
              The Seller agrees to supply and the Buyer agrees to purchase <strong>${(e.contractedQuantityKg||e.quantityKg||2500).toLocaleString()} kg</strong> of <strong>${e.cropType||e.productDescription||"Fresh Sholla Tomatoes"}</strong> at the agreed unit rate of <strong>${(e.agreedPricePerKg||e.unitPriceEtb||45).toFixed(2)} ETB per kg</strong>, constituting a total consideration of <strong>${e.totalContractValueEtb.toLocaleString()} ETB</strong>.
            </p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 2: QUALITY STANDARDS & TOLERANCE (የጥራት ደረጃ)</h6>
            <p>${e.qualityStandardClause||e.qualityStandardSpecification||"Produce shall meet Grade 1 Ethiopian Agricultural Quality Standards with maximum 5% visual variance tolerance."}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 3: TELEBIRR ESCROW & PAYMENT SETTLEMENT (የዋስትና ክፍያ እና ስምምነት)</h6>
            <p>${e.escrowClauseText||e.paymentEscrowClause||"Full purchase consideration is locked in Telebirr escrow prior to harvest dispatch and released upon buyer digital inspection confirmation."}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 4: DELIVERY & CHAIN OF CUSTODY (የማድረስ ሁኔታ)</h6>
            <p>${e.deliveryTimeline||"Delivery within 24 hours of harvest confirmation via certified temperature-controlled commercial freight carrier."}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 5: FORCE MAJEURE & ARBITRATION (አቅም በላይ የሆነ ሁኔታ እና የህግ ሽምግልና)</h6>
            <p>${e.forceMajeureClauseText||e.forceMajeureClause||"Neither party shall be liable for agricultural loss resulting from severe climate events verified by Ministry of Agriculture."}</p>
            <p><em>Dispute Resolution Jurisdiction: ${e.disputeJurisdiction||e.arbitrationVenue||"Ethiopian Arbitration and Conciliation Center (EABC), Addis Ababa"}</em></p>
          </div>
        </div>

        <div class="contract-signatures-grid">
          <div class="contract-sig-box">
            <p class="sig-header">SELLER DIGITAL ATTESTATION</p>
            <div class="sig-badge verified-sig">
              <span>✓ DIGITALLY SIGNED VIA OTP</span>
              <strong>${e.sellerName}</strong>
              <small>${((t=e.eSignatures)==null?void 0:t.sellerSignDate)||"2026-08-22 08:30:14"}</small>
            </div>
          </div>

          <div class="contract-sig-box">
            <p class="sig-header">BUYER DIGITAL ATTESTATION</p>
            <div class="sig-badge verified-sig">
              <span>✓ DIGITALLY SIGNED VIA TELEBIRR LOCK</span>
              <strong>${e.buyerName}</strong>
              <small>${((a=e.eSignatures)==null?void 0:a.buyerSignDate)||"2026-08-22 08:31:02"}</small>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            Digital signatures are legally recognized under the Ethiopian Electronic Signature Proclamation No. 1072/2018. Immutable Platform Cryptographic Witness Hash: <code>${((s=e.eSignatures)==null?void 0:s.platformWitnessHash)||"0x8f2a991bce98124a9e4d"}</code>
          </p>
        </div>
      </div>
    `}renderArbitration(e){return`
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">🏛️</span>
            <div class="emblem-text">
              <h4>ETHIOPIAN AGRICULTURAL COMMODITY ARBITRATION TRIBUNAL</h4>
              <h5>BINDING ESCROW DISPUTE RULING & SETTLEMENT DECREE</h5>
              <p class="amharic-sub">የግብርና ምርት ግብይት ቅሬታ አስገዳጅ የሽምግልና ውሳኔ ሰነድ</p>
            </div>
          </div>
          <div class="doc-type-badge dispute-stamp">
            <span class="badge-title">ARBITRATION DECREE</span>
            <span class="badge-am">የሽምግልና ውሳኔ</span>
            <span class="invoice-num">${e.caseNumber}</span>
          </div>
        </div>

        <div class="doc-meta-grid">
          <div class="meta-box">
            <label>FILING DATE / የቀረበበት ቀን</label>
            <p><strong>${e.filingDate}</strong></p>
            <label>DISPUTED ESCROW AMOUNT</label>
            <p><strong class="highlight-warn">${(e.totalDisputedAmountEtb||112500).toLocaleString()} ETB</strong></p>
          </div>
          <div class="meta-box">
            <label>CASE STATUS / የክርክር ሁኔታ</label>
            <p><span class="badge-green">${(e.status||"Resolved").toUpperCase()}</span></p>
            <label>LEAD ARBITRATOR</label>
            <p><strong>${e.leadArbitratorName||e.arbitratorName||"Sara Mengistu"}</strong></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card buyer-card">
            <h5>CLAIMANT (ቅሬታ አቅራቢ ገዢ)</h5>
            <p class="party-name"><strong>${e.claimantBuyer||e.complainantName||"Bethlehem Tilahun"}</strong></p>
            <p><span class="label">Claimed Defect:</span> ${e.claimedDefectPercentage||50}% Value Impairment</p>
            <p><span class="label">Dispute Reason:</span> ${e.disputeReason||e.disputeSubject||"Quality degradation in transit"}</p>
          </div>

          <div class="party-card seller-card">
            <h5>RESPONDENT (ተጠሪ አርሶ አደር)</h5>
            <p class="party-name"><strong>${e.respondentFarmer||e.respondentName||"Chala Gemechu"}</strong></p>
            <p><span class="label">Freight Carrier:</span> ${e.freightCarrier||"Dawit Kebede (Isuzu 5-Ton)"}</p>
            <p><span class="label">Original Farm Payout:</span> 90% Contract Standard</p>
          </div>
        </div>

        <div class="arbitration-findings-box">
          <h5>1. INDEPENDENT PHYSICAL INSPECTION & PATHOLOGY FINDINGS</h5>
          <p>${e.inspectionReport||e.inspectionFindingNotes||"Depot inspector confirmed 20% surface bruising due to transit ventilation failure."}</p>
        </div>

        <div class="arbitration-findings-box ruling-highlight-box">
          <h5>2. ARBITRATOR LEGAL DETERMINATION & REMEDY</h5>
          <p><strong>${e.legalFindingSummary||e.arbitrationDetermination||"Escrow funds split 50/50 between farmer and buyer with immediate Telebirr wallet settlement."}</strong></p>
          
          <div class="verdict-award-grid">
            <div class="award-box">
              <span class="award-label">FARMER ESCROW RELEASE (50%)</span>
              <h3 class="award-amount">${(e.farmerSettlementEtb||56250).toLocaleString()} ETB</h3>
              <small>Released to Farmer Telebirr Wallet</small>
            </div>
            <div class="award-box">
              <span class="award-label">BUYER ESCROW REFUND (50%)</span>
              <h3 class="award-amount">${(e.buyerRefundEtb||56250).toLocaleString()} ETB</h3>
              <small>Refunded to Buyer Telebirr Account</small>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            This decree constitutes a final, binding arbitral award rendered under the Ethiopian Commercial Code and Platform Escrow Bylaws.
          </p>
          <div class="seal-container">
            <div class="official-seal">
              <span>★ EABC ARBITRATION BOARD ★</span>
              <strong>ENFORCEABLE DECREE</strong>
              <small>${e.platformDecreeHash||e.bindingEnforcementSeal||"EABC-DECREE-SEAL-8821"}</small>
            </div>
          </div>
        </div>
      </div>
    `}}const Se=new As;class $s{constructor(e="en"){f(this,"currentLang","en");f(this,"activePhotoIndex",0);f(this,"selectedQtyKg",50);this.currentLang=e}setLanguage(e){this.currentLang=e}setActivePhotoIndex(e){this.activePhotoIndex=e}setSelectedQtyKg(e){this.selectedQtyKg=Math.max(1,e)}render(e){if(!e)return"";const t=ee[this.currentLang],a=this.currentLang==="am",s=e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=80"],i=Math.min(this.activePhotoIndex,s.length-1),n=s[i],r=Math.max(e.minOrderKg||10,this.selectedQtyKg||e.minOrderKg||50),d=r*e.pricePerKg,p=Math.round(d*.9),l=Math.round(d*.05),b=Math.round(d*.05),v=e.marketBenchmarkPrice||e.pricePerKg*1.15,k=Math.max(0,v-e.pricePerKg),$=v>0?Math.round(k/v*100):0,u=e.description||`Freshly harvested Grade 1 ${e.productName} cultivated directly by smallholder farmer ${e.farmerName} in ${e.region}. Verified under Ethiopian agricultural commodity standards with 90% direct farmer escrow payout.`,S=e.descriptionAm||`በ${e.region} በአርሶ አደር ${e.farmerNameAm||e.farmerName} የተመረተ ምርጥ ደረጃ ${e.nameAm||e.productName}። በቴሌብር ዋስትና 90% ቀጥታ ለአርሶ አደሩ የሚከፈልበት ተመራጭ ምርት።`;return`
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeProduceDetail()">
        <div class="modal-content overflow-hidden max-w-4xl w-[95%] max-h-[92vh] flex flex-col p-0 rounded-2xl shadow-2xl border border-slate-200 bg-white animate-fade-in">
          
          <!-- Modal Header Bar -->
          <div class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center text-emerald-200 text-lg shadow-inner">
                <i class="fa-solid fa-leaf"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs uppercase tracking-widest font-extrabold text-emerald-300">
                    ${a?"የምርት መረጃ እና ዝርዝር":"PRODUCE POST & FARM DETAILS"}
                  </span>
                  <span class="bg-emerald-500/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    ${e.category}
                  </span>
                </div>
                <h2 class="text-lg font-black text-white leading-tight ${a?"lang-am":""}">
                  ${a&&e.nameAm?e.nameAm:e.productName}
                </h2>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.shareProduceListing('${e.id}')" title="${a?"ምርቱን ያጋሩ":"Share Produce Post"}" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-share-nodes text-sm"></i>
              </button>
              <button onclick="window.closeProduceDetail()" title="Close" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-600/80 text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-base"></i>
              </button>
            </div>
          </div>

          <!-- Modal Scrollable Body -->
          <div class="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6 bg-slate-50/50">
            
            <!-- Top Grid: Image Gallery & Key Price / Escrow Snapshot -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <!-- Left Column: Interactive Image Gallery (7 Cols) -->
              <div class="lg:col-span-7 space-y-3">
                
                <!-- Main High-Resolution Hero Photo Preview -->
                <div class="relative w-full h-72 sm:h-88 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 group bg-slate-950">
                  <img 
                    id="produceHeroImage" 
                    src="${n}" 
                    alt="${e.productName}" 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  <!-- Gradient Vignette -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

                  <!-- Floating Quality Badges (Top Left) -->
                  <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-emerald-500/40 flex items-center gap-1.5">
                      <i class="fa-solid fa-award text-amber-400"></i> ${e.grade||"Grade 1"}
                    </span>
                    ${e.requiresColdChain?`
                      <span class="bg-cyan-950/90 backdrop-blur-md text-cyan-200 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-cyan-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-snowflake text-cyan-400"></i> Cold-Chain (0°C - 8°C)
                      </span>
                    `:""}
                    ${e.isAggregatedLot||e.cooperativeName?`
                      <span class="bg-amber-950/90 backdrop-blur-md text-amber-200 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-amber-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-users text-amber-300"></i> ${e.cooperativeName||"Cooperative Union Batch"}
                      </span>
                    `:""}
                    ${e.isOrganic?`
                      <span class="bg-teal-900/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-teal-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-seedling text-emerald-400"></i> 100% Organic
                      </span>
                    `:""}
                    ${e.isAdvanceHarvest?`
                      <span class="bg-amber-900/90 backdrop-blur-md text-amber-100 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-amber-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-calendar-check text-amber-300"></i> Advance Harvest
                      </span>
                    `:""}
                  </div>

                  <!-- Floating Price Tag (Top Right) -->
                  <div class="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl shadow-xl border border-white/20 text-right z-10">
                    <div class="text-xs text-slate-300 font-semibold uppercase tracking-wider">Direct Farm Rate</div>
                    <div class="text-xl font-black text-emerald-400 flex items-baseline justify-end gap-1">
                      ${e.pricePerKg} <span class="text-xs font-bold text-white">ETB/kg</span>
                    </div>
                  </div>

                  <!-- Floating Bottom Information Pill (Bottom Left) -->
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                    <div class="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                      <i class="fa-solid fa-location-dot text-emerald-400"></i>
                      <span class="font-bold">${e.region}</span>
                      ${e.distanceKm?`<span class="text-slate-300 font-medium">(${e.distanceKm} km from Addis)</span>`:""}
                    </div>

                    <span class="bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 text-[11px] font-bold text-slate-200 flex items-center gap-1">
                      <i class="fa-solid fa-images text-emerald-400"></i> ${i+1} / ${s.length}
                    </span>
                  </div>
                </div>

                <!-- Multiple Photo Gallery Thumbnails (Click to Switch) -->
                ${s.length>1?`
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                      <span><i class="fa-solid fa-camera mr-1 text-emerald-600"></i> ${t.photoGallery} (${s.length} angles)</span>
                      <span class="text-[10px] text-slate-400 font-normal">Click thumbnail to inspect</span>
                    </div>
                    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      ${s.map((T,w)=>`
                        <button 
                          onclick="window.selectProducePhoto(${w})" 
                          class="relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${w===i?"border-emerald-600 ring-2 ring-emerald-500/30 scale-102 shadow-md":"border-slate-200 hover:border-emerald-400 opacity-70 hover:opacity-100"}"
                        >
                          <img src="${T}" alt="Photo angle ${w+1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                          <span class="absolute bottom-1 right-1 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                            ${w===0?"Harvest":w===1?"Packaged":"Inspection"}
                          </span>
                        </button>
                      `).join("")}
                    </div>
                  </div>
                `:""}

              </div>

              <!-- Right Column: Farmer Credibility & Benchmarking (5 Cols) -->
              <div class="lg:col-span-5 space-y-4">
                
                <!-- Farmer / Producer Trust Badge Card -->
                <div class="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 text-white flex items-center justify-center text-xl font-bold shadow-md">
                        <i class="fa-solid fa-user-shield"></i>
                      </div>
                      <div>
                        <div class="flex items-center gap-1.5">
                          <h4 class="font-extrabold text-slate-900 text-sm">
                            ${a&&e.farmerNameAm?e.farmerNameAm:e.farmerName}
                          </h4>
                          <i class="fa-solid fa-circle-check text-emerald-600 text-sm" title="Verified Fayda Smallholder"></i>
                        </div>
                        <p class="text-xs text-slate-500 font-medium">
                          ${e.region} · Kebele Producer
                        </p>
                      </div>
                    </div>

                    <div class="text-right">
                      <div class="flex items-center justify-end text-amber-500 text-sm font-black">
                        <i class="fa-solid fa-star mr-1"></i> ${c.getFarmerRatingStats(e.farmerId).averageRating}
                      </div>
                      <div class="text-[10px] text-slate-400 font-medium">${c.getFarmerRatingStats(e.farmerId).reviewCount} ${t.verifiedReviewsTitle||"Verified Reviews"}</div>
                    </div>
                  </div>

                  <!-- Producer Trust Indicators -->
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div class="text-[10px] text-slate-400 uppercase font-bold">Repeat Wholesalers</div>
                      <div class="font-black text-slate-800 text-sm mt-0.5">
                        <i class="fa-solid fa-repeat text-emerald-600 mr-1"></i> ${e.repeatBuyerCount||18} Buyers
                      </div>
                    </div>
                    <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div class="text-[10px] text-slate-400 uppercase font-bold">On-Time Dispatch</div>
                      <div class="font-black text-emerald-700 text-sm mt-0.5">
                        <i class="fa-solid fa-truck-fast text-emerald-600 mr-1"></i> ${e.onTimeDeliveryRate||99}%
                      </div>
                    </div>
                  </div>

                  <!-- Direct Producer Contact Actions -->
                  <div class="flex items-center gap-2 pt-1">
                    <a href="tel:${e.farmerPhone}" class="btn-secondary flex-1 py-2 text-xs font-bold text-center justify-center text-slate-700 hover:bg-slate-100">
                      <i class="fa-solid fa-phone text-emerald-600 mr-1.5"></i> ${t.callFarmer}
                    </a>
                    <button onclick="window.sendSmsInquiry('${e.farmerPhone}', '${e.productName}')" class="btn-secondary flex-1 py-2 text-xs font-bold text-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer">
                      <i class="fa-solid fa-comment-sms text-blue-600 mr-1.5"></i> ${t.smsInquiry}
                    </button>
                  </div>
                </div>

                <!-- Price Benchmarking & Wholesale Savings Card -->
                <div class="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-emerald-500/10 p-4.5 rounded-2xl border border-amber-200/80 space-y-2.5">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-extrabold text-amber-900 flex items-center gap-1.5">
                      <i class="fa-solid fa-chart-line text-amber-600"></i> ${t.marketComparison}
                    </span>
                    <span class="trend-badge trend-down text-[10px]">
                      <i class="fa-solid fa-arrow-down"></i> ${$}% Direct Savings
                    </span>
                  </div>

                  <div class="flex items-baseline justify-between pt-1">
                    <div>
                      <div class="text-[11px] text-slate-500">Regional Depot Benchmark</div>
                      <div class="text-sm font-bold text-slate-700 line-through">
                        ${v.toFixed(1)} ETB/kg
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-[11px] text-emerald-700 font-bold">Farmer Direct Price</div>
                      <div class="text-lg font-black text-emerald-800">
                        ${e.pricePerKg} ETB/kg
                      </div>
                    </div>
                  </div>

                  <div class="text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-amber-200/50 leading-tight">
                    <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i>
                    Eliminates 3 intermediary middleman margins. You save <strong class="text-emerald-800 font-bold">${k.toFixed(1)} ETB/kg</strong> while smallholder receives full 90% value.
                  </div>
                </div>

                <!-- Telebirr Escrow Protection Guarantee -->
                <div class="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-200 text-xs space-y-1 text-blue-950">
                  <div class="flex items-center gap-2 font-black text-blue-900">
                    <i class="fa-solid fa-shield-halved text-blue-600 text-base"></i>
                    <span>Telebirr Escrow Guarantee (No Financial Risk)</span>
                  </div>
                  <p class="text-[11px] text-blue-800/90 leading-tight">
                    Your payment is held in escrow until driver delivers to your warehouse and you physically inspect produce quality. Full refund guarantee on transit spoilage.
                  </p>
                </div>

              </div>

            </div>

            <!-- Full Rich Description & Agricultural Specifications -->
            <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2 ${a?"lang-am":""}">
                  <i class="fa-solid fa-align-left text-emerald-600"></i>
                  ${t.cropDescription}
                </h3>
                <span class="text-xs font-bold text-slate-400">
                  Batch #ET-${e.id.slice(0,8).toUpperCase()}
                </span>
              </div>

              <!-- Bilingual Description Tabs / Content -->
              <div class="space-y-3 text-slate-700 leading-relaxed text-sm">
                <p class="font-medium text-slate-800">
                  ${u}
                </p>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-800 lang-am text-xs font-medium leading-relaxed">
                  <span class="font-bold text-emerald-800 block mb-1">የምርት ዝርዝር መግለጫ (አማርኛ)፡</span>
                  ${S}
                </div>
              </div>

              <!-- Produce Specifications Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Quality Grade</div>
                  <div class="font-extrabold text-slate-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-award text-amber-600"></i> ${e.grade||"Grade 1"}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Ripeness / Maturity</div>
                  <div class="font-extrabold text-slate-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-clock text-blue-600"></i> ${e.ripeness||"Ready Today"}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Available Stock</div>
                  <div class="font-extrabold text-emerald-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-boxes-stacked text-emerald-600"></i> ${e.qtyKg.toLocaleString()} kg
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Min Bulk Order</div>
                  <div class="font-extrabold text-slate-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-scale-balanced text-purple-600"></i> ${e.minOrderKg} kg
                  </div>
                </div>

              </div>

              <!-- Voice Note Memo Player (If Available) -->
              ${e.voiceNoteTranscript?`
                <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow">
                        <i class="fa-solid fa-microphone"></i>
                      </div>
                      <div>
                        <div class="font-bold text-emerald-950 text-xs">Farmer Audio Memo & Speech Transcript</div>
                        <div class="text-[10px] text-emerald-700">Recorded in Bishoftu Farm Zone (Amharic)</div>
                      </div>
                    </div>
                    
                    <button onclick="window.playSimulatedVoiceNote('${e.id}')" class="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs">
                      <i id="voicePlayIcon-${e.id}" class="fa-solid fa-play text-[10px]"></i>
                      <span id="voicePlayText-${e.id}">Play Voice Memo</span>
                    </button>
                  </div>

                  <div class="p-2.5 bg-white rounded-lg border border-emerald-100 text-xs text-slate-800 italic flex items-center gap-2">
                    <i class="fa-solid fa-quote-left text-emerald-400 text-sm"></i>
                    <span>"${e.voiceNoteTranscript}"</span>
                  </div>
                </div>
              `:""}

            </div>

            <!-- Verified Customer Reviews & Feedback Section -->
            ${(()=>{const T=c.getReviewsForFarmer(e.farmerId),w=c.getFarmerRatingStats(e.farmerId);return`
                <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                    <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2 ${a?"lang-am":""}">
                      <i class="fa-solid fa-star-half-stroke text-amber-500"></i>
                      ${t.verifiedBuyerReviews}
                    </h3>
                    <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ${w.reviewCount} ${t.allReviews||"Verified Reviews"}
                    </span>
                  </div>

                  <!-- Rating Overview & Breakdown Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 via-slate-50 to-emerald-50/40 border border-slate-200/80 items-center">
                    
                    <!-- Big Score (4 Cols) -->
                    <div class="sm:col-span-4 text-center sm:text-left sm:border-r border-slate-200 sm:pr-4 space-y-1">
                      <div class="text-4xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1">
                        ${w.averageRating}
                        <span class="text-base font-bold text-slate-400">/ 5.0</span>
                      </div>
                      <div class="flex items-center justify-center sm:justify-start text-amber-400 text-sm gap-0.5">
                        ${[1,2,3,4,5].map(E=>`
                          <i class="fa-solid fa-star ${E<=Math.round(w.averageRating)?"text-amber-400":"text-slate-300"}"></i>
                        `).join("")}
                      </div>
                      <p class="text-[11px] text-slate-500 font-medium">
                        Based on ${w.reviewCount} verified smallholder escrow deliveries
                      </p>
                    </div>

                    <!-- Star Breakdown Bars (8 Cols) -->
                    <div class="sm:col-span-8 space-y-1.5 text-xs">
                      ${[5,4,3,2,1].map(E=>{const L=w.distribution[E]||0,V=w.distributionCounts[E]||0;return`
                          <div class="flex items-center gap-2">
                            <span class="w-8 text-[11px] font-bold text-slate-600 shrink-0 text-right">${E} ★</span>
                            <div class="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                              <div class="h-full bg-amber-400 rounded-full transition-all duration-500" style="width: ${L}%"></div>
                            </div>
                            <span class="w-12 text-[10px] text-slate-400 font-bold shrink-0 text-right">${V} (${L}%)</span>
                          </div>
                        `}).join("")}
                    </div>

                  </div>

                  <!-- Reviews & Comments List -->
                  ${T.length===0?`
                    <div class="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <i class="fa-regular fa-comment-dots text-2xl mb-1 text-slate-300"></i>
                      <p class="font-bold text-slate-600">${t.noReviewsYet}</p>
                    </div>
                  `:`
                    <div class="space-y-3 pt-1">
                      ${T.map(E=>`
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 hover:bg-slate-50/80 transition-colors">
                          <div class="flex items-center justify-between flex-wrap gap-2">
                            <div class="flex items-center gap-2.5">
                              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                ${E.reviewerName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div class="flex items-center gap-1.5">
                                  <span class="font-bold text-slate-900 text-xs">${E.reviewerName}</span>
                                  <span class="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                                    <i class="fa-solid fa-circle-check text-[8px]"></i> ${t.verifiedBuyerBadge}
                                  </span>
                                </div>
                                <span class="text-[10px] text-slate-400 font-medium">${E.createdAt}</span>
                              </div>
                            </div>

                            <div class="flex items-center text-amber-400 text-xs gap-0.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs">
                              ${[1,2,3,4,5].map(L=>`
                                <i class="fa-solid fa-star ${L<=E.rating?"text-amber-400":"text-slate-200"}"></i>
                              `).join("")}
                              <span class="font-bold text-slate-700 ml-1 text-[11px]">${E.rating}.0</span>
                            </div>
                          </div>

                          ${E.quickTags&&E.quickTags.length>0?`
                            <div class="flex flex-wrap gap-1 pt-0.5">
                              ${E.quickTags.map(L=>`
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                                  ${L}
                                </span>
                              `).join("")}
                            </div>
                          `:""}

                          ${E.comment?`
                            <p class="text-xs text-slate-700 leading-relaxed font-medium bg-white p-2.5 rounded-xl border border-slate-100 italic">
                              "${E.comment}"
                            </p>
                          `:""}
                        </div>
                      `).join("")}
                    </div>
                  `}

                </div>
              `})()}

            <!-- Interactive Bulk Order & Quantity Calculator Bar -->
            <div class="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-emerald-900/60 space-y-5">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h4 class="text-sm font-extrabold text-white flex items-center gap-2">
                    <i class="fa-solid fa-calculator text-emerald-400"></i>
                    ${t.selectOrderQty}
                  </h4>
                  <p class="text-xs text-slate-300">
                    Enter required wholesale volume in kilograms (Min. ${e.minOrderKg} kg · Max. ${e.qtyKg.toLocaleString()} kg)
                  </p>
                </div>

                <div class="flex items-center gap-1.5 flex-wrap">
                  <button onclick="window.setProduceOrderQty(${e.minOrderKg})" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    Min (${e.minOrderKg} kg)
                  </button>
                  <button onclick="window.setProduceOrderQty(100)" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    100 kg
                  </button>
                  <button onclick="window.setProduceOrderQty(500)" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    500 kg
                  </button>
                  <button onclick="window.setProduceOrderQty(1000)" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    1,000 kg (1 Ton)
                  </button>
                </div>
              </div>

              <!-- Quantity Input + Subtotal Breakdown -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                <!-- Step Input Controls (5 Cols) -->
                <div class="md:col-span-5 flex items-center gap-2">
                  <button 
                    onclick="window.setProduceOrderQty(${Math.max(e.minOrderKg,r-50)})" 
                    class="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center font-black text-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  
                  <div class="flex-1 relative">
                    <input 
                      type="number" 
                      id="modalOrderQtyInput"
                      min="${e.minOrderKg}" 
                      max="${e.qtyKg}" 
                      value="${r}" 
                      onchange="window.setProduceOrderQty(Number(this.value))"
                      class="w-full h-11 bg-white/10 border border-white/20 rounded-xl px-3 text-center text-white font-extrabold text-base focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                    <span class="absolute right-3 top-3 text-xs text-slate-400 font-bold pointer-events-none">kg</span>
                  </div>

                  <button 
                    onclick="window.setProduceOrderQty(${Math.min(e.qtyKg,r+50)})" 
                    class="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center font-black text-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <!-- Subtotal Breakdown (7 Cols) -->
                <div class="md:col-span-7 bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div class="space-y-0.5 text-xs">
                    <div class="text-slate-400">Total Produce Price:</div>
                    <div class="text-2xl font-black text-emerald-400">
                      ${d.toLocaleString()} <span class="text-xs font-normal text-slate-300">ETB</span>
                    </div>
                  </div>

                  <div class="text-right text-[11px] text-slate-300 space-y-0.5 border-l border-white/10 pl-4">
                    <div>Farmer Payout (90%): <strong class="text-emerald-300 font-bold">${p.toLocaleString()} ETB</strong></div>
                    <div>Driver & Escrow (10%): <strong class="text-slate-200">${(l+b).toLocaleString()} ETB</strong></div>
                    <div class="text-[10px] text-amber-300 font-bold"><i class="fa-solid fa-stamp mr-1"></i> Tax-Exempt Produce (Art. 979)</div>
                  </div>
                </div>

              </div>

              <!-- Action Buttons: Add to Cart & Buy Now with Escrow -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button 
                  onclick="window.addProduceDetailToCart('${e.id}', ${r})" 
                  class="btn-secondary py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <i class="fa-solid fa-cart-plus text-emerald-700"></i>
                  ${t.addToCart} (${r} kg)
                </button>

                <button 
                  onclick="window.buyProduceNow('${e.id}', ${r})" 
                  class="btn-primary py-3 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                >
                  <i class="fa-solid fa-shield-halved text-amber-300"></i>
                  ${t.buyNowEscrow}
                </button>
              </div>

            </div>

          </div>

          <!-- Modal Footer with Contract Link -->
          <div class="bg-slate-100 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-file-contract text-emerald-700"></i>
              <span>Standard Ethiopian Agricultural Sales Agreement automatically generated upon order.</span>
            </div>

            <button onclick="window.closeProduceDetail()" class="text-slate-600 hover:text-slate-900 font-bold cursor-pointer">
              Close Details
            </button>
          </div>

        </div>
      </div>
    `}}const Ce=new $s;function Es(o,e=!1,t=!1,a=null,s=!1,i=!1,n=!1,r=null,d=!1,p=null,l=!1,b=null,v=!1,k=!1,$=null){return`
    <!-- Create User Modal -->
    ${e?`
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
        <div class="glass-card max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
          <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 text-white relative">
            <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-400 flex items-center justify-center text-xl font-black">
                <i class="fa-solid fa-user-plus"></i>
              </div>
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-rose-400/90">Super Admin Manual Onboarding</span>
                <h3 class="text-lg font-black text-white">Create New Account (Direct Onboarding)</h3>
              </div>
            </div>
          </div>

          <form onsubmit="window.handleCreateUserSubmit(event)" class="p-6 space-y-4 text-xs">
            <div>
              <label class="block mb-1.5 font-bold text-slate-800">Assigned Account Role</label>
              <select id="newRoleSelect" required onchange="window.handleRoleChangeInModal(this.value)" class="input-field text-xs font-bold bg-slate-50">
                <option value="farmer">🌾 Smallholder Farmer / Producer</option>
                <option value="buyer">🛒 Wholesale Buyer / Supermarket</option>
                <option value="driver">🚚 Freight Logistics Driver</option>
                <option value="agent">👥 Field Extension Agent</option>
                <option value="admin">🛡️ Platform Admin</option>
                <option value="superadmin">👑 Super Admin (Root Access)</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Full Name (English)</label>
                <input type="text" id="newNameInput" required placeholder="e.g. Abebe Kebede" class="input-field text-xs font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Full Name (Amharic / Optional)</label>
                <input type="text" id="newNameAmInput" placeholder="አበበ ከበደ" class="input-field text-xs font-bold" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Ethiopian Mobile Number</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">+251</span>
                  <input type="tel" id="newPhoneInput" required placeholder="911 223 344" class="input-field pl-12 text-xs font-bold font-mono" />
                </div>
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Region / Woreda</label>
                <input type="text" id="newRegionInput" required placeholder="e.g. Oromia (Bishoftu / Ada'a)" class="input-field text-xs font-bold" />
              </div>
            </div>

            <!-- Dynamic Role-Specific Fields Container -->
            <div id="roleSpecificFields" class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <!-- Farmer Defaults -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Primary Produce / Crop</label>
                  <input type="text" id="newPrimaryCropInput" placeholder="e.g. Magna Teff, Fresh Tomatoes" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Kebele / Farm Location</label>
                  <input type="text" id="newKebeleInput" placeholder="e.g. Kebele 03 Farm Cluster" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">National ID (Fayda FAN)</label>
                  <input type="text" id="newFaydaInput" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-bold font-mono" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Taxpayer ID (TIN Number)</label>
                  <input type="text" id="newTinInput" placeholder="10-digit TIN" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input type="checkbox" id="newVerifiedCheck" checked class="rounded text-emerald-600" />
                <span>Mark as Pre-Verified (Bypass Document Queue)</span>
              </label>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="btn-primary py-2.5 px-5 font-bold shadow-md cursor-pointer flex items-center gap-1.5">
                <i class="fa-solid fa-user-plus"></i> Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    `:""}

    <!-- Edit User Modal -->
    ${t&&a?(()=>{const u=c.getUserById(a);return u?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
            <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-5 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <h3 class="text-base font-black text-white">Edit User Profile: ${u.name}</h3>
              <p class="text-[11px] text-slate-400 font-mono">${u.id}</p>
            </div>

            <form onsubmit="window.handleEditUserSubmit(event, '${u.id}')" class="p-6 space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Full Name</label>
                  <input type="text" id="editNameInput" required value="${u.name}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Mobile Phone</label>
                  <input type="tel" id="editPhoneInput" required value="${u.phone}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Role</label>
                  <select id="editRoleSelect" class="input-field text-xs font-bold">
                    <option value="farmer" ${u.role==="farmer"?"selected":""}>Farmer</option>
                    <option value="buyer" ${u.role==="buyer"?"selected":""}>Buyer</option>
                    <option value="driver" ${u.role==="driver"?"selected":""}>Driver</option>
                    <option value="agent" ${u.role==="agent"?"selected":""}>Agent</option>
                    <option value="admin" ${u.role==="admin"?"selected":""}>Admin</option>
                    <option value="superadmin" ${u.role==="superadmin"?"selected":""}>Super Admin</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Status</label>
                  <select id="editStatusSelect" class="input-field text-xs font-bold">
                    <option value="active" ${u.status!=="suspended"?"selected":""}>Active</option>
                    <option value="suspended" ${u.status==="suspended"?"selected":""}>Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region</label>
                <input type="text" id="editRegionInput" required value="${u.region}" class="input-field text-xs font-bold" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Fayda National ID</label>
                  <input type="text" id="editFaydaInput" value="${u.faydaId||""}" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-mono font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">TIN Number</label>
                  <input type="text" id="editTinInput" value="${u.tinNumber||""}" placeholder="0011223344" class="input-field text-xs font-mono font-bold" />
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="btn-primary py-2 px-4 font-bold shadow-md cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      `:""})():""}

    <!-- Add Delivery Zone Modal -->
    ${s?`
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
        <div class="glass-card max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
          <div class="bg-gradient-to-r from-slate-950 to-teal-950 p-5 text-white relative">
            <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <h3 class="text-base font-black text-white">Add Regional Delivery Zone</h3>
          </div>

          <form onsubmit="window.handleAddZoneSubmit(event)" class="p-6 space-y-3.5 text-xs">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Zone Name (English)</label>
              <input type="text" id="zoneNameInput" required placeholder="e.g. Afar Awash Agricultural Corridor" class="input-field text-xs font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Terminal Hub Name</label>
              <input type="text" id="zoneHubInput" required placeholder="e.g. Semera Wholesale Transit Terminal" class="input-field text-xs font-bold" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Center Latitude</label>
                <input type="number" step="0.0001" id="zoneLatInput" required value="11.7934" class="input-field text-xs font-mono font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Center Longitude</label>
                <input type="number" step="0.0001" id="zoneLngInput" required value="41.0094" class="input-field text-xs font-mono font-bold" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Base Radius (km)</label>
                <input type="number" id="zoneRadiusInput" required value="50" class="input-field text-xs font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Rural Bonus (ETB)</label>
                <input type="number" id="zoneBonusInput" required value="300" class="input-field text-xs font-bold" />
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="btn-primary py-2 px-4 font-bold shadow-md cursor-pointer">
                Save Zone
              </button>
            </div>
          </form>
        </div>
      </div>
    `:""}

    <!-- Add Blacklist Modal -->
    ${i?`
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
        <div class="glass-card max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
          <div class="bg-gradient-to-r from-slate-950 to-red-950 p-5 text-white relative">
            <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <h3 class="text-base font-black text-white">Add Entity to Global Blacklist</h3>
          </div>

          <form onsubmit="window.handleAddBlacklistSubmit(event)" class="p-6 space-y-3.5 text-xs">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Entity Type</label>
              <select id="blTypeSelect" class="input-field text-xs font-bold">
                <option value="Phone">Mobile Phone Number</option>
                <option value="NationalId">Fayda National ID (FAN)</option>
                <option value="TinNumber">Taxpayer ID (TIN)</option>
                <option value="IpAddress">IP Address / Subnet</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Value to Blacklist</label>
              <input type="text" id="blValueInput" required placeholder="e.g. +251911000000 OR FAN-9999-..." class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Reason / Infraction Details</label>
              <textarea id="blReasonInput" required rows="3" placeholder="Describe the reason for blacklisting..." class="input-field text-xs"></textarea>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md cursor-pointer">
                Blacklist Entity
              </button>
            </div>
          </form>
        </div>
      </div>
    `:""}

    <!-- Create / Edit Banner Modal -->
    ${n?(()=>{var S,T,w,E;const u=r?c.getBannerById(r):null;return`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn max-h-[90vh] flex flex-col">
            <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xl font-black">
                  <i class="fa-solid fa-panorama"></i>
                </div>
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400/90">Promotions & Bulletins</span>
                  <h3 class="text-lg font-black text-white">${u?"Edit Promotional Banner":"Create Promotional Banner"}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleSaveBannerSubmit(event, '${r||""}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (English) *</label>
                  <input type="text" id="bannerTitleInput" required value="${u?u.title:""}" placeholder="e.g. Fresh Harvest Direct From Bishoftu" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (Amharic)</label>
                  <input type="text" id="bannerTitleAmInput" value="${(u==null?void 0:u.titleAm)||""}" placeholder="የቢሾፍቱ አዳዲስ ምርቶች በቀጥታ ከእርሻ" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (English)</label>
                  <textarea id="bannerSubtitleInput" rows="2" placeholder="Brief announcement details..." class="input-field text-xs">${(u==null?void 0:u.subtitle)||""}</textarea>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (Amharic)</label>
                  <textarea id="bannerSubtitleAmInput" rows="2" placeholder="የማስታወቂያው ዝርዝር..." class="input-field text-xs">${(u==null?void 0:u.subtitleAm)||""}</textarea>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Audience</label>
                  <select id="bannerAudienceSelect" class="input-field text-xs font-bold">
                    <option value="All" ${(u==null?void 0:u.targetAudience)==="All"?"selected":""}>🌐 All Portals</option>
                    <option value="Buyer" ${(u==null?void 0:u.targetAudience)==="Buyer"?"selected":""}>🛒 Wholesale Buyers</option>
                    <option value="Farmer" ${(u==null?void 0:u.targetAudience)==="Farmer"?"selected":""}>🌾 Farmers & Producers</option>
                    <option value="Driver" ${(u==null?void 0:u.targetAudience)==="Driver"?"selected":""}>🚚 Logistics Drivers</option>
                    <option value="Agent" ${(u==null?void 0:u.targetAudience)==="Agent"?"selected":""}>👥 Extension Agents</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Region</label>
                  <select id="bannerRegionSelect" class="input-field text-xs font-bold">
                    <option value="All" ${(u==null?void 0:u.targetRegion)==="All"?"selected":""}>All Regions</option>
                    <option value="Addis Ababa" ${(u==null?void 0:u.targetRegion)==="Addis Ababa"?"selected":""}>Addis Ababa</option>
                    <option value="Oromia" ${(u==null?void 0:u.targetRegion)==="Oromia"?"selected":""}>Oromia</option>
                    <option value="Amhara" ${(u==null?void 0:u.targetRegion)==="Amhara"?"selected":""}>Amhara</option>
                    <option value="Sidama" ${(u==null?void 0:u.targetRegion)==="Sidama"?"selected":""}>Sidama</option>
                    <option value="SNNPR" ${(u==null?void 0:u.targetRegion)==="SNNPR"?"selected":""}>SNNPR</option>
                    <option value="Tigray" ${(u==null?void 0:u.targetRegion)==="Tigray"?"selected":""}>Tigray</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Display Priority (1-10)</label>
                  <input type="number" id="bannerPriorityInput" min="1" max="10" value="${u?u.priority:5}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (e.g. Harvest 2026)</label>
                  <input type="text" id="bannerBadgeInput" value="${(u==null?void 0:u.badgeText)||""}" placeholder="e.g. Special Promotion" class="input-field text-xs" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (Amharic)</label>
                  <input type="text" id="bannerBadgeAmInput" value="${(u==null?void 0:u.badgeTextAm)||""}" placeholder="e.g. ልዩ ቅናሽ" class="input-field text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Button Text</label>
                  <input type="text" id="bannerCtaTextInput" value="${(u==null?void 0:u.ctaText)||"Browse Marketplace"}" placeholder="e.g. Order Now" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Target Action / Tab</label>
                  <select id="bannerCtaLinkSelect" class="input-field text-xs font-bold">
                    <option value="marketplace" ${(u==null?void 0:u.ctaLink)==="marketplace"?"selected":""}>🛒 Marketplace (Buyer)</option>
                    <option value="farmer" ${(u==null?void 0:u.ctaLink)==="farmer"?"selected":""}>🌾 Farmer Portal</option>
                    <option value="driver" ${(u==null?void 0:u.ctaLink)==="driver"?"selected":""}>🚚 Driver Logistics</option>
                    <option value="agent" ${(u==null?void 0:u.ctaLink)==="agent"?"selected":""}>👥 Agent Directory</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Banner Background Image URL</label>
                <input type="url" id="bannerImageUrlInput" value="${(u==null?void 0:u.imageUrl)||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"}" class="input-field text-xs font-mono" />
                <div class="flex flex-wrap gap-2 pt-1.5">
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🌾 Fresh Harvest</button>
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1592417817098-8f3d6910a711?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🛡️ Fayda & ID</button>
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🚚 Cold Chain Logistics</button>
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🏪 Wholesale Market</button>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Theme Gradient Style</label>
                <select id="bannerGradientSelect" class="input-field text-xs font-bold">
                  <option value="from-emerald-900 via-teal-900 to-slate-900" ${(S=u==null?void 0:u.themeGradient)!=null&&S.includes("emerald")?"selected":""}>🍃 Emerald & Teal (Agriculture/Harvest)</option>
                  <option value="from-blue-900 via-indigo-950 to-slate-900" ${(T=u==null?void 0:u.themeGradient)!=null&&T.includes("blue")?"selected":""}>🔷 Royal Blue & Indigo (Legal/Fayda)</option>
                  <option value="from-amber-900 via-orange-950 to-slate-900" ${(w=u==null?void 0:u.themeGradient)!=null&&w.includes("amber")?"selected":""}>🔶 Amber & Orange (Freight Logistics)</option>
                  <option value="from-rose-950 via-slate-900 to-purple-950" ${(E=u==null?void 0:u.themeGradient)!=null&&E.includes("rose")?"selected":""}>👑 Rose & Purple (Super Admin Spotlight)</option>
                </select>
              </div>

              <div class="flex items-center gap-2 pt-2">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="bannerIsActiveCheck" ${u?u.isActive?"checked":"":"checked"} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Activate Banner Immediately Upon Saving</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="btn-primary py-2 px-5 font-bold shadow-md cursor-pointer">
                  ${u?"Save Changes":"Publish Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      `})():""}

    <!-- Moderate / Edit Produce Listing Modal -->
    ${d&&p?(()=>{var S,T,w;const u=c.getListings().find(E=>E.id===p);return u?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn max-h-[90vh] flex flex-col">
            <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 p-6 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-400 flex items-center justify-center text-xl font-black">
                  <i class="fa-solid fa-gavel"></i>
                </div>
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-purple-400/90">Post & Listing Governance</span>
                  <h3 class="text-lg font-black text-white">Moderate Listing: ${u.productName}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleAdminEditListingSubmit(event, '${u.id}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <!-- Farmer Info Card -->
              <div class="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800">${u.farmerName} <span class="text-slate-400 font-normal">(${u.farmerPhone})</span></p>
                  <p class="text-[11px] text-slate-500">${u.region}</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-white text-purple-800 border border-purple-200 text-[10px] font-bold">
                  Listing ID: ${u.id.slice(0,8)}...
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (English) *</label>
                  <input type="text" id="listingNameInput" required value="${u.productName}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (Amharic)</label>
                  <input type="text" id="listingNameAmInput" value="${u.nameAm||""}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Produce Category</label>
                  <select id="listingCategorySelect" class="input-field text-xs font-bold">
                    <option value="Vegetables" ${u.category==="Vegetables"?"selected":""}>Vegetables</option>
                    <option value="Cereals" ${u.category==="Cereals"?"selected":""}>Cereals / Grains</option>
                    <option value="Fruits" ${u.category==="Fruits"?"selected":""}>Fruits</option>
                    <option value="Pulses" ${u.category==="Pulses"?"selected":""}>Pulses</option>
                    <option value="Spices" ${u.category==="Spices"?"selected":""}>Spices</option>
                    <option value="Oilseeds" ${u.category==="Oilseeds"?"selected":""}>Oilseeds</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Grade / Quality</label>
                  <select id="listingGradeSelect" class="input-field text-xs font-bold">
                    <option value="Grade 1 (Premium / Export)" ${(S=u.grade)!=null&&S.includes("1")?"selected":""}>Grade 1 (Premium / Export)</option>
                    <option value="Grade 2 (Standard Wholesale)" ${(T=u.grade)!=null&&T.includes("2")||!u.grade?"selected":""}>Grade 2 (Standard Wholesale)</option>
                    <option value="Grade 3 (Processing / Bulk)" ${(w=u.grade)!=null&&w.includes("3")?"selected":""}>Grade 3 (Processing / Bulk)</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Moderation Status</label>
                  <select id="listingModerationStatusSelect" class="input-field text-xs font-bold ${u.moderationStatus==="Flagged"?"bg-red-50 text-red-800":"bg-emerald-50 text-emerald-800"}">
                    <option value="Approved" ${u.moderationStatus==="Approved"||!u.moderationStatus?"selected":""}>✅ Approved (Live on Marketplace)</option>
                    <option value="PendingReview" ${u.moderationStatus==="PendingReview"?"selected":""}>⏳ Pending Review (Hidden)</option>
                    <option value="Flagged" ${u.moderationStatus==="Flagged"?"selected":""}>⚠️ Flagged (Price Anomaly / Review)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Price per Kg (ETB) *</label>
                  <input type="number" step="0.5" id="listingPriceInput" required value="${u.pricePerKg}" class="input-field text-xs font-bold font-mono" />
                  <span class="text-[10px] text-slate-400">Benchmark: ${u.marketBenchmarkPrice||50} ETB/kg</span>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Total Available Stock (Kg) *</label>
                  <input type="number" id="listingQtyInput" required value="${u.qtyKg}" class="input-field text-xs font-bold font-mono" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Minimum Order Quantity (Kg)</label>
                  <input type="number" id="listingMinOrderInput" value="${u.minOrderKg||50}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region / Woreda Farm Location</label>
                <input type="text" id="listingRegionInput" value="${u.region}" class="input-field text-xs font-bold" />
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Listing Description</label>
                <textarea id="listingDescInput" rows="3" placeholder="Produce harvest details, packaging, shelf life..." class="input-field text-xs">${u.description||""}</textarea>
              </div>

              <div class="flex items-center gap-4 pt-1">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingOrganicCheck" ${u.isOrganic?"checked":""} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Certified Organic Produce</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingAdvanceHarvestCheck" ${u.isAdvanceHarvest?"checked":""} class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500" />
                  <span>Advance / Pre-Harvest Contract</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button type="button" onclick="window.adminDeleteListing('${u.id}')" class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold border border-red-200 flex items-center gap-1.5 cursor-pointer">
                  <i class="fa-solid fa-trash"></i> Delete Post
                </button>
                <div class="flex items-center gap-2.5">
                  <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" class="btn-primary py-2 px-5 font-bold shadow-md cursor-pointer">
                    Save Moderation Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `:""})():""}

    <!-- Reject High-Value Payout Modal -->
    ${l&&b?(()=>{const u=c.getAllPayoutApprovals().find(S=>S.id===b);return u?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
            <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/30 text-red-400 flex items-center justify-center text-xl font-black">
                  <i class="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-red-400">Multi-Sig Compliance Flag</span>
                  <h3 class="text-lg font-black text-white">Decline High-Value Payout</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleRejectPayoutSubmit(event, '${u.id}')" class="p-6 space-y-4 text-xs">
              
              <!-- Recipient & Amount Summary -->
              <div class="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-800">${u.recipientName}</span>
                  <span class="font-black text-red-800 text-sm font-mono">${u.amountEtb.toLocaleString()} ETB</span>
                </div>
                <div class="flex items-center justify-between text-[11px] text-slate-500">
                  <span class="font-mono">${u.recipientPhone} · ${u.recipientRole.toUpperCase()}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-800">${u.riskScore} RISK</span>
                </div>
                <p class="text-[11px] text-slate-600 font-semibold pt-1 border-t border-red-200/60">
                  Trigger: ${u.triggerReason}
                </p>
              </div>

              <!-- Rejection Reason Select -->
              <div>
                <label class="block mb-1.5 font-bold text-slate-800">Compliance Audit Reason *</label>
                <select id="payoutRejectReasonSelect" required onchange="window.handleRejectReasonChange(this.value)" class="input-field text-xs font-bold bg-slate-50">
                  <option value="Kebele / Fayda ID mismatch or unverified farming certificate">📄 Kebele / Fayda ID mismatch or unverified Kebele farming certificate</option>
                  <option value="Suspected duplicate consignment or inflated harvest claim">⚠️ Suspected duplicate consignment or inflated harvest volume claim</option>
                  <option value="Active unresolved dispute on underlying order">⚖️ Active unresolved dispute on underlying marketplace delivery</option>
                  <option value="High-frequency withdrawal anomaly flagged by risk engine">🚨 High-frequency withdrawal anomaly flagged by platform risk engine</option>
                  <option value="custom">✏️ Custom Audit Rationale (Provide specifics below)...</option>
                </select>
              </div>

              <!-- Custom Reason Details -->
              <div>
                <label class="block mb-1 font-bold text-slate-700">Detailed Auditor Rationale & Instructions</label>
                <textarea id="payoutRejectCustomNote" rows="3" placeholder="Specify investigation notes or requirements needed for the recipient to appeal..." class="input-field text-xs"></textarea>
                <p class="text-[10px] text-slate-400 mt-1">This explanation will be logged to the immutable audit trail and sent via SMS to the recipient.</p>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md cursor-pointer flex items-center gap-1.5">
                  <i class="fa-solid fa-ban"></i> Confirm Decline & Flag Account
                </button>
              </div>
            </form>
          </div>
        </div>
      `:""})():""}

    <!-- Simulate High-Value Payout Modal -->
    ${v?`
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
        <div class="glass-card max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
          <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 p-6 text-white relative">
            <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center text-xl font-black">
                <i class="fa-solid fa-vial-circle-check"></i>
              </div>
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">Governance Testing Engine</span>
                <h3 class="text-lg font-black text-white">Simulate High-Value Payout</h3>
              </div>
            </div>
          </div>

          <form onsubmit="window.handleSimulatePayoutSubmit(event)" class="p-6 space-y-4 text-xs">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Beneficiary / Union Name *</label>
                <input type="text" id="simPayoutName" required placeholder="e.g. Bale Wheat Cooperative" value="Ada'a Magna Teff Union" class="input-field text-xs font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Beneficiary Phone *</label>
                <input type="tel" id="simPayoutPhone" required placeholder="+251911..." value="+251911987654" class="input-field text-xs font-bold font-mono" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Role *</label>
                <select id="simPayoutRole" class="input-field text-xs font-bold bg-slate-50">
                  <option value="farmer">🌾 Farmer / Cooperative</option>
                  <option value="driver">🚚 Freight Driver</option>
                </select>
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Withdrawal Amount (ETB) *</label>
                <input type="number" id="simPayoutAmount" required min="50000" step="1000" value="85000" class="input-field text-xs font-bold font-mono" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Risk Level *</label>
                <select id="simPayoutRisk" class="input-field text-xs font-bold bg-slate-50">
                  <option value="Low">🟢 Low Risk</option>
                  <option value="Medium">🟡 Medium Risk</option>
                  <option value="High" selected>🔴 High Risk</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Associated Produce / Crop</label>
                <input type="text" id="simPayoutCrop" placeholder="e.g. White Magna Teff" value="Export-Grade White Teff (150 Quintals)" class="input-field text-xs font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Region / Origin</label>
                <input type="text" id="simPayoutRegion" placeholder="e.g. Oromia (Bishoftu)" value="Oromia (Bishoftu / Ada'a)" class="input-field text-xs font-bold" />
              </div>
            </div>

            <div>
              <label class="block mb-1 font-bold text-slate-700">Trigger Explanation *</label>
              <input type="text" id="simPayoutReason" required value="Commercial wholesale settlement exceeding 50k ETB multi-sig threshold" class="input-field text-xs" />
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="btn-primary py-2 px-5 font-bold shadow-md cursor-pointer flex items-center gap-1.5">
                <i class="fa-solid fa-plus"></i> Inject Payout Request
              </button>
            </div>
          </form>
        </div>
      </div>
    `:""}

    <!-- Payout Detail & Audit Certificate Modal -->
    ${k&&$?(()=>{const u=c.getAllPayoutApprovals().find(w=>w.id===$);if(!u)return"";const S=u.withholdingTaxEtb||Math.round(u.amountEtb*.02),T=u.netDisbursedEtb||u.amountEtb-S;return`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
            <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xl font-black">
                  <i class="fa-solid fa-stamp"></i>
                </div>
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Telebirr Multi-Sig Certificate</span>
                  <h3 class="text-lg font-black text-white">Settlement Audit Record</h3>
                </div>
              </div>
            </div>

            <div class="p-6 space-y-4 text-xs">
              
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-emerald-900">Total Settlement Value:</span>
                  <span class="text-lg font-black text-emerald-800 font-mono">${u.amountEtb.toLocaleString()} ETB</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-emerald-200">
                  <div>
                    <span class="text-emerald-700 block">2% MOR Withholding:</span>
                    <span class="font-bold text-amber-800 font-mono">-${S.toLocaleString()} ETB</span>
                  </div>
                  <div>
                    <span class="text-emerald-700 block">Net Disbursed:</span>
                    <span class="font-black text-emerald-900 font-mono">${T.toLocaleString()} ETB</span>
                  </div>
                </div>
              </div>

              <div class="glass-card p-4 border-slate-200 space-y-2">
                <div class="flex items-center justify-between text-slate-700">
                  <span class="text-slate-500 font-medium">Beneficiary:</span>
                  <span class="font-bold text-slate-900">${u.recipientName}</span>
                </div>
                <div class="flex items-center justify-between text-slate-700">
                  <span class="text-slate-500 font-medium">Phone Number:</span>
                  <span class="font-mono font-bold text-slate-900">${u.recipientPhone}</span>
                </div>
                <div class="flex items-center justify-between text-slate-700">
                  <span class="text-slate-500 font-medium">Assigned Role:</span>
                  <span class="font-bold uppercase text-slate-900">${u.recipientRole}</span>
                </div>
                <div class="flex items-center justify-between text-slate-700">
                  <span class="text-slate-500 font-medium">Telebirr Transaction Reference:</span>
                  <span class="font-mono font-black text-emerald-700">${u.telebirrTxId||"TB-ET-982104"}</span>
                </div>
                <div class="flex items-center justify-between text-slate-700">
                  <span class="text-slate-500 font-medium">Status:</span>
                  <span class="font-black ${u.status==="Approved"?"text-emerald-700":u.status==="Rejected"?"text-red-700":"text-amber-700"}">${u.status.toUpperCase()}</span>
                </div>
                ${u.reviewedBy?`
                  <div class="flex items-center justify-between text-slate-700 pt-1 border-t border-slate-100">
                    <span class="text-slate-500 font-medium">Authorized By:</span>
                    <span class="font-bold text-slate-900">${u.reviewedBy}</span>
                  </div>
                `:""}
                ${u.reviewedAt?`
                  <div class="flex items-center justify-between text-slate-700">
                    <span class="text-slate-500 font-medium">Authorized At:</span>
                    <span class="font-mono text-slate-600">${u.reviewedAt}</span>
                  </div>
                `:""}
              </div>

              <div class="pt-2 flex items-center justify-end">
                <button onclick="window.closeSuperAdminModal()" class="btn-primary py-2 px-6 font-bold cursor-pointer">
                  Close Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      `})():""}
  `}const Re=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Ts(o,e){return`<button onclick="window.setBuyerAccountTab('${o.id}')" class="account-nav-item ${e===o.id?"active":""}">
    <i class="fa-solid ${o.icon} w-5 text-center"></i><span>${o.label}</span>
  </button>`}function Cs(o,e){const t=e.filter(s=>!["delivered","cancelled"].includes(s.status)),a=e.filter(s=>s.status==="delivered").length;return`<div class="space-y-6 animate-fade-in">
    <div class="account-welcome">
      <div><p class="account-kicker">BUYER ACCOUNT</p><h1>Good morning, ${o.name.split(" ")[0]}</h1><p>Everything you need to source, receive, and manage your produce orders.</p></div>
      <button onclick="window.navigateTab('marketplace')" class="btn-primary"><i class="fa-solid fa-store"></i> Browse marketplace</button>
    </div>
    <div class="account-stat-grid">
      <div class="account-stat"><span class="stat-icon green"><i class="fa-solid fa-box"></i></span><div><strong>${t.length}</strong><span>Active orders</span></div></div>
      <div class="account-stat"><span class="stat-icon blue"><i class="fa-solid fa-truck-fast"></i></span><div><strong>${e.filter(s=>s.status==="picked_up").length}</strong><span>In transit</span></div></div>
      <div class="account-stat"><span class="stat-icon gold"><i class="fa-solid fa-circle-check"></i></span><div><strong>${a}</strong><span>Delivered</span></div></div>
      <div class="account-stat"><span class="stat-icon rose"><i class="fa-solid fa-ticket"></i></span><div><strong>3</strong><span>Available coupons</span></div></div>
    </div>
    <section class="account-section"><div class="section-heading"><div><p class="account-kicker">RECENT ACTIVITY</p><h2>Orders at a glance</h2></div><button onclick="window.setBuyerAccountTab('orders')" class="text-action">View all <i class="fa-solid fa-arrow-right"></i></button></div>
      ${e.length?`<div class="account-list">${e.slice(0,3).map(s=>`<div class="order-row"><div class="order-product"><span class="order-thumb"><i class="fa-solid fa-wheat-awn"></i></span><div><strong>${s.productName}</strong><small>Order #${s.id.slice(0,8).toUpperCase()} · ${s.qtyKg} kg · ${s.farmerName}</small></div></div><span class="badge-status status-${s.status}">${s.status.replace("_"," ")}</span><strong class="order-price">${s.totalEtb.toLocaleString()} ETB</strong></div>`).join("")}</div>`:`<div class="empty-account"><i class="fa-solid fa-box-open"></i><p>No orders yet</p><button onclick="window.navigateTab('marketplace')" class="text-action">Find fresh produce</button></div>`}
    </section>
  </div>`}function Rs(o){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR ACCOUNT</p><h1>Profile & personalization</h1><p>Keep your identity and delivery preferences up to date.</p></div>
    <section class="account-section"><div class="profile-header"><div class="avatar-large">${o.name.charAt(0).toUpperCase()}</div><div><h2>${o.name}</h2><p>${o.phone} · ${o.region||"Ethiopia"}</p></div><button class="btn-secondary ml-auto" onclick="window.showAccountToast('Avatar upload is ready for blob storage integration.','fa-image')"><i class="fa-solid fa-camera"></i> Change photo</button></div>
      <form onsubmit="event.preventDefault(); window.saveBuyerProfile()" class="account-form"><label>Full name<input name="name" value="${o.name}" required /></label><label>Amharic name<input name="nameAm" value="${o.nameAm||""}" placeholder="Optional" /></label><label>Region<input name="region" value="${o.region||"Addis Ababa"}" required /></label><label>Email<input type="email" name="email" value="${o.email||""}" placeholder="Optional" /></label><label>Preferred currency<select name="currency"><option>ETB - Ethiopian Birr</option><option>USD - US Dollar</option><option>EUR - Euro</option></select></label><label>Preferred language<select name="languagePreference"><option value="en" ${o.languagePreference==="en"?"selected":""}>English</option><option value="am" ${o.languagePreference==="am"?"selected":""}>Amharic</option></select></label>
        <div class="form-wide location-field"><div><span class="field-label">Default delivery address</span><input name="savedDeliveryAddress" value="${o.savedDeliveryAddress||""}" placeholder="Street, city, region" /><p>Order locations are captured separately at checkout.</p></div><button type="button" class="btn-secondary" onclick="window.captureBuyerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Use current location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save changes</button></div></form>
    </section></div>`}function Ps(o){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">PURCHASE HISTORY</p><h1>My orders & shipping</h1><p>Track every delivery from farmer confirmation to your doorstep.</p></div><div class="account-tabs"><button class="selected">All <b>${o.length}</b></button><button>To pay <b>0</b></button><button>In transit <b>${o.filter(e=>["confirmed","picked_up"].includes(e.status)).length}</b></button><button>Delivered <b>${o.filter(e=>e.status==="delivered").length}</b></button><button>Disputed <b>${o.filter(e=>e.status==="disputed").length}</b></button></div><section class="account-section"><div class="account-list">${o.length?o.map(e=>`<div class="order-card"><div class="order-row"><div class="order-product"><span class="order-thumb"><i class="fa-solid fa-carrot"></i></span><div><strong>${e.productName}</strong><small>Order #${e.id.slice(0,8).toUpperCase()} · Farmer: ${e.farmerName}</small></div></div><span class="badge-status status-${e.status}">${e.status.replace("_"," ")}</span></div><div class="tracking-line"><span class="done"><i class="fa-solid fa-check"></i> Order placed</span><span class="${["confirmed","picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-check"></i> Farmer confirmed</span><span class="${["picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-truck"></i> In transit</span><span class="${e.status==="delivered"?"done":""}"><i class="fa-solid fa-house"></i> Delivered</span></div><div class="order-footer"><span>${e.qtyKg} kg · ${e.totalEtb.toLocaleString()} ETB</span><span>Payment: ${e.paymentRef||"Telebirr escrow"}</span><button class="text-action" onclick="window.showAccountToast('Live driver location will appear here when assigned.','fa-map-location-dot')">Track delivery <i class="fa-solid fa-arrow-right"></i></button></div></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-box-open"></i><p>Your order history will appear here.</p></div>'}</div></section></div>`}function Is(o,e,t){var n;if(o==="addresses")return _s(t.addresses);if(o==="payments")return Bs(t.paymentMethods);if(o==="disputes")return Ds(e);const s={coupons:{kicker:"SAVINGS",title:"My coupons",description:"Use platform, farmer, and referral rewards at checkout.",icon:"fa-ticket",rows:t.coupons.length?t.coupons.map(r=>`${r.code} · ${r.value}${r.discountType==="Percent"?"%":" ETB"} · Expires ${new Date(r.expiresAt).toLocaleDateString()}`):["No coupons are currently available · Coupons will appear here when issued by the platform or a farmer"]},addresses:{kicker:"DELIVERY",title:"Saved addresses",description:"Manage shipping destinations with flexible Ethiopian address details.",icon:"fa-location-dot",rows:t.addresses.length?t.addresses.map(r=>`${r.name} · ${r.street}, ${r.city}, ${r.region}${r.isDefaultShipping?" · Default shipping":""}`):["No saved addresses yet · Add your first address to speed up checkout"]},payments:{kicker:"CHECKOUT",title:"Payment methods",description:"Payment details stay with Telebirr or Chapa. This account shows references attached to your orders.",icon:"fa-wallet",rows:t.paymentMethods.length?t.paymentMethods.map(r=>`${r.provider} · ${r.maskedDisplay||"Provider token linked"}${r.isPrimary?" · Primary":""}`):e.length?e.map(r=>`${r.paymentRef||"Payment reference pending"} · Order #${r.id.slice(0,8).toUpperCase()} · ${r.totalEtb.toLocaleString()} ETB`):["No payment methods are linked yet"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Open a case for an order that was damaged, missing, wrong, or below quality.",icon:"fa-rotate-left",rows:e.filter(r=>r.status==="disputed").length?e.filter(r=>r.status==="disputed").map(r=>`${r.productName} · Order #${r.id.slice(0,8).toUpperCase()} · ${r.disputeStatus||"Under review"}`):["No open disputes · Refunds return through the original Telebirr or Chapa method","Dispute window: 3 days after delivery · Proof supports up to 5 images and 1 video"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Choose how Farmer-to-Market keeps you informed and how your data is used.",icon:"fa-sliders",rows:t.notificationPreferences.length?t.notificationPreferences.map(r=>`${r.eventType} · SMS ${r.smsEnabled?"on":"off"} · In-app ${r.inAppEnabled?"on":"off"}`):["No notification preferences saved yet · Defaults are applied by the server"]},security:{kicker:"PROTECTION",title:"Security",description:"Keep your account protected with password, two-factor authentication, and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the form below",`Two-factor authentication · ${(n=t.twoFactor)!=null&&n.isEnabled?`${t.twoFactor.method} enabled`:"Not enabled"}`,`Active sessions · ${t.sessions.length} active session${t.sessions.length===1?"":"s"}`]}}[o],i=o==="security"?'<form onsubmit="event.preventDefault(); window.changeBuyerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required /></label><label>New password<input type="password" name="newPassword" minlength="8" required /></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form><button class="btn-secondary mt-4" onclick="window.revokeBuyerSessions()"><i class="fa-solid fa-right-from-bracket"></i> Log out all other sessions</button>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${s.kicker}</p><h1>${s.title}</h1><p>${s.description}</p></div><section class="account-section"><div class="module-list">${s.rows.map(r=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${s.icon}"></i></span><div><strong>${r.split(" · ")[0]}</strong><p>${r.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div></div>`).join("")}</div>${i}</section></div>`}function _s(o){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">DELIVERY</p><h1>Saved addresses</h1><p>Manage shipping destinations. Postal codes remain optional.</p></div><section class="account-section"><div class="module-list">${o.length?o.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid fa-location-dot"></i></span><div><strong>${e.name} ${e.isDefaultShipping?'<em class="account-badge">Default shipping</em>':""}</strong><p>${e.street}, ${e.city}, ${e.region}, ${e.country}<br>${e.phone}${e.postalCode?` · ${e.postalCode}`:""}</p></div><button class="icon-button" title="Delete address" onclick="window.deleteBuyerAddress('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-location-dot"></i><p>No saved addresses yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerAddress()" class="account-form mt-6"><label>Address name<input name="name" placeholder="Wholesale hub" required></label><label>Phone<input name="phone" placeholder="+251 9•• ••• •••" required></label><label>Street<input name="street" required></label><label>City<input name="city" required></label><label>Region<input name="region" required></label><label>Postal code<input name="postalCode" placeholder="Optional"></label><label>Country<input name="country" value="Ethiopia" required></label><label class="flex items-center gap-2"><input type="checkbox" name="isDefaultShipping"> Default shipping</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-plus"></i> Add address</button></div></form></section></div>`}function Bs(o){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">CHECKOUT</p><h1>Payment methods</h1><p>Use Telebirr or Chapa hosted tokenization. Raw card numbers never reach this app.</p></div><section class="account-section"><div class="module-list">${o.length?o.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${e.provider==="Telebirr"?"fa-mobile-screen-button":"fa-credit-card"}"></i></span><div><strong>${e.provider} ${e.isPrimary?'<em class="account-badge">Primary</em>':""}</strong><p>${e.maskedDisplay||"Provider token linked"}${e.brand?` · ${e.brand}`:""}</p></div>${e.isPrimary?"":`<button class="icon-button" title="Set primary" onclick="window.setPrimaryBuyerPayment('${e.id}')"><i class="fa-solid fa-star"></i></button>`}<button class="icon-button" title="Remove payment method" onclick="window.deleteBuyerPayment('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-wallet"></i><p>No payment methods linked yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerPayment()" class="account-form mt-6"><label>Provider<select name="provider"><option>Telebirr</option><option>Chapa</option></select></label><label>Provider token<input name="providerToken" placeholder="Paste hosted-provider token" required></label><label>Masked display<input name="maskedDisplay" placeholder="•••• 4242" required></label><label>Brand<input name="brand" placeholder="Visa / Telebirr"></label><label>Expiry month<input type="number" name="expiryMonth" min="1" max="12"></label><label>Expiry year<input type="number" name="expiryYear" min="2026"></label><label class="flex items-center gap-2"><input type="checkbox" name="isPrimary"> Set as primary</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-link"></i> Link payment method</button></div></form></section></div>`}function Ds(o){const e=o.filter(t=>{var a;return t.status==="delivered"||t.status==="disputed"||((a=t.disputeStatus)==null?void 0:a.startsWith("Resolved"))});return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">RESOLUTION CENTER</p><h1>Refunds & disputes</h1><p>Submit a claim for a delivered order. Refunds return through the original payment provider.</p></div><section class="account-section"><div class="module-list">${e.length?e.map(t=>{var a;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${t.disputeStatus==="ResolvedRefundBuyer"?"fa-money-bill-transfer":"fa-box-open"}"></i></span><div><strong>${t.productName}</strong><p>Order #${t.id.slice(0,8).toUpperCase()} · ${t.disputeStatus==="ResolvedRefundBuyer"?"Refunded to original payment method":t.disputeStatus||(t.status==="disputed"?"Under review":"Eligible for dispute")}</p></div>${t.status==="delivered"&&!((a=t.disputeStatus)!=null&&a.startsWith("Resolved"))?`<button class="btn-secondary" onclick="window.submitBuyerDispute('${t.id}')"><i class="fa-solid fa-flag"></i> Open dispute</button>`:""}</div>`}).join(""):'<div class="empty-account"><i class="fa-solid fa-circle-check"></i><p>No delivered orders are currently eligible for a dispute.</p></div>'}</div></section></div>`}function Ls(o,e,t,a,s){const i=Re.find(r=>r.id===a)||Re[0];let n=a==="overview"?Cs(e,t):a==="profile"?Rs(e):a==="orders"?Ps(t):Is(a,t,s);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${Re.map((r,d)=>`${r.group&&(d===0||Re[d-1].group!==r.group)?`<p class="account-nav-group">${r.group}</p>`:""}${Ts(r,a)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Need a hand?</strong><span>Visit the Help Center</span><button onclick="window.showAccountToast('Help Center CMS content will open here.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('marketplace')">Marketplace</button><i class="fa-solid fa-chevron-right"></i><span>${i.label}</span></div>${n}</main></div>`}const Pe=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Os(o,e){return`<button onclick="window.setFarmerAccountTab('${o.id}')" class="account-nav-item ${e===o.id?"active":""}"><i class="fa-solid ${o.icon} w-5 text-center"></i><span>${o.label}</span></button>`}function Ns(o){return`<section class="account-section"><div class="section-heading"><div><p class="account-kicker">SELLER CENTER</p><h2>My produce posts</h2></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="module-list mt-5">${o.length?o.map(e=>`<div class="module-row"><span class="order-thumb"><img src="${e.photos[0]}" alt="${e.productName}" class="w-full h-full object-cover rounded-lg"></span><div><strong>${e.productName}</strong><p>${e.qtyKg.toLocaleString()} kg available · ${e.pricePerKg} ETB/kg · ${e.status}</p></div><button class="icon-button" title="Delete post" onclick="window.deleteFarmerListing('${e.id}')"><i class="fa-solid fa-trash text-rose-600"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-seedling"></i><p>You have no active produce posts.</p></div>'}</div></section>`}function Le(o,e,t){const a=t.filter(r=>{var d;return r.status==="disputed"||((d=r.disputeStatus)==null?void 0:d.startsWith("Resolved"))});if(o==="profile")return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR FARM ACCOUNT</p><h1>Profile & personalization</h1><p>Update the public identity buyers see and your farm operating region.</p></div><section class="account-section"><div class="profile-header"><div class="avatar-large">${e.name.charAt(0).toUpperCase()}</div><div><h2>${e.name}</h2><p>${e.phone} · ${e.region}</p></div><span class="account-badge">${e.verified?"Verified farmer":"Verification pending"}</span></div><form onsubmit="event.preventDefault(); window.saveFarmerProfile()" class="account-form"><label>Full name<input name="name" value="${e.name}" required></label><label>Amharic name<input name="nameAm" value="${e.nameAm||""}" placeholder="Optional"></label><label>Farm region<input name="region" value="${e.region||""}" required></label><label>Email<input type="email" name="email" value="${e.email||""}" placeholder="Optional"></label><label>Preferred language<select name="languagePreference"><option value="en" ${e.languagePreference==="en"?"selected":""}>English</option><option value="am" ${e.languagePreference==="am"?"selected":""}>Amharic</option></select></label><label>Primary produce<input name="primaryCrop" value="${e.primaryCrop||""}" placeholder="Tomatoes, teff, coffee"></label><div class="form-wide location-field"><div><span class="field-label">Farm pickup address</span><input name="savedDeliveryAddress" value="${e.savedDeliveryAddress||""}" placeholder="Woreda, kebele, pickup details"><p>Buyers and drivers use this as the default farm location.</p></div><button type="button" class="btn-secondary" onclick="window.captureFarmerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Capture location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save profile</button></div></form></section></div>`;const i={orders:{kicker:"FULFILLMENT",title:"Orders & tracking",description:"Orders appear here after buyers pay. Confirm them so available drivers can pick them up.",icon:"fa-box-open",rows:t.length?t.map(r=>`${r.productName} · ${r.qtyKg} kg · ${r.status.replace("_"," ")}`):["No buyer orders yet"]},coupons:{kicker:"SELLER SAVINGS",title:"My coupons",description:"Farmer-issued coupon management will use your payout share.",icon:"fa-ticket",rows:["No farmer-issued coupons yet · Coupon creation API is ready for the next seller release"]},addresses:{kicker:"FARM LOCATION",title:"Saved addresses",description:"Manage farm pickup locations and operating regions.",icon:"fa-location-dot",rows:[`${e.region} · Farm pickup region`,"Additional pickup-address management is pending the farm-location API"]},payments:{kicker:"PAYOUTS",title:"Payment methods",description:"Manage the Telebirr payout destination for your 90% settlement.",icon:"fa-wallet",rows:[`Telebirr payout · ${e.phone} · 90% farmer share`,"Bank fallback · Not configured"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Respond to buyer claims and track payout impact.",icon:"fa-rotate-left",rows:a.length?a.map(r=>`${r.productName} · Order #${r.id.slice(0,8).toUpperCase()} · ${r.disputeStatus==="ResolvedRefundBuyer"?"Refunded to buyer":r.disputeStatus||"Under review"}`):["No buyer disputes"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Configure seller notifications and auto-accept preferences.",icon:"fa-sliders",rows:["Order updates · In-app notifications on","Dispute updates · SMS on","Auto-accept orders · Configure quantity threshold"]},security:{kicker:"PROTECTION",title:"Security",description:"Protect your farmer account with password and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the security form","Two-factor authentication · SMS recommended","Active sessions · Manage from the security API"]}}[o],n=o==="security"?'<form onsubmit="event.preventDefault(); window.changeFarmerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required></label><label>New password<input type="password" name="newPassword" minlength="8" required></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${i.kicker}</p><h1>${i.title}</h1><p>${i.description}</p></div><section class="account-section"><div class="module-list">${i.rows.map((r,d)=>{var p;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${i.icon}"></i></span><div><strong>${r.split(" · ")[0]}</strong><p>${r.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div>${o==="orders"&&((p=t[d])==null?void 0:p.status)==="pending"?`<button class="btn-secondary" onclick="window.confirmFarmerOrder('${t[d].id}')"><i class="fa-solid fa-check"></i> Confirm</button>`:""}</div>`}).join("")}</div>${n}</section></div>`}function Ms(o,e,t,a,s,i=!1,n=[]){const r=Pe.find(p=>p.id===s)||Pe[0],d=s==="overview"?`<div class="space-y-6 animate-fade-in"><div class="account-welcome"><div><p class="account-kicker">FARMER ACCOUNT</p><h1>Welcome back, ${e.name.split(" ")[0]}</h1><p>Manage your produce posts, buyer orders, and payouts.</p></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="account-stat-grid"><div class="account-stat"><span class="stat-icon green"><i class="fa-solid fa-seedling"></i></span><div><strong>${t.length}</strong><span>Active posts</span></div></div><div class="account-stat"><span class="stat-icon blue"><i class="fa-solid fa-box"></i></span><div><strong>${a.filter(p=>p.status==="pending").length}</strong><span>New orders</span></div></div><div class="account-stat"><span class="stat-icon gold"><i class="fa-solid fa-truck"></i></span><div><strong>${a.filter(p=>p.status==="picked_up").length}</strong><span>In transit</span></div></div><div class="account-stat"><span class="stat-icon rose"><i class="fa-solid fa-hand-holding-dollar"></i></span><div><strong>${(e.walletBalanceEtb||0).toLocaleString()}</strong><span>Wallet ETB</span></div></div></div>${Ns(t)}</div>`:Le(s==="profile"?"profile":s==="orders"?"orders":s,e,a);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${Pe.map((p,l)=>`${p.group&&(l===0||Pe[l-1].group!==p.group)?`<p class="account-nav-group">${p.group}</p>`:""}${Os(p,s)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Farmer support</strong><span>Get help with orders and payouts</span><button onclick="window.showAccountToast('Support center integration is available from the farmer portal.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('farmer')">Farmer dashboard</button><i class="fa-solid fa-chevron-right"></i><span>${r.label}</span></div>${d}</main>${i?et(o):""}</div>`}class Fs{constructor(){f(this,"container");f(this,"isOpen",!1);f(this,"currentSessionId","ussd-"+Math.random().toString(36).substring(2,9));f(this,"currentLanguage","am");f(this,"screenLines",["Dial *804# to start"]);f(this,"currentInput","*804#");f(this,"isSessionActive",!1);f(this,"isSending",!1);this.container=document.createElement("div"),this.container.id="ussd-modal-container",this.container.className="ussd-modal-backdrop hidden",document.body.appendChild(this.container),this.render()}open(e="*804#"){this.isOpen=!0,this.container.classList.remove("hidden"),this.currentInput=e,this.currentSessionId="ussd-"+Math.random().toString(36).substring(2,9),this.isSessionActive=!1,this.screenLines=["Dial *804# to begin rural farmer service"],this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}async dial(){var t;if(this.isSending)return;this.isSending=!0;const e={sessionId:this.currentSessionId,phoneNumber:((t=c.getCurrentUser())==null?void 0:t.phone)||"+251911223344",text:this.currentInput,serviceCode:"*804#",language:this.currentLanguage};this.screenLines=["Connecting to Ethio Telecom network...","Sending USSD code..."],this.renderScreen();try{const a=await c.simulateUssd(e);this.screenLines=a.message.split(`
`),this.isSessionActive=a.action==="CON",this.currentInput=""}catch{this.screenLines=["Connection failed.","Please check mobile network."],this.isSessionActive=!1}finally{this.isSending=!1,this.render()}}appendDigit(e){this.currentInput+=e,this.renderScreen()}clearInput(){this.currentInput.length>0?this.currentInput=this.currentInput.slice(0,-1):this.currentInput="",this.renderScreen()}resetSession(){this.currentSessionId="ussd-"+Math.random().toString(36).substring(2,9),this.isSessionActive=!1,this.currentInput="*804#",this.screenLines=["Session reset.","Dial *804# to start."],this.render()}renderScreen(){const e=this.container.querySelector(".ussd-lcd-content");e&&(e.innerHTML=`
        <div class="ussd-lcd-header">
          <span>📶 2G ETH-NET</span>
          <span>${this.currentLanguage.toUpperCase()}</span>
          <span>🔋 92%</span>
        </div>
        <div class="ussd-lcd-body">
          ${this.screenLines.map(t=>`<div class="ussd-line">${t||"&nbsp;"}</div>`).join("")}
        </div>
        <div class="ussd-input-bar">
          <span class="ussd-prompt">&gt;</span>
          <span class="ussd-typed-text">${this.currentInput}</span>
          <span class="ussd-cursor">_</span>
        </div>
      `)}render(){var e,t,a,s,i;this.container.innerHTML=`
      <div class="ussd-modal-wrapper animate-scale-up">
        <div class="ussd-modal-header">
          <div class="ussd-title">
            <span class="ussd-icon">📞</span>
            <div>
              <h3>USSD Offline Farmer Simulator (*804#)</h3>
              <p>Test feature-phone menus (Amharic & English) for rural farmers without internet</p>
            </div>
          </div>
          <button class="ussd-close-btn" id="ussd-close-btn">&times;</button>
        </div>

        <div class="ussd-phone-chassis">
          <div class="ussd-phone-speaker"></div>

          <!-- LCD Green Backlight Screen -->
          <div class="ussd-lcd-screen">
            <div class="ussd-lcd-content">
              <!-- Rendered by renderScreen() -->
            </div>
          </div>

          <!-- Keypad Controls -->
          <div class="ussd-quick-actions">
            <button class="ussd-btn-lang" id="ussd-lang-toggle">🌐 ${this.currentLanguage==="am"?"አማርኛ / English":"English / አማርኛ"}</button>
            <button class="ussd-btn-reset" id="ussd-reset-btn">🔄 Reset (*804#)</button>
          </div>

          <!-- Keypad Grid -->
          <div class="ussd-keypad-grid">
            <button class="ussd-key btn-digit" data-key="1"><span class="k-num">1</span><span class="k-sub">.</span></button>
            <button class="ussd-key btn-digit" data-key="2"><span class="k-num">2</span><span class="k-sub">ABC</span></button>
            <button class="ussd-key btn-digit" data-key="3"><span class="k-num">3</span><span class="k-sub">DEF</span></button>

            <button class="ussd-key btn-digit" data-key="4"><span class="k-num">4</span><span class="k-sub">GHI</span></button>
            <button class="ussd-key btn-digit" data-key="5"><span class="k-num">5</span><span class="k-sub">JKL</span></button>
            <button class="ussd-key btn-digit" data-key="6"><span class="k-num">6</span><span class="k-sub">MNO</span></button>

            <button class="ussd-key btn-digit" data-key="7"><span class="k-num">7</span><span class="k-sub">PQRS</span></button>
            <button class="ussd-key btn-digit" data-key="8"><span class="k-num">8</span><span class="k-sub">TUV</span></button>
            <button class="ussd-key btn-digit" data-key="9"><span class="k-num">9</span><span class="k-sub">WXYZ</span></button>

            <button class="ussd-key btn-digit" data-key="*"><span class="k-num">*</span><span class="k-sub">+</span></button>
            <button class="ussd-key btn-digit" data-key="0"><span class="k-num">0</span><span class="k-sub">␣</span></button>
            <button class="ussd-key btn-digit" data-key="#"><span class="k-num">#</span><span class="k-sub">⇧</span></button>
          </div>

          <!-- Action Buttons (Call / Send / Clear) -->
          <div class="ussd-action-row">
            <button class="ussd-key btn-call" id="ussd-call-btn">
              <span>📞</span> ${this.isSessionActive?"SEND":"DIAL"}
            </button>
            <button class="ussd-key btn-clear" id="ussd-clear-btn">
              <span>⌫</span> CLEAR
            </button>
          </div>
        </div>

        <div class="ussd-demo-hints">
          <div class="hint-chip">💡 <strong>Press 1:</strong> ECX Market Prices</div>
          <div class="hint-chip">💡 <strong>Press 2:</strong> Telebirr Balance & Escrow</div>
          <div class="hint-chip">💡 <strong>Press 4:</strong> SMS/USSD Crop Listing Wizard</div>
        </div>
      </div>
    `,this.renderScreen(),(e=this.container.querySelector("#ussd-close-btn"))==null||e.addEventListener("click",()=>this.close()),(t=this.container.querySelector("#ussd-call-btn"))==null||t.addEventListener("click",()=>this.dial()),(a=this.container.querySelector("#ussd-clear-btn"))==null||a.addEventListener("click",()=>this.clearInput()),(s=this.container.querySelector("#ussd-reset-btn"))==null||s.addEventListener("click",()=>this.resetSession()),(i=this.container.querySelector("#ussd-lang-toggle"))==null||i.addEventListener("click",()=>{this.currentLanguage=this.currentLanguage==="am"?"en":"am",this.render()}),this.container.querySelectorAll(".btn-digit").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-key");r&&this.appendDigit(r)})}),this.container.addEventListener("click",n=>{n.target===this.container&&this.close()})}}const Us=new Fs;class js{constructor(){f(this,"container");f(this,"isOpen",!1);f(this,"indices",[]);f(this,"selectedCategory","All");f(this,"selectedIndex",null);f(this,"advisorCommodity","Teff (White Magna)");f(this,"advisorRegion","Oromia (Bishoftu)");f(this,"advisorGrade","Grade 1");f(this,"advisorQtyKg",500);f(this,"advisorColdChain",!1);f(this,"advisorResult",null);f(this,"isCalculating",!1);this.container=document.createElement("div"),this.container.id="market-intelligence-container",this.container.className="market-intel-backdrop hidden",document.body.appendChild(this.container)}async open(){this.isOpen=!0,this.container.classList.remove("hidden"),await this.loadIndices(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}async loadIndices(){this.indices=await c.getMarketPriceIndices(this.selectedCategory),this.indices.length>0&&!this.selectedIndex&&(this.selectedIndex=this.indices[0])}async calculateFairPrice(){this.isCalculating=!0,this.renderAdvisorResult();try{this.advisorResult=await c.getFairPriceRecommendation({commodityName:this.advisorCommodity,category:"Vegetable",region:this.advisorRegion,grade:this.advisorGrade,qtyKg:this.advisorQtyKg,requiresColdChain:this.advisorColdChain})}catch(e){console.error(e)}finally{this.isCalculating=!1,this.render()}}renderAdvisorResult(){const e=this.container.querySelector("#advisor-result-area");if(!e)return;if(this.isCalculating){e.innerHTML='<div class="advisor-loading"><div class="spinner"></div> Calculating real-time AI valuation...</div>';return}if(!this.advisorResult)return;const t=this.advisorResult;e.innerHTML=`
      <div class="advisor-result-card animate-fade-in">
        <div class="result-header">
          <span class="badge badge-success">✨ AI Recommendation</span>
          <span class="volatility-tag ${t.volatility.toLowerCase()}">Market Volatility: ${t.volatility}</span>
        </div>
        <div class="fair-price-display">
          <div class="fair-price-box">
            <span class="price-lbl">Recommended Fair Rate</span>
            <span class="price-val">ETB ${t.recommendedFairPriceEtb.toFixed(2)}<small>/kg</small></span>
          </div>
          <div class="price-range-box">
            <div class="range-row"><span>Min Acceptable:</span> <strong>ETB ${t.recommendedMinEtb.toFixed(2)}/kg</strong></div>
            <div class="range-row"><span>Export Ceiling:</span> <strong>ETB ${t.recommendedMaxEtb.toFixed(2)}/kg</strong></div>
            <div class="range-row"><span>ECX Baseline:</span> <strong>ETB ${t.ecxBenchmarkEtb.toFixed(2)}/kg</strong></div>
          </div>
        </div>
        <div class="guidance-box">
          <p class="en-guide">💡 ${t.guidanceMessageEn}</p>
          <p class="am-guide">🇪🇹 ${t.guidanceMessageAm}</p>
        </div>
        ${t.coldChainPremiumPercent>0?`<div class="addon-chip">❄️ +${t.coldChainPremiumPercent}% Cold-Chain Preservation Premium Included</div>`:""}
      </div>
    `}render(){var e,t;this.container.innerHTML=`
      <div class="market-intel-wrapper animate-scale-up">
        <div class="market-intel-header">
          <div class="market-intel-title">
            <span class="market-intel-icon">📈</span>
            <div>
              <h3>Ethiopian Commodity Exchange (ECX) & Market Intelligence</h3>
              <p>Real-time wholesale terminal rates, 7-day price volatility, and AI fair-pricing guidance</p>
            </div>
          </div>
          <button class="modal-close-btn" id="market-close-btn">&times;</button>
        </div>

        <div class="market-intel-grid">
          <!-- Left Column: Commodity Price List -->
          <div class="market-left-panel">
            <div class="category-tabs">
              ${["All","Grain","Coffee","Vegetable","Fruit","Tubers"].map(a=>`
                <button class="cat-pill ${this.selectedCategory===a?"active":""}" data-category="${a}">${a}</button>
              `).join("")}
            </div>

            <div class="commodity-cards-list">
              ${this.indices.map(a=>{var s;return`
                <div class="commodity-card ${((s=this.selectedIndex)==null?void 0:s.commodityId)===a.commodityId?"selected":""}" data-id="${a.commodityId}">
                  <div class="comm-top">
                    <div>
                      <h4 class="comm-name">${a.name}</h4>
                      <span class="comm-am">${a.nameAm}</span>
                    </div>
                    <div class="comm-trend ${a.trendDirection.toLowerCase()}">
                      ${a.trendDirection==="Up"?"▲ +":a.trendDirection==="Down"?"▼ ":"● "}
                      ${a.weeklyChangePercent}%
                    </div>
                  </div>
                  <div class="comm-bottom">
                    <span class="comm-price">ETB ${a.nationalAvgPriceEtb.toFixed(2)} / ${a.unit}</span>
                    <span class="comm-benchmark">ECX: ETB ${a.eczBenchmarkEtb.toFixed(2)}</span>
                  </div>
                </div>
              `}).join("")}
            </div>
          </div>

          <!-- Right Column: Selected Commodity Details + AI Price Advisor -->
          <div class="market-right-panel">
            ${this.selectedIndex?`
              <div class="commodity-detail-view">
                <div class="detail-top-banner">
                  <div>
                    <h2>${this.selectedIndex.name}</h2>
                    <p class="am-subtitle">${this.selectedIndex.nameAm} · ${this.selectedIndex.category} Index</p>
                  </div>
                  <div class="national-rate-box">
                    <span class="rate-lbl">National Avg</span>
                    <span class="rate-val">ETB ${this.selectedIndex.nationalAvgPriceEtb.toFixed(2)} / ${this.selectedIndex.unit}</span>
                  </div>
                </div>

                <!-- 7-Day Trend Chart -->
                <div class="trend-history-box">
                  <span class="sec-title">📊 7-Day Price Movement</span>
                  <div class="sparkline-bar-chart">
                    ${this.selectedIndex.historical7Days.map(a=>{var s;return`
                      <div class="sparkline-bar-wrapper">
                        <div class="sparkline-bar" style="height: ${Math.min(100,Math.max(30,a.priceEtb/(((s=this.selectedIndex)==null?void 0:s.nationalAvgPriceEtb)||100)*80))}%;">
                          <span class="sparkline-val">${a.priceEtb}</span>
                        </div>
                        <span class="sparkline-lbl">${a.date}</span>
                      </div>
                    `}).join("")}
                  </div>
                </div>

                <!-- Regional Wholesale Hubs -->
                <div class="regional-hubs-box">
                  <span class="sec-title">🏛️ Regional Wholesale Market Benchmarks</span>
                  <div class="regional-table-wrapper">
                    <table class="regional-table">
                      <thead>
                        <tr>
                          <th>Region</th>
                          <th>Wholesale Terminal</th>
                          <th>Min (ETB)</th>
                          <th>Avg Rate</th>
                          <th>Max (ETB)</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.selectedIndex.regionalPrices.map(a=>`
                          <tr>
                            <td><strong>${a.regionName}</strong></td>
                            <td>${a.marketName}</td>
                            <td class="text-muted">${a.minPriceEtb}</td>
                            <td class="text-highlight">ETB ${a.avgPriceEtb.toFixed(2)}</td>
                            <td class="text-muted">${a.maxPriceEtb}</td>
                          </tr>
                        `).join("")}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            `:""}

            <!-- AI Fair Price Advisor Tool -->
            <div class="ai-advisor-section">
              <div class="advisor-title">
                <span>🤖 AI Fair Price Valuation Engine</span>
                <span class="advisor-sub">Enter your harvest parameters to get fair market valuation</span>
              </div>

              <div class="advisor-controls-grid">
                <div class="input-group">
                  <label>Harvest Crop</label>
                  <input type="text" id="adv-crop" class="form-control" value="${this.advisorCommodity}" />
                </div>
                <div class="input-group">
                  <label>Production Region</label>
                  <select id="adv-region" class="form-control">
                    <option ${this.advisorRegion.includes("Oromia")?"selected":""}>Oromia (Bishoftu / Adama)</option>
                    <option ${this.advisorRegion.includes("Addis")?"selected":""}>Addis Ababa</option>
                    <option ${this.advisorRegion.includes("Amhara")?"selected":""}>Amhara (Bahir Dar / Gojjam)</option>
                    <option ${this.advisorRegion.includes("Sidama")?"selected":""}>Sidama (Hawassa)</option>
                    <option ${this.advisorRegion.includes("SNNPR")?"selected":""}>SNNPR (Arba Minch)</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Quality Grade</label>
                  <select id="adv-grade" class="form-control">
                    <option value="Grade 1" ${this.advisorGrade==="Grade 1"?"selected":""}>Grade 1 (Premium Commercial)</option>
                    <option value="Export Grade" ${this.advisorGrade==="Export Grade"?"selected":""}>Export Grade (Grade A+)</option>
                    <option value="Grade 2" ${this.advisorGrade==="Grade 2"?"selected":""}>Grade 2 (Standard Table)</option>
                    <option value="Grade 3" ${this.advisorGrade==="Grade 3"?"selected":""}>Grade 3 (Processing / Bulk)</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Quantity (Kg)</label>
                  <input type="number" id="adv-qty" class="form-control" value="${this.advisorQtyKg}" />
                </div>
              </div>

              <div class="advisor-toggles-row">
                <label class="checkbox-label">
                  <input type="checkbox" id="adv-cold" ${this.advisorColdChain?"checked":""} />
                  <span>❄️ Requires Cold-Chain Refrigerated Transport (+12% preservation value)</span>
                </label>
                <button class="btn btn-primary" id="btn-run-advisor">⚡ Calculate Fair Price</button>
              </div>

              <div id="advisor-result-area">
                <!-- Rendered by renderAdvisorResult -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `,this.renderAdvisorResult(),(e=this.container.querySelector("#market-close-btn"))==null||e.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".cat-pill").forEach(a=>{a.addEventListener("click",async()=>{this.selectedCategory=a.getAttribute("data-category")||"All",await this.loadIndices(),this.render()})}),this.container.querySelectorAll(".commodity-card").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");this.selectedIndex=this.indices.find(i=>i.commodityId===s)||null,this.selectedIndex&&(this.advisorCommodity=this.selectedIndex.name),this.render()})}),(t=this.container.querySelector("#btn-run-advisor"))==null||t.addEventListener("click",()=>{var a,s,i,n,r;this.advisorCommodity=((a=this.container.querySelector("#adv-crop"))==null?void 0:a.value)||"Produce",this.advisorRegion=((s=this.container.querySelector("#adv-region"))==null?void 0:s.value)||"Oromia",this.advisorGrade=((i=this.container.querySelector("#adv-grade"))==null?void 0:i.value)||"Grade 1",this.advisorQtyKg=parseFloat((n=this.container.querySelector("#adv-qty"))==null?void 0:n.value)||500,this.advisorColdChain=((r=this.container.querySelector("#adv-cold"))==null?void 0:r.checked)||!1,this.calculateFairPrice()}),this.container.addEventListener("click",a=>{a.target===this.container&&this.close()})}}const Vs=new js;function Gs(o,e,t){if(!t.isOpen||!e)return"";const a=ee[o],s=o==="am",i=[{en:"🌾 Fresh Harvest",am:"🌾 ትኩስ ምርት"},{en:"📦 Grade-1 Packaging",am:"📦 ምርጥ አሸጋገግ"},{en:"⏱️ Fast Farm Dispatch",am:"⏱️ ፈጣን አቅርቦት"},{en:"💰 Direct Farmer Price",am:"💰 ተመጣጣኝ ዋጋ"},{en:"🤝 Polite Communication",am:"🤝 ጥሩ ግንኙነት"},{en:"🌿 100% Organic & Clean",am:"🌿 ንፁህ ኦርጋኒክ"}],n={1:{en:"1 / 5 · Poor Quality",am:"1 / 5 · ደካማ ጥራት",color:"text-rose-600"},2:{en:"2 / 5 · Fair / Needs Improvement",am:"2 / 5 · መሻሻል አለበት",color:"text-amber-600"},3:{en:"3 / 5 · Good & Satisfactory",am:"3 / 5 · ጥሩ / አጥጋቢ",color:"text-amber-500"},4:{en:"4 / 5 · Very Good Quality",am:"4 / 5 · በጣም ጥሩ ምርት",color:"text-emerald-600"},5:{en:"5 / 5 · Outstanding Quality & Service!",am:"5 / 5 · እጅግ በጣም ምርጥ!",color:"text-emerald-700"}},r=n[t.rating]||n[5];return`
    <div class="modal-backdrop fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onclick="if(event.target === this) window.closeRateModal()">
      <div class="modal-content bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-scale-up">
        
        <!-- Header Banner -->
        <div class="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white p-6 relative">
          <button onclick="window.closeRateModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-2xl shadow-inner">
              <i class="fa-solid fa-star"></i>
            </div>
            <div>
              <span class="text-[11px] font-bold text-emerald-300 tracking-wider uppercase flex items-center gap-1.5">
                <i class="fa-solid fa-certificate text-xs"></i> Verified Escrow Purchase
              </span>
              <h3 class="text-xl font-black text-white ${s?"lang-am":""}">
                ${a.rateFarmerTitle}
              </h3>
            </div>
          </div>

          <p class="text-xs text-slate-300 mt-2 leading-relaxed ${s?"lang-am":""}">
            ${a.rateFarmerSubtitle}
          </p>
        </div>

        <!-- Order Summary Pill -->
        <div class="px-6 pt-5">
          <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                <i class="fa-solid fa-seedling"></i>
              </div>
              <div>
                <h4 class="font-extrabold text-slate-900 text-sm ${s&&e.productNameAm?"lang-am":""}">
                  ${s&&e.productNameAm?e.productNameAm:e.productName}
                </h4>
                <p class="text-xs text-slate-500 font-medium">
                  Farmer: <strong class="text-slate-800">${e.farmerName}</strong> · ${e.qtyKg} kg
                </p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-black text-emerald-800">${e.totalEtb.toLocaleString()} ETB</div>
              <span class="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <i class="fa-solid fa-circle-check text-[9px]"></i> Delivered
              </span>
            </div>
          </div>
        </div>

        <!-- Rating Interactive Form -->
        <form id="rateReviewForm" onsubmit="window.handleReviewFormSubmit(event)" class="p-6 space-y-5">
          
          <!-- 5-Star Interactive Selector -->
          <div class="space-y-2 text-center">
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider ${s?"lang-am":""}">
              ${a.rateYourExperience}
            </label>

            <div class="flex items-center justify-center gap-2 py-2" id="starRatingGroup">
              ${[1,2,3,4,5].map(d=>`
                <button
                  type="button"
                  onclick="window.setModalRating(${d})"
                  class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all transform hover:scale-110 cursor-pointer ${d<=t.rating?"bg-amber-50 text-amber-500 shadow-sm ring-2 ring-amber-300/60":"bg-slate-100 text-slate-300 hover:text-amber-300"}"
                  title="${d} Stars"
                >
                  <i class="fa-solid fa-star"></i>
                </button>
              `).join("")}
            </div>

            <!-- Dynamic Rating Label -->
            <div id="modalRatingDescText" class="font-extrabold text-sm ${r.color} transition-all">
              ${s?r.am:r.en}
            </div>
          </div>

          <!-- Quick Feedback Tags -->
          <div class="space-y-2">
            <label class="block text-xs font-extrabold text-slate-700 ${s?"lang-am":""}">
              <i class="fa-solid fa-tags text-emerald-600 mr-1"></i> ${a.quickTagsLabel}
            </label>
            <div class="flex flex-wrap gap-1.5">
              ${i.map(d=>{const p=s?d.am:d.en,l=t.selectedTags.includes(d.en);return`
                  <button
                    type="button"
                    onclick="window.toggleModalReviewTag('${d.en}')"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${l?"bg-emerald-700 text-white border-emerald-700 shadow-xs":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}"
                  >
                    ${l?'<i class="fa-solid fa-check mr-1 text-[10px]"></i>':""}${p}
                  </button>
                `}).join("")}
            </div>
          </div>

          <!-- Review Comment Textarea -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-extrabold text-slate-700">
              <label for="reviewCommentInput" class="${s?"lang-am":""}">
                <i class="fa-solid fa-comment-dots text-emerald-600 mr-1"></i> ${a.reviewCommentLabel}
              </label>
              <span class="text-[11px] text-slate-400 font-medium" id="reviewCommentCharCount">
                ${t.comment.length} / 500
              </span>
            </div>
            
            <textarea
              id="reviewCommentInput"
              rows="3"
              maxlength="500"
              oninput="window.updateModalReviewComment(this.value)"
              placeholder="${a.reviewCommentPlaceholder}"
              class="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none transition-all resize-none placeholder:text-slate-400 ${s?"lang-am":""}"
            >${t.comment}</textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 pt-2">
            <button
              type="button"
              onclick="window.closeRateModal()"
              class="btn-secondary flex-1 py-3 text-xs font-bold justify-center cursor-pointer text-slate-600 hover:text-slate-900"
            >
              Skip for Now
            </button>

            <button
              type="submit"
              class="btn-primary flex-2 py-3 text-xs font-extrabold justify-center gap-2 cursor-pointer shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
            >
              <i class="fa-solid fa-paper-plane"></i>
              <span>${a.submitReviewBtn}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `}function h(o,e="fa-circle-check",t="border-emerald-500"){const a=document.getElementById("toast-container");if(!a)return;const s=document.createElement("div");s.className=`toast-msg border-l-4 ${t} shadow-2xl`,s.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${o}</span>
  `,a.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(100%)",s.style.transition="all 0.3s ease-out",setTimeout(()=>s.remove(),300)},3500)}class qs{constructor(){f(this,"lang",localStorage.getItem("lang")||"en");f(this,"activeTab","marketplace");f(this,"activeCategory","All");f(this,"selectedRegion","All");f(this,"searchQuery","");f(this,"cart",this.loadCartFromStorage());f(this,"isCartOpen",!1);f(this,"isNotificationsModalOpen",!1);f(this,"isCreateListingModalOpen",!1);f(this,"activeOrderModal",null);f(this,"activeTelebirrModal",null);f(this,"activeDisputeModal",null);f(this,"activeRateModal",null);f(this,"activeProduceModalId",null);f(this,"activeProducePhotoIndex",0);f(this,"produceOrderQty",50);f(this,"activeLegalDocModal",null);f(this,"maxDistanceKm",0);f(this,"activeGrade","All");f(this,"activeRipeness","All");f(this,"organicOnly",!1);f(this,"advanceOnly",!1);f(this,"activeBuyerSubTab","marketplace");f(this,"activeBuyerAccountTab","overview");f(this,"activeFarmerAccountTab","overview");f(this,"activeFarmerTab","listings");f(this,"activeAdminTab","disputes");f(this,"activeSuperAdminTab","users");f(this,"superAdminUserRoleFilter","all");f(this,"superAdminAuditCategoryFilter","all");f(this,"isSuperAdminCreateUserModalOpen",!1);f(this,"isSuperAdminEditUserModalOpen",!1);f(this,"editTargetUserId",null);f(this,"isSuperAdminAddZoneModalOpen",!1);f(this,"isSuperAdminAddBlacklistModalOpen",!1);f(this,"isSuperAdminBannerModalOpen",!1);f(this,"editTargetBannerId",null);f(this,"isListingEditModalOpen",!1);f(this,"editTargetListingId",null);f(this,"selectedRbacRole","admin");f(this,"superAdminFinancialSubTab","payouts");f(this,"superAdminPayoutStatusFilter","all");f(this,"superAdminPayoutRoleFilter","all");f(this,"superAdminPayoutRiskFilter","all");f(this,"superAdminPayoutSearchQuery","");f(this,"selectedPayoutIds",[]);f(this,"isSuperAdminRejectModalOpen",!1);f(this,"rejectTargetPayoutId",null);f(this,"isSuperAdminSimulatePayoutModalOpen",!1);f(this,"isSuperAdminPayoutDetailModalOpen",!1);f(this,"detailTargetPayoutId",null);f(this,"isRecordingVoice",!1);f(this,"voiceRecordTimer",null);f(this,"isAuthModalOpen",!1);f(this,"authMode","login");f(this,"otpStep",!1);f(this,"pendingPhone","");f(this,"lastSentCode","");f(this,"matchedUserName","");f(this,"matchedUserRole","");f(this,"matchedUserEmail","");f(this,"authErrorMessage","");f(this,"agentView",new ys(this.lang));f(this,"verificationWizardModal",new ws(this.lang));this.init()}loadCartFromStorage(){try{const e=localStorage.getItem("farmer_market_cart");if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(a=>a&&a.listing&&a.qtyKg>0)}}catch(e){console.warn("Failed to load cart from localStorage",e)}return[]}saveCartToStorage(){try{localStorage.setItem("farmer_market_cart",JSON.stringify(this.cart))}catch(e){console.warn("Failed to save cart to localStorage",e)}}async init(){this.attachGlobalWindowHandlers(),le.startConnection(c.getToken()||void 0);const e=new URLSearchParams(window.location.search),t=e.get("tx_ref")||e.get("trx_ref"),a=e.get("status");t&&(a==="failed"||a==="canceled"?h("Chapa payment was cancelled or failed.","fa-circle-xmark","border-rose-500"):c.verifyChapaPayment(t).then(r=>{r?(h("Chapa payment verified! Escrow is now securely locked in database.","fa-circle-check","border-emerald-500"),H({particleCount:150,spread:80,origin:{y:.6}})):h("Chapa payment was not completed or failed verification.","fa-circle-xmark","border-rose-500")}),window.history.replaceState({},document.title,window.location.pathname)),le.onOrderStatusChanged(async(r,d,p)=>{console.log(`[SignalR] Order ${r} → ${d}: ${p}`),this.activeOrderModal&&this.activeOrderModal.id===r&&(this.activeOrderModal.status=d),h(`Order #${r.slice(0,8).toUpperCase()} → ${d.toUpperCase()}`,"fa-bolt","border-blue-500"),await c.refreshAllData(),this.render()}),le.onNewFarmerOrder((r,d,p)=>{h(`🌾 New order! ${p}kg of ${d} — check your dashboard`,"fa-basket-shopping","border-amber-500"),c.refreshAllData().then(()=>this.render())}),le.onDeliveryConfirmed((r,d,p)=>{const l=c.getCurrentUser();(l==null?void 0:l.role)==="farmer"?h(`💰 ${d.toLocaleString()} ETB released to your wallet!`,"fa-hand-holding-dollar","border-emerald-500"):(l==null?void 0:l.role)==="driver"&&h(`💰 ${p.toLocaleString()} ETB delivery fee credited!`,"fa-hand-holding-dollar","border-emerald-500"),c.refreshAllData().then(()=>this.render())}),le.setPollingCallback(async r=>{await c.refreshAllData(),this.render()});const s=c.getCurrentUser();s&&s.role,le.onOrderTracking(r=>{const d=document.getElementById(`eta-${r.orderId}`);d&&r.estimatedArrivalMin!=null&&r.estimatedArrivalMin>0&&(d.textContent=`~${r.estimatedArrivalMin} min`)});const i=()=>{const r=document.getElementById("signalr-status-badge");if(!r)return;const d=le.getConnectionState(),p={connected:{dot:"bg-emerald-500",label:"Live",cls:"bg-emerald-50 text-emerald-800 border-emerald-300"},reconnecting:{dot:"bg-amber-400",label:"Reconnecting",cls:"bg-amber-50 text-amber-800 border-amber-300"},polling:{dot:"bg-sky-400",label:"Polling",cls:"bg-sky-50 text-sky-800 border-sky-300"},disconnected:{dot:"bg-slate-400",label:"Offline",cls:"bg-slate-50 text-slate-500 border-slate-200"}},l=p[d]||p.disconnected;r.className=`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${l.cls}`,r.innerHTML=`<span class="w-1.5 h-1.5 rounded-full ${l.dot} inline-block"></span> ${l.label}`};setInterval(i,3e3),i(),c.subscribe(()=>{this.render()}),await c.refreshAllData();const n=c.getCurrentUser();n&&(n.role==="superadmin"?this.activeTab="superadmin":n.role==="farmer"?this.activeTab="farmer":n.role==="driver"?this.activeTab="driver":n.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){var d,p;const e=document.getElementById("app");if(!e)return;const t=c.getCurrentUser(),a=c.isAuthenticated(),s=c.getNotifications(),i=s.filter(l=>!l.read).length;Se.setLanguage(this.lang);const n=c.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let r="";if(this.activeTab==="farmer-account"&&a&&((t==null?void 0:t.role)==="farmer"||(t==null?void 0:t.role)==="superadmin"))r=Ms(this.lang,t,c.getListings().filter(l=>l.farmerId===t.id),c.getOrders("farmer"),this.activeFarmerAccountTab,this.isCreateListingModalOpen,c.getPriceBenchmarks());else if(this.activeTab==="farmer"&&a&&((t==null?void 0:t.role)==="farmer"||(t==null?void 0:t.role)==="superadmin")){const l=c.getListings().filter(k=>k.farmerId===t.id),b=c.getOrders("farmer"),v=c.getFarmerSummary();r=es(this.lang,l.length?l:c.getListings().slice(0,3),b,v,this.isCreateListingModalOpen,this.activeFarmerTab,c.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&a&&((t==null?void 0:t.role)==="driver"||(t==null?void 0:t.role)==="superadmin")){const l=c.getOrders("driver"),b=c.getDriverSummary();r=as(this.lang,l,b,c.getOptimizedRoute(),t,c.getIsOfflineMode(),c.getOfflineQueue().length)}else if(this.activeTab==="superadmin"||a&&(t==null?void 0:t.role)==="superadmin"&&this.activeTab==="superadmin")r=is(this.lang,this.activeSuperAdminTab,this.superAdminUserRoleFilter,this.superAdminAuditCategoryFilter,this.selectedRbacRole,this.superAdminFinancialSubTab,this.superAdminPayoutStatusFilter,this.superAdminPayoutRoleFilter,this.superAdminPayoutRiskFilter,this.superAdminPayoutSearchQuery,this.selectedPayoutIds);else if(this.activeTab==="admin"&&a&&((t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="superadmin")){const l=c.getPlatformStats(),b=c.getOrders().filter(v=>{var k;return v.status==="disputed"&&!((k=v.disputeStatus)!=null&&k.startsWith("Resolved"))});r=vs(this.lang,l,b,c.getAnomalyAlerts(),c.getKycQueue(),c.getRegionalAnalytics(),this.activeAdminTab)}else if(this.activeTab==="agent"||a&&((t==null?void 0:t.role)==="agent"||(t==null?void 0:t.role)==="superadmin")&&this.activeTab==="agent")this.agentView.setLanguage(this.lang),r=this.agentView.render();else if(this.activeTab==="account"&&a&&((t==null?void 0:t.role)==="buyer"||(t==null?void 0:t.role)==="superadmin"))r=Ls(this.lang,t,c.getOrders("buyer"),this.activeBuyerAccountTab,c.getAccountData());else{const l=c.getOrders("buyer");r=Jt(this.lang,n,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,c.getStandingOrders(),l)}e.innerHTML=`
      ${c.isImpersonating()?`
        <div class="bg-gradient-to-r from-rose-700 via-rose-600 to-slate-900 text-white py-2.5 px-4 sm:px-8 text-xs font-bold shadow-lg flex items-center justify-between z-50 sticky top-0 border-b border-rose-500 animate-fadeIn">
          <div class="flex items-center gap-2.5">
            <span class="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] font-black tracking-wider uppercase">SUPER ADMIN IMPERSONATION</span>
            <i class="fa-solid fa-user-secret text-rose-200"></i>
            <span>
              ${this.lang==="am"?`በአሁኑ ወቅት በ<strong>${t==null?void 0:t.name}</strong> (${t==null?void 0:t.role.toUpperCase()}) ስም ገብተዋል። ሁሉም ክዋኔዎች በSuper Admin ኦዲት ይመዘገባሉ።`:`Active Impersonation: Logged in as <strong>${t==null?void 0:t.name}</strong> (${t==null?void 0:t.role.toUpperCase()}). All actions are logged.`}
            </span>
          </div>
          <button onclick="window.stopSuperAdminImpersonation()" class="px-3.5 py-1.5 bg-white text-rose-800 hover:bg-rose-50 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>${this.lang==="am"?"ከተጠቃሚው ውጣ":"Exit Impersonation"}</span>
          </button>
        </div>
      `:""}

      ${Qt(this.lang,t,a,this.activeTab,this.cart,i,this.searchQuery)}
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        ${r}
      </main>

      <!-- Professional E-Commerce Footer -->
      <footer class="bg-slate-950 text-slate-400 border-t border-slate-800 mt-20 pt-12 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-white font-extrabold text-lg">
              <div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm">
                <i class="fa-solid fa-wheat-awn"></i>
              </div>
              <span>Farmer-to-Market</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Ethiopia's leading bilingual B2B produce exchange. Directly linking 15M+ smallholder farmers with wholesale buyers, hotels, and supermarkets with full Ethiopian tax and contract compliance.
            </p>
            <div class="flex items-center gap-2 pt-2">
              <span class="telebirr-badge text-[10px]"><i class="fa-solid fa-bolt"></i> Telebirr Escrow Certified</span>
            </div>
          </div>

          <div class="space-y-2 text-xs">
            <h4 class="font-bold text-white text-sm">Produce Categories</h4>
            <ul class="space-y-1.5 text-slate-400">
              <li><a href="javascript:void(0)" onclick="window.setCategory('Vegetables'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Fresh Vegetables (ቲማቲም፣ ሽንኩርት)</a></li>
              <li><a href="javascript:void(0)" onclick="window.setCategory('Grains'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Magna Teff & Grains (የማኛ ጤፍ)</a></li>
              <li><a href="javascript:void(0)" onclick="window.setCategory('Coffee'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Specialty Coffee (ይርጋጨፌ ቡና)</a></li>
              <li><a href="javascript:void(0)" onclick="window.setCategory('Fruits'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Organic Hass Avocados (አቮካዶ)</a></li>
            </ul>
          </div>

          <div class="space-y-2 text-xs">
            <h4 class="font-bold text-white text-sm">Legal & Fiscal Compliance</h4>
            <ul class="space-y-1.5 text-slate-400">
              <li><span class="text-slate-300">90% Direct Farmer Payout (Tax-Exempt Produce)</span></li>
              <li><span class="text-slate-300">5% Transport Logistics with Official FTA Waybills</span></li>
              <li><span class="text-slate-300">15% VAT on Platform Service Remitted to MOR</span></li>
              <li><span class="text-slate-300">2% Withholding Declaration Compliance (Proclamation 979)</span></li>
              <li><span class="text-slate-300">EABC Binding Escrow Dispute Arbitration</span></li>
            </ul>
          </div>

          <div class="space-y-2 text-xs">
            <h4 class="font-bold text-white text-sm">Contact & Support</h4>
            <p class="text-slate-400"><i class="fa-solid fa-location-dot mr-1.5 text-emerald-500"></i> Bole Sub-City, Addis Ababa, Ethiopia</p>
            <p class="text-slate-400"><i class="fa-solid fa-phone mr-1.5 text-emerald-500"></i> +251 911 223 344</p>
            <p class="text-slate-400"><i class="fa-solid fa-envelope mr-1.5 text-emerald-500"></i> support@farmermarket.et</p>
          </div>

        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Farmer-to-Market Ltd. (Ethiopia). All rights reserved.</p>
          <div class="flex items-center gap-4 text-slate-400">
            <span>Powered by .NET 9 Clean Architecture + Vite + PostgreSQL PostGIS + Telebirr Escrow</span>
          </div>
        </div>
      </footer>

      <!-- Authentication Modal -->
      ${this.isAuthModalOpen?ks(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage,this.matchedUserEmail):""}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen&&c.isAuthenticated()?Ss(this.lang,s):""}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

      <!-- Produce Post & Farm Details Modal -->
      ${(()=>{if(!this.activeProduceModalId)return"";const l=c.getListingById(this.activeProduceModalId);return l?(Ce.setLanguage(this.lang),Ce.setActivePhotoIndex(this.activeProducePhotoIndex),Ce.setSelectedQtyKg(this.produceOrderQty),Ce.render(l)):""})()}

      <!-- Official Legal Document Viewer Modal -->
      ${(d=this.activeLegalDocModal)!=null&&d.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeLegalDocModal()">
          <div class="modal-content legal-doc-modal p-6 sm:p-8 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-stamp text-emerald-600 text-lg"></i>
                <span class="font-extrabold text-sm text-slate-900 uppercase">
                  ${this.activeLegalDocModal.type.toUpperCase()} · OFFICIAL DOCUMENT
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.printOfficialDocument()" class="btn-primary text-xs py-1.5 px-3 cursor-pointer">
                  <i class="fa-solid fa-print mr-1"></i> Print / PDF
                </button>
                <button onclick="window.closeLegalDocModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <div class="max-h-[75vh] overflow-y-auto pr-1">
              ${this.activeLegalDocModal.type==="invoice"?Se.renderInvoice(c.getTaxInvoice(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="waybill"?Se.renderWaybill(c.getTransportWaybill(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="contract"?Se.renderContract(c.getLegalContract(this.activeLegalDocModal.orderId)):Se.renderArbitration(c.getDisputeMediationRecord(this.activeLegalDocModal.orderId))}
            </div>
          </div>
        </div>
      `:""}

      <!-- Rate & Review Modal -->
      ${(p=this.activeRateModal)!=null&&p.isOpen?Gs(this.lang,c.getOrders().find(l=>{var b;return l.id===((b=this.activeRateModal)==null?void 0:b.orderId)}),this.activeRateModal):""}

      <!-- Super Admin Governance Modals -->
      ${Es(this.lang,this.isSuperAdminCreateUserModalOpen,this.isSuperAdminEditUserModalOpen,this.editTargetUserId,this.isSuperAdminAddZoneModalOpen,this.isSuperAdminAddBlacklistModalOpen,this.isSuperAdminBannerModalOpen,this.editTargetBannerId,this.isListingEditModalOpen,this.editTargetListingId,this.isSuperAdminRejectModalOpen,this.rejectTargetPayoutId,this.isSuperAdminSimulatePayoutModalOpen,this.isSuperAdminPayoutDetailModalOpen,this.detailTargetPayoutId)}
    `}attachGlobalWindowHandlers(){const e=window;window.addEventListener("storage",s=>{s.key==="farmerMarketRolePermissions"&&(c.reloadRolePermissionsFromStorage(),this.render())}),e.openProduceDetail=s=>{this.activeProduceModalId=s,this.activeProducePhotoIndex=0;const i=c.getListingById(s);this.produceOrderQty=(i==null?void 0:i.minOrderKg)||50,this.render()},e.closeProduceDetail=()=>{this.activeProduceModalId=null,this.render()},e.selectProducePhoto=s=>{this.activeProducePhotoIndex=s,this.render()},e.setProduceOrderQty=s=>{this.produceOrderQty=Math.max(1,s),this.render()},e.addProduceDetailToCart=(s,i)=>{const n=c.getListingById(s);if(!n)return;const r=i||this.produceOrderQty||n.minOrderKg||50,d=this.cart.find(p=>p.listing.id===s);d?d.qtyKg+=r:this.cart.push({listing:n,qtyKg:r}),this.saveCartToStorage(),this.activeProduceModalId=null,this.isCartOpen=!0,h(this.lang==="am"?`${r} ኪ.ግ ${n.nameAm||n.productName} ወደ ጋሪ ተጨምሯል`:`Added ${r} kg of ${n.productName} to bulk cart!`,"fa-cart-plus"),this.render()},e.buyProduceNow=(s,i)=>{const n=c.getListingById(s);if(!n)return;if(!c.isAuthenticated()){e.openAuthModal("login");return}this.activeProduceModalId=null;const r=i||this.produceOrderQty||n.minOrderKg||50,d=r*n.pricePerKg;this.activeTelebirrModal={isOpen:!0,totalEtb:d,listingId:s,qtyKg:r},this.render()},e.shareProduceListing=s=>{const i=c.getListingById(s);navigator.clipboard&&navigator.clipboard.writeText(window.location.href),h(`Copied direct produce link for ${(i==null?void 0:i.productName)||"listing"}!`,"fa-share-nodes","border-blue-500")},e.playSimulatedVoiceNote=s=>{const i=document.getElementById("voicePlayIcon-"+s),n=document.getElementById("voicePlayText-"+s);i&&n&&(i.className="fa-solid fa-spinner fa-spin text-[10px]",n.innerText="Playing Memo...",setTimeout(()=>{i.className="fa-solid fa-check text-[10px]",n.innerText="Memo Played",setTimeout(()=>{i.className="fa-solid fa-play text-[10px]",n.innerText="Play Voice Memo"},2500)},1800)),h("Playing farmer voice note recorded in Bishoftu farm hub.","fa-volume-high","border-emerald-500")},e.sendSmsInquiry=(s,i)=>{h(`Dispatched SMS inquiry for ${i} to ${s}`,"fa-paper-plane","border-emerald-500")},e.navigateTab=s=>{this.activeTab=s,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setBuyerAccountTab=s=>{this.activeBuyerAccountTab=s,this.activeTab="account",c.fetchAccountData().then(()=>this.render()).catch(i=>h(i.message||"Could not load account data.","fa-circle-xmark","border-rose-500")),this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setFarmerAccountTab=s=>{this.activeFarmerAccountTab=s,this.activeTab="farmer-account",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.deleteFarmerListing=async s=>{if(window.confirm("Delete this produce post? It will no longer be available for new orders."))try{await c.deleteListing(s),h("Produce post deleted.","fa-trash"),this.render()}catch(i){h(i.message||"Could not delete the produce post.","fa-circle-xmark","border-rose-500")}},e.changeFarmerPassword=async()=>{const s=document.querySelector(".account-form");if(!s)return;const i=new FormData(s);try{await c.changePassword(String(i.get("currentPassword")||""),String(i.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),s.reset()}catch(n){h(n.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}},e.saveFarmerProfile=async()=>{const s=document.querySelector(".account-form");if(!s)return;const i=new FormData(s);try{await c.updateProfile({name:String(i.get("name")||""),nameAm:String(i.get("nameAm")||""),region:String(i.get("region")||""),email:String(i.get("email")||""),languagePreference:String(i.get("languagePreference")||""),savedDeliveryAddress:String(i.get("savedDeliveryAddress")||""),defaultDeliveryLat:s.dataset.defaultLat?Number(s.dataset.defaultLat):void 0,defaultDeliveryLng:s.dataset.defaultLng?Number(s.dataset.defaultLng):void 0}),h("Farmer profile saved to your account.","fa-circle-check"),this.render()}catch(n){h(n.message||"Could not save farmer profile.","fa-circle-xmark","border-rose-500")}},e.captureFarmerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(s=>{const i=document.querySelector(".account-form");i&&(i.dataset.defaultLat=String(s.coords.latitude),i.dataset.defaultLng=String(s.coords.longitude)),h("Farm location captured. Save profile to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.showAccountToast=(s,i="fa-circle-check")=>{h(s,i,"border-emerald-500")},e.saveBuyerProfile=async()=>{const s=document.querySelector(".account-form");if(!s)return;const i=new FormData(s);try{await c.updateProfile({name:String(i.get("name")||""),nameAm:String(i.get("nameAm")||""),region:String(i.get("region")||""),email:String(i.get("email")||""),languagePreference:String(i.get("languagePreference")||""),savedDeliveryAddress:String(i.get("savedDeliveryAddress")||""),defaultDeliveryLat:s.dataset.defaultLat?Number(s.dataset.defaultLat):void 0,defaultDeliveryLng:s.dataset.defaultLng?Number(s.dataset.defaultLng):void 0}),h("Profile changes saved to your account.","fa-circle-check"),this.render()}catch(n){h(n.message||"Could not save your profile.","fa-circle-xmark","border-rose-500")}},e.captureBuyerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(s=>{const i=document.querySelector(".account-form");i&&(i.dataset.defaultLat=String(s.coords.latitude)),i&&(i.dataset.defaultLng=String(s.coords.longitude)),h("Location captured. Save changes to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.changeBuyerPassword=async()=>{const s=document.querySelector(".account-form");if(!s)return;const i=new FormData(s);try{await c.changePassword(String(i.get("currentPassword")||""),String(i.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),s.reset()}catch(n){h(n.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}};const t=async(s,i)=>{try{await s(),h(i,"fa-circle-check"),this.render()}catch(n){h(n.message||"Account action failed.","fa-circle-xmark","border-rose-500")}};e.addBuyerAddress=()=>{const s=document.querySelector(".account-form");if(!s)return;const i=new FormData(s);t(()=>c.saveAddress({name:String(i.get("name")||""),phone:String(i.get("phone")||""),street:String(i.get("street")||""),city:String(i.get("city")||""),region:String(i.get("region")||""),postalCode:String(i.get("postalCode")||"")||null,country:String(i.get("country")||"Ethiopia"),isDefaultShipping:i.has("isDefaultShipping"),isDefaultBilling:!1}),"Address added.")},e.deleteBuyerAddress=s=>t(()=>c.deleteAddress(s),"Address deleted."),e.addBuyerPayment=()=>{const s=document.querySelector(".account-form");if(!s)return;const i=new FormData(s);t(()=>c.addPaymentMethod({provider:String(i.get("provider")||""),providerToken:String(i.get("providerToken")||""),maskedDisplay:String(i.get("maskedDisplay")||""),brand:String(i.get("brand")||"")||null,expiryMonth:Number(i.get("expiryMonth"))||null,expiryYear:Number(i.get("expiryYear"))||null,isPrimary:i.has("isPrimary")}),"Payment method linked.")},e.setPrimaryBuyerPayment=s=>t(()=>c.setPrimaryPaymentMethod(s),"Primary payment method updated."),e.deleteBuyerPayment=s=>t(()=>c.deletePaymentMethod(s),"Payment method removed."),e.submitBuyerDispute=s=>{const i=window.prompt("Reason: Item not received, Damaged, Wrong item, or Quality issue");i&&t(()=>c.disputeOrder(s,i,void 0,100),"Dispute submitted for review.")},e.revokeBuyerSessions=async()=>{try{await c.revokeOtherSessions(),h("Other sessions have been revoked.","fa-shield-check"),this.render()}catch(s){h(s.message||"Could not revoke sessions.","fa-circle-xmark","border-rose-500")}},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),h(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=s=>{this.activeBuyerSubTab=s,this.render()},e.toggleFarmerTab=s=>{this.activeFarmerTab=s,this.render()},e.setAdminTab=s=>{this.activeAdminTab=s,this.render()},e.openInvoiceModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"invoice",orderId:s},this.render()},e.openContractModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"contract",orderId:s},this.render()},e.openWaybillModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"waybill",orderId:s},this.render()},e.openArbitrationModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"arbitration",orderId:s},this.render()},e.closeLegalDocModal=()=>{this.activeLegalDocModal=null,this.render()},e.printOfficialDocument=()=>{window.print()},e.setMaxDistanceKm=s=>{this.maxDistanceKm=s,h(s===0?"Showing all produce across Ethiopia":`Filtering farms within ${s} km radius`,"fa-location-dot"),this.render()},e.setFilterGrade=s=>{this.activeGrade=s,this.render()},e.setFilterRipeness=s=>{this.activeRipeness=s,this.render()},e.toggleOrganicFilter=s=>{this.organicOnly=s,this.render()},e.toggleAdvanceFilter=s=>{this.advanceOnly=s,this.render()},e.setCategory=s=>{this.activeCategory=s,this.render()},e.resetFilters=()=>{this.activeCategory="All",this.selectedRegion="All",this.searchQuery="",this.maxDistanceKm=0,this.activeGrade="All",this.activeRipeness="All",this.organicOnly=!1,this.advanceOnly=!1,this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async s=>{var V,y,_,G,B,P,J,ie,A,Y,q,ce,ge,$e,Ee;s.preventDefault();const i=(V=document.getElementById("newProdName"))==null?void 0:V.value,n=(y=document.getElementById("newProdNameAm"))==null?void 0:y.value,r=((_=document.getElementById("newCategory"))==null?void 0:_.value)||"Vegetables",d=Number(((G=document.getElementById("newQtyKg"))==null?void 0:G.value)||1e3),p=Number(((B=document.getElementById("newPricePerKg"))==null?void 0:B.value)||45),l=Number(((P=document.getElementById("newMinOrderKg"))==null?void 0:P.value)||50),b=((J=document.getElementById("newGrade"))==null?void 0:J.value)||"Grade 1",v=((ie=document.getElementById("newRipeness"))==null?void 0:ie.value)||"Ready Today",k=((A=document.getElementById("newIsAdvanceHarvest"))==null?void 0:A.checked)||!1,$=((Y=document.getElementById("newExpectedHarvestDate"))==null?void 0:Y.value)||void 0,u=((ce=(q=document.getElementById("voiceTranscriptText"))==null?void 0:q.innerText)==null?void 0:ce.replace(/^"|"$/g,""))||void 0,S=((ge=document.getElementById("newRequiresColdChain"))==null?void 0:ge.checked)||!1,T=(($e=document.getElementById("newIsAggregatedLot"))==null?void 0:$e.checked)||!1,w=((Ee=document.getElementById("newCooperativeName"))==null?void 0:Ee.value)||void 0,E=c.getCurrentUser(),L=await c.createListing({productName:i,nameAm:n||void 0,category:r,qtyKg:d,pricePerKg:p,minOrderKg:l,grade:b,ripeness:v,isAdvanceHarvest:k,expectedHarvestDate:$,voiceNoteTranscript:u,requiresColdChain:S,isAggregatedLot:T,cooperativeName:T?w||"Bishoftu Farmers Cooperative Union":void 0,farmerId:E==null?void 0:E.id,farmerName:E==null?void 0:E.name,farmerNameAm:E==null?void 0:E.nameAm,farmerPhone:E==null?void 0:E.phone,region:E==null?void 0:E.region});this.isCreateListingModalOpen=!1,H({particleCount:90,spread:60,origin:{y:.6}}),h(this.lang==="am"?"አዲስ ምርት በተሳካ ሁኔታ ተመዝግቧል!":`Published ${L.productName} successfully!`,"fa-circle-check"),this.render()},e.checkFairPriceForNewListing=async()=>{var l,b,v,k,$;const s=((l=document.getElementById("newProdName"))==null?void 0:l.value)||"Tomatoes",i=((b=document.getElementById("newCategory"))==null?void 0:b.value)||"Vegetables",n=((v=document.getElementById("newGrade"))==null?void 0:v.value)||"Grade 1",r=Number(((k=document.getElementById("newQtyKg"))==null?void 0:k.value)||500),d=(($=document.getElementById("newRequiresColdChain"))==null?void 0:$.checked)||!1,p=c.getCurrentUser();try{const u=await c.getFairPriceRecommendation({commodityName:s,category:i,region:(p==null?void 0:p.region)||"Oromia",grade:n,qtyKg:r,requiresColdChain:d}),S=document.getElementById("newPricePerKg");S&&(S.value=u.recommendedFairPriceEtb.toString()),h(`AI Fair Price Applied: ETB ${u.recommendedFairPriceEtb}/kg (ECX Benchmarked)`,"fa-wand-magic-sparkles","border-amber-500")}catch{h("Using local standard benchmark rate","fa-info-circle","border-blue-500")}},e.handleVoiceRecordToggle=()=>{const s=document.getElementById("voiceRecordBtn"),i=document.getElementById("voiceRecordLabel"),n=document.getElementById("voiceWaveAnimation"),r=document.getElementById("voiceTranscriptionResult");document.getElementById("voiceTranscriptText"),this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription("am")):(this.isRecordingVoice=!0,i&&(i.innerText="Stop & Transcribe (አቁም)"),s&&(s.classList.remove("bg-emerald-600"),s.classList.add("bg-red-600")),n&&n.classList.remove("hidden"),r&&r.classList.add("hidden"),h("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription("am")},3500))},e.finishVoiceTranscription=s=>{this.isRecordingVoice=!1;const i=document.getElementById("voiceRecordLabel"),n=document.getElementById("voiceWaveAnimation"),r=document.getElementById("voiceTranscriptionResult"),d=document.getElementById("voiceTranscriptText");i&&(i.innerText="Record Voice Note (ድምጽ ቅጂ)"),n&&n.classList.add("hidden");const p=c.simulateVoiceTranscription(4,s),l=document.getElementById("newProdName"),b=document.getElementById("newProdNameAm"),v=document.getElementById("newCategory"),k=document.getElementById("newQtyKg"),$=document.getElementById("newPricePerKg");l&&(l.value=p.productName),b&&(b.value=p.nameAm),v&&(v.value=p.category),k&&(k.value=p.qtyKg.toString()),$&&($.value=p.pricePerKg.toString()),r&&d&&(d.innerText=`"${p.transcript}"`,r.classList.remove("hidden")),H({particleCount:60,spread:50,origin:{y:.6}}),h("Voice Note Transcribed! Form auto-filled in Amharic.","fa-wand-magic-sparkles")},e.handleSimulateSms=async s=>{s.preventDefault();const i=document.getElementById("smsPhone").value,n=document.getElementById("smsCommand").value,r=document.getElementById("smsResponseBox"),d=document.getElementById("smsResponseText");r&&d&&(d.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',r.classList.remove("hidden"));const p=await c.sendInboundSms(i,n);d&&(d.innerHTML=`&gt; ${p}`),h("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const s=c.getCurrentUser(),i=(s==null?void 0:s.walletBalanceEtb)||48200;if(i<=0){h("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}c.requestWalletWithdrawal(i,(s==null?void 0:s.phone)||"+251911223344"),H({particleCount:100,spread:70,origin:{y:.6}}),h(`Instant Payout of ${i.toLocaleString()} ETB deposited to Telebirr (${(s==null?void 0:s.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=s=>{if(!c.isAuthenticated()){e.openAuthModal("login");return}c.addStandingOrder(s,150,"Weekly"),H({particleCount:70,spread:60,origin:{y:.6}}),h("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=s=>{c.toggleStandingOrder(s),h("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=s=>{const i=c.getOrders().find(n=>n.id===s);i&&(this.activeDisputeModal={isOpen:!0,order:i},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(s,i)=>{s.preventDefault();const n=document.getElementById("disputeReasonInput").value,r=document.getElementById("disputePhotoUrl").value,d=document.getElementById("disputeRefundSlider").value;await c.disputeOrder(i,n,r,parseInt(d,10)),this.activeDisputeModal=null,this.activeOrderModal=null,h("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const s=c.toggleOfflineMode();h(s?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const s=await c.syncOfflineQueue();h(`Synced ${s} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async s=>{const i=c.getOptimizedRoute();i.stops[s]&&(i.stops[s].completed=!0,H({particleCount:50,spread:50,origin:{y:.6}}),h(`Stop #${s+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async s=>{await c.pickupOrderByDriver(s,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),h("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async s=>{await c.confirmDeliveryByBuyer(s,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),H({particleCount:120,spread:70,origin:{y:.6}}),h("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(s,i)=>{await c.verifyKyc(s,i),h(i?"Identity & Documents Approved!":"KYC verification rejected",i?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=s=>{h(`Anomaly Alert #${s} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=s=>{h(`Audit trail opened for Anomaly #${s}`,"fa-magnifying-glass")},e.openAuthModal=(s="login")=>{this.authMode=s,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.matchedUserEmail="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=s=>{this.authMode=s,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=s=>{this.pendingPhone=s.replace("+251","").trim(),this.authErrorMessage="",this.render();const i=document.getElementById("authPhoneInput");i&&(i.value=this.pendingPhone,i.focus())},e.switchToRegisterWithPhone=s=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=s.replace("+251","").trim(),this.render()},e.handleRequestOtp=async s=>{s.preventDefault();const i=document.getElementById("authPhoneInput").value.trim();if(!i||i.length<8){h("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const n=document.getElementById("requestOtpBtn");n&&(n.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',n.disabled=!0),this.pendingPhone=i,this.authErrorMessage="";try{const r=await c.requestOtp(i);this.lastSentCode=r.demoCode||"",this.matchedUserName=r.userName||"",this.matchedUserRole=r.role||"",this.matchedUserEmail=r.email||"",this.otpStep=!0,r.email?h(`Security code dispatched to +251 ${i} and ${r.email}`,"fa-shield-halved","border-emerald-500"):h(`SMS verification code dispatched to +251 ${i}`,"fa-comment-sms","border-emerald-500")}catch(r){this.authErrorMessage=r.message||"No account registered with this phone number. Please register first."}this.render()},e.handleVerifyOtp=async s=>{var r;s.preventDefault();const i=(r=document.getElementById("authOtpInput")||document.getElementById("otpCodeInput"))==null?void 0:r.value.trim();if(!i||i.length!==6){h("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const n=document.getElementById("verifyOtpBtn");n&&(n.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',n.disabled=!0);try{const d=await c.verifyOtp(this.pendingPhone,i);this.isAuthModalOpen=!1,this.otpStep=!1,this.authErrorMessage="",d.role==="superadmin"?this.activeTab="superadmin":d.role==="farmer"?this.activeTab="farmer":d.role==="driver"?this.activeTab="driver":d.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.cart=this.loadCartFromStorage(),H({particleCount:100,spread:70,origin:{y:.6}}),h(`Welcome back, ${d.name}! (${d.role.toUpperCase()})`,"fa-circle-check","border-emerald-500")}catch(d){this.authErrorMessage=d.message||"Invalid OTP code. Please try again."}this.render()};const a=async s=>{var v,k,$,u,S,T;s.preventDefault();const i=((v=document.getElementById("regName"))==null?void 0:v.value.trim())||"",n=((k=document.getElementById("regNameAm"))==null?void 0:k.value.trim())||i,r=(($=document.getElementById("regPhone"))==null?void 0:$.value.trim())||"",d=((u=document.getElementById("regRegion"))==null?void 0:u.value)||"Oromia (Bishoftu)",p=((S=document.querySelector('input[name="regRole"]:checked'))==null?void 0:S.value)||"buyer",l=((T=document.getElementById("regEmail"))==null?void 0:T.value.trim())||void 0,b=document.getElementById("registerSubmitBtn");b&&(b.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...',b.disabled=!0);try{const w=await c.registerUser(i,n,r,p,d,l);this.isAuthModalOpen=!1,this.authErrorMessage="",w.role==="farmer"?this.activeTab="farmer":w.role==="driver"?this.activeTab="driver":w.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.cart=this.loadCartFromStorage(),H({particleCount:150,spread:90,origin:{y:.6}}),h(`Welcome to Farmer-to-Market, ${w.name}!`,"fa-circle-check","border-emerald-500")}catch(w){this.authErrorMessage=w.message||"Registration failed. Please try a different phone number."}this.render()};e.handleRegisterUser=a,e.handleRegisterSubmit=a,e.handleLogout=()=>{c.logout(),this.activeTab="marketplace",h("Logged out successfully","fa-arrow-right-from-bracket"),this.render()},e.switchDemoUser=async s=>{try{const i=await c.requestOtp(s);if(i.demoCode){const n=await c.verifyOtp(s,i.demoCode);n.role==="farmer"?this.activeTab="farmer":n.role==="driver"?this.activeTab="driver":n.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.cart=this.loadCartFromStorage(),H({particleCount:80,spread:60,origin:{y:.6}}),h(`Switched to profile: ${n.name} (${n.role.toUpperCase()})`,"fa-user-shield")}}catch(i){h("Demo switch failed: "+i.message,"fa-circle-xmark","border-red-500")}this.render()},e.addToCart=s=>{const i=c.getListingById(s);if(!i)return;const n=this.cart.find(r=>r.listing.id===s);n?n.qtyKg+=i.minOrderKg:this.cart.push({listing:i,qtyKg:i.minOrderKg}),this.saveCartToStorage(),h(`Added ${i.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(s,i)=>{const n=this.cart.find(r=>r.listing.id===s);n&&(i<=0?this.cart=this.cart.filter(r=>r.listing.id!==s):n.qtyKg=i,this.saveCartToStorage()),this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.openTelebirrModal=s=>{if(!c.isAuthenticated()){e.openAuthModal("login");return}this.activeTelebirrModal={isOpen:!0,totalEtb:s},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.handleTelebirrSubmit=async s=>{var i;s.preventDefault();try{const n=document.getElementById("checkoutAddress"),r=document.querySelector('input[name="checkoutPayment"]:checked'),d=n==null?void 0:n.value,p=c.getAccountData().addresses.find($=>$.id===d);if(!p||!r){h("Choose a shipping address and payment method first.","fa-circle-exclamation","border-amber-500");return}const l=`${p.street}, ${p.city}, ${p.region}, ${p.country}`,b=this.cart.length?this.cart:(i=this.activeTelebirrModal)!=null&&i.listingId?[{listing:c.getListingById(this.activeTelebirrModal.listingId),qtyKg:this.activeTelebirrModal.qtyKg||0}]:[];if(!b.length||!b[0].listing)throw new Error("The selected produce is no longer available.");let v=null,k;for(const $ of b){const u=$.listing;if(!u)throw new Error("The selected produce is no longer available.");const S=await c.placeOrder(u.id,$.qtyKg,l,!1,"Weekly",r.value==="telebirr-wallet"?void 0:r.value);v=S.order,S.paymentUrl&&(k=S.paymentUrl)}if(this.cart=[],this.saveCartToStorage(),this.isCartOpen=!1,this.activeTelebirrModal=null,k&&(k.includes("chapa.co")||k.startsWith("https://"))){h("Redirecting to Chapa Gateway for payment...","fa-arrow-up-right-from-square","border-emerald-500"),window.location.href=k;return}H({particleCount:150,spread:80,origin:{y:.6}}),h("Payment authorized via Telebirr. Farmer notified.","fa-lock","border-blue-500"),v&&(this.activeOrderModal=v)}catch(n){h("Order placement failed: "+n.message,"fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=s=>{const n=c.getOrders().find(r=>r.id===s);n&&(this.activeOrderModal=n,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.openNotificationsModal=()=>{if(!c.isAuthenticated()||!c.getCurrentUser()){e.openAuthModal("login");return}this.isNotificationsModalOpen=!0,this.render()},e.closeNotificationsModal=()=>{this.isNotificationsModalOpen=!1,this.render()},e.confirmFarmerOrder=async s=>{await c.confirmOrderByFarmer(s),le.joinOrder(s),h("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async s=>{await c.confirmDeliveryByBuyer(s),H({particleCount:150,spread:80,origin:{y:.6}}),h("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),c.getOrders().find(i=>i.id===s),this.activeRateModal={isOpen:!0,orderId:s,rating:5,comment:"",selectedTags:["🌾 Fresh Harvest","📦 Grade-1 Packaging"]},this.render()},e.openRateModal=s=>{const i=c.getOrders().find(n=>n.id===s);this.activeRateModal={isOpen:!0,orderId:s,rating:(i==null?void 0:i.reviewRating)||5,comment:(i==null?void 0:i.reviewComment)||"",selectedTags:i!=null&&i.reviewQuickTags&&i.reviewQuickTags.length>0?[...i.reviewQuickTags]:["🌾 Fresh Harvest","📦 Grade-1 Packaging"]},this.render()},e.closeRateModal=()=>{this.activeRateModal=null,this.render()},e.setModalRating=s=>{this.activeRateModal&&(this.activeRateModal.rating=s,this.render())},e.toggleModalReviewTag=s=>{this.activeRateModal&&(this.activeRateModal.selectedTags.includes(s)?this.activeRateModal.selectedTags=this.activeRateModal.selectedTags.filter(i=>i!==s):this.activeRateModal.selectedTags.push(s),this.render())},e.updateModalReviewComment=s=>{if(this.activeRateModal){this.activeRateModal.comment=s;const i=document.getElementById("reviewCommentCharCount");i&&(i.innerText=`${s.length} / 500`)}},e.handleReviewFormSubmit=async s=>{if(s.preventDefault(),!this.activeRateModal)return;const{orderId:i,rating:n,comment:r,selectedTags:d}=this.activeRateModal,p=c.getOrders().find(l=>l.id===i);if(!p){h("Order record not found.","fa-circle-xmark","border-rose-500");return}try{await c.createReview(i,p.farmerId,n,r,d),H({particleCount:150,spread:80,origin:{y:.6}}),h(this.lang==="am"?"እናመሰግናለን! የእርስዎ ደረጃ እና አስተያየት በተሳካ ሁኔታ ተመዝግቧል።":"Thank you! Your verified rating and review have been recorded.","fa-star","border-amber-500"),this.activeRateModal=null,this.activeOrderModal&&this.activeOrderModal.id===i&&(this.activeOrderModal.isRated=!0,this.activeOrderModal.reviewRating=n,this.activeOrderModal.reviewComment=r,this.activeOrderModal.reviewQuickTags=d),this.render()}catch(l){h(l.message||"Could not submit review.","fa-circle-xmark","border-rose-500")}},e.adminResolveDispute=async(s,i)=>{try{await c.resolveDispute(s,i),i==="RefundBuyer"||i==="PartialSplit"?(H({particleCount:120,spread:70,origin:{y:.6}}),h(this.lang==="am"?"ቅሬታው ተፈቷል፡ ለገዢው በቴሌብር ተመላሽ ተደርጓል። ማሳወቂያ ለገዢው ተልኳል።":"Dispute resolved: Buyer refunded via Telebirr. Immediate notification sent to buyer.","fa-money-bill-transfer","border-emerald-500")):h("Dispute resolved: Escrow released to farmer.","fa-gavel","border-purple-500"),this.render()}catch(n){h(n.message||"Could not resolve the dispute.","fa-circle-xmark","border-rose-500")}},e.markAllNotificationsRead=()=>{c.markAllNotificationsRead(),this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async s=>{var u;s.preventDefault();const i=document.getElementById("newProdName").value,n=document.getElementById("newProdNameAm").value,r=document.getElementById("newCategory").value,d=parseFloat(document.getElementById("newQtyKg").value),p=parseFloat(document.getElementById("newPricePerKg").value),l=parseFloat(document.getElementById("newMinOrderKg").value),b=document.getElementById("newGrade").value,v=document.getElementById("newRipeness").value,k=document.getElementById("newIsAdvanceHarvest").checked,$=(u=document.getElementById("newExpectedHarvestDate"))==null?void 0:u.value;try{await c.createListing({productName:i,nameAm:n,category:r,qtyKg:d,pricePerKg:p,minOrderKg:l,grade:b,ripeness:v,isOrganic:!0,isAdvanceHarvest:k,expectedHarvestDate:k?$:void 0,availableFrom:k&&$?$:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,h(`Published ${i} to marketplace!`,"fa-cloud-arrow-up")}catch(S){h(S.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleAdminBroadcastSms=async s=>{s.preventDefault();const i=document.getElementById("smsTargetRole").value,n=document.getElementById("smsMsgEn").value,r=document.getElementById("smsMsgAm").value;await c.broadcastSms(n,r,i),h(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to smallholders via Twilio!","fa-paper-plane"),this.render()},e.openVerificationWizard=(s=1)=>{this.verificationWizardModal.setLanguage(this.lang),this.verificationWizardModal.open(s)},e.closeVerificationWizard=()=>{this.verificationWizardModal.close()},e.setWizardStep=s=>{this.verificationWizardModal.setStep(s)},e.updateWizardField=(s,i)=>{this.verificationWizardModal.updateField(s,i)},e.submitVerificationForm=async()=>{await this.verificationWizardModal.submit(),H({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"ሰነዶችዎ ደርሰውናል! በ24 ሰዓት ውስጥ ይገመገማሉ።":"Documents submitted! Verification under 24-hour review.","fa-shield-check","border-emerald-500"),this.render()},e.switchAgentTab=s=>{this.agentView.switchTab(s),this.render()},e.setUssdInput=s=>{this.agentView.setUssdInput(s)},e.sendUssdCommand=async()=>{await this.agentView.executeUssd()},e.sendInboundSms=async()=>{const s=document.getElementById("inboundSmsBody"),i=(s==null?void 0:s.value)||"FAYDA FAN-8812-4091-2810";h(this.lang==="am"?`የኤስኤምኤስ ትዕዛዝ ተቀብለናል፡ "${i}"`:`Inbound SMS processed: "${i}"`,"fa-comment-sms","border-blue-500"),await c.refreshAllData(),this.render()},e.handleAgentRegisterSubmit=async s=>{var k,$,u,S,T;s.preventDefault();const i=document.getElementById("agFarmerName").value,n=(k=document.getElementById("agFarmerNameAm"))==null?void 0:k.value,r=document.getElementById("agFarmerPhone").value,d=document.getElementById("agFarmerRegion").value,p=($=document.getElementById("agFarmerKebele"))==null?void 0:$.value,l=(u=document.getElementById("agFarmerCrop"))==null?void 0:u.value,b=(S=document.getElementById("agFarmerFayda"))==null?void 0:S.value,v=(T=document.getElementById("agFarmerTin"))==null?void 0:T.value;try{await c.agentRegisterFarmer({name:i,nameAm:n,phone:r,region:d,kebele:p,primaryCrop:l,faydaId:b,tinNumber:v}),H({particleCount:120,spread:80,origin:{y:.6}}),h(this.lang==="am"?`${i} ተመዝግቧል! የማረጋገጫ ኤስኤምኤስ ተልኳል።`:`Farmer ${i} registered! Welcome SMS dispatched.`,"fa-user-check","border-emerald-500"),this.agentView.switchTab("roster"),this.render()}catch(w){h("Registration failed: "+w.message,"fa-circle-xmark","border-red-500")}},e.sendAgentFarmerSms=s=>{h(this.lang==="am"?`ኤስኤምኤስ ወደ ${s} ተልኳል!`:`SMS dispatch sent to ${s}!`,"fa-paper-plane","border-blue-500")},e.adminReviewVerification=async(s,i)=>{let n,r;if(i==="Reject"){if(r=prompt(this.lang==="am"?"እባክዎ ውድቅ የተደረገበትን ምክንያት ያስገቡ (ለምሳሌ፡ የፋይዳ ፎቶው ግልጽ አይደለም / የታክስ ቁጥር አልተገኘም):":"Enter rejection reason to notify the user via SMS (e.g. Blurry ID photo / TIN mismatch):","Blurry Fayda ID photo. Please re-upload clear image.")||void 0,!r)return}else n="Identity & TIN verified against Ministry of Revenues registry.";await c.reviewVerification(s,i,n,r),i==="Approve"?(H({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"የተጠቃሚው ማረጋገጫ ጸድቋል! የኤስኤምኤስ መልእክት ተልኳል።":"User account APPROVED! SMS confirmation dispatched.","fa-circle-check","border-emerald-500")):h(this.lang==="am"?"ማረጋገጫው ውድቅ ተደርጓል፤ ምክንያቱ በኤስኤምኤስ ተልኳል።":"Verification rejected & reason SMS sent to user.","fa-triangle-exclamation","border-amber-500"),this.render()},e.setSuperAdminTab=s=>{this.activeSuperAdminTab=s,this.render()},e.setRbacSelectedRole=s=>{this.selectedRbacRole=s,this.render()},e.handleToggleRolePermission=(s,i,n)=>{c.updateRolePermissionKey(s,i,n),h(n?`Granted "${i}" to ${s.toUpperCase()}`:`Revoked "${i}" from ${s.toUpperCase()}`,"fa-shield-halved",n?"border-emerald-500":"border-amber-500"),this.render()},e.resetAllRolePermissions=()=>{confirm("Reset all roles to factory default permissions?")&&(c.resetRolePermissions(),H({particleCount:90,spread:60,origin:{y:.6}}),h("Reset all role permissions to factory defaults!","fa-rotate-left","border-emerald-500"),this.render())},e.setUserRoleFilter=s=>{this.superAdminUserRoleFilter=s,this.render()},e.setAuditCategoryFilter=s=>{this.superAdminAuditCategoryFilter=s,this.render()},e.openCreateUserModal=()=>{if(!c.hasPermission("MANAGE_USERS")){h("Unauthorized: You lack MANAGE_USERS permission.","fa-lock","border-red-500");return}this.isSuperAdminCreateUserModalOpen=!0,this.render()},e.openEditUserModal=s=>{if(!c.hasPermission("MANAGE_USERS")){h("Unauthorized: You lack MANAGE_USERS permission.","fa-lock","border-red-500");return}this.editTargetUserId=s,this.isSuperAdminEditUserModalOpen=!0,this.render()},e.openAddZoneModal=()=>{if(!c.hasPermission("MANAGE_TRADE_ZONES")){h("Unauthorized: You lack MANAGE_TRADE_ZONES permission.","fa-lock","border-red-500");return}this.isSuperAdminAddZoneModalOpen=!0,this.render()},e.openAddBlacklistModal=()=>{if(!c.hasPermission("MANAGE_BLACKLIST")){h("Unauthorized: You lack MANAGE_BLACKLIST permission.","fa-lock","border-red-500");return}this.isSuperAdminAddBlacklistModalOpen=!0,this.render()},e.openCreateBannerModal=()=>{if(!c.hasPermission("MANAGE_BANNERS")){h("Unauthorized: You lack MANAGE_BANNERS permission.","fa-lock","border-red-500");return}this.editTargetBannerId=null,this.isSuperAdminBannerModalOpen=!0,this.render()},e.openEditBannerModal=s=>{if(!c.hasPermission("MANAGE_BANNERS")){h("Unauthorized: You lack MANAGE_BANNERS permission.","fa-lock","border-red-500");return}this.editTargetBannerId=s,this.isSuperAdminBannerModalOpen=!0,this.render()},e.handleSaveBannerSubmit=(s,i)=>{var L,V,y,_,G,B,P,J,ie,A,Y,q,ce,ge;s.preventDefault();const n=(L=document.getElementById("bannerTitleInput"))==null?void 0:L.value,r=((V=document.getElementById("bannerTitleAmInput"))==null?void 0:V.value)||void 0,d=((y=document.getElementById("bannerSubtitleInput"))==null?void 0:y.value)||void 0,p=((_=document.getElementById("bannerSubtitleAmInput"))==null?void 0:_.value)||void 0,l=(G=document.getElementById("bannerAudienceSelect"))==null?void 0:G.value,b=((B=document.getElementById("bannerRegionSelect"))==null?void 0:B.value)||"All",v=Number((P=document.getElementById("bannerPriorityInput"))==null?void 0:P.value)||5,k=((J=document.getElementById("bannerBadgeInput"))==null?void 0:J.value)||void 0,$=((ie=document.getElementById("bannerBadgeAmInput"))==null?void 0:ie.value)||void 0,u=((A=document.getElementById("bannerCtaTextInput"))==null?void 0:A.value)||"Browse Marketplace",S=((Y=document.getElementById("bannerCtaLinkSelect"))==null?void 0:Y.value)||"marketplace",T=(q=document.getElementById("bannerImageUrlInput"))==null?void 0:q.value,w=(ce=document.getElementById("bannerGradientSelect"))==null?void 0:ce.value,E=((ge=document.getElementById("bannerIsActiveCheck"))==null?void 0:ge.checked)??!0;i?(c.updateBanner(i,{title:n,titleAm:r,subtitle:d,subtitleAm:p,targetAudience:l,targetRegion:b,priority:v,badgeText:k,badgeTextAm:$,ctaText:u,ctaLink:S,imageUrl:T,themeGradient:w,isActive:E}),h(`Updated promotional banner: "${n}"`,"fa-panorama","border-emerald-500")):(c.createBanner({title:n,titleAm:r,subtitle:d,subtitleAm:p,targetAudience:l,targetRegion:b,priority:v,badgeText:k,badgeTextAm:$,ctaText:u,ctaLink:S,imageUrl:T,themeGradient:w,isActive:E}),H({particleCount:90,spread:60,origin:{y:.6}}),h(`Published new banner: "${n}"!`,"fa-panorama","border-emerald-500")),this.isSuperAdminBannerModalOpen=!1,this.editTargetBannerId=null,this.render()},e.toggleBannerStatus=s=>{const i=c.getBannerById(s);if(!i)return;const n=!i.isActive;c.toggleBannerStatus(s,n),h(n?`Activated banner: "${i.title}"`:`Paused banner: "${i.title}"`,"fa-panorama",n?"border-emerald-500":"border-slate-500"),this.render()},e.deleteBanner=s=>{const i=c.getBannerById(s);i&&confirm(`Are you sure you want to delete banner "${i.title}"?`)&&(c.deleteBanner(s),h(`Deleted banner: "${i.title}"`,"fa-trash","border-red-500"),this.render())},e.openAdminEditListingModal=s=>{this.editTargetListingId=s,this.isListingEditModalOpen=!0,this.render()},e.handleAdminEditListingSubmit=(s,i)=>{var w,E,L,V,y,_,G,B,P,J,ie,A;s.preventDefault();const n=(w=document.getElementById("listingNameInput"))==null?void 0:w.value,r=((E=document.getElementById("listingNameAmInput"))==null?void 0:E.value)||void 0,d=(L=document.getElementById("listingCategorySelect"))==null?void 0:L.value,p=(V=document.getElementById("listingGradeSelect"))==null?void 0:V.value,l=(y=document.getElementById("listingModerationStatusSelect"))==null?void 0:y.value,b=Number((_=document.getElementById("listingPriceInput"))==null?void 0:_.value),v=Number((G=document.getElementById("listingQtyInput"))==null?void 0:G.value),k=Number((B=document.getElementById("listingMinOrderInput"))==null?void 0:B.value)||50,$=(P=document.getElementById("listingRegionInput"))==null?void 0:P.value,u=((J=document.getElementById("listingDescInput"))==null?void 0:J.value)||void 0,S=((ie=document.getElementById("listingOrganicCheck"))==null?void 0:ie.checked)??!1,T=((A=document.getElementById("listingAdvanceHarvestCheck"))==null?void 0:A.checked)??!1;c.adminUpdateListing(i,{productName:n,nameAm:r,category:d,grade:p,moderationStatus:l,pricePerKg:b,qtyKg:v,minOrderKg:k,region:$,description:u,isOrganic:S,isAdvanceHarvest:T}),this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Saved moderation changes for "${n}"!`,"fa-gavel","border-purple-500"),this.render()},e.adminDeleteListing=s=>{const i=c.getListings().find(d=>d.id===s);if(!i)return;const n=prompt(this.lang==="am"?"እባክዎ የተሰረዘበትን ምክንያት ያስገቡ:":"Please enter the reason for removing this listing post:","Violates marketplace quality & pricing policies");if(n===null)return;c.adminDeleteListing(s,n)?(this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Deleted produce post: "${i.productName}"`,"fa-trash","border-red-500")):h("Failed to delete produce post","fa-triangle-exclamation","border-red-500"),this.render()},e.flagListingAnomaly=s=>{const i=c.getListings().find(n=>n.id===s);i&&(c.flagListingAnomaly(s,"Manual Admin Anomaly Flag"),h(`Flagged "${i.productName}" for price/quality inspection!`,"fa-flag","border-amber-500"),this.render())},e.closeSuperAdminModal=()=>{this.isSuperAdminCreateUserModalOpen=!1,this.isSuperAdminEditUserModalOpen=!1,this.isSuperAdminAddZoneModalOpen=!1,this.isSuperAdminAddBlacklistModalOpen=!1,this.isSuperAdminBannerModalOpen=!1,this.isListingEditModalOpen=!1,this.editTargetUserId=null,this.editTargetBannerId=null,this.editTargetListingId=null,this.render()},e.handleRoleChangeInModal=s=>{const i=document.getElementById("roleSpecificFields");i&&(s==="farmer"?i.innerHTML=`
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Primary Produce / Crop</label>
              <input type="text" id="newPrimaryCropInput" placeholder="e.g. Magna Teff, Fresh Tomatoes" class="input-field text-xs font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Kebele / Farm Location</label>
              <input type="text" id="newKebeleInput" placeholder="e.g. Kebele 03 Farm Cluster" class="input-field text-xs font-bold" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">National ID (Fayda FAN)</label>
              <input type="text" id="newFaydaInput" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-bold font-mono" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Taxpayer ID (TIN Number)</label>
              <input type="text" id="newTinInput" placeholder="10-digit TIN" class="input-field text-xs font-bold font-mono" />
            </div>
          </div>
        `:s==="driver"?i.innerHTML=`
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Vehicle Model & Type</label>
              <input type="text" id="newVehicleTypeInput" placeholder="e.g. Isuzu 5-Ton FSR" value="Isuzu 5-Ton" class="input-field text-xs font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Payload Capacity (kg)</label>
              <input type="number" id="newCapacityInput" placeholder="5000" value="5000" class="input-field text-xs font-bold" />
            </div>
          </div>
          <div>
            <label class="block mb-1 font-bold text-slate-700">Refrigeration / Cargo Mode</label>
            <input type="text" id="newRefrigInput" placeholder="Ventilated, Insulated, or Active Refrigerated" value="Ventilated & Insulated" class="input-field text-xs font-bold" />
          </div>
        `:s==="buyer"?i.innerHTML=`
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Business License Number</label>
              <input type="text" id="newLicenseInput" placeholder="BL-AA-XXXXX" class="input-field text-xs font-bold font-mono" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Taxpayer ID (TIN)</label>
              <input type="text" id="newTinInput" placeholder="10-digit TIN" class="input-field text-xs font-bold font-mono" />
            </div>
          </div>
        `:s==="admin"?i.innerHTML=`
          <div>
            <label class="block mb-2 font-bold text-slate-700">Admin Permissions Assigned</label>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Manage Users & KYC</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Arbitrate Disputes</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Broadcast SMS</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> View Tax Reports</label>
            </div>
          </div>
        `:s==="superadmin"&&(i.innerHTML=`
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
            👑 Grants full unrestricted platform access, killswitches, impersonation engine, and escrow governance.
          </div>
        `))},e.handleCreateUserSubmit=s=>{var E,L,V,y,_,G,B,P,J,ie,A,Y,q,ce;s.preventDefault();const i=(E=document.getElementById("newRoleSelect"))==null?void 0:E.value,n=(L=document.getElementById("newNameInput"))==null?void 0:L.value,r=((V=document.getElementById("newNameAmInput"))==null?void 0:V.value)||void 0,d=(y=document.getElementById("newPhoneInput"))==null?void 0:y.value,p=(_=document.getElementById("newRegionInput"))==null?void 0:_.value,l=((G=document.getElementById("newVerifiedCheck"))==null?void 0:G.checked)??!0,b=((B=document.getElementById("newPrimaryCropInput"))==null?void 0:B.value)||void 0,v=((P=document.getElementById("newKebeleInput"))==null?void 0:P.value)||void 0,k=((J=document.getElementById("newFaydaInput"))==null?void 0:J.value)||void 0,$=((ie=document.getElementById("newTinInput"))==null?void 0:ie.value)||void 0,u=((A=document.getElementById("newVehicleTypeInput"))==null?void 0:A.value)||void 0,S=Number((Y=document.getElementById("newCapacityInput"))==null?void 0:Y.value)||void 0,T=((q=document.getElementById("newRefrigInput"))==null?void 0:q.value)||void 0,w=((ce=document.getElementById("newLicenseInput"))==null?void 0:ce.value)||void 0;c.createUser({role:i,name:n,nameAm:r,phone:d,region:p,verified:l,status:"active",primaryCrop:b,kebele:v,faydaId:k,tinNumber:$,vehicleType:u,vehicleCapacityKg:S,refrigerationType:T,businessLicenseNumber:w}),this.isSuperAdminCreateUserModalOpen=!1,H({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?`አዲስ ${i.toUpperCase()} መለያ ተፈጥሯል: ${n}`:`Created ${i.toUpperCase()} account: ${n}!`,"fa-user-check","border-rose-500"),this.render()},e.handleEditUserSubmit=(s,i)=>{var k,$,u,S,T,w,E;s.preventDefault();const n=(k=document.getElementById("editNameInput"))==null?void 0:k.value,r=($=document.getElementById("editPhoneInput"))==null?void 0:$.value,d=(u=document.getElementById("editRoleSelect"))==null?void 0:u.value,p=(S=document.getElementById("editStatusSelect"))==null?void 0:S.value,l=(T=document.getElementById("editRegionInput"))==null?void 0:T.value,b=((w=document.getElementById("editFaydaInput"))==null?void 0:w.value)||void 0,v=((E=document.getElementById("editTinInput"))==null?void 0:E.value)||void 0;c.updateUser(i,{name:n,phone:r,role:d,status:p,region:l,faydaId:b,tinNumber:v}),this.isSuperAdminEditUserModalOpen=!1,this.editTargetUserId=null,h(`Updated user profile: ${n}`,"fa-user-pen","border-emerald-500"),this.render()},e.toggleUserSuspension=s=>{try{const i=c.toggleUserSuspension(s),n=i.status==="suspended";h(n?this.lang==="am"?`የተጠቃሚ ${i.name} መለያ ታግዷል`:`Suspended account access for ${i.name}`:this.lang==="am"?`የተጠቃሚ ${i.name} መለያ እገዳ ተነስቷል`:`Reinstated account access for ${i.name}`,n?"fa-user-slash":"fa-user-check",n?"border-red-500":"border-emerald-500")}catch(i){h(i.message||"Error updating user status","fa-triangle-exclamation","border-red-500")}this.render()},e.deleteUserAccount=s=>{const i=c.getUserById(s);if(!i)return;const n=this.lang==="am"?`ተጠቃሚ '${i.name}' (${i.phone})ን በቋሚነት መሰረዝ ይፈልጋሉ? ይህ እርምጃ ሊመለስ አይችልም።`:`Are you sure you want to permanently delete user '${i.name}' (${i.phone})? This action cannot be undone.`;if(!confirm(n))return;c.deleteUser(s)?h(this.lang==="am"?`ተጠቃሚ '${i.name}' በቋሚነት ተሰርዟል`:`Permanently deleted user: ${i.name}`,"fa-trash","border-red-500"):h("Failed to delete user account","fa-triangle-exclamation","border-red-500"),this.render()},e.startSuperAdminImpersonation=s=>{const i=c.startImpersonation(s);i&&(window.isSuperAdminImpersonating=!0,h(`Logged in as ${i.name} (${i.role.toUpperCase()})`,"fa-user-secret","border-rose-500"),i.role==="farmer"?this.activeTab="farmer":i.role==="driver"?this.activeTab="driver":i.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.render(),window.scrollTo({top:0,behavior:"smooth"}))},e.stopSuperAdminImpersonation=()=>{c.stopImpersonation(),window.isSuperAdminImpersonating=!1,h("Exited impersonation. Returned to Super Admin dashboard.","fa-crown","border-rose-500"),this.activeTab="superadmin",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.updateEscrowSliders=s=>{const i=document.getElementById("farmerShareInput"),n=document.getElementById("driverShareInput"),r=document.getElementById("platformShareInput");if(!i||!n||!r)return;let d=Number(i.value),p=Number(n.value),l=Number(r.value);if(s==="farmer"){const b=100-d;p=Math.round(b/2),l=b-p,n.value=p.toString(),r.value=l.toString()}document.getElementById("farmerShareDisplay").innerText=`${i.value}%`,document.getElementById("driverShareDisplay").innerText=`${n.value}%`,document.getElementById("platformShareDisplay").innerText=`${r.value}%`},e.handleSaveSuperAdminConfig=s=>{var S,T,w,E,L,V,y,_,G,B,P;s.preventDefault();const i=Number((S=document.getElementById("farmerShareInput"))==null?void 0:S.value)||90,n=Number((T=document.getElementById("driverShareInput"))==null?void 0:T.value)||5,r=Number((w=document.getElementById("platformShareInput"))==null?void 0:w.value)||5,d=Number((E=document.getElementById("cfgWithholdingTax"))==null?void 0:E.value)||2,p=Number((L=document.getElementById("cfgHighValueThreshold"))==null?void 0:L.value)||5e4,l=((V=document.getElementById("cfgTelebirrAppId"))==null?void 0:V.value)||"",b=((y=document.getElementById("cfgTelebirrShortCode"))==null?void 0:y.value)||"",v=((_=document.getElementById("cfgTelebirrApiKey"))==null?void 0:_.value)||"",k=((G=document.getElementById("cfgTwilioSid"))==null?void 0:G.value)||"",$=((B=document.getElementById("cfgTwilioToken"))==null?void 0:B.value)||"",u=((P=document.getElementById("cfgTwilioFrom"))==null?void 0:P.value)||"";c.updatePlatformConfig({farmerSharePercent:i,driverSharePercent:n,platformFeePercent:r,withholdingTaxPercent:d,highValuePayoutThresholdEtb:p,telebirrAppId:l,telebirrShortCode:b,telebirrApiKey:v,twilioAccountSid:k,twilioAuthToken:$,twilioFromNumber:u}),h("Platform configuration and escrow splits saved!","fa-floppy-disk","border-emerald-500"),this.render()},e.setSuperAdminFinancialSubTab=s=>{this.superAdminFinancialSubTab=s,this.render()},e.setPayoutStatusFilter=s=>{this.superAdminPayoutStatusFilter=s,this.render()},e.setPayoutRoleFilter=s=>{this.superAdminPayoutRoleFilter=s,this.render()},e.setPayoutRiskFilter=s=>{this.superAdminPayoutRiskFilter=s,this.render()},e.handlePayoutSearch=s=>{this.superAdminPayoutSearchQuery=s,this.render()},e.approveHighValuePayout=s=>{const i=c.getCurrentUser();c.approvePayout(s,(i==null?void 0:i.name)||"Dr. Dawit Haile (Super Admin)")&&(H({particleCount:90,spread:60,origin:{y:.6}}),h(this.lang==="am"?"ከፍተኛ የቴሌብር ክፍያ በዋና አድሚን ፀድቆ ተለቋል!":"High-value Telebirr payout approved & released!","fa-circle-check","border-emerald-500"),this.render())},e.approveAllPendingPayouts=()=>{const s=c.getCurrentUser(),i=c.getPendingPayoutApprovals().filter(r=>r.status==="Pending").map(r=>r.id);if(i.length===0){h("No pending payouts to authorize.","fa-info-circle","border-slate-500");return}const n=c.batchApprovePayouts(i,(s==null?void 0:s.name)||"Dr. Dawit Haile (Super Admin)");H({particleCount:120,spread:80,origin:{y:.5}}),h(this.lang==="am"?`የ${n.approvedCount} ተጠቃሚዎች ክፍያ (${n.totalAmountEtb.toLocaleString()} ብር) በአንድ ጊዜ ፀድቆ ተለቋል!`:`Batch authorized ${n.approvedCount} payouts (${n.totalAmountEtb.toLocaleString()} ETB) simultaneously!`,"fa-check-double","border-emerald-500"),this.render()},e.openRejectPayoutModal=s=>{this.rejectTargetPayoutId=s,this.isSuperAdminRejectModalOpen=!0,this.render()},e.handleRejectReasonChange=s=>{const i=document.getElementById("payoutRejectCustomNote");i&&(s!=="custom"?i.value=`Flagged for: ${s}. Immediate compliance audit required.`:(i.value="",i.focus()))},e.handleRejectPayoutSubmit=(s,i)=>{var l,b;s.preventDefault();const n=c.getCurrentUser(),r=((l=document.getElementById("payoutRejectReasonSelect"))==null?void 0:l.value)||"Compliance audit flag",d=(b=document.getElementById("payoutRejectCustomNote"))==null?void 0:b.value,p=(r==="custom"||d)&&d||r;c.rejectPayout(i,(n==null?void 0:n.name)||"Dr. Dawit Haile (Super Admin)",p),this.isSuperAdminRejectModalOpen=!1,this.rejectTargetPayoutId=null,h(this.lang==="am"?"የክፍያ ጥያቄው ውድቅ ተደርጎ ለደህንነት ምርመራ ታግዷል።":"Payout declined & flagged for compliance investigation.","fa-ban","border-red-500"),this.render()},e.openSimulatePayoutModal=()=>{this.isSuperAdminSimulatePayoutModalOpen=!0,this.render()},e.handleSimulatePayoutSubmit=s=>{var k,$,u,S,T,w,E,L;s.preventDefault();const i=(k=document.getElementById("simPayoutName"))==null?void 0:k.value,n=($=document.getElementById("simPayoutPhone"))==null?void 0:$.value,r=((u=document.getElementById("simPayoutRole"))==null?void 0:u.value)||"farmer",d=Number((S=document.getElementById("simPayoutAmount"))==null?void 0:S.value)||75e3,p=((T=document.getElementById("simPayoutRisk"))==null?void 0:T.value)||"High",l=(w=document.getElementById("simPayoutCrop"))==null?void 0:w.value,b=(E=document.getElementById("simPayoutRegion"))==null?void 0:E.value,v=(L=document.getElementById("simPayoutReason"))==null?void 0:L.value;c.createPayoutApproval({recipientId:`sim-user-${Date.now().toString().slice(-4)}`,recipientName:i,recipientPhone:n,recipientRole:r,amountEtb:d,riskScore:p,cropName:l,region:b,triggerReason:v}),this.isSuperAdminSimulatePayoutModalOpen=!1,H({particleCount:60,spread:50,origin:{y:.6}}),h(this.lang==="am"?`አዲስ የ${d.toLocaleString()} ብር የክፍያ ጥያቄ ተፈጥሯል`:`Injected high-value payout request (${d.toLocaleString()} ETB)`,"fa-money-bill-transfer","border-amber-500"),this.render()},e.resetSuperAdminPayouts=()=>{c.resetPayoutsToDefault(),H({particleCount:80,spread:60,origin:{y:.6}}),h(this.lang==="am"?"የክፍያ ጥያቄዎች ወደ መጀመሪያው (4) ተመልሰዋል!":"Reset to default initial payout requests (4 pending)!","fa-rotate-left","border-emerald-500"),this.render()},e.openPayoutDetailModal=s=>{this.detailTargetPayoutId=s,this.isSuperAdminPayoutDetailModalOpen=!0,this.render()},e.manualReleaseOrderEscrow=s=>{const i=c.getCurrentUser(),n=prompt("Provide authorization rationale for manual escrow release:","Super Admin validated physical buyer receipt.");if(!n)return;c.manualReleaseOrderEscrow(s,(i==null?void 0:i.name)||"Dr. Dawit Haile (Super Admin)",n)&&(H({particleCount:80,spread:60,origin:{y:.6}}),h(this.lang==="am"?"የትዕዛዝ ገንዘብ በእጅ ተለቋል!":`Manual escrow release authorized for Order #${s.slice(0,8).toUpperCase()}`,"fa-lock-open","border-emerald-500"),this.render())},e.exportFinancialStatement=(s="csv")=>{const i=c.exportFinancialStatementCsv(),n=new Blob([i],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(n),d=document.createElement("a");d.setAttribute("href",r),d.setAttribute("download",`FarmerMarket_Financial_Ledger_${new Date().toISOString().slice(0,10)}.csv`),document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(r),h("Financial ledger exported to CSV successfully!","fa-file-arrow-down","border-emerald-500")},e.toggleFeatureFlag=s=>{const i=c.toggleFeatureFlag(s);h(`${i.name}: ${i.enabled?"ENABLED":"DISABLED"}`,"fa-toggle-on",i.enabled?"border-emerald-500":"border-slate-500"),this.render()},e.toggleEmergencyEscrowFreeze=()=>{const i=!c.getPlatformConfig().emergencyEscrowFrozen;c.updatePlatformConfig({emergencyEscrowFrozen:i}),i?(alert(`EMERGENCY ESCROW FREEZE ACTIVATED!
All automatic Telebirr payouts and order releases have been halted platform-wide.`),h("EMERGENCY ESCROW FREEZE ACTIVATED!","fa-lock","border-red-500")):h("Platform escrow unfrozen. Normal operations restored.","fa-lock-open","border-emerald-500"),this.render()},e.handleAddZoneSubmit=s=>{var b,v,k,$,u,S;s.preventDefault();const i=(b=document.getElementById("zoneNameInput"))==null?void 0:b.value,n=(v=document.getElementById("zoneHubInput"))==null?void 0:v.value,r=Number((k=document.getElementById("zoneLatInput"))==null?void 0:k.value),d=Number(($=document.getElementById("zoneLngInput"))==null?void 0:$.value),p=Number((u=document.getElementById("zoneRadiusInput"))==null?void 0:u.value),l=Number((S=document.getElementById("zoneBonusInput"))==null?void 0:S.value);c.addDeliveryZone({name:i,clusterHubName:n,centerLatitude:r,centerLongitude:d,baseRadiusKm:p,maxRadiusKm:p*2.5,ruralSubsidyEtb:l,active:!0,smallholdersCount:500}),this.isSuperAdminAddZoneModalOpen=!1,h(`Added regional delivery zone: ${i}`,"fa-map-location-dot","border-teal-500"),this.render()},e.deleteZone=s=>{c.deleteDeliveryZone(s),h("Delivery zone removed.","fa-trash","border-slate-500"),this.render()},e.handleAddBlacklistSubmit=s=>{var p,l,b;s.preventDefault();const i=(p=document.getElementById("blTypeSelect"))==null?void 0:p.value,n=(l=document.getElementById("blValueInput"))==null?void 0:l.value,r=(b=document.getElementById("blReasonInput"))==null?void 0:b.value,d=c.getCurrentUser();c.addToBlacklist({type:i,value:n,reason:r,blacklistedBy:(d==null?void 0:d.name)||"Super Admin",active:!0}),this.isSuperAdminAddBlacklistModalOpen=!1,h(`Entity blacklisted: ${n}`,"fa-ban","border-red-500"),this.render()},e.removeFromBlacklist=s=>{c.removeFromBlacklist(s),h("Entity removed from blacklist.","fa-circle-check","border-emerald-500"),this.render()},e.handleSaveBusinessRules=s=>{var p,l,b,v;s.preventDefault();const i=Number((p=document.getElementById("ruleMinOrderKg"))==null?void 0:p.value)||10,n=Number((l=document.getElementById("ruleMaxOrderKg"))==null?void 0:l.value)||5e4,r=Number((b=document.getElementById("ruleMaxDistanceKm"))==null?void 0:b.value)||450,d=Number((v=document.getElementById("rulePriceCeiling"))==null?void 0:v.value)||250;c.updateGlobalBusinessRules({minOrderKg:i,maxOrderKg:n,maxDistanceKm:r,priceCeilingVariancePercent:d}),h("Global trading business rules saved!","fa-gavel","border-emerald-500"),this.render()},e.triggerDbBackup=()=>{const s=c.triggerDatabaseBackup();H({particleCount:80,spread:60,origin:{y:.6}}),h(`PostgreSQL backup snapshot generated (${s.backupId})!`,"fa-database","border-blue-500"),this.render()},e.runDbMaintenance=()=>{c.optimizeDatabase(),h("VACUUM ANALYZE and spatial indexing optimization complete!","fa-bolt","border-emerald-500"),this.render()},e.resetSuperAdminZones=()=>{c.resetDeliveryZonesToDefault(),h("Delivery zones reset to 6 default Ethiopian corridors.","fa-rotate-left","border-teal-500"),this.render()},e.resetSuperAdminFlags=()=>{c.resetFeatureFlagsToDefault(),h("Feature flags reset to baseline configuration.","fa-rotate-left","border-indigo-500"),this.render()},e.resetSuperAdminBlacklist=()=>{c.resetBlacklistToDefault(),h("Blacklist reset to default entries.","fa-rotate-left","border-red-500"),this.render()},e.resetSuperAdminRules=()=>{c.resetBusinessRulesToDefault(),h("Business rules reset to platform defaults.","fa-rotate-left","border-amber-500"),this.render()},e.resetSuperAdminAuditLogs=()=>{c.resetAuditLogsToDefault(),h("Audit logs reset to baseline entries (5 logs).","fa-rotate-left","border-blue-500"),this.render()},e.resetAllSuperAdminData=()=>{c.resetAllSuperAdminDataToDefault(),h("All Super Admin governance parameters reset to default.","fa-arrows-rotate","border-rose-500"),this.render()},e.exportPlatformData=s=>{const i=c.exportPlatformData(s),n=document.createElement("a");n.href=i.dataUrl,n.download=i.filename,document.body.appendChild(n),n.click(),document.body.removeChild(n),h(`Downloaded full platform data export (${s.toUpperCase()})!`,"fa-download","border-emerald-500"),this.render()},e.openUssdSimulator=s=>{Us.open(s)},e.openMarketIntelligence=()=>{Vs.open()}}}new qs;
