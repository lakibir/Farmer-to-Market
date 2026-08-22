var Ze=Object.defineProperty;var et=(i,e,t)=>e in i?Ze(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var f=(i,e,t)=>et(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();var Se={};(function i(e,t,s,a){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=(function(){if(!e.OffscreenCanvas)return!1;try{var p=new OffscreenCanvas(1,1),c=p.getContext("2d");c.fillRect(0,0,1,1);var g=p.transferToImageBitmap();c.createPattern(g,"no-repeat")}catch{return!1}return!0})();function n(){}function d(p){var c=t.exports.Promise,g=c!==void 0?c:e.Promise;return typeof g=="function"?new g(p):(p(n,n),null)}var m=(function(p,c){return{transform:function(g){if(p)return g;if(c.has(g))return c.get(g);var v=new OffscreenCanvas(g.width,g.height),T=v.getContext("2d");return T.drawImage(g,0,0),c.set(g,v),v},clear:function(){c.clear()}}})(o,new Map),k=(function(){var p=Math.floor(16.666666666666668),c,g,v={},T=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(c=function(S){var E=Math.random();return v[E]=requestAnimationFrame(function x(C){T===C||T+p-1<C?(T=C,delete v[E],S()):v[E]=requestAnimationFrame(x)}),E},g=function(S){v[S]&&cancelAnimationFrame(v[S])}):(c=function(S){return setTimeout(S,p)},g=function(S){return clearTimeout(S)}),{frame:c,cancel:g}})(),R=(function(){var p,c,g={};function v(T){function S(E,x){T.postMessage({options:E||{},callback:x})}T.init=function(x){var C=x.transferControlToOffscreen();T.postMessage({canvas:C},[C])},T.fire=function(x,C,A){if(c)return S(x,null),c;var M=Math.random().toString(36).slice(2);return c=d(function(P){function B(F){F.data.callback===M&&(delete g[M],T.removeEventListener("message",B),c=null,m.clear(),A(),P())}T.addEventListener("message",B),S(x,M),g[M]=B.bind(null,{data:{callback:M}})}),c},T.reset=function(){T.postMessage({reset:!0});for(var x in g)g[x](),delete g[x]}}return function(){if(p)return p;if(!s&&r){var T=["var CONFETTI, SIZE = {}, module = {};","("+i.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{p=new Worker(URL.createObjectURL(new Blob([T])))}catch(S){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",S),null}v(p)}return p}})(),K={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function Z(p,c){return c?c(p):p}function j(p){return p!=null}function D(p,c,g){return Z(p&&j(p[c])?p[c]:K[c],g)}function ne(p){return p<0?0:Math.floor(p)}function b(p,c){return Math.floor(Math.random()*(c-p))+p}function le(p){return parseInt(p,16)}function te(p){return p.map(me)}function me(p){var c=String(p).replace(/[^0-9a-f]/gi,"");return c.length<6&&(c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2]),{r:le(c.substring(0,2)),g:le(c.substring(2,4)),b:le(c.substring(4,6))}}function he(p){var c=D(p,"origin",Object);return c.x=D(c,"x",Number),c.y=D(c,"y",Number),c}function xe(p){p.width=document.documentElement.clientWidth,p.height=document.documentElement.clientHeight}function ve(p){var c=p.getBoundingClientRect();p.width=c.width,p.height=c.height}function w(p){var c=document.createElement("canvas");return c.style.position="fixed",c.style.top="0px",c.style.left="0px",c.style.pointerEvents="none",c.style.zIndex=p,c}function U(p,c,g,v,T,S,E,x,C){p.save(),p.translate(c,g),p.rotate(S),p.scale(v,T),p.arc(0,0,1,E,x,C),p.restore()}function W(p){var c=p.angle*(Math.PI/180),g=p.spread*(Math.PI/180);return{x:p.x,y:p.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:p.startVelocity*.5+Math.random()*p.startVelocity,angle2D:-c+(.5*g-Math.random()*g),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:p.color,shape:p.shape,tick:0,totalTicks:p.ticks,decay:p.decay,drift:p.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:p.gravity*3,ovalScalar:.6,scalar:p.scalar,flat:p.flat}}function je(p,c){c.x+=Math.cos(c.angle2D)*c.velocity+c.drift,c.y+=Math.sin(c.angle2D)*c.velocity+c.gravity,c.velocity*=c.decay,c.flat?(c.wobble=0,c.wobbleX=c.x+10*c.scalar,c.wobbleY=c.y+10*c.scalar,c.tiltSin=0,c.tiltCos=0,c.random=1):(c.wobble+=c.wobbleSpeed,c.wobbleX=c.x+10*c.scalar*Math.cos(c.wobble),c.wobbleY=c.y+10*c.scalar*Math.sin(c.wobble),c.tiltAngle+=.1,c.tiltSin=Math.sin(c.tiltAngle),c.tiltCos=Math.cos(c.tiltAngle),c.random=Math.random()+2);var g=c.tick++/c.totalTicks,v=c.x+c.random*c.tiltCos,T=c.y+c.random*c.tiltSin,S=c.wobbleX+c.random*c.tiltCos,E=c.wobbleY+c.random*c.tiltSin;if(p.fillStyle="rgba("+c.color.r+", "+c.color.g+", "+c.color.b+", "+(1-g)+")",p.beginPath(),l&&c.shape.type==="path"&&typeof c.shape.path=="string"&&Array.isArray(c.shape.matrix))p.fill(We(c.shape.path,c.shape.matrix,c.x,c.y,Math.abs(S-v)*.1,Math.abs(E-T)*.1,Math.PI/10*c.wobble));else if(c.shape.type==="bitmap"){var x=Math.PI/10*c.wobble,C=Math.abs(S-v)*.1,A=Math.abs(E-T)*.1,M=c.shape.bitmap.width*c.scalar,P=c.shape.bitmap.height*c.scalar,B=new DOMMatrix([Math.cos(x)*C,Math.sin(x)*C,-Math.sin(x)*A,Math.cos(x)*A,c.x,c.y]);B.multiplySelf(new DOMMatrix(c.shape.matrix));var F=p.createPattern(m.transform(c.shape.bitmap),"no-repeat");F.setTransform(B),p.globalAlpha=1-g,p.fillStyle=F,p.fillRect(c.x-M/2,c.y-P/2,M,P),p.globalAlpha=1}else if(c.shape==="circle")p.ellipse?p.ellipse(c.x,c.y,Math.abs(S-v)*c.ovalScalar,Math.abs(E-T)*c.ovalScalar,Math.PI/10*c.wobble,0,2*Math.PI):U(p,c.x,c.y,Math.abs(S-v)*c.ovalScalar,Math.abs(E-T)*c.ovalScalar,Math.PI/10*c.wobble,0,2*Math.PI);else if(c.shape==="star")for(var $=Math.PI/2*3,V=4*c.scalar,q=8*c.scalar,Q=c.x,ee=c.y,se=5,Y=Math.PI/se;se--;)Q=c.x+Math.cos($)*q,ee=c.y+Math.sin($)*q,p.lineTo(Q,ee),$+=Y,Q=c.x+Math.cos($)*V,ee=c.y+Math.sin($)*V,p.lineTo(Q,ee),$+=Y;else p.moveTo(Math.floor(c.x),Math.floor(c.y)),p.lineTo(Math.floor(c.wobbleX),Math.floor(T)),p.lineTo(Math.floor(S),Math.floor(E)),p.lineTo(Math.floor(v),Math.floor(c.wobbleY));return p.closePath(),p.fill(),c.tick<c.totalTicks}function He(p,c,g,v,T){var S=c.slice(),E=p.getContext("2d"),x,C,A=d(function(M){function P(){x=C=null,E.clearRect(0,0,v.width,v.height),m.clear(),T(),M()}function B(){s&&!(v.width===a.width&&v.height===a.height)&&(v.width=p.width=a.width,v.height=p.height=a.height),!v.width&&!v.height&&(g(p),v.width=p.width,v.height=p.height),E.clearRect(0,0,v.width,v.height),S=S.filter(function(F){return je(E,F)}),S.length?x=k.frame(B):P()}x=k.frame(B),C=P});return{addFettis:function(M){return S=S.concat(M),A},canvas:p,promise:A,reset:function(){x&&k.cancel(x),C&&C()}}}function _e(p,c){var g=!p,v=!!D(c||{},"resize"),T=!1,S=D(c,"disableForReducedMotion",Boolean),E=r&&!!D(c||{},"useWorker"),x=E?R():null,C=g?xe:ve,A=p&&x?!!p.__confetti_initialized:!1,M=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,P;function B($,V,q){for(var Q=D($,"particleCount",ne),ee=D($,"angle",Number),se=D($,"spread",Number),Y=D($,"startVelocity",Number),Ue=D($,"decay",Number),Ge=D($,"gravity",Number),qe=D($,"drift",Number),Ae=D($,"colors",te),Qe=D($,"ticks",Number),Pe=D($,"shapes"),ze=D($,"scalar"),Ye=!!D($,"flat"),Ie=he($),Re=Q,we=[],Je=p.width*Ie.x,Xe=p.height*Ie.y;Re--;)we.push(W({x:Je,y:Xe,angle:ee,spread:se,startVelocity:Y,color:Ae[Re%Ae.length],shape:Pe[b(0,Pe.length)],ticks:Qe,decay:Ue,gravity:Ge,drift:qe,scalar:ze,flat:Ye}));return P?P.addFettis(we):(P=He(p,we,C,V,q),P.promise)}function F($){var V=S||D($,"disableForReducedMotion",Boolean),q=D($,"zIndex",Number);if(V&&M)return d(function(Y){Y()});g&&P?p=P.canvas:g&&!p&&(p=w(q),document.body.appendChild(p)),v&&!A&&C(p);var Q={width:p.width,height:p.height};x&&!A&&x.init(p),A=!0,x&&(p.__confetti_initialized=!0);function ee(){if(x){var Y={getBoundingClientRect:function(){if(!g)return p.getBoundingClientRect()}};C(Y),x.postMessage({resize:{width:Y.width,height:Y.height}});return}Q.width=Q.height=null}function se(){P=null,v&&(T=!1,e.removeEventListener("resize",ee)),g&&p&&(document.body.contains(p)&&document.body.removeChild(p),p=null,A=!1)}return v&&!T&&(T=!0,e.addEventListener("resize",ee,!1)),x?x.fire($,Q,se):B($,Q,se)}return F.reset=function(){x&&x.reset(),P&&P.reset()},F}var ye;function $e(){return ye||(ye=_e(null,{useWorker:!0,resize:!0})),ye}function We(p,c,g,v,T,S,E){var x=new Path2D(p),C=new Path2D;C.addPath(x,new DOMMatrix(c));var A=new Path2D;return A.addPath(C,new DOMMatrix([Math.cos(E)*T,Math.sin(E)*T,-Math.sin(E)*S,Math.cos(E)*S,g,v])),A}function Ve(p){if(!l)throw new Error("path confetti are not supported in this browser");var c,g;typeof p=="string"?c=p:(c=p.path,g=p.matrix);var v=new Path2D(c),T=document.createElement("canvas"),S=T.getContext("2d");if(!g){for(var E=1e3,x=E,C=E,A=0,M=0,P,B,F=0;F<E;F+=2)for(var $=0;$<E;$+=2)S.isPointInPath(v,F,$,"nonzero")&&(x=Math.min(x,F),C=Math.min(C,$),A=Math.max(A,F),M=Math.max(M,$));P=A-x,B=M-C;var V=10,q=Math.min(V/P,V/B);g=[q,0,0,q,-Math.round(P/2+x)*q,-Math.round(B/2+C)*q]}return{type:"path",path:c,matrix:g}}function Ke(p){var c,g=1,v="#000000",T='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof p=="string"?c=p:(c=p.text,g="scalar"in p?p.scalar:g,T="fontFamily"in p?p.fontFamily:T,v="color"in p?p.color:v);var S=10*g,E=""+S+"px "+T,x=new OffscreenCanvas(S,S),C=x.getContext("2d");C.font=E;var A=C.measureText(c),M=Math.ceil(A.actualBoundingBoxRight+A.actualBoundingBoxLeft),P=Math.ceil(A.actualBoundingBoxAscent+A.actualBoundingBoxDescent),B=2,F=A.actualBoundingBoxLeft+B,$=A.actualBoundingBoxAscent+B;M+=B+B,P+=B+B,x=new OffscreenCanvas(M,P),C=x.getContext("2d"),C.font=E,C.fillStyle=v,C.fillText(c,F,$);var V=1/g;return{type:"bitmap",bitmap:x.transferToImageBitmap(),matrix:[V,0,0,V,-M*V/2,-P*V/2]}}t.exports=function(){return $e().apply(this,arguments)},t.exports.reset=function(){$e().reset()},t.exports.create=_e,t.exports.shapeFromPath=Ve,t.exports.shapeFromText=Ke})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Se,!1);const J=Se.exports;Se.exports.create;class ae extends Error{constructor(e,t){const s=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=s}}class ke extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class z extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class tt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=s}}class st extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=s}}class at extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=s}}class De extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class rt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=s}}class Le{constructor(e,t,s){this.statusCode=e,this.statusText=t,this.content=s}}class be{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var u;(function(i){i[i.Trace=0]="Trace",i[i.Debug=1]="Debug",i[i.Information=2]="Information",i[i.Warning=3]="Warning",i[i.Error=4]="Error",i[i.Critical=5]="Critical",i[i.None=6]="None"})(u||(u={}));class pe{constructor(){}log(e,t){}}pe.instance=new pe;const it="8.0.29";class O{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,s){if(!(e in t))throw new Error(`Unknown ${s} value: ${e}.`)}}class N{static get isBrowser(){return!N.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!N.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!N.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function ue(i,e){let t="";return ie(i)?(t=`Binary data of length ${i.byteLength}`,e&&(t+=`. Content: '${ot(i)}'`)):typeof i=="string"&&(t=`String data of length ${i.length}`,e&&(t+=`. Content: '${i}'`)),t}function ot(i){const e=new Uint8Array(i);let t="";return e.forEach(s=>{const a=s<16?"0":"";t+=`0x${a}${s.toString(16)} `}),t.substr(0,t.length-1)}function ie(i){return i&&typeof ArrayBuffer<"u"&&(i instanceof ArrayBuffer||i.constructor&&i.constructor.name==="ArrayBuffer")}async function Fe(i,e,t,s,a,r){const l={},[o,n]=oe();l[o]=n,i.log(u.Trace,`(${e} transport) sending data. ${ue(a,r.logMessageContent)}.`);const d=ie(a)?"arraybuffer":"text",m=await t.post(s,{content:a,headers:{...l,...r.headers},responseType:d,timeout:r.timeout,withCredentials:r.withCredentials});i.log(u.Trace,`(${e} transport) request complete. Response status: ${m.statusCode}.`)}function nt(i){return i===void 0?new ge(u.Information):i===null?pe.instance:i.log!==void 0?i:new ge(i)}class lt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class ge{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const s=`[${new Date().toISOString()}] ${u[e]}: ${t}`;switch(e){case u.Critical:case u.Error:this.out.error(s);break;case u.Warning:this.out.warn(s);break;case u.Information:this.out.info(s);break;default:this.out.log(s);break}}}}function oe(){let i="X-SignalR-User-Agent";return N.isNode&&(i="User-Agent"),[i,ct(it,dt(),ut(),pt())]}function ct(i,e,t,s){let a="Microsoft SignalR/";const r=i.split(".");return a+=`${r[0]}.${r[1]}`,a+=` (${i}; `,e&&e!==""?a+=`${e}; `:a+="Unknown OS; ",a+=`${t}`,s?a+=`; ${s}`:a+="; Unknown Runtime Version",a+=")",a}function dt(){if(N.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function pt(){if(N.isNode)return process.versions.node}function ut(){return N.isNode?"NodeJS":"Browser"}function Te(i){return i.stack?i.stack:i.message?i.message:`${i}`}function mt(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class ht extends be{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||N.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(mt());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new z;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let s;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),s=new z});let a=null;if(e.timeout){const n=e.timeout;a=setTimeout(()=>{t.abort(),this._logger.log(u.Warning,"Timeout from HTTP request."),s=new ke},n)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},ie(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let r;try{r=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(n){throw s||(this._logger.log(u.Warning,`Error from HTTP request. ${n}.`),n)}finally{a&&clearTimeout(a),e.abortSignal&&(e.abortSignal.onabort=null)}if(!r.ok){const n=await Ne(r,"text");throw new ae(n||r.statusText,r.status)}const o=await Ne(r,e.responseType);return new Le(r.status,r.statusText,o)}getCookieString(e){let t="";return N.isNode&&this._jar&&this._jar.getCookies(e,(s,a)=>t=a.join("; ")),t}}function Ne(i,e){let t;switch(e){case"arraybuffer":t=i.arrayBuffer();break;case"text":t=i.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=i.text();break}return t}class ft extends be{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new z):e.method?e.url?new Promise((t,s)=>{const a=new XMLHttpRequest;a.open(e.method,e.url,!0),a.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,a.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(ie(e.content)?a.setRequestHeader("Content-Type","application/octet-stream"):a.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const r=e.headers;r&&Object.keys(r).forEach(l=>{a.setRequestHeader(l,r[l])}),e.responseType&&(a.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{a.abort(),s(new z)}),e.timeout&&(a.timeout=e.timeout),a.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),a.status>=200&&a.status<300?t(new Le(a.status,a.statusText,a.response||a.responseText)):s(new ae(a.response||a.responseText||a.statusText,a.status))},a.onerror=()=>{this._logger.log(u.Warning,`Error from HTTP request. ${a.status}: ${a.statusText}.`),s(new ae(a.statusText,a.status))},a.ontimeout=()=>{this._logger.log(u.Warning,"Timeout from HTTP request."),s(new ke)},a.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class gt extends be{constructor(e){if(super(),typeof fetch<"u"||N.isNode)this._httpClient=new ht(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new ft(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new z):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class G{static write(e){return`${e}${G.RecordSeparator}`}static parse(e){if(e[e.length-1]!==G.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(G.RecordSeparator);return t.pop(),t}}G.RecordSeparatorCode=30;G.RecordSeparator=String.fromCharCode(G.RecordSeparatorCode);class bt{writeHandshakeRequest(e){return G.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,s;if(ie(e)){const o=new Uint8Array(e),n=o.indexOf(G.RecordSeparatorCode);if(n===-1)throw new Error("Message is incomplete.");const d=n+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(o.slice(0,d))),s=o.byteLength>d?o.slice(d).buffer:null}else{const o=e,n=o.indexOf(G.RecordSeparator);if(n===-1)throw new Error("Message is incomplete.");const d=n+1;t=o.substring(0,d),s=o.length>d?o.substring(d):null}const a=G.parse(t),r=JSON.parse(a[0]);if(r.type)throw new Error("Expected a handshake response from the server.");return[s,r]}}var y;(function(i){i[i.Invocation=1]="Invocation",i[i.StreamItem=2]="StreamItem",i[i.Completion=3]="Completion",i[i.StreamInvocation=4]="StreamInvocation",i[i.CancelInvocation=5]="CancelInvocation",i[i.Ping=6]="Ping",i[i.Close=7]="Close",i[i.Ack=8]="Ack",i[i.Sequence=9]="Sequence"})(y||(y={}));class xt{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new lt(this,e)}}class vt{constructor(e,t,s){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=s}async _send(e){const t=this._protocol.writeMessage(e);let s=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let a=()=>{},r=()=>{};ie(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(s=new Promise((l,o)=>{a=l,r=o})),this._messages.push(new yt(t,this._totalMessageCount,a,r))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await s}_ack(e){let t=-1;for(let s=0;s<this._messages.length;s++){const a=this._messages[s];if(a._id<=e.sequenceId)t=s,ie(a._message)?this._bufferedByteCount-=a._message.byteLength:this._bufferedByteCount-=a._message.length,a._resolver();else if(this._bufferedByteCount<this._bufferSize)a._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==y.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:y.Sequence,sequenceId:e}));const t=this._messages;for(const s of t)await this._connection.send(s._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case y.Invocation:case y.StreamItem:case y.Completion:case y.StreamInvocation:case y.CancelInvocation:return!0;case y.Close:case y.Sequence:case y.Ping:case y.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:y.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class yt{constructor(e,t,s,a){this._message=e,this._id=t,this._resolver=s,this._rejector=a}}const wt=30*1e3,Tt=15*1e3,St=1e5;var I;(function(i){i.Disconnected="Disconnected",i.Connecting="Connecting",i.Connected="Connected",i.Disconnecting="Disconnecting",i.Reconnecting="Reconnecting"})(I||(I={}));class Ee{static create(e,t,s,a,r,l,o){return new Ee(e,t,s,a,r,l,o)}constructor(e,t,s,a,r,l,o){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(u.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},O.isRequired(e,"connection"),O.isRequired(t,"logger"),O.isRequired(s,"protocol"),this.serverTimeoutInMilliseconds=r??wt,this.keepAliveIntervalInMilliseconds=l??Tt,this._statefulReconnectBufferSize=o??St,this._logger=t,this._protocol=s,this.connection=e,this._reconnectPolicy=a,this._handshakeProtocol=new bt,this.connection.onreceive=n=>this._processIncomingData(n),this.connection.onclose=n=>this._connectionClosed(n),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=I.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:y.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==I.Disconnected&&this._connectionState!==I.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==I.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=I.Connecting,this._logger.log(u.Debug,"Starting HubConnection.");try{await this._startInternal(),N.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=I.Connected,this._connectionStarted=!0,this._logger.log(u.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=I.Disconnected,this._logger.log(u.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,s)=>{this._handshakeResolver=t,this._handshakeRejecter=s});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const s={protocol:this._protocol.name,version:t};if(this._logger.log(u.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)),this._logger.log(u.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new vt(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(u.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===I.Disconnected)return this._logger.log(u.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===I.Disconnecting)return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=I.Disconnecting,this._logger.log(u.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(u.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===I.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new z("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createStreamInvocation(e,t,a);let l;const o=new xt;return o.cancelCallback=()=>{const n=this._createCancelInvocation(r.invocationId);return delete this._callbacks[r.invocationId],l.then(()=>this._sendWithProtocol(n))},this._callbacks[r.invocationId]=(n,d)=>{if(d){o.error(d);return}else n&&(n.type===y.Completion?n.error?o.error(new Error(n.error)):o.complete():o.next(n.item))},l=this._sendWithProtocol(r).catch(n=>{o.error(n),delete this._callbacks[r.invocationId]}),this._launchStreams(s,l),o}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._sendWithProtocol(this._createInvocation(e,t,!0,a));return this._launchStreams(s,r),r}invoke(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createInvocation(e,t,!1,a);return new Promise((o,n)=>{this._callbacks[r.invocationId]=(m,k)=>{if(k){n(k);return}else m&&(m.type===y.Completion?m.error?n(new Error(m.error)):o(m.result):n(new Error(`Unexpected message type: ${m.type}`)))};const d=this._sendWithProtocol(r).catch(m=>{n(m),delete this._callbacks[r.invocationId]});this._launchStreams(s,d)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const s=this._methods[e];if(s)if(t){const a=s.indexOf(t);a!==-1&&(s.splice(a,1),s.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const s of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(s)))switch(s.type){case y.Invocation:this._invokeClientMethod(s).catch(a=>{this._logger.log(u.Error,`Invoke client method threw error: ${Te(a)}`)});break;case y.StreamItem:case y.Completion:{const a=this._callbacks[s.invocationId];if(a){s.type===y.Completion&&delete this._callbacks[s.invocationId];try{a(s)}catch(r){this._logger.log(u.Error,`Stream callback threw error: ${Te(r)}`)}}break}case y.Ping:break;case y.Close:{this._logger.log(u.Information,"Close message received from server.");const a=s.error?new Error("Server returned an error on close: "+s.error):void 0;s.allowReconnect===!0?this.connection.stop(a):this._stopPromise=this._stopInternal(a);break}case y.Ack:this._messageBuffer&&this._messageBuffer._ack(s);break;case y.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(s);break;default:this._logger.log(u.Warning,`Invalid message type: ${s.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,s;try{[s,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(a){const r="Error parsing handshake response: "+a;this._logger.log(u.Error,r);const l=new Error(r);throw this._handshakeRejecter(l),l}if(t.error){const a="Server returned handshake error: "+t.error;this._logger.log(u.Error,a);const r=new Error(a);throw this._handshakeRejecter(r),r}else this._logger.log(u.Debug,"Server handshake complete.");return this._handshakeResolver(),s}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===I.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),s=this._methods[t];if(!s){this._logger.log(u.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(u.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const a=s.slice(),r=!!e.invocationId;let l,o,n;for(const d of a)try{const m=l;l=await d.apply(this,e.arguments),r&&l&&m&&(this._logger.log(u.Error,`Multiple results provided for '${t}'. Sending error to server.`),n=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),o=void 0}catch(m){o=m,this._logger.log(u.Error,`A callback for the method '${t}' threw error '${m}'.`)}n?await this._sendWithProtocol(n):r?(o?n=this._createCompletionMessage(e.invocationId,`${o}`,null):l!==void 0?n=this._createCompletionMessage(e.invocationId,null,l):(this._logger.log(u.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),n=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(n)):l&&this._logger.log(u.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(u.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new z("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===I.Disconnecting?this._completeClose(e):this._connectionState===I.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===I.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=I.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),N.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(u.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let s=0,a=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),r=this._getNextRetryDelay(s++,0,a);if(r===null){this._logger.log(u.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=I.Reconnecting,e?this._logger.log(u.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(u.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(l=>l.apply(this,[e]))}catch(l){this._logger.log(u.Error,`An onreconnecting callback called with error '${e}' threw error '${l}'.`)}if(this._connectionState!==I.Reconnecting){this._logger.log(u.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;r!==null;){if(this._logger.log(u.Information,`Reconnect attempt number ${s} will start in ${r} ms.`),await new Promise(l=>{this._reconnectDelayHandle=setTimeout(l,r)}),this._reconnectDelayHandle=void 0,this._connectionState!==I.Reconnecting){this._logger.log(u.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=I.Connected,this._logger.log(u.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(l=>l.apply(this,[this.connection.connectionId]))}catch(l){this._logger.log(u.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${l}'.`)}return}catch(l){if(this._logger.log(u.Information,`Reconnect attempt failed because of error '${l}'.`),this._connectionState!==I.Reconnecting){this._logger.log(u.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===I.Disconnecting&&this._completeClose();return}a=l instanceof Error?l:new Error(l.toString()),r=this._getNextRetryDelay(s++,Date.now()-t,a)}}this._logger.log(u.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${s} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,s){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:s})}catch(a){return this._logger.log(u.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${a}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(s=>{const a=t[s];try{a(null,e)}catch(r){this._logger.log(u.Error,`Stream 'error' callback called with '${e}' threw error: ${Te(r)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,s,a){if(s)return a.length!==0?{arguments:t,streamIds:a,target:e,type:y.Invocation}:{arguments:t,target:e,type:y.Invocation};{const r=this._invocationId;return this._invocationId++,a.length!==0?{arguments:t,invocationId:r.toString(),streamIds:a,target:e,type:y.Invocation}:{arguments:t,invocationId:r.toString(),target:e,type:y.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const s in e)e[s].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s)))},error:a=>{let r;a instanceof Error?r=a.message:a&&a.toString?r=a.toString():r="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s,r)))},next:a=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(s,a)))}})}}_replaceStreamingParams(e){const t=[],s=[];for(let a=0;a<e.length;a++){const r=e[a];if(this._isObservable(r)){const l=this._invocationId;this._invocationId++,t[l]=r,s.push(l.toString()),e.splice(a,1)}}return[t,s]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,s){const a=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:a.toString(),streamIds:s,target:e,type:y.StreamInvocation}:{arguments:t,invocationId:a.toString(),target:e,type:y.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:y.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:y.StreamItem}}_createCompletionMessage(e,t,s){return t?{error:t,invocationId:e,type:y.Completion}:{invocationId:e,result:s,type:y.Completion}}_createCloseMessage(){return{type:y.Close}}}const kt=[0,2e3,1e4,3e4,null];class Me{constructor(e){this._retryDelays=e!==void 0?[...e,null]:kt}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class re{}re.Authorization="Authorization";re.Cookie="Cookie";class Et extends be{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const s=await this._innerClient.send(e);return t&&s.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):s}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[re.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[re.Authorization]&&delete e.headers[re.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var L;(function(i){i[i.None=0]="None",i[i.WebSockets=1]="WebSockets",i[i.ServerSentEvents=2]="ServerSentEvents",i[i.LongPolling=4]="LongPolling"})(L||(L={}));var H;(function(i){i[i.Text=1]="Text",i[i.Binary=2]="Binary"})(H||(H={}));let Ct=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class Be{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,s){this._httpClient=e,this._logger=t,this._pollAbort=new Ct,this._options=s,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(O.isRequired(e,"url"),O.isRequired(t,"transferFormat"),O.isIn(t,H,"transferFormat"),this._url=e,this._logger.log(u.Trace,"(LongPolling transport) Connecting."),t===H.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[s,a]=oe(),r={[s]:a,...this._options.headers},l={abortSignal:this._pollAbort.signal,headers:r,timeout:1e5,withCredentials:this._options.withCredentials};t===H.Binary&&(l.responseType="arraybuffer");const o=`${e}&_=${Date.now()}`;this._logger.log(u.Trace,`(LongPolling transport) polling: ${o}.`);const n=await this._httpClient.get(o,l);n.statusCode!==200?(this._logger.log(u.Error,`(LongPolling transport) Unexpected response code: ${n.statusCode}.`),this._closeError=new ae(n.statusText||"",n.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,l)}async _poll(e,t){try{for(;this._running;)try{const s=`${e}&_=${Date.now()}`;this._logger.log(u.Trace,`(LongPolling transport) polling: ${s}.`);const a=await this._httpClient.get(s,t);a.statusCode===204?(this._logger.log(u.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):a.statusCode!==200?(this._logger.log(u.Error,`(LongPolling transport) Unexpected response code: ${a.statusCode}.`),this._closeError=new ae(a.statusText||"",a.statusCode),this._running=!1):a.content?(this._logger.log(u.Trace,`(LongPolling transport) data received. ${ue(a.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(a.content)):this._logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(s){this._running?s instanceof ke?this._logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=s,this._running=!1):this._logger.log(u.Trace,`(LongPolling transport) Poll errored after shutdown: ${s.message}`)}}finally{this._logger.log(u.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?Fe(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(u.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(u.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,s]=oe();e[t]=s;const a={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let r;try{await this._httpClient.delete(this._url,a)}catch(l){r=l}r?r instanceof ae&&(r.statusCode===404?this._logger.log(u.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(u.Trace,`(LongPolling transport) Error sending a DELETE request: ${r}`)):this._logger.log(u.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(u.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(u.Trace,e),this.onclose(this._closeError)}}}class _t{constructor(e,t,s,a){this._httpClient=e,this._accessToken=t,this._logger=s,this._options=a,this.onreceive=null,this.onclose=null}async connect(e,t){return O.isRequired(e,"url"),O.isRequired(t,"transferFormat"),O.isIn(t,H,"transferFormat"),this._logger.log(u.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((s,a)=>{let r=!1;if(t!==H.Text){a(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let l;if(N.isBrowser||N.isWebWorker)l=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const o=this._httpClient.getCookieString(e),n={};n.Cookie=o;const[d,m]=oe();n[d]=m,l=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...n,...this._options.headers}})}try{l.onmessage=o=>{if(this.onreceive)try{this._logger.log(u.Trace,`(SSE transport) data received. ${ue(o.data,this._options.logMessageContent)}.`),this.onreceive(o.data)}catch(n){this._close(n);return}},l.onerror=o=>{r?this._close():a(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},l.onopen=()=>{this._logger.log(u.Information,`SSE connected to ${this._url}`),this._eventSource=l,r=!0,s()}}catch(o){a(o);return}})}async send(e){return this._eventSource?Fe(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class $t{constructor(e,t,s,a,r,l){this._logger=s,this._accessTokenFactory=t,this._logMessageContent=a,this._webSocketConstructor=r,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=l}async connect(e,t){O.isRequired(e,"url"),O.isRequired(t,"transferFormat"),O.isIn(t,H,"transferFormat"),this._logger.log(u.Trace,"(WebSockets transport) Connecting.");let s;return this._accessTokenFactory&&(s=await this._accessTokenFactory()),new Promise((a,r)=>{e=e.replace(/^http/,"ws");let l;const o=this._httpClient.getCookieString(e);let n=!1;if(N.isNode||N.isReactNative){const d={},[m,k]=oe();d[m]=k,s&&(d[re.Authorization]=`Bearer ${s}`),o&&(d[re.Cookie]=o),l=new this._webSocketConstructor(e,void 0,{headers:{...d,...this._headers}})}else s&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(s)}`);l||(l=new this._webSocketConstructor(e)),t===H.Binary&&(l.binaryType="arraybuffer"),l.onopen=d=>{this._logger.log(u.Information,`WebSocket connected to ${e}.`),this._webSocket=l,n=!0,a()},l.onerror=d=>{let m=null;typeof ErrorEvent<"u"&&d instanceof ErrorEvent?m=d.error:m="There was an error with the transport",this._logger.log(u.Information,`(WebSockets transport) ${m}.`)},l.onmessage=d=>{if(this._logger.log(u.Trace,`(WebSockets transport) data received. ${ue(d.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(d.data)}catch(m){this._close(m);return}},l.onclose=d=>{if(n)this._close(d);else{let m=null;typeof ErrorEvent<"u"&&d instanceof ErrorEvent?m=d.error:m="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",r(new Error(m))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(u.Trace,`(WebSockets transport) sending data. ${ue(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(u.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const Oe=100;class At{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,O.isRequired(e,"url"),this._logger=nt(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let s=null,a=null;if(N.isNode&&typeof require<"u"){const r=typeof __webpack_require__=="function"?__non_webpack_require__:require;s=r("ws"),a=r("eventsource")}!N.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:N.isNode&&!t.WebSocket&&s&&(t.WebSocket=s),!N.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:N.isNode&&!t.EventSource&&typeof a<"u"&&(t.EventSource=a),this._httpClient=new Et(t.httpClient||new gt(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||H.Binary,O.isIn(e,H,"transferFormat"),this._logger.log(u.Debug,`Starting connection with transfer format '${H[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(u.Error,t),await this._stopPromise,Promise.reject(new z(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(u.Error,t),Promise.reject(new z(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new Ce(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(u.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(u.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===L.WebSockets)this.transport=this._constructTransport(L.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let s=null,a=0;do{if(s=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new z("The connection was stopped during negotiation.");if(s.error)throw new Error(s.error);if(s.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(s.url&&(t=s.url),s.accessToken){const r=s.accessToken;this._accessTokenFactory=()=>r,this._httpClient._accessToken=r,this._httpClient._accessTokenFactory=void 0}a++}while(s.url&&a<Oe);if(a===Oe&&s.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,s,e)}this.transport instanceof Be&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(u.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(s){return this._logger.log(u.Error,"Failed to start the connection: "+s),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(s)}}async _getNegotiationResponse(e){const t={},[s,a]=oe();t[s]=a;const r=this._resolveNegotiateUrl(e);this._logger.log(u.Debug,`Sending negotiation request: ${r}.`);try{const l=await this._httpClient.post(r,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(l.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${l.statusCode}'`));const o=JSON.parse(l.content);return(!o.negotiateVersion||o.negotiateVersion<1)&&(o.connectionToken=o.connectionId),o.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new De("Client didn't negotiate Stateful Reconnect but the server did.")):o}catch(l){let o="Failed to complete negotiation with the server: "+l;return l instanceof ae&&l.statusCode===404&&(o=o+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(u.Error,o),Promise.reject(new De(o))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,s,a){let r=this._createConnectUrl(e,s.connectionToken);if(this._isITransport(t)){this._logger.log(u.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(r,a),this.connectionId=s.connectionId;return}const l=[],o=s.availableTransports||[];let n=s;for(const d of o){const m=this._resolveTransportOrError(d,t,a,(n==null?void 0:n.useStatefulReconnect)===!0);if(m instanceof Error)l.push(`${d.transport} failed:`),l.push(m);else if(this._isITransport(m)){if(this.transport=m,!n){try{n=await this._getNegotiationResponse(e)}catch(k){return Promise.reject(k)}r=this._createConnectUrl(e,n.connectionToken)}try{await this._startTransport(r,a),this.connectionId=n.connectionId;return}catch(k){if(this._logger.log(u.Error,`Failed to start the transport '${d.transport}': ${k}`),n=void 0,l.push(new at(`${d.transport} failed: ${k}`,L[d.transport])),this._connectionState!=="Connecting"){const R="Failed to select transport before stop() was called.";return this._logger.log(u.Debug,R),Promise.reject(new z(R))}}}}return l.length>0?Promise.reject(new rt(`Unable to connect to the server with any of the available transports. ${l.join(" ")}`,l)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case L.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new $t(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case L.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new _t(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case L.LongPolling:return new Be(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async s=>{let a=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{a=!0}else{this._stopConnection(s);return}a&&this._stopConnection(s)}:this.transport.onclose=s=>this._stopConnection(s),this.transport.connect(e,t)}_resolveTransportOrError(e,t,s,a){const r=L[e.transport];if(r==null)return this._logger.log(u.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Pt(t,r))if(e.transferFormats.map(o=>H[o]).indexOf(s)>=0){if(r===L.WebSockets&&!this._options.WebSocket||r===L.ServerSentEvents&&!this._options.EventSource)return this._logger.log(u.Debug,`Skipping transport '${L[r]}' because it is not supported in your environment.'`),new tt(`'${L[r]}' is not supported in your environment.`,r);this._logger.log(u.Debug,`Selecting transport '${L[r]}'.`);try{return this.features.reconnect=r===L.WebSockets?a:void 0,this._constructTransport(r)}catch(o){return o}}else return this._logger.log(u.Debug,`Skipping transport '${L[r]}' because it does not support the requested transfer format '${H[s]}'.`),new Error(`'${L[r]}' does not support ${H[s]}.`);else return this._logger.log(u.Debug,`Skipping transport '${L[r]}' because it was disabled by the client.`),new st(`'${L[r]}' is disabled by the client.`,r)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(u.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(u.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(u.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(u.Error,`Connection disconnected with error '${e}'.`):this._logger.log(u.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(u.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(u.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!N.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(u.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const s=new URLSearchParams(t.searchParams);return s.has("negotiateVersion")||s.append("negotiateVersion",this._negotiateVersion.toString()),s.has("useStatefulReconnect")?s.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&s.append("useStatefulReconnect","true"),t.search=s.toString(),t.toString()}}function Pt(i,e){return!i||(e&i)!==0}class Ce{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new fe,this._transportResult=new fe,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new fe),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new fe;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):Ce._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(s){e.reject(s)}}}static _concatBuffers(e){const t=e.map(r=>r.byteLength).reduce((r,l)=>r+l),s=new Uint8Array(t);let a=0;for(const r of e)s.set(new Uint8Array(r),a),a+=r.byteLength;return s.buffer}}class fe{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const It="json";class Rt{constructor(){this.name=It,this.version=2,this.transferFormat=H.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=pe.instance);const s=G.parse(e),a=[];for(const r of s){const l=JSON.parse(r);if(typeof l.type!="number")throw new Error("Invalid payload.");switch(l.type){case y.Invocation:this._isInvocationMessage(l);break;case y.StreamItem:this._isStreamItemMessage(l);break;case y.Completion:this._isCompletionMessage(l);break;case y.Ping:break;case y.Close:break;case y.Ack:this._isAckMessage(l);break;case y.Sequence:this._isSequenceMessage(l);break;default:t.log(u.Information,"Unknown message type '"+l.type+"' ignored.");continue}a.push(l)}return a}writeMessage(e){return G.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const Dt={trace:u.Trace,debug:u.Debug,info:u.Information,information:u.Information,warn:u.Warning,warning:u.Warning,error:u.Error,critical:u.Critical,none:u.None};function Nt(i){const e=Dt[i.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${i}`)}class Mt{configureLogging(e){if(O.isRequired(e,"logging"),Bt(e))this.logger=e;else if(typeof e=="string"){const t=Nt(e);this.logger=new ge(t)}else this.logger=new ge(e);return this}withUrl(e,t){return O.isRequired(e,"url"),O.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return O.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new Me(e):this.reconnectPolicy=e:this.reconnectPolicy=new Me,this}withServerTimeout(e){return O.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return O.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new At(this.url,e);return Ee.create(t,this.logger||pe.instance,this.protocol||new Rt,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Bt(i){return i.log!==void 0}class Ot{constructor(){f(this,"hubConnection",null);f(this,"isConnected",!1);f(this,"statusListeners",[])}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Mt().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect().configureLogging(u.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{this.statusListeners.forEach(s=>s(t.orderId,t.status,t.message))}),this.hubConnection.start().then(()=>{this.isConnected=!0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection fallback active (sandbox mode)",t)})}catch{console.log("SignalR running in local simulated mode")}}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,s){this.statusListeners.forEach(a=>a(e,t,s))}}const de=new Ot;class Lt{constructor(){f(this,"token",localStorage.getItem("token")||null);f(this,"currentUser",this.loadStoredUser());f(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);f(this,"listeners",[]);f(this,"listings",[]);f(this,"orders",[]);f(this,"notifications",[]);f(this,"standingOrders",[]);f(this,"anomalyAlerts",[]);f(this,"kycQueue",[]);f(this,"regionalAnalytics",[]);f(this,"priceBenchmarks",[]);f(this,"offlineQueue",[]);f(this,"isOfflineMode",!1);f(this,"farmerSummary",{totalEarnedEtb:48200,pendingEscrowEtb:14850,releasedEtb:48200,completedOrdersCount:18,pendingOrdersCount:1,totalWithholdingTaxPaidEtb:964});f(this,"driverSummary",{totalEarnedEtb:6450,pendingEtb:825,deliveredTripsCount:14,ruralBonusEtb:1250});f(this,"platformStats",{totalUsers:6,totalFarmers:3,totalBuyers:1,totalDrivers:1,totalListings:6,totalOrders:3,totalTransactionVolumeEtb:34500,totalPlatformCommissionEtb:1725,activeEscrowHeldEtb:25500,disputedOrdersCount:1,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:258.75,totalWithholdingReportedEtb:690});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}async init(){this.loadOfflineQueue(),this.initDefaultData(),this.token&&await this.fetchMe(),await this.refreshAllData()}initDefaultData(){this.priceBenchmarks=[{cropName:"Fresh Sholla Red Tomatoes",cropNameAm:"ቀይ ቲማቲም",marketName:"Merkato Wholesale / Sholla",minPriceEtb:38,avgPriceEtb:45,maxPriceEtb:52,trend:"Down",lastUpdated:"Today 6:00 AM"},{cropName:"Organic Magna White Teff",cropNameAm:"የማኛ ነጭ ጤፍ",marketName:"EABC / Addis Depot",minPriceEtb:108,avgPriceEtb:115,maxPriceEtb:125,trend:"Up",lastUpdated:"Today 7:30 AM"},{cropName:"Awash Valley Red Onions",cropNameAm:"ቀይ ሽንኩርት",marketName:"Adama Wholesale Market",minPriceEtb:48,avgPriceEtb:55,maxPriceEtb:62,trend:"Stable",lastUpdated:"Today 6:15 AM"},{cropName:"Hawassa Hass Avocados",cropNameAm:"ሀስ አቮካዶ",marketName:"Hawassa Central / Merkato",minPriceEtb:50,avgPriceEtb:60,maxPriceEtb:72,trend:"Up",lastUpdated:"Today 8:00 AM"},{cropName:"Specialty Green Coffee Beans",cropNameAm:"ስፔሻሊቲ ቡና",marketName:"ECX Central Exchange",minPriceEtb:340,avgPriceEtb:380,maxPriceEtb:420,trend:"Up",lastUpdated:"Yesterday"},{cropName:"Bishoftu Sweet Strawberries",cropNameAm:"የቢሾፍቱ እንጆሪ",marketName:"Bole Fresh Produce Hub",minPriceEtb:85,avgPriceEtb:95,maxPriceEtb:110,trend:"Stable",lastUpdated:"Today 7:00 AM"}],this.standingOrders=[{id:"so-1",listingId:"a1b2c3d4-0001-0000-0000-000000000001",productName:"Fresh Sholla Red Tomatoes",productNameAm:"የሾላ ቀይ ቲማቲም",farmerName:"Abebe Bekele",qtyKg:150,pricePerKg:45,frequency:"Weekly",nextDeliveryDate:"Next Monday, 8:00 AM",active:!0,createdAt:new Date().toISOString()},{id:"so-2",listingId:"a1b2c3d4-0003-0000-0000-000000000003",productName:"Awash Valley Red Onions",productNameAm:"የአዋሽ ቀይ ሽንኩርት",farmerName:"Abebe Bekele",qtyKg:200,pricePerKg:55,frequency:"Bi-Weekly",nextDeliveryDate:"Next Thursday, 9:00 AM",active:!0,createdAt:new Date().toISOString()}],this.anomalyAlerts=[{id:"ANOM-101",severity:"High",type:"PriceManipulation",title:"Unusual Price Spike Detected",description:"Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",entityType:"Listing",entityId:"a1b2c3d4-0001-0000-0000-000000000001",detectedAt:"35 mins ago"},{id:"ANOM-102",severity:"Medium",type:"DuplicateProofPhoto",title:"Driver Proof Image Hash Match",description:"Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",entityType:"Order",entityId:"b1b2c3d4-0002-0000-0000-000000000002",detectedAt:"2 hours ago"},{id:"ANOM-103",severity:"Low",type:"FakeAccount",title:"Rapid Registration Cluster",description:"Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",entityType:"User",entityId:"44444444-4444-4444-4444-444444444444",detectedAt:"5 hours ago"}],this.kycQueue=[{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede (Driver)",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",documentType:"Commercial Vehicle Logbook & License",documentNumber:"ET-LOG-5T-98214",tinNumber:"TIN-DRV-981244",kycTier:3,status:"Pending",submittedAt:"Yesterday"},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele (Farmer)",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",documentType:"National ID (Fayda)",documentNumber:"FAYDA-ET-8829104",tinNumber:"TIN-FARM-882910",kycTier:2,status:"Verified",submittedAt:"3 days ago"},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu (Farmer)",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",documentType:"Kebele Smallholder ID",documentNumber:"HAW-KEB-4410",kycTier:1,status:"Pending",submittedAt:"12 hours ago"}],this.regionalAnalytics=[{region:"Oromia (East Shewa / Bishoftu)",smallholdersCount:4200,volumeMetricTons:68.5,totalGmvEtb:385e4,topCrop:"Tomatoes & Onions"},{region:"Amhara (Debre Berhan / Gojjam)",smallholdersCount:3100,volumeMetricTons:42,totalGmvEtb:483e4,topCrop:"Magna White Teff"},{region:"Sidama (Hawassa / Yirgalem)",smallholdersCount:1950,volumeMetricTons:24.8,totalGmvEtb:1488e3,topCrop:"Hass Avocados & Fruits"},{region:"SNNPR (Gedeo / Yirgacheffe)",smallholdersCount:1400,volumeMetricTons:10.5,totalGmvEtb:399e4,topCrop:"Specialty Green Coffee"}]}loadOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");e&&(this.offlineQueue=JSON.parse(e))}catch{this.offlineQueue=[]}}saveOfflineQueue(){localStorage.setItem("offlineQueue",JSON.stringify(this.offlineQueue))}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),s={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,role:(t.role||"buyer").toLowerCase(),region:t.region,verified:t.verified,tinNumber:t.tinNumber||(t.role==="buyer"?"TIN-ET-9912001":"TIN-FARM-882910"),businessLicenseNumber:t.businessLicenseNumber||"MOT-LIC-2026-98124",vehicleType:t.vehicleType||"Isuzu 5-Ton",refrigerationType:t.refrigerationType||"Ventilated",vehicleCapacityKg:t.vehicleCapacityKg||5e3,kycDocumentType:t.kycDocumentType,kycDocumentNumber:t.kycDocumentNumber,kycStatus:t.kycStatus||"Verified",kycTier:t.kycTier||2,repeatBuyerCount:t.repeatBuyerCount||14,onTimeDeliveryRate:t.onTimeDeliveryRate||99,walletBalanceEtb:t.walletBalanceEtb||48200,createdAt:t.createdAt};return this.currentUser=s,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(s)),this.notify(),s}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async requestOtp(e){const t=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),s=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(!s.ok){const a=await s.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(a.error||"Failed to request OTP. Please check your phone number.")}return await s.json()}async verifyOtp(e,t){const s=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),a=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:s,code:t.trim()})});if(!a.ok){const o=await a.json().catch(()=>({error:"Invalid verification code or phone"}));throw new Error(o.error||"Authentication failed")}const r=await a.json();this.token=r.token,localStorage.setItem("token",r.token);const l={id:r.user.id,phone:r.user.phone,name:r.user.name,nameAm:r.user.nameAm,role:(r.user.role||"buyer").toLowerCase(),region:r.user.region,verified:r.user.verified,tinNumber:r.user.role==="buyer"?"TIN-ET-9912001":"TIN-FARM-882910",businessLicenseNumber:"MOT-LIC-2026-98124",vehicleType:r.user.vehicleType||"Isuzu 5-Ton",refrigerationType:r.user.refrigerationType||"Ventilated",vehicleCapacityKg:r.user.vehicleCapacityKg||5e3,kycDocumentType:r.user.kycDocumentType,kycDocumentNumber:r.user.kycDocumentNumber,kycStatus:r.user.kycStatus||"Verified",kycTier:2,repeatBuyerCount:r.user.repeatBuyerCount||14,onTimeDeliveryRate:r.user.onTimeDeliveryRate||99,walletBalanceEtb:r.user.walletBalanceEtb||48200,createdAt:r.user.createdAt};return this.currentUser=l,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(l)),de.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),l}async registerUser(e,t,s,a,r){const l=s.startsWith("+251")?s:"+251"+s.replace(/^0+/,""),o=a.charAt(0).toUpperCase()+a.slice(1).toLowerCase(),n=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,phone:l,role:o,region:r})});if(!n.ok){const k=await n.json().catch(()=>({error:"Registration failed"}));throw new Error(k.error||"Registration failed")}const d=await n.json();this.token=d.token,localStorage.setItem("token",d.token);const m={id:d.user.id,phone:d.user.phone,name:d.user.name,nameAm:d.user.nameAm,role:(d.user.role||"buyer").toLowerCase(),region:d.user.region,verified:d.user.verified,tinNumber:"TIN-NEW-"+Math.floor(1e5+Math.random()*9e5),businessLicenseNumber:"MOT-LIC-2026-NEW",vehicleType:a==="driver"?"Isuzu 5-Ton":void 0,refrigerationType:a==="driver"?"Ventilated":void 0,vehicleCapacityKg:a==="driver"?5e3:void 0,kycDocumentType:"National ID (Fayda)",kycDocumentNumber:"FAYDA-NEW-"+Math.floor(1e5+Math.random()*9e5),kycStatus:"Verified",kycTier:2,repeatBuyerCount:5,onTimeDeliveryRate:98,walletBalanceEtb:0,createdAt:d.user.createdAt};return this.currentUser=m,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),de.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(){try{const e=await fetch("/api/listings");if(e.ok){const t=await e.json(),s=Array.isArray(t)?t:t.items||[];return this.listings=s.map(a=>({id:a.id,farmerId:a.farmerId,farmerName:a.farmerName,farmerNameAm:a.farmerNameAm,farmerPhone:a.farmerPhone,region:a.region,productName:a.productName,nameAm:a.nameAm,category:a.category,qtyKg:Number(a.qtyKg),pricePerKg:Number(a.pricePerKg),minOrderKg:Number(a.minOrderKg),latitude:a.latitude,longitude:a.longitude,distanceKm:a.distanceKm,photos:a.photos&&a.photos.length>0?a.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:a.availableFrom||new Date().toISOString().split("T")[0],status:(a.status||"Active").toLowerCase(),grade:a.grade||"Grade 1",ripeness:a.ripeness||"Ready Today",isOrganic:a.isOrganic??!0,isAdvanceHarvest:a.isAdvanceHarvest??!1,expectedHarvestDate:a.expectedHarvestDate,voiceNoteUrl:a.voiceNoteUrl,voiceNoteTranscript:a.voiceNoteTranscript,marketBenchmarkPrice:a.marketBenchmarkPrice||a.pricePerKg,moderationStatus:a.moderationStatus||"Approved",farmerRating:a.farmerRating||4.9,reviewCount:a.reviewCount||14,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:a.createdAt})),this.notify(),this.listings}}catch(e){console.warn("Fetch listings from backend failed",e)}return this.listings}getListings(e,t,s,a,r,l,o,n){return this.listings.filter(d=>{if(d.status!=="active"||e&&e!=="All"&&d.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!d.region.toLowerCase().includes(t.toLowerCase())||r&&r!=="All"&&d.grade!==r||l&&l!=="All"&&d.ripeness!==l||o&&!d.isOrganic||n&&!d.isAdvanceHarvest||a&&d.distanceKm&&d.distanceKm>a)return!1;if(s){const m=s.toLowerCase();if(!(d.productName.toLowerCase().includes(m)||d.nameAm&&d.nameAm.includes(m)||d.farmerName.toLowerCase().includes(m)||d.region.toLowerCase().includes(m)))return!1}return!0})}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var l,o,n,d;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category||"Vegetables",qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate||null,voiceNoteUrl:e.voiceNoteUrl||null,voiceNoteTranscript:e.voiceNoteTranscript||null,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg},s=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(!s.ok)throw new Error("Failed to create listing in database");const a=await s.json(),r={id:a.id,farmerId:a.farmerId,farmerName:a.farmerName||((l=this.currentUser)==null?void 0:l.name)||"Abebe Bekele",farmerNameAm:a.farmerNameAm||((o=this.currentUser)==null?void 0:o.nameAm)||"አበበ በቀለ",farmerPhone:a.farmerPhone||((n=this.currentUser)==null?void 0:n.phone)||"+251911223344",region:a.region||((d=this.currentUser)==null?void 0:d.region)||"Oromia (Bishoftu)",productName:a.productName,nameAm:a.nameAm,category:a.category,qtyKg:Number(a.qtyKg),pricePerKg:Number(a.pricePerKg),minOrderKg:Number(a.minOrderKg),latitude:a.latitude,longitude:a.longitude,distanceKm:a.distanceKm||45,photos:a.photos&&a.photos.length>0?a.photos:e.photos||["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:a.availableFrom,status:"active",grade:a.grade||e.grade||"Grade 1",ripeness:a.ripeness||e.ripeness||"Ready Today",isOrganic:a.isOrganic??e.isOrganic??!0,isAdvanceHarvest:a.isAdvanceHarvest??e.isAdvanceHarvest??!1,expectedHarvestDate:a.expectedHarvestDate||e.expectedHarvestDate,voiceNoteUrl:a.voiceNoteUrl||e.voiceNoteUrl,voiceNoteTranscript:a.voiceNoteTranscript||e.voiceNoteTranscript,marketBenchmarkPrice:a.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:a.createdAt};return this.listings.unshift(r),this.notify(),r}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(s=>{const a=Number(s.totalEtb),r=Number(s.farmerCut||a*.9),l=Number(s.driverCut||a*.05),o=Number(s.platformCut||a*.05),n=Math.round(a*.02),d=Math.round(o*.15);return{id:s.id,listingId:s.listingId,productName:s.productName,productNameAm:s.productNameAm,category:s.category,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,farmerRegion:s.farmerRegion,buyerId:s.buyerId,buyerName:s.buyerName,buyerPhone:s.buyerPhone,driverId:s.driverId,driverName:s.driverName,driverPhone:s.driverPhone,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),totalEtb:a,farmerCut:r,driverCut:l,platformCut:o,driverSubsidyEtb:Number(s.driverSubsidyEtb||150),withholdingTaxEtb:n,platformVatEtb:d,status:(s.status||"Pending").toLowerCase(),escrowHeld:s.escrowHeld,paymentRef:s.paymentRef||`TB-${s.id.slice(0,8).toUpperCase()}`,invoiceNumber:`ET-INV-2026-${s.id.slice(0,6).toUpperCase()}`,waybillNumber:`WB-FTA-${s.id.slice(0,6).toUpperCase()}`,contractNumber:`AGR-ET-${s.id.slice(0,6).toUpperCase()}`,arbitrationDecreeNumber:s.status==="disputed"?`ARB-DEC-${s.id.slice(0,6).toUpperCase()}`:void 0,pickupPhoto:s.pickupPhoto,deliveryPhoto:s.deliveryPhoto,deliveryGpsLat:s.deliveryGpsLat,deliveryGpsLng:s.deliveryGpsLng,deliveredAt:s.deliveredAt,deliveryAddress:s.deliveryAddress,deliveryNotes:s.deliveryNotes,disputeReason:s.disputeReason,disputePhoto:s.disputePhoto,requestedRefundPercent:s.requestedRefundPercent||100,disputeStatus:s.disputeStatus||"None",disputeResolutionNotes:s.disputeResolutionNotes,isRecurring:s.isRecurring||!1,recurringFrequency:s.recurringFrequency,confirmedAt:s.confirmedAt,createdAt:s.createdAt}}),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(s=>s.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(s=>s.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(s=>s.driverId===this.currentUser.id||s.status==="confirmed"&&!s.driverId):this.orders}async placeOrder(e,t,s,a=!1,r="Weekly"){var n;if(!this.listings.find(d=>d.id===e))throw new Error("Listing not found");if(!(await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:s||((n=this.currentUser)==null?void 0:n.region)||"Addis Ababa (Bole)",isRecurring:a,recurringFrequency:a?r:null})})).ok)throw new Error("Failed to place order in database");return await this.fetchOrders(),await this.fetchListings(),this.orders[0]||this.orders.find(d=>d.listingId===e)}async confirmOrderByFarmer(e){await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders()}async pickupOrderByDriver(e,t){if(this.isOfflineMode){this.offlineQueue.push({id:"off-"+Date.now(),type:"pickup",orderId:e,timestamp:new Date().toISOString(),data:{photo:t},synced:!1}),this.saveOfflineQueue();const s=this.orders.find(a=>a.id===e);s&&(s.status="picked_up",s.pickupPhoto=t),this.notify();return}await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"})}),await this.fetchOrders()}async confirmDeliveryByBuyer(e,t,s,a){await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({deliveryPhoto:t||"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",deliveryGpsLat:s||9.03,deliveryGpsLng:a||38.74})}),await this.fetchOrders()}async disputeOrder(e,t,s,a=50){await fetch(`/api/orders/${e}/dispute`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,disputePhoto:s||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",requestedRefundPercent:a})}),await this.fetchOrders()}async resolveDispute(e,t,s=50,a=50){await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:`Arbitrated via Admin Console (${t})`,farmerSharePercent:s,buyerRefundPercent:a})}),await this.fetchOrders()}getTaxInvoice(e){const t=this.orders.find(r=>r.id===e)||this.orders[0]||{id:e,productName:"Fresh Sholla Red Tomatoes",qtyKg:200,pricePerKg:45,totalEtb:9e3,farmerCut:8100,driverCut:450,platformCut:450,farmerName:"Abebe Bekele",farmerRegion:"Oromia (Bishoftu)",farmerPhone:"+251 911 223 344",buyerName:"Bethlehem Tilahun (FreshMart)",buyerPhone:"+251 955 667 788",paymentRef:"TB-TXN-98217391",invoiceNumber:"ET-INV-2026-001",createdAt:new Date().toISOString()},s=Math.round(t.platformCut*.15),a=Math.round(t.totalEtb*.02);return{invoiceNumber:t.invoiceNumber||`ET-INV-2026-${t.id.slice(0,6).toUpperCase()}`,orderId:t.id,issueDate:t.createdAt?new Date(t.createdAt).toLocaleDateString("en-GB"):new Date().toLocaleDateString("en-GB"),paymentRef:t.paymentRef||`TB-C2B-${t.id.slice(0,8).toUpperCase()}`,sellerName:t.farmerName,sellerTin:"TIN-FARM-8829104",sellerRegion:t.farmerRegion,sellerPhone:t.farmerPhone,sellerType:"Registered Agricultural Smallholder Producer",buyerName:t.buyerName,buyerTin:"TIN-ET-9912001",buyerRegion:"Addis Ababa (Bole)",buyerPhone:t.buyerPhone,productName:t.productName,productNameAm:t.productNameAm,grade:"Grade 1 (Certified Farm Standard)",qtyKg:t.qtyKg,unitPriceEtb:t.pricePerKg,grossAmountEtb:t.totalEtb,farmerPayoutEtb:t.farmerCut,driverFreightEtb:t.driverCut,platformServiceFeeEtb:t.platformCut,platformVatEtb:s,withholdingTaxEtb:a,totalPaidViaTelebirr:t.totalEtb,regulatoryAct:"Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)",qrVerificationCode:`ET-TAX-AUTH-2026-VERIFIED-${t.id.slice(0,8).toUpperCase()}`,isVatExemptAgriculturalGoods:!0}}getTransportWaybill(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{waybillNumber:(t==null?void 0:t.waybillNumber)||`WB-FTA-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,dispatchDate:new Date().toLocaleDateString("en-GB"),consignorName:(t==null?void 0:t.farmerName)||"Abebe Bekele",consignorFarmLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu Green Farms, Oromia",consignorPhone:(t==null?void 0:t.farmerPhone)||"+251 911 223 344",consigneeName:(t==null?void 0:t.buyerName)||"FreshMart Central Wholesale Hub",consigneeDepotAddress:(t==null?void 0:t.deliveryAddress)||"Bole Depot, Addis Ababa",consigneePhone:(t==null?void 0:t.buyerPhone)||"+251 955 667 788",carrierDriverName:(t==null?void 0:t.driverName)||"Dawit Kebede",driverLicenseNumber:"ET-CDL-COMM-89104",vehiclePlateNumber:"ET-3-B98124-AA",vehicleModel:"Isuzu 5-Ton Commercial Freight Carrier",refrigerationStatus:"Ventilated Agri-Body Cargo (18°C)",insurancePolicyNumber:"NIC-ET-CARGO-771920",cargoDescription:`${(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes"} (Grade 1)`,packageCount:Math.ceil(((t==null?void 0:t.qtyKg)||200)/25),netWeightKg:(t==null?void 0:t.qtyKg)||200,grossWeightKg:((t==null?void 0:t.qtyKg)||200)+18,tareWeightKg:18,temperatureLogCelsius:17.5,farmerHandoffTimestamp:"06:30 AM (Farm Gate)",driverSignatureRef:"DAWIT-KEBEDE-VERIFIED-LOG",buyerReceivedTimestamp:(t==null?void 0:t.status)==="delivered"?"09:45 AM (Bole Depot)":void 0,transitStatus:(t==null?void 0:t.status)==="delivered"?"DeliveredWithGPS":(t==null?void 0:t.status)==="picked_up"?"InTransit":"Dispatched"}}getLegalContract(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{contractNumber:(t==null?void 0:t.contractNumber)||`AGR-CONTR-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,agreementDate:new Date().toLocaleDateString("en-GB"),effectiveDate:new Date().toLocaleDateString("en-GB"),sellerName:(t==null?void 0:t.farmerName)||"Abebe Bekele",sellerIdNumber:"FAYDA-ET-8829104",sellerLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu, Oromia, Ethiopia",buyerName:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun (FreshMart Wholesale)",buyerTinNumber:"TIN-ET-9912001",buyerLocation:(t==null?void 0:t.deliveryAddress)||"Addis Ababa, Ethiopia",cropType:(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes",contractedQuantityKg:(t==null?void 0:t.qtyKg)||200,agreedPricePerKg:(t==null?void 0:t.pricePerKg)||45,totalContractValueEtb:(t==null?void 0:t.totalEtb)||9e3,qualityStandardClause:"Produce shall conform to Grade 1 Ethiopian Commodity Quality Standards (Maximum defect tolerance 2.5%, moisture within physiological thresholds).",deliveryTimeline:"Direct farm-to-depot transit guaranteed within 12 hours of farmer harvest confirmation.",escrowClauseText:"Purchase consideration is locked in Telebirr C2B Escrow and shall be automatically disbursed (90% Farmer / 5% Driver / 5% Platform) upon buyer delivery verification.",forceMajeureClauseText:"Neither party shall be liable for delivery failure caused by natural agricultural catastrophes, unseasonal frost, or national logistical force majeure.",disputeJurisdiction:"Federal Democratic Republic of Ethiopia Commercial Code and Ethiopian Agricultural Authority Arbitration Rules.",eSignatures:{sellerSigned:!0,sellerSignDate:"Digitally Authenticated via OTP/Fayda",buyerSigned:!0,buyerSignDate:"Digitally Authenticated via Telebirr Escrow Lock",platformWitnessHash:`EABC-FM-TRUST-SEAL-${e.slice(0,8).toUpperCase()}`}}}getDisputeMediationRecord(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{caseNumber:(t==null?void 0:t.arbitrationDecreeNumber)||`ARB-CASE-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,filingDate:"Yesterday 3:15 PM",resolutionDate:(t==null?void 0:t.status)==="disputed"?void 0:"Today 11:30 AM",status:(t==null?void 0:t.status)==="disputed"?"UnderInvestigation":"Settled",claimantBuyer:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun",respondentFarmer:(t==null?void 0:t.farmerName)||"Chala Gemechu",freightCarrier:(t==null?void 0:t.driverName)||"Dawit Kebede",totalDisputedAmountEtb:(t==null?void 0:t.totalEtb)||9e3,disputeReason:(t==null?void 0:t.disputeReason)||"Delivered avocados were overripe and 20% bruised during transit from Hawassa.",claimedDefectPercentage:(t==null?void 0:t.requestedRefundPercent)||50,inspectionReport:"Independent physical inspection at Bole Cold Storage Depot confirmed 18.5% transit softening on batch packaging.",photoEvidenceUrl:(t==null?void 0:t.disputePhoto)||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",leadArbitratorName:"Sara Mengistu (Marketplace Compliance Arbitrator)",legalFindingSummary:"Partial packaging failure during transit. Fair 50/50 equitable split awarded under Ethiopian Commercial Code Art. 2289.",arbitrationVerdict:"FiftyFiftySplit",farmerSettlementEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),buyerRefundEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),platformDecreeHash:`LEGAL-DECREE-ARB-${e.slice(0,8).toUpperCase()}`}}getPriceBenchmarks(){return this.priceBenchmarks}getStandingOrders(){return this.standingOrders}addStandingOrder(e,t,s){const a=this.listings.find(l=>l.id===e),r={id:"so-"+Date.now(),listingId:e,productName:(a==null?void 0:a.productName)||"Fresh Produce",productNameAm:a==null?void 0:a.nameAm,farmerName:(a==null?void 0:a.farmerName)||"Abebe Bekele",qtyKg:t,pricePerKg:(a==null?void 0:a.pricePerKg)||45,frequency:s,nextDeliveryDate:s==="Weekly"?"Next Monday, 8:00 AM":"Every 2nd Thursday",active:!0,createdAt:new Date().toISOString()};return this.standingOrders.unshift(r),this.notify(),r}toggleStandingOrder(e){const t=this.standingOrders.find(s=>s.id===e);t&&(t.active=!t.active,this.notify())}getKycQueue(){return this.kycQueue}async verifyKyc(e,t){const s=this.kycQueue.find(a=>a.userId===e);if(s){s.status=t?"Verified":"Rejected";try{await fetch(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${s.status}`,{method:"PUT",headers:this.getAuthHeaders()})}catch(a){console.warn("KYC update remote failed, updating local state",a)}this.notify()}}getAnomalyAlerts(){return this.anomalyAlerts}getRegionalAnalytics(){return this.regionalAnalytics}getOptimizedRoute(){return{id:"route-oromia-addis-01",title:"Consolidated East Shewa Multi-Farm Route",totalDistanceKm:68.4,estimatedHours:2.5,totalWeightKg:2800,driverCommissionEtb:1450,ruralSubsidyEtb:350,stops:[{stopNumber:1,type:"pickup",locationName:"Bishoftu Green Farms (Abebe Bekele)",contactName:"Abebe Bekele",phone:"+251 911 223 344",cargoDetails:"Fresh Sholla Red Tomatoes",weightKg:1200,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Valley Farm (Almaz Hailu)",contactName:"Almaz Hailu",phone:"+251 922 334 455",cargoDetails:"Awash Valley Red Onions",weightKg:1600,completed:!1},{stopNumber:3,type:"dropoff",locationName:"FreshMart Central Wholesale Hub (Bole, Addis Ababa)",contactName:"Bethlehem Tilahun",phone:"+251 955 667 788",cargoDetails:"Consolidated Wholesale Dropoff (2,800 kg total)",weightKg:2800,completed:!1}]}}updateDriverVehicle(e,t,s){this.currentUser&&this.currentUser.role==="driver"&&(this.currentUser.vehicleType=e,this.currentUser.refrigerationType=t,this.currentUser.vehicleCapacityKg=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify())}toggleOfflineMode(){return this.isOfflineMode=!this.isOfflineMode,this.notify(),this.isOfflineMode}getIsOfflineMode(){return this.isOfflineMode}getOfflineQueue(){return this.offlineQueue}async syncOfflineQueue(){var s;const e=this.offlineQueue.filter(a=>!a.synced);for(const a of e)a.type==="pickup"&&await this.pickupOrderByDriver(a.orderId,(s=a.data)==null?void 0:s.photo),a.synced=!0;const t=e.length;return this.offlineQueue=[],this.saveOfflineQueue(),this.notify(),t}async sendInboundSms(e,t){try{const s=await fetch("/api/sms/inbound",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:e,body:t})});if(s.ok){const a=await s.json();return await this.refreshAllData(),a.response}}catch(s){console.warn("SMS Webhook call failed, simulating response",s)}return`[SIMULATED SMS ACK] Received: "${t}". Processed successfully in offline cache.`}simulateVoiceTranscription(e,t){return t==="am"?{productName:"Fresh Sholla Red Tomatoes",nameAm:"የሾላ ቀይ ቲማቲም",category:"Vegetables",qtyKg:1500,pricePerKg:45,region:"Oromia (Bishoftu)",transcript:"1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"}:t==="om"?{productName:"Awash Red Onions",nameAm:"የአዋሽ ቀይ ሽንኩርት",category:"Vegetables",qtyKg:2e3,pricePerKg:55,region:"Oromia (Adama)",transcript:"Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."}:{productName:"Grade 1 Specialty Green Coffee",nameAm:"የይርጋጨፌ ስፔሻሊቲ ቡና",category:"Coffee",qtyKg:800,pricePerKg:380,region:"SNNPR (Yirgacheffe)",transcript:"We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."}}requestWalletWithdrawal(e,t){return this.currentUser?(this.currentUser.walletBalanceEtb=Math.max(0,(this.currentUser.walletBalanceEtb||48200)-e),this.farmerSummary.releasedEtb+=e,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify(),!0):!1}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round(Number(t.totalEarnedEtb)*.02)}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount,ruralBonusEtb:1250}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount,totalMetricTonsMoved:Number(t.totalMetricTonsMoved||145.8),middlemanMarginSavedEtb:Number(t.middlemanMarginSavedEtb||48e4),totalVatRemittedEtb:Number(t.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:Number(t.totalTransactionVolumeEtb)*.02}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(a=>{var r;return a.farmerId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.farmerCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:s||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(a=>a.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round((t||this.farmerSummary.totalEarnedEtb)*.02)}}getDriverSummary(){const e=this.orders.filter(a=>{var r;return a.driverId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.driverCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:s||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(a=>a.status==="delivered").length||this.driverSummary.deliveredTripsCount,ruralBonusEtb:1250}}getPlatformStats(){const e=this.orders.reduce((r,l)=>r+l.totalEtb,0),t=this.orders.filter(r=>r.status==="delivered").reduce((r,l)=>r+l.platformCut,0),s=this.orders.filter(r=>r.escrowHeld).reduce((r,l)=>r+l.totalEtb,0),a=this.orders.filter(r=>r.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:s||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:a||this.platformStats.disputedOrdersCount,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:(t||this.platformStats.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:(e||this.platformStats.totalTransactionVolumeEtb)*.02}}getNotifications(){return!this.isUserLoggedIn||!this.currentUser?[]:this.notifications.filter(e=>e.userId===this.currentUser.id||this.currentUser.role==="admin")}async broadcastSms(e,t,s){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:s})})}catch(a){console.warn("Broadcast SMS API call error",a)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${s.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${s}] ${t}`,read:!1,sentAt:new Date().toISOString()}),this.notify())}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchSummaries()]),this.notify()}}const h=new Lt,X={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLegalDocuments:"Contracts & Tax Invoices",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Farm Details",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",viewContractBtn:"View Sales Contract",viewInvoiceBtn:"Download Tax Invoice",viewWaybillBtn:"Transport Waybill (Manifest)",viewArbitrationBtn:"Arbitration Determination",printDocument:"Print / Save PDF",closeDocument:"Close Document",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Tax Statements (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",withholdingTaxReported:"Withholding Tax (2% Goods)",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release & Tax Log",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Cargo Manifest",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Governance, Law & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",statVatRemitted:"VAT on Platform Fees (15%)",statWithholding:"Withholding Tax (2%)",resolveDisputeTitle:"Escrow Legal Arbitration Console",disputeEvidence:"Evidence & Inspection Report",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Tiered KYC & Trade Registry Queue",approveKycBtn:"Approve Identity & License",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLegalDocuments:"ውሎች እና የግብር ደረሰኞች",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"የእርሻ ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",viewContractBtn:"የግብይት ውል ይመልከቱ",viewInvoiceBtn:"የግብር እና ሽያጭ ደረሰኝ (e-VAT)",viewWaybillBtn:"የጭነት ማጓጓዣ ሰነድ (Waybill)",viewArbitrationBtn:"የሽምግልና ውሳኔ ሰነድ",printDocument:"አትም / ፒዲኤፍ አስቀምጥ",closeDocument:"ሰነዱን ዝጋ",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የግብር መግለጫ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",withholdingTaxReported:"የተያዘ ግብር (2% Withholding)",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ እና የደረሰኝ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር፣ ህጋዊነት እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",statVatRemitted:"የተሰበሰበ የተጨማሪ እሴት ታክስ (15% VAT)",statWithholding:"የተያዘ ግብር (2% Withholding)",resolveDisputeTitle:"የህጋዊ ቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና የፍተሻ ሪፖርት",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የተጠቃሚዎች ህጋዊነት እና የንግድ ፈቃድ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ እና ፈቃድ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function Ft(i,e,t,s,a,r,l=""){const o=X[i],n=a.reduce((k,R)=>k+R.qtyKg,0),d={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"}},m=e?d[e.role]||d.buyer:null;return`
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

                  <!-- Quick Portal Navigation -->
                  <div class="space-y-1 text-xs font-bold text-slate-700">
                    <button onclick="window.navigateTab('${e.role}');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer">
                      <span class="flex items-center gap-2">
                        <i class="fa-solid fa-gauge text-emerald-600"></i> My Portal Dashboard
                      </span>
                      <i class="fa-solid fa-arrow-right text-[10px] text-slate-400"></i>
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
              ${r>0?`
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                  ${r}
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
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="marketplace"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-store"></i> ${o.navMarketplace}
            </button>

            ${t&&(e==null?void 0:e.role)==="farmer"?`
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="farmer"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-tractor"></i> ${o.navFarmerPortal}
              </button>
              <button onclick="window.toggleCreateListingModal()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${o.postNewListing}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="driver"?`
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="driver"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-truck"></i> ${o.navDriverPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="admin"?`
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="admin"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${i==="am"?"lang-am":""}">
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
  `}function jt(i,e,t,s,a,r,l,o,n,d=null,m=0,k="All",R="All",K=!1,Z=!1,j="marketplace",D=h.getStandingOrders(),ne=h.getOrders("buyer")){const b=X[i],le=[{key:"All",label:b.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:b.catVegetables,icon:"fa-carrot"},{key:"Grains",label:b.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:b.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:b.catCoffee,icon:"fa-mug-hot"}],te=r.reduce((w,U)=>w+U.qtyKg*U.listing.pricePerKg,0),me=Math.round(te*.9),he=Math.round(te*.05),xe=te-me-he,ve=r.reduce((w,U)=>{const W=U.listing.farmerId;return w[W]||(w[W]={farmerName:U.listing.farmerName,farmerRegion:U.listing.region,items:[]}),w[W].items.push(U),w},{});return`
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
              ${b.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${i==="am"?"lang-am":""}">
              ${b.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> Browse Farm Deals
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${b.navOrders} & Invoices (${ne.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${b.standingOrdersTitle}
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
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${j==="marketplace"?"active":""}">
            <i class="fa-solid fa-store"></i>
            <span>${i==="am"?"የጅምላ ገበያ":"Wholesale Marketplace"}</span>
          </button>
          <button onclick="window.setBuyerSubTab('orders')" class="cat-pill ${j==="orders"?"active":""}">
            <i class="fa-solid fa-receipt"></i>
            <span>${b.navOrders} & ${b.navLegalDocuments} (${ne.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${j==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${b.standingOrdersTitle} (${D.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${j==="standing_orders"?Wt(i,D):j==="orders"?Ht(i,ne):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${le.map(w=>`
            <button onclick="window.setCategory('${w.key}')" 
              class="cat-pill ${t===w.key?"active":""} ${i==="am"?"lang-am":""}">
              <i class="fa-solid ${w.icon}"></i>
              <span>${w.label}</span>
            </button>
          `).join("")}
        </div>

        <!-- Filter Controls Bar -->
        <div class="glass-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <!-- PostGIS Geo-Proximity Radius Slider -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${b.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0,25,50,100].map(w=>`
                <button onclick="window.setMaxDistanceKm(${w})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${m===w?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${w===0?"All":w+" km"}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${b.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${k==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${k==="Grade 1"?"selected":""}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${k==="Grade 2"?"selected":""}>Grade 2 (Value)</option>
              <option value="Export Grade" ${k==="Export Grade"?"selected":""}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${b.filterRipeness}:</span>
            <select onchange="window.setFilterRipeness(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${R==="All"?"selected":""}>All Ripeness</option>
              <option value="Ready Today" ${R==="Ready Today"?"selected":""}>Ready Today</option>
              <option value="Semi-Ripe" ${R==="Semi-Ripe"?"selected":""}>Semi-Ripe</option>
              <option value="Green / Storable" ${R==="Green / Storable"?"selected":""}>Green / Storable</option>
            </select>
          </div>

          <!-- Toggle Flags -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${K?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${b.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${Z?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${b.filterAdvance}</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Produce Marketplace Grid -->
      <section class="space-y-4">
        
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
            <i class="fa-solid fa-boxes-packing text-emerald-600 mr-2"></i> ${b.catAll} (${e.length})
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
            ${e.map(w=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between">
                
                <div>
                  <div class="h-48 w-full relative overflow-hidden group">
                    <img src="${w.photos[0]}" alt="${w.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                    <div class="absolute top-3 left-3 flex flex-col gap-1">
                      ${w.isAdvanceHarvest?`
                        <span class="advance-pill shadow-md">
                          <i class="fa-solid fa-calendar-check text-emerald-700"></i> Advance Harvest
                        </span>
                      `:""}
                      ${w.isOrganic?`
                        <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                          Organic Certified
                        </span>
                      `:""}
                    </div>

                    <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                      ${w.pricePerKg} ETB<span class="text-[10px] font-normal text-slate-300">/kg</span>
                    </span>

                    ${w.distanceKm?`
                      <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${w.distanceKm} km ${b.farmDistance}
                      </span>
                    `:""}
                  </div>

                  <div class="p-5 space-y-3">
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span class="text-amber-700 font-bold"><i class="fa-solid fa-award mr-1"></i> ${w.grade||"Grade 1"}</span>
                      <span class="text-slate-600 font-medium">${w.ripeness||"Ready Today"}</span>
                    </div>

                    <h3 class="font-extrabold text-slate-900 text-lg leading-snug ${i==="am"?"lang-am":""}">
                      ${i==="am"&&w.nameAm?w.nameAm:w.productName}
                    </h3>

                    <!-- Farmer Credibility & Trust Badges -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800"><i class="fa-solid fa-user-check text-emerald-600 mr-1"></i> ${w.farmerName}</span>
                        <span class="text-amber-600 font-extrabold"><i class="fa-solid fa-star mr-1"></i> ${w.farmerRating}</span>
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                        <span><i class="fa-solid fa-location-dot text-emerald-600"></i> ${w.region}</span>
                        <span>·</span>
                        <span>${w.repeatBuyerCount||18} Repeat Wholesalers</span>
                      </div>
                    </div>

                    ${w.voiceNoteTranscript?`
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                        <i class="fa-solid fa-microphone-lines text-emerald-700 text-sm mt-0.5"></i>
                        <span class="italic leading-tight">"${w.voiceNoteTranscript}"</span>
                      </div>
                    `:""}

                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Available: <strong class="font-bold text-slate-900">${w.qtyKg.toLocaleString()} kg</strong></span>
                      <span>Min Order: <strong class="font-bold text-slate-900">${w.minOrderKg} kg</strong></span>
                    </div>

                  </div>
                </div>

                <!-- Add to Bulk Cart Button -->
                <div class="p-5 pt-0">
                  <button onclick="window.addToCart('${w.id}')" class="btn-primary w-full py-2.5 text-xs font-extrabold shadow-sm cursor-pointer">
                    <i class="fa-solid fa-cart-plus mr-1.5"></i> ${b.addToCart}
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
                  <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${b.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer checkout with Telebirr Escrow</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${r.length===0?`
              <div class="p-8 text-center text-slate-500 text-xs">
                <p>${b.cartEmpty}</p>
              </div>
            `:`
              <div class="space-y-4 max-h-80 overflow-y-auto pr-1">
                ${Object.entries(ve).map(([w,U])=>`
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                      <span><i class="fa-solid fa-seedling text-emerald-600 mr-1"></i> Farm Source: ${U.farmerName} (${U.farmerRegion})</span>
                      <span class="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Direct Gate Payout</span>
                    </div>

                    ${U.items.map(W=>`
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
                  <span>${b.farmerShare}:</span>
                  <strong class="text-emerald-900">${me.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${b.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${he.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${b.platformFee}:</span>
                  <strong class="text-slate-800">${xe.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${b.totalAmount}:</span>
                  <span class="text-emerald-800">${te.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${te})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
                <i class="fa-solid fa-shield-halved mr-1.5"></i> ${b.checkoutTelebirr}
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
              <h3 class="text-xl font-extrabold text-slate-900">${b.telebirrTitle}</h3>
              <p class="text-xs text-slate-500">${b.telebirrDesc}</p>
            </div>

            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <span class="text-xs font-bold text-blue-900">${b.totalAmount}</span>
              <div class="text-3xl font-black text-blue-950">${n.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <span class="text-[11px] text-blue-800 font-semibold block">${b.escrowGuarantee}</span>
            </div>

            <form onsubmit="window.handleTelebirrSubmit(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${b.enterPhone}</label>
                <input type="text" id="telePhone" required value="+251955667788" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${b.enterPin}</label>
                <input type="password" id="telePin" required value="1234" maxlength="4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold tracking-widest text-center focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div class="pt-2">
                <button type="submit" class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition-colors cursor-pointer">
                  <i class="fa-solid fa-lock mr-1.5"></i> ${b.payNow}
                </button>
              </div>
            </form>

          </div>
        </div>
      `:""}

      <!-- Dispute Filing Modal -->
      ${d!=null&&d.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-5">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${b.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${d.order.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${d.order.id}')" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">${b.disputeReasonLabel}</label>
                <textarea id="disputeReasonInput" required rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Describe produce defects, transit spoilage, or weight discrepancy..."></textarea>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">${b.disputePhotoLabel}</label>
                <input type="text" id="disputePhotoUrl" value="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700">${b.refundPercentLabel}</label>
                  <span id="refundPercentVal" class="font-bold text-red-700">50% Partial Refund</span>
                </div>
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${d.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
                <i class="fa-solid fa-lock text-red-700 mr-1"></i>
                Submitting this dispute immediately locks the Telebirr Escrow and assigns case to Marketplace Admin for binding arbitration.
              </div>

              <button type="submit" class="btn-secondary w-full py-3 text-xs text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                <i class="fa-solid fa-gavel"></i> ${b.submitDisputeBtn}
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
                  <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${b.orderTracking}</h3>
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
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${b.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${b.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${b.viewWaybillBtn}
              </button>

              ${o.status==="disputed"?`
                <button onclick="window.openArbitrationModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
                  <i class="fa-solid fa-scale-balanced mr-1 text-red-600"></i> ${b.viewArbitrationBtn}
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
                  <i class="fa-solid fa-circle-check"></i> ${b.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${o.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${b.disputeBtn}
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
  `}function Ht(i,e){const t=X[i];return`
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
          ${e.map(s=>`
            <div class="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="badge-status status-${s.status}">${s.status.toUpperCase()}</span>
                  <span class="font-bold text-slate-900 text-sm">${s.productName}</span>
                  <span class="text-xs text-slate-500">(${s.qtyKg} kg @ ${s.pricePerKg} ETB)</span>
                </div>
                <p class="text-xs text-slate-600">
                  Farmer: <strong class="text-slate-800">${s.farmerName}</strong> · Telebirr Total: <strong class="text-emerald-800">${s.totalEtb.toLocaleString()} ETB</strong>
                </p>
                <div class="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>INV: ${s.invoiceNumber||"ET-INV-001"}</span>
                  <span>·</span>
                  <span>CONTR: ${s.contractNumber||"AGR-ET-001"}</span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button onclick="window.openInvoiceModal('${s.id}')" class="btn-secondary text-xs py-1.5 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer">
                  <i class="fa-solid fa-file-invoice mr-1"></i> ${t.viewInvoiceBtn}
                </button>
                <button onclick="window.openContractModal('${s.id}')" class="btn-secondary text-xs py-1.5 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                  <i class="fa-solid fa-file-contract mr-1"></i> ${t.viewContractBtn}
                </button>
                <button onclick="window.openWaybillModal('${s.id}')" class="btn-secondary text-xs py-1.5 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                  <i class="fa-solid fa-truck-fast mr-1"></i> ${t.viewWaybillBtn}
                </button>
                <button onclick="window.viewOrder('${s.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                  <i class="fa-solid fa-satellite-dish mr-1"></i> Track
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      `}
    </div>
  `}function Wt(i,e){const t=X[i];return`
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
        ${e.map(s=>`
          <div class="glass-card p-5 space-y-4 border-l-4 ${s.active?"border-emerald-600":"border-slate-300"}">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${s.active?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-600"}">
                  ${s.frequency} Scheduled
                </span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">${i==="am"&&s.productNameAm?s.productNameAm:s.productName}</h3>
                <p class="text-xs text-slate-500">Source: <strong class="text-slate-800">${s.farmerName}</strong></p>
              </div>

              <div class="text-right">
                <span class="text-base font-black text-emerald-800">${(s.qtyKg*s.pricePerKg).toLocaleString()} ETB</span>
                <span class="text-[11px] text-slate-400 block">${s.qtyKg} kg @ ${s.pricePerKg} ETB/kg</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span><i class="fa-solid fa-calendar-check text-emerald-600 mr-1.5"></i> Next Run: <strong class="text-slate-900">${s.nextDeliveryDate}</strong></span>
              <button onclick="window.toggleStandingOrderStatus('${s.id}')" class="text-xs font-bold ${s.active?"text-amber-700 hover:text-amber-800":"text-emerald-700 hover:text-emerald-800"} cursor-pointer">
                ${s.active?"Pause Order":"Resume Order"}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function Vt(i,e,t,s,a,r="listings",l=h.getPriceBenchmarks(),o=h.getCurrentUser()){const n=X[i];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(o==null?void 0:o.region)||"Oromia (Bishoftu)"}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-id-card"></i> ${n.verifiedFayda} (${(o==null?void 0:o.kycDocumentNumber)||"FAYDA-8829104"})
            </span>
            <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
              <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${(o==null?void 0:o.tinNumber)||"TIN-FARM-882910"}
            </span>
            <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
              <i class="fa-solid fa-users"></i> ${(o==null?void 0:o.repeatBuyerCount)||18} ${n.repeatBuyers}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-clock-rotate-left"></i> ${(o==null?void 0:o.onTimeDeliveryRate)||99}% ${n.onTimeRate}
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

      <!-- Farmer Portal Navigation Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onclick="window.toggleFarmerTab('listings')" class="cat-pill ${r==="listings"?"active":""}">
          <i class="fa-solid fa-box-open"></i>
          <span>${i==="am"?"ምርቶች እና ትዕዛዞች":"Produce & Orders"}</span>
        </button>
        <button onclick="window.toggleFarmerTab('wallet')" class="cat-pill ${r==="wallet"?"active":""}">
          <i class="fa-solid fa-wallet"></i>
          <span>${n.walletTitle}</span>
        </button>
        <button onclick="window.toggleFarmerTab('sms')" class="cat-pill ${r==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${n.smsConsoleTitle}</span>
        </button>
      </div>

      ${r==="wallet"?Kt(i,s,t,o):r==="sms"?Ut(i):`

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
          ${l.map(d=>`
            <div class="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div class="text-[11px] font-bold text-slate-300 truncate">${i==="am"?d.cropNameAm:d.cropName}</div>
              <div class="text-base font-black text-white">${d.avgPriceEtb} <span class="text-[10px] font-bold text-emerald-300">ETB/kg</span></div>
              <div class="flex items-center justify-between text-[10px] text-slate-400">
                <span>Range: ${d.minPriceEtb}-${d.maxPriceEtb}</span>
                <span class="${d.trend==="Up"?"text-emerald-400":d.trend==="Down"?"text-amber-300":"text-slate-300"} font-bold">
                  <i class="fa-solid fa-arrow-trend-${d.trend==="Up"?"up":d.trend==="Down"?"down":"flat"}"></i>
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
            <span class="text-xs text-amber-600 font-bold">${s.pendingOrdersCount} Active</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${s.pendingEscrowEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-lock"></i> Protected in Telebirr Escrow
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${n.lifetimePayout}</span>
            <span class="text-xs text-blue-600 font-bold">${s.completedOrdersCount} Delivered</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${s.releasedEtb.toLocaleString()} <span class="text-sm font-bold text-slate-500">ETB</span>
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
            ${t.map(d=>`
              <div class="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors">
                
                <div class="space-y-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="badge-status status-${d.status}">${d.status.toUpperCase()}</span>
                    <span class="text-xs font-bold text-slate-900">${d.productName}</span>
                    <span class="text-xs text-slate-500">(${d.qtyKg} kg @ ${d.pricePerKg} ETB)</span>
                    <span class="text-[10px] font-mono text-slate-400">${d.contractNumber||"AGR-ET-001"}</span>
                  </div>

                  <p class="text-xs text-slate-600">
                    Buyer: <strong class="text-slate-800">${d.buyerName}</strong> · Telebirr Escrow: <strong class="text-emerald-700">${d.totalEtb.toLocaleString()} ETB</strong> (Your Net 90%: <strong class="text-emerald-800 font-bold">${d.farmerCut.toLocaleString()} ETB</strong>)
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.openContractModal('${d.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer" title="View Digital Sales Contract">
                    <i class="fa-solid fa-file-contract mr-1"></i> ${n.viewContractBtn}
                  </button>

                  <button onclick="window.openInvoiceModal('${d.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer" title="Download Tax Exemption Receipt">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${n.viewInvoiceBtn}
                  </button>

                  <button onclick="window.openWaybillModal('${d.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer" title="View Transport Waybill">
                    <i class="fa-solid fa-truck-fast mr-1"></i> ${n.viewWaybillBtn}
                  </button>

                  ${d.status==="pending"?`
                    <button onclick="window.confirmFarmerOrder('${d.id}')" 
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
          ${e.map(d=>`
            <div class="glass-card overflow-hidden">
              <div class="h-44 w-full relative">
                <img src="${d.photos[0]}" class="w-full h-full object-cover" />
                
                <div class="absolute top-3 left-3 flex flex-col gap-1">
                  ${d.isAdvanceHarvest?`
                    <span class="advance-pill shadow-xs">
                      <i class="fa-solid fa-calendar-days text-emerald-700"></i> Advance Harvest
                    </span>
                  `:""}
                  ${d.isOrganic?`
                    <span class="bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      Organic
                    </span>
                  `:""}
                </div>

                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs">
                  ${d.status.toUpperCase()}
                </span>
              </div>
              <div class="p-4 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span class="text-amber-600 font-bold"><i class="fa-solid fa-certificate mr-1"></i> ${d.grade||"Grade 1"}</span>
                  <span>${d.ripeness||"Ready Today"}</span>
                </div>

                <h3 class="font-bold text-slate-900 text-base ${i==="am"?"lang-am":""}">
                  ${i==="am"&&d.nameAm?d.nameAm:d.productName}
                </h3>

                ${d.voiceNoteTranscript?`
                  <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                    <i class="fa-solid fa-microphone text-emerald-700 mt-0.5"></i>
                    <span class="italic truncate">"${d.voiceNoteTranscript}"</span>
                  </div>
                `:""}

                <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Price: <strong class="text-emerald-800 font-extrabold text-sm">${d.pricePerKg} ETB</strong>/kg</span>
                  <span>Stock: <strong class="font-bold text-slate-800">${d.qtyKg.toLocaleString()} kg</strong></span>
                </div>
                
                <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Min order: ${d.minOrderKg} kg</span>
                  <span><i class="fa-solid fa-calendar mr-1"></i> ${d.availableFrom}</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
      `}

      <!-- Post New Produce Listing Modal (Voice Note + Advance Harvest + Benchmarking) -->
      ${a?Gt(i):""}

    </div>
  `}function Kt(i,e,t,s){const a=X[i];return`
    <div class="space-y-6">
      
      <!-- Telebirr Balance Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-blue-900 via-blue-800 to-sky-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-sky-200">
            <i class="fa-solid fa-bolt text-amber-300"></i> Telebirr Direct Settlement Engine
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white">
            ${((s==null?void 0:s.walletBalanceEtb)||48200).toLocaleString()} <span class="text-lg font-bold text-sky-200">ETB</span>
          </h2>
          <p class="text-xs text-sky-100 max-w-md">
            Linked Telebirr Account: <strong class="text-white">${(s==null?void 0:s.phone)||"+251 911 223 344"}</strong> · 90% direct produce value deposited immediately after buyer delivery approval.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button onclick="window.handleFarmerWithdrawal()" class="btn-primary bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg w-full sm:w-auto cursor-pointer">
            <i class="fa-solid fa-money-bill-transfer mr-1 text-slate-950"></i> ${a.requestWithdrawal}
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
            <i class="fa-solid fa-receipt text-emerald-600 mr-1.5"></i> ${a.payoutHistory}
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
              ${t.map(r=>`
                <tr>
                  <td class="py-3 font-bold text-slate-900">
                    <div>${r.productName}</div>
                    <span class="text-[10px] text-slate-400">Order #${r.id.slice(0,8).toUpperCase()}</span>
                  </td>
                  <td class="py-3 font-semibold">${r.qtyKg} kg</td>
                  <td class="py-3 font-semibold">${r.totalEtb.toLocaleString()} ETB</td>
                  <td class="py-3 font-black text-emerald-700 text-sm">${r.farmerCut.toLocaleString()} ETB</td>
                  <td class="py-3 font-mono text-[11px] text-slate-500">${r.paymentRef||"TB-TXN-"+r.id.slice(0,8)}</td>
                  <td class="py-3">
                    <div class="flex items-center gap-1.5">
                      <button onclick="window.openInvoiceModal('${r.id}')" class="px-2 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[10px] cursor-pointer" title="View Tax Receipt">
                        <i class="fa-solid fa-file-invoice"></i> Receipt
                      </button>
                      <button onclick="window.openContractModal('${r.id}')" class="px-2 py-1 rounded bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 font-bold text-[10px] cursor-pointer" title="View Contract">
                        <i class="fa-solid fa-file-contract"></i> Contract
                      </button>
                    </div>
                  </td>
                  <td class="py-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${r.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-amber-100 text-amber-800"}">
                      ${r.status==="delivered"?"Paid to Telebirr":"Held in Escrow"}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `}function Ut(i){const e=X[i];return`
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
  `}function Gt(i,e){const t=X[i];return`
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
  `}function qt(i,e,t,s=h.getOptimizedRoute(),a=h.getCurrentUser(),r=h.getIsOfflineMode(),l=h.getOfflineQueue().length){const o=X[i],n=(a==null?void 0:a.vehicleCapacityKg)||5e3,d=Math.min(100,Math.round(s.totalWeightKg/n*100));return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner with Vehicle & Offline Mode Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <i class="fa-solid fa-truck text-amber-700"></i> ${(a==null?void 0:a.vehicleType)||"Isuzu 5-Ton"} · ${(a==null?void 0:a.refrigerationType)||"Ventilated"}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-certificate"></i> Logbook Verified (${(a==null?void 0:a.kycDocumentNumber)||"ET-LOG-5T-98214"})
            </span>
            <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
              <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${(a==null?void 0:a.tinNumber)||"TIN-DRV-981244"}
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
          <button onclick="window.toggleDriverOfflineMode()" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${r?"bg-amber-600 text-white border-amber-600 shadow-md":"bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}">
            <i class="fa-solid fa-wifi-slash mr-1"></i> ${r?"Offline Mode Active":"Online Mode"}
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
              <p class="text-[11px] text-slate-500 font-medium">${(a==null?void 0:a.vehicleType)||"Isuzu 5-Ton"} · ${(a==null?void 0:a.refrigerationType)||"Ventilated Cargo"}</p>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-700">
            <span>Payload: <strong class="text-amber-800">${s.totalWeightKg.toLocaleString()} kg</strong> / ${n.toLocaleString()} kg (${d}%)</span>
          </div>
        </div>

        <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 rounded-full transition-all duration-500" style="width: ${d}%;"></div>
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
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${s.title}</h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span><i class="fa-solid fa-road text-amber-600 mr-1"></i> ${s.totalDistanceKm} km</span>
            <span><i class="fa-solid fa-clock text-blue-600 mr-1"></i> ~${s.estimatedHours} hrs</span>
            <span><i class="fa-solid fa-coins text-emerald-600 mr-1"></i> ${(s.driverCommissionEtb+s.ruralSubsidyEtb).toLocaleString()} ETB Total</span>
          </div>
        </div>

        <div class="space-y-4">
          ${s.stops.map((m,k)=>`
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
                  <button onclick="window.handleDriverStopAction(${k})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
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
  `}function Qt(i,e,t,s=h.getAnomalyAlerts(),a=h.getKycQueue(),r=h.getRegionalAnalytics(),l="disputes"){const o=X[i];return`
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
          <span>${o.anomalyScannerTitle} (${s.length})</span>
        </button>
        <button onclick="window.setAdminTab('kyc')" class="cat-pill ${l==="kyc"?"active":""}">
          <i class="fa-solid fa-id-card"></i>
          <span>${o.kycQueueTitle} (${a.filter(n=>n.status==="Pending").length})</span>
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
            ${s.map(n=>`
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

      <!-- Tab Content 3: Manual KYC Verification Queue -->
      ${l==="kyc"?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${o.kycQueueTitle}
            </h2>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              National ID (Fayda), Kebele IDs & Commercial Logbooks
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${a.map(n=>`
              <div class="glass-card p-5 space-y-4">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${n.userRole==="Driver"?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"}">
                      ${n.userRole} · Tier ${n.kycTier||2}
                    </span>
                    <h3 class="text-base font-extrabold text-slate-900 mt-1">${n.userName}</h3>
                    <p class="text-xs text-slate-500">${n.phone} · ${n.region}</p>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${n.status==="Verified"?"bg-emerald-100 text-emerald-800":n.status==="Rejected"?"bg-red-100 text-red-800":"bg-amber-100 text-amber-800"}">
                    ${n.status.toUpperCase()}
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div class="font-bold text-slate-800"><i class="fa-solid fa-file-lines text-emerald-600 mr-1"></i> ${n.documentType}</div>
                  <div class="font-mono text-slate-600">Document ID: ${n.documentNumber}</div>
                  <div class="font-mono text-slate-600">TIN: ${n.tinNumber||"TIN-ET-VERIFIED"}</div>
                  <div class="text-[10px] text-slate-400">Submitted: ${n.submittedAt}</div>
                </div>

                ${n.status==="Pending"?`
                  <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button onclick="window.adminVerifyKyc('${n.userId}', true)" class="btn-primary flex-1 text-xs py-2 cursor-pointer">
                      <i class="fa-solid fa-check"></i> ${o.approveKycBtn}
                    </button>
                    <button onclick="window.adminVerifyKyc('${n.userId}', false)" class="btn-secondary text-xs py-2 px-4 text-red-700 border-red-300 hover:bg-red-50 cursor-pointer">
                      <i class="fa-solid fa-xmark"></i> ${o.rejectKycBtn}
                    </button>
                  </div>
                `:`
                  <div class="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg text-center">
                    <i class="fa-solid fa-certificate mr-1"></i> Identity & Trade License Approved
                  </div>
                `}
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
                  ${h.getOrders().map(n=>`
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
            ${r.map(n=>`
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
  `}function zt(i,e){return`
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
                  <span class="text-slate-400">${new Date(t.sentAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
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
  `}function Yt(i,e,t,s,a="",r="",l="",o=""){return`
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
                  <button type="button" onclick="window.switchToRegisterWithPhone('${s}')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
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
                      <span class="block font-bold">${r?`Account: <strong>${r}</strong> (${l})`:"SMS Dispatched via Twilio Gateway"}</span>
                      <span class="text-[11px] text-emerald-700 font-medium">Verified Phone: <strong>+251 ${s}</strong></span>
                      ${a?`
                        <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-white rounded-md border border-emerald-300 text-emerald-900 font-bold text-[10px]">
                          <span>SMS Code:</span> <code class="font-mono text-emerald-800 text-xs font-black">${a}</code>
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
                    value="${a||""}"
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
                    <input type="tel" id="authPhoneInput" required placeholder="911 223 344" value="${s||""}"
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
                    <input type="tel" id="regPhone" required placeholder="911 000 111" value="${s||""}"
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
  `}class Jt{constructor(){f(this,"currentLang","en")}setLanguage(e){this.currentLang=e}renderInvoice(e){return this.currentLang,`
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
            <p><strong>${e.issueDate}</strong></p>
            <label>TELEBIRR ESCROW REF / የክፍያ ማረጋገጫ</label>
            <p><code class="ref-code">${e.paymentRef}</code></p>
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
            <p class="party-name"><strong>${e.sellerName}</strong></p>
            <p><span class="label">Tax Identification No (TIN):</span> <strong>${e.sellerTin}</strong></p>
            <p><span class="label">Region / Farm Gate:</span> ${e.sellerRegion}</p>
            <p><span class="label">Contact Phone:</span> ${e.sellerPhone}</p>
            <p class="party-type-tag">Smallholder Agricultural Producer</p>
          </div>

          <div class="party-card buyer-card">
            <h5>PURCHASER / BUYER (ገዢ / የንግድ ድርጅት)</h5>
            <p class="party-name"><strong>${e.buyerName}</strong></p>
            <p><span class="label">Purchaser TIN:</span> <strong>${e.buyerTin}</strong></p>
            <p><span class="label">Delivery Location:</span> ${e.buyerRegion}</p>
            <p><span class="label">Contact Phone:</span> ${e.buyerPhone}</p>
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
              <td><span class="badge-grade">${e.grade}</span></td>
              <td><strong>${e.qtyKg.toLocaleString()} kg</strong></td>
              <td>${e.unitPriceEtb.toFixed(2)} ETB</td>
              <td style="text-align: right;"><strong>${e.grossAmountEtb.toLocaleString()} ETB</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="doc-settlement-breakdown">
          <div class="escrow-payout-box">
            <h6>ESCROW DISBURSEMENT APPORTIONMENT (90 / 5 / 5)</h6>
            <div class="breakdown-row">
              <span>Farmer Net Payout (90%):</span>
              <strong>${e.farmerPayoutEtb.toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row">
              <span>Driver Transport Fee (5%):</span>
              <strong>${e.driverFreightEtb.toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row">
              <span>Platform Service Commission (5%):</span>
              <strong>${e.platformServiceFeeEtb.toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row vat-row">
              <span>15% VAT on Platform Service Fee:</span>
              <span>${e.platformVatEtb.toFixed(2)} ETB (Remitted to MOR)</span>
            </div>
            <div class="breakdown-row withholding-row">
              <span>Withholding Tax on Goods (2% Declared):</span>
              <span>${e.withholdingTaxEtb.toFixed(2)} ETB</span>
            </div>
          </div>

          <div class="total-summary-box">
            <label>TOTAL PAID VIA TELEBIRR ESCROW</label>
            <h2 class="grand-total">${e.totalPaidViaTelebirr.toLocaleString()} <span class="currency">ETB</span></h2>
            <div class="qr-placeholder">
              <div class="qr-code-box">
                <span class="qr-mock">▣▣▣<br/>▣■▣<br/>▣▣▣</span>
              </div>
              <div class="qr-info">
                <p><strong>ETH-TAX-VERIFIED</strong></p>
                <small>${e.qrVerificationCode}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            This electronic fiscal document is issued under the authority of the Ethiopian Electronic Commerce Proclamation and the Ministry of Revenues. Direct farm produce is VAT-exempt under Proclamation No. 979/2016.
          </p>
          <div class="seal-container">
            <div class="official-seal">
              <span>★ ETHIOPIAN AGRICULTURAL AUTHORITY ★</span>
              <strong>DIGITALLY SEALED</strong>
              <small>TELEBIRR ESCROW SECURED</small>
            </div>
          </div>
        </div>
      </div>
    `}renderWaybill(e){return`
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">🚚</span>
            <div class="emblem-text">
              <h4>FEDERAL TRANSPORT AUTHORITY OF ETHIOPIA</h4>
              <h5>COMMERCIAL AGRICULTURAL FREIGHT WAYBILL & MANIFEST</h5>
              <p class="amharic-sub">የኢትዮጵያ ፌዴራል ትራንስፖርት ባለስልጣን የግብርና ምርት ጭነት ሰነድ</p>
            </div>
          </div>
          <div class="doc-type-badge waybill-stamp">
            <span class="badge-title">OFFICIAL WAYBILL / MANIFEST</span>
            <span class="badge-am">የጭነት ማጓጓዣ ሰነድ</span>
            <span class="invoice-num">${e.waybillNumber}</span>
          </div>
        </div>

        <div class="doc-meta-grid">
          <div class="meta-box">
            <label>DISPATCH DATE / የተላከበት ቀን</label>
            <p><strong>${e.dispatchDate}</strong></p>
            <label>INSURANCE POLICY REF / የኢንሹራንስ ፖሊሲ</label>
            <p><code class="ref-code">${e.insurancePolicyNumber}</code></p>
          </div>
          <div class="meta-box">
            <label>TRANSIT STATUS / የጉዞ ሁኔታ</label>
            <p><span class="badge-green">${e.transitStatus.toUpperCase()}</span></p>
            <label>ORDER REF / የትዕዛዝ ቁጥር</label>
            <p><code>${e.orderId.slice(0,13)}...</code></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>CONSIGNOR / ORIGIN FARM (ላኪ አርሶ አደር)</h5>
            <p class="party-name"><strong>${e.consignorName}</strong></p>
            <p><span class="label">Loading Farm Gate:</span> ${e.consignorFarmLocation}</p>
            <p><span class="label">Farmer Contact:</span> ${e.consignorPhone}</p>
            <p><span class="label">Farm Handoff Time:</span> ${e.farmerHandoffTimestamp}</p>
          </div>

          <div class="party-card buyer-card">
            <h5>CONSIGNEE / DESTINATION (ተቀባይ የጅምላ ገዢ)</h5>
            <p class="party-name"><strong>${e.consigneeName}</strong></p>
            <p><span class="label">Unloading Hub:</span> ${e.consigneeDepotAddress}</p>
            <p><span class="label">Buyer Contact:</span> ${e.consigneePhone}</p>
            <p><span class="label">Received Timestamp:</span> ${e.buyerReceivedTimestamp||"In Transit (Pending GPS Dropoff)"}</p>
          </div>
        </div>

        <div class="carrier-spec-box">
          <h5>CARRIER & VEHICLE SPECIFICATIONS (የአጓጓዥ እና ተሽከርካሪ ዝርዝር)</h5>
          <div class="carrier-grid">
            <div>
              <span class="label">Licensed Driver:</span>
              <strong>${e.carrierDriverName}</strong>
            </div>
            <div>
              <span class="label">Commercial CDL License:</span>
              <strong>${e.driverLicenseNumber}</strong>
            </div>
            <div>
              <span class="label">Vehicle Plate Number:</span>
              <strong class="plate-highlight">${e.vehiclePlateNumber}</strong>
            </div>
            <div>
              <span class="label">Vehicle Type / Specs:</span>
              <span>${e.vehicleModel}</span>
            </div>
            <div>
              <span class="label">Refrigeration Mode:</span>
              <span class="badge-blue">${e.refrigerationStatus}</span>
            </div>
            <div>
              <span class="label">Cargo Temp Log:</span>
              <span>${e.temperatureLogCelsius}°C (Verified Fresh)</span>
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
              <td><strong>${e.cargoDescription}</strong></td>
              <td>${e.packageCount} Commercial Crates</td>
              <td>${e.netWeightKg.toLocaleString()} kg</td>
              <td>${e.tareWeightKg} kg</td>
              <td style="text-align: right;"><strong>${e.grossWeightKg.toLocaleString()} kg</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="signature-chain-box">
          <div class="sig-block">
            <p class="sig-title">1. CONSIGNOR (FARM GATE DISPATCH)</p>
            <div class="sig-line-area">
              <span class="sig-check">✓ SIGNED & HANDED OVER</span>
              <small>${e.consignorName} (${e.farmerHandoffTimestamp})</small>
            </div>
          </div>
          <div class="sig-block">
            <p class="sig-title">2. CARRIER (DRIVER CUSTODY ACK)</p>
            <div class="sig-line-area">
              <span class="sig-check">✓ IN-TRANSIT SECURITY SEALED</span>
              <small>${e.carrierDriverName} (${e.vehiclePlateNumber})</small>
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
    `}renderContract(e){return`
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
            This Standard Agricultural Produce Agreement (the <strong>"Contract"</strong>) is entered into on <strong>${e.agreementDate}</strong> between the Seller and Buyer identified below through the Farmer-to-Market direct exchange.
          </p>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>THE SELLER (አቅራቢ / ሻጭ)</h5>
            <p class="party-name"><strong>${e.sellerName}</strong></p>
            <p><span class="label">National Fayda ID:</span> ${e.sellerIdNumber}</p>
            <p><span class="label">Location:</span> ${e.sellerLocation}</p>
          </div>

          <div class="party-card buyer-card">
            <h5>THE BUYER (ገዢ ድርጅት)</h5>
            <p class="party-name"><strong>${e.buyerName}</strong></p>
            <p><span class="label">Buyer TIN:</span> ${e.buyerTinNumber}</p>
            <p><span class="label">Depot Destination:</span> ${e.buyerLocation}</p>
          </div>
        </div>

        <div class="contract-clauses-container">
          <div class="clause-item">
            <h6>ARTICLE 1: SUBJECT MATTER & PRICE SPECIFICATIONS (የምርት እና የዋጋ ዝርዝር)</h6>
            <p>
              The Seller agrees to supply and the Buyer agrees to purchase <strong>${e.contractedQuantityKg.toLocaleString()} kg</strong> of <strong>${e.cropType}</strong> at the agreed unit rate of <strong>${e.agreedPricePerKg.toFixed(2)} ETB per kg</strong>, constituting a total consideration of <strong>${e.totalContractValueEtb.toLocaleString()} ETB</strong>.
            </p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 2: QUALITY STANDARDS & TOLERANCE (የጥራት ደረጃ)</h6>
            <p>${e.qualityStandardClause}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 3: TELEBIRR ESCROW & PAYMENT SETTLEMENT (የዋስትና ክፍያ እና ስምምነት)</h6>
            <p>${e.escrowClauseText}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 4: DELIVERY & CHAIN OF CUSTODY (የማድረስ ሁኔታ)</h6>
            <p>${e.deliveryTimeline}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 5: FORCE MAJEURE & ARBITRATION (አቅም በላይ የሆነ ሁኔታ እና የህግ ሽምግልና)</h6>
            <p>${e.forceMajeureClauseText}</p>
            <p><em>Dispute Resolution Jurisdiction: ${e.disputeJurisdiction}</em></p>
          </div>
        </div>

        <div class="contract-signatures-grid">
          <div class="contract-sig-box">
            <p class="sig-header">SELLER DIGITAL ATTESTATION</p>
            <div class="sig-badge verified-sig">
              <span>✓ DIGITALLY SIGNED VIA OTP</span>
              <strong>${e.sellerName}</strong>
              <small>${e.eSignatures.sellerSignDate}</small>
            </div>
          </div>

          <div class="contract-sig-box">
            <p class="sig-header">BUYER DIGITAL ATTESTATION</p>
            <div class="sig-badge verified-sig">
              <span>✓ DIGITALLY SIGNED VIA TELEBIRR LOCK</span>
              <strong>${e.buyerName}</strong>
              <small>${e.eSignatures.buyerSignDate}</small>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            Digital signatures are legally recognized under the Ethiopian Electronic Signature Proclamation No. 1072/2018. Immutable Platform Cryptographic Witness Hash: <code>${e.eSignatures.platformWitnessHash}</code>
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
            <p><strong class="highlight-warn">${e.totalDisputedAmountEtb.toLocaleString()} ETB</strong></p>
          </div>
          <div class="meta-box">
            <label>CASE STATUS / የክርክር ሁኔታ</label>
            <p><span class="badge-green">${e.status.toUpperCase()}</span></p>
            <label>LEAD ARBITRATOR</label>
            <p><strong>${e.leadArbitratorName}</strong></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card buyer-card">
            <h5>CLAIMANT (ቅሬታ አቅራቢ ገዢ)</h5>
            <p class="party-name"><strong>${e.claimantBuyer}</strong></p>
            <p><span class="label">Claimed Defect:</span> ${e.claimedDefectPercentage}% Value Impairment</p>
            <p><span class="label">Dispute Reason:</span> ${e.disputeReason}</p>
          </div>

          <div class="party-card seller-card">
            <h5>RESPONDENT (ተጠሪ አርሶ አደር)</h5>
            <p class="party-name"><strong>${e.respondentFarmer}</strong></p>
            <p><span class="label">Freight Carrier:</span> ${e.freightCarrier}</p>
            <p><span class="label">Original Farm Payout:</span> 90% Contract Standard</p>
          </div>
        </div>

        <div class="arbitration-findings-box">
          <h5>1. INDEPENDENT PHYSICAL INSPECTION & PATHOLOGY FINDINGS</h5>
          <p>${e.inspectionReport}</p>
        </div>

        <div class="arbitration-findings-box ruling-highlight-box">
          <h5>2. ARBITRATOR LEGAL DETERMINATION & REMEDY</h5>
          <p><strong>${e.legalFindingSummary}</strong></p>
          
          <div class="verdict-award-grid">
            <div class="award-box">
              <span class="award-label">FARMER ESCROW RELEASE (50%)</span>
              <h3 class="award-amount">${e.farmerSettlementEtb.toLocaleString()} ETB</h3>
              <small>Released to Farmer Telebirr Wallet</small>
            </div>
            <div class="award-box">
              <span class="award-label">BUYER ESCROW REFUND (50%)</span>
              <h3 class="award-amount">${e.buyerRefundEtb.toLocaleString()} ETB</h3>
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
              <small>${e.platformDecreeHash}</small>
            </div>
          </div>
        </div>
      </div>
    `}}const ce=new Jt;function _(i,e="fa-circle-check",t="border-emerald-500"){const s=document.getElementById("toast-container");if(!s)return;const a=document.createElement("div");a.className=`toast-msg border-l-4 ${t} shadow-2xl`,a.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${i}</span>
  `,s.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(100%)",a.style.transition="all 0.3s ease-out",setTimeout(()=>a.remove(),300)},3500)}class Xt{constructor(){f(this,"lang",localStorage.getItem("lang")||"en");f(this,"activeTab","marketplace");f(this,"activeCategory","All");f(this,"selectedRegion","All");f(this,"searchQuery","");f(this,"cart",[]);f(this,"isCartOpen",!1);f(this,"isNotificationsModalOpen",!1);f(this,"isCreateListingModalOpen",!1);f(this,"activeOrderModal",null);f(this,"activeTelebirrModal",null);f(this,"activeDisputeModal",null);f(this,"activeLegalDocModal",null);f(this,"maxDistanceKm",0);f(this,"activeGrade","All");f(this,"activeRipeness","All");f(this,"organicOnly",!1);f(this,"advanceOnly",!1);f(this,"activeBuyerSubTab","marketplace");f(this,"activeFarmerTab","listings");f(this,"activeAdminTab","disputes");f(this,"isRecordingVoice",!1);f(this,"voiceRecordTimer",null);f(this,"isAuthModalOpen",!1);f(this,"authMode","login");f(this,"otpStep",!1);f(this,"pendingPhone","");f(this,"lastSentCode","");f(this,"matchedUserName","");f(this,"matchedUserRole","");f(this,"authErrorMessage","");this.init()}async init(){this.attachGlobalWindowHandlers(),de.startConnection(h.getToken()||void 0),de.onOrderStatusChanged(async(t,s,a)=>{console.log(`[SignalR Live Status Update] Order ${t} -> ${s}: ${a}`),this.activeOrderModal&&this.activeOrderModal.id===t&&(this.activeOrderModal.status=s),_(`Live Update: Order #${t.slice(0,8).toUpperCase()} is now ${s.toUpperCase()}`,"fa-bolt","border-blue-500"),await h.refreshAllData(),this.render()}),h.subscribe(()=>{this.render()}),await h.refreshAllData();const e=h.getCurrentUser();e&&(e.role==="farmer"?this.activeTab="farmer":e.role==="driver"?this.activeTab="driver":e.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){var n;const e=document.getElementById("app");if(!e)return;const t=h.getCurrentUser(),s=h.isAuthenticated(),a=h.getNotifications(),r=a.filter(d=>!d.read).length;ce.setLanguage(this.lang);const l=h.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let o="";if(this.activeTab==="farmer"&&s&&(t==null?void 0:t.role)==="farmer"){const d=h.getListings().filter(R=>R.farmerId===t.id),m=h.getOrders("farmer"),k=h.getFarmerSummary();o=Vt(this.lang,d,m,k,this.isCreateListingModalOpen,this.activeFarmerTab,h.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&s&&(t==null?void 0:t.role)==="driver"){const d=h.getOrders("driver"),m=h.getDriverSummary();o=qt(this.lang,d,m,h.getOptimizedRoute(),t,h.getIsOfflineMode(),h.getOfflineQueue().length)}else if(this.activeTab==="admin"&&s&&(t==null?void 0:t.role)==="admin"){const d=h.getPlatformStats(),m=h.getOrders().filter(k=>k.status==="disputed");o=Qt(this.lang,d,m,h.getAnomalyAlerts(),h.getKycQueue(),h.getRegionalAnalytics(),this.activeAdminTab)}else{const d=h.getOrders("buyer");o=jt(this.lang,l,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,h.getStandingOrders(),d)}e.innerHTML=`
      ${Ft(this.lang,t,s,this.activeTab,this.cart,r,this.searchQuery)}
      
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
      ${this.isAuthModalOpen?Yt(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage):""}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen?zt(this.lang,a):""}

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
              ${this.activeLegalDocModal.type==="invoice"?ce.renderInvoice(h.getTaxInvoice(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="waybill"?ce.renderWaybill(h.getTransportWaybill(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="contract"?ce.renderContract(h.getLegalContract(this.activeLegalDocModal.orderId)):ce.renderArbitration(h.getDisputeMediationRecord(this.activeLegalDocModal.orderId))}
            </div>
          </div>
        </div>
      `:""}
    `}attachGlobalWindowHandlers(){const e=window;e.navigateTab=s=>{this.activeTab=s,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),_(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=s=>{this.activeBuyerSubTab=s,this.render()},e.toggleFarmerTab=s=>{this.activeFarmerTab=s,this.render()},e.setAdminTab=s=>{this.activeAdminTab=s,this.render()},e.openInvoiceModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"invoice",orderId:s},this.render()},e.openContractModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"contract",orderId:s},this.render()},e.openWaybillModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"waybill",orderId:s},this.render()},e.openArbitrationModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"arbitration",orderId:s},this.render()},e.closeLegalDocModal=()=>{this.activeLegalDocModal=null,this.render()},e.printOfficialDocument=()=>{window.print()},e.setMaxDistanceKm=s=>{this.maxDistanceKm=s,_(s===0?"Showing all produce across Ethiopia":`Filtering farms within ${s} km radius`,"fa-location-dot"),this.render()},e.setFilterGrade=s=>{this.activeGrade=s,this.render()},e.setFilterRipeness=s=>{this.activeRipeness=s,this.render()},e.toggleOrganicFilter=s=>{this.organicOnly=s,this.render()},e.toggleAdvanceFilter=s=>{this.advanceOnly=s,this.render()},e.setCategory=s=>{this.activeCategory=s,this.render()},e.resetFilters=()=>{this.activeCategory="All",this.selectedRegion="All",this.searchQuery="",this.maxDistanceKm=0,this.activeGrade="All",this.activeRipeness="All",this.organicOnly=!1,this.advanceOnly=!1,this.render()},e.handleVoiceRecordToggle=()=>{const s=document.getElementById("voiceRecordBtn"),a=document.getElementById("voiceRecordLabel"),r=document.getElementById("voiceWaveAnimation"),l=document.getElementById("voiceTranscriptionResult");document.getElementById("voiceTranscriptText"),this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription("am")):(this.isRecordingVoice=!0,a&&(a.innerText="Stop & Transcribe (አቁም)"),s&&(s.classList.remove("bg-emerald-600"),s.classList.add("bg-red-600")),r&&r.classList.remove("hidden"),l&&l.classList.add("hidden"),_("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription("am")},3500))},e.finishVoiceTranscription=s=>{this.isRecordingVoice=!1;const a=document.getElementById("voiceRecordLabel"),r=document.getElementById("voiceWaveAnimation"),l=document.getElementById("voiceTranscriptionResult"),o=document.getElementById("voiceTranscriptText");a&&(a.innerText="Record Voice Note (ድምጽ ቅጂ)"),r&&r.classList.add("hidden");const n=h.simulateVoiceTranscription(4,s),d=document.getElementById("newProdName"),m=document.getElementById("newProdNameAm"),k=document.getElementById("newCategory"),R=document.getElementById("newQtyKg"),K=document.getElementById("newPricePerKg");d&&(d.value=n.productName),m&&(m.value=n.nameAm),k&&(k.value=n.category),R&&(R.value=n.qtyKg.toString()),K&&(K.value=n.pricePerKg.toString()),l&&o&&(o.innerText=`"${n.transcript}"`,l.classList.remove("hidden")),J({particleCount:60,spread:50,origin:{y:.6}}),_("Voice Note Transcribed! Form auto-filled in Amharic.","fa-wand-magic-sparkles")},e.handleSimulateSms=async s=>{s.preventDefault();const a=document.getElementById("smsPhone").value,r=document.getElementById("smsCommand").value,l=document.getElementById("smsResponseBox"),o=document.getElementById("smsResponseText");l&&o&&(o.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',l.classList.remove("hidden"));const n=await h.sendInboundSms(a,r);o&&(o.innerHTML=`&gt; ${n}`),_("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const s=h.getCurrentUser(),a=(s==null?void 0:s.walletBalanceEtb)||48200;if(a<=0){_("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}h.requestWalletWithdrawal(a,(s==null?void 0:s.phone)||"+251911223344"),J({particleCount:100,spread:70,origin:{y:.6}}),_(`Instant Payout of ${a.toLocaleString()} ETB deposited to Telebirr (${(s==null?void 0:s.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=s=>{if(!h.isAuthenticated()){e.openAuthModal("login");return}h.addStandingOrder(s,150,"Weekly"),J({particleCount:70,spread:60,origin:{y:.6}}),_("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=s=>{h.toggleStandingOrder(s),_("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=s=>{const a=h.getOrders().find(r=>r.id===s);a&&(this.activeDisputeModal={isOpen:!0,order:a},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(s,a)=>{s.preventDefault();const r=document.getElementById("disputeReasonInput").value,l=document.getElementById("disputePhotoUrl").value,o=document.getElementById("disputeRefundSlider").value;await h.disputeOrder(a,r,l,parseInt(o,10)),this.activeDisputeModal=null,this.activeOrderModal=null,_("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const s=h.toggleOfflineMode();_(s?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const s=await h.syncOfflineQueue();_(`Synced ${s} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async s=>{const a=h.getOptimizedRoute();a.stops[s]&&(a.stops[s].completed=!0,J({particleCount:50,spread:50,origin:{y:.6}}),_(`Stop #${s+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async s=>{await h.pickupOrderByDriver(s,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),_("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async s=>{await h.confirmDeliveryByBuyer(s,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),J({particleCount:120,spread:70,origin:{y:.6}}),_("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(s,a)=>{await h.verifyKyc(s,a),_(a?"Identity & Documents Approved!":"KYC verification rejected",a?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=s=>{_(`Anomaly Alert #${s} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=s=>{_(`Audit trail opened for Anomaly #${s}`,"fa-magnifying-glass")},e.openAuthModal=(s="login")=>{this.authMode=s,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=s=>{this.authMode=s,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=s=>{this.pendingPhone=s.replace("+251","").trim(),this.authErrorMessage="",this.render();const a=document.getElementById("authPhoneInput");a&&(a.value=this.pendingPhone,a.focus())},e.switchToRegisterWithPhone=s=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=s.replace("+251","").trim(),this.render()},e.handleRequestOtp=async s=>{s.preventDefault();const a=document.getElementById("authPhoneInput").value.trim();if(!a||a.length<8){_("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const r=document.getElementById("requestOtpBtn");r&&(r.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',r.disabled=!0),this.pendingPhone=a,this.authErrorMessage="";try{const l=await h.requestOtp(a);this.lastSentCode=l.demoCode||"",this.matchedUserName=l.userName||"",this.matchedUserRole=l.role||"",this.otpStep=!0,_(`SMS verification code dispatched to +251 ${a}`,"fa-comment-sms","border-emerald-500")}catch(l){this.authErrorMessage=l.message||"No account registered with this phone number. Please register first."}this.render()},e.handleVerifyOtp=async s=>{var l;s.preventDefault();const a=(l=document.getElementById("authOtpInput")||document.getElementById("otpCodeInput"))==null?void 0:l.value.trim();if(!a||a.length!==6){_("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const r=document.getElementById("verifyOtpBtn");r&&(r.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',r.disabled=!0);try{const o=await h.verifyOtp(this.pendingPhone,a);this.isAuthModalOpen=!1,this.otpStep=!1,this.authErrorMessage="",o.role==="farmer"?this.activeTab="farmer":o.role==="driver"?this.activeTab="driver":o.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",J({particleCount:100,spread:70,origin:{y:.6}}),_(`Welcome back, ${o.name}! (${o.role.toUpperCase()})`,"fa-circle-check","border-emerald-500")}catch(o){this.authErrorMessage=o.message||"Invalid OTP code. Please try again."}this.render()};const t=async s=>{var m,k,R,K,Z;s.preventDefault();const a=((m=document.getElementById("regName"))==null?void 0:m.value.trim())||"",r=((k=document.getElementById("regNameAm"))==null?void 0:k.value.trim())||a,l=((R=document.getElementById("regPhone"))==null?void 0:R.value.trim())||"",o=((K=document.getElementById("regRegion"))==null?void 0:K.value)||"Oromia (Bishoftu)",n=((Z=document.querySelector('input[name="regRole"]:checked'))==null?void 0:Z.value)||"buyer",d=document.getElementById("registerSubmitBtn");d&&(d.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...',d.disabled=!0);try{const j=await h.registerUser(a,r,l,n,o);this.isAuthModalOpen=!1,this.authErrorMessage="",j.role==="farmer"?this.activeTab="farmer":j.role==="driver"?this.activeTab="driver":j.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",J({particleCount:150,spread:90,origin:{y:.6}}),_(`Welcome to Farmer-to-Market, ${j.name}!`,"fa-circle-check","border-emerald-500")}catch(j){this.authErrorMessage=j.message||"Registration failed. Please try a different phone number."}this.render()};e.handleRegisterUser=t,e.handleRegisterSubmit=t,e.handleLogout=()=>{h.logout(),this.activeTab="marketplace",this.cart=[],_("Logged out successfully","fa-arrow-right-from-bracket"),this.render()},e.switchDemoUser=async s=>{try{const a=await h.requestOtp(s);if(a.demoCode){const r=await h.verifyOtp(s,a.demoCode);r.role==="farmer"?this.activeTab="farmer":r.role==="driver"?this.activeTab="driver":r.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",J({particleCount:80,spread:60,origin:{y:.6}}),_(`Switched to profile: ${r.name} (${r.role.toUpperCase()})`,"fa-user-shield")}}catch(a){_("Demo switch failed: "+a.message,"fa-circle-xmark","border-red-500")}this.render()},e.addToCart=s=>{const a=h.getListingById(s);if(!a)return;const r=this.cart.find(l=>l.listing.id===s);r?r.qtyKg+=a.minOrderKg:this.cart.push({listing:a,qtyKg:a.minOrderKg}),_(`Added ${a.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(s,a)=>{const r=this.cart.find(l=>l.listing.id===s);r&&(a<=0?this.cart=this.cart.filter(l=>l.listing.id!==s):r.qtyKg=a),this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.openTelebirrModal=s=>{if(!h.isAuthenticated()){e.openAuthModal("login");return}this.activeTelebirrModal={isOpen:!0,totalEtb:s},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.handleTelebirrSubmit=async s=>{s.preventDefault();try{let a=null;for(const r of this.cart)a=await h.placeOrder(r.listing.id,r.qtyKg);this.cart=[],this.isCartOpen=!1,this.activeTelebirrModal=null,J({particleCount:150,spread:80,origin:{y:.6}}),_("Payment Authorized! Funds locked in Telebirr Escrow. Order Dispatched.","fa-lock","border-blue-500"),a&&(this.activeOrderModal=a)}catch(a){_("Order placement failed: "+a.message,"fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=s=>{const r=h.getOrders().find(l=>l.id===s);r&&(this.activeOrderModal=r,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.confirmFarmerOrder=async s=>{await h.confirmOrderByFarmer(s),de.joinOrder(s),_("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async s=>{await h.confirmDeliveryByBuyer(s),J({particleCount:150,spread:80,origin:{y:.6}}),_("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),this.render()},e.adminResolveDispute=async(s,a)=>{await h.resolveDispute(s,a),_(`Dispute resolved: ${a}. Decree generated.`,"fa-gavel","border-purple-500"),this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async s=>{var Z;s.preventDefault();const a=document.getElementById("newProdName").value,r=document.getElementById("newProdNameAm").value,l=document.getElementById("newCategory").value,o=parseFloat(document.getElementById("newQtyKg").value),n=parseFloat(document.getElementById("newPricePerKg").value),d=parseFloat(document.getElementById("newMinOrderKg").value),m=document.getElementById("newGrade").value,k=document.getElementById("newRipeness").value,R=document.getElementById("newIsAdvanceHarvest").checked,K=(Z=document.getElementById("newExpectedHarvestDate"))==null?void 0:Z.value;try{await h.createListing({productName:a,nameAm:r,category:l,qtyKg:o,pricePerKg:n,minOrderKg:d,grade:m,ripeness:k,isOrganic:!0,isAdvanceHarvest:R,expectedHarvestDate:R?K:void 0,availableFrom:R&&K?K:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,_(`Published ${a} to marketplace!`,"fa-cloud-arrow-up")}catch(j){_(j.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleAdminBroadcastSms=async s=>{s.preventDefault();const a=document.getElementById("smsTargetRole").value,r=document.getElementById("smsMsgEn").value,l=document.getElementById("smsMsgAm").value;await h.broadcastSms(r,l,a),_(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to smallholders via Twilio!","fa-paper-plane"),this.render()}}}new Xt;
