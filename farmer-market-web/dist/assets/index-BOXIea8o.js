var nt=Object.defineProperty;var lt=(l,e,t)=>e in l?nt(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var b=(l,e,t)=>lt(l,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();var Ne={};(function l(e,t,s,a){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",i=(function(){if(!e.OffscreenCanvas)return!1;try{var m=new OffscreenCanvas(1,1),u=m.getContext("2d");u.fillRect(0,0,1,1);var $=m.transferToImageBitmap();u.createPattern($,"no-repeat")}catch{return!1}return!0})();function d(){}function c(m){var u=t.exports.Promise,$=u!==void 0?u:e.Promise;return typeof $=="function"?new $(m):(m(d,d),null)}var n=(function(m,u){return{transform:function($){if(m)return $;if(u.has($))return u.get($);var E=new OffscreenCanvas($.width,$.height),P=E.getContext("2d");return P.drawImage($,0,0),u.set($,E),E},clear:function(){u.clear()}}})(i,new Map),f=(function(){var m=Math.floor(16.666666666666668),u,$,E={},P=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(u=function(R){var N=Math.random();return E[N]=requestAnimationFrame(function T(D){P===D||P+m-1<D?(P=D,delete E[N],R()):E[N]=requestAnimationFrame(T)}),N},$=function(R){E[R]&&cancelAnimationFrame(E[R])}):(u=function(R){return setTimeout(R,m)},$=function(R){return clearTimeout(R)}),{frame:u,cancel:$}})(),x=(function(){var m,u,$={};function E(P){function R(N,T){P.postMessage({options:N||{},callback:T})}P.init=function(T){var D=T.transferControlToOffscreen();P.postMessage({canvas:D},[D])},P.fire=function(T,D,M){if(u)return R(T,null),u;var K=Math.random().toString(36).slice(2);return u=c(function(L){function H(te){te.data.callback===K&&(delete $[K],P.removeEventListener("message",H),u=null,n.clear(),M(),L())}P.addEventListener("message",H),R(T,K),$[K]=H.bind(null,{data:{callback:K}})}),u},P.reset=function(){P.postMessage({reset:!0});for(var T in $)$[T](),delete $[T]}}return function(){if(m)return m;if(!s&&r){var P=["var CONFETTI, SIZE = {}, module = {};","("+l.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{m=new Worker(URL.createObjectURL(new Blob([P])))}catch(R){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",R),null}E(m)}return m}})(),k={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function S(m,u){return u?u(m):m}function A(m){return m!=null}function y(m,u,$){return S(m&&A(m[u])?m[u]:k[u],$)}function _(m){return m<0?0:Math.floor(m)}function v(m,u){return Math.floor(Math.random()*(u-m))+m}function F(m){return parseInt(m,16)}function V(m){return m.map(z)}function z(m){var u=String(m).replace(/[^0-9a-f]/gi,"");return u.length<6&&(u=u[0]+u[0]+u[1]+u[1]+u[2]+u[2]),{r:F(u.substring(0,2)),g:F(u.substring(2,4)),b:F(u.substring(4,6))}}function Q(m){var u=y(m,"origin",Object);return u.x=y(u,"x",Number),u.y=y(u,"y",Number),u}function J(m){m.width=document.documentElement.clientWidth,m.height=document.documentElement.clientHeight}function Z(m){var u=m.getBoundingClientRect();m.width=u.width,m.height=u.height}function Y(m){var u=document.createElement("canvas");return u.style.position="fixed",u.style.top="0px",u.style.left="0px",u.style.pointerEvents="none",u.style.zIndex=m,u}function I(m,u,$,E,P,R,N,T,D){m.save(),m.translate(u,$),m.rotate(R),m.scale(E,P),m.arc(0,0,1,N,T,D),m.restore()}function ae(m){var u=m.angle*(Math.PI/180),$=m.spread*(Math.PI/180);return{x:m.x,y:m.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:m.startVelocity*.5+Math.random()*m.startVelocity,angle2D:-u+(.5*$-Math.random()*$),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:m.color,shape:m.shape,tick:0,totalTicks:m.ticks,decay:m.decay,drift:m.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:m.gravity*3,ovalScalar:.6,scalar:m.scalar,flat:m.flat}}function se(m,u){u.x+=Math.cos(u.angle2D)*u.velocity+u.drift,u.y+=Math.sin(u.angle2D)*u.velocity+u.gravity,u.velocity*=u.decay,u.flat?(u.wobble=0,u.wobbleX=u.x+10*u.scalar,u.wobbleY=u.y+10*u.scalar,u.tiltSin=0,u.tiltCos=0,u.random=1):(u.wobble+=u.wobbleSpeed,u.wobbleX=u.x+10*u.scalar*Math.cos(u.wobble),u.wobbleY=u.y+10*u.scalar*Math.sin(u.wobble),u.tiltAngle+=.1,u.tiltSin=Math.sin(u.tiltAngle),u.tiltCos=Math.cos(u.tiltAngle),u.random=Math.random()+2);var $=u.tick++/u.totalTicks,E=u.x+u.random*u.tiltCos,P=u.y+u.random*u.tiltSin,R=u.wobbleX+u.random*u.tiltCos,N=u.wobbleY+u.random*u.tiltSin;if(m.fillStyle="rgba("+u.color.r+", "+u.color.g+", "+u.color.b+", "+(1-$)+")",m.beginPath(),o&&u.shape.type==="path"&&typeof u.shape.path=="string"&&Array.isArray(u.shape.matrix))m.fill(Ae(u.shape.path,u.shape.matrix,u.x,u.y,Math.abs(R-E)*.1,Math.abs(N-P)*.1,Math.PI/10*u.wobble));else if(u.shape.type==="bitmap"){var T=Math.PI/10*u.wobble,D=Math.abs(R-E)*.1,M=Math.abs(N-P)*.1,K=u.shape.bitmap.width*u.scalar,L=u.shape.bitmap.height*u.scalar,H=new DOMMatrix([Math.cos(T)*D,Math.sin(T)*D,-Math.sin(T)*M,Math.cos(T)*M,u.x,u.y]);H.multiplySelf(new DOMMatrix(u.shape.matrix));var te=m.createPattern(n.transform(u.shape.bitmap),"no-repeat");te.setTransform(H),m.globalAlpha=1-$,m.fillStyle=te,m.fillRect(u.x-K/2,u.y-L/2,K,L),m.globalAlpha=1}else if(u.shape==="circle")m.ellipse?m.ellipse(u.x,u.y,Math.abs(R-E)*u.ovalScalar,Math.abs(N-P)*u.ovalScalar,Math.PI/10*u.wobble,0,2*Math.PI):I(m,u.x,u.y,Math.abs(R-E)*u.ovalScalar,Math.abs(N-P)*u.ovalScalar,Math.PI/10*u.wobble,0,2*Math.PI);else if(u.shape==="star")for(var B=Math.PI/2*3,ie=4*u.scalar,ne=8*u.scalar,le=u.x,ue=u.y,ge=5,ce=Math.PI/ge;ge--;)le=u.x+Math.cos(B)*ne,ue=u.y+Math.sin(B)*ne,m.lineTo(le,ue),B+=ce,le=u.x+Math.cos(B)*ie,ue=u.y+Math.sin(B)*ie,m.lineTo(le,ue),B+=ce;else m.moveTo(Math.floor(u.x),Math.floor(u.y)),m.lineTo(Math.floor(u.wobbleX),Math.floor(P)),m.lineTo(Math.floor(R),Math.floor(N)),m.lineTo(Math.floor(E),Math.floor(u.wobbleY));return m.closePath(),m.fill(),u.tick<u.totalTicks}function w(m,u,$,E,P){var R=u.slice(),N=m.getContext("2d"),T,D,M=c(function(K){function L(){T=D=null,N.clearRect(0,0,E.width,E.height),n.clear(),P(),K()}function H(){s&&!(E.width===a.width&&E.height===a.height)&&(E.width=m.width=a.width,E.height=m.height=a.height),!E.width&&!E.height&&($(m),E.width=m.width,E.height=m.height),N.clearRect(0,0,E.width,E.height),R=R.filter(function(te){return se(N,te)}),R.length?T=f.frame(H):L()}T=f.frame(H),D=L});return{addFettis:function(K){return R=R.concat(K),M},canvas:m,promise:M,reset:function(){T&&f.cancel(T),D&&D()}}}function G(m,u){var $=!m,E=!!y(u||{},"resize"),P=!1,R=y(u,"disableForReducedMotion",Boolean),N=r&&!!y(u||{},"useWorker"),T=N?x():null,D=$?J:Z,M=m&&T?!!m.__confetti_initialized:!1,K=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,L;function H(B,ie,ne){for(var le=y(B,"particleCount",_),ue=y(B,"angle",Number),ge=y(B,"spread",Number),ce=y(B,"startVelocity",Number),Ze=y(B,"decay",Number),et=y(B,"gravity",Number),tt=y(B,"drift",Number),Me=y(B,"colors",V),at=y(B,"ticks",Number),Le=y(B,"shapes"),st=y(B,"scalar"),rt=!!y(B,"flat"),Oe=Q(B),Fe=le,Ie=[],it=m.width*Oe.x,ot=m.height*Oe.y;Fe--;)Ie.push(ae({x:it,y:ot,angle:ue,spread:ge,startVelocity:ce,color:Me[Fe%Me.length],shape:Le[v(0,Le.length)],ticks:at,decay:Ze,gravity:et,drift:tt,scalar:st,flat:rt}));return L?L.addFettis(Ie):(L=w(m,Ie,D,ie,ne),L.promise)}function te(B){var ie=R||y(B,"disableForReducedMotion",Boolean),ne=y(B,"zIndex",Number);if(ie&&K)return c(function(ce){ce()});$&&L?m=L.canvas:$&&!m&&(m=Y(ne),document.body.appendChild(m)),E&&!M&&D(m);var le={width:m.width,height:m.height};T&&!M&&T.init(m),M=!0,T&&(m.__confetti_initialized=!0);function ue(){if(T){var ce={getBoundingClientRect:function(){if(!$)return m.getBoundingClientRect()}};D(ce),T.postMessage({resize:{width:ce.width,height:ce.height}});return}le.width=le.height=null}function ge(){L=null,E&&(P=!1,e.removeEventListener("resize",ue)),$&&m&&(document.body.contains(m)&&document.body.removeChild(m),m=null,M=!1)}return E&&!P&&(P=!0,e.addEventListener("resize",ue,!1)),T?T.fire(B,le,ge):H(B,le,ge)}return te.reset=function(){T&&T.reset(),L&&L.reset()},te}var U;function me(){return U||(U=G(null,{useWorker:!0,resize:!0})),U}function Ae(m,u,$,E,P,R,N){var T=new Path2D(m),D=new Path2D;D.addPath(T,new DOMMatrix(u));var M=new Path2D;return M.addPath(D,new DOMMatrix([Math.cos(N)*P,Math.sin(N)*P,-Math.sin(N)*R,Math.cos(N)*R,$,E])),M}function Xe(m){if(!o)throw new Error("path confetti are not supported in this browser");var u,$;typeof m=="string"?u=m:(u=m.path,$=m.matrix);var E=new Path2D(u),P=document.createElement("canvas"),R=P.getContext("2d");if(!$){for(var N=1e3,T=N,D=N,M=0,K=0,L,H,te=0;te<N;te+=2)for(var B=0;B<N;B+=2)R.isPointInPath(E,te,B,"nonzero")&&(T=Math.min(T,te),D=Math.min(D,B),M=Math.max(M,te),K=Math.max(K,B));L=M-T,H=K-D;var ie=10,ne=Math.min(ie/L,ie/H);$=[ne,0,0,ne,-Math.round(L/2+T)*ne,-Math.round(H/2+D)*ne]}return{type:"path",path:u,matrix:$}}function Je(m){var u,$=1,E="#000000",P='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof m=="string"?u=m:(u=m.text,$="scalar"in m?m.scalar:$,P="fontFamily"in m?m.fontFamily:P,E="color"in m?m.color:E);var R=10*$,N=""+R+"px "+P,T=new OffscreenCanvas(R,R),D=T.getContext("2d");D.font=N;var M=D.measureText(u),K=Math.ceil(M.actualBoundingBoxRight+M.actualBoundingBoxLeft),L=Math.ceil(M.actualBoundingBoxAscent+M.actualBoundingBoxDescent),H=2,te=M.actualBoundingBoxLeft+H,B=M.actualBoundingBoxAscent+H;K+=H+H,L+=H+H,T=new OffscreenCanvas(K,L),D=T.getContext("2d"),D.font=N,D.fillStyle=E,D.fillText(u,te,B);var ie=1/$;return{type:"bitmap",bitmap:T.transferToImageBitmap(),matrix:[ie,0,0,ie,-K*ie/2,-L*ie/2]}}t.exports=function(){return me().apply(this,arguments)},t.exports.reset=function(){me().reset()},t.exports.create=G,t.exports.shapeFromPath=Xe,t.exports.shapeFromText=Je})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Ne,!1);const ee=Ne.exports;Ne.exports.create;class fe extends Error{constructor(e,t){const s=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=s}}class De extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class de extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class dt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=s}}class ct extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=s}}class pt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=s}}class Ue extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class ut extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=s}}class Ge{constructor(e,t,s){this.statusCode=e,this.statusText=t,this.content=s}}class Ce{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var g;(function(l){l[l.Trace=0]="Trace",l[l.Debug=1]="Debug",l[l.Information=2]="Information",l[l.Warning=3]="Warning",l[l.Error=4]="Error",l[l.Critical=5]="Critical",l[l.None=6]="None"})(g||(g={}));class ye{constructor(){}log(e,t){}}ye.instance=new ye;const mt="8.0.29";class q{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,s){if(!(e in t))throw new Error(`Unknown ${s} value: ${e}.`)}}class j{static get isBrowser(){return!j.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!j.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!j.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function we(l,e){let t="";return he(l)?(t=`Binary data of length ${l.byteLength}`,e&&(t+=`. Content: '${gt(l)}'`)):typeof l=="string"&&(t=`String data of length ${l.length}`,e&&(t+=`. Content: '${l}'`)),t}function gt(l){const e=new Uint8Array(l);let t="";return e.forEach(s=>{const a=s<16?"0":"";t+=`0x${a}${s.toString(16)} `}),t.substr(0,t.length-1)}function he(l){return l&&typeof ArrayBuffer<"u"&&(l instanceof ArrayBuffer||l.constructor&&l.constructor.name==="ArrayBuffer")}async function qe(l,e,t,s,a,r){const o={},[i,d]=ve();o[i]=d,l.log(g.Trace,`(${e} transport) sending data. ${we(a,r.logMessageContent)}.`);const c=he(a)?"arraybuffer":"text",n=await t.post(s,{content:a,headers:{...o,...r.headers},responseType:c,timeout:r.timeout,withCredentials:r.withCredentials});l.log(g.Trace,`(${e} transport) request complete. Response status: ${n.statusCode}.`)}function ft(l){return l===void 0?new Ee(g.Information):l===null?ye.instance:l.log!==void 0?l:new Ee(l)}class bt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class Ee{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const s=`[${new Date().toISOString()}] ${g[e]}: ${t}`;switch(e){case g.Critical:case g.Error:this.out.error(s);break;case g.Warning:this.out.warn(s);break;case g.Information:this.out.info(s);break;default:this.out.log(s);break}}}}function ve(){let l="X-SignalR-User-Agent";return j.isNode&&(l="User-Agent"),[l,ht(mt,vt(),yt(),xt())]}function ht(l,e,t,s){let a="Microsoft SignalR/";const r=l.split(".");return a+=`${r[0]}.${r[1]}`,a+=` (${l}; `,e&&e!==""?a+=`${e}; `:a+="Unknown OS; ",a+=`${t}`,s?a+=`; ${s}`:a+="; Unknown Runtime Version",a+=")",a}function vt(){if(j.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function xt(){if(j.isNode)return process.versions.node}function yt(){return j.isNode?"NodeJS":"Browser"}function Pe(l){return l.stack?l.stack:l.message?l.message:`${l}`}function wt(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class At extends Ce{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||j.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(wt());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new de;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let s;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),s=new de});let a=null;if(e.timeout){const d=e.timeout;a=setTimeout(()=>{t.abort(),this._logger.log(g.Warning,"Timeout from HTTP request."),s=new De},d)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},he(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let r;try{r=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(d){throw s||(this._logger.log(g.Warning,`Error from HTTP request. ${d}.`),d)}finally{a&&clearTimeout(a),e.abortSignal&&(e.abortSignal.onabort=null)}if(!r.ok){const d=await je(r,"text");throw new fe(d||r.statusText,r.status)}const i=await je(r,e.responseType);return new Ge(r.status,r.statusText,i)}getCookieString(e){let t="";return j.isNode&&this._jar&&this._jar.getCookies(e,(s,a)=>t=a.join("; ")),t}}function je(l,e){let t;switch(e){case"arraybuffer":t=l.arrayBuffer();break;case"text":t=l.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=l.text();break}return t}class kt extends Ce{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new de):e.method?e.url?new Promise((t,s)=>{const a=new XMLHttpRequest;a.open(e.method,e.url,!0),a.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,a.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(he(e.content)?a.setRequestHeader("Content-Type","application/octet-stream"):a.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const r=e.headers;r&&Object.keys(r).forEach(o=>{a.setRequestHeader(o,r[o])}),e.responseType&&(a.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{a.abort(),s(new de)}),e.timeout&&(a.timeout=e.timeout),a.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),a.status>=200&&a.status<300?t(new Ge(a.status,a.statusText,a.response||a.responseText)):s(new fe(a.response||a.responseText||a.statusText,a.status))},a.onerror=()=>{this._logger.log(g.Warning,`Error from HTTP request. ${a.status}: ${a.statusText}.`),s(new fe(a.statusText,a.status))},a.ontimeout=()=>{this._logger.log(g.Warning,"Timeout from HTTP request."),s(new De)},a.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class St extends Ce{constructor(e){if(super(),typeof fetch<"u"||j.isNode)this._httpClient=new At(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new kt(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new de):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class oe{static write(e){return`${e}${oe.RecordSeparator}`}static parse(e){if(e[e.length-1]!==oe.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(oe.RecordSeparator);return t.pop(),t}}oe.RecordSeparatorCode=30;oe.RecordSeparator=String.fromCharCode(oe.RecordSeparatorCode);class $t{writeHandshakeRequest(e){return oe.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,s;if(he(e)){const i=new Uint8Array(e),d=i.indexOf(oe.RecordSeparatorCode);if(d===-1)throw new Error("Message is incomplete.");const c=d+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(i.slice(0,c))),s=i.byteLength>c?i.slice(c).buffer:null}else{const i=e,d=i.indexOf(oe.RecordSeparator);if(d===-1)throw new Error("Message is incomplete.");const c=d+1;t=i.substring(0,c),s=i.length>c?i.substring(c):null}const a=oe.parse(t),r=JSON.parse(a[0]);if(r.type)throw new Error("Expected a handshake response from the server.");return[s,r]}}var C;(function(l){l[l.Invocation=1]="Invocation",l[l.StreamItem=2]="StreamItem",l[l.Completion=3]="Completion",l[l.StreamInvocation=4]="StreamInvocation",l[l.CancelInvocation=5]="CancelInvocation",l[l.Ping=6]="Ping",l[l.Close=7]="Close",l[l.Ack=8]="Ack",l[l.Sequence=9]="Sequence"})(C||(C={}));class Tt{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new bt(this,e)}}class Et{constructor(e,t,s){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=s}async _send(e){const t=this._protocol.writeMessage(e);let s=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let a=()=>{},r=()=>{};he(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(s=new Promise((o,i)=>{a=o,r=i})),this._messages.push(new Ct(t,this._totalMessageCount,a,r))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await s}_ack(e){let t=-1;for(let s=0;s<this._messages.length;s++){const a=this._messages[s];if(a._id<=e.sequenceId)t=s,he(a._message)?this._bufferedByteCount-=a._message.byteLength:this._bufferedByteCount-=a._message.length,a._resolver();else if(this._bufferedByteCount<this._bufferSize)a._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==C.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:C.Sequence,sequenceId:e}));const t=this._messages;for(const s of t)await this._connection.send(s._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case C.Invocation:case C.StreamItem:case C.Completion:case C.StreamInvocation:case C.CancelInvocation:return!0;case C.Close:case C.Sequence:case C.Ping:case C.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:C.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class Ct{constructor(e,t,s,a){this._message=e,this._id=t,this._resolver=s,this._rejector=a}}const It=30*1e3,Pt=15*1e3,Rt=1e5;var O;(function(l){l.Disconnected="Disconnected",l.Connecting="Connecting",l.Connected="Connected",l.Disconnecting="Disconnecting",l.Reconnecting="Reconnecting"})(O||(O={}));class Be{static create(e,t,s,a,r,o,i){return new Be(e,t,s,a,r,o,i)}constructor(e,t,s,a,r,o,i){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(g.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},q.isRequired(e,"connection"),q.isRequired(t,"logger"),q.isRequired(s,"protocol"),this.serverTimeoutInMilliseconds=r??It,this.keepAliveIntervalInMilliseconds=o??Pt,this._statefulReconnectBufferSize=i??Rt,this._logger=t,this._protocol=s,this.connection=e,this._reconnectPolicy=a,this._handshakeProtocol=new $t,this.connection.onreceive=d=>this._processIncomingData(d),this.connection.onclose=d=>this._connectionClosed(d),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=O.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:C.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==O.Disconnected&&this._connectionState!==O.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==O.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=O.Connecting,this._logger.log(g.Debug,"Starting HubConnection.");try{await this._startInternal(),j.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=O.Connected,this._connectionStarted=!0,this._logger.log(g.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=O.Disconnected,this._logger.log(g.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,s)=>{this._handshakeResolver=t,this._handshakeRejecter=s});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const s={protocol:this._protocol.name,version:t};if(this._logger.log(g.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)),this._logger.log(g.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new Et(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(g.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===O.Disconnected)return this._logger.log(g.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===O.Disconnecting)return this._logger.log(g.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=O.Disconnecting,this._logger.log(g.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(g.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===O.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new de("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createStreamInvocation(e,t,a);let o;const i=new Tt;return i.cancelCallback=()=>{const d=this._createCancelInvocation(r.invocationId);return delete this._callbacks[r.invocationId],o.then(()=>this._sendWithProtocol(d))},this._callbacks[r.invocationId]=(d,c)=>{if(c){i.error(c);return}else d&&(d.type===C.Completion?d.error?i.error(new Error(d.error)):i.complete():i.next(d.item))},o=this._sendWithProtocol(r).catch(d=>{i.error(d),delete this._callbacks[r.invocationId]}),this._launchStreams(s,o),i}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._sendWithProtocol(this._createInvocation(e,t,!0,a));return this._launchStreams(s,r),r}invoke(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createInvocation(e,t,!1,a);return new Promise((i,d)=>{this._callbacks[r.invocationId]=(n,f)=>{if(f){d(f);return}else n&&(n.type===C.Completion?n.error?d(new Error(n.error)):i(n.result):d(new Error(`Unexpected message type: ${n.type}`)))};const c=this._sendWithProtocol(r).catch(n=>{d(n),delete this._callbacks[r.invocationId]});this._launchStreams(s,c)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const s=this._methods[e];if(s)if(t){const a=s.indexOf(t);a!==-1&&(s.splice(a,1),s.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const s of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(s)))switch(s.type){case C.Invocation:this._invokeClientMethod(s).catch(a=>{this._logger.log(g.Error,`Invoke client method threw error: ${Pe(a)}`)});break;case C.StreamItem:case C.Completion:{const a=this._callbacks[s.invocationId];if(a){s.type===C.Completion&&delete this._callbacks[s.invocationId];try{a(s)}catch(r){this._logger.log(g.Error,`Stream callback threw error: ${Pe(r)}`)}}break}case C.Ping:break;case C.Close:{this._logger.log(g.Information,"Close message received from server.");const a=s.error?new Error("Server returned an error on close: "+s.error):void 0;s.allowReconnect===!0?this.connection.stop(a):this._stopPromise=this._stopInternal(a);break}case C.Ack:this._messageBuffer&&this._messageBuffer._ack(s);break;case C.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(s);break;default:this._logger.log(g.Warning,`Invalid message type: ${s.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,s;try{[s,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(a){const r="Error parsing handshake response: "+a;this._logger.log(g.Error,r);const o=new Error(r);throw this._handshakeRejecter(o),o}if(t.error){const a="Server returned handshake error: "+t.error;this._logger.log(g.Error,a);const r=new Error(a);throw this._handshakeRejecter(r),r}else this._logger.log(g.Debug,"Server handshake complete.");return this._handshakeResolver(),s}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===O.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),s=this._methods[t];if(!s){this._logger.log(g.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(g.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const a=s.slice(),r=!!e.invocationId;let o,i,d;for(const c of a)try{const n=o;o=await c.apply(this,e.arguments),r&&o&&n&&(this._logger.log(g.Error,`Multiple results provided for '${t}'. Sending error to server.`),d=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),i=void 0}catch(n){i=n,this._logger.log(g.Error,`A callback for the method '${t}' threw error '${n}'.`)}d?await this._sendWithProtocol(d):r?(i?d=this._createCompletionMessage(e.invocationId,`${i}`,null):o!==void 0?d=this._createCompletionMessage(e.invocationId,null,o):(this._logger.log(g.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),d=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(d)):o&&this._logger.log(g.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(g.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new de("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===O.Disconnecting?this._completeClose(e):this._connectionState===O.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===O.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=O.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),j.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(g.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let s=0,a=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),r=this._getNextRetryDelay(s++,0,a);if(r===null){this._logger.log(g.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=O.Reconnecting,e?this._logger.log(g.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(g.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(o=>o.apply(this,[e]))}catch(o){this._logger.log(g.Error,`An onreconnecting callback called with error '${e}' threw error '${o}'.`)}if(this._connectionState!==O.Reconnecting){this._logger.log(g.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;r!==null;){if(this._logger.log(g.Information,`Reconnect attempt number ${s} will start in ${r} ms.`),await new Promise(o=>{this._reconnectDelayHandle=setTimeout(o,r)}),this._reconnectDelayHandle=void 0,this._connectionState!==O.Reconnecting){this._logger.log(g.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=O.Connected,this._logger.log(g.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(o=>o.apply(this,[this.connection.connectionId]))}catch(o){this._logger.log(g.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${o}'.`)}return}catch(o){if(this._logger.log(g.Information,`Reconnect attempt failed because of error '${o}'.`),this._connectionState!==O.Reconnecting){this._logger.log(g.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===O.Disconnecting&&this._completeClose();return}a=o instanceof Error?o:new Error(o.toString()),r=this._getNextRetryDelay(s++,Date.now()-t,a)}}this._logger.log(g.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${s} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,s){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:s})}catch(a){return this._logger.log(g.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${a}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(s=>{const a=t[s];try{a(null,e)}catch(r){this._logger.log(g.Error,`Stream 'error' callback called with '${e}' threw error: ${Pe(r)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,s,a){if(s)return a.length!==0?{arguments:t,streamIds:a,target:e,type:C.Invocation}:{arguments:t,target:e,type:C.Invocation};{const r=this._invocationId;return this._invocationId++,a.length!==0?{arguments:t,invocationId:r.toString(),streamIds:a,target:e,type:C.Invocation}:{arguments:t,invocationId:r.toString(),target:e,type:C.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const s in e)e[s].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s)))},error:a=>{let r;a instanceof Error?r=a.message:a&&a.toString?r=a.toString():r="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s,r)))},next:a=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(s,a)))}})}}_replaceStreamingParams(e){const t=[],s=[];for(let a=0;a<e.length;a++){const r=e[a];if(this._isObservable(r)){const o=this._invocationId;this._invocationId++,t[o]=r,s.push(o.toString()),e.splice(a,1)}}return[t,s]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,s){const a=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:a.toString(),streamIds:s,target:e,type:C.StreamInvocation}:{arguments:t,invocationId:a.toString(),target:e,type:C.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:C.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:C.StreamItem}}_createCompletionMessage(e,t,s){return t?{error:t,invocationId:e,type:C.Completion}:{invocationId:e,result:s,type:C.Completion}}_createCloseMessage(){return{type:C.Close}}}const Nt=[0,2e3,1e4,3e4,null];class Ve{constructor(e){this._retryDelays=e!==void 0?[...e,null]:Nt}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class be{}be.Authorization="Authorization";be.Cookie="Cookie";class Dt extends Ce{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const s=await this._innerClient.send(e);return t&&s.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):s}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[be.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[be.Authorization]&&delete e.headers[be.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var X;(function(l){l[l.None=0]="None",l[l.WebSockets=1]="WebSockets",l[l.ServerSentEvents=2]="ServerSentEvents",l[l.LongPolling=4]="LongPolling"})(X||(X={}));var re;(function(l){l[l.Text=1]="Text",l[l.Binary=2]="Binary"})(re||(re={}));let Bt=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class Ke{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,s){this._httpClient=e,this._logger=t,this._pollAbort=new Bt,this._options=s,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(q.isRequired(e,"url"),q.isRequired(t,"transferFormat"),q.isIn(t,re,"transferFormat"),this._url=e,this._logger.log(g.Trace,"(LongPolling transport) Connecting."),t===re.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[s,a]=ve(),r={[s]:a,...this._options.headers},o={abortSignal:this._pollAbort.signal,headers:r,timeout:1e5,withCredentials:this._options.withCredentials};t===re.Binary&&(o.responseType="arraybuffer");const i=`${e}&_=${Date.now()}`;this._logger.log(g.Trace,`(LongPolling transport) polling: ${i}.`);const d=await this._httpClient.get(i,o);d.statusCode!==200?(this._logger.log(g.Error,`(LongPolling transport) Unexpected response code: ${d.statusCode}.`),this._closeError=new fe(d.statusText||"",d.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,o)}async _poll(e,t){try{for(;this._running;)try{const s=`${e}&_=${Date.now()}`;this._logger.log(g.Trace,`(LongPolling transport) polling: ${s}.`);const a=await this._httpClient.get(s,t);a.statusCode===204?(this._logger.log(g.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):a.statusCode!==200?(this._logger.log(g.Error,`(LongPolling transport) Unexpected response code: ${a.statusCode}.`),this._closeError=new fe(a.statusText||"",a.statusCode),this._running=!1):a.content?(this._logger.log(g.Trace,`(LongPolling transport) data received. ${we(a.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(a.content)):this._logger.log(g.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(s){this._running?s instanceof De?this._logger.log(g.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=s,this._running=!1):this._logger.log(g.Trace,`(LongPolling transport) Poll errored after shutdown: ${s.message}`)}}finally{this._logger.log(g.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?qe(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(g.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(g.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,s]=ve();e[t]=s;const a={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let r;try{await this._httpClient.delete(this._url,a)}catch(o){r=o}r?r instanceof fe&&(r.statusCode===404?this._logger.log(g.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(g.Trace,`(LongPolling transport) Error sending a DELETE request: ${r}`)):this._logger.log(g.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(g.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(g.Trace,e),this.onclose(this._closeError)}}}class _t{constructor(e,t,s,a){this._httpClient=e,this._accessToken=t,this._logger=s,this._options=a,this.onreceive=null,this.onclose=null}async connect(e,t){return q.isRequired(e,"url"),q.isRequired(t,"transferFormat"),q.isIn(t,re,"transferFormat"),this._logger.log(g.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((s,a)=>{let r=!1;if(t!==re.Text){a(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let o;if(j.isBrowser||j.isWebWorker)o=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const i=this._httpClient.getCookieString(e),d={};d.Cookie=i;const[c,n]=ve();d[c]=n,o=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...d,...this._options.headers}})}try{o.onmessage=i=>{if(this.onreceive)try{this._logger.log(g.Trace,`(SSE transport) data received. ${we(i.data,this._options.logMessageContent)}.`),this.onreceive(i.data)}catch(d){this._close(d);return}},o.onerror=i=>{r?this._close():a(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},o.onopen=()=>{this._logger.log(g.Information,`SSE connected to ${this._url}`),this._eventSource=o,r=!0,s()}}catch(i){a(i);return}})}async send(e){return this._eventSource?qe(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class Mt{constructor(e,t,s,a,r,o){this._logger=s,this._accessTokenFactory=t,this._logMessageContent=a,this._webSocketConstructor=r,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=o}async connect(e,t){q.isRequired(e,"url"),q.isRequired(t,"transferFormat"),q.isIn(t,re,"transferFormat"),this._logger.log(g.Trace,"(WebSockets transport) Connecting.");let s;return this._accessTokenFactory&&(s=await this._accessTokenFactory()),new Promise((a,r)=>{e=e.replace(/^http/,"ws");let o;const i=this._httpClient.getCookieString(e);let d=!1;if(j.isNode||j.isReactNative){const c={},[n,f]=ve();c[n]=f,s&&(c[be.Authorization]=`Bearer ${s}`),i&&(c[be.Cookie]=i),o=new this._webSocketConstructor(e,void 0,{headers:{...c,...this._headers}})}else s&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(s)}`);o||(o=new this._webSocketConstructor(e)),t===re.Binary&&(o.binaryType="arraybuffer"),o.onopen=c=>{this._logger.log(g.Information,`WebSocket connected to ${e}.`),this._webSocket=o,d=!0,a()},o.onerror=c=>{let n=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?n=c.error:n="There was an error with the transport",this._logger.log(g.Information,`(WebSockets transport) ${n}.`)},o.onmessage=c=>{if(this._logger.log(g.Trace,`(WebSockets transport) data received. ${we(c.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(c.data)}catch(n){this._close(n);return}},o.onclose=c=>{if(d)this._close(c);else{let n=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?n=c.error:n="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",r(new Error(n))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(g.Trace,`(WebSockets transport) sending data. ${we(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(g.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const He=100;class Lt{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,q.isRequired(e,"url"),this._logger=ft(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let s=null,a=null;if(j.isNode&&typeof require<"u"){const r=typeof __webpack_require__=="function"?__non_webpack_require__:require;s=r("ws"),a=r("eventsource")}!j.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:j.isNode&&!t.WebSocket&&s&&(t.WebSocket=s),!j.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:j.isNode&&!t.EventSource&&typeof a<"u"&&(t.EventSource=a),this._httpClient=new Dt(t.httpClient||new St(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||re.Binary,q.isIn(e,re,"transferFormat"),this._logger.log(g.Debug,`Starting connection with transfer format '${re[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(g.Error,t),await this._stopPromise,Promise.reject(new de(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(g.Error,t),Promise.reject(new de(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new _e(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(g.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(g.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(g.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(g.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===X.WebSockets)this.transport=this._constructTransport(X.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let s=null,a=0;do{if(s=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new de("The connection was stopped during negotiation.");if(s.error)throw new Error(s.error);if(s.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(s.url&&(t=s.url),s.accessToken){const r=s.accessToken;this._accessTokenFactory=()=>r,this._httpClient._accessToken=r,this._httpClient._accessTokenFactory=void 0}a++}while(s.url&&a<He);if(a===He&&s.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,s,e)}this.transport instanceof Ke&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(g.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(s){return this._logger.log(g.Error,"Failed to start the connection: "+s),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(s)}}async _getNegotiationResponse(e){const t={},[s,a]=ve();t[s]=a;const r=this._resolveNegotiateUrl(e);this._logger.log(g.Debug,`Sending negotiation request: ${r}.`);try{const o=await this._httpClient.post(r,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(o.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${o.statusCode}'`));const i=JSON.parse(o.content);return(!i.negotiateVersion||i.negotiateVersion<1)&&(i.connectionToken=i.connectionId),i.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new Ue("Client didn't negotiate Stateful Reconnect but the server did.")):i}catch(o){let i="Failed to complete negotiation with the server: "+o;return o instanceof fe&&o.statusCode===404&&(i=i+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(g.Error,i),Promise.reject(new Ue(i))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,s,a){let r=this._createConnectUrl(e,s.connectionToken);if(this._isITransport(t)){this._logger.log(g.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(r,a),this.connectionId=s.connectionId;return}const o=[],i=s.availableTransports||[];let d=s;for(const c of i){const n=this._resolveTransportOrError(c,t,a,(d==null?void 0:d.useStatefulReconnect)===!0);if(n instanceof Error)o.push(`${c.transport} failed:`),o.push(n);else if(this._isITransport(n)){if(this.transport=n,!d){try{d=await this._getNegotiationResponse(e)}catch(f){return Promise.reject(f)}r=this._createConnectUrl(e,d.connectionToken)}try{await this._startTransport(r,a),this.connectionId=d.connectionId;return}catch(f){if(this._logger.log(g.Error,`Failed to start the transport '${c.transport}': ${f}`),d=void 0,o.push(new pt(`${c.transport} failed: ${f}`,X[c.transport])),this._connectionState!=="Connecting"){const x="Failed to select transport before stop() was called.";return this._logger.log(g.Debug,x),Promise.reject(new de(x))}}}}return o.length>0?Promise.reject(new ut(`Unable to connect to the server with any of the available transports. ${o.join(" ")}`,o)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case X.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new Mt(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case X.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new _t(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case X.LongPolling:return new Ke(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async s=>{let a=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{a=!0}else{this._stopConnection(s);return}a&&this._stopConnection(s)}:this.transport.onclose=s=>this._stopConnection(s),this.transport.connect(e,t)}_resolveTransportOrError(e,t,s,a){const r=X[e.transport];if(r==null)return this._logger.log(g.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Ot(t,r))if(e.transferFormats.map(i=>re[i]).indexOf(s)>=0){if(r===X.WebSockets&&!this._options.WebSocket||r===X.ServerSentEvents&&!this._options.EventSource)return this._logger.log(g.Debug,`Skipping transport '${X[r]}' because it is not supported in your environment.'`),new dt(`'${X[r]}' is not supported in your environment.`,r);this._logger.log(g.Debug,`Selecting transport '${X[r]}'.`);try{return this.features.reconnect=r===X.WebSockets?a:void 0,this._constructTransport(r)}catch(i){return i}}else return this._logger.log(g.Debug,`Skipping transport '${X[r]}' because it does not support the requested transfer format '${re[s]}'.`),new Error(`'${X[r]}' does not support ${re[s]}.`);else return this._logger.log(g.Debug,`Skipping transport '${X[r]}' because it was disabled by the client.`),new ct(`'${X[r]}' is disabled by the client.`,r)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(g.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(g.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(g.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(g.Error,`Connection disconnected with error '${e}'.`):this._logger.log(g.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(g.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(g.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!j.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(g.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const s=new URLSearchParams(t.searchParams);return s.has("negotiateVersion")||s.append("negotiateVersion",this._negotiateVersion.toString()),s.has("useStatefulReconnect")?s.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&s.append("useStatefulReconnect","true"),t.search=s.toString(),t.toString()}}function Ot(l,e){return!l||(e&l)!==0}class _e{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new ke,this._transportResult=new ke,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new ke),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new ke;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):_e._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(s){e.reject(s)}}}static _concatBuffers(e){const t=e.map(r=>r.byteLength).reduce((r,o)=>r+o),s=new Uint8Array(t);let a=0;for(const r of e)s.set(new Uint8Array(r),a),a+=r.byteLength;return s.buffer}}class ke{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const Ft="json";class Ut{constructor(){this.name=Ft,this.version=2,this.transferFormat=re.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=ye.instance);const s=oe.parse(e),a=[];for(const r of s){const o=JSON.parse(r);if(typeof o.type!="number")throw new Error("Invalid payload.");switch(o.type){case C.Invocation:this._isInvocationMessage(o);break;case C.StreamItem:this._isStreamItemMessage(o);break;case C.Completion:this._isCompletionMessage(o);break;case C.Ping:break;case C.Close:break;case C.Ack:this._isAckMessage(o);break;case C.Sequence:this._isSequenceMessage(o);break;default:t.log(g.Information,"Unknown message type '"+o.type+"' ignored.");continue}a.push(o)}return a}writeMessage(e){return oe.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const jt={trace:g.Trace,debug:g.Debug,info:g.Information,information:g.Information,warn:g.Warning,warning:g.Warning,error:g.Error,critical:g.Critical,none:g.None};function Vt(l){const e=jt[l.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${l}`)}class Kt{configureLogging(e){if(q.isRequired(e,"logging"),Ht(e))this.logger=e;else if(typeof e=="string"){const t=Vt(e);this.logger=new Ee(t)}else this.logger=new Ee(e);return this}withUrl(e,t){return q.isRequired(e,"url"),q.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return q.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new Ve(e):this.reconnectPolicy=e:this.reconnectPolicy=new Ve,this}withServerTimeout(e){return q.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return q.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new Lt(this.url,e);return Be.create(t,this.logger||ye.instance,this.protocol||new Ut,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Ht(l){return l.log!==void 0}class Wt{constructor(){b(this,"hubConnection",null);b(this,"isConnected",!1);b(this,"reconnectAttempts",0);b(this,"maxReconnectAttempts",10);b(this,"statusListeners",[]);b(this,"trackingListeners",[]);b(this,"farmerOrderListeners",[]);b(this,"deliveryConfirmedListeners",[]);b(this,"pollingIntervals",new Map);b(this,"pollingCallback",null)}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Kt().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect({nextRetryDelayInMilliseconds:t=>Math.min(1e3*Math.pow(2,t.previousRetryCount),3e4)}).configureLogging(g.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{const s={orderId:t.orderId,status:t.status,message:t.message,timestamp:new Date().toISOString()};this.statusListeners.forEach(a=>a(t.orderId,t.status,t.message)),this.trackingListeners.forEach(a=>a(s))}),this.hubConnection.on("NewOrderForFarmer",t=>{this.farmerOrderListeners.forEach(s=>s(t.orderId,t.productName,t.qtyKg))}),this.hubConnection.on("DeliveryConfirmed",t=>{this.deliveryConfirmedListeners.forEach(s=>s(t.orderId,t.farmerCut,t.driverCut))}),this.hubConnection.on("DriverLocationUpdate",t=>{const s={orderId:t.orderId,status:"PickedUp",message:`Driver is ${t.estimatedMinutes} minutes away`,gpsLat:t.lat,gpsLng:t.lng,estimatedArrivalMin:t.estimatedMinutes,timestamp:new Date().toISOString()};this.trackingListeners.forEach(a=>a(s))}),this.hubConnection.onreconnecting(()=>{this.isConnected=!1,this.reconnectAttempts++,console.log(`SignalR reconnecting (attempt ${this.reconnectAttempts})...`)}),this.hubConnection.onreconnected(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR reconnected successfully"),this.stopAllPolling()}),this.hubConnection.onclose(()=>{this.isConnected=!1,console.log("SignalR connection closed. Activating polling fallback."),this.activatePollingFallback()}),this.hubConnection.start().then(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection failed — using polling fallback",t),this.activatePollingFallback()})}catch{console.log("SignalR unavailable — running in polling mode"),this.activatePollingFallback()}}stopConnection(){this.stopAllPolling(),this.hubConnection&&(this.hubConnection.stop(),this.hubConnection=null,this.isConnected=!1)}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}leaveOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("LeaveOrder",e).catch(console.error),this.stopPollingForOrder(e)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}onOrderTracking(e){return this.trackingListeners.push(e),()=>{this.trackingListeners=this.trackingListeners.filter(t=>t!==e)}}onNewFarmerOrder(e){return this.farmerOrderListeners.push(e),()=>{this.farmerOrderListeners=this.farmerOrderListeners.filter(t=>t!==e)}}onDeliveryConfirmed(e){return this.deliveryConfirmedListeners.push(e),()=>{this.deliveryConfirmedListeners=this.deliveryConfirmedListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,s){this.statusListeners.forEach(a=>a(e,t,s)),this.trackingListeners.forEach(a=>a({orderId:e,status:t,message:s,timestamp:new Date().toISOString()}))}setPollingCallback(e){this.pollingCallback=e}startPollingForOrder(e,t=15e3){if(this.pollingIntervals.has(e))return;const s=setInterval(async()=>{this.pollingCallback&&await this.pollingCallback(e)},t);this.pollingIntervals.set(e,s)}stopPollingForOrder(e){const t=this.pollingIntervals.get(e);t&&(clearInterval(t),this.pollingIntervals.delete(e))}stopAllPolling(){this.pollingIntervals.forEach(e=>clearInterval(e)),this.pollingIntervals.clear()}activatePollingFallback(){}getConnectionState(){return this.isConnected?"connected":this.reconnectAttempts>0&&this.reconnectAttempts<this.maxReconnectAttempts?"reconnecting":this.pollingIntervals.size>0?"polling":"disconnected"}}const pe=new Wt;class Gt{constructor(){b(this,"token",localStorage.getItem("token")||null);b(this,"currentUser",this.loadStoredUser());b(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);b(this,"listeners",[]);b(this,"impersonationOriginalUser",null);b(this,"listings",[]);b(this,"orders",[]);b(this,"notifications",[]);b(this,"standingOrders",[]);b(this,"anomalyAlerts",[]);b(this,"kycQueue",[]);b(this,"verificationQueue",[]);b(this,"agentRegisteredFarmers",[]);b(this,"regionalAnalytics",[]);b(this,"priceBenchmarks",[]);b(this,"offlineQueue",[]);b(this,"isOfflineMode",!1);b(this,"banners",[]);b(this,"accountData",{addresses:[],paymentMethods:[],coupons:[],notificationPreferences:[],sessions:[],twoFactor:null});b(this,"deletedUserIds",this.loadDeletedUsers());b(this,"allUsers",[]);b(this,"platformConfig",{farmerSharePercent:90,driverSharePercent:5,platformFeePercent:5,withholdingTaxPercent:2,vatOnCommissionPercent:15,highValuePayoutThresholdEtb:5e4,emergencyEscrowFrozen:!1,telebirrAppId:"",telebirrShortCode:"",telebirrApiKey:"",telebirrEscrowVaultKey:"",twilioAccountSid:"",twilioAuthToken:"",twilioFromNumber:"",mapsGeocodingApiKey:"",postgisSpatialIndexEnabled:!0});b(this,"systemAuditLogs",[]);b(this,"deliveryZones",[]);b(this,"featureFlags",[]);b(this,"payoutApprovals",[]);b(this,"globalBusinessRules",{minOrderKg:10,maxOrderKg:5e4,maxDistanceKm:450,priceFloorVariancePercent:-30,priceCeilingVariancePercent:250,requireFaydaForOrdersAboveKg:500,autoArbitrateAfterHours:48});b(this,"blacklist",[]);b(this,"farmerSummary",{totalEarnedEtb:48200,pendingEscrowEtb:14850,releasedEtb:48200,completedOrdersCount:18,pendingOrdersCount:1,totalWithholdingTaxPaidEtb:964});b(this,"driverSummary",{totalEarnedEtb:6450,pendingEtb:825,deliveredTripsCount:14,ruralBonusEtb:1250});b(this,"platformStats",{totalUsers:6,totalFarmers:3,totalBuyers:1,totalDrivers:1,totalListings:6,totalOrders:3,totalTransactionVolumeEtb:34500,totalPlatformCommissionEtb:1725,activeEscrowHeldEtb:25500,disputedOrdersCount:1,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:258.75,totalWithholdingReportedEtb:690});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}loadDeletedUsers(){try{const e=localStorage.getItem("farmerMarketDeletedUsers");if(e){const t=JSON.parse(e);if(Array.isArray(t))return new Set(t.map(s=>String(s).toLowerCase().replace(/\s+/g,"")))}}catch(e){console.warn("Failed to load deleted users list",e)}return new Set}saveDeletedUsers(){try{localStorage.setItem("farmerMarketDeletedUsers",JSON.stringify(Array.from(this.deletedUserIds)))}catch(e){console.warn("Failed to save deleted users list",e)}}isDeletedUser(e,t){if(e&&this.deletedUserIds.has(e.toLowerCase()))return!0;if(t){const s=t.toLowerCase().replace(/\s+/g,"");if(this.deletedUserIds.has(s))return!0;const a=s.replace(/\D/g,"");if(a&&this.deletedUserIds.has(a))return!0}return!1}async init(){this.loadOfflineQueue(),this.initDefaultData(),this.token&&await this.fetchMe(),await this.refreshAllData(),this.token&&await this.fetchAccountData()}initDefaultData(){this.priceBenchmarks=[{cropName:"Fresh Sholla Red Tomatoes",cropNameAm:"ቀይ ቲማቲም",marketName:"Merkato Wholesale / Sholla",minPriceEtb:38,avgPriceEtb:45,maxPriceEtb:52,trend:"Down",lastUpdated:"Today 6:00 AM"},{cropName:"Organic Magna White Teff",cropNameAm:"የማኛ ነጭ ጤፍ",marketName:"EABC / Addis Depot",minPriceEtb:108,avgPriceEtb:115,maxPriceEtb:125,trend:"Up",lastUpdated:"Today 7:30 AM"},{cropName:"Awash Valley Red Onions",cropNameAm:"ቀይ ሽንኩርት",marketName:"Adama Wholesale Market",minPriceEtb:48,avgPriceEtb:55,maxPriceEtb:62,trend:"Stable",lastUpdated:"Today 6:15 AM"},{cropName:"Hawassa Hass Avocados",cropNameAm:"ሀስ አቮካዶ",marketName:"Hawassa Central / Merkato",minPriceEtb:50,avgPriceEtb:60,maxPriceEtb:72,trend:"Up",lastUpdated:"Today 8:00 AM"},{cropName:"Specialty Green Coffee Beans",cropNameAm:"ስፔሻሊቲ ቡና",marketName:"ECX Central Exchange",minPriceEtb:340,avgPriceEtb:380,maxPriceEtb:420,trend:"Up",lastUpdated:"Yesterday"},{cropName:"Bishoftu Sweet Strawberries",cropNameAm:"የቢሾፍቱ እንጆሪ",marketName:"Bole Fresh Produce Hub",minPriceEtb:85,avgPriceEtb:95,maxPriceEtb:110,trend:"Stable",lastUpdated:"Today 7:00 AM"}],this.standingOrders=[{id:"so-1",listingId:"a1b2c3d4-0001-0000-0000-000000000001",productName:"Fresh Sholla Red Tomatoes",productNameAm:"የሾላ ቀይ ቲማቲም",farmerName:"Abebe Bekele",qtyKg:150,pricePerKg:45,frequency:"Weekly",nextDeliveryDate:"Next Monday, 8:00 AM",active:!0,createdAt:new Date().toISOString()},{id:"so-2",listingId:"a1b2c3d4-0003-0000-0000-000000000003",productName:"Awash Valley Red Onions",productNameAm:"የአዋሽ ቀይ ሽንኩርት",farmerName:"Abebe Bekele",qtyKg:200,pricePerKg:55,frequency:"Bi-Weekly",nextDeliveryDate:"Next Thursday, 9:00 AM",active:!0,createdAt:new Date().toISOString()}],this.anomalyAlerts=[{id:"ANOM-101",severity:"High",type:"PriceManipulation",title:"Unusual Price Spike Detected",description:"Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",entityType:"Listing",entityId:"a1b2c3d4-0001-0000-0000-000000000001",detectedAt:"35 mins ago"},{id:"ANOM-102",severity:"Medium",type:"DuplicateProofPhoto",title:"Driver Proof Image Hash Match",description:"Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",entityType:"Order",entityId:"b1b2c3d4-0002-0000-0000-000000000002",detectedAt:"2 hours ago"},{id:"ANOM-103",severity:"Low",type:"FakeAccount",title:"Rapid Registration Cluster",description:"Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",entityType:"User",entityId:"44444444-4444-4444-4444-444444444444",detectedAt:"5 hours ago"}],this.kycQueue=[{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede (Driver)",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",documentType:"Commercial Vehicle Logbook & License",documentNumber:"ET-LOG-5T-98214",tinNumber:"TIN-DRV-981244",kycTier:3,status:"Pending",submittedAt:"Yesterday"},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele (Farmer)",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",documentType:"National ID (Fayda)",documentNumber:"FAYDA-ET-8829104",tinNumber:"TIN-FARM-882910",kycTier:2,status:"Verified",submittedAt:"3 days ago"},{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu (Farmer)",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",documentType:"National ID (Fayda)",documentNumber:"FAN-8812-4091-2810",tinNumber:"0099881122",kycTier:2,status:"Pending",submittedAt:"1 day ago"},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu (Farmer)",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",documentType:"Kebele Smallholder ID",documentNumber:"HAW-KEB-4410",kycTier:1,status:"Pending",submittedAt:"12 hours ago"}],this.verificationQueue=[{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu",userNameAm:"ግርማ ወንዲሙ",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",registrationMethod:"Agent",registeredByAgentName:"Kassahun Tolessa (Field Agent)",verificationStatus:"UnderReview",tinNumber:"0099881122",registeredAt:"Yesterday 4:15 PM",documents:[{id:"doc-1",userId:"88888888-8888-8888-8888-888888888888",documentType:"FaydaId",documentNumber:"FAN-8812-4091-2810",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"},{id:"doc-2",userId:"88888888-8888-8888-8888-888888888888",documentType:"TinCertificate",documentNumber:"0099881122",frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"}],reviews:[]},{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede",userNameAm:"ዳዊት ከበደ",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:"TIN-DRV-981244",registeredAt:"2 days ago",documents:[{id:"doc-3",userId:"55555555-5555-5555-5555-555555555555",documentType:"VehicleLogbook",documentNumber:"ET-LOG-5T-98214",frontImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"2 days ago"}],reviews:[]},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu",userNameAm:"ጫላ ገመቹ",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",registrationMethod:"Self",verificationStatus:"UnderReview",registeredAt:"3 days ago",documents:[{id:"doc-4",userId:"33333333-3333-3333-3333-333333333333",documentType:"KebeleId",documentNumber:"HAW-KEB-4410",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"3 days ago"}],reviews:[]},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele",userNameAm:"አበበ በቀለ",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",registrationMethod:"Self",verificationStatus:"Approved",tinNumber:"TIN-FARM-882910",registeredAt:"1 month ago",documents:[{id:"doc-5",userId:"11111111-1111-1111-1111-111111111111",documentType:"FaydaId",documentNumber:"FAYDA-ET-8829104",status:"Approved",submittedAt:"1 month ago"}],reviews:[{id:"rev-1",userId:"11111111-1111-1111-1111-111111111111",reviewerName:"Sara Mengistu",actionTaken:"Approved",notes:"National ID and Bishoftu farm registry confirmed.",timestamp:"1 month ago"}]}],this.agentRegisteredFarmers=[{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",kebele:"Ada'a Kebele 04",primaryCrop:"Magna Teff & Tomatoes",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",status:"UnderReview",registeredAt:"Yesterday 4:15 PM",faydaFrontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",status:"Approved",registeredAt:"5 days ago"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",status:"Approved",registeredAt:"1 week ago"}],this.regionalAnalytics=[{region:"Oromia (East Shewa / Bishoftu)",smallholdersCount:4200,volumeMetricTons:68.5,totalGmvEtb:385e4,topCrop:"Tomatoes & Onions"},{region:"Amhara (Debre Berhan / Gojjam)",smallholdersCount:3100,volumeMetricTons:42,totalGmvEtb:483e4,topCrop:"Magna White Teff"},{region:"Sidama (Hawassa / Yirgalem)",smallholdersCount:1950,volumeMetricTons:24.8,totalGmvEtb:1488e3,topCrop:"Hass Avocados & Fruits"},{region:"SNNPR (Gedeo / Yirgacheffe)",smallholdersCount:1400,volumeMetricTons:10.5,totalGmvEtb:399e4,topCrop:"Specialty Green Coffee"}],this.allUsers=[{id:"00000000-0000-0000-0000-000000000001",name:"Dr. Dawit Haile (Super Admin)",nameAm:"ዶ/ር ዳዊት ኃይሌ",phone:"+251900000001",role:"superadmin",region:"Addis Ababa (Headquarters)",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-01-01"},{id:"66666666-6666-6666-6666-666666666666",name:"Sara Mengistu (Marketplace Admin)",nameAm:"ሳራ መንግስቱ",phone:"+251900112233",role:"admin",region:"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",permissions:["users_manage","disputes_resolve","kyc_approve","sms_broadcast","reports_view"],createdAt:"2025-03-15"},{id:"77777777-7777-7777-7777-777777777777",name:"Kassahun Tolessa (Field Agent)",nameAm:"ካሳሁን ቶለሳ",phone:"+251988776655",role:"agent",region:"Oromia (East Shewa / Bishoftu)",verified:!0,verificationStatus:"Approved",status:"active",tinNumber:"TIN-AG-881920",createdAt:"2025-04-10"},{id:"11111111-1111-1111-1111-111111111111",name:"Abebe Bekele",nameAm:"አበበ በቀለ",phone:"+251911223344",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Fresh Sholla Tomatoes",faydaId:"FAN-1122-3344-5566",tinNumber:"0011223344",walletBalanceEtb:48200,createdAt:"2025-02-01"},{id:"22222222-2222-2222-2222-222222222222",name:"Almaz Tadesse",nameAm:"አልማዝ ታደሰ",phone:"+251922334455",role:"farmer",region:"Amhara (Debre Berhan / Basona)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Organic Magna White Teff",faydaId:"FAN-2233-4455-6677",tinNumber:"0022334455",walletBalanceEtb:62400,createdAt:"2025-02-15"},{id:"33333333-3333-3333-3333-333333333333",name:"Chala Gemechu",nameAm:"ጫላ ገመቹ",phone:"+251933445566",role:"farmer",region:"Sidama (Hawassa / Wondo Genet)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Hawassa Hass Avocados",faydaId:"FAN-3344-5566-7788",tinNumber:"0033445566",walletBalanceEtb:39100,createdAt:"2025-03-01"},{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!1,verificationStatus:"UnderReview",status:"active",primaryCrop:"Magna Teff",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",createdAt:"2026-08-20"},{id:"44444444-4444-4444-4444-444444444444",name:"Bethlehem Tsegaye",nameAm:"ቤተልሔም ፀጋዬ",phone:"+251912345678",role:"buyer",region:"Addis Ababa (Bole Sub-City)",verified:!0,verificationStatus:"Approved",status:"active",businessLicenseNumber:"BL-AA-998812",tinNumber:"0044556677",createdAt:"2025-01-20"},{id:"55555555-5555-5555-5555-555555555555",name:"Dawit Kebede (Freight Logistics)",nameAm:"ዳዊት ከበደ",phone:"+251977889900",role:"driver",region:"Addis Ababa / Oromia Freight Corridor",verified:!0,verificationStatus:"Approved",status:"active",vehicleType:"Isuzu 5-Ton Refrigerated",vehicleCapacityKg:5e3,refrigerationType:"Ventilated & Insulated",walletBalanceEtb:6450,createdAt:"2025-02-10"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",role:"farmer",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-04-12"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",role:"farmer",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-04-15"}];const e=localStorage.getItem("farmerMarketAllUsers");let t=[];if(e)try{const r=JSON.parse(e);Array.isArray(r)&&r.length>0&&(t=r)}catch(r){console.warn("Could not parse stored users, using default seed",r)}if(t.length>0){const r=[...this.allUsers],o=[...t];r.forEach(i=>{const d=i.phone.replace(/\s+/g,"");!this.isDeletedUser(i.id,d)&&!o.some(c=>c.id===i.id||c.phone.replace(/\s+/g,"")===d)&&o.push(i)}),this.allUsers=o.filter(i=>!this.isDeletedUser(i.id,i.phone))}else this.allUsers=this.allUsers.filter(r=>!this.isDeletedUser(r.id,r.phone));const s=[{id:"banner-01",title:"Fresh Harvest Direct From Bishoftu & Hawassa",titleAm:"የቢሾፍቱ እና የሀዋሳ አዳዲስ ምርቶች በቀጥታ ከእርሻ",subtitle:"Order Grade-A Teff, Organic Tomatoes & Hass Avocados directly from verified smallholder farmers with 100% Telebirr Escrow protection.",subtitleAm:"ከደላላ ጣልቃ ገብነት ነፃ የሆኑ ምርጥ የማኛ ጤፍ፣ የቢሾፍቱ ቀይ ቲማቲም እና ሀስ አቮካዶ በቴሌብር የዋስትና ክፍያ ያግኙ።",badgeText:"Harvest Season 2026",badgeTextAm:"የ2018 ምርት ወቅት",imageUrl:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",targetAudience:"Buyer",targetRegion:"All",ctaText:"Browse Marketplace",ctaTextAm:"ገበያውን ይመልከቱ",ctaLink:"marketplace",themeGradient:"from-emerald-900 via-teal-900 to-slate-900",priority:10,isActive:!0,createdAt:"2026-08-20",createdBy:"Dr. Dawit Haile (Super Admin)"},{id:"banner-02",title:"National Smallholder Fayda ID & TIN Onboarding",titleAm:"የአነስተኛ አርሶ አደሮች የፋይዳ (Fayda ID) እና TIN ምዝገባ",subtitle:"Verify your digital national ID to unlock instant 90% direct payouts, MOR tax withholding exemptions, and local extension agent farm visits.",subtitleAm:"ምርቶን በቀጥታ ለጅምላ ገዢዎች ለመሸጥ እና ክፍያ በቴሌብር ለመቀበል የፋይዳ መታወቂያዎን አሁኑኑ ያረጋግጡ።",badgeText:"Legal Compliance",badgeTextAm:"ህጋዊ ማረጋገጫ",imageUrl:"https://images.unsplash.com/photo-1592417817098-8f3d6910a711?auto=format&fit=crop&q=80&w=1200",targetAudience:"Farmer",targetRegion:"All",ctaText:"Verify Identity Now",ctaTextAm:"መታወቂያዎን ያረጋግጡ",ctaLink:"farmer",themeGradient:"from-blue-900 via-indigo-950 to-slate-900",priority:8,isActive:!0,createdAt:"2026-08-22",createdBy:"Sara Mengistu (Admin)"},{id:"banner-03",title:"Cold Chain Freight Route Subsidies: Modjo - Addis Corridor",titleAm:"የማቀዝቀዣ የጭነት ማጓጓዣ ድጋፍ፡ የሞጆ-አዲስ አበባ መስመር",subtitle:"Verified 5-ton & 10-ton refrigerated truck drivers earn guaranteed 5% escrow share with instant fuel advance and digital waybill tracking.",subtitleAm:"የተረጋገጡ የጭነት ሹፌሮች የ5% የዋስትና ክፍያ እና ዲጂታል የመንገድ ማረጋገጫ ወዲያውኑ ያገኛሉ።",badgeText:"Logistics Incentive",badgeTextAm:"የሎጂስቲክስ ማበረታቻ",imageUrl:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",targetAudience:"Driver",targetRegion:"Oromia",ctaText:"View Available Dispatches",ctaTextAm:"የተዘጋጁ ጭነቶችን ይመልከቱ",ctaLink:"driver",themeGradient:"from-amber-900 via-orange-950 to-slate-900",priority:7,isActive:!0,createdAt:"2026-08-25",createdBy:"Sara Mengistu (Admin)"}],a=localStorage.getItem("farmerMarketBanners");if(a)try{const r=JSON.parse(a);Array.isArray(r)&&r.length>0?this.banners=r:this.banners=s}catch{this.banners=s}else this.banners=s;this.systemAuditLogs=[{id:"log-101",actorId:"00000000-0000-0000-0000-000000000001",actorName:"Dr. Dawit Haile (Super Admin)",actorRole:"superadmin",action:"INITIALIZE_PLATFORM_GOVERNANCE",category:"CONFIG",targetResource:"PlatformConfig",targetId:"ESCROW-90-5-5",ipAddress:"196.188.12.45 (Addis Ababa, Ethio Telecom)",userAgent:"Antigravity/2.0 Web Admin Engine",details:"Established baseline 90/5/5 escrow split, 15% VAT on platform fee, and MOR withholding tax schedule.",timestamp:"2026-08-23 08:30 AM"},{id:"log-102",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"APPROVE_KYC_VERIFICATION",category:"USER_CRUD",targetResource:"UserDocument",targetId:"11111111-1111-1111-1111-111111111111",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Approved Abebe Bekele Fayda National ID (FAN-1122-3344-5566) and TIN (0011223344).",timestamp:"2026-08-23 10:15 AM"},{id:"log-103",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"DISPUTE_ARBITRATION_DECREE",category:"DISPUTE",targetResource:"Order",targetId:"ord-dispute-001",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Resolved moisture defect dispute with 50/50 partial split under EABC arbitration rules.",timestamp:"2026-08-23 11:45 AM"}],this.deliveryZones=[{id:"zone-1",name:"Oromia East Shewa Hub",nameAm:"ምስራቅ ሸዋ የግብርና ኮሪደር",centerLatitude:8.7522,centerLongitude:38.9785,baseRadiusKm:45,maxRadiusKm:120,ruralSubsidyEtb:150,active:!0,clusterHubName:"Bishoftu & Mojo Freight Terminal",smallholdersCount:4200},{id:"zone-2",name:"Addis Ababa Central Wholesale Depot",nameAm:"አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ",centerLatitude:9.0222,centerLongitude:38.7468,baseRadiusKm:25,maxRadiusKm:60,ruralSubsidyEtb:0,active:!0,clusterHubName:"Merkato & Jan Meda Distribution",smallholdersCount:850},{id:"zone-3",name:"Amhara Highland Grain Basin",nameAm:"የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ",centerLatitude:9.68,centerLongitude:39.53,baseRadiusKm:60,maxRadiusKm:180,ruralSubsidyEtb:250,active:!0,clusterHubName:"Debre Berhan & Shewa Robit Hub",smallholdersCount:3100},{id:"zone-4",name:"Sidama Rift Fruit & Vegetable Zone",nameAm:"የሲዳማ ፍራፍሬ እና አትክልት ዞን",centerLatitude:7.0504,centerLongitude:38.4955,baseRadiusKm:50,maxRadiusKm:150,ruralSubsidyEtb:200,active:!0,clusterHubName:"Hawassa Lakeview Terminal",smallholdersCount:1950},{id:"zone-5",name:"SNNPR Gedeo Specialty Coffee Zone",nameAm:"የጌዴኦ ስፔሻሊቲ ቡና ዞን",centerLatitude:6.1628,centerLongitude:38.2045,baseRadiusKm:40,maxRadiusKm:140,ruralSubsidyEtb:300,active:!0,clusterHubName:"Yirgacheffe Washing Station Depot",smallholdersCount:1400},{id:"zone-6",name:"Tigray Northern Transit Hub",nameAm:"የትግራይ ሰሜናዊ የንግድ ኮሪደር",centerLatitude:13.4967,centerLongitude:39.4753,baseRadiusKm:55,maxRadiusKm:160,ruralSubsidyEtb:350,active:!0,clusterHubName:"Mekelle Central Depot",smallholdersCount:1100}],this.featureFlags=[{key:"advance_harvest",name:"Advance Harvest Pre-Ordering",description:"Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","buyer","admin","superadmin"]},{key:"voice_note_transcription",name:"Voice Note Audio Memos & AI Transcription",description:"Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent","admin","superadmin"]},{key:"dynamic_price_benchmarking",name:"Real-time Wholesale Depot Price Benchmarking",description:"Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["buyer","farmer","superadmin"]},{key:"ussd_offline_gateway",name:"USSD Offline Gateway (*990# / *805#)",description:"Permits feature phone registration, balance checks, and SMS listing fallbacks.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent"]},{key:"multisig_escrow_protection",name:"High-Value Escrow Multi-Sig Authorization",description:"Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["admin","superadmin"]}],this.payoutApprovals=[{id:"payout-appr-001",recipientId:"22222222-2222-2222-2222-222222222222",recipientName:"Almaz Tadesse (Basona Teff Cooperative)",recipientPhone:"+251922334455",recipientRole:"farmer",amountEtb:62400,walletBalanceBefore:62400,riskScore:"Low",triggerReason:"Exceeds 50,000 ETB platform threshold (100 Quintals Teff Settlement)",status:"Pending",requestedAt:"Today 10:45 AM"},{id:"payout-appr-002",recipientId:"55555555-5555-5555-5555-555555555555",recipientName:"Dawit Kebede (Bulk Freight Fleet)",recipientPhone:"+251977889900",recipientRole:"driver",amountEtb:54200,walletBalanceBefore:54200,riskScore:"Medium",triggerReason:"High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips)",status:"Pending",requestedAt:"Today 01:20 PM"}],this.blacklist=[{id:"bl-01",type:"Phone",value:"+251911999888",reason:"Repeated fraudulent non-delivery claims in Adama market",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-15",active:!0},{id:"bl-02",type:"NationalId",value:"FAN-9999-0000-1111",reason:"Forged Kebele farming certification and duplicate TIN submission",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-18",active:!0}]}loadOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");e&&(this.offlineQueue=JSON.parse(e))}catch{this.offlineQueue=[]}}saveOfflineQueue(){localStorage.setItem("offlineQueue",JSON.stringify(this.offlineQueue))}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),s=t.verificationStatus||(t.verified?"Approved":"PendingSubmission"),a={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,email:t.email,languagePreference:t.languagePreference,savedDeliveryAddress:t.savedDeliveryAddress,defaultDeliveryLat:t.defaultDeliveryLat,defaultDeliveryLng:t.defaultDeliveryLng,role:(t.role||"buyer").toLowerCase(),region:t.region,verified:t.verified??s==="Approved",verificationStatus:s,rejectionReason:t.rejectionReason,tinNumber:t.tinNumber||(s==="Approved"&&t.role==="buyer"?"TIN-ET-9912001":void 0),businessLicenseNumber:t.businessLicenseNumber||(s==="Approved"?"MOT-LIC-2026-98124":void 0),vehicleType:t.vehicleType||(t.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:t.refrigerationType||(t.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:t.vehicleCapacityKg||(t.role==="driver"?5e3:void 0),kycDocumentType:t.kycDocumentType||(s==="Approved"?"National ID (Fayda)":void 0),kycDocumentNumber:t.kycDocumentNumber,kycStatus:s==="Approved"?"Verified":"Pending",kycTier:t.kycTier||2,repeatBuyerCount:t.repeatBuyerCount||(t.role==="farmer"?14:void 0),onTimeDeliveryRate:t.onTimeDeliveryRate||(t.role==="farmer"||t.role==="driver"?99:void 0),walletBalanceEtb:t.walletBalanceEtb??0,createdAt:t.createdAt};return this.currentUser=a,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(a)),this.notify(),a}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async updateProfile(e){if(!this.token)throw new Error("You must be signed in to update your profile.");const t=await fetch("/api/auth/profile",{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({Name:e.name,NameAm:e.nameAm||null,Region:e.region,Email:e.email||null,LanguagePreference:e.languagePreference||null,SavedDeliveryAddress:e.savedDeliveryAddress||null,DefaultDeliveryLat:e.defaultDeliveryLat??null,DefaultDeliveryLng:e.defaultDeliveryLng??null})}),s=await t.json().catch(()=>({}));if(!t.ok)throw new Error(s.error||"Could not save your profile.");return await this.fetchMe(),this.currentUser}async changePassword(e,t){if(!this.token)throw new Error("You must be signed in to change your password.");const s=await fetch("/api/auth/change-password",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({currentPassword:e,newPassword:t})}),a=await s.json().catch(()=>({}));if(!s.ok)throw new Error(a.error||"Could not change your password.")}async accountRequest(e,t){const s=await fetch(`/api/account/${e}`,{...t,headers:{...this.getAuthHeaders(),...(t==null?void 0:t.headers)||{}}}),a=await s.json().catch(()=>null);if(!s.ok)throw new Error((a==null?void 0:a.error)||"Account request failed.");return a}async fetchAccountData(){if(!this.token)return this.accountData;const[e,t,s,a,r,o]=await Promise.all([this.accountRequest("addresses"),this.accountRequest("payment-methods"),this.accountRequest("coupons"),this.accountRequest("notification-preferences"),this.accountRequest("sessions"),this.accountRequest("two-factor")]);return this.accountData={addresses:e,paymentMethods:t,coupons:s,notificationPreferences:a,sessions:r,twoFactor:o},this.accountData}getAccountData(){return this.accountData}async saveAddress(e){const t=await this.accountRequest("addresses",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateAddress(e,t){const s=await this.accountRequest(`addresses/${e}`,{method:"PUT",body:JSON.stringify(t)});return await this.fetchAccountData(),s}async deleteAddress(e){await this.accountRequest(`addresses/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async addPaymentMethod(e){const t=await this.accountRequest("payment-methods",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async setPrimaryPaymentMethod(e){await this.accountRequest(`payment-methods/${e}/primary`,{method:"PUT"}),await this.fetchAccountData()}async deletePaymentMethod(e){await this.accountRequest(`payment-methods/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async setNotificationPreference(e){const t=await this.accountRequest("notification-preferences",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateTwoFactor(e){const t=await this.accountRequest("two-factor",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async revokeOtherSessions(){await this.accountRequest("sessions/revoke-others",{method:"POST"}),await this.fetchAccountData()}async requestOtp(e){const t=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const s=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(s.ok)return await s.json();const a=this.allUsers.find(o=>o.phone.replace(/\s+/g,"")===t);if(a)return{demoCode:"888888",message:`Verification code dispatched via SMS simulator for ${a.name}.`,phone:t,userName:a.name,role:a.role};const r=await s.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(r.error||"Failed to request OTP. Please check your phone number.")}catch(s){const a=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===t);if(a)return{demoCode:"888888",message:`Verification code dispatched via SMS simulator for ${a.name}.`,phone:t,userName:a.name,role:a.role};throw s}}async verifyOtp(e,t){const s=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const r=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:s,code:t.trim()})});if(r.ok){const o=await r.json();this.token=o.token,localStorage.setItem("token",o.token);const i=o.user.verificationStatus||(o.user.verified?"Approved":"PendingSubmission"),d={id:o.user.id,phone:o.user.phone,name:o.user.name,nameAm:o.user.nameAm,role:(o.user.role||"buyer").toLowerCase(),region:o.user.region,verified:o.user.verified??i==="Approved",verificationStatus:i,rejectionReason:o.user.rejectionReason,tinNumber:o.user.tinNumber,businessLicenseNumber:o.user.businessLicenseNumber,vehicleType:o.user.vehicleType||(o.user.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:o.user.refrigerationType||(o.user.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:o.user.vehicleCapacityKg||(o.user.role==="driver"?5e3:void 0),kycDocumentType:o.user.kycDocumentType,kycDocumentNumber:o.user.kycDocumentNumber,kycStatus:i==="Approved"?"Verified":"Pending",kycTier:2,repeatBuyerCount:o.user.repeatBuyerCount||(o.user.role==="farmer"?14:void 0),onTimeDeliveryRate:o.user.onTimeDeliveryRate||(o.user.role==="farmer"||o.user.role==="driver"?99:void 0),walletBalanceEtb:o.user.walletBalanceEtb??0,createdAt:o.user.createdAt};return this.currentUser=d,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(d)),pe.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),d}}catch(r){console.warn("Network verifyOtp failed, checking local seed users",r)}const a=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===s);if(a)return this.currentUser=a,this.isUserLoggedIn=!0,this.token="demo-jwt-token-"+a.id,localStorage.setItem("token",this.token),localStorage.setItem("currentUser",JSON.stringify(a)),this.notify(),a;throw new Error("Invalid verification code or phone number.")}async registerUser(e,t,s,a,r){const o=s.startsWith("+251")?s.replace(/\s+/g,""):"+251"+s.replace(/^0+/,"").replace(/\s+/g,""),i=a.charAt(0).toUpperCase()+a.slice(1).toLowerCase();let d;try{const n=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,phone:o,role:i,region:r})});if(n.ok){const f=await n.json();this.token=f.token,localStorage.setItem("token",f.token),d={id:f.user.id,phone:f.user.phone,name:f.user.name,nameAm:f.user.nameAm,role:(f.user.role||"buyer").toLowerCase(),region:f.user.region,verified:!1,verificationStatus:"PendingSubmission",status:"active",tinNumber:void 0,businessLicenseNumber:void 0,vehicleType:a==="driver"?"Isuzu 5-Ton":void 0,refrigerationType:a==="driver"?"Ventilated":void 0,vehicleCapacityKg:a==="driver"?5e3:void 0,kycDocumentType:void 0,kycDocumentNumber:void 0,kycStatus:"Pending",kycTier:1,repeatBuyerCount:0,onTimeDeliveryRate:100,walletBalanceEtb:0,createdAt:f.user.createdAt||new Date().toISOString()}}else{const f=await n.json().catch(()=>({error:"Registration failed"}));throw new Error(f.error||"Registration failed")}}catch(n){console.warn("Backend register call fallback to local state",n),d={id:"user-"+Date.now(),phone:o,name:e,nameAm:t||e,role:a,region:r,verified:!1,verificationStatus:"PendingSubmission",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},this.token="demo-jwt-token-"+d.id,localStorage.setItem("token",this.token)}this.currentUser=d,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const c=this.allUsers.findIndex(n=>n.id===d.id||n.phone===d.phone);return c!==-1?this.allUsers[c]={...this.allUsers[c],...d}:this.allUsers.unshift(d),this.saveUsersToStorage(),this.addAuditLog({actorId:d.id,actorName:d.name,actorRole:d.role,action:"USER_REGISTRATION",category:"AUTH",targetResource:"User",targetId:d.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Self-registered new ${d.role.toUpperCase()} account: ${d.name} (${d.phone}) in ${d.region}.`}),pe.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(){try{const e=await fetch("/api/listings");if(e.ok){const t=await e.json(),s=Array.isArray(t)?t:t.items||[];return this.listings=s.map(a=>({id:a.id,farmerId:a.farmerId,farmerName:a.farmerName,farmerNameAm:a.farmerNameAm,farmerPhone:a.farmerPhone,region:a.region,productName:a.productName,nameAm:a.nameAm,category:a.category,qtyKg:Number(a.qtyKg),pricePerKg:Number(a.pricePerKg),minOrderKg:Number(a.minOrderKg),latitude:a.latitude,longitude:a.longitude,distanceKm:a.distanceKm,photos:a.photos&&a.photos.length>0?a.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:a.availableFrom||new Date().toISOString().split("T")[0],status:(a.status||"Active").toLowerCase(),grade:a.grade||"Grade 1",ripeness:a.ripeness||"Ready Today",isOrganic:a.isOrganic??!0,isAdvanceHarvest:a.isAdvanceHarvest??!1,expectedHarvestDate:a.expectedHarvestDate,voiceNoteUrl:a.voiceNoteUrl,voiceNoteTranscript:a.voiceNoteTranscript,marketBenchmarkPrice:a.marketBenchmarkPrice||a.pricePerKg,moderationStatus:a.moderationStatus||"Approved",farmerRating:a.farmerRating||4.9,reviewCount:a.reviewCount||14,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:a.createdAt})),this.notify(),this.listings}}catch(e){console.warn("Fetch listings from backend failed",e)}return this.listings}getListings(e,t,s,a,r,o,i,d){return this.listings.filter(c=>{if(c.status!=="active"||e&&e!=="All"&&c.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!c.region.toLowerCase().includes(t.toLowerCase())||r&&r!=="All"&&c.grade!==r||o&&o!=="All"&&c.ripeness!==o||i&&!c.isOrganic||d&&!c.isAdvanceHarvest||a&&c.distanceKm&&c.distanceKm>a)return!1;if(s){const n=s.toLowerCase();if(!(c.productName.toLowerCase().includes(n)||c.nameAm&&c.nameAm.includes(n)||c.farmerName.toLowerCase().includes(n)||c.region.toLowerCase().includes(n)))return!1}return!0})}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var a,r,o,i,d,c,n,f,x,k;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category||"Vegetables",qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate||null,voiceNoteUrl:e.voiceNoteUrl||null,voiceNoteTranscript:e.voiceNoteTranscript||null,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg};let s=null;try{const S=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(S.ok){const A=await S.json();s={id:A.id,farmerId:A.farmerId||((a=this.currentUser)==null?void 0:a.id)||"11111111-1111-1111-1111-111111111111",farmerName:A.farmerName||((r=this.currentUser)==null?void 0:r.name)||"Abebe Bekele",farmerNameAm:A.farmerNameAm||((o=this.currentUser)==null?void 0:o.nameAm),farmerPhone:A.farmerPhone||((i=this.currentUser)==null?void 0:i.phone)||"+251911223344",region:A.region||((d=this.currentUser)==null?void 0:d.region)||"Oromia (Bishoftu)",productName:A.productName,nameAm:A.nameAm,category:A.category,qtyKg:Number(A.qtyKg),pricePerKg:Number(A.pricePerKg),minOrderKg:Number(A.minOrderKg),latitude:A.latitude,longitude:A.longitude,distanceKm:A.distanceKm||45,photos:A.photos&&A.photos.length>0?A.photos:e.photos||["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:A.availableFrom,status:"active",grade:A.grade||e.grade||"Grade 1",ripeness:A.ripeness||e.ripeness||"Ready Today",isOrganic:A.isOrganic??e.isOrganic??!0,isAdvanceHarvest:A.isAdvanceHarvest??e.isAdvanceHarvest??!1,expectedHarvestDate:A.expectedHarvestDate||e.expectedHarvestDate,voiceNoteUrl:A.voiceNoteUrl||e.voiceNoteUrl,voiceNoteTranscript:A.voiceNoteTranscript||e.voiceNoteTranscript,marketBenchmarkPrice:A.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:A.createdAt||new Date().toISOString()}}}catch(S){console.warn("Create listing network call fallback to local state",S)}return s||(s={id:"list-local-"+Date.now(),farmerId:((c=this.currentUser)==null?void 0:c.id)||"11111111-1111-1111-1111-111111111111",farmerName:((n=this.currentUser)==null?void 0:n.name)||"Abebe Bekele",farmerNameAm:(f=this.currentUser)==null?void 0:f.nameAm,farmerPhone:((x=this.currentUser)==null?void 0:x.phone)||"+251911223344",region:((k=this.currentUser)==null?void 0:k.region)||"Oromia (Bishoftu)",productName:e.productName||"Fresh Farm Produce",nameAm:e.nameAm,category:e.category||"Vegetables",qtyKg:Number(e.qtyKg||1e3),pricePerKg:Number(e.pricePerKg||45),minOrderKg:Number(e.minOrderKg||100),latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,distanceKm:45,photos:e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],status:"active",grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate,voiceNoteUrl:e.voiceNoteUrl,voiceNoteTranscript:e.voiceNoteTranscript,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:new Date().toISOString()}),this.listings.unshift(s),this.notify(),s}async deleteListing(e){const t=await fetch(`/api/listings/${e}`,{method:"DELETE",headers:this.getAuthHeaders()}),s=await t.json().catch(()=>({}));if(!t.ok)throw new Error(s.error||"Could not delete the listing.");await this.fetchListings()}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(s=>{const a=Number(s.totalEtb),r=Number(s.farmerCut||a*.9),o=Number(s.driverCut||a*.05),i=Number(s.platformCut||a*.05),d=Math.round(a*.02),c=Math.round(i*.15);return{id:s.id,listingId:s.listingId,productName:s.productName,productNameAm:s.productNameAm,category:s.category,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,farmerRegion:s.farmerRegion,buyerId:s.buyerId,buyerName:s.buyerName,buyerPhone:s.buyerPhone,driverId:s.driverId,driverName:s.driverName,driverPhone:s.driverPhone,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),totalEtb:a,farmerCut:r,driverCut:o,platformCut:i,driverSubsidyEtb:Number(s.driverSubsidyEtb||150),withholdingTaxEtb:d,platformVatEtb:c,status:(s.status||"Pending").toLowerCase(),escrowHeld:s.escrowHeld,paymentRef:s.paymentRef||`TB-${s.id.slice(0,8).toUpperCase()}`,invoiceNumber:`ET-INV-2026-${s.id.slice(0,6).toUpperCase()}`,waybillNumber:`WB-FTA-${s.id.slice(0,6).toUpperCase()}`,contractNumber:`AGR-ET-${s.id.slice(0,6).toUpperCase()}`,arbitrationDecreeNumber:s.status==="disputed"?`ARB-DEC-${s.id.slice(0,6).toUpperCase()}`:void 0,pickupPhoto:s.pickupPhoto,deliveryPhoto:s.deliveryPhoto,deliveryGpsLat:s.deliveryGpsLat,deliveryGpsLng:s.deliveryGpsLng,deliveredAt:s.deliveredAt,deliveryAddress:s.deliveryAddress,deliveryNotes:s.deliveryNotes,disputeReason:s.disputeReason,disputePhoto:s.disputePhoto,requestedRefundPercent:s.requestedRefundPercent||100,disputeStatus:s.disputeStatus||"None",disputeResolutionNotes:s.disputeResolutionNotes,isRecurring:s.isRecurring||!1,recurringFrequency:s.recurringFrequency,confirmedAt:s.confirmedAt,createdAt:s.createdAt}}),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(s=>s.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(s=>s.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(s=>s.driverId===this.currentUser.id||s.status==="confirmed"&&!s.driverId):this.orders}async placeOrder(e,t,s,a=!1,r="Weekly",o){var c;if(!this.listings.find(n=>n.id===e))throw new Error("Listing not found");if(!(await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:s||((c=this.currentUser)==null?void 0:c.region)||"Addis Ababa (Bole)",paymentMethodId:o||null,isRecurring:a,recurringFrequency:a?r:null})})).ok)throw new Error("Failed to place order in database");return await this.fetchOrders(),await this.fetchListings(),this.orders[0]||this.orders.find(n=>n.listingId===e)}async confirmOrderByFarmer(e){await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders()}async pickupOrderByDriver(e,t){if(this.isOfflineMode){this.offlineQueue.push({id:"off-"+Date.now(),type:"pickup",orderId:e,timestamp:new Date().toISOString(),data:{photo:t},synced:!1}),this.saveOfflineQueue();const s=this.orders.find(a=>a.id===e);s&&(s.status="picked_up",s.pickupPhoto=t),this.notify();return}await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"})}),await this.fetchOrders()}async confirmDeliveryByBuyer(e,t,s,a){await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({deliveryPhoto:t||"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",deliveryGpsLat:s||9.03,deliveryGpsLng:a||38.74})}),await this.fetchOrders()}async disputeOrder(e,t,s,a=50){const r=await fetch(`/api/orders/${e}/dispute`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,disputePhoto:s||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",requestedRefundPercent:a})}),o=await r.json().catch(()=>({}));if(!r.ok)throw new Error(o.error||"Could not submit the dispute.");await this.fetchOrders()}async resolveDispute(e,t,s=50,a=50){const r=await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:`Arbitrated via Admin Console (${t})`,farmerSharePercent:s,buyerRefundPercent:a})}),o=await r.json().catch(()=>({}));if(!r.ok)throw new Error(o.error||"Could not resolve the dispute.");await this.fetchOrders()}getTaxInvoice(e){const t=this.orders.find(r=>r.id===e)||this.orders[0]||{id:e,productName:"Fresh Sholla Red Tomatoes",qtyKg:200,pricePerKg:45,totalEtb:9e3,farmerCut:8100,driverCut:450,platformCut:450,farmerName:"Abebe Bekele",farmerRegion:"Oromia (Bishoftu)",farmerPhone:"+251 911 223 344",buyerName:"Bethlehem Tilahun (FreshMart)",buyerPhone:"+251 955 667 788",paymentRef:"TB-TXN-98217391",invoiceNumber:"ET-INV-2026-001",createdAt:new Date().toISOString()},s=Math.round(t.platformCut*.15),a=Math.round(t.totalEtb*.02);return{invoiceNumber:t.invoiceNumber||`ET-INV-2026-${t.id.slice(0,6).toUpperCase()}`,orderId:t.id,issueDate:t.createdAt?new Date(t.createdAt).toLocaleDateString("en-GB"):new Date().toLocaleDateString("en-GB"),paymentRef:t.paymentRef||`TB-C2B-${t.id.slice(0,8).toUpperCase()}`,sellerName:t.farmerName,sellerTin:"TIN-FARM-8829104",sellerRegion:t.farmerRegion,sellerPhone:t.farmerPhone,sellerType:"Registered Agricultural Smallholder Producer",buyerName:t.buyerName,buyerTin:"TIN-ET-9912001",buyerRegion:"Addis Ababa (Bole)",buyerPhone:t.buyerPhone,productName:t.productName,productNameAm:t.productNameAm,grade:"Grade 1 (Certified Farm Standard)",qtyKg:t.qtyKg,unitPriceEtb:t.pricePerKg,grossAmountEtb:t.totalEtb,farmerPayoutEtb:t.farmerCut,driverFreightEtb:t.driverCut,platformServiceFeeEtb:t.platformCut,platformVatEtb:s,withholdingTaxEtb:a,totalPaidViaTelebirr:t.totalEtb,regulatoryAct:"Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)",qrVerificationCode:`ET-TAX-AUTH-2026-VERIFIED-${t.id.slice(0,8).toUpperCase()}`,isVatExemptAgriculturalGoods:!0}}getTransportWaybill(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{waybillNumber:(t==null?void 0:t.waybillNumber)||`WB-FTA-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,dispatchDate:new Date().toLocaleDateString("en-GB"),consignorName:(t==null?void 0:t.farmerName)||"Abebe Bekele",consignorFarmLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu Green Farms, Oromia",consignorPhone:(t==null?void 0:t.farmerPhone)||"+251 911 223 344",consigneeName:(t==null?void 0:t.buyerName)||"FreshMart Central Wholesale Hub",consigneeDepotAddress:(t==null?void 0:t.deliveryAddress)||"Bole Depot, Addis Ababa",consigneePhone:(t==null?void 0:t.buyerPhone)||"+251 955 667 788",carrierDriverName:(t==null?void 0:t.driverName)||"Dawit Kebede",driverLicenseNumber:"ET-CDL-COMM-89104",vehiclePlateNumber:"ET-3-B98124-AA",vehicleModel:"Isuzu 5-Ton Commercial Freight Carrier",refrigerationStatus:"Ventilated Agri-Body Cargo (18°C)",insurancePolicyNumber:"NIC-ET-CARGO-771920",cargoDescription:`${(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes"} (Grade 1)`,packageCount:Math.ceil(((t==null?void 0:t.qtyKg)||200)/25),netWeightKg:(t==null?void 0:t.qtyKg)||200,grossWeightKg:((t==null?void 0:t.qtyKg)||200)+18,tareWeightKg:18,temperatureLogCelsius:17.5,farmerHandoffTimestamp:"06:30 AM (Farm Gate)",driverSignatureRef:"DAWIT-KEBEDE-VERIFIED-LOG",buyerReceivedTimestamp:(t==null?void 0:t.status)==="delivered"?"09:45 AM (Bole Depot)":void 0,transitStatus:(t==null?void 0:t.status)==="delivered"?"DeliveredWithGPS":(t==null?void 0:t.status)==="picked_up"?"InTransit":"Dispatched"}}getLegalContract(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{contractNumber:(t==null?void 0:t.contractNumber)||`AGR-CONTR-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,agreementDate:new Date().toLocaleDateString("en-GB"),effectiveDate:new Date().toLocaleDateString("en-GB"),sellerName:(t==null?void 0:t.farmerName)||"Abebe Bekele",sellerIdNumber:"FAYDA-ET-8829104",sellerLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu, Oromia, Ethiopia",buyerName:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun (FreshMart Wholesale)",buyerTinNumber:"TIN-ET-9912001",buyerLocation:(t==null?void 0:t.deliveryAddress)||"Addis Ababa, Ethiopia",cropType:(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes",contractedQuantityKg:(t==null?void 0:t.qtyKg)||200,agreedPricePerKg:(t==null?void 0:t.pricePerKg)||45,totalContractValueEtb:(t==null?void 0:t.totalEtb)||9e3,qualityStandardClause:"Produce shall conform to Grade 1 Ethiopian Commodity Quality Standards (Maximum defect tolerance 2.5%, moisture within physiological thresholds).",deliveryTimeline:"Direct farm-to-depot transit guaranteed within 12 hours of farmer harvest confirmation.",escrowClauseText:"Purchase consideration is locked in Telebirr C2B Escrow and shall be automatically disbursed (90% Farmer / 5% Driver / 5% Platform) upon buyer delivery verification.",forceMajeureClauseText:"Neither party shall be liable for delivery failure caused by natural agricultural catastrophes, unseasonal frost, or national logistical force majeure.",disputeJurisdiction:"Federal Democratic Republic of Ethiopia Commercial Code and Ethiopian Agricultural Authority Arbitration Rules.",eSignatures:{sellerSigned:!0,sellerSignDate:"Digitally Authenticated via OTP/Fayda",buyerSigned:!0,buyerSignDate:"Digitally Authenticated via Telebirr Escrow Lock",platformWitnessHash:`EABC-FM-TRUST-SEAL-${e.slice(0,8).toUpperCase()}`}}}getDisputeMediationRecord(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{caseNumber:(t==null?void 0:t.arbitrationDecreeNumber)||`ARB-CASE-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,filingDate:"Yesterday 3:15 PM",resolutionDate:(t==null?void 0:t.status)==="disputed"?void 0:"Today 11:30 AM",status:(t==null?void 0:t.status)==="disputed"?"UnderInvestigation":"Settled",claimantBuyer:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun",respondentFarmer:(t==null?void 0:t.farmerName)||"Chala Gemechu",freightCarrier:(t==null?void 0:t.driverName)||"Dawit Kebede",totalDisputedAmountEtb:(t==null?void 0:t.totalEtb)||9e3,disputeReason:(t==null?void 0:t.disputeReason)||"Delivered avocados were overripe and 20% bruised during transit from Hawassa.",claimedDefectPercentage:(t==null?void 0:t.requestedRefundPercent)||50,inspectionReport:"Independent physical inspection at Bole Cold Storage Depot confirmed 18.5% transit softening on batch packaging.",photoEvidenceUrl:(t==null?void 0:t.disputePhoto)||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",leadArbitratorName:"Sara Mengistu (Marketplace Compliance Arbitrator)",legalFindingSummary:"Partial packaging failure during transit. Fair 50/50 equitable split awarded under Ethiopian Commercial Code Art. 2289.",arbitrationVerdict:"FiftyFiftySplit",farmerSettlementEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),buyerRefundEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),platformDecreeHash:`LEGAL-DECREE-ARB-${e.slice(0,8).toUpperCase()}`}}getPriceBenchmarks(){return this.priceBenchmarks}getStandingOrders(){return this.standingOrders}addStandingOrder(e,t,s){const a=this.listings.find(o=>o.id===e),r={id:"so-"+Date.now(),listingId:e,productName:(a==null?void 0:a.productName)||"Fresh Produce",productNameAm:a==null?void 0:a.nameAm,farmerName:(a==null?void 0:a.farmerName)||"Abebe Bekele",qtyKg:t,pricePerKg:(a==null?void 0:a.pricePerKg)||45,frequency:s,nextDeliveryDate:s==="Weekly"?"Next Monday, 8:00 AM":"Every 2nd Thursday",active:!0,createdAt:new Date().toISOString()};return this.standingOrders.unshift(r),this.notify(),r}toggleStandingOrder(e){const t=this.standingOrders.find(s=>s.id===e);t&&(t.active=!t.active,this.notify())}getKycQueue(){return this.kycQueue}async verifyKyc(e,t){const s=this.kycQueue.find(a=>a.userId===e);if(s){s.status=t?"Verified":"Rejected";try{await fetch(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${s.status}`,{method:"PUT",headers:this.getAuthHeaders()})}catch(a){console.warn("KYC update remote failed, updating local state",a)}this.notify()}}getAnomalyAlerts(){return this.anomalyAlerts}getRegionalAnalytics(){return this.regionalAnalytics}getOptimizedRoute(){return{id:"route-oromia-addis-01",title:"Consolidated East Shewa Multi-Farm Route",totalDistanceKm:68.4,estimatedHours:2.5,totalWeightKg:2800,driverCommissionEtb:1450,ruralSubsidyEtb:350,stops:[{stopNumber:1,type:"pickup",locationName:"Bishoftu Green Farms (Abebe Bekele)",contactName:"Abebe Bekele",phone:"+251 911 223 344",cargoDetails:"Fresh Sholla Red Tomatoes",weightKg:1200,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Valley Farm (Almaz Hailu)",contactName:"Almaz Hailu",phone:"+251 922 334 455",cargoDetails:"Awash Valley Red Onions",weightKg:1600,completed:!1},{stopNumber:3,type:"dropoff",locationName:"FreshMart Central Wholesale Hub (Bole, Addis Ababa)",contactName:"Bethlehem Tilahun",phone:"+251 955 667 788",cargoDetails:"Consolidated Wholesale Dropoff (2,800 kg total)",weightKg:2800,completed:!1}]}}updateDriverVehicle(e,t,s){this.currentUser&&this.currentUser.role==="driver"&&(this.currentUser.vehicleType=e,this.currentUser.refrigerationType=t,this.currentUser.vehicleCapacityKg=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify())}toggleOfflineMode(){return this.isOfflineMode=!this.isOfflineMode,this.notify(),this.isOfflineMode}getIsOfflineMode(){return this.isOfflineMode}getOfflineQueue(){return this.offlineQueue}async syncOfflineQueue(){var s;const e=this.offlineQueue.filter(a=>!a.synced);for(const a of e)a.type==="pickup"&&await this.pickupOrderByDriver(a.orderId,(s=a.data)==null?void 0:s.photo),a.synced=!0;const t=e.length;return this.offlineQueue=[],this.saveOfflineQueue(),this.notify(),t}async sendInboundSms(e,t){try{const s=await fetch("/api/sms/inbound",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:e,body:t})});if(s.ok){const a=await s.json();return await this.refreshAllData(),a.response}}catch(s){console.warn("SMS Webhook call failed, simulating response",s)}return`[SIMULATED SMS ACK] Received: "${t}". Processed successfully in offline cache.`}simulateVoiceTranscription(e,t){return t==="am"?{productName:"Fresh Sholla Red Tomatoes",nameAm:"የሾላ ቀይ ቲማቲም",category:"Vegetables",qtyKg:1500,pricePerKg:45,region:"Oromia (Bishoftu)",transcript:"1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"}:t==="om"?{productName:"Awash Red Onions",nameAm:"የአዋሽ ቀይ ሽንኩርት",category:"Vegetables",qtyKg:2e3,pricePerKg:55,region:"Oromia (Adama)",transcript:"Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."}:{productName:"Grade 1 Specialty Green Coffee",nameAm:"የይርጋጨፌ ስፔሻሊቲ ቡና",category:"Coffee",qtyKg:800,pricePerKg:380,region:"SNNPR (Yirgacheffe)",transcript:"We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."}}requestWalletWithdrawal(e,t){return this.currentUser?(this.currentUser.walletBalanceEtb=Math.max(0,(this.currentUser.walletBalanceEtb||48200)-e),this.farmerSummary.releasedEtb+=e,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify(),!0):!1}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round(Number(t.totalEarnedEtb)*.02)}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount,ruralBonusEtb:1250}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount,totalMetricTonsMoved:Number(t.totalMetricTonsMoved||145.8),middlemanMarginSavedEtb:Number(t.middlemanMarginSavedEtb||48e4),totalVatRemittedEtb:Number(t.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:Number(t.totalTransactionVolumeEtb)*.02}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(a=>{var r;return a.farmerId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.farmerCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:s||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(a=>a.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round((t||this.farmerSummary.totalEarnedEtb)*.02)}}getDriverSummary(){const e=this.orders.filter(a=>{var r;return a.driverId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.driverCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:s||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(a=>a.status==="delivered").length||this.driverSummary.deliveredTripsCount,ruralBonusEtb:1250}}getPlatformStats(){const e=this.orders.reduce((r,o)=>r+o.totalEtb,0),t=this.orders.filter(r=>r.status==="delivered").reduce((r,o)=>r+o.platformCut,0),s=this.orders.filter(r=>r.escrowHeld).reduce((r,o)=>r+o.totalEtb,0),a=this.orders.filter(r=>r.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:s||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:a||this.platformStats.disputedOrdersCount,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:(t||this.platformStats.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:(e||this.platformStats.totalTransactionVolumeEtb)*.02}}getNotifications(){return!this.isUserLoggedIn||!this.currentUser?[]:this.notifications.filter(e=>e.userId===this.currentUser.id||this.currentUser.role==="admin")}async broadcastSms(e,t,s){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:s})})}catch(a){console.warn("Broadcast SMS API call error",a)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${s.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${s}] ${t}`,read:!1,createdAt:new Date().toISOString()}),this.notify())}async submitVerificationDocuments(e,t){if(this.currentUser){this.currentUser.tinNumber=e,this.currentUser.verificationStatus="UnderReview",this.currentUser.rejectionReason=void 0;const s=t.map((o,i)=>({id:"doc-self-"+i+"-"+Date.now(),userId:this.currentUser.id,documentType:o.documentType,documentNumber:o.documentNumber,frontImageUrl:o.frontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:o.backImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}));this.currentUser.documents=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const a={userId:this.currentUser.id,userName:this.currentUser.name,userNameAm:this.currentUser.nameAm,userRole:this.currentUser.role.charAt(0).toUpperCase()+this.currentUser.role.slice(1),phone:this.currentUser.phone,region:this.currentUser.region,registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:e,registeredAt:"Just now",documents:s,reviews:[]},r=this.verificationQueue.findIndex(o=>o.userId===this.currentUser.id);r>=0?this.verificationQueue[r]=a:this.verificationQueue.unshift(a)}try{await fetch("/api/verification/submit",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({tinNumber:e,documents:t})})}catch(s){console.warn("Backend verification submit fallback to local state",s)}this.notify()}async agentRegisterFarmer(e){var d,c,n,f;const t=e.phone.startsWith("+251")?e.phone:"+251"+e.phone.replace(/^0+/,""),s="agent-f-"+Date.now(),a={id:s,name:e.name,nameAm:e.nameAm||e.name,phone:t,region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,status:"UnderReview",registeredAt:"Just now",faydaFrontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"};this.agentRegisteredFarmers.unshift(a);const r={userId:s,userName:e.name,userNameAm:e.nameAm,userRole:"Farmer",phone:t,region:e.region,registrationMethod:"Agent",registeredByAgentName:((d=this.currentUser)==null?void 0:d.name)||"Community Field Agent",verificationStatus:"UnderReview",tinNumber:e.tinNumber,registeredAt:"Just now",documents:[{id:"doc-ag-1-"+Date.now(),userId:s,documentType:"FaydaId",documentNumber:e.faydaId||"FAN-PENDING",frontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:e.faydaBackImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}],reviews:[]};this.verificationQueue.unshift(r);const o={id:s,name:e.name,nameAm:e.nameAm||e.name,phone:t,role:"farmer",region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,verified:!1,verificationStatus:"UnderReview",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},i=this.allUsers.findIndex(x=>x.id===s||x.phone===t);i!==-1?this.allUsers[i]={...this.allUsers[i],...o}:this.allUsers.unshift(o),this.saveUsersToStorage(),this.addAuditLog({actorId:((c=this.currentUser)==null?void 0:c.id)||"agent-01",actorName:((n=this.currentUser)==null?void 0:n.name)||"Field Agent",actorRole:((f=this.currentUser)==null?void 0:f.role)||"agent",action:"AGENT_ONBOARD_FARMER",category:"USER_CRUD",targetResource:"User",targetId:s,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Field agent onboarded farmer: ${e.name} (${t}) in ${e.region}.`});try{await fetch("/api/verification/agent-register",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(e)})}catch(x){console.warn("Agent register farmer fallback to local state",x)}return this.notify(),a}async reviewVerification(e,t,s,a){var i;const r=this.verificationQueue.find(d=>d.userId===e);r&&(r.verificationStatus=t==="Approve"?"Approved":"Rejected",r.rejectionReason=t==="Reject"?a||s||"Document image was illegible":void 0,r.reviews.unshift({id:"rev-"+Date.now(),userId:e,reviewerName:((i=this.currentUser)==null?void 0:i.name)||"Sara Mengistu (Admin)",actionTaken:t,notes:s||a||(t==="Approve"?"All records verified.":"Verification rejected."),timestamp:"Just now"}),r.documents.forEach(d=>{d.status=t==="Approve"?"Approved":"Rejected",d.rejectionReason=r.rejectionReason}));const o=this.agentRegisteredFarmers.find(d=>d.id===e);o&&(o.status=t==="Approve"?"Approved":"Rejected"),this.currentUser&&this.currentUser.id===e&&(this.currentUser.verificationStatus=t==="Approve"?"Approved":"Rejected",this.currentUser.verified=t==="Approve",this.currentUser.rejectionReason=r==null?void 0:r.rejectionReason,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)));try{await fetch(`/api/verification/${e}/review`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({action:t,notes:s,rejectionReason:a})})}catch(d){console.warn("Review verification remote call failed, updated local state",d)}this.notify()}getVerificationQueue(e,t){let s=[...this.verificationQueue];return e&&e!=="All"&&(s=s.filter(a=>a.userRole.toLowerCase()===e.toLowerCase())),t&&t!=="All"&&(s=s.filter(a=>a.verificationStatus===t)),s}async fetchVerificationQueue(){if(!this.isAuthenticated())return this.verificationQueue;try{const e=await fetch("/api/verification/queue",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();Array.isArray(t)&&t.length>0&&(this.verificationQueue=t,this.notify())}}catch(e){console.warn("Fetch verification queue failed, using local queue",e)}return this.verificationQueue}getAgentRegisteredFarmers(){return this.agentRegisteredFarmers}getVerificationStatus(e){var t,s;if(e){const a=this.verificationQueue.find(r=>r.userId===e);if(a)return a.verificationStatus}return((t=this.currentUser)==null?void 0:t.verificationStatus)||((s=this.currentUser)!=null&&s.verified?"Approved":"PendingSubmission")}async sendInboundUssdSimulation(e,t){return t.includes("*990#")||t.includes("*805#")?`Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit
Reply with number:`:t==="1"?"Welcome! Enter your Name & Woreda (e.g., Bekele Bishoftu):":t==="2"?"Enter your 16-digit Fayda ID Number or FAN-XXXX-XXXX-XXXX:":t==="3"?"Your Telebirr Escrow Balance is 48,200 ETB. Payout available at local agent.":t==="4"?"Agent Kassahun Tolessa (+251988776655) has been assigned to visit your farm within 48 hours.":`Farmer-to-Market: Command received. SMS confirmation dispatched to ${e}.`}saveUsersToStorage(){try{localStorage.setItem("farmerMarketAllUsers",JSON.stringify(this.allUsers))}catch(e){console.warn("Failed to persist users to localStorage",e)}}async fetchUsers(){try{const e=await fetch("/api/auth/demo-users");if(e.ok){const t=await e.json();if(Array.isArray(t)){let s=!1;t.forEach(a=>{const r=a.phone.replace(/\s+/g,"");if(!this.isDeletedUser(a.id,r)&&!this.allUsers.find(i=>i.phone.replace(/\s+/g,"")===r)){const i={id:a.id||"db-"+r.replace(/\D/g,""),phone:a.phone,name:a.name,nameAm:a.nameAm,role:(a.role||"buyer").toLowerCase(),region:a.region||"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",createdAt:new Date().toISOString()};this.allUsers.push(i),s=!0}}),s&&(this.saveUsersToStorage(),this.notify())}}}catch(e){console.warn("Fetch remote users failed, using local user list",e)}return this.getAllUsers()}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchSummaries(),this.fetchVerificationQueue(),this.fetchUsers()]),this.notify()}getAllUsers(){const e=new Map;if(this.allUsers.forEach(t=>{this.isDeletedUser(t.id,t.phone)||(t.phone?e.set(t.phone.replace(/\s+/g,""),t):t.id&&e.set(t.id,t))}),this.verificationQueue.forEach(t=>{var a,r;const s=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.userId,s))if(e.has(s)){const o=e.get(s);o.verificationStatus=t.verificationStatus,o.verified=t.verificationStatus==="Approved",t.tinNumber&&(o.tinNumber=t.tinNumber)}else{const o={id:t.userId||"vq-"+s.replace(/\D/g,""),name:t.userName,nameAm:t.userNameAm,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.verificationStatus==="Approved",verificationStatus:t.verificationStatus,status:"active",tinNumber:t.tinNumber,faydaId:(r=(a=t.documents)==null?void 0:a.find(i=>i.documentType==="FaydaId"))==null?void 0:r.documentNumber,createdAt:t.registeredAt||new Date().toISOString()};e.set(s,o),this.allUsers.push(o)}}),this.kycQueue.forEach(t=>{const s=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.userId,s)&&!e.has(s)){const a={id:t.userId||"kyc-"+s.replace(/\D/g,""),name:t.userName,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.status==="Verified",verificationStatus:t.status==="Verified"?"Approved":"UnderReview",status:"active",tinNumber:t.tinNumber,faydaId:t.documentNumber,createdAt:t.submittedAt||new Date().toISOString()};e.set(s,a),this.allUsers.push(a)}}),this.agentRegisteredFarmers.forEach(t=>{const s=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.id,s)&&!e.has(s)){const a={id:t.id,name:t.name,nameAm:t.nameAm,phone:t.phone,role:"farmer",region:t.region,kebele:t.kebele,primaryCrop:t.primaryCrop,faydaId:t.faydaId,tinNumber:t.tinNumber,verified:t.status==="Approved",verificationStatus:t.status,status:"active",createdAt:t.registeredAt||new Date().toISOString()};e.set(s,a),this.allUsers.push(a)}}),this.currentUser&&this.currentUser.phone&&!this.isDeletedUser(this.currentUser.id,this.currentUser.phone)){const t=this.currentUser.phone.replace(/\s+/g,"");e.has(t)||(e.set(t,this.currentUser),this.allUsers.push(this.currentUser))}return Array.from(e.values()).filter(t=>!this.isDeletedUser(t.id,t.phone))}getUserById(e){const t=(e||"").trim();if(t)return this.getAllUsers().find(s=>s.id===t||s.phone===t||s.phone.replace(/\s+/g,"")===t.replace(/\s+/g,""))}createUser(e){var a,r,o;const t=e.phone.startsWith("+251")?e.phone.replace(/\s+/g,""):"+251"+e.phone.replace(/^0+/,"").replace(/\s+/g,"");this.deletedUserIds.delete(t.toLowerCase()),this.deletedUserIds.delete(t.replace(/\D/g,"")),this.saveDeletedUsers();const s={id:crypto.randomUUID?crypto.randomUUID():"user-"+Date.now(),name:e.name,nameAm:e.nameAm,phone:t,role:e.role,region:e.region,verified:e.verified??!0,verificationStatus:e.verified??!0?"Approved":"PendingSubmission",status:e.status??"active",tinNumber:e.tinNumber,businessLicenseNumber:e.businessLicenseNumber,vehicleType:e.vehicleType,refrigerationType:e.refrigerationType,vehicleCapacityKg:e.vehicleCapacityKg,primaryCrop:e.primaryCrop,kebele:e.kebele,faydaId:e.faydaId,permissions:e.permissions,createdAt:new Date().toISOString()};return this.allUsers=this.allUsers.filter(i=>i.phone.replace(/\s+/g,"")!==t),this.allUsers.unshift(s),this.saveUsersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"00000000-0000-0000-0000-000000000001",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((o=this.currentUser)==null?void 0:o.role)||"superadmin",action:"CREATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:s.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Created new ${s.role.toUpperCase()} account: ${s.name} (${s.phone}) in ${s.region}.`}),this.notify(),s}updateUser(e,t){var i,d,c;let s=this.allUsers.findIndex(n=>n.id===e||n.phone===e||n.phone.replace(/\s+/g,"")===e.replace(/\s+/g,""));if(s===-1){const n=this.getUserById(e);n&&(this.allUsers.push(n),s=this.allUsers.length-1)}if(s===-1)throw new Error("User not found");const a={...this.allUsers[s]};this.allUsers[s]={...this.allUsers[s],...t};const r=this.allUsers[s],o=r.phone.replace(/\s+/g,"");return this.verificationQueue.forEach(n=>{(n.userId===r.id||n.phone.replace(/\s+/g,"")===o)&&(n.userName=r.name,r.nameAm&&(n.userNameAm=r.nameAm),n.userRole=r.role,n.region=r.region,r.tinNumber&&(n.tinNumber=r.tinNumber))}),this.currentUser&&(this.currentUser.id===r.id||this.currentUser.phone.replace(/\s+/g,"")===o)&&(this.currentUser={...this.currentUser,...r},localStorage.setItem("currentUser",JSON.stringify(this.currentUser))),this.saveUsersToStorage(),this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"00000000-0000-0000-0000-000000000001",actorName:((d=this.currentUser)==null?void 0:d.name)||"Super Admin",actorRole:((c=this.currentUser)==null?void 0:c.role)||"superadmin",action:"UPDATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:r.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated user profile for ${r.name} (${r.role.toUpperCase()}, ${r.phone}). Status: ${r.status||"active"}.`,preState:a,postState:r}),this.notify(),r}deleteUser(e){var o,i,d;const t=this.getUserById(e);if(!t)return!1;const s=t.phone.replace(/\s+/g,""),a=t.id;return this.deletedUserIds.add(a.toLowerCase()),this.deletedUserIds.add(s.toLowerCase()),this.deletedUserIds.add(s.replace(/\D/g,"")),this.saveDeletedUsers(),this.allUsers=this.allUsers.filter(c=>c.id!==a&&c.phone.replace(/\s+/g,"")!==s),this.verificationQueue=this.verificationQueue.filter(c=>c.userId!==a&&c.phone.replace(/\s+/g,"")!==s),this.kycQueue=this.kycQueue.filter(c=>c.userId!==a&&c.phone.replace(/\s+/g,"")!==s),this.agentRegisteredFarmers=this.agentRegisteredFarmers.filter(c=>c.id!==a&&c.phone.replace(/\s+/g,"")!==s),this.currentUser&&(this.currentUser.id===a||this.currentUser.phone.replace(/\s+/g,"")===s)&&this.impersonationOriginalUser&&this.stopImpersonation(),this.saveUsersToStorage(),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(a)&&this.token&&fetch(`/api/superadmin/users/${a}`,{method:"DELETE",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}}).catch(c=>console.warn("Backend user delete sync skipped/failed:",c)),this.addAuditLog({actorId:((o=this.currentUser)==null?void 0:o.id)||"00000000-0000-0000-0000-000000000001",actorName:((i=this.currentUser)==null?void 0:i.name)||"Super Admin",actorRole:((d=this.currentUser)==null?void 0:d.role)||"superadmin",action:"DELETE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:a,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Permanently deleted user account: ${t.name} (${t.role.toUpperCase()}, ${t.phone}).`}),this.notify(),!0}toggleUserSuspension(e,t){var i,d,c;let s=this.allUsers.find(n=>n.id===e||n.phone===e||n.phone.replace(/\s+/g,"")===e.replace(/\s+/g,""));if(s||(s=this.getUserById(e),s&&!this.allUsers.some(n=>n.id===s.id)&&this.allUsers.push(s)),!s)throw new Error("User not found");const a=t||(s.status==="suspended"?"active":"suspended");s.status=a;const r=s.phone.replace(/\s+/g,"");if(this.allUsers.forEach(n=>{(n.id===s.id||n.phone.replace(/\s+/g,"")===r)&&(n.status=a)}),this.currentUser&&(this.currentUser.id===s.id||this.currentUser.phone.replace(/\s+/g,"")===r)&&(this.currentUser.status=a,localStorage.setItem("currentUser",JSON.stringify(this.currentUser))),this.saveUsersToStorage(),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.id)&&this.token){const n=s.role==="admin"?`/api/superadmin/admins/${s.id}/status`:`/api/admin/users/${s.id}/status`;fetch(n,{method:"PUT",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"},body:JSON.stringify({status:a})}).catch(f=>console.warn("Backend user status sync skipped/failed:",f))}return this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"00000000-0000-0000-0000-000000000001",actorName:((d=this.currentUser)==null?void 0:d.name)||"Super Admin",actorRole:((c=this.currentUser)==null?void 0:c.role)||"superadmin",action:a==="suspended"?"SUSPEND_USER_ACCOUNT":"REINSTATE_USER_ACCOUNT",category:"EMERGENCY",targetResource:"User",targetId:s.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${a==="suspended"?"Suspended account access":"Reinstated account access"} for ${s.name} (${s.role.toUpperCase()}, ${s.phone}).`}),this.notify(),s}startImpersonation(e){var s,a,r;const t=this.allUsers.find(o=>o.id===e);return t?(!this.impersonationOriginalUser&&((s=this.currentUser)==null?void 0:s.role)==="superadmin"&&(this.impersonationOriginalUser={...this.currentUser}),this.currentUser=t,localStorage.setItem("currentUser",JSON.stringify(t)),this.addAuditLog({actorId:((a=this.impersonationOriginalUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.impersonationOriginalUser)==null?void 0:r.name)||"Super Admin",actorRole:"superadmin",action:"START_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin initiated live impersonation support session as '${t.name}' (${t.role}).`}),this.notify(),t):null}stopImpersonation(){if(!this.impersonationOriginalUser)return this.currentUser;const e={...this.impersonationOriginalUser},t=this.currentUser;return this.currentUser=e,this.impersonationOriginalUser=null,localStorage.setItem("currentUser",JSON.stringify(e)),this.addAuditLog({actorId:e.id,actorName:e.name,actorRole:"superadmin",action:"END_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t==null?void 0:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin exited impersonation session for '${t==null?void 0:t.name}'. Returned to Super Admin dashboard.`}),this.notify(),e}isImpersonating(){return!!this.impersonationOriginalUser}getOriginalSuperAdmin(){return this.impersonationOriginalUser}getPlatformConfig(){return this.platformConfig}updatePlatformConfig(e){var s,a,r;const t={...this.platformConfig};return this.platformConfig={...this.platformConfig,...e},this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"UPDATE_PLATFORM_CONFIG",category:"CONFIG",targetResource:"PlatformConfig",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated platform configuration: Escrow split (${this.platformConfig.farmerSharePercent}/${this.platformConfig.driverSharePercent}/${this.platformConfig.platformFeePercent}), Escrow Frozen: ${this.platformConfig.emergencyEscrowFrozen}.`,preState:t,postState:this.platformConfig}),this.notify(),this.platformConfig}getSystemAuditLogs(){return this.systemAuditLogs}addAuditLog(e){const t={...e,id:"log-"+(this.systemAuditLogs.length+101),timestamp:new Date().toLocaleString()};return this.systemAuditLogs.unshift(t),t}getDeliveryZones(){return this.deliveryZones}addDeliveryZone(e){var s,a,r;const t={...e,id:"zone-"+(this.deliveryZones.length+1)};return this.deliveryZones.push(t),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"ADD_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Added new regional delivery zone: ${t.name} (Base radius ${t.baseRadiusKm} km).`}),this.notify(),t}updateDeliveryZone(e,t){var a,r,o;const s=this.deliveryZones.findIndex(i=>i.id===e);if(s===-1)throw new Error("Zone not found");return this.deliveryZones[s]={...this.deliveryZones[s],...t},this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((o=this.currentUser)==null?void 0:o.role)||"superadmin",action:"UPDATE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated delivery zone '${this.deliveryZones[s].name}' configuration.`}),this.notify(),this.deliveryZones[s]}deleteDeliveryZone(e){var s,a,r;const t=this.deliveryZones.find(o=>o.id===e);return t?(this.deliveryZones=this.deliveryZones.filter(o=>o.id!==e),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"DELETE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted delivery zone: ${t.name}.`}),this.notify(),!0):!1}getFeatureFlags(){return this.featureFlags}toggleFeatureFlag(e,t){var a,r,o;const s=this.featureFlags.find(i=>i.key===e);if(!s)throw new Error("Feature flag not found");return s.enabled=t!==void 0?t:!s.enabled,this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((o=this.currentUser)==null?void 0:o.role)||"superadmin",action:"TOGGLE_FEATURE_FLAG",category:"CONFIG",targetResource:"FeatureFlag",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${s.enabled?"Enabled":"Disabled"} feature flag: ${s.name} (${e}).`}),this.notify(),s}getPendingPayoutApprovals(){return this.payoutApprovals}approvePayout(e,t){var a;const s=this.payoutApprovals.find(r=>r.id===e);return s?(s.status="Approved",s.reviewedBy=t,s.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"APPROVE_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Authorized high-value Telebirr payout of ${s.amountEtb.toLocaleString()} ETB for ${s.recipientName} (${s.recipientPhone}).`}),this.notify(),!0):!1}rejectPayout(e,t,s="High-risk audit anomaly"){var r;const a=this.payoutApprovals.find(o=>o.id===e);return a?(a.status="Rejected",a.reviewedBy=t,a.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"REJECT_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Declined payout of ${a.amountEtb.toLocaleString()} ETB for ${a.recipientName}. Reason: ${s}.`}),this.notify(),!0):!1}getGlobalBusinessRules(){return this.globalBusinessRules}updateGlobalBusinessRules(e){var t,s,a;return this.globalBusinessRules={...this.globalBusinessRules,...e},this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:((a=this.currentUser)==null?void 0:a.role)||"superadmin",action:"UPDATE_BUSINESS_RULES",category:"CONFIG",targetResource:"GlobalBusinessRules",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated global trading rules: Min ${this.globalBusinessRules.minOrderKg} kg, Max ${this.globalBusinessRules.maxOrderKg} kg, Max Distance ${this.globalBusinessRules.maxDistanceKm} km.`}),this.notify(),this.globalBusinessRules}getBlacklist(){return this.blacklist}addToBlacklist(e){var s;const t={...e,id:"bl-"+(this.blacklist.length+1).toString().padStart(2,"0"),blacklistedAt:new Date().toISOString().split("T")[0]};return this.blacklist.unshift(t),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:e.blacklistedBy,actorRole:"superadmin",action:"ADD_TO_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Blacklisted ${t.type}: ${t.value}. Reason: ${t.reason}.`}),this.notify(),t}removeFromBlacklist(e){var s,a;const t=this.blacklist.find(r=>r.id===e);return t?(this.blacklist=this.blacklist.filter(r=>r.id!==e),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:"superadmin",action:"REMOVE_FROM_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Removed ${t.type} (${t.value}) from platform blacklist.`}),this.notify(),!0):!1}triggerDatabaseBackup(){var t,s;const e={backupId:"BK-PG16-"+Date.now(),sizeMb:248.5,timestamp:new Date().toLocaleString(),downloadUrl:"#pg-backup-download"};return this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:"superadmin",action:"TRIGGER_DATABASE_BACKUP",category:"CONFIG",targetResource:"PostgreSQL_Snapshot",targetId:e.backupId,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Generated encrypted PostgreSQL schema and transaction data snapshot (${e.backupId}, 248.5 MB).`}),this.notify(),e}exportPlatformData(e){var o,i;const t=`FarmerMarket_FullExport_${new Date().toISOString().split("T")[0]}.${e}`;let s="";e==="json"?s=JSON.stringify({users:this.allUsers,listings:this.listings,orders:this.orders,platformConfig:this.platformConfig,deliveryZones:this.deliveryZones,auditLogs:this.systemAuditLogs},null,2):s=`Type,Id,Name,Phone,Role,Region,Status,CreatedAt
`+this.allUsers.map(d=>`User,${d.id},"${d.name}",${d.phone},${d.role},"${d.region}",${d.status||"active"},${d.createdAt}`).join(`
`);const a=new Blob([s],{type:e==="json"?"application/json":"text/csv"}),r=URL.createObjectURL(a);return this.addAuditLog({actorId:((o=this.currentUser)==null?void 0:o.id)||"superadmin-01",actorName:((i=this.currentUser)==null?void 0:i.name)||"Super Admin",actorRole:"superadmin",action:"EXPORT_PLATFORM_DATA",category:"CONFIG",targetResource:"DataExport",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Exported full platform data snapshot in ${e.toUpperCase()} format (${t}).`}),{filename:t,dataUrl:r}}getBanners(){return[...this.banners].sort((e,t)=>t.priority-e.priority)}getActiveBanners(e="All",t="All"){return this.banners.filter(s=>s.isActive).filter(s=>s.targetAudience==="All"||s.targetAudience.toLowerCase()===e.toLowerCase()||e==="All").filter(s=>!s.targetRegion||s.targetRegion==="All"||s.targetRegion.toLowerCase()===t.toLowerCase()||t==="All").sort((s,a)=>a.priority-s.priority)}getBannerById(e){return this.banners.find(t=>t.id===e)}createBanner(e){var s,a,r,o;const t={id:crypto.randomUUID?crypto.randomUUID():"banner-"+Date.now(),title:e.title,titleAm:e.titleAm,subtitle:e.subtitle,subtitleAm:e.subtitleAm,badgeText:e.badgeText,badgeTextAm:e.badgeTextAm,imageUrl:e.imageUrl||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",targetAudience:e.targetAudience||"All",targetRegion:e.targetRegion||"All",ctaText:e.ctaText,ctaTextAm:e.ctaTextAm,ctaLink:e.ctaLink||"marketplace",themeGradient:e.themeGradient||"from-emerald-900 via-teal-900 to-slate-900",priority:Number(e.priority)||5,isActive:e.isActive??!0,createdAt:new Date().toISOString(),createdBy:((s=this.currentUser)==null?void 0:s.name)||"Platform Admin"};return this.banners.unshift(t),this.saveBannersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((o=this.currentUser)==null?void 0:o.role)||"admin",action:"CREATE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Created promotional banner: "${t.title}" for audience: ${t.targetAudience}.`}),this.notify(),t}updateBanner(e,t){var a,r,o;const s=this.banners.findIndex(i=>i.id===e);return s===-1?null:(this.banners[s]={...this.banners[s],...t},this.saveBannersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((o=this.currentUser)==null?void 0:o.role)||"admin",action:"UPDATE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated promotional banner "${this.banners[s].title}". Status: ${this.banners[s].isActive?"Active":"Inactive"}.`}),this.notify(),this.banners[s])}toggleBannerStatus(e,t){var a,r,o;const s=this.banners.find(i=>i.id===e);return s?(s.isActive=t!==void 0?t:!s.isActive,this.saveBannersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((o=this.currentUser)==null?void 0:o.role)||"admin",action:s.isActive?"ACTIVATE_BANNER":"DEACTIVATE_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${s.isActive?"Activated":"Deactivated"} banner: "${s.title}".`}),this.notify(),!0):!1}deleteBanner(e){var s,a,r;const t=this.banners.find(o=>o.id===e);return t?(this.banners=this.banners.filter(o=>o.id!==e),this.saveBannersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"admin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Administrator",actorRole:((r=this.currentUser)==null?void 0:r.role)||"admin",action:"DELETE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted promotional banner: "${t.title}".`}),this.notify(),!0):!1}saveBannersToStorage(){try{localStorage.setItem("farmerMarketBanners",JSON.stringify(this.banners))}catch(e){console.warn("Failed to save banners to localStorage",e)}}adminDeleteListing(e,t="Violates marketplace standards"){var r,o,i;const s=this.listings.find(d=>d.id===e);return s?(this.listings=this.listings.filter(d=>d.id!==e),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)&&this.token&&fetch(`/api/listings/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}}).catch(d=>console.warn("Backend listing delete failed/skipped:",d)),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"admin-01",actorName:((o=this.currentUser)==null?void 0:o.name)||"Administrator",actorRole:((i=this.currentUser)==null?void 0:i.role)||"admin",action:"DELETE_LISTING_POST",category:"USER_CRUD",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted listing post "${s.productName}" (Farmer: ${s.farmerName}, ${s.farmerPhone}). Reason: ${t}`}),this.notify(),!0):!1}adminUpdateListing(e,t){var i,d,c;const s=this.listings.findIndex(n=>n.id===e);if(s===-1)return null;const a={...this.listings[s]};this.listings[s]={...this.listings[s],...t};const r=this.listings[s];return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)&&this.token&&fetch(`/api/listings/${e}`,{method:"PUT",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"},body:JSON.stringify(t)}).catch(n=>console.warn("Backend listing update failed/skipped:",n)),this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"admin-01",actorName:((d=this.currentUser)==null?void 0:d.name)||"Administrator",actorRole:((c=this.currentUser)==null?void 0:c.role)||"admin",action:"MODERATE_LISTING_POST",category:"USER_CRUD",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Moderated/Updated listing "${r.productName}". Price: ${r.pricePerKg} ETB/kg, Stock: ${r.qtyKg} kg, Status: ${r.moderationStatus||"Approved"}.`,preState:a,postState:r}),this.notify(),r}flagListingAnomaly(e,t="Severe Price Variance Detected",s,a=!0,r){var n,f,x;const o=this.listings.find(k=>k.id===e);if(!o)return!1;o.moderationStatus="Flagged";const i=r||o.marketBenchmarkPrice||50,d=Math.round((o.pricePerKg-i)/i*100),c={id:"ANOM-"+Date.now().toString().slice(-4),severity:"High",type:"PriceManipulation",title:`Price Anomaly: ${o.productName}`,description:`${o.productName} listed by ${o.farmerName} (${o.farmerPhone}) at ${o.pricePerKg} ETB/kg (${d>0?"+":""}${d}% vs benchmark of ${i} ETB/kg). ${t}`,entityType:"Listing",entityId:o.id,detectedAt:"Just now"};return this.anomalyAlerts.unshift(c),this.addAuditLog({actorId:((n=this.currentUser)==null?void 0:n.id)||"admin-01",actorName:((f=this.currentUser)==null?void 0:f.name)||"Administrator",actorRole:((x=this.currentUser)==null?void 0:x.role)||"admin",action:"FLAG_LISTING_ANOMALY",category:"EMERGENCY",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Flagged listing "${o.productName}" for price anomaly: ${d>0?"+":""}${d}% variance against benchmark.`}),this.notify(),!0}}const p=new Gt,W={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",roleSuperAdmin:"Super Admin (Chief Platform Officer)",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLegalDocuments:"Contracts & Tax Invoices",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Full Produce & Photos",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cropDescription:"Produce Description & Origin Story",qualitySpecs:"Quality & Agricultural Specifications",packagingType:"Packaging & Handling",storageRecommendation:"Storage & Shelf Life",farmerProfile:"Verified Smallholder Producer",directContact:"Direct Producer Contact",callFarmer:"Call Farmer",smsInquiry:"SMS Inquiry",buyNowEscrow:"Instant Order (Telebirr Escrow)",selectOrderQty:"Select Order Quantity (kg)",marketComparison:"Regional Price Benchmark",belowMarketAvg:"Below Regional Wholesale Average",photoGallery:"Produce Photos & Inspection Angles",clickToEnlarge:"Click to view full photo & details",shareListing:"Share Listing",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",viewContractBtn:"View Sales Contract",viewInvoiceBtn:"Download Tax Invoice",viewWaybillBtn:"Transport Waybill (Manifest)",viewArbitrationBtn:"Arbitration Determination",printDocument:"Print / Save PDF",closeDocument:"Close Document",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Tax Statements (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",withholdingTaxReported:"Withholding Tax (2% Goods)",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release & Tax Log",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Cargo Manifest",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Governance, Law & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",statVatRemitted:"VAT on Platform Fees (15%)",statWithholding:"Withholding Tax (2%)",resolveDisputeTitle:"Escrow Legal Arbitration Console",disputeEvidence:"Evidence & Inspection Report",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Tiered KYC & Trade Registry Queue",approveKycBtn:"Approve Identity & License",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",roleAgent:"Field Agent",navAgentPortal:"Field Agent Portal",agentPortalTitle:"Community Field Agent Onboarding Console",agentOnboardFarmerBtn:"Register Smallholder Farmer",agentRosterTitle:"Farmers Onboarded in Your Woreda",agentCommissionEarned:"Agent Commission",agentSyncStatus:"Sync Status",agentRegisterSuccess:"Farmer registered and documents queued for verification!",verifyAccountTitle:"Account Identity & Regulatory Verification",verificationStatusLabel:"Verification Status",statusPendingSubmission:"Pending Submission",statusUnderReview:"Under Review by Admin",statusApproved:"Fully Approved & Compliant",statusRejected:"Verification Rejected",verificationBannerText:"Complete your Fayda ID & TIN verification to unlock full marketplace selling and bulk purchasing privileges.",startVerificationBtn:"Verify Account Now",faydaIdLabel:"Fayda National ID Number (FAN)",tinNumberLabel:"10-Digit Taxpayer ID (TIN)",kebeleIdLabel:"Kebele Resident / Farm ID",uploadFrontPhoto:"Upload Front ID Photo",uploadBackPhoto:"Upload Back ID Photo",rejectionReasonLabel:"Rejection Reason",resubmitDocsBtn:"Update & Resubmit Documents",sideBySideInspectionTitle:"Side-by-Side Document Inspection",approveVerificationAction:"Approve Identity & Tax License",rejectVerificationAction:"Reject & Request Clarification",sendSmsNoticeToggle:"Notify user immediately via bilingual SMS",superAdminTitle:"Super Admin Command Center & Governance",superAdminSubtitle:"Full System Access · User CRUD · RBAC · Platform Config · Emergency Controls",tabUserMaster:"User Master CRUD",tabBanners:"Banners & Announcements",tabModeration:"Content & Post Moderation",tabPermissions:"RBAC Permissions",tabPlatformConfig:"Platform Config & Escrow",tabFinancialOversight:"Financials & Payouts",tabAuditLogs:"System Audit Logs",tabZones:"Delivery Zones & PostGIS",tabFeatureFlags:"Feature Flags",tabEmergency:"Emergency & Blacklist",tabBusinessRules:"Global Rules",tabDbOps:"Database & Health",createBannerBtn:"Add Promotional Banner",editBannerBtn:"Edit Banner",deleteBannerBtn:"Delete Banner",moderatePostBtn:"Moderate / Edit Post",flagAnomalyBtn:"Flag Price Anomaly",deletePostBtn:"Delete Post",impersonateBtn:"Login As / Impersonate",exitImpersonation:"Exit Impersonation",createUserBtn:"Create New Account",editUserBtn:"Edit User",freezePlatformEscrow:"Emergency Platform Escrow Freeze",exportDataBtn:"Export Platform Data (CSV/JSON)",triggerBackupBtn:"Trigger DB Backup Snapshot",payoutApprovalTitle:"High-Value Payout Approvals (> 50,000 ETB)",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",roleSuperAdmin:"ዋና አድሚን (Super Admin)",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLegalDocuments:"ውሎች እና የግብር ደረሰኞች",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"ሙሉ የምርት ፎቶና ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cropDescription:"የምርት ዝርዝር ገለጻ እና መገኛ",qualitySpecs:"የጥራት እና የግብርና መረጃዎች",packagingType:"የማሸጊያ እና አያያዝ ሁኔታ",storageRecommendation:"የማስቀመጫ እና የመቆያ ጊዜ",farmerProfile:"የተረጋገጠ አርሶ አደር መረጃ",directContact:"አርሶ አደሩን በቀጥታ ያግኙ",callFarmer:"ይደውሉ",smsInquiry:"መልእክት ይላኩ",buyNowEscrow:"በቴሌብር ዋስትና አሁኑኑ ይዘዙ",selectOrderQty:"የትዕዛዝ መጠን ይምረጡ (ኪ.ግ)",marketComparison:"የክልላዊ ገበያ ዋጋ ንጽጽር",belowMarketAvg:"ከክልላዊ ገበያ አማካይ ያነሰ",photoGallery:"የምርት ፎቶዎች እና የምርመራ ማዕዘናት",clickToEnlarge:"ሙሉ ፎቶና ዝርዝር ለማየት ይጫኑ",shareListing:"ምርቱን ያጋሩ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",viewContractBtn:"የግብይት ውል ይመልከቱ",viewInvoiceBtn:"የግብር እና ሽያጭ ደረሰኝ (e-VAT)",viewWaybillBtn:"የጭነት ማጓጓዣ ሰነድ (Waybill)",viewArbitrationBtn:"የሽምግልና ውሳኔ ሰነድ",printDocument:"አትም / ፒዲኤፍ አስቀምጥ",closeDocument:"ሰነዱን ዝጋ",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የግብር መግለጫ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",withholdingTaxReported:"የተያዘ ግብር (2% Withholding)",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ እና የደረሰኝ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር፣ ህጋዊነት እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",statVatRemitted:"የተሰበሰበ የተጨማሪ እሴት ታክስ (15% VAT)",statWithholding:"የተያዘ ግብር (2% Withholding)",resolveDisputeTitle:"የህጋዊ ቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና የፍተሻ ሪፖርት",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የተጠቃሚዎች ህጋዊነት እና የንግድ ፈቃድ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ እና ፈቃድ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",roleAgent:"የግብርና ድጋፍ ኤጀንት",navAgentPortal:"የኤጀንት ክፍል",agentPortalTitle:"የማህበረሰብ ግብርና ኤጀንቶች የገበሬዎች መመዝገቢያ ክፍል",agentOnboardFarmerBtn:"አዲስ አርሶ አደር መዝግብ",agentRosterTitle:"በእርስዎ ወረዳ የተመዘገቡ አርሶ አደሮች",agentCommissionEarned:"የኤጀንት ክፍያ",agentSyncStatus:"የዳታ ሁኔታ",agentRegisterSuccess:"አርሶ አደሩ ተመዝግቧል! ሰነዱ ለማረጋገጫ ተልኳል።",verifyAccountTitle:"የመለያ ህጋዊነት እና የታክስ ማረጋገጫ",verificationStatusLabel:"የማረጋገጫ ሁኔታ",statusPendingSubmission:"ሰነድ አልገባም",statusUnderReview:"በአድሚን በመገምገም ላይ",statusApproved:"የተረጋገጠ እና የጸደቀ",statusRejected:"ውድቅ ተደርጓል",verificationBannerText:"ምርቶችን በቀጥታ ለመሸጥ እና ክፍያ ለመቀበል የፋይዳ (Fayda) መታወቂያ እና የታክስ መለያ (TIN) ያረጋግጡ።",startVerificationBtn:"መለያዎን አሁን ያረጋግጡ",faydaIdLabel:"የፋይዳ ብሔራዊ መታወቂያ ቁጥር (FAN)",tinNumberLabel:"የ10-ዲጂት የግብር ከፋይ መለያ (TIN)",kebeleIdLabel:"የቀበሌ ነዋሪነት / የእርሻ ማረጋገጫ",uploadFrontPhoto:"የመታወቂያ የፊት ገጽ ፎቶ",uploadBackPhoto:"የመታወቂያ የጀርባ ገጽ ፎቶ",rejectionReasonLabel:"ውድቅ የተደረገበት ምክንያት",resubmitDocsBtn:"ሰነዶችን አስተካክለው እንደገና ያስገቡ",sideBySideInspectionTitle:"የሰነዶች ጎን ለጎን ፍተሻ እና ማረጋገጫ",approveVerificationAction:"መታወቂያ እና የግብር ሰነድ አጽድቅ",rejectVerificationAction:"ውድቅ አድርግ / ማብራሪያ ጠይቅ",sendSmsNoticeToggle:"ለተጠቃሚው ወዲያውኑ በኤስኤምኤስ አሳውቅ",superAdminTitle:"የዋና አድሚን ቁጥጥር እና አስተዳደር ማዕከል",superAdminSubtitle:"ሙሉ የሲስተም ስልጣን · የተጠቃሚዎች CRUD · RBAC · የዋስትና ውቅር · የአደጋ ጊዜ መቆጣጠሪያ",tabUserMaster:"የተጠቃሚዎች አስተዳደር (CRUD)",tabBanners:"የማስታወቂያ ባነሮች",tabModeration:"የምርቶች ቁጥጥር እና ማስተካከያ",tabPermissions:"የፈቃዶች ማትሪክስ (RBAC)",tabPlatformConfig:"የሲስተም ውቅር እና የዋስትና ድርሻ",tabFinancialOversight:"የፋይናንስ እና ክፍያ ቁጥጥር",tabAuditLogs:"የሲስተም ኦዲት መዝገብ",tabZones:"የማድረሻ ዞኖች እና ካርታ",tabFeatureFlags:"የባህሪያት ማብሪያ/ማጥፊያ",tabEmergency:"የአደጋ ጊዜ መቆጣጠሪያ እና እገዳ",tabBusinessRules:"አጠቃላይ የንግድ ደንቦች",tabDbOps:"ዳታቤዝ እና የሲስተም ጤና",createBannerBtn:"አዲስ ባነር ጨምር",editBannerBtn:"ባነር አርትዕ",deleteBannerBtn:"ባነር ሰርዝ",moderatePostBtn:"ምርት አርትዕ/አስተካክል",flagAnomalyBtn:"ያልተገባ ዋጋ ጠቁም",deletePostBtn:"ምርት ሰርዝ",impersonateBtn:"በተጠቃሚው ስም ግባ",exitImpersonation:"ከተጠቃሚው ውጣ",createUserBtn:"አዲስ መለያ ፍጠር",editUserBtn:"ተጠቃሚ አርትዕ",freezePlatformEscrow:"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ",exportDataBtn:"መረጃ በCSV/JSON አውርድ",triggerBackupBtn:"የዳታቤዝ ምትክ ቅጂ ውሰድ",payoutApprovalTitle:"ከፍተኛ የገንዘብ ክፍያ ማረጋገጫ (> 50,000 ብር)",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function qt(l,e,t,s,a,r,o=""){const i=W[l],d=a.reduce((f,x)=>f+x.qtyKg,0),c={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},agent:{label:"Field Extension Agent",labelAm:"የግብርና ድጋፍ ኤጀንት",color:"bg-teal-100 text-teal-900 border-teal-300",icon:"fa-users-gear"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"},superadmin:{label:"Super Admin (Chief Platform Officer)",labelAm:"ዋና አድሚን (Super Admin)",color:"bg-rose-100 text-rose-900 border-rose-300",icon:"fa-crown"}},n=e?c[e.role]||c.buyer:null;return e&&localStorage.getItem("currentUser")&&JSON.parse(localStorage.getItem("currentUser")||"{}").phone!=="+251900000001"&&window.isSuperAdminImpersonating,`
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
                value="${o}" 
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
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${(n==null?void 0:n.color)||"bg-slate-100 text-slate-800"}">
                        ${l==="am"?n==null?void 0:n.labelAm:n==null?void 0:n.label}
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
              <button onclick="window.toggleCreateListingModal()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${i.postNewListing}
              </button>
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

            ${!t||(e==null?void 0:e.role)==="buyer"?`
              <button onclick="window.toggleCart()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-200/70 text-slate-700 ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Wholesale Bulk Cart (${d} kg)
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
  `}function zt(l,e,t,s,a,r,o,i,d,c=null,n=0,f="All",x="All",k=!1,S=!1,A="marketplace",y=p.getStandingOrders(),_=p.getOrders("buyer")){var ae,se;const v=W[l],F=[{key:"All",label:v.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:v.catVegetables,icon:"fa-carrot"},{key:"Grains",label:v.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:v.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:v.catCoffee,icon:"fa-mug-hot"}],V=r.reduce((w,G)=>w+G.qtyKg*G.listing.pricePerKg,0),z=Math.round(V*.9),Q=Math.round(V*.05),J=V-z-Q,Z=r.reduce((w,G)=>{const U=G.listing.farmerId;return w[U]||(w[U]={farmerName:G.listing.farmerName,farmerRegion:G.listing.region,items:[]}),w[U].items.push(G),w},{}),Y=p.getActiveBanners("Buyer",s),I=Y.length>0?Y[0]:null;return`
    <div class="space-y-8 pb-20">
      
      <!-- E-Commerce Hero Promotional Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>${I!=null&&I.badgeText?I.badgeText:"15M+ Ethiopian Smallholder Farmers Direct Network"}</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${l==="am"?"lang-am":""}">
              ${I?l==="am"&&I.titleAm?I.titleAm:I.title:v.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${l==="am"?"lang-am":""}">
              ${I?l==="am"&&I.subtitleAm?I.subtitleAm:I.subtitle||v.heroDesc:v.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> ${I!=null&&I.ctaText?l==="am"&&I.ctaTextAm?I.ctaTextAm:I.ctaText:"Browse Farm Deals"}
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${v.navOrders} & Invoices (${_.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${v.standingOrdersTitle}
              </button>
            </div>
          </div>

          <!-- Hero Promo Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3 relative overflow-hidden">
              ${I!=null&&I.imageUrl?`
                <img src="${I.imageUrl}" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
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
            <span>${v.navOrders} & ${v.navLegalDocuments} (${_.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${A==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${v.standingOrdersTitle} (${y.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${A==="standing_orders"?Yt(l,y):A==="orders"?Qt(l,_):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${F.map(w=>`
            <button onclick="window.setCategory('${w.key}')" 
              class="cat-pill ${t===w.key?"active":""} ${l==="am"?"lang-am":""}">
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
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${v.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0,25,50,100].map(w=>`
                <button onclick="window.setMaxDistanceKm(${w})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${n===w?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${w===0?"All":w+" km"}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${v.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${f==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${f==="Grade 1"?"selected":""}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${f==="Grade 2"?"selected":""}>Grade 2 (Value)</option>
              <option value="Export Grade" ${f==="Export Grade"?"selected":""}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${v.filterRipeness}:</span>
            <select onchange="window.setFilterRipeness(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${x==="All"?"selected":""}>All Ripeness</option>
              <option value="Ready Today" ${x==="Ready Today"?"selected":""}>Ready Today</option>
              <option value="Semi-Ripe" ${x==="Semi-Ripe"?"selected":""}>Semi-Ripe</option>
              <option value="Green / Storable" ${x==="Green / Storable"?"selected":""}>Green / Storable</option>
            </select>
          </div>

          <!-- Toggle Flags -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${k?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${v.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${S?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${v.filterAdvance}</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Produce Marketplace Grid -->
      <section class="space-y-4">
        
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${l==="am"?"lang-am":""}">
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
            ${e.map(w=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1">
                
                <div>
                  <!-- Clickable Image with Hover Inspector Overlay -->
                  <div 
                    onclick="window.openProduceDetail('${w.id}')" 
                    class="h-48 w-full relative overflow-hidden group cursor-pointer"
                    title="${v.clickToEnlarge||"Click to view full photos & produce details"}"
                  >
                    <img src="${w.photos[0]}" alt="${w.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" />
                    
                    <!-- Hover Quick Preview Overlay -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <span class="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3.5 py-2 rounded-full shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <i class="fa-solid fa-eye text-emerald-600"></i> ${v.viewDetails}
                      </span>
                    </div>

                    <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
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

                    <span class="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md z-10 pointer-events-none">
                      ${w.pricePerKg} ETB<span class="text-[10px] font-normal text-slate-300">/kg</span>
                    </span>

                    ${w.distanceKm?`
                      <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${w.distanceKm} km ${v.farmDistance}
                      </span>
                    `:""}

                    ${w.photos.length>1?`
                      <span class="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-images text-emerald-400 mr-1"></i> ${w.photos.length} photos
                      </span>
                    `:""}
                  </div>

                  <div class="p-5 space-y-3">
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span class="text-amber-700 font-bold"><i class="fa-solid fa-award mr-1"></i> ${w.grade||"Grade 1"}</span>
                      <span class="text-slate-600 font-medium">${w.ripeness||"Ready Today"}</span>
                    </div>

                    <h3 
                      onclick="window.openProduceDetail('${w.id}')"
                      class="font-extrabold text-slate-900 text-lg leading-snug hover:text-emerald-700 cursor-pointer transition-colors ${l==="am"?"lang-am":""}"
                    >
                      ${l==="am"&&w.nameAm?w.nameAm:w.productName}
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
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2 cursor-pointer hover:bg-emerald-100/70 transition-colors" onclick="window.openProduceDetail('${w.id}')">
                        <i class="fa-solid fa-microphone-lines text-emerald-700 text-sm mt-0.5"></i>
                        <span class="italic leading-tight truncate">"${w.voiceNoteTranscript}"</span>
                      </div>
                    `:""}

                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Available: <strong class="font-bold text-slate-900">${w.qtyKg.toLocaleString()} kg</strong></span>
                      <span>Min Order: <strong class="font-bold text-slate-900">${w.minOrderKg} kg</strong></span>
                    </div>

                  </div>
                </div>

                <!-- Action Buttons: View Details & Add to Bulk Cart -->
                <div class="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button onclick="window.openProduceDetail('${w.id}')" class="btn-secondary py-2.5 text-xs font-bold shadow-xs cursor-pointer hover:bg-slate-100">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> Details
                  </button>
                  <button onclick="window.addToCart('${w.id}')" class="btn-primary py-2.5 text-xs font-extrabold shadow-sm cursor-pointer">
                    <i class="fa-solid fa-cart-plus mr-1"></i> ${v.addToCart}
                  </button>
                </div>

              </div>
            `).join("")}
          </div>
        `}

      </section>
      `}

      <!-- Bulk Cart Drawer Modal -->
      ${o?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCart()">
          <div class="modal-content max-w-xl p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${v.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer checkout with Telebirr Escrow</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${r.length===0?`
              <div class="p-8 text-center text-slate-500 text-xs">
                <p>${v.cartEmpty}</p>
              </div>
            `:`
              <div class="space-y-4 max-h-80 overflow-y-auto pr-1">
                ${Object.entries(Z).map(([w,G])=>`
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                      <span><i class="fa-solid fa-seedling text-emerald-600 mr-1"></i> Farm Source: ${G.farmerName} (${G.farmerRegion})</span>
                      <span class="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Direct Gate Payout</span>
                    </div>

                    ${G.items.map(U=>`
                      <div class="flex items-center justify-between gap-3 text-xs">
                        <div>
                          <h4 class="font-bold text-slate-900">${U.listing.productName}</h4>
                          <span class="text-slate-500">${U.listing.pricePerKg} ETB / kg</span>
                        </div>

                        <div class="flex items-center gap-3">
                          <div class="flex items-center gap-1">
                            <button onclick="window.updateCartQty('${U.listing.id}', ${U.qtyKg-10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">-</button>
                            <span class="w-12 text-center font-bold text-slate-800">${U.qtyKg} kg</span>
                            <button onclick="window.updateCartQty('${U.listing.id}', ${U.qtyKg+10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">+</button>
                          </div>
                          <span class="font-extrabold text-slate-900 w-16 text-right">${(U.qtyKg*U.listing.pricePerKg).toLocaleString()} ETB</span>
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
                  <strong class="text-emerald-900">${z.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${v.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${Q.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${v.platformFee}:</span>
                  <strong class="text-slate-800">${J.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${v.totalAmount}:</span>
                  <span class="text-emerald-800">${V.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${V})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
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
              <span class="text-xs font-bold text-blue-900">${v.totalAmount}</span>
              <div class="text-3xl font-black text-blue-950">${d.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <span class="text-[11px] text-blue-800 font-semibold block">${v.escrowGuarantee}</span>
            </div>

            <form onsubmit="window.handleTelebirrSubmit(event)" class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between"><label class="block text-xs font-bold text-slate-700">1. Shipping address</label><button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="text-[10px] font-bold text-emerald-700">Add address</button></div>
                ${p.getAccountData().addresses.length?`<select id="checkoutAddress" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"><option value="">Select a saved address</option>${p.getAccountData().addresses.map(w=>`<option value="${w.id}">${w.name} · ${w.street}, ${w.city}${w.isDefaultShipping?" · Default":""}</option>`).join("")}</select>`:`<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">Add a saved address before checkout. <button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="font-black underline">Manage addresses</button></div>`}
              </div>

              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-700">2. Payment method</label>
                <div class="space-y-2">${p.getAccountData().paymentMethods.length?p.getAccountData().paymentMethods.map(w=>`<label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-400"><input type="radio" name="checkoutPayment" value="${w.id}" ${w.isPrimary?"checked":""} required /><span class="text-xs font-bold">${w.provider} · ${w.maskedDisplay||"Provider wallet"}${w.isPrimary?" · Primary":""}</span></label>`).join(""):`<label class="flex items-center gap-3 p-3 rounded-xl border border-blue-300 bg-blue-50 cursor-pointer"><input type="radio" name="checkoutPayment" value="telebirr-wallet" checked required /><span class="text-xs font-bold">Telebirr wallet · ${((ae=p.getCurrentUser())==null?void 0:ae.phone)||"linked account"}</span></label><p class="text-[10px] text-slate-500">Payment is securely authorized by the configured gateway.</p>`}</div>
              </div>

              <div class="pt-2">
                <button type="submit" class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition-colors cursor-pointer">
                  <i class="fa-solid fa-lock mr-1.5"></i> Pay and place order
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
      ${i?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${v.orderTracking}</h3>
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
                  ${i.escrowHeld?"Escrow Held":"Funds Released"}
                </span>
              </div>
            </div>

            <!-- Legal Documents Quick Action Bar -->
            <div class="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200">
              <button onclick="window.openInvoiceModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-emerald-800 hover:bg-emerald-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${v.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${v.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${v.viewWaybillBtn}
              </button>

              ${i.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-money-bill-transfer text-emerald-700 mr-1"></i> Refund approved and returned through the original payment method.
                </div>
              `:i.status==="disputed"?`
                <button onclick="window.openArbitrationModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
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
                  <p class="text-xs text-slate-500">Telebirr transaction verified (${i.paymentRef||"TB-20260819"})</p>
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
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                  <i class="fa-solid fa-money-bill-transfer text-emerald-700"></i> Refund completed. Order closed.
                </div>
              `:i.status!=="delivered"&&i.status!=="disputed"?`
                <button onclick="window.confirmDelivery('${i.id}')" class="btn-primary flex-1 py-3 text-xs cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i> ${v.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${i.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${v.disputeBtn}
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
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                  <i class="fa-solid fa-check-double text-emerald-700"></i> Delivery Completed & Escrow Released to Farmer
                </div>
              `}
            </div>

          </div>
        </div>
      `:""}

    </div>
  `}function Qt(l,e){const t=W[l],s=[{key:"pending",label:"Order Placed",icon:"fa-lock",active:["pending","confirmed","PickedUp","picked_up","delivered"]},{key:"confirmed",label:"Farmer Confirmed",icon:"fa-tractor",active:["confirmed","PickedUp","picked_up","delivered"]},{key:"picked_up",label:"In Transit",icon:"fa-truck",active:["PickedUp","picked_up","delivered"]},{key:"delivered",label:"Delivered",icon:"fa-hand-holding-dollar",active:["delivered"]}];function a(i){const d=i==null?void 0:i.toLowerCase();return d==="delivered"?"text-emerald-700 bg-emerald-100 border-emerald-300":d==="picked_up"||d==="pickedup"?"text-blue-700 bg-blue-100 border-blue-300":d==="confirmed"?"text-amber-700 bg-amber-100 border-amber-300":d==="disputed"?"text-red-700 bg-red-100 border-red-300":"text-slate-600 bg-slate-100 border-slate-300"}function r(i,d){return i.some(c=>c.toLowerCase()===(d==null?void 0:d.toLowerCase()))}function o(i){const d=i==null?void 0:i.toLowerCase();return["confirmed","picked_up","pickedup"].includes(d)}return`
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
            <div class="glass-card p-5 space-y-4 ${o(i.status)?"ring-1 ring-blue-300 shadow-blue-100":""}">

              <!-- Order Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  ${o(i.status)?`
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
                ${s.map((n,f)=>{var S;const x=r(n.active,i.status),k=f===s.length-1;return`
                    <div class="flex-1 flex flex-col items-center">
                      <!-- Step circle -->
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all
                        ${x?"bg-emerald-600 text-white ring-2 ring-emerald-200":"bg-slate-100 text-slate-400 border border-slate-200"}">
                        <i class="fa-solid ${n.icon} text-[11px]"></i>
                      </div>
                      <!-- Connector line -->
                      ${k?"":`
                        <div class="absolute top-4 left-0 right-0 h-0.5 -z-10" style="left:calc(${f*100/(s.length-1)}% + 16px); width:calc(${100/(s.length-1)}% - 32px)">
                          <div class="h-full ${x&&r(((S=s[f+1])==null?void 0:S.active)??[],i.status)?"bg-emerald-400":"bg-slate-200"} rounded-full"></div>
                        </div>
                      `}
                      <!-- Step label -->
                      <span class="text-[9px] font-semibold mt-1.5 text-center leading-tight ${x?"text-emerald-800":"text-slate-400"}">
                        ${n.label}
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
  `}function Yt(l,e){const t=W[l];return`
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
  `}function Xt(l,e,t,s,a,r="listings",o=p.getPriceBenchmarks(),i=p.getCurrentUser()){const d=W[l];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(i==null?void 0:i.region)||"Oromia (Bishoftu)"}
            </span>
            ${p.getVerificationStatus()==="Approved"?`
              <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
                <i class="fa-solid fa-circle-check text-emerald-600"></i> ${d.verifiedFayda} ${i!=null&&i.kycDocumentNumber?`(${i.kycDocumentNumber})`:""}
              </span>
              ${i!=null&&i.tinNumber?`
                <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
                  <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${i.tinNumber}
                </span>
              `:""}
            `:p.getVerificationStatus()==="UnderReview"?`
              <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
                <i class="fa-solid fa-hourglass-half text-amber-600"></i> ${l==="am"?"ማረጋገጫ በመገምገም ላይ":"Verification Under Review"}
              </span>
            `:p.getVerificationStatus()==="Rejected"?`
              <span class="trust-badge text-red-800 bg-red-50 border-red-200">
                <i class="fa-solid fa-circle-xmark text-red-600"></i> ${l==="am"?"ማረጋገጫ አልጸደቀም":"Verification Rejected"}
              </span>
            `:`
              <span class="trust-badge text-slate-700 bg-slate-100 border-slate-200">
                <i class="fa-solid fa-shield-halved text-slate-500"></i> ${l==="am"?"ያልተረጋገጠ መለያ":"Unverified Account"}
              </span>
            `}
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

          <button onclick="window.toggleCreateListingModal()" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer">
            <i class="fa-solid fa-plus-circle"></i>
            <span class="${l==="am"?"lang-am":""}">${d.postNewListing}</span>
          </button>
        </div>
      </div>

      <!-- Verification Action Banner -->
      ${p.getVerificationStatus()!=="Approved"?`
        <div class="p-4 rounded-2xl ${p.getVerificationStatus()==="UnderReview"?"bg-amber-50 border border-amber-200":p.getVerificationStatus()==="Rejected"?"bg-red-50 border border-red-200":"bg-emerald-50 border border-emerald-200"} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${p.getVerificationStatus()==="UnderReview"?"⏳":p.getVerificationStatus()==="Rejected"?"❌":"🛡️"}</span>
            <div>
              <h4 class="text-sm font-bold ${p.getVerificationStatus()==="UnderReview"?"text-amber-900":p.getVerificationStatus()==="Rejected"?"text-red-900":"text-emerald-900"}">
                ${p.getVerificationStatus()==="UnderReview"?l==="am"?"ሰነዶችዎ በአድሚን በመገምገም ላይ ናቸው":"Fayda ID & TIN Verification Under Review":p.getVerificationStatus()==="Rejected"?l==="am"?"ማረጋገጫዎ አልጸደቀም፤ እባክዎ እንደገና ያስገቡ":"Verification Rejected - Action Required":l==="am"?"መለያዎን በፋይዳ (Fayda) እና በTIN ያረጋግጡ":"Complete Fayda ID & Taxpayer TIN Verification"}
              </h4>
              <p class="text-xs ${p.getVerificationStatus()==="UnderReview"?"text-amber-700":p.getVerificationStatus()==="Rejected"?"text-red-700":"text-emerald-700"}">
                ${i!=null&&i.rejectionReason?`${d.rejectionReasonLabel}: ${i.rejectionReason}`:d.verificationBannerText}
              </p>
            </div>
          </div>
          <button onclick="window.openVerificationWizard()" class="btn-primary text-xs py-2 px-4 shrink-0 shadow-xs cursor-pointer ${p.getVerificationStatus()==="UnderReview"?"bg-amber-700 hover:bg-amber-800":p.getVerificationStatus()==="Rejected"?"bg-red-700 hover:bg-red-800":"bg-emerald-700 hover:bg-emerald-800"}">
            <i class="fa-solid fa-id-card mr-1"></i> ${p.getVerificationStatus()==="Rejected"?d.resubmitDocsBtn:d.startVerificationBtn}
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

      ${r==="wallet"?Jt(l,s,t,i):r==="sms"?Zt(l):`

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
          ${o.map(c=>`
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
      `}

      <!-- Post New Produce Listing Modal (Voice Note + Advance Harvest + Benchmarking) -->
      ${a?ze(l):""}

    </div>
  `}function Jt(l,e,t,s){const a=W[l];return`
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
  `}function Zt(l){const e=W[l];return`
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
  `}function ze(l,e){const t=W[l];return`
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
  `}function ea(l,e,t,s=p.getOptimizedRoute(),a=p.getCurrentUser(),r=p.getIsOfflineMode(),o=p.getOfflineQueue().length){const i=W[l],d=(a==null?void 0:a.vehicleCapacityKg)||5e3,c=Math.min(100,Math.round(s.totalWeightKg/d*100));return`
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

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">
            ${i.driverPortalTitle}
          </h1>
        </div>

        <!-- Offline-First Mode Controls -->
        <div class="flex items-center gap-3">
          <button onclick="window.toggleDriverOfflineMode()" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${r?"bg-amber-600 text-white border-amber-600 shadow-md":"bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}">
            <i class="fa-solid fa-wifi-slash mr-1"></i> ${r?"Offline Mode Active":"Online Mode"}
          </button>

          ${o>0?`
            <button onclick="window.syncDriverOfflineQueue()" class="btn-primary text-xs py-2 px-3.5 shadow-sm cursor-pointer animate-bounce">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${i.offlineSyncBtn} (${o})
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
          ${s.stops.map((n,f)=>`
            <div class="flex items-start gap-4 p-4 rounded-2xl ${n.completed?"bg-emerald-50/60 border border-emerald-100":"bg-slate-50 border border-slate-200"}">
              <div class="w-8 h-8 rounded-full ${n.completed?"bg-emerald-600 text-white":n.type==="dropoff"?"bg-blue-600 text-white":"bg-amber-600 text-white"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5">
                ${n.completed?'<i class="fa-solid fa-check"></i>':n.stopNumber}
              </div>

              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold ${n.type==="dropoff"?"text-blue-800":"text-amber-800"} uppercase">
                    ${n.type==="pickup"?"Stop "+n.stopNumber+": Farm Pickup":"Final Stop: Buyer Wholesale Depot"}
                  </span>
                  <span class="text-xs font-bold text-slate-500">${n.weightKg} kg</span>
                </div>

                <h4 class="text-sm font-extrabold text-slate-900 truncate">${n.locationName}</h4>
                <p class="text-xs text-slate-600"><i class="fa-solid fa-user text-slate-400 mr-1"></i> Contact: <strong class="text-slate-800">${n.contactName}</strong> (${n.phone})</p>
                <p class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-boxes-stacked text-slate-400 mr-1"></i> Cargo: ${n.cargoDetails}</p>
              </div>

              <div class="shrink-0">
                ${n.completed?`
                  <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <i class="fa-solid fa-check"></i> Picked Up
                  </span>
                `:`
                  <button onclick="window.handleDriverStopAction(${f})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
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
            ${e.map(n=>`
              <div class="glass-card p-5 space-y-4">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Waybill #${n.waybillNumber||"WB-FTA-001"}</span>
                    <h3 class="text-base font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">${n.productName} (${n.qtyKg} kg)</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-slate-400 font-medium block">${i.tripCommission} + Rural Subsidy</span>
                    <span class="text-lg font-black text-amber-700">${(n.driverCut+(n.driverSubsidyEtb||150)).toLocaleString()} ETB</span>
                  </div>
                </div>

                <!-- Origin & Destination Route -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span class="font-bold text-emerald-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-dot text-emerald-600"></i> Farm Pickup Location
                    </span>
                    <p class="text-slate-800 font-semibold">${n.farmerRegion}</p>
                    <p class="text-slate-500 font-medium">Farmer: ${n.farmerName} (${n.farmerPhone})</p>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                    <span class="font-bold text-blue-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-location-pin text-blue-600"></i> Buyer Delivery Depot
                    </span>
                    <p class="text-slate-800 font-semibold">${n.deliveryAddress||"Addis Ababa"}</p>
                    <p class="text-slate-500 font-medium">Buyer: ${n.buyerName} (${n.buyerPhone})</p>
                  </div>
                </div>

                <!-- Driver Actions with Photo + GPS verification and Waybill Viewer -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>Status:</span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${n.status==="picked_up"?"bg-amber-100 text-amber-800":n.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-800"}">${n.status.toUpperCase()}</span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button onclick="window.openWaybillModal('${n.id}')" class="btn-secondary text-xs py-2 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-sky-600"></i> ${i.viewWaybillBtn}
                    </button>

                    <button onclick="window.openContractModal('${n.id}')" class="btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${i.viewContractBtn}
                    </button>

                    ${n.status==="confirmed"?`
                      <button onclick="window.driverPickupWithProof('${n.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-camera mr-1"></i> ${i.uploadProof} & Pickup
                      </button>
                    `:n.status==="picked_up"?`
                      <button onclick="window.driverCompleteDeliveryProof('${n.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-location-crosshairs mr-1"></i> Dropoff + GPS Proof
                      </button>
                    `:`
                      <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Trip Completed · ${(n.driverCut+(n.driverSubsidyEtb||150)).toLocaleString()} ETB Deposited
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
  `}function ta(l,e="users",t="all",s="all"){const a=W[l],r=p.getAllUsers(),o=p.getBanners(),i=p.getListings(),d=p.getPlatformConfig(),c=p.getSystemAuditLogs(),n=p.getDeliveryZones(),f=p.getFeatureFlags(),x=p.getPendingPayoutApprovals(),k=p.getGlobalBusinessRules(),S=p.getBlacklist(),A=t==="all"?r:r.filter(v=>v.role.toLowerCase()===t.toLowerCase()),y=s==="all"?c:c.filter(v=>v.category.toLowerCase()===s.toLowerCase()),_={all:r.length,farmer:r.filter(v=>v.role==="farmer").length,buyer:r.filter(v=>v.role==="buyer").length,driver:r.filter(v=>v.role==="driver").length,agent:r.filter(v=>v.role==="agent").length,admin:r.filter(v=>v.role==="admin").length,superadmin:r.filter(v=>v.role==="superadmin").length};return`
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
            ${a.superAdminTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
            ${a.superAdminSubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 relative z-10">
          ${d.emergencyEscrowFrozen?`
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
          <span>${a.tabUserMaster} (${r.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('banners')" class="cat-pill ${e==="banners"?"active":""}">
          <i class="fa-solid fa-panorama text-emerald-500"></i>
          <span>${a.tabBanners} (${o.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('moderation')" class="cat-pill ${e==="moderation"?"active":""}">
          <i class="fa-solid fa-gavel text-purple-500"></i>
          <span>${a.tabModeration} (${i.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('permissions')" class="cat-pill ${e==="permissions"?"active":""}">
          <i class="fa-solid fa-key text-purple-500"></i>
          <span>${a.tabPermissions}</span>
        </button>

        <button onclick="window.setSuperAdminTab('config')" class="cat-pill ${e==="config"?"active":""}">
          <i class="fa-solid fa-sliders text-emerald-500"></i>
          <span>${a.tabPlatformConfig}</span>
        </button>

        <button onclick="window.setSuperAdminTab('financials')" class="cat-pill ${e==="financials"?"active":""}">
          <i class="fa-solid fa-money-bill-transfer text-amber-500"></i>
          <span>${a.tabFinancialOversight} (${x.filter(v=>v.status==="Pending").length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('audit')" class="cat-pill ${e==="audit"?"active":""}">
          <i class="fa-solid fa-clipboard-list text-blue-500"></i>
          <span>${a.tabAuditLogs} (${c.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('zones')" class="cat-pill ${e==="zones"?"active":""}">
          <i class="fa-solid fa-map-location-dot text-teal-500"></i>
          <span>${a.tabZones} (${n.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('feature_flags')" class="cat-pill ${e==="feature_flags"?"active":""}">
          <i class="fa-solid fa-toggle-on text-indigo-500"></i>
          <span>${a.tabFeatureFlags}</span>
        </button>

        <button onclick="window.setSuperAdminTab('emergency')" class="cat-pill ${e==="emergency"?"active":""}">
          <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
          <span>${a.tabEmergency}</span>
        </button>

        <button onclick="window.setSuperAdminTab('rules')" class="cat-pill ${e==="rules"?"active":""}">
          <i class="fa-solid fa-gavel text-amber-600"></i>
          <span>${a.tabBusinessRules}</span>
        </button>

        <button onclick="window.setSuperAdminTab('db_ops')" class="cat-pill ${e==="db_ops"?"active":""}">
          <i class="fa-solid fa-server text-slate-600"></i>
          <span>${a.tabDbOps}</span>
        </button>
      </div>

      <!-- Tab Content Panels -->
      ${aa(l,e,A,t,_,d,y,s,n,f,x,k,S)}

    </div>
  `}function aa(l,e,t,s,a,r,o,i,d,c,n,f,x){switch(e){case"users":return We(l,t,s,a);case"banners":return Qe(l);case"moderation":return Ye(l);case"permissions":return sa(l);case"config":return ra(l,r);case"financials":return ia(l,n);case"audit":return oa(l,o,i);case"zones":return na(l,d);case"feature_flags":return la(l,c);case"emergency":return da(l,r,x);case"rules":return ca(l,f);case"db_ops":return pa(l);default:return We(l,t,s,a)}}function We(l,e,t,s){const a=W[l];return`
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
                      <div class="w-8 h-8 rounded-full ${ua(r.role)} flex items-center justify-center font-bold text-xs shrink-0">
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
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${ma(r.role)}">
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
  `}function sa(l){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${l==="am"?"የሚናዎች እና ፈቃዶች ማትሪክስ (RBAC Matrix)":"Role-Based Access Control & Permission Matrix"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${l==="am"?"ለእያንዳንዱ አድሚን እና ኤጀንት የሚሰጡ ልዩ ፈቃዶችን ያስተካክሉ።":"Define and grant granular capabilities for Marketplace Admins, Field Extension Agents, and Financial Auditors."}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <!-- Marketplace Admin Card -->
        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-black text-slate-900 text-base">
              <i class="fa-solid fa-shield-halved text-purple-600"></i> Marketplace Admin
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-800 rounded">Standard Admin</span>
          </div>

          <div class="space-y-2.5 text-xs text-slate-700">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>Resolve & Arbitrate Produce Disputes</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>Review & Approve Farmer/Driver KYC</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>Broadcast Twilio SMS Bulletins</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>View Financial Volume & MOR VAT</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-slate-400">
              <input type="checkbox" disabled class="rounded" />
              <span>Modify Escrow Split Percentages (Super Admin Only)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-slate-400">
              <input type="checkbox" disabled class="rounded" />
              <span>Emergency Platform Escrow Freeze (Super Admin Only)</span>
            </label>
          </div>
          <button onclick="window.showToast('Admin permissions updated in security vault.')" class="btn-secondary w-full py-2 text-xs font-bold cursor-pointer">
            Save Admin Permissions
          </button>
        </div>

        <!-- Field Extension Agent Card -->
        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-black text-slate-900 text-base">
              <i class="fa-solid fa-users-gear text-teal-600"></i> Field Extension Agent
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 bg-teal-100 text-teal-800 rounded">Rural Extension</span>
          </div>

          <div class="space-y-2.5 text-xs text-slate-700">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Onboard Farmers via Mobile Camera</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Scan & Capture Kebele ID & Fayda National ID</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Submit Produce Listings on Behalf of Farmer</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Earn Extension Agent Commission per Verified Farmer</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-slate-400">
              <input type="checkbox" disabled class="rounded" />
              <span>Approve KYC (Requires Marketplace Admin)</span>
            </label>
          </div>
          <button onclick="window.showToast('Field Agent permissions updated.')" class="btn-secondary w-full py-2 text-xs font-bold cursor-pointer">
            Save Agent Permissions
          </button>
        </div>

        <!-- Super Admin Card -->
        <div class="glass-card p-5 border-l-4 border-rose-600 bg-rose-50/30 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-black text-rose-950 text-base">
              <i class="fa-solid fa-crown text-rose-600"></i> Super Admin
            </div>
            <span class="text-[10px] font-black px-2 py-0.5 bg-rose-200 text-rose-900 rounded">Root Level</span>
          </div>

          <div class="space-y-2.5 text-xs text-rose-950 font-medium">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Full System Access & Unrestricted CRUD
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Create & Revoke Admin Roles
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Live User Impersonation Session Engine
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Telebirr 90/5/5 Split Configuration
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Emergency Platform-Wide Escrow Freeze
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Database Snapshot Backups & Exports
            </div>
          </div>
          <div class="p-2.5 rounded-xl bg-white border border-rose-200 text-[11px] text-rose-800 font-semibold">
            Root access is protected with 2FA and multi-sig security.
          </div>
        </div>

      </div>
    </div>
  `}function ra(l,e){return`
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
  `}function ia(l,e){const t=e.filter(s=>s.status==="Pending");return`
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
  `}function oa(l,e,t){return`
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
                    <span class="px-2 py-0.5 rounded text-[10px] font-black ${fa(s.category)}">
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
  `}function na(l,e){return`
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
  `}function la(l,e){return`
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
  `}function da(l,e,t){return`
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
  `}function ca(l,e){return`
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
  `}function ua(l){switch(l){case"superadmin":return"bg-rose-100 text-rose-800";case"admin":return"bg-purple-100 text-purple-800";case"farmer":return"bg-emerald-100 text-emerald-800";case"buyer":return"bg-blue-100 text-blue-800";case"driver":return"bg-amber-100 text-amber-800";case"agent":return"bg-teal-100 text-teal-800";default:return"bg-slate-100 text-slate-800"}}function ma(l){switch(l){case"superadmin":return"bg-rose-100 text-rose-900 border border-rose-300";case"admin":return"bg-purple-100 text-purple-900 border border-purple-300";case"farmer":return"bg-emerald-100 text-emerald-900 border border-emerald-300";case"buyer":return"bg-blue-100 text-blue-900 border border-blue-300";case"driver":return"bg-amber-100 text-amber-900 border border-amber-300";case"agent":return"bg-teal-100 text-teal-900 border border-teal-300";default:return"bg-slate-100 text-slate-800"}}function ga(l){switch(l){case"superadmin":return'<i class="fa-solid fa-crown text-rose-600"></i>';case"admin":return'<i class="fa-solid fa-shield-halved text-purple-600"></i>';case"farmer":return'<i class="fa-solid fa-seedling text-emerald-600"></i>';case"buyer":return'<i class="fa-solid fa-shopping-basket text-blue-600"></i>';case"driver":return'<i class="fa-solid fa-truck-fast text-amber-600"></i>';case"agent":return'<i class="fa-solid fa-users-gear text-teal-600"></i>';default:return'<i class="fa-solid fa-user"></i>'}}function fa(l){switch(l){case"USER_CRUD":return"bg-rose-100 text-rose-800";case"CONFIG":return"bg-purple-100 text-purple-800";case"FINANCE":return"bg-emerald-100 text-emerald-800";case"DISPUTE":return"bg-amber-100 text-amber-800";case"EMERGENCY":return"bg-red-100 text-red-800";case"IMPERSONATION":return"bg-blue-100 text-blue-800";default:return"bg-slate-100 text-slate-800"}}function Qe(l){const e=W[l],t=p.getBanners();return`
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
  `}function Ye(l){const e=W[l],t=p.getListings();return`
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
              `:t.map(s=>{const a=s.moderationStatus==="Flagged",r=s.marketBenchmarkPrice||50,o=Math.round((s.pricePerKg-r)/r*100);return`
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
                        <div class="text-[10px] ${Math.abs(o)>30?"text-amber-700 font-bold":"text-slate-400"}">
                          ${o>0?`+${o}%`:`${o}%`} vs Avg (${r} ETB)
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
  `}function ba(l,e,t,s=p.getAnomalyAlerts(),a=p.getKycQueue(),r=p.getRegionalAnalytics(),o="disputes"){const i=W[l],d=p.getBanners(),c=p.getListings();return`
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

      <!-- Admin Tab Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button onclick="window.setAdminTab('disputes')" class="cat-pill ${o==="disputes"?"active":""}">
          <i class="fa-solid fa-scale-balanced"></i>
          <span>${i.resolveDisputeTitle} (${t.length})</span>
        </button>
        <button onclick="window.setAdminTab('moderation')" class="cat-pill ${o==="moderation"?"active":""}">
          <i class="fa-solid fa-gavel text-purple-600"></i>
          <span>${i.tabModeration} (${c.length})</span>
        </button>
        <button onclick="window.setAdminTab('banners')" class="cat-pill ${o==="banners"?"active":""}">
          <i class="fa-solid fa-panorama text-emerald-600"></i>
          <span>${i.tabBanners} (${d.length})</span>
        </button>
        <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${o==="anomalies"?"active":""}">
          <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
          <span>${i.anomalyScannerTitle} (${s.length})</span>
        </button>
        <button onclick="window.setAdminTab('kyc')" class="cat-pill ${o==="kyc"?"active":""}">
          <i class="fa-solid fa-id-card"></i>
          <span>${i.kycQueueTitle} (${a.filter(n=>n.status==="Pending").length})</span>
        </button>
        <button onclick="window.setAdminTab('tax_compliance')" class="cat-pill ${o==="tax_compliance"?"active":""}">
          <i class="fa-solid fa-file-invoice-dollar"></i>
          <span>Fiscal & Tax Invoicing</span>
        </button>
        <button onclick="window.setAdminTab('analytics')" class="cat-pill ${o==="analytics"?"active":""}">
          <i class="fa-solid fa-chart-pie"></i>
          <span>${i.regionalAnalyticsTitle}</span>
        </button>
        <button onclick="window.setAdminTab('sms')" class="cat-pill ${o==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${i.broadcastSmsTitle}</span>
        </button>
      </div>

      <!-- Tab Content: Moderation & Banners -->
      ${o==="moderation"?Ye(l):""}
      ${o==="banners"?Qe(l):""}

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split with Legal Decrees) -->
      ${o==="disputes"?`
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
                        <i class="fa-solid fa-gavel mr-1"></i> ${i.viewArbitrationBtn}
                      </button>
                      <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold">
                        <i class="fa-solid fa-lock mr-1"></i> Frozen (${n.totalEtb.toLocaleString()} ETB)
                      </span>
                    </div>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${i.disputeEvidence}:</span>
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
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${i.releaseFarmerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${n.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${i.refundBuyerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${n.id}', 'PartialSplit')" class="btn-secondary text-xs py-2.5 px-4 text-purple-700 border-purple-300 hover:bg-purple-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-scale-balanced"></i> ${i.splitFiftyFiftyBtn}
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </section>
      `:""}

      <!-- Tab Content 2: Fraud & Anomaly Detection Monitor -->
      ${o==="anomalies"?`
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

      <!-- Tab Content 3: Comprehensive Verification & Regulatory Audit Queue -->
      ${o==="kyc"?`
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
            ${p.getVerificationQueue().map(n=>`
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
                      📋 ${l==="am"?"የመታወቂያ እና የታክስ መረጃ":"Identity & Tax Record"}
                    </div>
                    <div>
                      <span class="text-slate-500 block">${i.tinNumberLabel}:</span>
                      <strong class="font-mono text-emerald-800 text-sm">${n.tinNumber||"0099881122"}</strong>
                    </div>
                    ${n.documents.map(f=>`
                      <div class="pt-1">
                        <span class="text-slate-500 block">${f.documentType}:</span>
                        <strong class="font-mono text-slate-800">${f.documentNumber}</strong>
                      </div>
                    `).join("")}
                    ${n.rejectionReason?`
                      <div class="p-2 rounded bg-red-50 text-red-800 text-[11px] font-medium border border-red-200 mt-2">
                        <strong>${i.rejectionReasonLabel}:</strong> ${n.rejectionReason}
                      </div>
                    `:""}
                  </div>

                  <!-- Column 2 & 3: High-Res Document Photo Previews -->
                  <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${n.documents.flatMap(f=>[f.frontImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">🪪 ${f.documentType} (Front)</div>
                          <img src="${f.frontImageUrl}" alt="Document Front" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${f.frontImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      `:"",f.backImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">📜 ${f.documentType} (Back)</div>
                          <img src="${f.backImageUrl}" alt="Document Back" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${f.backImageUrl}', '_blank')" />
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
                      onclick="window.adminReviewVerification('${n.userId}', 'Reject')" 
                      class="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
                    >
                      <i class="fa-solid fa-xmark mr-1"></i> ${i.rejectVerificationAction}
                    </button>
                    
                    <button 
                      onclick="window.adminReviewVerification('${n.userId}', 'Approve')" 
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
      `:""}

      <!-- Tab Content 4: Fiscal & Tax Invoicing Registry -->
      ${o==="tax_compliance"?`
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
                  ${p.getOrders().map(n=>`
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
      ${o==="analytics"?`
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
      ${o==="sms"?`
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
      `:""}

    </div>
  `}class ha{constructor(e="en"){b(this,"currentLang","en");b(this,"activeTab","register");b(this,"ussdPhone","+251944556677");b(this,"ussdInput","*990#");b(this,"ussdScreenText",`Welcome to Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit`);this.currentLang=e}setLanguage(e){this.currentLang=e}render(){const e=W[this.currentLang];p.getCurrentUser();const t=p.getAgentRegisteredFarmers(),s=t.filter(r=>r.status==="Approved").length,a=t.length*250;return`
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

        <!-- Tab Contents -->
        ${this.activeTab==="register"?this.renderRegisterTab():""}
        ${this.activeTab==="roster"?this.renderRosterTab(t):""}
        ${this.activeTab==="ussd_sim"?this.renderUssdTab():""}

      </div>
    `}renderRegisterTab(){const e=W[this.currentLang];return`
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
    `}renderRosterTab(e){const t=W[this.currentLang];return`
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
    `}switchTab(e){this.activeTab=e}setUssdInput(e){this.ussdInput=e;const t=document.getElementById("ussdCodeInput");t&&(t.value=e)}async executeUssd(){const e=document.getElementById("ussdCodeInput"),t=(e==null?void 0:e.value)||this.ussdInput,s=await p.sendInboundUssdSimulation(this.ussdPhone,t);this.ussdScreenText=s;const a=document.getElementById("ussdDisplayScreen");a&&(a.innerText=s)}}class va{constructor(e="en"){b(this,"currentLang","en");b(this,"isOpen",!1);b(this,"currentStep",1);b(this,"faydaNumber","");b(this,"tinNumber","");b(this,"kebeleNumber","");b(this,"frontImageUrl","https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80");b(this,"backImageUrl","https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80");this.currentLang=e}setLanguage(e){this.currentLang=e}open(e=1){this.isOpen=!0,this.currentStep=e;const t=p.getCurrentUser();t!=null&&t.tinNumber&&(this.tinNumber=t.tinNumber),this.render()}close(){this.isOpen=!1;const e=document.getElementById("verificationWizardModal");e&&(e.innerHTML="")}render(){const e=document.getElementById("verificationWizardModal");if(!e||!this.isOpen)return;const t=W[this.currentLang],s=p.getCurrentUser(),a=p.getVerificationStatus();e.innerHTML=`
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
    `}renderStepContent(){const e=W[this.currentLang],t=p.getCurrentUser();return this.currentStep===1?`
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
      `:""}getStatusBgColor(e){switch(e){case"Approved":return"rgba(16, 185, 129, 0.12)";case"UnderReview":return"rgba(234, 179, 8, 0.12)";case"Rejected":return"rgba(239, 68, 68, 0.12)";default:return"rgba(100, 116, 139, 0.1)"}}getStatusTextColor(e){switch(e){case"Approved":return"#047857";case"UnderReview":return"#b45309";case"Rejected":return"#b91c1c";default:return"#475569"}}getStatusIcon(e){switch(e){case"Approved":return"✅";case"UnderReview":return"⏳";case"Rejected":return"❌";default:return"📝"}}formatStatus(e){const t=W[this.currentLang];switch(e){case"Approved":return t.statusApproved;case"UnderReview":return t.statusUnderReview;case"Rejected":return t.statusRejected;default:return t.statusPendingSubmission}}updateField(e,t){e==="fayda"&&(this.faydaNumber=t),e==="tin"&&(this.tinNumber=t),e==="kebele"&&(this.kebeleNumber=t)}setStep(e){this.currentStep=e,this.render()}async submit(){const e=this.faydaNumber||"FAN-8812-4091-2810",t=this.tinNumber||"0099881122";await p.submitVerificationDocuments(t,[{documentType:"FaydaId",documentNumber:e,frontImageUrl:this.frontImageUrl,backImageUrl:this.backImageUrl},{documentType:"TinCertificate",documentNumber:t,frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"}]),this.close()}}function xa(l,e){return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-envelope-open-text text-emerald-700 text-lg"></i>
            <h3 class="text-base font-bold text-slate-900">
              ${l==="am"?"የኤስኤምኤስ (SMS) እና የስርዓት መልእክቶች":"SMS & Push Notifications"}
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
                <p class="text-slate-800 font-medium leading-relaxed ${l==="am"?"lang-am":""}">
                  ${l==="am"&&t.messageAm?t.messageAm:t.messageEn}
                </p>
              </div>
            `).join("")}
          </div>
        `}

      </div>
    </div>
  `}function ya(l,e,t,s,a="",r="",o="",i=""){return`
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
                      <span class="block font-bold">${r?`Account: <strong>${r}</strong> (${o})`:"SMS Dispatched via Twilio Gateway"}</span>
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
                    ${l==="am"?"የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ":"Enter 6-Digit Verification Code"}
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
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${l==="am"?"የኤስኤምኤስ ማረጋገጫ ኮድ ላክ":"Verify & Send SMS Code"}
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
  `}class wa{constructor(){b(this,"currentLang","en")}setLanguage(e){this.currentLang=e}renderInvoice(e){const t=this.currentLang==="am";return`
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
    `}}const xe=new wa;class Aa{constructor(e="en"){b(this,"currentLang","en");b(this,"activePhotoIndex",0);b(this,"selectedQtyKg",50);this.currentLang=e}setLanguage(e){this.currentLang=e}setActivePhotoIndex(e){this.activePhotoIndex=e}setSelectedQtyKg(e){this.selectedQtyKg=Math.max(1,e)}render(e){if(!e)return"";const t=W[this.currentLang],s=this.currentLang==="am",a=e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=80"],r=Math.min(this.activePhotoIndex,a.length-1),o=a[r],i=Math.max(e.minOrderKg||10,this.selectedQtyKg||e.minOrderKg||50),d=i*e.pricePerKg,c=Math.round(d*.9),n=Math.round(d*.05),f=Math.round(d*.05),x=e.marketBenchmarkPrice||e.pricePerKg*1.15,k=Math.max(0,x-e.pricePerKg),S=x>0?Math.round(k/x*100):0,A=e.description||`Freshly harvested Grade 1 ${e.productName} cultivated directly by smallholder farmer ${e.farmerName} in ${e.region}. Verified under Ethiopian agricultural commodity standards with 90% direct farmer escrow payout.`,y=e.descriptionAm||`በ${e.region} በአርሶ አደር ${e.farmerNameAm||e.farmerName} የተመረተ ምርጥ ደረጃ ${e.nameAm||e.productName}። በቴሌብር ዋስትና 90% ቀጥታ ለአርሶ አደሩ የሚከፈልበት ተመራጭ ምርት።`;return`
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
                    src="${o}" 
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
                      ${a.map((_,v)=>`
                        <button 
                          onclick="window.selectProducePhoto(${v})" 
                          class="relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${v===r?"border-emerald-600 ring-2 ring-emerald-500/30 scale-102 shadow-md":"border-slate-200 hover:border-emerald-400 opacity-70 hover:opacity-100"}"
                        >
                          <img src="${_}" alt="Photo angle ${v+1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                          <span class="absolute bottom-1 right-1 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                            ${v===0?"Harvest":v===1?"Packaged":"Inspection"}
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
                        <i class="fa-solid fa-star mr-1"></i> ${e.farmerRating||4.9}
                      </div>
                      <div class="text-[10px] text-slate-400 font-medium">${e.reviewCount||24} Verified Reviews</div>
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
                      <i class="fa-solid fa-arrow-down"></i> ${S}% Direct Savings
                    </span>
                  </div>

                  <div class="flex items-baseline justify-between pt-1">
                    <div>
                      <div class="text-[11px] text-slate-500">Regional Depot Benchmark</div>
                      <div class="text-sm font-bold text-slate-700 line-through">
                        ${x.toFixed(1)} ETB/kg
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
                  ${y}
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
                    <div>Driver & Escrow (10%): <strong class="text-slate-200">${(n+f).toLocaleString()} ETB</strong></div>
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
    `}}const Se=new Aa;function ka(l,e=!1,t=!1,s=null,a=!1,r=!1,o=!1,i=null,d=!1,c=null){return`
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
    ${t&&s?(()=>{const n=p.getUserById(s);return n?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
            <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-5 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <h3 class="text-base font-black text-white">Edit User Profile: ${n.name}</h3>
              <p class="text-[11px] text-slate-400 font-mono">${n.id}</p>
            </div>

            <form onsubmit="window.handleEditUserSubmit(event, '${n.id}')" class="p-6 space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Full Name</label>
                  <input type="text" id="editNameInput" required value="${n.name}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Mobile Phone</label>
                  <input type="tel" id="editPhoneInput" required value="${n.phone}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Role</label>
                  <select id="editRoleSelect" class="input-field text-xs font-bold">
                    <option value="farmer" ${n.role==="farmer"?"selected":""}>Farmer</option>
                    <option value="buyer" ${n.role==="buyer"?"selected":""}>Buyer</option>
                    <option value="driver" ${n.role==="driver"?"selected":""}>Driver</option>
                    <option value="agent" ${n.role==="agent"?"selected":""}>Agent</option>
                    <option value="admin" ${n.role==="admin"?"selected":""}>Admin</option>
                    <option value="superadmin" ${n.role==="superadmin"?"selected":""}>Super Admin</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Status</label>
                  <select id="editStatusSelect" class="input-field text-xs font-bold">
                    <option value="active" ${n.status!=="suspended"?"selected":""}>Active</option>
                    <option value="suspended" ${n.status==="suspended"?"selected":""}>Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region</label>
                <input type="text" id="editRegionInput" required value="${n.region}" class="input-field text-xs font-bold" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Fayda National ID</label>
                  <input type="text" id="editFaydaInput" value="${n.faydaId||""}" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-mono font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">TIN Number</label>
                  <input type="text" id="editTinInput" value="${n.tinNumber||""}" placeholder="0011223344" class="input-field text-xs font-mono font-bold" />
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
    ${o?(()=>{var f,x,k,S;const n=i?p.getBannerById(i):null;return`
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
                  <h3 class="text-lg font-black text-white">${n?"Edit Promotional Banner":"Create Promotional Banner"}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleSaveBannerSubmit(event, '${i||""}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (English) *</label>
                  <input type="text" id="bannerTitleInput" required value="${n?n.title:""}" placeholder="e.g. Fresh Harvest Direct From Bishoftu" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (Amharic)</label>
                  <input type="text" id="bannerTitleAmInput" value="${(n==null?void 0:n.titleAm)||""}" placeholder="የቢሾፍቱ አዳዲስ ምርቶች በቀጥታ ከእርሻ" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (English)</label>
                  <textarea id="bannerSubtitleInput" rows="2" placeholder="Brief announcement details..." class="input-field text-xs">${(n==null?void 0:n.subtitle)||""}</textarea>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (Amharic)</label>
                  <textarea id="bannerSubtitleAmInput" rows="2" placeholder="የማስታወቂያው ዝርዝር..." class="input-field text-xs">${(n==null?void 0:n.subtitleAm)||""}</textarea>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Audience</label>
                  <select id="bannerAudienceSelect" class="input-field text-xs font-bold">
                    <option value="All" ${(n==null?void 0:n.targetAudience)==="All"?"selected":""}>🌐 All Portals</option>
                    <option value="Buyer" ${(n==null?void 0:n.targetAudience)==="Buyer"?"selected":""}>🛒 Wholesale Buyers</option>
                    <option value="Farmer" ${(n==null?void 0:n.targetAudience)==="Farmer"?"selected":""}>🌾 Farmers & Producers</option>
                    <option value="Driver" ${(n==null?void 0:n.targetAudience)==="Driver"?"selected":""}>🚚 Logistics Drivers</option>
                    <option value="Agent" ${(n==null?void 0:n.targetAudience)==="Agent"?"selected":""}>👥 Extension Agents</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Region</label>
                  <select id="bannerRegionSelect" class="input-field text-xs font-bold">
                    <option value="All" ${(n==null?void 0:n.targetRegion)==="All"?"selected":""}>All Regions</option>
                    <option value="Addis Ababa" ${(n==null?void 0:n.targetRegion)==="Addis Ababa"?"selected":""}>Addis Ababa</option>
                    <option value="Oromia" ${(n==null?void 0:n.targetRegion)==="Oromia"?"selected":""}>Oromia</option>
                    <option value="Amhara" ${(n==null?void 0:n.targetRegion)==="Amhara"?"selected":""}>Amhara</option>
                    <option value="Sidama" ${(n==null?void 0:n.targetRegion)==="Sidama"?"selected":""}>Sidama</option>
                    <option value="SNNPR" ${(n==null?void 0:n.targetRegion)==="SNNPR"?"selected":""}>SNNPR</option>
                    <option value="Tigray" ${(n==null?void 0:n.targetRegion)==="Tigray"?"selected":""}>Tigray</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Display Priority (1-10)</label>
                  <input type="number" id="bannerPriorityInput" min="1" max="10" value="${n?n.priority:5}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (e.g. Harvest 2026)</label>
                  <input type="text" id="bannerBadgeInput" value="${(n==null?void 0:n.badgeText)||""}" placeholder="e.g. Special Promotion" class="input-field text-xs" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (Amharic)</label>
                  <input type="text" id="bannerBadgeAmInput" value="${(n==null?void 0:n.badgeTextAm)||""}" placeholder="e.g. ልዩ ቅናሽ" class="input-field text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Button Text</label>
                  <input type="text" id="bannerCtaTextInput" value="${(n==null?void 0:n.ctaText)||"Browse Marketplace"}" placeholder="e.g. Order Now" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Target Action / Tab</label>
                  <select id="bannerCtaLinkSelect" class="input-field text-xs font-bold">
                    <option value="marketplace" ${(n==null?void 0:n.ctaLink)==="marketplace"?"selected":""}>🛒 Marketplace (Buyer)</option>
                    <option value="farmer" ${(n==null?void 0:n.ctaLink)==="farmer"?"selected":""}>🌾 Farmer Portal</option>
                    <option value="driver" ${(n==null?void 0:n.ctaLink)==="driver"?"selected":""}>🚚 Driver Logistics</option>
                    <option value="agent" ${(n==null?void 0:n.ctaLink)==="agent"?"selected":""}>👥 Agent Directory</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Banner Background Image URL</label>
                <input type="url" id="bannerImageUrlInput" value="${(n==null?void 0:n.imageUrl)||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"}" class="input-field text-xs font-mono" />
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
                  <option value="from-emerald-900 via-teal-900 to-slate-900" ${(f=n==null?void 0:n.themeGradient)!=null&&f.includes("emerald")?"selected":""}>🍃 Emerald & Teal (Agriculture/Harvest)</option>
                  <option value="from-blue-900 via-indigo-950 to-slate-900" ${(x=n==null?void 0:n.themeGradient)!=null&&x.includes("blue")?"selected":""}>🔷 Royal Blue & Indigo (Legal/Fayda)</option>
                  <option value="from-amber-900 via-orange-950 to-slate-900" ${(k=n==null?void 0:n.themeGradient)!=null&&k.includes("amber")?"selected":""}>🔶 Amber & Orange (Freight Logistics)</option>
                  <option value="from-rose-950 via-slate-900 to-purple-950" ${(S=n==null?void 0:n.themeGradient)!=null&&S.includes("rose")?"selected":""}>👑 Rose & Purple (Super Admin Spotlight)</option>
                </select>
              </div>

              <div class="flex items-center gap-2 pt-2">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="bannerIsActiveCheck" ${n?n.isActive?"checked":"":"checked"} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Activate Banner Immediately Upon Saving</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="btn-primary py-2 px-5 font-bold shadow-md cursor-pointer">
                  ${n?"Save Changes":"Publish Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      `})():""}

    <!-- Moderate / Edit Produce Listing Modal -->
    ${d&&c?(()=>{var f,x,k;const n=p.getListings().find(S=>S.id===c);return n?`
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
                  <h3 class="text-lg font-black text-white">Moderate Listing: ${n.productName}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleAdminEditListingSubmit(event, '${n.id}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <!-- Farmer Info Card -->
              <div class="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800">${n.farmerName} <span class="text-slate-400 font-normal">(${n.farmerPhone})</span></p>
                  <p class="text-[11px] text-slate-500">${n.region}</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-white text-purple-800 border border-purple-200 text-[10px] font-bold">
                  Listing ID: ${n.id.slice(0,8)}...
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (English) *</label>
                  <input type="text" id="listingNameInput" required value="${n.productName}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (Amharic)</label>
                  <input type="text" id="listingNameAmInput" value="${n.nameAm||""}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Produce Category</label>
                  <select id="listingCategorySelect" class="input-field text-xs font-bold">
                    <option value="Vegetables" ${n.category==="Vegetables"?"selected":""}>Vegetables</option>
                    <option value="Cereals" ${n.category==="Cereals"?"selected":""}>Cereals / Grains</option>
                    <option value="Fruits" ${n.category==="Fruits"?"selected":""}>Fruits</option>
                    <option value="Pulses" ${n.category==="Pulses"?"selected":""}>Pulses</option>
                    <option value="Spices" ${n.category==="Spices"?"selected":""}>Spices</option>
                    <option value="Oilseeds" ${n.category==="Oilseeds"?"selected":""}>Oilseeds</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Grade / Quality</label>
                  <select id="listingGradeSelect" class="input-field text-xs font-bold">
                    <option value="Grade 1 (Premium / Export)" ${(f=n.grade)!=null&&f.includes("1")?"selected":""}>Grade 1 (Premium / Export)</option>
                    <option value="Grade 2 (Standard Wholesale)" ${(x=n.grade)!=null&&x.includes("2")||!n.grade?"selected":""}>Grade 2 (Standard Wholesale)</option>
                    <option value="Grade 3 (Processing / Bulk)" ${(k=n.grade)!=null&&k.includes("3")?"selected":""}>Grade 3 (Processing / Bulk)</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Moderation Status</label>
                  <select id="listingModerationStatusSelect" class="input-field text-xs font-bold ${n.moderationStatus==="Flagged"?"bg-red-50 text-red-800":"bg-emerald-50 text-emerald-800"}">
                    <option value="Approved" ${n.moderationStatus==="Approved"||!n.moderationStatus?"selected":""}>✅ Approved (Live on Marketplace)</option>
                    <option value="PendingReview" ${n.moderationStatus==="PendingReview"?"selected":""}>⏳ Pending Review (Hidden)</option>
                    <option value="Flagged" ${n.moderationStatus==="Flagged"?"selected":""}>⚠️ Flagged (Price Anomaly / Review)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Price per Kg (ETB) *</label>
                  <input type="number" step="0.5" id="listingPriceInput" required value="${n.pricePerKg}" class="input-field text-xs font-bold font-mono" />
                  <span class="text-[10px] text-slate-400">Benchmark: ${n.marketBenchmarkPrice||50} ETB/kg</span>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Total Available Stock (Kg) *</label>
                  <input type="number" id="listingQtyInput" required value="${n.qtyKg}" class="input-field text-xs font-bold font-mono" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Minimum Order Quantity (Kg)</label>
                  <input type="number" id="listingMinOrderInput" value="${n.minOrderKg||50}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region / Woreda Farm Location</label>
                <input type="text" id="listingRegionInput" value="${n.region}" class="input-field text-xs font-bold" />
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Listing Description</label>
                <textarea id="listingDescInput" rows="3" placeholder="Produce harvest details, packaging, shelf life..." class="input-field text-xs">${n.description||""}</textarea>
              </div>

              <div class="flex items-center gap-4 pt-1">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingOrganicCheck" ${n.isOrganic?"checked":""} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Certified Organic Produce</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingAdvanceHarvestCheck" ${n.isAdvanceHarvest?"checked":""} class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500" />
                  <span>Advance / Pre-Harvest Contract</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button type="button" onclick="window.adminDeleteListing('${n.id}')" class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold border border-red-200 flex items-center gap-1.5 cursor-pointer">
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
  `}const $e=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Sa(l,e){return`<button onclick="window.setBuyerAccountTab('${l.id}')" class="account-nav-item ${e===l.id?"active":""}">
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
    </section></div>`}function Ea(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">PURCHASE HISTORY</p><h1>My orders & shipping</h1><p>Track every delivery from farmer confirmation to your doorstep.</p></div><div class="account-tabs"><button class="selected">All <b>${l.length}</b></button><button>To pay <b>0</b></button><button>In transit <b>${l.filter(e=>["confirmed","picked_up"].includes(e.status)).length}</b></button><button>Delivered <b>${l.filter(e=>e.status==="delivered").length}</b></button><button>Disputed <b>${l.filter(e=>e.status==="disputed").length}</b></button></div><section class="account-section"><div class="account-list">${l.length?l.map(e=>`<div class="order-card"><div class="order-row"><div class="order-product"><span class="order-thumb"><i class="fa-solid fa-carrot"></i></span><div><strong>${e.productName}</strong><small>Order #${e.id.slice(0,8).toUpperCase()} · Farmer: ${e.farmerName}</small></div></div><span class="badge-status status-${e.status}">${e.status.replace("_"," ")}</span></div><div class="tracking-line"><span class="done"><i class="fa-solid fa-check"></i> Order placed</span><span class="${["confirmed","picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-check"></i> Farmer confirmed</span><span class="${["picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-truck"></i> In transit</span><span class="${e.status==="delivered"?"done":""}"><i class="fa-solid fa-house"></i> Delivered</span></div><div class="order-footer"><span>${e.qtyKg} kg · ${e.totalEtb.toLocaleString()} ETB</span><span>Payment: ${e.paymentRef||"Telebirr escrow"}</span><button class="text-action" onclick="window.showAccountToast('Live driver location will appear here when assigned.','fa-map-location-dot')">Track delivery <i class="fa-solid fa-arrow-right"></i></button></div></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-box-open"></i><p>Your order history will appear here.</p></div>'}</div></section></div>`}function Ca(l,e,t){var o;if(l==="addresses")return Ia(t.addresses);if(l==="payments")return Pa(t.paymentMethods);if(l==="disputes")return Ra(e);const a={coupons:{kicker:"SAVINGS",title:"My coupons",description:"Use platform, farmer, and referral rewards at checkout.",icon:"fa-ticket",rows:t.coupons.length?t.coupons.map(i=>`${i.code} · ${i.value}${i.discountType==="Percent"?"%":" ETB"} · Expires ${new Date(i.expiresAt).toLocaleDateString()}`):["No coupons are currently available · Coupons will appear here when issued by the platform or a farmer"]},addresses:{kicker:"DELIVERY",title:"Saved addresses",description:"Manage shipping destinations with flexible Ethiopian address details.",icon:"fa-location-dot",rows:t.addresses.length?t.addresses.map(i=>`${i.name} · ${i.street}, ${i.city}, ${i.region}${i.isDefaultShipping?" · Default shipping":""}`):["No saved addresses yet · Add your first address to speed up checkout"]},payments:{kicker:"CHECKOUT",title:"Payment methods",description:"Payment details stay with Telebirr or Chapa. This account shows references attached to your orders.",icon:"fa-wallet",rows:t.paymentMethods.length?t.paymentMethods.map(i=>`${i.provider} · ${i.maskedDisplay||"Provider token linked"}${i.isPrimary?" · Primary":""}`):e.length?e.map(i=>`${i.paymentRef||"Payment reference pending"} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.totalEtb.toLocaleString()} ETB`):["No payment methods are linked yet"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Open a case for an order that was damaged, missing, wrong, or below quality.",icon:"fa-rotate-left",rows:e.filter(i=>i.status==="disputed").length?e.filter(i=>i.status==="disputed").map(i=>`${i.productName} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.disputeStatus||"Under review"}`):["No open disputes · Refunds return through the original Telebirr or Chapa method","Dispute window: 3 days after delivery · Proof supports up to 5 images and 1 video"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Choose how Farmer-to-Market keeps you informed and how your data is used.",icon:"fa-sliders",rows:t.notificationPreferences.length?t.notificationPreferences.map(i=>`${i.eventType} · SMS ${i.smsEnabled?"on":"off"} · In-app ${i.inAppEnabled?"on":"off"}`):["No notification preferences saved yet · Defaults are applied by the server"]},security:{kicker:"PROTECTION",title:"Security",description:"Keep your account protected with password, two-factor authentication, and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the form below",`Two-factor authentication · ${(o=t.twoFactor)!=null&&o.isEnabled?`${t.twoFactor.method} enabled`:"Not enabled"}`,`Active sessions · ${t.sessions.length} active session${t.sessions.length===1?"":"s"}`]}}[l],r=l==="security"?'<form onsubmit="event.preventDefault(); window.changeBuyerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required /></label><label>New password<input type="password" name="newPassword" minlength="8" required /></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form><button class="btn-secondary mt-4" onclick="window.revokeBuyerSessions()"><i class="fa-solid fa-right-from-bracket"></i> Log out all other sessions</button>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${a.kicker}</p><h1>${a.title}</h1><p>${a.description}</p></div><section class="account-section"><div class="module-list">${a.rows.map(i=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${a.icon}"></i></span><div><strong>${i.split(" · ")[0]}</strong><p>${i.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div></div>`).join("")}</div>${r}</section></div>`}function Ia(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">DELIVERY</p><h1>Saved addresses</h1><p>Manage shipping destinations. Postal codes remain optional.</p></div><section class="account-section"><div class="module-list">${l.length?l.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid fa-location-dot"></i></span><div><strong>${e.name} ${e.isDefaultShipping?'<em class="account-badge">Default shipping</em>':""}</strong><p>${e.street}, ${e.city}, ${e.region}, ${e.country}<br>${e.phone}${e.postalCode?` · ${e.postalCode}`:""}</p></div><button class="icon-button" title="Delete address" onclick="window.deleteBuyerAddress('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-location-dot"></i><p>No saved addresses yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerAddress()" class="account-form mt-6"><label>Address name<input name="name" placeholder="Wholesale hub" required></label><label>Phone<input name="phone" placeholder="+251 9•• ••• •••" required></label><label>Street<input name="street" required></label><label>City<input name="city" required></label><label>Region<input name="region" required></label><label>Postal code<input name="postalCode" placeholder="Optional"></label><label>Country<input name="country" value="Ethiopia" required></label><label class="flex items-center gap-2"><input type="checkbox" name="isDefaultShipping"> Default shipping</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-plus"></i> Add address</button></div></form></section></div>`}function Pa(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">CHECKOUT</p><h1>Payment methods</h1><p>Use Telebirr or Chapa hosted tokenization. Raw card numbers never reach this app.</p></div><section class="account-section"><div class="module-list">${l.length?l.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${e.provider==="Telebirr"?"fa-mobile-screen-button":"fa-credit-card"}"></i></span><div><strong>${e.provider} ${e.isPrimary?'<em class="account-badge">Primary</em>':""}</strong><p>${e.maskedDisplay||"Provider token linked"}${e.brand?` · ${e.brand}`:""}</p></div>${e.isPrimary?"":`<button class="icon-button" title="Set primary" onclick="window.setPrimaryBuyerPayment('${e.id}')"><i class="fa-solid fa-star"></i></button>`}<button class="icon-button" title="Remove payment method" onclick="window.deleteBuyerPayment('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-wallet"></i><p>No payment methods linked yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerPayment()" class="account-form mt-6"><label>Provider<select name="provider"><option>Telebirr</option><option>Chapa</option></select></label><label>Provider token<input name="providerToken" placeholder="Paste hosted-provider token" required></label><label>Masked display<input name="maskedDisplay" placeholder="•••• 4242" required></label><label>Brand<input name="brand" placeholder="Visa / Telebirr"></label><label>Expiry month<input type="number" name="expiryMonth" min="1" max="12"></label><label>Expiry year<input type="number" name="expiryYear" min="2026"></label><label class="flex items-center gap-2"><input type="checkbox" name="isPrimary"> Set as primary</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-link"></i> Link payment method</button></div></form></section></div>`}function Ra(l){const e=l.filter(t=>{var s;return t.status==="delivered"||t.status==="disputed"||((s=t.disputeStatus)==null?void 0:s.startsWith("Resolved"))});return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">RESOLUTION CENTER</p><h1>Refunds & disputes</h1><p>Submit a claim for a delivered order. Refunds return through the original payment provider.</p></div><section class="account-section"><div class="module-list">${e.length?e.map(t=>{var s;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${t.disputeStatus==="ResolvedRefundBuyer"?"fa-money-bill-transfer":"fa-box-open"}"></i></span><div><strong>${t.productName}</strong><p>Order #${t.id.slice(0,8).toUpperCase()} · ${t.disputeStatus==="ResolvedRefundBuyer"?"Refunded to original payment method":t.disputeStatus||(t.status==="disputed"?"Under review":"Eligible for dispute")}</p></div>${t.status==="delivered"&&!((s=t.disputeStatus)!=null&&s.startsWith("Resolved"))?`<button class="btn-secondary" onclick="window.submitBuyerDispute('${t.id}')"><i class="fa-solid fa-flag"></i> Open dispute</button>`:""}</div>`}).join(""):'<div class="empty-account"><i class="fa-solid fa-circle-check"></i><p>No delivered orders are currently eligible for a dispute.</p></div>'}</div></section></div>`}function Na(l,e,t,s,a){const r=$e.find(i=>i.id===s)||$e[0];let o=s==="overview"?$a(e,t):s==="profile"?Ta(e):s==="orders"?Ea(t):Ca(s,t,a);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${$e.map((i,d)=>`${i.group&&(d===0||$e[d-1].group!==i.group)?`<p class="account-nav-group">${i.group}</p>`:""}${Sa(i,s)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Need a hand?</strong><span>Visit the Help Center</span><button onclick="window.showAccountToast('Help Center CMS content will open here.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('marketplace')">Marketplace</button><i class="fa-solid fa-chevron-right"></i><span>${r.label}</span></div>${o}</main></div>`}const Te=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Da(l,e){return`<button onclick="window.setFarmerAccountTab('${l.id}')" class="account-nav-item ${e===l.id?"active":""}"><i class="fa-solid ${l.icon} w-5 text-center"></i><span>${l.label}</span></button>`}function Ba(l){return`<section class="account-section"><div class="section-heading"><div><p class="account-kicker">SELLER CENTER</p><h2>My produce posts</h2></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="module-list mt-5">${l.length?l.map(e=>`<div class="module-row"><span class="order-thumb"><img src="${e.photos[0]}" alt="${e.productName}" class="w-full h-full object-cover rounded-lg"></span><div><strong>${e.productName}</strong><p>${e.qtyKg.toLocaleString()} kg available · ${e.pricePerKg} ETB/kg · ${e.status}</p></div><button class="icon-button" title="Delete post" onclick="window.deleteFarmerListing('${e.id}')"><i class="fa-solid fa-trash text-rose-600"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-seedling"></i><p>You have no active produce posts.</p></div>'}</div></section>`}function Re(l,e,t){const s=t.filter(i=>{var d;return i.status==="disputed"||((d=i.disputeStatus)==null?void 0:d.startsWith("Resolved"))});if(l==="profile")return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR FARM ACCOUNT</p><h1>Profile & personalization</h1><p>Update the public identity buyers see and your farm operating region.</p></div><section class="account-section"><div class="profile-header"><div class="avatar-large">${e.name.charAt(0).toUpperCase()}</div><div><h2>${e.name}</h2><p>${e.phone} · ${e.region}</p></div><span class="account-badge">${e.verified?"Verified farmer":"Verification pending"}</span></div><form onsubmit="event.preventDefault(); window.saveFarmerProfile()" class="account-form"><label>Full name<input name="name" value="${e.name}" required></label><label>Amharic name<input name="nameAm" value="${e.nameAm||""}" placeholder="Optional"></label><label>Farm region<input name="region" value="${e.region||""}" required></label><label>Email<input type="email" name="email" value="${e.email||""}" placeholder="Optional"></label><label>Preferred language<select name="languagePreference"><option value="en" ${e.languagePreference==="en"?"selected":""}>English</option><option value="am" ${e.languagePreference==="am"?"selected":""}>Amharic</option></select></label><label>Primary produce<input name="primaryCrop" value="${e.primaryCrop||""}" placeholder="Tomatoes, teff, coffee"></label><div class="form-wide location-field"><div><span class="field-label">Farm pickup address</span><input name="savedDeliveryAddress" value="${e.savedDeliveryAddress||""}" placeholder="Woreda, kebele, pickup details"><p>Buyers and drivers use this as the default farm location.</p></div><button type="button" class="btn-secondary" onclick="window.captureFarmerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Capture location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save profile</button></div></form></section></div>`;const r={orders:{kicker:"FULFILLMENT",title:"Orders & tracking",description:"Orders appear here after buyers pay. Confirm them so available drivers can pick them up.",icon:"fa-box-open",rows:t.length?t.map(i=>`${i.productName} · ${i.qtyKg} kg · ${i.status.replace("_"," ")}`):["No buyer orders yet"]},coupons:{kicker:"SELLER SAVINGS",title:"My coupons",description:"Farmer-issued coupon management will use your payout share.",icon:"fa-ticket",rows:["No farmer-issued coupons yet · Coupon creation API is ready for the next seller release"]},addresses:{kicker:"FARM LOCATION",title:"Saved addresses",description:"Manage farm pickup locations and operating regions.",icon:"fa-location-dot",rows:[`${e.region} · Farm pickup region`,"Additional pickup-address management is pending the farm-location API"]},payments:{kicker:"PAYOUTS",title:"Payment methods",description:"Manage the Telebirr payout destination for your 90% settlement.",icon:"fa-wallet",rows:[`Telebirr payout · ${e.phone} · 90% farmer share`,"Bank fallback · Not configured"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Respond to buyer claims and track payout impact.",icon:"fa-rotate-left",rows:s.length?s.map(i=>`${i.productName} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.disputeStatus==="ResolvedRefundBuyer"?"Refunded to buyer":i.disputeStatus||"Under review"}`):["No buyer disputes"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Configure seller notifications and auto-accept preferences.",icon:"fa-sliders",rows:["Order updates · In-app notifications on","Dispute updates · SMS on","Auto-accept orders · Configure quantity threshold"]},security:{kicker:"PROTECTION",title:"Security",description:"Protect your farmer account with password and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the security form","Two-factor authentication · SMS recommended","Active sessions · Manage from the security API"]}}[l],o=l==="security"?'<form onsubmit="event.preventDefault(); window.changeFarmerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required></label><label>New password<input type="password" name="newPassword" minlength="8" required></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${r.kicker}</p><h1>${r.title}</h1><p>${r.description}</p></div><section class="account-section"><div class="module-list">${r.rows.map((i,d)=>{var c;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${r.icon}"></i></span><div><strong>${i.split(" · ")[0]}</strong><p>${i.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div>${l==="orders"&&((c=t[d])==null?void 0:c.status)==="pending"?`<button class="btn-secondary" onclick="window.confirmFarmerOrder('${t[d].id}')"><i class="fa-solid fa-check"></i> Confirm</button>`:""}</div>`}).join("")}</div>${o}</section></div>`}function _a(l,e,t,s,a,r=!1,o=[]){const i=Te.find(c=>c.id===a)||Te[0],d=a==="overview"?`<div class="space-y-6 animate-fade-in"><div class="account-welcome"><div><p class="account-kicker">FARMER ACCOUNT</p><h1>Welcome back, ${e.name.split(" ")[0]}</h1><p>Manage your produce posts, buyer orders, and payouts.</p></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="account-stat-grid"><div class="account-stat"><span class="stat-icon green"><i class="fa-solid fa-seedling"></i></span><div><strong>${t.length}</strong><span>Active posts</span></div></div><div class="account-stat"><span class="stat-icon blue"><i class="fa-solid fa-box"></i></span><div><strong>${s.filter(c=>c.status==="pending").length}</strong><span>New orders</span></div></div><div class="account-stat"><span class="stat-icon gold"><i class="fa-solid fa-truck"></i></span><div><strong>${s.filter(c=>c.status==="picked_up").length}</strong><span>In transit</span></div></div><div class="account-stat"><span class="stat-icon rose"><i class="fa-solid fa-hand-holding-dollar"></i></span><div><strong>${(e.walletBalanceEtb||0).toLocaleString()}</strong><span>Wallet ETB</span></div></div></div>${Ba(t)}</div>`:Re(a==="profile"?"profile":a==="orders"?"orders":a,e,s);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${Te.map((c,n)=>`${c.group&&(n===0||Te[n-1].group!==c.group)?`<p class="account-nav-group">${c.group}</p>`:""}${Da(c,a)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Farmer support</strong><span>Get help with orders and payouts</span><button onclick="window.showAccountToast('Support center integration is available from the farmer portal.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('farmer')">Farmer dashboard</button><i class="fa-solid fa-chevron-right"></i><span>${i.label}</span></div>${d}</main>${r?ze(l):""}</div>`}function h(l,e="fa-circle-check",t="border-emerald-500"){const s=document.getElementById("toast-container");if(!s)return;const a=document.createElement("div");a.className=`toast-msg border-l-4 ${t} shadow-2xl`,a.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${l}</span>
  `,s.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(100%)",a.style.transition="all 0.3s ease-out",setTimeout(()=>a.remove(),300)},3500)}class Ma{constructor(){b(this,"lang",localStorage.getItem("lang")||"en");b(this,"activeTab","marketplace");b(this,"activeCategory","All");b(this,"selectedRegion","All");b(this,"searchQuery","");b(this,"cart",[]);b(this,"isCartOpen",!1);b(this,"isNotificationsModalOpen",!1);b(this,"isCreateListingModalOpen",!1);b(this,"activeOrderModal",null);b(this,"activeTelebirrModal",null);b(this,"activeDisputeModal",null);b(this,"activeProduceModalId",null);b(this,"activeProducePhotoIndex",0);b(this,"produceOrderQty",50);b(this,"activeLegalDocModal",null);b(this,"maxDistanceKm",0);b(this,"activeGrade","All");b(this,"activeRipeness","All");b(this,"organicOnly",!1);b(this,"advanceOnly",!1);b(this,"activeBuyerSubTab","marketplace");b(this,"activeBuyerAccountTab","overview");b(this,"activeFarmerAccountTab","overview");b(this,"activeFarmerTab","listings");b(this,"activeAdminTab","disputes");b(this,"activeSuperAdminTab","users");b(this,"superAdminUserRoleFilter","all");b(this,"superAdminAuditCategoryFilter","all");b(this,"isSuperAdminCreateUserModalOpen",!1);b(this,"isSuperAdminEditUserModalOpen",!1);b(this,"editTargetUserId",null);b(this,"isSuperAdminAddZoneModalOpen",!1);b(this,"isSuperAdminAddBlacklistModalOpen",!1);b(this,"isSuperAdminBannerModalOpen",!1);b(this,"editTargetBannerId",null);b(this,"isListingEditModalOpen",!1);b(this,"editTargetListingId",null);b(this,"isRecordingVoice",!1);b(this,"voiceRecordTimer",null);b(this,"isAuthModalOpen",!1);b(this,"authMode","login");b(this,"otpStep",!1);b(this,"pendingPhone","");b(this,"lastSentCode","");b(this,"matchedUserName","");b(this,"matchedUserRole","");b(this,"authErrorMessage","");b(this,"agentView",new ha(this.lang));b(this,"verificationWizardModal",new va(this.lang));this.init()}async init(){this.attachGlobalWindowHandlers(),pe.startConnection(p.getToken()||void 0),pe.onOrderStatusChanged(async(a,r,o)=>{console.log(`[SignalR] Order ${a} → ${r}: ${o}`),this.activeOrderModal&&this.activeOrderModal.id===a&&(this.activeOrderModal.status=r),h(`Order #${a.slice(0,8).toUpperCase()} → ${r.toUpperCase()}`,"fa-bolt","border-blue-500"),await p.refreshAllData(),this.render()}),pe.onNewFarmerOrder((a,r,o)=>{h(`🌾 New order! ${o}kg of ${r} — check your dashboard`,"fa-basket-shopping","border-amber-500"),p.refreshAllData().then(()=>this.render())}),pe.onDeliveryConfirmed((a,r,o)=>{const i=p.getCurrentUser();(i==null?void 0:i.role)==="farmer"?h(`💰 ${r.toLocaleString()} ETB released to your wallet!`,"fa-hand-holding-dollar","border-emerald-500"):(i==null?void 0:i.role)==="driver"&&h(`💰 ${o.toLocaleString()} ETB delivery fee credited!`,"fa-hand-holding-dollar","border-emerald-500"),p.refreshAllData().then(()=>this.render())}),pe.setPollingCallback(async a=>{await p.refreshAllData(),this.render()});const e=p.getCurrentUser();e&&e.role,pe.onOrderTracking(a=>{const r=document.getElementById(`eta-${a.orderId}`);r&&a.estimatedArrivalMin!=null&&a.estimatedArrivalMin>0&&(r.textContent=`~${a.estimatedArrivalMin} min`)});const t=()=>{const a=document.getElementById("signalr-status-badge");if(!a)return;const r=pe.getConnectionState(),o={connected:{dot:"bg-emerald-500",label:"Live",cls:"bg-emerald-50 text-emerald-800 border-emerald-300"},reconnecting:{dot:"bg-amber-400",label:"Reconnecting",cls:"bg-amber-50 text-amber-800 border-amber-300"},polling:{dot:"bg-sky-400",label:"Polling",cls:"bg-sky-50 text-sky-800 border-sky-300"},disconnected:{dot:"bg-slate-400",label:"Offline",cls:"bg-slate-50 text-slate-500 border-slate-200"}},i=o[r]||o.disconnected;a.className=`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${i.cls}`,a.innerHTML=`<span class="w-1.5 h-1.5 rounded-full ${i.dot} inline-block"></span> ${i.label}`};setInterval(t,3e3),t(),p.subscribe(()=>{this.render()}),await p.refreshAllData();const s=p.getCurrentUser();s&&(s.role==="superadmin"?this.activeTab="superadmin":s.role==="farmer"?this.activeTab="farmer":s.role==="driver"?this.activeTab="driver":s.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){var d;const e=document.getElementById("app");if(!e)return;const t=p.getCurrentUser(),s=p.isAuthenticated(),a=p.getNotifications(),r=a.filter(c=>!c.read).length;xe.setLanguage(this.lang);const o=p.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let i="";if(this.activeTab==="farmer-account"&&s&&(t==null?void 0:t.role)==="farmer")i=_a(this.lang,t,p.getListings().filter(c=>c.farmerId===t.id),p.getOrders("farmer"),this.activeFarmerAccountTab,this.isCreateListingModalOpen,p.getPriceBenchmarks());else if(this.activeTab==="farmer"&&s&&(t==null?void 0:t.role)==="farmer"){const c=p.getListings().filter(x=>x.farmerId===t.id),n=p.getOrders("farmer"),f=p.getFarmerSummary();i=Xt(this.lang,c,n,f,this.isCreateListingModalOpen,this.activeFarmerTab,p.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&s&&(t==null?void 0:t.role)==="driver"){const c=p.getOrders("driver"),n=p.getDriverSummary();i=ea(this.lang,c,n,p.getOptimizedRoute(),t,p.getIsOfflineMode(),p.getOfflineQueue().length)}else if(this.activeTab==="superadmin"||s&&(t==null?void 0:t.role)==="superadmin"&&this.activeTab==="superadmin")i=ta(this.lang,this.activeSuperAdminTab,this.superAdminUserRoleFilter,this.superAdminAuditCategoryFilter);else if(this.activeTab==="admin"&&s&&(t==null?void 0:t.role)==="admin"){const c=p.getPlatformStats(),n=p.getOrders().filter(f=>{var x;return f.status==="disputed"&&!((x=f.disputeStatus)!=null&&x.startsWith("Resolved"))});i=ba(this.lang,c,n,p.getAnomalyAlerts(),p.getKycQueue(),p.getRegionalAnalytics(),this.activeAdminTab)}else if(this.activeTab==="agent"||s&&(t==null?void 0:t.role)==="agent")this.agentView.setLanguage(this.lang),i=this.agentView.render();else if(this.activeTab==="account"&&s&&(t==null?void 0:t.role)==="buyer")i=Na(this.lang,t,p.getOrders("buyer"),this.activeBuyerAccountTab,p.getAccountData());else{const c=p.getOrders("buyer");i=zt(this.lang,o,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,p.getStandingOrders(),c)}e.innerHTML=`
      ${p.isImpersonating()?`
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

      ${qt(this.lang,t,s,this.activeTab,this.cart,r,this.searchQuery)}
      
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
      ${this.isAuthModalOpen?ya(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage):""}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen?xa(this.lang,a):""}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

      <!-- Produce Post & Farm Details Modal -->
      ${(()=>{if(!this.activeProduceModalId)return"";const c=p.getListingById(this.activeProduceModalId);return c?(Se.setLanguage(this.lang),Se.setActivePhotoIndex(this.activeProducePhotoIndex),Se.setSelectedQtyKg(this.produceOrderQty),Se.render(c)):""})()}

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
              ${this.activeLegalDocModal.type==="invoice"?xe.renderInvoice(p.getTaxInvoice(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="waybill"?xe.renderWaybill(p.getTransportWaybill(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="contract"?xe.renderContract(p.getLegalContract(this.activeLegalDocModal.orderId)):xe.renderArbitration(p.getDisputeMediationRecord(this.activeLegalDocModal.orderId))}
            </div>
          </div>
        </div>
      `:""}

      <!-- Super Admin Governance Modals -->
      ${ka(this.lang,this.isSuperAdminCreateUserModalOpen,this.isSuperAdminEditUserModalOpen,this.editTargetUserId,this.isSuperAdminAddZoneModalOpen,this.isSuperAdminAddBlacklistModalOpen,this.isSuperAdminBannerModalOpen,this.editTargetBannerId,this.isListingEditModalOpen,this.editTargetListingId)}
    `}attachGlobalWindowHandlers(){const e=window;e.openProduceDetail=a=>{this.activeProduceModalId=a,this.activeProducePhotoIndex=0;const r=p.getListingById(a);this.produceOrderQty=(r==null?void 0:r.minOrderKg)||50,this.render()},e.closeProduceDetail=()=>{this.activeProduceModalId=null,this.render()},e.selectProducePhoto=a=>{this.activeProducePhotoIndex=a,this.render()},e.setProduceOrderQty=a=>{this.produceOrderQty=Math.max(1,a),this.render()},e.addProduceDetailToCart=(a,r)=>{const o=p.getListingById(a);if(!o)return;const i=r||this.produceOrderQty||o.minOrderKg||50,d=this.cart.find(c=>c.listing.id===a);d?d.qtyKg+=i:this.cart.push({listing:o,qtyKg:i}),this.activeProduceModalId=null,this.isCartOpen=!0,h(this.lang==="am"?`${i} ኪ.ግ ${o.nameAm||o.productName} ወደ ጋሪ ተጨምሯል`:`Added ${i} kg of ${o.productName} to bulk cart!`,"fa-cart-plus"),this.render()},e.buyProduceNow=(a,r)=>{const o=p.getListingById(a);if(!o)return;if(!p.isAuthenticated()){e.openAuthModal("login");return}this.activeProduceModalId=null;const i=r||this.produceOrderQty||o.minOrderKg||50,d=i*o.pricePerKg;this.activeTelebirrModal={isOpen:!0,totalEtb:d,listingId:a,qtyKg:i},this.render()},e.shareProduceListing=a=>{const r=p.getListingById(a);navigator.clipboard&&navigator.clipboard.writeText(window.location.href),h(`Copied direct produce link for ${(r==null?void 0:r.productName)||"listing"}!`,"fa-share-nodes","border-blue-500")},e.playSimulatedVoiceNote=a=>{const r=document.getElementById("voicePlayIcon-"+a),o=document.getElementById("voicePlayText-"+a);r&&o&&(r.className="fa-solid fa-spinner fa-spin text-[10px]",o.innerText="Playing Memo...",setTimeout(()=>{r.className="fa-solid fa-check text-[10px]",o.innerText="Memo Played",setTimeout(()=>{r.className="fa-solid fa-play text-[10px]",o.innerText="Play Voice Memo"},2500)},1800)),h("Playing farmer voice note recorded in Bishoftu farm hub.","fa-volume-high","border-emerald-500")},e.sendSmsInquiry=(a,r)=>{h(`Dispatched SMS inquiry for ${r} to ${a}`,"fa-paper-plane","border-emerald-500")},e.navigateTab=a=>{this.activeTab=a,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setBuyerAccountTab=a=>{this.activeBuyerAccountTab=a,this.activeTab="account",p.fetchAccountData().then(()=>this.render()).catch(r=>h(r.message||"Could not load account data.","fa-circle-xmark","border-rose-500")),this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setFarmerAccountTab=a=>{this.activeFarmerAccountTab=a,this.activeTab="farmer-account",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.deleteFarmerListing=async a=>{if(window.confirm("Delete this produce post? It will no longer be available for new orders."))try{await p.deleteListing(a),h("Produce post deleted.","fa-trash"),this.render()}catch(r){h(r.message||"Could not delete the produce post.","fa-circle-xmark","border-rose-500")}},e.changeFarmerPassword=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),a.reset()}catch(o){h(o.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}},e.saveFarmerProfile=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:a.dataset.defaultLat?Number(a.dataset.defaultLat):void 0,defaultDeliveryLng:a.dataset.defaultLng?Number(a.dataset.defaultLng):void 0}),h("Farmer profile saved to your account.","fa-circle-check"),this.render()}catch(o){h(o.message||"Could not save farmer profile.","fa-circle-xmark","border-rose-500")}},e.captureFarmerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(a=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(a.coords.latitude),r.dataset.defaultLng=String(a.coords.longitude)),h("Farm location captured. Save profile to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.showAccountToast=(a,r="fa-circle-check")=>{h(a,r,"border-emerald-500")},e.saveBuyerProfile=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:a.dataset.defaultLat?Number(a.dataset.defaultLat):void 0,defaultDeliveryLng:a.dataset.defaultLng?Number(a.dataset.defaultLng):void 0}),h("Profile changes saved to your account.","fa-circle-check"),this.render()}catch(o){h(o.message||"Could not save your profile.","fa-circle-xmark","border-rose-500")}},e.captureBuyerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(a=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(a.coords.latitude)),r&&(r.dataset.defaultLng=String(a.coords.longitude)),h("Location captured. Save changes to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.changeBuyerPassword=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),a.reset()}catch(o){h(o.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}};const t=async(a,r)=>{try{await a(),h(r,"fa-circle-check"),this.render()}catch(o){h(o.message||"Account action failed.","fa-circle-xmark","border-rose-500")}};e.addBuyerAddress=()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);t(()=>p.saveAddress({name:String(r.get("name")||""),phone:String(r.get("phone")||""),street:String(r.get("street")||""),city:String(r.get("city")||""),region:String(r.get("region")||""),postalCode:String(r.get("postalCode")||"")||null,country:String(r.get("country")||"Ethiopia"),isDefaultShipping:r.has("isDefaultShipping"),isDefaultBilling:!1}),"Address added.")},e.deleteBuyerAddress=a=>t(()=>p.deleteAddress(a),"Address deleted."),e.addBuyerPayment=()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);t(()=>p.addPaymentMethod({provider:String(r.get("provider")||""),providerToken:String(r.get("providerToken")||""),maskedDisplay:String(r.get("maskedDisplay")||""),brand:String(r.get("brand")||"")||null,expiryMonth:Number(r.get("expiryMonth"))||null,expiryYear:Number(r.get("expiryYear"))||null,isPrimary:r.has("isPrimary")}),"Payment method linked.")},e.setPrimaryBuyerPayment=a=>t(()=>p.setPrimaryPaymentMethod(a),"Primary payment method updated."),e.deleteBuyerPayment=a=>t(()=>p.deletePaymentMethod(a),"Payment method removed."),e.submitBuyerDispute=a=>{const r=window.prompt("Reason: Item not received, Damaged, Wrong item, or Quality issue");r&&t(()=>p.disputeOrder(a,r,void 0,100),"Dispute submitted for review.")},e.revokeBuyerSessions=async()=>{try{await p.revokeOtherSessions(),h("Other sessions have been revoked.","fa-shield-check"),this.render()}catch(a){h(a.message||"Could not revoke sessions.","fa-circle-xmark","border-rose-500")}},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),h(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=a=>{this.activeBuyerSubTab=a,this.render()},e.toggleFarmerTab=a=>{this.activeFarmerTab=a,this.render()},e.setAdminTab=a=>{this.activeAdminTab=a,this.render()},e.openInvoiceModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"invoice",orderId:a},this.render()},e.openContractModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"contract",orderId:a},this.render()},e.openWaybillModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"waybill",orderId:a},this.render()},e.openArbitrationModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"arbitration",orderId:a},this.render()},e.closeLegalDocModal=()=>{this.activeLegalDocModal=null,this.render()},e.printOfficialDocument=()=>{window.print()},e.setMaxDistanceKm=a=>{this.maxDistanceKm=a,h(a===0?"Showing all produce across Ethiopia":`Filtering farms within ${a} km radius`,"fa-location-dot"),this.render()},e.setFilterGrade=a=>{this.activeGrade=a,this.render()},e.setFilterRipeness=a=>{this.activeRipeness=a,this.render()},e.toggleOrganicFilter=a=>{this.organicOnly=a,this.render()},e.toggleAdvanceFilter=a=>{this.advanceOnly=a,this.render()},e.setCategory=a=>{this.activeCategory=a,this.render()},e.resetFilters=()=>{this.activeCategory="All",this.selectedRegion="All",this.searchQuery="",this.maxDistanceKm=0,this.activeGrade="All",this.activeRipeness="All",this.organicOnly=!1,this.advanceOnly=!1,this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async a=>{var v,F,V,z,Q,J,Z,Y,I,ae,se,w;a.preventDefault();const r=(v=document.getElementById("newProdName"))==null?void 0:v.value,o=(F=document.getElementById("newProdNameAm"))==null?void 0:F.value,i=((V=document.getElementById("newCategory"))==null?void 0:V.value)||"Vegetables",d=Number(((z=document.getElementById("newQtyKg"))==null?void 0:z.value)||1e3),c=Number(((Q=document.getElementById("newPricePerKg"))==null?void 0:Q.value)||45),n=Number(((J=document.getElementById("newMinOrderKg"))==null?void 0:J.value)||50),f=((Z=document.getElementById("newGrade"))==null?void 0:Z.value)||"Grade 1",x=((Y=document.getElementById("newRipeness"))==null?void 0:Y.value)||"Ready Today",k=((I=document.getElementById("newIsAdvanceHarvest"))==null?void 0:I.checked)||!1,S=((ae=document.getElementById("newExpectedHarvestDate"))==null?void 0:ae.value)||void 0,A=((w=(se=document.getElementById("voiceTranscriptText"))==null?void 0:se.innerText)==null?void 0:w.replace(/^"|"$/g,""))||void 0,y=p.getCurrentUser(),_=await p.createListing({productName:r,nameAm:o||void 0,category:i,qtyKg:d,pricePerKg:c,minOrderKg:n,grade:f,ripeness:x,isAdvanceHarvest:k,expectedHarvestDate:S,voiceNoteTranscript:A,farmerId:y==null?void 0:y.id,farmerName:y==null?void 0:y.name,farmerNameAm:y==null?void 0:y.nameAm,farmerPhone:y==null?void 0:y.phone,region:y==null?void 0:y.region});this.isCreateListingModalOpen=!1,ee({particleCount:90,spread:60,origin:{y:.6}}),h(this.lang==="am"?"አዲስ ምርት በተሳካ ሁኔታ ተመዝግቧል!":`Published ${_.productName} successfully!`,"fa-circle-check"),this.render()},e.handleVoiceRecordToggle=()=>{const a=document.getElementById("voiceRecordBtn"),r=document.getElementById("voiceRecordLabel"),o=document.getElementById("voiceWaveAnimation"),i=document.getElementById("voiceTranscriptionResult");document.getElementById("voiceTranscriptText"),this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription("am")):(this.isRecordingVoice=!0,r&&(r.innerText="Stop & Transcribe (አቁም)"),a&&(a.classList.remove("bg-emerald-600"),a.classList.add("bg-red-600")),o&&o.classList.remove("hidden"),i&&i.classList.add("hidden"),h("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription("am")},3500))},e.finishVoiceTranscription=a=>{this.isRecordingVoice=!1;const r=document.getElementById("voiceRecordLabel"),o=document.getElementById("voiceWaveAnimation"),i=document.getElementById("voiceTranscriptionResult"),d=document.getElementById("voiceTranscriptText");r&&(r.innerText="Record Voice Note (ድምጽ ቅጂ)"),o&&o.classList.add("hidden");const c=p.simulateVoiceTranscription(4,a),n=document.getElementById("newProdName"),f=document.getElementById("newProdNameAm"),x=document.getElementById("newCategory"),k=document.getElementById("newQtyKg"),S=document.getElementById("newPricePerKg");n&&(n.value=c.productName),f&&(f.value=c.nameAm),x&&(x.value=c.category),k&&(k.value=c.qtyKg.toString()),S&&(S.value=c.pricePerKg.toString()),i&&d&&(d.innerText=`"${c.transcript}"`,i.classList.remove("hidden")),ee({particleCount:60,spread:50,origin:{y:.6}}),h("Voice Note Transcribed! Form auto-filled in Amharic.","fa-wand-magic-sparkles")},e.handleSimulateSms=async a=>{a.preventDefault();const r=document.getElementById("smsPhone").value,o=document.getElementById("smsCommand").value,i=document.getElementById("smsResponseBox"),d=document.getElementById("smsResponseText");i&&d&&(d.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',i.classList.remove("hidden"));const c=await p.sendInboundSms(r,o);d&&(d.innerHTML=`&gt; ${c}`),h("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const a=p.getCurrentUser(),r=(a==null?void 0:a.walletBalanceEtb)||48200;if(r<=0){h("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}p.requestWalletWithdrawal(r,(a==null?void 0:a.phone)||"+251911223344"),ee({particleCount:100,spread:70,origin:{y:.6}}),h(`Instant Payout of ${r.toLocaleString()} ETB deposited to Telebirr (${(a==null?void 0:a.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=a=>{if(!p.isAuthenticated()){e.openAuthModal("login");return}p.addStandingOrder(a,150,"Weekly"),ee({particleCount:70,spread:60,origin:{y:.6}}),h("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=a=>{p.toggleStandingOrder(a),h("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=a=>{const r=p.getOrders().find(o=>o.id===a);r&&(this.activeDisputeModal={isOpen:!0,order:r},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(a,r)=>{a.preventDefault();const o=document.getElementById("disputeReasonInput").value,i=document.getElementById("disputePhotoUrl").value,d=document.getElementById("disputeRefundSlider").value;await p.disputeOrder(r,o,i,parseInt(d,10)),this.activeDisputeModal=null,this.activeOrderModal=null,h("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const a=p.toggleOfflineMode();h(a?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const a=await p.syncOfflineQueue();h(`Synced ${a} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async a=>{const r=p.getOptimizedRoute();r.stops[a]&&(r.stops[a].completed=!0,ee({particleCount:50,spread:50,origin:{y:.6}}),h(`Stop #${a+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async a=>{await p.pickupOrderByDriver(a,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),h("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async a=>{await p.confirmDeliveryByBuyer(a,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),ee({particleCount:120,spread:70,origin:{y:.6}}),h("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(a,r)=>{await p.verifyKyc(a,r),h(r?"Identity & Documents Approved!":"KYC verification rejected",r?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=a=>{h(`Anomaly Alert #${a} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=a=>{h(`Audit trail opened for Anomaly #${a}`,"fa-magnifying-glass")},e.openAuthModal=(a="login")=>{this.authMode=a,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=a=>{this.authMode=a,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=a=>{this.pendingPhone=a.replace("+251","").trim(),this.authErrorMessage="",this.render();const r=document.getElementById("authPhoneInput");r&&(r.value=this.pendingPhone,r.focus())},e.switchToRegisterWithPhone=a=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=a.replace("+251","").trim(),this.render()},e.handleRequestOtp=async a=>{a.preventDefault();const r=document.getElementById("authPhoneInput").value.trim();if(!r||r.length<8){h("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const o=document.getElementById("requestOtpBtn");o&&(o.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',o.disabled=!0),this.pendingPhone=r,this.authErrorMessage="";try{const i=await p.requestOtp(r);this.lastSentCode=i.demoCode||"",this.matchedUserName=i.userName||"",this.matchedUserRole=i.role||"",this.otpStep=!0,h(`SMS verification code dispatched to +251 ${r}`,"fa-comment-sms","border-emerald-500")}catch(i){this.authErrorMessage=i.message||"No account registered with this phone number. Please register first."}this.render()},e.handleVerifyOtp=async a=>{var i;a.preventDefault();const r=(i=document.getElementById("authOtpInput")||document.getElementById("otpCodeInput"))==null?void 0:i.value.trim();if(!r||r.length!==6){h("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const o=document.getElementById("verifyOtpBtn");o&&(o.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',o.disabled=!0);try{const d=await p.verifyOtp(this.pendingPhone,r);this.isAuthModalOpen=!1,this.otpStep=!1,this.authErrorMessage="",d.role==="superadmin"?this.activeTab="superadmin":d.role==="farmer"?this.activeTab="farmer":d.role==="driver"?this.activeTab="driver":d.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",ee({particleCount:100,spread:70,origin:{y:.6}}),h(`Welcome back, ${d.name}! (${d.role.toUpperCase()})`,"fa-circle-check","border-emerald-500")}catch(d){this.authErrorMessage=d.message||"Invalid OTP code. Please try again."}this.render()};const s=async a=>{var f,x,k,S,A;a.preventDefault();const r=((f=document.getElementById("regName"))==null?void 0:f.value.trim())||"",o=((x=document.getElementById("regNameAm"))==null?void 0:x.value.trim())||r,i=((k=document.getElementById("regPhone"))==null?void 0:k.value.trim())||"",d=((S=document.getElementById("regRegion"))==null?void 0:S.value)||"Oromia (Bishoftu)",c=((A=document.querySelector('input[name="regRole"]:checked'))==null?void 0:A.value)||"buyer",n=document.getElementById("registerSubmitBtn");n&&(n.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...',n.disabled=!0);try{const y=await p.registerUser(r,o,i,c,d);this.isAuthModalOpen=!1,this.authErrorMessage="",y.role==="farmer"?this.activeTab="farmer":y.role==="driver"?this.activeTab="driver":y.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",ee({particleCount:150,spread:90,origin:{y:.6}}),h(`Welcome to Farmer-to-Market, ${y.name}!`,"fa-circle-check","border-emerald-500")}catch(y){this.authErrorMessage=y.message||"Registration failed. Please try a different phone number."}this.render()};e.handleRegisterUser=s,e.handleRegisterSubmit=s,e.handleLogout=()=>{p.logout(),this.activeTab="marketplace",this.cart=[],h("Logged out successfully","fa-arrow-right-from-bracket"),this.render()},e.switchDemoUser=async a=>{try{const r=await p.requestOtp(a);if(r.demoCode){const o=await p.verifyOtp(a,r.demoCode);o.role==="farmer"?this.activeTab="farmer":o.role==="driver"?this.activeTab="driver":o.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",ee({particleCount:80,spread:60,origin:{y:.6}}),h(`Switched to profile: ${o.name} (${o.role.toUpperCase()})`,"fa-user-shield")}}catch(r){h("Demo switch failed: "+r.message,"fa-circle-xmark","border-red-500")}this.render()},e.addToCart=a=>{const r=p.getListingById(a);if(!r)return;const o=this.cart.find(i=>i.listing.id===a);o?o.qtyKg+=r.minOrderKg:this.cart.push({listing:r,qtyKg:r.minOrderKg}),h(`Added ${r.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(a,r)=>{const o=this.cart.find(i=>i.listing.id===a);o&&(r<=0?this.cart=this.cart.filter(i=>i.listing.id!==a):o.qtyKg=r),this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.openTelebirrModal=a=>{if(!p.isAuthenticated()){e.openAuthModal("login");return}this.activeTelebirrModal={isOpen:!0,totalEtb:a},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.handleTelebirrSubmit=async a=>{var r;a.preventDefault();try{const o=document.getElementById("checkoutAddress"),i=document.querySelector('input[name="checkoutPayment"]:checked'),d=o==null?void 0:o.value,c=p.getAccountData().addresses.find(k=>k.id===d);if(!c||!i){h("Choose a shipping address and payment method first.","fa-circle-exclamation","border-amber-500");return}const n=`${c.street}, ${c.city}, ${c.region}, ${c.country}`,f=this.cart.length?this.cart:(r=this.activeTelebirrModal)!=null&&r.listingId?[{listing:p.getListingById(this.activeTelebirrModal.listingId),qtyKg:this.activeTelebirrModal.qtyKg||0}]:[];if(!f.length||!f[0].listing)throw new Error("The selected produce is no longer available.");let x=null;for(const k of f){const S=k.listing;if(!S)throw new Error("The selected produce is no longer available.");x=await p.placeOrder(S.id,k.qtyKg,n,!1,"Weekly",i.value==="telebirr-wallet"?void 0:i.value)}this.cart=[],this.isCartOpen=!1,this.activeTelebirrModal=null,ee({particleCount:150,spread:80,origin:{y:.6}}),h(`Payment authorized via ${i.value==="telebirr-wallet"?"Telebirr":"your selected provider"}. Farmer notified; driver follows after farmer confirmation.`,"fa-lock","border-blue-500"),x&&(this.activeOrderModal=x)}catch(o){h("Order placement failed: "+o.message,"fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=a=>{const o=p.getOrders().find(i=>i.id===a);o&&(this.activeOrderModal=o,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.confirmFarmerOrder=async a=>{await p.confirmOrderByFarmer(a),pe.joinOrder(a),h("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async a=>{await p.confirmDeliveryByBuyer(a),ee({particleCount:150,spread:80,origin:{y:.6}}),h("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),this.render()},e.adminResolveDispute=async(a,r)=>{try{await p.resolveDispute(a,r),h(`Dispute resolved: ${r}. Buyer and farmer records updated.`,"fa-gavel","border-purple-500"),this.render()}catch(o){h(o.message||"Could not resolve the dispute.","fa-circle-xmark","border-rose-500")}},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async a=>{var A;a.preventDefault();const r=document.getElementById("newProdName").value,o=document.getElementById("newProdNameAm").value,i=document.getElementById("newCategory").value,d=parseFloat(document.getElementById("newQtyKg").value),c=parseFloat(document.getElementById("newPricePerKg").value),n=parseFloat(document.getElementById("newMinOrderKg").value),f=document.getElementById("newGrade").value,x=document.getElementById("newRipeness").value,k=document.getElementById("newIsAdvanceHarvest").checked,S=(A=document.getElementById("newExpectedHarvestDate"))==null?void 0:A.value;try{await p.createListing({productName:r,nameAm:o,category:i,qtyKg:d,pricePerKg:c,minOrderKg:n,grade:f,ripeness:x,isOrganic:!0,isAdvanceHarvest:k,expectedHarvestDate:k?S:void 0,availableFrom:k&&S?S:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,h(`Published ${r} to marketplace!`,"fa-cloud-arrow-up")}catch(y){h(y.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleAdminBroadcastSms=async a=>{a.preventDefault();const r=document.getElementById("smsTargetRole").value,o=document.getElementById("smsMsgEn").value,i=document.getElementById("smsMsgAm").value;await p.broadcastSms(o,i,r),h(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to smallholders via Twilio!","fa-paper-plane"),this.render()},e.openVerificationWizard=(a=1)=>{this.verificationWizardModal.setLanguage(this.lang),this.verificationWizardModal.open(a)},e.closeVerificationWizard=()=>{this.verificationWizardModal.close()},e.setWizardStep=a=>{this.verificationWizardModal.setStep(a)},e.updateWizardField=(a,r)=>{this.verificationWizardModal.updateField(a,r)},e.submitVerificationForm=async()=>{await this.verificationWizardModal.submit(),ee({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"ሰነዶችዎ ደርሰውናል! በ24 ሰዓት ውስጥ ይገመገማሉ።":"Documents submitted! Verification under 24-hour review.","fa-shield-check","border-emerald-500"),this.render()},e.switchAgentTab=a=>{this.agentView.switchTab(a),this.render()},e.setUssdInput=a=>{this.agentView.setUssdInput(a)},e.sendUssdCommand=async()=>{await this.agentView.executeUssd()},e.sendInboundSms=async()=>{const a=document.getElementById("inboundSmsBody"),r=(a==null?void 0:a.value)||"FAYDA FAN-8812-4091-2810";h(this.lang==="am"?`የኤስኤምኤስ ትዕዛዝ ተቀብለናል፡ "${r}"`:`Inbound SMS processed: "${r}"`,"fa-comment-sms","border-blue-500"),await p.refreshAllData(),this.render()},e.handleAgentRegisterSubmit=async a=>{var k,S,A,y,_;a.preventDefault();const r=document.getElementById("agFarmerName").value,o=(k=document.getElementById("agFarmerNameAm"))==null?void 0:k.value,i=document.getElementById("agFarmerPhone").value,d=document.getElementById("agFarmerRegion").value,c=(S=document.getElementById("agFarmerKebele"))==null?void 0:S.value,n=(A=document.getElementById("agFarmerCrop"))==null?void 0:A.value,f=(y=document.getElementById("agFarmerFayda"))==null?void 0:y.value,x=(_=document.getElementById("agFarmerTin"))==null?void 0:_.value;try{await p.agentRegisterFarmer({name:r,nameAm:o,phone:i,region:d,kebele:c,primaryCrop:n,faydaId:f,tinNumber:x}),ee({particleCount:120,spread:80,origin:{y:.6}}),h(this.lang==="am"?`${r} ተመዝግቧል! የማረጋገጫ ኤስኤምኤስ ተልኳል።`:`Farmer ${r} registered! Welcome SMS dispatched.`,"fa-user-check","border-emerald-500"),this.agentView.switchTab("roster"),this.render()}catch(v){h("Registration failed: "+v.message,"fa-circle-xmark","border-red-500")}},e.sendAgentFarmerSms=a=>{h(this.lang==="am"?`ኤስኤምኤስ ወደ ${a} ተልኳል!`:`SMS dispatch sent to ${a}!`,"fa-paper-plane","border-blue-500")},e.adminReviewVerification=async(a,r)=>{let o,i;if(r==="Reject"){if(i=prompt(this.lang==="am"?"እባክዎ ውድቅ የተደረገበትን ምክንያት ያስገቡ (ለምሳሌ፡ የፋይዳ ፎቶው ግልጽ አይደለም / የታክስ ቁጥር አልተገኘም):":"Enter rejection reason to notify the user via SMS (e.g. Blurry ID photo / TIN mismatch):","Blurry Fayda ID photo. Please re-upload clear image.")||void 0,!i)return}else o="Identity & TIN verified against Ministry of Revenues registry.";await p.reviewVerification(a,r,o,i),r==="Approve"?(ee({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"የተጠቃሚው ማረጋገጫ ጸድቋል! የኤስኤምኤስ መልእክት ተልኳል።":"User account APPROVED! SMS confirmation dispatched.","fa-circle-check","border-emerald-500")):h(this.lang==="am"?"ማረጋገጫው ውድቅ ተደርጓል፤ ምክንያቱ በኤስኤምኤስ ተልኳል።":"Verification rejected & reason SMS sent to user.","fa-triangle-exclamation","border-amber-500"),this.render()},e.setSuperAdminTab=a=>{this.activeSuperAdminTab=a,this.render()},e.setUserRoleFilter=a=>{this.superAdminUserRoleFilter=a,this.render()},e.setAuditCategoryFilter=a=>{this.superAdminAuditCategoryFilter=a,this.render()},e.openCreateUserModal=()=>{this.isSuperAdminCreateUserModalOpen=!0,this.render()},e.openEditUserModal=a=>{this.editTargetUserId=a,this.isSuperAdminEditUserModalOpen=!0,this.render()},e.openAddZoneModal=()=>{this.isSuperAdminAddZoneModalOpen=!0,this.render()},e.openAddBlacklistModal=()=>{this.isSuperAdminAddBlacklistModalOpen=!0,this.render()},e.openCreateBannerModal=()=>{this.editTargetBannerId=null,this.isSuperAdminBannerModalOpen=!0,this.render()},e.openEditBannerModal=a=>{this.editTargetBannerId=a,this.isSuperAdminBannerModalOpen=!0,this.render()},e.handleSaveBannerSubmit=(a,r)=>{var V,z,Q,J,Z,Y,I,ae,se,w,G,U,me,Ae;a.preventDefault();const o=(V=document.getElementById("bannerTitleInput"))==null?void 0:V.value,i=((z=document.getElementById("bannerTitleAmInput"))==null?void 0:z.value)||void 0,d=((Q=document.getElementById("bannerSubtitleInput"))==null?void 0:Q.value)||void 0,c=((J=document.getElementById("bannerSubtitleAmInput"))==null?void 0:J.value)||void 0,n=(Z=document.getElementById("bannerAudienceSelect"))==null?void 0:Z.value,f=((Y=document.getElementById("bannerRegionSelect"))==null?void 0:Y.value)||"All",x=Number((I=document.getElementById("bannerPriorityInput"))==null?void 0:I.value)||5,k=((ae=document.getElementById("bannerBadgeInput"))==null?void 0:ae.value)||void 0,S=((se=document.getElementById("bannerBadgeAmInput"))==null?void 0:se.value)||void 0,A=((w=document.getElementById("bannerCtaTextInput"))==null?void 0:w.value)||"Browse Marketplace",y=((G=document.getElementById("bannerCtaLinkSelect"))==null?void 0:G.value)||"marketplace",_=(U=document.getElementById("bannerImageUrlInput"))==null?void 0:U.value,v=(me=document.getElementById("bannerGradientSelect"))==null?void 0:me.value,F=((Ae=document.getElementById("bannerIsActiveCheck"))==null?void 0:Ae.checked)??!0;r?(p.updateBanner(r,{title:o,titleAm:i,subtitle:d,subtitleAm:c,targetAudience:n,targetRegion:f,priority:x,badgeText:k,badgeTextAm:S,ctaText:A,ctaLink:y,imageUrl:_,themeGradient:v,isActive:F}),h(`Updated promotional banner: "${o}"`,"fa-panorama","border-emerald-500")):(p.createBanner({title:o,titleAm:i,subtitle:d,subtitleAm:c,targetAudience:n,targetRegion:f,priority:x,badgeText:k,badgeTextAm:S,ctaText:A,ctaLink:y,imageUrl:_,themeGradient:v,isActive:F}),ee({particleCount:90,spread:60,origin:{y:.6}}),h(`Published new banner: "${o}"!`,"fa-panorama","border-emerald-500")),this.isSuperAdminBannerModalOpen=!1,this.editTargetBannerId=null,this.render()},e.toggleBannerStatus=a=>{const r=p.getBannerById(a);if(!r)return;const o=!r.isActive;p.toggleBannerStatus(a,o),h(o?`Activated banner: "${r.title}"`:`Paused banner: "${r.title}"`,"fa-panorama",o?"border-emerald-500":"border-slate-500"),this.render()},e.deleteBanner=a=>{const r=p.getBannerById(a);r&&confirm(`Are you sure you want to delete banner "${r.title}"?`)&&(p.deleteBanner(a),h(`Deleted banner: "${r.title}"`,"fa-trash","border-red-500"),this.render())},e.openAdminEditListingModal=a=>{this.editTargetListingId=a,this.isListingEditModalOpen=!0,this.render()},e.handleAdminEditListingSubmit=(a,r)=>{var v,F,V,z,Q,J,Z,Y,I,ae,se,w;a.preventDefault();const o=(v=document.getElementById("listingNameInput"))==null?void 0:v.value,i=((F=document.getElementById("listingNameAmInput"))==null?void 0:F.value)||void 0,d=(V=document.getElementById("listingCategorySelect"))==null?void 0:V.value,c=(z=document.getElementById("listingGradeSelect"))==null?void 0:z.value,n=(Q=document.getElementById("listingModerationStatusSelect"))==null?void 0:Q.value,f=Number((J=document.getElementById("listingPriceInput"))==null?void 0:J.value),x=Number((Z=document.getElementById("listingQtyInput"))==null?void 0:Z.value),k=Number((Y=document.getElementById("listingMinOrderInput"))==null?void 0:Y.value)||50,S=(I=document.getElementById("listingRegionInput"))==null?void 0:I.value,A=((ae=document.getElementById("listingDescInput"))==null?void 0:ae.value)||void 0,y=((se=document.getElementById("listingOrganicCheck"))==null?void 0:se.checked)??!1,_=((w=document.getElementById("listingAdvanceHarvestCheck"))==null?void 0:w.checked)??!1;p.adminUpdateListing(r,{productName:o,nameAm:i,category:d,grade:c,moderationStatus:n,pricePerKg:f,qtyKg:x,minOrderKg:k,region:S,description:A,isOrganic:y,isAdvanceHarvest:_}),this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Saved moderation changes for "${o}"!`,"fa-gavel","border-purple-500"),this.render()},e.adminDeleteListing=a=>{const r=p.getListings().find(d=>d.id===a);if(!r)return;const o=prompt(this.lang==="am"?"እባክዎ የተሰረዘበትን ምክንያት ያስገቡ:":"Please enter the reason for removing this listing post:","Violates marketplace quality & pricing policies");if(o===null)return;p.adminDeleteListing(a,o)?(this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Deleted produce post: "${r.productName}"`,"fa-trash","border-red-500")):h("Failed to delete produce post","fa-triangle-exclamation","border-red-500"),this.render()},e.flagListingAnomaly=a=>{const r=p.getListings().find(o=>o.id===a);r&&(p.flagListingAnomaly(a,"Manual Admin Anomaly Flag"),h(`Flagged "${r.productName}" for price/quality inspection!`,"fa-flag","border-amber-500"),this.render())},e.closeSuperAdminModal=()=>{this.isSuperAdminCreateUserModalOpen=!1,this.isSuperAdminEditUserModalOpen=!1,this.isSuperAdminAddZoneModalOpen=!1,this.isSuperAdminAddBlacklistModalOpen=!1,this.isSuperAdminBannerModalOpen=!1,this.isListingEditModalOpen=!1,this.editTargetUserId=null,this.editTargetBannerId=null,this.editTargetListingId=null,this.render()},e.handleRoleChangeInModal=a=>{const r=document.getElementById("roleSpecificFields");r&&(a==="farmer"?r.innerHTML=`
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
        `))},e.handleCreateUserSubmit=a=>{var F,V,z,Q,J,Z,Y,I,ae,se,w,G,U,me;a.preventDefault();const r=(F=document.getElementById("newRoleSelect"))==null?void 0:F.value,o=(V=document.getElementById("newNameInput"))==null?void 0:V.value,i=((z=document.getElementById("newNameAmInput"))==null?void 0:z.value)||void 0,d=(Q=document.getElementById("newPhoneInput"))==null?void 0:Q.value,c=(J=document.getElementById("newRegionInput"))==null?void 0:J.value,n=((Z=document.getElementById("newVerifiedCheck"))==null?void 0:Z.checked)??!0,f=((Y=document.getElementById("newPrimaryCropInput"))==null?void 0:Y.value)||void 0,x=((I=document.getElementById("newKebeleInput"))==null?void 0:I.value)||void 0,k=((ae=document.getElementById("newFaydaInput"))==null?void 0:ae.value)||void 0,S=((se=document.getElementById("newTinInput"))==null?void 0:se.value)||void 0,A=((w=document.getElementById("newVehicleTypeInput"))==null?void 0:w.value)||void 0,y=Number((G=document.getElementById("newCapacityInput"))==null?void 0:G.value)||void 0,_=((U=document.getElementById("newRefrigInput"))==null?void 0:U.value)||void 0,v=((me=document.getElementById("newLicenseInput"))==null?void 0:me.value)||void 0;p.createUser({role:r,name:o,nameAm:i,phone:d,region:c,verified:n,status:"active",primaryCrop:f,kebele:x,faydaId:k,tinNumber:S,vehicleType:A,vehicleCapacityKg:y,refrigerationType:_,businessLicenseNumber:v}),this.isSuperAdminCreateUserModalOpen=!1,ee({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?`አዲስ ${r.toUpperCase()} መለያ ተፈጥሯል: ${o}`:`Created ${r.toUpperCase()} account: ${o}!`,"fa-user-check","border-rose-500"),this.render()},e.handleEditUserSubmit=(a,r)=>{var k,S,A,y,_,v,F;a.preventDefault();const o=(k=document.getElementById("editNameInput"))==null?void 0:k.value,i=(S=document.getElementById("editPhoneInput"))==null?void 0:S.value,d=(A=document.getElementById("editRoleSelect"))==null?void 0:A.value,c=(y=document.getElementById("editStatusSelect"))==null?void 0:y.value,n=(_=document.getElementById("editRegionInput"))==null?void 0:_.value,f=((v=document.getElementById("editFaydaInput"))==null?void 0:v.value)||void 0,x=((F=document.getElementById("editTinInput"))==null?void 0:F.value)||void 0;p.updateUser(r,{name:o,phone:i,role:d,status:c,region:n,faydaId:f,tinNumber:x}),this.isSuperAdminEditUserModalOpen=!1,this.editTargetUserId=null,h(`Updated user profile: ${o}`,"fa-user-pen","border-emerald-500"),this.render()},e.toggleUserSuspension=a=>{try{const r=p.toggleUserSuspension(a),o=r.status==="suspended";h(o?this.lang==="am"?`የተጠቃሚ ${r.name} መለያ ታግዷል`:`Suspended account access for ${r.name}`:this.lang==="am"?`የተጠቃሚ ${r.name} መለያ እገዳ ተነስቷል`:`Reinstated account access for ${r.name}`,o?"fa-user-slash":"fa-user-check",o?"border-red-500":"border-emerald-500")}catch(r){h(r.message||"Error updating user status","fa-triangle-exclamation","border-red-500")}this.render()},e.deleteUserAccount=a=>{const r=p.getUserById(a);if(!r)return;const o=this.lang==="am"?`ተጠቃሚ '${r.name}' (${r.phone})ን በቋሚነት መሰረዝ ይፈልጋሉ? ይህ እርምጃ ሊመለስ አይችልም።`:`Are you sure you want to permanently delete user '${r.name}' (${r.phone})? This action cannot be undone.`;if(!confirm(o))return;p.deleteUser(a)?h(this.lang==="am"?`ተጠቃሚ '${r.name}' በቋሚነት ተሰርዟል`:`Permanently deleted user: ${r.name}`,"fa-trash","border-red-500"):h("Failed to delete user account","fa-triangle-exclamation","border-red-500"),this.render()},e.startSuperAdminImpersonation=a=>{const r=p.startImpersonation(a);r&&(window.isSuperAdminImpersonating=!0,h(`Logged in as ${r.name} (${r.role.toUpperCase()})`,"fa-user-secret","border-rose-500"),r.role==="farmer"?this.activeTab="farmer":r.role==="driver"?this.activeTab="driver":r.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.render(),window.scrollTo({top:0,behavior:"smooth"}))},e.stopSuperAdminImpersonation=()=>{p.stopImpersonation(),window.isSuperAdminImpersonating=!1,h("Exited impersonation. Returned to Super Admin dashboard.","fa-crown","border-rose-500"),this.activeTab="superadmin",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.updateEscrowSliders=a=>{const r=document.getElementById("farmerShareInput"),o=document.getElementById("driverShareInput"),i=document.getElementById("platformShareInput");if(!r||!o||!i)return;let d=Number(r.value),c=Number(o.value),n=Number(i.value);if(a==="farmer"){const f=100-d;c=Math.round(f/2),n=f-c,o.value=c.toString(),i.value=n.toString()}document.getElementById("farmerShareDisplay").innerText=`${r.value}%`,document.getElementById("driverShareDisplay").innerText=`${o.value}%`,document.getElementById("platformShareDisplay").innerText=`${i.value}%`},e.handleSaveSuperAdminConfig=a=>{var y,_,v,F,V,z,Q,J,Z,Y,I;a.preventDefault();const r=Number((y=document.getElementById("farmerShareInput"))==null?void 0:y.value)||90,o=Number((_=document.getElementById("driverShareInput"))==null?void 0:_.value)||5,i=Number((v=document.getElementById("platformShareInput"))==null?void 0:v.value)||5,d=Number((F=document.getElementById("cfgWithholdingTax"))==null?void 0:F.value)||2,c=Number((V=document.getElementById("cfgHighValueThreshold"))==null?void 0:V.value)||5e4,n=((z=document.getElementById("cfgTelebirrAppId"))==null?void 0:z.value)||"",f=((Q=document.getElementById("cfgTelebirrShortCode"))==null?void 0:Q.value)||"",x=((J=document.getElementById("cfgTelebirrApiKey"))==null?void 0:J.value)||"",k=((Z=document.getElementById("cfgTwilioSid"))==null?void 0:Z.value)||"",S=((Y=document.getElementById("cfgTwilioToken"))==null?void 0:Y.value)||"",A=((I=document.getElementById("cfgTwilioFrom"))==null?void 0:I.value)||"";p.updatePlatformConfig({farmerSharePercent:r,driverSharePercent:o,platformFeePercent:i,withholdingTaxPercent:d,highValuePayoutThresholdEtb:c,telebirrAppId:n,telebirrShortCode:f,telebirrApiKey:x,twilioAccountSid:k,twilioAuthToken:S,twilioFromNumber:A}),h("Platform configuration and escrow splits saved!","fa-floppy-disk","border-emerald-500"),this.render()},e.approveHighValuePayout=a=>{const r=p.getCurrentUser();p.approvePayout(a,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)")&&(ee({particleCount:90,spread:60,origin:{y:.6}}),h("High-value Telebirr payout approved & released!","fa-circle-check","border-emerald-500"),this.render())},e.rejectHighValuePayout=a=>{const r=p.getCurrentUser();p.rejectPayout(a,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)","Manual Super Admin audit flag"),h("Payout declined & flagged for compliance investigation.","fa-ban","border-red-500"),this.render()},e.toggleFeatureFlag=a=>{const r=p.toggleFeatureFlag(a);h(`${r.name}: ${r.enabled?"ENABLED":"DISABLED"}`,"fa-toggle-on",r.enabled?"border-emerald-500":"border-slate-500"),this.render()},e.toggleEmergencyEscrowFreeze=()=>{const r=!p.getPlatformConfig().emergencyEscrowFrozen;p.updatePlatformConfig({emergencyEscrowFrozen:r}),r?(alert(`EMERGENCY ESCROW FREEZE ACTIVATED!
All automatic Telebirr payouts and order releases have been halted platform-wide.`),h("EMERGENCY ESCROW FREEZE ACTIVATED!","fa-lock","border-red-500")):h("Platform escrow unfrozen. Normal operations restored.","fa-lock-open","border-emerald-500"),this.render()},e.handleAddZoneSubmit=a=>{var f,x,k,S,A,y;a.preventDefault();const r=(f=document.getElementById("zoneNameInput"))==null?void 0:f.value,o=(x=document.getElementById("zoneHubInput"))==null?void 0:x.value,i=Number((k=document.getElementById("zoneLatInput"))==null?void 0:k.value),d=Number((S=document.getElementById("zoneLngInput"))==null?void 0:S.value),c=Number((A=document.getElementById("zoneRadiusInput"))==null?void 0:A.value),n=Number((y=document.getElementById("zoneBonusInput"))==null?void 0:y.value);p.addDeliveryZone({name:r,clusterHubName:o,centerLatitude:i,centerLongitude:d,baseRadiusKm:c,maxRadiusKm:c*2.5,ruralSubsidyEtb:n,active:!0,smallholdersCount:500}),this.isSuperAdminAddZoneModalOpen=!1,h(`Added regional delivery zone: ${r}`,"fa-map-location-dot","border-teal-500"),this.render()},e.deleteZone=a=>{p.deleteDeliveryZone(a),h("Delivery zone removed.","fa-trash","border-slate-500"),this.render()},e.handleAddBlacklistSubmit=a=>{var c,n,f;a.preventDefault();const r=(c=document.getElementById("blTypeSelect"))==null?void 0:c.value,o=(n=document.getElementById("blValueInput"))==null?void 0:n.value,i=(f=document.getElementById("blReasonInput"))==null?void 0:f.value,d=p.getCurrentUser();p.addToBlacklist({type:r,value:o,reason:i,blacklistedBy:(d==null?void 0:d.name)||"Super Admin",active:!0}),this.isSuperAdminAddBlacklistModalOpen=!1,h(`Entity blacklisted: ${o}`,"fa-ban","border-red-500"),this.render()},e.removeFromBlacklist=a=>{p.removeFromBlacklist(a),h("Entity removed from blacklist.","fa-circle-check","border-emerald-500"),this.render()},e.handleSaveBusinessRules=a=>{var c,n,f,x;a.preventDefault();const r=Number((c=document.getElementById("ruleMinOrderKg"))==null?void 0:c.value)||10,o=Number((n=document.getElementById("ruleMaxOrderKg"))==null?void 0:n.value)||5e4,i=Number((f=document.getElementById("ruleMaxDistanceKm"))==null?void 0:f.value)||450,d=Number((x=document.getElementById("rulePriceCeiling"))==null?void 0:x.value)||250;p.updateGlobalBusinessRules({minOrderKg:r,maxOrderKg:o,maxDistanceKm:i,priceCeilingVariancePercent:d}),h("Global trading business rules saved!","fa-gavel","border-emerald-500"),this.render()},e.triggerDbBackup=()=>{const a=p.triggerDatabaseBackup();ee({particleCount:80,spread:60,origin:{y:.6}}),h(`PostgreSQL backup snapshot generated (${a.backupId})!`,"fa-database","border-blue-500"),this.render()},e.exportPlatformData=a=>{const r=p.exportPlatformData(a),o=document.createElement("a");o.href=r.dataUrl,o.download=r.filename,document.body.appendChild(o),o.click(),document.body.removeChild(o),h(`Downloaded full platform data export (${a.toUpperCase()})!`,"fa-download","border-emerald-500"),this.render()}}}new Ma;
