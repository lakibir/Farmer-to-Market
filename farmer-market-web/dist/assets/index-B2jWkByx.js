var Ze=Object.defineProperty;var et=(i,e,t)=>e in i?Ze(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var h=(i,e,t)=>et(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();var ke={};(function i(e,t,r,s){var a=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=(function(){if(!e.OffscreenCanvas)return!1;try{var p=new OffscreenCanvas(1,1),d=p.getContext("2d");d.fillRect(0,0,1,1);var b=p.transferToImageBitmap();d.createPattern(b,"no-repeat")}catch{return!1}return!0})();function n(){}function c(p){var d=t.exports.Promise,b=d!==void 0?d:e.Promise;return typeof b=="function"?new b(p):(p(n,n),null)}var m=(function(p,d){return{transform:function(b){if(p)return b;if(d.has(b))return d.get(b);var y=new OffscreenCanvas(b.width,b.height),E=y.getContext("2d");return E.drawImage(b,0,0),d.set(b,y),y},clear:function(){d.clear()}}})(o,new Map),w=(function(){var p=Math.floor(16.666666666666668),d,b,y={},E=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(d=function(A){var C=Math.random();return y[C]=requestAnimationFrame(function x($){E===$||E+p-1<$?(E=$,delete y[C],A()):y[C]=requestAnimationFrame(x)}),C},b=function(A){y[A]&&cancelAnimationFrame(y[A])}):(d=function(A){return setTimeout(A,p)},b=function(A){return clearTimeout(A)}),{frame:d,cancel:b}})(),_=(function(){var p,d,b={};function y(E){function A(C,x){E.postMessage({options:C||{},callback:x})}E.init=function(x){var $=x.transferControlToOffscreen();E.postMessage({canvas:$},[$])},E.fire=function(x,$,P){if(d)return A(x,null),d;var M=Math.random().toString(36).slice(2);return d=c(function(N){function L(U){U.data.callback===M&&(delete b[M],E.removeEventListener("message",L),d=null,m.clear(),P(),N())}E.addEventListener("message",L),A(x,M),b[M]=L.bind(null,{data:{callback:M}})}),d},E.reset=function(){E.postMessage({reset:!0});for(var x in b)b[x](),delete b[x]}}return function(){if(p)return p;if(!r&&a){var E=["var CONFETTI, SIZE = {}, module = {};","("+i.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{p=new Worker(URL.createObjectURL(new Blob([E])))}catch(A){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",A),null}y(p)}return p}})(),O={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function j(p,d){return d?d(p):p}function f(p){return p!=null}function R(p,d,b){return j(p&&f(p[d])?p[d]:O[d],b)}function Z(p){return p<0?0:Math.floor(p)}function v(p,d){return Math.floor(Math.random()*(d-p))+p}function se(p){return parseInt(p,16)}function ee(p){return p.map(ae)}function ae(p){var d=String(p).replace(/[^0-9a-f]/gi,"");return d.length<6&&(d=d[0]+d[0]+d[1]+d[1]+d[2]+d[2]),{r:se(d.substring(0,2)),g:se(d.substring(2,4)),b:se(d.substring(4,6))}}function ie(p){var d=R(p,"origin",Object);return d.x=R(d,"x",Number),d.y=R(d,"y",Number),d}function ce(p){p.width=document.documentElement.clientWidth,p.height=document.documentElement.clientHeight}function pe(p){var d=p.getBoundingClientRect();p.width=d.width,p.height=d.height}function S(p){var d=document.createElement("canvas");return d.style.position="fixed",d.style.top="0px",d.style.left="0px",d.style.pointerEvents="none",d.style.zIndex=p,d}function H(p,d,b,y,E,A,C,x,$){p.save(),p.translate(d,b),p.rotate(A),p.scale(y,E),p.arc(0,0,1,C,x,$),p.restore()}function W(p){var d=p.angle*(Math.PI/180),b=p.spread*(Math.PI/180);return{x:p.x,y:p.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:p.startVelocity*.5+Math.random()*p.startVelocity,angle2D:-d+(.5*b-Math.random()*b),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:p.color,shape:p.shape,tick:0,totalTicks:p.ticks,decay:p.decay,drift:p.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:p.gravity*3,ovalScalar:.6,scalar:p.scalar,flat:p.flat}}function be(p,d){d.x+=Math.cos(d.angle2D)*d.velocity+d.drift,d.y+=Math.sin(d.angle2D)*d.velocity+d.gravity,d.velocity*=d.decay,d.flat?(d.wobble=0,d.wobbleX=d.x+10*d.scalar,d.wobbleY=d.y+10*d.scalar,d.tiltSin=0,d.tiltCos=0,d.random=1):(d.wobble+=d.wobbleSpeed,d.wobbleX=d.x+10*d.scalar*Math.cos(d.wobble),d.wobbleY=d.y+10*d.scalar*Math.sin(d.wobble),d.tiltAngle+=.1,d.tiltSin=Math.sin(d.tiltAngle),d.tiltCos=Math.cos(d.tiltAngle),d.random=Math.random()+2);var b=d.tick++/d.totalTicks,y=d.x+d.random*d.tiltCos,E=d.y+d.random*d.tiltSin,A=d.wobbleX+d.random*d.tiltCos,C=d.wobbleY+d.random*d.tiltSin;if(p.fillStyle="rgba("+d.color.r+", "+d.color.g+", "+d.color.b+", "+(1-b)+")",p.beginPath(),l&&d.shape.type==="path"&&typeof d.shape.path=="string"&&Array.isArray(d.shape.matrix))p.fill(We(d.shape.path,d.shape.matrix,d.x,d.y,Math.abs(A-y)*.1,Math.abs(C-E)*.1,Math.PI/10*d.wobble));else if(d.shape.type==="bitmap"){var x=Math.PI/10*d.wobble,$=Math.abs(A-y)*.1,P=Math.abs(C-E)*.1,M=d.shape.bitmap.width*d.scalar,N=d.shape.bitmap.height*d.scalar,L=new DOMMatrix([Math.cos(x)*$,Math.sin(x)*$,-Math.sin(x)*P,Math.cos(x)*P,d.x,d.y]);L.multiplySelf(new DOMMatrix(d.shape.matrix));var U=p.createPattern(m.transform(d.shape.bitmap),"no-repeat");U.setTransform(L),p.globalAlpha=1-b,p.fillStyle=U,p.fillRect(d.x-M/2,d.y-N/2,M,N),p.globalAlpha=1}else if(d.shape==="circle")p.ellipse?p.ellipse(d.x,d.y,Math.abs(A-y)*d.ovalScalar,Math.abs(C-E)*d.ovalScalar,Math.PI/10*d.wobble,0,2*Math.PI):H(p,d.x,d.y,Math.abs(A-y)*d.ovalScalar,Math.abs(C-E)*d.ovalScalar,Math.PI/10*d.wobble,0,2*Math.PI);else if(d.shape==="star")for(var I=Math.PI/2*3,G=4*d.scalar,Y=8*d.scalar,J=d.x,re=d.y,oe=5,te=Math.PI/oe;oe--;)J=d.x+Math.cos(I)*Y,re=d.y+Math.sin(I)*Y,p.lineTo(J,re),I+=te,J=d.x+Math.cos(I)*G,re=d.y+Math.sin(I)*G,p.lineTo(J,re),I+=te;else p.moveTo(Math.floor(d.x),Math.floor(d.y)),p.lineTo(Math.floor(d.wobbleX),Math.floor(E)),p.lineTo(Math.floor(A),Math.floor(C)),p.lineTo(Math.floor(y),Math.floor(d.wobbleY));return p.closePath(),p.fill(),d.tick<d.totalTicks}function Ve(p,d,b,y,E){var A=d.slice(),C=p.getContext("2d"),x,$,P=c(function(M){function N(){x=$=null,C.clearRect(0,0,y.width,y.height),m.clear(),E(),M()}function L(){r&&!(y.width===s.width&&y.height===s.height)&&(y.width=p.width=s.width,y.height=p.height=s.height),!y.width&&!y.height&&(b(p),y.width=p.width,y.height=p.height),C.clearRect(0,0,y.width,y.height),A=A.filter(function(U){return be(C,U)}),A.length?x=w.frame(L):N()}x=w.frame(L),$=N});return{addFettis:function(M){return A=A.concat(M),P},canvas:p,promise:P,reset:function(){x&&w.cancel(x),$&&$()}}}function $e(p,d){var b=!p,y=!!R(d||{},"resize"),E=!1,A=R(d,"disableForReducedMotion",Boolean),C=a&&!!R(d||{},"useWorker"),x=C?_():null,$=b?ce:pe,P=p&&x?!!p.__confetti_initialized:!1,M=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,N;function L(I,G,Y){for(var J=R(I,"particleCount",Z),re=R(I,"angle",Number),oe=R(I,"spread",Number),te=R(I,"startVelocity",Number),Ke=R(I,"decay",Number),qe=R(I,"gravity",Number),Ge=R(I,"drift",Number),_e=R(I,"colors",ee),ze=R(I,"ticks",Number),Re=R(I,"shapes"),Qe=R(I,"scalar"),Ye=!!R(I,"flat"),Pe=ie(I),Ne=J,Se=[],Je=p.width*Pe.x,Xe=p.height*Pe.y;Ne--;)Se.push(W({x:Je,y:Xe,angle:re,spread:oe,startVelocity:te,color:_e[Ne%_e.length],shape:Re[v(0,Re.length)],ticks:ze,decay:Ke,gravity:qe,drift:Ge,scalar:Qe,flat:Ye}));return N?N.addFettis(Se):(N=Ve(p,Se,$,G,Y),N.promise)}function U(I){var G=A||R(I,"disableForReducedMotion",Boolean),Y=R(I,"zIndex",Number);if(G&&M)return c(function(te){te()});b&&N?p=N.canvas:b&&!p&&(p=S(Y),document.body.appendChild(p)),y&&!P&&$(p);var J={width:p.width,height:p.height};x&&!P&&x.init(p),P=!0,x&&(p.__confetti_initialized=!0);function re(){if(x){var te={getBoundingClientRect:function(){if(!b)return p.getBoundingClientRect()}};$(te),x.postMessage({resize:{width:te.width,height:te.height}});return}J.width=J.height=null}function oe(){N=null,y&&(E=!1,e.removeEventListener("resize",re)),b&&p&&(document.body.contains(p)&&document.body.removeChild(p),p=null,P=!1)}return y&&!E&&(E=!0,e.addEventListener("resize",re,!1)),x?x.fire(I,J,oe):L(I,J,oe)}return U.reset=function(){x&&x.reset(),N&&N.reset()},U}var we;function Ie(){return we||(we=$e(null,{useWorker:!0,resize:!0})),we}function We(p,d,b,y,E,A,C){var x=new Path2D(p),$=new Path2D;$.addPath(x,new DOMMatrix(d));var P=new Path2D;return P.addPath($,new DOMMatrix([Math.cos(C)*E,Math.sin(C)*E,-Math.sin(C)*A,Math.cos(C)*A,b,y])),P}function Ue(p){if(!l)throw new Error("path confetti are not supported in this browser");var d,b;typeof p=="string"?d=p:(d=p.path,b=p.matrix);var y=new Path2D(d),E=document.createElement("canvas"),A=E.getContext("2d");if(!b){for(var C=1e3,x=C,$=C,P=0,M=0,N,L,U=0;U<C;U+=2)for(var I=0;I<C;I+=2)A.isPointInPath(y,U,I,"nonzero")&&(x=Math.min(x,U),$=Math.min($,I),P=Math.max(P,U),M=Math.max(M,I));N=P-x,L=M-$;var G=10,Y=Math.min(G/N,G/L);b=[Y,0,0,Y,-Math.round(N/2+x)*Y,-Math.round(L/2+$)*Y]}return{type:"path",path:d,matrix:b}}function He(p){var d,b=1,y="#000000",E='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof p=="string"?d=p:(d=p.text,b="scalar"in p?p.scalar:b,E="fontFamily"in p?p.fontFamily:E,y="color"in p?p.color:y);var A=10*b,C=""+A+"px "+E,x=new OffscreenCanvas(A,A),$=x.getContext("2d");$.font=C;var P=$.measureText(d),M=Math.ceil(P.actualBoundingBoxRight+P.actualBoundingBoxLeft),N=Math.ceil(P.actualBoundingBoxAscent+P.actualBoundingBoxDescent),L=2,U=P.actualBoundingBoxLeft+L,I=P.actualBoundingBoxAscent+L;M+=L+L,N+=L+L,x=new OffscreenCanvas(M,N),$=x.getContext("2d"),$.font=C,$.fillStyle=y,$.fillText(d,U,I);var G=1/b;return{type:"bitmap",bitmap:x.transferToImageBitmap(),matrix:[G,0,0,G,-M*G/2,-N*G/2]}}t.exports=function(){return Ie().apply(this,arguments)},t.exports.reset=function(){Ie().reset()},t.exports.create=$e,t.exports.shapeFromPath=Ue,t.exports.shapeFromText=He})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),ke,!1);const z=ke.exports;ke.exports.create;class ne extends Error{constructor(e,t){const r=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=r}}class Ee extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class X extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class tt extends Error{constructor(e,t){const r=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=r}}class rt extends Error{constructor(e,t){const r=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=r}}class st extends Error{constructor(e,t){const r=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=r}}class De extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class at extends Error{constructor(e,t){const r=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=r}}class Fe{constructor(e,t,r){this.statusCode=e,this.statusText=t,this.content=r}}class ye{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var u;(function(i){i[i.Trace=0]="Trace",i[i.Debug=1]="Debug",i[i.Information=2]="Information",i[i.Warning=3]="Warning",i[i.Error=4]="Error",i[i.Critical=5]="Critical",i[i.None=6]="None"})(u||(u={}));class he{constructor(){}log(e,t){}}he.instance=new he;const it="8.0.29";class F{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,r){if(!(e in t))throw new Error(`Unknown ${r} value: ${e}.`)}}class B{static get isBrowser(){return!B.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!B.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!B.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function fe(i,e){let t="";return de(i)?(t=`Binary data of length ${i.byteLength}`,e&&(t+=`. Content: '${ot(i)}'`)):typeof i=="string"&&(t=`String data of length ${i.length}`,e&&(t+=`. Content: '${i}'`)),t}function ot(i){const e=new Uint8Array(i);let t="";return e.forEach(r=>{const s=r<16?"0":"";t+=`0x${s}${r.toString(16)} `}),t.substr(0,t.length-1)}function de(i){return i&&typeof ArrayBuffer<"u"&&(i instanceof ArrayBuffer||i.constructor&&i.constructor.name==="ArrayBuffer")}async function je(i,e,t,r,s,a){const l={},[o,n]=ue();l[o]=n,i.log(u.Trace,`(${e} transport) sending data. ${fe(s,a.logMessageContent)}.`);const c=de(s)?"arraybuffer":"text",m=await t.post(r,{content:s,headers:{...l,...a.headers},responseType:c,timeout:a.timeout,withCredentials:a.withCredentials});i.log(u.Trace,`(${e} transport) request complete. Response status: ${m.statusCode}.`)}function nt(i){return i===void 0?new xe(u.Information):i===null?he.instance:i.log!==void 0?i:new xe(i)}class lt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class xe{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const r=`[${new Date().toISOString()}] ${u[e]}: ${t}`;switch(e){case u.Critical:case u.Error:this.out.error(r);break;case u.Warning:this.out.warn(r);break;case u.Information:this.out.info(r);break;default:this.out.log(r);break}}}}function ue(){let i="X-SignalR-User-Agent";return B.isNode&&(i="User-Agent"),[i,dt(it,ct(),ut(),pt())]}function dt(i,e,t,r){let s="Microsoft SignalR/";const a=i.split(".");return s+=`${a[0]}.${a[1]}`,s+=` (${i}; `,e&&e!==""?s+=`${e}; `:s+="Unknown OS; ",s+=`${t}`,r?s+=`; ${r}`:s+="; Unknown Runtime Version",s+=")",s}function ct(){if(B.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function pt(){if(B.isNode)return process.versions.node}function ut(){return B.isNode?"NodeJS":"Browser"}function Te(i){return i.stack?i.stack:i.message?i.message:`${i}`}function mt(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class gt extends ye{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||B.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(mt());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new X;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let r;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),r=new X});let s=null;if(e.timeout){const n=e.timeout;s=setTimeout(()=>{t.abort(),this._logger.log(u.Warning,"Timeout from HTTP request."),r=new Ee},n)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},de(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let a;try{a=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(n){throw r||(this._logger.log(u.Warning,`Error from HTTP request. ${n}.`),n)}finally{s&&clearTimeout(s),e.abortSignal&&(e.abortSignal.onabort=null)}if(!a.ok){const n=await Be(a,"text");throw new ne(n||a.statusText,a.status)}const o=await Be(a,e.responseType);return new Fe(a.status,a.statusText,o)}getCookieString(e){let t="";return B.isNode&&this._jar&&this._jar.getCookies(e,(r,s)=>t=s.join("; ")),t}}function Be(i,e){let t;switch(e){case"arraybuffer":t=i.arrayBuffer();break;case"text":t=i.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=i.text();break}return t}class ht extends ye{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new X):e.method?e.url?new Promise((t,r)=>{const s=new XMLHttpRequest;s.open(e.method,e.url,!0),s.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,s.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(de(e.content)?s.setRequestHeader("Content-Type","application/octet-stream"):s.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const a=e.headers;a&&Object.keys(a).forEach(l=>{s.setRequestHeader(l,a[l])}),e.responseType&&(s.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{s.abort(),r(new X)}),e.timeout&&(s.timeout=e.timeout),s.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),s.status>=200&&s.status<300?t(new Fe(s.status,s.statusText,s.response||s.responseText)):r(new ne(s.response||s.responseText||s.statusText,s.status))},s.onerror=()=>{this._logger.log(u.Warning,`Error from HTTP request. ${s.status}: ${s.statusText}.`),r(new ne(s.statusText,s.status))},s.ontimeout=()=>{this._logger.log(u.Warning,"Timeout from HTTP request."),r(new Ee)},s.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class ft extends ye{constructor(e){if(super(),typeof fetch<"u"||B.isNode)this._httpClient=new gt(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new ht(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new X):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class Q{static write(e){return`${e}${Q.RecordSeparator}`}static parse(e){if(e[e.length-1]!==Q.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(Q.RecordSeparator);return t.pop(),t}}Q.RecordSeparatorCode=30;Q.RecordSeparator=String.fromCharCode(Q.RecordSeparatorCode);class bt{writeHandshakeRequest(e){return Q.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,r;if(de(e)){const o=new Uint8Array(e),n=o.indexOf(Q.RecordSeparatorCode);if(n===-1)throw new Error("Message is incomplete.");const c=n+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(o.slice(0,c))),r=o.byteLength>c?o.slice(c).buffer:null}else{const o=e,n=o.indexOf(Q.RecordSeparator);if(n===-1)throw new Error("Message is incomplete.");const c=n+1;t=o.substring(0,c),r=o.length>c?o.substring(c):null}const s=Q.parse(t),a=JSON.parse(s[0]);if(a.type)throw new Error("Expected a handshake response from the server.");return[r,a]}}var k;(function(i){i[i.Invocation=1]="Invocation",i[i.StreamItem=2]="StreamItem",i[i.Completion=3]="Completion",i[i.StreamInvocation=4]="StreamInvocation",i[i.CancelInvocation=5]="CancelInvocation",i[i.Ping=6]="Ping",i[i.Close=7]="Close",i[i.Ack=8]="Ack",i[i.Sequence=9]="Sequence"})(k||(k={}));class vt{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new lt(this,e)}}class xt{constructor(e,t,r){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=r}async _send(e){const t=this._protocol.writeMessage(e);let r=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let s=()=>{},a=()=>{};de(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(r=new Promise((l,o)=>{s=l,a=o})),this._messages.push(new yt(t,this._totalMessageCount,s,a))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await r}_ack(e){let t=-1;for(let r=0;r<this._messages.length;r++){const s=this._messages[r];if(s._id<=e.sequenceId)t=r,de(s._message)?this._bufferedByteCount-=s._message.byteLength:this._bufferedByteCount-=s._message.length,s._resolver();else if(this._bufferedByteCount<this._bufferSize)s._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==k.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:k.Sequence,sequenceId:e}));const t=this._messages;for(const r of t)await this._connection.send(r._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case k.Invocation:case k.StreamItem:case k.Completion:case k.StreamInvocation:case k.CancelInvocation:return!0;case k.Close:case k.Sequence:case k.Ping:case k.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:k.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class yt{constructor(e,t,r,s){this._message=e,this._id=t,this._resolver=r,this._rejector=s}}const wt=30*1e3,St=15*1e3,Tt=1e5;var D;(function(i){i.Disconnected="Disconnected",i.Connecting="Connecting",i.Connected="Connected",i.Disconnecting="Disconnecting",i.Reconnecting="Reconnecting"})(D||(D={}));class Ae{static create(e,t,r,s,a,l,o){return new Ae(e,t,r,s,a,l,o)}constructor(e,t,r,s,a,l,o){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(u.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},F.isRequired(e,"connection"),F.isRequired(t,"logger"),F.isRequired(r,"protocol"),this.serverTimeoutInMilliseconds=a??wt,this.keepAliveIntervalInMilliseconds=l??St,this._statefulReconnectBufferSize=o??Tt,this._logger=t,this._protocol=r,this.connection=e,this._reconnectPolicy=s,this._handshakeProtocol=new bt,this.connection.onreceive=n=>this._processIncomingData(n),this.connection.onclose=n=>this._connectionClosed(n),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=D.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:k.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==D.Disconnected&&this._connectionState!==D.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==D.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=D.Connecting,this._logger.log(u.Debug,"Starting HubConnection.");try{await this._startInternal(),B.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=D.Connected,this._connectionStarted=!0,this._logger.log(u.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=D.Disconnected,this._logger.log(u.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,r)=>{this._handshakeResolver=t,this._handshakeRejecter=r});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const r={protocol:this._protocol.name,version:t};if(this._logger.log(u.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(r)),this._logger.log(u.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new xt(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(u.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===D.Disconnected)return this._logger.log(u.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===D.Disconnecting)return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=D.Disconnecting,this._logger.log(u.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(u.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===D.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new X("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[r,s]=this._replaceStreamingParams(t),a=this._createStreamInvocation(e,t,s);let l;const o=new vt;return o.cancelCallback=()=>{const n=this._createCancelInvocation(a.invocationId);return delete this._callbacks[a.invocationId],l.then(()=>this._sendWithProtocol(n))},this._callbacks[a.invocationId]=(n,c)=>{if(c){o.error(c);return}else n&&(n.type===k.Completion?n.error?o.error(new Error(n.error)):o.complete():o.next(n.item))},l=this._sendWithProtocol(a).catch(n=>{o.error(n),delete this._callbacks[a.invocationId]}),this._launchStreams(r,l),o}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[r,s]=this._replaceStreamingParams(t),a=this._sendWithProtocol(this._createInvocation(e,t,!0,s));return this._launchStreams(r,a),a}invoke(e,...t){const[r,s]=this._replaceStreamingParams(t),a=this._createInvocation(e,t,!1,s);return new Promise((o,n)=>{this._callbacks[a.invocationId]=(m,w)=>{if(w){n(w);return}else m&&(m.type===k.Completion?m.error?n(new Error(m.error)):o(m.result):n(new Error(`Unexpected message type: ${m.type}`)))};const c=this._sendWithProtocol(a).catch(m=>{n(m),delete this._callbacks[a.invocationId]});this._launchStreams(r,c)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const r=this._methods[e];if(r)if(t){const s=r.indexOf(t);s!==-1&&(r.splice(s,1),r.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const r of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(r)))switch(r.type){case k.Invocation:this._invokeClientMethod(r).catch(s=>{this._logger.log(u.Error,`Invoke client method threw error: ${Te(s)}`)});break;case k.StreamItem:case k.Completion:{const s=this._callbacks[r.invocationId];if(s){r.type===k.Completion&&delete this._callbacks[r.invocationId];try{s(r)}catch(a){this._logger.log(u.Error,`Stream callback threw error: ${Te(a)}`)}}break}case k.Ping:break;case k.Close:{this._logger.log(u.Information,"Close message received from server.");const s=r.error?new Error("Server returned an error on close: "+r.error):void 0;r.allowReconnect===!0?this.connection.stop(s):this._stopPromise=this._stopInternal(s);break}case k.Ack:this._messageBuffer&&this._messageBuffer._ack(r);break;case k.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(r);break;default:this._logger.log(u.Warning,`Invalid message type: ${r.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,r;try{[r,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(s){const a="Error parsing handshake response: "+s;this._logger.log(u.Error,a);const l=new Error(a);throw this._handshakeRejecter(l),l}if(t.error){const s="Server returned handshake error: "+t.error;this._logger.log(u.Error,s);const a=new Error(s);throw this._handshakeRejecter(a),a}else this._logger.log(u.Debug,"Server handshake complete.");return this._handshakeResolver(),r}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===D.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),r=this._methods[t];if(!r){this._logger.log(u.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(u.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const s=r.slice(),a=!!e.invocationId;let l,o,n;for(const c of s)try{const m=l;l=await c.apply(this,e.arguments),a&&l&&m&&(this._logger.log(u.Error,`Multiple results provided for '${t}'. Sending error to server.`),n=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),o=void 0}catch(m){o=m,this._logger.log(u.Error,`A callback for the method '${t}' threw error '${m}'.`)}n?await this._sendWithProtocol(n):a?(o?n=this._createCompletionMessage(e.invocationId,`${o}`,null):l!==void 0?n=this._createCompletionMessage(e.invocationId,null,l):(this._logger.log(u.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),n=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(n)):l&&this._logger.log(u.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(u.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new X("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===D.Disconnecting?this._completeClose(e):this._connectionState===D.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===D.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=D.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),B.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(u.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let r=0,s=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),a=this._getNextRetryDelay(r++,0,s);if(a===null){this._logger.log(u.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=D.Reconnecting,e?this._logger.log(u.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(u.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(l=>l.apply(this,[e]))}catch(l){this._logger.log(u.Error,`An onreconnecting callback called with error '${e}' threw error '${l}'.`)}if(this._connectionState!==D.Reconnecting){this._logger.log(u.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;a!==null;){if(this._logger.log(u.Information,`Reconnect attempt number ${r} will start in ${a} ms.`),await new Promise(l=>{this._reconnectDelayHandle=setTimeout(l,a)}),this._reconnectDelayHandle=void 0,this._connectionState!==D.Reconnecting){this._logger.log(u.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=D.Connected,this._logger.log(u.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(l=>l.apply(this,[this.connection.connectionId]))}catch(l){this._logger.log(u.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${l}'.`)}return}catch(l){if(this._logger.log(u.Information,`Reconnect attempt failed because of error '${l}'.`),this._connectionState!==D.Reconnecting){this._logger.log(u.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===D.Disconnecting&&this._completeClose();return}s=l instanceof Error?l:new Error(l.toString()),a=this._getNextRetryDelay(r++,Date.now()-t,s)}}this._logger.log(u.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${r} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,r){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:r})}catch(s){return this._logger.log(u.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${s}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(r=>{const s=t[r];try{s(null,e)}catch(a){this._logger.log(u.Error,`Stream 'error' callback called with '${e}' threw error: ${Te(a)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,r,s){if(r)return s.length!==0?{arguments:t,streamIds:s,target:e,type:k.Invocation}:{arguments:t,target:e,type:k.Invocation};{const a=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:a.toString(),streamIds:s,target:e,type:k.Invocation}:{arguments:t,invocationId:a.toString(),target:e,type:k.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const r in e)e[r].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(r)))},error:s=>{let a;s instanceof Error?a=s.message:s&&s.toString?a=s.toString():a="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(r,a)))},next:s=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(r,s)))}})}}_replaceStreamingParams(e){const t=[],r=[];for(let s=0;s<e.length;s++){const a=e[s];if(this._isObservable(a)){const l=this._invocationId;this._invocationId++,t[l]=a,r.push(l.toString()),e.splice(s,1)}}return[t,r]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,r){const s=this._invocationId;return this._invocationId++,r.length!==0?{arguments:t,invocationId:s.toString(),streamIds:r,target:e,type:k.StreamInvocation}:{arguments:t,invocationId:s.toString(),target:e,type:k.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:k.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:k.StreamItem}}_createCompletionMessage(e,t,r){return t?{error:t,invocationId:e,type:k.Completion}:{invocationId:e,result:r,type:k.Completion}}_createCloseMessage(){return{type:k.Close}}}const kt=[0,2e3,1e4,3e4,null];class Me{constructor(e){this._retryDelays=e!==void 0?[...e,null]:kt}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class le{}le.Authorization="Authorization";le.Cookie="Cookie";class Et extends ye{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const r=await this._innerClient.send(e);return t&&r.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):r}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[le.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[le.Authorization]&&delete e.headers[le.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var V;(function(i){i[i.None=0]="None",i[i.WebSockets=1]="WebSockets",i[i.ServerSentEvents=2]="ServerSentEvents",i[i.LongPolling=4]="LongPolling"})(V||(V={}));var K;(function(i){i[i.Text=1]="Text",i[i.Binary=2]="Binary"})(K||(K={}));let At=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class Le{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,r){this._httpClient=e,this._logger=t,this._pollAbort=new At,this._options=r,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(F.isRequired(e,"url"),F.isRequired(t,"transferFormat"),F.isIn(t,K,"transferFormat"),this._url=e,this._logger.log(u.Trace,"(LongPolling transport) Connecting."),t===K.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[r,s]=ue(),a={[r]:s,...this._options.headers},l={abortSignal:this._pollAbort.signal,headers:a,timeout:1e5,withCredentials:this._options.withCredentials};t===K.Binary&&(l.responseType="arraybuffer");const o=`${e}&_=${Date.now()}`;this._logger.log(u.Trace,`(LongPolling transport) polling: ${o}.`);const n=await this._httpClient.get(o,l);n.statusCode!==200?(this._logger.log(u.Error,`(LongPolling transport) Unexpected response code: ${n.statusCode}.`),this._closeError=new ne(n.statusText||"",n.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,l)}async _poll(e,t){try{for(;this._running;)try{const r=`${e}&_=${Date.now()}`;this._logger.log(u.Trace,`(LongPolling transport) polling: ${r}.`);const s=await this._httpClient.get(r,t);s.statusCode===204?(this._logger.log(u.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):s.statusCode!==200?(this._logger.log(u.Error,`(LongPolling transport) Unexpected response code: ${s.statusCode}.`),this._closeError=new ne(s.statusText||"",s.statusCode),this._running=!1):s.content?(this._logger.log(u.Trace,`(LongPolling transport) data received. ${fe(s.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(s.content)):this._logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(r){this._running?r instanceof Ee?this._logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=r,this._running=!1):this._logger.log(u.Trace,`(LongPolling transport) Poll errored after shutdown: ${r.message}`)}}finally{this._logger.log(u.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?je(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(u.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(u.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,r]=ue();e[t]=r;const s={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let a;try{await this._httpClient.delete(this._url,s)}catch(l){a=l}a?a instanceof ne&&(a.statusCode===404?this._logger.log(u.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(u.Trace,`(LongPolling transport) Error sending a DELETE request: ${a}`)):this._logger.log(u.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(u.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(u.Trace,e),this.onclose(this._closeError)}}}class Ct{constructor(e,t,r,s){this._httpClient=e,this._accessToken=t,this._logger=r,this._options=s,this.onreceive=null,this.onclose=null}async connect(e,t){return F.isRequired(e,"url"),F.isRequired(t,"transferFormat"),F.isIn(t,K,"transferFormat"),this._logger.log(u.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((r,s)=>{let a=!1;if(t!==K.Text){s(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let l;if(B.isBrowser||B.isWebWorker)l=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const o=this._httpClient.getCookieString(e),n={};n.Cookie=o;const[c,m]=ue();n[c]=m,l=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...n,...this._options.headers}})}try{l.onmessage=o=>{if(this.onreceive)try{this._logger.log(u.Trace,`(SSE transport) data received. ${fe(o.data,this._options.logMessageContent)}.`),this.onreceive(o.data)}catch(n){this._close(n);return}},l.onerror=o=>{a?this._close():s(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},l.onopen=()=>{this._logger.log(u.Information,`SSE connected to ${this._url}`),this._eventSource=l,a=!0,r()}}catch(o){s(o);return}})}async send(e){return this._eventSource?je(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class $t{constructor(e,t,r,s,a,l){this._logger=r,this._accessTokenFactory=t,this._logMessageContent=s,this._webSocketConstructor=a,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=l}async connect(e,t){F.isRequired(e,"url"),F.isRequired(t,"transferFormat"),F.isIn(t,K,"transferFormat"),this._logger.log(u.Trace,"(WebSockets transport) Connecting.");let r;return this._accessTokenFactory&&(r=await this._accessTokenFactory()),new Promise((s,a)=>{e=e.replace(/^http/,"ws");let l;const o=this._httpClient.getCookieString(e);let n=!1;if(B.isNode||B.isReactNative){const c={},[m,w]=ue();c[m]=w,r&&(c[le.Authorization]=`Bearer ${r}`),o&&(c[le.Cookie]=o),l=new this._webSocketConstructor(e,void 0,{headers:{...c,...this._headers}})}else r&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(r)}`);l||(l=new this._webSocketConstructor(e)),t===K.Binary&&(l.binaryType="arraybuffer"),l.onopen=c=>{this._logger.log(u.Information,`WebSocket connected to ${e}.`),this._webSocket=l,n=!0,s()},l.onerror=c=>{let m=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?m=c.error:m="There was an error with the transport",this._logger.log(u.Information,`(WebSockets transport) ${m}.`)},l.onmessage=c=>{if(this._logger.log(u.Trace,`(WebSockets transport) data received. ${fe(c.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(c.data)}catch(m){this._close(m);return}},l.onclose=c=>{if(n)this._close(c);else{let m=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?m=c.error:m="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",a(new Error(m))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(u.Trace,`(WebSockets transport) sending data. ${fe(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(u.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const Oe=100;class It{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,F.isRequired(e,"url"),this._logger=nt(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let r=null,s=null;if(B.isNode&&typeof require<"u"){const a=typeof __webpack_require__=="function"?__non_webpack_require__:require;r=a("ws"),s=a("eventsource")}!B.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:B.isNode&&!t.WebSocket&&r&&(t.WebSocket=r),!B.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:B.isNode&&!t.EventSource&&typeof s<"u"&&(t.EventSource=s),this._httpClient=new Et(t.httpClient||new ft(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||K.Binary,F.isIn(e,K,"transferFormat"),this._logger.log(u.Debug,`Starting connection with transfer format '${K[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(u.Error,t),await this._stopPromise,Promise.reject(new X(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(u.Error,t),Promise.reject(new X(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new Ce(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(u.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(u.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===V.WebSockets)this.transport=this._constructTransport(V.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let r=null,s=0;do{if(r=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new X("The connection was stopped during negotiation.");if(r.error)throw new Error(r.error);if(r.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(r.url&&(t=r.url),r.accessToken){const a=r.accessToken;this._accessTokenFactory=()=>a,this._httpClient._accessToken=a,this._httpClient._accessTokenFactory=void 0}s++}while(r.url&&s<Oe);if(s===Oe&&r.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,r,e)}this.transport instanceof Le&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(u.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(r){return this._logger.log(u.Error,"Failed to start the connection: "+r),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(r)}}async _getNegotiationResponse(e){const t={},[r,s]=ue();t[r]=s;const a=this._resolveNegotiateUrl(e);this._logger.log(u.Debug,`Sending negotiation request: ${a}.`);try{const l=await this._httpClient.post(a,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(l.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${l.statusCode}'`));const o=JSON.parse(l.content);return(!o.negotiateVersion||o.negotiateVersion<1)&&(o.connectionToken=o.connectionId),o.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new De("Client didn't negotiate Stateful Reconnect but the server did.")):o}catch(l){let o="Failed to complete negotiation with the server: "+l;return l instanceof ne&&l.statusCode===404&&(o=o+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(u.Error,o),Promise.reject(new De(o))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,r,s){let a=this._createConnectUrl(e,r.connectionToken);if(this._isITransport(t)){this._logger.log(u.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(a,s),this.connectionId=r.connectionId;return}const l=[],o=r.availableTransports||[];let n=r;for(const c of o){const m=this._resolveTransportOrError(c,t,s,(n==null?void 0:n.useStatefulReconnect)===!0);if(m instanceof Error)l.push(`${c.transport} failed:`),l.push(m);else if(this._isITransport(m)){if(this.transport=m,!n){try{n=await this._getNegotiationResponse(e)}catch(w){return Promise.reject(w)}a=this._createConnectUrl(e,n.connectionToken)}try{await this._startTransport(a,s),this.connectionId=n.connectionId;return}catch(w){if(this._logger.log(u.Error,`Failed to start the transport '${c.transport}': ${w}`),n=void 0,l.push(new st(`${c.transport} failed: ${w}`,V[c.transport])),this._connectionState!=="Connecting"){const _="Failed to select transport before stop() was called.";return this._logger.log(u.Debug,_),Promise.reject(new X(_))}}}}return l.length>0?Promise.reject(new at(`Unable to connect to the server with any of the available transports. ${l.join(" ")}`,l)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case V.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new $t(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case V.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Ct(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case V.LongPolling:return new Le(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async r=>{let s=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{s=!0}else{this._stopConnection(r);return}s&&this._stopConnection(r)}:this.transport.onclose=r=>this._stopConnection(r),this.transport.connect(e,t)}_resolveTransportOrError(e,t,r,s){const a=V[e.transport];if(a==null)return this._logger.log(u.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(_t(t,a))if(e.transferFormats.map(o=>K[o]).indexOf(r)>=0){if(a===V.WebSockets&&!this._options.WebSocket||a===V.ServerSentEvents&&!this._options.EventSource)return this._logger.log(u.Debug,`Skipping transport '${V[a]}' because it is not supported in your environment.'`),new tt(`'${V[a]}' is not supported in your environment.`,a);this._logger.log(u.Debug,`Selecting transport '${V[a]}'.`);try{return this.features.reconnect=a===V.WebSockets?s:void 0,this._constructTransport(a)}catch(o){return o}}else return this._logger.log(u.Debug,`Skipping transport '${V[a]}' because it does not support the requested transfer format '${K[r]}'.`),new Error(`'${V[a]}' does not support ${K[r]}.`);else return this._logger.log(u.Debug,`Skipping transport '${V[a]}' because it was disabled by the client.`),new rt(`'${V[a]}' is disabled by the client.`,a)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(u.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(u.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(u.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(u.Error,`Connection disconnected with error '${e}'.`):this._logger.log(u.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(u.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(u.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!B.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(u.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const r=new URLSearchParams(t.searchParams);return r.has("negotiateVersion")||r.append("negotiateVersion",this._negotiateVersion.toString()),r.has("useStatefulReconnect")?r.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&r.append("useStatefulReconnect","true"),t.search=r.toString(),t.toString()}}function _t(i,e){return!i||(e&i)!==0}class Ce{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new ve,this._transportResult=new ve,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new ve),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new ve;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):Ce._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(r){e.reject(r)}}}static _concatBuffers(e){const t=e.map(a=>a.byteLength).reduce((a,l)=>a+l),r=new Uint8Array(t);let s=0;for(const a of e)r.set(new Uint8Array(a),s),s+=a.byteLength;return r.buffer}}class ve{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const Rt="json";class Pt{constructor(){this.name=Rt,this.version=2,this.transferFormat=K.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=he.instance);const r=Q.parse(e),s=[];for(const a of r){const l=JSON.parse(a);if(typeof l.type!="number")throw new Error("Invalid payload.");switch(l.type){case k.Invocation:this._isInvocationMessage(l);break;case k.StreamItem:this._isStreamItemMessage(l);break;case k.Completion:this._isCompletionMessage(l);break;case k.Ping:break;case k.Close:break;case k.Ack:this._isAckMessage(l);break;case k.Sequence:this._isSequenceMessage(l);break;default:t.log(u.Information,"Unknown message type '"+l.type+"' ignored.");continue}s.push(l)}return s}writeMessage(e){return Q.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const Nt={trace:u.Trace,debug:u.Debug,info:u.Information,information:u.Information,warn:u.Warning,warning:u.Warning,error:u.Error,critical:u.Critical,none:u.None};function Dt(i){const e=Nt[i.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${i}`)}class Bt{configureLogging(e){if(F.isRequired(e,"logging"),Mt(e))this.logger=e;else if(typeof e=="string"){const t=Dt(e);this.logger=new xe(t)}else this.logger=new xe(e);return this}withUrl(e,t){return F.isRequired(e,"url"),F.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return F.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new Me(e):this.reconnectPolicy=e:this.reconnectPolicy=new Me,this}withServerTimeout(e){return F.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return F.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new It(this.url,e);return Ae.create(t,this.logger||he.instance,this.protocol||new Pt,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Mt(i){return i.log!==void 0}class Lt{constructor(){h(this,"hubConnection",null);h(this,"isConnected",!1);h(this,"statusListeners",[])}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Bt().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect().configureLogging(u.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{this.statusListeners.forEach(r=>r(t.orderId,t.status,t.message))}),this.hubConnection.start().then(()=>{this.isConnected=!0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection fallback active (sandbox mode)",t)})}catch{console.log("SignalR running in local simulated mode")}}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,r){this.statusListeners.forEach(s=>s(e,t,r))}}const ge=new Lt;class Ot{constructor(){h(this,"token",localStorage.getItem("token")||null);h(this,"currentUser",this.loadStoredUser());h(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);h(this,"listeners",[]);h(this,"listings",[]);h(this,"orders",[]);h(this,"notifications",[]);h(this,"standingOrders",[]);h(this,"anomalyAlerts",[]);h(this,"kycQueue",[]);h(this,"verificationQueue",[]);h(this,"agentRegisteredFarmers",[]);h(this,"regionalAnalytics",[]);h(this,"priceBenchmarks",[]);h(this,"offlineQueue",[]);h(this,"isOfflineMode",!1);h(this,"farmerSummary",{totalEarnedEtb:48200,pendingEscrowEtb:14850,releasedEtb:48200,completedOrdersCount:18,pendingOrdersCount:1,totalWithholdingTaxPaidEtb:964});h(this,"driverSummary",{totalEarnedEtb:6450,pendingEtb:825,deliveredTripsCount:14,ruralBonusEtb:1250});h(this,"platformStats",{totalUsers:6,totalFarmers:3,totalBuyers:1,totalDrivers:1,totalListings:6,totalOrders:3,totalTransactionVolumeEtb:34500,totalPlatformCommissionEtb:1725,activeEscrowHeldEtb:25500,disputedOrdersCount:1,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:258.75,totalWithholdingReportedEtb:690});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}async init(){this.loadOfflineQueue(),this.initDefaultData(),this.token&&await this.fetchMe(),await this.refreshAllData()}initDefaultData(){this.priceBenchmarks=[{cropName:"Fresh Sholla Red Tomatoes",cropNameAm:"ቀይ ቲማቲም",marketName:"Merkato Wholesale / Sholla",minPriceEtb:38,avgPriceEtb:45,maxPriceEtb:52,trend:"Down",lastUpdated:"Today 6:00 AM"},{cropName:"Organic Magna White Teff",cropNameAm:"የማኛ ነጭ ጤፍ",marketName:"EABC / Addis Depot",minPriceEtb:108,avgPriceEtb:115,maxPriceEtb:125,trend:"Up",lastUpdated:"Today 7:30 AM"},{cropName:"Awash Valley Red Onions",cropNameAm:"ቀይ ሽንኩርት",marketName:"Adama Wholesale Market",minPriceEtb:48,avgPriceEtb:55,maxPriceEtb:62,trend:"Stable",lastUpdated:"Today 6:15 AM"},{cropName:"Hawassa Hass Avocados",cropNameAm:"ሀስ አቮካዶ",marketName:"Hawassa Central / Merkato",minPriceEtb:50,avgPriceEtb:60,maxPriceEtb:72,trend:"Up",lastUpdated:"Today 8:00 AM"},{cropName:"Specialty Green Coffee Beans",cropNameAm:"ስፔሻሊቲ ቡና",marketName:"ECX Central Exchange",minPriceEtb:340,avgPriceEtb:380,maxPriceEtb:420,trend:"Up",lastUpdated:"Yesterday"},{cropName:"Bishoftu Sweet Strawberries",cropNameAm:"የቢሾፍቱ እንጆሪ",marketName:"Bole Fresh Produce Hub",minPriceEtb:85,avgPriceEtb:95,maxPriceEtb:110,trend:"Stable",lastUpdated:"Today 7:00 AM"}],this.standingOrders=[{id:"so-1",listingId:"a1b2c3d4-0001-0000-0000-000000000001",productName:"Fresh Sholla Red Tomatoes",productNameAm:"የሾላ ቀይ ቲማቲም",farmerName:"Abebe Bekele",qtyKg:150,pricePerKg:45,frequency:"Weekly",nextDeliveryDate:"Next Monday, 8:00 AM",active:!0,createdAt:new Date().toISOString()},{id:"so-2",listingId:"a1b2c3d4-0003-0000-0000-000000000003",productName:"Awash Valley Red Onions",productNameAm:"የአዋሽ ቀይ ሽንኩርት",farmerName:"Abebe Bekele",qtyKg:200,pricePerKg:55,frequency:"Bi-Weekly",nextDeliveryDate:"Next Thursday, 9:00 AM",active:!0,createdAt:new Date().toISOString()}],this.anomalyAlerts=[{id:"ANOM-101",severity:"High",type:"PriceManipulation",title:"Unusual Price Spike Detected",description:"Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",entityType:"Listing",entityId:"a1b2c3d4-0001-0000-0000-000000000001",detectedAt:"35 mins ago"},{id:"ANOM-102",severity:"Medium",type:"DuplicateProofPhoto",title:"Driver Proof Image Hash Match",description:"Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",entityType:"Order",entityId:"b1b2c3d4-0002-0000-0000-000000000002",detectedAt:"2 hours ago"},{id:"ANOM-103",severity:"Low",type:"FakeAccount",title:"Rapid Registration Cluster",description:"Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",entityType:"User",entityId:"44444444-4444-4444-4444-444444444444",detectedAt:"5 hours ago"}],this.kycQueue=[{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede (Driver)",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",documentType:"Commercial Vehicle Logbook & License",documentNumber:"ET-LOG-5T-98214",tinNumber:"TIN-DRV-981244",kycTier:3,status:"Pending",submittedAt:"Yesterday"},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele (Farmer)",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",documentType:"National ID (Fayda)",documentNumber:"FAYDA-ET-8829104",tinNumber:"TIN-FARM-882910",kycTier:2,status:"Verified",submittedAt:"3 days ago"},{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu (Farmer)",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",documentType:"National ID (Fayda)",documentNumber:"FAN-8812-4091-2810",tinNumber:"0099881122",kycTier:2,status:"Pending",submittedAt:"1 day ago"},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu (Farmer)",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",documentType:"Kebele Smallholder ID",documentNumber:"HAW-KEB-4410",kycTier:1,status:"Pending",submittedAt:"12 hours ago"}],this.verificationQueue=[{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu",userNameAm:"ግርማ ወንዲሙ",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",registrationMethod:"Agent",registeredByAgentName:"Kassahun Tolessa (Field Agent)",verificationStatus:"UnderReview",tinNumber:"0099881122",registeredAt:"Yesterday 4:15 PM",documents:[{id:"doc-1",userId:"88888888-8888-8888-8888-888888888888",documentType:"FaydaId",documentNumber:"FAN-8812-4091-2810",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"},{id:"doc-2",userId:"88888888-8888-8888-8888-888888888888",documentType:"TinCertificate",documentNumber:"0099881122",frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"}],reviews:[]},{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede",userNameAm:"ዳዊት ከበደ",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:"TIN-DRV-981244",registeredAt:"2 days ago",documents:[{id:"doc-3",userId:"55555555-5555-5555-5555-555555555555",documentType:"VehicleLogbook",documentNumber:"ET-LOG-5T-98214",frontImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"2 days ago"}],reviews:[]},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu",userNameAm:"ጫላ ገመቹ",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",registrationMethod:"Self",verificationStatus:"UnderReview",registeredAt:"3 days ago",documents:[{id:"doc-4",userId:"33333333-3333-3333-3333-333333333333",documentType:"KebeleId",documentNumber:"HAW-KEB-4410",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"3 days ago"}],reviews:[]},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele",userNameAm:"አበበ በቀለ",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",registrationMethod:"Self",verificationStatus:"Approved",tinNumber:"TIN-FARM-882910",registeredAt:"1 month ago",documents:[{id:"doc-5",userId:"11111111-1111-1111-1111-111111111111",documentType:"FaydaId",documentNumber:"FAYDA-ET-8829104",status:"Approved",submittedAt:"1 month ago"}],reviews:[{id:"rev-1",userId:"11111111-1111-1111-1111-111111111111",reviewerName:"Sara Mengistu",actionTaken:"Approved",notes:"National ID and Bishoftu farm registry confirmed.",timestamp:"1 month ago"}]}],this.agentRegisteredFarmers=[{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",kebele:"Ada'a Kebele 04",primaryCrop:"Magna Teff & Tomatoes",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",status:"UnderReview",registeredAt:"Yesterday 4:15 PM",faydaFrontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",status:"Approved",registeredAt:"5 days ago"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",status:"Approved",registeredAt:"1 week ago"}],this.regionalAnalytics=[{region:"Oromia (East Shewa / Bishoftu)",smallholdersCount:4200,volumeMetricTons:68.5,totalGmvEtb:385e4,topCrop:"Tomatoes & Onions"},{region:"Amhara (Debre Berhan / Gojjam)",smallholdersCount:3100,volumeMetricTons:42,totalGmvEtb:483e4,topCrop:"Magna White Teff"},{region:"Sidama (Hawassa / Yirgalem)",smallholdersCount:1950,volumeMetricTons:24.8,totalGmvEtb:1488e3,topCrop:"Hass Avocados & Fruits"},{region:"SNNPR (Gedeo / Yirgacheffe)",smallholdersCount:1400,volumeMetricTons:10.5,totalGmvEtb:399e4,topCrop:"Specialty Green Coffee"}]}loadOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");e&&(this.offlineQueue=JSON.parse(e))}catch{this.offlineQueue=[]}}saveOfflineQueue(){localStorage.setItem("offlineQueue",JSON.stringify(this.offlineQueue))}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),r=t.verificationStatus||(t.verified?"Approved":"PendingSubmission"),s={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,role:(t.role||"buyer").toLowerCase(),region:t.region,verified:t.verified??r==="Approved",verificationStatus:r,rejectionReason:t.rejectionReason,tinNumber:t.tinNumber||(r==="Approved"&&t.role==="buyer"?"TIN-ET-9912001":void 0),businessLicenseNumber:t.businessLicenseNumber||(r==="Approved"?"MOT-LIC-2026-98124":void 0),vehicleType:t.vehicleType||(t.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:t.refrigerationType||(t.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:t.vehicleCapacityKg||(t.role==="driver"?5e3:void 0),kycDocumentType:t.kycDocumentType||(r==="Approved"?"National ID (Fayda)":void 0),kycDocumentNumber:t.kycDocumentNumber,kycStatus:r==="Approved"?"Verified":"Pending",kycTier:t.kycTier||2,repeatBuyerCount:t.repeatBuyerCount||(t.role==="farmer"?14:void 0),onTimeDeliveryRate:t.onTimeDeliveryRate||(t.role==="farmer"||t.role==="driver"?99:void 0),walletBalanceEtb:t.walletBalanceEtb??0,createdAt:t.createdAt};return this.currentUser=s,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(s)),this.notify(),s}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async requestOtp(e){const t=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),r=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(!r.ok){const s=await r.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(s.error||"Failed to request OTP. Please check your phone number.")}return await r.json()}async verifyOtp(e,t){const r=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),s=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:r,code:t.trim()})});if(!s.ok){const n=await s.json().catch(()=>({error:"Invalid verification code or phone"}));throw new Error(n.error||"Authentication failed")}const a=await s.json();this.token=a.token,localStorage.setItem("token",a.token);const l=a.user.verificationStatus||(a.user.verified?"Approved":"PendingSubmission"),o={id:a.user.id,phone:a.user.phone,name:a.user.name,nameAm:a.user.nameAm,role:(a.user.role||"buyer").toLowerCase(),region:a.user.region,verified:a.user.verified??l==="Approved",verificationStatus:l,rejectionReason:a.user.rejectionReason,tinNumber:a.user.tinNumber,businessLicenseNumber:a.user.businessLicenseNumber,vehicleType:a.user.vehicleType||(a.user.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:a.user.refrigerationType||(a.user.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:a.user.vehicleCapacityKg||(a.user.role==="driver"?5e3:void 0),kycDocumentType:a.user.kycDocumentType,kycDocumentNumber:a.user.kycDocumentNumber,kycStatus:l==="Approved"?"Verified":"Pending",kycTier:2,repeatBuyerCount:a.user.repeatBuyerCount||(a.user.role==="farmer"?14:void 0),onTimeDeliveryRate:a.user.onTimeDeliveryRate||(a.user.role==="farmer"||a.user.role==="driver"?99:void 0),walletBalanceEtb:a.user.walletBalanceEtb??0,createdAt:a.user.createdAt};return this.currentUser=o,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(o)),ge.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),o}async registerUser(e,t,r,s,a){const l=r.startsWith("+251")?r:"+251"+r.replace(/^0+/,""),o=s.charAt(0).toUpperCase()+s.slice(1).toLowerCase(),n=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,phone:l,role:o,region:a})});if(!n.ok){const w=await n.json().catch(()=>({error:"Registration failed"}));throw new Error(w.error||"Registration failed")}const c=await n.json();this.token=c.token,localStorage.setItem("token",c.token);const m={id:c.user.id,phone:c.user.phone,name:c.user.name,nameAm:c.user.nameAm,role:(c.user.role||"buyer").toLowerCase(),region:c.user.region,verified:!1,verificationStatus:"PendingSubmission",tinNumber:void 0,businessLicenseNumber:void 0,vehicleType:s==="driver"?"Isuzu 5-Ton":void 0,refrigerationType:s==="driver"?"Ventilated":void 0,vehicleCapacityKg:s==="driver"?5e3:void 0,kycDocumentType:void 0,kycDocumentNumber:void 0,kycStatus:"Pending",kycTier:1,repeatBuyerCount:0,onTimeDeliveryRate:100,walletBalanceEtb:0,createdAt:c.user.createdAt};return this.currentUser=m,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),ge.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(){try{const e=await fetch("/api/listings");if(e.ok){const t=await e.json(),r=Array.isArray(t)?t:t.items||[];return this.listings=r.map(s=>({id:s.id,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,region:s.region,productName:s.productName,nameAm:s.nameAm,category:s.category,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),minOrderKg:Number(s.minOrderKg),latitude:s.latitude,longitude:s.longitude,distanceKm:s.distanceKm,photos:s.photos&&s.photos.length>0?s.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:s.availableFrom||new Date().toISOString().split("T")[0],status:(s.status||"Active").toLowerCase(),grade:s.grade||"Grade 1",ripeness:s.ripeness||"Ready Today",isOrganic:s.isOrganic??!0,isAdvanceHarvest:s.isAdvanceHarvest??!1,expectedHarvestDate:s.expectedHarvestDate,voiceNoteUrl:s.voiceNoteUrl,voiceNoteTranscript:s.voiceNoteTranscript,marketBenchmarkPrice:s.marketBenchmarkPrice||s.pricePerKg,moderationStatus:s.moderationStatus||"Approved",farmerRating:s.farmerRating||4.9,reviewCount:s.reviewCount||14,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:s.createdAt})),this.notify(),this.listings}}catch(e){console.warn("Fetch listings from backend failed",e)}return this.listings}getListings(e,t,r,s,a,l,o,n){return this.listings.filter(c=>{if(c.status!=="active"||e&&e!=="All"&&c.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!c.region.toLowerCase().includes(t.toLowerCase())||a&&a!=="All"&&c.grade!==a||l&&l!=="All"&&c.ripeness!==l||o&&!c.isOrganic||n&&!c.isAdvanceHarvest||s&&c.distanceKm&&c.distanceKm>s)return!1;if(r){const m=r.toLowerCase();if(!(c.productName.toLowerCase().includes(m)||c.nameAm&&c.nameAm.includes(m)||c.farmerName.toLowerCase().includes(m)||c.region.toLowerCase().includes(m)))return!1}return!0})}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var s,a,l,o,n,c,m,w,_,O;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category||"Vegetables",qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate||null,voiceNoteUrl:e.voiceNoteUrl||null,voiceNoteTranscript:e.voiceNoteTranscript||null,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg};let r=null;try{const j=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(j.ok){const f=await j.json();r={id:f.id,farmerId:f.farmerId||((s=this.currentUser)==null?void 0:s.id)||"11111111-1111-1111-1111-111111111111",farmerName:f.farmerName||((a=this.currentUser)==null?void 0:a.name)||"Abebe Bekele",farmerNameAm:f.farmerNameAm||((l=this.currentUser)==null?void 0:l.nameAm),farmerPhone:f.farmerPhone||((o=this.currentUser)==null?void 0:o.phone)||"+251911223344",region:f.region||((n=this.currentUser)==null?void 0:n.region)||"Oromia (Bishoftu)",productName:f.productName,nameAm:f.nameAm,category:f.category,qtyKg:Number(f.qtyKg),pricePerKg:Number(f.pricePerKg),minOrderKg:Number(f.minOrderKg),latitude:f.latitude,longitude:f.longitude,distanceKm:f.distanceKm||45,photos:f.photos&&f.photos.length>0?f.photos:e.photos||["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:f.availableFrom,status:"active",grade:f.grade||e.grade||"Grade 1",ripeness:f.ripeness||e.ripeness||"Ready Today",isOrganic:f.isOrganic??e.isOrganic??!0,isAdvanceHarvest:f.isAdvanceHarvest??e.isAdvanceHarvest??!1,expectedHarvestDate:f.expectedHarvestDate||e.expectedHarvestDate,voiceNoteUrl:f.voiceNoteUrl||e.voiceNoteUrl,voiceNoteTranscript:f.voiceNoteTranscript||e.voiceNoteTranscript,marketBenchmarkPrice:f.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:f.createdAt||new Date().toISOString()}}}catch(j){console.warn("Create listing network call fallback to local state",j)}return r||(r={id:"list-local-"+Date.now(),farmerId:((c=this.currentUser)==null?void 0:c.id)||"11111111-1111-1111-1111-111111111111",farmerName:((m=this.currentUser)==null?void 0:m.name)||"Abebe Bekele",farmerNameAm:(w=this.currentUser)==null?void 0:w.nameAm,farmerPhone:((_=this.currentUser)==null?void 0:_.phone)||"+251911223344",region:((O=this.currentUser)==null?void 0:O.region)||"Oromia (Bishoftu)",productName:e.productName||"Fresh Farm Produce",nameAm:e.nameAm,category:e.category||"Vegetables",qtyKg:Number(e.qtyKg||1e3),pricePerKg:Number(e.pricePerKg||45),minOrderKg:Number(e.minOrderKg||100),latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,distanceKm:45,photos:e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],status:"active",grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate,voiceNoteUrl:e.voiceNoteUrl,voiceNoteTranscript:e.voiceNoteTranscript,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:new Date().toISOString()}),this.listings.unshift(r),this.notify(),r}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(r=>{const s=Number(r.totalEtb),a=Number(r.farmerCut||s*.9),l=Number(r.driverCut||s*.05),o=Number(r.platformCut||s*.05),n=Math.round(s*.02),c=Math.round(o*.15);return{id:r.id,listingId:r.listingId,productName:r.productName,productNameAm:r.productNameAm,category:r.category,farmerId:r.farmerId,farmerName:r.farmerName,farmerNameAm:r.farmerNameAm,farmerPhone:r.farmerPhone,farmerRegion:r.farmerRegion,buyerId:r.buyerId,buyerName:r.buyerName,buyerPhone:r.buyerPhone,driverId:r.driverId,driverName:r.driverName,driverPhone:r.driverPhone,qtyKg:Number(r.qtyKg),pricePerKg:Number(r.pricePerKg),totalEtb:s,farmerCut:a,driverCut:l,platformCut:o,driverSubsidyEtb:Number(r.driverSubsidyEtb||150),withholdingTaxEtb:n,platformVatEtb:c,status:(r.status||"Pending").toLowerCase(),escrowHeld:r.escrowHeld,paymentRef:r.paymentRef||`TB-${r.id.slice(0,8).toUpperCase()}`,invoiceNumber:`ET-INV-2026-${r.id.slice(0,6).toUpperCase()}`,waybillNumber:`WB-FTA-${r.id.slice(0,6).toUpperCase()}`,contractNumber:`AGR-ET-${r.id.slice(0,6).toUpperCase()}`,arbitrationDecreeNumber:r.status==="disputed"?`ARB-DEC-${r.id.slice(0,6).toUpperCase()}`:void 0,pickupPhoto:r.pickupPhoto,deliveryPhoto:r.deliveryPhoto,deliveryGpsLat:r.deliveryGpsLat,deliveryGpsLng:r.deliveryGpsLng,deliveredAt:r.deliveredAt,deliveryAddress:r.deliveryAddress,deliveryNotes:r.deliveryNotes,disputeReason:r.disputeReason,disputePhoto:r.disputePhoto,requestedRefundPercent:r.requestedRefundPercent||100,disputeStatus:r.disputeStatus||"None",disputeResolutionNotes:r.disputeResolutionNotes,isRecurring:r.isRecurring||!1,recurringFrequency:r.recurringFrequency,confirmedAt:r.confirmedAt,createdAt:r.createdAt}}),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(r=>r.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(r=>r.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(r=>r.driverId===this.currentUser.id||r.status==="confirmed"&&!r.driverId):this.orders}async placeOrder(e,t,r,s=!1,a="Weekly"){var n;if(!this.listings.find(c=>c.id===e))throw new Error("Listing not found");if(!(await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:r||((n=this.currentUser)==null?void 0:n.region)||"Addis Ababa (Bole)",isRecurring:s,recurringFrequency:s?a:null})})).ok)throw new Error("Failed to place order in database");return await this.fetchOrders(),await this.fetchListings(),this.orders[0]||this.orders.find(c=>c.listingId===e)}async confirmOrderByFarmer(e){await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders()}async pickupOrderByDriver(e,t){if(this.isOfflineMode){this.offlineQueue.push({id:"off-"+Date.now(),type:"pickup",orderId:e,timestamp:new Date().toISOString(),data:{photo:t},synced:!1}),this.saveOfflineQueue();const r=this.orders.find(s=>s.id===e);r&&(r.status="picked_up",r.pickupPhoto=t),this.notify();return}await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"})}),await this.fetchOrders()}async confirmDeliveryByBuyer(e,t,r,s){await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({deliveryPhoto:t||"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",deliveryGpsLat:r||9.03,deliveryGpsLng:s||38.74})}),await this.fetchOrders()}async disputeOrder(e,t,r,s=50){await fetch(`/api/orders/${e}/dispute`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,disputePhoto:r||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",requestedRefundPercent:s})}),await this.fetchOrders()}async resolveDispute(e,t,r=50,s=50){await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:`Arbitrated via Admin Console (${t})`,farmerSharePercent:r,buyerRefundPercent:s})}),await this.fetchOrders()}getTaxInvoice(e){const t=this.orders.find(a=>a.id===e)||this.orders[0]||{id:e,productName:"Fresh Sholla Red Tomatoes",qtyKg:200,pricePerKg:45,totalEtb:9e3,farmerCut:8100,driverCut:450,platformCut:450,farmerName:"Abebe Bekele",farmerRegion:"Oromia (Bishoftu)",farmerPhone:"+251 911 223 344",buyerName:"Bethlehem Tilahun (FreshMart)",buyerPhone:"+251 955 667 788",paymentRef:"TB-TXN-98217391",invoiceNumber:"ET-INV-2026-001",createdAt:new Date().toISOString()},r=Math.round(t.platformCut*.15),s=Math.round(t.totalEtb*.02);return{invoiceNumber:t.invoiceNumber||`ET-INV-2026-${t.id.slice(0,6).toUpperCase()}`,orderId:t.id,issueDate:t.createdAt?new Date(t.createdAt).toLocaleDateString("en-GB"):new Date().toLocaleDateString("en-GB"),paymentRef:t.paymentRef||`TB-C2B-${t.id.slice(0,8).toUpperCase()}`,sellerName:t.farmerName,sellerTin:"TIN-FARM-8829104",sellerRegion:t.farmerRegion,sellerPhone:t.farmerPhone,sellerType:"Registered Agricultural Smallholder Producer",buyerName:t.buyerName,buyerTin:"TIN-ET-9912001",buyerRegion:"Addis Ababa (Bole)",buyerPhone:t.buyerPhone,productName:t.productName,productNameAm:t.productNameAm,grade:"Grade 1 (Certified Farm Standard)",qtyKg:t.qtyKg,unitPriceEtb:t.pricePerKg,grossAmountEtb:t.totalEtb,farmerPayoutEtb:t.farmerCut,driverFreightEtb:t.driverCut,platformServiceFeeEtb:t.platformCut,platformVatEtb:r,withholdingTaxEtb:s,totalPaidViaTelebirr:t.totalEtb,regulatoryAct:"Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)",qrVerificationCode:`ET-TAX-AUTH-2026-VERIFIED-${t.id.slice(0,8).toUpperCase()}`,isVatExemptAgriculturalGoods:!0}}getTransportWaybill(e){const t=this.orders.find(r=>r.id===e)||this.orders[0];return{waybillNumber:(t==null?void 0:t.waybillNumber)||`WB-FTA-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,dispatchDate:new Date().toLocaleDateString("en-GB"),consignorName:(t==null?void 0:t.farmerName)||"Abebe Bekele",consignorFarmLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu Green Farms, Oromia",consignorPhone:(t==null?void 0:t.farmerPhone)||"+251 911 223 344",consigneeName:(t==null?void 0:t.buyerName)||"FreshMart Central Wholesale Hub",consigneeDepotAddress:(t==null?void 0:t.deliveryAddress)||"Bole Depot, Addis Ababa",consigneePhone:(t==null?void 0:t.buyerPhone)||"+251 955 667 788",carrierDriverName:(t==null?void 0:t.driverName)||"Dawit Kebede",driverLicenseNumber:"ET-CDL-COMM-89104",vehiclePlateNumber:"ET-3-B98124-AA",vehicleModel:"Isuzu 5-Ton Commercial Freight Carrier",refrigerationStatus:"Ventilated Agri-Body Cargo (18°C)",insurancePolicyNumber:"NIC-ET-CARGO-771920",cargoDescription:`${(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes"} (Grade 1)`,packageCount:Math.ceil(((t==null?void 0:t.qtyKg)||200)/25),netWeightKg:(t==null?void 0:t.qtyKg)||200,grossWeightKg:((t==null?void 0:t.qtyKg)||200)+18,tareWeightKg:18,temperatureLogCelsius:17.5,farmerHandoffTimestamp:"06:30 AM (Farm Gate)",driverSignatureRef:"DAWIT-KEBEDE-VERIFIED-LOG",buyerReceivedTimestamp:(t==null?void 0:t.status)==="delivered"?"09:45 AM (Bole Depot)":void 0,transitStatus:(t==null?void 0:t.status)==="delivered"?"DeliveredWithGPS":(t==null?void 0:t.status)==="picked_up"?"InTransit":"Dispatched"}}getLegalContract(e){const t=this.orders.find(r=>r.id===e)||this.orders[0];return{contractNumber:(t==null?void 0:t.contractNumber)||`AGR-CONTR-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,agreementDate:new Date().toLocaleDateString("en-GB"),effectiveDate:new Date().toLocaleDateString("en-GB"),sellerName:(t==null?void 0:t.farmerName)||"Abebe Bekele",sellerIdNumber:"FAYDA-ET-8829104",sellerLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu, Oromia, Ethiopia",buyerName:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun (FreshMart Wholesale)",buyerTinNumber:"TIN-ET-9912001",buyerLocation:(t==null?void 0:t.deliveryAddress)||"Addis Ababa, Ethiopia",cropType:(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes",contractedQuantityKg:(t==null?void 0:t.qtyKg)||200,agreedPricePerKg:(t==null?void 0:t.pricePerKg)||45,totalContractValueEtb:(t==null?void 0:t.totalEtb)||9e3,qualityStandardClause:"Produce shall conform to Grade 1 Ethiopian Commodity Quality Standards (Maximum defect tolerance 2.5%, moisture within physiological thresholds).",deliveryTimeline:"Direct farm-to-depot transit guaranteed within 12 hours of farmer harvest confirmation.",escrowClauseText:"Purchase consideration is locked in Telebirr C2B Escrow and shall be automatically disbursed (90% Farmer / 5% Driver / 5% Platform) upon buyer delivery verification.",forceMajeureClauseText:"Neither party shall be liable for delivery failure caused by natural agricultural catastrophes, unseasonal frost, or national logistical force majeure.",disputeJurisdiction:"Federal Democratic Republic of Ethiopia Commercial Code and Ethiopian Agricultural Authority Arbitration Rules.",eSignatures:{sellerSigned:!0,sellerSignDate:"Digitally Authenticated via OTP/Fayda",buyerSigned:!0,buyerSignDate:"Digitally Authenticated via Telebirr Escrow Lock",platformWitnessHash:`EABC-FM-TRUST-SEAL-${e.slice(0,8).toUpperCase()}`}}}getDisputeMediationRecord(e){const t=this.orders.find(r=>r.id===e)||this.orders[0];return{caseNumber:(t==null?void 0:t.arbitrationDecreeNumber)||`ARB-CASE-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,filingDate:"Yesterday 3:15 PM",resolutionDate:(t==null?void 0:t.status)==="disputed"?void 0:"Today 11:30 AM",status:(t==null?void 0:t.status)==="disputed"?"UnderInvestigation":"Settled",claimantBuyer:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun",respondentFarmer:(t==null?void 0:t.farmerName)||"Chala Gemechu",freightCarrier:(t==null?void 0:t.driverName)||"Dawit Kebede",totalDisputedAmountEtb:(t==null?void 0:t.totalEtb)||9e3,disputeReason:(t==null?void 0:t.disputeReason)||"Delivered avocados were overripe and 20% bruised during transit from Hawassa.",claimedDefectPercentage:(t==null?void 0:t.requestedRefundPercent)||50,inspectionReport:"Independent physical inspection at Bole Cold Storage Depot confirmed 18.5% transit softening on batch packaging.",photoEvidenceUrl:(t==null?void 0:t.disputePhoto)||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",leadArbitratorName:"Sara Mengistu (Marketplace Compliance Arbitrator)",legalFindingSummary:"Partial packaging failure during transit. Fair 50/50 equitable split awarded under Ethiopian Commercial Code Art. 2289.",arbitrationVerdict:"FiftyFiftySplit",farmerSettlementEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),buyerRefundEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),platformDecreeHash:`LEGAL-DECREE-ARB-${e.slice(0,8).toUpperCase()}`}}getPriceBenchmarks(){return this.priceBenchmarks}getStandingOrders(){return this.standingOrders}addStandingOrder(e,t,r){const s=this.listings.find(l=>l.id===e),a={id:"so-"+Date.now(),listingId:e,productName:(s==null?void 0:s.productName)||"Fresh Produce",productNameAm:s==null?void 0:s.nameAm,farmerName:(s==null?void 0:s.farmerName)||"Abebe Bekele",qtyKg:t,pricePerKg:(s==null?void 0:s.pricePerKg)||45,frequency:r,nextDeliveryDate:r==="Weekly"?"Next Monday, 8:00 AM":"Every 2nd Thursday",active:!0,createdAt:new Date().toISOString()};return this.standingOrders.unshift(a),this.notify(),a}toggleStandingOrder(e){const t=this.standingOrders.find(r=>r.id===e);t&&(t.active=!t.active,this.notify())}getKycQueue(){return this.kycQueue}async verifyKyc(e,t){const r=this.kycQueue.find(s=>s.userId===e);if(r){r.status=t?"Verified":"Rejected";try{await fetch(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${r.status}`,{method:"PUT",headers:this.getAuthHeaders()})}catch(s){console.warn("KYC update remote failed, updating local state",s)}this.notify()}}getAnomalyAlerts(){return this.anomalyAlerts}getRegionalAnalytics(){return this.regionalAnalytics}getOptimizedRoute(){return{id:"route-oromia-addis-01",title:"Consolidated East Shewa Multi-Farm Route",totalDistanceKm:68.4,estimatedHours:2.5,totalWeightKg:2800,driverCommissionEtb:1450,ruralSubsidyEtb:350,stops:[{stopNumber:1,type:"pickup",locationName:"Bishoftu Green Farms (Abebe Bekele)",contactName:"Abebe Bekele",phone:"+251 911 223 344",cargoDetails:"Fresh Sholla Red Tomatoes",weightKg:1200,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Valley Farm (Almaz Hailu)",contactName:"Almaz Hailu",phone:"+251 922 334 455",cargoDetails:"Awash Valley Red Onions",weightKg:1600,completed:!1},{stopNumber:3,type:"dropoff",locationName:"FreshMart Central Wholesale Hub (Bole, Addis Ababa)",contactName:"Bethlehem Tilahun",phone:"+251 955 667 788",cargoDetails:"Consolidated Wholesale Dropoff (2,800 kg total)",weightKg:2800,completed:!1}]}}updateDriverVehicle(e,t,r){this.currentUser&&this.currentUser.role==="driver"&&(this.currentUser.vehicleType=e,this.currentUser.refrigerationType=t,this.currentUser.vehicleCapacityKg=r,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify())}toggleOfflineMode(){return this.isOfflineMode=!this.isOfflineMode,this.notify(),this.isOfflineMode}getIsOfflineMode(){return this.isOfflineMode}getOfflineQueue(){return this.offlineQueue}async syncOfflineQueue(){var r;const e=this.offlineQueue.filter(s=>!s.synced);for(const s of e)s.type==="pickup"&&await this.pickupOrderByDriver(s.orderId,(r=s.data)==null?void 0:r.photo),s.synced=!0;const t=e.length;return this.offlineQueue=[],this.saveOfflineQueue(),this.notify(),t}async sendInboundSms(e,t){try{const r=await fetch("/api/sms/inbound",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:e,body:t})});if(r.ok){const s=await r.json();return await this.refreshAllData(),s.response}}catch(r){console.warn("SMS Webhook call failed, simulating response",r)}return`[SIMULATED SMS ACK] Received: "${t}". Processed successfully in offline cache.`}simulateVoiceTranscription(e,t){return t==="am"?{productName:"Fresh Sholla Red Tomatoes",nameAm:"የሾላ ቀይ ቲማቲም",category:"Vegetables",qtyKg:1500,pricePerKg:45,region:"Oromia (Bishoftu)",transcript:"1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"}:t==="om"?{productName:"Awash Red Onions",nameAm:"የአዋሽ ቀይ ሽንኩርት",category:"Vegetables",qtyKg:2e3,pricePerKg:55,region:"Oromia (Adama)",transcript:"Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."}:{productName:"Grade 1 Specialty Green Coffee",nameAm:"የይርጋጨፌ ስፔሻሊቲ ቡና",category:"Coffee",qtyKg:800,pricePerKg:380,region:"SNNPR (Yirgacheffe)",transcript:"We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."}}requestWalletWithdrawal(e,t){return this.currentUser?(this.currentUser.walletBalanceEtb=Math.max(0,(this.currentUser.walletBalanceEtb||48200)-e),this.farmerSummary.releasedEtb+=e,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify(),!0):!1}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round(Number(t.totalEarnedEtb)*.02)}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount,ruralBonusEtb:1250}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount,totalMetricTonsMoved:Number(t.totalMetricTonsMoved||145.8),middlemanMarginSavedEtb:Number(t.middlemanMarginSavedEtb||48e4),totalVatRemittedEtb:Number(t.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:Number(t.totalTransactionVolumeEtb)*.02}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(s=>{var a;return s.farmerId===((a=this.currentUser)==null?void 0:a.id)}),t=e.filter(s=>s.status==="delivered").reduce((s,a)=>s+a.farmerCut,0),r=e.filter(s=>s.status!=="delivered"&&s.status!=="cancelled").reduce((s,a)=>s+a.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:r||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(s=>s.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(s=>s.status!=="delivered"&&s.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round((t||this.farmerSummary.totalEarnedEtb)*.02)}}getDriverSummary(){const e=this.orders.filter(s=>{var a;return s.driverId===((a=this.currentUser)==null?void 0:a.id)}),t=e.filter(s=>s.status==="delivered").reduce((s,a)=>s+a.driverCut,0),r=e.filter(s=>s.status!=="delivered"&&s.status!=="cancelled").reduce((s,a)=>s+a.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:r||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(s=>s.status==="delivered").length||this.driverSummary.deliveredTripsCount,ruralBonusEtb:1250}}getPlatformStats(){const e=this.orders.reduce((a,l)=>a+l.totalEtb,0),t=this.orders.filter(a=>a.status==="delivered").reduce((a,l)=>a+l.platformCut,0),r=this.orders.filter(a=>a.escrowHeld).reduce((a,l)=>a+l.totalEtb,0),s=this.orders.filter(a=>a.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:r||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:s||this.platformStats.disputedOrdersCount,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:(t||this.platformStats.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:(e||this.platformStats.totalTransactionVolumeEtb)*.02}}getNotifications(){return!this.isUserLoggedIn||!this.currentUser?[]:this.notifications.filter(e=>e.userId===this.currentUser.id||this.currentUser.role==="admin")}async broadcastSms(e,t,r){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:r})})}catch(s){console.warn("Broadcast SMS API call error",s)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${r.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${r}] ${t}`,read:!1,createdAt:new Date().toISOString()}),this.notify())}async submitVerificationDocuments(e,t){if(this.currentUser){this.currentUser.tinNumber=e,this.currentUser.verificationStatus="UnderReview",this.currentUser.rejectionReason=void 0;const r=t.map((l,o)=>({id:"doc-self-"+o+"-"+Date.now(),userId:this.currentUser.id,documentType:l.documentType,documentNumber:l.documentNumber,frontImageUrl:l.frontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:l.backImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}));this.currentUser.documents=r,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const s={userId:this.currentUser.id,userName:this.currentUser.name,userNameAm:this.currentUser.nameAm,userRole:this.currentUser.role.charAt(0).toUpperCase()+this.currentUser.role.slice(1),phone:this.currentUser.phone,region:this.currentUser.region,registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:e,registeredAt:"Just now",documents:r,reviews:[]},a=this.verificationQueue.findIndex(l=>l.userId===this.currentUser.id);a>=0?this.verificationQueue[a]=s:this.verificationQueue.unshift(s)}try{await fetch("/api/verification/submit",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({tinNumber:e,documents:t})})}catch(r){console.warn("Backend verification submit fallback to local state",r)}this.notify()}async agentRegisterFarmer(e){var l;const t=e.phone.startsWith("+251")?e.phone:"+251"+e.phone.replace(/^0+/,""),r="agent-f-"+Date.now(),s={id:r,name:e.name,nameAm:e.nameAm||e.name,phone:t,region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,status:"UnderReview",registeredAt:"Just now",faydaFrontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"};this.agentRegisteredFarmers.unshift(s);const a={userId:r,userName:e.name,userNameAm:e.nameAm,userRole:"Farmer",phone:t,region:e.region,registrationMethod:"Agent",registeredByAgentName:((l=this.currentUser)==null?void 0:l.name)||"Community Field Agent",verificationStatus:"UnderReview",tinNumber:e.tinNumber,registeredAt:"Just now",documents:[{id:"doc-ag-1-"+Date.now(),userId:r,documentType:"FaydaId",documentNumber:e.faydaId||"FAN-PENDING",frontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:e.faydaBackImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}],reviews:[]};this.verificationQueue.unshift(a);try{await fetch("/api/verification/agent-register",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(e)})}catch(o){console.warn("Agent register farmer fallback to local state",o)}return this.notify(),s}async reviewVerification(e,t,r,s){var o;const a=this.verificationQueue.find(n=>n.userId===e);a&&(a.verificationStatus=t==="Approve"?"Approved":"Rejected",a.rejectionReason=t==="Reject"?s||r||"Document image was illegible":void 0,a.reviews.unshift({id:"rev-"+Date.now(),userId:e,reviewerName:((o=this.currentUser)==null?void 0:o.name)||"Sara Mengistu (Admin)",actionTaken:t,notes:r||s||(t==="Approve"?"All records verified.":"Verification rejected."),timestamp:"Just now"}),a.documents.forEach(n=>{n.status=t==="Approve"?"Approved":"Rejected",n.rejectionReason=a.rejectionReason}));const l=this.agentRegisteredFarmers.find(n=>n.id===e);l&&(l.status=t==="Approve"?"Approved":"Rejected"),this.currentUser&&this.currentUser.id===e&&(this.currentUser.verificationStatus=t==="Approve"?"Approved":"Rejected",this.currentUser.verified=t==="Approve",this.currentUser.rejectionReason=a==null?void 0:a.rejectionReason,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)));try{await fetch(`/api/verification/${e}/review`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({action:t,notes:r,rejectionReason:s})})}catch(n){console.warn("Review verification remote call failed, updated local state",n)}this.notify()}getVerificationQueue(e,t){let r=[...this.verificationQueue];return e&&e!=="All"&&(r=r.filter(s=>s.userRole.toLowerCase()===e.toLowerCase())),t&&t!=="All"&&(r=r.filter(s=>s.verificationStatus===t)),r}async fetchVerificationQueue(){if(!this.isAuthenticated())return this.verificationQueue;try{const e=await fetch("/api/verification/queue",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();Array.isArray(t)&&t.length>0&&(this.verificationQueue=t,this.notify())}}catch(e){console.warn("Fetch verification queue failed, using local queue",e)}return this.verificationQueue}getAgentRegisteredFarmers(){return this.agentRegisteredFarmers}getVerificationStatus(e){var t,r;if(e){const s=this.verificationQueue.find(a=>a.userId===e);if(s)return s.verificationStatus}return((t=this.currentUser)==null?void 0:t.verificationStatus)||((r=this.currentUser)!=null&&r.verified?"Approved":"PendingSubmission")}async sendInboundUssdSimulation(e,t){return t.includes("*990#")||t.includes("*805#")?`Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit
Reply with number:`:t==="1"?"Welcome! Enter your Name & Woreda (e.g., Bekele Bishoftu):":t==="2"?"Enter your 16-digit Fayda ID Number or FAN-XXXX-XXXX-XXXX:":t==="3"?"Your Telebirr Escrow Balance is 48,200 ETB. Payout available at local agent.":t==="4"?"Agent Kassahun Tolessa (+251988776655) has been assigned to visit your farm within 48 hours.":`Farmer-to-Market: Command received. SMS confirmation dispatched to ${e}.`}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchSummaries(),this.fetchVerificationQueue()]),this.notify()}}const g=new Ot,q={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLegalDocuments:"Contracts & Tax Invoices",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Farm Details",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",viewContractBtn:"View Sales Contract",viewInvoiceBtn:"Download Tax Invoice",viewWaybillBtn:"Transport Waybill (Manifest)",viewArbitrationBtn:"Arbitration Determination",printDocument:"Print / Save PDF",closeDocument:"Close Document",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Tax Statements (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",withholdingTaxReported:"Withholding Tax (2% Goods)",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release & Tax Log",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Cargo Manifest",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Governance, Law & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",statVatRemitted:"VAT on Platform Fees (15%)",statWithholding:"Withholding Tax (2%)",resolveDisputeTitle:"Escrow Legal Arbitration Console",disputeEvidence:"Evidence & Inspection Report",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Tiered KYC & Trade Registry Queue",approveKycBtn:"Approve Identity & License",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",roleAgent:"Field Agent",navAgentPortal:"Field Agent Portal",agentPortalTitle:"Community Field Agent Onboarding Console",agentOnboardFarmerBtn:"Register Smallholder Farmer",agentRosterTitle:"Farmers Onboarded in Your Woreda",agentCommissionEarned:"Agent Commission",agentSyncStatus:"Sync Status",agentRegisterSuccess:"Farmer registered and documents queued for verification!",verifyAccountTitle:"Account Identity & Regulatory Verification",verificationStatusLabel:"Verification Status",statusPendingSubmission:"Pending Submission",statusUnderReview:"Under Review by Admin",statusApproved:"Fully Approved & Compliant",statusRejected:"Verification Rejected",verificationBannerText:"Complete your Fayda ID & TIN verification to unlock full marketplace selling and bulk purchasing privileges.",startVerificationBtn:"Verify Account Now",faydaIdLabel:"Fayda National ID Number (FAN)",tinNumberLabel:"10-Digit Taxpayer ID (TIN)",kebeleIdLabel:"Kebele Resident / Farm ID",uploadFrontPhoto:"Upload Front ID Photo",uploadBackPhoto:"Upload Back ID Photo",rejectionReasonLabel:"Rejection Reason",resubmitDocsBtn:"Update & Resubmit Documents",sideBySideInspectionTitle:"Side-by-Side Document Inspection",approveVerificationAction:"Approve Identity & Tax License",rejectVerificationAction:"Reject & Request Clarification",sendSmsNoticeToggle:"Notify user immediately via bilingual SMS",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLegalDocuments:"ውሎች እና የግብር ደረሰኞች",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"የእርሻ ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",viewContractBtn:"የግብይት ውል ይመልከቱ",viewInvoiceBtn:"የግብር እና ሽያጭ ደረሰኝ (e-VAT)",viewWaybillBtn:"የጭነት ማጓጓዣ ሰነድ (Waybill)",viewArbitrationBtn:"የሽምግልና ውሳኔ ሰነድ",printDocument:"አትም / ፒዲኤፍ አስቀምጥ",closeDocument:"ሰነዱን ዝጋ",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የግብር መግለጫ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",withholdingTaxReported:"የተያዘ ግብር (2% Withholding)",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ እና የደረሰኝ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር፣ ህጋዊነት እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",statVatRemitted:"የተሰበሰበ የተጨማሪ እሴት ታክስ (15% VAT)",statWithholding:"የተያዘ ግብር (2% Withholding)",resolveDisputeTitle:"የህጋዊ ቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና የፍተሻ ሪፖርት",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የተጠቃሚዎች ህጋዊነት እና የንግድ ፈቃድ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ እና ፈቃድ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",roleAgent:"የግብርና ድጋፍ ኤጀንት",navAgentPortal:"የኤጀንት ክፍል",agentPortalTitle:"የማህበረሰብ ግብርና ኤጀንቶች የገበሬዎች መመዝገቢያ ክፍል",agentOnboardFarmerBtn:"አዲስ አርሶ አደር መዝግብ",agentRosterTitle:"በእርስዎ ወረዳ የተመዘገቡ አርሶ አደሮች",agentCommissionEarned:"የኤጀንት ክፍያ",agentSyncStatus:"የዳታ ሁኔታ",agentRegisterSuccess:"አርሶ አደሩ ተመዝግቧል! ሰነዱ ለማረጋገጫ ተልኳል።",verifyAccountTitle:"የመለያ ህጋዊነት እና የታክስ ማረጋገጫ",verificationStatusLabel:"የማረጋገጫ ሁኔታ",statusPendingSubmission:"ሰነድ አልገባም",statusUnderReview:"በአድሚን በመገምገም ላይ",statusApproved:"የተረጋገጠ እና የጸደቀ",statusRejected:"ውድቅ ተደርጓል",verificationBannerText:"ምርቶችን በቀጥታ ለመሸጥ እና ክፍያ ለመቀበል የፋይዳ (Fayda) መታወቂያ እና የታክስ መለያ (TIN) ያረጋግጡ።",startVerificationBtn:"መለያዎን አሁን ያረጋግጡ",faydaIdLabel:"የፋይዳ ብሔራዊ መታወቂያ ቁጥር (FAN)",tinNumberLabel:"የ10-ዲጂት የግብር ከፋይ መለያ (TIN)",kebeleIdLabel:"የቀበሌ ነዋሪነት / የእርሻ ማረጋገጫ",uploadFrontPhoto:"የመታወቂያ የፊት ገጽ ፎቶ",uploadBackPhoto:"የመታወቂያ የጀርባ ገጽ ፎቶ",rejectionReasonLabel:"ውድቅ የተደረገበት ምክንያት",resubmitDocsBtn:"ሰነዶችን አስተካክለው እንደገና ያስገቡ",sideBySideInspectionTitle:"የሰነዶች ጎን ለጎን ፍተሻ እና ማረጋገጫ",approveVerificationAction:"መታወቂያ እና የግብር ሰነድ አጽድቅ",rejectVerificationAction:"ውድቅ አድርግ / ማብራሪያ ጠይቅ",sendSmsNoticeToggle:"ለተጠቃሚው ወዲያውኑ በኤስኤምኤስ አሳውቅ",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function Ft(i,e,t,r,s,a,l=""){const o=q[i],n=s.reduce((w,_)=>w+_.qtyKg,0),c={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},agent:{label:"Field Extension Agent",labelAm:"የግብርና ድጋፍ ኤጀንት",color:"bg-teal-100 text-teal-900 border-teal-300",icon:"fa-users-gear"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"}},m=e?c[e.role]||c.buyer:null;return`
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
              <span>${i==="en"?"አማርኛ":"English"}</span>
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
                <span class="text-xl font-black tracking-tight text-slate-900 ${i==="am"?"lang-am":""}">
                  ${o.brandName}
                </span>
                <span class="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-200">
                  ET
                </span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium ${i==="am"?"lang-am":""}">
                ${o.brandSubtitle}
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
                value="${l}" 
                oninput="window.setSearchQuery(this.value)"
                placeholder="${o.searchPlaceholder}"
                class="w-full py-2.5 pr-3 text-sm focus:outline-none bg-transparent placeholder:text-slate-400 font-medium ${i==="am"?"lang-am":""}" />
              
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
                      ${i==="am"?"ሰላም,":"Hello,"}
                    </span>
                    <span class="text-xs font-black text-slate-900 block truncate max-w-[120px] leading-tight ${i==="am"?"lang-am":""}">
                      ${i==="am"&&e.nameAm?e.nameAm:e.name}
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
                        <span class="text-sm font-black text-slate-900 truncate ${i==="am"?"lang-am":""}">
                          ${i==="am"&&e.nameAm?e.nameAm:e.name}
                        </span>
                        <i class="fa-solid fa-circle-check text-emerald-600 text-xs" title="Verified Account"></i>
                      </div>
                      <span class="text-[11px] font-semibold text-slate-500 block truncate">${e.phone}</span>
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${(m==null?void 0:m.color)||"bg-slate-100 text-slate-800"}">
                        ${i==="am"?m==null?void 0:m.labelAm:m==null?void 0:m.label}
                      </span>
                    </div>
                  </div>

                  <!-- Verification Status Banner in Dropdown -->
                  <div class="p-2.5 rounded-xl ${e.verificationStatus==="Approved"||e.verified?"bg-emerald-50 border border-emerald-200":e.verificationStatus==="UnderReview"?"bg-amber-50 border border-amber-200":"bg-red-50 border border-red-200"} text-xs">
                    <div class="flex items-center justify-between">
                      <span class="font-bold ${e.verificationStatus==="Approved"||e.verified?"text-emerald-900":e.verificationStatus==="UnderReview"?"text-amber-900":"text-red-900"}">
                        ${e.verificationStatus==="Approved"||e.verified?"🛡️ "+(i==="am"?"የተረጋገጠ መለያ":"Fayda Verified"):e.verificationStatus==="UnderReview"?"⏳ "+(i==="am"?"በመገምገም ላይ":"Under Review"):"⚠️ "+(i==="am"?"ማረጋገጫ ያስፈልጋል":"Unverified Account")}
                      </span>
                      <button onclick="window.openVerificationWizard()" class="text-[10px] font-bold underline cursor-pointer text-emerald-800">
                        ${i==="am"?"ይመልከቱ":"Manage"}
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

                    <button onclick="window.openVerificationWizard();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-id-card text-emerald-600"></i> ${i==="am"?"የፋይዳ / የታክስ ማረጋገጫ":"Fayda & TIN Verification"}
                    </button>

                    ${e.role==="farmer"?`
                      <button onclick="window.toggleCreateListingModal();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-plus-circle text-emerald-600"></i> Post New Produce Listing
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
                      <span>${i==="am"?"ከመለያ ውጣ (Sign Out)":"Sign Out"}</span>
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

            <!-- Notifications Bell -->
            <button onclick="window.openNotificationsModal()" 
              class="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer"
              title="SMS Alerts & Notifications">
              <i class="fa-regular fa-bell text-base"></i>
              ${a>0?`
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                  ${a}
                </span>`:""}
            </button>

            <!-- Bulk Cart Button -->
            <button onclick="window.toggleCart()" 
              class="btn-primary text-xs py-2 px-3 sm:px-4 flex items-center gap-2 cursor-pointer shadow-md">
              <i class="fa-solid fa-cart-shopping text-sm"></i>
              <span class="font-bold hidden sm:inline ${i==="am"?"lang-am":""}">${o.navCart}</span>
              <span class="bg-amber-400 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                ${n>0?`${n} kg`:"0"}
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
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${r==="marketplace"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-store"></i> ${o.navMarketplace}
            </button>

            ${t&&(e==null?void 0:e.role)==="farmer"?`
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${r==="farmer"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-tractor"></i> ${o.navFarmerPortal}
              </button>
              <button onclick="window.toggleCreateListingModal()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${o.postNewListing}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="driver"?`
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${r==="driver"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-truck"></i> ${o.navDriverPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="agent"?`
              <button onclick="window.navigateTab('agent')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${r==="agent"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-users-gear text-teal-400"></i> ${o.navAgentPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="admin"?`
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${r==="admin"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-sliders"></i> ${o.navAdminPortal}
              </button>
            `:""}

            ${!t||(e==null?void 0:e.role)==="buyer"?`
              <button onclick="window.toggleCart()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-200/70 text-slate-700 ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Wholesale Bulk Cart (${n} kg)
              </button>
            `:""}

          </div>

          <div class="hidden lg:flex items-center gap-3 text-slate-500 text-[11px]">
            <span class="flex items-center gap-1"><i class="fa-solid fa-seedling text-emerald-600"></i> 100% Ethiopian Farm Sourced</span>
            <span>·</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-bolt text-blue-600"></i> Telebirr Escrow Automated</span>
          </div>

        </div>
      </div>

    </header>
  `}function jt(i,e,t,r,s,a,l,o,n,c=null,m=0,w="All",_="All",O=!1,j=!1,f="marketplace",R=g.getStandingOrders(),Z=g.getOrders("buyer")){const v=q[i],se=[{key:"All",label:v.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:v.catVegetables,icon:"fa-carrot"},{key:"Grains",label:v.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:v.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:v.catCoffee,icon:"fa-mug-hot"}],ee=a.reduce((S,H)=>S+H.qtyKg*H.listing.pricePerKg,0),ae=Math.round(ee*.9),ie=Math.round(ee*.05),ce=ee-ae-ie,pe=a.reduce((S,H)=>{const W=H.listing.farmerId;return S[W]||(S[W]={farmerName:H.listing.farmerName,farmerRegion:H.listing.region,items:[]}),S[W].items.push(H),S},{});return`
    <div class="space-y-8 pb-20">
      
      <!-- E-Commerce Hero Promotional Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>15M+ Ethiopian Smallholder Farmers Direct Network</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${i==="am"?"lang-am":""}">
              ${v.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${i==="am"?"lang-am":""}">
              ${v.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> Browse Farm Deals
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${v.navOrders} & Invoices (${Z.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${v.standingOrdersTitle}
              </button>
            </div>
          </div>

          <!-- Hero Promo Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3">
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
      </section>

      <!-- Sub-Tab Switcher: Marketplace vs My Orders & Tax Invoices vs Standing Orders -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center gap-2 overflow-x-auto">
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${f==="marketplace"?"active":""}">
            <i class="fa-solid fa-store"></i>
            <span>${i==="am"?"የጅምላ ገበያ":"Wholesale Marketplace"}</span>
          </button>
          <button onclick="window.setBuyerSubTab('orders')" class="cat-pill ${f==="orders"?"active":""}">
            <i class="fa-solid fa-receipt"></i>
            <span>${v.navOrders} & ${v.navLegalDocuments} (${Z.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${f==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${v.standingOrdersTitle} (${R.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${f==="standing_orders"?Wt(i,R):f==="orders"?Vt(i,Z):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${se.map(S=>`
            <button onclick="window.setCategory('${S.key}')" 
              class="cat-pill ${t===S.key?"active":""} ${i==="am"?"lang-am":""}">
              <i class="fa-solid ${S.icon}"></i>
              <span>${S.label}</span>
            </button>
          `).join("")}
        </div>

        <!-- Filter Controls Bar -->
        <div class="glass-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <!-- PostGIS Geo-Proximity Radius Slider -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${v.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0,25,50,100].map(S=>`
                <button onclick="window.setMaxDistanceKm(${S})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${m===S?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${S===0?"All":S+" km"}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${v.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${w==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${w==="Grade 1"?"selected":""}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${w==="Grade 2"?"selected":""}>Grade 2 (Value)</option>
              <option value="Export Grade" ${w==="Export Grade"?"selected":""}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${v.filterRipeness}:</span>
            <select onchange="window.setFilterRipeness(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${_==="All"?"selected":""}>All Ripeness</option>
              <option value="Ready Today" ${_==="Ready Today"?"selected":""}>Ready Today</option>
              <option value="Semi-Ripe" ${_==="Semi-Ripe"?"selected":""}>Semi-Ripe</option>
              <option value="Green / Storable" ${_==="Green / Storable"?"selected":""}>Green / Storable</option>
            </select>
          </div>

          <!-- Toggle Flags -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${O?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${v.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${j?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${v.filterAdvance}</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Produce Marketplace Grid -->
      <section class="space-y-4">
        
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
            <i class="fa-solid fa-boxes-packing text-emerald-600 mr-2"></i> ${v.catAll} (${e.length})
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
            ${e.map(S=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between">
                
                <div>
                  <div class="h-48 w-full relative overflow-hidden group">
                    <img src="${S.photos[0]}" alt="${S.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                    <div class="absolute top-3 left-3 flex flex-col gap-1">
                      ${S.isAdvanceHarvest?`
                        <span class="advance-pill shadow-md">
                          <i class="fa-solid fa-calendar-check text-emerald-700"></i> Advance Harvest
                        </span>
                      `:""}
                      ${S.isOrganic?`
                        <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                          Organic Certified
                        </span>
                      `:""}
                    </div>

                    <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                      ${S.pricePerKg} ETB<span class="text-[10px] font-normal text-slate-300">/kg</span>
                    </span>

                    ${S.distanceKm?`
                      <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${S.distanceKm} km ${v.farmDistance}
                      </span>
                    `:""}
                  </div>

                  <div class="p-5 space-y-3">
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span class="text-amber-700 font-bold"><i class="fa-solid fa-award mr-1"></i> ${S.grade||"Grade 1"}</span>
                      <span class="text-slate-600 font-medium">${S.ripeness||"Ready Today"}</span>
                    </div>

                    <h3 class="font-extrabold text-slate-900 text-lg leading-snug ${i==="am"?"lang-am":""}">
                      ${i==="am"&&S.nameAm?S.nameAm:S.productName}
                    </h3>

                    <!-- Farmer Credibility & Trust Badges -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800"><i class="fa-solid fa-user-check text-emerald-600 mr-1"></i> ${S.farmerName}</span>
                        <span class="text-amber-600 font-extrabold"><i class="fa-solid fa-star mr-1"></i> ${S.farmerRating}</span>
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                        <span><i class="fa-solid fa-location-dot text-emerald-600"></i> ${S.region}</span>
                        <span>·</span>
                        <span>${S.repeatBuyerCount||18} Repeat Wholesalers</span>
                      </div>
                    </div>

                    ${S.voiceNoteTranscript?`
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                        <i class="fa-solid fa-microphone-lines text-emerald-700 text-sm mt-0.5"></i>
                        <span class="italic leading-tight">"${S.voiceNoteTranscript}"</span>
                      </div>
                    `:""}

                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Available: <strong class="font-bold text-slate-900">${S.qtyKg.toLocaleString()} kg</strong></span>
                      <span>Min Order: <strong class="font-bold text-slate-900">${S.minOrderKg} kg</strong></span>
                    </div>

                  </div>
                </div>

                <!-- Add to Bulk Cart Button -->
                <div class="p-5 pt-0">
                  <button onclick="window.addToCart('${S.id}')" class="btn-primary w-full py-2.5 text-xs font-extrabold shadow-sm cursor-pointer">
                    <i class="fa-solid fa-cart-plus mr-1.5"></i> ${v.addToCart}
                  </button>
                </div>

              </div>
            `).join("")}
          </div>
        `}

      </section>
      `}

      <!-- Bulk Cart Drawer Modal -->
      ${l?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCart()">
          <div class="modal-content max-w-xl p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${v.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer checkout with Telebirr Escrow</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${a.length===0?`
              <div class="p-8 text-center text-slate-500 text-xs">
                <p>${v.cartEmpty}</p>
              </div>
            `:`
              <div class="space-y-4 max-h-80 overflow-y-auto pr-1">
                ${Object.entries(pe).map(([S,H])=>`
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                      <span><i class="fa-solid fa-seedling text-emerald-600 mr-1"></i> Farm Source: ${H.farmerName} (${H.farmerRegion})</span>
                      <span class="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Direct Gate Payout</span>
                    </div>

                    ${H.items.map(W=>`
                      <div class="flex items-center justify-between gap-3 text-xs">
                        <div>
                          <h4 class="font-bold text-slate-900">${W.listing.productName}</h4>
                          <span class="text-slate-500">${W.listing.pricePerKg} ETB / kg</span>
                        </div>

                        <div class="flex items-center gap-3">
                          <div class="flex items-center gap-1">
                            <button onclick="window.updateCartQty('${W.listing.id}', ${W.qtyKg-10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">-</button>
                            <span class="w-12 text-center font-bold text-slate-800">${W.qtyKg} kg</span>
                            <button onclick="window.updateCartQty('${W.listing.id}', ${W.qtyKg+10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">+</button>
                          </div>
                          <span class="font-extrabold text-slate-900 w-16 text-right">${(W.qtyKg*W.listing.pricePerKg).toLocaleString()} ETB</span>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `).join("")}
              </div>

              <!-- Price Breakdown (90% Farmer / 5% Driver / 5% Platform) -->
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
                <div class="flex justify-between text-slate-600">
                  <span>${v.farmerShare}:</span>
                  <strong class="text-emerald-900">${ae.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${v.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${ie.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${v.platformFee}:</span>
                  <strong class="text-slate-800">${ce.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${v.totalAmount}:</span>
                  <span class="text-emerald-800">${ee.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${ee})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
                <i class="fa-solid fa-shield-halved mr-1.5"></i> ${v.checkoutTelebirr}
              </button>
            `}

          </div>
        </div>
      `:""}

      <!-- Telebirr Escrow Payment Modal -->
      ${n!=null&&n.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeTelebirrModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                <i class="fa-solid fa-building-columns"></i>
              </div>
              <h3 class="text-xl font-extrabold text-slate-900">${v.telebirrTitle}</h3>
              <p class="text-xs text-slate-500">${v.telebirrDesc}</p>
            </div>

            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <span class="text-xs font-bold text-blue-900">${v.totalAmount}</span>
              <div class="text-3xl font-black text-blue-950">${n.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <span class="text-[11px] text-blue-800 font-semibold block">${v.escrowGuarantee}</span>
            </div>

            <form onsubmit="window.handleTelebirrSubmit(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${v.enterPhone}</label>
                <input type="text" id="telePhone" required value="+251955667788" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${v.enterPin}</label>
                <input type="password" id="telePin" required value="1234" maxlength="4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold tracking-widest text-center focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div class="pt-2">
                <button type="submit" class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition-colors cursor-pointer">
                  <i class="fa-solid fa-lock mr-1.5"></i> ${v.payNow}
                </button>
              </div>
            </form>

          </div>
        </div>
      `:""}

      <!-- Dispute Filing Modal -->
      ${c!=null&&c.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-5">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${v.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${c.order.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${c.order.id}')" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">${v.disputeReasonLabel}</label>
                <textarea id="disputeReasonInput" required rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Describe produce defects, transit spoilage, or weight discrepancy..."></textarea>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">${v.disputePhotoLabel}</label>
                <input type="text" id="disputePhotoUrl" value="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700">${v.refundPercentLabel}</label>
                  <span id="refundPercentVal" class="font-bold text-red-700">50% Partial Refund</span>
                </div>
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${c.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
                <i class="fa-solid fa-lock text-red-700 mr-1"></i>
                Submitting this dispute immediately locks the Telebirr Escrow and assigns case to Marketplace Admin for binding arbitration.
              </div>

              <button type="submit" class="btn-secondary w-full py-3 text-xs text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                <i class="fa-solid fa-gavel"></i> ${v.submitDisputeBtn}
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Live Order SignalR Tracking & Legal Invoicing Modal -->
      ${o?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${v.orderTracking}</h3>
                  <p class="text-xs text-slate-500 font-medium">Order ID: #${o.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeOrderModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Order Snapshot -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h4 class="font-bold text-slate-900 ${i==="am"?"lang-am":""}">${o.productName}</h4>
                <p class="text-xs text-slate-500">${o.qtyKg} kg · Farmer: ${o.farmerName}</p>
              </div>
              <div class="text-right">
                <span class="text-base font-extrabold text-emerald-800">${o.totalEtb.toLocaleString()} ETB</span>
                <span class="escrow-pill block text-[10px] mt-0.5">
                  ${o.escrowHeld?"Escrow Held":"Funds Released"}
                </span>
              </div>
            </div>

            <!-- Legal Documents Quick Action Bar -->
            <div class="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200">
              <button onclick="window.openInvoiceModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-emerald-800 hover:bg-emerald-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${v.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${v.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${v.viewWaybillBtn}
              </button>

              ${o.status==="disputed"?`
                <button onclick="window.openArbitrationModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
                  <i class="fa-solid fa-scale-balanced mr-1 text-red-600"></i> ${v.viewArbitrationBtn}
                </button>
              `:""}
            </div>

            <!-- Timeline -->
            <div class="space-y-4 py-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Order Placed & Escrow Locked</h5>
                  <p class="text-xs text-slate-500">Telebirr transaction verified (${o.paymentRef||"TB-20260819"})</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["confirmed","picked_up","delivered"].includes(o.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-tractor"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Farmer Confirmation</h5>
                  <p class="text-xs text-slate-500">${["confirmed","picked_up","delivered"].includes(o.status)?"Produce harvested and packed at farm":"Awaiting farmer acceptance via SMS/App"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["picked_up","delivered"].includes(o.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-truck"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Driver Pickup & Transit</h5>
                  <p class="text-xs text-slate-500">${["picked_up","delivered"].includes(o.status)?`Isuzu Truck with Dawit Kebede in transit to ${o.deliveryAddress||"Depot"}`:"Driver assignment in progress"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${o.status==="delivered"?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Delivery Confirmation & Escrow Release</h5>
                  <p class="text-xs text-slate-500">${o.status==="delivered"?"90% released to farmer, 5% to driver":"Confirm on receipt to release funds"}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 border-t border-slate-200 flex items-center gap-3">
              ${o.status!=="delivered"&&o.status!=="disputed"?`
                <button onclick="window.confirmDelivery('${o.id}')" class="btn-primary flex-1 py-3 text-xs cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i> ${v.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${o.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${v.disputeBtn}
                </button>
              `:o.status==="disputed"?`
                <div class="w-full p-3 rounded-xl bg-red-100 text-red-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-triangle-exclamation text-red-700 mr-1"></i> Dispute Active: Escrow Frozen Under Admin Arbitration
                </div>
              `:`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                  <i class="fa-solid fa-check-double text-emerald-700"></i> Delivery Completed & Escrow Released to Farmer
                </div>
              `}
            </div>

          </div>
        </div>
      `:""}

    </div>
  `}function Vt(i,e){const t=q[i];return`
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
            <i class="fa-solid fa-receipt text-emerald-600 mr-2"></i> ${t.navOrders} & ${t.navLegalDocuments}
          </h2>
          <p class="text-xs text-slate-500 font-medium">View commercial tax invoices, legal commodity contracts, and transport waybills.</p>
        </div>
        <span class="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
          ${e.length} Verified Purchases
        </span>
      </div>

      ${e.length===0?`
        <div class="glass-card p-12 text-center text-slate-500 text-xs">
          <i class="fa-solid fa-basket-shopping text-3xl mb-2 text-slate-300"></i>
          <p>No past purchases yet. Browse the wholesale marketplace to order farm-fresh produce.</p>
        </div>
      `:`
        <div class="space-y-3">
          ${e.map(r=>`
            <div class="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="badge-status status-${r.status}">${r.status.toUpperCase()}</span>
                  <span class="font-bold text-slate-900 text-sm">${r.productName}</span>
                  <span class="text-xs text-slate-500">(${r.qtyKg} kg @ ${r.pricePerKg} ETB)</span>
                </div>
                <p class="text-xs text-slate-600">
                  Farmer: <strong class="text-slate-800">${r.farmerName}</strong> · Telebirr Total: <strong class="text-emerald-800">${r.totalEtb.toLocaleString()} ETB</strong>
                </p>
                <div class="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>INV: ${r.invoiceNumber||"ET-INV-001"}</span>
                  <span>·</span>
                  <span>CONTR: ${r.contractNumber||"AGR-ET-001"}</span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button onclick="window.openInvoiceModal('${r.id}')" class="btn-secondary text-xs py-1.5 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer">
                  <i class="fa-solid fa-file-invoice mr-1"></i> ${t.viewInvoiceBtn}
                </button>
                <button onclick="window.openContractModal('${r.id}')" class="btn-secondary text-xs py-1.5 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                  <i class="fa-solid fa-file-contract mr-1"></i> ${t.viewContractBtn}
                </button>
                <button onclick="window.openWaybillModal('${r.id}')" class="btn-secondary text-xs py-1.5 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                  <i class="fa-solid fa-truck-fast mr-1"></i> ${t.viewWaybillBtn}
                </button>
                <button onclick="window.viewOrder('${r.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                  <i class="fa-solid fa-satellite-dish mr-1"></i> Track
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      `}
    </div>
  `}function Wt(i,e){const t=q[i];return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
            <i class="fa-solid fa-repeat text-emerald-600 mr-2"></i> ${t.standingOrdersTitle}
          </h2>
          <p class="text-xs text-slate-500 font-medium">Automatic scheduled produce deliveries directly from Ethiopian smallholder farms.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${e.map(r=>`
          <div class="glass-card p-5 space-y-4 border-l-4 ${r.active?"border-emerald-600":"border-slate-300"}">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${r.active?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-600"}">
                  ${r.frequency} Scheduled
                </span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">${i==="am"&&r.productNameAm?r.productNameAm:r.productName}</h3>
                <p class="text-xs text-slate-500">Source: <strong class="text-slate-800">${r.farmerName}</strong></p>
              </div>

              <div class="text-right">
                <span class="text-base font-black text-emerald-800">${(r.qtyKg*r.pricePerKg).toLocaleString()} ETB</span>
                <span class="text-[11px] text-slate-400 block">${r.qtyKg} kg @ ${r.pricePerKg} ETB/kg</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span><i class="fa-solid fa-calendar-check text-emerald-600 mr-1.5"></i> Next Run: <strong class="text-slate-900">${r.nextDeliveryDate}</strong></span>
              <button onclick="window.toggleStandingOrderStatus('${r.id}')" class="text-xs font-bold ${r.active?"text-amber-700 hover:text-amber-800":"text-emerald-700 hover:text-emerald-800"} cursor-pointer">
                ${r.active?"Pause Order":"Resume Order"}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function Ut(i,e,t,r,s,a="listings",l=g.getPriceBenchmarks(),o=g.getCurrentUser()){const n=q[i];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(o==null?void 0:o.region)||"Oromia (Bishoftu)"}
            </span>
            ${g.getVerificationStatus()==="Approved"?`
              <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
                <i class="fa-solid fa-circle-check text-emerald-600"></i> ${n.verifiedFayda} ${o!=null&&o.kycDocumentNumber?`(${o.kycDocumentNumber})`:""}
              </span>
              ${o!=null&&o.tinNumber?`
                <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
                  <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${o.tinNumber}
                </span>
              `:""}
            `:g.getVerificationStatus()==="UnderReview"?`
              <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
                <i class="fa-solid fa-hourglass-half text-amber-600"></i> ${i==="am"?"ማረጋገጫ በመገምገም ላይ":"Verification Under Review"}
              </span>
            `:g.getVerificationStatus()==="Rejected"?`
              <span class="trust-badge text-red-800 bg-red-50 border-red-200">
                <i class="fa-solid fa-circle-xmark text-red-600"></i> ${i==="am"?"ማረጋገጫ አልጸደቀም":"Verification Rejected"}
              </span>
            `:`
              <span class="trust-badge text-slate-700 bg-slate-100 border-slate-200">
                <i class="fa-solid fa-shield-halved text-slate-500"></i> ${i==="am"?"ያልተረጋገጠ መለያ":"Unverified Account"}
              </span>
            `}
            <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
              <i class="fa-solid fa-users text-purple-600"></i> ${(o==null?void 0:o.repeatBuyerCount)||0} ${n.repeatBuyers}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> ${(o==null?void 0:o.onTimeDeliveryRate)||100}% ${n.onTimeRate}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">
            ${n.farmerPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.toggleFarmerTab('sms')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-comment-sms text-emerald-600"></i>
            <span class="${i==="am"?"lang-am":""}">${n.navSmsConsole}</span>
          </button>

          <button onclick="window.toggleFarmerTab('wallet')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-wallet text-amber-600"></i>
            <span class="${i==="am"?"lang-am":""}">${n.navWallet}</span>
          </button>

          <button onclick="window.toggleCreateListingModal()" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer">
            <i class="fa-solid fa-plus-circle"></i>
            <span class="${i==="am"?"lang-am":""}">${n.postNewListing}</span>
          </button>
        </div>
      </div>

      <!-- Verification Action Banner -->
      ${g.getVerificationStatus()!=="Approved"?`
        <div class="p-4 rounded-2xl ${g.getVerificationStatus()==="UnderReview"?"bg-amber-50 border border-amber-200":g.getVerificationStatus()==="Rejected"?"bg-red-50 border border-red-200":"bg-emerald-50 border border-emerald-200"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${g.getVerificationStatus()==="UnderReview"?"⏳":g.getVerificationStatus()==="Rejected"?"❌":"🛡️"}</span>
            <div>
              <h4 class="text-sm font-bold ${g.getVerificationStatus()==="UnderReview"?"text-amber-900":g.getVerificationStatus()==="Rejected"?"text-red-900":"text-emerald-900"}">
                ${g.getVerificationStatus()==="UnderReview"?i==="am"?"ሰነዶችዎ በአድሚን በመገምገም ላይ ናቸው":"Fayda ID & TIN Verification Under Review":g.getVerificationStatus()==="Rejected"?i==="am"?"ማረጋገጫዎ አልጸደቀም፤ እባክዎ እንደገና ያስገቡ":"Verification Rejected - Action Required":i==="am"?"መለያዎን በፋይዳ (Fayda) እና በTIN ያረጋግጡ":"Complete Fayda ID & Taxpayer TIN Verification"}
              </h4>
              <p class="text-xs ${g.getVerificationStatus()==="UnderReview"?"text-amber-700":g.getVerificationStatus()==="Rejected"?"text-red-700":"text-emerald-700"}">
                ${o!=null&&o.rejectionReason?`${n.rejectionReasonLabel}: ${o.rejectionReason}`:n.verificationBannerText}
              </p>
            </div>
          </div>
          <button onclick="window.openVerificationWizard()" class="btn-primary text-xs py-2 px-4 shrink-0 shadow-xs cursor-pointer ${g.getVerificationStatus()==="UnderReview"?"bg-amber-700 hover:bg-amber-800":g.getVerificationStatus()==="Rejected"?"bg-red-700 hover:bg-red-800":"bg-emerald-700 hover:bg-emerald-800"}">
            <i class="fa-solid fa-id-card mr-1"></i> ${g.getVerificationStatus()==="Rejected"?n.resubmitDocsBtn:n.startVerificationBtn}
          </button>
        </div>
      `:""}

      <!-- Farmer Portal Navigation Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onclick="window.toggleFarmerTab('listings')" class="cat-pill ${a==="listings"?"active":""}">
          <i class="fa-solid fa-box-open"></i>
          <span>${i==="am"?"ምርቶች እና ትዕዛዞች":"Produce & Orders"}</span>
        </button>
        <button onclick="window.toggleFarmerTab('wallet')" class="cat-pill ${a==="wallet"?"active":""}">
          <i class="fa-solid fa-wallet"></i>
          <span>${n.walletTitle}</span>
        </button>
        <button onclick="window.toggleFarmerTab('sms')" class="cat-pill ${a==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${n.smsConsoleTitle}</span>
        </button>
      </div>

      ${a==="wallet"?Ht(i,r,t,o):a==="sms"?Kt(i):`

      <!-- Price Benchmark Advisory Banner -->
      <section class="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-lg space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-sm text-white ${i==="am"?"lang-am":""}">${n.priceBenchmarkTitle}</h3>
              <p class="text-[11px] text-emerald-200 font-medium">${n.benchmarkDesc}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-white/10 text-emerald-300 px-2.5 py-1 rounded-full border border-white/10">
            <i class="fa-solid fa-clock mr-1"></i> Live Merkato & Sholla Feeds
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          ${l.map(c=>`
            <div class="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div class="text-[11px] font-bold text-slate-300 truncate">${i==="am"?c.cropNameAm:c.cropName}</div>
              <div class="text-base font-black text-white">${c.avgPriceEtb} <span class="text-[10px] font-bold text-emerald-300">ETB/kg</span></div>
              <div class="flex items-center justify-between text-[10px] text-slate-400">
                <span>Range: ${c.minPriceEtb}-${c.maxPriceEtb}</span>
                <span class="${c.trend==="Up"?"text-emerald-400":c.trend==="Down"?"text-amber-300":"text-slate-300"} font-bold">
                  <i class="fa-solid fa-arrow-trend-${c.trend==="Up"?"up":c.trend==="Down"?"down":"flat"}"></i>
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
            <span>${n.walletBalance}</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr Payout</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${((o==null?void 0:o.walletBalanceEtb)||48200).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> Ready for instant withdrawal
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${n.pendingEscrow}</span>
            <span class="text-xs text-amber-600 font-bold">${r.pendingOrdersCount} Active</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${r.pendingEscrowEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-lock"></i> Protected in Telebirr Escrow
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${n.lifetimePayout}</span>
            <span class="text-xs text-blue-600 font-bold">${r.completedOrdersCount} Delivered</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${r.releasedEtb.toLocaleString()} <span class="text-sm font-bold text-slate-500">ETB</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">
            <i class="fa-solid fa-hand-holding-dollar"></i> 90% direct produce value
          </p>
        </div>

      </section>

      <!-- Incoming Orders with Full Legal & Tax Receipts -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
            <i class="fa-solid fa-clipboard-list text-emerald-600 mr-2"></i> ${n.incomingOrders}
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
            ${t.map(c=>`
              <div class="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors">
                
                <div class="space-y-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="badge-status status-${c.status}">${c.status.toUpperCase()}</span>
                    <span class="text-xs font-bold text-slate-900">${c.productName}</span>
                    <span class="text-xs text-slate-500">(${c.qtyKg} kg @ ${c.pricePerKg} ETB)</span>
                    <span class="text-[10px] font-mono text-slate-400">${c.contractNumber||"AGR-ET-001"}</span>
                  </div>

                  <p class="text-xs text-slate-600">
                    Buyer: <strong class="text-slate-800">${c.buyerName}</strong> · Telebirr Escrow: <strong class="text-emerald-700">${c.totalEtb.toLocaleString()} ETB</strong> (Your Net 90%: <strong class="text-emerald-800 font-bold">${c.farmerCut.toLocaleString()} ETB</strong>)
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.openContractModal('${c.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer" title="View Digital Sales Contract">
                    <i class="fa-solid fa-file-contract mr-1"></i> ${n.viewContractBtn}
                  </button>

                  <button onclick="window.openInvoiceModal('${c.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer" title="Download Tax Exemption Receipt">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${n.viewInvoiceBtn}
                  </button>

                  <button onclick="window.openWaybillModal('${c.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer" title="View Transport Waybill">
                    <i class="fa-solid fa-truck-fast mr-1"></i> ${n.viewWaybillBtn}
                  </button>

                  ${c.status==="pending"?`
                    <button onclick="window.confirmFarmerOrder('${c.id}')" 
                      class="btn-primary text-xs py-1.5 px-4 shadow-sm cursor-pointer">
                      <i class="fa-solid fa-check mr-1"></i>
                      <span class="${i==="am"?"lang-am":""}">${n.confirmOrderAction}</span>
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
        <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
          <i class="fa-solid fa-box-open text-emerald-600 mr-2"></i> ${n.myActiveListings}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${e.map(c=>`
            <div class="glass-card overflow-hidden">
              <div class="h-44 w-full relative">
                <img src="${c.photos[0]}" class="w-full h-full object-cover" />
                
                <div class="absolute top-3 left-3 flex flex-col gap-1">
                  ${c.isAdvanceHarvest?`
                    <span class="advance-pill shadow-xs">
                      <i class="fa-solid fa-calendar-days text-emerald-700"></i> Advance Harvest
                    </span>
                  `:""}
                  ${c.isOrganic?`
                    <span class="bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      Organic
                    </span>
                  `:""}
                </div>

                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs">
                  ${c.status.toUpperCase()}
                </span>
              </div>
              <div class="p-4 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span class="text-amber-600 font-bold"><i class="fa-solid fa-certificate mr-1"></i> ${c.grade||"Grade 1"}</span>
                  <span>${c.ripeness||"Ready Today"}</span>
                </div>

                <h3 class="font-bold text-slate-900 text-base ${i==="am"?"lang-am":""}">
                  ${i==="am"&&c.nameAm?c.nameAm:c.productName}
                </h3>

                ${c.voiceNoteTranscript?`
                  <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                    <i class="fa-solid fa-microphone text-emerald-700 mt-0.5"></i>
                    <span class="italic truncate">"${c.voiceNoteTranscript}"</span>
                  </div>
                `:""}

                <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Price: <strong class="text-emerald-800 font-extrabold text-sm">${c.pricePerKg} ETB</strong>/kg</span>
                  <span>Stock: <strong class="font-bold text-slate-800">${c.qtyKg.toLocaleString()} kg</strong></span>
                </div>
                
                <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Min order: ${c.minOrderKg} kg</span>
                  <span><i class="fa-solid fa-calendar mr-1"></i> ${c.availableFrom}</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
      `}

      <!-- Post New Produce Listing Modal (Voice Note + Advance Harvest + Benchmarking) -->
      ${s?qt(i):""}

    </div>
  `}function Ht(i,e,t,r){const s=q[i];return`
    <div class="space-y-6">
      
      <!-- Telebirr Balance Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-blue-900 via-blue-800 to-sky-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-sky-200">
            <i class="fa-solid fa-bolt text-amber-300"></i> Telebirr Direct Settlement Engine
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white">
            ${((r==null?void 0:r.walletBalanceEtb)||48200).toLocaleString()} <span class="text-lg font-bold text-sky-200">ETB</span>
          </h2>
          <p class="text-xs text-sky-100 max-w-md">
            Linked Telebirr Account: <strong class="text-white">${(r==null?void 0:r.phone)||"+251 911 223 344"}</strong> · 90% direct produce value deposited immediately after buyer delivery approval.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button onclick="window.handleFarmerWithdrawal()" class="btn-primary bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg w-full sm:w-auto cursor-pointer">
            <i class="fa-solid fa-money-bill-transfer mr-1 text-slate-950"></i> ${s.requestWithdrawal}
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
          <h3 class="text-base font-bold text-slate-900 ${i==="am"?"lang-am":""}">
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
              ${t.map(a=>`
                <tr>
                  <td class="py-3 font-bold text-slate-900">
                    <div>${a.productName}</div>
                    <span class="text-[10px] text-slate-400">Order #${a.id.slice(0,8).toUpperCase()}</span>
                  </td>
                  <td class="py-3 font-semibold">${a.qtyKg} kg</td>
                  <td class="py-3 font-semibold">${a.totalEtb.toLocaleString()} ETB</td>
                  <td class="py-3 font-black text-emerald-700 text-sm">${a.farmerCut.toLocaleString()} ETB</td>
                  <td class="py-3 font-mono text-[11px] text-slate-500">${a.paymentRef||"TB-TXN-"+a.id.slice(0,8)}</td>
                  <td class="py-3">
                    <div class="flex items-center gap-1.5">
                      <button onclick="window.openInvoiceModal('${a.id}')" class="px-2 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[10px] cursor-pointer" title="View Tax Receipt">
                        <i class="fa-solid fa-file-invoice"></i> Receipt
                      </button>
                      <button onclick="window.openContractModal('${a.id}')" class="px-2 py-1 rounded bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 font-bold text-[10px] cursor-pointer" title="View Contract">
                        <i class="fa-solid fa-file-contract"></i> Contract
                      </button>
                    </div>
                  </td>
                  <td class="py-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${a.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-amber-100 text-amber-800"}">
                      ${a.status==="delivered"?"Paid to Telebirr":"Held in Escrow"}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `}function Kt(i){const e=q[i];return`
    <div class="glass-card p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      
      <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-comment-sms"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${e.smsConsoleTitle}</h2>
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
  `}function qt(i,e){const t=q[i];return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCreateListingModal()">
      <div class="modal-content p-6 sm:p-8 space-y-6 max-w-2xl">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${t.postNewListing}</h3>
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
              <span class="font-extrabold text-xs text-emerald-950 ${i==="am"?"lang-am":""}">${t.voiceNoteTitle}</span>
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
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.priceKgLabel}</label>
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
                <option value="Grade 1">Grade 1 (Standard)</option>
                <option value="Grade 2">Grade 2 (Value)</option>
                <option value="Export Grade">Export Grade (Premium)</option>
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
  `}function Gt(i,e,t,r=g.getOptimizedRoute(),s=g.getCurrentUser(),a=g.getIsOfflineMode(),l=g.getOfflineQueue().length){const o=q[i],n=(s==null?void 0:s.vehicleCapacityKg)||5e3,c=Math.min(100,Math.round(r.totalWeightKg/n*100));return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner with Vehicle & Offline Mode Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <i class="fa-solid fa-truck text-amber-700"></i> ${(s==null?void 0:s.vehicleType)||"Isuzu 5-Ton"} · ${(s==null?void 0:s.refrigerationType)||"Ventilated"}
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

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">
            ${o.driverPortalTitle}
          </h1>
        </div>

        <!-- Offline-First Mode Controls -->
        <div class="flex items-center gap-3">
          <button onclick="window.toggleDriverOfflineMode()" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${a?"bg-amber-600 text-white border-amber-600 shadow-md":"bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}">
            <i class="fa-solid fa-wifi-slash mr-1"></i> ${a?"Offline Mode Active":"Online Mode"}
          </button>

          ${l>0?`
            <button onclick="window.syncDriverOfflineQueue()" class="btn-primary text-xs py-2 px-3.5 shadow-sm cursor-pointer animate-bounce">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${o.offlineSyncBtn} (${l})
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
              <h3 class="text-sm font-bold text-slate-900 ${i==="am"?"lang-am":""}">${o.vehicleProfileTitle}</h3>
              <p class="text-[11px] text-slate-500 font-medium">${(s==null?void 0:s.vehicleType)||"Isuzu 5-Ton"} · ${(s==null?void 0:s.refrigerationType)||"Ventilated Cargo"}</p>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-700">
            <span>Payload: <strong class="text-amber-800">${r.totalWeightKg.toLocaleString()} kg</strong> / ${n.toLocaleString()} kg (${c}%)</span>
          </div>
        </div>

        <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 rounded-full transition-all duration-500" style="width: ${c}%;"></div>
        </div>
      </section>

      <!-- Driver Earnings Overview with Rural Route Subsidy -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${o.tripCommission}</span>
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
            <span>${o.ruralBonus}</span>
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
            <span>${o.totalDeliveredTrips}</span>
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
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${r.title}</h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span><i class="fa-solid fa-road text-amber-600 mr-1"></i> ${r.totalDistanceKm} km</span>
            <span><i class="fa-solid fa-clock text-blue-600 mr-1"></i> ~${r.estimatedHours} hrs</span>
            <span><i class="fa-solid fa-coins text-emerald-600 mr-1"></i> ${(r.driverCommissionEtb+r.ruralSubsidyEtb).toLocaleString()} ETB Total</span>
          </div>
        </div>

        <div class="space-y-4">
          ${r.stops.map((m,w)=>`
            <div class="flex items-start gap-4 p-4 rounded-2xl ${m.completed?"bg-emerald-50/60 border border-emerald-100":"bg-slate-50 border border-slate-200"}">
              <div class="w-8 h-8 rounded-full ${m.completed?"bg-emerald-600 text-white":m.type==="dropoff"?"bg-blue-600 text-white":"bg-amber-600 text-white"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5">
                ${m.completed?'<i class="fa-solid fa-check"></i>':m.stopNumber}
              </div>

              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold ${m.type==="dropoff"?"text-blue-800":"text-amber-800"} uppercase">
                    ${m.type==="pickup"?"Stop "+m.stopNumber+": Farm Pickup":"Final Stop: Buyer Wholesale Depot"}
                  </span>
                  <span class="text-xs font-bold text-slate-500">${m.weightKg} kg</span>
                </div>

                <h4 class="text-sm font-extrabold text-slate-900 truncate">${m.locationName}</h4>
                <p class="text-xs text-slate-600"><i class="fa-solid fa-user text-slate-400 mr-1"></i> Contact: <strong class="text-slate-800">${m.contactName}</strong> (${m.phone})</p>
                <p class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-boxes-stacked text-slate-400 mr-1"></i> Cargo: ${m.cargoDetails}</p>
              </div>

              <div class="shrink-0">
                ${m.completed?`
                  <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <i class="fa-solid fa-check"></i> Picked Up
                  </span>
                `:`
                  <button onclick="window.handleDriverStopAction(${w})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
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
        <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
          <i class="fa-solid fa-road text-amber-600 mr-2"></i> ${o.availableTrips}
        </h2>

        ${e.length===0?`
          <div class="glass-card p-8 text-center text-slate-500 text-sm">
            No active trips assigned. Check back once farmers confirm incoming orders.
          </div>
        `:`
          <div class="space-y-4">
            ${e.map(m=>`
              <div class="glass-card p-5 space-y-4">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Waybill #${m.waybillNumber||"WB-FTA-001"}</span>
                    <h3 class="text-base font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">${m.productName} (${m.qtyKg} kg)</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-slate-400 font-medium block">${o.tripCommission} + Rural Subsidy</span>
                    <span class="text-lg font-black text-amber-700">${(m.driverCut+(m.driverSubsidyEtb||150)).toLocaleString()} ETB</span>
                  </div>
                </div>

                <!-- Origin & Destination Route -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span class="font-bold text-emerald-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-dot text-emerald-600"></i> Farm Pickup Location
                    </span>
                    <p class="text-slate-800 font-semibold">${m.farmerRegion}</p>
                    <p class="text-slate-500 font-medium">Farmer: ${m.farmerName} (${m.farmerPhone})</p>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                    <span class="font-bold text-blue-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-location-pin text-blue-600"></i> Buyer Delivery Depot
                    </span>
                    <p class="text-slate-800 font-semibold">${m.deliveryAddress||"Addis Ababa"}</p>
                    <p class="text-slate-500 font-medium">Buyer: ${m.buyerName} (${m.buyerPhone})</p>
                  </div>
                </div>

                <!-- Driver Actions with Photo + GPS verification and Waybill Viewer -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>Status:</span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${m.status==="picked_up"?"bg-amber-100 text-amber-800":m.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-800"}">${m.status.toUpperCase()}</span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button onclick="window.openWaybillModal('${m.id}')" class="btn-secondary text-xs py-2 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-sky-600"></i> ${o.viewWaybillBtn}
                    </button>

                    <button onclick="window.openContractModal('${m.id}')" class="btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${o.viewContractBtn}
                    </button>

                    ${m.status==="confirmed"?`
                      <button onclick="window.driverPickupWithProof('${m.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-camera mr-1"></i> ${o.uploadProof} & Pickup
                      </button>
                    `:m.status==="picked_up"?`
                      <button onclick="window.driverCompleteDeliveryProof('${m.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-location-crosshairs mr-1"></i> Dropoff + GPS Proof
                      </button>
                    `:`
                      <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Trip Completed · ${(m.driverCut+(m.driverSubsidyEtb||150)).toLocaleString()} ETB Deposited
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
  `}function zt(i,e,t,r=g.getAnomalyAlerts(),s=g.getKycQueue(),a=g.getRegionalAnalytics(),l="disputes"){const o=q[i];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance & Legal Compliance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">
            ${o.adminPortalTitle}
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
          <span class="text-xs font-bold text-slate-500">${o.statTotalVolume}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${e.totalTransactionVolumeEtb.toLocaleString()} <span class="text-xs font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">100% Telebirr Escrow</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${o.statPlatformRev}</span>
          <div class="text-xl sm:text-2xl font-black text-purple-900">
            ${e.totalPlatformCommissionEtb.toLocaleString()} <span class="text-xs font-bold text-purple-700">ETB</span>
          </div>
          <p class="text-[11px] text-purple-700 font-semibold">5% platform service</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${o.statVatRemitted}</span>
          <div class="text-xl sm:text-2xl font-black text-blue-900">
            ${(e.totalVatRemittedEtb||258.75).toLocaleString()} <span class="text-xs font-bold text-blue-700">ETB</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">15% VAT on platform fee</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${o.statWithholding}</span>
          <div class="text-xl sm:text-2xl font-black text-teal-900">
            ${(e.totalWithholdingReportedEtb||690).toLocaleString()} <span class="text-xs font-bold text-teal-700">ETB</span>
          </div>
          <p class="text-[11px] text-teal-700 font-semibold">Declared 2% to MOR</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${o.statActiveEscrow}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${e.activeEscrowHeldEtb.toLocaleString()} <span class="text-xs font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">Secured in Telebirr vault</p>
        </div>

      </section>

      <!-- Admin Tab Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button onclick="window.setAdminTab('disputes')" class="cat-pill ${l==="disputes"?"active":""}">
          <i class="fa-solid fa-scale-balanced"></i>
          <span>${o.resolveDisputeTitle} (${t.length})</span>
        </button>
        <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${l==="anomalies"?"active":""}">
          <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
          <span>${o.anomalyScannerTitle} (${r.length})</span>
        </button>
        <button onclick="window.setAdminTab('kyc')" class="cat-pill ${l==="kyc"?"active":""}">
          <i class="fa-solid fa-id-card"></i>
          <span>${o.kycQueueTitle} (${s.filter(n=>n.status==="Pending").length})</span>
        </button>
        <button onclick="window.setAdminTab('tax_compliance')" class="cat-pill ${l==="tax_compliance"?"active":""}">
          <i class="fa-solid fa-file-invoice-dollar"></i>
          <span>Fiscal & Tax Invoicing</span>
        </button>
        <button onclick="window.setAdminTab('analytics')" class="cat-pill ${l==="analytics"?"active":""}">
          <i class="fa-solid fa-chart-pie"></i>
          <span>${o.regionalAnalyticsTitle}</span>
        </button>
        <button onclick="window.setAdminTab('sms')" class="cat-pill ${l==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${o.broadcastSmsTitle}</span>
        </button>
      </div>

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split with Legal Decrees) -->
      ${l==="disputes"?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-scale-balanced text-purple-600 mr-2"></i> ${o.resolveDisputeTitle}
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
              ${t.map(n=>`
                <div class="glass-card p-6 border-l-4 border-red-500 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span class="text-xs font-bold text-red-700 uppercase">Arbitration Docket #${n.arbitrationDecreeNumber||"ARB-DEC-001"}</span>
                      <h3 class="text-base font-extrabold text-slate-900">${n.productName} (${n.qtyKg} kg · ${n.totalEtb.toLocaleString()} ETB)</h3>
                      <p class="text-xs text-slate-500">Claimant: <strong>${n.buyerName}</strong> vs Respondent: <strong>${n.farmerName}</strong></p>
                    </div>
                    <div class="flex items-center gap-2">
                      <button onclick="window.openArbitrationModal('${n.id}')" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs cursor-pointer">
                        <i class="fa-solid fa-gavel mr-1"></i> ${o.viewArbitrationBtn}
                      </button>
                      <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold">
                        <i class="fa-solid fa-lock mr-1"></i> Frozen (${n.totalEtb.toLocaleString()} ETB)
                      </span>
                    </div>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${o.disputeEvidence}:</span>
                      <p class="text-slate-800 leading-relaxed font-medium">"${n.disputeReason||"Delivered avocados were overripe and 20% bruised during transit from Hawassa."}"</p>
                      <div class="text-[11px] text-red-700 font-bold">Requested Remedy: ${n.requestedRefundPercent||50}% Partial Refund (${Math.round(n.totalEtb*((n.requestedRefundPercent||50)/100)).toLocaleString()} ETB)</div>
                    </div>

                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img src="${n.disputePhoto||n.pickupPhoto||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80"}" class="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs" />
                      <div class="space-y-1 text-slate-600">
                        <span class="font-bold text-slate-800 block">Inspection Pathology Image</span>
                        <p class="text-[11px]">Location: Bole Cold Storage Hub</p>
                        <p class="text-[11px]">Inspection Finding: 18.5% transit softening</p>
                      </div>
                    </div>
                  </div>

                  <!-- Legal Documents Reference Bar -->
                  <div class="flex items-center gap-2 text-xs">
                    <button onclick="window.openContractModal('${n.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> View Original Contract
                    </button>
                    <button onclick="window.openWaybillModal('${n.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> View Driver Waybill
                    </button>
                    <button onclick="window.openInvoiceModal('${n.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> View Sales Invoice
                    </button>
                  </div>

                  <!-- 3-Way Manual Arbitration Controls -->
                  <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <button onclick="window.adminResolveDispute('${n.id}', 'ReleaseToFarmer')" class="btn-primary text-xs py-2.5 px-4 cursor-pointer">
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${o.releaseFarmerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${n.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${o.refundBuyerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${n.id}', 'PartialSplit')" class="btn-secondary text-xs py-2.5 px-4 text-purple-700 border-purple-300 hover:bg-purple-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-scale-balanced"></i> ${o.splitFiftyFiftyBtn}
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </section>
      `:""}

      <!-- Tab Content 2: Fraud & Anomaly Detection Monitor -->
      ${l==="anomalies"?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> ${o.anomalyScannerTitle}
            </h2>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Active Heuristic Scanner
            </span>
          </div>

          <div class="space-y-3">
            ${r.map(n=>`
              <div class="glass-card p-5 border-l-4 ${n.severity==="High"?"border-red-600":n.severity==="Medium"?"border-amber-500":"border-blue-500"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase ${n.severity==="High"?"bg-red-100 text-red-800":n.severity==="Medium"?"bg-amber-100 text-amber-800":"bg-blue-100 text-blue-800"}">
                      ${n.severity} Severity
                    </span>
                    <h3 class="text-sm font-extrabold text-slate-900">${n.title}</h3>
                    <span class="text-[10px] text-slate-400 font-mono">[${n.type}]</span>
                  </div>
                  <p class="text-xs text-slate-600">${n.description}</p>
                  <p class="text-[10px] text-slate-400">Target: ${n.entityType} (${n.entityId.slice(0,8)}...) · Detected ${n.detectedAt}</p>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.handleDismissAnomaly('${n.id}')" class="btn-secondary text-xs py-1.5 px-3 cursor-pointer">
                    Dismiss
                  </button>
                  <button onclick="window.handleInvestigateAnomaly('${n.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                    Investigate
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `:""}

      <!-- Tab Content 3: Comprehensive Verification & Regulatory Audit Queue -->
      ${l==="kyc"?`
        <section class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${o.sideBySideInspectionTitle}
              </h2>
              <p class="text-xs text-slate-500">
                ${i==="am"?"የፋይዳ (Fayda) ብሔራዊ መታወቂያ፣ የግብር ከፋይ ቁጥር (TIN) እና የአርሶ አደሮች ሰነዶች ማረጋገጫ":"Inspect high-res Fayda ID cards, MOR TIN numbers, and field agent submissions."}
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
            ${g.getVerificationQueue().map(n=>`
              <div class="glass-card p-6 border-l-4 ${n.verificationStatus==="Approved"?"border-emerald-500":n.verificationStatus==="Rejected"?"border-red-500":"border-amber-500"} space-y-4">
                
                <!-- Card Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${n.userRole==="Driver"?"bg-amber-100 text-amber-800":n.userRole==="Farmer"?"bg-emerald-100 text-emerald-800":"bg-blue-100 text-blue-800"}">
                        ${n.userRole}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        ${n.registrationMethod==="Agent"?"🧑‍🌾 Assisted by "+(n.registeredByAgentName||"Field Agent"):"💻 Self Registered"}
                      </span>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900 mt-1">
                      ${n.userName} ${n.userNameAm?`<span class="text-sm font-normal text-slate-500">(${n.userNameAm})</span>`:""}
                    </h3>
                    <p class="text-xs text-slate-500 font-mono">${n.phone} · 📍 ${n.region}</p>
                  </div>

                  <div class="flex flex-col sm:items-end gap-1">
                    <span class="px-3 py-1 rounded-full text-xs font-extrabold ${n.verificationStatus==="Approved"?"bg-emerald-100 text-emerald-800":n.verificationStatus==="Rejected"?"bg-red-100 text-red-800":"bg-amber-100 text-amber-800"}">
                      ${n.verificationStatus==="Approved"?"✅ APPROVED":n.verificationStatus==="Rejected"?"❌ REJECTED":"⏳ UNDER REVIEW"}
                    </span>
                    <span class="text-[10px] text-slate-400">Registered: ${n.registeredAt}</span>
                  </div>
                </div>

                <!-- Verification Data & Documents Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  <!-- Column 1: Identity & Tax Data -->
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div class="font-bold text-slate-800 border-b border-slate-200 pb-1">
                      📋 ${i==="am"?"የመታወቂያ እና የታክስ መረጃ":"Identity & Tax Record"}
                    </div>
                    <div>
                      <span class="text-slate-500 block">${o.tinNumberLabel}:</span>
                      <strong class="font-mono text-emerald-800 text-sm">${n.tinNumber||"0099881122"}</strong>
                    </div>
                    ${n.documents.map(c=>`
                      <div class="pt-1">
                        <span class="text-slate-500 block">${c.documentType}:</span>
                        <strong class="font-mono text-slate-800">${c.documentNumber}</strong>
                      </div>
                    `).join("")}
                    ${n.rejectionReason?`
                      <div class="p-2 rounded bg-red-50 text-red-800 text-[11px] font-medium border border-red-200 mt-2">
                        <strong>${o.rejectionReasonLabel}:</strong> ${n.rejectionReason}
                      </div>
                    `:""}
                  </div>

                  <!-- Column 2 & 3: High-Res Document Photo Previews -->
                  <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${n.documents.flatMap(c=>[c.frontImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">🪪 ${c.documentType} (Front)</div>
                          <img src="${c.frontImageUrl}" alt="Document Front" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${c.frontImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      `:"",c.backImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">📜 ${c.documentType} (Back)</div>
                          <img src="${c.backImageUrl}" alt="Document Back" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${c.backImageUrl}', '_blank')" />
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
                    <span>${o.sendSmsNoticeToggle}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button 
                      onclick="window.adminReviewVerification('${n.userId}', 'Reject')" 
                      class="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
                    >
                      <i class="fa-solid fa-xmark mr-1"></i> ${o.rejectVerificationAction}
                    </button>
                    
                    <button 
                      onclick="window.adminReviewVerification('${n.userId}', 'Approve')" 
                      class="btn-primary text-xs py-2 px-5 cursor-pointer bg-emerald-700 hover:bg-emerald-800"
                    >
                      <i class="fa-solid fa-check mr-1"></i> ${o.approveVerificationAction}
                    </button>
                  </div>
                </div>

              </div>
            `).join("")}
          </div>
        </section>
      `:""}

      <!-- Tab Content 4: Fiscal & Tax Invoicing Registry -->
      ${l==="tax_compliance"?`
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
                  ${g.getOrders().map(n=>`
                    <tr>
                      <td class="py-3 font-mono font-bold text-slate-900">${n.invoiceNumber||"ET-INV-001"}</td>
                      <td class="py-3 font-bold">${n.buyerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-ET-9912001</span></td>
                      <td class="py-3 font-bold">${n.farmerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-FARM-882910</span></td>
                      <td class="py-3 font-bold text-emerald-800">${n.totalEtb.toLocaleString()} ETB</td>
                      <td class="py-3 text-slate-600">${(n.platformCut*.15).toFixed(2)} ETB</td>
                      <td class="py-3 text-slate-600">${(n.totalEtb*.02).toFixed(2)} ETB</td>
                      <td class="py-3">
                        <button onclick="window.openInvoiceModal('${n.id}')" class="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[11px] cursor-pointer">
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
      `:""}

      <!-- Tab Content 5: Regional Analytics & EABC Impact Dashboard -->
      ${l==="analytics"?`
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i> ${o.regionalAnalyticsTitle}
            </h2>
            <span class="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              EABC Regional Sourcing Impact
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${a.map(n=>`
              <div class="glass-card p-5 space-y-3 border-t-4 border-emerald-600">
                <div class="text-xs font-extrabold text-slate-500 uppercase">${n.region}</div>
                <div class="text-xl font-black text-slate-900">${(n.totalGmvEtb/1e6).toFixed(2)}M <span class="text-xs font-bold text-emerald-700">ETB GMV</span></div>
                
                <div class="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div class="flex justify-between">
                    <span>Smallholders:</span>
                    <strong class="text-slate-900">${n.smallholdersCount.toLocaleString()}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Volume Traded:</span>
                    <strong class="text-slate-900">${n.volumeMetricTons} MT</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Top Commodity:</span>
                    <strong class="text-emerald-800">${n.topCrop}</strong>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `:""}

      <!-- Tab Content 6: Broadcast Bilingual SMS (Twilio) -->
      ${l==="sms"?`
        <section class="glass-card p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
              <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${o.broadcastSmsTitle}</h2>
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
              <i class="fa-solid fa-paper-plane"></i> ${o.sendSmsBtn}
            </button>
          </form>
        </section>
      `:""}

    </div>
  `}class Qt{constructor(e="en"){h(this,"currentLang","en");h(this,"activeTab","register");h(this,"ussdPhone","+251944556677");h(this,"ussdInput","*990#");h(this,"ussdScreenText",`Welcome to Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit`);this.currentLang=e}setLanguage(e){this.currentLang=e}render(){const e=q[this.currentLang];g.getCurrentUser();const t=g.getAgentRegisteredFarmers(),r=t.filter(a=>a.status==="Approved").length,s=t.length*250;return`
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
              <div style="font-size: 1.4rem; font-weight: 800; color: #74c69d;">${r}</div>
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

        <!-- Tab Contents -->
        ${this.activeTab==="register"?this.renderRegisterTab():""}
        ${this.activeTab==="roster"?this.renderRosterTab(t):""}
        ${this.activeTab==="ussd_sim"?this.renderUssdTab():""}

      </div>
    `}renderRegisterTab(){const e=q[this.currentLang];return`
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
    `}renderRosterTab(e){const t=q[this.currentLang];return`
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
              ${e.map(r=>`
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 12px; font-weight: 600; color: var(--color-text-primary);">
                    <div>${r.name}</div>
                    ${r.nameAm?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${r.nameAm}</div>`:""}
                  </td>
                  <td style="padding: 12px; font-family: monospace; color: var(--color-text-secondary);">${r.phone}</td>
                  <td style="padding: 12px; color: var(--color-text-secondary);">
                    <div>${r.region}</div>
                    ${r.kebele?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${r.kebele}</div>`:""}
                  </td>
                  <td style="padding: 12px;">
                    <span style="background: rgba(45, 106, 79, 0.1); color: #2d6a4f; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">
                      ${r.primaryCrop||"Mixed Crops"}
                    </span>
                  </td>
                  <td style="padding: 12px; font-family: monospace; font-size: 0.85rem;">${r.faydaId||"N/A"}</td>
                  <td style="padding: 12px;">
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; background: ${r.status==="Approved"?"rgba(16,185,129,0.15)":"rgba(234,179,8,0.15)"}; color: ${r.status==="Approved"?"#047857":"#b45309"};">
                      ${r.status==="Approved"?"✅ Approved":"⏳ Under Review"}
                    </span>
                  </td>
                  <td style="padding: 12px; text-align: right;">
                    <button onclick="window.sendAgentFarmerSms('${r.phone}')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px;">
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
    `}switchTab(e){this.activeTab=e}setUssdInput(e){this.ussdInput=e;const t=document.getElementById("ussdCodeInput");t&&(t.value=e)}async executeUssd(){const e=document.getElementById("ussdCodeInput"),t=(e==null?void 0:e.value)||this.ussdInput,r=await g.sendInboundUssdSimulation(this.ussdPhone,t);this.ussdScreenText=r;const s=document.getElementById("ussdDisplayScreen");s&&(s.innerText=r)}}class Yt{constructor(e="en"){h(this,"currentLang","en");h(this,"isOpen",!1);h(this,"currentStep",1);h(this,"faydaNumber","");h(this,"tinNumber","");h(this,"kebeleNumber","");h(this,"frontImageUrl","https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80");h(this,"backImageUrl","https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80");this.currentLang=e}setLanguage(e){this.currentLang=e}open(e=1){this.isOpen=!0,this.currentStep=e;const t=g.getCurrentUser();t!=null&&t.tinNumber&&(this.tinNumber=t.tinNumber),this.render()}close(){this.isOpen=!1;const e=document.getElementById("verificationWizardModal");e&&(e.innerHTML="")}render(){const e=document.getElementById("verificationWizardModal");if(!e||!this.isOpen)return;const t=q[this.currentLang],r=g.getCurrentUser(),s=g.getVerificationStatus();e.innerHTML=`
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
                ${r!=null&&r.rejectionReason?`<div style="font-size: 0.8rem; color: #b91c1c; margin-top: 2px;"><strong>${t.rejectionReasonLabel}:</strong> ${r.rejectionReason}</div>`:""}
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); background: var(--color-bg); padding: 4px 8px; border-radius: 6px;">
              ${(r==null?void 0:r.registrationMethod)==="Agent"?"🧑‍🌾 "+(this.currentLang==="am"?"በኤጀንት የተመዘገበ":"Agent Registered"):"💻 "+(this.currentLang==="am"?"የራስ ምዝገባ":"Direct Registration")}
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
    `}renderStepContent(){const e=q[this.currentLang],t=g.getCurrentUser();return this.currentStep===1?`
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
      `:""}getStatusBgColor(e){switch(e){case"Approved":return"rgba(16, 185, 129, 0.12)";case"UnderReview":return"rgba(234, 179, 8, 0.12)";case"Rejected":return"rgba(239, 68, 68, 0.12)";default:return"rgba(100, 116, 139, 0.1)"}}getStatusTextColor(e){switch(e){case"Approved":return"#047857";case"UnderReview":return"#b45309";case"Rejected":return"#b91c1c";default:return"#475569"}}getStatusIcon(e){switch(e){case"Approved":return"✅";case"UnderReview":return"⏳";case"Rejected":return"❌";default:return"📝"}}formatStatus(e){const t=q[this.currentLang];switch(e){case"Approved":return t.statusApproved;case"UnderReview":return t.statusUnderReview;case"Rejected":return t.statusRejected;default:return t.statusPendingSubmission}}updateField(e,t){e==="fayda"&&(this.faydaNumber=t),e==="tin"&&(this.tinNumber=t),e==="kebele"&&(this.kebeleNumber=t)}setStep(e){this.currentStep=e,this.render()}async submit(){const e=this.faydaNumber||"FAN-8812-4091-2810",t=this.tinNumber||"0099881122";await g.submitVerificationDocuments(t,[{documentType:"FaydaId",documentNumber:e,frontImageUrl:this.frontImageUrl,backImageUrl:this.backImageUrl},{documentType:"TinCertificate",documentNumber:t,frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"}]),this.close()}}function Jt(i,e){return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-envelope-open-text text-emerald-700 text-lg"></i>
            <h3 class="text-base font-bold text-slate-900">
              ${i==="am"?"የኤስኤምኤስ (SMS) እና የስርዓት መልእክቶች":"SMS & Push Notifications"}
            </h3>
          </div>
          <button onclick="window.closeNotificationsModal()" class="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        ${e.length===0?`
          <div class="py-8 text-center text-slate-400 text-xs">
            No new messages.
          </div>
        `:`
          <div class="space-y-3 max-h-80 overflow-y-auto pr-1">
            ${e.map(t=>`
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div class="flex items-center justify-between font-bold text-[10px]">
                  <span class="px-2 py-0.5 rounded-full ${t.channel==="sms"?"bg-emerald-100 text-emerald-800":"bg-blue-100 text-blue-800"} uppercase">
                    ${t.channel==="sms"?"Twilio SMS":"Push Notification"}
                  </span>
                  <span class="text-slate-400">${new Date(t.sentAt||t.createdAt||Date.now()).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
                <p class="text-slate-800 font-medium leading-relaxed ${i==="am"?"lang-am":""}">
                  ${i==="am"&&t.messageAm?t.messageAm:t.messageEn}
                </p>
              </div>
            `).join("")}
          </div>
        `}

      </div>
    </div>
  `}function Xt(i,e,t,r,s="",a="",l="",o=""){return`
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
              <h3 class="text-lg sm:text-xl font-black tracking-tight text-white ${i==="am"?"lang-am":""}">
                ${e==="login"?i==="am"?"ወደ መለያዎ ይግቡ":"Sign In to Your Account":i==="am"?"አዲስ የጅምላ መለያ ይመዝገቡ":"Create a Wholesale Account"}
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
              <i class="fa-solid fa-right-to-bracket text-emerald-700"></i> ${i==="am"?"ግባ (Sign In)":"Sign In (መግቢያ)"}
            </button>
            <button onclick="window.setAuthMode('register')" 
              class="flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${e==="register"?"bg-white text-emerald-950 shadow-sm border border-slate-200/60":"text-slate-500 hover:text-slate-900"}">
              <i class="fa-solid fa-user-plus text-emerald-700"></i> ${i==="am"?"ተመዝገብ (Join Free)":"Join Free (አዲስ መመዝገቢያ)"}
            </button>
          </div>

          ${o?`
            <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <i class="fa-solid fa-circle-exclamation text-red-500 text-sm mt-0.5 shrink-0"></i>
              <div class="flex-1">
                <span class="font-bold block">${o}</span>
                ${e==="login"&&o.toLowerCase().includes("register")?`
                  <button type="button" onclick="window.switchToRegisterWithPhone('${r}')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
                    <i class="fa-solid fa-user-plus"></i> Register This Phone Now
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
                    <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      <i class="fa-solid fa-comment-sms"></i>
                    </div>
                    <div>
                      <span class="block font-bold">${a?`Account: <strong>${a}</strong> (${l})`:"SMS Dispatched via Twilio Gateway"}</span>
                      <span class="text-[11px] text-emerald-700 font-medium">Verified Phone: <strong>+251 ${r}</strong></span>
                      ${s?`
                        <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-white rounded-md border border-emerald-300 text-emerald-900 font-bold text-[10px]">
                          <span>SMS Code:</span> <code class="font-mono text-emerald-800 text-xs font-black">${s}</code>
                        </div>
                      `:""}
                    </div>
                  </div>
                  <button type="button" onclick="window.resetOtpStep()" class="text-xs text-emerald-800 hover:text-emerald-950 underline font-bold cursor-pointer shrink-0">
                    Change Phone
                  </button>
                </div>

                <div>
                  <label class="block mb-2 text-xs font-bold text-slate-800 text-center">
                    ${i==="am"?"የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ":"Enter 6-Digit Verification Code"}
                  </label>
                  <input type="text" id="authOtpInput" maxlength="6" required placeholder="• • • • • •" autofocus
                    value="${s||""}"
                    class="w-full py-3.5 px-4 rounded-xl border border-slate-300 text-center text-3xl font-mono font-black tracking-widest focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 text-slate-900 shadow-inner" />
                  
                  <div class="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
                    <span>Didn't receive SMS?</span>
                    <button type="button" onclick="window.handleRequestOtp(event)" class="text-emerald-700 hover:underline font-bold cursor-pointer">
                      Resend SMS Code
                    </button>
                  </div>
                </div>

                <button type="submit" id="verifyOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-circle-check mr-1.5"></i> ${i==="am"?"አረጋግጥና ግባ":"Verify Code & Sign In"}
                </button>
              </form>
            `:`
              <form onsubmit="window.handleRequestOtp(event)" class="space-y-4 pt-1">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="text-xs font-bold text-slate-800">
                      ${i==="am"?"የተመዘገበ የሞባይል ስልክ ቁጥር":"Registered Ethiopian Mobile Number"}
                    </label>
                    <span class="text-[10px] text-slate-400 font-semibold">Strict Database Verification</span>
                  </div>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-slate-500 text-sm flex items-center gap-1.5 pointer-events-none">
                      <span class="text-base">🇪🇹</span> +251
                    </span>
                    <input type="tel" id="authPhoneInput" required placeholder="911 223 344" value="${r||""}"
                      class="w-full pl-24 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white transition-all tracking-wide" />
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <i class="fa-solid fa-database text-emerald-600"></i> ${i==="am"?"በዳታቤዝ ውስጥ የተመዘገቡ ተጠቃሚዎች ብቻ መግባት ይችላሉ።":"Only existing registered accounts in the database can sign in."}
                  </p>
                </div>

                <button type="submit" id="requestOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${i==="am"?"የኤስኤምኤስ ማረጋገጫ ኮድ ላክ":"Verify & Send SMS Code"}
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
                  </div>
                </div>
              </form>
            `}

          `:`
            <!-- Professional B2B Registration Flow (Creates Real DB User) -->
            <form onsubmit="window.handleRegisterUser(event)" class="space-y-4 text-xs pt-1">
              
              <div>
                <label class="block mb-2 font-bold text-slate-800 text-xs">
                  ${i==="am"?"የንግድ / የሥራ ዘርፍ ይምረጡ":"Select Your Business Role on the Exchange"}
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
                    <input type="tel" id="regPhone" required placeholder="911 000 111" value="${r||""}"
                      class="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-bold" />
                  </div>
                </div>
              </div>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
                <input type="checkbox" checked required class="mt-0.5 rounded text-emerald-600" />
                <span>I agree to the <strong>Farmer-to-Market Produce Exchange Terms</strong> and automated <strong>Telebirr Escrow terms</strong>.</span>
              </div>

              <button type="submit" id="registerSubmitBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer mt-1">
                <i class="fa-solid fa-user-check mr-1.5"></i> ${i==="am"?"ይመዝገቡና ወደ መለያዎ ይግቡ":"Complete Registration & Sign In"}
              </button>
            </form>
          `}

        </div>
      </div>
    </div>
  `}class Zt{constructor(){h(this,"currentLang","en")}setLanguage(e){this.currentLang=e}renderInvoice(e){const t=this.currentLang==="am";return`
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
    `}renderContract(e){var t,r,s;return`
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
              <small>${((r=e.eSignatures)==null?void 0:r.buyerSignDate)||"2026-08-22 08:31:02"}</small>
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
    `}}const me=new Zt;function T(i,e="fa-circle-check",t="border-emerald-500"){const r=document.getElementById("toast-container");if(!r)return;const s=document.createElement("div");s.className=`toast-msg border-l-4 ${t} shadow-2xl`,s.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${i}</span>
  `,r.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(100%)",s.style.transition="all 0.3s ease-out",setTimeout(()=>s.remove(),300)},3500)}class er{constructor(){h(this,"lang",localStorage.getItem("lang")||"en");h(this,"activeTab","marketplace");h(this,"activeCategory","All");h(this,"selectedRegion","All");h(this,"searchQuery","");h(this,"cart",[]);h(this,"isCartOpen",!1);h(this,"isNotificationsModalOpen",!1);h(this,"isCreateListingModalOpen",!1);h(this,"activeOrderModal",null);h(this,"activeTelebirrModal",null);h(this,"activeDisputeModal",null);h(this,"activeLegalDocModal",null);h(this,"maxDistanceKm",0);h(this,"activeGrade","All");h(this,"activeRipeness","All");h(this,"organicOnly",!1);h(this,"advanceOnly",!1);h(this,"activeBuyerSubTab","marketplace");h(this,"activeFarmerTab","listings");h(this,"activeAdminTab","disputes");h(this,"isRecordingVoice",!1);h(this,"voiceRecordTimer",null);h(this,"isAuthModalOpen",!1);h(this,"authMode","login");h(this,"otpStep",!1);h(this,"pendingPhone","");h(this,"lastSentCode","");h(this,"matchedUserName","");h(this,"matchedUserRole","");h(this,"authErrorMessage","");h(this,"agentView",new Qt(this.lang));h(this,"verificationWizardModal",new Yt(this.lang));this.init()}async init(){this.attachGlobalWindowHandlers(),ge.startConnection(g.getToken()||void 0),ge.onOrderStatusChanged(async(t,r,s)=>{console.log(`[SignalR Live Status Update] Order ${t} -> ${r}: ${s}`),this.activeOrderModal&&this.activeOrderModal.id===t&&(this.activeOrderModal.status=r),T(`Live Update: Order #${t.slice(0,8).toUpperCase()} is now ${r.toUpperCase()}`,"fa-bolt","border-blue-500"),await g.refreshAllData(),this.render()}),g.subscribe(()=>{this.render()}),await g.refreshAllData();const e=g.getCurrentUser();e&&(e.role==="farmer"?this.activeTab="farmer":e.role==="driver"?this.activeTab="driver":e.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){var n;const e=document.getElementById("app");if(!e)return;const t=g.getCurrentUser(),r=g.isAuthenticated(),s=g.getNotifications(),a=s.filter(c=>!c.read).length;me.setLanguage(this.lang);const l=g.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let o="";if(this.activeTab==="farmer"&&r&&(t==null?void 0:t.role)==="farmer"){const c=g.getListings().filter(_=>_.farmerId===t.id),m=g.getOrders("farmer"),w=g.getFarmerSummary();o=Ut(this.lang,c,m,w,this.isCreateListingModalOpen,this.activeFarmerTab,g.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&r&&(t==null?void 0:t.role)==="driver"){const c=g.getOrders("driver"),m=g.getDriverSummary();o=Gt(this.lang,c,m,g.getOptimizedRoute(),t,g.getIsOfflineMode(),g.getOfflineQueue().length)}else if(this.activeTab==="admin"&&r&&(t==null?void 0:t.role)==="admin"){const c=g.getPlatformStats(),m=g.getOrders().filter(w=>w.status==="disputed");o=zt(this.lang,c,m,g.getAnomalyAlerts(),g.getKycQueue(),g.getRegionalAnalytics(),this.activeAdminTab)}else if(this.activeTab==="agent"||r&&(t==null?void 0:t.role)==="agent")this.agentView.setLanguage(this.lang),o=this.agentView.render();else{const c=g.getOrders("buyer");o=jt(this.lang,l,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,g.getStandingOrders(),c)}e.innerHTML=`
      ${Ft(this.lang,t,r,this.activeTab,this.cart,a,this.searchQuery)}
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        ${o}
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
      ${this.isAuthModalOpen?Xt(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage):""}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen?Jt(this.lang,s):""}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

      <!-- Official Legal Document Viewer Modal -->
      ${(n=this.activeLegalDocModal)!=null&&n.isOpen?`
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
              ${this.activeLegalDocModal.type==="invoice"?me.renderInvoice(g.getTaxInvoice(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="waybill"?me.renderWaybill(g.getTransportWaybill(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="contract"?me.renderContract(g.getLegalContract(this.activeLegalDocModal.orderId)):me.renderArbitration(g.getDisputeMediationRecord(this.activeLegalDocModal.orderId))}
            </div>
          </div>
        </div>
      `:""}
    `}attachGlobalWindowHandlers(){const e=window;e.navigateTab=r=>{this.activeTab=r,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),T(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=r=>{this.activeBuyerSubTab=r,this.render()},e.toggleFarmerTab=r=>{this.activeFarmerTab=r,this.render()},e.setAdminTab=r=>{this.activeAdminTab=r,this.render()},e.openInvoiceModal=r=>{this.activeLegalDocModal={isOpen:!0,type:"invoice",orderId:r},this.render()},e.openContractModal=r=>{this.activeLegalDocModal={isOpen:!0,type:"contract",orderId:r},this.render()},e.openWaybillModal=r=>{this.activeLegalDocModal={isOpen:!0,type:"waybill",orderId:r},this.render()},e.openArbitrationModal=r=>{this.activeLegalDocModal={isOpen:!0,type:"arbitration",orderId:r},this.render()},e.closeLegalDocModal=()=>{this.activeLegalDocModal=null,this.render()},e.printOfficialDocument=()=>{window.print()},e.setMaxDistanceKm=r=>{this.maxDistanceKm=r,T(r===0?"Showing all produce across Ethiopia":`Filtering farms within ${r} km radius`,"fa-location-dot"),this.render()},e.setFilterGrade=r=>{this.activeGrade=r,this.render()},e.setFilterRipeness=r=>{this.activeRipeness=r,this.render()},e.toggleOrganicFilter=r=>{this.organicOnly=r,this.render()},e.toggleAdvanceFilter=r=>{this.advanceOnly=r,this.render()},e.setCategory=r=>{this.activeCategory=r,this.render()},e.resetFilters=()=>{this.activeCategory="All",this.selectedRegion="All",this.searchQuery="",this.maxDistanceKm=0,this.activeGrade="All",this.activeRipeness="All",this.organicOnly=!1,this.advanceOnly=!1,this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async r=>{var Z,v,se,ee,ae,ie,ce,pe,S,H,W,be;r.preventDefault();const s=(Z=document.getElementById("newProdName"))==null?void 0:Z.value,a=(v=document.getElementById("newProdNameAm"))==null?void 0:v.value,l=((se=document.getElementById("newCategory"))==null?void 0:se.value)||"Vegetables",o=Number(((ee=document.getElementById("newQtyKg"))==null?void 0:ee.value)||1e3),n=Number(((ae=document.getElementById("newPricePerKg"))==null?void 0:ae.value)||45),c=Number(((ie=document.getElementById("newMinOrderKg"))==null?void 0:ie.value)||50),m=((ce=document.getElementById("newGrade"))==null?void 0:ce.value)||"Grade 1",w=((pe=document.getElementById("newRipeness"))==null?void 0:pe.value)||"Ready Today",_=((S=document.getElementById("newIsAdvanceHarvest"))==null?void 0:S.checked)||!1,O=((H=document.getElementById("newExpectedHarvestDate"))==null?void 0:H.value)||void 0,j=((be=(W=document.getElementById("voiceTranscriptText"))==null?void 0:W.innerText)==null?void 0:be.replace(/^"|"$/g,""))||void 0,f=g.getCurrentUser(),R=await g.createListing({productName:s,nameAm:a||void 0,category:l,qtyKg:o,pricePerKg:n,minOrderKg:c,grade:m,ripeness:w,isAdvanceHarvest:_,expectedHarvestDate:O,voiceNoteTranscript:j,farmerId:f==null?void 0:f.id,farmerName:f==null?void 0:f.name,farmerNameAm:f==null?void 0:f.nameAm,farmerPhone:f==null?void 0:f.phone,region:f==null?void 0:f.region});this.isCreateListingModalOpen=!1,z({particleCount:90,spread:60,origin:{y:.6}}),T(this.lang==="am"?"አዲስ ምርት በተሳካ ሁኔታ ተመዝግቧል!":`Published ${R.productName} successfully!`,"fa-circle-check"),this.render()},e.handleVoiceRecordToggle=()=>{const r=document.getElementById("voiceRecordBtn"),s=document.getElementById("voiceRecordLabel"),a=document.getElementById("voiceWaveAnimation"),l=document.getElementById("voiceTranscriptionResult");document.getElementById("voiceTranscriptText"),this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription("am")):(this.isRecordingVoice=!0,s&&(s.innerText="Stop & Transcribe (አቁም)"),r&&(r.classList.remove("bg-emerald-600"),r.classList.add("bg-red-600")),a&&a.classList.remove("hidden"),l&&l.classList.add("hidden"),T("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription("am")},3500))},e.finishVoiceTranscription=r=>{this.isRecordingVoice=!1;const s=document.getElementById("voiceRecordLabel"),a=document.getElementById("voiceWaveAnimation"),l=document.getElementById("voiceTranscriptionResult"),o=document.getElementById("voiceTranscriptText");s&&(s.innerText="Record Voice Note (ድምጽ ቅጂ)"),a&&a.classList.add("hidden");const n=g.simulateVoiceTranscription(4,r),c=document.getElementById("newProdName"),m=document.getElementById("newProdNameAm"),w=document.getElementById("newCategory"),_=document.getElementById("newQtyKg"),O=document.getElementById("newPricePerKg");c&&(c.value=n.productName),m&&(m.value=n.nameAm),w&&(w.value=n.category),_&&(_.value=n.qtyKg.toString()),O&&(O.value=n.pricePerKg.toString()),l&&o&&(o.innerText=`"${n.transcript}"`,l.classList.remove("hidden")),z({particleCount:60,spread:50,origin:{y:.6}}),T("Voice Note Transcribed! Form auto-filled in Amharic.","fa-wand-magic-sparkles")},e.handleSimulateSms=async r=>{r.preventDefault();const s=document.getElementById("smsPhone").value,a=document.getElementById("smsCommand").value,l=document.getElementById("smsResponseBox"),o=document.getElementById("smsResponseText");l&&o&&(o.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',l.classList.remove("hidden"));const n=await g.sendInboundSms(s,a);o&&(o.innerHTML=`&gt; ${n}`),T("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const r=g.getCurrentUser(),s=(r==null?void 0:r.walletBalanceEtb)||48200;if(s<=0){T("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}g.requestWalletWithdrawal(s,(r==null?void 0:r.phone)||"+251911223344"),z({particleCount:100,spread:70,origin:{y:.6}}),T(`Instant Payout of ${s.toLocaleString()} ETB deposited to Telebirr (${(r==null?void 0:r.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=r=>{if(!g.isAuthenticated()){e.openAuthModal("login");return}g.addStandingOrder(r,150,"Weekly"),z({particleCount:70,spread:60,origin:{y:.6}}),T("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=r=>{g.toggleStandingOrder(r),T("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=r=>{const s=g.getOrders().find(a=>a.id===r);s&&(this.activeDisputeModal={isOpen:!0,order:s},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(r,s)=>{r.preventDefault();const a=document.getElementById("disputeReasonInput").value,l=document.getElementById("disputePhotoUrl").value,o=document.getElementById("disputeRefundSlider").value;await g.disputeOrder(s,a,l,parseInt(o,10)),this.activeDisputeModal=null,this.activeOrderModal=null,T("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const r=g.toggleOfflineMode();T(r?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const r=await g.syncOfflineQueue();T(`Synced ${r} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async r=>{const s=g.getOptimizedRoute();s.stops[r]&&(s.stops[r].completed=!0,z({particleCount:50,spread:50,origin:{y:.6}}),T(`Stop #${r+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async r=>{await g.pickupOrderByDriver(r,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),T("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async r=>{await g.confirmDeliveryByBuyer(r,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),z({particleCount:120,spread:70,origin:{y:.6}}),T("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(r,s)=>{await g.verifyKyc(r,s),T(s?"Identity & Documents Approved!":"KYC verification rejected",s?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=r=>{T(`Anomaly Alert #${r} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=r=>{T(`Audit trail opened for Anomaly #${r}`,"fa-magnifying-glass")},e.openAuthModal=(r="login")=>{this.authMode=r,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=r=>{this.authMode=r,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=r=>{this.pendingPhone=r.replace("+251","").trim(),this.authErrorMessage="",this.render();const s=document.getElementById("authPhoneInput");s&&(s.value=this.pendingPhone,s.focus())},e.switchToRegisterWithPhone=r=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=r.replace("+251","").trim(),this.render()},e.handleRequestOtp=async r=>{r.preventDefault();const s=document.getElementById("authPhoneInput").value.trim();if(!s||s.length<8){T("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const a=document.getElementById("requestOtpBtn");a&&(a.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',a.disabled=!0),this.pendingPhone=s,this.authErrorMessage="";try{const l=await g.requestOtp(s);this.lastSentCode=l.demoCode||"",this.matchedUserName=l.userName||"",this.matchedUserRole=l.role||"",this.otpStep=!0,T(`SMS verification code dispatched to +251 ${s}`,"fa-comment-sms","border-emerald-500")}catch(l){this.authErrorMessage=l.message||"No account registered with this phone number. Please register first."}this.render()},e.handleVerifyOtp=async r=>{var l;r.preventDefault();const s=(l=document.getElementById("authOtpInput")||document.getElementById("otpCodeInput"))==null?void 0:l.value.trim();if(!s||s.length!==6){T("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const a=document.getElementById("verifyOtpBtn");a&&(a.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',a.disabled=!0);try{const o=await g.verifyOtp(this.pendingPhone,s);this.isAuthModalOpen=!1,this.otpStep=!1,this.authErrorMessage="",o.role==="farmer"?this.activeTab="farmer":o.role==="driver"?this.activeTab="driver":o.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",z({particleCount:100,spread:70,origin:{y:.6}}),T(`Welcome back, ${o.name}! (${o.role.toUpperCase()})`,"fa-circle-check","border-emerald-500")}catch(o){this.authErrorMessage=o.message||"Invalid OTP code. Please try again."}this.render()};const t=async r=>{var m,w,_,O,j;r.preventDefault();const s=((m=document.getElementById("regName"))==null?void 0:m.value.trim())||"",a=((w=document.getElementById("regNameAm"))==null?void 0:w.value.trim())||s,l=((_=document.getElementById("regPhone"))==null?void 0:_.value.trim())||"",o=((O=document.getElementById("regRegion"))==null?void 0:O.value)||"Oromia (Bishoftu)",n=((j=document.querySelector('input[name="regRole"]:checked'))==null?void 0:j.value)||"buyer",c=document.getElementById("registerSubmitBtn");c&&(c.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...',c.disabled=!0);try{const f=await g.registerUser(s,a,l,n,o);this.isAuthModalOpen=!1,this.authErrorMessage="",f.role==="farmer"?this.activeTab="farmer":f.role==="driver"?this.activeTab="driver":f.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",z({particleCount:150,spread:90,origin:{y:.6}}),T(`Welcome to Farmer-to-Market, ${f.name}!`,"fa-circle-check","border-emerald-500")}catch(f){this.authErrorMessage=f.message||"Registration failed. Please try a different phone number."}this.render()};e.handleRegisterUser=t,e.handleRegisterSubmit=t,e.handleLogout=()=>{g.logout(),this.activeTab="marketplace",this.cart=[],T("Logged out successfully","fa-arrow-right-from-bracket"),this.render()},e.switchDemoUser=async r=>{try{const s=await g.requestOtp(r);if(s.demoCode){const a=await g.verifyOtp(r,s.demoCode);a.role==="farmer"?this.activeTab="farmer":a.role==="driver"?this.activeTab="driver":a.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",z({particleCount:80,spread:60,origin:{y:.6}}),T(`Switched to profile: ${a.name} (${a.role.toUpperCase()})`,"fa-user-shield")}}catch(s){T("Demo switch failed: "+s.message,"fa-circle-xmark","border-red-500")}this.render()},e.addToCart=r=>{const s=g.getListingById(r);if(!s)return;const a=this.cart.find(l=>l.listing.id===r);a?a.qtyKg+=s.minOrderKg:this.cart.push({listing:s,qtyKg:s.minOrderKg}),T(`Added ${s.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(r,s)=>{const a=this.cart.find(l=>l.listing.id===r);a&&(s<=0?this.cart=this.cart.filter(l=>l.listing.id!==r):a.qtyKg=s),this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.openTelebirrModal=r=>{if(!g.isAuthenticated()){e.openAuthModal("login");return}this.activeTelebirrModal={isOpen:!0,totalEtb:r},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.handleTelebirrSubmit=async r=>{r.preventDefault();try{let s=null;for(const a of this.cart)s=await g.placeOrder(a.listing.id,a.qtyKg);this.cart=[],this.isCartOpen=!1,this.activeTelebirrModal=null,z({particleCount:150,spread:80,origin:{y:.6}}),T("Payment Authorized! Funds locked in Telebirr Escrow. Order Dispatched.","fa-lock","border-blue-500"),s&&(this.activeOrderModal=s)}catch(s){T("Order placement failed: "+s.message,"fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=r=>{const a=g.getOrders().find(l=>l.id===r);a&&(this.activeOrderModal=a,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.confirmFarmerOrder=async r=>{await g.confirmOrderByFarmer(r),ge.joinOrder(r),T("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async r=>{await g.confirmDeliveryByBuyer(r),z({particleCount:150,spread:80,origin:{y:.6}}),T("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),this.render()},e.adminResolveDispute=async(r,s)=>{await g.resolveDispute(r,s),T(`Dispute resolved: ${s}. Decree generated.`,"fa-gavel","border-purple-500"),this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async r=>{var j;r.preventDefault();const s=document.getElementById("newProdName").value,a=document.getElementById("newProdNameAm").value,l=document.getElementById("newCategory").value,o=parseFloat(document.getElementById("newQtyKg").value),n=parseFloat(document.getElementById("newPricePerKg").value),c=parseFloat(document.getElementById("newMinOrderKg").value),m=document.getElementById("newGrade").value,w=document.getElementById("newRipeness").value,_=document.getElementById("newIsAdvanceHarvest").checked,O=(j=document.getElementById("newExpectedHarvestDate"))==null?void 0:j.value;try{await g.createListing({productName:s,nameAm:a,category:l,qtyKg:o,pricePerKg:n,minOrderKg:c,grade:m,ripeness:w,isOrganic:!0,isAdvanceHarvest:_,expectedHarvestDate:_?O:void 0,availableFrom:_&&O?O:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,T(`Published ${s} to marketplace!`,"fa-cloud-arrow-up")}catch(f){T(f.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleAdminBroadcastSms=async r=>{r.preventDefault();const s=document.getElementById("smsTargetRole").value,a=document.getElementById("smsMsgEn").value,l=document.getElementById("smsMsgAm").value;await g.broadcastSms(a,l,s),T(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to smallholders via Twilio!","fa-paper-plane"),this.render()},e.openVerificationWizard=(r=1)=>{this.verificationWizardModal.setLanguage(this.lang),this.verificationWizardModal.open(r)},e.closeVerificationWizard=()=>{this.verificationWizardModal.close()},e.setWizardStep=r=>{this.verificationWizardModal.setStep(r)},e.updateWizardField=(r,s)=>{this.verificationWizardModal.updateField(r,s)},e.submitVerificationForm=async()=>{await this.verificationWizardModal.submit(),z({particleCount:100,spread:70,origin:{y:.6}}),T(this.lang==="am"?"ሰነዶችዎ ደርሰውናል! በ24 ሰዓት ውስጥ ይገመገማሉ።":"Documents submitted! Verification under 24-hour review.","fa-shield-check","border-emerald-500"),this.render()},e.switchAgentTab=r=>{this.agentView.switchTab(r),this.render()},e.setUssdInput=r=>{this.agentView.setUssdInput(r)},e.sendUssdCommand=async()=>{await this.agentView.executeUssd()},e.sendInboundSms=async()=>{const r=document.getElementById("inboundSmsBody"),s=(r==null?void 0:r.value)||"FAYDA FAN-8812-4091-2810";T(this.lang==="am"?`የኤስኤምኤስ ትዕዛዝ ተቀብለናል፡ "${s}"`:`Inbound SMS processed: "${s}"`,"fa-comment-sms","border-blue-500"),await g.refreshAllData(),this.render()},e.handleAgentRegisterSubmit=async r=>{var _,O,j,f,R;r.preventDefault();const s=document.getElementById("agFarmerName").value,a=(_=document.getElementById("agFarmerNameAm"))==null?void 0:_.value,l=document.getElementById("agFarmerPhone").value,o=document.getElementById("agFarmerRegion").value,n=(O=document.getElementById("agFarmerKebele"))==null?void 0:O.value,c=(j=document.getElementById("agFarmerCrop"))==null?void 0:j.value,m=(f=document.getElementById("agFarmerFayda"))==null?void 0:f.value,w=(R=document.getElementById("agFarmerTin"))==null?void 0:R.value;try{await g.agentRegisterFarmer({name:s,nameAm:a,phone:l,region:o,kebele:n,primaryCrop:c,faydaId:m,tinNumber:w}),z({particleCount:120,spread:80,origin:{y:.6}}),T(this.lang==="am"?`${s} ተመዝግቧል! የማረጋገጫ ኤስኤምኤስ ተልኳል።`:`Farmer ${s} registered! Welcome SMS dispatched.`,"fa-user-check","border-emerald-500"),this.agentView.switchTab("roster"),this.render()}catch(Z){T("Registration failed: "+Z.message,"fa-circle-xmark","border-red-500")}},e.sendAgentFarmerSms=r=>{T(this.lang==="am"?`ኤስኤምኤስ ወደ ${r} ተልኳል!`:`SMS dispatch sent to ${r}!`,"fa-paper-plane","border-blue-500")},e.adminReviewVerification=async(r,s)=>{let a,l;if(s==="Reject"){if(l=prompt(this.lang==="am"?"እባክዎ ውድቅ የተደረገበትን ምክንያት ያስገቡ (ለምሳሌ፡ የፋይዳ ፎቶው ግልጽ አይደለም / የታክስ ቁጥር አልተገኘም):":"Enter rejection reason to notify the user via SMS (e.g. Blurry ID photo / TIN mismatch):","Blurry Fayda ID photo. Please re-upload clear image.")||void 0,!l)return}else a="Identity & TIN verified against Ministry of Revenues registry.";await g.reviewVerification(r,s,a,l),s==="Approve"?(z({particleCount:100,spread:70,origin:{y:.6}}),T(this.lang==="am"?"የተጠቃሚው ማረጋገጫ ጸድቋል! የኤስኤምኤስ መልእክት ተልኳል።":"User account APPROVED! SMS confirmation dispatched.","fa-circle-check","border-emerald-500")):T(this.lang==="am"?"ማረጋገጫው ውድቅ ተደርጓል፤ ምክንያቱ በኤስኤምኤስ ተልኳል።":"Verification rejected & reason SMS sent to user.","fa-triangle-exclamation","border-amber-500"),this.render()}}}new er;
