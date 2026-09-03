var dt=Object.defineProperty;var ct=(l,e,t)=>e in l?dt(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var b=(l,e,t)=>ct(l,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();var Oe={};(function l(e,t,s,a){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),n=typeof Path2D=="function"&&typeof DOMMatrix=="function",i=(function(){if(!e.OffscreenCanvas)return!1;try{var g=new OffscreenCanvas(1,1),p=g.getContext("2d");p.fillRect(0,0,1,1);var $=g.transferToImageBitmap();p.createPattern($,"no-repeat")}catch{return!1}return!0})();function d(){}function c(g){var p=t.exports.Promise,$=p!==void 0?p:e.Promise;return typeof $=="function"?new $(g):(g(d,d),null)}var o=(function(g,p){return{transform:function($){if(g)return $;if(p.has($))return p.get($);var I=new OffscreenCanvas($.width,$.height),D=I.getContext("2d");return D.drawImage($,0,0),p.set($,I),I},clear:function(){p.clear()}}})(i,new Map),m=(function(){var g=Math.floor(16.666666666666668),p,$,I={},D=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(p=function(_){var B=Math.random();return I[B]=requestAnimationFrame(function T(O){D===O||D+g-1<O?(D=O,delete I[B],_()):I[B]=requestAnimationFrame(T)}),B},$=function(_){I[_]&&cancelAnimationFrame(I[_])}):(p=function(_){return setTimeout(_,g)},$=function(_){return clearTimeout(_)}),{frame:p,cancel:$}})(),f=(function(){var g,p,$={};function I(D){function _(B,T){D.postMessage({options:B||{},callback:T})}D.init=function(T){var O=T.transferControlToOffscreen();D.postMessage({canvas:O},[O])},D.fire=function(T,O,U){if(p)return _(T,null),p;var K=Math.random().toString(36).slice(2);return p=c(function(j){function q(te){te.data.callback===K&&(delete $[K],D.removeEventListener("message",q),p=null,o.clear(),U(),j())}D.addEventListener("message",q),_(T,K),$[K]=q.bind(null,{data:{callback:K}})}),p},D.reset=function(){D.postMessage({reset:!0});for(var T in $)$[T](),delete $[T]}}return function(){if(g)return g;if(!s&&r){var D=["var CONFETTI, SIZE = {}, module = {};","("+l.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{g=new Worker(URL.createObjectURL(new Blob([D])))}catch(_){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",_),null}I(g)}return g}})(),x={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function w(g,p){return p?p(g):g}function A(g){return g!=null}function E(g,p,$){return w(g&&A(g[p])?g[p]:x[p],$)}function C(g){return g<0?0:Math.floor(g)}function y(g,p){return Math.floor(Math.random()*(p-g))+g}function S(g){return parseInt(g,16)}function M(g){return g.map(P)}function P(g){var p=String(g).replace(/[^0-9a-f]/gi,"");return p.length<6&&(p=p[0]+p[0]+p[1]+p[1]+p[2]+p[2]),{r:S(p.substring(0,2)),g:S(p.substring(2,4)),b:S(p.substring(4,6))}}function V(g){var p=E(g,"origin",Object);return p.x=E(p,"x",Number),p.y=E(p,"y",Number),p}function Z(g){g.width=document.documentElement.clientWidth,g.height=document.documentElement.clientHeight}function ee(g){var p=g.getBoundingClientRect();g.width=p.width,g.height=p.height}function X(g){var p=document.createElement("canvas");return p.style.position="fixed",p.style.top="0px",p.style.left="0px",p.style.pointerEvents="none",p.style.zIndex=g,p}function N(g,p,$,I,D,_,B,T,O){g.save(),g.translate(p,$),g.rotate(_),g.scale(I,D),g.arc(0,0,1,B,T,O),g.restore()}function ae(g){var p=g.angle*(Math.PI/180),$=g.spread*(Math.PI/180);return{x:g.x,y:g.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:g.startVelocity*.5+Math.random()*g.startVelocity,angle2D:-p+(.5*$-Math.random()*$),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:g.color,shape:g.shape,tick:0,totalTicks:g.ticks,decay:g.decay,drift:g.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:g.gravity*3,ovalScalar:.6,scalar:g.scalar,flat:g.flat}}function se(g,p){p.x+=Math.cos(p.angle2D)*p.velocity+p.drift,p.y+=Math.sin(p.angle2D)*p.velocity+p.gravity,p.velocity*=p.decay,p.flat?(p.wobble=0,p.wobbleX=p.x+10*p.scalar,p.wobbleY=p.y+10*p.scalar,p.tiltSin=0,p.tiltCos=0,p.random=1):(p.wobble+=p.wobbleSpeed,p.wobbleX=p.x+10*p.scalar*Math.cos(p.wobble),p.wobbleY=p.y+10*p.scalar*Math.sin(p.wobble),p.tiltAngle+=.1,p.tiltSin=Math.sin(p.tiltAngle),p.tiltCos=Math.cos(p.tiltAngle),p.random=Math.random()+2);var $=p.tick++/p.totalTicks,I=p.x+p.random*p.tiltCos,D=p.y+p.random*p.tiltSin,_=p.wobbleX+p.random*p.tiltCos,B=p.wobbleY+p.random*p.tiltSin;if(g.fillStyle="rgba("+p.color.r+", "+p.color.g+", "+p.color.b+", "+(1-$)+")",g.beginPath(),n&&p.shape.type==="path"&&typeof p.shape.path=="string"&&Array.isArray(p.shape.matrix))g.fill(ge(p.shape.path,p.shape.matrix,p.x,p.y,Math.abs(_-I)*.1,Math.abs(B-D)*.1,Math.PI/10*p.wobble));else if(p.shape.type==="bitmap"){var T=Math.PI/10*p.wobble,O=Math.abs(_-I)*.1,U=Math.abs(B-D)*.1,K=p.shape.bitmap.width*p.scalar,j=p.shape.bitmap.height*p.scalar,q=new DOMMatrix([Math.cos(T)*O,Math.sin(T)*O,-Math.sin(T)*U,Math.cos(T)*U,p.x,p.y]);q.multiplySelf(new DOMMatrix(p.shape.matrix));var te=g.createPattern(o.transform(p.shape.bitmap),"no-repeat");te.setTransform(q),g.globalAlpha=1-$,g.fillStyle=te,g.fillRect(p.x-K/2,p.y-j/2,K,j),g.globalAlpha=1}else if(p.shape==="circle")g.ellipse?g.ellipse(p.x,p.y,Math.abs(_-I)*p.ovalScalar,Math.abs(B-D)*p.ovalScalar,Math.PI/10*p.wobble,0,2*Math.PI):N(g,p.x,p.y,Math.abs(_-I)*p.ovalScalar,Math.abs(B-D)*p.ovalScalar,Math.PI/10*p.wobble,0,2*Math.PI);else if(p.shape==="star")for(var L=Math.PI/2*3,ie=4*p.scalar,de=8*p.scalar,ce=p.x,fe=p.y,be=5,pe=Math.PI/be;be--;)ce=p.x+Math.cos(L)*de,fe=p.y+Math.sin(L)*de,g.lineTo(ce,fe),L+=pe,ce=p.x+Math.cos(L)*ie,fe=p.y+Math.sin(L)*ie,g.lineTo(ce,fe),L+=pe;else g.moveTo(Math.floor(p.x),Math.floor(p.y)),g.lineTo(Math.floor(p.wobbleX),Math.floor(D)),g.lineTo(Math.floor(_),Math.floor(B)),g.lineTo(Math.floor(I),Math.floor(p.wobbleY));return g.closePath(),g.fill(),p.tick<p.totalTicks}function k(g,p,$,I,D){var _=p.slice(),B=g.getContext("2d"),T,O,U=c(function(K){function j(){T=O=null,B.clearRect(0,0,I.width,I.height),o.clear(),D(),K()}function q(){s&&!(I.width===a.width&&I.height===a.height)&&(I.width=g.width=a.width,I.height=g.height=a.height),!I.width&&!I.height&&($(g),I.width=g.width,I.height=g.height),B.clearRect(0,0,I.width,I.height),_=_.filter(function(te){return se(B,te)}),_.length?T=m.frame(q):j()}T=m.frame(q),O=j});return{addFettis:function(K){return _=_.concat(K),U},canvas:g,promise:U,reset:function(){T&&m.cancel(T),O&&O()}}}function W(g,p){var $=!g,I=!!E(p||{},"resize"),D=!1,_=E(p,"disableForReducedMotion",Boolean),B=r&&!!E(p||{},"useWorker"),T=B?f():null,O=$?Z:ee,U=g&&T?!!g.__confetti_initialized:!1,K=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,j;function q(L,ie,de){for(var ce=E(L,"particleCount",C),fe=E(L,"angle",Number),be=E(L,"spread",Number),pe=E(L,"startVelocity",Number),tt=E(L,"decay",Number),at=E(L,"gravity",Number),st=E(L,"drift",Number),Ue=E(L,"colors",M),rt=E(L,"ticks",Number),je=E(L,"shapes"),it=E(L,"scalar"),ot=!!E(L,"flat"),Ge=V(L),Ve=ce,Ne=[],nt=g.width*Ge.x,lt=g.height*Ge.y;Ve--;)Ne.push(ae({x:nt,y:lt,angle:fe,spread:be,startVelocity:pe,color:Ue[Ve%Ue.length],shape:je[y(0,je.length)],ticks:rt,decay:tt,gravity:at,drift:st,scalar:it,flat:ot}));return j?j.addFettis(Ne):(j=k(g,Ne,O,ie,de),j.promise)}function te(L){var ie=_||E(L,"disableForReducedMotion",Boolean),de=E(L,"zIndex",Number);if(ie&&K)return c(function(pe){pe()});$&&j?g=j.canvas:$&&!g&&(g=X(de),document.body.appendChild(g)),I&&!U&&O(g);var ce={width:g.width,height:g.height};T&&!U&&T.init(g),U=!0,T&&(g.__confetti_initialized=!0);function fe(){if(T){var pe={getBoundingClientRect:function(){if(!$)return g.getBoundingClientRect()}};O(pe),T.postMessage({resize:{width:pe.width,height:pe.height}});return}ce.width=ce.height=null}function be(){j=null,I&&(D=!1,e.removeEventListener("resize",fe)),$&&g&&(document.body.contains(g)&&document.body.removeChild(g),g=null,U=!1)}return I&&!D&&(D=!0,e.addEventListener("resize",fe,!1)),T?T.fire(L,ce,be):q(L,ce,be)}return te.reset=function(){T&&T.reset(),j&&j.reset()},te}var F;function le(){return F||(F=W(null,{useWorker:!0,resize:!0})),F}function ge(g,p,$,I,D,_,B){var T=new Path2D(g),O=new Path2D;O.addPath(T,new DOMMatrix(p));var U=new Path2D;return U.addPath(O,new DOMMatrix([Math.cos(B)*D,Math.sin(B)*D,-Math.sin(B)*_,Math.cos(B)*_,$,I])),U}function ke(g){if(!n)throw new Error("path confetti are not supported in this browser");var p,$;typeof g=="string"?p=g:(p=g.path,$=g.matrix);var I=new Path2D(p),D=document.createElement("canvas"),_=D.getContext("2d");if(!$){for(var B=1e3,T=B,O=B,U=0,K=0,j,q,te=0;te<B;te+=2)for(var L=0;L<B;L+=2)_.isPointInPath(I,te,L,"nonzero")&&(T=Math.min(T,te),O=Math.min(O,L),U=Math.max(U,te),K=Math.max(K,L));j=U-T,q=K-O;var ie=10,de=Math.min(ie/j,ie/q);$=[de,0,0,de,-Math.round(j/2+T)*de,-Math.round(q/2+O)*de]}return{type:"path",path:p,matrix:$}}function Ee(g){var p,$=1,I="#000000",D='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof g=="string"?p=g:(p=g.text,$="scalar"in g?g.scalar:$,D="fontFamily"in g?g.fontFamily:D,I="color"in g?g.color:I);var _=10*$,B=""+_+"px "+D,T=new OffscreenCanvas(_,_),O=T.getContext("2d");O.font=B;var U=O.measureText(p),K=Math.ceil(U.actualBoundingBoxRight+U.actualBoundingBoxLeft),j=Math.ceil(U.actualBoundingBoxAscent+U.actualBoundingBoxDescent),q=2,te=U.actualBoundingBoxLeft+q,L=U.actualBoundingBoxAscent+q;K+=q+q,j+=q+q,T=new OffscreenCanvas(K,j),O=T.getContext("2d"),O.font=B,O.fillStyle=I,O.fillText(p,te,L);var ie=1/$;return{type:"bitmap",bitmap:T.transferToImageBitmap(),matrix:[ie,0,0,ie,-K*ie/2,-j*ie/2]}}t.exports=function(){return le().apply(this,arguments)},t.exports.reset=function(){le().reset()},t.exports.create=W,t.exports.shapeFromPath=ke,t.exports.shapeFromText=Ee})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Oe,!1);const z=Oe.exports;Oe.exports.create;class he extends Error{constructor(e,t){const s=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=s}}class Le extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class ue extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class ut extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=s}}class pt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=s}}class mt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=s}}class We extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class ft extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=s}}class Qe{constructor(e,t,s){this.statusCode=e,this.statusText=t,this.content=s}}class Pe{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var v;(function(l){l[l.Trace=0]="Trace",l[l.Debug=1]="Debug",l[l.Information=2]="Information",l[l.Warning=3]="Warning",l[l.Error=4]="Error",l[l.Critical=5]="Critical",l[l.None=6]="None"})(v||(v={}));class Ae{constructor(){}log(e,t){}}Ae.instance=new Ae;const gt="8.0.29";class Q{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,s){if(!(e in t))throw new Error(`Unknown ${s} value: ${e}.`)}}class H{static get isBrowser(){return!H.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!H.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!H.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function Se(l,e){let t="";return xe(l)?(t=`Binary data of length ${l.byteLength}`,e&&(t+=`. Content: '${bt(l)}'`)):typeof l=="string"&&(t=`String data of length ${l.length}`,e&&(t+=`. Content: '${l}'`)),t}function bt(l){const e=new Uint8Array(l);let t="";return e.forEach(s=>{const a=s<16?"0":"";t+=`0x${a}${s.toString(16)} `}),t.substr(0,t.length-1)}function xe(l){return l&&typeof ArrayBuffer<"u"&&(l instanceof ArrayBuffer||l.constructor&&l.constructor.name==="ArrayBuffer")}async function Xe(l,e,t,s,a,r){const n={},[i,d]=ye();n[i]=d,l.log(v.Trace,`(${e} transport) sending data. ${Se(a,r.logMessageContent)}.`);const c=xe(a)?"arraybuffer":"text",o=await t.post(s,{content:a,headers:{...n,...r.headers},responseType:c,timeout:r.timeout,withCredentials:r.withCredentials});l.log(v.Trace,`(${e} transport) request complete. Response status: ${o.statusCode}.`)}function ht(l){return l===void 0?new Ce(v.Information):l===null?Ae.instance:l.log!==void 0?l:new Ce(l)}class vt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class Ce{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const s=`[${new Date().toISOString()}] ${v[e]}: ${t}`;switch(e){case v.Critical:case v.Error:this.out.error(s);break;case v.Warning:this.out.warn(s);break;case v.Information:this.out.info(s);break;default:this.out.log(s);break}}}}function ye(){let l="X-SignalR-User-Agent";return H.isNode&&(l="User-Agent"),[l,xt(gt,yt(),At(),wt())]}function xt(l,e,t,s){let a="Microsoft SignalR/";const r=l.split(".");return a+=`${r[0]}.${r[1]}`,a+=` (${l}; `,e&&e!==""?a+=`${e}; `:a+="Unknown OS; ",a+=`${t}`,s?a+=`; ${s}`:a+="; Unknown Runtime Version",a+=")",a}function yt(){if(H.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function wt(){if(H.isNode)return process.versions.node}function At(){return H.isNode?"NodeJS":"Browser"}function De(l){return l.stack?l.stack:l.message?l.message:`${l}`}function St(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class kt extends Pe{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||H.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(St());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new ue;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let s;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),s=new ue});let a=null;if(e.timeout){const d=e.timeout;a=setTimeout(()=>{t.abort(),this._logger.log(v.Warning,"Timeout from HTTP request."),s=new Le},d)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},xe(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let r;try{r=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(d){throw s||(this._logger.log(v.Warning,`Error from HTTP request. ${d}.`),d)}finally{a&&clearTimeout(a),e.abortSignal&&(e.abortSignal.onabort=null)}if(!r.ok){const d=await He(r,"text");throw new he(d||r.statusText,r.status)}const i=await He(r,e.responseType);return new Qe(r.status,r.statusText,i)}getCookieString(e){let t="";return H.isNode&&this._jar&&this._jar.getCookies(e,(s,a)=>t=a.join("; ")),t}}function He(l,e){let t;switch(e){case"arraybuffer":t=l.arrayBuffer();break;case"text":t=l.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=l.text();break}return t}class Et extends Pe{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new ue):e.method?e.url?new Promise((t,s)=>{const a=new XMLHttpRequest;a.open(e.method,e.url,!0),a.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,a.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(xe(e.content)?a.setRequestHeader("Content-Type","application/octet-stream"):a.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const r=e.headers;r&&Object.keys(r).forEach(n=>{a.setRequestHeader(n,r[n])}),e.responseType&&(a.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{a.abort(),s(new ue)}),e.timeout&&(a.timeout=e.timeout),a.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),a.status>=200&&a.status<300?t(new Qe(a.status,a.statusText,a.response||a.responseText)):s(new he(a.response||a.responseText||a.statusText,a.status))},a.onerror=()=>{this._logger.log(v.Warning,`Error from HTTP request. ${a.status}: ${a.statusText}.`),s(new he(a.statusText,a.status))},a.ontimeout=()=>{this._logger.log(v.Warning,"Timeout from HTTP request."),s(new Le)},a.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class $t extends Pe{constructor(e){if(super(),typeof fetch<"u"||H.isNode)this._httpClient=new kt(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new Et(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new ue):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class ne{static write(e){return`${e}${ne.RecordSeparator}`}static parse(e){if(e[e.length-1]!==ne.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(ne.RecordSeparator);return t.pop(),t}}ne.RecordSeparatorCode=30;ne.RecordSeparator=String.fromCharCode(ne.RecordSeparatorCode);class Tt{writeHandshakeRequest(e){return ne.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,s;if(xe(e)){const i=new Uint8Array(e),d=i.indexOf(ne.RecordSeparatorCode);if(d===-1)throw new Error("Message is incomplete.");const c=d+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(i.slice(0,c))),s=i.byteLength>c?i.slice(c).buffer:null}else{const i=e,d=i.indexOf(ne.RecordSeparator);if(d===-1)throw new Error("Message is incomplete.");const c=d+1;t=i.substring(0,c),s=i.length>c?i.substring(c):null}const a=ne.parse(t),r=JSON.parse(a[0]);if(r.type)throw new Error("Expected a handshake response from the server.");return[s,r]}}var R;(function(l){l[l.Invocation=1]="Invocation",l[l.StreamItem=2]="StreamItem",l[l.Completion=3]="Completion",l[l.StreamInvocation=4]="StreamInvocation",l[l.CancelInvocation=5]="CancelInvocation",l[l.Ping=6]="Ping",l[l.Close=7]="Close",l[l.Ack=8]="Ack",l[l.Sequence=9]="Sequence"})(R||(R={}));class It{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new vt(this,e)}}class Rt{constructor(e,t,s){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=s}async _send(e){const t=this._protocol.writeMessage(e);let s=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let a=()=>{},r=()=>{};xe(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(s=new Promise((n,i)=>{a=n,r=i})),this._messages.push(new Ct(t,this._totalMessageCount,a,r))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await s}_ack(e){let t=-1;for(let s=0;s<this._messages.length;s++){const a=this._messages[s];if(a._id<=e.sequenceId)t=s,xe(a._message)?this._bufferedByteCount-=a._message.byteLength:this._bufferedByteCount-=a._message.length,a._resolver();else if(this._bufferedByteCount<this._bufferSize)a._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==R.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:R.Sequence,sequenceId:e}));const t=this._messages;for(const s of t)await this._connection.send(s._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case R.Invocation:case R.StreamItem:case R.Completion:case R.StreamInvocation:case R.CancelInvocation:return!0;case R.Close:case R.Sequence:case R.Ping:case R.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:R.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class Ct{constructor(e,t,s,a){this._message=e,this._id=t,this._resolver=s,this._rejector=a}}const Pt=30*1e3,Nt=15*1e3,Dt=1e5;var G;(function(l){l.Disconnected="Disconnected",l.Connecting="Connecting",l.Connected="Connected",l.Disconnecting="Disconnecting",l.Reconnecting="Reconnecting"})(G||(G={}));class Me{static create(e,t,s,a,r,n,i){return new Me(e,t,s,a,r,n,i)}constructor(e,t,s,a,r,n,i){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(v.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},Q.isRequired(e,"connection"),Q.isRequired(t,"logger"),Q.isRequired(s,"protocol"),this.serverTimeoutInMilliseconds=r??Pt,this.keepAliveIntervalInMilliseconds=n??Nt,this._statefulReconnectBufferSize=i??Dt,this._logger=t,this._protocol=s,this.connection=e,this._reconnectPolicy=a,this._handshakeProtocol=new Tt,this.connection.onreceive=d=>this._processIncomingData(d),this.connection.onclose=d=>this._connectionClosed(d),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=G.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:R.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==G.Disconnected&&this._connectionState!==G.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==G.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=G.Connecting,this._logger.log(v.Debug,"Starting HubConnection.");try{await this._startInternal(),H.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=G.Connected,this._connectionStarted=!0,this._logger.log(v.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=G.Disconnected,this._logger.log(v.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,s)=>{this._handshakeResolver=t,this._handshakeRejecter=s});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const s={protocol:this._protocol.name,version:t};if(this._logger.log(v.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)),this._logger.log(v.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new Rt(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(v.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===G.Disconnected)return this._logger.log(v.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===G.Disconnecting)return this._logger.log(v.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=G.Disconnecting,this._logger.log(v.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(v.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===G.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new ue("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createStreamInvocation(e,t,a);let n;const i=new It;return i.cancelCallback=()=>{const d=this._createCancelInvocation(r.invocationId);return delete this._callbacks[r.invocationId],n.then(()=>this._sendWithProtocol(d))},this._callbacks[r.invocationId]=(d,c)=>{if(c){i.error(c);return}else d&&(d.type===R.Completion?d.error?i.error(new Error(d.error)):i.complete():i.next(d.item))},n=this._sendWithProtocol(r).catch(d=>{i.error(d),delete this._callbacks[r.invocationId]}),this._launchStreams(s,n),i}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._sendWithProtocol(this._createInvocation(e,t,!0,a));return this._launchStreams(s,r),r}invoke(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createInvocation(e,t,!1,a);return new Promise((i,d)=>{this._callbacks[r.invocationId]=(o,m)=>{if(m){d(m);return}else o&&(o.type===R.Completion?o.error?d(new Error(o.error)):i(o.result):d(new Error(`Unexpected message type: ${o.type}`)))};const c=this._sendWithProtocol(r).catch(o=>{d(o),delete this._callbacks[r.invocationId]});this._launchStreams(s,c)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const s=this._methods[e];if(s)if(t){const a=s.indexOf(t);a!==-1&&(s.splice(a,1),s.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const s of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(s)))switch(s.type){case R.Invocation:this._invokeClientMethod(s).catch(a=>{this._logger.log(v.Error,`Invoke client method threw error: ${De(a)}`)});break;case R.StreamItem:case R.Completion:{const a=this._callbacks[s.invocationId];if(a){s.type===R.Completion&&delete this._callbacks[s.invocationId];try{a(s)}catch(r){this._logger.log(v.Error,`Stream callback threw error: ${De(r)}`)}}break}case R.Ping:break;case R.Close:{this._logger.log(v.Information,"Close message received from server.");const a=s.error?new Error("Server returned an error on close: "+s.error):void 0;s.allowReconnect===!0?this.connection.stop(a):this._stopPromise=this._stopInternal(a);break}case R.Ack:this._messageBuffer&&this._messageBuffer._ack(s);break;case R.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(s);break;default:this._logger.log(v.Warning,`Invalid message type: ${s.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,s;try{[s,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(a){const r="Error parsing handshake response: "+a;this._logger.log(v.Error,r);const n=new Error(r);throw this._handshakeRejecter(n),n}if(t.error){const a="Server returned handshake error: "+t.error;this._logger.log(v.Error,a);const r=new Error(a);throw this._handshakeRejecter(r),r}else this._logger.log(v.Debug,"Server handshake complete.");return this._handshakeResolver(),s}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===G.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),s=this._methods[t];if(!s){this._logger.log(v.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(v.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const a=s.slice(),r=!!e.invocationId;let n,i,d;for(const c of a)try{const o=n;n=await c.apply(this,e.arguments),r&&n&&o&&(this._logger.log(v.Error,`Multiple results provided for '${t}'. Sending error to server.`),d=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),i=void 0}catch(o){i=o,this._logger.log(v.Error,`A callback for the method '${t}' threw error '${o}'.`)}d?await this._sendWithProtocol(d):r?(i?d=this._createCompletionMessage(e.invocationId,`${i}`,null):n!==void 0?d=this._createCompletionMessage(e.invocationId,null,n):(this._logger.log(v.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),d=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(d)):n&&this._logger.log(v.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(v.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new ue("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===G.Disconnecting?this._completeClose(e):this._connectionState===G.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===G.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=G.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),H.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(v.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let s=0,a=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),r=this._getNextRetryDelay(s++,0,a);if(r===null){this._logger.log(v.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=G.Reconnecting,e?this._logger.log(v.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(v.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(n=>n.apply(this,[e]))}catch(n){this._logger.log(v.Error,`An onreconnecting callback called with error '${e}' threw error '${n}'.`)}if(this._connectionState!==G.Reconnecting){this._logger.log(v.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;r!==null;){if(this._logger.log(v.Information,`Reconnect attempt number ${s} will start in ${r} ms.`),await new Promise(n=>{this._reconnectDelayHandle=setTimeout(n,r)}),this._reconnectDelayHandle=void 0,this._connectionState!==G.Reconnecting){this._logger.log(v.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=G.Connected,this._logger.log(v.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(n=>n.apply(this,[this.connection.connectionId]))}catch(n){this._logger.log(v.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${n}'.`)}return}catch(n){if(this._logger.log(v.Information,`Reconnect attempt failed because of error '${n}'.`),this._connectionState!==G.Reconnecting){this._logger.log(v.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===G.Disconnecting&&this._completeClose();return}a=n instanceof Error?n:new Error(n.toString()),r=this._getNextRetryDelay(s++,Date.now()-t,a)}}this._logger.log(v.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${s} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,s){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:s})}catch(a){return this._logger.log(v.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${a}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(s=>{const a=t[s];try{a(null,e)}catch(r){this._logger.log(v.Error,`Stream 'error' callback called with '${e}' threw error: ${De(r)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,s,a){if(s)return a.length!==0?{arguments:t,streamIds:a,target:e,type:R.Invocation}:{arguments:t,target:e,type:R.Invocation};{const r=this._invocationId;return this._invocationId++,a.length!==0?{arguments:t,invocationId:r.toString(),streamIds:a,target:e,type:R.Invocation}:{arguments:t,invocationId:r.toString(),target:e,type:R.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const s in e)e[s].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s)))},error:a=>{let r;a instanceof Error?r=a.message:a&&a.toString?r=a.toString():r="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s,r)))},next:a=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(s,a)))}})}}_replaceStreamingParams(e){const t=[],s=[];for(let a=0;a<e.length;a++){const r=e[a];if(this._isObservable(r)){const n=this._invocationId;this._invocationId++,t[n]=r,s.push(n.toString()),e.splice(a,1)}}return[t,s]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,s){const a=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:a.toString(),streamIds:s,target:e,type:R.StreamInvocation}:{arguments:t,invocationId:a.toString(),target:e,type:R.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:R.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:R.StreamItem}}_createCompletionMessage(e,t,s){return t?{error:t,invocationId:e,type:R.Completion}:{invocationId:e,result:s,type:R.Completion}}_createCloseMessage(){return{type:R.Close}}}const _t=[0,2e3,1e4,3e4,null];class Ke{constructor(e){this._retryDelays=e!==void 0?[...e,null]:_t}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class ve{}ve.Authorization="Authorization";ve.Cookie="Cookie";class Bt extends Pe{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const s=await this._innerClient.send(e);return t&&s.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):s}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[ve.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[ve.Authorization]&&delete e.headers[ve.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var J;(function(l){l[l.None=0]="None",l[l.WebSockets=1]="WebSockets",l[l.ServerSentEvents=2]="ServerSentEvents",l[l.LongPolling=4]="LongPolling"})(J||(J={}));var re;(function(l){l[l.Text=1]="Text",l[l.Binary=2]="Binary"})(re||(re={}));let Ot=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class qe{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,s){this._httpClient=e,this._logger=t,this._pollAbort=new Ot,this._options=s,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(Q.isRequired(e,"url"),Q.isRequired(t,"transferFormat"),Q.isIn(t,re,"transferFormat"),this._url=e,this._logger.log(v.Trace,"(LongPolling transport) Connecting."),t===re.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[s,a]=ye(),r={[s]:a,...this._options.headers},n={abortSignal:this._pollAbort.signal,headers:r,timeout:1e5,withCredentials:this._options.withCredentials};t===re.Binary&&(n.responseType="arraybuffer");const i=`${e}&_=${Date.now()}`;this._logger.log(v.Trace,`(LongPolling transport) polling: ${i}.`);const d=await this._httpClient.get(i,n);d.statusCode!==200?(this._logger.log(v.Error,`(LongPolling transport) Unexpected response code: ${d.statusCode}.`),this._closeError=new he(d.statusText||"",d.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,n)}async _poll(e,t){try{for(;this._running;)try{const s=`${e}&_=${Date.now()}`;this._logger.log(v.Trace,`(LongPolling transport) polling: ${s}.`);const a=await this._httpClient.get(s,t);a.statusCode===204?(this._logger.log(v.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):a.statusCode!==200?(this._logger.log(v.Error,`(LongPolling transport) Unexpected response code: ${a.statusCode}.`),this._closeError=new he(a.statusText||"",a.statusCode),this._running=!1):a.content?(this._logger.log(v.Trace,`(LongPolling transport) data received. ${Se(a.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(a.content)):this._logger.log(v.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(s){this._running?s instanceof Le?this._logger.log(v.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=s,this._running=!1):this._logger.log(v.Trace,`(LongPolling transport) Poll errored after shutdown: ${s.message}`)}}finally{this._logger.log(v.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?Xe(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(v.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(v.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,s]=ye();e[t]=s;const a={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let r;try{await this._httpClient.delete(this._url,a)}catch(n){r=n}r?r instanceof he&&(r.statusCode===404?this._logger.log(v.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(v.Trace,`(LongPolling transport) Error sending a DELETE request: ${r}`)):this._logger.log(v.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(v.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(v.Trace,e),this.onclose(this._closeError)}}}class Lt{constructor(e,t,s,a){this._httpClient=e,this._accessToken=t,this._logger=s,this._options=a,this.onreceive=null,this.onclose=null}async connect(e,t){return Q.isRequired(e,"url"),Q.isRequired(t,"transferFormat"),Q.isIn(t,re,"transferFormat"),this._logger.log(v.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((s,a)=>{let r=!1;if(t!==re.Text){a(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let n;if(H.isBrowser||H.isWebWorker)n=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const i=this._httpClient.getCookieString(e),d={};d.Cookie=i;const[c,o]=ye();d[c]=o,n=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...d,...this._options.headers}})}try{n.onmessage=i=>{if(this.onreceive)try{this._logger.log(v.Trace,`(SSE transport) data received. ${Se(i.data,this._options.logMessageContent)}.`),this.onreceive(i.data)}catch(d){this._close(d);return}},n.onerror=i=>{r?this._close():a(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},n.onopen=()=>{this._logger.log(v.Information,`SSE connected to ${this._url}`),this._eventSource=n,r=!0,s()}}catch(i){a(i);return}})}async send(e){return this._eventSource?Xe(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class Mt{constructor(e,t,s,a,r,n){this._logger=s,this._accessTokenFactory=t,this._logMessageContent=a,this._webSocketConstructor=r,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=n}async connect(e,t){Q.isRequired(e,"url"),Q.isRequired(t,"transferFormat"),Q.isIn(t,re,"transferFormat"),this._logger.log(v.Trace,"(WebSockets transport) Connecting.");let s;return this._accessTokenFactory&&(s=await this._accessTokenFactory()),new Promise((a,r)=>{e=e.replace(/^http/,"ws");let n;const i=this._httpClient.getCookieString(e);let d=!1;if(H.isNode||H.isReactNative){const c={},[o,m]=ye();c[o]=m,s&&(c[ve.Authorization]=`Bearer ${s}`),i&&(c[ve.Cookie]=i),n=new this._webSocketConstructor(e,void 0,{headers:{...c,...this._headers}})}else s&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(s)}`);n||(n=new this._webSocketConstructor(e)),t===re.Binary&&(n.binaryType="arraybuffer"),n.onopen=c=>{this._logger.log(v.Information,`WebSocket connected to ${e}.`),this._webSocket=n,d=!0,a()},n.onerror=c=>{let o=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?o=c.error:o="There was an error with the transport",this._logger.log(v.Information,`(WebSockets transport) ${o}.`)},n.onmessage=c=>{if(this._logger.log(v.Trace,`(WebSockets transport) data received. ${Se(c.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(c.data)}catch(o){this._close(o);return}},n.onclose=c=>{if(d)this._close(c);else{let o=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?o=c.error:o="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",r(new Error(o))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(v.Trace,`(WebSockets transport) sending data. ${Se(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(v.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const ze=100;class Ft{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,Q.isRequired(e,"url"),this._logger=ht(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let s=null,a=null;if(H.isNode&&typeof require<"u"){const r=typeof __webpack_require__=="function"?__non_webpack_require__:require;s=r("ws"),a=r("eventsource")}!H.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:H.isNode&&!t.WebSocket&&s&&(t.WebSocket=s),!H.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:H.isNode&&!t.EventSource&&typeof a<"u"&&(t.EventSource=a),this._httpClient=new Bt(t.httpClient||new $t(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||re.Binary,Q.isIn(e,re,"transferFormat"),this._logger.log(v.Debug,`Starting connection with transfer format '${re[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(v.Error,t),await this._stopPromise,Promise.reject(new ue(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(v.Error,t),Promise.reject(new ue(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new Fe(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(v.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(v.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(v.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(v.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===J.WebSockets)this.transport=this._constructTransport(J.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let s=null,a=0;do{if(s=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new ue("The connection was stopped during negotiation.");if(s.error)throw new Error(s.error);if(s.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(s.url&&(t=s.url),s.accessToken){const r=s.accessToken;this._accessTokenFactory=()=>r,this._httpClient._accessToken=r,this._httpClient._accessTokenFactory=void 0}a++}while(s.url&&a<ze);if(a===ze&&s.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,s,e)}this.transport instanceof qe&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(v.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(s){return this._logger.log(v.Error,"Failed to start the connection: "+s),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(s)}}async _getNegotiationResponse(e){const t={},[s,a]=ye();t[s]=a;const r=this._resolveNegotiateUrl(e);this._logger.log(v.Debug,`Sending negotiation request: ${r}.`);try{const n=await this._httpClient.post(r,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(n.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${n.statusCode}'`));const i=JSON.parse(n.content);return(!i.negotiateVersion||i.negotiateVersion<1)&&(i.connectionToken=i.connectionId),i.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new We("Client didn't negotiate Stateful Reconnect but the server did.")):i}catch(n){let i="Failed to complete negotiation with the server: "+n;return n instanceof he&&n.statusCode===404&&(i=i+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(v.Error,i),Promise.reject(new We(i))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,s,a){let r=this._createConnectUrl(e,s.connectionToken);if(this._isITransport(t)){this._logger.log(v.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(r,a),this.connectionId=s.connectionId;return}const n=[],i=s.availableTransports||[];let d=s;for(const c of i){const o=this._resolveTransportOrError(c,t,a,(d==null?void 0:d.useStatefulReconnect)===!0);if(o instanceof Error)n.push(`${c.transport} failed:`),n.push(o);else if(this._isITransport(o)){if(this.transport=o,!d){try{d=await this._getNegotiationResponse(e)}catch(m){return Promise.reject(m)}r=this._createConnectUrl(e,d.connectionToken)}try{await this._startTransport(r,a),this.connectionId=d.connectionId;return}catch(m){if(this._logger.log(v.Error,`Failed to start the transport '${c.transport}': ${m}`),d=void 0,n.push(new mt(`${c.transport} failed: ${m}`,J[c.transport])),this._connectionState!=="Connecting"){const f="Failed to select transport before stop() was called.";return this._logger.log(v.Debug,f),Promise.reject(new ue(f))}}}}return n.length>0?Promise.reject(new ft(`Unable to connect to the server with any of the available transports. ${n.join(" ")}`,n)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case J.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new Mt(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case J.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Lt(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case J.LongPolling:return new qe(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async s=>{let a=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{a=!0}else{this._stopConnection(s);return}a&&this._stopConnection(s)}:this.transport.onclose=s=>this._stopConnection(s),this.transport.connect(e,t)}_resolveTransportOrError(e,t,s,a){const r=J[e.transport];if(r==null)return this._logger.log(v.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Ut(t,r))if(e.transferFormats.map(i=>re[i]).indexOf(s)>=0){if(r===J.WebSockets&&!this._options.WebSocket||r===J.ServerSentEvents&&!this._options.EventSource)return this._logger.log(v.Debug,`Skipping transport '${J[r]}' because it is not supported in your environment.'`),new ut(`'${J[r]}' is not supported in your environment.`,r);this._logger.log(v.Debug,`Selecting transport '${J[r]}'.`);try{return this.features.reconnect=r===J.WebSockets?a:void 0,this._constructTransport(r)}catch(i){return i}}else return this._logger.log(v.Debug,`Skipping transport '${J[r]}' because it does not support the requested transfer format '${re[s]}'.`),new Error(`'${J[r]}' does not support ${re[s]}.`);else return this._logger.log(v.Debug,`Skipping transport '${J[r]}' because it was disabled by the client.`),new pt(`'${J[r]}' is disabled by the client.`,r)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(v.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(v.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(v.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(v.Error,`Connection disconnected with error '${e}'.`):this._logger.log(v.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(v.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(v.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!H.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(v.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const s=new URLSearchParams(t.searchParams);return s.has("negotiateVersion")||s.append("negotiateVersion",this._negotiateVersion.toString()),s.has("useStatefulReconnect")?s.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&s.append("useStatefulReconnect","true"),t.search=s.toString(),t.toString()}}function Ut(l,e){return!l||(e&l)!==0}class Fe{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new $e,this._transportResult=new $e,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new $e),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new $e;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):Fe._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(s){e.reject(s)}}}static _concatBuffers(e){const t=e.map(r=>r.byteLength).reduce((r,n)=>r+n),s=new Uint8Array(t);let a=0;for(const r of e)s.set(new Uint8Array(r),a),a+=r.byteLength;return s.buffer}}class $e{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const jt="json";class Gt{constructor(){this.name=jt,this.version=2,this.transferFormat=re.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=Ae.instance);const s=ne.parse(e),a=[];for(const r of s){const n=JSON.parse(r);if(typeof n.type!="number")throw new Error("Invalid payload.");switch(n.type){case R.Invocation:this._isInvocationMessage(n);break;case R.StreamItem:this._isStreamItemMessage(n);break;case R.Completion:this._isCompletionMessage(n);break;case R.Ping:break;case R.Close:break;case R.Ack:this._isAckMessage(n);break;case R.Sequence:this._isSequenceMessage(n);break;default:t.log(v.Information,"Unknown message type '"+n.type+"' ignored.");continue}a.push(n)}return a}writeMessage(e){return ne.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const Vt={trace:v.Trace,debug:v.Debug,info:v.Information,information:v.Information,warn:v.Warning,warning:v.Warning,error:v.Error,critical:v.Critical,none:v.None};function Wt(l){const e=Vt[l.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${l}`)}class Ht{configureLogging(e){if(Q.isRequired(e,"logging"),Kt(e))this.logger=e;else if(typeof e=="string"){const t=Wt(e);this.logger=new Ce(t)}else this.logger=new Ce(e);return this}withUrl(e,t){return Q.isRequired(e,"url"),Q.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return Q.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new Ke(e):this.reconnectPolicy=e:this.reconnectPolicy=new Ke,this}withServerTimeout(e){return Q.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return Q.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new Ft(this.url,e);return Me.create(t,this.logger||Ae.instance,this.protocol||new Gt,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Kt(l){return l.log!==void 0}class qt{constructor(){b(this,"hubConnection",null);b(this,"isConnected",!1);b(this,"reconnectAttempts",0);b(this,"maxReconnectAttempts",10);b(this,"statusListeners",[]);b(this,"trackingListeners",[]);b(this,"farmerOrderListeners",[]);b(this,"deliveryConfirmedListeners",[]);b(this,"pollingIntervals",new Map);b(this,"pollingCallback",null)}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Ht().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect({nextRetryDelayInMilliseconds:t=>Math.min(1e3*Math.pow(2,t.previousRetryCount),3e4)}).configureLogging(v.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{const s={orderId:t.orderId,status:t.status,message:t.message,timestamp:new Date().toISOString()};this.statusListeners.forEach(a=>a(t.orderId,t.status,t.message)),this.trackingListeners.forEach(a=>a(s))}),this.hubConnection.on("NewOrderForFarmer",t=>{this.farmerOrderListeners.forEach(s=>s(t.orderId,t.productName,t.qtyKg))}),this.hubConnection.on("DeliveryConfirmed",t=>{this.deliveryConfirmedListeners.forEach(s=>s(t.orderId,t.farmerCut,t.driverCut))}),this.hubConnection.on("DriverLocationUpdate",t=>{const s={orderId:t.orderId,status:"PickedUp",message:`Driver is ${t.estimatedMinutes} minutes away`,gpsLat:t.lat,gpsLng:t.lng,estimatedArrivalMin:t.estimatedMinutes,timestamp:new Date().toISOString()};this.trackingListeners.forEach(a=>a(s))}),this.hubConnection.onreconnecting(()=>{this.isConnected=!1,this.reconnectAttempts++,console.log(`SignalR reconnecting (attempt ${this.reconnectAttempts})...`)}),this.hubConnection.onreconnected(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR reconnected successfully"),this.stopAllPolling()}),this.hubConnection.onclose(()=>{this.isConnected=!1,console.log("SignalR connection closed. Activating polling fallback."),this.activatePollingFallback()}),this.hubConnection.start().then(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection failed — using polling fallback",t),this.activatePollingFallback()})}catch{console.log("SignalR unavailable — running in polling mode"),this.activatePollingFallback()}}stopConnection(){this.stopAllPolling(),this.hubConnection&&(this.hubConnection.stop(),this.hubConnection=null,this.isConnected=!1)}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}leaveOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("LeaveOrder",e).catch(console.error),this.stopPollingForOrder(e)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}onOrderTracking(e){return this.trackingListeners.push(e),()=>{this.trackingListeners=this.trackingListeners.filter(t=>t!==e)}}onNewFarmerOrder(e){return this.farmerOrderListeners.push(e),()=>{this.farmerOrderListeners=this.farmerOrderListeners.filter(t=>t!==e)}}onDeliveryConfirmed(e){return this.deliveryConfirmedListeners.push(e),()=>{this.deliveryConfirmedListeners=this.deliveryConfirmedListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,s){this.statusListeners.forEach(a=>a(e,t,s)),this.trackingListeners.forEach(a=>a({orderId:e,status:t,message:s,timestamp:new Date().toISOString()}))}setPollingCallback(e){this.pollingCallback=e}startPollingForOrder(e,t=15e3){if(this.pollingIntervals.has(e))return;const s=setInterval(async()=>{this.pollingCallback&&await this.pollingCallback(e)},t);this.pollingIntervals.set(e,s)}stopPollingForOrder(e){const t=this.pollingIntervals.get(e);t&&(clearInterval(t),this.pollingIntervals.delete(e))}stopAllPolling(){this.pollingIntervals.forEach(e=>clearInterval(e)),this.pollingIntervals.clear()}activatePollingFallback(){}getConnectionState(){return this.isConnected?"connected":this.reconnectAttempts>0&&this.reconnectAttempts<this.maxReconnectAttempts?"reconnecting":this.pollingIntervals.size>0?"polling":"disconnected"}}const me=new qt,oe=class oe{constructor(){b(this,"token",localStorage.getItem("token")||null);b(this,"currentUser",this.loadStoredUser());b(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);b(this,"listeners",[]);b(this,"impersonationOriginalUser",null);b(this,"listings",[]);b(this,"orders",[]);b(this,"reviews",[]);b(this,"notifications",[]);b(this,"standingOrders",[]);b(this,"anomalyAlerts",[]);b(this,"kycQueue",[]);b(this,"verificationQueue",[]);b(this,"agentRegisteredFarmers",[]);b(this,"regionalAnalytics",[]);b(this,"priceBenchmarks",[]);b(this,"offlineQueue",[]);b(this,"isOfflineMode",!1);b(this,"banners",[]);b(this,"accountData",{addresses:[],paymentMethods:[],coupons:[],notificationPreferences:[],sessions:[],twoFactor:null});b(this,"rolePermissions",this.loadStoredRolePermissions());b(this,"deletedUserIds",this.loadDeletedUsers());b(this,"allUsers",[]);b(this,"platformConfig",{farmerSharePercent:90,driverSharePercent:5,platformFeePercent:5,withholdingTaxPercent:2,vatOnCommissionPercent:15,highValuePayoutThresholdEtb:5e4,emergencyEscrowFrozen:!1,telebirrAppId:"",telebirrShortCode:"",telebirrApiKey:"",telebirrEscrowVaultKey:"",twilioAccountSid:"",twilioAuthToken:"",twilioFromNumber:"",mapsGeocodingApiKey:"",postgisSpatialIndexEnabled:!0});b(this,"systemAuditLogs",[]);b(this,"deliveryZones",[]);b(this,"featureFlags",[]);b(this,"payoutApprovals",[]);b(this,"globalBusinessRules",{minOrderKg:10,maxOrderKg:5e4,maxDistanceKm:450,priceFloorVariancePercent:-30,priceCeilingVariancePercent:250,requireFaydaForOrdersAboveKg:500,autoArbitrateAfterHours:48});b(this,"blacklist",[]);b(this,"farmerSummary",{totalEarnedEtb:48200,pendingEscrowEtb:14850,releasedEtb:48200,completedOrdersCount:18,pendingOrdersCount:1,totalWithholdingTaxPaidEtb:964});b(this,"driverSummary",{totalEarnedEtb:6450,pendingEtb:825,deliveredTripsCount:14,ruralBonusEtb:1250});b(this,"platformStats",{totalUsers:6,totalFarmers:3,totalBuyers:1,totalDrivers:1,totalListings:6,totalOrders:3,totalTransactionVolumeEtb:34500,totalPlatformCommissionEtb:1725,activeEscrowHeldEtb:25500,disputedOrdersCount:1,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:258.75,totalWithholdingReportedEtb:690});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}loadDeletedUsers(){try{const e=localStorage.getItem("farmerMarketDeletedUsers");if(e){const t=JSON.parse(e);if(Array.isArray(t))return new Set(t.map(s=>String(s).toLowerCase().replace(/\s+/g,"")))}}catch(e){console.warn("Failed to load deleted users list",e)}return new Set}saveDeletedUsers(){try{localStorage.setItem("farmerMarketDeletedUsers",JSON.stringify(Array.from(this.deletedUserIds)))}catch(e){console.warn("Failed to save deleted users list",e)}}isDeletedUser(e,t){if(e&&this.deletedUserIds.has(e.toLowerCase()))return!0;if(t){const s=t.toLowerCase().replace(/\s+/g,"");if(this.deletedUserIds.has(s))return!0;const a=s.replace(/\D/g,"");if(a&&this.deletedUserIds.has(a))return!0}return!1}async init(){this.loadOfflineQueue(),this.initDefaultData(),this.token&&await this.fetchMe(),await this.refreshAllData(),this.token&&await this.fetchAccountData()}initDefaultData(){this.priceBenchmarks=[{cropName:"Fresh Sholla Red Tomatoes",cropNameAm:"ቀይ ቲማቲም",marketName:"Merkato Wholesale / Sholla",minPriceEtb:38,avgPriceEtb:45,maxPriceEtb:52,trend:"Down",lastUpdated:"Today 6:00 AM"},{cropName:"Organic Magna White Teff",cropNameAm:"የማኛ ነጭ ጤፍ",marketName:"EABC / Addis Depot",minPriceEtb:108,avgPriceEtb:115,maxPriceEtb:125,trend:"Up",lastUpdated:"Today 7:30 AM"},{cropName:"Awash Valley Red Onions",cropNameAm:"ቀይ ሽንኩርት",marketName:"Adama Wholesale Market",minPriceEtb:48,avgPriceEtb:55,maxPriceEtb:62,trend:"Stable",lastUpdated:"Today 6:15 AM"},{cropName:"Hawassa Hass Avocados",cropNameAm:"ሀስ አቮካዶ",marketName:"Hawassa Central / Merkato",minPriceEtb:50,avgPriceEtb:60,maxPriceEtb:72,trend:"Up",lastUpdated:"Today 8:00 AM"},{cropName:"Specialty Green Coffee Beans",cropNameAm:"ስፔሻሊቲ ቡና",marketName:"ECX Central Exchange",minPriceEtb:340,avgPriceEtb:380,maxPriceEtb:420,trend:"Up",lastUpdated:"Yesterday"},{cropName:"Bishoftu Sweet Strawberries",cropNameAm:"የቢሾፍቱ እንጆሪ",marketName:"Bole Fresh Produce Hub",minPriceEtb:85,avgPriceEtb:95,maxPriceEtb:110,trend:"Stable",lastUpdated:"Today 7:00 AM"}],this.standingOrders=[{id:"so-1",listingId:"a1b2c3d4-0001-0000-0000-000000000001",productName:"Fresh Sholla Red Tomatoes",productNameAm:"የሾላ ቀይ ቲማቲም",farmerName:"Abebe Bekele",qtyKg:150,pricePerKg:45,frequency:"Weekly",nextDeliveryDate:"Next Monday, 8:00 AM",active:!0,createdAt:new Date().toISOString()},{id:"so-2",listingId:"a1b2c3d4-0003-0000-0000-000000000003",productName:"Awash Valley Red Onions",productNameAm:"የአዋሽ ቀይ ሽንኩርት",farmerName:"Abebe Bekele",qtyKg:200,pricePerKg:55,frequency:"Bi-Weekly",nextDeliveryDate:"Next Thursday, 9:00 AM",active:!0,createdAt:new Date().toISOString()}],this.anomalyAlerts=[{id:"ANOM-101",severity:"High",type:"PriceManipulation",title:"Unusual Price Spike Detected",description:"Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",entityType:"Listing",entityId:"a1b2c3d4-0001-0000-0000-000000000001",detectedAt:"35 mins ago"},{id:"ANOM-102",severity:"Medium",type:"DuplicateProofPhoto",title:"Driver Proof Image Hash Match",description:"Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",entityType:"Order",entityId:"b1b2c3d4-0002-0000-0000-000000000002",detectedAt:"2 hours ago"},{id:"ANOM-103",severity:"Low",type:"FakeAccount",title:"Rapid Registration Cluster",description:"Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",entityType:"User",entityId:"44444444-4444-4444-4444-444444444444",detectedAt:"5 hours ago"}],this.kycQueue=[{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede (Driver)",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",documentType:"Commercial Vehicle Logbook & License",documentNumber:"ET-LOG-5T-98214",tinNumber:"TIN-DRV-981244",kycTier:3,status:"Pending",submittedAt:"Yesterday"},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele (Farmer)",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",documentType:"National ID (Fayda)",documentNumber:"FAYDA-ET-8829104",tinNumber:"TIN-FARM-882910",kycTier:2,status:"Verified",submittedAt:"3 days ago"},{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu (Farmer)",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",documentType:"National ID (Fayda)",documentNumber:"FAN-8812-4091-2810",tinNumber:"0099881122",kycTier:2,status:"Pending",submittedAt:"1 day ago"},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu (Farmer)",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",documentType:"Kebele Smallholder ID",documentNumber:"HAW-KEB-4410",kycTier:1,status:"Pending",submittedAt:"12 hours ago"}],this.verificationQueue=[{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu",userNameAm:"ግርማ ወንዲሙ",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",registrationMethod:"Agent",registeredByAgentName:"Kassahun Tolessa (Field Agent)",verificationStatus:"UnderReview",tinNumber:"0099881122",registeredAt:"Yesterday 4:15 PM",documents:[{id:"doc-1",userId:"88888888-8888-8888-8888-888888888888",documentType:"FaydaId",documentNumber:"FAN-8812-4091-2810",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"},{id:"doc-2",userId:"88888888-8888-8888-8888-888888888888",documentType:"TinCertificate",documentNumber:"0099881122",frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"}],reviews:[]},{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede",userNameAm:"ዳዊት ከበደ",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:"TIN-DRV-981244",registeredAt:"2 days ago",documents:[{id:"doc-3",userId:"55555555-5555-5555-5555-555555555555",documentType:"VehicleLogbook",documentNumber:"ET-LOG-5T-98214",frontImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"2 days ago"}],reviews:[]},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu",userNameAm:"ጫላ ገመቹ",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",registrationMethod:"Self",verificationStatus:"UnderReview",registeredAt:"3 days ago",documents:[{id:"doc-4",userId:"33333333-3333-3333-3333-333333333333",documentType:"KebeleId",documentNumber:"HAW-KEB-4410",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"3 days ago"}],reviews:[]},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele",userNameAm:"አበበ በቀለ",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",registrationMethod:"Self",verificationStatus:"Approved",tinNumber:"TIN-FARM-882910",registeredAt:"1 month ago",documents:[{id:"doc-5",userId:"11111111-1111-1111-1111-111111111111",documentType:"FaydaId",documentNumber:"FAYDA-ET-8829104",status:"Approved",submittedAt:"1 month ago"}],reviews:[{id:"rev-1",userId:"11111111-1111-1111-1111-111111111111",reviewerName:"Sara Mengistu",actionTaken:"Approved",notes:"National ID and Bishoftu farm registry confirmed.",timestamp:"1 month ago"}]}],this.agentRegisteredFarmers=[{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",kebele:"Ada'a Kebele 04",primaryCrop:"Magna Teff & Tomatoes",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",status:"UnderReview",registeredAt:"Yesterday 4:15 PM",faydaFrontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",status:"Approved",registeredAt:"5 days ago"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",status:"Approved",registeredAt:"1 week ago"}],this.regionalAnalytics=[{region:"Oromia (East Shewa / Bishoftu)",smallholdersCount:4200,volumeMetricTons:68.5,totalGmvEtb:385e4,topCrop:"Tomatoes & Onions"},{region:"Amhara (Debre Berhan / Gojjam)",smallholdersCount:3100,volumeMetricTons:42,totalGmvEtb:483e4,topCrop:"Magna White Teff"},{region:"Sidama (Hawassa / Yirgalem)",smallholdersCount:1950,volumeMetricTons:24.8,totalGmvEtb:1488e3,topCrop:"Hass Avocados & Fruits"},{region:"SNNPR (Gedeo / Yirgacheffe)",smallholdersCount:1400,volumeMetricTons:10.5,totalGmvEtb:399e4,topCrop:"Specialty Green Coffee"}],this.allUsers=[{id:"00000000-0000-0000-0000-000000000001",name:"Dr. Dawit Haile (Super Admin)",nameAm:"ዶ/ር ዳዊት ኃይሌ",phone:"+251900000001",role:"superadmin",region:"Addis Ababa (Headquarters)",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-01-01"},{id:"66666666-6666-6666-6666-666666666666",name:"Sara Mengistu (Marketplace Admin)",nameAm:"ሳራ መንግስቱ",phone:"+251900112233",role:"admin",region:"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-03-15"},{id:"77777777-7777-7777-7777-777777777777",name:"Kassahun Tolessa (Field Agent)",nameAm:"ካሳሁን ቶለሳ",phone:"+251988776655",role:"agent",region:"Oromia (East Shewa / Bishoftu)",verified:!0,verificationStatus:"Approved",status:"active",tinNumber:"TIN-AG-881920",createdAt:"2025-04-10"},{id:"11111111-1111-1111-1111-111111111111",name:"Abebe Bekele",nameAm:"አበበ በቀለ",phone:"+251911223344",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Fresh Sholla Tomatoes",faydaId:"FAN-1122-3344-5566",tinNumber:"0011223344",walletBalanceEtb:48200,createdAt:"2025-02-01"},{id:"22222222-2222-2222-2222-222222222222",name:"Almaz Tadesse",nameAm:"አልማዝ ታደሰ",phone:"+251922334455",role:"farmer",region:"Amhara (Debre Berhan / Basona)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Organic Magna White Teff",faydaId:"FAN-2233-4455-6677",tinNumber:"0022334455",walletBalanceEtb:62400,createdAt:"2025-02-15"},{id:"33333333-3333-3333-3333-333333333333",name:"Chala Gemechu",nameAm:"ጫላ ገመቹ",phone:"+251933445566",role:"farmer",region:"Sidama (Hawassa / Wondo Genet)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Hawassa Hass Avocados",faydaId:"FAN-3344-5566-7788",tinNumber:"0033445566",walletBalanceEtb:39100,createdAt:"2025-03-01"},{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!1,verificationStatus:"UnderReview",status:"active",primaryCrop:"Magna Teff",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",createdAt:"2026-08-20"},{id:"44444444-4444-4444-4444-444444444444",name:"Bethlehem Tsegaye",nameAm:"ቤተልሔም ፀጋዬ",phone:"+251912345678",role:"buyer",region:"Addis Ababa (Bole Sub-City)",verified:!0,verificationStatus:"Approved",status:"active",businessLicenseNumber:"BL-AA-998812",tinNumber:"0044556677",createdAt:"2025-01-20"},{id:"55555555-5555-5555-5555-555555555555",name:"Dawit Kebede (Freight Logistics)",nameAm:"ዳዊት ከበደ",phone:"+251977889900",role:"driver",region:"Addis Ababa / Oromia Freight Corridor",verified:!0,verificationStatus:"Approved",status:"active",vehicleType:"Isuzu 5-Ton Refrigerated",vehicleCapacityKg:5e3,refrigerationType:"Ventilated & Insulated",walletBalanceEtb:6450,createdAt:"2025-02-10"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",role:"farmer",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-04-12"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",role:"farmer",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-04-15"}];const e=localStorage.getItem("farmerMarketAllUsers");let t=[];if(e)try{const c=JSON.parse(e);Array.isArray(c)&&c.length>0&&(t=c)}catch(c){console.warn("Could not parse stored users, using default seed",c)}if(t.length>0){const c=[...this.allUsers],o=[...t];c.forEach(m=>{const f=m.phone.replace(/\s+/g,"");!this.isDeletedUser(m.id,f)&&!o.some(x=>x.id===m.id||x.phone.replace(/\s+/g,"")===f)&&o.push(m)}),this.allUsers=o.filter(m=>!this.isDeletedUser(m.id,m.phone))}else this.allUsers=this.allUsers.filter(c=>!this.isDeletedUser(c.id,c.phone));const s=[{id:"banner-01",title:"Fresh Harvest Direct From Bishoftu & Hawassa",titleAm:"የቢሾፍቱ እና የሀዋሳ አዳዲስ ምርቶች በቀጥታ ከእርሻ",subtitle:"Order Grade-A Teff, Organic Tomatoes & Hass Avocados directly from verified smallholder farmers with 100% Telebirr Escrow protection.",subtitleAm:"ከደላላ ጣልቃ ገብነት ነፃ የሆኑ ምርጥ የማኛ ጤፍ፣ የቢሾፍቱ ቀይ ቲማቲም እና ሀስ አቮካዶ በቴሌብር የዋስትና ክፍያ ያግኙ።",badgeText:"Harvest Season 2026",badgeTextAm:"የ2018 ምርት ወቅት",imageUrl:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",targetAudience:"Buyer",targetRegion:"All",ctaText:"Browse Marketplace",ctaTextAm:"ገበያውን ይመልከቱ",ctaLink:"marketplace",themeGradient:"from-emerald-900 via-teal-900 to-slate-900",priority:10,isActive:!0,createdAt:"2026-08-20",createdBy:"Dr. Dawit Haile (Super Admin)"},{id:"banner-02",title:"National Smallholder Fayda ID & TIN Onboarding",titleAm:"የአነስተኛ አርሶ አደሮች የፋይዳ (Fayda ID) እና TIN ምዝገባ",subtitle:"Verify your digital national ID to unlock instant 90% direct payouts, MOR tax withholding exemptions, and local extension agent farm visits.",subtitleAm:"ምርቶን በቀጥታ ለጅምላ ገዢዎች ለመሸጥ እና ክፍያ በቴሌብር ለመቀበል የፋይዳ መታወቂያዎን አሁኑኑ ያረጋግጡ።",badgeText:"Legal Compliance",badgeTextAm:"ህጋዊ ማረጋገጫ",imageUrl:"https://images.unsplash.com/photo-1592417817098-8f3d6910a711?auto=format&fit=crop&q=80&w=1200",targetAudience:"Farmer",targetRegion:"All",ctaText:"Verify Identity Now",ctaTextAm:"መታወቂያዎን ያረጋግጡ",ctaLink:"farmer",themeGradient:"from-blue-900 via-indigo-950 to-slate-900",priority:8,isActive:!0,createdAt:"2026-08-22",createdBy:"Sara Mengistu (Admin)"},{id:"banner-03",title:"Cold Chain Freight Route Subsidies: Modjo - Addis Corridor",titleAm:"የማቀዝቀዣ የጭነት ማጓጓዣ ድጋፍ፡ የሞጆ-አዲስ አበባ መስመር",subtitle:"Verified 5-ton & 10-ton refrigerated truck drivers earn guaranteed 5% escrow share with instant fuel advance and digital waybill tracking.",subtitleAm:"የተረጋገጡ የጭነት ሹፌሮች የ5% የዋስትና ክፍያ እና ዲጂታል የመንገድ ማረጋገጫ ወዲያውኑ ያገኛሉ።",badgeText:"Logistics Incentive",badgeTextAm:"የሎጂስቲክስ ማበረታቻ",imageUrl:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",targetAudience:"Driver",targetRegion:"Oromia",ctaText:"View Available Dispatches",ctaTextAm:"የተዘጋጁ ጭነቶችን ይመልከቱ",ctaLink:"driver",themeGradient:"from-amber-900 via-orange-950 to-slate-900",priority:7,isActive:!0,createdAt:"2026-08-25",createdBy:"Sara Mengistu (Admin)"}],a=localStorage.getItem("farmerMarketBanners");if(a)try{const c=JSON.parse(a);Array.isArray(c)&&c.length>0?this.banners=c:this.banners=s}catch{this.banners=s}else this.banners=s;this.systemAuditLogs=[{id:"log-101",actorId:"00000000-0000-0000-0000-000000000001",actorName:"Dr. Dawit Haile (Super Admin)",actorRole:"superadmin",action:"INITIALIZE_PLATFORM_GOVERNANCE",category:"CONFIG",targetResource:"PlatformConfig",targetId:"ESCROW-90-5-5",ipAddress:"196.188.12.45 (Addis Ababa, Ethio Telecom)",userAgent:"Antigravity/2.0 Web Admin Engine",details:"Established baseline 90/5/5 escrow split, 15% VAT on platform fee, and MOR withholding tax schedule.",timestamp:"2026-08-23 08:30 AM"},{id:"log-102",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"APPROVE_KYC_VERIFICATION",category:"USER_CRUD",targetResource:"UserDocument",targetId:"11111111-1111-1111-1111-111111111111",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Approved Abebe Bekele Fayda National ID (FAN-1122-3344-5566) and TIN (0011223344).",timestamp:"2026-08-23 10:15 AM"},{id:"log-103",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"DISPUTE_ARBITRATION_DECREE",category:"DISPUTE",targetResource:"Order",targetId:"ord-dispute-001",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Resolved moisture defect dispute with 50/50 partial split under EABC arbitration rules.",timestamp:"2026-08-23 11:45 AM"}],this.deliveryZones=[{id:"zone-1",name:"Oromia East Shewa Hub",nameAm:"ምስራቅ ሸዋ የግብርና ኮሪደር",centerLatitude:8.7522,centerLongitude:38.9785,baseRadiusKm:45,maxRadiusKm:120,ruralSubsidyEtb:150,active:!0,clusterHubName:"Bishoftu & Mojo Freight Terminal",smallholdersCount:4200},{id:"zone-2",name:"Addis Ababa Central Wholesale Depot",nameAm:"አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ",centerLatitude:9.0222,centerLongitude:38.7468,baseRadiusKm:25,maxRadiusKm:60,ruralSubsidyEtb:0,active:!0,clusterHubName:"Merkato & Jan Meda Distribution",smallholdersCount:850},{id:"zone-3",name:"Amhara Highland Grain Basin",nameAm:"የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ",centerLatitude:9.68,centerLongitude:39.53,baseRadiusKm:60,maxRadiusKm:180,ruralSubsidyEtb:250,active:!0,clusterHubName:"Debre Berhan & Shewa Robit Hub",smallholdersCount:3100},{id:"zone-4",name:"Sidama Rift Fruit & Vegetable Zone",nameAm:"የሲዳማ ፍራፍሬ እና አትክልት ዞን",centerLatitude:7.0504,centerLongitude:38.4955,baseRadiusKm:50,maxRadiusKm:150,ruralSubsidyEtb:200,active:!0,clusterHubName:"Hawassa Lakeview Terminal",smallholdersCount:1950},{id:"zone-5",name:"SNNPR Gedeo Specialty Coffee Zone",nameAm:"የጌዴኦ ስፔሻሊቲ ቡና ዞን",centerLatitude:6.1628,centerLongitude:38.2045,baseRadiusKm:40,maxRadiusKm:140,ruralSubsidyEtb:300,active:!0,clusterHubName:"Yirgacheffe Washing Station Depot",smallholdersCount:1400},{id:"zone-6",name:"Tigray Northern Transit Hub",nameAm:"የትግራይ ሰሜናዊ የንግድ ኮሪደር",centerLatitude:13.4967,centerLongitude:39.4753,baseRadiusKm:55,maxRadiusKm:160,ruralSubsidyEtb:350,active:!0,clusterHubName:"Mekelle Central Depot",smallholdersCount:1100}],this.featureFlags=[{key:"advance_harvest",name:"Advance Harvest Pre-Ordering",description:"Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","buyer","admin","superadmin"]},{key:"voice_note_transcription",name:"Voice Note Audio Memos & AI Transcription",description:"Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent","admin","superadmin"]},{key:"dynamic_price_benchmarking",name:"Real-time Wholesale Depot Price Benchmarking",description:"Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["buyer","farmer","superadmin"]},{key:"ussd_offline_gateway",name:"USSD Offline Gateway (*990# / *805#)",description:"Permits feature phone registration, balance checks, and SMS listing fallbacks.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent"]},{key:"multisig_escrow_protection",name:"High-Value Escrow Multi-Sig Authorization",description:"Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["admin","superadmin"]}],this.payoutApprovals=[{id:"payout-appr-001",recipientId:"22222222-2222-2222-2222-222222222222",recipientName:"Almaz Tadesse (Basona Teff Cooperative)",recipientPhone:"+251922334455",recipientRole:"farmer",amountEtb:62400,walletBalanceBefore:62400,riskScore:"Low",triggerReason:"Exceeds 50,000 ETB platform threshold (100 Quintals Teff Settlement)",status:"Pending",requestedAt:"Today 10:45 AM"},{id:"payout-appr-002",recipientId:"55555555-5555-5555-5555-555555555555",recipientName:"Dawit Kebede (Bulk Freight Fleet)",recipientPhone:"+251977889900",recipientRole:"driver",amountEtb:54200,walletBalanceBefore:54200,riskScore:"Medium",triggerReason:"High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips)",status:"Pending",requestedAt:"Today 01:20 PM"}],this.blacklist=[{id:"bl-01",type:"Phone",value:"+251911999888",reason:"Repeated fraudulent non-delivery claims in Adama market",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-15",active:!0},{id:"bl-02",type:"NationalId",value:"FAN-9999-0000-1111",reason:"Forged Kebele farming certification and duplicate TIN submission",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-18",active:!0}];const r=[{id:"rev-001",orderId:"b1b2c3d4-0001-0000-0000-000000000001",reviewerId:"44444444-4444-4444-4444-444444444444",reviewerName:"Bethlehem Tsegaye (FreshMart Wholesale)",reviewerRole:"buyer",revieweeId:"11111111-1111-1111-1111-111111111111",revieweeName:"Abebe Bekele",rating:5,comment:"Outstanding tomatoes! Freshly harvested from Bishoftu farm, zero transit bruises, and exact weight. Will reorder weekly with Telebirr escrow.",quickTags:["🌾 Fresh Produce","📦 Great Packaging","⏱️ Fast Dispatch","🌿 Grade-A Quality"],createdAt:"Yesterday 2:30 PM"},{id:"rev-002",orderId:"b1b2c3d4-0002-0000-0000-000000000002",reviewerId:"44444444-4444-4444-4444-444444444444",reviewerName:"FreshMart Bole Depot",reviewerRole:"buyer",revieweeId:"11111111-1111-1111-1111-111111111111",revieweeName:"Abebe Bekele",rating:5,comment:"Excellent communication and quality Grade-1 tomatoes. Escrow release was fast and driver arrived on time.",quickTags:["🤝 Polite & Responsive","🌿 Grade-A Quality","💰 Great Price"],createdAt:"3 days ago"},{id:"rev-003",orderId:"b1b2c3d4-0003-0000-0000-000000000003",reviewerId:"44444444-4444-4444-4444-444444444444",reviewerName:"Addis Agro Processing",reviewerRole:"buyer",revieweeId:"22222222-2222-2222-2222-222222222222",revieweeName:"Almaz Tadesse",rating:5,comment:"Magna white teff quality is unmatched in Addis. Clean, stone-free, and well bagged with official waybill.",quickTags:["🌿 Grade-A Quality","🌾 Fresh Produce","📦 Great Packaging"],createdAt:"5 days ago"},{id:"rev-004",orderId:"b1b2c3d4-0004-0000-0000-000000000004",reviewerId:"44444444-4444-4444-4444-444444444444",reviewerName:"Kaliti Juice & Fresh Hub",reviewerRole:"buyer",revieweeId:"33333333-3333-3333-3333-333333333333",revieweeName:"Chala Gemechu",rating:4,comment:"Great ripe Hass avocados. Fast freight transit from Hawassa corridor. Very satisfied with the harvest grade.",quickTags:["⏱️ Fast Dispatch","💰 Great Price","🌾 Fresh Produce"],createdAt:"1 week ago"}],n=localStorage.getItem("farmerMarketReviews");if(n)try{const c=JSON.parse(n);Array.isArray(c)&&c.length>0?this.reviews=c:this.reviews=r}catch{this.reviews=r}else this.reviews=r;const i=[{id:"notif-b-1",userId:"44444444-4444-4444-4444-444444444444",type:"order",channel:"sms",messageEn:"🌾 [Order Confirmed] Farmer Abebe Bekele confirmed your 150 kg Tomato order. Farm dispatch in progress.",messageAm:"🌾 [ትዕዛዝ ተረጋግጧል] አርሶ አደር አበበ በቀለ የ 150 ኪ.ግ ቲማቲም ትዕዛዝዎን አረጋግጠዋል። ማጓጓዝ ተጀምሯል።",read:!1,createdAt:new Date(Date.now()-18e5).toISOString()},{id:"notif-b-2",userId:"44444444-4444-4444-4444-444444444444",type:"refund",channel:"in_app",messageEn:"💰 [Telebirr Escrow Refund] Admin approved a Full Refund of 4,500 ETB for Order #B1B2C3D4. Funds credited to your Telebirr wallet.",messageAm:"💰 [የቴሌብር ተመላሽ ገንዘብ] አስተዳዳሪው ለትዕዛዝ #B1B2C3D4 የ 4,500 ብር ሙሉ ተመላሽ አጽድቀዋል። ገንዘቡ ወደ ቴሌብር ሂሳብዎ ገብቷል።",read:!1,createdAt:new Date(Date.now()-72e5).toISOString()},{id:"notif-b-3",userId:"44444444-4444-4444-4444-444444444444",type:"dispatch",channel:"sms",messageEn:"🚚 [Freight GPS Update] Driver Dawit is 15 minutes away from your Bole distribution depot.",messageAm:"🚚 [የጭነት መገኛ መረጃ] አሽከርካሪ ዳዊት ወደ ቦሌ ማዕከልዎ ለመድረስ 15 ደቂቃ ይቀረዋል።",read:!0,createdAt:new Date(Date.now()-144e5).toISOString()},{id:"notif-f-1",userId:"11111111-1111-1111-1111-111111111111",type:"order",channel:"sms",messageEn:"🌾 [New Wholesale Order] FreshMart Bole placed an order for 200 kg Red Tomatoes (9,000 ETB). Please confirm harvest readiness.",messageAm:"🌾 [አዲስ የጅምላ ትዕዛዝ] ፍሬሽማርት ቦሌ ለ 200 ኪ.ግ ቀይ ቲማቲም (ብር 9,000) ትዕዛዝ ሰጥተዋል። እባክዎ ያረጋግጡ።",read:!1,createdAt:new Date(Date.now()-9e5).toISOString()},{id:"notif-f-2",userId:"11111111-1111-1111-1111-111111111111",type:"review",channel:"in_app",messageEn:'⭐ [New 5-Star Rating] Buyer Bethlehem left a verified 5★ rating: "Outstanding tomatoes! Freshly harvested and zero transit bruises."',messageAm:'⭐ [አዲስ 5-ኮከብ ደረጃ] ደንበኛ ቤተልሔም የ 5★ ደረጃ ሰጥተውዎታል፡ "እጅግ በጣም ምርጥ ቲማቲም! ትኩስ እና ጥራት ያለው።"',read:!1,createdAt:new Date(Date.now()-36e5).toISOString()},{id:"notif-f-3",userId:"11111111-1111-1111-1111-111111111111",type:"payout",channel:"sms",messageEn:"💰 [Telebirr Payout Received] 48,200 ETB (90% produce share) deposited to your Telebirr wallet for completed deliveries.",messageAm:"💰 [የቴሌብር ክፍያ ገቢ ሆነ] ብር 48,200 (90% የምርት ዋጋ) ለተጠናቀቁ ትዕዛዞች ወደ ቴሌብር ሂሳብዎ ገብቷል።",read:!0,createdAt:new Date(Date.now()-864e5).toISOString()},{id:"notif-f-4",userId:"11111111-1111-1111-1111-111111111111",type:"kyc",channel:"in_app",messageEn:"🛡️ [Fayda KYC Verified] Your Kebele farming certification and National ID have been approved. Verified Producer badge activated!",messageAm:"🛡️ [የፋይዳ ማረጋገጫ ጸድቋል] የቀበሌ እርሻ ማረጋገጫዎ እና ብሔራዊ መታወቂያዎ ጸድቋል። የተረጋገጠ አምራች ባጅ ነቅቷል!",read:!0,createdAt:new Date(Date.now()-1728e5).toISOString()},{id:"notif-d-1",userId:"55555555-5555-5555-5555-555555555555",type:"dispatch",channel:"in_app",messageEn:"🚚 [New Freight Route] Bishoftu → Addis Ababa East Shewa multi-farm route ready for pickup. Commission: 1,450 ETB + 350 ETB rural subsidy.",messageAm:"🚚 [አዲስ የጉዞ መስመር] የቢሾፍቱ → አዲስ አበባ የጭነት መስመር ተዘጋጅቷል። ኮሚሽን፡ ብር 1,450 + ብር 350 ድጎማ።",read:!1,createdAt:new Date(Date.now()-12e5).toISOString()},{id:"notif-d-2",userId:"55555555-5555-5555-5555-555555555555",type:"payout",channel:"sms",messageEn:"💰 [Trip Settlement] 5% freight fee (650 ETB) credited to Telebirr wallet for verified GPS drop-off.",messageAm:"💰 [የጉዞ ክፍያ] 5% የትራንስፖርት ክፍያ (ብር 650) በ GPS ለተረጋገጠ ርክክብ ወደ ቴሌብር ሂሳብዎ ገብቷል።",read:!0,createdAt:new Date(Date.now()-108e5).toISOString()},{id:"notif-a-1",userId:"99999999-9999-9999-9999-999999999999",type:"admin_alert",channel:"in_app",messageEn:"🛡️ [KYC Verification Queue] 3 new smallholder farmers submitted Kebele certifications for Fayda validation.",messageAm:"🛡️ [የማረጋገጫ ወረፋ] 3 አዳዲስ አርሶ አደሮች የቀበሌ ማረጋገጫ ሰነዶችን አቅርበዋል።",read:!1,createdAt:new Date(Date.now()-6e5).toISOString()},{id:"notif-a-2",userId:"99999999-9999-9999-9999-999999999999",type:"dispute",channel:"in_app",messageEn:"⚖️ [Legal Arbitration Closed] Order #B1B2C3D4 dispute arbitrated. Full refund executed via Telebirr API.",messageAm:"⚖️ [የግልግል ዳኝነት ተጠናቀቀ] ለትዕዛዝ #B1B2C3D4 የተደረገው ክርክር ተጠናቆ ተመላሽ ተደርጓል።",read:!0,createdAt:new Date(Date.now()-54e5).toISOString()}],d=localStorage.getItem("farmerMarketNotifications");if(d)try{const c=JSON.parse(d);if(Array.isArray(c)&&c.length>0){const o=[...c];i.forEach(m=>{o.some(f=>f.id===m.id||f.userId===m.userId&&f.messageEn===m.messageEn)||o.push(m)}),this.notifications=o}else this.notifications=i}catch{this.notifications=i}else this.notifications=i}saveNotificationsToStorage(){try{localStorage.setItem("farmerMarketNotifications",JSON.stringify(this.notifications))}catch(e){console.warn("Failed to save notifications to storage",e)}}saveReviewsToStorage(){try{localStorage.setItem("farmerMarketReviews",JSON.stringify(this.reviews))}catch(e){console.warn("Failed to save reviews to storage",e)}}loadOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");e&&(this.offlineQueue=JSON.parse(e))}catch{this.offlineQueue=[]}}saveOfflineQueue(){localStorage.setItem("offlineQueue",JSON.stringify(this.offlineQueue))}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),s=t.verificationStatus||(t.verified?"Approved":"PendingSubmission"),a={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,email:t.email,languagePreference:t.languagePreference,savedDeliveryAddress:t.savedDeliveryAddress,defaultDeliveryLat:t.defaultDeliveryLat,defaultDeliveryLng:t.defaultDeliveryLng,role:(t.role||"buyer").toLowerCase(),region:t.region,verified:t.verified??s==="Approved",verificationStatus:s,rejectionReason:t.rejectionReason,tinNumber:t.tinNumber||(s==="Approved"&&t.role==="buyer"?"TIN-ET-9912001":void 0),businessLicenseNumber:t.businessLicenseNumber||(s==="Approved"?"MOT-LIC-2026-98124":void 0),vehicleType:t.vehicleType||(t.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:t.refrigerationType||(t.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:t.vehicleCapacityKg||(t.role==="driver"?5e3:void 0),kycDocumentType:t.kycDocumentType||(s==="Approved"?"National ID (Fayda)":void 0),kycDocumentNumber:t.kycDocumentNumber,kycStatus:s==="Approved"?"Verified":"Pending",kycTier:t.kycTier||2,repeatBuyerCount:t.repeatBuyerCount||(t.role==="farmer"?14:void 0),onTimeDeliveryRate:t.onTimeDeliveryRate||(t.role==="farmer"||t.role==="driver"?99:void 0),walletBalanceEtb:t.walletBalanceEtb??0,createdAt:t.createdAt};return this.currentUser=a,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(a)),this.notify(),a}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async updateProfile(e){if(!this.token)throw new Error("You must be signed in to update your profile.");const t=await fetch("/api/auth/profile",{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({Name:e.name,NameAm:e.nameAm||null,Region:e.region,Email:e.email||null,LanguagePreference:e.languagePreference||null,SavedDeliveryAddress:e.savedDeliveryAddress||null,DefaultDeliveryLat:e.defaultDeliveryLat??null,DefaultDeliveryLng:e.defaultDeliveryLng??null})}),s=await t.json().catch(()=>({}));if(!t.ok)throw new Error(s.error||"Could not save your profile.");return await this.fetchMe(),this.currentUser}async changePassword(e,t){if(!this.token)throw new Error("You must be signed in to change your password.");const s=await fetch("/api/auth/change-password",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({currentPassword:e,newPassword:t})}),a=await s.json().catch(()=>({}));if(!s.ok)throw new Error(a.error||"Could not change your password.")}async accountRequest(e,t){const s=await fetch(`/api/account/${e}`,{...t,headers:{...this.getAuthHeaders(),...(t==null?void 0:t.headers)||{}}}),a=await s.json().catch(()=>null);if(!s.ok)throw new Error((a==null?void 0:a.error)||"Account request failed.");return a}async fetchAccountData(){if(!this.token)return this.accountData;const[e,t,s,a,r,n]=await Promise.all([this.accountRequest("addresses"),this.accountRequest("payment-methods"),this.accountRequest("coupons"),this.accountRequest("notification-preferences"),this.accountRequest("sessions"),this.accountRequest("two-factor")]);return this.accountData={addresses:e,paymentMethods:t,coupons:s,notificationPreferences:a,sessions:r,twoFactor:n},this.accountData}getAccountData(){return this.accountData}async saveAddress(e){const t=await this.accountRequest("addresses",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateAddress(e,t){const s=await this.accountRequest(`addresses/${e}`,{method:"PUT",body:JSON.stringify(t)});return await this.fetchAccountData(),s}async deleteAddress(e){await this.accountRequest(`addresses/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async addPaymentMethod(e){const t=await this.accountRequest("payment-methods",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async setPrimaryPaymentMethod(e){await this.accountRequest(`payment-methods/${e}/primary`,{method:"PUT"}),await this.fetchAccountData()}async deletePaymentMethod(e){await this.accountRequest(`payment-methods/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async setNotificationPreference(e){const t=await this.accountRequest("notification-preferences",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateTwoFactor(e){const t=await this.accountRequest("two-factor",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async revokeOtherSessions(){await this.accountRequest("sessions/revoke-others",{method:"POST"}),await this.fetchAccountData()}async requestOtp(e){const t=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const s=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(s.ok)return await s.json();const a=await s.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(a.error||"Failed to request OTP. Please check your phone number.")}catch(s){if(s.message&&!s.message.includes("Failed to fetch"))throw s;const a=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===t);if(a)return{demoCode:"888888",message:`Verification code dispatched via SMS simulator for ${a.name}.`,phone:t,userName:a.name,role:a.role,email:a.email};throw s}}async verifyOtp(e,t){const s=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const r=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:s,code:t.trim()})});if(r.ok){const i=await r.json();this.token=i.token,localStorage.setItem("token",i.token);const d=i.user.verificationStatus||(i.user.verified?"Approved":"PendingSubmission"),c={id:i.user.id,phone:i.user.phone,name:i.user.name,nameAm:i.user.nameAm,email:i.user.email,role:(i.user.role||"buyer").toLowerCase(),region:i.user.region,verified:i.user.verified??d==="Approved",verificationStatus:d,rejectionReason:i.user.rejectionReason,tinNumber:i.user.tinNumber,businessLicenseNumber:i.user.businessLicenseNumber,vehicleType:i.user.vehicleType||(i.user.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:i.user.refrigerationType||(i.user.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:i.user.vehicleCapacityKg||(i.user.role==="driver"?5e3:void 0),kycDocumentType:i.user.kycDocumentType,kycDocumentNumber:i.user.kycDocumentNumber,kycStatus:d==="Approved"?"Verified":"Pending",kycTier:2,repeatBuyerCount:i.user.repeatBuyerCount||(i.user.role==="farmer"?14:void 0),onTimeDeliveryRate:i.user.onTimeDeliveryRate||(i.user.role==="farmer"||i.user.role==="driver"?99:void 0),walletBalanceEtb:i.user.walletBalanceEtb??0,createdAt:i.user.createdAt};return this.currentUser=c,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(c)),me.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),c}const n=await r.json().catch(()=>({error:"Invalid verification code"}));throw new Error(n.error||"Invalid verification code")}catch(r){if(r.message&&!r.message.includes("Failed to fetch"))throw r;console.warn("Network verifyOtp failed, checking local seed users",r)}const a=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===s);if(a)return this.currentUser=a,this.isUserLoggedIn=!0,this.token="demo-jwt-token-"+a.id,localStorage.setItem("token",this.token),localStorage.setItem("currentUser",JSON.stringify(a)),this.notify(),a;throw new Error("Invalid verification code or phone number.")}async registerUser(e,t,s,a,r,n){const i=s.startsWith("+251")?s.replace(/\s+/g,""):"+251"+s.replace(/^0+/,"").replace(/\s+/g,""),d=a.charAt(0).toUpperCase()+a.slice(1).toLowerCase(),c=n&&n.trim()?n.trim():void 0;let o;try{const f=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,phone:i,role:d,region:r,email:c||null})});if(f.ok){const x=await f.json();this.token=x.token,localStorage.setItem("token",x.token),o={id:x.user.id,phone:x.user.phone,name:x.user.name,nameAm:x.user.nameAm,email:x.user.email||c,role:(x.user.role||"buyer").toLowerCase(),region:x.user.region,verified:!1,verificationStatus:"PendingSubmission",status:"active",tinNumber:void 0,businessLicenseNumber:void 0,vehicleType:a==="driver"?"Isuzu 5-Ton":void 0,refrigerationType:a==="driver"?"Ventilated":void 0,vehicleCapacityKg:a==="driver"?5e3:void 0,kycDocumentType:void 0,kycDocumentNumber:void 0,kycStatus:"Pending",kycTier:1,repeatBuyerCount:0,onTimeDeliveryRate:100,walletBalanceEtb:0,createdAt:x.user.createdAt||new Date().toISOString()}}else{const x=await f.json().catch(()=>({error:"Registration failed"}));throw new Error(x.error||"Registration failed")}}catch(f){if(f.message&&!f.message.includes("Failed to fetch"))throw f;console.warn("Backend register call offline fallback to local state",f),o={id:"user-"+Date.now(),phone:i,name:e,nameAm:t||e,email:c,role:a,region:r,verified:!1,verificationStatus:"PendingSubmission",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},this.token="demo-jwt-token-"+o.id,localStorage.setItem("token",this.token)}this.currentUser=o,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const m=this.allUsers.findIndex(f=>f.id===o.id||f.phone===o.phone);return m!==-1?this.allUsers[m]={...this.allUsers[m],...o}:this.allUsers.unshift(o),this.saveUsersToStorage(),this.addAuditLog({actorId:o.id,actorName:o.name,actorRole:o.role,action:"USER_REGISTRATION",category:"AUTH",targetResource:"User",targetId:o.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Self-registered new ${o.role.toUpperCase()} account: ${o.name} (${o.phone}) in ${o.region}.`}),me.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(){try{const e=await fetch("/api/listings");if(e.ok){const t=await e.json(),s=Array.isArray(t)?t:t.items||[];return this.listings=s.map(a=>({id:a.id,farmerId:a.farmerId,farmerName:a.farmerName,farmerNameAm:a.farmerNameAm,farmerPhone:a.farmerPhone,region:a.region,productName:a.productName,nameAm:a.nameAm,category:a.category,qtyKg:Number(a.qtyKg),pricePerKg:Number(a.pricePerKg),minOrderKg:Number(a.minOrderKg),latitude:a.latitude,longitude:a.longitude,distanceKm:a.distanceKm,photos:a.photos&&a.photos.length>0?a.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:a.availableFrom||new Date().toISOString().split("T")[0],status:(a.status||"Active").toLowerCase(),grade:a.grade||"Grade 1",ripeness:a.ripeness||"Ready Today",isOrganic:a.isOrganic??!0,isAdvanceHarvest:a.isAdvanceHarvest??!1,expectedHarvestDate:a.expectedHarvestDate,voiceNoteUrl:a.voiceNoteUrl,voiceNoteTranscript:a.voiceNoteTranscript,marketBenchmarkPrice:a.marketBenchmarkPrice||a.pricePerKg,farmerRating:this.getFarmerRatingStats(a.farmerId).reviewCount>0?this.getFarmerRatingStats(a.farmerId).averageRating:a.farmerRating||4.9,reviewCount:this.getFarmerRatingStats(a.farmerId).reviewCount>0?this.getFarmerRatingStats(a.farmerId).reviewCount:a.reviewCount||14,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:a.createdAt})),this.notify(),this.listings}}catch(e){console.warn("Fetch listings from backend failed",e)}return this.listings}getListings(e,t,s,a,r,n,i,d){return this.listings.filter(c=>{if(c.status!=="active"||e&&e!=="All"&&c.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!c.region.toLowerCase().includes(t.toLowerCase())||r&&r!=="All"&&c.grade!==r||n&&n!=="All"&&c.ripeness!==n||i&&!c.isOrganic||d&&!c.isAdvanceHarvest||a&&c.distanceKm&&c.distanceKm>a)return!1;if(s){const o=s.toLowerCase();if(!(c.productName.toLowerCase().includes(o)||c.nameAm&&c.nameAm.includes(o)||c.farmerName.toLowerCase().includes(o)||c.region.toLowerCase().includes(o)))return!1}return!0})}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var a,r,n,i,d,c,o,m,f,x;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category||"Vegetables",qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate||null,voiceNoteUrl:e.voiceNoteUrl||null,voiceNoteTranscript:e.voiceNoteTranscript||null,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg};let s=null;try{const w=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(w.ok){const A=await w.json();s={id:A.id,farmerId:A.farmerId||((a=this.currentUser)==null?void 0:a.id)||"11111111-1111-1111-1111-111111111111",farmerName:A.farmerName||((r=this.currentUser)==null?void 0:r.name)||"Abebe Bekele",farmerNameAm:A.farmerNameAm||((n=this.currentUser)==null?void 0:n.nameAm),farmerPhone:A.farmerPhone||((i=this.currentUser)==null?void 0:i.phone)||"+251911223344",region:A.region||((d=this.currentUser)==null?void 0:d.region)||"Oromia (Bishoftu)",productName:A.productName,nameAm:A.nameAm,category:A.category,qtyKg:Number(A.qtyKg),pricePerKg:Number(A.pricePerKg),minOrderKg:Number(A.minOrderKg),latitude:A.latitude,longitude:A.longitude,distanceKm:A.distanceKm||45,photos:A.photos&&A.photos.length>0?A.photos:e.photos||["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:A.availableFrom,status:"active",grade:A.grade||e.grade||"Grade 1",ripeness:A.ripeness||e.ripeness||"Ready Today",isOrganic:A.isOrganic??e.isOrganic??!0,isAdvanceHarvest:A.isAdvanceHarvest??e.isAdvanceHarvest??!1,expectedHarvestDate:A.expectedHarvestDate||e.expectedHarvestDate,voiceNoteUrl:A.voiceNoteUrl||e.voiceNoteUrl,voiceNoteTranscript:A.voiceNoteTranscript||e.voiceNoteTranscript,marketBenchmarkPrice:A.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:A.createdAt||new Date().toISOString()}}}catch(w){console.warn("Create listing network call fallback to local state",w)}return s||(s={id:"list-local-"+Date.now(),farmerId:((c=this.currentUser)==null?void 0:c.id)||"11111111-1111-1111-1111-111111111111",farmerName:((o=this.currentUser)==null?void 0:o.name)||"Abebe Bekele",farmerNameAm:(m=this.currentUser)==null?void 0:m.nameAm,farmerPhone:((f=this.currentUser)==null?void 0:f.phone)||"+251911223344",region:((x=this.currentUser)==null?void 0:x.region)||"Oromia (Bishoftu)",productName:e.productName||"Fresh Farm Produce",nameAm:e.nameAm,category:e.category||"Vegetables",qtyKg:Number(e.qtyKg||1e3),pricePerKg:Number(e.pricePerKg||45),minOrderKg:Number(e.minOrderKg||100),latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,distanceKm:45,photos:e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],status:"active",grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate,voiceNoteUrl:e.voiceNoteUrl,voiceNoteTranscript:e.voiceNoteTranscript,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:new Date().toISOString()}),this.listings.unshift(s),this.notify(),s}async deleteListing(e){const t=await fetch(`/api/listings/${e}`,{method:"DELETE",headers:this.getAuthHeaders()}),s=await t.json().catch(()=>({}));if(!t.ok)throw new Error(s.error||"Could not delete the listing.");await this.fetchListings()}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(s=>{var o,m,f,x;const a=Number(s.totalEtb),r=Number(s.farmerCut||a*.9),n=Number(s.driverCut||a*.05),i=Number(s.platformCut||a*.05),d=Math.round(a*.02),c=Math.round(i*.15);return{id:s.id,listingId:s.listingId,productName:s.productName,productNameAm:s.productNameAm,category:s.category,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,farmerRegion:s.farmerRegion,buyerId:s.buyerId,buyerName:s.buyerName,buyerPhone:s.buyerPhone,driverId:s.driverId,driverName:s.driverName,driverPhone:s.driverPhone,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),totalEtb:a,farmerCut:r,driverCut:n,platformCut:i,driverSubsidyEtb:Number(s.driverSubsidyEtb||150),withholdingTaxEtb:d,platformVatEtb:c,status:(s.status||"Pending").toLowerCase(),escrowHeld:s.escrowHeld,paymentRef:s.paymentRef||`TB-${s.id.slice(0,8).toUpperCase()}`,invoiceNumber:`ET-INV-2026-${s.id.slice(0,6).toUpperCase()}`,waybillNumber:`WB-FTA-${s.id.slice(0,6).toUpperCase()}`,contractNumber:`AGR-ET-${s.id.slice(0,6).toUpperCase()}`,arbitrationDecreeNumber:s.status==="disputed"?`ARB-DEC-${s.id.slice(0,6).toUpperCase()}`:void 0,pickupPhoto:s.pickupPhoto,deliveryPhoto:s.deliveryPhoto,deliveryGpsLat:s.deliveryGpsLat,deliveryGpsLng:s.deliveryGpsLng,deliveredAt:s.deliveredAt,deliveryAddress:s.deliveryAddress,deliveryNotes:s.deliveryNotes,disputeReason:s.disputeReason,disputePhoto:s.disputePhoto,requestedRefundPercent:s.requestedRefundPercent||100,disputeResolutionNotes:s.disputeResolutionNotes,isRecurring:s.isRecurring||!1,recurringFrequency:s.recurringFrequency,confirmedAt:s.confirmedAt,isRated:!!this.reviews.find(w=>w.orderId===s.id)||s.isRated,reviewRating:((o=this.reviews.find(w=>w.orderId===s.id))==null?void 0:o.rating)||s.reviewRating,reviewComment:((m=this.reviews.find(w=>w.orderId===s.id))==null?void 0:m.comment)||s.reviewComment,reviewQuickTags:((f=this.reviews.find(w=>w.orderId===s.id))==null?void 0:f.quickTags)||s.reviewQuickTags,reviewedAt:((x=this.reviews.find(w=>w.orderId===s.id))==null?void 0:x.createdAt)||s.reviewedAt,createdAt:s.createdAt}}),this.recalculateAllFarmerRatings(),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(s=>s.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(s=>s.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(s=>s.driverId===this.currentUser.id||s.status==="confirmed"&&!s.driverId):this.orders}async placeOrder(e,t,s,a=!1,r="Weekly",n){var S,M;const i=this.listings.find(P=>P.id===e);if(!i)throw new Error("Listing not found");const c=(P=>!!P&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(P))(n)?n:null,o=await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:s||((S=this.currentUser)==null?void 0:S.region)||"Addis Ababa (Bole)",paymentMethodId:c,isRecurring:a,recurringFrequency:a?r:null})});if(!o.ok){if(o.status===401)throw new Error("Please sign in first to place your order.");if(o.status===403)throw new Error("Your account permissions do not allow placing this order.");const P=await o.json().catch(()=>null);let V=(P==null?void 0:P.error)||(P==null?void 0:P.message);throw!V&&(P!=null&&P.errors)&&(V=Object.values(P.errors).flat().join(", ")),new Error(V||`Failed to place order (HTTP ${o.status})`)}const m=await o.json().catch(()=>null);await this.fetchOrders(),await this.fetchListings();const f=this.orders[0]||this.orders.find(P=>P.listingId===e),x=(m==null?void 0:m.telebirrPaymentUrl)||(m==null?void 0:m.TelebirrPaymentUrl)||(m==null?void 0:m.paymentUrl)||(m==null?void 0:m.checkoutUrl)||void 0,w=(m==null?void 0:m.outTradeNo)||(m==null?void 0:m.OutTradeNo)||void 0,A=((M=this.currentUser)==null?void 0:M.name)||"Wholesale Buyer",E=i.productName,C=i.nameAm||E,y=f?f.totalEtb:Math.round(t*i.pricePerKg);return this.addNotification({id:"notif-ord-f-"+Date.now(),userId:i.farmerId,type:"order",channel:"sms",messageEn:`🌾 [New Order Alert] ${A} placed an order for ${t} kg of ${E} (${y.toLocaleString()} ETB). Telebirr escrow held. Please confirm dispatch.`,messageAm:`🌾 [አዲስ ትዕዛዝ] ${A} ለ ${t} ኪ.ግ ${C} ትዕዛዝ አቅርበዋል (ብር ${y.toLocaleString()})። የቴሌብር ክፍያ በዋስትና ተይዟል። እባክዎ ያረጋግጡ።`,read:!1,createdAt:new Date().toISOString()}),this.currentUser&&this.addNotification({id:"notif-ord-b-"+Date.now(),userId:this.currentUser.id,type:"order",channel:"in_app",messageEn:`📦 [Order Placed] Order placed for ${t} kg ${E} (${y.toLocaleString()} ETB). Farmer ${i.farmerName} notified for pickup dispatch.`,messageAm:`📦 [ትዕዛዝ ተቀምጧል] ለ ${t} ኪ.ግ ${C} (ብር ${y.toLocaleString()}) ትዕዛዝዎ ተልኳል። አርሶ አደር ${i.farmerNameAm||i.farmerName} እንዲያረጋግጡ ተልኳል።`,read:!1,createdAt:new Date().toISOString()}),this.addNotification({id:"notif-ord-d-"+Date.now(),userId:"55555555-5555-5555-5555-555555555555",type:"dispatch",channel:"in_app",messageEn:`🚚 [New Freight Dispatch] ${t} kg ${E} route available from ${i.region} to ${s||"Addis Ababa"}. Pickup ready soon.`,messageAm:`🚚 [አዲስ የጭነት መስመር] የ ${t} ኪ.ግ ${C} ጭነት ከ${i.region} ወደ ${s||"አዲስ አበባ"} ይገኛል።`,read:!1,createdAt:new Date().toISOString()}),{order:f,paymentUrl:x,outTradeNo:w}}async verifyChapaPayment(e){try{const t=await fetch(`/api/payments/chapa/verify/${encodeURIComponent(e)}`);if(t.ok){const s=await t.json();return await this.fetchOrders(),this.notify(),s}}catch(t){console.warn("Verify Chapa payment error",t)}return null}async confirmOrderByFarmer(e){const t=this.orders.find(s=>s.id===e);await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders(),t&&(this.addNotification({id:"notif-conf-b-"+Date.now(),userId:t.buyerId,type:"order",channel:"sms",messageEn:`✅ [Order Confirmed] Farmer ${t.farmerName} has packaged and confirmed order #${t.id.slice(0,8).toUpperCase()} (${t.productName}). Driver dispatching to farm.`,messageAm:`✅ [ትዕዛዝ ተረጋግጧል] አርሶ አደር ${t.farmerNameAm||t.farmerName} ትዕዛዝ #${t.id.slice(0,8).toUpperCase()} አረጋግጠዋል። አሽከርካሪ ወደ እርሻው በመጓዝ ላይ ነው።`,read:!1,createdAt:new Date().toISOString()}),this.addNotification({id:"notif-conf-d-"+Date.now(),userId:t.driverId||"55555555-5555-5555-5555-555555555555",type:"dispatch",channel:"in_app",messageEn:`🚚 [Ready for Pickup] Order #${t.id.slice(0,8).toUpperCase()} (${t.qtyKg} kg ${t.productName}) is packaged and ready for farm loading at ${t.farmerRegion||"Oromia"}.`,messageAm:`🚚 [ለመጫን ዝግጁ] ትዕዛዝ #${t.id.slice(0,8).toUpperCase()} (${t.qtyKg} ኪ.ግ ${t.productNameAm||t.productName}) በእርሻው ላይ ተዘጋጅቷል።`,read:!1,createdAt:new Date().toISOString()}))}async pickupOrderByDriver(e,t){const s=this.orders.find(a=>a.id===e);if(this.isOfflineMode){this.offlineQueue.push({id:"off-"+Date.now(),type:"pickup",orderId:e,timestamp:new Date().toISOString(),data:{photo:t},synced:!1}),this.saveOfflineQueue(),s&&(s.status="picked_up",s.pickupPhoto=t),this.notify();return}await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"})}),await this.fetchOrders(),s&&(this.addNotification({id:"notif-pick-b-"+Date.now(),userId:s.buyerId,type:"dispatch",channel:"sms",messageEn:`🚚 [Produce In Transit] Driver ${s.driverName||"Dawit"} picked up your ${s.qtyKg} kg ${s.productName} with verified GPS photo proof. In transit to destination.`,messageAm:`🚚 [በጉዞ ላይ ነው] አሽከርካሪ ${s.driverName||"ዳዊት"} ${s.qtyKg} ኪ.ግ ${s.productNameAm||s.productName} ከእርሻው ተረክቦ በመጓዝ ላይ ነው።`,read:!1,createdAt:new Date().toISOString()}),this.addNotification({id:"notif-pick-f-"+Date.now(),userId:s.farmerId,type:"order",channel:"in_app",messageEn:`🚚 [Farm Pickup Complete] Driver ${s.driverName||"Dawit"} loaded order #${s.id.slice(0,8).toUpperCase()}. Payout will release upon buyer delivery confirmation.`,messageAm:`🚚 [ምርት ተጭኗል] አሽከርካሪ ${s.driverName||"ዳዊት"} ትዕዛዝ #${s.id.slice(0,8).toUpperCase()} ጭኗል። ክፍያው ደንበኛው ሲረከብ ይለቀቃል።`,read:!1,createdAt:new Date().toISOString()}))}async confirmDeliveryByBuyer(e,t,s,a){const r=this.orders.find(n=>n.id===e);if(await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({deliveryPhoto:t||"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",deliveryGpsLat:s||9.03,deliveryGpsLng:a||38.74})}),await this.fetchOrders(),r){const n=r.farmerCut||Math.round(r.totalEtb*.9),i=r.driverCut||Math.round(r.totalEtb*.05);this.addNotification({id:"notif-del-f-"+Date.now(),userId:r.farmerId,type:"payout",channel:"sms",messageEn:`💰 [Telebirr Payout Released] Buyer confirmed delivery for order #${r.id.slice(0,8).toUpperCase()}. 90% produce share (${n.toLocaleString()} ETB) credited to your Telebirr wallet!`,messageAm:`💰 [የቴሌብር ክፍያ ተለቋል] ደንበኛው የትዕዛዝ #${r.id.slice(0,8).toUpperCase()} ርክክብ አረጋግጠዋል። 90% የምርት ዋጋ (${n.toLocaleString()} ብር) ወደ ቴሌብር ሂሳብዎ ገብቷል!`,read:!1,createdAt:new Date().toISOString()}),this.addNotification({id:"notif-del-d-"+Date.now(),userId:r.driverId||"55555555-5555-5555-5555-555555555555",type:"payout",channel:"sms",messageEn:`💰 [Freight Fee Credited] 5% delivery fee (${i.toLocaleString()} ETB) + rural road subsidy deposited to your Telebirr driver wallet.`,messageAm:`💰 [የትራንስፖርት ክፍያ ገቢ ሆነ] 5% የትራንስፖርት ክፍያ (${i.toLocaleString()} ብር) እና የገጠር ድጎማ ወደ ቴሌብር ሂሳብዎ ገብቷል።`,read:!1,createdAt:new Date().toISOString()}),this.addNotification({id:"notif-del-b-"+Date.now(),userId:r.buyerId,type:"review",channel:"in_app",messageEn:`⭐ [Rate Your Farmer] Delivery of ${r.qtyKg} kg ${r.productName} completed. Leave a verified star rating to help farmer ${r.farmerName}.`,messageAm:`⭐ [አርሶ አደሩን ደረጃ ይስጡ] የ ${r.qtyKg} ኪ.ግ ${r.productNameAm||r.productName} ርክክብ ተጠናቋል። እባክዎ ለአርሶ አደር ${r.farmerNameAm||r.farmerName} ደረጃ ይስጡ።`,read:!1,createdAt:new Date().toISOString()})}}async disputeOrder(e,t,s,a=50){const r=this.orders.find(d=>d.id===e),n=await fetch(`/api/orders/${e}/dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,disputePhoto:s||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",requestedRefundPercent:a})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.error||"Could not submit the dispute.");await this.fetchOrders(),r&&(this.addNotification({id:"notif-disp-a-"+Date.now(),userId:"99999999-9999-9999-9999-999999999999",type:"dispute",channel:"in_app",messageEn:`⚠️ [Dispute Raised] Order #${r.id.slice(0,8).toUpperCase()} (${r.productName}) disputed by Buyer ${r.buyerName}. Reason: "${t}". Escrow frozen under arbitration.`,messageAm:`⚠️ [ቅሬታ ቀርቧል] ለትዕዛዝ #${r.id.slice(0,8).toUpperCase()} በገዢ ${r.buyerName} ቅሬታ ቀርቧል። ምክንያት፡ "${t}"። ክፍያው በግልግል ሂደት ታግዷል።`,read:!1,createdAt:new Date().toISOString()}),this.addNotification({id:"notif-disp-f-"+Date.now(),userId:r.farmerId,type:"dispute",channel:"sms",messageEn:`⚠️ [Dispute Notice] Buyer filed a dispute for Order #${r.id.slice(0,8).toUpperCase()} (${r.productName}). Reason: "${t}". Admin arbitration is in progress.`,messageAm:`⚠️ [የቅሬታ ማስታወቂያ] ለትዕዛዝ #${r.id.slice(0,8).toUpperCase()} ቅሬታ ቀርቧል። ምክንያት፡ "${t}"። የአስተዳዳሪ ግልግል በሂደት ላይ ነው።`,read:!1,createdAt:new Date().toISOString()}))}async resolveDispute(e,t,s=50,a=50){var n,i;const r=this.orders.find(d=>d.id===e);try{const d=await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:`Arbitrated via Admin Console (${t})`,farmerSharePercent:s,buyerRefundPercent:a})});if(!d.ok){const c=await d.json().catch(()=>({}));console.warn("Backend resolve dispute returned error",c)}}catch(d){console.warn("Backend resolve dispute error, proceeding with local resolution",d)}if(r){r.status=t==="RefundBuyer"?"cancelled":"delivered",r.escrowHeld=!1,r.disputeStatus=t==="RefundBuyer"?"ResolvedRefundBuyer":t==="PartialSplit"?"ResolvedPartialSplit":"ResolvedReleaseFarmer",r.disputeResolutionNotes=`Arbitrated via Admin Console (${t})`;const d=r.totalEtb,c=t==="RefundBuyer"?d:t==="PartialSplit"?Math.round(d*(a/100)):0;if(c>0){const o={id:"ref-"+Date.now()+"-"+Math.random().toString(36).substring(2,6),userId:r.buyerId,type:"refund",channel:"in_app",messageEn:`💰 [Telebirr Escrow Refund] Admin approved a ${t==="RefundBuyer"?"Full 100%":`${a}% Partial`} Refund of ${c.toLocaleString()} ETB for order #${r.id.slice(0,8).toUpperCase()} (${r.productName}). Funds have been credited to your Telebirr wallet.`,messageAm:`💰 [የቴሌብር ተመላሽ ገንዘብ] አስተዳዳሪው ለትዕዛዝ #${r.id.slice(0,8).toUpperCase()} (${r.productNameAm||r.productName}) የ ${c.toLocaleString()} ብር ተመላሽ አጽድቀዋል። ገንዘቡ ወደ ቴሌብር ሂሳብዎ ገብቷል።`,read:!1,createdAt:new Date().toISOString(),sentAt:new Date().toISOString()},m={id:"sms-ref-"+Date.now(),userId:r.buyerId,type:"refund",channel:"sms",messageEn:`[Telebirr SMS] Refund of ${c.toLocaleString()} ETB for Order #${r.id.slice(0,8).toUpperCase()} completed. Ref: TB-REF-${r.id.slice(0,6).toUpperCase()}. Wallet updated.`,messageAm:`[የቴሌብር SMS] ለትዕዛዝ #${r.id.slice(0,8).toUpperCase()} የ ${c.toLocaleString()} ብር ተመላሽ ተጠናቋል። ማጣቀሻ ቁጥር: TB-REF-${r.id.slice(0,6).toUpperCase()}።`,read:!1,createdAt:new Date().toISOString(),sentAt:new Date().toISOString()};this.notifications.unshift(o,m),this.saveNotificationsToStorage();const f=this.allUsers.find(x=>x.id===r.buyerId);f&&(f.walletBalanceEtb=(f.walletBalanceEtb||0)+c),this.currentUser&&this.currentUser.id===r.buyerId&&(this.currentUser.walletBalanceEtb=(this.currentUser.walletBalanceEtb||0)+c),this.addAuditLog({actorId:((n=this.currentUser)==null?void 0:n.id)||"admin",actorName:((i=this.currentUser)==null?void 0:i.name)||"Compliance Admin",actorRole:"admin",action:"DISPUTE_REFUND_BUYER",category:"DISPUTE",targetResource:"Order",targetId:r.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Processed ${t==="RefundBuyer"?"Full":`${a}% Partial`} refund of ${c.toLocaleString()} ETB for Buyer ${r.buyerName} on order #${r.id.slice(0,8)}.`})}else{const o={id:"disp-close-"+Date.now(),userId:r.buyerId,type:"dispute_resolution",channel:"in_app",messageEn:`⚖️ [Arbitration Decree] Dispute for Order #${r.id.slice(0,8).toUpperCase()} (${r.productName}) has been concluded. Escrow released to Farmer ${r.farmerName}.`,messageAm:`⚖️ [የግልግል ዳኝነት ውሳኔ] ለትዕዛዝ #${r.id.slice(0,8).toUpperCase()} የቀረበው ቅሬታ ተዘግቷል። ክፍያው ለአርሶ አደር ${r.farmerNameAm||r.farmerName} ተለቋል።`,read:!1,createdAt:new Date().toISOString()};this.notifications.unshift(o),this.saveNotificationsToStorage()}}await this.fetchOrders(),this.notify()}getReviews(e){return e?this.reviews.filter(t=>t.revieweeId===e):this.reviews}getReviewsForFarmer(e){var r;const t=(e||"").toLowerCase().trim();if(!t)return[];const s=this.getUserById(e),a=(r=s==null?void 0:s.name)==null?void 0:r.toLowerCase().trim();return this.reviews.filter(n=>{const i=(n.revieweeId||"").toLowerCase().trim(),d=(n.revieweeName||"").toLowerCase().trim();return!!(i&&(i===t||t.includes(i)||i.includes(t))||a&&d&&(d.includes(a)||a.includes(d)))})}getReviewsForListing(e){const t=this.getListingById(e);return t?this.getReviewsForFarmer(t.farmerId):[]}getFarmerRatingStats(e){const t=this.getReviewsForFarmer(e);if(t.length===0)return{averageRating:5,reviewCount:0,distribution:{5:100,4:0,3:0,2:0,1:0},distributionCounts:{5:0,4:0,3:0,2:0,1:0}};const s=t.length,a=t.reduce((d,c)=>d+c.rating,0),r=Number((a/s).toFixed(1)),n={5:0,4:0,3:0,2:0,1:0};t.forEach(d=>{const c=Math.min(5,Math.max(1,Math.round(d.rating)));n[c]=(n[c]||0)+1});const i={5:Math.round(n[5]/s*100),4:Math.round(n[4]/s*100),3:Math.round(n[3]/s*100),2:Math.round(n[2]/s*100),1:Math.round(n[1]/s*100)};return{averageRating:r,reviewCount:s,distribution:i,distributionCounts:n}}recalculateFarmerRatings(e){const t=this.getFarmerRatingStats(e),s=(e||"").toLowerCase().trim();this.listings.forEach(a=>{const r=(a.farmerId||"").toLowerCase().trim();(r===s||s&&r.includes(s))&&(a.farmerRating=t.averageRating,a.reviewCount=t.reviewCount)}),this.notify()}recalculateAllFarmerRatings(){this.listings.forEach(e=>{const t=this.getFarmerRatingStats(e.farmerId);t.reviewCount>0&&(e.farmerRating=t.averageRating,e.reviewCount=t.reviewCount)}),this.orders.forEach(e=>{const t=this.reviews.find(s=>s.orderId===e.id);t&&(e.isRated=!0,e.reviewRating=t.rating,e.reviewComment=t.comment,e.reviewQuickTags=t.quickTags,e.reviewedAt=t.createdAt)})}async fetchReviewsForUser(e){try{const t=await fetch(`/api/reviews/user/${e}`);if(t.ok){const s=await t.json();if(Array.isArray(s))return s.map(r=>({id:r.id,orderId:r.orderId,reviewerId:r.reviewerId,reviewerName:r.reviewerName,reviewerRole:"buyer",revieweeId:r.revieweeId,revieweeName:r.revieweeName,rating:r.rating,comment:r.comment,createdAt:r.createdAt?new Date(r.createdAt).toLocaleDateString():"Recently"})).forEach(r=>{this.reviews.some(n=>n.id===r.id||n.orderId&&n.orderId===r.orderId)||this.reviews.unshift(r)}),localStorage.setItem("farmerMarketReviews",JSON.stringify(this.reviews)),this.recalculateFarmerRatings(e),this.getReviewsForFarmer(e)}}catch(t){console.warn("Fetch reviews for user failed, using local cache",t)}return this.getReviewsForFarmer(e)}async fetchReviews(){try{const e=await fetch("/api/reviews");if(e.ok){const t=await e.json();Array.isArray(t)&&(t.map(a=>({id:a.id,orderId:a.orderId,reviewerId:a.reviewerId,reviewerName:a.reviewerName,reviewerRole:"buyer",revieweeId:a.revieweeId,revieweeName:a.revieweeName,rating:a.rating,comment:a.comment,createdAt:a.createdAt?new Date(a.createdAt).toLocaleDateString():"Recently"})).forEach(a=>{this.reviews.some(r=>r.id===a.id||r.orderId&&r.orderId===a.orderId)||this.reviews.unshift(a)}),localStorage.setItem("farmerMarketReviews",JSON.stringify(this.reviews)),this.recalculateAllFarmerRatings())}}catch(e){console.warn("Fetch all reviews failed, using local cache",e)}return this.reviews}async createReview(e,t,s,a,r){const n=Math.max(1,Math.min(5,Math.round(s))),i=this.currentUser||{id:"44444444-4444-4444-4444-444444444444",name:"Bethlehem Tsegaye",role:"buyer"},d=this.getUserById(t),c=(d==null?void 0:d.name)||"Farmer",o={id:"rev-"+Date.now(),orderId:e,reviewerId:i.id,reviewerName:i.name,reviewerRole:i.role,revieweeId:t,revieweeName:c,rating:n,comment:(a==null?void 0:a.trim())||void 0,quickTags:r&&r.length>0?r:void 0,createdAt:"Just now"},m=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;if(this.token&&m.test(e)&&m.test(t))try{const x=await fetch("/api/reviews",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({orderId:e,revieweeId:t,rating:n,comment:(a==null?void 0:a.trim())||null})});if(x.ok){const w=await x.json();w&&w.id&&(o.id=w.id)}}catch(x){console.warn("Remote review submission fallback to local state",x)}this.reviews.unshift(o),this.saveReviewsToStorage();const f=this.orders.find(x=>x.id===e);return f&&(f.isRated=!0,f.reviewRating=n,f.reviewComment=(a==null?void 0:a.trim())||void 0,f.reviewQuickTags=r,f.reviewedAt=new Date().toISOString()),this.recalculateFarmerRatings(t),this.addNotification({id:"notif-rev-"+Date.now(),userId:t,type:"review",channel:"in_app",messageEn:`⭐ [New Customer Rating] ${i.name} rated you ${n}/5 stars: "${(a==null?void 0:a.trim())||"Verified produce delivery"}"`,messageAm:`⭐ [አዲስ የደንበኛ አስተያየት] ${i.name} የ ${n}/5 ኮከብ ደረጃ ሰጥተውዎታል፡ "${(a==null?void 0:a.trim())||"ጥሩ ጥራት ያለው ምርት"}"`,read:!1,createdAt:new Date().toISOString()}),this.addAuditLog({actorId:i.id,actorName:i.name,actorRole:i.role||"buyer",action:"SUBMIT_PRODUCE_REVIEW",category:"FINANCE",targetResource:"Review",targetId:o.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Submitted ${n}-star review for order #${e.slice(0,8)} (${c}). Comment: "${(a||"").slice(0,40)}..."`}),this.notify(),o}getTaxInvoice(e){const t=this.orders.find(r=>r.id===e)||this.orders[0]||{id:e,productName:"Fresh Sholla Red Tomatoes",qtyKg:200,pricePerKg:45,totalEtb:9e3,farmerCut:8100,driverCut:450,platformCut:450,farmerName:"Abebe Bekele",farmerRegion:"Oromia (Bishoftu)",farmerPhone:"+251 911 223 344",buyerName:"Bethlehem Tilahun (FreshMart)",buyerPhone:"+251 955 667 788",paymentRef:"TB-TXN-98217391",invoiceNumber:"ET-INV-2026-001",createdAt:new Date().toISOString()},s=Math.round(t.platformCut*.15),a=Math.round(t.totalEtb*.02);return{invoiceNumber:t.invoiceNumber||`ET-INV-2026-${t.id.slice(0,6).toUpperCase()}`,orderId:t.id,issueDate:t.createdAt?new Date(t.createdAt).toLocaleDateString("en-GB"):new Date().toLocaleDateString("en-GB"),paymentRef:t.paymentRef||`TB-C2B-${t.id.slice(0,8).toUpperCase()}`,sellerName:t.farmerName,sellerTin:"TIN-FARM-8829104",sellerRegion:t.farmerRegion,sellerPhone:t.farmerPhone,sellerType:"Registered Agricultural Smallholder Producer",buyerName:t.buyerName,buyerTin:"TIN-ET-9912001",buyerRegion:"Addis Ababa (Bole)",buyerPhone:t.buyerPhone,productName:t.productName,productNameAm:t.productNameAm,grade:"Grade 1 (Certified Farm Standard)",qtyKg:t.qtyKg,unitPriceEtb:t.pricePerKg,grossAmountEtb:t.totalEtb,farmerPayoutEtb:t.farmerCut,driverFreightEtb:t.driverCut,platformServiceFeeEtb:t.platformCut,platformVatEtb:s,withholdingTaxEtb:a,totalPaidViaTelebirr:t.totalEtb,regulatoryAct:"Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)",qrVerificationCode:`ET-TAX-AUTH-2026-VERIFIED-${t.id.slice(0,8).toUpperCase()}`,isVatExemptAgriculturalGoods:!0}}getTransportWaybill(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{waybillNumber:(t==null?void 0:t.waybillNumber)||`WB-FTA-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,dispatchDate:new Date().toLocaleDateString("en-GB"),consignorName:(t==null?void 0:t.farmerName)||"Abebe Bekele",consignorFarmLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu Green Farms, Oromia",consignorPhone:(t==null?void 0:t.farmerPhone)||"+251 911 223 344",consigneeName:(t==null?void 0:t.buyerName)||"FreshMart Central Wholesale Hub",consigneeDepotAddress:(t==null?void 0:t.deliveryAddress)||"Bole Depot, Addis Ababa",consigneePhone:(t==null?void 0:t.buyerPhone)||"+251 955 667 788",carrierDriverName:(t==null?void 0:t.driverName)||"Dawit Kebede",driverLicenseNumber:"ET-CDL-COMM-89104",vehiclePlateNumber:"ET-3-B98124-AA",vehicleModel:"Isuzu 5-Ton Commercial Freight Carrier",refrigerationStatus:"Ventilated Agri-Body Cargo (18°C)",insurancePolicyNumber:"NIC-ET-CARGO-771920",cargoDescription:`${(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes"} (Grade 1)`,packageCount:Math.ceil(((t==null?void 0:t.qtyKg)||200)/25),netWeightKg:(t==null?void 0:t.qtyKg)||200,grossWeightKg:((t==null?void 0:t.qtyKg)||200)+18,tareWeightKg:18,temperatureLogCelsius:17.5,farmerHandoffTimestamp:"06:30 AM (Farm Gate)",driverSignatureRef:"DAWIT-KEBEDE-VERIFIED-LOG",buyerReceivedTimestamp:(t==null?void 0:t.status)==="delivered"?"09:45 AM (Bole Depot)":void 0,transitStatus:(t==null?void 0:t.status)==="delivered"?"DeliveredWithGPS":(t==null?void 0:t.status)==="picked_up"?"InTransit":"Dispatched"}}getLegalContract(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{contractNumber:(t==null?void 0:t.contractNumber)||`AGR-CONTR-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,agreementDate:new Date().toLocaleDateString("en-GB"),effectiveDate:new Date().toLocaleDateString("en-GB"),sellerName:(t==null?void 0:t.farmerName)||"Abebe Bekele",sellerIdNumber:"FAYDA-ET-8829104",sellerLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu, Oromia, Ethiopia",buyerName:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun (FreshMart Wholesale)",buyerTinNumber:"TIN-ET-9912001",buyerLocation:(t==null?void 0:t.deliveryAddress)||"Addis Ababa, Ethiopia",cropType:(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes",contractedQuantityKg:(t==null?void 0:t.qtyKg)||200,agreedPricePerKg:(t==null?void 0:t.pricePerKg)||45,totalContractValueEtb:(t==null?void 0:t.totalEtb)||9e3,qualityStandardClause:"Produce shall conform to Grade 1 Ethiopian Commodity Quality Standards (Maximum defect tolerance 2.5%, moisture within physiological thresholds).",deliveryTimeline:"Direct farm-to-depot transit guaranteed within 12 hours of farmer harvest confirmation.",escrowClauseText:"Purchase consideration is locked in Telebirr C2B Escrow and shall be automatically disbursed (90% Farmer / 5% Driver / 5% Platform) upon buyer delivery verification.",forceMajeureClauseText:"Neither party shall be liable for delivery failure caused by natural agricultural catastrophes, unseasonal frost, or national logistical force majeure.",disputeJurisdiction:"Federal Democratic Republic of Ethiopia Commercial Code and Ethiopian Agricultural Authority Arbitration Rules.",eSignatures:{sellerSigned:!0,sellerSignDate:"Digitally Authenticated via OTP/Fayda",buyerSigned:!0,buyerSignDate:"Digitally Authenticated via Telebirr Escrow Lock",platformWitnessHash:`EABC-FM-TRUST-SEAL-${e.slice(0,8).toUpperCase()}`}}}getDisputeMediationRecord(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{caseNumber:(t==null?void 0:t.arbitrationDecreeNumber)||`ARB-CASE-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,filingDate:"Yesterday 3:15 PM",resolutionDate:(t==null?void 0:t.status)==="disputed"?void 0:"Today 11:30 AM",status:(t==null?void 0:t.status)==="disputed"?"UnderInvestigation":"Settled",claimantBuyer:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun",respondentFarmer:(t==null?void 0:t.farmerName)||"Chala Gemechu",freightCarrier:(t==null?void 0:t.driverName)||"Dawit Kebede",totalDisputedAmountEtb:(t==null?void 0:t.totalEtb)||9e3,disputeReason:(t==null?void 0:t.disputeReason)||"Delivered avocados were overripe and 20% bruised during transit from Hawassa.",claimedDefectPercentage:(t==null?void 0:t.requestedRefundPercent)||50,inspectionReport:"Independent physical inspection at Bole Cold Storage Depot confirmed 18.5% transit softening on batch packaging.",photoEvidenceUrl:(t==null?void 0:t.disputePhoto)||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",leadArbitratorName:"Sara Mengistu (Marketplace Compliance Arbitrator)",legalFindingSummary:"Partial packaging failure during transit. Fair 50/50 equitable split awarded under Ethiopian Commercial Code Art. 2289.",arbitrationVerdict:"FiftyFiftySplit",farmerSettlementEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),buyerRefundEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),platformDecreeHash:`LEGAL-DECREE-ARB-${e.slice(0,8).toUpperCase()}`}}getPriceBenchmarks(){return this.priceBenchmarks}getStandingOrders(){return this.standingOrders}addStandingOrder(e,t,s){const a=this.listings.find(n=>n.id===e),r={id:"so-"+Date.now(),listingId:e,productName:(a==null?void 0:a.productName)||"Fresh Produce",productNameAm:a==null?void 0:a.nameAm,farmerName:(a==null?void 0:a.farmerName)||"Abebe Bekele",qtyKg:t,pricePerKg:(a==null?void 0:a.pricePerKg)||45,frequency:s,nextDeliveryDate:s==="Weekly"?"Next Monday, 8:00 AM":"Every 2nd Thursday",active:!0,createdAt:new Date().toISOString()};return this.standingOrders.unshift(r),this.notify(),r}toggleStandingOrder(e){const t=this.standingOrders.find(s=>s.id===e);t&&(t.active=!t.active,this.notify())}getKycQueue(){return this.kycQueue}async verifyKyc(e,t){const s=this.kycQueue.find(a=>a.userId===e);if(s){s.status=t?"Verified":"Rejected";try{await fetch(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${s.status}`,{method:"PUT",headers:this.getAuthHeaders()})}catch(a){console.warn("KYC update remote failed, updating local state",a)}this.addNotification({id:"notif-kyc-"+Date.now(),userId:e,type:"kyc",channel:"sms",messageEn:t?"🛡️ [Fayda KYC Verification Approved] Your national ID, Kebele farming certification, and business documents have been verified. Verified Producer badge activated!":"⚠️ [KYC Verification Notice] Your document submission requires revision. Please check your account profile or re-upload documents.",messageAm:t?"🛡️ [የፋይዳ ማረጋገጫ ጸድቋል] የእርስዎ ብሔራዊ መታወቂያ እና የቀበሌ እርሻ ሰነዶች ተረጋግጠዋል። የተረጋገጠ አምራች ባጅ ነቅቷል!":"⚠️ [የሰነድ ማረጋገጫ ማስታወቂያ] ያስገቡት ሰነድ ማስተካከያ ይፈልጋል። እባክዎ ሰነዶችን እንደገና ያስገቡ።",read:!1,createdAt:new Date().toISOString()}),this.notify()}}getAnomalyAlerts(){return this.anomalyAlerts}getRegionalAnalytics(){return this.regionalAnalytics}getOptimizedRoute(){return{id:"route-oromia-addis-01",title:"Consolidated East Shewa Multi-Farm Route",totalDistanceKm:68.4,estimatedHours:2.5,totalWeightKg:2800,driverCommissionEtb:1450,ruralSubsidyEtb:350,stops:[{stopNumber:1,type:"pickup",locationName:"Bishoftu Green Farms (Abebe Bekele)",contactName:"Abebe Bekele",phone:"+251 911 223 344",cargoDetails:"Fresh Sholla Red Tomatoes",weightKg:1200,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Valley Farm (Almaz Hailu)",contactName:"Almaz Hailu",phone:"+251 922 334 455",cargoDetails:"Awash Valley Red Onions",weightKg:1600,completed:!1},{stopNumber:3,type:"dropoff",locationName:"FreshMart Central Wholesale Hub (Bole, Addis Ababa)",contactName:"Bethlehem Tilahun",phone:"+251 955 667 788",cargoDetails:"Consolidated Wholesale Dropoff (2,800 kg total)",weightKg:2800,completed:!1}]}}updateDriverVehicle(e,t,s){this.currentUser&&this.currentUser.role==="driver"&&(this.currentUser.vehicleType=e,this.currentUser.refrigerationType=t,this.currentUser.vehicleCapacityKg=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify())}toggleOfflineMode(){return this.isOfflineMode=!this.isOfflineMode,this.notify(),this.isOfflineMode}getIsOfflineMode(){return this.isOfflineMode}getOfflineQueue(){return this.offlineQueue}async syncOfflineQueue(){var s;const e=this.offlineQueue.filter(a=>!a.synced);for(const a of e)a.type==="pickup"&&await this.pickupOrderByDriver(a.orderId,(s=a.data)==null?void 0:s.photo),a.synced=!0;const t=e.length;return this.offlineQueue=[],this.saveOfflineQueue(),this.notify(),t}async sendInboundSms(e,t){try{const s=await fetch("/api/sms/inbound",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:e,body:t})});if(s.ok){const a=await s.json();return await this.refreshAllData(),a.response}}catch(s){console.warn("SMS Webhook call failed, simulating response",s)}return`[SIMULATED SMS ACK] Received: "${t}". Processed successfully in offline cache.`}simulateVoiceTranscription(e,t){return t==="am"?{productName:"Fresh Sholla Red Tomatoes",nameAm:"የሾላ ቀይ ቲማቲም",category:"Vegetables",qtyKg:1500,pricePerKg:45,region:"Oromia (Bishoftu)",transcript:"1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"}:t==="om"?{productName:"Awash Red Onions",nameAm:"የአዋሽ ቀይ ሽንኩርት",category:"Vegetables",qtyKg:2e3,pricePerKg:55,region:"Oromia (Adama)",transcript:"Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."}:{productName:"Grade 1 Specialty Green Coffee",nameAm:"የይርጋጨፌ ስፔሻሊቲ ቡና",category:"Coffee",qtyKg:800,pricePerKg:380,region:"SNNPR (Yirgacheffe)",transcript:"We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."}}requestWalletWithdrawal(e,t){return this.currentUser?(this.currentUser.walletBalanceEtb=Math.max(0,(this.currentUser.walletBalanceEtb||48200)-e),this.farmerSummary.releasedEtb+=e,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify(),!0):!1}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round(Number(t.totalEarnedEtb)*.02)}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount,ruralBonusEtb:1250}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount,totalMetricTonsMoved:Number(t.totalMetricTonsMoved||145.8),middlemanMarginSavedEtb:Number(t.middlemanMarginSavedEtb||48e4),totalVatRemittedEtb:Number(t.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:Number(t.totalTransactionVolumeEtb)*.02}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(a=>{var r;return a.farmerId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.farmerCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:s||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(a=>a.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round((t||this.farmerSummary.totalEarnedEtb)*.02)}}getDriverSummary(){const e=this.orders.filter(a=>{var r;return a.driverId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.driverCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:s||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(a=>a.status==="delivered").length||this.driverSummary.deliveredTripsCount,ruralBonusEtb:1250}}getPlatformStats(){const e=this.orders.reduce((r,n)=>r+n.totalEtb,0),t=this.orders.filter(r=>r.status==="delivered").reduce((r,n)=>r+n.platformCut,0),s=this.orders.filter(r=>r.escrowHeld).reduce((r,n)=>r+n.totalEtb,0),a=this.orders.filter(r=>r.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:s||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:a||this.platformStats.disputedOrdersCount,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:(t||this.platformStats.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:(e||this.platformStats.totalTransactionVolumeEtb)*.02}}getNotifications(){if(!this.isUserLoggedIn||!this.currentUser||!this.isAuthenticated())return[];const e=(this.currentUser.id||"").toLowerCase().trim(),t=(this.currentUser.role||"buyer").toLowerCase();return this.notifications.filter(s=>{const a=(s.userId||"").toLowerCase().trim();return!!(t==="admin"||t==="superadmin"||a&&(a===e||e.includes(a)||a.includes(e))||s.type==="broadcast"||t==="farmer"&&(s.type==="order"||s.type==="review"||s.type==="payout"||s.type==="kyc"||s.type==="dispute")&&(!a||a.startsWith("11111111")||a===e)||t==="driver"&&(s.type==="dispatch"||s.type==="payout")&&(!a||a.startsWith("55555555")||a===e)||t==="buyer"&&(s.type==="refund"||s.type==="order"||s.type==="dispatch"||s.type==="dispute_resolution"||s.type==="review")&&(!a||a.startsWith("44444444")||a===e))})}markAllNotificationsRead(){this.getNotifications().forEach(t=>{t.read=!0}),this.saveNotificationsToStorage(),this.notify()}addNotification(e){this.notifications.unshift(e),this.saveNotificationsToStorage(),this.notify()}async broadcastSms(e,t,s){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:s})})}catch(a){console.warn("Broadcast SMS API call error",a)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${s.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${s}] ${t}`,read:!1,createdAt:new Date().toISOString()}),this.notify())}async submitVerificationDocuments(e,t){if(this.currentUser){this.currentUser.tinNumber=e,this.currentUser.verificationStatus="UnderReview",this.currentUser.rejectionReason=void 0;const s=t.map((n,i)=>({id:"doc-self-"+i+"-"+Date.now(),userId:this.currentUser.id,documentType:n.documentType,documentNumber:n.documentNumber,frontImageUrl:n.frontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:n.backImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}));this.currentUser.documents=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const a={userId:this.currentUser.id,userName:this.currentUser.name,userNameAm:this.currentUser.nameAm,userRole:this.currentUser.role.charAt(0).toUpperCase()+this.currentUser.role.slice(1),phone:this.currentUser.phone,region:this.currentUser.region,registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:e,registeredAt:"Just now",documents:s,reviews:[]},r=this.verificationQueue.findIndex(n=>n.userId===this.currentUser.id);r>=0?this.verificationQueue[r]=a:this.verificationQueue.unshift(a)}try{await fetch("/api/verification/submit",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({tinNumber:e,documents:t})})}catch(s){console.warn("Backend verification submit fallback to local state",s)}this.notify()}async agentRegisterFarmer(e){var d,c,o,m;const t=e.phone.startsWith("+251")?e.phone:"+251"+e.phone.replace(/^0+/,""),s="agent-f-"+Date.now(),a={id:s,name:e.name,nameAm:e.nameAm||e.name,phone:t,region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,status:"UnderReview",registeredAt:"Just now",faydaFrontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"};this.agentRegisteredFarmers.unshift(a);const r={userId:s,userName:e.name,userNameAm:e.nameAm,userRole:"Farmer",phone:t,region:e.region,registrationMethod:"Agent",registeredByAgentName:((d=this.currentUser)==null?void 0:d.name)||"Community Field Agent",verificationStatus:"UnderReview",tinNumber:e.tinNumber,registeredAt:"Just now",documents:[{id:"doc-ag-1-"+Date.now(),userId:s,documentType:"FaydaId",documentNumber:e.faydaId||"FAN-PENDING",frontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:e.faydaBackImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}],reviews:[]};this.verificationQueue.unshift(r);const n={id:s,name:e.name,nameAm:e.nameAm||e.name,phone:t,role:"farmer",region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,verified:!1,verificationStatus:"UnderReview",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},i=this.allUsers.findIndex(f=>f.id===s||f.phone===t);i!==-1?this.allUsers[i]={...this.allUsers[i],...n}:this.allUsers.unshift(n),this.saveUsersToStorage(),this.addAuditLog({actorId:((c=this.currentUser)==null?void 0:c.id)||"agent-01",actorName:((o=this.currentUser)==null?void 0:o.name)||"Field Agent",actorRole:((m=this.currentUser)==null?void 0:m.role)||"agent",action:"AGENT_ONBOARD_FARMER",category:"USER_CRUD",targetResource:"User",targetId:s,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Field agent onboarded farmer: ${e.name} (${t}) in ${e.region}.`});try{await fetch("/api/verification/agent-register",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(e)})}catch(f){console.warn("Agent register farmer fallback to local state",f)}return this.notify(),a}async reviewVerification(e,t,s,a){var i;const r=this.verificationQueue.find(d=>d.userId===e);r&&(r.verificationStatus=t==="Approve"?"Approved":"Rejected",r.rejectionReason=t==="Reject"?a||s||"Document image was illegible":void 0,r.reviews.unshift({id:"rev-"+Date.now(),userId:e,reviewerName:((i=this.currentUser)==null?void 0:i.name)||"Sara Mengistu (Admin)",actionTaken:t,notes:s||a||(t==="Approve"?"All records verified.":"Verification rejected."),timestamp:"Just now"}),r.documents.forEach(d=>{d.status=t==="Approve"?"Approved":"Rejected",d.rejectionReason=r.rejectionReason}));const n=this.agentRegisteredFarmers.find(d=>d.id===e);n&&(n.status=t==="Approve"?"Approved":"Rejected"),this.currentUser&&this.currentUser.id===e&&(this.currentUser.verificationStatus=t==="Approve"?"Approved":"Rejected",this.currentUser.verified=t==="Approve",this.currentUser.rejectionReason=r==null?void 0:r.rejectionReason,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)));try{await fetch(`/api/verification/${e}/review`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({action:t,notes:s,rejectionReason:a})})}catch(d){console.warn("Review verification remote call failed, updated local state",d)}this.notify()}getVerificationQueue(e,t){let s=[...this.verificationQueue];return e&&e!=="All"&&(s=s.filter(a=>a.userRole.toLowerCase()===e.toLowerCase())),t&&t!=="All"&&(s=s.filter(a=>a.verificationStatus===t)),s}async fetchVerificationQueue(){if(!this.isAuthenticated())return this.verificationQueue;try{const e=await fetch("/api/verification/queue",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();Array.isArray(t)&&t.length>0&&(this.verificationQueue=t,this.notify())}}catch(e){console.warn("Fetch verification queue failed, using local queue",e)}return this.verificationQueue}getAgentRegisteredFarmers(){return this.agentRegisteredFarmers}getVerificationStatus(e){var t,s;if(e){const a=this.verificationQueue.find(r=>r.userId===e);if(a)return a.verificationStatus}return((t=this.currentUser)==null?void 0:t.verificationStatus)||((s=this.currentUser)!=null&&s.verified?"Approved":"PendingSubmission")}async sendInboundUssdSimulation(e,t){return t.includes("*990#")||t.includes("*805#")?`Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit
Reply with number:`:t==="1"?"Welcome! Enter your Name & Woreda (e.g., Bekele Bishoftu):":t==="2"?"Enter your 16-digit Fayda ID Number or FAN-XXXX-XXXX-XXXX:":t==="3"?"Your Telebirr Escrow Balance is 48,200 ETB. Payout available at local agent.":t==="4"?"Agent Kassahun Tolessa (+251988776655) has been assigned to visit your farm within 48 hours.":`Farmer-to-Market: Command received. SMS confirmation dispatched to ${e}.`}saveUsersToStorage(){try{localStorage.setItem("farmerMarketAllUsers",JSON.stringify(this.allUsers))}catch(e){console.warn("Failed to persist users to localStorage",e)}}async fetchUsers(){try{const e=await fetch("/api/auth/demo-users");if(e.ok){const t=await e.json();if(Array.isArray(t)){let s=!1;t.forEach(a=>{const r=a.phone.replace(/\s+/g,"");if(!this.isDeletedUser(a.id,r)&&!this.allUsers.find(i=>i.phone.replace(/\s+/g,"")===r)){const i={id:a.id||"db-"+r.replace(/\D/g,""),phone:a.phone,name:a.name,nameAm:a.nameAm,role:(a.role||"buyer").toLowerCase(),region:a.region||"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",createdAt:new Date().toISOString()};this.allUsers.push(i),s=!0}}),s&&(this.saveUsersToStorage(),this.notify())}}}catch(e){console.warn("Fetch remote users failed, using local user list",e)}return this.getAllUsers()}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchReviews(),this.fetchSummaries(),this.fetchVerificationQueue(),this.fetchUsers()]),this.recalculateAllFarmerRatings(),this.notify()}getAllUsers(){const e=new Map;if(this.allUsers.forEach(t=>{this.isDeletedUser(t.id,t.phone)||(t.phone?e.set(t.phone.replace(/\s+/g,""),t):t.id&&e.set(t.id,t))}),this.verificationQueue.forEach(t=>{var a,r;const s=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.userId,s))if(e.has(s)){const n=e.get(s);n.verificationStatus=t.verificationStatus,n.verified=t.verificationStatus==="Approved",t.tinNumber&&(n.tinNumber=t.tinNumber)}else{const n={id:t.userId||"vq-"+s.replace(/\D/g,""),name:t.userName,nameAm:t.userNameAm,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.verificationStatus==="Approved",verificationStatus:t.verificationStatus,status:"active",tinNumber:t.tinNumber,faydaId:(r=(a=t.documents)==null?void 0:a.find(i=>i.documentType==="FaydaId"))==null?void 0:r.documentNumber,createdAt:t.registeredAt||new Date().toISOString()};e.set(s,n),this.allUsers.push(n)}}),this.kycQueue.forEach(t=>{const s=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.userId,s)&&!e.has(s)){const a={id:t.userId||"kyc-"+s.replace(/\D/g,""),name:t.userName,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.status==="Verified",verificationStatus:t.status==="Verified"?"Approved":"UnderReview",status:"active",tinNumber:t.tinNumber,faydaId:t.documentNumber,createdAt:t.submittedAt||new Date().toISOString()};e.set(s,a),this.allUsers.push(a)}}),this.agentRegisteredFarmers.forEach(t=>{const s=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.id,s)&&!e.has(s)){const a={id:t.id,name:t.name,nameAm:t.nameAm,phone:t.phone,role:"farmer",region:t.region,kebele:t.kebele,primaryCrop:t.primaryCrop,faydaId:t.faydaId,tinNumber:t.tinNumber,verified:t.status==="Approved",verificationStatus:t.status,status:"active",createdAt:t.registeredAt||new Date().toISOString()};e.set(s,a),this.allUsers.push(a)}}),this.currentUser&&this.currentUser.phone&&!this.isDeletedUser(this.currentUser.id,this.currentUser.phone)){const t=this.currentUser.phone.replace(/\s+/g,"");e.has(t)||(e.set(t,this.currentUser),this.allUsers.push(this.currentUser))}return Array.from(e.values()).filter(t=>!this.isDeletedUser(t.id,t.phone))}getUserById(e){const t=(e||"").trim();if(t)return this.getAllUsers().find(s=>s.id===t||s.phone===t||s.phone.replace(/\s+/g,"")===t.replace(/\s+/g,""))}createUser(e){var a,r,n;const t=e.phone.startsWith("+251")?e.phone.replace(/\s+/g,""):"+251"+e.phone.replace(/^0+/,"").replace(/\s+/g,"");this.deletedUserIds.delete(t.toLowerCase()),this.deletedUserIds.delete(t.replace(/\D/g,"")),this.saveDeletedUsers();const s={id:crypto.randomUUID?crypto.randomUUID():"user-"+Date.now(),name:e.name,nameAm:e.nameAm,phone:t,role:e.role,region:e.region,verified:e.verified??!0,verificationStatus:e.verified??!0?"Approved":"PendingSubmission",status:e.status??"active",tinNumber:e.tinNumber,businessLicenseNumber:e.businessLicenseNumber,vehicleType:e.vehicleType,refrigerationType:e.refrigerationType,vehicleCapacityKg:e.vehicleCapacityKg,primaryCrop:e.primaryCrop,kebele:e.kebele,faydaId:e.faydaId,permissions:e.permissions,createdAt:new Date().toISOString()};return this.allUsers=this.allUsers.filter(i=>i.phone.replace(/\s+/g,"")!==t),this.allUsers.unshift(s),this.saveUsersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"00000000-0000-0000-0000-000000000001",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((n=this.currentUser)==null?void 0:n.role)||"superadmin",action:"CREATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:s.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Created new ${s.role.toUpperCase()} account: ${s.name} (${s.phone}) in ${s.region}.`}),this.notify(),s}updateUser(e,t){var i,d,c;let s=this.allUsers.findIndex(o=>o.id===e||o.phone===e||o.phone.replace(/\s+/g,"")===e.replace(/\s+/g,""));if(s===-1){const o=this.getUserById(e);o&&(this.allUsers.push(o),s=this.allUsers.length-1)}if(s===-1)throw new Error("User not found");const a={...this.allUsers[s]};this.allUsers[s]={...this.allUsers[s],...t};const r=this.allUsers[s],n=r.phone.replace(/\s+/g,"");return this.verificationQueue.forEach(o=>{(o.userId===r.id||o.phone.replace(/\s+/g,"")===n)&&(o.userName=r.name,r.nameAm&&(o.userNameAm=r.nameAm),o.userRole=r.role,o.region=r.region,r.tinNumber&&(o.tinNumber=r.tinNumber))}),this.currentUser&&(this.currentUser.id===r.id||this.currentUser.phone.replace(/\s+/g,"")===n)&&(this.currentUser={...this.currentUser,...r},localStorage.setItem("currentUser",JSON.stringify(this.currentUser))),this.saveUsersToStorage(),this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"00000000-0000-0000-0000-000000000001",actorName:((d=this.currentUser)==null?void 0:d.name)||"Super Admin",actorRole:((c=this.currentUser)==null?void 0:c.role)||"superadmin",action:"UPDATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:r.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated user profile for ${r.name} (${r.role.toUpperCase()}, ${r.phone}). Status: ${r.status||"active"}.`,preState:a,postState:r}),this.notify(),r}deleteUser(e){var n,i,d;const t=this.getUserById(e);if(!t)return!1;const s=t.phone.replace(/\s+/g,""),a=t.id;return this.deletedUserIds.add(a.toLowerCase()),this.deletedUserIds.add(s.toLowerCase()),this.deletedUserIds.add(s.replace(/\D/g,"")),this.saveDeletedUsers(),this.allUsers=this.allUsers.filter(c=>c.id!==a&&c.phone.replace(/\s+/g,"")!==s),this.verificationQueue=this.verificationQueue.filter(c=>c.userId!==a&&c.phone.replace(/\s+/g,"")!==s),this.kycQueue=this.kycQueue.filter(c=>c.userId!==a&&c.phone.replace(/\s+/g,"")!==s),this.agentRegisteredFarmers=this.agentRegisteredFarmers.filter(c=>c.id!==a&&c.phone.replace(/\s+/g,"")!==s),this.currentUser&&(this.currentUser.id===a||this.currentUser.phone.replace(/\s+/g,"")===s)&&this.impersonationOriginalUser&&this.stopImpersonation(),this.saveUsersToStorage(),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(a)&&this.token&&fetch(`/api/superadmin/users/${a}`,{method:"DELETE",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}}).catch(c=>console.warn("Backend user delete sync skipped/failed:",c)),this.addAuditLog({actorId:((n=this.currentUser)==null?void 0:n.id)||"00000000-0000-0000-0000-000000000001",actorName:((i=this.currentUser)==null?void 0:i.name)||"Super Admin",actorRole:((d=this.currentUser)==null?void 0:d.role)||"superadmin",action:"DELETE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:a,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Permanently deleted user account: ${t.name} (${t.role.toUpperCase()}, ${t.phone}).`}),this.notify(),!0}toggleUserSuspension(e,t){var i,d,c;let s=this.allUsers.find(o=>o.id===e||o.phone===e||o.phone.replace(/\s+/g,"")===e.replace(/\s+/g,""));if(s||(s=this.getUserById(e),s&&!this.allUsers.some(o=>o.id===s.id)&&this.allUsers.push(s)),!s)throw new Error("User not found");const a=t||(s.status==="suspended"?"active":"suspended");s.status=a;const r=s.phone.replace(/\s+/g,"");if(this.allUsers.forEach(o=>{(o.id===s.id||o.phone.replace(/\s+/g,"")===r)&&(o.status=a)}),this.currentUser&&(this.currentUser.id===s.id||this.currentUser.phone.replace(/\s+/g,"")===r)&&(this.currentUser.status=a,localStorage.setItem("currentUser",JSON.stringify(this.currentUser))),this.saveUsersToStorage(),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.id)&&this.token){const o=s.role==="admin"?`/api/superadmin/admins/${s.id}/status`:`/api/admin/users/${s.id}/status`;fetch(o,{method:"PUT",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"},body:JSON.stringify({status:a})}).catch(m=>console.warn("Backend user status sync skipped/failed:",m))}return this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"00000000-0000-0000-0000-000000000001",actorName:((d=this.currentUser)==null?void 0:d.name)||"Super Admin",actorRole:((c=this.currentUser)==null?void 0:c.role)||"superadmin",action:a==="suspended"?"SUSPEND_USER_ACCOUNT":"REINSTATE_USER_ACCOUNT",category:"EMERGENCY",targetResource:"User",targetId:s.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${a==="suspended"?"Suspended account access":"Reinstated account access"} for ${s.name} (${s.role.toUpperCase()}, ${s.phone}).`}),this.notify(),s}startImpersonation(e){var s,a,r;const t=this.allUsers.find(n=>n.id===e);return t?(!this.impersonationOriginalUser&&((s=this.currentUser)==null?void 0:s.role)==="superadmin"&&(this.impersonationOriginalUser={...this.currentUser}),this.currentUser=t,localStorage.setItem("currentUser",JSON.stringify(t)),this.addAuditLog({actorId:((a=this.impersonationOriginalUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.impersonationOriginalUser)==null?void 0:r.name)||"Super Admin",actorRole:"superadmin",action:"START_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin initiated live impersonation support session as '${t.name}' (${t.role}).`}),this.notify(),t):null}stopImpersonation(){if(!this.impersonationOriginalUser)return this.currentUser;const e={...this.impersonationOriginalUser},t=this.currentUser;return this.currentUser=e,this.impersonationOriginalUser=null,localStorage.setItem("currentUser",JSON.stringify(e)),this.addAuditLog({actorId:e.id,actorName:e.name,actorRole:"superadmin",action:"END_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t==null?void 0:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin exited impersonation session for '${t==null?void 0:t.name}'. Returned to Super Admin dashboard.`}),this.notify(),e}isImpersonating(){return!!this.impersonationOriginalUser}getOriginalSuperAdmin(){return this.impersonationOriginalUser}getPlatformConfig(){return this.platformConfig}updatePlatformConfig(e){var s,a,r;const t={...this.platformConfig};return this.platformConfig={...this.platformConfig,...e},this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"UPDATE_PLATFORM_CONFIG",category:"CONFIG",targetResource:"PlatformConfig",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated platform configuration: Escrow split (${this.platformConfig.farmerSharePercent}/${this.platformConfig.driverSharePercent}/${this.platformConfig.platformFeePercent}), Escrow Frozen: ${this.platformConfig.emergencyEscrowFrozen}.`,preState:t,postState:this.platformConfig}),this.notify(),this.platformConfig}getSystemAuditLogs(){return this.systemAuditLogs}addAuditLog(e){const t={...e,id:"log-"+(this.systemAuditLogs.length+101),timestamp:new Date().toLocaleString()};return this.systemAuditLogs.unshift(t),t}getDeliveryZones(){return this.deliveryZones}addDeliveryZone(e){var s,a,r;const t={...e,id:"zone-"+(this.deliveryZones.length+1)};return this.deliveryZones.push(t),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"ADD_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Added new regional delivery zone: ${t.name} (Base radius ${t.baseRadiusKm} km).`}),this.notify(),t}updateDeliveryZone(e,t){var a,r,n;const s=this.deliveryZones.findIndex(i=>i.id===e);if(s===-1)throw new Error("Zone not found");return this.deliveryZones[s]={...this.deliveryZones[s],...t},this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((n=this.currentUser)==null?void 0:n.role)||"superadmin",action:"UPDATE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated delivery zone '${this.deliveryZones[s].name}' configuration.`}),this.notify(),this.deliveryZones[s]}deleteDeliveryZone(e){var s,a,r;const t=this.deliveryZones.find(n=>n.id===e);return t?(this.deliveryZones=this.deliveryZones.filter(n=>n.id!==e),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"DELETE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted delivery zone: ${t.name}.`}),this.notify(),!0):!1}getFeatureFlags(){return this.featureFlags}toggleFeatureFlag(e,t){var a,r,n;const s=this.featureFlags.find(i=>i.key===e);if(!s)throw new Error("Feature flag not found");return s.enabled=t!==void 0?t:!s.enabled,this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((n=this.currentUser)==null?void 0:n.role)||"superadmin",action:"TOGGLE_FEATURE_FLAG",category:"CONFIG",targetResource:"FeatureFlag",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${s.enabled?"Enabled":"Disabled"} feature flag: ${s.name} (${e}).`}),this.notify(),s}getPendingPayoutApprovals(){return this.payoutApprovals}approvePayout(e,t){var a;const s=this.payoutApprovals.find(r=>r.id===e);return s?(s.status="Approved",s.reviewedBy=t,s.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"APPROVE_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Authorized high-value Telebirr payout of ${s.amountEtb.toLocaleString()} ETB for ${s.recipientName} (${s.recipientPhone}).`}),this.notify(),!0):!1}rejectPayout(e,t,s="High-risk audit anomaly"){var r;const a=this.payoutApprovals.find(n=>n.id===e);return a?(a.status="Rejected",a.reviewedBy=t,a.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"REJECT_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Declined payout of ${a.amountEtb.toLocaleString()} ETB for ${a.recipientName}. Reason: ${s}.`}),this.notify(),!0):!1}getGlobalBusinessRules(){return this.globalBusinessRules}updateGlobalBusinessRules(e){var t,s,a;return this.globalBusinessRules={...this.globalBusinessRules,...e},this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:((a=this.currentUser)==null?void 0:a.role)||"superadmin",action:"UPDATE_BUSINESS_RULES",category:"CONFIG",targetResource:"GlobalBusinessRules",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated global trading rules: Min ${this.globalBusinessRules.minOrderKg} kg, Max ${this.globalBusinessRules.maxOrderKg} kg, Max Distance ${this.globalBusinessRules.maxDistanceKm} km.`}),this.notify(),this.globalBusinessRules}getBlacklist(){return this.blacklist}addToBlacklist(e){var s;const t={...e,id:"bl-"+(this.blacklist.length+1).toString().padStart(2,"0"),blacklistedAt:new Date().toISOString().split("T")[0]};return this.blacklist.unshift(t),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:e.blacklistedBy,actorRole:"superadmin",action:"ADD_TO_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Blacklisted ${t.type}: ${t.value}. Reason: ${t.reason}.`}),this.notify(),t}removeFromBlacklist(e){var s,a;const t=this.blacklist.find(r=>r.id===e);return t?(this.blacklist=this.blacklist.filter(r=>r.id!==e),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:"superadmin",action:"REMOVE_FROM_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Removed ${t.type} (${t.value}) from platform blacklist.`}),this.notify(),!0):!1}triggerDatabaseBackup(){var t,s;const e={backupId:"BK-PG16-"+Date.now(),sizeMb:248.5,timestamp:new Date().toLocaleString(),downloadUrl:"#pg-backup-download"};return this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:"superadmin",action:"TRIGGER_DATABASE_BACKUP",category:"CONFIG",targetResource:"PostgreSQL_Snapshot",targetId:e.backupId,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Generated encrypted PostgreSQL schema and transaction data snapshot (${e.backupId}, 248.5 MB).`}),this.notify(),e}exportPlatformData(e){var n,i;const t=`FarmerMarket_FullExport_${new Date().toISOString().split("T")[0]}.${e}`;let s="";e==="json"?s=JSON.stringify({users:this.allUsers,listings:this.listings,orders:this.orders,platformConfig:this.platformConfig,deliveryZones:this.deliveryZones,auditLogs:this.systemAuditLogs},null,2):s=`Type,Id,Name,Phone,Role,Region,Status,CreatedAt
`+this.allUsers.map(d=>`User,${d.id},"${d.name}",${d.phone},${d.role},"${d.region}",${d.status||"active"},${d.createdAt}`).join(`
`);const a=new Blob([s],{type:e==="json"?"application/json":"text/csv"}),r=URL.createObjectURL(a);return this.addAuditLog({actorId:((n=this.currentUser)==null?void 0:n.id)||"superadmin-01",actorName:((i=this.currentUser)==null?void 0:i.name)||"Super Admin",actorRole:"superadmin",action:"EXPORT_PLATFORM_DATA",category:"CONFIG",targetResource:"DataExport",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Exported full platform data snapshot in ${e.toUpperCase()} format (${t}).`}),{filename:t,dataUrl:r}}getBanners(){return[...this.banners].sort((e,t)=>t.priority-e.priority)}getActiveBanners(e="All",t="All"){return this.banners.filter(s=>s.isActive).filter(s=>s.targetAudience==="All"||s.targetAudience.toLowerCase()===e.toLowerCase()||e==="All").filter(s=>!s.targetRegion||s.targetRegion==="All"||s.targetRegion.toLowerCase()===t.toLowerCase()||t==="All").sort((s,a)=>a.priority-s.priority)}getBannerById(e){return this.banners.find(t=>t.id===e)}createBanner(e){var s,a,r,n;const t={id:crypto.randomUUID?crypto.randomUUID():"banner-"+Date.now(),title:e.title,titleAm:e.titleAm,subtitle:e.subtitle,subtitleAm:e.subtitleAm,badgeText:e.badgeText,badgeTextAm:e.badgeTextAm,imageUrl:e.imageUrl||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",targetAudience:e.targetAudience||"All",targetRegion:e.targetRegion||"All",ctaText:e.ctaText,ctaTextAm:e.ctaTextAm,ctaLink:e.ctaLink||"marketplace",themeGradient:e.themeGradient||"from-emerald-900 via-teal-900 to-slate-900",priority:Number(e.priority)||5,isActive:e.isActive??!0,createdAt:new Date().toISOString(),createdBy:((s=this.currentUser)==null?void 0:s.name)||"Platform Admin"};return this.banners.unshift(t),this.saveBannersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((n=this.currentUser)==null?void 0:n.role)||"admin",action:"CREATE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Created promotional banner: "${t.title}" for audience: ${t.targetAudience}.`}),this.notify(),t}updateBanner(e,t){var a,r,n;const s=this.banners.findIndex(i=>i.id===e);return s===-1?null:(this.banners[s]={...this.banners[s],...t},this.saveBannersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((n=this.currentUser)==null?void 0:n.role)||"admin",action:"UPDATE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated promotional banner "${this.banners[s].title}". Status: ${this.banners[s].isActive?"Active":"Inactive"}.`}),this.notify(),this.banners[s])}toggleBannerStatus(e,t){var a,r,n;const s=this.banners.find(i=>i.id===e);return s?(s.isActive=t!==void 0?t:!s.isActive,this.saveBannersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((n=this.currentUser)==null?void 0:n.role)||"admin",action:s.isActive?"ACTIVATE_BANNER":"DEACTIVATE_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${s.isActive?"Activated":"Deactivated"} banner: "${s.title}".`}),this.notify(),!0):!1}deleteBanner(e){var s,a,r;const t=this.banners.find(n=>n.id===e);return t?(this.banners=this.banners.filter(n=>n.id!==e),this.saveBannersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"admin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Administrator",actorRole:((r=this.currentUser)==null?void 0:r.role)||"admin",action:"DELETE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted promotional banner: "${t.title}".`}),this.notify(),!0):!1}saveBannersToStorage(){try{localStorage.setItem("farmerMarketBanners",JSON.stringify(this.banners))}catch(e){console.warn("Failed to save banners to localStorage",e)}}adminDeleteListing(e,t="Violates marketplace standards"){var r,n,i;const s=this.listings.find(d=>d.id===e);return s?(this.listings=this.listings.filter(d=>d.id!==e),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)&&this.token&&fetch(`/api/listings/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}}).catch(d=>console.warn("Backend listing delete failed/skipped:",d)),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"admin-01",actorName:((n=this.currentUser)==null?void 0:n.name)||"Administrator",actorRole:((i=this.currentUser)==null?void 0:i.role)||"admin",action:"DELETE_LISTING_POST",category:"USER_CRUD",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted listing post "${s.productName}" (Farmer: ${s.farmerName}, ${s.farmerPhone}). Reason: ${t}`}),this.notify(),!0):!1}adminUpdateListing(e,t){var i,d,c;const s=this.listings.findIndex(o=>o.id===e);if(s===-1)return null;const a={...this.listings[s]};this.listings[s]={...this.listings[s],...t};const r=this.listings[s];return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)&&this.token&&fetch(`/api/listings/${e}`,{method:"PUT",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"},body:JSON.stringify(t)}).catch(o=>console.warn("Backend listing update failed/skipped:",o)),this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"admin-01",actorName:((d=this.currentUser)==null?void 0:d.name)||"Administrator",actorRole:((c=this.currentUser)==null?void 0:c.role)||"admin",action:"MODERATE_LISTING_POST",category:"USER_CRUD",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Moderated/Updated listing "${r.productName}". Price: ${r.pricePerKg} ETB/kg, Stock: ${r.qtyKg} kg, Status: ${r.moderationStatus||"Approved"}.`,preState:a,postState:r}),this.notify(),r}flagListingAnomaly(e,t="Severe Price Variance Detected",s,a=!0,r){var o,m,f;const n=this.listings.find(x=>x.id===e);if(!n)return!1;n.moderationStatus="Flagged";const i=r||n.marketBenchmarkPrice||50,d=Math.round((n.pricePerKg-i)/i*100),c={id:"ANOM-"+Date.now().toString().slice(-4),severity:"High",type:"PriceManipulation",title:`Price Anomaly: ${n.productName}`,description:`${n.productName} listed by ${n.farmerName} (${n.farmerPhone}) at ${n.pricePerKg} ETB/kg (${d>0?"+":""}${d}% vs benchmark of ${i} ETB/kg). ${t}`,entityType:"Listing",entityId:n.id,detectedAt:"Just now"};return this.anomalyAlerts.unshift(c),this.addAuditLog({actorId:((o=this.currentUser)==null?void 0:o.id)||"admin-01",actorName:((m=this.currentUser)==null?void 0:m.name)||"Administrator",actorRole:((f=this.currentUser)==null?void 0:f.role)||"admin",action:"FLAG_LISTING_ANOMALY",category:"EMERGENCY",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Flagged listing "${n.productName}" for price anomaly: ${d>0?"+":""}${d}% variance against benchmark.`}),this.notify(),!0}loadStoredRolePermissions(){try{const e=localStorage.getItem("farmerMarketRolePermissions");if(e){const t=JSON.parse(e),s=JSON.parse(JSON.stringify(oe.DEFAULT_ROLE_PERMISSIONS));for(const a of Object.keys(oe.DEFAULT_ROLE_PERMISSIONS))t[a]&&(s[a]={...s[a],...t[a]});return s}}catch(e){console.warn("Failed to parse stored role permissions, using defaults.",e)}return JSON.parse(JSON.stringify(oe.DEFAULT_ROLE_PERMISSIONS))}reloadRolePermissionsFromStorage(){return this.rolePermissions=this.loadStoredRolePermissions(),this.notify(),this.rolePermissions}saveRolePermissionsToStorage(){try{localStorage.setItem("farmerMarketRolePermissions",JSON.stringify(this.rolePermissions))}catch(e){console.error("Failed to persist role permissions to localStorage",e)}}getPermissionsList(){return oe.ALL_PERMISSIONS}getAllRolePermissions(){return this.rolePermissions}getRolePermissions(e){return this.rolePermissions[e]||oe.DEFAULT_ROLE_PERMISSIONS[e]}hasRolePermission(e,t){if(e==="superadmin")return!0;const s=this.rolePermissions[e]||oe.DEFAULT_ROLE_PERMISSIONS[e];return s?!!s[t]:!1}hasPermission(e,t){const s=t!==void 0?t:this.currentUser;if(!s)return!1;if(s.role==="superadmin")return!0;const a=this.rolePermissions[s.role]||oe.DEFAULT_ROLE_PERMISSIONS[s.role];return!!(a&&a[e]===!0||s.permissions&&Array.isArray(s.permissions)&&s.permissions.length>0&&s.permissions.includes(e))}hasEffectivePermission(e,t){if(this.isImpersonating())return this.hasPermission(e);const s=this.currentUser;return s&&s.role!=="superadmin"?this.hasPermission(e,s):t?this.hasRolePermission(t,e):this.hasPermission(e,s)}updateRolePermissionKey(e,t,s){var a,r,n;return this.rolePermissions[e]||(this.rolePermissions[e]={...oe.DEFAULT_ROLE_PERMISSIONS[e]}),this.rolePermissions[e][t]=s,this.saveRolePermissionsToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Administrator",actorRole:((n=this.currentUser)==null?void 0:n.role)||"superadmin",action:"UPDATE_ROLE_PERMISSION",category:"CONFIG",targetResource:`Role:${e}`,targetId:t,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Set permission "${t}" for role "${e}" to ${s?"ENABLED":"DISABLED"}.`}),this.notify(),!0}updateRolePermissions(e,t){var s,a,r;return this.rolePermissions[e]||(this.rolePermissions[e]={...oe.DEFAULT_ROLE_PERMISSIONS[e]}),this.rolePermissions[e]={...this.rolePermissions[e],...t},this.saveRolePermissionsToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Administrator",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"BATCH_UPDATE_ROLE_PERMISSIONS",category:"CONFIG",targetResource:`Role:${e}`,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated permission bundle for role "${e}".`}),this.notify(),!0}resetRolePermissions(){var e,t,s;return this.rolePermissions=JSON.parse(JSON.stringify(oe.DEFAULT_ROLE_PERMISSIONS)),this.saveRolePermissionsToStorage(),this.addAuditLog({actorId:((e=this.currentUser)==null?void 0:e.id)||"superadmin-01",actorName:((t=this.currentUser)==null?void 0:t.name)||"Super Administrator",actorRole:((s=this.currentUser)==null?void 0:s.role)||"superadmin",action:"RESET_ROLE_PERMISSIONS_TO_DEFAULT",category:"CONFIG",targetResource:"RBACMatrix",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:"Reset all platform RBAC role permissions to factory defaults."}),this.notify(),this.rolePermissions}async getMarketPriceIndices(e,t){try{const s=new URLSearchParams;e&&e!=="All"&&s.append("category",e),t&&t!=="All"&&s.append("region",t);const a=await fetch(`/api/market-intelligence/indices?${s.toString()}`);if(a.ok)return await a.json()}catch(s){console.warn("Fallback to local market price indices:",s)}return[{commodityId:"teff-white",name:"Teff (White Magna)",nameAm:"ነጭ ማግና ጤፍ",category:"Grain",unit:"kg",nationalAvgPriceEtb:128.5,eczBenchmarkEtb:126,weeklyChangePercent:3.8,trendDirection:"Up",volatilityRating:"Moderate",regionalPrices:[{regionName:"Addis Ababa",marketName:"Merkato Ehil Berenda",minPriceEtb:125,avgPriceEtb:132,maxPriceEtb:138},{regionName:"Oromia",marketName:"Ada'a / Bishoftu Central",minPriceEtb:120,avgPriceEtb:126,maxPriceEtb:130},{regionName:"Amhara",marketName:"East Gojjam / Debre Markos",minPriceEtb:115,avgPriceEtb:122,maxPriceEtb:126}],historical7Days:[{date:"D-6",priceEtb:124},{date:"D-5",priceEtb:125.2},{date:"D-4",priceEtb:125},{date:"D-3",priceEtb:126.5},{date:"D-2",priceEtb:127},{date:"D-1",priceEtb:127.8},{date:"Today",priceEtb:128.5}]},{commodityId:"coffee-sidama-g1",name:"Coffee (Sidama Washed Grade 1)",nameAm:"ሲዳማ የታጠበ ቡና (ደረጃ 1)",category:"Coffee",unit:"kg",nationalAvgPriceEtb:485,eczBenchmarkEtb:490,weeklyChangePercent:5.2,trendDirection:"Up",volatilityRating:"High",regionalPrices:[{regionName:"Addis Ababa",marketName:"ECX Central Terminal",minPriceEtb:475,avgPriceEtb:492,maxPriceEtb:510},{regionName:"Sidama",marketName:"Hawassa Wholesale Exchange",minPriceEtb:460,avgPriceEtb:480,maxPriceEtb:495}],historical7Days:[{date:"D-6",priceEtb:460},{date:"D-5",priceEtb:465},{date:"D-4",priceEtb:472},{date:"D-3",priceEtb:475},{date:"D-2",priceEtb:480},{date:"D-1",priceEtb:482},{date:"Today",priceEtb:485}]},{commodityId:"onions-adama-red",name:"Adama Red Onions",nameAm:"የአዳማ ቀይ ሽንኩርት",category:"Vegetable",unit:"kg",nationalAvgPriceEtb:82,eczBenchmarkEtb:80,weeklyChangePercent:-2.4,trendDirection:"Down",volatilityRating:"High",regionalPrices:[{regionName:"Addis Ababa",marketName:"Piazza & Janmeda Market",minPriceEtb:82,avgPriceEtb:88,maxPriceEtb:95},{regionName:"Oromia",marketName:"Adama Bulbula Terminal",minPriceEtb:72,avgPriceEtb:78,maxPriceEtb:82}],historical7Days:[{date:"D-6",priceEtb:86},{date:"D-5",priceEtb:85},{date:"D-4",priceEtb:84.5},{date:"D-3",priceEtb:83},{date:"D-2",priceEtb:83.5},{date:"D-1",priceEtb:82.2},{date:"Today",priceEtb:82}]},{commodityId:"tomatoes-meki",name:"Tomatoes (Meki Plum)",nameAm:"የመቂ ቲማቲም",category:"Vegetable",unit:"kg",nationalAvgPriceEtb:65,eczBenchmarkEtb:64,weeklyChangePercent:8.1,trendDirection:"Up",volatilityRating:"High",regionalPrices:[{regionName:"Addis Ababa",marketName:"Atkilt Tera Merkato",minPriceEtb:65,avgPriceEtb:72,maxPriceEtb:80},{regionName:"Oromia",marketName:"Meki Lake Ziway Hub",minPriceEtb:52,avgPriceEtb:58,maxPriceEtb:64}],historical7Days:[{date:"D-6",priceEtb:58},{date:"D-5",priceEtb:60},{date:"D-4",priceEtb:61.5},{date:"D-3",priceEtb:62},{date:"D-2",priceEtb:63.8},{date:"D-1",priceEtb:64.5},{date:"Today",priceEtb:65}]}]}async getFairPriceRecommendation(e){try{const n=await fetch("/api/market-intelligence/advisor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(n.ok)return await n.json()}catch(n){console.warn("Fallback to local fair price calculation:",n)}const t=85,s=e.grade==="Export Grade"?1.25:e.grade==="Grade 1"?1.05:.95,a=e.requiresColdChain?.12:0,r=Math.round(t*s*(1+a)*100)/100;return{commodityName:e.commodityName,region:e.region,grade:e.grade,recommendedMinEtb:Math.round(r*.9*100)/100,recommendedFairPriceEtb:r,recommendedMaxEtb:Math.round(r*1.15*100)/100,ecxBenchmarkEtb:82,supplyCondition:"Moderate",volatility:"Moderate",guidanceMessageEn:`Recommended fair price for ${e.commodityName} (${e.grade}) is ETB ${r}/kg based on current market trends.`,guidanceMessageAm:`ለ${e.commodityName} (${e.grade}) ተስማሚ የገበያ መሸጫ ዋጋ ${r} ብር/ኪ.ግ ነው።`,coldChainPremiumPercent:a*100,cooperativeBulkDiscountPercent:5}}async simulateUssd(e){try{const a=await fetch("/api/ussd/simulate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(a.ok)return await a.json()}catch(a){console.warn("Fallback to local USSD state machine:",a)}const t=e.language==="am",s=(e.text||"").trim();return!s||s==="*804#"?{sessionId:e.sessionId,message:t?`🌾 ወደ ገበያ-ለአርሶ አደር (*804#) እንኳን ደህና መጡ

1. 📈 የገበያ ዋጋ መረጃ (ECX)
2. 💰 የሒሳብ ቀሪ (Telebirr)
3. 📦 የትዕዛዝ ሁኔታ
4. 🚜 አዲስ ምርት መመዝገብ
5. 🌐 Switch to English
0. መውጫ`:`🌾 Welcome to Farmer-to-Market (*804#)

1. 📈 Market Price Index (ECX)
2. 💰 Wallet Balance (Telebirr)
3. 📦 Pending Orders
4. 🚜 List New Produce
5. 🌐 ወደ አማርኛ ቀይር
0. Exit`,action:"CON"}:s==="1"?{sessionId:e.sessionId,message:t?`የወቅቱ የኢትዮጵያ ምርት ገበያ (ECX) ዋጋዎች፡
1. ነጭ ጤፍ - 128 ETB/kg
2. ቡና (ሲዳማ) - 485 ETB/kg
3. ቀይ ሽንኩርት - 82 ETB/kg
4. ቲማቲም - 65 ETB/kg
0. ዋና ማውጫ`:`Live ECX Market Prices (ETB/kg):
1. Teff White - 128 ETB
2. Coffee Sidama - 485 ETB
3. Red Onion - 82 ETB
4. Tomatoes - 65 ETB
0. Main Menu`,action:"CON"}:s==="2"?{sessionId:e.sessionId,message:t?`💰 የቴሌብር (Telebirr) የሒሳብዎ ቀሪ፡ 28,450.00 ብር
በኤስክሮው (Escrow) የተያዘ፡ 12,500.00 ብር
ያለቀ ክፍያ ወዲያውኑ ወደ ስልክዎ ይገባል።`:`💰 Telebirr Escrow Balance: ETB 28,450.00
Held in Active Escrow: ETB 12,500.00
Payouts auto-release on delivery confirmation.`,action:"END"}:s==="3"?{sessionId:e.sessionId,message:t?`📦 የትዕዛዝዎ ሁኔታ፡
• በመጓጓዝ ላይ ያሉ ትዕዛዞች: 2
• ሹፌር የተመደበለት: 1 Isuzu 5-Ton
• ለመውሰድ የታቀደበት ቀን፡ ዛሬ 9:00 ሰዓት`:`📦 Active Order Status:
• In-transit shipments: 2
• Assigned Driver: 1 Isuzu 5-Ton
• Scheduled Pickup: Today 3:00 PM`,action:"END"}:s==="4"?{sessionId:e.sessionId,message:t?`🚜 የሚሸጡትን ምርት ይምረጡ፡
1. ጤፍ (Teff)
2. ቀይ ሽንኩርት (Onion)
3. ቲማቲም (Tomato)
4. ስንዴ (Wheat)
0. ተመለስ`:`🚜 Select produce to list:
1. Teff
2. Red Onion
3. Tomato
4. Wheat
0. Back`,action:"CON"}:{sessionId:e.sessionId,message:t?"✅ እናመሰግናለን! ትዕዛዝዎ በስኬት ተከናውኗል።":"✅ Thank you! Operation completed successfully.",action:"END"}}};b(oe,"ALL_PERMISSIONS",[{key:"MANAGE_USERS",label:"User Master CRUD & Suspension",labelAm:"የተጠቃሚዎች አስተዳደር እና እገዳ",category:"Governance & Root",description:"Create, update, suspend, and delete users across all roles."},{key:"MANAGE_RBAC_PERMISSIONS",label:"RBAC Permission Matrix",labelAm:"የሚናዎች እና ፈቃዶች ማትሪክስ",category:"Governance & Root",description:"Configure and assign granular capabilities for roles and users."},{key:"MANAGE_PLATFORM_CONFIG",label:"Platform Financial Configuration",labelAm:"የፕላትፎርም የፋይናንስ ውቅር",category:"Governance & Root",description:"Adjust escrow split percentages (90/5/5), withholding tax, and gateway keys."},{key:"EMERGENCY_ESCROW_FREEZE",label:"Emergency Escrow Killswitch",labelAm:"የአስቸኳይ ጊዜ የገንዘብ እገዳ (Killswitch)",category:"Governance & Root",description:"Halt all Telebirr fund payouts and freeze system escrow in emergency."},{key:"APPROVE_HIGH_VALUE_PAYOUTS",label:"High-Value Payout Approval",labelAm:"ከፍተኛ የገንዘብ ክፍያዎችን ማጽደቅ",category:"Governance & Root",description:"Authorize manual audits for payouts exceeding platform threshold."},{key:"IMPERSONATE_USERS",label:"Shadow Impersonation Engine",labelAm:"የተጠቃሚ መለያዎችን በመወከል መግባት",category:"Governance & Root",description:"Log in as any user to inspect and debug live issues."},{key:"VIEW_AUDIT_LOGS",label:"System Audit Logs",labelAm:"የስርዓት ኦዲት ምዝግብ ማስታወሻዎች",category:"Governance & Root",description:"Review tamper-evident security audit trails and actor actions."},{key:"MANAGE_TRADE_ZONES",label:"Geo-Fenced Trade Corridors",labelAm:"የንግድ ኮሪደሮች እና የድንበር ዞኖች",category:"Governance & Root",description:"Configure transport corridors, checkpoints, and regional hubs."},{key:"MANAGE_BLACKLIST",label:"National Fraud Blacklist",labelAm:"የማጭበርበር ጥቁር መዝገብ",category:"Governance & Root",description:"Enforce restrictions on banned phone numbers, TINs, and Fayda IDs."},{key:"MODERATE_LISTINGS",label:"Produce Listing Moderation",labelAm:"የምርት ምዝገባ ቁጥጥር እና ማረም",category:"Operational Moderation",description:"Force edit price, stock, grade, and delete fraudulent produce posts."},{key:"MANAGE_BANNERS",label:"Promotional Marketing Banners",labelAm:"የማስተዋወቂያ ባነሮች አስተዳደር",category:"Operational Moderation",description:"Publish, edit, pause, and delete promotional announcements."},{key:"RESOLVE_DISPUTES",label:"Arbitrate Produce Disputes",labelAm:"የምርት አለመግባባቶችን መፍታት",category:"Operational Moderation",description:"Render legally binding arbitration decrees and execute escrow splits."},{key:"VERIFY_KYC",label:"KYC & Document Verification",labelAm:"የማንነት እና ሰነድ ማረጋገጫ",category:"Operational Moderation",description:"Approve or reject Fayda ID, TIN certificates, and vehicle logbooks."},{key:"BROADCAST_SMS",label:"Twilio Mass SMS Broadcast",labelAm:"የጅምላ ኤስኤምኤስ ማሰራጫ",category:"Operational Moderation",description:"Broadcast agricultural bulletins and alerts to farmers, drivers, and buyers."},{key:"VIEW_ANOMALY_ALERTS",label:"AI Anomaly Scanner",labelAm:"የዋጋ እና ማጭበርበር ስካነር",category:"Operational Moderation",description:"Monitor price spikes, duplicate photo proofs, and volume surges."},{key:"VIEW_TAX_COMPLIANCE",label:"Tax & Fiscal Compliance Invoicing",labelAm:"የግብር እና ህጋዊ ደረሰኝ",category:"Operational Moderation",description:"Inspect electronic tax invoices (e-VAT) and MOR 2% withholding receipts."},{key:"VIEW_REGIONAL_ANALYTICS",label:"Regional Analytics & Volume",labelAm:"የክልሎች የንግድ ትንታኔ",category:"Operational Moderation",description:"Analyze GMV, metric tons moved, and price averages per region."},{key:"FIELD_AGENT_ONBOARDING",label:"In-Field Farmer Onboarding",labelAm:"አርሶ አደሮችን በአካል መመዝገብ",category:"Field & Logistics",description:"Onboard smallholders with camera capture of Kebele ID & Fayda National ID."},{key:"EXECUTE_USSD",label:"Offline USSD Engine",labelAm:"ከኢንተርኔት ውጭ USSD መጠቀም",category:"Field & Logistics",description:"Execute *988# USSD command simulation for low-connectivity rural hubs."},{key:"VIEW_DELIVERY_ROUTES",label:"GPS Dispatch & Waybills",labelAm:"የማጓጓዣ መንገዶች እና ዌይቢል",category:"Field & Logistics",description:"Access multi-stop route optimization and cargo load manifests."},{key:"SUBMIT_DELIVERY_PROOF",label:"GPS Dropoff Photo Proof",labelAm:"የማድረሻ ፎቶ ማረጋገጫ ማስገባት",category:"Field & Logistics",description:"Submit geo-tagged timestamped photos of produce pickup & delivery."},{key:"OFFLINE_TRIP_SYNC",label:"Offline Trip Sync",labelAm:"የከመስመር ውጭ ጉዞ ማመሳሰል",category:"Field & Logistics",description:"Cache trip confirmations in localStorage and sync when cellular resumes."},{key:"PUBLISH_PRODUCE",label:"Publish Produce Listings",labelAm:"የእርሻ ምርት ለገበያ ማቅረብ",category:"Marketplace & Trade",description:"Post crops with pricing, stock quantity, and audio voice memo transcription."},{key:"MANAGE_FARM_ORDERS",label:"Confirm & Fulfill Farm Orders",labelAm:"የትዕዛዝ መቀበያ እና ማረጋገጫ",category:"Marketplace & Trade",description:"Accept purchase orders and prepare harvest for driver pickup."},{key:"REQUEST_WALLET_WITHDRAWAL",label:"Telebirr Instant Payouts",labelAm:"ገንዘብ ወደ ቴሌብር ማውጣት",category:"Marketplace & Trade",description:"Withdraw wallet balance directly to Telebirr mobile wallet."},{key:"PLACE_ORDERS",label:"Bulk Wholesale Ordering",labelAm:"የጅምላ ምርት መግዛት",category:"Marketplace & Trade",description:"Purchase fresh produce directly from verified farmers across Ethiopia."},{key:"TELEBIRR_CHECKOUT",label:"Telebirr C2B Escrow Checkout",labelAm:"በቴሌብር ክፍያ መፈጸም",category:"Marketplace & Trade",description:"Authorize secure payments held in Telebirr escrow."},{key:"CREATE_STANDING_ORDERS",label:"Recurring Standing Orders",labelAm:"ተደጋጋሚ ቋሚ ትዕዛዝ ማዘዝ",category:"Marketplace & Trade",description:"Schedule automatic weekly and bi-weekly harvest deliveries."},{key:"FILE_DISPUTES",label:"File Escrow Dispute",labelAm:"የቅሬታ ማመልከቻ ማስገባት",category:"Marketplace & Trade",description:"Report damaged goods or delivery delays to pause escrow release."}]),b(oe,"DEFAULT_ROLE_PERMISSIONS",{superadmin:{MANAGE_USERS:!0,MANAGE_RBAC_PERMISSIONS:!0,MANAGE_PLATFORM_CONFIG:!0,EMERGENCY_ESCROW_FREEZE:!0,APPROVE_HIGH_VALUE_PAYOUTS:!0,IMPERSONATE_USERS:!0,VIEW_AUDIT_LOGS:!0,MANAGE_TRADE_ZONES:!0,MANAGE_BLACKLIST:!0,MODERATE_LISTINGS:!0,MANAGE_BANNERS:!0,RESOLVE_DISPUTES:!0,VERIFY_KYC:!0,BROADCAST_SMS:!0,VIEW_ANOMALY_ALERTS:!0,VIEW_TAX_COMPLIANCE:!0,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!0,OFFLINE_TRIP_SYNC:!0,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!0,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!0,TELEBIRR_CHECKOUT:!0,CREATE_STANDING_ORDERS:!0,FILE_DISPUTES:!0},admin:{MANAGE_USERS:!0,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!0,MANAGE_TRADE_ZONES:!0,MANAGE_BLACKLIST:!0,MODERATE_LISTINGS:!0,MANAGE_BANNERS:!0,RESOLVE_DISPUTES:!0,VERIFY_KYC:!0,BROADCAST_SMS:!0,VIEW_ANOMALY_ALERTS:!0,VIEW_TAX_COMPLIANCE:!0,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!1,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},agent:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},farmer:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!0,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},driver:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!0,OFFLINE_TRIP_SYNC:!0,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},buyer:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!1,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!1,PLACE_ORDERS:!0,TELEBIRR_CHECKOUT:!0,CREATE_STANDING_ORDERS:!0,FILE_DISPUTES:!0}});let Be=oe;const u=new Be,Y={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",roleSuperAdmin:"Super Admin (Chief Platform Officer)",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLegalDocuments:"Contracts & Tax Invoices",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Full Produce & Photos",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cropDescription:"Produce Description & Origin Story",qualitySpecs:"Quality & Agricultural Specifications",packagingType:"Packaging & Handling",storageRecommendation:"Storage & Shelf Life",farmerProfile:"Verified Smallholder Producer",directContact:"Direct Producer Contact",callFarmer:"Call Farmer",smsInquiry:"SMS Inquiry",buyNowEscrow:"Instant Order (Telebirr Escrow)",selectOrderQty:"Select Order Quantity (kg)",marketComparison:"Regional Price Benchmark",belowMarketAvg:"Below Regional Wholesale Average",photoGallery:"Produce Photos & Inspection Angles",clickToEnlarge:"Click to view full photo & details",shareListing:"Share Listing",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",viewContractBtn:"View Sales Contract",viewInvoiceBtn:"Download Tax Invoice",viewWaybillBtn:"Transport Waybill (Manifest)",viewArbitrationBtn:"Arbitration Determination",printDocument:"Print / Save PDF",closeDocument:"Close Document",rateFarmerBtn:"Rate & Review Farmer",rateFarmerTitle:"Rate Your Produce & Farmer",rateFarmerSubtitle:"Share your rating and feedback to build trust in the Ethiopian agricultural marketplace.",rateYourExperience:"How was the produce quality and farmer service?",starRatingLabel:"Star Rating",reviewCommentLabel:"Detailed Comments & Feedback",reviewCommentPlaceholder:"Describe produce freshness, packing grade, delivery timeliness, and farmer communication...",quickTagsLabel:"Quick Highlights",submitReviewBtn:"Submit Rating & Review",reviewSubmittedSuccess:"Thank you! Your verified review and rating have been recorded.",verifiedBuyerReviews:"Verified Customer Reviews & Feedback",verifiedReviewsTitle:"Customer Reviews",verifiedBuyerBadge:"Verified Wholesale Buyer",ratingScoreText:"out of 5 stars",allReviews:"All Reviews",noReviewsYet:"No customer reviews yet. Be the first to review after delivery!",ratedBadge:"Rated",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Tax Statements (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",withholdingTaxReported:"Withholding Tax (2% Goods)",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release & Tax Log",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Cargo Manifest",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Governance, Law & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",statVatRemitted:"VAT on Platform Fees (15%)",statWithholding:"Withholding Tax (2%)",resolveDisputeTitle:"Escrow Legal Arbitration Console",disputeEvidence:"Evidence & Inspection Report",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Tiered KYC & Trade Registry Queue",approveKycBtn:"Approve Identity & License",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",roleAgent:"Field Agent",navAgentPortal:"Field Agent Portal",agentPortalTitle:"Community Field Agent Onboarding Console",agentOnboardFarmerBtn:"Register Smallholder Farmer",agentRosterTitle:"Farmers Onboarded in Your Woreda",agentCommissionEarned:"Agent Commission",agentSyncStatus:"Sync Status",agentRegisterSuccess:"Farmer registered and documents queued for verification!",verifyAccountTitle:"Account Identity & Regulatory Verification",verificationStatusLabel:"Verification Status",statusPendingSubmission:"Pending Submission",statusUnderReview:"Under Review by Admin",statusApproved:"Fully Approved & Compliant",statusRejected:"Verification Rejected",verificationBannerText:"Complete your Fayda ID & TIN verification to unlock full marketplace selling and bulk purchasing privileges.",startVerificationBtn:"Verify Account Now",faydaIdLabel:"Fayda National ID Number (FAN)",tinNumberLabel:"10-Digit Taxpayer ID (TIN)",kebeleIdLabel:"Kebele Resident / Farm ID",uploadFrontPhoto:"Upload Front ID Photo",uploadBackPhoto:"Upload Back ID Photo",rejectionReasonLabel:"Rejection Reason",resubmitDocsBtn:"Update & Resubmit Documents",sideBySideInspectionTitle:"Side-by-Side Document Inspection",approveVerificationAction:"Approve Identity & Tax License",rejectVerificationAction:"Reject & Request Clarification",sendSmsNoticeToggle:"Notify user immediately via bilingual SMS",superAdminTitle:"Super Admin Command Center & Governance",superAdminSubtitle:"Full System Access · User CRUD · RBAC · Platform Config · Emergency Controls",tabUserMaster:"User Master CRUD",tabBanners:"Banners & Announcements",tabModeration:"Content & Post Moderation",tabPermissions:"RBAC Permissions",tabPlatformConfig:"Platform Config & Escrow",tabFinancialOversight:"Financials & Payouts",tabAuditLogs:"System Audit Logs",tabZones:"Delivery Zones & PostGIS",tabFeatureFlags:"Feature Flags",tabEmergency:"Emergency & Blacklist",tabBusinessRules:"Global Rules",tabDbOps:"Database & Health",createBannerBtn:"Add Promotional Banner",editBannerBtn:"Edit Banner",deleteBannerBtn:"Delete Banner",moderatePostBtn:"Moderate / Edit Post",flagAnomalyBtn:"Flag Price Anomaly",deletePostBtn:"Delete Post",impersonateBtn:"Login As / Impersonate",exitImpersonation:"Exit Impersonation",createUserBtn:"Create New Account",editUserBtn:"Edit User",freezePlatformEscrow:"Emergency Platform Escrow Freeze",exportDataBtn:"Export Platform Data (CSV/JSON)",triggerBackupBtn:"Trigger DB Backup Snapshot",payoutApprovalTitle:"High-Value Payout Approvals (> 50,000 ETB)",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",roleSuperAdmin:"ዋና አድሚን (Super Admin)",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLegalDocuments:"ውሎች እና የግብር ደረሰኞች",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"ሙሉ የምርት ፎቶና ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cropDescription:"የምርት ዝርዝር ገለጻ እና መገኛ",qualitySpecs:"የጥራት እና የግብርና መረጃዎች",packagingType:"የማሸጊያ እና አያያዝ ሁኔታ",storageRecommendation:"የማስቀመጫ እና የመቆያ ጊዜ",farmerProfile:"የተረጋገጠ አርሶ አደር መረጃ",directContact:"አርሶ አደሩን በቀጥታ ያግኙ",callFarmer:"ይደውሉ",smsInquiry:"መልእክት ይላኩ",buyNowEscrow:"በቴሌብር ዋስትና አሁኑኑ ይዘዙ",selectOrderQty:"የትዕዛዝ መጠን ይምረጡ (ኪ.ግ)",marketComparison:"የክልላዊ ገበያ ዋጋ ንጽጽር",belowMarketAvg:"ከክልላዊ ገበያ አማካይ ያነሰ",photoGallery:"የምርት ፎቶዎች እና የምርመራ ማዕዘናት",clickToEnlarge:"ሙሉ ፎቶና ዝርዝር ለማየት ይጫኑ",shareListing:"ምርቱን ያጋሩ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",viewContractBtn:"የግብይት ውል ይመልከቱ",viewInvoiceBtn:"የግብር እና ሽያጭ ደረሰኝ (e-VAT)",viewWaybillBtn:"የጭነት ማጓጓዣ ሰነድ (Waybill)",viewArbitrationBtn:"የሽምግልና ውሳኔ ሰነድ",printDocument:"አትም / ፒዲኤፍ አስቀምጥ",closeDocument:"ሰነዱን ዝጋ",rateFarmerBtn:"ለአርሶ አደሩ ደረጃ ይስጡ እና አስተያየት ይጻፉ",rateFarmerTitle:"ለተረከቡት ምርት እና ለአርሶ አደሩ ደረጃ ይስጡ",rateFarmerSubtitle:"የእርስዎ አስተያየት እና ደረጃ በኢትዮጵያ የግብርና ገበያ ውስጥ መተማመንን ይገነባል።",rateYourExperience:"የምርቱ ጥራት፣ ትኩስነት እና የአርሶ አደሩ አገልግሎት እንዴት ነበር?",starRatingLabel:"የኮከብ ደረጃ",reviewCommentLabel:"ዝርዝር አስተያየት እና ግምገማ",reviewCommentPlaceholder:"ስለ ምርቱ ትኩስነት፣ አሸጋገግ፣ የአቅርቦት ፍጥነት እና የአርሶ አደሩ ግንኙነት ይጻፉ...",quickTagsLabel:"ፈጣን መለያዎች",submitReviewBtn:"ደረጃ እና አስተያየቱን መዝግብ",reviewSubmittedSuccess:"እናመሰግናለን! የእርስዎ ደረጃ እና አስተያየት በተሳካ ሁኔታ ተመዝግቧል።",verifiedBuyerReviews:"የተረጋገጡ የደንበኞች ደረጃ እና አስተያየቶች",verifiedReviewsTitle:"የደንበኞች አስተያየቶች",verifiedBuyerBadge:"የተረጋገጠ የጅምላ ገዢ",ratingScoreText:"ከ 5 ኮከቦች",allReviews:"ሁሉም አስተያየቶች",noReviewsYet:"እስካሁን የተሰጠ አስተያየት የለም። ምርቱን ከተረከቡ በኋላ የመጀመሪያው አስተያየት ሰጪ ይሁኑ!",ratedBadge:"ደረጃ ተሰጥቷል",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የግብር መግለጫ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",withholdingTaxReported:"የተያዘ ግብር (2% Withholding)",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ እና የደረሰኝ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር፣ ህጋዊነት እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",statVatRemitted:"የተሰበሰበ የተጨማሪ እሴት ታክስ (15% VAT)",statWithholding:"የተያዘ ግብር (2% Withholding)",resolveDisputeTitle:"የህጋዊ ቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና የፍተሻ ሪፖርት",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የተጠቃሚዎች ህጋዊነት እና የንግድ ፈቃድ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ እና ፈቃድ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",roleAgent:"የግብርና ድጋፍ ኤጀንት",navAgentPortal:"የኤጀንት ክፍል",agentPortalTitle:"የማህበረሰብ ግብርና ኤጀንቶች የገበሬዎች መመዝገቢያ ክፍል",agentOnboardFarmerBtn:"አዲስ አርሶ አደር መዝግብ",agentRosterTitle:"በእርስዎ ወረዳ የተመዘገቡ አርሶ አደሮች",agentCommissionEarned:"የኤጀንት ክፍያ",agentSyncStatus:"የዳታ ሁኔታ",agentRegisterSuccess:"አርሶ አደሩ ተመዝግቧል! ሰነዱ ለማረጋገጫ ተልኳል።",verifyAccountTitle:"የመለያ ህጋዊነት እና የታክስ ማረጋገጫ",verificationStatusLabel:"የማረጋገጫ ሁኔታ",statusPendingSubmission:"ሰነድ አልገባም",statusUnderReview:"በአድሚን በመገምገም ላይ",statusApproved:"የተረጋገጠ እና የጸደቀ",statusRejected:"ውድቅ ተደርጓል",verificationBannerText:"ምርቶችን በቀጥታ ለመሸጥ እና ክፍያ ለመቀበል የፋይዳ (Fayda) መታወቂያ እና የታክስ መለያ (TIN) ያረጋግጡ።",startVerificationBtn:"መለያዎን አሁን ያረጋግጡ",faydaIdLabel:"የፋይዳ ብሔራዊ መታወቂያ ቁጥር (FAN)",tinNumberLabel:"የ10-ዲጂት የግብር ከፋይ መለያ (TIN)",kebeleIdLabel:"የቀበሌ ነዋሪነት / የእርሻ ማረጋገጫ",uploadFrontPhoto:"የመታወቂያ የፊት ገጽ ፎቶ",uploadBackPhoto:"የመታወቂያ የጀርባ ገጽ ፎቶ",rejectionReasonLabel:"ውድቅ የተደረገበት ምክንያት",resubmitDocsBtn:"ሰነዶችን አስተካክለው እንደገና ያስገቡ",sideBySideInspectionTitle:"የሰነዶች ጎን ለጎን ፍተሻ እና ማረጋገጫ",approveVerificationAction:"መታወቂያ እና የግብር ሰነድ አጽድቅ",rejectVerificationAction:"ውድቅ አድርግ / ማብራሪያ ጠይቅ",sendSmsNoticeToggle:"ለተጠቃሚው ወዲያውኑ በኤስኤምኤስ አሳውቅ",superAdminTitle:"የዋና አድሚን ቁጥጥር እና አስተዳደር ማዕከል",superAdminSubtitle:"ሙሉ የሲስተም ስልጣን · የተጠቃሚዎች CRUD · RBAC · የዋስትና ውቅር · የአደጋ ጊዜ መቆጣጠሪያ",tabUserMaster:"የተጠቃሚዎች አስተዳደር (CRUD)",tabBanners:"የማስታወቂያ ባነሮች",tabModeration:"የምርቶች ቁጥጥር እና ማስተካከያ",tabPermissions:"የፈቃዶች ማትሪክስ (RBAC)",tabPlatformConfig:"የሲስተም ውቅር እና የዋስትና ድርሻ",tabFinancialOversight:"የፋይናንስ እና ክፍያ ቁጥጥር",tabAuditLogs:"የሲስተም ኦዲት መዝገብ",tabZones:"የማድረሻ ዞኖች እና ካርታ",tabFeatureFlags:"የባህሪያት ማብሪያ/ማጥፊያ",tabEmergency:"የአደጋ ጊዜ መቆጣጠሪያ እና እገዳ",tabBusinessRules:"አጠቃላይ የንግድ ደንቦች",tabDbOps:"ዳታቤዝ እና የሲስተም ጤና",createBannerBtn:"አዲስ ባነር ጨምር",editBannerBtn:"ባነር አርትዕ",deleteBannerBtn:"ባነር ሰርዝ",moderatePostBtn:"ምርት አርትዕ/አስተካክል",flagAnomalyBtn:"ያልተገባ ዋጋ ጠቁም",deletePostBtn:"ምርት ሰርዝ",impersonateBtn:"በተጠቃሚው ስም ግባ",exitImpersonation:"ከተጠቃሚው ውጣ",createUserBtn:"አዲስ መለያ ፍጠር",editUserBtn:"ተጠቃሚ አርትዕ",freezePlatformEscrow:"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ",exportDataBtn:"መረጃ በCSV/JSON አውርድ",triggerBackupBtn:"የዳታቤዝ ምትክ ቅጂ ውሰድ",payoutApprovalTitle:"ከፍተኛ የገንዘብ ክፍያ ማረጋገጫ (> 50,000 ብር)",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function zt(l,e,t,s,a,r,n=""){const i=Y[l],d=a.reduce((m,f)=>m+f.qtyKg,0),c={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},agent:{label:"Field Extension Agent",labelAm:"የግብርና ድጋፍ ኤጀንት",color:"bg-teal-100 text-teal-900 border-teal-300",icon:"fa-users-gear"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"},superadmin:{label:"Super Admin (Chief Platform Officer)",labelAm:"ዋና አድሚን (Super Admin)",color:"bg-rose-100 text-rose-900 border-rose-300",icon:"fa-crown"}},o=e?c[e.role]||c.buyer:null;return e&&localStorage.getItem("currentUser")&&JSON.parse(localStorage.getItem("currentUser")||"{}").phone!=="+251900000001"&&window.isSuperAdminImpersonating,`
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
              <span>${l==="en"?"አማርኛ":"English"}</span>
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
                <span class="text-xl font-black tracking-tight text-slate-900 ${l==="am"?"lang-am":""}">
                  ${i.brandName}
                </span>
                <span class="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-200">
                  ET
                </span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium ${l==="am"?"lang-am":""}">
                ${i.brandSubtitle}
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
                placeholder="${i.searchPlaceholder}"
                class="w-full py-2.5 pr-3 text-sm focus:outline-none bg-transparent placeholder:text-slate-400 font-medium ${l==="am"?"lang-am":""}" />
              
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
                      ${l==="am"?"ሰላም,":"Hello,"}
                    </span>
                    <span class="text-xs font-black text-slate-900 block truncate max-w-[120px] leading-tight ${l==="am"?"lang-am":""}">
                      ${l==="am"&&e.nameAm?e.nameAm:e.name}
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
                        <span class="text-sm font-black text-slate-900 truncate ${l==="am"?"lang-am":""}">
                          ${l==="am"&&e.nameAm?e.nameAm:e.name}
                        </span>
                        <i class="fa-solid fa-circle-check text-emerald-600 text-xs" title="Verified Account"></i>
                      </div>
                      <span class="text-[11px] font-semibold text-slate-500 block truncate">${e.phone}</span>
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${(o==null?void 0:o.color)||"bg-slate-100 text-slate-800"}">
                        ${l==="am"?o==null?void 0:o.labelAm:o==null?void 0:o.label}
                      </span>
                    </div>
                  </div>

                  <!-- Verification Status Banner in Dropdown -->
                  <div class="p-2.5 rounded-xl ${e.verificationStatus==="Approved"||e.verified?"bg-emerald-50 border border-emerald-200":e.verificationStatus==="UnderReview"?"bg-amber-50 border border-amber-200":"bg-red-50 border border-red-200"} text-xs">
                    <div class="flex items-center justify-between">
                      <span class="font-bold ${e.verificationStatus==="Approved"||e.verified?"text-emerald-900":e.verificationStatus==="UnderReview"?"text-amber-900":"text-red-900"}">
                        ${e.verificationStatus==="Approved"||e.verified?"🛡️ "+(l==="am"?"የተረጋገጠ መለያ":"Fayda Verified"):e.verificationStatus==="UnderReview"?"⏳ "+(l==="am"?"በመገምገም ላይ":"Under Review"):"⚠️ "+(l==="am"?"ማረጋገጫ ያስፈልጋል":"Unverified Account")}
                      </span>
                      <button onclick="window.openVerificationWizard()" class="text-[10px] font-bold underline cursor-pointer text-emerald-800">
                        ${l==="am"?"ይመልከቱ":"Manage"}
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
                      <i class="fa-solid fa-id-card text-emerald-600"></i> ${l==="am"?"የፋይዳ / የታክስ ማረጋገጫ":"Fayda & TIN Verification"}
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
                      <span>${l==="am"?"ከመለያ ውጣ (Sign Out)":"Sign Out"}</span>
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
                ${r>0?`
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                    ${r}
                  </span>`:""}
              </button>
            `:""}

            <!-- Bulk Cart Button -->
            <button onclick="window.toggleCart()" 
              class="btn-primary text-xs py-2 px-3 sm:px-4 flex items-center gap-2 cursor-pointer shadow-md">
              <i class="fa-solid fa-cart-shopping text-sm"></i>
              <span class="font-bold hidden sm:inline ${l==="am"?"lang-am":""}">${i.navCart}</span>
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
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="marketplace"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-store"></i> ${i.navMarketplace}
            </button>

            ${t&&(e==null?void 0:e.role)==="farmer"?`
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="farmer"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-tractor"></i> ${i.navFarmerPortal}
              </button>
              ${u.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?`
                <button onclick="window.toggleCreateListingModal()" 
                  class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${l==="am"?"lang-am":""}">
                  <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${i.postNewListing}
                </button>
              `:""}
            `:""}

            ${t&&(e==null?void 0:e.role)==="driver"?`
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="driver"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-truck"></i> ${i.navDriverPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="agent"?`
              <button onclick="window.navigateTab('agent')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="agent"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-users-gear text-teal-400"></i> ${i.navAgentPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="admin"?`
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="admin"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-sliders"></i> ${i.navAdminPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="superadmin"?`
              <button onclick="window.navigateTab('superadmin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="superadmin"?"bg-rose-900 text-white font-bold shadow-xs":"bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold border border-rose-200"}">
                <i class="fa-solid fa-crown text-rose-500"></i> SuperAdmin
              </button>
            `:""}

            ${!t||(e==null?void 0:e.role)==="buyer"?`
              <button onclick="window.toggleCart()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-200/70 text-slate-700 ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Wholesale Bulk Cart (${d} kg)
              </button>
            `:""}

            <button onclick="window.openMarketIntelligence()" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold ${l==="am"?"lang-am":""}"
              title="View live Ethiopian Commodity Exchange (ECX) prices & AI valuation">
              <i class="fa-solid fa-chart-line text-amber-600"></i> ${l==="am"?"📈 የECX ገበያ ዋጋ":"📈 ECX Price Index"}
            </button>

            <button onclick="window.openUssdSimulator()" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold ${l==="am"?"lang-am":""}"
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
  `}function Yt(l,e,t,s,a,r,n,i,d,c=null,o=0,m="All",f="All",x=!1,w=!1,A="marketplace",E=u.getStandingOrders(),C=u.getOrders("buyer")){var ae,se;const y=Y[l],S=[{key:"All",label:y.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:y.catVegetables,icon:"fa-carrot"},{key:"Grains",label:y.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:y.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:y.catCoffee,icon:"fa-mug-hot"}],M=r.reduce((k,W)=>k+W.qtyKg*W.listing.pricePerKg,0),P=Math.round(M*.9),V=Math.round(M*.05),Z=M-P-V,ee=r.reduce((k,W)=>{const F=W.listing.farmerId;return k[F]||(k[F]={farmerName:W.listing.farmerName,farmerRegion:W.listing.region,items:[]}),k[F].items.push(W),k},{}),X=u.getActiveBanners("Buyer",s),N=X.length>0?X[0]:null;return`
    <div class="space-y-8 pb-20">
      
      <!-- E-Commerce Hero Promotional Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>${N!=null&&N.badgeText?N.badgeText:"15M+ Ethiopian Smallholder Farmers Direct Network"}</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${l==="am"?"lang-am":""}">
              ${N?l==="am"&&N.titleAm?N.titleAm:N.title:y.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${l==="am"?"lang-am":""}">
              ${N?l==="am"&&N.subtitleAm?N.subtitleAm:N.subtitle||y.heroDesc:y.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> ${N!=null&&N.ctaText?l==="am"&&N.ctaTextAm?N.ctaTextAm:N.ctaText:"Browse Farm Deals"}
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${y.navOrders} & Invoices (${C.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${y.standingOrdersTitle}
              </button>
            </div>
          </div>

          <!-- Hero Promo Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3 relative overflow-hidden">
              ${N!=null&&N.imageUrl?`
                <img src="${N.imageUrl}" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
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
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${A==="marketplace"?"active":""}">
            <i class="fa-solid fa-store"></i>
            <span>${l==="am"?"የጅምላ ገበያ":"Wholesale Marketplace"}</span>
          </button>
          <button onclick="window.setBuyerSubTab('orders')" class="cat-pill ${A==="orders"?"active":""}">
            <i class="fa-solid fa-receipt"></i>
            <span>${y.navOrders} & ${y.navLegalDocuments} (${C.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${A==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${y.standingOrdersTitle} (${E.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${A==="standing_orders"?Xt(l,E):A==="orders"?Qt(l,C):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${S.map(k=>`
            <button onclick="window.setCategory('${k.key}')" 
              class="cat-pill ${t===k.key?"active":""} ${l==="am"?"lang-am":""}">
              <i class="fa-solid ${k.icon}"></i>
              <span>${k.label}</span>
            </button>
          `).join("")}
        </div>

        <!-- Filter Controls Bar -->
        <div class="glass-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <!-- PostGIS Geo-Proximity Radius Slider -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${y.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0,25,50,100].map(k=>`
                <button onclick="window.setMaxDistanceKm(${k})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${o===k?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${k===0?"All":k+" km"}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${y.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${m==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${m==="Grade 1"?"selected":""}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${m==="Grade 2"?"selected":""}>Grade 2 (Value)</option>
              <option value="Export Grade" ${m==="Export Grade"?"selected":""}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${y.filterRipeness}:</span>
            <select onchange="window.setFilterRipeness(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${f==="All"?"selected":""}>All Ripeness</option>
              <option value="Ready Today" ${f==="Ready Today"?"selected":""}>Ready Today</option>
              <option value="Semi-Ripe" ${f==="Semi-Ripe"?"selected":""}>Semi-Ripe</option>
              <option value="Green / Storable" ${f==="Green / Storable"?"selected":""}>Green / Storable</option>
            </select>
          </div>

          <!-- Toggle Flags -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${x?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${y.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${w?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${y.filterAdvance}</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Produce Marketplace Grid -->
      <section class="space-y-4">
        
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
            <i class="fa-solid fa-boxes-packing text-emerald-600 mr-2"></i> ${y.catAll} (${e.length})
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
            ${e.map(k=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1">
                
                <div>
                  <!-- Clickable Image with Hover Inspector Overlay -->
                  <div 
                    onclick="window.openProduceDetail('${k.id}')" 
                    class="h-48 w-full relative overflow-hidden group cursor-pointer"
                    title="${y.clickToEnlarge||"Click to view full photos & produce details"}"
                  >
                    <img src="${k.photos[0]}" alt="${k.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" />
                    
                    <!-- Hover Quick Preview Overlay -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <span class="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3.5 py-2 rounded-full shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <i class="fa-solid fa-eye text-emerald-600"></i> ${y.viewDetails}
                      </span>
                    </div>

                    <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                      ${k.isAdvanceHarvest?`
                        <span class="advance-pill shadow-md">
                          <i class="fa-solid fa-calendar-check text-emerald-700"></i> Advance Harvest
                        </span>
                      `:""}
                      ${k.requiresColdChain?`
                        <span class="bg-cyan-950/90 backdrop-blur-md text-cyan-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md border border-cyan-500/40">
                          <i class="fa-solid fa-snowflake mr-1"></i> Cold-Chain
                        </span>
                      `:""}
                      ${k.isAggregatedLot||k.cooperativeName?`
                        <span class="bg-amber-950/90 backdrop-blur-md text-amber-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md border border-amber-500/40">
                          <i class="fa-solid fa-users mr-1"></i> ${k.cooperativeName||"Cooperative Lot"}
                        </span>
                      `:""}
                      ${k.isOrganic?`
                        <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                          Organic Certified
                        </span>
                      `:""}
                    </div>

                    <span class="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md z-10 pointer-events-none">
                      ${k.pricePerKg} ETB<span class="text-[10px] font-normal text-slate-300">/kg</span>
                    </span>

                    ${k.distanceKm?`
                      <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${k.distanceKm} km ${y.farmDistance}
                      </span>
                    `:""}

                    ${k.photos.length>1?`
                      <span class="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-images text-emerald-400 mr-1"></i> ${k.photos.length} photos
                      </span>
                    `:""}
                  </div>

                  <div class="p-5 space-y-3">
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span class="text-amber-700 font-bold"><i class="fa-solid fa-award mr-1"></i> ${k.grade||"Grade 1"}</span>
                      <span class="text-slate-600 font-medium">${k.ripeness||"Ready Today"}</span>
                    </div>

                    <h3 
                      onclick="window.openProduceDetail('${k.id}')"
                      class="font-extrabold text-slate-900 text-lg leading-snug hover:text-emerald-700 cursor-pointer transition-colors ${l==="am"?"lang-am":""}"
                    >
                      ${l==="am"&&k.nameAm?k.nameAm:k.productName}
                    </h3>

                    <!-- Farmer Credibility & Trust Badges -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800"><i class="fa-solid fa-user-check text-emerald-600 mr-1"></i> ${k.farmerName}</span>
                        <span class="text-amber-600 font-extrabold"><i class="fa-solid fa-star mr-1"></i> ${k.farmerRating}</span>
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                        <span><i class="fa-solid fa-location-dot text-emerald-600"></i> ${k.region}</span>
                        <span>·</span>
                        <span>${k.repeatBuyerCount||18} Repeat Wholesalers</span>
                      </div>
                    </div>

                    ${k.voiceNoteTranscript?`
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2 cursor-pointer hover:bg-emerald-100/70 transition-colors" onclick="window.openProduceDetail('${k.id}')">
                        <i class="fa-solid fa-microphone-lines text-emerald-700 text-sm mt-0.5"></i>
                        <span class="italic leading-tight truncate">"${k.voiceNoteTranscript}"</span>
                      </div>
                    `:""}

                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Available: <strong class="font-bold text-slate-900">${k.qtyKg.toLocaleString()} kg</strong></span>
                      <span>Min Order: <strong class="font-bold text-slate-900">${k.minOrderKg} kg</strong></span>
                    </div>

                  </div>
                </div>

                <!-- Action Buttons: View Details & Add to Bulk Cart -->
                <div class="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button onclick="window.openProduceDetail('${k.id}')" class="btn-secondary py-2.5 text-xs font-bold shadow-xs cursor-pointer hover:bg-slate-100">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> Details
                  </button>
                  <button onclick="${u.hasEffectivePermission("PLACE_ORDERS","buyer")?`window.addToCart('${k.id}')`:"window.alert('Permission Restricted: PLACE_ORDERS has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary py-2.5 text-xs font-extrabold shadow-sm cursor-pointer ${u.hasEffectivePermission("PLACE_ORDERS","buyer")?"":"opacity-60 border-dashed bg-slate-700"}">
                    <i class="fa-solid ${u.hasEffectivePermission("PLACE_ORDERS","buyer")?"fa-cart-plus":"fa-lock"} mr-1"></i> ${y.addToCart}
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
                  <h3 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${y.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer checkout with Telebirr Escrow</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${r.length===0?`
              <div class="p-8 text-center text-slate-500 text-xs">
                <p>${y.cartEmpty}</p>
              </div>
            `:`
              <div class="space-y-4 max-h-80 overflow-y-auto pr-1">
                ${Object.entries(ee).map(([k,W])=>`
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                      <span><i class="fa-solid fa-seedling text-emerald-600 mr-1"></i> Farm Source: ${W.farmerName} (${W.farmerRegion})</span>
                      <span class="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Direct Gate Payout</span>
                    </div>

                    ${W.items.map(F=>`
                      <div class="flex items-center justify-between gap-3 text-xs">
                        <div>
                          <h4 class="font-bold text-slate-900">${F.listing.productName}</h4>
                          <span class="text-slate-500">${F.listing.pricePerKg} ETB / kg</span>
                        </div>

                        <div class="flex items-center gap-3">
                          <div class="flex items-center gap-1">
                            <button onclick="window.updateCartQty('${F.listing.id}', ${F.qtyKg-10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">-</button>
                            <span class="w-12 text-center font-bold text-slate-800">${F.qtyKg} kg</span>
                            <button onclick="window.updateCartQty('${F.listing.id}', ${F.qtyKg+10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">+</button>
                          </div>
                          <span class="font-extrabold text-slate-900 w-16 text-right">${(F.qtyKg*F.listing.pricePerKg).toLocaleString()} ETB</span>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `).join("")}
              </div>

              <!-- Price Breakdown (90% Farmer / 5% Driver / 5% Platform) -->
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
                <div class="flex justify-between text-slate-600">
                  <span>${y.farmerShare}:</span>
                  <strong class="text-emerald-900">${P.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${y.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${V.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${y.platformFee}:</span>
                  <strong class="text-slate-800">${Z.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${y.totalAmount}:</span>
                  <span class="text-emerald-800">${M.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${M})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
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
              <span class="text-xs font-bold text-blue-900">${y.totalAmount}</span>
              <div class="text-3xl font-black text-blue-950">${d.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <span class="text-[11px] text-blue-800 font-semibold block">${y.escrowGuarantee}</span>
            </div>

            <form onsubmit="window.handleTelebirrSubmit(event)" class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between"><label class="block text-xs font-bold text-slate-700">1. Shipping address</label><button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="text-[10px] font-bold text-emerald-700">Add address</button></div>
                ${u.getAccountData().addresses.length?`<select id="checkoutAddress" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"><option value="">Select a saved address</option>${u.getAccountData().addresses.map(k=>`<option value="${k.id}">${k.name} · ${k.street}, ${k.city}${k.isDefaultShipping?" · Default":""}</option>`).join("")}</select>`:`<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">Add a saved address before checkout. <button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="font-black underline">Manage addresses</button></div>`}
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
                      <i class="fa-solid fa-mobile-screen-button text-blue-600"></i> Direct Telebirr · ${((ae=u.getCurrentUser())==null?void 0:ae.phone)||"Linked Account"}
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
      ${c!=null&&c.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-5">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${y.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${c.order.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${c.order.id}')" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">${y.disputeReasonLabel}</label>
                <textarea id="disputeReasonInput" required rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Describe produce defects, transit spoilage, or weight discrepancy..."></textarea>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">${y.disputePhotoLabel}</label>
                <input type="text" id="disputePhotoUrl" value="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700">${y.refundPercentLabel}</label>
                  <span id="refundPercentVal" class="font-bold text-red-700">50% Partial Refund</span>
                </div>
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${c.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
                <i class="fa-solid fa-lock text-red-700 mr-1"></i>
                Submitting this dispute immediately locks the Telebirr Escrow and assigns case to Marketplace Admin for binding arbitration.
              </div>

              <button type="submit" class="btn-secondary w-full py-3 text-xs text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                <i class="fa-solid fa-gavel"></i> ${y.submitDisputeBtn}
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Live Order SignalR Tracking & Legal Invoicing Modal -->
      ${i?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${y.orderTracking}</h3>
                  <p class="text-xs text-slate-500 font-medium">Order ID: #${i.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeOrderModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Order Snapshot -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h4 class="font-bold text-slate-900 ${l==="am"?"lang-am":""}">${i.productName}</h4>
                <p class="text-xs text-slate-500">${i.qtyKg} kg · Farmer: ${i.farmerName}</p>
              </div>
              <div class="text-right">
                <span class="text-base font-extrabold text-emerald-800">${i.totalEtb.toLocaleString()} ETB</span>
                <span class="escrow-pill block text-[10px] mt-0.5">
                  ${i.escrowHeld?"Escrow Held (Locked)":i.status==="delivered"?"Funds Released":"Awaiting Chapa Payment"}
                </span>
              </div>
            </div>

            <!-- Legal Documents Quick Action Bar -->
            <div class="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200">
              <button onclick="window.openInvoiceModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-emerald-800 hover:bg-emerald-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${y.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${y.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${y.viewWaybillBtn}
              </button>

              ${i.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-money-bill-transfer text-emerald-700 mr-1"></i> Refund approved and returned through the original payment method.
                </div>
              `:i.status==="disputed"?`
                <button onclick="window.openArbitrationModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
                  <i class="fa-solid fa-scale-balanced mr-1 text-red-600"></i> ${y.viewArbitrationBtn}
                </button>
              `:""}
            </div>

            <!-- Timeline -->
            <div class="space-y-4 py-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${i.escrowHeld?"bg-emerald-600 text-white":"bg-amber-500 text-white"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid ${i.escrowHeld?"fa-check":"fa-clock"}"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">${i.escrowHeld?"Escrow Locked in PostgreSQL":"Awaiting Payment Verification"}</h5>
                  <p class="text-xs text-slate-500">Ref: ${i.paymentRef||"Pending"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["confirmed","picked_up","delivered"].includes(i.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-tractor"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Farmer Confirmation</h5>
                  <p class="text-xs text-slate-500">${["confirmed","picked_up","delivered"].includes(i.status)?"Produce harvested and packed at farm":"Awaiting farmer acceptance via SMS/App"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["picked_up","delivered"].includes(i.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-truck"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Driver Pickup & Transit</h5>
                  <p class="text-xs text-slate-500">${["picked_up","delivered"].includes(i.status)?`Isuzu Truck with Dawit Kebede in transit to ${i.deliveryAddress||"Depot"}`:"Driver assignment in progress"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${i.status==="delivered"?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">${i.disputeStatus==="ResolvedRefundBuyer"?"Refund Completed & Order Closed":"Delivery Confirmation & Escrow Release"}</h5>
                  <p class="text-xs text-slate-500">${i.disputeStatus==="ResolvedRefundBuyer"?"Refund returned through the original payment method.":i.status==="delivered"?"90% released to farmer, 5% to driver":"Confirm on receipt to release funds"}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 border-t border-slate-200 flex items-center gap-3">
              ${i.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-300 text-emerald-950 font-bold text-xs space-y-1 text-center shadow-xs">
                  <div class="flex items-center justify-center gap-2 text-emerald-800 text-sm font-extrabold">
                    <i class="fa-solid fa-circle-check text-emerald-600"></i> Full Refund Completed (100%)
                  </div>
                  <p class="text-slate-600 font-medium">
                    ${i.totalEtb.toLocaleString()} ETB refunded directly to your Telebirr wallet. Order closed under Legal Arbitration.
                  </p>
                </div>
              `:i.disputeStatus==="ResolvedPartialSplit"?`
                <div class="w-full p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-xs space-y-1 text-center shadow-xs">
                  <div class="flex items-center justify-center gap-2 text-amber-800 text-sm font-extrabold">
                    <i class="fa-solid fa-scale-balanced text-amber-600"></i> Partial Split Refund Completed
                  </div>
                  <p class="text-slate-600 font-medium">
                    Partial refund credited to your Telebirr wallet according to official mediation decree.
                  </p>
                </div>
              `:i.status!=="delivered"&&i.status!=="disputed"?`
                <button onclick="window.confirmDelivery('${i.id}')" class="btn-primary flex-1 py-3 text-xs cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i> ${y.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${i.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${y.disputeBtn}
                </button>
              `:(se=i.disputeStatus)!=null&&se.startsWith("Resolved")?`
                <div class="w-full p-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs text-center">
                  <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Dispute resolved: ${i.disputeStatus.replace("Resolved","").replace("Buyer"," Buyer").replace("Farmer"," Farmer").replace("PartialSplit"," Partial Split")}.
                </div>
              `:i.status==="disputed"?`
                <div class="w-full p-3 rounded-xl bg-red-100 text-red-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-triangle-exclamation text-red-700 mr-1"></i> Dispute Active: Escrow Frozen Under Admin Arbitration
                </div>
              `:`
                <div class="w-full space-y-2">
                  <div class="p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                    <i class="fa-solid fa-check-double text-emerald-700"></i> Delivery Completed & Escrow Released to Farmer
                  </div>
                  ${i.isRated?`
                    <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="font-extrabold text-amber-600">
                          ${[1,2,3,4,5].map(k=>`<i class="fa-solid fa-star ${k<=(i.reviewRating||5)?"text-amber-500":"text-slate-300"}"></i>`).join("")}
                        </span>
                        <span class="font-medium text-slate-700 italic truncate max-w-[200px]">"${i.reviewComment||"Great produce!"}"</span>
                      </div>
                      <button onclick="window.openRateModal('${i.id}')" class="text-emerald-700 hover:text-emerald-900 font-bold text-[11px] underline cursor-pointer">
                        Edit Review
                      </button>
                    </div>
                  `:`
                    <button onclick="window.openRateModal('${i.id}')" class="w-full btn-primary py-2.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 cursor-pointer">
                      <i class="fa-solid fa-star text-amber-200"></i> ${y.rateFarmerBtn||"Rate Farmer & Leave Review"}
                    </button>
                  `}
                </div>
              `}
            </div>

          </div>
        </div>
      `:""}

    </div>
  `}function Qt(l,e){const t=Y[l],s=[{key:"pending",label:"Order Placed",icon:"fa-lock",active:["pending","confirmed","PickedUp","picked_up","delivered"]},{key:"confirmed",label:"Farmer Confirmed",icon:"fa-tractor",active:["confirmed","PickedUp","picked_up","delivered"]},{key:"picked_up",label:"In Transit",icon:"fa-truck",active:["PickedUp","picked_up","delivered"]},{key:"delivered",label:"Delivered",icon:"fa-hand-holding-dollar",active:["delivered"]}];function a(i){const d=i==null?void 0:i.toLowerCase();return d==="delivered"?"text-emerald-700 bg-emerald-100 border-emerald-300":d==="picked_up"||d==="pickedup"?"text-blue-700 bg-blue-100 border-blue-300":d==="confirmed"?"text-amber-700 bg-amber-100 border-amber-300":d==="disputed"?"text-red-700 bg-red-100 border-red-300":"text-slate-600 bg-slate-100 border-slate-300"}function r(i,d){return i.some(c=>c.toLowerCase()===(d==null?void 0:d.toLowerCase()))}function n(i){const d=i==null?void 0:i.toLowerCase();return["confirmed","picked_up","pickedup"].includes(d)}return`
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
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
          ${e.map(i=>{var d,c;return`
            <div class="glass-card p-5 space-y-4 ${n(i.status)?"ring-1 ring-blue-300 shadow-blue-100":""}">

              <!-- Order Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  ${n(i.status)?`
                    <div class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800 text-[10px] font-extrabold">
                      <span class="pulse-dot" style="background:rgb(59,130,246)"></span> LIVE
                    </div>
                  `:""}
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-extrabold px-2 py-0.5 rounded-full border ${a(i.status)}">${i.status.toUpperCase()}</span>
                      <span class="font-bold text-slate-900 text-sm">${i.productName}</span>
                    </div>
                    <p class="text-xs text-slate-500 mt-0.5">
                      ${i.qtyKg} kg · Farmer: <strong class="text-slate-700">${i.farmerName}</strong> ·
                      <span class="text-emerald-800 font-bold">${i.totalEtb.toLocaleString()} ETB</span>
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 shrink-0">
                  ${i.status==="delivered"?`
                    ${i.isRated?`
                      <button onclick="window.openRateModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors" title="Edit your review">
                        <i class="fa-solid fa-star text-amber-500"></i>
                        <span>${i.reviewRating||5}/5</span>
                      </button>
                    `:`
                      <button onclick="window.openRateModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105">
                        <i class="fa-solid fa-star"></i>
                        <span>${t.rateFarmerBtn||"Rate Farmer"}</span>
                      </button>
                    `}
                  `:""}
                  <button onclick="window.openInvoiceModal('${i.id}')" class="btn-secondary text-xs py-1.5 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${t.viewInvoiceBtn}
                  </button>
                  <button onclick="window.viewOrder('${i.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                    <i class="fa-solid fa-satellite-dish mr-1"></i> Details
                  </button>
                </div>
              </div>

              <!-- Status Timeline -->
              <div class="relative flex items-start gap-0">
                ${s.map((o,m)=>{var w;const f=r(o.active,i.status),x=m===s.length-1;return`
                    <div class="flex-1 flex flex-col items-center">
                      <!-- Step circle -->
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all
                        ${f?"bg-emerald-600 text-white ring-2 ring-emerald-200":"bg-slate-100 text-slate-400 border border-slate-200"}">
                        <i class="fa-solid ${o.icon} text-[11px]"></i>
                      </div>
                      <!-- Connector line -->
                      ${x?"":`
                        <div class="absolute top-4 left-0 right-0 h-0.5 -z-10" style="left:calc(${m*100/(s.length-1)}% + 16px); width:calc(${100/(s.length-1)}% - 32px)">
                          <div class="h-full ${f&&r(((w=s[m+1])==null?void 0:w.active)??[],i.status)?"bg-emerald-400":"bg-slate-200"} rounded-full"></div>
                        </div>
                      `}
                      <!-- Step label -->
                      <span class="text-[9px] font-semibold mt-1.5 text-center leading-tight ${f?"text-emerald-800":"text-slate-400"}">
                        ${o.label}
                      </span>
                    </div>
                  `}).join("")}
              </div>

              <!-- Driver ETA (for in-transit orders) -->
              ${((d=i.status)==null?void 0:d.toLowerCase())==="picked_up"||((c=i.status)==null?void 0:c.toLowerCase())==="pickedup"?`
                <div class="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                  <i class="fa-solid fa-location-dot text-blue-600 text-base"></i>
                  <div>
                    <span class="font-bold text-blue-900">Driver is en route</span>
                    <span class="text-blue-700 ml-1.5">· ETA updates via live GPS</span>
                  </div>
                  <span id="eta-${i.id}" class="ml-auto font-extrabold text-blue-800">—</span>
                </div>
              `:""}

              <!-- Doc numbers footer -->
              <div class="flex items-center gap-3 text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                <span>INV: ${i.invoiceNumber||"ET-INV-001"}</span>
                <span>·</span>
                <span>CONTR: ${i.contractNumber||"AGR-ET-001"}</span>
                ${i.paymentRef?`<span>·</span><span>REF: ${i.paymentRef}</span>`:""}
              </div>

            </div>
          `}).join("")}
        </div>
      `}
    </div>
  `}function Xt(l,e){const t=Y[l];return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
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
                <h3 class="text-base font-extrabold text-slate-900 mt-1">${l==="am"&&s.productNameAm?s.productNameAm:s.productName}</h3>
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
  `}function Jt(l,e,t,s,a,r="listings",n=u.getPriceBenchmarks(),i=u.getCurrentUser()){const d=Y[l];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(i==null?void 0:i.region)||"Oromia (Bishoftu)"}
            </span>
            ${u.getVerificationStatus()==="Approved"?`
              <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
                <i class="fa-solid fa-circle-check text-emerald-600"></i> ${d.verifiedFayda} ${i!=null&&i.kycDocumentNumber?`(${i.kycDocumentNumber})`:""}
              </span>
              ${i!=null&&i.tinNumber?`
                <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
                  <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${i.tinNumber}
                </span>
              `:""}
            `:u.getVerificationStatus()==="UnderReview"?`
              <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
                <i class="fa-solid fa-hourglass-half text-amber-600"></i> ${l==="am"?"ማረጋገጫ በመገምገም ላይ":"Verification Under Review"}
              </span>
            `:u.getVerificationStatus()==="Rejected"?`
              <span class="trust-badge text-red-800 bg-red-50 border-red-200">
                <i class="fa-solid fa-circle-xmark text-red-600"></i> ${l==="am"?"ማረጋገጫ አልጸደቀም":"Verification Rejected"}
              </span>
            `:`
              <span class="trust-badge text-slate-700 bg-slate-100 border-slate-200">
                <i class="fa-solid fa-shield-halved text-slate-500"></i> ${l==="am"?"ያልተረጋገጠ መለያ":"Unverified Account"}
              </span>
            `}
            <span class="trust-badge text-amber-900 bg-amber-50 border-amber-300 font-extrabold">
              <i class="fa-solid fa-star text-amber-500"></i> ${u.getFarmerRatingStats((i==null?void 0:i.id)||"").averageRating} (${u.getFarmerRatingStats((i==null?void 0:i.id)||"").reviewCount} ${d.allReviews||"Reviews"})
            </span>
            <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
              <i class="fa-solid fa-users text-purple-600"></i> ${(i==null?void 0:i.repeatBuyerCount)||0} ${d.repeatBuyers}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> ${(i==null?void 0:i.onTimeDeliveryRate)||100}% ${d.onTimeRate}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">
            ${d.farmerPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.toggleFarmerTab('sms')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-comment-sms text-emerald-600"></i>
            <span class="${l==="am"?"lang-am":""}">${d.navSmsConsole}</span>
          </button>

          <button onclick="window.toggleFarmerTab('wallet')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-wallet text-amber-600"></i>
            <span class="${l==="am"?"lang-am":""}">${d.navWallet}</span>
          </button>

          <button onclick="${u.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"window.toggleCreateListingModal()":"window.alert('Permission Restricted: PUBLISH_PRODUCE has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer ${u.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"":"opacity-60 border-dashed bg-slate-700"}">
            <i class="fa-solid ${u.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"fa-plus-circle":"fa-lock"}"></i>
            <span class="${l==="am"?"lang-am":""}">${d.postNewListing}</span>
          </button>
        </div>
      </div>

      <!-- Verification Action Banner -->
      ${u.getVerificationStatus()!=="Approved"?`
        <div class="p-4 rounded-2xl ${u.getVerificationStatus()==="UnderReview"?"bg-amber-50 border border-amber-200":u.getVerificationStatus()==="Rejected"?"bg-red-50 border border-red-200":"bg-emerald-50 border border-emerald-200"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${u.getVerificationStatus()==="UnderReview"?"⏳":u.getVerificationStatus()==="Rejected"?"❌":"🛡️"}</span>
            <div>
              <h4 class="text-sm font-bold ${u.getVerificationStatus()==="UnderReview"?"text-amber-900":u.getVerificationStatus()==="Rejected"?"text-red-900":"text-emerald-900"}">
                ${u.getVerificationStatus()==="UnderReview"?l==="am"?"ሰነዶችዎ በአድሚን በመገምገም ላይ ናቸው":"Fayda ID & TIN Verification Under Review":u.getVerificationStatus()==="Rejected"?l==="am"?"ማረጋገጫዎ አልጸደቀም፤ እባክዎ እንደገና ያስገቡ":"Verification Rejected - Action Required":l==="am"?"መለያዎን በፋይዳ (Fayda) እና በTIN ያረጋግጡ":"Complete Fayda ID & Taxpayer TIN Verification"}
              </h4>
              <p class="text-xs ${u.getVerificationStatus()==="UnderReview"?"text-amber-700":u.getVerificationStatus()==="Rejected"?"text-red-700":"text-emerald-700"}">
                ${i!=null&&i.rejectionReason?`${d.rejectionReasonLabel}: ${i.rejectionReason}`:d.verificationBannerText}
              </p>
            </div>
          </div>
          <button onclick="window.openVerificationWizard()" class="btn-primary text-xs py-2 px-4 shrink-0 shadow-xs cursor-pointer ${u.getVerificationStatus()==="UnderReview"?"bg-amber-700 hover:bg-amber-800":u.getVerificationStatus()==="Rejected"?"bg-red-700 hover:bg-red-800":"bg-emerald-700 hover:bg-emerald-800"}">
            <i class="fa-solid fa-id-card mr-1"></i> ${u.getVerificationStatus()==="Rejected"?d.resubmitDocsBtn:d.startVerificationBtn}
          </button>
        </div>
      `:""}

      <!-- Farmer Portal Navigation Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onclick="window.toggleFarmerTab('listings')" class="cat-pill ${r==="listings"?"active":""}">
          <i class="fa-solid fa-box-open"></i>
          <span>${l==="am"?"ምርቶች እና ትዕዛዞች":"Produce & Orders"}</span>
        </button>
        <button onclick="window.toggleFarmerTab('wallet')" class="cat-pill ${r==="wallet"?"active":""}">
          <i class="fa-solid fa-wallet"></i>
          <span>${d.walletTitle}</span>
        </button>
        <button onclick="window.toggleFarmerTab('sms')" class="cat-pill ${r==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${d.smsConsoleTitle}</span>
        </button>
      </div>

      ${r==="wallet"?Zt(l,s,t,i):r==="sms"?ea(l):`

      <!-- Price Benchmark Advisory Banner -->
      <section class="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-lg space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-sm text-white ${l==="am"?"lang-am":""}">${d.priceBenchmarkTitle}</h3>
              <p class="text-[11px] text-emerald-200 font-medium">${d.benchmarkDesc}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-white/10 text-emerald-300 px-2.5 py-1 rounded-full border border-white/10">
            <i class="fa-solid fa-clock mr-1"></i> Live Merkato & Sholla Feeds
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          ${n.map(c=>`
            <div class="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div class="text-[11px] font-bold text-slate-300 truncate">${l==="am"?c.cropNameAm:c.cropName}</div>
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
            <span>${d.walletBalance}</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr Payout</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${((i==null?void 0:i.walletBalanceEtb)||48200).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> Ready for instant withdrawal
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${d.pendingEscrow}</span>
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
            <span>${d.lifetimePayout}</span>
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
          <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
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
                    <i class="fa-solid fa-file-contract mr-1"></i> ${d.viewContractBtn}
                  </button>

                  <button onclick="window.openInvoiceModal('${c.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer" title="Download Tax Exemption Receipt">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${d.viewInvoiceBtn}
                  </button>

                  <button onclick="window.openWaybillModal('${c.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer" title="View Transport Waybill">
                    <i class="fa-solid fa-truck-fast mr-1"></i> ${d.viewWaybillBtn}
                  </button>

                  ${c.status==="pending"?`
                    <button onclick="window.confirmFarmerOrder('${c.id}')" 
                      class="btn-primary text-xs py-1.5 px-4 shadow-sm cursor-pointer">
                      <i class="fa-solid fa-check mr-1"></i>
                      <span class="${l==="am"?"lang-am":""}">${d.confirmOrderAction}</span>
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
        <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
          <i class="fa-solid fa-box-open text-emerald-600 mr-2"></i> ${d.myActiveListings}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${e.map(c=>`
            <div 
              onclick="window.openProduceDetail('${c.id}')"
              class="glass-card overflow-hidden cursor-pointer hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 group"
              title="Click to view produce post details & photos"
            >
              <div class="h-44 w-full relative overflow-hidden">
                <img src="${c.photos[0]}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> View Post Details
                  </span>
                </div>

                <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                  ${c.isAdvanceHarvest?`
                    <span class="advance-pill shadow-xs">
                      <i class="fa-solid fa-calendar-days text-emerald-700"></i> Advance Harvest
                    </span>
                  `:""}
                  ${c.requiresColdChain?`
                    <span class="bg-cyan-900/90 backdrop-blur-md text-cyan-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-cyan-500/30">
                      <i class="fa-solid fa-snowflake"></i> Cold-Chain
                    </span>
                  `:""}
                  ${c.isAggregatedLot||c.cooperativeName?`
                    <span class="bg-amber-900/90 backdrop-blur-md text-amber-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-amber-500/30">
                      <i class="fa-solid fa-users"></i> ${c.cooperativeName||"Cooperative Lot"}
                    </span>
                  `:""}
                  ${c.isOrganic?`
                    <span class="bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      Organic
                    </span>
                  `:""}
                </div>

                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs z-10 pointer-events-none">
                  ${c.status.toUpperCase()}
                </span>
              </div>
              <div class="p-4 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span class="text-amber-600 font-bold"><i class="fa-solid fa-certificate mr-1"></i> ${c.grade||"Grade 1"}</span>
                  <span>${c.ripeness||"Ready Today"}</span>
                </div>

                <h3 class="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors ${l==="am"?"lang-am":""}">
                  ${l==="am"&&c.nameAm?c.nameAm:c.productName}
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

      <!-- Customer Reviews & Feedback Section -->
      ${(()=>{const c=(i==null?void 0:i.id)||"11111111-1111-1111-1111-111111111111",o=u.getReviewsForFarmer(c),m=u.getFarmerRatingStats(c);return`
          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
                  <i class="fa-solid fa-star text-amber-500 mr-2"></i> ${d.verifiedBuyerReviews||"Customer Reviews & Feedback"}
                </h2>
                <p class="text-xs text-slate-500 font-medium">Real-time ratings and comments from verified wholesale buyers who received your produce.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  ★ ${m.averageRating} / 5.0
                </span>
                <span class="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  ${m.reviewCount} ${d.allReviews||"Verified Reviews"}
                </span>
              </div>
            </div>

            ${o.length===0?`
              <div class="glass-card p-8 text-center text-slate-500 text-xs">
                <i class="fa-regular fa-comment-dots text-3xl mb-2 text-slate-300"></i>
                <p>${d.noReviewsYet||"No customer reviews yet. Reviews will appear here once buyers confirm delivery."}</p>
              </div>
            `:`
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${o.map(f=>`
                  <div class="glass-card p-4 space-y-2.5">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                          ${f.reviewerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div class="font-bold text-slate-900 text-xs">${f.reviewerName}</div>
                          <span class="text-[10px] text-slate-400 font-medium">${f.createdAt}</span>
                        </div>
                      </div>
                      <div class="flex items-center text-amber-400 text-xs gap-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        ${[1,2,3,4,5].map(x=>`
                          <i class="fa-solid fa-star ${x<=f.rating?"text-amber-500":"text-slate-200"}"></i>
                        `).join("")}
                        <span class="font-bold text-slate-700 ml-1 text-[11px]">${f.rating}.0</span>
                      </div>
                    </div>

                    ${f.quickTags&&f.quickTags.length>0?`
                      <div class="flex flex-wrap gap-1">
                        ${f.quickTags.map(x=>`
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                            ${x}
                          </span>
                        `).join("")}
                      </div>
                    `:""}

                    ${f.comment?`
                      <p class="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                        "${f.comment}"
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
      ${a?Je(l):""}

    </div>
  `}function Zt(l,e,t,s){const a=Y[l];return`
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
          <button onclick="${u.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"window.handleFarmerWithdrawal()":"window.alert('Permission Restricted: REQUEST_WALLET_WITHDRAWAL has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg w-full sm:w-auto cursor-pointer ${u.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"":"opacity-50 border-dashed"}">
            <i class="fa-solid ${u.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"fa-money-bill-transfer":"fa-lock"} mr-1 text-slate-950"></i> ${a.requestWithdrawal}
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
          <h3 class="text-base font-bold text-slate-900 ${l==="am"?"lang-am":""}">
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
  `}function ea(l){const e=Y[l];return`
    <div class="glass-card p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      
      <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-comment-sms"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${e.smsConsoleTitle}</h2>
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
  `}function Je(l,e){const t=Y[l];return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCreateListingModal()">
      <div class="modal-content p-6 sm:p-8 space-y-6 max-w-2xl">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${t.postNewListing}</h3>
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
              <span class="font-extrabold text-xs text-emerald-950 ${l==="am"?"lang-am":""}">${t.voiceNoteTitle}</span>
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
  `}function ta(l,e,t,s=u.getOptimizedRoute(),a=u.getCurrentUser(),r=u.getIsOfflineMode(),n=u.getOfflineQueue().length){const i=Y[l],d=(a==null?void 0:a.vehicleCapacityKg)||5e3,c=Math.min(100,Math.round(s.totalWeightKg/d*100));return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner with Vehicle & Offline Mode Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <i class="fa-solid fa-truck text-amber-700"></i> ${(a==null?void 0:a.vehicleType)||"Isuzu 5-Ton"} · ${(a==null?void 0:a.refrigerationType)||"Refrigerated Cold-Chain"}
            </span>
            <span class="trust-badge text-cyan-800 bg-cyan-50 border-cyan-200">
              <i class="fa-solid fa-snowflake text-cyan-600"></i> Cold-Chain Certified (0°C to 4°C active)
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

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">
            ${i.driverPortalTitle}
          </h1>
        </div>

        <!-- Offline-First Mode Controls -->
        <div class="flex items-center gap-3">
          <button onclick="window.toggleDriverOfflineMode()" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${r?"bg-amber-600 text-white border-amber-600 shadow-md":"bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}">
            <i class="fa-solid fa-wifi-slash mr-1"></i> ${r?"Offline Mode Active":"Online Mode"}
          </button>

          ${n>0?`
            <button onclick="window.syncDriverOfflineQueue()" class="btn-primary text-xs py-2 px-3.5 shadow-sm cursor-pointer animate-bounce">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${i.offlineSyncBtn} (${n})
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
              <h3 class="text-sm font-bold text-slate-900 ${l==="am"?"lang-am":""}">${i.vehicleProfileTitle}</h3>
              <p class="text-[11px] text-slate-500 font-medium">${(a==null?void 0:a.vehicleType)||"Isuzu 5-Ton"} · ${(a==null?void 0:a.refrigerationType)||"Ventilated Cargo"}</p>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-700">
            <span>Payload: <strong class="text-amber-800">${s.totalWeightKg.toLocaleString()} kg</strong> / ${d.toLocaleString()} kg (${c}%)</span>
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
            <span>${i.tripCommission}</span>
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
            <span>${i.ruralBonus}</span>
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
            <span>${i.totalDeliveredTrips}</span>
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
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${s.title}</h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span><i class="fa-solid fa-road text-amber-600 mr-1"></i> ${s.totalDistanceKm} km</span>
            <span><i class="fa-solid fa-clock text-blue-600 mr-1"></i> ~${s.estimatedHours} hrs</span>
            <span><i class="fa-solid fa-coins text-emerald-600 mr-1"></i> ${(s.driverCommissionEtb+s.ruralSubsidyEtb).toLocaleString()} ETB Total</span>
          </div>
        </div>

        <div class="space-y-4">
          ${s.stops.map((o,m)=>`
            <div class="flex items-start gap-4 p-4 rounded-2xl ${o.completed?"bg-emerald-50/60 border border-emerald-100":"bg-slate-50 border border-slate-200"}">
              <div class="w-8 h-8 rounded-full ${o.completed?"bg-emerald-600 text-white":o.type==="dropoff"?"bg-blue-600 text-white":"bg-amber-600 text-white"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5">
                ${o.completed?'<i class="fa-solid fa-check"></i>':o.stopNumber}
              </div>

              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold ${o.type==="dropoff"?"text-blue-800":"text-amber-800"} uppercase">
                    ${o.type==="pickup"?"Stop "+o.stopNumber+": Farm Pickup":"Final Stop: Buyer Wholesale Depot"}
                  </span>
                  <span class="text-xs font-bold text-slate-500">${o.weightKg} kg</span>
                </div>

                <h4 class="text-sm font-extrabold text-slate-900 truncate">${o.locationName}</h4>
                <p class="text-xs text-slate-600"><i class="fa-solid fa-user text-slate-400 mr-1"></i> Contact: <strong class="text-slate-800">${o.contactName}</strong> (${o.phone})</p>
                <p class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-boxes-stacked text-slate-400 mr-1"></i> Cargo: ${o.cargoDetails}</p>
              </div>

              <div class="shrink-0">
                ${o.completed?`
                  <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <i class="fa-solid fa-check"></i> Picked Up
                  </span>
                `:`
                  <button onclick="window.handleDriverStopAction(${m})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
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
        <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
          <i class="fa-solid fa-road text-amber-600 mr-2"></i> ${i.availableTrips}
        </h2>

        ${e.length===0?`
          <div class="glass-card p-8 text-center text-slate-500 text-sm">
            No active trips assigned. Check back once farmers confirm incoming orders.
          </div>
        `:`
          <div class="space-y-4">
            ${e.map(o=>`
              <div class="glass-card p-5 space-y-4">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Waybill #${o.waybillNumber||"WB-FTA-001"}</span>
                    <h3 class="text-base font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">${o.productName} (${o.qtyKg} kg)</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-slate-400 font-medium block">${i.tripCommission} + Rural Subsidy</span>
                    <span class="text-lg font-black text-amber-700">${(o.driverCut+(o.driverSubsidyEtb||150)).toLocaleString()} ETB</span>
                  </div>
                </div>

                <!-- Origin & Destination Route -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span class="font-bold text-emerald-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-dot text-emerald-600"></i> Farm Pickup Location
                    </span>
                    <p class="text-slate-800 font-semibold">${o.farmerRegion}</p>
                    <p class="text-slate-500 font-medium">Farmer: ${o.farmerName} (${o.farmerPhone})</p>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                    <span class="font-bold text-blue-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-location-pin text-blue-600"></i> Buyer Delivery Depot
                    </span>
                    <p class="text-slate-800 font-semibold">${o.deliveryAddress||"Addis Ababa"}</p>
                    <p class="text-slate-500 font-medium">Buyer: ${o.buyerName} (${o.buyerPhone})</p>
                  </div>
                </div>

                <!-- Driver Actions with Photo + GPS verification and Waybill Viewer -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>Status:</span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${o.status==="picked_up"?"bg-amber-100 text-amber-800":o.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-800"}">${o.status.toUpperCase()}</span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button onclick="window.openWaybillModal('${o.id}')" class="btn-secondary text-xs py-2 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-sky-600"></i> ${i.viewWaybillBtn}
                    </button>

                    <button onclick="window.openContractModal('${o.id}')" class="btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${i.viewContractBtn}
                    </button>

                    ${o.status==="confirmed"?`
                      <button onclick="${u.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?`window.driverPickupWithProof('${o.id}')`:"window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')"}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${u.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"":"opacity-60 border-dashed bg-slate-700"}">
                        <i class="fa-solid ${u.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"fa-camera":"fa-lock"} mr-1"></i> ${i.uploadProof} & Pickup
                      </button>
                    `:o.status==="picked_up"?`
                      <button onclick="${u.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?`window.driverCompleteDeliveryProof('${o.id}')`:"window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')"}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${u.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"":"opacity-60 border-dashed bg-slate-700"}">
                        <i class="fa-solid ${u.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"fa-location-crosshairs":"fa-lock"} mr-1"></i> Dropoff + GPS Proof
                      </button>
                    `:`
                      <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Trip Completed · ${(o.driverCut+(o.driverSubsidyEtb||150)).toLocaleString()} ETB Deposited
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
  `}function aa(l,e="users",t="all",s="all",a="admin"){const r=Y[l],n=u.getAllUsers(),i=u.getBanners(),d=u.getListings(),c=u.getPlatformConfig(),o=u.getSystemAuditLogs(),m=u.getDeliveryZones(),f=u.getFeatureFlags(),x=u.getPendingPayoutApprovals(),w=u.getGlobalBusinessRules(),A=u.getBlacklist(),E=t==="all"?n:n.filter(S=>S.role.toLowerCase()===t.toLowerCase()),C=s==="all"?o:o.filter(S=>S.category.toLowerCase()===s.toLowerCase()),y={all:n.length,farmer:n.filter(S=>S.role==="farmer").length,buyer:n.filter(S=>S.role==="buyer").length,driver:n.filter(S=>S.role==="driver").length,agent:n.filter(S=>S.role==="agent").length,admin:n.filter(S=>S.role==="admin").length,superadmin:n.filter(S=>S.role==="superadmin").length};return`
    <div class="space-y-8 pb-24 animate-fadeIn">
      
      <!-- Top Super Admin Banner -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 rounded-3xl border border-rose-900/40 text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl pointer-events-none">
          <i class="fa-solid fa-crown"></i>
        </div>

        <div class="space-y-1 relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold mb-1">
            <i class="fa-solid fa-crown text-rose-400"></i> ${l==="am"?"የዋና አድሚን ቁጥጥር ማዕከል · ዶ/ር ዳዊት ኃይሌ":"Super Admin Root Governance · Dr. Dawit Haile"}
          </div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white ${l==="am"?"lang-am":""}">
            ${r.superAdminTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
            ${r.superAdminSubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 relative z-10">
          ${c.emergencyEscrowFrozen?`
            <span class="px-3 py-1.5 rounded-xl bg-red-600/90 text-white font-black text-xs border border-red-400 animate-pulse flex items-center gap-1.5">
              <i class="fa-solid fa-lock"></i> ESCROW FROZEN
            </span>
          `:`
            <span class="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-emerald-400"></i> Platform Active (90/5/5 Split)
            </span>
          `}
          <button onclick="window.triggerDbBackup()" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer shadow-xs">
            <i class="fa-solid fa-database text-rose-400"></i> ${l==="am"?"ዳታቤዝ ምትክ":"Backup DB"}
          </button>
          <button onclick="window.exportPlatformData('json')" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md">
            <i class="fa-solid fa-file-export"></i> ${l==="am"?"መረጃ አውርድ":"Export JSON"}
          </button>
        </div>
      </div>

      <!-- Super Admin Navigation Pills (12 Governance Panels) -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar text-xs font-bold">
        <button onclick="window.setSuperAdminTab('users')" class="cat-pill ${e==="users"?"active":""}">
          <i class="fa-solid fa-users-gear text-rose-500"></i>
          <span>${r.tabUserMaster} (${n.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('banners')" class="cat-pill ${e==="banners"?"active":""}">
          <i class="fa-solid fa-panorama text-emerald-500"></i>
          <span>${r.tabBanners} (${i.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('moderation')" class="cat-pill ${e==="moderation"?"active":""}">
          <i class="fa-solid fa-gavel text-purple-500"></i>
          <span>${r.tabModeration} (${d.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('permissions')" class="cat-pill ${e==="permissions"?"active":""}">
          <i class="fa-solid fa-key text-purple-500"></i>
          <span>${r.tabPermissions}</span>
        </button>

        <button onclick="window.setSuperAdminTab('config')" class="cat-pill ${e==="config"?"active":""}">
          <i class="fa-solid fa-sliders text-emerald-500"></i>
          <span>${r.tabPlatformConfig}</span>
        </button>

        <button onclick="window.setSuperAdminTab('financials')" class="cat-pill ${e==="financials"?"active":""}">
          <i class="fa-solid fa-money-bill-transfer text-amber-500"></i>
          <span>${r.tabFinancialOversight} (${x.filter(S=>S.status==="Pending").length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('audit')" class="cat-pill ${e==="audit"?"active":""}">
          <i class="fa-solid fa-clipboard-list text-blue-500"></i>
          <span>${r.tabAuditLogs} (${o.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('zones')" class="cat-pill ${e==="zones"?"active":""}">
          <i class="fa-solid fa-map-location-dot text-teal-500"></i>
          <span>${r.tabZones} (${m.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('feature_flags')" class="cat-pill ${e==="feature_flags"?"active":""}">
          <i class="fa-solid fa-toggle-on text-indigo-500"></i>
          <span>${r.tabFeatureFlags}</span>
        </button>

        <button onclick="window.setSuperAdminTab('emergency')" class="cat-pill ${e==="emergency"?"active":""}">
          <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
          <span>${r.tabEmergency}</span>
        </button>

        <button onclick="window.setSuperAdminTab('rules')" class="cat-pill ${e==="rules"?"active":""}">
          <i class="fa-solid fa-gavel text-amber-600"></i>
          <span>${r.tabBusinessRules}</span>
        </button>

        <button onclick="window.setSuperAdminTab('db_ops')" class="cat-pill ${e==="db_ops"?"active":""}">
          <i class="fa-solid fa-server text-slate-600"></i>
          <span>${r.tabDbOps}</span>
        </button>
      </div>

      <!-- Tab Content Panels -->
      ${sa(l,e,E,t,y,c,C,s,m,f,x,w,A,a)}

    </div>
  `}function sa(l,e,t,s,a,r,n,i,d,c,o,m,f,x="admin"){switch(e){case"users":return Ye(l,t,s,a);case"banners":return Ze(l);case"moderation":return et(l);case"permissions":return ra(l,x);case"config":return ia(l,r);case"financials":return oa(l,o);case"audit":return na(l,n,i);case"zones":return la(l,d);case"feature_flags":return da(l,c);case"emergency":return ca(l,r,f);case"rules":return ua(l,m);case"db_ops":return pa(l);default:return Ye(l,t,s,a)}}function Ye(l,e,t,s){const a=Y[l];return`
    <div class="space-y-6">
      
      <!-- User Summary & Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${l==="am"?"የተጠቃሚዎች ሙሉ አስተዳደር እና አዲስ መመዝገቢያ":"User Master Directory & Role Management"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${l==="am"?"ሁሉንም አርሶ አደሮች፣ ገዢዎች፣ ሹፌሮች እና አድሚኖች በቀጥታ ይመዝግቡ፣ ያርትዑ ወይም በእነርሱ ስም ይግቡ።":"Direct manual onboarding, full CRUD mutations, and 1-click live user impersonation."}
          </p>
        </div>

        <button onclick="window.openCreateUserModal()" class="btn-primary py-2.5 px-4 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-user-plus"></i>
          <span>${a.createUserBtn}</span>
        </button>
      </div>

      <!-- Role Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button onclick="window.setUserRoleFilter('all')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="all"?"bg-slate-900 text-white border-slate-900":"bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"}">
          All Users (${s.all})
        </button>
        <button onclick="window.setUserRoleFilter('farmer')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="farmer"?"bg-emerald-700 text-white border-emerald-700":"bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200"}">
          🌾 Farmers (${s.farmer})
        </button>
        <button onclick="window.setUserRoleFilter('buyer')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="buyer"?"bg-blue-700 text-white border-blue-700":"bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200"}">
          🛒 Wholesale Buyers (${s.buyer})
        </button>
        <button onclick="window.setUserRoleFilter('driver')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="driver"?"bg-amber-700 text-white border-amber-700":"bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200"}">
          🚚 Freight Drivers (${s.driver})
        </button>
        <button onclick="window.setUserRoleFilter('agent')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="agent"?"bg-teal-700 text-white border-teal-700":"bg-teal-50 text-teal-800 hover:bg-teal-100 border-teal-200"}">
          👥 Extension Agents (${s.agent})
        </button>
        <button onclick="window.setUserRoleFilter('admin')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="admin"?"bg-purple-700 text-white border-purple-700":"bg-purple-50 text-purple-800 hover:bg-purple-100 border-purple-200"}">
          🛡️ Admins (${s.admin})
        </button>
        <button onclick="window.setUserRoleFilter('superadmin')" class="px-3 py-1.5 rounded-xl border transition-all ${t==="superadmin"?"bg-rose-700 text-white border-rose-700":"bg-rose-50 text-rose-800 hover:bg-rose-100 border-rose-200"}">
          👑 Super Admins (${s.superadmin})
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
              ${e.map(r=>`
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full ${ma(r.role)} flex items-center justify-center font-bold text-xs shrink-0">
                        ${r.name.charAt(0)}
                      </div>
                      <div>
                        <span class="font-bold text-slate-900 block leading-tight">${r.name}</span>
                        <span class="text-[11px] text-slate-500 font-mono">${r.phone}</span>
                        ${r.primaryCrop?`<span class="text-[10px] text-emerald-700 font-semibold block">🌾 ${r.primaryCrop}</span>`:""}
                        ${r.vehicleType?`<span class="text-[10px] text-amber-700 font-semibold block">🚚 ${r.vehicleType}</span>`:""}
                      </div>
                    </div>
                  </td>

                  <td class="p-3.5">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${fa(r.role)}">
                      ${ga(r.role)} ${r.role.toUpperCase()}
                    </span>
                  </td>

                  <td class="p-3.5 text-slate-600">
                    <span>${r.region}</span>
                    ${r.kebele?`<span class="text-[10px] text-slate-400 block">${r.kebele}</span>`:""}
                  </td>

                  <td class="p-3.5">
                    ${r.verificationStatus==="Approved"||r.verified?`
                      <span class="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <i class="fa-solid fa-circle-check"></i> Fayda Verified
                      </span>
                    `:r.verificationStatus==="UnderReview"?`
                      <span class="inline-flex items-center gap-1 text-amber-700 font-bold text-[11px]">
                        <i class="fa-solid fa-clock"></i> Under Review
                      </span>
                    `:`
                      <span class="inline-flex items-center gap-1 text-slate-400 font-medium text-[11px]">
                        <i class="fa-solid fa-circle-xmark"></i> Unverified
                      </span>
                    `}
                    ${r.faydaId?`<span class="text-[10px] font-mono text-slate-500 block">${r.faydaId}</span>`:""}
                    ${r.tinNumber?`<span class="text-[10px] font-mono text-slate-500 block">TIN: ${r.tinNumber}</span>`:""}
                  </td>

                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-black ${r.status==="suspended"?"bg-red-100 text-red-800":"bg-emerald-100 text-emerald-800"}">
                      ${(r.status||"active").toUpperCase()}
                    </span>
                  </td>

                  <td class="p-3.5 text-right space-x-1 whitespace-nowrap">
                    ${r.role!=="superadmin"?`
                      <button onclick="window.startSuperAdminImpersonation('${r.id}')" title="Login As User" class="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer border border-rose-200">
                        <i class="fa-solid fa-user-secret mr-1"></i> Login As
                      </button>
                    `:""}

                    <button onclick="window.openEditUserModal('${r.id}')" title="Edit User" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    ${r.role!=="superadmin"?`
                      <button onclick="window.toggleUserSuspension('${r.id}')" title="${r.status==="suspended"?"Reinstate":"Suspend"}" class="p-1.5 rounded-lg ${r.status==="suspended"?"bg-emerald-50 text-emerald-700 hover:bg-emerald-100":"bg-amber-50 text-amber-700 hover:bg-amber-100"} font-bold text-xs transition-colors cursor-pointer">
                        <i class="fa-solid ${r.status==="suspended"?"fa-user-check":"fa-user-slash"}"></i>
                      </button>

                      <button onclick="window.deleteUserAccount('${r.id}')" title="Delete User" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors cursor-pointer">
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
  `}function ra(l,e="admin"){var d,c;const t=u.getPermissionsList(),s=u.getAllRolePermissions(),a=u.getRolePermissions(e),r=[{key:"admin",label:"Marketplace Admin",icon:"fa-shield-halved text-purple-600",badgeCls:"bg-purple-100 text-purple-800",count:Object.values(s.admin||{}).filter(Boolean).length},{key:"agent",label:"Field Extension Agent",icon:"fa-users-gear text-teal-600",badgeCls:"bg-teal-100 text-teal-800",count:Object.values(s.agent||{}).filter(Boolean).length},{key:"farmer",label:"Smallholder Farmer",icon:"fa-seedling text-emerald-600",badgeCls:"bg-emerald-100 text-emerald-800",count:Object.values(s.farmer||{}).filter(Boolean).length},{key:"driver",label:"Logistics Transporter",icon:"fa-truck-fast text-amber-600",badgeCls:"bg-amber-100 text-amber-800",count:Object.values(s.driver||{}).filter(Boolean).length},{key:"buyer",label:"Commercial Buyer",icon:"fa-basket-shopping text-blue-600",badgeCls:"bg-blue-100 text-blue-800",count:Object.values(s.buyer||{}).filter(Boolean).length},{key:"superadmin",label:"Super Admin (Root)",icon:"fa-crown text-rose-600",badgeCls:"bg-rose-100 text-rose-900",count:t.length}],n=["Governance & Root","Operational Moderation","Field & Logistics","Marketplace & Trade"],i={"Governance & Root":"fa-crown text-rose-600","Operational Moderation":"fa-shield-halved text-purple-600","Field & Logistics":"fa-truck-ramp-box text-teal-600","Marketplace & Trade":"fa-cart-shopping text-emerald-600"};return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-user-lock text-purple-600 mr-2"></i> ${l==="am"?"የሚናዎች እና ፈቃዶች ማትሪክስ (RBAC Engine)":"Role-Based Access Control & Permission Matrix"}
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold font-mono">
              ${t.length} Granular Capabilities
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            ${l==="am"?"ለእያንዳንዱ የሚና ዓይነት (Role) ልዩ የሆኑ ፈቃዶችን ያቀናብሩ። ለውጦች ወዲያውኑ በሲስተሙ ተግባራዊ ይሆናሉ።":"Configure granular privileges for Admins, Agents, Farmers, Drivers, and Buyers. Changes are dynamically persisted and enforced across the platform."}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="window.resetAllRolePermissions()" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-300">
            <i class="fa-solid fa-rotate-left"></i> ${l==="am"?"ወደ ነባሪ መልስ":"Reset to Factory Defaults"}
          </button>
        </div>
      </div>

      <!-- Role Selector Tabs -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        ${r.map(o=>{const m=o.key===e;return`
            <button onclick="window.setRbacSelectedRole('${o.key}')" class="p-3 rounded-2xl border transition-all text-left flex flex-col justify-between gap-2 cursor-pointer ${m?"bg-purple-900 text-white border-purple-800 shadow-md ring-2 ring-purple-600/30":"glass-card text-slate-700 hover:border-purple-300"}">
              <div class="flex items-center justify-between">
                <i class="fa-solid ${o.icon} text-base ${m?"text-purple-300":""}"></i>
                <span class="text-[10px] font-black px-1.5 py-0.5 rounded ${m?"bg-purple-800 text-purple-200":o.badgeCls}">
                  ${o.count}/${t.length}
                </span>
              </div>
              <div>
                <p class="text-xs font-black ${m?"text-white":"text-slate-900"}">${o.label}</p>
                <span class="text-[10px] font-mono opacity-70">${o.key.toUpperCase()}</span>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- Selected Role RBAC Configuration Card -->
      <div class="glass-card rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid ${((d=r.find(o=>o.key===e))==null?void 0:d.icon)||"fa-user-gear"}"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-slate-900">
                ${(c=r.find(o=>o.key===e))==null?void 0:c.label} Permissions
              </h3>
              <p class="text-[11px] text-slate-500">
                ${e==="superadmin"?"Root role possesses irrevocable master permissions across the entire cluster.":`Toggle specific capabilities for users assigned the '${e.toUpperCase()}' role.`}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${e==="superadmin"?"bg-rose-100 text-rose-900 border border-rose-200":"bg-emerald-100 text-emerald-800 border border-emerald-200"}">
              <i class="fa-solid fa-shield-check mr-1"></i> ${Object.values(a).filter(Boolean).length} / ${t.length} Active
            </span>
          </div>
        </div>

        <!-- Permissions By Category -->
        <div class="space-y-6">
          ${n.map(o=>{const m=t.filter(f=>f.category===o);return m.length===0?"":`
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                  <i class="fa-solid ${i[o]||"fa-shield"}"></i>
                  <span>${o}</span>
                  <span class="text-[10px] text-slate-400 font-mono">(${m.length})</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  ${m.map(f=>{const x=e==="superadmin"?!0:!!a[f.key],w=e==="superadmin";return`
                      <div class="p-3.5 rounded-2xl border transition-all ${x?"bg-emerald-50/40 border-emerald-200 ring-1 ring-emerald-500/10":"bg-slate-50/60 border-slate-200 opacity-80"} flex flex-col justify-between gap-2.5">
                        <div class="flex items-start justify-between gap-2">
                          <div>
                            <p class="text-xs font-black text-slate-900">${l==="am"&&f.labelAm?f.labelAm:f.label}</p>
                            <span class="text-[10px] font-mono text-purple-700 font-semibold">${f.key}</span>
                          </div>

                          <label class="relative inline-flex items-center cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              ${x?"checked":""}
                              ${w?"disabled":""}
                              onchange="window.handleToggleRolePermission('${e}', '${f.key}', this.checked)"
                              class="sr-only peer"
                            />
                            <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 ${w?"opacity-60 cursor-not-allowed":""}"></div>
                          </label>
                        </div>

                        <p class="text-[11px] text-slate-500 leading-snug font-normal">
                          ${f.description}
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
              ${t.map(o=>{var m,f,x,w,A;return`
                <tr class="hover:bg-slate-50/60 transition-colors">
                  <td class="py-2.5 px-3">
                    <span class="font-bold text-slate-900">${o.label}</span>
                    <span class="block text-[9px] text-purple-700 font-mono">${o.key}</span>
                  </td>
                  <td class="py-2.5 px-3">
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">${o.category}</span>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(m=s.admin)!=null&&m[o.key]?"fa-circle-check text-emerald-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(f=s.agent)!=null&&f[o.key]?"fa-circle-check text-teal-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(x=s.farmer)!=null&&x[o.key]?"fa-circle-check text-emerald-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(w=s.driver)!=null&&w[o.key]?"fa-circle-check text-amber-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(A=s.buyer)!=null&&A[o.key]?"fa-circle-check text-blue-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                </tr>
              `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function ia(l,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${l==="am"?"የሲስተም ውቅር እና የቴሌብር ክፍያ ዋስትና ክፍፍል (Escrow 90/5/5)":"Platform Configuration & Escrow Split Governance"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${l==="am"?"የገበሬው፣ የአጓጓዡ እና የሲስተሙን የክፍያ መቶኛ እና የቴሌብር ኤፒአይ ቁልፎችን ያስተካክሉ።":"Control escrow splits, Telebirr merchant credentials, Twilio SMS keys, and geocoding settings."}
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
  `}function oa(l,e){const t=e.filter(s=>s.status==="Pending");return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${l==="am"?"የፋይናንስ ቁጥጥር እና ከፍተኛ ክፍያዎች ማረጋገጫ":"Financial Oversight & High-Value Payout Authorizations"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${l==="am"?"ከ50,000 ብር በላይ የሆኑ የጅምላ ክፍያዎች በዋና አድሚን ይፈቀዳሉ።":"Multi-sig authorization queue for high-volume transactions, commission reconciliation, and tax summaries."}
        </p>
      </div>

      <!-- High-Value Payout Approval Cards -->
      <div class="space-y-3">
        <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
          <i class="fa-solid fa-stamp text-amber-600"></i> Pending Payout Authorizations (${t.length})
        </h3>

        ${t.length===0?`
          <div class="p-8 text-center glass-card border-slate-200">
            <i class="fa-solid fa-circle-check text-emerald-500 text-3xl mb-2"></i>
            <p class="text-xs font-bold text-slate-700">All high-value payouts are currently reviewed and authorized.</p>
          </div>
        `:`
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${t.map(s=>`
              <div class="glass-card p-5 border-l-4 ${s.riskScore==="High"?"border-red-600":s.riskScore==="Medium"?"border-amber-600":"border-emerald-600"} space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-xs font-bold text-slate-900 block">${s.recipientName}</span>
                    <span class="text-[11px] text-slate-500 font-mono">${s.recipientPhone} · ${s.recipientRole.toUpperCase()}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-black ${s.riskScore==="High"?"bg-red-100 text-red-800":s.riskScore==="Medium"?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"}">
                    ${s.riskScore.toUpperCase()} RISK
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 font-medium">Requested Withdrawal:</span>
                    <span class="text-base font-black text-emerald-700">${s.amountEtb.toLocaleString()} ETB</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-1 font-semibold">Trigger: ${s.triggerReason}</p>
                </div>

                <div class="flex items-center gap-2 pt-1">
                  <button onclick="window.approveHighValuePayout('${s.id}')" class="btn-primary flex-1 py-2 text-xs font-bold cursor-pointer">
                    <i class="fa-solid fa-check mr-1"></i> Authorize Telebirr Payout
                  </button>
                  <button onclick="window.rejectHighValuePayout('${s.id}')" class="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer border border-red-200">
                    <i class="fa-solid fa-ban mr-1"></i> Decline
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>

    </div>
  `}function na(l,e,t){return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${l==="am"?"የሲስተም ኦዲት መዝገብ እና የደህንነት ክትትል":"System-Wide Immutable Audit Trail & Security Monitor"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${l==="am"?"የአድሚን፣ የዋና አድሚን እና የሲስተም እንቅስቃሴዎችን በሙሉ በዝርዝር ይመልከቱ።":"Real-time tamper-evident logs of administrative actions, user mutations, escrow adjustments, and logins."}
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
              ${e.map(s=>`
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5 text-[11px] text-slate-500 font-mono whitespace-nowrap">${s.timestamp}</td>
                  <td class="p-3.5">
                    <span class="font-bold text-slate-900 block leading-tight">${s.actorName}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${s.actorRole.toUpperCase()}</span>
                  </td>
                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black ${ba(s.category)}">
                      ${s.category}
                    </span>
                    <span class="text-[11px] font-bold text-slate-800 block mt-0.5">${s.action}</span>
                  </td>
                  <td class="p-3.5 text-[11px] font-mono text-slate-600">
                    ${s.targetResource}
                    ${s.targetId?`<span class="block text-[10px] text-slate-400">${s.targetId}</span>`:""}
                  </td>
                  <td class="p-3.5 text-[11px] text-slate-500">
                    <span class="font-mono text-slate-700 font-bold block">${s.ipAddress}</span>
                    <span class="text-[10px] truncate max-w-[140px] block text-slate-400">${s.userAgent}</span>
                  </td>
                  <td class="p-3.5 text-xs font-normal text-slate-800 max-w-xs">
                    ${s.details}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `}function la(l,e){return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${l==="am"?"የማድረሻ ዞኖች እና የፖስትጂአይኤስ (PostGIS) ድንበሮች":"Multi-Region Delivery Clusters & PostGIS Spatial Geofencing"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${l==="am"?"የገጠር አርሶ አደሮች ማበረታቻ ክፍያ እና የማድረሻ ራዲየስን ያስተካክሉ።":"Configure regional delivery radius, PostGIS GPS bounds, and rural route subsidy incentives."}
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
  `}function da(l,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${l==="am"?"የባህሪያት ማብሪያ/ማጥፊያ እና የክልላዊ ሙከራዎች":"Feature Flags & Regional Rollout Management"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${l==="am"?"አዳዲስ የሲስተም አገልግሎቶችን በቅድሚያ ለተመረጡ ክልሎች ወይም ተጠቃሚዎች ይልቀቁ።":"Instantly toggle platform capabilities in real time without redeploying code."}
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
  `}function ca(l,e,t){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-red-950">
          ${l==="am"?"የአደጋ ጊዜ መቆጣጠሪያ እና ዓለም አቀፍ እገዳ (Killswitch)":"Emergency Killswitches & Global Blacklist"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${l==="am"?"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ እና አጠራጣሪ ተጠቃሚዎችን የማገድ እርምጃዎች።":"Immediate emergency transaction freeze and global blacklisting of fraudulent phone numbers or National IDs."}
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
              ${t.map(s=>`
                <tr>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-800">${s.type}</span>
                  </td>
                  <td class="p-3 font-mono font-bold text-slate-900">${s.value}</td>
                  <td class="p-3 text-slate-600">${s.reason}</td>
                  <td class="p-3 font-mono text-[11px] text-slate-500">${s.blacklistedAt}</td>
                  <td class="p-3 text-right">
                    <button onclick="window.removeFromBlacklist('${s.id}')" class="text-red-600 hover:text-red-800 font-bold cursor-pointer">
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
  `}function ua(l,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${l==="am"?"አጠቃላይ የግብይት እና የዋጋ ደንቦች":"Global Marketplace Trading Rules & Pricing Caps"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${l==="am"?"አነስተኛ እና ከፍተኛ የትዕዛዝ መጠን እና የዋጋ ገደቦችን ያስተካክሉ።":"Establish wholesale order size thresholds, dynamic price floor/ceiling variances, and delivery radius constraints."}
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
  `}function pa(l){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${l==="am"?"የዳታቤዝ ክዋኔዎች እና የሲስተም ጤና":"PostgreSQL 16 Database Operations & Infrastructure Health"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${l==="am"?"የዳታቤዝ ግንኙነቶችን፣ የትራንዛክሽን ቅጂዎችን እና የሲስተም ፍጥነትን ይቆጣጠሩ።":"Database connection pool metrics, automated snapshots, and live telemetry."}
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
  `}function ma(l){switch(l){case"superadmin":return"bg-rose-100 text-rose-800";case"admin":return"bg-purple-100 text-purple-800";case"farmer":return"bg-emerald-100 text-emerald-800";case"buyer":return"bg-blue-100 text-blue-800";case"driver":return"bg-amber-100 text-amber-800";case"agent":return"bg-teal-100 text-teal-800";default:return"bg-slate-100 text-slate-800"}}function fa(l){switch(l){case"superadmin":return"bg-rose-100 text-rose-900 border border-rose-300";case"admin":return"bg-purple-100 text-purple-900 border border-purple-300";case"farmer":return"bg-emerald-100 text-emerald-900 border border-emerald-300";case"buyer":return"bg-blue-100 text-blue-900 border border-blue-300";case"driver":return"bg-amber-100 text-amber-900 border border-amber-300";case"agent":return"bg-teal-100 text-teal-900 border border-teal-300";default:return"bg-slate-100 text-slate-800"}}function ga(l){switch(l){case"superadmin":return'<i class="fa-solid fa-crown text-rose-600"></i>';case"admin":return'<i class="fa-solid fa-shield-halved text-purple-600"></i>';case"farmer":return'<i class="fa-solid fa-seedling text-emerald-600"></i>';case"buyer":return'<i class="fa-solid fa-shopping-basket text-blue-600"></i>';case"driver":return'<i class="fa-solid fa-truck-fast text-amber-600"></i>';case"agent":return'<i class="fa-solid fa-users-gear text-teal-600"></i>';default:return'<i class="fa-solid fa-user"></i>'}}function ba(l){switch(l){case"USER_CRUD":return"bg-rose-100 text-rose-800";case"CONFIG":return"bg-purple-100 text-purple-800";case"FINANCE":return"bg-emerald-100 text-emerald-800";case"DISPUTE":return"bg-amber-100 text-amber-800";case"EMERGENCY":return"bg-red-100 text-red-800";case"IMPERSONATION":return"bg-blue-100 text-blue-800";default:return"bg-slate-100 text-slate-800"}}function Ze(l){const e=Y[l],t=u.getBanners();return`
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-panorama text-emerald-600 mr-2"></i> ${e.tabBanners}
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              ${t.length} Total (${t.filter(s=>s.isActive).length} Active)
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
        `:t.map(s=>`
          <div class="glass-card rounded-3xl overflow-hidden border ${s.isActive?"border-emerald-200 ring-1 ring-emerald-500/20":"border-slate-200 opacity-75"} flex flex-col justify-between transition-all hover:shadow-lg">
            <!-- Visual Thumbnail Preview -->
            <div class="relative h-44 bg-gradient-to-r ${s.themeGradient||"from-emerald-900 via-teal-900 to-slate-900"} p-4 text-white flex flex-col justify-between overflow-hidden">
              <img src="${s.imageUrl||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"}" class="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div class="relative z-10 flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                  ${s.badgeText||"Promotion"}
                </span>
                <span class="px-2 py-0.5 rounded-md ${s.isActive?"bg-emerald-500 text-white":"bg-slate-700 text-slate-300"} text-[10px] font-bold">
                  ${s.isActive?"LIVE / ACTIVE":"PAUSED"}
                </span>
              </div>

              <div class="relative z-10 space-y-1">
                <h4 class="text-sm font-black text-white leading-snug line-clamp-2">${l==="am"&&s.titleAm?s.titleAm:s.title}</h4>
                <p class="text-[11px] text-white/80 line-clamp-2 font-medium">${l==="am"&&s.subtitleAm?s.subtitleAm:s.subtitle||""}</p>
              </div>
            </div>

            <!-- Details & Actions -->
            <div class="p-4 space-y-3.5 text-xs">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold">
                  <i class="fa-solid fa-users mr-1"></i> Audience: ${s.targetAudience}
                </span>
                <span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold">
                  <i class="fa-solid fa-location-dot mr-1"></i> Region: ${s.targetRegion||"All"}
                </span>
                <span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-mono">
                  Priority: ${s.priority}
                </span>
              </div>

              <div class="text-[11px] text-slate-500 flex items-center justify-between">
                <span>CTA: <strong>${s.ctaText||"Browse"}</strong> &rarr; <span class="font-mono text-emerald-700 font-bold">${s.ctaLink||"marketplace"}</span></span>
                <span>${s.createdAt?s.createdAt.split("T")[0]:""}</span>
              </div>

              <!-- Action Bar -->
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button onclick="window.toggleBannerStatus('${s.id}')" class="px-3 py-1.5 rounded-xl ${s.isActive?"bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200":"bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"} text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                  <i class="fa-solid ${s.isActive?"fa-pause":"fa-play"}"></i> ${s.isActive?"Pause":"Activate"}
                </button>

                <div class="flex items-center gap-1.5">
                  <button onclick="window.openEditBannerModal('${s.id}')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer" title="Edit Banner">
                    <i class="fa-solid fa-pen-to-square text-xs"></i>
                  </button>
                  <button onclick="window.deleteBanner('${s.id}')" class="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer" title="Delete Banner">
                    <i class="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `}function et(l){const e=Y[l],t=u.getListings();return`
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${l==="am"?"lang-am":""}">
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
              `:t.map(s=>{const a=s.moderationStatus==="Flagged",r=s.marketBenchmarkPrice||50,n=Math.round((s.pricePerKg-r)/r*100);return`
                  <tr class="hover:bg-slate-50/60 transition-colors ${a?"bg-red-50/30":""}">
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-3">
                        <img src="${s.photos&&s.photos[0]?s.photos[0]:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200"}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0" />
                        <div>
                          <p class="font-bold text-slate-900 text-xs">${l==="am"&&s.nameAm?s.nameAm:s.productName}</p>
                          <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">${s.category}</span>
                            <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">${s.grade||"Grade 2"}</span>
                            ${s.isOrganic?'<span class="px-1.5 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold">Organic</span>':""}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="py-3.5 px-4">
                      <div>
                        <p class="font-bold text-slate-800 text-xs">${s.farmerName}</p>
                        <p class="text-[11px] text-slate-500 font-mono">${s.farmerPhone}</p>
                        <p class="text-[10px] text-slate-400">${s.region}</p>
                      </div>
                    </td>

                    <td class="py-3.5 px-4">
                      <div>
                        <span class="font-black text-slate-900 text-xs font-mono">${s.pricePerKg} ETB</span>
                        <div class="text-[10px] ${Math.abs(n)>30?"text-amber-700 font-bold":"text-slate-400"}">
                          ${n>0?`+${n}%`:`${n}%`} vs Avg (${r} ETB)
                        </div>
                      </div>
                    </td>

                    <td class="py-3.5 px-4 font-mono font-bold text-slate-800 text-xs">
                      ${s.qtyKg.toLocaleString()} kg
                      <span class="block text-[10px] text-slate-400 font-normal">Min: ${s.minOrderKg||50} kg</span>
                    </td>

                    <td class="py-3.5 px-4">
                      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${a?"bg-red-100 text-red-800 border border-red-200":"bg-emerald-100 text-emerald-800 border border-emerald-200"}">
                        <i class="fa-solid ${a?"fa-triangle-exclamation":"fa-circle-check"}"></i>
                        ${s.moderationStatus||"Approved"}
                      </span>
                    </td>

                    <td class="py-3.5 px-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button onclick="window.openAdminEditListingModal('${s.id}')" class="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1" title="Moderate Listing">
                          <i class="fa-solid fa-pen-to-square"></i> Moderate
                        </button>
                        <button onclick="window.flagListingAnomaly('${s.id}')" class="w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-colors cursor-pointer" title="Flag Price Anomaly">
                          <i class="fa-solid fa-flag text-xs"></i>
                        </button>
                        <button onclick="window.adminDeleteListing('${s.id}')" class="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer" title="Delete Listing">
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
  `}function ha(l,e,t,s=u.getAnomalyAlerts(),a=u.getKycQueue(),r=u.getRegionalAnalytics(),n="disputes"){const i=Y[l],d=u.getBanners(),c=u.getListings();return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance & Legal Compliance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">
            ${i.adminPortalTitle}
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
          <span class="text-xs font-bold text-slate-500">${i.statTotalVolume}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${e.totalTransactionVolumeEtb.toLocaleString()} <span class="text-xs font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">100% Telebirr Escrow</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${i.statPlatformRev}</span>
          <div class="text-xl sm:text-2xl font-black text-purple-900">
            ${e.totalPlatformCommissionEtb.toLocaleString()} <span class="text-xs font-bold text-purple-700">ETB</span>
          </div>
          <p class="text-[11px] text-purple-700 font-semibold">5% platform service</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${i.statVatRemitted}</span>
          <div class="text-xl sm:text-2xl font-black text-blue-900">
            ${(e.totalVatRemittedEtb||258.75).toLocaleString()} <span class="text-xs font-bold text-blue-700">ETB</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">15% VAT on platform fee</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${i.statWithholding}</span>
          <div class="text-xl sm:text-2xl font-black text-teal-900">
            ${(e.totalWithholdingReportedEtb||690).toLocaleString()} <span class="text-xs font-bold text-teal-700">ETB</span>
          </div>
          <p class="text-[11px] text-teal-700 font-semibold">Declared 2% to MOR</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${i.statActiveEscrow}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${e.activeEscrowHeldEtb.toLocaleString()} <span class="text-xs font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">Secured in Telebirr vault</p>
        </div>

      </section>

      <!-- Admin Tab Pills with RBAC status indicators -->
      ${(()=>{const o=u.hasEffectivePermission("RESOLVE_DISPUTES","admin"),m=u.hasEffectivePermission("MODERATE_LISTINGS","admin"),f=u.hasEffectivePermission("MANAGE_BANNERS","admin"),x=u.hasEffectivePermission("VIEW_ANOMALY_ALERTS","admin"),w=u.hasEffectivePermission("VERIFY_KYC","admin"),A=u.hasEffectivePermission("VIEW_TAX_COMPLIANCE","admin"),E=u.hasEffectivePermission("VIEW_REGIONAL_ANALYTICS","admin"),C=u.hasEffectivePermission("BROADCAST_SMS","admin");return`
          <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            <button onclick="window.setAdminTab('disputes')" class="cat-pill ${n==="disputes"?"active":""} ${o?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-scale-balanced"></i>
              <span>${i.resolveDisputeTitle} (${t.length})</span>
              ${o?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('moderation')" class="cat-pill ${n==="moderation"?"active":""} ${m?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-gavel text-purple-600"></i>
              <span>${i.tabModeration} (${c.length})</span>
              ${m?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('banners')" class="cat-pill ${n==="banners"?"active":""} ${f?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-panorama text-emerald-600"></i>
              <span>${i.tabBanners} (${d.length})</span>
              ${f?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${n==="anomalies"?"active":""} ${x?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
              <span>${i.anomalyScannerTitle} (${s.length})</span>
              ${x?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('kyc')" class="cat-pill ${n==="kyc"?"active":""} ${w?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-id-card"></i>
              <span>${i.kycQueueTitle} (${a.filter(y=>y.status==="Pending").length})</span>
              ${w?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('tax_compliance')" class="cat-pill ${n==="tax_compliance"?"active":""} ${A?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>Fiscal & Tax Invoicing</span>
              ${A?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('analytics')" class="cat-pill ${n==="analytics"?"active":""} ${E?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-chart-pie"></i>
              <span>${i.regionalAnalyticsTitle}</span>
              ${E?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('sms')" class="cat-pill ${n==="sms"?"active":""} ${C?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-tower-broadcast"></i>
              <span>${i.broadcastSmsTitle}</span>
              ${C?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
          </div>
        `})()}

      <!-- Tab Content: Moderation & Banners with RBAC Checks -->
      ${n==="moderation"?u.hasEffectivePermission("MODERATE_LISTINGS","admin")?et(l):`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የምርት ቁጥጥር ፈቃድ ተገድቧል":"Produce Moderation Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MODERATE_LISTINGS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      ${n==="banners"?u.hasEffectivePermission("MANAGE_BANNERS","admin")?Ze(l):`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የባነር አስተዳደር ፈቃድ ተገድቧል":"Banner Management Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MANAGE_BANNERS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split with Legal Decrees) -->
      ${n==="disputes"?u.hasEffectivePermission("RESOLVE_DISPUTES","admin")?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-scale-balanced text-purple-600 mr-2"></i> ${i.resolveDisputeTitle}
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
              ${t.map(o=>`
                <div class="glass-card p-6 border-l-4 border-red-500 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span class="text-xs font-bold text-red-700 uppercase">Arbitration Docket #${o.arbitrationDecreeNumber||"ARB-DEC-001"}</span>
                      <h3 class="text-base font-extrabold text-slate-900">${o.productName} (${o.qtyKg} kg · ${o.totalEtb.toLocaleString()} ETB)</h3>
                      <p class="text-xs text-slate-500">Claimant: <strong>${o.buyerName}</strong> vs Respondent: <strong>${o.farmerName}</strong></p>
                    </div>
                    <div class="flex items-center gap-2">
                      <button onclick="window.openArbitrationModal('${o.id}')" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs cursor-pointer">
                        <i class="fa-solid fa-gavel mr-1"></i> ${i.viewArbitrationBtn}
                      </button>
                      <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold">
                        <i class="fa-solid fa-lock mr-1"></i> Frozen (${o.totalEtb.toLocaleString()} ETB)
                      </span>
                    </div>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${i.disputeEvidence}:</span>
                      <p class="text-slate-800 leading-relaxed font-medium">"${o.disputeReason||"Delivered avocados were overripe and 20% bruised during transit from Hawassa."}"</p>
                      <div class="text-[11px] text-red-700 font-bold">Requested Remedy: ${o.requestedRefundPercent||50}% Partial Refund (${Math.round(o.totalEtb*((o.requestedRefundPercent||50)/100)).toLocaleString()} ETB)</div>
                    </div>

                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img src="${o.disputePhoto||o.pickupPhoto||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80"}" class="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs" />
                      <div class="space-y-1 text-slate-600">
                        <span class="font-bold text-slate-800 block">Inspection Pathology Image</span>
                        <p class="text-[11px]">Location: Bole Cold Storage Hub</p>
                        <p class="text-[11px]">Inspection Finding: 18.5% transit softening</p>
                      </div>
                    </div>
                  </div>

                  <!-- Legal Documents Reference Bar -->
                  <div class="flex items-center gap-2 text-xs">
                    <button onclick="window.openContractModal('${o.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> View Original Contract
                    </button>
                    <button onclick="window.openWaybillModal('${o.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> View Driver Waybill
                    </button>
                    <button onclick="window.openInvoiceModal('${o.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> View Sales Invoice
                    </button>
                  </div>

                  <!-- 3-Way Manual Arbitration Controls -->
                  <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <button onclick="window.adminResolveDispute('${o.id}', 'ReleaseToFarmer')" class="btn-primary text-xs py-2.5 px-4 cursor-pointer">
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${i.releaseFarmerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${o.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${i.refundBuyerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${o.id}', 'PartialSplit')" class="btn-secondary text-xs py-2.5 px-4 text-purple-700 border-purple-300 hover:bg-purple-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-scale-balanced"></i> ${i.splitFiftyFiftyBtn}
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
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የአለመግባባት ዳኝነት ፈቃድ ተገድቧል":"Dispute Arbitration Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'RESOLVE_DISPUTES' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 2: Fraud & Anomaly Detection Monitor -->
      ${n==="anomalies"?u.hasEffectivePermission("VIEW_ANOMALY_ALERTS","admin")?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> ${i.anomalyScannerTitle}
            </h2>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Active Heuristic Scanner
            </span>
          </div>

          <div class="space-y-3">
            ${s.map(o=>`
              <div class="glass-card p-5 border-l-4 ${o.severity==="High"?"border-red-600":o.severity==="Medium"?"border-amber-500":"border-blue-500"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase ${o.severity==="High"?"bg-red-100 text-red-800":o.severity==="Medium"?"bg-amber-100 text-amber-800":"bg-blue-100 text-blue-800"}">
                      ${o.severity} Severity
                    </span>
                    <h3 class="text-sm font-extrabold text-slate-900">${o.title}</h3>
                    <span class="text-[10px] text-slate-400 font-mono">[${o.type}]</span>
                  </div>
                  <p class="text-xs text-slate-600">${o.description}</p>
                  <p class="text-[10px] text-slate-400">Target: ${o.entityType} (${o.entityId.slice(0,8)}...) · Detected ${o.detectedAt}</p>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.handleDismissAnomaly('${o.id}')" class="btn-secondary text-xs py-1.5 px-3 cursor-pointer">
                    Dismiss
                  </button>
                  <button onclick="window.handleInvestigateAnomaly('${o.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
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
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የማጭበርበር ቅኝት ፈቃድ ተገድቧል":"Anomaly Scanner Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_ANOMALY_ALERTS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 3: Comprehensive Verification & Regulatory Audit Queue -->
      ${n==="kyc"?u.hasEffectivePermission("VERIFY_KYC","admin")?`
        <section class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${i.sideBySideInspectionTitle}
              </h2>
              <p class="text-xs text-slate-500">
                ${l==="am"?"የፋይዳ (Fayda) ብሔራዊ መታወቂያ፣ የግብር ከፋይ ቁጥር (TIN) እና የአርሶ አደሮች ሰነዶች ማረጋገጫ":"Inspect high-res Fayda ID cards, MOR TIN numbers, and field agent submissions."}
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
            ${u.getVerificationQueue().map(o=>`
              <div class="glass-card p-6 border-l-4 ${o.verificationStatus==="Approved"?"border-emerald-500":o.verificationStatus==="Rejected"?"border-red-500":"border-amber-500"} space-y-4">
                
                <!-- Card Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${o.userRole==="Driver"?"bg-amber-100 text-amber-800":o.userRole==="Farmer"?"bg-emerald-100 text-emerald-800":"bg-blue-100 text-blue-800"}">
                        ${o.userRole}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        ${o.registrationMethod==="Agent"?"🧑‍🌾 Assisted by "+(o.registeredByAgentName||"Field Agent"):"💻 Self Registered"}
                      </span>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900 mt-1">
                      ${o.userName} ${o.userNameAm?`<span class="text-sm font-normal text-slate-500">(${o.userNameAm})</span>`:""}
                    </h3>
                    <p class="text-xs text-slate-500 font-mono">${o.phone} · 📍 ${o.region}</p>
                  </div>

                  <div class="flex flex-col sm:items-end gap-1">
                    <span class="px-3 py-1 rounded-full text-xs font-extrabold ${o.verificationStatus==="Approved"?"bg-emerald-100 text-emerald-800":o.verificationStatus==="Rejected"?"bg-red-100 text-red-800":"bg-amber-100 text-amber-800"}">
                      ${o.verificationStatus==="Approved"?"✅ APPROVED":o.verificationStatus==="Rejected"?"❌ REJECTED":"⏳ UNDER REVIEW"}
                    </span>
                    <span class="text-[10px] text-slate-400">Registered: ${o.registeredAt}</span>
                  </div>
                </div>

                <!-- Verification Data & Documents Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  <!-- Column 1: Identity & Tax Data -->
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div class="font-bold text-slate-800 border-b border-slate-200 pb-1">
                      📋 ${l==="am"?"የመታወቂያ እና የታክስ መረጃ":"Identity & Tax Record"}
                    </div>
                    <div>
                      <span class="text-slate-500 block">${i.tinNumberLabel}:</span>
                      <strong class="font-mono text-emerald-800 text-sm">${o.tinNumber||"0099881122"}</strong>
                    </div>
                    ${o.documents.map(m=>`
                      <div class="pt-1">
                        <span class="text-slate-500 block">${m.documentType}:</span>
                        <strong class="font-mono text-slate-800">${m.documentNumber}</strong>
                      </div>
                    `).join("")}
                    ${o.rejectionReason?`
                      <div class="p-2 rounded bg-red-50 text-red-800 text-[11px] font-medium border border-red-200 mt-2">
                        <strong>${i.rejectionReasonLabel}:</strong> ${o.rejectionReason}
                      </div>
                    `:""}
                  </div>

                  <!-- Column 2 & 3: High-Res Document Photo Previews -->
                  <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${o.documents.flatMap(m=>[m.frontImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">🪪 ${m.documentType} (Front)</div>
                          <img src="${m.frontImageUrl}" alt="Document Front" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${m.frontImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      `:"",m.backImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">📜 ${m.documentType} (Back)</div>
                          <img src="${m.backImageUrl}" alt="Document Back" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${m.backImageUrl}', '_blank')" />
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
                    <span>${i.sendSmsNoticeToggle}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button 
                      onclick="window.adminReviewVerification('${o.userId}', 'Reject')" 
                      class="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
                    >
                      <i class="fa-solid fa-xmark mr-1"></i> ${i.rejectVerificationAction}
                    </button>
                    
                    <button 
                      onclick="window.adminReviewVerification('${o.userId}', 'Approve')" 
                      class="btn-primary text-xs py-2 px-5 cursor-pointer bg-emerald-700 hover:bg-emerald-800"
                    >
                      <i class="fa-solid fa-check mr-1"></i> ${i.approveVerificationAction}
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
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የKYC ማረጋገጫ ፈቃድ ተገድቧል":"KYC Verification Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VERIFY_KYC' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 4: Fiscal & Tax Invoicing Registry -->
      ${n==="tax_compliance"?u.hasEffectivePermission("VIEW_TAX_COMPLIANCE","admin")?`
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
                  ${u.getOrders().map(o=>`
                    <tr>
                      <td class="py-3 font-mono font-bold text-slate-900">${o.invoiceNumber||"ET-INV-001"}</td>
                      <td class="py-3 font-bold">${o.buyerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-ET-9912001</span></td>
                      <td class="py-3 font-bold">${o.farmerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-FARM-882910</span></td>
                      <td class="py-3 font-bold text-emerald-800">${o.totalEtb.toLocaleString()} ETB</td>
                      <td class="py-3 text-slate-600">${(o.platformCut*.15).toFixed(2)} ETB</td>
                      <td class="py-3 text-slate-600">${(o.totalEtb*.02).toFixed(2)} ETB</td>
                      <td class="py-3">
                        <button onclick="window.openInvoiceModal('${o.id}')" class="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[11px] cursor-pointer">
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
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የግብር ሰነዶች ፈቃድ ተገድቧል":"Fiscal & Tax Compliance Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_TAX_COMPLIANCE' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 5: Regional Analytics & EABC Impact Dashboard -->
      ${n==="analytics"?u.hasEffectivePermission("VIEW_REGIONAL_ANALYTICS","admin")?`
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i> ${i.regionalAnalyticsTitle}
            </h2>
            <span class="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              EABC Regional Sourcing Impact
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${r.map(o=>`
              <div class="glass-card p-5 space-y-3 border-t-4 border-emerald-600">
                <div class="text-xs font-extrabold text-slate-500 uppercase">${o.region}</div>
                <div class="text-xl font-black text-slate-900">${(o.totalGmvEtb/1e6).toFixed(2)}M <span class="text-xs font-bold text-emerald-700">ETB GMV</span></div>
                
                <div class="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div class="flex justify-between">
                    <span>Smallholders:</span>
                    <strong class="text-slate-900">${o.smallholdersCount.toLocaleString()}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Volume Traded:</span>
                    <strong class="text-slate-900">${o.volumeMetricTons} MT</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Top Commodity:</span>
                    <strong class="text-emerald-800">${o.topCrop}</strong>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የክልላዊ ትንታኔ ፈቃድ ተገድቧል":"Regional Analytics Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_REGIONAL_ANALYTICS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 6: Broadcast Bilingual SMS (Twilio) -->
      ${n==="sms"?u.hasEffectivePermission("BROADCAST_SMS","admin")?`
        <section class="glass-card p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
              <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${i.broadcastSmsTitle}</h2>
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
              <i class="fa-solid fa-paper-plane"></i> ${i.sendSmsBtn}
            </button>
          </form>
        </section>
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የኤስኤምኤስ ስርጭት ፈቃድ ተገድቧል":"SMS Broadcast Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'BROADCAST_SMS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

    </div>
  `}class va{constructor(e="en"){b(this,"currentLang","en");b(this,"activeTab","register");b(this,"ussdPhone","+251944556677");b(this,"ussdInput","*990#");b(this,"ussdScreenText",`Welcome to Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit`);this.currentLang=e}setLanguage(e){this.currentLang=e}render(){const e=Y[this.currentLang];u.getCurrentUser();const t=u.getAgentRegisteredFarmers(),s=t.filter(r=>r.status==="Approved").length,a=t.length*250;return`
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
              <div style="font-size: 1.4rem; font-weight: 800; color: #74c69d;">${s}</div>
              <div style="font-size: 0.75rem; color: #d8f3dc;">${this.currentLang==="am"?"የጸደቁ መለያዎች":"Approved & Active"}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #ffd166;">${a.toLocaleString()} ETB</div>
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
        ${this.activeTab==="register"?u.hasEffectivePermission("FIELD_AGENT_ONBOARDING","agent")?this.renderRegisterTab():`
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang==="am"?"የአርሶ አደር ምዝገባ ፈቃድ ተገድቧል":"Agent Onboarding Restricted"}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'FIELD_AGENT_ONBOARDING' permission. Please contact a Super Administrator.</p>
          </div>
        `:""}
        ${this.activeTab==="roster"?this.renderRosterTab(t):""}
        ${this.activeTab==="ussd_sim"?u.hasEffectivePermission("EXECUTE_USSD","agent")?this.renderUssdTab():`
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang==="am"?"የUSSD ክዋኔ ፈቃድ ተገድቧል":"USSD Execution Restricted"}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'EXECUTE_USSD' permission. Please contact a Super Administrator.</p>
          </div>
        `:""}

      </div>
    `}renderRegisterTab(){const e=Y[this.currentLang];return`
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
    `}renderRosterTab(e){const t=Y[this.currentLang];return`
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
              ${e.map(s=>`
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 12px; font-weight: 600; color: var(--color-text-primary);">
                    <div>${s.name}</div>
                    ${s.nameAm?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${s.nameAm}</div>`:""}
                  </td>
                  <td style="padding: 12px; font-family: monospace; color: var(--color-text-secondary);">${s.phone}</td>
                  <td style="padding: 12px; color: var(--color-text-secondary);">
                    <div>${s.region}</div>
                    ${s.kebele?`<div style="font-size: 0.75rem; color: var(--color-text-muted);">${s.kebele}</div>`:""}
                  </td>
                  <td style="padding: 12px;">
                    <span style="background: rgba(45, 106, 79, 0.1); color: #2d6a4f; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">
                      ${s.primaryCrop||"Mixed Crops"}
                    </span>
                  </td>
                  <td style="padding: 12px; font-family: monospace; font-size: 0.85rem;">${s.faydaId||"N/A"}</td>
                  <td style="padding: 12px;">
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; background: ${s.status==="Approved"?"rgba(16,185,129,0.15)":"rgba(234,179,8,0.15)"}; color: ${s.status==="Approved"?"#047857":"#b45309"};">
                      ${s.status==="Approved"?"✅ Approved":"⏳ Under Review"}
                    </span>
                  </td>
                  <td style="padding: 12px; text-align: right;">
                    <button onclick="window.sendAgentFarmerSms('${s.phone}')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px;">
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
    `}switchTab(e){this.activeTab=e}setUssdInput(e){this.ussdInput=e;const t=document.getElementById("ussdCodeInput");t&&(t.value=e)}async executeUssd(){const e=document.getElementById("ussdCodeInput"),t=(e==null?void 0:e.value)||this.ussdInput,s=await u.sendInboundUssdSimulation(this.ussdPhone,t);this.ussdScreenText=s;const a=document.getElementById("ussdDisplayScreen");a&&(a.innerText=s)}}class xa{constructor(e="en"){b(this,"currentLang","en");b(this,"isOpen",!1);b(this,"currentStep",1);b(this,"faydaNumber","");b(this,"tinNumber","");b(this,"kebeleNumber","");b(this,"frontImageUrl","https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80");b(this,"backImageUrl","https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80");this.currentLang=e}setLanguage(e){this.currentLang=e}open(e=1){this.isOpen=!0,this.currentStep=e;const t=u.getCurrentUser();t!=null&&t.tinNumber&&(this.tinNumber=t.tinNumber),this.render()}close(){this.isOpen=!1;const e=document.getElementById("verificationWizardModal");e&&(e.innerHTML="")}render(){const e=document.getElementById("verificationWizardModal");if(!e||!this.isOpen)return;const t=Y[this.currentLang],s=u.getCurrentUser(),a=u.getVerificationStatus();e.innerHTML=`
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
          <div style="padding: 1rem 1.75rem; background: ${this.getStatusBgColor(a)}; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.2rem;">${this.getStatusIcon(a)}</span>
              <div>
                <div style="font-size: 0.85rem; font-weight: 600; color: ${this.getStatusTextColor(a)};">
                  ${t.verificationStatusLabel}: <strong>${this.formatStatus(a)}</strong>
                </div>
                ${s!=null&&s.rejectionReason?`<div style="font-size: 0.8rem; color: #b91c1c; margin-top: 2px;"><strong>${t.rejectionReasonLabel}:</strong> ${s.rejectionReason}</div>`:""}
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); background: var(--color-bg); padding: 4px 8px; border-radius: 6px;">
              ${(s==null?void 0:s.registrationMethod)==="Agent"?"🧑‍🌾 "+(this.currentLang==="am"?"በኤጀንት የተመዘገበ":"Agent Registered"):"💻 "+(this.currentLang==="am"?"የራስ ምዝገባ":"Direct Registration")}
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
    `}renderStepContent(){const e=Y[this.currentLang],t=u.getCurrentUser();return this.currentStep===1?`
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
      `:""}getStatusBgColor(e){switch(e){case"Approved":return"rgba(16, 185, 129, 0.12)";case"UnderReview":return"rgba(234, 179, 8, 0.12)";case"Rejected":return"rgba(239, 68, 68, 0.12)";default:return"rgba(100, 116, 139, 0.1)"}}getStatusTextColor(e){switch(e){case"Approved":return"#047857";case"UnderReview":return"#b45309";case"Rejected":return"#b91c1c";default:return"#475569"}}getStatusIcon(e){switch(e){case"Approved":return"✅";case"UnderReview":return"⏳";case"Rejected":return"❌";default:return"📝"}}formatStatus(e){const t=Y[this.currentLang];switch(e){case"Approved":return t.statusApproved;case"UnderReview":return t.statusUnderReview;case"Rejected":return t.statusRejected;default:return t.statusPendingSubmission}}updateField(e,t){e==="fayda"&&(this.faydaNumber=t),e==="tin"&&(this.tinNumber=t),e==="kebele"&&(this.kebeleNumber=t)}setStep(e){this.currentStep=e,this.render()}async submit(){const e=this.faydaNumber||"FAN-8812-4091-2810",t=this.tinNumber||"0099881122";await u.submitVerificationDocuments(t,[{documentType:"FaydaId",documentNumber:e,frontImageUrl:this.frontImageUrl,backImageUrl:this.backImageUrl},{documentType:"TinCertificate",documentNumber:t,frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"}]),this.close()}}function ya(l,e){const t=e.filter(s=>!s.read).length;return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4 animate-scale-up">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <i class="fa-solid fa-bell text-sm"></i>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">
                ${l==="am"?"የኤስኤምኤስ (SMS) እና የስርዓት ማሳወቂያዎች":"SMS & Order Notifications"}
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
            <p class="font-medium">${l==="am"?"ምንም አዲስ ማሳወቂያ የለም።":"No notifications yet."}</p>
          </div>
        `:`
          <div class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            ${e.map(s=>{const a=s.type==="refund";return`
                <div class="p-3.5 rounded-2xl border transition-all ${a?"bg-gradient-to-r from-amber-50/80 via-emerald-50/60 to-white border-amber-300/80 shadow-xs":s.read?"bg-slate-50/80 border-slate-200/80 text-slate-600":"bg-white border-emerald-300 shadow-2xs text-slate-900 ring-1 ring-emerald-200/50"}">
                  <div class="flex items-center justify-between font-bold text-[10px] pb-1.5">
                    <div class="flex items-center gap-1.5">
                      ${a?`
                        <span class="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                          <i class="fa-solid fa-money-bill-transfer"></i> Telebirr Refund
                        </span>
                      `:`
                        <span class="px-2 py-0.5 rounded-full ${s.channel==="sms"?"bg-emerald-100 text-emerald-800":"bg-blue-100 text-blue-800"} uppercase font-extrabold">
                          <i class="fa-solid ${s.channel==="sms"?"fa-comment-sms":"fa-bell"} mr-0.5"></i> ${s.channel==="sms"?"Twilio SMS":"Push"}
                        </span>
                      `}
                      ${s.read?"":`
                        <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      `}
                    </div>
                    <span class="text-slate-400 font-medium">
                      ${new Date(s.sentAt||s.createdAt||Date.now()).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                    </span>
                  </div>
                  <p class="text-xs ${a?"font-bold text-slate-900":"font-medium text-slate-800"} leading-relaxed ${l==="am"?"lang-am":""}">
                    ${l==="am"&&s.messageAm?s.messageAm:s.messageEn}
                  </p>
                </div>
              `}).join("")}
          </div>
        `}

      </div>
    </div>
  `}function wa(l,e,t,s,a="",r="",n="",i="",d=""){return`
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
              <h3 class="text-lg sm:text-xl font-black tracking-tight text-white ${l==="am"?"lang-am":""}">
                ${e==="login"?l==="am"?"ወደ መለያዎ ይግቡ":"Sign In to Your Account":l==="am"?"አዲስ የጅምላ መለያ ይመዝገቡ":"Create a Wholesale Account"}
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
              <i class="fa-solid fa-right-to-bracket text-emerald-700"></i> ${l==="am"?"ግባ (Sign In)":"Sign In (መግቢያ)"}
            </button>
            <button onclick="window.setAuthMode('register')" 
              class="flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${e==="register"?"bg-white text-emerald-950 shadow-sm border border-slate-200/60":"text-slate-500 hover:text-slate-900"}">
              <i class="fa-solid fa-user-plus text-emerald-700"></i> ${l==="am"?"ተመዝገብ (Join Free)":"Join Free (አዲስ መመዝገቢያ)"}
            </button>
          </div>

          ${i?`
            <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <i class="fa-solid fa-circle-exclamation text-red-500 text-sm mt-0.5 shrink-0"></i>
              <div class="flex-1">
                <span class="font-bold block">${i}</span>
                ${e==="login"&&i.toLowerCase().includes("register")?`
                  <button type="button" onclick="window.switchToRegisterWithPhone('${s}')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
                    <i class="fa-solid fa-user-plus"></i> Register This Phone Now
                  </button>
                `:""}
                ${e==="register"&&(i.toLowerCase().includes("already exists")||i.toLowerCase().includes("sign in"))?`
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
                      <span class="block font-extrabold text-slate-900">${r?`Account: <strong>${r}</strong> (${n})`:"Multi-Channel Verification"}</span>
                      <span class="text-[11px] text-emerald-800 font-medium block">Phone: <strong>+251 ${s}</strong></span>
                      ${d?`
                        <div class="text-[11px] text-emerald-950 font-bold flex items-center gap-1.5 mt-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
                          <i class="fa-solid fa-envelope text-emerald-600"></i> Code sent to: <span class="underline text-emerald-800">${d}</span>
                        </div>
                      `:""}
                      ${a?`
                        <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100/90 rounded-md border border-emerald-300 text-emerald-950 font-bold text-[10px]">
                          <span>Demo OTP Code:</span> <code class="font-mono text-emerald-900 text-xs font-black">${a}</code>
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
                    ${l==="am"?"የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ":"Enter 6-Digit Verification Code"}
                  </label>
                  <input type="text" id="authOtpInput" maxlength="6" required placeholder="• • • • • •" autofocus
                    value="${a||""}"
                    class="w-full py-3.5 px-4 rounded-xl border border-slate-300 text-center text-3xl font-mono font-black tracking-widest focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 text-slate-900 shadow-inner" />
                  
                  <div class="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
                    <span>Didn't receive code?</span>
                    <button type="button" onclick="window.handleRequestOtp(event)" class="text-emerald-700 hover:underline font-bold cursor-pointer">
                      Resend Email / SMS Code
                    </button>
                  </div>
                </div>

                <button type="submit" id="verifyOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-circle-check mr-1.5"></i> ${l==="am"?"አረጋግጥና ግባ":"Verify Code & Sign In"}
                </button>
              </form>
            `:`
              <form onsubmit="window.handleRequestOtp(event)" class="space-y-4 pt-1">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="text-xs font-bold text-slate-800">
                      ${l==="am"?"የተመዘገበ የሞባይል ስልክ ቁጥር":"Registered Ethiopian Mobile Number"}
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
                    <i class="fa-solid fa-database text-emerald-600"></i> ${l==="am"?"በዳታቤዝ ውስጥ የተመዘገቡ ተጠቃሚዎች ብቻ መግባት ይችላሉ።":"Only existing registered accounts in the database can sign in."}
                  </p>
                </div>

                <button type="submit" id="requestOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${l==="am"?"የኤስኤምኤስ እና የኢሜይል ማረጋገጫ ኮድ ላክ":"Verify & Send SMS/Email Code"}
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
                  ${l==="am"?"የንግድ / የሥራ ዘርፍ ይምረጡ":"Select Your Business Role on the Exchange"}
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

              <!-- Optional Email Address Field -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <i class="fa-solid fa-envelope text-emerald-600"></i> ${l==="am"?"የኢሜይል አድራሻ (አማራጭ)":"Email Address (Optional)"}
                  </label>
                  <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                    ${l==="am"?"ለኦቲፒ እና የትዕዛዝ ማሳወቂያዎች":"For OTP & Email Alerts"}
                  </span>
                </div>
                <input type="email" id="regEmail" placeholder="e.g. tariku.haile@example.com (Optional)" 
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium" />
                <p class="text-[11px] text-slate-500 mt-1">
                  ${l==="am"?"ኢሜይል ካስገቡ የማረጋገጫ ኮድ (OTP) እና ሁሉም የትዕዛዝ መልዕክቶች በኢሜይልዎ ይደርሳሉ።":"If provided, OTP verification codes and order updates will also be sent to your email."}
                </p>
              </div>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
                <input type="checkbox" checked required class="mt-0.5 rounded text-emerald-600" />
                <span>I agree to the <strong>Farmer-to-Market Produce Exchange Terms</strong> and automated <strong>Telebirr Escrow terms</strong>.</span>
              </div>

              <button type="submit" id="registerSubmitBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer mt-1">
                <i class="fa-solid fa-user-check mr-1.5"></i> ${l==="am"?"ይመዝገቡና ወደ መለያዎ ይግቡ":"Complete Registration & Sign In"}
              </button>
            </form>
          `}

        </div>
      </div>
    </div>
  `}class Aa{constructor(){b(this,"currentLang","en")}setLanguage(e){this.currentLang=e}renderInvoice(e){const t=this.currentLang==="am";return`
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
    `}renderContract(e){var t,s,a;return`
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
              <small>${((s=e.eSignatures)==null?void 0:s.buyerSignDate)||"2026-08-22 08:31:02"}</small>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            Digital signatures are legally recognized under the Ethiopian Electronic Signature Proclamation No. 1072/2018. Immutable Platform Cryptographic Witness Hash: <code>${((a=e.eSignatures)==null?void 0:a.platformWitnessHash)||"0x8f2a991bce98124a9e4d"}</code>
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
    `}}const we=new Aa;class Sa{constructor(e="en"){b(this,"currentLang","en");b(this,"activePhotoIndex",0);b(this,"selectedQtyKg",50);this.currentLang=e}setLanguage(e){this.currentLang=e}setActivePhotoIndex(e){this.activePhotoIndex=e}setSelectedQtyKg(e){this.selectedQtyKg=Math.max(1,e)}render(e){if(!e)return"";const t=Y[this.currentLang],s=this.currentLang==="am",a=e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=80"],r=Math.min(this.activePhotoIndex,a.length-1),n=a[r],i=Math.max(e.minOrderKg||10,this.selectedQtyKg||e.minOrderKg||50),d=i*e.pricePerKg,c=Math.round(d*.9),o=Math.round(d*.05),m=Math.round(d*.05),f=e.marketBenchmarkPrice||e.pricePerKg*1.15,x=Math.max(0,f-e.pricePerKg),w=f>0?Math.round(x/f*100):0,A=e.description||`Freshly harvested Grade 1 ${e.productName} cultivated directly by smallholder farmer ${e.farmerName} in ${e.region}. Verified under Ethiopian agricultural commodity standards with 90% direct farmer escrow payout.`,E=e.descriptionAm||`በ${e.region} በአርሶ አደር ${e.farmerNameAm||e.farmerName} የተመረተ ምርጥ ደረጃ ${e.nameAm||e.productName}። በቴሌብር ዋስትና 90% ቀጥታ ለአርሶ አደሩ የሚከፈልበት ተመራጭ ምርት።`;return`
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
                    ${s?"የምርት መረጃ እና ዝርዝር":"PRODUCE POST & FARM DETAILS"}
                  </span>
                  <span class="bg-emerald-500/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    ${e.category}
                  </span>
                </div>
                <h2 class="text-lg font-black text-white leading-tight ${s?"lang-am":""}">
                  ${s&&e.nameAm?e.nameAm:e.productName}
                </h2>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.shareProduceListing('${e.id}')" title="${s?"ምርቱን ያጋሩ":"Share Produce Post"}" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
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
                      <i class="fa-solid fa-images text-emerald-400"></i> ${r+1} / ${a.length}
                    </span>
                  </div>
                </div>

                <!-- Multiple Photo Gallery Thumbnails (Click to Switch) -->
                ${a.length>1?`
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                      <span><i class="fa-solid fa-camera mr-1 text-emerald-600"></i> ${t.photoGallery} (${a.length} angles)</span>
                      <span class="text-[10px] text-slate-400 font-normal">Click thumbnail to inspect</span>
                    </div>
                    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      ${a.map((C,y)=>`
                        <button 
                          onclick="window.selectProducePhoto(${y})" 
                          class="relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${y===r?"border-emerald-600 ring-2 ring-emerald-500/30 scale-102 shadow-md":"border-slate-200 hover:border-emerald-400 opacity-70 hover:opacity-100"}"
                        >
                          <img src="${C}" alt="Photo angle ${y+1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                          <span class="absolute bottom-1 right-1 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                            ${y===0?"Harvest":y===1?"Packaged":"Inspection"}
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
                            ${s&&e.farmerNameAm?e.farmerNameAm:e.farmerName}
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
                        <i class="fa-solid fa-star mr-1"></i> ${u.getFarmerRatingStats(e.farmerId).averageRating}
                      </div>
                      <div class="text-[10px] text-slate-400 font-medium">${u.getFarmerRatingStats(e.farmerId).reviewCount} ${t.verifiedReviewsTitle||"Verified Reviews"}</div>
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
                      <i class="fa-solid fa-arrow-down"></i> ${w}% Direct Savings
                    </span>
                  </div>

                  <div class="flex items-baseline justify-between pt-1">
                    <div>
                      <div class="text-[11px] text-slate-500">Regional Depot Benchmark</div>
                      <div class="text-sm font-bold text-slate-700 line-through">
                        ${f.toFixed(1)} ETB/kg
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
                    Eliminates 3 intermediary middleman margins. You save <strong class="text-emerald-800 font-bold">${x.toFixed(1)} ETB/kg</strong> while smallholder receives full 90% value.
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
                <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2 ${s?"lang-am":""}">
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
                  ${A}
                </p>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-800 lang-am text-xs font-medium leading-relaxed">
                  <span class="font-bold text-emerald-800 block mb-1">የምርት ዝርዝር መግለጫ (አማርኛ)፡</span>
                  ${E}
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
            ${(()=>{const C=u.getReviewsForFarmer(e.farmerId),y=u.getFarmerRatingStats(e.farmerId);return`
                <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                    <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2 ${s?"lang-am":""}">
                      <i class="fa-solid fa-star-half-stroke text-amber-500"></i>
                      ${t.verifiedBuyerReviews}
                    </h3>
                    <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ${y.reviewCount} ${t.allReviews||"Verified Reviews"}
                    </span>
                  </div>

                  <!-- Rating Overview & Breakdown Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 via-slate-50 to-emerald-50/40 border border-slate-200/80 items-center">
                    
                    <!-- Big Score (4 Cols) -->
                    <div class="sm:col-span-4 text-center sm:text-left sm:border-r border-slate-200 sm:pr-4 space-y-1">
                      <div class="text-4xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1">
                        ${y.averageRating}
                        <span class="text-base font-bold text-slate-400">/ 5.0</span>
                      </div>
                      <div class="flex items-center justify-center sm:justify-start text-amber-400 text-sm gap-0.5">
                        ${[1,2,3,4,5].map(S=>`
                          <i class="fa-solid fa-star ${S<=Math.round(y.averageRating)?"text-amber-400":"text-slate-300"}"></i>
                        `).join("")}
                      </div>
                      <p class="text-[11px] text-slate-500 font-medium">
                        Based on ${y.reviewCount} verified smallholder escrow deliveries
                      </p>
                    </div>

                    <!-- Star Breakdown Bars (8 Cols) -->
                    <div class="sm:col-span-8 space-y-1.5 text-xs">
                      ${[5,4,3,2,1].map(S=>{const M=y.distribution[S]||0,P=y.distributionCounts[S]||0;return`
                          <div class="flex items-center gap-2">
                            <span class="w-8 text-[11px] font-bold text-slate-600 shrink-0 text-right">${S} ★</span>
                            <div class="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                              <div class="h-full bg-amber-400 rounded-full transition-all duration-500" style="width: ${M}%"></div>
                            </div>
                            <span class="w-12 text-[10px] text-slate-400 font-bold shrink-0 text-right">${P} (${M}%)</span>
                          </div>
                        `}).join("")}
                    </div>

                  </div>

                  <!-- Reviews & Comments List -->
                  ${C.length===0?`
                    <div class="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <i class="fa-regular fa-comment-dots text-2xl mb-1 text-slate-300"></i>
                      <p class="font-bold text-slate-600">${t.noReviewsYet}</p>
                    </div>
                  `:`
                    <div class="space-y-3 pt-1">
                      ${C.map(S=>`
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 hover:bg-slate-50/80 transition-colors">
                          <div class="flex items-center justify-between flex-wrap gap-2">
                            <div class="flex items-center gap-2.5">
                              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                ${S.reviewerName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div class="flex items-center gap-1.5">
                                  <span class="font-bold text-slate-900 text-xs">${S.reviewerName}</span>
                                  <span class="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                                    <i class="fa-solid fa-circle-check text-[8px]"></i> ${t.verifiedBuyerBadge}
                                  </span>
                                </div>
                                <span class="text-[10px] text-slate-400 font-medium">${S.createdAt}</span>
                              </div>
                            </div>

                            <div class="flex items-center text-amber-400 text-xs gap-0.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs">
                              ${[1,2,3,4,5].map(M=>`
                                <i class="fa-solid fa-star ${M<=S.rating?"text-amber-400":"text-slate-200"}"></i>
                              `).join("")}
                              <span class="font-bold text-slate-700 ml-1 text-[11px]">${S.rating}.0</span>
                            </div>
                          </div>

                          ${S.quickTags&&S.quickTags.length>0?`
                            <div class="flex flex-wrap gap-1 pt-0.5">
                              ${S.quickTags.map(M=>`
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                                  ${M}
                                </span>
                              `).join("")}
                            </div>
                          `:""}

                          ${S.comment?`
                            <p class="text-xs text-slate-700 leading-relaxed font-medium bg-white p-2.5 rounded-xl border border-slate-100 italic">
                              "${S.comment}"
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
                    onclick="window.setProduceOrderQty(${Math.max(e.minOrderKg,i-50)})" 
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
                      value="${i}" 
                      onchange="window.setProduceOrderQty(Number(this.value))"
                      class="w-full h-11 bg-white/10 border border-white/20 rounded-xl px-3 text-center text-white font-extrabold text-base focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                    <span class="absolute right-3 top-3 text-xs text-slate-400 font-bold pointer-events-none">kg</span>
                  </div>

                  <button 
                    onclick="window.setProduceOrderQty(${Math.min(e.qtyKg,i+50)})" 
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
                    <div>Farmer Payout (90%): <strong class="text-emerald-300 font-bold">${c.toLocaleString()} ETB</strong></div>
                    <div>Driver & Escrow (10%): <strong class="text-slate-200">${(o+m).toLocaleString()} ETB</strong></div>
                    <div class="text-[10px] text-amber-300 font-bold"><i class="fa-solid fa-stamp mr-1"></i> Tax-Exempt Produce (Art. 979)</div>
                  </div>
                </div>

              </div>

              <!-- Action Buttons: Add to Cart & Buy Now with Escrow -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button 
                  onclick="window.addProduceDetailToCart('${e.id}', ${i})" 
                  class="btn-secondary py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <i class="fa-solid fa-cart-plus text-emerald-700"></i>
                  ${t.addToCart} (${i} kg)
                </button>

                <button 
                  onclick="window.buyProduceNow('${e.id}', ${i})" 
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
    `}}const Te=new Sa;function ka(l,e=!1,t=!1,s=null,a=!1,r=!1,n=!1,i=null,d=!1,c=null){return`
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
    ${t&&s?(()=>{const o=u.getUserById(s);return o?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
            <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-5 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <h3 class="text-base font-black text-white">Edit User Profile: ${o.name}</h3>
              <p class="text-[11px] text-slate-400 font-mono">${o.id}</p>
            </div>

            <form onsubmit="window.handleEditUserSubmit(event, '${o.id}')" class="p-6 space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Full Name</label>
                  <input type="text" id="editNameInput" required value="${o.name}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Mobile Phone</label>
                  <input type="tel" id="editPhoneInput" required value="${o.phone}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Role</label>
                  <select id="editRoleSelect" class="input-field text-xs font-bold">
                    <option value="farmer" ${o.role==="farmer"?"selected":""}>Farmer</option>
                    <option value="buyer" ${o.role==="buyer"?"selected":""}>Buyer</option>
                    <option value="driver" ${o.role==="driver"?"selected":""}>Driver</option>
                    <option value="agent" ${o.role==="agent"?"selected":""}>Agent</option>
                    <option value="admin" ${o.role==="admin"?"selected":""}>Admin</option>
                    <option value="superadmin" ${o.role==="superadmin"?"selected":""}>Super Admin</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Status</label>
                  <select id="editStatusSelect" class="input-field text-xs font-bold">
                    <option value="active" ${o.status!=="suspended"?"selected":""}>Active</option>
                    <option value="suspended" ${o.status==="suspended"?"selected":""}>Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region</label>
                <input type="text" id="editRegionInput" required value="${o.region}" class="input-field text-xs font-bold" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Fayda National ID</label>
                  <input type="text" id="editFaydaInput" value="${o.faydaId||""}" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-mono font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">TIN Number</label>
                  <input type="text" id="editTinInput" value="${o.tinNumber||""}" placeholder="0011223344" class="input-field text-xs font-mono font-bold" />
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
    ${a?`
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
    ${r?`
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
    ${n?(()=>{var m,f,x,w;const o=i?u.getBannerById(i):null;return`
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
                  <h3 class="text-lg font-black text-white">${o?"Edit Promotional Banner":"Create Promotional Banner"}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleSaveBannerSubmit(event, '${i||""}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (English) *</label>
                  <input type="text" id="bannerTitleInput" required value="${o?o.title:""}" placeholder="e.g. Fresh Harvest Direct From Bishoftu" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (Amharic)</label>
                  <input type="text" id="bannerTitleAmInput" value="${(o==null?void 0:o.titleAm)||""}" placeholder="የቢሾፍቱ አዳዲስ ምርቶች በቀጥታ ከእርሻ" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (English)</label>
                  <textarea id="bannerSubtitleInput" rows="2" placeholder="Brief announcement details..." class="input-field text-xs">${(o==null?void 0:o.subtitle)||""}</textarea>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (Amharic)</label>
                  <textarea id="bannerSubtitleAmInput" rows="2" placeholder="የማስታወቂያው ዝርዝር..." class="input-field text-xs">${(o==null?void 0:o.subtitleAm)||""}</textarea>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Audience</label>
                  <select id="bannerAudienceSelect" class="input-field text-xs font-bold">
                    <option value="All" ${(o==null?void 0:o.targetAudience)==="All"?"selected":""}>🌐 All Portals</option>
                    <option value="Buyer" ${(o==null?void 0:o.targetAudience)==="Buyer"?"selected":""}>🛒 Wholesale Buyers</option>
                    <option value="Farmer" ${(o==null?void 0:o.targetAudience)==="Farmer"?"selected":""}>🌾 Farmers & Producers</option>
                    <option value="Driver" ${(o==null?void 0:o.targetAudience)==="Driver"?"selected":""}>🚚 Logistics Drivers</option>
                    <option value="Agent" ${(o==null?void 0:o.targetAudience)==="Agent"?"selected":""}>👥 Extension Agents</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Region</label>
                  <select id="bannerRegionSelect" class="input-field text-xs font-bold">
                    <option value="All" ${(o==null?void 0:o.targetRegion)==="All"?"selected":""}>All Regions</option>
                    <option value="Addis Ababa" ${(o==null?void 0:o.targetRegion)==="Addis Ababa"?"selected":""}>Addis Ababa</option>
                    <option value="Oromia" ${(o==null?void 0:o.targetRegion)==="Oromia"?"selected":""}>Oromia</option>
                    <option value="Amhara" ${(o==null?void 0:o.targetRegion)==="Amhara"?"selected":""}>Amhara</option>
                    <option value="Sidama" ${(o==null?void 0:o.targetRegion)==="Sidama"?"selected":""}>Sidama</option>
                    <option value="SNNPR" ${(o==null?void 0:o.targetRegion)==="SNNPR"?"selected":""}>SNNPR</option>
                    <option value="Tigray" ${(o==null?void 0:o.targetRegion)==="Tigray"?"selected":""}>Tigray</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Display Priority (1-10)</label>
                  <input type="number" id="bannerPriorityInput" min="1" max="10" value="${o?o.priority:5}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (e.g. Harvest 2026)</label>
                  <input type="text" id="bannerBadgeInput" value="${(o==null?void 0:o.badgeText)||""}" placeholder="e.g. Special Promotion" class="input-field text-xs" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (Amharic)</label>
                  <input type="text" id="bannerBadgeAmInput" value="${(o==null?void 0:o.badgeTextAm)||""}" placeholder="e.g. ልዩ ቅናሽ" class="input-field text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Button Text</label>
                  <input type="text" id="bannerCtaTextInput" value="${(o==null?void 0:o.ctaText)||"Browse Marketplace"}" placeholder="e.g. Order Now" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Target Action / Tab</label>
                  <select id="bannerCtaLinkSelect" class="input-field text-xs font-bold">
                    <option value="marketplace" ${(o==null?void 0:o.ctaLink)==="marketplace"?"selected":""}>🛒 Marketplace (Buyer)</option>
                    <option value="farmer" ${(o==null?void 0:o.ctaLink)==="farmer"?"selected":""}>🌾 Farmer Portal</option>
                    <option value="driver" ${(o==null?void 0:o.ctaLink)==="driver"?"selected":""}>🚚 Driver Logistics</option>
                    <option value="agent" ${(o==null?void 0:o.ctaLink)==="agent"?"selected":""}>👥 Agent Directory</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Banner Background Image URL</label>
                <input type="url" id="bannerImageUrlInput" value="${(o==null?void 0:o.imageUrl)||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"}" class="input-field text-xs font-mono" />
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
                  <option value="from-emerald-900 via-teal-900 to-slate-900" ${(m=o==null?void 0:o.themeGradient)!=null&&m.includes("emerald")?"selected":""}>🍃 Emerald & Teal (Agriculture/Harvest)</option>
                  <option value="from-blue-900 via-indigo-950 to-slate-900" ${(f=o==null?void 0:o.themeGradient)!=null&&f.includes("blue")?"selected":""}>🔷 Royal Blue & Indigo (Legal/Fayda)</option>
                  <option value="from-amber-900 via-orange-950 to-slate-900" ${(x=o==null?void 0:o.themeGradient)!=null&&x.includes("amber")?"selected":""}>🔶 Amber & Orange (Freight Logistics)</option>
                  <option value="from-rose-950 via-slate-900 to-purple-950" ${(w=o==null?void 0:o.themeGradient)!=null&&w.includes("rose")?"selected":""}>👑 Rose & Purple (Super Admin Spotlight)</option>
                </select>
              </div>

              <div class="flex items-center gap-2 pt-2">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="bannerIsActiveCheck" ${o?o.isActive?"checked":"":"checked"} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Activate Banner Immediately Upon Saving</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="btn-primary py-2 px-5 font-bold shadow-md cursor-pointer">
                  ${o?"Save Changes":"Publish Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      `})():""}

    <!-- Moderate / Edit Produce Listing Modal -->
    ${d&&c?(()=>{var m,f,x;const o=u.getListings().find(w=>w.id===c);return o?`
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
                  <h3 class="text-lg font-black text-white">Moderate Listing: ${o.productName}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleAdminEditListingSubmit(event, '${o.id}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <!-- Farmer Info Card -->
              <div class="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800">${o.farmerName} <span class="text-slate-400 font-normal">(${o.farmerPhone})</span></p>
                  <p class="text-[11px] text-slate-500">${o.region}</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-white text-purple-800 border border-purple-200 text-[10px] font-bold">
                  Listing ID: ${o.id.slice(0,8)}...
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (English) *</label>
                  <input type="text" id="listingNameInput" required value="${o.productName}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (Amharic)</label>
                  <input type="text" id="listingNameAmInput" value="${o.nameAm||""}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Produce Category</label>
                  <select id="listingCategorySelect" class="input-field text-xs font-bold">
                    <option value="Vegetables" ${o.category==="Vegetables"?"selected":""}>Vegetables</option>
                    <option value="Cereals" ${o.category==="Cereals"?"selected":""}>Cereals / Grains</option>
                    <option value="Fruits" ${o.category==="Fruits"?"selected":""}>Fruits</option>
                    <option value="Pulses" ${o.category==="Pulses"?"selected":""}>Pulses</option>
                    <option value="Spices" ${o.category==="Spices"?"selected":""}>Spices</option>
                    <option value="Oilseeds" ${o.category==="Oilseeds"?"selected":""}>Oilseeds</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Grade / Quality</label>
                  <select id="listingGradeSelect" class="input-field text-xs font-bold">
                    <option value="Grade 1 (Premium / Export)" ${(m=o.grade)!=null&&m.includes("1")?"selected":""}>Grade 1 (Premium / Export)</option>
                    <option value="Grade 2 (Standard Wholesale)" ${(f=o.grade)!=null&&f.includes("2")||!o.grade?"selected":""}>Grade 2 (Standard Wholesale)</option>
                    <option value="Grade 3 (Processing / Bulk)" ${(x=o.grade)!=null&&x.includes("3")?"selected":""}>Grade 3 (Processing / Bulk)</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Moderation Status</label>
                  <select id="listingModerationStatusSelect" class="input-field text-xs font-bold ${o.moderationStatus==="Flagged"?"bg-red-50 text-red-800":"bg-emerald-50 text-emerald-800"}">
                    <option value="Approved" ${o.moderationStatus==="Approved"||!o.moderationStatus?"selected":""}>✅ Approved (Live on Marketplace)</option>
                    <option value="PendingReview" ${o.moderationStatus==="PendingReview"?"selected":""}>⏳ Pending Review (Hidden)</option>
                    <option value="Flagged" ${o.moderationStatus==="Flagged"?"selected":""}>⚠️ Flagged (Price Anomaly / Review)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Price per Kg (ETB) *</label>
                  <input type="number" step="0.5" id="listingPriceInput" required value="${o.pricePerKg}" class="input-field text-xs font-bold font-mono" />
                  <span class="text-[10px] text-slate-400">Benchmark: ${o.marketBenchmarkPrice||50} ETB/kg</span>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Total Available Stock (Kg) *</label>
                  <input type="number" id="listingQtyInput" required value="${o.qtyKg}" class="input-field text-xs font-bold font-mono" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Minimum Order Quantity (Kg)</label>
                  <input type="number" id="listingMinOrderInput" value="${o.minOrderKg||50}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region / Woreda Farm Location</label>
                <input type="text" id="listingRegionInput" value="${o.region}" class="input-field text-xs font-bold" />
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Listing Description</label>
                <textarea id="listingDescInput" rows="3" placeholder="Produce harvest details, packaging, shelf life..." class="input-field text-xs">${o.description||""}</textarea>
              </div>

              <div class="flex items-center gap-4 pt-1">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingOrganicCheck" ${o.isOrganic?"checked":""} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Certified Organic Produce</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingAdvanceHarvestCheck" ${o.isAdvanceHarvest?"checked":""} class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500" />
                  <span>Advance / Pre-Harvest Contract</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button type="button" onclick="window.adminDeleteListing('${o.id}')" class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold border border-red-200 flex items-center gap-1.5 cursor-pointer">
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
  `}const Ie=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Ea(l,e){return`<button onclick="window.setBuyerAccountTab('${l.id}')" class="account-nav-item ${e===l.id?"active":""}">
    <i class="fa-solid ${l.icon} w-5 text-center"></i><span>${l.label}</span>
  </button>`}function $a(l,e){const t=e.filter(a=>!["delivered","cancelled"].includes(a.status)),s=e.filter(a=>a.status==="delivered").length;return`<div class="space-y-6 animate-fade-in">
    <div class="account-welcome">
      <div><p class="account-kicker">BUYER ACCOUNT</p><h1>Good morning, ${l.name.split(" ")[0]}</h1><p>Everything you need to source, receive, and manage your produce orders.</p></div>
      <button onclick="window.navigateTab('marketplace')" class="btn-primary"><i class="fa-solid fa-store"></i> Browse marketplace</button>
    </div>
    <div class="account-stat-grid">
      <div class="account-stat"><span class="stat-icon green"><i class="fa-solid fa-box"></i></span><div><strong>${t.length}</strong><span>Active orders</span></div></div>
      <div class="account-stat"><span class="stat-icon blue"><i class="fa-solid fa-truck-fast"></i></span><div><strong>${e.filter(a=>a.status==="picked_up").length}</strong><span>In transit</span></div></div>
      <div class="account-stat"><span class="stat-icon gold"><i class="fa-solid fa-circle-check"></i></span><div><strong>${s}</strong><span>Delivered</span></div></div>
      <div class="account-stat"><span class="stat-icon rose"><i class="fa-solid fa-ticket"></i></span><div><strong>3</strong><span>Available coupons</span></div></div>
    </div>
    <section class="account-section"><div class="section-heading"><div><p class="account-kicker">RECENT ACTIVITY</p><h2>Orders at a glance</h2></div><button onclick="window.setBuyerAccountTab('orders')" class="text-action">View all <i class="fa-solid fa-arrow-right"></i></button></div>
      ${e.length?`<div class="account-list">${e.slice(0,3).map(a=>`<div class="order-row"><div class="order-product"><span class="order-thumb"><i class="fa-solid fa-wheat-awn"></i></span><div><strong>${a.productName}</strong><small>Order #${a.id.slice(0,8).toUpperCase()} · ${a.qtyKg} kg · ${a.farmerName}</small></div></div><span class="badge-status status-${a.status}">${a.status.replace("_"," ")}</span><strong class="order-price">${a.totalEtb.toLocaleString()} ETB</strong></div>`).join("")}</div>`:`<div class="empty-account"><i class="fa-solid fa-box-open"></i><p>No orders yet</p><button onclick="window.navigateTab('marketplace')" class="text-action">Find fresh produce</button></div>`}
    </section>
  </div>`}function Ta(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR ACCOUNT</p><h1>Profile & personalization</h1><p>Keep your identity and delivery preferences up to date.</p></div>
    <section class="account-section"><div class="profile-header"><div class="avatar-large">${l.name.charAt(0).toUpperCase()}</div><div><h2>${l.name}</h2><p>${l.phone} · ${l.region||"Ethiopia"}</p></div><button class="btn-secondary ml-auto" onclick="window.showAccountToast('Avatar upload is ready for blob storage integration.','fa-image')"><i class="fa-solid fa-camera"></i> Change photo</button></div>
      <form onsubmit="event.preventDefault(); window.saveBuyerProfile()" class="account-form"><label>Full name<input name="name" value="${l.name}" required /></label><label>Amharic name<input name="nameAm" value="${l.nameAm||""}" placeholder="Optional" /></label><label>Region<input name="region" value="${l.region||"Addis Ababa"}" required /></label><label>Email<input type="email" name="email" value="${l.email||""}" placeholder="Optional" /></label><label>Preferred currency<select name="currency"><option>ETB - Ethiopian Birr</option><option>USD - US Dollar</option><option>EUR - Euro</option></select></label><label>Preferred language<select name="languagePreference"><option value="en" ${l.languagePreference==="en"?"selected":""}>English</option><option value="am" ${l.languagePreference==="am"?"selected":""}>Amharic</option></select></label>
        <div class="form-wide location-field"><div><span class="field-label">Default delivery address</span><input name="savedDeliveryAddress" value="${l.savedDeliveryAddress||""}" placeholder="Street, city, region" /><p>Order locations are captured separately at checkout.</p></div><button type="button" class="btn-secondary" onclick="window.captureBuyerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Use current location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save changes</button></div></form>
    </section></div>`}function Ia(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">PURCHASE HISTORY</p><h1>My orders & shipping</h1><p>Track every delivery from farmer confirmation to your doorstep.</p></div><div class="account-tabs"><button class="selected">All <b>${l.length}</b></button><button>To pay <b>0</b></button><button>In transit <b>${l.filter(e=>["confirmed","picked_up"].includes(e.status)).length}</b></button><button>Delivered <b>${l.filter(e=>e.status==="delivered").length}</b></button><button>Disputed <b>${l.filter(e=>e.status==="disputed").length}</b></button></div><section class="account-section"><div class="account-list">${l.length?l.map(e=>`<div class="order-card"><div class="order-row"><div class="order-product"><span class="order-thumb"><i class="fa-solid fa-carrot"></i></span><div><strong>${e.productName}</strong><small>Order #${e.id.slice(0,8).toUpperCase()} · Farmer: ${e.farmerName}</small></div></div><span class="badge-status status-${e.status}">${e.status.replace("_"," ")}</span></div><div class="tracking-line"><span class="done"><i class="fa-solid fa-check"></i> Order placed</span><span class="${["confirmed","picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-check"></i> Farmer confirmed</span><span class="${["picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-truck"></i> In transit</span><span class="${e.status==="delivered"?"done":""}"><i class="fa-solid fa-house"></i> Delivered</span></div><div class="order-footer"><span>${e.qtyKg} kg · ${e.totalEtb.toLocaleString()} ETB</span><span>Payment: ${e.paymentRef||"Telebirr escrow"}</span><button class="text-action" onclick="window.showAccountToast('Live driver location will appear here when assigned.','fa-map-location-dot')">Track delivery <i class="fa-solid fa-arrow-right"></i></button></div></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-box-open"></i><p>Your order history will appear here.</p></div>'}</div></section></div>`}function Ra(l,e,t){var n;if(l==="addresses")return Ca(t.addresses);if(l==="payments")return Pa(t.paymentMethods);if(l==="disputes")return Na(e);const a={coupons:{kicker:"SAVINGS",title:"My coupons",description:"Use platform, farmer, and referral rewards at checkout.",icon:"fa-ticket",rows:t.coupons.length?t.coupons.map(i=>`${i.code} · ${i.value}${i.discountType==="Percent"?"%":" ETB"} · Expires ${new Date(i.expiresAt).toLocaleDateString()}`):["No coupons are currently available · Coupons will appear here when issued by the platform or a farmer"]},addresses:{kicker:"DELIVERY",title:"Saved addresses",description:"Manage shipping destinations with flexible Ethiopian address details.",icon:"fa-location-dot",rows:t.addresses.length?t.addresses.map(i=>`${i.name} · ${i.street}, ${i.city}, ${i.region}${i.isDefaultShipping?" · Default shipping":""}`):["No saved addresses yet · Add your first address to speed up checkout"]},payments:{kicker:"CHECKOUT",title:"Payment methods",description:"Payment details stay with Telebirr or Chapa. This account shows references attached to your orders.",icon:"fa-wallet",rows:t.paymentMethods.length?t.paymentMethods.map(i=>`${i.provider} · ${i.maskedDisplay||"Provider token linked"}${i.isPrimary?" · Primary":""}`):e.length?e.map(i=>`${i.paymentRef||"Payment reference pending"} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.totalEtb.toLocaleString()} ETB`):["No payment methods are linked yet"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Open a case for an order that was damaged, missing, wrong, or below quality.",icon:"fa-rotate-left",rows:e.filter(i=>i.status==="disputed").length?e.filter(i=>i.status==="disputed").map(i=>`${i.productName} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.disputeStatus||"Under review"}`):["No open disputes · Refunds return through the original Telebirr or Chapa method","Dispute window: 3 days after delivery · Proof supports up to 5 images and 1 video"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Choose how Farmer-to-Market keeps you informed and how your data is used.",icon:"fa-sliders",rows:t.notificationPreferences.length?t.notificationPreferences.map(i=>`${i.eventType} · SMS ${i.smsEnabled?"on":"off"} · In-app ${i.inAppEnabled?"on":"off"}`):["No notification preferences saved yet · Defaults are applied by the server"]},security:{kicker:"PROTECTION",title:"Security",description:"Keep your account protected with password, two-factor authentication, and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the form below",`Two-factor authentication · ${(n=t.twoFactor)!=null&&n.isEnabled?`${t.twoFactor.method} enabled`:"Not enabled"}`,`Active sessions · ${t.sessions.length} active session${t.sessions.length===1?"":"s"}`]}}[l],r=l==="security"?'<form onsubmit="event.preventDefault(); window.changeBuyerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required /></label><label>New password<input type="password" name="newPassword" minlength="8" required /></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form><button class="btn-secondary mt-4" onclick="window.revokeBuyerSessions()"><i class="fa-solid fa-right-from-bracket"></i> Log out all other sessions</button>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${a.kicker}</p><h1>${a.title}</h1><p>${a.description}</p></div><section class="account-section"><div class="module-list">${a.rows.map(i=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${a.icon}"></i></span><div><strong>${i.split(" · ")[0]}</strong><p>${i.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div></div>`).join("")}</div>${r}</section></div>`}function Ca(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">DELIVERY</p><h1>Saved addresses</h1><p>Manage shipping destinations. Postal codes remain optional.</p></div><section class="account-section"><div class="module-list">${l.length?l.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid fa-location-dot"></i></span><div><strong>${e.name} ${e.isDefaultShipping?'<em class="account-badge">Default shipping</em>':""}</strong><p>${e.street}, ${e.city}, ${e.region}, ${e.country}<br>${e.phone}${e.postalCode?` · ${e.postalCode}`:""}</p></div><button class="icon-button" title="Delete address" onclick="window.deleteBuyerAddress('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-location-dot"></i><p>No saved addresses yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerAddress()" class="account-form mt-6"><label>Address name<input name="name" placeholder="Wholesale hub" required></label><label>Phone<input name="phone" placeholder="+251 9•• ••• •••" required></label><label>Street<input name="street" required></label><label>City<input name="city" required></label><label>Region<input name="region" required></label><label>Postal code<input name="postalCode" placeholder="Optional"></label><label>Country<input name="country" value="Ethiopia" required></label><label class="flex items-center gap-2"><input type="checkbox" name="isDefaultShipping"> Default shipping</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-plus"></i> Add address</button></div></form></section></div>`}function Pa(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">CHECKOUT</p><h1>Payment methods</h1><p>Use Telebirr or Chapa hosted tokenization. Raw card numbers never reach this app.</p></div><section class="account-section"><div class="module-list">${l.length?l.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${e.provider==="Telebirr"?"fa-mobile-screen-button":"fa-credit-card"}"></i></span><div><strong>${e.provider} ${e.isPrimary?'<em class="account-badge">Primary</em>':""}</strong><p>${e.maskedDisplay||"Provider token linked"}${e.brand?` · ${e.brand}`:""}</p></div>${e.isPrimary?"":`<button class="icon-button" title="Set primary" onclick="window.setPrimaryBuyerPayment('${e.id}')"><i class="fa-solid fa-star"></i></button>`}<button class="icon-button" title="Remove payment method" onclick="window.deleteBuyerPayment('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-wallet"></i><p>No payment methods linked yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerPayment()" class="account-form mt-6"><label>Provider<select name="provider"><option>Telebirr</option><option>Chapa</option></select></label><label>Provider token<input name="providerToken" placeholder="Paste hosted-provider token" required></label><label>Masked display<input name="maskedDisplay" placeholder="•••• 4242" required></label><label>Brand<input name="brand" placeholder="Visa / Telebirr"></label><label>Expiry month<input type="number" name="expiryMonth" min="1" max="12"></label><label>Expiry year<input type="number" name="expiryYear" min="2026"></label><label class="flex items-center gap-2"><input type="checkbox" name="isPrimary"> Set as primary</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-link"></i> Link payment method</button></div></form></section></div>`}function Na(l){const e=l.filter(t=>{var s;return t.status==="delivered"||t.status==="disputed"||((s=t.disputeStatus)==null?void 0:s.startsWith("Resolved"))});return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">RESOLUTION CENTER</p><h1>Refunds & disputes</h1><p>Submit a claim for a delivered order. Refunds return through the original payment provider.</p></div><section class="account-section"><div class="module-list">${e.length?e.map(t=>{var s;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${t.disputeStatus==="ResolvedRefundBuyer"?"fa-money-bill-transfer":"fa-box-open"}"></i></span><div><strong>${t.productName}</strong><p>Order #${t.id.slice(0,8).toUpperCase()} · ${t.disputeStatus==="ResolvedRefundBuyer"?"Refunded to original payment method":t.disputeStatus||(t.status==="disputed"?"Under review":"Eligible for dispute")}</p></div>${t.status==="delivered"&&!((s=t.disputeStatus)!=null&&s.startsWith("Resolved"))?`<button class="btn-secondary" onclick="window.submitBuyerDispute('${t.id}')"><i class="fa-solid fa-flag"></i> Open dispute</button>`:""}</div>`}).join(""):'<div class="empty-account"><i class="fa-solid fa-circle-check"></i><p>No delivered orders are currently eligible for a dispute.</p></div>'}</div></section></div>`}function Da(l,e,t,s,a){const r=Ie.find(i=>i.id===s)||Ie[0];let n=s==="overview"?$a(e,t):s==="profile"?Ta(e):s==="orders"?Ia(t):Ra(s,t,a);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${Ie.map((i,d)=>`${i.group&&(d===0||Ie[d-1].group!==i.group)?`<p class="account-nav-group">${i.group}</p>`:""}${Ea(i,s)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Need a hand?</strong><span>Visit the Help Center</span><button onclick="window.showAccountToast('Help Center CMS content will open here.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('marketplace')">Marketplace</button><i class="fa-solid fa-chevron-right"></i><span>${r.label}</span></div>${n}</main></div>`}const Re=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function _a(l,e){return`<button onclick="window.setFarmerAccountTab('${l.id}')" class="account-nav-item ${e===l.id?"active":""}"><i class="fa-solid ${l.icon} w-5 text-center"></i><span>${l.label}</span></button>`}function Ba(l){return`<section class="account-section"><div class="section-heading"><div><p class="account-kicker">SELLER CENTER</p><h2>My produce posts</h2></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="module-list mt-5">${l.length?l.map(e=>`<div class="module-row"><span class="order-thumb"><img src="${e.photos[0]}" alt="${e.productName}" class="w-full h-full object-cover rounded-lg"></span><div><strong>${e.productName}</strong><p>${e.qtyKg.toLocaleString()} kg available · ${e.pricePerKg} ETB/kg · ${e.status}</p></div><button class="icon-button" title="Delete post" onclick="window.deleteFarmerListing('${e.id}')"><i class="fa-solid fa-trash text-rose-600"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-seedling"></i><p>You have no active produce posts.</p></div>'}</div></section>`}function _e(l,e,t){const s=t.filter(i=>{var d;return i.status==="disputed"||((d=i.disputeStatus)==null?void 0:d.startsWith("Resolved"))});if(l==="profile")return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR FARM ACCOUNT</p><h1>Profile & personalization</h1><p>Update the public identity buyers see and your farm operating region.</p></div><section class="account-section"><div class="profile-header"><div class="avatar-large">${e.name.charAt(0).toUpperCase()}</div><div><h2>${e.name}</h2><p>${e.phone} · ${e.region}</p></div><span class="account-badge">${e.verified?"Verified farmer":"Verification pending"}</span></div><form onsubmit="event.preventDefault(); window.saveFarmerProfile()" class="account-form"><label>Full name<input name="name" value="${e.name}" required></label><label>Amharic name<input name="nameAm" value="${e.nameAm||""}" placeholder="Optional"></label><label>Farm region<input name="region" value="${e.region||""}" required></label><label>Email<input type="email" name="email" value="${e.email||""}" placeholder="Optional"></label><label>Preferred language<select name="languagePreference"><option value="en" ${e.languagePreference==="en"?"selected":""}>English</option><option value="am" ${e.languagePreference==="am"?"selected":""}>Amharic</option></select></label><label>Primary produce<input name="primaryCrop" value="${e.primaryCrop||""}" placeholder="Tomatoes, teff, coffee"></label><div class="form-wide location-field"><div><span class="field-label">Farm pickup address</span><input name="savedDeliveryAddress" value="${e.savedDeliveryAddress||""}" placeholder="Woreda, kebele, pickup details"><p>Buyers and drivers use this as the default farm location.</p></div><button type="button" class="btn-secondary" onclick="window.captureFarmerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Capture location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save profile</button></div></form></section></div>`;const r={orders:{kicker:"FULFILLMENT",title:"Orders & tracking",description:"Orders appear here after buyers pay. Confirm them so available drivers can pick them up.",icon:"fa-box-open",rows:t.length?t.map(i=>`${i.productName} · ${i.qtyKg} kg · ${i.status.replace("_"," ")}`):["No buyer orders yet"]},coupons:{kicker:"SELLER SAVINGS",title:"My coupons",description:"Farmer-issued coupon management will use your payout share.",icon:"fa-ticket",rows:["No farmer-issued coupons yet · Coupon creation API is ready for the next seller release"]},addresses:{kicker:"FARM LOCATION",title:"Saved addresses",description:"Manage farm pickup locations and operating regions.",icon:"fa-location-dot",rows:[`${e.region} · Farm pickup region`,"Additional pickup-address management is pending the farm-location API"]},payments:{kicker:"PAYOUTS",title:"Payment methods",description:"Manage the Telebirr payout destination for your 90% settlement.",icon:"fa-wallet",rows:[`Telebirr payout · ${e.phone} · 90% farmer share`,"Bank fallback · Not configured"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Respond to buyer claims and track payout impact.",icon:"fa-rotate-left",rows:s.length?s.map(i=>`${i.productName} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.disputeStatus==="ResolvedRefundBuyer"?"Refunded to buyer":i.disputeStatus||"Under review"}`):["No buyer disputes"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Configure seller notifications and auto-accept preferences.",icon:"fa-sliders",rows:["Order updates · In-app notifications on","Dispute updates · SMS on","Auto-accept orders · Configure quantity threshold"]},security:{kicker:"PROTECTION",title:"Security",description:"Protect your farmer account with password and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the security form","Two-factor authentication · SMS recommended","Active sessions · Manage from the security API"]}}[l],n=l==="security"?'<form onsubmit="event.preventDefault(); window.changeFarmerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required></label><label>New password<input type="password" name="newPassword" minlength="8" required></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${r.kicker}</p><h1>${r.title}</h1><p>${r.description}</p></div><section class="account-section"><div class="module-list">${r.rows.map((i,d)=>{var c;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${r.icon}"></i></span><div><strong>${i.split(" · ")[0]}</strong><p>${i.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div>${l==="orders"&&((c=t[d])==null?void 0:c.status)==="pending"?`<button class="btn-secondary" onclick="window.confirmFarmerOrder('${t[d].id}')"><i class="fa-solid fa-check"></i> Confirm</button>`:""}</div>`}).join("")}</div>${n}</section></div>`}function Oa(l,e,t,s,a,r=!1,n=[]){const i=Re.find(c=>c.id===a)||Re[0],d=a==="overview"?`<div class="space-y-6 animate-fade-in"><div class="account-welcome"><div><p class="account-kicker">FARMER ACCOUNT</p><h1>Welcome back, ${e.name.split(" ")[0]}</h1><p>Manage your produce posts, buyer orders, and payouts.</p></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="account-stat-grid"><div class="account-stat"><span class="stat-icon green"><i class="fa-solid fa-seedling"></i></span><div><strong>${t.length}</strong><span>Active posts</span></div></div><div class="account-stat"><span class="stat-icon blue"><i class="fa-solid fa-box"></i></span><div><strong>${s.filter(c=>c.status==="pending").length}</strong><span>New orders</span></div></div><div class="account-stat"><span class="stat-icon gold"><i class="fa-solid fa-truck"></i></span><div><strong>${s.filter(c=>c.status==="picked_up").length}</strong><span>In transit</span></div></div><div class="account-stat"><span class="stat-icon rose"><i class="fa-solid fa-hand-holding-dollar"></i></span><div><strong>${(e.walletBalanceEtb||0).toLocaleString()}</strong><span>Wallet ETB</span></div></div></div>${Ba(t)}</div>`:_e(a==="profile"?"profile":a==="orders"?"orders":a,e,s);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${Re.map((c,o)=>`${c.group&&(o===0||Re[o-1].group!==c.group)?`<p class="account-nav-group">${c.group}</p>`:""}${_a(c,a)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Farmer support</strong><span>Get help with orders and payouts</span><button onclick="window.showAccountToast('Support center integration is available from the farmer portal.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('farmer')">Farmer dashboard</button><i class="fa-solid fa-chevron-right"></i><span>${i.label}</span></div>${d}</main>${r?Je(l):""}</div>`}class La{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"currentSessionId","ussd-"+Math.random().toString(36).substring(2,9));b(this,"currentLanguage","am");b(this,"screenLines",["Dial *804# to start"]);b(this,"currentInput","*804#");b(this,"isSessionActive",!1);b(this,"isSending",!1);this.container=document.createElement("div"),this.container.id="ussd-modal-container",this.container.className="ussd-modal-backdrop hidden",document.body.appendChild(this.container),this.render()}open(e="*804#"){this.isOpen=!0,this.container.classList.remove("hidden"),this.currentInput=e,this.currentSessionId="ussd-"+Math.random().toString(36).substring(2,9),this.isSessionActive=!1,this.screenLines=["Dial *804# to begin rural farmer service"],this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}async dial(){var t;if(this.isSending)return;this.isSending=!0;const e={sessionId:this.currentSessionId,phoneNumber:((t=u.getCurrentUser())==null?void 0:t.phone)||"+251911223344",text:this.currentInput,serviceCode:"*804#",language:this.currentLanguage};this.screenLines=["Connecting to Ethio Telecom network...","Sending USSD code..."],this.renderScreen();try{const s=await u.simulateUssd(e);this.screenLines=s.message.split(`
`),this.isSessionActive=s.action==="CON",this.currentInput=""}catch{this.screenLines=["Connection failed.","Please check mobile network."],this.isSessionActive=!1}finally{this.isSending=!1,this.render()}}appendDigit(e){this.currentInput+=e,this.renderScreen()}clearInput(){this.currentInput.length>0?this.currentInput=this.currentInput.slice(0,-1):this.currentInput="",this.renderScreen()}resetSession(){this.currentSessionId="ussd-"+Math.random().toString(36).substring(2,9),this.isSessionActive=!1,this.currentInput="*804#",this.screenLines=["Session reset.","Dial *804# to start."],this.render()}renderScreen(){const e=this.container.querySelector(".ussd-lcd-content");e&&(e.innerHTML=`
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
      `)}render(){var e,t,s,a,r;this.container.innerHTML=`
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
    `,this.renderScreen(),(e=this.container.querySelector("#ussd-close-btn"))==null||e.addEventListener("click",()=>this.close()),(t=this.container.querySelector("#ussd-call-btn"))==null||t.addEventListener("click",()=>this.dial()),(s=this.container.querySelector("#ussd-clear-btn"))==null||s.addEventListener("click",()=>this.clearInput()),(a=this.container.querySelector("#ussd-reset-btn"))==null||a.addEventListener("click",()=>this.resetSession()),(r=this.container.querySelector("#ussd-lang-toggle"))==null||r.addEventListener("click",()=>{this.currentLanguage=this.currentLanguage==="am"?"en":"am",this.render()}),this.container.querySelectorAll(".btn-digit").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-key");i&&this.appendDigit(i)})}),this.container.addEventListener("click",n=>{n.target===this.container&&this.close()})}}const Ma=new La;class Fa{constructor(){b(this,"container");b(this,"isOpen",!1);b(this,"indices",[]);b(this,"selectedCategory","All");b(this,"selectedIndex",null);b(this,"advisorCommodity","Teff (White Magna)");b(this,"advisorRegion","Oromia (Bishoftu)");b(this,"advisorGrade","Grade 1");b(this,"advisorQtyKg",500);b(this,"advisorColdChain",!1);b(this,"advisorResult",null);b(this,"isCalculating",!1);this.container=document.createElement("div"),this.container.id="market-intelligence-container",this.container.className="market-intel-backdrop hidden",document.body.appendChild(this.container)}async open(){this.isOpen=!0,this.container.classList.remove("hidden"),await this.loadIndices(),this.render()}close(){this.isOpen=!1,this.container.classList.add("hidden")}async loadIndices(){this.indices=await u.getMarketPriceIndices(this.selectedCategory),this.indices.length>0&&!this.selectedIndex&&(this.selectedIndex=this.indices[0])}async calculateFairPrice(){this.isCalculating=!0,this.renderAdvisorResult();try{this.advisorResult=await u.getFairPriceRecommendation({commodityName:this.advisorCommodity,category:"Vegetable",region:this.advisorRegion,grade:this.advisorGrade,qtyKg:this.advisorQtyKg,requiresColdChain:this.advisorColdChain})}catch(e){console.error(e)}finally{this.isCalculating=!1,this.render()}}renderAdvisorResult(){const e=this.container.querySelector("#advisor-result-area");if(!e)return;if(this.isCalculating){e.innerHTML='<div class="advisor-loading"><div class="spinner"></div> Calculating real-time AI valuation...</div>';return}if(!this.advisorResult)return;const t=this.advisorResult;e.innerHTML=`
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
              ${["All","Grain","Coffee","Vegetable","Fruit","Tubers"].map(s=>`
                <button class="cat-pill ${this.selectedCategory===s?"active":""}" data-category="${s}">${s}</button>
              `).join("")}
            </div>

            <div class="commodity-cards-list">
              ${this.indices.map(s=>{var a;return`
                <div class="commodity-card ${((a=this.selectedIndex)==null?void 0:a.commodityId)===s.commodityId?"selected":""}" data-id="${s.commodityId}">
                  <div class="comm-top">
                    <div>
                      <h4 class="comm-name">${s.name}</h4>
                      <span class="comm-am">${s.nameAm}</span>
                    </div>
                    <div class="comm-trend ${s.trendDirection.toLowerCase()}">
                      ${s.trendDirection==="Up"?"▲ +":s.trendDirection==="Down"?"▼ ":"● "}
                      ${s.weeklyChangePercent}%
                    </div>
                  </div>
                  <div class="comm-bottom">
                    <span class="comm-price">ETB ${s.nationalAvgPriceEtb.toFixed(2)} / ${s.unit}</span>
                    <span class="comm-benchmark">ECX: ETB ${s.eczBenchmarkEtb.toFixed(2)}</span>
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
                    ${this.selectedIndex.historical7Days.map(s=>{var a;return`
                      <div class="sparkline-bar-wrapper">
                        <div class="sparkline-bar" style="height: ${Math.min(100,Math.max(30,s.priceEtb/(((a=this.selectedIndex)==null?void 0:a.nationalAvgPriceEtb)||100)*80))}%;">
                          <span class="sparkline-val">${s.priceEtb}</span>
                        </div>
                        <span class="sparkline-lbl">${s.date}</span>
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
                        ${this.selectedIndex.regionalPrices.map(s=>`
                          <tr>
                            <td><strong>${s.regionName}</strong></td>
                            <td>${s.marketName}</td>
                            <td class="text-muted">${s.minPriceEtb}</td>
                            <td class="text-highlight">ETB ${s.avgPriceEtb.toFixed(2)}</td>
                            <td class="text-muted">${s.maxPriceEtb}</td>
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
    `,this.renderAdvisorResult(),(e=this.container.querySelector("#market-close-btn"))==null||e.addEventListener("click",()=>this.close()),this.container.querySelectorAll(".cat-pill").forEach(s=>{s.addEventListener("click",async()=>{this.selectedCategory=s.getAttribute("data-category")||"All",await this.loadIndices(),this.render()})}),this.container.querySelectorAll(".commodity-card").forEach(s=>{s.addEventListener("click",()=>{const a=s.getAttribute("data-id");this.selectedIndex=this.indices.find(r=>r.commodityId===a)||null,this.selectedIndex&&(this.advisorCommodity=this.selectedIndex.name),this.render()})}),(t=this.container.querySelector("#btn-run-advisor"))==null||t.addEventListener("click",()=>{var s,a,r,n,i;this.advisorCommodity=((s=this.container.querySelector("#adv-crop"))==null?void 0:s.value)||"Produce",this.advisorRegion=((a=this.container.querySelector("#adv-region"))==null?void 0:a.value)||"Oromia",this.advisorGrade=((r=this.container.querySelector("#adv-grade"))==null?void 0:r.value)||"Grade 1",this.advisorQtyKg=parseFloat((n=this.container.querySelector("#adv-qty"))==null?void 0:n.value)||500,this.advisorColdChain=((i=this.container.querySelector("#adv-cold"))==null?void 0:i.checked)||!1,this.calculateFairPrice()}),this.container.addEventListener("click",s=>{s.target===this.container&&this.close()})}}const Ua=new Fa;function ja(l,e,t){if(!t.isOpen||!e)return"";const s=Y[l],a=l==="am",r=[{en:"🌾 Fresh Harvest",am:"🌾 ትኩስ ምርት"},{en:"📦 Grade-1 Packaging",am:"📦 ምርጥ አሸጋገግ"},{en:"⏱️ Fast Farm Dispatch",am:"⏱️ ፈጣን አቅርቦት"},{en:"💰 Direct Farmer Price",am:"💰 ተመጣጣኝ ዋጋ"},{en:"🤝 Polite Communication",am:"🤝 ጥሩ ግንኙነት"},{en:"🌿 100% Organic & Clean",am:"🌿 ንፁህ ኦርጋኒክ"}],n={1:{en:"1 / 5 · Poor Quality",am:"1 / 5 · ደካማ ጥራት",color:"text-rose-600"},2:{en:"2 / 5 · Fair / Needs Improvement",am:"2 / 5 · መሻሻል አለበት",color:"text-amber-600"},3:{en:"3 / 5 · Good & Satisfactory",am:"3 / 5 · ጥሩ / አጥጋቢ",color:"text-amber-500"},4:{en:"4 / 5 · Very Good Quality",am:"4 / 5 · በጣም ጥሩ ምርት",color:"text-emerald-600"},5:{en:"5 / 5 · Outstanding Quality & Service!",am:"5 / 5 · እጅግ በጣም ምርጥ!",color:"text-emerald-700"}},i=n[t.rating]||n[5];return`
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
              <h3 class="text-xl font-black text-white ${a?"lang-am":""}">
                ${s.rateFarmerTitle}
              </h3>
            </div>
          </div>

          <p class="text-xs text-slate-300 mt-2 leading-relaxed ${a?"lang-am":""}">
            ${s.rateFarmerSubtitle}
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
                <h4 class="font-extrabold text-slate-900 text-sm ${a&&e.productNameAm?"lang-am":""}">
                  ${a&&e.productNameAm?e.productNameAm:e.productName}
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
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider ${a?"lang-am":""}">
              ${s.rateYourExperience}
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
            <div id="modalRatingDescText" class="font-extrabold text-sm ${i.color} transition-all">
              ${a?i.am:i.en}
            </div>
          </div>

          <!-- Quick Feedback Tags -->
          <div class="space-y-2">
            <label class="block text-xs font-extrabold text-slate-700 ${a?"lang-am":""}">
              <i class="fa-solid fa-tags text-emerald-600 mr-1"></i> ${s.quickTagsLabel}
            </label>
            <div class="flex flex-wrap gap-1.5">
              ${r.map(d=>{const c=a?d.am:d.en,o=t.selectedTags.includes(d.en);return`
                  <button
                    type="button"
                    onclick="window.toggleModalReviewTag('${d.en}')"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${o?"bg-emerald-700 text-white border-emerald-700 shadow-xs":"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}"
                  >
                    ${o?'<i class="fa-solid fa-check mr-1 text-[10px]"></i>':""}${c}
                  </button>
                `}).join("")}
            </div>
          </div>

          <!-- Review Comment Textarea -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-extrabold text-slate-700">
              <label for="reviewCommentInput" class="${a?"lang-am":""}">
                <i class="fa-solid fa-comment-dots text-emerald-600 mr-1"></i> ${s.reviewCommentLabel}
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
              placeholder="${s.reviewCommentPlaceholder}"
              class="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none transition-all resize-none placeholder:text-slate-400 ${a?"lang-am":""}"
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
              <span>${s.submitReviewBtn}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `}function h(l,e="fa-circle-check",t="border-emerald-500"){const s=document.getElementById("toast-container");if(!s)return;const a=document.createElement("div");a.className=`toast-msg border-l-4 ${t} shadow-2xl`,a.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${l}</span>
  `,s.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(100%)",a.style.transition="all 0.3s ease-out",setTimeout(()=>a.remove(),300)},3500)}class Ga{constructor(){b(this,"lang",localStorage.getItem("lang")||"en");b(this,"activeTab","marketplace");b(this,"activeCategory","All");b(this,"selectedRegion","All");b(this,"searchQuery","");b(this,"cart",this.loadCartFromStorage());b(this,"isCartOpen",!1);b(this,"isNotificationsModalOpen",!1);b(this,"isCreateListingModalOpen",!1);b(this,"activeOrderModal",null);b(this,"activeTelebirrModal",null);b(this,"activeDisputeModal",null);b(this,"activeRateModal",null);b(this,"activeProduceModalId",null);b(this,"activeProducePhotoIndex",0);b(this,"produceOrderQty",50);b(this,"activeLegalDocModal",null);b(this,"maxDistanceKm",0);b(this,"activeGrade","All");b(this,"activeRipeness","All");b(this,"organicOnly",!1);b(this,"advanceOnly",!1);b(this,"activeBuyerSubTab","marketplace");b(this,"activeBuyerAccountTab","overview");b(this,"activeFarmerAccountTab","overview");b(this,"activeFarmerTab","listings");b(this,"activeAdminTab","disputes");b(this,"activeSuperAdminTab","users");b(this,"superAdminUserRoleFilter","all");b(this,"superAdminAuditCategoryFilter","all");b(this,"isSuperAdminCreateUserModalOpen",!1);b(this,"isSuperAdminEditUserModalOpen",!1);b(this,"editTargetUserId",null);b(this,"isSuperAdminAddZoneModalOpen",!1);b(this,"isSuperAdminAddBlacklistModalOpen",!1);b(this,"isSuperAdminBannerModalOpen",!1);b(this,"editTargetBannerId",null);b(this,"isListingEditModalOpen",!1);b(this,"editTargetListingId",null);b(this,"selectedRbacRole","admin");b(this,"isRecordingVoice",!1);b(this,"voiceRecordTimer",null);b(this,"isAuthModalOpen",!1);b(this,"authMode","login");b(this,"otpStep",!1);b(this,"pendingPhone","");b(this,"lastSentCode","");b(this,"matchedUserName","");b(this,"matchedUserRole","");b(this,"matchedUserEmail","");b(this,"authErrorMessage","");b(this,"agentView",new va(this.lang));b(this,"verificationWizardModal",new xa(this.lang));this.init()}loadCartFromStorage(){try{const e=localStorage.getItem("farmer_market_cart");if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(s=>s&&s.listing&&s.qtyKg>0)}}catch(e){console.warn("Failed to load cart from localStorage",e)}return[]}saveCartToStorage(){try{localStorage.setItem("farmer_market_cart",JSON.stringify(this.cart))}catch(e){console.warn("Failed to save cart to localStorage",e)}}async init(){this.attachGlobalWindowHandlers(),me.startConnection(u.getToken()||void 0);const e=new URLSearchParams(window.location.search),t=e.get("tx_ref")||e.get("trx_ref"),s=e.get("status");t&&(s==="failed"||s==="canceled"?h("Chapa payment was cancelled or failed.","fa-circle-xmark","border-rose-500"):u.verifyChapaPayment(t).then(i=>{i?(h("Chapa payment verified! Escrow is now securely locked in database.","fa-circle-check","border-emerald-500"),z({particleCount:150,spread:80,origin:{y:.6}})):h("Chapa payment was not completed or failed verification.","fa-circle-xmark","border-rose-500")}),window.history.replaceState({},document.title,window.location.pathname)),me.onOrderStatusChanged(async(i,d,c)=>{console.log(`[SignalR] Order ${i} → ${d}: ${c}`),this.activeOrderModal&&this.activeOrderModal.id===i&&(this.activeOrderModal.status=d),h(`Order #${i.slice(0,8).toUpperCase()} → ${d.toUpperCase()}`,"fa-bolt","border-blue-500"),await u.refreshAllData(),this.render()}),me.onNewFarmerOrder((i,d,c)=>{h(`🌾 New order! ${c}kg of ${d} — check your dashboard`,"fa-basket-shopping","border-amber-500"),u.refreshAllData().then(()=>this.render())}),me.onDeliveryConfirmed((i,d,c)=>{const o=u.getCurrentUser();(o==null?void 0:o.role)==="farmer"?h(`💰 ${d.toLocaleString()} ETB released to your wallet!`,"fa-hand-holding-dollar","border-emerald-500"):(o==null?void 0:o.role)==="driver"&&h(`💰 ${c.toLocaleString()} ETB delivery fee credited!`,"fa-hand-holding-dollar","border-emerald-500"),u.refreshAllData().then(()=>this.render())}),me.setPollingCallback(async i=>{await u.refreshAllData(),this.render()});const a=u.getCurrentUser();a&&a.role,me.onOrderTracking(i=>{const d=document.getElementById(`eta-${i.orderId}`);d&&i.estimatedArrivalMin!=null&&i.estimatedArrivalMin>0&&(d.textContent=`~${i.estimatedArrivalMin} min`)});const r=()=>{const i=document.getElementById("signalr-status-badge");if(!i)return;const d=me.getConnectionState(),c={connected:{dot:"bg-emerald-500",label:"Live",cls:"bg-emerald-50 text-emerald-800 border-emerald-300"},reconnecting:{dot:"bg-amber-400",label:"Reconnecting",cls:"bg-amber-50 text-amber-800 border-amber-300"},polling:{dot:"bg-sky-400",label:"Polling",cls:"bg-sky-50 text-sky-800 border-sky-300"},disconnected:{dot:"bg-slate-400",label:"Offline",cls:"bg-slate-50 text-slate-500 border-slate-200"}},o=c[d]||c.disconnected;i.className=`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${o.cls}`,i.innerHTML=`<span class="w-1.5 h-1.5 rounded-full ${o.dot} inline-block"></span> ${o.label}`};setInterval(r,3e3),r(),u.subscribe(()=>{this.render()}),await u.refreshAllData();const n=u.getCurrentUser();n&&(n.role==="superadmin"?this.activeTab="superadmin":n.role==="farmer"?this.activeTab="farmer":n.role==="driver"?this.activeTab="driver":n.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){var d,c;const e=document.getElementById("app");if(!e)return;const t=u.getCurrentUser(),s=u.isAuthenticated(),a=u.getNotifications(),r=a.filter(o=>!o.read).length;we.setLanguage(this.lang);const n=u.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let i="";if(this.activeTab==="farmer-account"&&s&&((t==null?void 0:t.role)==="farmer"||(t==null?void 0:t.role)==="superadmin"))i=Oa(this.lang,t,u.getListings().filter(o=>o.farmerId===t.id),u.getOrders("farmer"),this.activeFarmerAccountTab,this.isCreateListingModalOpen,u.getPriceBenchmarks());else if(this.activeTab==="farmer"&&s&&((t==null?void 0:t.role)==="farmer"||(t==null?void 0:t.role)==="superadmin")){const o=u.getListings().filter(x=>x.farmerId===t.id),m=u.getOrders("farmer"),f=u.getFarmerSummary();i=Jt(this.lang,o.length?o:u.getListings().slice(0,3),m,f,this.isCreateListingModalOpen,this.activeFarmerTab,u.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&s&&((t==null?void 0:t.role)==="driver"||(t==null?void 0:t.role)==="superadmin")){const o=u.getOrders("driver"),m=u.getDriverSummary();i=ta(this.lang,o,m,u.getOptimizedRoute(),t,u.getIsOfflineMode(),u.getOfflineQueue().length)}else if(this.activeTab==="superadmin"||s&&(t==null?void 0:t.role)==="superadmin"&&this.activeTab==="superadmin")i=aa(this.lang,this.activeSuperAdminTab,this.superAdminUserRoleFilter,this.superAdminAuditCategoryFilter,this.selectedRbacRole);else if(this.activeTab==="admin"&&s&&((t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="superadmin")){const o=u.getPlatformStats(),m=u.getOrders().filter(f=>{var x;return f.status==="disputed"&&!((x=f.disputeStatus)!=null&&x.startsWith("Resolved"))});i=ha(this.lang,o,m,u.getAnomalyAlerts(),u.getKycQueue(),u.getRegionalAnalytics(),this.activeAdminTab)}else if(this.activeTab==="agent"||s&&((t==null?void 0:t.role)==="agent"||(t==null?void 0:t.role)==="superadmin")&&this.activeTab==="agent")this.agentView.setLanguage(this.lang),i=this.agentView.render();else if(this.activeTab==="account"&&s&&((t==null?void 0:t.role)==="buyer"||(t==null?void 0:t.role)==="superadmin"))i=Da(this.lang,t,u.getOrders("buyer"),this.activeBuyerAccountTab,u.getAccountData());else{const o=u.getOrders("buyer");i=Yt(this.lang,n,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,u.getStandingOrders(),o)}e.innerHTML=`
      ${u.isImpersonating()?`
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

      ${zt(this.lang,t,s,this.activeTab,this.cart,r,this.searchQuery)}
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        ${i}
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
      ${this.isAuthModalOpen?wa(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage,this.matchedUserEmail):""}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen&&u.isAuthenticated()?ya(this.lang,a):""}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

      <!-- Produce Post & Farm Details Modal -->
      ${(()=>{if(!this.activeProduceModalId)return"";const o=u.getListingById(this.activeProduceModalId);return o?(Te.setLanguage(this.lang),Te.setActivePhotoIndex(this.activeProducePhotoIndex),Te.setSelectedQtyKg(this.produceOrderQty),Te.render(o)):""})()}

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
              ${this.activeLegalDocModal.type==="invoice"?we.renderInvoice(u.getTaxInvoice(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="waybill"?we.renderWaybill(u.getTransportWaybill(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="contract"?we.renderContract(u.getLegalContract(this.activeLegalDocModal.orderId)):we.renderArbitration(u.getDisputeMediationRecord(this.activeLegalDocModal.orderId))}
            </div>
          </div>
        </div>
      `:""}

      <!-- Rate & Review Modal -->
      ${(c=this.activeRateModal)!=null&&c.isOpen?ja(this.lang,u.getOrders().find(o=>{var m;return o.id===((m=this.activeRateModal)==null?void 0:m.orderId)}),this.activeRateModal):""}

      <!-- Super Admin Governance Modals -->
      ${ka(this.lang,this.isSuperAdminCreateUserModalOpen,this.isSuperAdminEditUserModalOpen,this.editTargetUserId,this.isSuperAdminAddZoneModalOpen,this.isSuperAdminAddBlacklistModalOpen,this.isSuperAdminBannerModalOpen,this.editTargetBannerId,this.isListingEditModalOpen,this.editTargetListingId)}
    `}attachGlobalWindowHandlers(){const e=window;window.addEventListener("storage",a=>{a.key==="farmerMarketRolePermissions"&&(u.reloadRolePermissionsFromStorage(),this.render())}),e.openProduceDetail=a=>{this.activeProduceModalId=a,this.activeProducePhotoIndex=0;const r=u.getListingById(a);this.produceOrderQty=(r==null?void 0:r.minOrderKg)||50,this.render()},e.closeProduceDetail=()=>{this.activeProduceModalId=null,this.render()},e.selectProducePhoto=a=>{this.activeProducePhotoIndex=a,this.render()},e.setProduceOrderQty=a=>{this.produceOrderQty=Math.max(1,a),this.render()},e.addProduceDetailToCart=(a,r)=>{const n=u.getListingById(a);if(!n)return;const i=r||this.produceOrderQty||n.minOrderKg||50,d=this.cart.find(c=>c.listing.id===a);d?d.qtyKg+=i:this.cart.push({listing:n,qtyKg:i}),this.saveCartToStorage(),this.activeProduceModalId=null,this.isCartOpen=!0,h(this.lang==="am"?`${i} ኪ.ግ ${n.nameAm||n.productName} ወደ ጋሪ ተጨምሯል`:`Added ${i} kg of ${n.productName} to bulk cart!`,"fa-cart-plus"),this.render()},e.buyProduceNow=(a,r)=>{const n=u.getListingById(a);if(!n)return;if(!u.isAuthenticated()){e.openAuthModal("login");return}this.activeProduceModalId=null;const i=r||this.produceOrderQty||n.minOrderKg||50,d=i*n.pricePerKg;this.activeTelebirrModal={isOpen:!0,totalEtb:d,listingId:a,qtyKg:i},this.render()},e.shareProduceListing=a=>{const r=u.getListingById(a);navigator.clipboard&&navigator.clipboard.writeText(window.location.href),h(`Copied direct produce link for ${(r==null?void 0:r.productName)||"listing"}!`,"fa-share-nodes","border-blue-500")},e.playSimulatedVoiceNote=a=>{const r=document.getElementById("voicePlayIcon-"+a),n=document.getElementById("voicePlayText-"+a);r&&n&&(r.className="fa-solid fa-spinner fa-spin text-[10px]",n.innerText="Playing Memo...",setTimeout(()=>{r.className="fa-solid fa-check text-[10px]",n.innerText="Memo Played",setTimeout(()=>{r.className="fa-solid fa-play text-[10px]",n.innerText="Play Voice Memo"},2500)},1800)),h("Playing farmer voice note recorded in Bishoftu farm hub.","fa-volume-high","border-emerald-500")},e.sendSmsInquiry=(a,r)=>{h(`Dispatched SMS inquiry for ${r} to ${a}`,"fa-paper-plane","border-emerald-500")},e.navigateTab=a=>{this.activeTab=a,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setBuyerAccountTab=a=>{this.activeBuyerAccountTab=a,this.activeTab="account",u.fetchAccountData().then(()=>this.render()).catch(r=>h(r.message||"Could not load account data.","fa-circle-xmark","border-rose-500")),this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setFarmerAccountTab=a=>{this.activeFarmerAccountTab=a,this.activeTab="farmer-account",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.deleteFarmerListing=async a=>{if(window.confirm("Delete this produce post? It will no longer be available for new orders."))try{await u.deleteListing(a),h("Produce post deleted.","fa-trash"),this.render()}catch(r){h(r.message||"Could not delete the produce post.","fa-circle-xmark","border-rose-500")}},e.changeFarmerPassword=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await u.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),a.reset()}catch(n){h(n.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}},e.saveFarmerProfile=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await u.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:a.dataset.defaultLat?Number(a.dataset.defaultLat):void 0,defaultDeliveryLng:a.dataset.defaultLng?Number(a.dataset.defaultLng):void 0}),h("Farmer profile saved to your account.","fa-circle-check"),this.render()}catch(n){h(n.message||"Could not save farmer profile.","fa-circle-xmark","border-rose-500")}},e.captureFarmerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(a=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(a.coords.latitude),r.dataset.defaultLng=String(a.coords.longitude)),h("Farm location captured. Save profile to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.showAccountToast=(a,r="fa-circle-check")=>{h(a,r,"border-emerald-500")},e.saveBuyerProfile=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await u.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:a.dataset.defaultLat?Number(a.dataset.defaultLat):void 0,defaultDeliveryLng:a.dataset.defaultLng?Number(a.dataset.defaultLng):void 0}),h("Profile changes saved to your account.","fa-circle-check"),this.render()}catch(n){h(n.message||"Could not save your profile.","fa-circle-xmark","border-rose-500")}},e.captureBuyerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(a=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(a.coords.latitude)),r&&(r.dataset.defaultLng=String(a.coords.longitude)),h("Location captured. Save changes to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.changeBuyerPassword=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await u.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),a.reset()}catch(n){h(n.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}};const t=async(a,r)=>{try{await a(),h(r,"fa-circle-check"),this.render()}catch(n){h(n.message||"Account action failed.","fa-circle-xmark","border-rose-500")}};e.addBuyerAddress=()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);t(()=>u.saveAddress({name:String(r.get("name")||""),phone:String(r.get("phone")||""),street:String(r.get("street")||""),city:String(r.get("city")||""),region:String(r.get("region")||""),postalCode:String(r.get("postalCode")||"")||null,country:String(r.get("country")||"Ethiopia"),isDefaultShipping:r.has("isDefaultShipping"),isDefaultBilling:!1}),"Address added.")},e.deleteBuyerAddress=a=>t(()=>u.deleteAddress(a),"Address deleted."),e.addBuyerPayment=()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);t(()=>u.addPaymentMethod({provider:String(r.get("provider")||""),providerToken:String(r.get("providerToken")||""),maskedDisplay:String(r.get("maskedDisplay")||""),brand:String(r.get("brand")||"")||null,expiryMonth:Number(r.get("expiryMonth"))||null,expiryYear:Number(r.get("expiryYear"))||null,isPrimary:r.has("isPrimary")}),"Payment method linked.")},e.setPrimaryBuyerPayment=a=>t(()=>u.setPrimaryPaymentMethod(a),"Primary payment method updated."),e.deleteBuyerPayment=a=>t(()=>u.deletePaymentMethod(a),"Payment method removed."),e.submitBuyerDispute=a=>{const r=window.prompt("Reason: Item not received, Damaged, Wrong item, or Quality issue");r&&t(()=>u.disputeOrder(a,r,void 0,100),"Dispute submitted for review.")},e.revokeBuyerSessions=async()=>{try{await u.revokeOtherSessions(),h("Other sessions have been revoked.","fa-shield-check"),this.render()}catch(a){h(a.message||"Could not revoke sessions.","fa-circle-xmark","border-rose-500")}},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),h(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=a=>{this.activeBuyerSubTab=a,this.render()},e.toggleFarmerTab=a=>{this.activeFarmerTab=a,this.render()},e.setAdminTab=a=>{this.activeAdminTab=a,this.render()},e.openInvoiceModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"invoice",orderId:a},this.render()},e.openContractModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"contract",orderId:a},this.render()},e.openWaybillModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"waybill",orderId:a},this.render()},e.openArbitrationModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"arbitration",orderId:a},this.render()},e.closeLegalDocModal=()=>{this.activeLegalDocModal=null,this.render()},e.printOfficialDocument=()=>{window.print()},e.setMaxDistanceKm=a=>{this.maxDistanceKm=a,h(a===0?"Showing all produce across Ethiopia":`Filtering farms within ${a} km radius`,"fa-location-dot"),this.render()},e.setFilterGrade=a=>{this.activeGrade=a,this.render()},e.setFilterRipeness=a=>{this.activeRipeness=a,this.render()},e.toggleOrganicFilter=a=>{this.organicOnly=a,this.render()},e.toggleAdvanceFilter=a=>{this.advanceOnly=a,this.render()},e.setCategory=a=>{this.activeCategory=a,this.render()},e.resetFilters=()=>{this.activeCategory="All",this.selectedRegion="All",this.searchQuery="",this.maxDistanceKm=0,this.activeGrade="All",this.activeRipeness="All",this.organicOnly=!1,this.advanceOnly=!1,this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async a=>{var P,V,Z,ee,X,N,ae,se,k,W,F,le,ge,ke,Ee;a.preventDefault();const r=(P=document.getElementById("newProdName"))==null?void 0:P.value,n=(V=document.getElementById("newProdNameAm"))==null?void 0:V.value,i=((Z=document.getElementById("newCategory"))==null?void 0:Z.value)||"Vegetables",d=Number(((ee=document.getElementById("newQtyKg"))==null?void 0:ee.value)||1e3),c=Number(((X=document.getElementById("newPricePerKg"))==null?void 0:X.value)||45),o=Number(((N=document.getElementById("newMinOrderKg"))==null?void 0:N.value)||50),m=((ae=document.getElementById("newGrade"))==null?void 0:ae.value)||"Grade 1",f=((se=document.getElementById("newRipeness"))==null?void 0:se.value)||"Ready Today",x=((k=document.getElementById("newIsAdvanceHarvest"))==null?void 0:k.checked)||!1,w=((W=document.getElementById("newExpectedHarvestDate"))==null?void 0:W.value)||void 0,A=((le=(F=document.getElementById("voiceTranscriptText"))==null?void 0:F.innerText)==null?void 0:le.replace(/^"|"$/g,""))||void 0,E=((ge=document.getElementById("newRequiresColdChain"))==null?void 0:ge.checked)||!1,C=((ke=document.getElementById("newIsAggregatedLot"))==null?void 0:ke.checked)||!1,y=((Ee=document.getElementById("newCooperativeName"))==null?void 0:Ee.value)||void 0,S=u.getCurrentUser(),M=await u.createListing({productName:r,nameAm:n||void 0,category:i,qtyKg:d,pricePerKg:c,minOrderKg:o,grade:m,ripeness:f,isAdvanceHarvest:x,expectedHarvestDate:w,voiceNoteTranscript:A,requiresColdChain:E,isAggregatedLot:C,cooperativeName:C?y||"Bishoftu Farmers Cooperative Union":void 0,farmerId:S==null?void 0:S.id,farmerName:S==null?void 0:S.name,farmerNameAm:S==null?void 0:S.nameAm,farmerPhone:S==null?void 0:S.phone,region:S==null?void 0:S.region});this.isCreateListingModalOpen=!1,z({particleCount:90,spread:60,origin:{y:.6}}),h(this.lang==="am"?"አዲስ ምርት በተሳካ ሁኔታ ተመዝግቧል!":`Published ${M.productName} successfully!`,"fa-circle-check"),this.render()},e.checkFairPriceForNewListing=async()=>{var o,m,f,x,w;const a=((o=document.getElementById("newProdName"))==null?void 0:o.value)||"Tomatoes",r=((m=document.getElementById("newCategory"))==null?void 0:m.value)||"Vegetables",n=((f=document.getElementById("newGrade"))==null?void 0:f.value)||"Grade 1",i=Number(((x=document.getElementById("newQtyKg"))==null?void 0:x.value)||500),d=((w=document.getElementById("newRequiresColdChain"))==null?void 0:w.checked)||!1,c=u.getCurrentUser();try{const A=await u.getFairPriceRecommendation({commodityName:a,category:r,region:(c==null?void 0:c.region)||"Oromia",grade:n,qtyKg:i,requiresColdChain:d}),E=document.getElementById("newPricePerKg");E&&(E.value=A.recommendedFairPriceEtb.toString()),h(`AI Fair Price Applied: ETB ${A.recommendedFairPriceEtb}/kg (ECX Benchmarked)`,"fa-wand-magic-sparkles","border-amber-500")}catch{h("Using local standard benchmark rate","fa-info-circle","border-blue-500")}},e.handleVoiceRecordToggle=()=>{const a=document.getElementById("voiceRecordBtn"),r=document.getElementById("voiceRecordLabel"),n=document.getElementById("voiceWaveAnimation"),i=document.getElementById("voiceTranscriptionResult");document.getElementById("voiceTranscriptText"),this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription("am")):(this.isRecordingVoice=!0,r&&(r.innerText="Stop & Transcribe (አቁም)"),a&&(a.classList.remove("bg-emerald-600"),a.classList.add("bg-red-600")),n&&n.classList.remove("hidden"),i&&i.classList.add("hidden"),h("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription("am")},3500))},e.finishVoiceTranscription=a=>{this.isRecordingVoice=!1;const r=document.getElementById("voiceRecordLabel"),n=document.getElementById("voiceWaveAnimation"),i=document.getElementById("voiceTranscriptionResult"),d=document.getElementById("voiceTranscriptText");r&&(r.innerText="Record Voice Note (ድምጽ ቅጂ)"),n&&n.classList.add("hidden");const c=u.simulateVoiceTranscription(4,a),o=document.getElementById("newProdName"),m=document.getElementById("newProdNameAm"),f=document.getElementById("newCategory"),x=document.getElementById("newQtyKg"),w=document.getElementById("newPricePerKg");o&&(o.value=c.productName),m&&(m.value=c.nameAm),f&&(f.value=c.category),x&&(x.value=c.qtyKg.toString()),w&&(w.value=c.pricePerKg.toString()),i&&d&&(d.innerText=`"${c.transcript}"`,i.classList.remove("hidden")),z({particleCount:60,spread:50,origin:{y:.6}}),h("Voice Note Transcribed! Form auto-filled in Amharic.","fa-wand-magic-sparkles")},e.handleSimulateSms=async a=>{a.preventDefault();const r=document.getElementById("smsPhone").value,n=document.getElementById("smsCommand").value,i=document.getElementById("smsResponseBox"),d=document.getElementById("smsResponseText");i&&d&&(d.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',i.classList.remove("hidden"));const c=await u.sendInboundSms(r,n);d&&(d.innerHTML=`&gt; ${c}`),h("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const a=u.getCurrentUser(),r=(a==null?void 0:a.walletBalanceEtb)||48200;if(r<=0){h("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}u.requestWalletWithdrawal(r,(a==null?void 0:a.phone)||"+251911223344"),z({particleCount:100,spread:70,origin:{y:.6}}),h(`Instant Payout of ${r.toLocaleString()} ETB deposited to Telebirr (${(a==null?void 0:a.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=a=>{if(!u.isAuthenticated()){e.openAuthModal("login");return}u.addStandingOrder(a,150,"Weekly"),z({particleCount:70,spread:60,origin:{y:.6}}),h("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=a=>{u.toggleStandingOrder(a),h("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=a=>{const r=u.getOrders().find(n=>n.id===a);r&&(this.activeDisputeModal={isOpen:!0,order:r},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(a,r)=>{a.preventDefault();const n=document.getElementById("disputeReasonInput").value,i=document.getElementById("disputePhotoUrl").value,d=document.getElementById("disputeRefundSlider").value;await u.disputeOrder(r,n,i,parseInt(d,10)),this.activeDisputeModal=null,this.activeOrderModal=null,h("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const a=u.toggleOfflineMode();h(a?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const a=await u.syncOfflineQueue();h(`Synced ${a} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async a=>{const r=u.getOptimizedRoute();r.stops[a]&&(r.stops[a].completed=!0,z({particleCount:50,spread:50,origin:{y:.6}}),h(`Stop #${a+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async a=>{await u.pickupOrderByDriver(a,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),h("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async a=>{await u.confirmDeliveryByBuyer(a,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),z({particleCount:120,spread:70,origin:{y:.6}}),h("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(a,r)=>{await u.verifyKyc(a,r),h(r?"Identity & Documents Approved!":"KYC verification rejected",r?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=a=>{h(`Anomaly Alert #${a} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=a=>{h(`Audit trail opened for Anomaly #${a}`,"fa-magnifying-glass")},e.openAuthModal=(a="login")=>{this.authMode=a,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.matchedUserEmail="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=a=>{this.authMode=a,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=a=>{this.pendingPhone=a.replace("+251","").trim(),this.authErrorMessage="",this.render();const r=document.getElementById("authPhoneInput");r&&(r.value=this.pendingPhone,r.focus())},e.switchToRegisterWithPhone=a=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=a.replace("+251","").trim(),this.render()},e.handleRequestOtp=async a=>{a.preventDefault();const r=document.getElementById("authPhoneInput").value.trim();if(!r||r.length<8){h("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const n=document.getElementById("requestOtpBtn");n&&(n.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',n.disabled=!0),this.pendingPhone=r,this.authErrorMessage="";try{const i=await u.requestOtp(r);this.lastSentCode=i.demoCode||"",this.matchedUserName=i.userName||"",this.matchedUserRole=i.role||"",this.matchedUserEmail=i.email||"",this.otpStep=!0,i.email?h(`Security code dispatched to +251 ${r} and ${i.email}`,"fa-shield-halved","border-emerald-500"):h(`SMS verification code dispatched to +251 ${r}`,"fa-comment-sms","border-emerald-500")}catch(i){this.authErrorMessage=i.message||"No account registered with this phone number. Please register first."}this.render()},e.handleVerifyOtp=async a=>{var i;a.preventDefault();const r=(i=document.getElementById("authOtpInput")||document.getElementById("otpCodeInput"))==null?void 0:i.value.trim();if(!r||r.length!==6){h("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const n=document.getElementById("verifyOtpBtn");n&&(n.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',n.disabled=!0);try{const d=await u.verifyOtp(this.pendingPhone,r);this.isAuthModalOpen=!1,this.otpStep=!1,this.authErrorMessage="",d.role==="superadmin"?this.activeTab="superadmin":d.role==="farmer"?this.activeTab="farmer":d.role==="driver"?this.activeTab="driver":d.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.cart=this.loadCartFromStorage(),z({particleCount:100,spread:70,origin:{y:.6}}),h(`Welcome back, ${d.name}! (${d.role.toUpperCase()})`,"fa-circle-check","border-emerald-500")}catch(d){this.authErrorMessage=d.message||"Invalid OTP code. Please try again."}this.render()};const s=async a=>{var f,x,w,A,E,C;a.preventDefault();const r=((f=document.getElementById("regName"))==null?void 0:f.value.trim())||"",n=((x=document.getElementById("regNameAm"))==null?void 0:x.value.trim())||r,i=((w=document.getElementById("regPhone"))==null?void 0:w.value.trim())||"",d=((A=document.getElementById("regRegion"))==null?void 0:A.value)||"Oromia (Bishoftu)",c=((E=document.querySelector('input[name="regRole"]:checked'))==null?void 0:E.value)||"buyer",o=((C=document.getElementById("regEmail"))==null?void 0:C.value.trim())||void 0,m=document.getElementById("registerSubmitBtn");m&&(m.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...',m.disabled=!0);try{const y=await u.registerUser(r,n,i,c,d,o);this.isAuthModalOpen=!1,this.authErrorMessage="",y.role==="farmer"?this.activeTab="farmer":y.role==="driver"?this.activeTab="driver":y.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.cart=this.loadCartFromStorage(),z({particleCount:150,spread:90,origin:{y:.6}}),h(`Welcome to Farmer-to-Market, ${y.name}!`,"fa-circle-check","border-emerald-500")}catch(y){this.authErrorMessage=y.message||"Registration failed. Please try a different phone number."}this.render()};e.handleRegisterUser=s,e.handleRegisterSubmit=s,e.handleLogout=()=>{u.logout(),this.activeTab="marketplace",h("Logged out successfully","fa-arrow-right-from-bracket"),this.render()},e.switchDemoUser=async a=>{try{const r=await u.requestOtp(a);if(r.demoCode){const n=await u.verifyOtp(a,r.demoCode);n.role==="farmer"?this.activeTab="farmer":n.role==="driver"?this.activeTab="driver":n.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.cart=this.loadCartFromStorage(),z({particleCount:80,spread:60,origin:{y:.6}}),h(`Switched to profile: ${n.name} (${n.role.toUpperCase()})`,"fa-user-shield")}}catch(r){h("Demo switch failed: "+r.message,"fa-circle-xmark","border-red-500")}this.render()},e.addToCart=a=>{const r=u.getListingById(a);if(!r)return;const n=this.cart.find(i=>i.listing.id===a);n?n.qtyKg+=r.minOrderKg:this.cart.push({listing:r,qtyKg:r.minOrderKg}),this.saveCartToStorage(),h(`Added ${r.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(a,r)=>{const n=this.cart.find(i=>i.listing.id===a);n&&(r<=0?this.cart=this.cart.filter(i=>i.listing.id!==a):n.qtyKg=r,this.saveCartToStorage()),this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.openTelebirrModal=a=>{if(!u.isAuthenticated()){e.openAuthModal("login");return}this.activeTelebirrModal={isOpen:!0,totalEtb:a},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.handleTelebirrSubmit=async a=>{var r;a.preventDefault();try{const n=document.getElementById("checkoutAddress"),i=document.querySelector('input[name="checkoutPayment"]:checked'),d=n==null?void 0:n.value,c=u.getAccountData().addresses.find(w=>w.id===d);if(!c||!i){h("Choose a shipping address and payment method first.","fa-circle-exclamation","border-amber-500");return}const o=`${c.street}, ${c.city}, ${c.region}, ${c.country}`,m=this.cart.length?this.cart:(r=this.activeTelebirrModal)!=null&&r.listingId?[{listing:u.getListingById(this.activeTelebirrModal.listingId),qtyKg:this.activeTelebirrModal.qtyKg||0}]:[];if(!m.length||!m[0].listing)throw new Error("The selected produce is no longer available.");let f=null,x;for(const w of m){const A=w.listing;if(!A)throw new Error("The selected produce is no longer available.");const E=await u.placeOrder(A.id,w.qtyKg,o,!1,"Weekly",i.value==="telebirr-wallet"?void 0:i.value);f=E.order,E.paymentUrl&&(x=E.paymentUrl)}if(this.cart=[],this.saveCartToStorage(),this.isCartOpen=!1,this.activeTelebirrModal=null,x&&(x.includes("chapa.co")||x.startsWith("https://"))){h("Redirecting to Chapa Gateway for payment...","fa-arrow-up-right-from-square","border-emerald-500"),window.location.href=x;return}z({particleCount:150,spread:80,origin:{y:.6}}),h("Payment authorized via Telebirr. Farmer notified.","fa-lock","border-blue-500"),f&&(this.activeOrderModal=f)}catch(n){h("Order placement failed: "+n.message,"fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=a=>{const n=u.getOrders().find(i=>i.id===a);n&&(this.activeOrderModal=n,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.openNotificationsModal=()=>{if(!u.isAuthenticated()||!u.getCurrentUser()){e.openAuthModal("login");return}this.isNotificationsModalOpen=!0,this.render()},e.closeNotificationsModal=()=>{this.isNotificationsModalOpen=!1,this.render()},e.confirmFarmerOrder=async a=>{await u.confirmOrderByFarmer(a),me.joinOrder(a),h("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async a=>{await u.confirmDeliveryByBuyer(a),z({particleCount:150,spread:80,origin:{y:.6}}),h("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),u.getOrders().find(r=>r.id===a),this.activeRateModal={isOpen:!0,orderId:a,rating:5,comment:"",selectedTags:["🌾 Fresh Harvest","📦 Grade-1 Packaging"]},this.render()},e.openRateModal=a=>{const r=u.getOrders().find(n=>n.id===a);this.activeRateModal={isOpen:!0,orderId:a,rating:(r==null?void 0:r.reviewRating)||5,comment:(r==null?void 0:r.reviewComment)||"",selectedTags:r!=null&&r.reviewQuickTags&&r.reviewQuickTags.length>0?[...r.reviewQuickTags]:["🌾 Fresh Harvest","📦 Grade-1 Packaging"]},this.render()},e.closeRateModal=()=>{this.activeRateModal=null,this.render()},e.setModalRating=a=>{this.activeRateModal&&(this.activeRateModal.rating=a,this.render())},e.toggleModalReviewTag=a=>{this.activeRateModal&&(this.activeRateModal.selectedTags.includes(a)?this.activeRateModal.selectedTags=this.activeRateModal.selectedTags.filter(r=>r!==a):this.activeRateModal.selectedTags.push(a),this.render())},e.updateModalReviewComment=a=>{if(this.activeRateModal){this.activeRateModal.comment=a;const r=document.getElementById("reviewCommentCharCount");r&&(r.innerText=`${a.length} / 500`)}},e.handleReviewFormSubmit=async a=>{if(a.preventDefault(),!this.activeRateModal)return;const{orderId:r,rating:n,comment:i,selectedTags:d}=this.activeRateModal,c=u.getOrders().find(o=>o.id===r);if(!c){h("Order record not found.","fa-circle-xmark","border-rose-500");return}try{await u.createReview(r,c.farmerId,n,i,d),z({particleCount:150,spread:80,origin:{y:.6}}),h(this.lang==="am"?"እናመሰግናለን! የእርስዎ ደረጃ እና አስተያየት በተሳካ ሁኔታ ተመዝግቧል።":"Thank you! Your verified rating and review have been recorded.","fa-star","border-amber-500"),this.activeRateModal=null,this.activeOrderModal&&this.activeOrderModal.id===r&&(this.activeOrderModal.isRated=!0,this.activeOrderModal.reviewRating=n,this.activeOrderModal.reviewComment=i,this.activeOrderModal.reviewQuickTags=d),this.render()}catch(o){h(o.message||"Could not submit review.","fa-circle-xmark","border-rose-500")}},e.adminResolveDispute=async(a,r)=>{try{await u.resolveDispute(a,r),r==="RefundBuyer"||r==="PartialSplit"?(z({particleCount:120,spread:70,origin:{y:.6}}),h(this.lang==="am"?"ቅሬታው ተፈቷል፡ ለገዢው በቴሌብር ተመላሽ ተደርጓል። ማሳወቂያ ለገዢው ተልኳል።":"Dispute resolved: Buyer refunded via Telebirr. Immediate notification sent to buyer.","fa-money-bill-transfer","border-emerald-500")):h("Dispute resolved: Escrow released to farmer.","fa-gavel","border-purple-500"),this.render()}catch(n){h(n.message||"Could not resolve the dispute.","fa-circle-xmark","border-rose-500")}},e.markAllNotificationsRead=()=>{u.markAllNotificationsRead(),this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async a=>{var A;a.preventDefault();const r=document.getElementById("newProdName").value,n=document.getElementById("newProdNameAm").value,i=document.getElementById("newCategory").value,d=parseFloat(document.getElementById("newQtyKg").value),c=parseFloat(document.getElementById("newPricePerKg").value),o=parseFloat(document.getElementById("newMinOrderKg").value),m=document.getElementById("newGrade").value,f=document.getElementById("newRipeness").value,x=document.getElementById("newIsAdvanceHarvest").checked,w=(A=document.getElementById("newExpectedHarvestDate"))==null?void 0:A.value;try{await u.createListing({productName:r,nameAm:n,category:i,qtyKg:d,pricePerKg:c,minOrderKg:o,grade:m,ripeness:f,isOrganic:!0,isAdvanceHarvest:x,expectedHarvestDate:x?w:void 0,availableFrom:x&&w?w:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,h(`Published ${r} to marketplace!`,"fa-cloud-arrow-up")}catch(E){h(E.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleAdminBroadcastSms=async a=>{a.preventDefault();const r=document.getElementById("smsTargetRole").value,n=document.getElementById("smsMsgEn").value,i=document.getElementById("smsMsgAm").value;await u.broadcastSms(n,i,r),h(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to smallholders via Twilio!","fa-paper-plane"),this.render()},e.openVerificationWizard=(a=1)=>{this.verificationWizardModal.setLanguage(this.lang),this.verificationWizardModal.open(a)},e.closeVerificationWizard=()=>{this.verificationWizardModal.close()},e.setWizardStep=a=>{this.verificationWizardModal.setStep(a)},e.updateWizardField=(a,r)=>{this.verificationWizardModal.updateField(a,r)},e.submitVerificationForm=async()=>{await this.verificationWizardModal.submit(),z({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"ሰነዶችዎ ደርሰውናል! በ24 ሰዓት ውስጥ ይገመገማሉ።":"Documents submitted! Verification under 24-hour review.","fa-shield-check","border-emerald-500"),this.render()},e.switchAgentTab=a=>{this.agentView.switchTab(a),this.render()},e.setUssdInput=a=>{this.agentView.setUssdInput(a)},e.sendUssdCommand=async()=>{await this.agentView.executeUssd()},e.sendInboundSms=async()=>{const a=document.getElementById("inboundSmsBody"),r=(a==null?void 0:a.value)||"FAYDA FAN-8812-4091-2810";h(this.lang==="am"?`የኤስኤምኤስ ትዕዛዝ ተቀብለናል፡ "${r}"`:`Inbound SMS processed: "${r}"`,"fa-comment-sms","border-blue-500"),await u.refreshAllData(),this.render()},e.handleAgentRegisterSubmit=async a=>{var x,w,A,E,C;a.preventDefault();const r=document.getElementById("agFarmerName").value,n=(x=document.getElementById("agFarmerNameAm"))==null?void 0:x.value,i=document.getElementById("agFarmerPhone").value,d=document.getElementById("agFarmerRegion").value,c=(w=document.getElementById("agFarmerKebele"))==null?void 0:w.value,o=(A=document.getElementById("agFarmerCrop"))==null?void 0:A.value,m=(E=document.getElementById("agFarmerFayda"))==null?void 0:E.value,f=(C=document.getElementById("agFarmerTin"))==null?void 0:C.value;try{await u.agentRegisterFarmer({name:r,nameAm:n,phone:i,region:d,kebele:c,primaryCrop:o,faydaId:m,tinNumber:f}),z({particleCount:120,spread:80,origin:{y:.6}}),h(this.lang==="am"?`${r} ተመዝግቧል! የማረጋገጫ ኤስኤምኤስ ተልኳል።`:`Farmer ${r} registered! Welcome SMS dispatched.`,"fa-user-check","border-emerald-500"),this.agentView.switchTab("roster"),this.render()}catch(y){h("Registration failed: "+y.message,"fa-circle-xmark","border-red-500")}},e.sendAgentFarmerSms=a=>{h(this.lang==="am"?`ኤስኤምኤስ ወደ ${a} ተልኳል!`:`SMS dispatch sent to ${a}!`,"fa-paper-plane","border-blue-500")},e.adminReviewVerification=async(a,r)=>{let n,i;if(r==="Reject"){if(i=prompt(this.lang==="am"?"እባክዎ ውድቅ የተደረገበትን ምክንያት ያስገቡ (ለምሳሌ፡ የፋይዳ ፎቶው ግልጽ አይደለም / የታክስ ቁጥር አልተገኘም):":"Enter rejection reason to notify the user via SMS (e.g. Blurry ID photo / TIN mismatch):","Blurry Fayda ID photo. Please re-upload clear image.")||void 0,!i)return}else n="Identity & TIN verified against Ministry of Revenues registry.";await u.reviewVerification(a,r,n,i),r==="Approve"?(z({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"የተጠቃሚው ማረጋገጫ ጸድቋል! የኤስኤምኤስ መልእክት ተልኳል።":"User account APPROVED! SMS confirmation dispatched.","fa-circle-check","border-emerald-500")):h(this.lang==="am"?"ማረጋገጫው ውድቅ ተደርጓል፤ ምክንያቱ በኤስኤምኤስ ተልኳል።":"Verification rejected & reason SMS sent to user.","fa-triangle-exclamation","border-amber-500"),this.render()},e.setSuperAdminTab=a=>{this.activeSuperAdminTab=a,this.render()},e.setRbacSelectedRole=a=>{this.selectedRbacRole=a,this.render()},e.handleToggleRolePermission=(a,r,n)=>{u.updateRolePermissionKey(a,r,n),h(n?`Granted "${r}" to ${a.toUpperCase()}`:`Revoked "${r}" from ${a.toUpperCase()}`,"fa-shield-halved",n?"border-emerald-500":"border-amber-500"),this.render()},e.resetAllRolePermissions=()=>{confirm("Reset all roles to factory default permissions?")&&(u.resetRolePermissions(),z({particleCount:90,spread:60,origin:{y:.6}}),h("Reset all role permissions to factory defaults!","fa-rotate-left","border-emerald-500"),this.render())},e.setUserRoleFilter=a=>{this.superAdminUserRoleFilter=a,this.render()},e.setAuditCategoryFilter=a=>{this.superAdminAuditCategoryFilter=a,this.render()},e.openCreateUserModal=()=>{if(!u.hasPermission("MANAGE_USERS")){h("Unauthorized: You lack MANAGE_USERS permission.","fa-lock","border-red-500");return}this.isSuperAdminCreateUserModalOpen=!0,this.render()},e.openEditUserModal=a=>{if(!u.hasPermission("MANAGE_USERS")){h("Unauthorized: You lack MANAGE_USERS permission.","fa-lock","border-red-500");return}this.editTargetUserId=a,this.isSuperAdminEditUserModalOpen=!0,this.render()},e.openAddZoneModal=()=>{if(!u.hasPermission("MANAGE_TRADE_ZONES")){h("Unauthorized: You lack MANAGE_TRADE_ZONES permission.","fa-lock","border-red-500");return}this.isSuperAdminAddZoneModalOpen=!0,this.render()},e.openAddBlacklistModal=()=>{if(!u.hasPermission("MANAGE_BLACKLIST")){h("Unauthorized: You lack MANAGE_BLACKLIST permission.","fa-lock","border-red-500");return}this.isSuperAdminAddBlacklistModalOpen=!0,this.render()},e.openCreateBannerModal=()=>{if(!u.hasPermission("MANAGE_BANNERS")){h("Unauthorized: You lack MANAGE_BANNERS permission.","fa-lock","border-red-500");return}this.editTargetBannerId=null,this.isSuperAdminBannerModalOpen=!0,this.render()},e.openEditBannerModal=a=>{if(!u.hasPermission("MANAGE_BANNERS")){h("Unauthorized: You lack MANAGE_BANNERS permission.","fa-lock","border-red-500");return}this.editTargetBannerId=a,this.isSuperAdminBannerModalOpen=!0,this.render()},e.handleSaveBannerSubmit=(a,r)=>{var M,P,V,Z,ee,X,N,ae,se,k,W,F,le,ge;a.preventDefault();const n=(M=document.getElementById("bannerTitleInput"))==null?void 0:M.value,i=((P=document.getElementById("bannerTitleAmInput"))==null?void 0:P.value)||void 0,d=((V=document.getElementById("bannerSubtitleInput"))==null?void 0:V.value)||void 0,c=((Z=document.getElementById("bannerSubtitleAmInput"))==null?void 0:Z.value)||void 0,o=(ee=document.getElementById("bannerAudienceSelect"))==null?void 0:ee.value,m=((X=document.getElementById("bannerRegionSelect"))==null?void 0:X.value)||"All",f=Number((N=document.getElementById("bannerPriorityInput"))==null?void 0:N.value)||5,x=((ae=document.getElementById("bannerBadgeInput"))==null?void 0:ae.value)||void 0,w=((se=document.getElementById("bannerBadgeAmInput"))==null?void 0:se.value)||void 0,A=((k=document.getElementById("bannerCtaTextInput"))==null?void 0:k.value)||"Browse Marketplace",E=((W=document.getElementById("bannerCtaLinkSelect"))==null?void 0:W.value)||"marketplace",C=(F=document.getElementById("bannerImageUrlInput"))==null?void 0:F.value,y=(le=document.getElementById("bannerGradientSelect"))==null?void 0:le.value,S=((ge=document.getElementById("bannerIsActiveCheck"))==null?void 0:ge.checked)??!0;r?(u.updateBanner(r,{title:n,titleAm:i,subtitle:d,subtitleAm:c,targetAudience:o,targetRegion:m,priority:f,badgeText:x,badgeTextAm:w,ctaText:A,ctaLink:E,imageUrl:C,themeGradient:y,isActive:S}),h(`Updated promotional banner: "${n}"`,"fa-panorama","border-emerald-500")):(u.createBanner({title:n,titleAm:i,subtitle:d,subtitleAm:c,targetAudience:o,targetRegion:m,priority:f,badgeText:x,badgeTextAm:w,ctaText:A,ctaLink:E,imageUrl:C,themeGradient:y,isActive:S}),z({particleCount:90,spread:60,origin:{y:.6}}),h(`Published new banner: "${n}"!`,"fa-panorama","border-emerald-500")),this.isSuperAdminBannerModalOpen=!1,this.editTargetBannerId=null,this.render()},e.toggleBannerStatus=a=>{const r=u.getBannerById(a);if(!r)return;const n=!r.isActive;u.toggleBannerStatus(a,n),h(n?`Activated banner: "${r.title}"`:`Paused banner: "${r.title}"`,"fa-panorama",n?"border-emerald-500":"border-slate-500"),this.render()},e.deleteBanner=a=>{const r=u.getBannerById(a);r&&confirm(`Are you sure you want to delete banner "${r.title}"?`)&&(u.deleteBanner(a),h(`Deleted banner: "${r.title}"`,"fa-trash","border-red-500"),this.render())},e.openAdminEditListingModal=a=>{this.editTargetListingId=a,this.isListingEditModalOpen=!0,this.render()},e.handleAdminEditListingSubmit=(a,r)=>{var y,S,M,P,V,Z,ee,X,N,ae,se,k;a.preventDefault();const n=(y=document.getElementById("listingNameInput"))==null?void 0:y.value,i=((S=document.getElementById("listingNameAmInput"))==null?void 0:S.value)||void 0,d=(M=document.getElementById("listingCategorySelect"))==null?void 0:M.value,c=(P=document.getElementById("listingGradeSelect"))==null?void 0:P.value,o=(V=document.getElementById("listingModerationStatusSelect"))==null?void 0:V.value,m=Number((Z=document.getElementById("listingPriceInput"))==null?void 0:Z.value),f=Number((ee=document.getElementById("listingQtyInput"))==null?void 0:ee.value),x=Number((X=document.getElementById("listingMinOrderInput"))==null?void 0:X.value)||50,w=(N=document.getElementById("listingRegionInput"))==null?void 0:N.value,A=((ae=document.getElementById("listingDescInput"))==null?void 0:ae.value)||void 0,E=((se=document.getElementById("listingOrganicCheck"))==null?void 0:se.checked)??!1,C=((k=document.getElementById("listingAdvanceHarvestCheck"))==null?void 0:k.checked)??!1;u.adminUpdateListing(r,{productName:n,nameAm:i,category:d,grade:c,moderationStatus:o,pricePerKg:m,qtyKg:f,minOrderKg:x,region:w,description:A,isOrganic:E,isAdvanceHarvest:C}),this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Saved moderation changes for "${n}"!`,"fa-gavel","border-purple-500"),this.render()},e.adminDeleteListing=a=>{const r=u.getListings().find(d=>d.id===a);if(!r)return;const n=prompt(this.lang==="am"?"እባክዎ የተሰረዘበትን ምክንያት ያስገቡ:":"Please enter the reason for removing this listing post:","Violates marketplace quality & pricing policies");if(n===null)return;u.adminDeleteListing(a,n)?(this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Deleted produce post: "${r.productName}"`,"fa-trash","border-red-500")):h("Failed to delete produce post","fa-triangle-exclamation","border-red-500"),this.render()},e.flagListingAnomaly=a=>{const r=u.getListings().find(n=>n.id===a);r&&(u.flagListingAnomaly(a,"Manual Admin Anomaly Flag"),h(`Flagged "${r.productName}" for price/quality inspection!`,"fa-flag","border-amber-500"),this.render())},e.closeSuperAdminModal=()=>{this.isSuperAdminCreateUserModalOpen=!1,this.isSuperAdminEditUserModalOpen=!1,this.isSuperAdminAddZoneModalOpen=!1,this.isSuperAdminAddBlacklistModalOpen=!1,this.isSuperAdminBannerModalOpen=!1,this.isListingEditModalOpen=!1,this.editTargetUserId=null,this.editTargetBannerId=null,this.editTargetListingId=null,this.render()},e.handleRoleChangeInModal=a=>{const r=document.getElementById("roleSpecificFields");r&&(a==="farmer"?r.innerHTML=`
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
        `:a==="driver"?r.innerHTML=`
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
        `:a==="buyer"?r.innerHTML=`
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
        `:a==="admin"?r.innerHTML=`
          <div>
            <label class="block mb-2 font-bold text-slate-700">Admin Permissions Assigned</label>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Manage Users & KYC</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Arbitrate Disputes</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Broadcast SMS</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> View Tax Reports</label>
            </div>
          </div>
        `:a==="superadmin"&&(r.innerHTML=`
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
            👑 Grants full unrestricted platform access, killswitches, impersonation engine, and escrow governance.
          </div>
        `))},e.handleCreateUserSubmit=a=>{var S,M,P,V,Z,ee,X,N,ae,se,k,W,F,le;a.preventDefault();const r=(S=document.getElementById("newRoleSelect"))==null?void 0:S.value,n=(M=document.getElementById("newNameInput"))==null?void 0:M.value,i=((P=document.getElementById("newNameAmInput"))==null?void 0:P.value)||void 0,d=(V=document.getElementById("newPhoneInput"))==null?void 0:V.value,c=(Z=document.getElementById("newRegionInput"))==null?void 0:Z.value,o=((ee=document.getElementById("newVerifiedCheck"))==null?void 0:ee.checked)??!0,m=((X=document.getElementById("newPrimaryCropInput"))==null?void 0:X.value)||void 0,f=((N=document.getElementById("newKebeleInput"))==null?void 0:N.value)||void 0,x=((ae=document.getElementById("newFaydaInput"))==null?void 0:ae.value)||void 0,w=((se=document.getElementById("newTinInput"))==null?void 0:se.value)||void 0,A=((k=document.getElementById("newVehicleTypeInput"))==null?void 0:k.value)||void 0,E=Number((W=document.getElementById("newCapacityInput"))==null?void 0:W.value)||void 0,C=((F=document.getElementById("newRefrigInput"))==null?void 0:F.value)||void 0,y=((le=document.getElementById("newLicenseInput"))==null?void 0:le.value)||void 0;u.createUser({role:r,name:n,nameAm:i,phone:d,region:c,verified:o,status:"active",primaryCrop:m,kebele:f,faydaId:x,tinNumber:w,vehicleType:A,vehicleCapacityKg:E,refrigerationType:C,businessLicenseNumber:y}),this.isSuperAdminCreateUserModalOpen=!1,z({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?`አዲስ ${r.toUpperCase()} መለያ ተፈጥሯል: ${n}`:`Created ${r.toUpperCase()} account: ${n}!`,"fa-user-check","border-rose-500"),this.render()},e.handleEditUserSubmit=(a,r)=>{var x,w,A,E,C,y,S;a.preventDefault();const n=(x=document.getElementById("editNameInput"))==null?void 0:x.value,i=(w=document.getElementById("editPhoneInput"))==null?void 0:w.value,d=(A=document.getElementById("editRoleSelect"))==null?void 0:A.value,c=(E=document.getElementById("editStatusSelect"))==null?void 0:E.value,o=(C=document.getElementById("editRegionInput"))==null?void 0:C.value,m=((y=document.getElementById("editFaydaInput"))==null?void 0:y.value)||void 0,f=((S=document.getElementById("editTinInput"))==null?void 0:S.value)||void 0;u.updateUser(r,{name:n,phone:i,role:d,status:c,region:o,faydaId:m,tinNumber:f}),this.isSuperAdminEditUserModalOpen=!1,this.editTargetUserId=null,h(`Updated user profile: ${n}`,"fa-user-pen","border-emerald-500"),this.render()},e.toggleUserSuspension=a=>{try{const r=u.toggleUserSuspension(a),n=r.status==="suspended";h(n?this.lang==="am"?`የተጠቃሚ ${r.name} መለያ ታግዷል`:`Suspended account access for ${r.name}`:this.lang==="am"?`የተጠቃሚ ${r.name} መለያ እገዳ ተነስቷል`:`Reinstated account access for ${r.name}`,n?"fa-user-slash":"fa-user-check",n?"border-red-500":"border-emerald-500")}catch(r){h(r.message||"Error updating user status","fa-triangle-exclamation","border-red-500")}this.render()},e.deleteUserAccount=a=>{const r=u.getUserById(a);if(!r)return;const n=this.lang==="am"?`ተጠቃሚ '${r.name}' (${r.phone})ን በቋሚነት መሰረዝ ይፈልጋሉ? ይህ እርምጃ ሊመለስ አይችልም።`:`Are you sure you want to permanently delete user '${r.name}' (${r.phone})? This action cannot be undone.`;if(!confirm(n))return;u.deleteUser(a)?h(this.lang==="am"?`ተጠቃሚ '${r.name}' በቋሚነት ተሰርዟል`:`Permanently deleted user: ${r.name}`,"fa-trash","border-red-500"):h("Failed to delete user account","fa-triangle-exclamation","border-red-500"),this.render()},e.startSuperAdminImpersonation=a=>{const r=u.startImpersonation(a);r&&(window.isSuperAdminImpersonating=!0,h(`Logged in as ${r.name} (${r.role.toUpperCase()})`,"fa-user-secret","border-rose-500"),r.role==="farmer"?this.activeTab="farmer":r.role==="driver"?this.activeTab="driver":r.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.render(),window.scrollTo({top:0,behavior:"smooth"}))},e.stopSuperAdminImpersonation=()=>{u.stopImpersonation(),window.isSuperAdminImpersonating=!1,h("Exited impersonation. Returned to Super Admin dashboard.","fa-crown","border-rose-500"),this.activeTab="superadmin",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.updateEscrowSliders=a=>{const r=document.getElementById("farmerShareInput"),n=document.getElementById("driverShareInput"),i=document.getElementById("platformShareInput");if(!r||!n||!i)return;let d=Number(r.value),c=Number(n.value),o=Number(i.value);if(a==="farmer"){const m=100-d;c=Math.round(m/2),o=m-c,n.value=c.toString(),i.value=o.toString()}document.getElementById("farmerShareDisplay").innerText=`${r.value}%`,document.getElementById("driverShareDisplay").innerText=`${n.value}%`,document.getElementById("platformShareDisplay").innerText=`${i.value}%`},e.handleSaveSuperAdminConfig=a=>{var E,C,y,S,M,P,V,Z,ee,X,N;a.preventDefault();const r=Number((E=document.getElementById("farmerShareInput"))==null?void 0:E.value)||90,n=Number((C=document.getElementById("driverShareInput"))==null?void 0:C.value)||5,i=Number((y=document.getElementById("platformShareInput"))==null?void 0:y.value)||5,d=Number((S=document.getElementById("cfgWithholdingTax"))==null?void 0:S.value)||2,c=Number((M=document.getElementById("cfgHighValueThreshold"))==null?void 0:M.value)||5e4,o=((P=document.getElementById("cfgTelebirrAppId"))==null?void 0:P.value)||"",m=((V=document.getElementById("cfgTelebirrShortCode"))==null?void 0:V.value)||"",f=((Z=document.getElementById("cfgTelebirrApiKey"))==null?void 0:Z.value)||"",x=((ee=document.getElementById("cfgTwilioSid"))==null?void 0:ee.value)||"",w=((X=document.getElementById("cfgTwilioToken"))==null?void 0:X.value)||"",A=((N=document.getElementById("cfgTwilioFrom"))==null?void 0:N.value)||"";u.updatePlatformConfig({farmerSharePercent:r,driverSharePercent:n,platformFeePercent:i,withholdingTaxPercent:d,highValuePayoutThresholdEtb:c,telebirrAppId:o,telebirrShortCode:m,telebirrApiKey:f,twilioAccountSid:x,twilioAuthToken:w,twilioFromNumber:A}),h("Platform configuration and escrow splits saved!","fa-floppy-disk","border-emerald-500"),this.render()},e.approveHighValuePayout=a=>{const r=u.getCurrentUser();u.approvePayout(a,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)")&&(z({particleCount:90,spread:60,origin:{y:.6}}),h("High-value Telebirr payout approved & released!","fa-circle-check","border-emerald-500"),this.render())},e.rejectHighValuePayout=a=>{const r=u.getCurrentUser();u.rejectPayout(a,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)","Manual Super Admin audit flag"),h("Payout declined & flagged for compliance investigation.","fa-ban","border-red-500"),this.render()},e.toggleFeatureFlag=a=>{const r=u.toggleFeatureFlag(a);h(`${r.name}: ${r.enabled?"ENABLED":"DISABLED"}`,"fa-toggle-on",r.enabled?"border-emerald-500":"border-slate-500"),this.render()},e.toggleEmergencyEscrowFreeze=()=>{const r=!u.getPlatformConfig().emergencyEscrowFrozen;u.updatePlatformConfig({emergencyEscrowFrozen:r}),r?(alert(`EMERGENCY ESCROW FREEZE ACTIVATED!
All automatic Telebirr payouts and order releases have been halted platform-wide.`),h("EMERGENCY ESCROW FREEZE ACTIVATED!","fa-lock","border-red-500")):h("Platform escrow unfrozen. Normal operations restored.","fa-lock-open","border-emerald-500"),this.render()},e.handleAddZoneSubmit=a=>{var m,f,x,w,A,E;a.preventDefault();const r=(m=document.getElementById("zoneNameInput"))==null?void 0:m.value,n=(f=document.getElementById("zoneHubInput"))==null?void 0:f.value,i=Number((x=document.getElementById("zoneLatInput"))==null?void 0:x.value),d=Number((w=document.getElementById("zoneLngInput"))==null?void 0:w.value),c=Number((A=document.getElementById("zoneRadiusInput"))==null?void 0:A.value),o=Number((E=document.getElementById("zoneBonusInput"))==null?void 0:E.value);u.addDeliveryZone({name:r,clusterHubName:n,centerLatitude:i,centerLongitude:d,baseRadiusKm:c,maxRadiusKm:c*2.5,ruralSubsidyEtb:o,active:!0,smallholdersCount:500}),this.isSuperAdminAddZoneModalOpen=!1,h(`Added regional delivery zone: ${r}`,"fa-map-location-dot","border-teal-500"),this.render()},e.deleteZone=a=>{u.deleteDeliveryZone(a),h("Delivery zone removed.","fa-trash","border-slate-500"),this.render()},e.handleAddBlacklistSubmit=a=>{var c,o,m;a.preventDefault();const r=(c=document.getElementById("blTypeSelect"))==null?void 0:c.value,n=(o=document.getElementById("blValueInput"))==null?void 0:o.value,i=(m=document.getElementById("blReasonInput"))==null?void 0:m.value,d=u.getCurrentUser();u.addToBlacklist({type:r,value:n,reason:i,blacklistedBy:(d==null?void 0:d.name)||"Super Admin",active:!0}),this.isSuperAdminAddBlacklistModalOpen=!1,h(`Entity blacklisted: ${n}`,"fa-ban","border-red-500"),this.render()},e.removeFromBlacklist=a=>{u.removeFromBlacklist(a),h("Entity removed from blacklist.","fa-circle-check","border-emerald-500"),this.render()},e.handleSaveBusinessRules=a=>{var c,o,m,f;a.preventDefault();const r=Number((c=document.getElementById("ruleMinOrderKg"))==null?void 0:c.value)||10,n=Number((o=document.getElementById("ruleMaxOrderKg"))==null?void 0:o.value)||5e4,i=Number((m=document.getElementById("ruleMaxDistanceKm"))==null?void 0:m.value)||450,d=Number((f=document.getElementById("rulePriceCeiling"))==null?void 0:f.value)||250;u.updateGlobalBusinessRules({minOrderKg:r,maxOrderKg:n,maxDistanceKm:i,priceCeilingVariancePercent:d}),h("Global trading business rules saved!","fa-gavel","border-emerald-500"),this.render()},e.triggerDbBackup=()=>{const a=u.triggerDatabaseBackup();z({particleCount:80,spread:60,origin:{y:.6}}),h(`PostgreSQL backup snapshot generated (${a.backupId})!`,"fa-database","border-blue-500"),this.render()},e.exportPlatformData=a=>{const r=u.exportPlatformData(a),n=document.createElement("a");n.href=r.dataUrl,n.download=r.filename,document.body.appendChild(n),n.click(),document.body.removeChild(n),h(`Downloaded full platform data export (${a.toUpperCase()})!`,"fa-download","border-emerald-500"),this.render()},e.openUssdSimulator=a=>{Ma.open(a)},e.openMarketIntelligence=()=>{Ua.open()}}}new Ga;
