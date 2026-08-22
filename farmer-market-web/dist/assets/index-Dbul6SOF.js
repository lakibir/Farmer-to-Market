var Xe=Object.defineProperty;var Ze=(i,e,t)=>e in i?Xe(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var g=(i,e,t)=>Ze(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();var we={};(function i(e,t,s,r){var a=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),c=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=(function(){if(!e.OffscreenCanvas)return!1;try{var u=new OffscreenCanvas(1,1),n=u.getContext("2d");n.fillRect(0,0,1,1);var h=u.transferToImageBitmap();n.createPattern(h,"no-repeat")}catch{return!1}return!0})();function l(){}function d(u){var n=t.exports.Promise,h=n!==void 0?n:e.Promise;return typeof h=="function"?new h(u):(u(l,l),null)}var m=(function(u,n){return{transform:function(h){if(u)return h;if(n.has(h))return n.get(h);var v=new OffscreenCanvas(h.width,h.height),k=v.getContext("2d");return k.drawImage(h,0,0),n.set(h,v),v},clear:function(){n.clear()}}})(o,new Map),E=(function(){var u=Math.floor(16.666666666666668),n,h,v={},k=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(n=function(_){var C=Math.random();return v[C]=requestAnimationFrame(function x(T){k===T||k+u-1<T?(k=T,delete v[C],_()):v[C]=requestAnimationFrame(x)}),C},h=function(_){v[_]&&cancelAnimationFrame(v[_])}):(n=function(_){return setTimeout(_,u)},h=function(_){return clearTimeout(_)}),{frame:n,cancel:h}})(),H=(function(){var u,n,h={};function v(k){function _(C,x){k.postMessage({options:C||{},callback:x})}k.init=function(x){var T=x.transferControlToOffscreen();k.postMessage({canvas:T},[T])},k.fire=function(x,T,A){if(n)return _(x,null),n;var D=Math.random().toString(36).slice(2);return n=d(function(I){function B(F){F.data.callback===D&&(delete h[D],k.removeEventListener("message",B),n=null,m.clear(),A(),I())}k.addEventListener("message",B),_(x,D),h[D]=B.bind(null,{data:{callback:D}})}),n},k.reset=function(){k.postMessage({reset:!0});for(var x in h)h[x](),delete h[x]}}return function(){if(u)return u;if(!s&&a){var k=["var CONFETTI, SIZE = {}, module = {};","("+i.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{u=new Worker(URL.createObjectURL(new Blob([k])))}catch(_){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",_),null}v(u)}return u}})(),Z={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function oe(u,n){return n?n(u):u}function ee(u){return u!=null}function P(u,n,h){return oe(u&&ee(u[n])?u[n]:Z[n],h)}function S(u){return u<0?0:Math.floor(u)}function he(u,n){return Math.floor(Math.random()*(n-u))+u}function X(u){return parseInt(u,16)}function de(u){return u.map(ue)}function ue(u){var n=String(u).replace(/[^0-9a-f]/gi,"");return n.length<6&&(n=n[0]+n[0]+n[1]+n[1]+n[2]+n[2]),{r:X(n.substring(0,2)),g:X(n.substring(2,4)),b:X(n.substring(4,6))}}function ge(u){var n=P(u,"origin",Object);return n.x=P(n,"x",Number),n.y=P(n,"y",Number),n}function be(u){u.width=document.documentElement.clientWidth,u.height=document.documentElement.clientHeight}function b(u){var n=u.getBoundingClientRect();u.width=n.width,u.height=n.height}function W(u){var n=document.createElement("canvas");return n.style.position="fixed",n.style.top="0px",n.style.left="0px",n.style.pointerEvents="none",n.style.zIndex=u,n}function L(u,n,h,v,k,_,C,x,T){u.save(),u.translate(n,h),u.rotate(_),u.scale(v,k),u.arc(0,0,1,C,x,T),u.restore()}function Le(u){var n=u.angle*(Math.PI/180),h=u.spread*(Math.PI/180);return{x:u.x,y:u.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:u.startVelocity*.5+Math.random()*u.startVelocity,angle2D:-n+(.5*h-Math.random()*h),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:u.color,shape:u.shape,tick:0,totalTicks:u.ticks,decay:u.decay,drift:u.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:u.gravity*3,ovalScalar:.6,scalar:u.scalar,flat:u.flat}}function Fe(u,n){n.x+=Math.cos(n.angle2D)*n.velocity+n.drift,n.y+=Math.sin(n.angle2D)*n.velocity+n.gravity,n.velocity*=n.decay,n.flat?(n.wobble=0,n.wobbleX=n.x+10*n.scalar,n.wobbleY=n.y+10*n.scalar,n.tiltSin=0,n.tiltCos=0,n.random=1):(n.wobble+=n.wobbleSpeed,n.wobbleX=n.x+10*n.scalar*Math.cos(n.wobble),n.wobbleY=n.y+10*n.scalar*Math.sin(n.wobble),n.tiltAngle+=.1,n.tiltSin=Math.sin(n.tiltAngle),n.tiltCos=Math.cos(n.tiltAngle),n.random=Math.random()+2);var h=n.tick++/n.totalTicks,v=n.x+n.random*n.tiltCos,k=n.y+n.random*n.tiltSin,_=n.wobbleX+n.random*n.tiltCos,C=n.wobbleY+n.random*n.tiltSin;if(u.fillStyle="rgba("+n.color.r+", "+n.color.g+", "+n.color.b+", "+(1-h)+")",u.beginPath(),c&&n.shape.type==="path"&&typeof n.shape.path=="string"&&Array.isArray(n.shape.matrix))u.fill(He(n.shape.path,n.shape.matrix,n.x,n.y,Math.abs(_-v)*.1,Math.abs(C-k)*.1,Math.PI/10*n.wobble));else if(n.shape.type==="bitmap"){var x=Math.PI/10*n.wobble,T=Math.abs(_-v)*.1,A=Math.abs(C-k)*.1,D=n.shape.bitmap.width*n.scalar,I=n.shape.bitmap.height*n.scalar,B=new DOMMatrix([Math.cos(x)*T,Math.sin(x)*T,-Math.sin(x)*A,Math.cos(x)*A,n.x,n.y]);B.multiplySelf(new DOMMatrix(n.shape.matrix));var F=u.createPattern(m.transform(n.shape.bitmap),"no-repeat");F.setTransform(B),u.globalAlpha=1-h,u.fillStyle=F,u.fillRect(n.x-D/2,n.y-I/2,D,I),u.globalAlpha=1}else if(n.shape==="circle")u.ellipse?u.ellipse(n.x,n.y,Math.abs(_-v)*n.ovalScalar,Math.abs(C-k)*n.ovalScalar,Math.PI/10*n.wobble,0,2*Math.PI):L(u,n.x,n.y,Math.abs(_-v)*n.ovalScalar,Math.abs(C-k)*n.ovalScalar,Math.PI/10*n.wobble,0,2*Math.PI);else if(n.shape==="star")for(var $=Math.PI/2*3,K=4*n.scalar,V=8*n.scalar,U=n.x,z=n.y,te=5,Q=Math.PI/te;te--;)U=n.x+Math.cos($)*V,z=n.y+Math.sin($)*V,u.lineTo(U,z),$+=Q,U=n.x+Math.cos($)*K,z=n.y+Math.sin($)*K,u.lineTo(U,z),$+=Q;else u.moveTo(Math.floor(n.x),Math.floor(n.y)),u.lineTo(Math.floor(n.wobbleX),Math.floor(k)),u.lineTo(Math.floor(_),Math.floor(C)),u.lineTo(Math.floor(v),Math.floor(n.wobbleY));return u.closePath(),u.fill(),n.tick<n.totalTicks}function je(u,n,h,v,k){var _=n.slice(),C=u.getContext("2d"),x,T,A=d(function(D){function I(){x=T=null,C.clearRect(0,0,v.width,v.height),m.clear(),k(),D()}function B(){s&&!(v.width===r.width&&v.height===r.height)&&(v.width=u.width=r.width,v.height=u.height=r.height),!v.width&&!v.height&&(h(u),v.width=u.width,v.height=u.height),C.clearRect(0,0,v.width,v.height),_=_.filter(function(F){return Fe(C,F)}),_.length?x=E.frame(B):I()}x=E.frame(B),T=I});return{addFettis:function(D){return _=_.concat(D),A},canvas:u,promise:A,reset:function(){x&&E.cancel(x),T&&T()}}}function Ce(u,n){var h=!u,v=!!P(n||{},"resize"),k=!1,_=P(n,"disableForReducedMotion",Boolean),C=a&&!!P(n||{},"useWorker"),x=C?H():null,T=h?be:b,A=u&&x?!!u.__confetti_initialized:!1,D=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,I;function B($,K,V){for(var U=P($,"particleCount",S),z=P($,"angle",Number),te=P($,"spread",Number),Q=P($,"startVelocity",Number),qe=P($,"decay",Number),Ve=P($,"gravity",Number),Ue=P($,"drift",Number),$e=P($,"colors",de),Ge=P($,"ticks",Number),Ee=P($,"shapes"),Qe=P($,"scalar"),ze=!!P($,"flat"),Pe=ge($),Ae=U,ve=[],Je=u.width*Pe.x,Ye=u.height*Pe.y;Ae--;)ve.push(Le({x:Je,y:Ye,angle:z,spread:te,startVelocity:Q,color:$e[Ae%$e.length],shape:Ee[he(0,Ee.length)],ticks:Ge,decay:qe,gravity:Ve,drift:Ue,scalar:Qe,flat:ze}));return I?I.addFettis(ve):(I=je(u,ve,T,K,V),I.promise)}function F($){var K=_||P($,"disableForReducedMotion",Boolean),V=P($,"zIndex",Number);if(K&&D)return d(function(Q){Q()});h&&I?u=I.canvas:h&&!u&&(u=W(V),document.body.appendChild(u)),v&&!A&&T(u);var U={width:u.width,height:u.height};x&&!A&&x.init(u),A=!0,x&&(u.__confetti_initialized=!0);function z(){if(x){var Q={getBoundingClientRect:function(){if(!h)return u.getBoundingClientRect()}};T(Q),x.postMessage({resize:{width:Q.width,height:Q.height}});return}U.width=U.height=null}function te(){I=null,v&&(k=!1,e.removeEventListener("resize",z)),h&&u&&(document.body.contains(u)&&document.body.removeChild(u),u=null,A=!1)}return v&&!k&&(k=!0,e.addEventListener("resize",z,!1)),x?x.fire($,U,te):B($,U,te)}return F.reset=function(){x&&x.reset(),I&&I.reset()},F}var xe;function Te(){return xe||(xe=Ce(null,{useWorker:!0,resize:!0})),xe}function He(u,n,h,v,k,_,C){var x=new Path2D(u),T=new Path2D;T.addPath(x,new DOMMatrix(n));var A=new Path2D;return A.addPath(T,new DOMMatrix([Math.cos(C)*k,Math.sin(C)*k,-Math.sin(C)*_,Math.cos(C)*_,h,v])),A}function We(u){if(!c)throw new Error("path confetti are not supported in this browser");var n,h;typeof u=="string"?n=u:(n=u.path,h=u.matrix);var v=new Path2D(n),k=document.createElement("canvas"),_=k.getContext("2d");if(!h){for(var C=1e3,x=C,T=C,A=0,D=0,I,B,F=0;F<C;F+=2)for(var $=0;$<C;$+=2)_.isPointInPath(v,F,$,"nonzero")&&(x=Math.min(x,F),T=Math.min(T,$),A=Math.max(A,F),D=Math.max(D,$));I=A-x,B=D-T;var K=10,V=Math.min(K/I,K/B);h=[V,0,0,V,-Math.round(I/2+x)*V,-Math.round(B/2+T)*V]}return{type:"path",path:n,matrix:h}}function Ke(u){var n,h=1,v="#000000",k='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof u=="string"?n=u:(n=u.text,h="scalar"in u?u.scalar:h,k="fontFamily"in u?u.fontFamily:k,v="color"in u?u.color:v);var _=10*h,C=""+_+"px "+k,x=new OffscreenCanvas(_,_),T=x.getContext("2d");T.font=C;var A=T.measureText(n),D=Math.ceil(A.actualBoundingBoxRight+A.actualBoundingBoxLeft),I=Math.ceil(A.actualBoundingBoxAscent+A.actualBoundingBoxDescent),B=2,F=A.actualBoundingBoxLeft+B,$=A.actualBoundingBoxAscent+B;D+=B+B,I+=B+B,x=new OffscreenCanvas(D,I),T=x.getContext("2d"),T.font=C,T.fillStyle=v,T.fillText(n,F,$);var K=1/h;return{type:"bitmap",bitmap:x.transferToImageBitmap(),matrix:[K,0,0,K,-D*K/2,-I*K/2]}}t.exports=function(){return Te().apply(this,arguments)},t.exports.reset=function(){Te().reset()},t.exports.create=Ce,t.exports.shapeFromPath=We,t.exports.shapeFromText=Ke})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),we,!1);const J=we.exports;we.exports.create;class se extends Error{constructor(e,t){const s=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=s}}class ke extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class G extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class et extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=s}}class tt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=s}}class st extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=s}}class Ie extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class rt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=s}}class Oe{constructor(e,t,s){this.statusCode=e,this.statusText=t,this.content=s}}class fe{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var p;(function(i){i[i.Trace=0]="Trace",i[i.Debug=1]="Debug",i[i.Information=2]="Information",i[i.Warning=3]="Warning",i[i.Error=4]="Error",i[i.Critical=5]="Critical",i[i.None=6]="None"})(p||(p={}));class le{constructor(){}log(e,t){}}le.instance=new le;const at="8.0.29";class O{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,s){if(!(e in t))throw new Error(`Unknown ${s} value: ${e}.`)}}class R{static get isBrowser(){return!R.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!R.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!R.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function ce(i,e){let t="";return ae(i)?(t=`Binary data of length ${i.byteLength}`,e&&(t+=`. Content: '${it(i)}'`)):typeof i=="string"&&(t=`String data of length ${i.length}`,e&&(t+=`. Content: '${i}'`)),t}function it(i){const e=new Uint8Array(i);let t="";return e.forEach(s=>{const r=s<16?"0":"";t+=`0x${r}${s.toString(16)} `}),t.substr(0,t.length-1)}function ae(i){return i&&typeof ArrayBuffer<"u"&&(i instanceof ArrayBuffer||i.constructor&&i.constructor.name==="ArrayBuffer")}async function Ne(i,e,t,s,r,a){const c={},[o,l]=ie();c[o]=l,i.log(p.Trace,`(${e} transport) sending data. ${ce(r,a.logMessageContent)}.`);const d=ae(r)?"arraybuffer":"text",m=await t.post(s,{content:r,headers:{...c,...a.headers},responseType:d,timeout:a.timeout,withCredentials:a.withCredentials});i.log(p.Trace,`(${e} transport) request complete. Response status: ${m.statusCode}.`)}function ot(i){return i===void 0?new me(p.Information):i===null?le.instance:i.log!==void 0?i:new me(i)}class nt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class me{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const s=`[${new Date().toISOString()}] ${p[e]}: ${t}`;switch(e){case p.Critical:case p.Error:this.out.error(s);break;case p.Warning:this.out.warn(s);break;case p.Information:this.out.info(s);break;default:this.out.log(s);break}}}}function ie(){let i="X-SignalR-User-Agent";return R.isNode&&(i="User-Agent"),[i,lt(at,ct(),ut(),dt())]}function lt(i,e,t,s){let r="Microsoft SignalR/";const a=i.split(".");return r+=`${a[0]}.${a[1]}`,r+=` (${i}; `,e&&e!==""?r+=`${e}; `:r+="Unknown OS; ",r+=`${t}`,s?r+=`; ${s}`:r+="; Unknown Runtime Version",r+=")",r}function ct(){if(R.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function dt(){if(R.isNode)return process.versions.node}function ut(){return R.isNode?"NodeJS":"Browser"}function ye(i){return i.stack?i.stack:i.message?i.message:`${i}`}function pt(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class mt extends fe{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||R.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(pt());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new G;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let s;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),s=new G});let r=null;if(e.timeout){const l=e.timeout;r=setTimeout(()=>{t.abort(),this._logger.log(p.Warning,"Timeout from HTTP request."),s=new ke},l)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},ae(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let a;try{a=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(l){throw s||(this._logger.log(p.Warning,`Error from HTTP request. ${l}.`),l)}finally{r&&clearTimeout(r),e.abortSignal&&(e.abortSignal.onabort=null)}if(!a.ok){const l=await Me(a,"text");throw new se(l||a.statusText,a.status)}const o=await Me(a,e.responseType);return new Oe(a.status,a.statusText,o)}getCookieString(e){let t="";return R.isNode&&this._jar&&this._jar.getCookies(e,(s,r)=>t=r.join("; ")),t}}function Me(i,e){let t;switch(e){case"arraybuffer":t=i.arrayBuffer();break;case"text":t=i.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=i.text();break}return t}class ft extends fe{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new G):e.method?e.url?new Promise((t,s)=>{const r=new XMLHttpRequest;r.open(e.method,e.url,!0),r.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,r.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(ae(e.content)?r.setRequestHeader("Content-Type","application/octet-stream"):r.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const a=e.headers;a&&Object.keys(a).forEach(c=>{r.setRequestHeader(c,a[c])}),e.responseType&&(r.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{r.abort(),s(new G)}),e.timeout&&(r.timeout=e.timeout),r.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),r.status>=200&&r.status<300?t(new Oe(r.status,r.statusText,r.response||r.responseText)):s(new se(r.response||r.responseText||r.statusText,r.status))},r.onerror=()=>{this._logger.log(p.Warning,`Error from HTTP request. ${r.status}: ${r.statusText}.`),s(new se(r.statusText,r.status))},r.ontimeout=()=>{this._logger.log(p.Warning,"Timeout from HTTP request."),s(new ke)},r.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class ht extends fe{constructor(e){if(super(),typeof fetch<"u"||R.isNode)this._httpClient=new mt(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new ft(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new G):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class q{static write(e){return`${e}${q.RecordSeparator}`}static parse(e){if(e[e.length-1]!==q.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(q.RecordSeparator);return t.pop(),t}}q.RecordSeparatorCode=30;q.RecordSeparator=String.fromCharCode(q.RecordSeparatorCode);class gt{writeHandshakeRequest(e){return q.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,s;if(ae(e)){const o=new Uint8Array(e),l=o.indexOf(q.RecordSeparatorCode);if(l===-1)throw new Error("Message is incomplete.");const d=l+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(o.slice(0,d))),s=o.byteLength>d?o.slice(d).buffer:null}else{const o=e,l=o.indexOf(q.RecordSeparator);if(l===-1)throw new Error("Message is incomplete.");const d=l+1;t=o.substring(0,d),s=o.length>d?o.substring(d):null}const r=q.parse(t),a=JSON.parse(r[0]);if(a.type)throw new Error("Expected a handshake response from the server.");return[s,a]}}var y;(function(i){i[i.Invocation=1]="Invocation",i[i.StreamItem=2]="StreamItem",i[i.Completion=3]="Completion",i[i.StreamInvocation=4]="StreamInvocation",i[i.CancelInvocation=5]="CancelInvocation",i[i.Ping=6]="Ping",i[i.Close=7]="Close",i[i.Ack=8]="Ack",i[i.Sequence=9]="Sequence"})(y||(y={}));class bt{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new nt(this,e)}}class xt{constructor(e,t,s){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=s}async _send(e){const t=this._protocol.writeMessage(e);let s=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let r=()=>{},a=()=>{};ae(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(s=new Promise((c,o)=>{r=c,a=o})),this._messages.push(new vt(t,this._totalMessageCount,r,a))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await s}_ack(e){let t=-1;for(let s=0;s<this._messages.length;s++){const r=this._messages[s];if(r._id<=e.sequenceId)t=s,ae(r._message)?this._bufferedByteCount-=r._message.byteLength:this._bufferedByteCount-=r._message.length,r._resolver();else if(this._bufferedByteCount<this._bufferSize)r._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==y.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:y.Sequence,sequenceId:e}));const t=this._messages;for(const s of t)await this._connection.send(s._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case y.Invocation:case y.StreamItem:case y.Completion:case y.StreamInvocation:case y.CancelInvocation:return!0;case y.Close:case y.Sequence:case y.Ping:case y.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:y.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class vt{constructor(e,t,s,r){this._message=e,this._id=t,this._resolver=s,this._rejector=r}}const yt=30*1e3,wt=15*1e3,kt=1e5;var M;(function(i){i.Disconnected="Disconnected",i.Connecting="Connecting",i.Connected="Connected",i.Disconnecting="Disconnecting",i.Reconnecting="Reconnecting"})(M||(M={}));class Se{static create(e,t,s,r,a,c,o){return new Se(e,t,s,r,a,c,o)}constructor(e,t,s,r,a,c,o){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(p.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},O.isRequired(e,"connection"),O.isRequired(t,"logger"),O.isRequired(s,"protocol"),this.serverTimeoutInMilliseconds=a??yt,this.keepAliveIntervalInMilliseconds=c??wt,this._statefulReconnectBufferSize=o??kt,this._logger=t,this._protocol=s,this.connection=e,this._reconnectPolicy=r,this._handshakeProtocol=new gt,this.connection.onreceive=l=>this._processIncomingData(l),this.connection.onclose=l=>this._connectionClosed(l),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=M.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:y.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==M.Disconnected&&this._connectionState!==M.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==M.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=M.Connecting,this._logger.log(p.Debug,"Starting HubConnection.");try{await this._startInternal(),R.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=M.Connected,this._connectionStarted=!0,this._logger.log(p.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=M.Disconnected,this._logger.log(p.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,s)=>{this._handshakeResolver=t,this._handshakeRejecter=s});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const s={protocol:this._protocol.name,version:t};if(this._logger.log(p.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)),this._logger.log(p.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new xt(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(p.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===M.Disconnected)return this._logger.log(p.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===M.Disconnecting)return this._logger.log(p.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=M.Disconnecting,this._logger.log(p.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(p.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===M.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new G("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[s,r]=this._replaceStreamingParams(t),a=this._createStreamInvocation(e,t,r);let c;const o=new bt;return o.cancelCallback=()=>{const l=this._createCancelInvocation(a.invocationId);return delete this._callbacks[a.invocationId],c.then(()=>this._sendWithProtocol(l))},this._callbacks[a.invocationId]=(l,d)=>{if(d){o.error(d);return}else l&&(l.type===y.Completion?l.error?o.error(new Error(l.error)):o.complete():o.next(l.item))},c=this._sendWithProtocol(a).catch(l=>{o.error(l),delete this._callbacks[a.invocationId]}),this._launchStreams(s,c),o}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[s,r]=this._replaceStreamingParams(t),a=this._sendWithProtocol(this._createInvocation(e,t,!0,r));return this._launchStreams(s,a),a}invoke(e,...t){const[s,r]=this._replaceStreamingParams(t),a=this._createInvocation(e,t,!1,r);return new Promise((o,l)=>{this._callbacks[a.invocationId]=(m,E)=>{if(E){l(E);return}else m&&(m.type===y.Completion?m.error?l(new Error(m.error)):o(m.result):l(new Error(`Unexpected message type: ${m.type}`)))};const d=this._sendWithProtocol(a).catch(m=>{l(m),delete this._callbacks[a.invocationId]});this._launchStreams(s,d)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const s=this._methods[e];if(s)if(t){const r=s.indexOf(t);r!==-1&&(s.splice(r,1),s.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const s of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(s)))switch(s.type){case y.Invocation:this._invokeClientMethod(s).catch(r=>{this._logger.log(p.Error,`Invoke client method threw error: ${ye(r)}`)});break;case y.StreamItem:case y.Completion:{const r=this._callbacks[s.invocationId];if(r){s.type===y.Completion&&delete this._callbacks[s.invocationId];try{r(s)}catch(a){this._logger.log(p.Error,`Stream callback threw error: ${ye(a)}`)}}break}case y.Ping:break;case y.Close:{this._logger.log(p.Information,"Close message received from server.");const r=s.error?new Error("Server returned an error on close: "+s.error):void 0;s.allowReconnect===!0?this.connection.stop(r):this._stopPromise=this._stopInternal(r);break}case y.Ack:this._messageBuffer&&this._messageBuffer._ack(s);break;case y.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(s);break;default:this._logger.log(p.Warning,`Invalid message type: ${s.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,s;try{[s,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(r){const a="Error parsing handshake response: "+r;this._logger.log(p.Error,a);const c=new Error(a);throw this._handshakeRejecter(c),c}if(t.error){const r="Server returned handshake error: "+t.error;this._logger.log(p.Error,r);const a=new Error(r);throw this._handshakeRejecter(a),a}else this._logger.log(p.Debug,"Server handshake complete.");return this._handshakeResolver(),s}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===M.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),s=this._methods[t];if(!s){this._logger.log(p.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(p.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const r=s.slice(),a=!!e.invocationId;let c,o,l;for(const d of r)try{const m=c;c=await d.apply(this,e.arguments),a&&c&&m&&(this._logger.log(p.Error,`Multiple results provided for '${t}'. Sending error to server.`),l=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),o=void 0}catch(m){o=m,this._logger.log(p.Error,`A callback for the method '${t}' threw error '${m}'.`)}l?await this._sendWithProtocol(l):a?(o?l=this._createCompletionMessage(e.invocationId,`${o}`,null):c!==void 0?l=this._createCompletionMessage(e.invocationId,null,c):(this._logger.log(p.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),l=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(l)):c&&this._logger.log(p.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(p.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new G("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===M.Disconnecting?this._completeClose(e):this._connectionState===M.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===M.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=M.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),R.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(p.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let s=0,r=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),a=this._getNextRetryDelay(s++,0,r);if(a===null){this._logger.log(p.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=M.Reconnecting,e?this._logger.log(p.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(p.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(c=>c.apply(this,[e]))}catch(c){this._logger.log(p.Error,`An onreconnecting callback called with error '${e}' threw error '${c}'.`)}if(this._connectionState!==M.Reconnecting){this._logger.log(p.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;a!==null;){if(this._logger.log(p.Information,`Reconnect attempt number ${s} will start in ${a} ms.`),await new Promise(c=>{this._reconnectDelayHandle=setTimeout(c,a)}),this._reconnectDelayHandle=void 0,this._connectionState!==M.Reconnecting){this._logger.log(p.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=M.Connected,this._logger.log(p.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(c=>c.apply(this,[this.connection.connectionId]))}catch(c){this._logger.log(p.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${c}'.`)}return}catch(c){if(this._logger.log(p.Information,`Reconnect attempt failed because of error '${c}'.`),this._connectionState!==M.Reconnecting){this._logger.log(p.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===M.Disconnecting&&this._completeClose();return}r=c instanceof Error?c:new Error(c.toString()),a=this._getNextRetryDelay(s++,Date.now()-t,r)}}this._logger.log(p.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${s} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,s){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:s})}catch(r){return this._logger.log(p.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${r}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(s=>{const r=t[s];try{r(null,e)}catch(a){this._logger.log(p.Error,`Stream 'error' callback called with '${e}' threw error: ${ye(a)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,s,r){if(s)return r.length!==0?{arguments:t,streamIds:r,target:e,type:y.Invocation}:{arguments:t,target:e,type:y.Invocation};{const a=this._invocationId;return this._invocationId++,r.length!==0?{arguments:t,invocationId:a.toString(),streamIds:r,target:e,type:y.Invocation}:{arguments:t,invocationId:a.toString(),target:e,type:y.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const s in e)e[s].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s)))},error:r=>{let a;r instanceof Error?a=r.message:r&&r.toString?a=r.toString():a="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s,a)))},next:r=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(s,r)))}})}}_replaceStreamingParams(e){const t=[],s=[];for(let r=0;r<e.length;r++){const a=e[r];if(this._isObservable(a)){const c=this._invocationId;this._invocationId++,t[c]=a,s.push(c.toString()),e.splice(r,1)}}return[t,s]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,s){const r=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:r.toString(),streamIds:s,target:e,type:y.StreamInvocation}:{arguments:t,invocationId:r.toString(),target:e,type:y.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:y.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:y.StreamItem}}_createCompletionMessage(e,t,s){return t?{error:t,invocationId:e,type:y.Completion}:{invocationId:e,result:s,type:y.Completion}}_createCloseMessage(){return{type:y.Close}}}const St=[0,2e3,1e4,3e4,null];class Re{constructor(e){this._retryDelays=e!==void 0?[...e,null]:St}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class re{}re.Authorization="Authorization";re.Cookie="Cookie";class _t extends fe{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const s=await this._innerClient.send(e);return t&&s.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):s}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[re.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[re.Authorization]&&delete e.headers[re.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var N;(function(i){i[i.None=0]="None",i[i.WebSockets=1]="WebSockets",i[i.ServerSentEvents=2]="ServerSentEvents",i[i.LongPolling=4]="LongPolling"})(N||(N={}));var j;(function(i){i[i.Text=1]="Text",i[i.Binary=2]="Binary"})(j||(j={}));let Ct=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class De{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,s){this._httpClient=e,this._logger=t,this._pollAbort=new Ct,this._options=s,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(O.isRequired(e,"url"),O.isRequired(t,"transferFormat"),O.isIn(t,j,"transferFormat"),this._url=e,this._logger.log(p.Trace,"(LongPolling transport) Connecting."),t===j.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[s,r]=ie(),a={[s]:r,...this._options.headers},c={abortSignal:this._pollAbort.signal,headers:a,timeout:1e5,withCredentials:this._options.withCredentials};t===j.Binary&&(c.responseType="arraybuffer");const o=`${e}&_=${Date.now()}`;this._logger.log(p.Trace,`(LongPolling transport) polling: ${o}.`);const l=await this._httpClient.get(o,c);l.statusCode!==200?(this._logger.log(p.Error,`(LongPolling transport) Unexpected response code: ${l.statusCode}.`),this._closeError=new se(l.statusText||"",l.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,c)}async _poll(e,t){try{for(;this._running;)try{const s=`${e}&_=${Date.now()}`;this._logger.log(p.Trace,`(LongPolling transport) polling: ${s}.`);const r=await this._httpClient.get(s,t);r.statusCode===204?(this._logger.log(p.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):r.statusCode!==200?(this._logger.log(p.Error,`(LongPolling transport) Unexpected response code: ${r.statusCode}.`),this._closeError=new se(r.statusText||"",r.statusCode),this._running=!1):r.content?(this._logger.log(p.Trace,`(LongPolling transport) data received. ${ce(r.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(r.content)):this._logger.log(p.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(s){this._running?s instanceof ke?this._logger.log(p.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=s,this._running=!1):this._logger.log(p.Trace,`(LongPolling transport) Poll errored after shutdown: ${s.message}`)}}finally{this._logger.log(p.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?Ne(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(p.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(p.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,s]=ie();e[t]=s;const r={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let a;try{await this._httpClient.delete(this._url,r)}catch(c){a=c}a?a instanceof se&&(a.statusCode===404?this._logger.log(p.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(p.Trace,`(LongPolling transport) Error sending a DELETE request: ${a}`)):this._logger.log(p.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(p.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(p.Trace,e),this.onclose(this._closeError)}}}class Tt{constructor(e,t,s,r){this._httpClient=e,this._accessToken=t,this._logger=s,this._options=r,this.onreceive=null,this.onclose=null}async connect(e,t){return O.isRequired(e,"url"),O.isRequired(t,"transferFormat"),O.isIn(t,j,"transferFormat"),this._logger.log(p.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((s,r)=>{let a=!1;if(t!==j.Text){r(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let c;if(R.isBrowser||R.isWebWorker)c=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const o=this._httpClient.getCookieString(e),l={};l.Cookie=o;const[d,m]=ie();l[d]=m,c=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...l,...this._options.headers}})}try{c.onmessage=o=>{if(this.onreceive)try{this._logger.log(p.Trace,`(SSE transport) data received. ${ce(o.data,this._options.logMessageContent)}.`),this.onreceive(o.data)}catch(l){this._close(l);return}},c.onerror=o=>{a?this._close():r(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},c.onopen=()=>{this._logger.log(p.Information,`SSE connected to ${this._url}`),this._eventSource=c,a=!0,s()}}catch(o){r(o);return}})}async send(e){return this._eventSource?Ne(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class $t{constructor(e,t,s,r,a,c){this._logger=s,this._accessTokenFactory=t,this._logMessageContent=r,this._webSocketConstructor=a,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=c}async connect(e,t){O.isRequired(e,"url"),O.isRequired(t,"transferFormat"),O.isIn(t,j,"transferFormat"),this._logger.log(p.Trace,"(WebSockets transport) Connecting.");let s;return this._accessTokenFactory&&(s=await this._accessTokenFactory()),new Promise((r,a)=>{e=e.replace(/^http/,"ws");let c;const o=this._httpClient.getCookieString(e);let l=!1;if(R.isNode||R.isReactNative){const d={},[m,E]=ie();d[m]=E,s&&(d[re.Authorization]=`Bearer ${s}`),o&&(d[re.Cookie]=o),c=new this._webSocketConstructor(e,void 0,{headers:{...d,...this._headers}})}else s&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(s)}`);c||(c=new this._webSocketConstructor(e)),t===j.Binary&&(c.binaryType="arraybuffer"),c.onopen=d=>{this._logger.log(p.Information,`WebSocket connected to ${e}.`),this._webSocket=c,l=!0,r()},c.onerror=d=>{let m=null;typeof ErrorEvent<"u"&&d instanceof ErrorEvent?m=d.error:m="There was an error with the transport",this._logger.log(p.Information,`(WebSockets transport) ${m}.`)},c.onmessage=d=>{if(this._logger.log(p.Trace,`(WebSockets transport) data received. ${ce(d.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(d.data)}catch(m){this._close(m);return}},c.onclose=d=>{if(l)this._close(d);else{let m=null;typeof ErrorEvent<"u"&&d instanceof ErrorEvent?m=d.error:m="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",a(new Error(m))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(p.Trace,`(WebSockets transport) sending data. ${ce(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(p.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const Be=100;class Et{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,O.isRequired(e,"url"),this._logger=ot(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let s=null,r=null;if(R.isNode&&typeof require<"u"){const a=typeof __webpack_require__=="function"?__non_webpack_require__:require;s=a("ws"),r=a("eventsource")}!R.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:R.isNode&&!t.WebSocket&&s&&(t.WebSocket=s),!R.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:R.isNode&&!t.EventSource&&typeof r<"u"&&(t.EventSource=r),this._httpClient=new _t(t.httpClient||new ht(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||j.Binary,O.isIn(e,j,"transferFormat"),this._logger.log(p.Debug,`Starting connection with transfer format '${j[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(p.Error,t),await this._stopPromise,Promise.reject(new G(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(p.Error,t),Promise.reject(new G(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new _e(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(p.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(p.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(p.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(p.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===N.WebSockets)this.transport=this._constructTransport(N.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let s=null,r=0;do{if(s=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new G("The connection was stopped during negotiation.");if(s.error)throw new Error(s.error);if(s.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(s.url&&(t=s.url),s.accessToken){const a=s.accessToken;this._accessTokenFactory=()=>a,this._httpClient._accessToken=a,this._httpClient._accessTokenFactory=void 0}r++}while(s.url&&r<Be);if(r===Be&&s.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,s,e)}this.transport instanceof De&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(p.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(s){return this._logger.log(p.Error,"Failed to start the connection: "+s),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(s)}}async _getNegotiationResponse(e){const t={},[s,r]=ie();t[s]=r;const a=this._resolveNegotiateUrl(e);this._logger.log(p.Debug,`Sending negotiation request: ${a}.`);try{const c=await this._httpClient.post(a,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(c.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${c.statusCode}'`));const o=JSON.parse(c.content);return(!o.negotiateVersion||o.negotiateVersion<1)&&(o.connectionToken=o.connectionId),o.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new Ie("Client didn't negotiate Stateful Reconnect but the server did.")):o}catch(c){let o="Failed to complete negotiation with the server: "+c;return c instanceof se&&c.statusCode===404&&(o=o+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(p.Error,o),Promise.reject(new Ie(o))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,s,r){let a=this._createConnectUrl(e,s.connectionToken);if(this._isITransport(t)){this._logger.log(p.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(a,r),this.connectionId=s.connectionId;return}const c=[],o=s.availableTransports||[];let l=s;for(const d of o){const m=this._resolveTransportOrError(d,t,r,(l==null?void 0:l.useStatefulReconnect)===!0);if(m instanceof Error)c.push(`${d.transport} failed:`),c.push(m);else if(this._isITransport(m)){if(this.transport=m,!l){try{l=await this._getNegotiationResponse(e)}catch(E){return Promise.reject(E)}a=this._createConnectUrl(e,l.connectionToken)}try{await this._startTransport(a,r),this.connectionId=l.connectionId;return}catch(E){if(this._logger.log(p.Error,`Failed to start the transport '${d.transport}': ${E}`),l=void 0,c.push(new st(`${d.transport} failed: ${E}`,N[d.transport])),this._connectionState!=="Connecting"){const H="Failed to select transport before stop() was called.";return this._logger.log(p.Debug,H),Promise.reject(new G(H))}}}}return c.length>0?Promise.reject(new rt(`Unable to connect to the server with any of the available transports. ${c.join(" ")}`,c)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case N.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new $t(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case N.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Tt(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case N.LongPolling:return new De(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async s=>{let r=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{r=!0}else{this._stopConnection(s);return}r&&this._stopConnection(s)}:this.transport.onclose=s=>this._stopConnection(s),this.transport.connect(e,t)}_resolveTransportOrError(e,t,s,r){const a=N[e.transport];if(a==null)return this._logger.log(p.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Pt(t,a))if(e.transferFormats.map(o=>j[o]).indexOf(s)>=0){if(a===N.WebSockets&&!this._options.WebSocket||a===N.ServerSentEvents&&!this._options.EventSource)return this._logger.log(p.Debug,`Skipping transport '${N[a]}' because it is not supported in your environment.'`),new et(`'${N[a]}' is not supported in your environment.`,a);this._logger.log(p.Debug,`Selecting transport '${N[a]}'.`);try{return this.features.reconnect=a===N.WebSockets?r:void 0,this._constructTransport(a)}catch(o){return o}}else return this._logger.log(p.Debug,`Skipping transport '${N[a]}' because it does not support the requested transfer format '${j[s]}'.`),new Error(`'${N[a]}' does not support ${j[s]}.`);else return this._logger.log(p.Debug,`Skipping transport '${N[a]}' because it was disabled by the client.`),new tt(`'${N[a]}' is disabled by the client.`,a)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(p.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(p.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(p.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(p.Error,`Connection disconnected with error '${e}'.`):this._logger.log(p.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(p.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(p.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!R.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(p.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const s=new URLSearchParams(t.searchParams);return s.has("negotiateVersion")||s.append("negotiateVersion",this._negotiateVersion.toString()),s.has("useStatefulReconnect")?s.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&s.append("useStatefulReconnect","true"),t.search=s.toString(),t.toString()}}function Pt(i,e){return!i||(e&i)!==0}class _e{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new pe,this._transportResult=new pe,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new pe),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new pe;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):_e._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(s){e.reject(s)}}}static _concatBuffers(e){const t=e.map(a=>a.byteLength).reduce((a,c)=>a+c),s=new Uint8Array(t);let r=0;for(const a of e)s.set(new Uint8Array(a),r),r+=a.byteLength;return s.buffer}}class pe{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const At="json";class It{constructor(){this.name=At,this.version=2,this.transferFormat=j.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=le.instance);const s=q.parse(e),r=[];for(const a of s){const c=JSON.parse(a);if(typeof c.type!="number")throw new Error("Invalid payload.");switch(c.type){case y.Invocation:this._isInvocationMessage(c);break;case y.StreamItem:this._isStreamItemMessage(c);break;case y.Completion:this._isCompletionMessage(c);break;case y.Ping:break;case y.Close:break;case y.Ack:this._isAckMessage(c);break;case y.Sequence:this._isSequenceMessage(c);break;default:t.log(p.Information,"Unknown message type '"+c.type+"' ignored.");continue}r.push(c)}return r}writeMessage(e){return q.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const Mt={trace:p.Trace,debug:p.Debug,info:p.Information,information:p.Information,warn:p.Warning,warning:p.Warning,error:p.Error,critical:p.Critical,none:p.None};function Rt(i){const e=Mt[i.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${i}`)}class Dt{configureLogging(e){if(O.isRequired(e,"logging"),Bt(e))this.logger=e;else if(typeof e=="string"){const t=Rt(e);this.logger=new me(t)}else this.logger=new me(e);return this}withUrl(e,t){return O.isRequired(e,"url"),O.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return O.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new Re(e):this.reconnectPolicy=e:this.reconnectPolicy=new Re,this}withServerTimeout(e){return O.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return O.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new Et(this.url,e);return Se.create(t,this.logger||le.instance,this.protocol||new It,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Bt(i){return i.log!==void 0}class Ot{constructor(){g(this,"hubConnection",null);g(this,"isConnected",!1);g(this,"statusListeners",[])}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Dt().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect().configureLogging(p.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{this.statusListeners.forEach(s=>s(t.orderId,t.status,t.message))}),this.hubConnection.start().then(()=>{this.isConnected=!0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection fallback active (sandbox mode)",t)})}catch{console.log("SignalR running in local simulated mode")}}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,s){this.statusListeners.forEach(r=>r(e,t,s))}}const ne=new Ot;class Nt{constructor(){g(this,"token",localStorage.getItem("token")||null);g(this,"currentUser",this.loadStoredUser());g(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);g(this,"listeners",[]);g(this,"listings",[]);g(this,"orders",[]);g(this,"notifications",[]);g(this,"standingOrders",[]);g(this,"anomalyAlerts",[]);g(this,"kycQueue",[]);g(this,"regionalAnalytics",[]);g(this,"priceBenchmarks",[]);g(this,"offlineQueue",[]);g(this,"isOfflineMode",!1);g(this,"farmerSummary",{totalEarnedEtb:48200,pendingEscrowEtb:14850,releasedEtb:48200,completedOrdersCount:18,pendingOrdersCount:1});g(this,"driverSummary",{totalEarnedEtb:6450,pendingEtb:825,deliveredTripsCount:14,ruralBonusEtb:1250});g(this,"platformStats",{totalUsers:6,totalFarmers:3,totalBuyers:1,totalDrivers:1,totalListings:6,totalOrders:3,totalTransactionVolumeEtb:34500,totalPlatformCommissionEtb:1725,activeEscrowHeldEtb:25500,disputedOrdersCount:1,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}async init(){this.loadOfflineQueue(),this.initDefaultData(),this.token&&await this.fetchMe(),await this.refreshAllData()}initDefaultData(){this.priceBenchmarks=[{cropName:"Fresh Sholla Red Tomatoes",cropNameAm:"ቀይ ቲማቲም",marketName:"Merkato Wholesale / Sholla",minPriceEtb:38,avgPriceEtb:45,maxPriceEtb:52,trend:"Down",lastUpdated:"Today 6:00 AM"},{cropName:"Organic Magna White Teff",cropNameAm:"የማኛ ነጭ ጤፍ",marketName:"EABC / Addis Depot",minPriceEtb:108,avgPriceEtb:115,maxPriceEtb:125,trend:"Up",lastUpdated:"Today 7:30 AM"},{cropName:"Awash Valley Red Onions",cropNameAm:"ቀይ ሽንኩርት",marketName:"Adama Wholesale Market",minPriceEtb:48,avgPriceEtb:55,maxPriceEtb:62,trend:"Stable",lastUpdated:"Today 6:15 AM"},{cropName:"Hawassa Hass Avocados",cropNameAm:"ሀስ አቮካዶ",marketName:"Hawassa Central / Merkato",minPriceEtb:50,avgPriceEtb:60,maxPriceEtb:72,trend:"Up",lastUpdated:"Today 8:00 AM"},{cropName:"Specialty Green Coffee Beans",cropNameAm:"ስፔሻሊቲ ቡና",marketName:"ECX Central Exchange",minPriceEtb:340,avgPriceEtb:380,maxPriceEtb:420,trend:"Up",lastUpdated:"Yesterday"},{cropName:"Bishoftu Sweet Strawberries",cropNameAm:"የቢሾፍቱ እንጆሪ",marketName:"Bole Fresh Produce Hub",minPriceEtb:85,avgPriceEtb:95,maxPriceEtb:110,trend:"Stable",lastUpdated:"Today 7:00 AM"}],this.standingOrders=[{id:"so-1",listingId:"a1b2c3d4-0001-0000-0000-000000000001",productName:"Fresh Sholla Red Tomatoes",productNameAm:"የሾላ ቀይ ቲማቲም",farmerName:"Abebe Bekele",qtyKg:150,pricePerKg:45,frequency:"Weekly",nextDeliveryDate:"Next Monday, 8:00 AM",active:!0,createdAt:new Date().toISOString()},{id:"so-2",listingId:"a1b2c3d4-0003-0000-0000-000000000003",productName:"Awash Valley Red Onions",productNameAm:"የአዋሽ ቀይ ሽንኩርት",farmerName:"Abebe Bekele",qtyKg:200,pricePerKg:55,frequency:"Bi-Weekly",nextDeliveryDate:"Next Thursday, 9:00 AM",active:!0,createdAt:new Date().toISOString()}],this.anomalyAlerts=[{id:"ANOM-101",severity:"High",type:"PriceManipulation",title:"Unusual Price Spike Detected",description:"Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",entityType:"Listing",entityId:"a1b2c3d4-0001-0000-0000-000000000001",detectedAt:"35 mins ago"},{id:"ANOM-102",severity:"Medium",type:"DuplicateProofPhoto",title:"Driver Proof Image Hash Match",description:"Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",entityType:"Order",entityId:"b1b2c3d4-0002-0000-0000-000000000002",detectedAt:"2 hours ago"},{id:"ANOM-103",severity:"Low",type:"FakeAccount",title:"Rapid Registration Cluster",description:"Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",entityType:"User",entityId:"44444444-4444-4444-4444-444444444444",detectedAt:"5 hours ago"}],this.kycQueue=[{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede (Driver)",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",documentType:"Commercial Vehicle Logbook & License",documentNumber:"ET-LOG-5T-98214",status:"Pending",submittedAt:"Yesterday"},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele (Farmer)",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",documentType:"National ID (Fayda)",documentNumber:"FAYDA-ET-8829104",status:"Verified",submittedAt:"3 days ago"},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu (Farmer)",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",documentType:"Kebele Smallholder ID",documentNumber:"HAW-KEB-4410",status:"Pending",submittedAt:"12 hours ago"}],this.regionalAnalytics=[{region:"Oromia (East Shewa / Bishoftu)",smallholdersCount:4200,volumeMetricTons:68.5,totalGmvEtb:385e4,topCrop:"Tomatoes & Onions"},{region:"Amhara (Debre Berhan / Gojjam)",smallholdersCount:3100,volumeMetricTons:42,totalGmvEtb:483e4,topCrop:"Magna White Teff"},{region:"Sidama (Hawassa / Yirgalem)",smallholdersCount:1950,volumeMetricTons:24.8,totalGmvEtb:1488e3,topCrop:"Hass Avocados & Fruits"},{region:"SNNPR (Gedeo / Yirgacheffe)",smallholdersCount:1400,volumeMetricTons:10.5,totalGmvEtb:399e4,topCrop:"Specialty Green Coffee"}]}loadOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");e&&(this.offlineQueue=JSON.parse(e))}catch{this.offlineQueue=[]}}saveOfflineQueue(){localStorage.setItem("offlineQueue",JSON.stringify(this.offlineQueue))}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),s={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,role:(t.role||"buyer").toLowerCase(),region:t.region,verified:t.verified,vehicleType:t.vehicleType||"Isuzu 5-Ton",refrigerationType:t.refrigerationType||"Ventilated",vehicleCapacityKg:t.vehicleCapacityKg||5e3,kycDocumentType:t.kycDocumentType,kycDocumentNumber:t.kycDocumentNumber,kycStatus:t.kycStatus||"Verified",repeatBuyerCount:t.repeatBuyerCount||14,onTimeDeliveryRate:t.onTimeDeliveryRate||99,walletBalanceEtb:t.walletBalanceEtb||48200,createdAt:t.createdAt};return this.currentUser=s,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(s)),this.notify(),s}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async requestOtp(e){const t=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),s=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(!s.ok){const r=await s.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(r.error||"Failed to request OTP. Please check your phone number.")}return await s.json()}async verifyOtp(e,t){const s=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),r=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:s,code:t.trim()})});if(!r.ok){const o=await r.json().catch(()=>({error:"Invalid verification code or phone"}));throw new Error(o.error||"Authentication failed")}const a=await r.json();this.token=a.token,localStorage.setItem("token",a.token);const c={id:a.user.id,phone:a.user.phone,name:a.user.name,nameAm:a.user.nameAm,role:(a.user.role||"buyer").toLowerCase(),region:a.user.region,verified:a.user.verified,vehicleType:a.user.vehicleType||"Isuzu 5-Ton",refrigerationType:a.user.refrigerationType||"Ventilated",vehicleCapacityKg:a.user.vehicleCapacityKg||5e3,kycDocumentType:a.user.kycDocumentType,kycDocumentNumber:a.user.kycDocumentNumber,kycStatus:a.user.kycStatus||"Verified",repeatBuyerCount:a.user.repeatBuyerCount||14,onTimeDeliveryRate:a.user.onTimeDeliveryRate||99,walletBalanceEtb:a.user.walletBalanceEtb||48200,createdAt:a.user.createdAt};return this.currentUser=c,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(c)),ne.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),c}async registerUser(e,t,s,r,a){const c=s.startsWith("+251")?s:"+251"+s.replace(/^0+/,""),o=r.charAt(0).toUpperCase()+r.slice(1).toLowerCase(),l=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,phone:c,role:o,region:a})});if(!l.ok){const E=await l.json().catch(()=>({error:"Registration failed"}));throw new Error(E.error||"Registration failed")}const d=await l.json();this.token=d.token,localStorage.setItem("token",d.token);const m={id:d.user.id,phone:d.user.phone,name:d.user.name,nameAm:d.user.nameAm,role:(d.user.role||"buyer").toLowerCase(),region:d.user.region,verified:d.user.verified,vehicleType:r==="driver"?"Isuzu 5-Ton":void 0,refrigerationType:r==="driver"?"Ventilated":void 0,vehicleCapacityKg:r==="driver"?5e3:void 0,kycDocumentType:"National ID (Fayda)",kycDocumentNumber:"FAYDA-NEW-"+Math.floor(1e5+Math.random()*9e5),kycStatus:"Verified",repeatBuyerCount:5,onTimeDeliveryRate:98,walletBalanceEtb:0,createdAt:d.user.createdAt};return this.currentUser=m,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),ne.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(){try{const e=await fetch("/api/listings");if(e.ok){const t=await e.json(),s=Array.isArray(t)?t:t.items||[];return this.listings=s.map(r=>({id:r.id,farmerId:r.farmerId,farmerName:r.farmerName,farmerNameAm:r.farmerNameAm,farmerPhone:r.farmerPhone,region:r.region,productName:r.productName,nameAm:r.nameAm,category:r.category,qtyKg:Number(r.qtyKg),pricePerKg:Number(r.pricePerKg),minOrderKg:Number(r.minOrderKg),latitude:r.latitude,longitude:r.longitude,distanceKm:r.distanceKm,photos:r.photos&&r.photos.length>0?r.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:r.availableFrom||new Date().toISOString().split("T")[0],status:(r.status||"Active").toLowerCase(),grade:r.grade||"Grade 1",ripeness:r.ripeness||"Ready Today",isOrganic:r.isOrganic??!0,isAdvanceHarvest:r.isAdvanceHarvest??!1,expectedHarvestDate:r.expectedHarvestDate,voiceNoteUrl:r.voiceNoteUrl,voiceNoteTranscript:r.voiceNoteTranscript,marketBenchmarkPrice:r.marketBenchmarkPrice||r.pricePerKg,moderationStatus:r.moderationStatus||"Approved",farmerRating:r.farmerRating||4.9,reviewCount:r.reviewCount||14,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:r.createdAt})),this.notify(),this.listings}}catch(e){console.warn("Fetch listings from backend failed",e)}return this.listings}getListings(e,t,s,r,a,c,o,l){return this.listings.filter(d=>{if(d.status!=="active"||e&&e!=="All"&&d.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!d.region.toLowerCase().includes(t.toLowerCase())||a&&a!=="All"&&d.grade!==a||c&&c!=="All"&&d.ripeness!==c||o&&!d.isOrganic||l&&!d.isAdvanceHarvest||r&&d.distanceKm&&d.distanceKm>r)return!1;if(s){const m=s.toLowerCase();if(!(d.productName.toLowerCase().includes(m)||d.nameAm&&d.nameAm.includes(m)||d.farmerName.toLowerCase().includes(m)||d.region.toLowerCase().includes(m)))return!1}return!0})}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var c,o,l,d;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category||"Vegetables",qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate||null,voiceNoteUrl:e.voiceNoteUrl||null,voiceNoteTranscript:e.voiceNoteTranscript||null,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg},s=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(!s.ok)throw new Error("Failed to create listing in database");const r=await s.json(),a={id:r.id,farmerId:r.farmerId,farmerName:r.farmerName||((c=this.currentUser)==null?void 0:c.name)||"Abebe Bekele",farmerNameAm:r.farmerNameAm||((o=this.currentUser)==null?void 0:o.nameAm)||"አበበ በቀለ",farmerPhone:r.farmerPhone||((l=this.currentUser)==null?void 0:l.phone)||"+251911223344",region:r.region||((d=this.currentUser)==null?void 0:d.region)||"Oromia (Bishoftu)",productName:r.productName,nameAm:r.nameAm,category:r.category,qtyKg:Number(r.qtyKg),pricePerKg:Number(r.pricePerKg),minOrderKg:Number(r.minOrderKg),latitude:r.latitude,longitude:r.longitude,distanceKm:r.distanceKm||45,photos:r.photos&&r.photos.length>0?r.photos:e.photos||["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:r.availableFrom,status:"active",grade:r.grade||e.grade||"Grade 1",ripeness:r.ripeness||e.ripeness||"Ready Today",isOrganic:r.isOrganic??e.isOrganic??!0,isAdvanceHarvest:r.isAdvanceHarvest??e.isAdvanceHarvest??!1,expectedHarvestDate:r.expectedHarvestDate||e.expectedHarvestDate,voiceNoteUrl:r.voiceNoteUrl||e.voiceNoteUrl,voiceNoteTranscript:r.voiceNoteTranscript||e.voiceNoteTranscript,marketBenchmarkPrice:r.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:r.createdAt};return this.listings.unshift(a),this.notify(),a}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(s=>({id:s.id,listingId:s.listingId,productName:s.productName,productNameAm:s.productNameAm,category:s.category,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,farmerRegion:s.farmerRegion,buyerId:s.buyerId,buyerName:s.buyerName,buyerPhone:s.buyerPhone,driverId:s.driverId,driverName:s.driverName,driverPhone:s.driverPhone,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),totalEtb:Number(s.totalEtb),farmerCut:Number(s.farmerCut),driverCut:Number(s.driverCut),platformCut:Number(s.platformCut),driverSubsidyEtb:Number(s.driverSubsidyEtb||150),status:(s.status||"Pending").toLowerCase(),escrowHeld:s.escrowHeld,paymentRef:s.paymentRef,pickupPhoto:s.pickupPhoto,deliveryPhoto:s.deliveryPhoto,deliveryGpsLat:s.deliveryGpsLat,deliveryGpsLng:s.deliveryGpsLng,deliveredAt:s.deliveredAt,deliveryAddress:s.deliveryAddress,deliveryNotes:s.deliveryNotes,disputeReason:s.disputeReason,disputePhoto:s.disputePhoto,requestedRefundPercent:s.requestedRefundPercent||100,disputeStatus:s.disputeStatus||"None",disputeResolutionNotes:s.disputeResolutionNotes,isRecurring:s.isRecurring||!1,recurringFrequency:s.recurringFrequency,confirmedAt:s.confirmedAt,createdAt:s.createdAt})),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(s=>s.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(s=>s.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(s=>s.driverId===this.currentUser.id||s.status==="confirmed"&&!s.driverId):this.orders}async placeOrder(e,t,s,r=!1,a="Weekly"){var l;if(!this.listings.find(d=>d.id===e))throw new Error("Listing not found");if(!(await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:s||((l=this.currentUser)==null?void 0:l.region)||"Addis Ababa (Bole)",isRecurring:r,recurringFrequency:r?a:null})})).ok)throw new Error("Failed to place order in database");return await this.fetchOrders(),await this.fetchListings(),this.orders[0]||this.orders.find(d=>d.listingId===e)}async confirmOrderByFarmer(e){await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders()}async pickupOrderByDriver(e,t){if(this.isOfflineMode){this.offlineQueue.push({id:"off-"+Date.now(),type:"pickup",orderId:e,timestamp:new Date().toISOString(),data:{photo:t},synced:!1}),this.saveOfflineQueue();const s=this.orders.find(r=>r.id===e);s&&(s.status="picked_up",s.pickupPhoto=t),this.notify();return}await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"})}),await this.fetchOrders()}async confirmDeliveryByBuyer(e,t,s,r){await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({deliveryPhoto:t||"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",deliveryGpsLat:s||9.03,deliveryGpsLng:r||38.74})}),await this.fetchOrders()}async disputeOrder(e,t,s,r=50){await fetch(`/api/orders/${e}/dispute`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,disputePhoto:s||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",requestedRefundPercent:r})}),await this.fetchOrders()}async resolveDispute(e,t,s=50,r=50){await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:`Arbitrated via Admin Console (${t})`,farmerSharePercent:s,buyerRefundPercent:r})}),await this.fetchOrders()}getPriceBenchmarks(){return this.priceBenchmarks}getStandingOrders(){return this.standingOrders}addStandingOrder(e,t,s){const r=this.listings.find(c=>c.id===e),a={id:"so-"+Date.now(),listingId:e,productName:(r==null?void 0:r.productName)||"Fresh Produce",productNameAm:r==null?void 0:r.nameAm,farmerName:(r==null?void 0:r.farmerName)||"Abebe Bekele",qtyKg:t,pricePerKg:(r==null?void 0:r.pricePerKg)||45,frequency:s,nextDeliveryDate:s==="Weekly"?"Next Monday, 8:00 AM":"Every 2nd Thursday",active:!0,createdAt:new Date().toISOString()};return this.standingOrders.unshift(a),this.notify(),a}toggleStandingOrder(e){const t=this.standingOrders.find(s=>s.id===e);t&&(t.active=!t.active,this.notify())}getKycQueue(){return this.kycQueue}async verifyKyc(e,t){const s=this.kycQueue.find(r=>r.userId===e);if(s){s.status=t?"Verified":"Rejected";try{await fetch(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${s.status}`,{method:"PUT",headers:this.getAuthHeaders()})}catch(r){console.warn("KYC update remote failed, updating local state",r)}this.notify()}}getAnomalyAlerts(){return this.anomalyAlerts}getRegionalAnalytics(){return this.regionalAnalytics}getOptimizedRoute(){return{id:"route-oromia-addis-01",title:"Consolidated East Shewa Multi-Farm Route",totalDistanceKm:68.4,estimatedHours:2.5,totalWeightKg:2800,driverCommissionEtb:1450,ruralSubsidyEtb:350,stops:[{stopNumber:1,type:"pickup",locationName:"Bishoftu Green Farms (Abebe Bekele)",contactName:"Abebe Bekele",phone:"+251 911 223 344",cargoDetails:"Fresh Sholla Red Tomatoes",weightKg:1200,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Valley Farm (Almaz Hailu)",contactName:"Almaz Hailu",phone:"+251 922 334 455",cargoDetails:"Awash Valley Red Onions",weightKg:1600,completed:!1},{stopNumber:3,type:"dropoff",locationName:"FreshMart Central Wholesale Hub (Bole, Addis Ababa)",contactName:"Bethlehem Tilahun",phone:"+251 955 667 788",cargoDetails:"Consolidated Wholesale Dropoff (2,800 kg total)",weightKg:2800,completed:!1}]}}updateDriverVehicle(e,t,s){this.currentUser&&this.currentUser.role==="driver"&&(this.currentUser.vehicleType=e,this.currentUser.refrigerationType=t,this.currentUser.vehicleCapacityKg=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify())}toggleOfflineMode(){return this.isOfflineMode=!this.isOfflineMode,this.notify(),this.isOfflineMode}getIsOfflineMode(){return this.isOfflineMode}getOfflineQueue(){return this.offlineQueue}async syncOfflineQueue(){var s;const e=this.offlineQueue.filter(r=>!r.synced);for(const r of e)r.type==="pickup"&&await this.pickupOrderByDriver(r.orderId,(s=r.data)==null?void 0:s.photo),r.synced=!0;const t=e.length;return this.offlineQueue=[],this.saveOfflineQueue(),this.notify(),t}async sendInboundSms(e,t){try{const s=await fetch("/api/sms/inbound",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:e,body:t})});if(s.ok){const r=await s.json();return await this.refreshAllData(),r.response}}catch(s){console.warn("SMS Webhook call failed, simulating response",s)}return`[SIMULATED SMS ACK] Received: "${t}". Processed successfully in offline cache.`}simulateVoiceTranscription(e,t){return t==="am"?{productName:"Fresh Sholla Red Tomatoes",nameAm:"የሾላ ቀይ ቲማቲም",category:"Vegetables",qtyKg:1500,pricePerKg:45,region:"Oromia (Bishoftu)",transcript:"1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"}:t==="om"?{productName:"Awash Red Onions",nameAm:"የአዋሽ ቀይ ሽንኩርት",category:"Vegetables",qtyKg:2e3,pricePerKg:55,region:"Oromia (Adama)",transcript:"Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."}:{productName:"Grade 1 Specialty Green Coffee",nameAm:"የይርጋጨፌ ስፔሻሊቲ ቡና",category:"Coffee",qtyKg:800,pricePerKg:380,region:"SNNPR (Yirgacheffe)",transcript:"We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."}}requestWalletWithdrawal(e,t){return this.currentUser?(this.currentUser.walletBalanceEtb=Math.max(0,(this.currentUser.walletBalanceEtb||48200)-e),this.farmerSummary.releasedEtb+=e,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify(),!0):!1}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount,ruralBonusEtb:1250}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount,totalMetricTonsMoved:Number(t.totalMetricTonsMoved||145.8),middlemanMarginSavedEtb:Number(t.middlemanMarginSavedEtb||48e4)}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(r=>{var a;return r.farmerId===((a=this.currentUser)==null?void 0:a.id)}),t=e.filter(r=>r.status==="delivered").reduce((r,a)=>r+a.farmerCut,0),s=e.filter(r=>r.status!=="delivered"&&r.status!=="cancelled").reduce((r,a)=>r+a.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:s||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(r=>r.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(r=>r.status!=="delivered"&&r.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount}}getDriverSummary(){const e=this.orders.filter(r=>{var a;return r.driverId===((a=this.currentUser)==null?void 0:a.id)}),t=e.filter(r=>r.status==="delivered").reduce((r,a)=>r+a.driverCut,0),s=e.filter(r=>r.status!=="delivered"&&r.status!=="cancelled").reduce((r,a)=>r+a.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:s||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(r=>r.status==="delivered").length||this.driverSummary.deliveredTripsCount,ruralBonusEtb:1250}}getPlatformStats(){const e=this.orders.reduce((a,c)=>a+c.totalEtb,0),t=this.orders.filter(a=>a.status==="delivered").reduce((a,c)=>a+c.platformCut,0),s=this.orders.filter(a=>a.escrowHeld).reduce((a,c)=>a+c.totalEtb,0),r=this.orders.filter(a=>a.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:s||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:r||this.platformStats.disputedOrdersCount,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4}}getNotifications(){return!this.isUserLoggedIn||!this.currentUser?[]:this.notifications.filter(e=>e.userId===this.currentUser.id||this.currentUser.role==="admin")}async broadcastSms(e,t,s){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:s})})}catch(r){console.warn("Broadcast SMS API call error",r)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${s.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${s}] ${t}`,read:!1,sentAt:new Date().toISOString()}),this.notify())}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchSummaries()]),this.notify()}}const f=new Nt,Y={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Farm Details",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Payout Log (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release History",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Route Optimizer",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Management & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",resolveDisputeTitle:"Escrow Dispute Arbitration Console",disputeEvidence:"Evidence & Buyer Claim",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Manual KYC & Vehicle Verification Queue",approveKycBtn:"Approve Identity",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"የእርሻ ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የክፍያ ታሪክ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",resolveDisputeTitle:"የቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና ፎቶ",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የአርሶ አደሮች እና ሹፌሮች መታወቂያ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function Lt(i,e,t,s,r,a,c=""){const o=Y[i],l=r.reduce((E,H)=>E+H.qtyKg,0),d={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"}},m=e?d[e.role]||d.buyer:null;return`
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
                value="${c}" 
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
                ${l>0?`${l} kg`:"0"}
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
                <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Wholesale Bulk Cart (${l} kg)
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
  `}function Ft(i,e,t,s,r,a,c,o,l,d=null,m=0,E="All",H="All",Z=!1,oe=!1,ee="marketplace",P=f.getStandingOrders()){const S=Y[i],he=[{key:"All",label:S.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:S.catVegetables,icon:"fa-carrot"},{key:"Grains",label:S.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:S.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:S.catCoffee,icon:"fa-mug-hot"}],X=a.reduce((b,W)=>b+W.qtyKg*W.listing.pricePerKg,0),de=Math.round(X*.9),ue=Math.round(X*.05),ge=X-de-ue,be=a.reduce((b,W)=>{const L=W.listing.farmerId;return b[L]||(b[L]={farmerName:W.listing.farmerName,farmerRegion:W.listing.region,items:[]}),b[L].items.push(W),b},{});return`
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
              ${S.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${i==="am"?"lang-am":""}">
              ${S.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> Browse Farm Deals
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${S.standingOrdersTitle}
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
                Source directly from farms within 10-100 km. Consolidate orders from multiple farmers in one delivery run.
              </p>
              <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                <span>Avg Delivery: <strong class="text-white">Same Day</strong></span>
                <span>Multi-Farmer: <strong class="text-white">Supported</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Sub-Tab Switcher: Marketplace vs Standing Orders -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center gap-2">
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${ee==="marketplace"?"active":""}">
            <i class="fa-solid fa-store"></i>
            <span>${i==="am"?"የጅምላ ገበያ":"Wholesale Marketplace"}</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${ee==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${S.standingOrdersTitle} (${P.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Depot Sourcing
        </div>
      </div>

      ${ee==="standing_orders"?jt(i,P):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${he.map(b=>`
            <button onclick="window.setCategory('${b.key}')" 
              class="cat-pill ${t===b.key?"active":""} ${i==="am"?"lang-am":""}">
              <i class="fa-solid ${b.icon}"></i>
              <span>${b.label}</span>
            </button>
          `).join("")}
        </div>

        <!-- Filter Controls Bar -->
        <div class="glass-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <!-- PostGIS Geo-Proximity Radius Slider -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${S.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0,25,50,100].map(b=>`
                <button onclick="window.setMaxDistanceKm(${b})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${m===b?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${b===0?"All Ethiopia":`${b} km`}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${S.filterGrade}:</span>
            <select onchange="window.setGradeFilter(this.value)" class="bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg font-bold text-slate-800 cursor-pointer">
              <option value="All" ${E==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${E==="Grade 1"?"selected":""}>Grade 1 (Premium)</option>
              <option value="Export Grade" ${E==="Export Grade"?"selected":""}>Export Grade</option>
              <option value="Grade 2" ${E==="Grade 2"?"selected":""}>Grade 2</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${S.filterRipeness}:</span>
            <select onchange="window.setRipenessFilter(this.value)" class="bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg font-bold text-slate-800 cursor-pointer">
              <option value="All" ${H==="All"?"selected":""}>All Stages</option>
              <option value="Ready Today" ${H==="Ready Today"?"selected":""}>Ready Today</option>
              <option value="Semi-Ripe" ${H==="Semi-Ripe"?"selected":""}>Semi-Ripe</option>
              <option value="Green / Storable" ${H==="Green / Storable"?"selected":""}>Green / Storable</option>
            </select>
          </div>

          <!-- Organic & Advance Harvest Toggles -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${Z?"checked":""} class="rounded text-emerald-600" />
              <span>Organic Only</span>
            </label>
            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${oe?"checked":""} class="rounded text-emerald-600" />
              <span>Advance Harvests</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Main Produce Grid -->
      <section>
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">
            ${i==="am"?"የቀጥታ የጅምላ ምርቶች ዝርዝር":"Verified Farm Produce Catalog"}
          </h2>
          <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Showing ${e.length} wholesale listings
          </span>
        </div>

        ${e.length===0?`
          <div class="glass-card p-12 text-center space-y-3">
            <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              <i class="fa-solid fa-leaf"></i>
            </div>
            <h3 class="text-base font-bold text-slate-800">No Produce Found Matching Filters</h3>
            <p class="text-xs text-slate-500">Try adjusting your proximity radius, quality grade, or category.</p>
          </div>
        `:`
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${e.map(b=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between group">
                
                <div>
                  <!-- Product Image with Badges -->
                  <div class="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img src="${b.photos[0]}" alt="${b.productName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    <div class="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span class="escrow-pill shadow-xs">
                        <i class="fa-solid fa-shield-halved text-amber-600"></i> Telebirr Escrow
                      </span>
                      ${b.isAdvanceHarvest?`
                        <span class="advance-pill shadow-xs">
                          <i class="fa-solid fa-calendar-days text-emerald-700"></i> Harvest in ${b.availableFrom}
                        </span>
                      `:""}
                    </div>

                    <div class="absolute top-3 right-3 flex flex-col items-end gap-1">
                      <span class="bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs border border-emerald-200">
                        ${b.category}
                      </span>
                      <span class="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        ${b.grade||"Grade 1"}
                      </span>
                    </div>

                    <!-- Region & Distance Overlay (PostGIS) -->
                    <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <span><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> ${b.region}</span>
                      <span class="text-emerald-300">${b.distanceKm?`~${b.distanceKm} km (Est. ${(b.distanceKm*.4).toFixed(0)} min)`:"Direct Farm"}</span>
                    </div>
                  </div>

                  <!-- Product Info -->
                  <div class="p-5 space-y-3">
                    
                    <div>
                      <div class="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                        <span class="text-amber-500 flex items-center gap-1 font-bold">
                          <i class="fa-solid fa-star"></i> ${b.farmerRating} <span class="text-slate-400 font-medium">(${b.reviewCount} reviews)</span>
                        </span>
                        <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          ${b.ripeness||"Ready Today"}
                        </span>
                      </div>

                      <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors ${i==="am"?"lang-am":""}">
                        ${i==="am"&&b.nameAm?b.nameAm:b.productName}
                      </h3>
                      ${i==="en"&&b.nameAm?`<p class="text-xs text-slate-400 font-medium lang-am">${b.nameAm}</p>`:""}
                    </div>

                    <!-- Farmer Credibility & Trust Badge -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs text-slate-600">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 truncate">
                          <div class="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[9px] shrink-0">
                            <i class="fa-solid fa-user"></i>
                          </div>
                          <span class="font-bold text-slate-800 truncate">${i==="am"&&b.farmerNameAm?b.farmerNameAm:b.farmerName}</span>
                        </div>
                        <span class="text-[10px] font-bold text-emerald-700"><i class="fa-solid fa-certificate text-emerald-600 mr-1"></i>Fayda ID</span>
                      </div>

                      <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span><i class="fa-solid fa-repeat text-blue-600 mr-1"></i> ${b.repeatBuyerCount||14} Repeat Buyers</span>
                        <span><i class="fa-solid fa-bolt text-amber-500 mr-1"></i> ${b.onTimeDeliveryRate||99}% On-Time</span>
                      </div>
                    </div>

                    <!-- Stock Progress Indicator -->
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between font-semibold text-slate-600">
                        <span>Stock Available: <strong class="text-slate-900 font-black">${b.qtyKg.toLocaleString()} kg</strong></span>
                        <span class="text-slate-400 font-medium">Min: ${b.minOrderKg} kg</span>
                      </div>
                      <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-600 rounded-full" style="width: 80%;"></div>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Price & Add To Cart / Standing Order Action -->
                <div class="p-5 pt-0">
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span class="text-xs font-bold text-slate-400 uppercase block leading-none">Unit Price</span>
                      <div class="flex items-baseline gap-1 mt-0.5">
                        <span class="text-2xl font-black text-emerald-800 leading-none">${b.pricePerKg}</span>
                        <span class="text-xs font-extrabold text-slate-600">ETB / kg</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <button onclick="window.quickBuy('${b.id}')" 
                        class="btn-primary text-xs py-2.5 px-3.5 shadow-sm hover:shadow-md cursor-pointer">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span class="${i==="am"?"lang-am":""}">${S.addToCart}</span>
                      </button>
                      <button onclick="window.handleCreateStandingOrderModal('${b.id}')" title="Set Weekly Standing Order"
                        class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer">
                        <i class="fa-solid fa-repeat"></i>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            `).join("")}
          </div>
        `}
      </section>
      `}

      <!-- Multi-Farmer Bulk Cart Slide-over Drawer -->
      ${c?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCart()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${S.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer order with single driver dispatch</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${a.length===0?`
              <div class="py-12 text-center space-y-3">
                <i class="fa-solid fa-basket-shopping text-4xl text-slate-300"></i>
                <p class="text-sm font-semibold text-slate-500 ${i==="am"?"lang-am":""}">${S.cartEmpty}</p>
              </div>
            `:`
              <!-- Grouped by Farm Source Section -->
              <div class="space-y-4 max-h-72 overflow-y-auto pr-1">
                ${Object.entries(be).map(([b,W])=>`
                  <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
                      <span class="flex items-center gap-1.5 text-emerald-800">
                        <i class="fa-solid fa-tractor text-emerald-600"></i> Farm: ${W.farmerName} (${W.farmerRegion})
                      </span>
                      <span class="text-[10px] text-slate-500">${W.items.length} item(s)</span>
                    </div>

                    ${W.items.map(L=>`
                      <div class="flex items-center justify-between gap-3 text-xs">
                        <img src="${L.listing.photos[0]}" class="w-12 h-12 rounded-xl object-cover shrink-0" />
                        
                        <div class="flex-1 min-w-0">
                          <h4 class="font-bold text-slate-900 truncate">${i==="am"&&L.listing.nameAm?L.listing.nameAm:L.listing.productName}</h4>
                          <p class="text-emerald-800 font-extrabold">${L.listing.pricePerKg} ETB/kg · <span class="text-slate-500 font-normal">${L.listing.grade||"Grade 1"}</span></p>
                          
                          <div class="flex items-center gap-1.5 mt-1">
                            <button onclick="window.updateCartQty('${L.listing.id}', -25)" class="w-5 h-5 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">-</button>
                            <span class="font-black text-slate-900 px-1">${L.qtyKg} kg</span>
                            <button onclick="window.updateCartQty('${L.listing.id}', 25)" class="w-5 h-5 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">+</button>
                          </div>
                        </div>

                        <div class="text-right shrink-0">
                          <span class="font-black text-slate-900 block">${(L.qtyKg*L.listing.pricePerKg).toLocaleString()} ETB</span>
                          <button onclick="window.removeFromCart('${L.listing.id}')" class="text-[11px] text-red-600 hover:text-red-700 font-semibold cursor-pointer">Remove</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `).join("")}
              </div>

              <!-- 90/5/5 Escrow Transparent Breakdown Card -->
              <div class="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2 text-xs">
                <div class="flex items-center justify-between text-slate-600">
                  <span>${S.farmerShare}</span>
                  <span class="font-black text-emerald-900">${de.toLocaleString()} ETB</span>
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span>${S.deliveryEstimate}</span>
                  <span class="font-bold text-slate-800">${ue.toLocaleString()} ETB</span>
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span>${S.platformFee}</span>
                  <span class="font-bold text-slate-800">${ge.toLocaleString()} ETB</span>
                </div>
                <div class="pt-2 border-t border-emerald-300/60 flex items-center justify-between text-sm font-black text-slate-900">
                  <span>${S.totalAmount}</span>
                  <span class="text-emerald-900 text-base font-black">${X.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal()" 
                class="btn-telebirr w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer">
                <i class="fa-solid fa-lock"></i>
                <span class="${i==="am"?"lang-am":""}">${S.checkoutTelebirr}</span>
              </button>
            `}

          </div>
        </div>
      `:""}

      <!-- Telebirr Escrow Interactive Checkout Modal -->
      ${l&&l.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeTelebirrModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-400 text-white flex items-center justify-center mx-auto text-3xl font-black shadow-lg shadow-blue-900/20">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">${S.telebirrTitle}</h3>
              <p class="text-xs text-slate-500 ${i==="am"?"lang-am":""}">${S.telebirrDesc}</p>
            </div>

            <!-- Amount Card -->
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <span class="text-xs font-bold text-blue-700 uppercase tracking-wider">Escrow Lock Amount</span>
              <div class="text-3xl font-black text-blue-950">${l.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <p class="text-[11px] text-blue-600 font-semibold">90% Farmer / 5% Driver / 5% Platform locked in vault</p>
            </div>

            <form onsubmit="window.processTelebirrPayment(event)" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1">${S.enterPhone}</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">+251</span>
                  <input type="text" value="955667788" required class="w-full pl-14 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block mb-1">${S.enterPin}</label>
                <input type="password" maxlength="4" value="1234" required class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-center text-xl tracking-widest font-black focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium flex items-start gap-2">
                <i class="fa-solid fa-shield-check text-amber-700 text-sm mt-0.5"></i>
                <span class="${i==="am"?"lang-am":""}">${S.escrowGuarantee}</span>
              </div>

              <button type="submit" id="telebirrSubmitBtn" class="btn-telebirr w-full py-3.5 text-sm cursor-pointer">
                <i class="fa-solid fa-check-double"></i> ${S.payNow} (${l.totalEtb.toLocaleString()} ETB)
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Dispute / Partial Refund Submission Modal -->
      ${d&&d.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${S.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${d.order.id.slice(0,8).toUpperCase()} · ${d.order.productName}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${d.order.id}')" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1">${S.disputeReasonLabel}</label>
                <textarea id="disputeReasonText" required rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="e.g. Delivered produce is 20% bruised and size is smaller than Grade 1 listing specification..."></textarea>
              </div>

              <div>
                <label class="block mb-1">${S.disputePhotoLabel}</label>
                <input type="text" id="disputePhotoUrl" value="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label>${S.refundPercentLabel}</label>
                  <span id="refundPercentVal" class="font-bold text-red-700">50% Partial Refund</span>
                </div>
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${d.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
                <i class="fa-solid fa-lock text-red-700 mr-1"></i>
                Submitting this dispute immediately locks the Telebirr Escrow and assigns case to Marketplace Admin for arbitration.
              </div>

              <button type="submit" class="btn-secondary w-full py-3 text-xs text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                <i class="fa-solid fa-gavel"></i> ${S.submitDisputeBtn}
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Live Order SignalR Tracking Modal -->
      ${o?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">${S.orderTracking}</h3>
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
                  <i class="fa-solid fa-circle-check"></i> ${S.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${o.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${S.disputeBtn}
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
  `}function jt(i,e){const t=Y[i];return`
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
  `}function Ht(i,e,t,s,r,a="listings",c=f.getPriceBenchmarks(),o=f.getCurrentUser()){const l=Y[i];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(o==null?void 0:o.region)||"Oromia (Bishoftu)"}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-id-card"></i> ${l.verifiedFayda} (${(o==null?void 0:o.kycDocumentNumber)||"FAYDA-8829104"})
            </span>
            <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
              <i class="fa-solid fa-users"></i> ${(o==null?void 0:o.repeatBuyerCount)||18} ${l.repeatBuyers}
            </span>
            <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
              <i class="fa-solid fa-clock-rotate-left"></i> ${(o==null?void 0:o.onTimeDeliveryRate)||99}% ${l.onTimeRate}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">
            ${l.farmerPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.toggleFarmerTab('sms')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-comment-sms text-emerald-600"></i>
            <span class="${i==="am"?"lang-am":""}">${l.navSmsConsole}</span>
          </button>

          <button onclick="window.toggleFarmerTab('wallet')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-wallet text-amber-600"></i>
            <span class="${i==="am"?"lang-am":""}">${l.navWallet}</span>
          </button>

          <button onclick="window.toggleCreateListingModal()" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer">
            <i class="fa-solid fa-plus-circle"></i>
            <span class="${i==="am"?"lang-am":""}">${l.postNewListing}</span>
          </button>
        </div>
      </div>

      <!-- Farmer Portal Navigation Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onclick="window.toggleFarmerTab('listings')" class="cat-pill ${a==="listings"?"active":""}">
          <i class="fa-solid fa-box-open"></i>
          <span>${i==="am"?"ምርቶች እና ትዕዛዞች":"Produce & Orders"}</span>
        </button>
        <button onclick="window.toggleFarmerTab('wallet')" class="cat-pill ${a==="wallet"?"active":""}">
          <i class="fa-solid fa-wallet"></i>
          <span>${l.walletTitle}</span>
        </button>
        <button onclick="window.toggleFarmerTab('sms')" class="cat-pill ${a==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${l.smsConsoleTitle}</span>
        </button>
      </div>

      ${a==="wallet"?Wt(i,s,t,o):a==="sms"?Kt(i):`

      <!-- Price Benchmark Advisory Banner -->
      <section class="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-lg space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-sm text-white ${i==="am"?"lang-am":""}">${l.priceBenchmarkTitle}</h3>
              <p class="text-[11px] text-emerald-200 font-medium">${l.benchmarkDesc}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-white/10 text-emerald-300 px-2.5 py-1 rounded-full border border-white/10">
            <i class="fa-solid fa-clock mr-1"></i> Live Merkato & Sholla Feeds
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          ${c.map(d=>`
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
            <span>${l.walletBalance}</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr Payout</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${((o==null?void 0:o.walletBalanceEtb)||48200).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> 90% direct deposit upon delivery
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${l.pendingEscrow}</span>
            <span class="escrow-badge text-[10px]">Held in Escrow</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${s.pendingEscrowEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-hourglass-half"></i> Releases upon buyer delivery confirmation
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Total Orders Fulfilled</span>
            <span class="text-xs text-blue-600 font-bold">100% Guaranteed</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${s.completedOrdersCount+s.pendingOrdersCount} <span class="text-sm font-bold text-slate-500">Orders</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">
            <i class="fa-solid fa-bolt"></i> Zero broker middleman take
          </p>
        </div>

      </section>

      <!-- Incoming Orders Management -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
            <i class="fa-solid fa-bell text-amber-500 mr-2"></i> ${l.incomingOrders}
          </h2>
          <span class="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
            ${t.filter(d=>d.status==="pending").length} Action Required
          </span>
        </div>

        ${t.length===0?`
          <div class="glass-card p-8 text-center text-slate-500 text-sm">
            No incoming orders yet. Post new produce listings to receive bulk orders.
          </div>
        `:`
          <div class="space-y-3">
            ${t.map(d=>`
              <div class="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">
                      ${d.productName}
                    </span>
                    <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      ${d.qtyKg} kg
                    </span>
                    <span class="escrow-badge text-[10px]">
                      <i class="fa-solid fa-shield-check text-amber-600"></i> ${d.farmerCut.toLocaleString()} ETB (90% Payout)
                    </span>
                    ${d.isRecurring?`
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        <i class="fa-solid fa-repeat mr-1"></i> Standing Order (${d.recurringFrequency||"Weekly"})
                      </span>
                    `:""}
                  </div>

                  <p class="text-xs text-slate-600">
                    <i class="fa-solid fa-user text-slate-400 mr-1"></i> Buyer: <span class="font-semibold text-slate-800">${d.buyerName}</span> (${d.buyerPhone})
                  </p>
                  <p class="text-xs text-slate-500">
                    <i class="fa-solid fa-location-dot text-slate-400 mr-1"></i> Delivery to: ${d.deliveryAddress||"Addis Ababa"}
                  </p>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  ${d.status==="pending"?`
                    <button onclick="window.confirmFarmerOrder('${d.id}')" 
                      class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                      <i class="fa-solid fa-check"></i>
                      <span class="${i==="am"?"lang-am":""}">${l.confirmOrderAction}</span>
                    </button>
                  `:`
                    <div class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-check text-emerald-600"></i>
                      <span>Status: ${d.status.toUpperCase()}</span>
                    </div>
                  `}
                  
                  <button onclick="window.viewOrder('${d.id}')" class="btn-secondary text-xs py-2 px-3 cursor-pointer">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>

              </div>
            `).join("")}
          </div>
        `}
      </section>

      <!-- My Active Produce Listings & Advance Harvests -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900 ${i==="am"?"lang-am":""}">
          <i class="fa-solid fa-box-open text-emerald-600 mr-2"></i> ${l.myActiveListings}
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
      ${r?qt(i):""}

    </div>
  `}function Wt(i,e,t,s){const r=Y[i];return`
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
            <i class="fa-solid fa-money-bill-transfer mr-1 text-slate-950"></i> ${r.requestWithdrawal}
          </button>
        </div>
      </div>

      <!-- Payout Log History -->
      <div class="glass-card p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-slate-900 ${i==="am"?"lang-am":""}">
            <i class="fa-solid fa-receipt text-emerald-600 mr-1.5"></i> ${r.payoutHistory}
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
  `}function Kt(i){const e=Y[i];return`
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
  `}function qt(i,e){const t=Y[i];return`
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

        <!-- Voice-Note Quick Form Filler Module -->
        <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                <i class="fa-solid fa-microphone"></i>
              </div>
              <span class="text-xs font-black text-emerald-950 ${i==="am"?"lang-am":""}">${t.voiceNoteTitle}</span>
            </div>
            <select id="voiceLangSelect" class="bg-white border border-emerald-300 text-emerald-900 text-[11px] font-bold py-1 px-2.5 rounded-lg">
              <option value="am">አማርኛ (Amharic)</option>
              <option value="om">Afaan Oromoo</option>
              <option value="en">English</option>
            </select>
          </div>

          <p class="text-[11px] text-emerald-800 leading-relaxed">${t.voiceNoteDesc}</p>

          <div class="flex items-center gap-3 pt-1">
            <button type="button" id="voiceRecordBtn" onclick="window.handleVoiceRecordToggle()" class="btn-primary text-xs py-2 px-4 shadow-sm cursor-pointer">
              <i class="fa-solid fa-microphone mr-1 text-red-300"></i> <span id="voiceBtnText">${t.recordVoiceBtn}</span>
            </button>
            <div id="voiceWaveIndicator" class="hidden flex items-center gap-1">
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <span class="text-[11px] font-bold text-emerald-700 ml-1">Recording (00:04)...</span>
            </div>
          </div>
        </div>

        <form onsubmit="window.handleCreateListing(event)" class="space-y-4 text-xs font-semibold text-slate-700">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1">${t.productNameEn}</label>
              <input type="text" id="newProdName" required placeholder="e.g. Fresh Sholla Red Tomatoes" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block mb-1">${t.productNameAm}</label>
              <input type="text" id="newProdNameAm" placeholder="ለምሳሌ: የሾላ ቀይ ቲማቲም" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none lang-am" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block mb-1">${t.categoryLabel}</label>
              <select id="newProdCategory" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                <option value="Vegetables">Vegetables / አትክልት</option>
                <option value="Grains">Grains / እህል</option>
                <option value="Fruits">Fruits / ፍራፍሬ</option>
                <option value="Coffee">Coffee / ቡና</option>
                <option value="Spices">Spices / ቅመማ ቅመም</option>
              </select>
            </div>
            <div>
              <label class="block mb-1">${t.qtyKgLabel}</label>
              <input type="number" id="newProdQty" required min="10" value="1000" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block mb-1">${t.priceKgLabel}</label>
              <input type="number" id="newProdPrice" required min="1" value="45" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <!-- Quality, Grade & Ripeness -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block mb-1">${t.gradeLabel}</label>
              <select id="newProdGrade" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                <option value="Grade 1">Grade 1 (Premium Farm)</option>
                <option value="Export Grade">Export Grade (ECX/Verified)</option>
                <option value="Grade 2">Grade 2 (Commercial Standard)</option>
              </select>
            </div>
            <div>
              <label class="block mb-1">${t.ripenessLabel}</label>
              <select id="newProdRipeness" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                <option value="Ready Today">Ready Today (Fresh Harvest)</option>
                <option value="Semi-Ripe">Semi-Ripe (Storable 5-7 days)</option>
                <option value="Green / Storable">Green / Storable (Long Transit)</option>
              </select>
            </div>
            <div class="flex items-center gap-2 pt-6">
              <input type="checkbox" id="newProdOrganic" checked class="w-4 h-4 text-emerald-600 rounded" />
              <label for="newProdOrganic" class="text-xs font-bold text-slate-800">Certified Organic Claim</label>
            </div>
          </div>

          <!-- Harvest Calendar & Advance Listing -->
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="newProdAdvanceToggle" onchange="window.toggleAdvanceHarvestFields(this.checked)" class="w-4 h-4 text-emerald-600 rounded" />
                <label for="newProdAdvanceToggle" class="text-xs font-black text-slate-900">${t.advanceHarvestToggle}</label>
              </div>
              <span class="text-[11px] font-bold text-emerald-700">Pre-commit buyer orders</span>
            </div>

            <div id="advanceHarvestDateRow" class="hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1">${t.expectedHarvestLabel}</label>
                <input type="date" id="newProdHarvestDate" value="${new Date(Date.now()+18*864e5).toISOString().split("T")[0]}" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div class="text-[11px] text-slate-500 flex items-center">
                Buyers can reserve stock in advance, eliminating harvest spoilage risk.
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1">${t.minOrderLabel}</label>
              <input type="number" id="newProdMinOrder" required min="1" value="50" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block mb-1">${t.farmLocationLabel}</label>
              <input type="text" id="newProdRegion" value="Oromia (Bishoftu)" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label class="block mb-1">Produce Photo URL</label>
            <input type="text" id="newProdPhoto" value="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <button type="submit" class="btn-primary w-full py-3.5 text-sm mt-4 cursor-pointer">
            <i class="fa-solid fa-cloud-arrow-up"></i> ${t.publishListingBtn}
          </button>
        </form>

      </div>
    </div>
  `}function Vt(i,e,t,s=f.getOptimizedRoute(),r=f.getCurrentUser(),a=f.getIsOfflineMode(),c=f.getOfflineQueue().length){const o=Y[i],l=(r==null?void 0:r.vehicleCapacityKg)||5e3,d=Math.min(100,Math.round(s.totalWeightKg/l*100));return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner with Vehicle & Offline Mode Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <i class="fa-solid fa-truck text-amber-700"></i> ${(r==null?void 0:r.vehicleType)||"Isuzu 5-Ton"} · ${(r==null?void 0:r.refrigerationType)||"Ventilated"}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-certificate"></i> Logbook Verified (${(r==null?void 0:r.kycDocumentNumber)||"ET-LOG-5T-98214"})
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

          ${c>0?`
            <button onclick="window.syncDriverOfflineQueue()" class="btn-primary text-xs py-2 px-3.5 shadow-sm cursor-pointer animate-bounce">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${o.offlineSyncBtn} (${c})
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
              <p class="text-[11px] text-slate-500 font-medium">${(r==null?void 0:r.vehicleType)||"Isuzu 5-Ton"} · ${(r==null?void 0:r.refrigerationType)||"Ventilated Cargo"}</p>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-700">
            <span>Payload: <strong class="text-amber-800">${s.totalWeightKg.toLocaleString()} kg</strong> / ${l.toLocaleString()} kg (${d}%)</span>
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
          ${s.stops.map((m,E)=>`
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
                  <button onclick="window.handleDriverStopAction(${E})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
                    <i class="fa-solid fa-camera mr-1"></i> Verify & Confirm
                  </button>
                `}
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Active / Available Trips Queue -->
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
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Order #${m.id.slice(0,8).toUpperCase()}</span>
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

                <!-- Driver Actions with Photo + GPS verification -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="text-xs font-bold text-slate-500">
                    Status: <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${m.status==="picked_up"?"bg-amber-100 text-amber-800":m.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-800"}">${m.status.toUpperCase()}</span>
                  </div>

                  <div class="flex items-center gap-2 w-full sm:w-auto">
                    ${m.status==="confirmed"?`
                      <button onclick="window.driverPickupWithProof('${m.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-camera"></i> ${o.uploadProof} & Pickup
                      </button>
                    `:m.status==="picked_up"?`
                      <button onclick="window.driverCompleteDeliveryProof('${m.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-location-crosshairs"></i> Complete Dropoff + GPS Proof
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
  `}function Ut(i,e,t,s=f.getAnomalyAlerts(),r=f.getKycQueue(),a=f.getRegionalAnalytics(),c="disputes"){const o=Y[i];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${i==="am"?"lang-am":""}">
            ${o.adminPortalTitle}
          </h1>
        </div>
      </div>

      <!-- Platform Analytics KPI Cards (GMV, Commission, Metric Tons, Middleman Savings) -->
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
          <p class="text-[11px] text-purple-700 font-semibold">5% platform take</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${o.statMetricTons}</span>
          <div class="text-xl sm:text-2xl font-black text-blue-900">
            ${(e.totalMetricTonsMoved||145.8).toLocaleString()} <span class="text-xs font-bold text-blue-700">Tons</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">EABC Impact Verified</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${o.statMiddlemanSavings}</span>
          <div class="text-xl sm:text-2xl font-black text-teal-900">
            ${(e.middlemanMarginSavedEtb||48e4).toLocaleString()} <span class="text-xs font-bold text-teal-700">ETB</span>
          </div>
          <p class="text-[11px] text-teal-700 font-semibold">Saved for smallholders</p>
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
        <button onclick="window.setAdminTab('disputes')" class="cat-pill ${c==="disputes"?"active":""}">
          <i class="fa-solid fa-scale-balanced"></i>
          <span>${o.resolveDisputeTitle} (${t.length})</span>
        </button>
        <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${c==="anomalies"?"active":""}">
          <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
          <span>${o.anomalyScannerTitle} (${s.length})</span>
        </button>
        <button onclick="window.setAdminTab('kyc')" class="cat-pill ${c==="kyc"?"active":""}">
          <i class="fa-solid fa-id-card"></i>
          <span>${o.kycQueueTitle} (${r.filter(l=>l.status==="Pending").length})</span>
        </button>
        <button onclick="window.setAdminTab('analytics')" class="cat-pill ${c==="analytics"?"active":""}">
          <i class="fa-solid fa-chart-pie"></i>
          <span>${o.regionalAnalyticsTitle}</span>
        </button>
        <button onclick="window.setAdminTab('sms')" class="cat-pill ${c==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${o.broadcastSmsTitle}</span>
        </button>
      </div>

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split) -->
      ${c==="disputes"?`
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
              No active escrow disputes. All transactions proceeding normally.
            </div>
          `:`
            <div class="space-y-4">
              ${t.map(l=>`
                <div class="glass-card p-6 border-l-4 border-red-500 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span class="text-xs font-bold text-red-700 uppercase">Case #${l.id.slice(0,8).toUpperCase()}</span>
                      <h3 class="text-base font-extrabold text-slate-900">${l.productName} (${l.qtyKg} kg · ${l.totalEtb.toLocaleString()} ETB)</h3>
                      <p class="text-xs text-slate-500">Buyer: <strong>${l.buyerName}</strong> vs Farmer: <strong>${l.farmerName}</strong></p>
                    </div>
                    <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold self-start sm:self-center">
                      <i class="fa-solid fa-lock mr-1"></i> Escrow Frozen (${l.totalEtb.toLocaleString()} ETB)
                    </span>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${o.disputeEvidence}:</span>
                      <p class="text-slate-800 leading-relaxed font-medium">"${l.disputeReason||"Delivered avocados were overripe and 20% bruised during transit from Hawassa."}"</p>
                      <div class="text-[11px] text-red-700 font-bold">Requested Refund: ${l.requestedRefundPercent||50}% (${Math.round(l.totalEtb*((l.requestedRefundPercent||50)/100)).toLocaleString()} ETB)</div>
                    </div>

                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img src="${l.disputePhoto||l.pickupPhoto||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80"}" class="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs" />
                      <div class="space-y-1 text-slate-600">
                        <span class="font-bold text-slate-800 block">Uploaded Photo Evidence</span>
                        <p class="text-[11px]">GPS Location: Bole Cold Storage Depot</p>
                        <p class="text-[11px]">Timestamp: Yesterday 4:32 PM</p>
                      </div>
                    </div>
                  </div>

                  <!-- 3-Way Manual Arbitration Controls -->
                  <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <button onclick="window.adminResolveDispute('${l.id}', 'ReleaseToFarmer')" class="btn-primary text-xs py-2.5 px-4 cursor-pointer">
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${o.releaseFarmerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${l.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${o.refundBuyerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${l.id}', 'PartialSplit')" class="btn-secondary text-xs py-2.5 px-4 text-purple-700 border-purple-300 hover:bg-purple-50 font-bold cursor-pointer">
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
      ${c==="anomalies"?`
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
            ${s.map(l=>`
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
      `:""}

      <!-- Tab Content 3: Manual KYC Verification Queue -->
      ${c==="kyc"?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${o.kycQueueTitle}
            </h2>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              National ID (Fayda) & Commercial Logbooks
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${r.map(l=>`
              <div class="glass-card p-5 space-y-4">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${l.userRole==="Driver"?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"}">
                      ${l.userRole}
                    </span>
                    <h3 class="text-base font-extrabold text-slate-900 mt-1">${l.userName}</h3>
                    <p class="text-xs text-slate-500">${l.phone} · ${l.region}</p>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${l.status==="Verified"?"bg-emerald-100 text-emerald-800":l.status==="Rejected"?"bg-red-100 text-red-800":"bg-amber-100 text-amber-800"}">
                    ${l.status.toUpperCase()}
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div class="font-bold text-slate-800"><i class="fa-solid fa-file-lines text-emerald-600 mr-1"></i> ${l.documentType}</div>
                  <div class="font-mono text-slate-600">Doc ID: ${l.documentNumber}</div>
                  <div class="text-[10px] text-slate-400">Submitted: ${l.submittedAt}</div>
                </div>

                ${l.status==="Pending"?`
                  <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button onclick="window.adminVerifyKyc('${l.userId}', true)" class="btn-primary flex-1 text-xs py-2 cursor-pointer">
                      <i class="fa-solid fa-check"></i> ${o.approveKycBtn}
                    </button>
                    <button onclick="window.adminVerifyKyc('${l.userId}', false)" class="btn-secondary text-xs py-2 px-4 text-red-700 border-red-300 hover:bg-red-50 cursor-pointer">
                      <i class="fa-solid fa-xmark"></i> ${o.rejectKycBtn}
                    </button>
                  </div>
                `:""}
              </div>
            `).join("")}
          </div>
        </section>
      `:""}

      <!-- Tab Content 4: Regional Analytics Dashboard & EABC Impact -->
      ${c==="analytics"?`
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
                <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i> ${o.regionalAnalyticsTitle}
              </h2>
              <p class="text-xs text-slate-500 font-medium">Volume distribution, smallholder impact, and crop performance metrics for EABC and investors.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${a.map(l=>`
              <div class="glass-card p-5 space-y-3 border-l-4 border-emerald-600">
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-extrabold text-slate-900">${l.region}</h3>
                  <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    ${l.smallholdersCount.toLocaleString()} Farmers
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span class="text-slate-400 font-bold uppercase text-[10px] block">Traded Volume</span>
                    <span class="text-lg font-black text-slate-900">${l.volumeMetricTons}</span> <span class="text-xs font-bold text-slate-600">Tons</span>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span class="text-slate-400 font-bold uppercase text-[10px] block">Regional GMV</span>
                    <span class="text-lg font-black text-emerald-800">${(l.totalGmvEtb/1e6).toFixed(2)}M</span> <span class="text-xs font-bold text-emerald-700">ETB</span>
                  </div>
                </div>

                <div class="text-xs text-slate-600 pt-1">
                  Top Produce: <strong class="text-slate-900 font-bold">${l.topCrop}</strong>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `:""}

      <!-- Tab Content 5: Bilingual SMS Broadcaster Tool -->
      ${c==="sms"?`
        <section class="glass-card p-6 space-y-4 max-w-2xl">
          <div>
            <h2 class="text-lg font-bold text-slate-900 ${i==="am"?"lang-am":""}">
              <i class="fa-solid fa-tower-broadcast text-emerald-600 mr-2"></i> ${o.broadcastSmsTitle}
            </h2>
            <p class="text-xs text-slate-500">Send market price alerts or weather advisories via Twilio SMS directly to offline smallholder mobile phones.</p>
          </div>

          <form onsubmit="window.handleBroadcastSms(event)" class="space-y-3 text-xs font-semibold text-slate-700">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1">Message in English</label>
                <textarea id="broadcastEn" rows="3" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Market advisory: High demand for Red Onions in Addis wholesale depots."></textarea>
              </div>
              <div>
                <label class="block mb-1">መልእክት በአማርኛ (Amharic Message)</label>
                <textarea id="broadcastAm" rows="3" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none lang-am" placeholder="የገበያ መረጃ: በአዲስ አበባ የጅምላ ገበያዎች የቀይ ሽንኩርት ፍላጎት ከፍተኛ ሆኗል።"></textarea>
              </div>
            </div>

            <div class="flex items-center justify-between pt-2">
              <select id="broadcastTarget" class="py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white cursor-pointer">
                <option value="farmer">Target: All Smallholder Farmers</option>
                <option value="buyer">Target: All Wholesale Buyers</option>
                <option value="driver">Target: All Partner Drivers</option>
                <option value="all">Target: All Registered Users</option>
              </select>

              <button type="submit" class="btn-primary text-xs py-2.5 px-5 shadow-sm cursor-pointer">
                <i class="fa-solid fa-paper-plane"></i> ${o.sendSmsBtn}
              </button>
            </div>
          </form>
        </section>
      `:""}

    </div>
  `}function Gt(i,e){return`
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
  `}function Qt(i,e,t,s,r="",a="",c="",o=""){return`
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
                      <span class="block font-bold">${a?`Account: <strong>${a}</strong> (${c})`:"SMS Dispatched via Twilio Gateway"}</span>
                      <span class="text-[11px] text-emerald-700 font-medium">Verified Phone: <strong>+251 ${s}</strong></span>
                      ${r?`
                        <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-white rounded-md border border-emerald-300 text-emerald-900 font-bold text-[10px]">
                          <span>SMS Code:</span> <code class="font-mono text-emerald-800 text-xs font-black">${r}</code>
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
                    value="${r||""}"
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
  `}function w(i,e="fa-circle-check",t="border-emerald-500"){const s=document.getElementById("toast-container");if(!s)return;const r=document.createElement("div");r.className=`toast-msg border-l-4 ${t} shadow-2xl`,r.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${i}</span>
  `,s.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateX(100%)",r.style.transition="all 0.3s ease-out",setTimeout(()=>r.remove(),300)},3500)}class zt{constructor(){g(this,"lang",localStorage.getItem("lang")||"en");g(this,"activeTab","marketplace");g(this,"activeCategory","All");g(this,"selectedRegion","All");g(this,"searchQuery","");g(this,"cart",[]);g(this,"isCartOpen",!1);g(this,"isNotificationsModalOpen",!1);g(this,"isCreateListingModalOpen",!1);g(this,"activeOrderModal",null);g(this,"activeTelebirrModal",null);g(this,"activeDisputeModal",null);g(this,"maxDistanceKm",0);g(this,"activeGrade","All");g(this,"activeRipeness","All");g(this,"organicOnly",!1);g(this,"advanceOnly",!1);g(this,"activeBuyerSubTab","marketplace");g(this,"activeFarmerTab","listings");g(this,"activeAdminTab","disputes");g(this,"isRecordingVoice",!1);g(this,"voiceRecordTimer",null);g(this,"isAuthModalOpen",!1);g(this,"authMode","login");g(this,"otpStep",!1);g(this,"pendingPhone","");g(this,"lastSentCode","");g(this,"matchedUserName","");g(this,"matchedUserRole","");g(this,"authErrorMessage","");this.init()}async init(){this.attachGlobalWindowHandlers(),ne.startConnection(f.getToken()||void 0),ne.onOrderStatusChanged(async(t,s,r)=>{console.log(`[SignalR Live Status Update] Order ${t} -> ${s}: ${r}`),this.activeOrderModal&&this.activeOrderModal.id===t&&(this.activeOrderModal.status=s),w(`Live Update: Order #${t.slice(0,8).toUpperCase()} is now ${s.toUpperCase()}`,"fa-bolt","border-blue-500"),await f.refreshAllData(),this.render()}),f.subscribe(()=>{this.render()}),await f.refreshAllData();const e=f.getCurrentUser();e&&(e.role==="farmer"?this.activeTab="farmer":e.role==="driver"?this.activeTab="driver":e.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){const e=document.getElementById("app");if(!e)return;const t=f.getCurrentUser(),s=f.isAuthenticated(),r=f.getNotifications(),a=r.filter(l=>!l.read).length,c=f.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let o="";if(this.activeTab==="farmer"&&s&&(t==null?void 0:t.role)==="farmer"){const l=f.getListings().filter(E=>E.farmerId===t.id),d=f.getOrders("farmer"),m=f.getFarmerSummary();o=Ht(this.lang,l,d,m,this.isCreateListingModalOpen,this.activeFarmerTab,f.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&s&&(t==null?void 0:t.role)==="driver"){const l=f.getOrders("driver"),d=f.getDriverSummary();o=Vt(this.lang,l,d,f.getOptimizedRoute(),t,f.getIsOfflineMode(),f.getOfflineQueue().length)}else if(this.activeTab==="admin"&&s&&(t==null?void 0:t.role)==="admin"){const l=f.getPlatformStats(),d=f.getOrders().filter(m=>m.status==="disputed");o=Ut(this.lang,l,d,f.getAnomalyAlerts(),f.getKycQueue(),f.getRegionalAnalytics(),this.activeAdminTab)}else o=Ft(this.lang,c,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,f.getStandingOrders());e.innerHTML=`
      ${Lt(this.lang,t,s,this.activeTab,this.cart,a,this.searchQuery)}
      
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
              Ethiopia's leading bilingual B2B produce exchange. Directly linking 15M+ smallholder farmers with wholesale buyers, hotels, and supermarkets.
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
            <h4 class="font-bold text-white text-sm">Escrow & Governance</h4>
            <ul class="space-y-1.5 text-slate-400">
              <li><span class="text-slate-300">90% Direct Farmer Payout</span></li>
              <li><span class="text-slate-300">5% Dedicated Isuzu Freight Logistics</span></li>
              <li><span class="text-slate-300">5% Platform Operational Commission</span></li>
              <li><span class="text-slate-300">100% Buyer Quality Guarantee</span></li>
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
            <span>Powered by .NET 9 Clean Architecture + Vite + PostgreSQL PostGIS</span>
          </div>
        </div>
      </footer>

      <!-- Real Authentication Modal -->
      ${this.isAuthModalOpen?Qt(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage):""}
      ${this.isNotificationsModalOpen?Gt(this.lang,r):""}
    `}attachGlobalWindowHandlers(){const e=window;e.navigateTab=t=>{this.activeTab=t,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),w(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=t=>{this.activeBuyerSubTab=t,this.render()},e.toggleFarmerTab=t=>{this.activeFarmerTab=t,this.render()},e.setAdminTab=t=>{this.activeAdminTab=t,this.render()},e.setMaxDistanceKm=t=>{this.maxDistanceKm=t,w(t===0?"Showing all produce across Ethiopia":`Filtering farms within ${t} km radius`,"fa-location-dot"),this.render()},e.setGradeFilter=t=>{this.activeGrade=t,this.render()},e.setRipenessFilter=t=>{this.activeRipeness=t,this.render()},e.toggleOrganicFilter=t=>{this.organicOnly=t,this.render()},e.toggleAdvanceFilter=t=>{this.advanceOnly=t,this.render()},e.handleVoiceRecordToggle=()=>{var a;const t=document.getElementById("voiceBtnText"),s=document.getElementById("voiceWaveIndicator"),r=((a=document.getElementById("voiceLangSelect"))==null?void 0:a.value)||"am";this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription(r)):(this.isRecordingVoice=!0,t&&(t.innerText="Stop & Transcribe (አቁም)"),s&&s.classList.remove("hidden"),w("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription(r)},3e3))},e.finishVoiceTranscription=t=>{this.isRecordingVoice=!1;const s=document.getElementById("voiceBtnText"),r=document.getElementById("voiceWaveIndicator");s&&(s.innerText="Record Voice Note (ድምጽ ቅጂ)"),r&&r.classList.add("hidden");const a=f.simulateVoiceTranscription(4,t),c=document.getElementById("newProdName"),o=document.getElementById("newProdNameAm"),l=document.getElementById("newProdCategory"),d=document.getElementById("newProdQty"),m=document.getElementById("newProdPrice"),E=document.getElementById("newProdRegion");c&&(c.value=a.productName),o&&(o.value=a.nameAm),l&&(l.value=a.category),d&&(d.value=a.qtyKg.toString()),m&&(m.value=a.pricePerKg.toString()),E&&(E.value=a.region),J({particleCount:60,spread:50,origin:{y:.6}}),w(`Voice Note Transcribed! Form auto-populated in ${t.toUpperCase()}`,"fa-wand-magic-sparkles")},e.toggleAdvanceHarvestFields=t=>{const s=document.getElementById("advanceHarvestDateRow");s&&(t?s.classList.remove("hidden"):s.classList.add("hidden"))},e.handleSimulateSms=async t=>{t.preventDefault();const s=document.getElementById("smsPhone").value,r=document.getElementById("smsCommand").value,a=document.getElementById("smsResponseBox"),c=document.getElementById("smsResponseText");a&&c&&(c.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',a.classList.remove("hidden"));const o=await f.sendInboundSms(s,r);c&&(c.innerHTML=`&gt; ${o}`),w("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const t=f.getCurrentUser(),s=(t==null?void 0:t.walletBalanceEtb)||48200;if(s<=0){w("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}f.requestWalletWithdrawal(s,(t==null?void 0:t.phone)||"+251911223344"),J({particleCount:100,spread:70,origin:{y:.6}}),w(`Instant Payout of ${s.toLocaleString()} ETB deposited to Telebirr (${(t==null?void 0:t.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=t=>{if(!f.isAuthenticated()){e.openAuthModal("login");return}f.addStandingOrder(t,150,"Weekly"),J({particleCount:70,spread:60,origin:{y:.6}}),w("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=t=>{f.toggleStandingOrder(t),w("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=t=>{const s=f.getOrders().find(r=>r.id===t);s&&(this.activeDisputeModal={isOpen:!0,order:s},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(t,s)=>{t.preventDefault();const r=document.getElementById("disputeReasonText").value,a=document.getElementById("disputePhotoUrl").value,c=document.getElementById("disputeRefundSlider").value;await f.disputeOrder(s,r,a,parseInt(c,10)),this.activeDisputeModal=null,this.activeOrderModal=null,w("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const t=f.toggleOfflineMode();w(t?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const t=await f.syncOfflineQueue();w(`Synced ${t} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async t=>{const s=f.getOptimizedRoute();s.stops[t]&&(s.stops[t].completed=!0,J({particleCount:50,spread:50,origin:{y:.6}}),w(`Stop #${t+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async t=>{await f.pickupOrderByDriver(t,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),w("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async t=>{await f.confirmDeliveryByBuyer(t,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),J({particleCount:120,spread:70,origin:{y:.6}}),w("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(t,s)=>{await f.verifyKyc(t,s),w(s?"Identity & Documents Approved!":"KYC verification rejected",s?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=t=>{w(`Anomaly Alert #${t} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=t=>{w(`Audit trail opened for Anomaly #${t}`,"fa-magnifying-glass")},e.openAuthModal=(t="login")=>{this.authMode=t,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=t=>{this.authMode=t,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=t=>{this.pendingPhone=t.replace("+251","").trim(),this.authErrorMessage="",this.render();const s=document.getElementById("authPhoneInput");s&&(s.value=this.pendingPhone,s.focus())},e.switchToRegisterWithPhone=t=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=t.replace("+251","").trim(),this.render()},e.handleRequestOtp=async t=>{t.preventDefault();const s=document.getElementById("authPhoneInput").value.trim();if(!s||s.length<8){w("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const r=document.getElementById("requestOtpBtn");r&&(r.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',r.disabled=!0),this.pendingPhone=s,this.authErrorMessage="";try{const a=await f.requestOtp(s);this.lastSentCode=a.demoCode||"",this.matchedUserName=a.userName||"",this.matchedUserRole=a.role||"",this.otpStep=!0,w(`SMS verification code dispatched to +251 ${s}`,"fa-comment-sms","border-emerald-500")}catch(a){this.authErrorMessage=a.message||"No account registered with this phone number. Please register first.",this.otpStep=!1,w(this.authErrorMessage,"fa-circle-xmark","border-red-500")}this.render()},e.handleVerifyOtp=async t=>{t.preventDefault();const s=document.getElementById("authOtpInput").value.trim();if(!s){w("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const r=document.getElementById("verifyOtpBtn");r&&(r.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',r.disabled=!0);try{const a=await f.verifyOtp(this.pendingPhone,s);this.isAuthModalOpen=!1,this.authErrorMessage="",a.role==="farmer"?this.activeTab="farmer":a.role==="driver"?this.activeTab="driver":a.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",J({particleCount:100,spread:60,origin:{y:.6}}),w(`Welcome back, ${a.name}!`,"fa-user-check")}catch(a){this.authErrorMessage=a.message||"Invalid verification code. Please check your SMS or try again.",w(this.authErrorMessage,"fa-circle-xmark","border-red-500")}this.render()},e.handleRegisterUser=async t=>{var d;t.preventDefault();const s=document.getElementById("regName").value.trim(),r=document.getElementById("regNameAm").value.trim(),a=document.getElementById("regPhone").value.trim(),c=document.getElementById("regRegion").value,o=((d=document.querySelector('input[name="regRole"]:checked'))==null?void 0:d.value)||"farmer";if(!s||!a){w("Please fill in all required fields","fa-triangle-exclamation","border-red-500");return}const l=document.getElementById("registerSubmitBtn");l&&(l.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in Database...',l.disabled=!0),this.authErrorMessage="";try{const m=await f.registerUser(s,r,a,o,c);this.isAuthModalOpen=!1,m.role==="farmer"?this.activeTab="farmer":m.role==="driver"?this.activeTab="driver":m.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",J({particleCount:140,spread:80,origin:{y:.6}}),w(`Registration Complete! Welcome to Farmer-to-Market, ${s}.`,"fa-champagne-glasses")}catch(m){this.authErrorMessage=m.message||"Registration failed. Please try again.",w(this.authErrorMessage,"fa-circle-xmark","border-red-500")}this.render()},e.handleLogout=()=>{f.logout(),this.activeTab="marketplace",w("You have been signed out.","fa-arrow-right-from-bracket","border-slate-500"),this.render()},e.openNotificationsModal=()=>{this.isNotificationsModalOpen=!0,this.render()},e.closeNotificationsModal=()=>{this.isNotificationsModalOpen=!1,this.render()},e.setCategory=t=>{this.activeCategory=t,this.render()},e.setRegion=t=>{this.selectedRegion=t,this.render()},e.setSearchQuery=t=>{this.searchQuery=t,this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.quickBuy=t=>{if(!f.isAuthenticated()){e.openAuthModal("login"),w("Please sign in to place wholesale orders","fa-right-to-bracket","border-amber-500");return}const s=f.getListingById(t);if(!s)return;const r=this.cart.find(a=>a.listing.id===t);r?r.qtyKg+=s.minOrderKg:this.cart.push({listing:s,qtyKg:s.minOrderKg}),this.isCartOpen=!0,w(`Added ${s.minOrderKg}kg of ${s.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(t,s)=>{const r=this.cart.find(a=>a.listing.id===t);r&&(r.qtyKg=Math.max(r.listing.minOrderKg,r.qtyKg+s),this.render())},e.removeFromCart=t=>{this.cart=this.cart.filter(s=>s.listing.id!==t),w("Item removed from cart","fa-trash-can","border-red-500"),this.render()},e.openTelebirrModal=()=>{if(!f.isAuthenticated()){e.openAuthModal("login");return}const t=this.cart.reduce((s,r)=>s+r.qtyKg*r.listing.pricePerKg,0);this.activeTelebirrModal={isOpen:!0,totalEtb:t},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.processTelebirrPayment=async t=>{t.preventDefault();const s=document.getElementById("telebirrSubmitBtn");s&&(s.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Authorizing with Telebirr Escrow...',s.disabled=!0);try{let r=null;for(const a of this.cart)r=await f.placeOrder(a.listing.id,a.qtyKg);this.cart=[],this.isCartOpen=!1,this.activeTelebirrModal=null,J({particleCount:120,spread:70,origin:{y:.6}}),w("Payment secured via Telebirr Escrow! Orders dispatched to farmers & drivers.","fa-lock","border-blue-500"),r&&(this.activeOrderModal=r)}catch(r){w(r.message||"Payment authorization failed.","fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=t=>{const r=f.getOrders().find(a=>a.id===t);r&&(this.activeOrderModal=r,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.confirmFarmerOrder=async t=>{await f.confirmOrderByFarmer(t),ne.joinOrder(t),w("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async t=>{await f.confirmDeliveryByBuyer(t),J({particleCount:150,spread:80,origin:{y:.6}}),w("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),this.render()},e.adminResolveDispute=async(t,s)=>{await f.resolveDispute(t,s),w(`Dispute resolved: ${s}`,"fa-gavel","border-purple-500"),this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListing=async t=>{var P;t.preventDefault();const s=document.getElementById("newProdName").value,r=document.getElementById("newProdNameAm").value,a=document.getElementById("newProdCategory").value,c=parseFloat(document.getElementById("newProdQty").value),o=parseFloat(document.getElementById("newProdPrice").value),l=parseFloat(document.getElementById("newProdMinOrder").value),d=document.getElementById("newProdGrade").value,m=document.getElementById("newProdRipeness").value,E=document.getElementById("newProdOrganic").checked,H=document.getElementById("newProdAdvanceToggle").checked,Z=(P=document.getElementById("newProdHarvestDate"))==null?void 0:P.value,oe=document.getElementById("newProdRegion").value,ee=document.getElementById("newProdPhoto").value;try{await f.createListing({productName:s,nameAm:r,category:a,qtyKg:c,pricePerKg:o,minOrderKg:l,grade:d,ripeness:m,isOrganic:E,isAdvanceHarvest:H,expectedHarvestDate:H?Z:void 0,region:oe,photos:[ee],availableFrom:H&&Z?Z:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,w(`Published ${s} with Market Price Benchmark!`,"fa-cloud-arrow-up")}catch(S){w(S.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleBroadcastSms=async t=>{t.preventDefault();const s=document.getElementById("broadcastEn").value,r=document.getElementById("broadcastAm").value,a=document.getElementById("broadcastTarget").value;await f.broadcastSms(s,r,a),w(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to all registered farmers via Twilio!","fa-paper-plane"),this.render()}}}new zt;
