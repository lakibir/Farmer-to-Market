var dt=Object.defineProperty;var ct=(l,e,t)=>e in l?dt(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var b=(l,e,t)=>ct(l,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var De={};(function l(e,t,a,s){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),i=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=(function(){if(!e.OffscreenCanvas)return!1;try{var m=new OffscreenCanvas(1,1),u=m.getContext("2d");u.fillRect(0,0,1,1);var k=m.transferToImageBitmap();u.createPattern(k,"no-repeat")}catch{return!1}return!0})();function d(){}function c(m){var u=t.exports.Promise,k=u!==void 0?u:e.Promise;return typeof k=="function"?new k(m):(m(d,d),null)}var n=(function(m,u){return{transform:function(k){if(m)return k;if(u.has(k))return u.get(k);var $=new OffscreenCanvas(k.width,k.height),P=$.getContext("2d");return P.drawImage(k,0,0),u.set(k,$),$},clear:function(){u.clear()}}})(o,new Map),f=(function(){var m=Math.floor(16.666666666666668),u,k,$={},P=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(u=function(N){var _=Math.random();return $[_]=requestAnimationFrame(function T(D){P===D||P+m-1<D?(P=D,delete $[_],N()):$[_]=requestAnimationFrame(T)}),_},k=function(N){$[N]&&cancelAnimationFrame($[N])}):(u=function(N){return setTimeout(N,m)},k=function(N){return clearTimeout(N)}),{frame:u,cancel:k}})(),v=(function(){var m,u,k={};function $(P){function N(_,T){P.postMessage({options:_||{},callback:T})}P.init=function(T){var D=T.transferControlToOffscreen();P.postMessage({canvas:D},[D])},P.fire=function(T,D,L){if(u)return N(T,null),u;var G=Math.random().toString(36).slice(2);return u=c(function(M){function W(te){te.data.callback===G&&(delete k[G],P.removeEventListener("message",W),u=null,n.clear(),L(),M())}P.addEventListener("message",W),N(T,G),k[G]=W.bind(null,{data:{callback:G}})}),u},P.reset=function(){P.postMessage({reset:!0});for(var T in k)k[T](),delete k[T]}}return function(){if(m)return m;if(!a&&r){var P=["var CONFETTI, SIZE = {}, module = {};","("+l.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{m=new Worker(URL.createObjectURL(new Blob([P])))}catch(N){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",N),null}$(m)}return m}})(),S={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function E(m,u){return u?u(m):m}function w(m){return m!=null}function x(m,u,k){return E(m&&w(m[u])?m[u]:S[u],k)}function O(m){return m<0?0:Math.floor(m)}function y(m,u){return Math.floor(Math.random()*(u-m))+m}function R(m){return parseInt(m,16)}function j(m){return m.map(z)}function z(m){var u=String(m).replace(/[^0-9a-f]/gi,"");return u.length<6&&(u=u[0]+u[0]+u[1]+u[1]+u[2]+u[2]),{r:R(u.substring(0,2)),g:R(u.substring(2,4)),b:R(u.substring(4,6))}}function Y(m){var u=x(m,"origin",Object);return u.x=x(u,"x",Number),u.y=x(u,"y",Number),u}function J(m){m.width=document.documentElement.clientWidth,m.height=document.documentElement.clientHeight}function ee(m){var u=m.getBoundingClientRect();m.width=u.width,m.height=u.height}function Q(m){var u=document.createElement("canvas");return u.style.position="fixed",u.style.top="0px",u.style.left="0px",u.style.pointerEvents="none",u.style.zIndex=m,u}function C(m,u,k,$,P,N,_,T,D){m.save(),m.translate(u,k),m.rotate(N),m.scale($,P),m.arc(0,0,1,_,T,D),m.restore()}function se(m){var u=m.angle*(Math.PI/180),k=m.spread*(Math.PI/180);return{x:m.x,y:m.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:m.startVelocity*.5+Math.random()*m.startVelocity,angle2D:-u+(.5*k-Math.random()*k),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:m.color,shape:m.shape,tick:0,totalTicks:m.ticks,decay:m.decay,drift:m.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:m.gravity*3,ovalScalar:.6,scalar:m.scalar,flat:m.flat}}function ae(m,u){u.x+=Math.cos(u.angle2D)*u.velocity+u.drift,u.y+=Math.sin(u.angle2D)*u.velocity+u.gravity,u.velocity*=u.decay,u.flat?(u.wobble=0,u.wobbleX=u.x+10*u.scalar,u.wobbleY=u.y+10*u.scalar,u.tiltSin=0,u.tiltCos=0,u.random=1):(u.wobble+=u.wobbleSpeed,u.wobbleX=u.x+10*u.scalar*Math.cos(u.wobble),u.wobbleY=u.y+10*u.scalar*Math.sin(u.wobble),u.tiltAngle+=.1,u.tiltSin=Math.sin(u.tiltAngle),u.tiltCos=Math.cos(u.tiltAngle),u.random=Math.random()+2);var k=u.tick++/u.totalTicks,$=u.x+u.random*u.tiltCos,P=u.y+u.random*u.tiltSin,N=u.wobbleX+u.random*u.tiltCos,_=u.wobbleY+u.random*u.tiltSin;if(m.fillStyle="rgba("+u.color.r+", "+u.color.g+", "+u.color.b+", "+(1-k)+")",m.beginPath(),i&&u.shape.type==="path"&&typeof u.shape.path=="string"&&Array.isArray(u.shape.matrix))m.fill(Se(u.shape.path,u.shape.matrix,u.x,u.y,Math.abs(N-$)*.1,Math.abs(_-P)*.1,Math.PI/10*u.wobble));else if(u.shape.type==="bitmap"){var T=Math.PI/10*u.wobble,D=Math.abs(N-$)*.1,L=Math.abs(_-P)*.1,G=u.shape.bitmap.width*u.scalar,M=u.shape.bitmap.height*u.scalar,W=new DOMMatrix([Math.cos(T)*D,Math.sin(T)*D,-Math.sin(T)*L,Math.cos(T)*L,u.x,u.y]);W.multiplySelf(new DOMMatrix(u.shape.matrix));var te=m.createPattern(n.transform(u.shape.bitmap),"no-repeat");te.setTransform(W),m.globalAlpha=1-k,m.fillStyle=te,m.fillRect(u.x-G/2,u.y-M/2,G,M),m.globalAlpha=1}else if(u.shape==="circle")m.ellipse?m.ellipse(u.x,u.y,Math.abs(N-$)*u.ovalScalar,Math.abs(_-P)*u.ovalScalar,Math.PI/10*u.wobble,0,2*Math.PI):C(m,u.x,u.y,Math.abs(N-$)*u.ovalScalar,Math.abs(_-P)*u.ovalScalar,Math.PI/10*u.wobble,0,2*Math.PI);else if(u.shape==="star")for(var B=Math.PI/2*3,ie=4*u.scalar,le=8*u.scalar,de=u.x,me=u.y,ge=5,pe=Math.PI/ge;ge--;)de=u.x+Math.cos(B)*le,me=u.y+Math.sin(B)*le,m.lineTo(de,me),B+=pe,de=u.x+Math.cos(B)*ie,me=u.y+Math.sin(B)*ie,m.lineTo(de,me),B+=pe;else m.moveTo(Math.floor(u.x),Math.floor(u.y)),m.lineTo(Math.floor(u.wobbleX),Math.floor(P)),m.lineTo(Math.floor(N),Math.floor(_)),m.lineTo(Math.floor($),Math.floor(u.wobbleY));return m.closePath(),m.fill(),u.tick<u.totalTicks}function A(m,u,k,$,P){var N=u.slice(),_=m.getContext("2d"),T,D,L=c(function(G){function M(){T=D=null,_.clearRect(0,0,$.width,$.height),n.clear(),P(),G()}function W(){a&&!($.width===s.width&&$.height===s.height)&&($.width=m.width=s.width,$.height=m.height=s.height),!$.width&&!$.height&&(k(m),$.width=m.width,$.height=m.height),_.clearRect(0,0,$.width,$.height),N=N.filter(function(te){return ae(_,te)}),N.length?T=f.frame(W):M()}T=f.frame(W),D=M});return{addFettis:function(G){return N=N.concat(G),L},canvas:m,promise:L,reset:function(){T&&f.cancel(T),D&&D()}}}function K(m,u){var k=!m,$=!!x(u||{},"resize"),P=!1,N=x(u,"disableForReducedMotion",Boolean),_=r&&!!x(u||{},"useWorker"),T=_?v():null,D=k?J:ee,L=m&&T?!!m.__confetti_initialized:!1,G=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,M;function W(B,ie,le){for(var de=x(B,"particleCount",O),me=x(B,"angle",Number),ge=x(B,"spread",Number),pe=x(B,"startVelocity",Number),tt=x(B,"decay",Number),st=x(B,"gravity",Number),at=x(B,"drift",Number),Me=x(B,"colors",j),rt=x(B,"ticks",Number),Fe=x(B,"shapes"),it=x(B,"scalar"),ot=!!x(B,"flat"),Ue=Y(B),Ve=de,Ce=[],nt=m.width*Ue.x,lt=m.height*Ue.y;Ve--;)Ce.push(se({x:nt,y:lt,angle:me,spread:ge,startVelocity:pe,color:Me[Ve%Me.length],shape:Fe[y(0,Fe.length)],ticks:rt,decay:tt,gravity:st,drift:at,scalar:it,flat:ot}));return M?M.addFettis(Ce):(M=A(m,Ce,D,ie,le),M.promise)}function te(B){var ie=N||x(B,"disableForReducedMotion",Boolean),le=x(B,"zIndex",Number);if(ie&&G)return c(function(pe){pe()});k&&M?m=M.canvas:k&&!m&&(m=Q(le),document.body.appendChild(m)),$&&!L&&D(m);var de={width:m.width,height:m.height};T&&!L&&T.init(m),L=!0,T&&(m.__confetti_initialized=!0);function me(){if(T){var pe={getBoundingClientRect:function(){if(!k)return m.getBoundingClientRect()}};D(pe),T.postMessage({resize:{width:pe.width,height:pe.height}});return}de.width=de.height=null}function ge(){M=null,$&&(P=!1,e.removeEventListener("resize",me)),k&&m&&(document.body.contains(m)&&document.body.removeChild(m),m=null,L=!1)}return $&&!P&&(P=!0,e.addEventListener("resize",me,!1)),T?T.fire(B,de,ge):W(B,de,ge)}return te.reset=function(){T&&T.reset(),M&&M.reset()},te}var U;function fe(){return U||(U=K(null,{useWorker:!0,resize:!0})),U}function Se(m,u,k,$,P,N,_){var T=new Path2D(m),D=new Path2D;D.addPath(T,new DOMMatrix(u));var L=new Path2D;return L.addPath(D,new DOMMatrix([Math.cos(_)*P,Math.sin(_)*P,-Math.sin(_)*N,Math.cos(_)*N,k,$])),L}function Je(m){if(!i)throw new Error("path confetti are not supported in this browser");var u,k;typeof m=="string"?u=m:(u=m.path,k=m.matrix);var $=new Path2D(u),P=document.createElement("canvas"),N=P.getContext("2d");if(!k){for(var _=1e3,T=_,D=_,L=0,G=0,M,W,te=0;te<_;te+=2)for(var B=0;B<_;B+=2)N.isPointInPath($,te,B,"nonzero")&&(T=Math.min(T,te),D=Math.min(D,B),L=Math.max(L,te),G=Math.max(G,B));M=L-T,W=G-D;var ie=10,le=Math.min(ie/M,ie/W);k=[le,0,0,le,-Math.round(M/2+T)*le,-Math.round(W/2+D)*le]}return{type:"path",path:u,matrix:k}}function et(m){var u,k=1,$="#000000",P='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof m=="string"?u=m:(u=m.text,k="scalar"in m?m.scalar:k,P="fontFamily"in m?m.fontFamily:P,$="color"in m?m.color:$);var N=10*k,_=""+N+"px "+P,T=new OffscreenCanvas(N,N),D=T.getContext("2d");D.font=_;var L=D.measureText(u),G=Math.ceil(L.actualBoundingBoxRight+L.actualBoundingBoxLeft),M=Math.ceil(L.actualBoundingBoxAscent+L.actualBoundingBoxDescent),W=2,te=L.actualBoundingBoxLeft+W,B=L.actualBoundingBoxAscent+W;G+=W+W,M+=W+W,T=new OffscreenCanvas(G,M),D=T.getContext("2d"),D.font=_,D.fillStyle=$,D.fillText(u,te,B);var ie=1/k;return{type:"bitmap",bitmap:T.transferToImageBitmap(),matrix:[ie,0,0,ie,-G*ie/2,-M*ie/2]}}t.exports=function(){return fe().apply(this,arguments)},t.exports.reset=function(){fe().reset()},t.exports.create=K,t.exports.shapeFromPath=Je,t.exports.shapeFromText=et})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),De,!1);const X=De.exports;De.exports.create;class be extends Error{constructor(e,t){const a=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=a}}class Be extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class ce extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class pt extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=a}}class ut extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=a}}class mt extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=a}}class je extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class ft extends Error{constructor(e,t){const a=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=a}}class ze{constructor(e,t,a){this.statusCode=e,this.statusText=t,this.content=a}}class Re{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var g;(function(l){l[l.Trace=0]="Trace",l[l.Debug=1]="Debug",l[l.Information=2]="Information",l[l.Warning=3]="Warning",l[l.Error=4]="Error",l[l.Critical=5]="Critical",l[l.None=6]="None"})(g||(g={}));class we{constructor(){}log(e,t){}}we.instance=new we;const gt="8.0.29";class q{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,a){if(!(e in t))throw new Error(`Unknown ${a} value: ${e}.`)}}class V{static get isBrowser(){return!V.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!V.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!V.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function Ae(l,e){let t="";return ve(l)?(t=`Binary data of length ${l.byteLength}`,e&&(t+=`. Content: '${bt(l)}'`)):typeof l=="string"&&(t=`String data of length ${l.length}`,e&&(t+=`. Content: '${l}'`)),t}function bt(l){const e=new Uint8Array(l);let t="";return e.forEach(a=>{const s=a<16?"0":"";t+=`0x${s}${a.toString(16)} `}),t.substr(0,t.length-1)}function ve(l){return l&&typeof ArrayBuffer<"u"&&(l instanceof ArrayBuffer||l.constructor&&l.constructor.name==="ArrayBuffer")}async function Ye(l,e,t,a,s,r){const i={},[o,d]=xe();i[o]=d,l.log(g.Trace,`(${e} transport) sending data. ${Ae(s,r.logMessageContent)}.`);const c=ve(s)?"arraybuffer":"text",n=await t.post(a,{content:s,headers:{...i,...r.headers},responseType:c,timeout:r.timeout,withCredentials:r.withCredentials});l.log(g.Trace,`(${e} transport) request complete. Response status: ${n.statusCode}.`)}function ht(l){return l===void 0?new Ie(g.Information):l===null?we.instance:l.log!==void 0?l:new Ie(l)}class vt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class Ie{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const a=`[${new Date().toISOString()}] ${g[e]}: ${t}`;switch(e){case g.Critical:case g.Error:this.out.error(a);break;case g.Warning:this.out.warn(a);break;case g.Information:this.out.info(a);break;default:this.out.log(a);break}}}}function xe(){let l="X-SignalR-User-Agent";return V.isNode&&(l="User-Agent"),[l,xt(gt,yt(),At(),wt())]}function xt(l,e,t,a){let s="Microsoft SignalR/";const r=l.split(".");return s+=`${r[0]}.${r[1]}`,s+=` (${l}; `,e&&e!==""?s+=`${e}; `:s+="Unknown OS; ",s+=`${t}`,a?s+=`; ${a}`:s+="; Unknown Runtime Version",s+=")",s}function yt(){if(V.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function wt(){if(V.isNode)return process.versions.node}function At(){return V.isNode?"NodeJS":"Browser"}function Pe(l){return l.stack?l.stack:l.message?l.message:`${l}`}function St(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class Et extends Re{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||V.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(St());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new ce;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let a;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),a=new ce});let s=null;if(e.timeout){const d=e.timeout;s=setTimeout(()=>{t.abort(),this._logger.log(g.Warning,"Timeout from HTTP request."),a=new Be},d)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},ve(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let r;try{r=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(d){throw a||(this._logger.log(g.Warning,`Error from HTTP request. ${d}.`),d)}finally{s&&clearTimeout(s),e.abortSignal&&(e.abortSignal.onabort=null)}if(!r.ok){const d=await Ge(r,"text");throw new be(d||r.statusText,r.status)}const o=await Ge(r,e.responseType);return new ze(r.status,r.statusText,o)}getCookieString(e){let t="";return V.isNode&&this._jar&&this._jar.getCookies(e,(a,s)=>t=s.join("; ")),t}}function Ge(l,e){let t;switch(e){case"arraybuffer":t=l.arrayBuffer();break;case"text":t=l.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=l.text();break}return t}class kt extends Re{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new ce):e.method?e.url?new Promise((t,a)=>{const s=new XMLHttpRequest;s.open(e.method,e.url,!0),s.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,s.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(ve(e.content)?s.setRequestHeader("Content-Type","application/octet-stream"):s.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const r=e.headers;r&&Object.keys(r).forEach(i=>{s.setRequestHeader(i,r[i])}),e.responseType&&(s.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{s.abort(),a(new ce)}),e.timeout&&(s.timeout=e.timeout),s.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),s.status>=200&&s.status<300?t(new ze(s.status,s.statusText,s.response||s.responseText)):a(new be(s.response||s.responseText||s.statusText,s.status))},s.onerror=()=>{this._logger.log(g.Warning,`Error from HTTP request. ${s.status}: ${s.statusText}.`),a(new be(s.statusText,s.status))},s.ontimeout=()=>{this._logger.log(g.Warning,"Timeout from HTTP request."),a(new Be)},s.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class Tt extends Re{constructor(e){if(super(),typeof fetch<"u"||V.isNode)this._httpClient=new Et(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new kt(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new ce):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class ne{static write(e){return`${e}${ne.RecordSeparator}`}static parse(e){if(e[e.length-1]!==ne.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(ne.RecordSeparator);return t.pop(),t}}ne.RecordSeparatorCode=30;ne.RecordSeparator=String.fromCharCode(ne.RecordSeparatorCode);class $t{writeHandshakeRequest(e){return ne.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,a;if(ve(e)){const o=new Uint8Array(e),d=o.indexOf(ne.RecordSeparatorCode);if(d===-1)throw new Error("Message is incomplete.");const c=d+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(o.slice(0,c))),a=o.byteLength>c?o.slice(c).buffer:null}else{const o=e,d=o.indexOf(ne.RecordSeparator);if(d===-1)throw new Error("Message is incomplete.");const c=d+1;t=o.substring(0,c),a=o.length>c?o.substring(c):null}const s=ne.parse(t),r=JSON.parse(s[0]);if(r.type)throw new Error("Expected a handshake response from the server.");return[a,r]}}var I;(function(l){l[l.Invocation=1]="Invocation",l[l.StreamItem=2]="StreamItem",l[l.Completion=3]="Completion",l[l.StreamInvocation=4]="StreamInvocation",l[l.CancelInvocation=5]="CancelInvocation",l[l.Ping=6]="Ping",l[l.Close=7]="Close",l[l.Ack=8]="Ack",l[l.Sequence=9]="Sequence"})(I||(I={}));class It{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new vt(this,e)}}class Rt{constructor(e,t,a){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=a}async _send(e){const t=this._protocol.writeMessage(e);let a=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let s=()=>{},r=()=>{};ve(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(a=new Promise((i,o)=>{s=i,r=o})),this._messages.push(new Ct(t,this._totalMessageCount,s,r))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await a}_ack(e){let t=-1;for(let a=0;a<this._messages.length;a++){const s=this._messages[a];if(s._id<=e.sequenceId)t=a,ve(s._message)?this._bufferedByteCount-=s._message.byteLength:this._bufferedByteCount-=s._message.length,s._resolver();else if(this._bufferedByteCount<this._bufferSize)s._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==I.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:I.Sequence,sequenceId:e}));const t=this._messages;for(const a of t)await this._connection.send(a._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case I.Invocation:case I.StreamItem:case I.Completion:case I.StreamInvocation:case I.CancelInvocation:return!0;case I.Close:case I.Sequence:case I.Ping:case I.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:I.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class Ct{constructor(e,t,a,s){this._message=e,this._id=t,this._resolver=a,this._rejector=s}}const Pt=30*1e3,Nt=15*1e3,_t=1e5;var F;(function(l){l.Disconnected="Disconnected",l.Connecting="Connecting",l.Connected="Connected",l.Disconnecting="Disconnecting",l.Reconnecting="Reconnecting"})(F||(F={}));class Oe{static create(e,t,a,s,r,i,o){return new Oe(e,t,a,s,r,i,o)}constructor(e,t,a,s,r,i,o){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(g.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},q.isRequired(e,"connection"),q.isRequired(t,"logger"),q.isRequired(a,"protocol"),this.serverTimeoutInMilliseconds=r??Pt,this.keepAliveIntervalInMilliseconds=i??Nt,this._statefulReconnectBufferSize=o??_t,this._logger=t,this._protocol=a,this.connection=e,this._reconnectPolicy=s,this._handshakeProtocol=new $t,this.connection.onreceive=d=>this._processIncomingData(d),this.connection.onclose=d=>this._connectionClosed(d),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=F.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:I.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==F.Disconnected&&this._connectionState!==F.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==F.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=F.Connecting,this._logger.log(g.Debug,"Starting HubConnection.");try{await this._startInternal(),V.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=F.Connected,this._connectionStarted=!0,this._logger.log(g.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=F.Disconnected,this._logger.log(g.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,a)=>{this._handshakeResolver=t,this._handshakeRejecter=a});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const a={protocol:this._protocol.name,version:t};if(this._logger.log(g.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(a)),this._logger.log(g.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new Rt(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(g.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===F.Disconnected)return this._logger.log(g.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===F.Disconnecting)return this._logger.log(g.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=F.Disconnecting,this._logger.log(g.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(g.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===F.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new ce("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[a,s]=this._replaceStreamingParams(t),r=this._createStreamInvocation(e,t,s);let i;const o=new It;return o.cancelCallback=()=>{const d=this._createCancelInvocation(r.invocationId);return delete this._callbacks[r.invocationId],i.then(()=>this._sendWithProtocol(d))},this._callbacks[r.invocationId]=(d,c)=>{if(c){o.error(c);return}else d&&(d.type===I.Completion?d.error?o.error(new Error(d.error)):o.complete():o.next(d.item))},i=this._sendWithProtocol(r).catch(d=>{o.error(d),delete this._callbacks[r.invocationId]}),this._launchStreams(a,i),o}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[a,s]=this._replaceStreamingParams(t),r=this._sendWithProtocol(this._createInvocation(e,t,!0,s));return this._launchStreams(a,r),r}invoke(e,...t){const[a,s]=this._replaceStreamingParams(t),r=this._createInvocation(e,t,!1,s);return new Promise((o,d)=>{this._callbacks[r.invocationId]=(n,f)=>{if(f){d(f);return}else n&&(n.type===I.Completion?n.error?d(new Error(n.error)):o(n.result):d(new Error(`Unexpected message type: ${n.type}`)))};const c=this._sendWithProtocol(r).catch(n=>{d(n),delete this._callbacks[r.invocationId]});this._launchStreams(a,c)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const a=this._methods[e];if(a)if(t){const s=a.indexOf(t);s!==-1&&(a.splice(s,1),a.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const a of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(a)))switch(a.type){case I.Invocation:this._invokeClientMethod(a).catch(s=>{this._logger.log(g.Error,`Invoke client method threw error: ${Pe(s)}`)});break;case I.StreamItem:case I.Completion:{const s=this._callbacks[a.invocationId];if(s){a.type===I.Completion&&delete this._callbacks[a.invocationId];try{s(a)}catch(r){this._logger.log(g.Error,`Stream callback threw error: ${Pe(r)}`)}}break}case I.Ping:break;case I.Close:{this._logger.log(g.Information,"Close message received from server.");const s=a.error?new Error("Server returned an error on close: "+a.error):void 0;a.allowReconnect===!0?this.connection.stop(s):this._stopPromise=this._stopInternal(s);break}case I.Ack:this._messageBuffer&&this._messageBuffer._ack(a);break;case I.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(a);break;default:this._logger.log(g.Warning,`Invalid message type: ${a.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,a;try{[a,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(s){const r="Error parsing handshake response: "+s;this._logger.log(g.Error,r);const i=new Error(r);throw this._handshakeRejecter(i),i}if(t.error){const s="Server returned handshake error: "+t.error;this._logger.log(g.Error,s);const r=new Error(s);throw this._handshakeRejecter(r),r}else this._logger.log(g.Debug,"Server handshake complete.");return this._handshakeResolver(),a}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===F.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),a=this._methods[t];if(!a){this._logger.log(g.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(g.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const s=a.slice(),r=!!e.invocationId;let i,o,d;for(const c of s)try{const n=i;i=await c.apply(this,e.arguments),r&&i&&n&&(this._logger.log(g.Error,`Multiple results provided for '${t}'. Sending error to server.`),d=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),o=void 0}catch(n){o=n,this._logger.log(g.Error,`A callback for the method '${t}' threw error '${n}'.`)}d?await this._sendWithProtocol(d):r?(o?d=this._createCompletionMessage(e.invocationId,`${o}`,null):i!==void 0?d=this._createCompletionMessage(e.invocationId,null,i):(this._logger.log(g.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),d=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(d)):i&&this._logger.log(g.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(g.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new ce("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===F.Disconnecting?this._completeClose(e):this._connectionState===F.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===F.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=F.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),V.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(g.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let a=0,s=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),r=this._getNextRetryDelay(a++,0,s);if(r===null){this._logger.log(g.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=F.Reconnecting,e?this._logger.log(g.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(g.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(i=>i.apply(this,[e]))}catch(i){this._logger.log(g.Error,`An onreconnecting callback called with error '${e}' threw error '${i}'.`)}if(this._connectionState!==F.Reconnecting){this._logger.log(g.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;r!==null;){if(this._logger.log(g.Information,`Reconnect attempt number ${a} will start in ${r} ms.`),await new Promise(i=>{this._reconnectDelayHandle=setTimeout(i,r)}),this._reconnectDelayHandle=void 0,this._connectionState!==F.Reconnecting){this._logger.log(g.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=F.Connected,this._logger.log(g.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(i=>i.apply(this,[this.connection.connectionId]))}catch(i){this._logger.log(g.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${i}'.`)}return}catch(i){if(this._logger.log(g.Information,`Reconnect attempt failed because of error '${i}'.`),this._connectionState!==F.Reconnecting){this._logger.log(g.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===F.Disconnecting&&this._completeClose();return}s=i instanceof Error?i:new Error(i.toString()),r=this._getNextRetryDelay(a++,Date.now()-t,s)}}this._logger.log(g.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${a} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,a){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:a})}catch(s){return this._logger.log(g.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${s}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(a=>{const s=t[a];try{s(null,e)}catch(r){this._logger.log(g.Error,`Stream 'error' callback called with '${e}' threw error: ${Pe(r)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,a,s){if(a)return s.length!==0?{arguments:t,streamIds:s,target:e,type:I.Invocation}:{arguments:t,target:e,type:I.Invocation};{const r=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:r.toString(),streamIds:s,target:e,type:I.Invocation}:{arguments:t,invocationId:r.toString(),target:e,type:I.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const a in e)e[a].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(a)))},error:s=>{let r;s instanceof Error?r=s.message:s&&s.toString?r=s.toString():r="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(a,r)))},next:s=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(a,s)))}})}}_replaceStreamingParams(e){const t=[],a=[];for(let s=0;s<e.length;s++){const r=e[s];if(this._isObservable(r)){const i=this._invocationId;this._invocationId++,t[i]=r,a.push(i.toString()),e.splice(s,1)}}return[t,a]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,a){const s=this._invocationId;return this._invocationId++,a.length!==0?{arguments:t,invocationId:s.toString(),streamIds:a,target:e,type:I.StreamInvocation}:{arguments:t,invocationId:s.toString(),target:e,type:I.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:I.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:I.StreamItem}}_createCompletionMessage(e,t,a){return t?{error:t,invocationId:e,type:I.Completion}:{invocationId:e,result:a,type:I.Completion}}_createCloseMessage(){return{type:I.Close}}}const Dt=[0,2e3,1e4,3e4,null];class We{constructor(e){this._retryDelays=e!==void 0?[...e,null]:Dt}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class he{}he.Authorization="Authorization";he.Cookie="Cookie";class Bt extends Re{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const a=await this._innerClient.send(e);return t&&a.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):a}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[he.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[he.Authorization]&&delete e.headers[he.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var Z;(function(l){l[l.None=0]="None",l[l.WebSockets=1]="WebSockets",l[l.ServerSentEvents=2]="ServerSentEvents",l[l.LongPolling=4]="LongPolling"})(Z||(Z={}));var re;(function(l){l[l.Text=1]="Text",l[l.Binary=2]="Binary"})(re||(re={}));let Ot=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class He{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,a){this._httpClient=e,this._logger=t,this._pollAbort=new Ot,this._options=a,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(q.isRequired(e,"url"),q.isRequired(t,"transferFormat"),q.isIn(t,re,"transferFormat"),this._url=e,this._logger.log(g.Trace,"(LongPolling transport) Connecting."),t===re.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[a,s]=xe(),r={[a]:s,...this._options.headers},i={abortSignal:this._pollAbort.signal,headers:r,timeout:1e5,withCredentials:this._options.withCredentials};t===re.Binary&&(i.responseType="arraybuffer");const o=`${e}&_=${Date.now()}`;this._logger.log(g.Trace,`(LongPolling transport) polling: ${o}.`);const d=await this._httpClient.get(o,i);d.statusCode!==200?(this._logger.log(g.Error,`(LongPolling transport) Unexpected response code: ${d.statusCode}.`),this._closeError=new be(d.statusText||"",d.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,i)}async _poll(e,t){try{for(;this._running;)try{const a=`${e}&_=${Date.now()}`;this._logger.log(g.Trace,`(LongPolling transport) polling: ${a}.`);const s=await this._httpClient.get(a,t);s.statusCode===204?(this._logger.log(g.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):s.statusCode!==200?(this._logger.log(g.Error,`(LongPolling transport) Unexpected response code: ${s.statusCode}.`),this._closeError=new be(s.statusText||"",s.statusCode),this._running=!1):s.content?(this._logger.log(g.Trace,`(LongPolling transport) data received. ${Ae(s.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(s.content)):this._logger.log(g.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(a){this._running?a instanceof Be?this._logger.log(g.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=a,this._running=!1):this._logger.log(g.Trace,`(LongPolling transport) Poll errored after shutdown: ${a.message}`)}}finally{this._logger.log(g.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?Ye(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(g.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(g.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,a]=xe();e[t]=a;const s={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let r;try{await this._httpClient.delete(this._url,s)}catch(i){r=i}r?r instanceof be&&(r.statusCode===404?this._logger.log(g.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(g.Trace,`(LongPolling transport) Error sending a DELETE request: ${r}`)):this._logger.log(g.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(g.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(g.Trace,e),this.onclose(this._closeError)}}}class Lt{constructor(e,t,a,s){this._httpClient=e,this._accessToken=t,this._logger=a,this._options=s,this.onreceive=null,this.onclose=null}async connect(e,t){return q.isRequired(e,"url"),q.isRequired(t,"transferFormat"),q.isIn(t,re,"transferFormat"),this._logger.log(g.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((a,s)=>{let r=!1;if(t!==re.Text){s(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let i;if(V.isBrowser||V.isWebWorker)i=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const o=this._httpClient.getCookieString(e),d={};d.Cookie=o;const[c,n]=xe();d[c]=n,i=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...d,...this._options.headers}})}try{i.onmessage=o=>{if(this.onreceive)try{this._logger.log(g.Trace,`(SSE transport) data received. ${Ae(o.data,this._options.logMessageContent)}.`),this.onreceive(o.data)}catch(d){this._close(d);return}},i.onerror=o=>{r?this._close():s(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},i.onopen=()=>{this._logger.log(g.Information,`SSE connected to ${this._url}`),this._eventSource=i,r=!0,a()}}catch(o){s(o);return}})}async send(e){return this._eventSource?Ye(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class Mt{constructor(e,t,a,s,r,i){this._logger=a,this._accessTokenFactory=t,this._logMessageContent=s,this._webSocketConstructor=r,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=i}async connect(e,t){q.isRequired(e,"url"),q.isRequired(t,"transferFormat"),q.isIn(t,re,"transferFormat"),this._logger.log(g.Trace,"(WebSockets transport) Connecting.");let a;return this._accessTokenFactory&&(a=await this._accessTokenFactory()),new Promise((s,r)=>{e=e.replace(/^http/,"ws");let i;const o=this._httpClient.getCookieString(e);let d=!1;if(V.isNode||V.isReactNative){const c={},[n,f]=xe();c[n]=f,a&&(c[he.Authorization]=`Bearer ${a}`),o&&(c[he.Cookie]=o),i=new this._webSocketConstructor(e,void 0,{headers:{...c,...this._headers}})}else a&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(a)}`);i||(i=new this._webSocketConstructor(e)),t===re.Binary&&(i.binaryType="arraybuffer"),i.onopen=c=>{this._logger.log(g.Information,`WebSocket connected to ${e}.`),this._webSocket=i,d=!0,s()},i.onerror=c=>{let n=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?n=c.error:n="There was an error with the transport",this._logger.log(g.Information,`(WebSockets transport) ${n}.`)},i.onmessage=c=>{if(this._logger.log(g.Trace,`(WebSockets transport) data received. ${Ae(c.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(c.data)}catch(n){this._close(n);return}},i.onclose=c=>{if(d)this._close(c);else{let n=null;typeof ErrorEvent<"u"&&c instanceof ErrorEvent?n=c.error:n="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",r(new Error(n))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(g.Trace,`(WebSockets transport) sending data. ${Ae(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(g.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const Ke=100;class Ft{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,q.isRequired(e,"url"),this._logger=ht(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let a=null,s=null;if(V.isNode&&typeof require<"u"){const r=typeof __webpack_require__=="function"?__non_webpack_require__:require;a=r("ws"),s=r("eventsource")}!V.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:V.isNode&&!t.WebSocket&&a&&(t.WebSocket=a),!V.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:V.isNode&&!t.EventSource&&typeof s<"u"&&(t.EventSource=s),this._httpClient=new Bt(t.httpClient||new Tt(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||re.Binary,q.isIn(e,re,"transferFormat"),this._logger.log(g.Debug,`Starting connection with transfer format '${re[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(g.Error,t),await this._stopPromise,Promise.reject(new ce(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(g.Error,t),Promise.reject(new ce(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new Le(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(g.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(g.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(g.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(g.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===Z.WebSockets)this.transport=this._constructTransport(Z.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let a=null,s=0;do{if(a=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new ce("The connection was stopped during negotiation.");if(a.error)throw new Error(a.error);if(a.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(a.url&&(t=a.url),a.accessToken){const r=a.accessToken;this._accessTokenFactory=()=>r,this._httpClient._accessToken=r,this._httpClient._accessTokenFactory=void 0}s++}while(a.url&&s<Ke);if(s===Ke&&a.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,a,e)}this.transport instanceof He&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(g.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(a){return this._logger.log(g.Error,"Failed to start the connection: "+a),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(a)}}async _getNegotiationResponse(e){const t={},[a,s]=xe();t[a]=s;const r=this._resolveNegotiateUrl(e);this._logger.log(g.Debug,`Sending negotiation request: ${r}.`);try{const i=await this._httpClient.post(r,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(i.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${i.statusCode}'`));const o=JSON.parse(i.content);return(!o.negotiateVersion||o.negotiateVersion<1)&&(o.connectionToken=o.connectionId),o.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new je("Client didn't negotiate Stateful Reconnect but the server did.")):o}catch(i){let o="Failed to complete negotiation with the server: "+i;return i instanceof be&&i.statusCode===404&&(o=o+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(g.Error,o),Promise.reject(new je(o))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,a,s){let r=this._createConnectUrl(e,a.connectionToken);if(this._isITransport(t)){this._logger.log(g.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(r,s),this.connectionId=a.connectionId;return}const i=[],o=a.availableTransports||[];let d=a;for(const c of o){const n=this._resolveTransportOrError(c,t,s,(d==null?void 0:d.useStatefulReconnect)===!0);if(n instanceof Error)i.push(`${c.transport} failed:`),i.push(n);else if(this._isITransport(n)){if(this.transport=n,!d){try{d=await this._getNegotiationResponse(e)}catch(f){return Promise.reject(f)}r=this._createConnectUrl(e,d.connectionToken)}try{await this._startTransport(r,s),this.connectionId=d.connectionId;return}catch(f){if(this._logger.log(g.Error,`Failed to start the transport '${c.transport}': ${f}`),d=void 0,i.push(new mt(`${c.transport} failed: ${f}`,Z[c.transport])),this._connectionState!=="Connecting"){const v="Failed to select transport before stop() was called.";return this._logger.log(g.Debug,v),Promise.reject(new ce(v))}}}}return i.length>0?Promise.reject(new ft(`Unable to connect to the server with any of the available transports. ${i.join(" ")}`,i)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case Z.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new Mt(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case Z.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Lt(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case Z.LongPolling:return new He(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async a=>{let s=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{s=!0}else{this._stopConnection(a);return}s&&this._stopConnection(a)}:this.transport.onclose=a=>this._stopConnection(a),this.transport.connect(e,t)}_resolveTransportOrError(e,t,a,s){const r=Z[e.transport];if(r==null)return this._logger.log(g.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Ut(t,r))if(e.transferFormats.map(o=>re[o]).indexOf(a)>=0){if(r===Z.WebSockets&&!this._options.WebSocket||r===Z.ServerSentEvents&&!this._options.EventSource)return this._logger.log(g.Debug,`Skipping transport '${Z[r]}' because it is not supported in your environment.'`),new pt(`'${Z[r]}' is not supported in your environment.`,r);this._logger.log(g.Debug,`Selecting transport '${Z[r]}'.`);try{return this.features.reconnect=r===Z.WebSockets?s:void 0,this._constructTransport(r)}catch(o){return o}}else return this._logger.log(g.Debug,`Skipping transport '${Z[r]}' because it does not support the requested transfer format '${re[a]}'.`),new Error(`'${Z[r]}' does not support ${re[a]}.`);else return this._logger.log(g.Debug,`Skipping transport '${Z[r]}' because it was disabled by the client.`),new ut(`'${Z[r]}' is disabled by the client.`,r)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(g.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(g.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(g.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(g.Error,`Connection disconnected with error '${e}'.`):this._logger.log(g.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(g.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(g.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!V.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(g.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const a=new URLSearchParams(t.searchParams);return a.has("negotiateVersion")||a.append("negotiateVersion",this._negotiateVersion.toString()),a.has("useStatefulReconnect")?a.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&a.append("useStatefulReconnect","true"),t.search=a.toString(),t.toString()}}function Ut(l,e){return!l||(e&l)!==0}class Le{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new Ee,this._transportResult=new Ee,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new Ee),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new Ee;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):Le._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(a){e.reject(a)}}}static _concatBuffers(e){const t=e.map(r=>r.byteLength).reduce((r,i)=>r+i),a=new Uint8Array(t);let s=0;for(const r of e)a.set(new Uint8Array(r),s),s+=r.byteLength;return a.buffer}}class Ee{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const Vt="json";class jt{constructor(){this.name=Vt,this.version=2,this.transferFormat=re.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=we.instance);const a=ne.parse(e),s=[];for(const r of a){const i=JSON.parse(r);if(typeof i.type!="number")throw new Error("Invalid payload.");switch(i.type){case I.Invocation:this._isInvocationMessage(i);break;case I.StreamItem:this._isStreamItemMessage(i);break;case I.Completion:this._isCompletionMessage(i);break;case I.Ping:break;case I.Close:break;case I.Ack:this._isAckMessage(i);break;case I.Sequence:this._isSequenceMessage(i);break;default:t.log(g.Information,"Unknown message type '"+i.type+"' ignored.");continue}s.push(i)}return s}writeMessage(e){return ne.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const Gt={trace:g.Trace,debug:g.Debug,info:g.Information,information:g.Information,warn:g.Warning,warning:g.Warning,error:g.Error,critical:g.Critical,none:g.None};function Wt(l){const e=Gt[l.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${l}`)}class Ht{configureLogging(e){if(q.isRequired(e,"logging"),Kt(e))this.logger=e;else if(typeof e=="string"){const t=Wt(e);this.logger=new Ie(t)}else this.logger=new Ie(e);return this}withUrl(e,t){return q.isRequired(e,"url"),q.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return q.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new We(e):this.reconnectPolicy=e:this.reconnectPolicy=new We,this}withServerTimeout(e){return q.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return q.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new Ft(this.url,e);return Oe.create(t,this.logger||we.instance,this.protocol||new jt,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Kt(l){return l.log!==void 0}class qt{constructor(){b(this,"hubConnection",null);b(this,"isConnected",!1);b(this,"reconnectAttempts",0);b(this,"maxReconnectAttempts",10);b(this,"statusListeners",[]);b(this,"trackingListeners",[]);b(this,"farmerOrderListeners",[]);b(this,"deliveryConfirmedListeners",[]);b(this,"pollingIntervals",new Map);b(this,"pollingCallback",null)}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Ht().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect({nextRetryDelayInMilliseconds:t=>Math.min(1e3*Math.pow(2,t.previousRetryCount),3e4)}).configureLogging(g.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{const a={orderId:t.orderId,status:t.status,message:t.message,timestamp:new Date().toISOString()};this.statusListeners.forEach(s=>s(t.orderId,t.status,t.message)),this.trackingListeners.forEach(s=>s(a))}),this.hubConnection.on("NewOrderForFarmer",t=>{this.farmerOrderListeners.forEach(a=>a(t.orderId,t.productName,t.qtyKg))}),this.hubConnection.on("DeliveryConfirmed",t=>{this.deliveryConfirmedListeners.forEach(a=>a(t.orderId,t.farmerCut,t.driverCut))}),this.hubConnection.on("DriverLocationUpdate",t=>{const a={orderId:t.orderId,status:"PickedUp",message:`Driver is ${t.estimatedMinutes} minutes away`,gpsLat:t.lat,gpsLng:t.lng,estimatedArrivalMin:t.estimatedMinutes,timestamp:new Date().toISOString()};this.trackingListeners.forEach(s=>s(a))}),this.hubConnection.onreconnecting(()=>{this.isConnected=!1,this.reconnectAttempts++,console.log(`SignalR reconnecting (attempt ${this.reconnectAttempts})...`)}),this.hubConnection.onreconnected(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR reconnected successfully"),this.stopAllPolling()}),this.hubConnection.onclose(()=>{this.isConnected=!1,console.log("SignalR connection closed. Activating polling fallback."),this.activatePollingFallback()}),this.hubConnection.start().then(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection failed — using polling fallback",t),this.activatePollingFallback()})}catch{console.log("SignalR unavailable — running in polling mode"),this.activatePollingFallback()}}stopConnection(){this.stopAllPolling(),this.hubConnection&&(this.hubConnection.stop(),this.hubConnection=null,this.isConnected=!1)}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}leaveOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("LeaveOrder",e).catch(console.error),this.stopPollingForOrder(e)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}onOrderTracking(e){return this.trackingListeners.push(e),()=>{this.trackingListeners=this.trackingListeners.filter(t=>t!==e)}}onNewFarmerOrder(e){return this.farmerOrderListeners.push(e),()=>{this.farmerOrderListeners=this.farmerOrderListeners.filter(t=>t!==e)}}onDeliveryConfirmed(e){return this.deliveryConfirmedListeners.push(e),()=>{this.deliveryConfirmedListeners=this.deliveryConfirmedListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,a){this.statusListeners.forEach(s=>s(e,t,a)),this.trackingListeners.forEach(s=>s({orderId:e,status:t,message:a,timestamp:new Date().toISOString()}))}setPollingCallback(e){this.pollingCallback=e}startPollingForOrder(e,t=15e3){if(this.pollingIntervals.has(e))return;const a=setInterval(async()=>{this.pollingCallback&&await this.pollingCallback(e)},t);this.pollingIntervals.set(e,a)}stopPollingForOrder(e){const t=this.pollingIntervals.get(e);t&&(clearInterval(t),this.pollingIntervals.delete(e))}stopAllPolling(){this.pollingIntervals.forEach(e=>clearInterval(e)),this.pollingIntervals.clear()}activatePollingFallback(){}getConnectionState(){return this.isConnected?"connected":this.reconnectAttempts>0&&this.reconnectAttempts<this.maxReconnectAttempts?"reconnecting":this.pollingIntervals.size>0?"polling":"disconnected"}}const ue=new qt,oe=class oe{constructor(){b(this,"token",localStorage.getItem("token")||null);b(this,"currentUser",this.loadStoredUser());b(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);b(this,"listeners",[]);b(this,"impersonationOriginalUser",null);b(this,"listings",[]);b(this,"orders",[]);b(this,"notifications",[]);b(this,"standingOrders",[]);b(this,"anomalyAlerts",[]);b(this,"kycQueue",[]);b(this,"verificationQueue",[]);b(this,"agentRegisteredFarmers",[]);b(this,"regionalAnalytics",[]);b(this,"priceBenchmarks",[]);b(this,"offlineQueue",[]);b(this,"isOfflineMode",!1);b(this,"banners",[]);b(this,"accountData",{addresses:[],paymentMethods:[],coupons:[],notificationPreferences:[],sessions:[],twoFactor:null});b(this,"rolePermissions",this.loadStoredRolePermissions());b(this,"deletedUserIds",this.loadDeletedUsers());b(this,"allUsers",[]);b(this,"platformConfig",{farmerSharePercent:90,driverSharePercent:5,platformFeePercent:5,withholdingTaxPercent:2,vatOnCommissionPercent:15,highValuePayoutThresholdEtb:5e4,emergencyEscrowFrozen:!1,telebirrAppId:"",telebirrShortCode:"",telebirrApiKey:"",telebirrEscrowVaultKey:"",twilioAccountSid:"",twilioAuthToken:"",twilioFromNumber:"",mapsGeocodingApiKey:"",postgisSpatialIndexEnabled:!0});b(this,"systemAuditLogs",[]);b(this,"deliveryZones",[]);b(this,"featureFlags",[]);b(this,"payoutApprovals",[]);b(this,"globalBusinessRules",{minOrderKg:10,maxOrderKg:5e4,maxDistanceKm:450,priceFloorVariancePercent:-30,priceCeilingVariancePercent:250,requireFaydaForOrdersAboveKg:500,autoArbitrateAfterHours:48});b(this,"blacklist",[]);b(this,"farmerSummary",{totalEarnedEtb:48200,pendingEscrowEtb:14850,releasedEtb:48200,completedOrdersCount:18,pendingOrdersCount:1,totalWithholdingTaxPaidEtb:964});b(this,"driverSummary",{totalEarnedEtb:6450,pendingEtb:825,deliveredTripsCount:14,ruralBonusEtb:1250});b(this,"platformStats",{totalUsers:6,totalFarmers:3,totalBuyers:1,totalDrivers:1,totalListings:6,totalOrders:3,totalTransactionVolumeEtb:34500,totalPlatformCommissionEtb:1725,activeEscrowHeldEtb:25500,disputedOrdersCount:1,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:258.75,totalWithholdingReportedEtb:690});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}loadDeletedUsers(){try{const e=localStorage.getItem("farmerMarketDeletedUsers");if(e){const t=JSON.parse(e);if(Array.isArray(t))return new Set(t.map(a=>String(a).toLowerCase().replace(/\s+/g,"")))}}catch(e){console.warn("Failed to load deleted users list",e)}return new Set}saveDeletedUsers(){try{localStorage.setItem("farmerMarketDeletedUsers",JSON.stringify(Array.from(this.deletedUserIds)))}catch(e){console.warn("Failed to save deleted users list",e)}}isDeletedUser(e,t){if(e&&this.deletedUserIds.has(e.toLowerCase()))return!0;if(t){const a=t.toLowerCase().replace(/\s+/g,"");if(this.deletedUserIds.has(a))return!0;const s=a.replace(/\D/g,"");if(s&&this.deletedUserIds.has(s))return!0}return!1}async init(){this.loadOfflineQueue(),this.initDefaultData(),this.token&&await this.fetchMe(),await this.refreshAllData(),this.token&&await this.fetchAccountData()}initDefaultData(){this.priceBenchmarks=[{cropName:"Fresh Sholla Red Tomatoes",cropNameAm:"ቀይ ቲማቲም",marketName:"Merkato Wholesale / Sholla",minPriceEtb:38,avgPriceEtb:45,maxPriceEtb:52,trend:"Down",lastUpdated:"Today 6:00 AM"},{cropName:"Organic Magna White Teff",cropNameAm:"የማኛ ነጭ ጤፍ",marketName:"EABC / Addis Depot",minPriceEtb:108,avgPriceEtb:115,maxPriceEtb:125,trend:"Up",lastUpdated:"Today 7:30 AM"},{cropName:"Awash Valley Red Onions",cropNameAm:"ቀይ ሽንኩርት",marketName:"Adama Wholesale Market",minPriceEtb:48,avgPriceEtb:55,maxPriceEtb:62,trend:"Stable",lastUpdated:"Today 6:15 AM"},{cropName:"Hawassa Hass Avocados",cropNameAm:"ሀስ አቮካዶ",marketName:"Hawassa Central / Merkato",minPriceEtb:50,avgPriceEtb:60,maxPriceEtb:72,trend:"Up",lastUpdated:"Today 8:00 AM"},{cropName:"Specialty Green Coffee Beans",cropNameAm:"ስፔሻሊቲ ቡና",marketName:"ECX Central Exchange",minPriceEtb:340,avgPriceEtb:380,maxPriceEtb:420,trend:"Up",lastUpdated:"Yesterday"},{cropName:"Bishoftu Sweet Strawberries",cropNameAm:"የቢሾፍቱ እንጆሪ",marketName:"Bole Fresh Produce Hub",minPriceEtb:85,avgPriceEtb:95,maxPriceEtb:110,trend:"Stable",lastUpdated:"Today 7:00 AM"}],this.standingOrders=[{id:"so-1",listingId:"a1b2c3d4-0001-0000-0000-000000000001",productName:"Fresh Sholla Red Tomatoes",productNameAm:"የሾላ ቀይ ቲማቲም",farmerName:"Abebe Bekele",qtyKg:150,pricePerKg:45,frequency:"Weekly",nextDeliveryDate:"Next Monday, 8:00 AM",active:!0,createdAt:new Date().toISOString()},{id:"so-2",listingId:"a1b2c3d4-0003-0000-0000-000000000003",productName:"Awash Valley Red Onions",productNameAm:"የአዋሽ ቀይ ሽንኩርት",farmerName:"Abebe Bekele",qtyKg:200,pricePerKg:55,frequency:"Bi-Weekly",nextDeliveryDate:"Next Thursday, 9:00 AM",active:!0,createdAt:new Date().toISOString()}],this.anomalyAlerts=[{id:"ANOM-101",severity:"High",type:"PriceManipulation",title:"Unusual Price Spike Detected",description:"Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",entityType:"Listing",entityId:"a1b2c3d4-0001-0000-0000-000000000001",detectedAt:"35 mins ago"},{id:"ANOM-102",severity:"Medium",type:"DuplicateProofPhoto",title:"Driver Proof Image Hash Match",description:"Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",entityType:"Order",entityId:"b1b2c3d4-0002-0000-0000-000000000002",detectedAt:"2 hours ago"},{id:"ANOM-103",severity:"Low",type:"FakeAccount",title:"Rapid Registration Cluster",description:"Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",entityType:"User",entityId:"44444444-4444-4444-4444-444444444444",detectedAt:"5 hours ago"}],this.kycQueue=[{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede (Driver)",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",documentType:"Commercial Vehicle Logbook & License",documentNumber:"ET-LOG-5T-98214",tinNumber:"TIN-DRV-981244",kycTier:3,status:"Pending",submittedAt:"Yesterday"},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele (Farmer)",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",documentType:"National ID (Fayda)",documentNumber:"FAYDA-ET-8829104",tinNumber:"TIN-FARM-882910",kycTier:2,status:"Verified",submittedAt:"3 days ago"},{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu (Farmer)",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",documentType:"National ID (Fayda)",documentNumber:"FAN-8812-4091-2810",tinNumber:"0099881122",kycTier:2,status:"Pending",submittedAt:"1 day ago"},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu (Farmer)",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",documentType:"Kebele Smallholder ID",documentNumber:"HAW-KEB-4410",kycTier:1,status:"Pending",submittedAt:"12 hours ago"}],this.verificationQueue=[{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu",userNameAm:"ግርማ ወንዲሙ",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",registrationMethod:"Agent",registeredByAgentName:"Kassahun Tolessa (Field Agent)",verificationStatus:"UnderReview",tinNumber:"0099881122",registeredAt:"Yesterday 4:15 PM",documents:[{id:"doc-1",userId:"88888888-8888-8888-8888-888888888888",documentType:"FaydaId",documentNumber:"FAN-8812-4091-2810",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"},{id:"doc-2",userId:"88888888-8888-8888-8888-888888888888",documentType:"TinCertificate",documentNumber:"0099881122",frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"}],reviews:[]},{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede",userNameAm:"ዳዊት ከበደ",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:"TIN-DRV-981244",registeredAt:"2 days ago",documents:[{id:"doc-3",userId:"55555555-5555-5555-5555-555555555555",documentType:"VehicleLogbook",documentNumber:"ET-LOG-5T-98214",frontImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"2 days ago"}],reviews:[]},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu",userNameAm:"ጫላ ገመቹ",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",registrationMethod:"Self",verificationStatus:"UnderReview",registeredAt:"3 days ago",documents:[{id:"doc-4",userId:"33333333-3333-3333-3333-333333333333",documentType:"KebeleId",documentNumber:"HAW-KEB-4410",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"3 days ago"}],reviews:[]},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele",userNameAm:"አበበ በቀለ",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",registrationMethod:"Self",verificationStatus:"Approved",tinNumber:"TIN-FARM-882910",registeredAt:"1 month ago",documents:[{id:"doc-5",userId:"11111111-1111-1111-1111-111111111111",documentType:"FaydaId",documentNumber:"FAYDA-ET-8829104",status:"Approved",submittedAt:"1 month ago"}],reviews:[{id:"rev-1",userId:"11111111-1111-1111-1111-111111111111",reviewerName:"Sara Mengistu",actionTaken:"Approved",notes:"National ID and Bishoftu farm registry confirmed.",timestamp:"1 month ago"}]}],this.agentRegisteredFarmers=[{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",kebele:"Ada'a Kebele 04",primaryCrop:"Magna Teff & Tomatoes",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",status:"UnderReview",registeredAt:"Yesterday 4:15 PM",faydaFrontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",status:"Approved",registeredAt:"5 days ago"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",status:"Approved",registeredAt:"1 week ago"}],this.regionalAnalytics=[{region:"Oromia (East Shewa / Bishoftu)",smallholdersCount:4200,volumeMetricTons:68.5,totalGmvEtb:385e4,topCrop:"Tomatoes & Onions"},{region:"Amhara (Debre Berhan / Gojjam)",smallholdersCount:3100,volumeMetricTons:42,totalGmvEtb:483e4,topCrop:"Magna White Teff"},{region:"Sidama (Hawassa / Yirgalem)",smallholdersCount:1950,volumeMetricTons:24.8,totalGmvEtb:1488e3,topCrop:"Hass Avocados & Fruits"},{region:"SNNPR (Gedeo / Yirgacheffe)",smallholdersCount:1400,volumeMetricTons:10.5,totalGmvEtb:399e4,topCrop:"Specialty Green Coffee"}],this.allUsers=[{id:"00000000-0000-0000-0000-000000000001",name:"Dr. Dawit Haile (Super Admin)",nameAm:"ዶ/ር ዳዊት ኃይሌ",phone:"+251900000001",role:"superadmin",region:"Addis Ababa (Headquarters)",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-01-01"},{id:"66666666-6666-6666-6666-666666666666",name:"Sara Mengistu (Marketplace Admin)",nameAm:"ሳራ መንግስቱ",phone:"+251900112233",role:"admin",region:"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-03-15"},{id:"77777777-7777-7777-7777-777777777777",name:"Kassahun Tolessa (Field Agent)",nameAm:"ካሳሁን ቶለሳ",phone:"+251988776655",role:"agent",region:"Oromia (East Shewa / Bishoftu)",verified:!0,verificationStatus:"Approved",status:"active",tinNumber:"TIN-AG-881920",createdAt:"2025-04-10"},{id:"11111111-1111-1111-1111-111111111111",name:"Abebe Bekele",nameAm:"አበበ በቀለ",phone:"+251911223344",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Fresh Sholla Tomatoes",faydaId:"FAN-1122-3344-5566",tinNumber:"0011223344",walletBalanceEtb:48200,createdAt:"2025-02-01"},{id:"22222222-2222-2222-2222-222222222222",name:"Almaz Tadesse",nameAm:"አልማዝ ታደሰ",phone:"+251922334455",role:"farmer",region:"Amhara (Debre Berhan / Basona)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Organic Magna White Teff",faydaId:"FAN-2233-4455-6677",tinNumber:"0022334455",walletBalanceEtb:62400,createdAt:"2025-02-15"},{id:"33333333-3333-3333-3333-333333333333",name:"Chala Gemechu",nameAm:"ጫላ ገመቹ",phone:"+251933445566",role:"farmer",region:"Sidama (Hawassa / Wondo Genet)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Hawassa Hass Avocados",faydaId:"FAN-3344-5566-7788",tinNumber:"0033445566",walletBalanceEtb:39100,createdAt:"2025-03-01"},{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!1,verificationStatus:"UnderReview",status:"active",primaryCrop:"Magna Teff",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",createdAt:"2026-08-20"},{id:"44444444-4444-4444-4444-444444444444",name:"Bethlehem Tsegaye",nameAm:"ቤተልሔም ፀጋዬ",phone:"+251912345678",role:"buyer",region:"Addis Ababa (Bole Sub-City)",verified:!0,verificationStatus:"Approved",status:"active",businessLicenseNumber:"BL-AA-998812",tinNumber:"0044556677",createdAt:"2025-01-20"},{id:"55555555-5555-5555-5555-555555555555",name:"Dawit Kebede (Freight Logistics)",nameAm:"ዳዊት ከበደ",phone:"+251977889900",role:"driver",region:"Addis Ababa / Oromia Freight Corridor",verified:!0,verificationStatus:"Approved",status:"active",vehicleType:"Isuzu 5-Ton Refrigerated",vehicleCapacityKg:5e3,refrigerationType:"Ventilated & Insulated",walletBalanceEtb:6450,createdAt:"2025-02-10"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",role:"farmer",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-04-12"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",role:"farmer",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-04-15"}];const e=localStorage.getItem("farmerMarketAllUsers");let t=[];if(e)try{const r=JSON.parse(e);Array.isArray(r)&&r.length>0&&(t=r)}catch(r){console.warn("Could not parse stored users, using default seed",r)}if(t.length>0){const r=[...this.allUsers],i=[...t];r.forEach(o=>{const d=o.phone.replace(/\s+/g,"");!this.isDeletedUser(o.id,d)&&!i.some(c=>c.id===o.id||c.phone.replace(/\s+/g,"")===d)&&i.push(o)}),this.allUsers=i.filter(o=>!this.isDeletedUser(o.id,o.phone))}else this.allUsers=this.allUsers.filter(r=>!this.isDeletedUser(r.id,r.phone));const a=[{id:"banner-01",title:"Fresh Harvest Direct From Bishoftu & Hawassa",titleAm:"የቢሾፍቱ እና የሀዋሳ አዳዲስ ምርቶች በቀጥታ ከእርሻ",subtitle:"Order Grade-A Teff, Organic Tomatoes & Hass Avocados directly from verified smallholder farmers with 100% Telebirr Escrow protection.",subtitleAm:"ከደላላ ጣልቃ ገብነት ነፃ የሆኑ ምርጥ የማኛ ጤፍ፣ የቢሾፍቱ ቀይ ቲማቲም እና ሀስ አቮካዶ በቴሌብር የዋስትና ክፍያ ያግኙ።",badgeText:"Harvest Season 2026",badgeTextAm:"የ2018 ምርት ወቅት",imageUrl:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",targetAudience:"Buyer",targetRegion:"All",ctaText:"Browse Marketplace",ctaTextAm:"ገበያውን ይመልከቱ",ctaLink:"marketplace",themeGradient:"from-emerald-900 via-teal-900 to-slate-900",priority:10,isActive:!0,createdAt:"2026-08-20",createdBy:"Dr. Dawit Haile (Super Admin)"},{id:"banner-02",title:"National Smallholder Fayda ID & TIN Onboarding",titleAm:"የአነስተኛ አርሶ አደሮች የፋይዳ (Fayda ID) እና TIN ምዝገባ",subtitle:"Verify your digital national ID to unlock instant 90% direct payouts, MOR tax withholding exemptions, and local extension agent farm visits.",subtitleAm:"ምርቶን በቀጥታ ለጅምላ ገዢዎች ለመሸጥ እና ክፍያ በቴሌብር ለመቀበል የፋይዳ መታወቂያዎን አሁኑኑ ያረጋግጡ።",badgeText:"Legal Compliance",badgeTextAm:"ህጋዊ ማረጋገጫ",imageUrl:"https://images.unsplash.com/photo-1592417817098-8f3d6910a711?auto=format&fit=crop&q=80&w=1200",targetAudience:"Farmer",targetRegion:"All",ctaText:"Verify Identity Now",ctaTextAm:"መታወቂያዎን ያረጋግጡ",ctaLink:"farmer",themeGradient:"from-blue-900 via-indigo-950 to-slate-900",priority:8,isActive:!0,createdAt:"2026-08-22",createdBy:"Sara Mengistu (Admin)"},{id:"banner-03",title:"Cold Chain Freight Route Subsidies: Modjo - Addis Corridor",titleAm:"የማቀዝቀዣ የጭነት ማጓጓዣ ድጋፍ፡ የሞጆ-አዲስ አበባ መስመር",subtitle:"Verified 5-ton & 10-ton refrigerated truck drivers earn guaranteed 5% escrow share with instant fuel advance and digital waybill tracking.",subtitleAm:"የተረጋገጡ የጭነት ሹፌሮች የ5% የዋስትና ክፍያ እና ዲጂታል የመንገድ ማረጋገጫ ወዲያውኑ ያገኛሉ።",badgeText:"Logistics Incentive",badgeTextAm:"የሎጂስቲክስ ማበረታቻ",imageUrl:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",targetAudience:"Driver",targetRegion:"Oromia",ctaText:"View Available Dispatches",ctaTextAm:"የተዘጋጁ ጭነቶችን ይመልከቱ",ctaLink:"driver",themeGradient:"from-amber-900 via-orange-950 to-slate-900",priority:7,isActive:!0,createdAt:"2026-08-25",createdBy:"Sara Mengistu (Admin)"}],s=localStorage.getItem("farmerMarketBanners");if(s)try{const r=JSON.parse(s);Array.isArray(r)&&r.length>0?this.banners=r:this.banners=a}catch{this.banners=a}else this.banners=a;this.systemAuditLogs=[{id:"log-101",actorId:"00000000-0000-0000-0000-000000000001",actorName:"Dr. Dawit Haile (Super Admin)",actorRole:"superadmin",action:"INITIALIZE_PLATFORM_GOVERNANCE",category:"CONFIG",targetResource:"PlatformConfig",targetId:"ESCROW-90-5-5",ipAddress:"196.188.12.45 (Addis Ababa, Ethio Telecom)",userAgent:"Antigravity/2.0 Web Admin Engine",details:"Established baseline 90/5/5 escrow split, 15% VAT on platform fee, and MOR withholding tax schedule.",timestamp:"2026-08-23 08:30 AM"},{id:"log-102",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"APPROVE_KYC_VERIFICATION",category:"USER_CRUD",targetResource:"UserDocument",targetId:"11111111-1111-1111-1111-111111111111",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Approved Abebe Bekele Fayda National ID (FAN-1122-3344-5566) and TIN (0011223344).",timestamp:"2026-08-23 10:15 AM"},{id:"log-103",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"DISPUTE_ARBITRATION_DECREE",category:"DISPUTE",targetResource:"Order",targetId:"ord-dispute-001",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Resolved moisture defect dispute with 50/50 partial split under EABC arbitration rules.",timestamp:"2026-08-23 11:45 AM"}],this.deliveryZones=[{id:"zone-1",name:"Oromia East Shewa Hub",nameAm:"ምስራቅ ሸዋ የግብርና ኮሪደር",centerLatitude:8.7522,centerLongitude:38.9785,baseRadiusKm:45,maxRadiusKm:120,ruralSubsidyEtb:150,active:!0,clusterHubName:"Bishoftu & Mojo Freight Terminal",smallholdersCount:4200},{id:"zone-2",name:"Addis Ababa Central Wholesale Depot",nameAm:"አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ",centerLatitude:9.0222,centerLongitude:38.7468,baseRadiusKm:25,maxRadiusKm:60,ruralSubsidyEtb:0,active:!0,clusterHubName:"Merkato & Jan Meda Distribution",smallholdersCount:850},{id:"zone-3",name:"Amhara Highland Grain Basin",nameAm:"የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ",centerLatitude:9.68,centerLongitude:39.53,baseRadiusKm:60,maxRadiusKm:180,ruralSubsidyEtb:250,active:!0,clusterHubName:"Debre Berhan & Shewa Robit Hub",smallholdersCount:3100},{id:"zone-4",name:"Sidama Rift Fruit & Vegetable Zone",nameAm:"የሲዳማ ፍራፍሬ እና አትክልት ዞን",centerLatitude:7.0504,centerLongitude:38.4955,baseRadiusKm:50,maxRadiusKm:150,ruralSubsidyEtb:200,active:!0,clusterHubName:"Hawassa Lakeview Terminal",smallholdersCount:1950},{id:"zone-5",name:"SNNPR Gedeo Specialty Coffee Zone",nameAm:"የጌዴኦ ስፔሻሊቲ ቡና ዞን",centerLatitude:6.1628,centerLongitude:38.2045,baseRadiusKm:40,maxRadiusKm:140,ruralSubsidyEtb:300,active:!0,clusterHubName:"Yirgacheffe Washing Station Depot",smallholdersCount:1400},{id:"zone-6",name:"Tigray Northern Transit Hub",nameAm:"የትግራይ ሰሜናዊ የንግድ ኮሪደር",centerLatitude:13.4967,centerLongitude:39.4753,baseRadiusKm:55,maxRadiusKm:160,ruralSubsidyEtb:350,active:!0,clusterHubName:"Mekelle Central Depot",smallholdersCount:1100}],this.featureFlags=[{key:"advance_harvest",name:"Advance Harvest Pre-Ordering",description:"Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","buyer","admin","superadmin"]},{key:"voice_note_transcription",name:"Voice Note Audio Memos & AI Transcription",description:"Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent","admin","superadmin"]},{key:"dynamic_price_benchmarking",name:"Real-time Wholesale Depot Price Benchmarking",description:"Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["buyer","farmer","superadmin"]},{key:"ussd_offline_gateway",name:"USSD Offline Gateway (*990# / *805#)",description:"Permits feature phone registration, balance checks, and SMS listing fallbacks.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent"]},{key:"multisig_escrow_protection",name:"High-Value Escrow Multi-Sig Authorization",description:"Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["admin","superadmin"]}],this.payoutApprovals=[{id:"payout-appr-001",recipientId:"22222222-2222-2222-2222-222222222222",recipientName:"Almaz Tadesse (Basona Teff Cooperative)",recipientPhone:"+251922334455",recipientRole:"farmer",amountEtb:62400,walletBalanceBefore:62400,riskScore:"Low",triggerReason:"Exceeds 50,000 ETB platform threshold (100 Quintals Teff Settlement)",status:"Pending",requestedAt:"Today 10:45 AM"},{id:"payout-appr-002",recipientId:"55555555-5555-5555-5555-555555555555",recipientName:"Dawit Kebede (Bulk Freight Fleet)",recipientPhone:"+251977889900",recipientRole:"driver",amountEtb:54200,walletBalanceBefore:54200,riskScore:"Medium",triggerReason:"High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips)",status:"Pending",requestedAt:"Today 01:20 PM"}],this.blacklist=[{id:"bl-01",type:"Phone",value:"+251911999888",reason:"Repeated fraudulent non-delivery claims in Adama market",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-15",active:!0},{id:"bl-02",type:"NationalId",value:"FAN-9999-0000-1111",reason:"Forged Kebele farming certification and duplicate TIN submission",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-18",active:!0}]}loadOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");e&&(this.offlineQueue=JSON.parse(e))}catch{this.offlineQueue=[]}}saveOfflineQueue(){localStorage.setItem("offlineQueue",JSON.stringify(this.offlineQueue))}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),a=t.verificationStatus||(t.verified?"Approved":"PendingSubmission"),s={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,email:t.email,languagePreference:t.languagePreference,savedDeliveryAddress:t.savedDeliveryAddress,defaultDeliveryLat:t.defaultDeliveryLat,defaultDeliveryLng:t.defaultDeliveryLng,role:(t.role||"buyer").toLowerCase(),region:t.region,verified:t.verified??a==="Approved",verificationStatus:a,rejectionReason:t.rejectionReason,tinNumber:t.tinNumber||(a==="Approved"&&t.role==="buyer"?"TIN-ET-9912001":void 0),businessLicenseNumber:t.businessLicenseNumber||(a==="Approved"?"MOT-LIC-2026-98124":void 0),vehicleType:t.vehicleType||(t.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:t.refrigerationType||(t.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:t.vehicleCapacityKg||(t.role==="driver"?5e3:void 0),kycDocumentType:t.kycDocumentType||(a==="Approved"?"National ID (Fayda)":void 0),kycDocumentNumber:t.kycDocumentNumber,kycStatus:a==="Approved"?"Verified":"Pending",kycTier:t.kycTier||2,repeatBuyerCount:t.repeatBuyerCount||(t.role==="farmer"?14:void 0),onTimeDeliveryRate:t.onTimeDeliveryRate||(t.role==="farmer"||t.role==="driver"?99:void 0),walletBalanceEtb:t.walletBalanceEtb??0,createdAt:t.createdAt};return this.currentUser=s,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(s)),this.notify(),s}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async updateProfile(e){if(!this.token)throw new Error("You must be signed in to update your profile.");const t=await fetch("/api/auth/profile",{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({Name:e.name,NameAm:e.nameAm||null,Region:e.region,Email:e.email||null,LanguagePreference:e.languagePreference||null,SavedDeliveryAddress:e.savedDeliveryAddress||null,DefaultDeliveryLat:e.defaultDeliveryLat??null,DefaultDeliveryLng:e.defaultDeliveryLng??null})}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a.error||"Could not save your profile.");return await this.fetchMe(),this.currentUser}async changePassword(e,t){if(!this.token)throw new Error("You must be signed in to change your password.");const a=await fetch("/api/auth/change-password",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({currentPassword:e,newPassword:t})}),s=await a.json().catch(()=>({}));if(!a.ok)throw new Error(s.error||"Could not change your password.")}async accountRequest(e,t){const a=await fetch(`/api/account/${e}`,{...t,headers:{...this.getAuthHeaders(),...(t==null?void 0:t.headers)||{}}}),s=await a.json().catch(()=>null);if(!a.ok)throw new Error((s==null?void 0:s.error)||"Account request failed.");return s}async fetchAccountData(){if(!this.token)return this.accountData;const[e,t,a,s,r,i]=await Promise.all([this.accountRequest("addresses"),this.accountRequest("payment-methods"),this.accountRequest("coupons"),this.accountRequest("notification-preferences"),this.accountRequest("sessions"),this.accountRequest("two-factor")]);return this.accountData={addresses:e,paymentMethods:t,coupons:a,notificationPreferences:s,sessions:r,twoFactor:i},this.accountData}getAccountData(){return this.accountData}async saveAddress(e){const t=await this.accountRequest("addresses",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateAddress(e,t){const a=await this.accountRequest(`addresses/${e}`,{method:"PUT",body:JSON.stringify(t)});return await this.fetchAccountData(),a}async deleteAddress(e){await this.accountRequest(`addresses/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async addPaymentMethod(e){const t=await this.accountRequest("payment-methods",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async setPrimaryPaymentMethod(e){await this.accountRequest(`payment-methods/${e}/primary`,{method:"PUT"}),await this.fetchAccountData()}async deletePaymentMethod(e){await this.accountRequest(`payment-methods/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async setNotificationPreference(e){const t=await this.accountRequest("notification-preferences",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateTwoFactor(e){const t=await this.accountRequest("two-factor",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async revokeOtherSessions(){await this.accountRequest("sessions/revoke-others",{method:"POST"}),await this.fetchAccountData()}async requestOtp(e){const t=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const a=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(a.ok)return await a.json();const s=this.allUsers.find(i=>i.phone.replace(/\s+/g,"")===t);if(s)return{demoCode:"888888",message:`Verification code dispatched via SMS simulator for ${s.name}.`,phone:t,userName:s.name,role:s.role};const r=await a.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(r.error||"Failed to request OTP. Please check your phone number.")}catch(a){const s=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===t);if(s)return{demoCode:"888888",message:`Verification code dispatched via SMS simulator for ${s.name}.`,phone:t,userName:s.name,role:s.role};throw a}}async verifyOtp(e,t){const a=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const r=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:a,code:t.trim()})});if(r.ok){const i=await r.json();this.token=i.token,localStorage.setItem("token",i.token);const o=i.user.verificationStatus||(i.user.verified?"Approved":"PendingSubmission"),d={id:i.user.id,phone:i.user.phone,name:i.user.name,nameAm:i.user.nameAm,role:(i.user.role||"buyer").toLowerCase(),region:i.user.region,verified:i.user.verified??o==="Approved",verificationStatus:o,rejectionReason:i.user.rejectionReason,tinNumber:i.user.tinNumber,businessLicenseNumber:i.user.businessLicenseNumber,vehicleType:i.user.vehicleType||(i.user.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:i.user.refrigerationType||(i.user.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:i.user.vehicleCapacityKg||(i.user.role==="driver"?5e3:void 0),kycDocumentType:i.user.kycDocumentType,kycDocumentNumber:i.user.kycDocumentNumber,kycStatus:o==="Approved"?"Verified":"Pending",kycTier:2,repeatBuyerCount:i.user.repeatBuyerCount||(i.user.role==="farmer"?14:void 0),onTimeDeliveryRate:i.user.onTimeDeliveryRate||(i.user.role==="farmer"||i.user.role==="driver"?99:void 0),walletBalanceEtb:i.user.walletBalanceEtb??0,createdAt:i.user.createdAt};return this.currentUser=d,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(d)),ue.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),d}}catch(r){console.warn("Network verifyOtp failed, checking local seed users",r)}const s=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===a);if(s)return this.currentUser=s,this.isUserLoggedIn=!0,this.token="demo-jwt-token-"+s.id,localStorage.setItem("token",this.token),localStorage.setItem("currentUser",JSON.stringify(s)),this.notify(),s;throw new Error("Invalid verification code or phone number.")}async registerUser(e,t,a,s,r){const i=a.startsWith("+251")?a.replace(/\s+/g,""):"+251"+a.replace(/^0+/,"").replace(/\s+/g,""),o=s.charAt(0).toUpperCase()+s.slice(1).toLowerCase();let d;try{const n=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,phone:i,role:o,region:r})});if(n.ok){const f=await n.json();this.token=f.token,localStorage.setItem("token",f.token),d={id:f.user.id,phone:f.user.phone,name:f.user.name,nameAm:f.user.nameAm,role:(f.user.role||"buyer").toLowerCase(),region:f.user.region,verified:!1,verificationStatus:"PendingSubmission",status:"active",tinNumber:void 0,businessLicenseNumber:void 0,vehicleType:s==="driver"?"Isuzu 5-Ton":void 0,refrigerationType:s==="driver"?"Ventilated":void 0,vehicleCapacityKg:s==="driver"?5e3:void 0,kycDocumentType:void 0,kycDocumentNumber:void 0,kycStatus:"Pending",kycTier:1,repeatBuyerCount:0,onTimeDeliveryRate:100,walletBalanceEtb:0,createdAt:f.user.createdAt||new Date().toISOString()}}else{const f=await n.json().catch(()=>({error:"Registration failed"}));throw new Error(f.error||"Registration failed")}}catch(n){console.warn("Backend register call fallback to local state",n),d={id:"user-"+Date.now(),phone:i,name:e,nameAm:t||e,role:s,region:r,verified:!1,verificationStatus:"PendingSubmission",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},this.token="demo-jwt-token-"+d.id,localStorage.setItem("token",this.token)}this.currentUser=d,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const c=this.allUsers.findIndex(n=>n.id===d.id||n.phone===d.phone);return c!==-1?this.allUsers[c]={...this.allUsers[c],...d}:this.allUsers.unshift(d),this.saveUsersToStorage(),this.addAuditLog({actorId:d.id,actorName:d.name,actorRole:d.role,action:"USER_REGISTRATION",category:"AUTH",targetResource:"User",targetId:d.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Self-registered new ${d.role.toUpperCase()} account: ${d.name} (${d.phone}) in ${d.region}.`}),ue.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(){try{const e=await fetch("/api/listings");if(e.ok){const t=await e.json(),a=Array.isArray(t)?t:t.items||[];return this.listings=a.map(s=>({id:s.id,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,region:s.region,productName:s.productName,nameAm:s.nameAm,category:s.category,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),minOrderKg:Number(s.minOrderKg),latitude:s.latitude,longitude:s.longitude,distanceKm:s.distanceKm,photos:s.photos&&s.photos.length>0?s.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:s.availableFrom||new Date().toISOString().split("T")[0],status:(s.status||"Active").toLowerCase(),grade:s.grade||"Grade 1",ripeness:s.ripeness||"Ready Today",isOrganic:s.isOrganic??!0,isAdvanceHarvest:s.isAdvanceHarvest??!1,expectedHarvestDate:s.expectedHarvestDate,voiceNoteUrl:s.voiceNoteUrl,voiceNoteTranscript:s.voiceNoteTranscript,marketBenchmarkPrice:s.marketBenchmarkPrice||s.pricePerKg,moderationStatus:s.moderationStatus||"Approved",farmerRating:s.farmerRating||4.9,reviewCount:s.reviewCount||14,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:s.createdAt})),this.notify(),this.listings}}catch(e){console.warn("Fetch listings from backend failed",e)}return this.listings}getListings(e,t,a,s,r,i,o,d){return this.listings.filter(c=>{if(c.status!=="active"||e&&e!=="All"&&c.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!c.region.toLowerCase().includes(t.toLowerCase())||r&&r!=="All"&&c.grade!==r||i&&i!=="All"&&c.ripeness!==i||o&&!c.isOrganic||d&&!c.isAdvanceHarvest||s&&c.distanceKm&&c.distanceKm>s)return!1;if(a){const n=a.toLowerCase();if(!(c.productName.toLowerCase().includes(n)||c.nameAm&&c.nameAm.includes(n)||c.farmerName.toLowerCase().includes(n)||c.region.toLowerCase().includes(n)))return!1}return!0})}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var s,r,i,o,d,c,n,f,v,S;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category||"Vegetables",qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate||null,voiceNoteUrl:e.voiceNoteUrl||null,voiceNoteTranscript:e.voiceNoteTranscript||null,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg};let a=null;try{const E=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(E.ok){const w=await E.json();a={id:w.id,farmerId:w.farmerId||((s=this.currentUser)==null?void 0:s.id)||"11111111-1111-1111-1111-111111111111",farmerName:w.farmerName||((r=this.currentUser)==null?void 0:r.name)||"Abebe Bekele",farmerNameAm:w.farmerNameAm||((i=this.currentUser)==null?void 0:i.nameAm),farmerPhone:w.farmerPhone||((o=this.currentUser)==null?void 0:o.phone)||"+251911223344",region:w.region||((d=this.currentUser)==null?void 0:d.region)||"Oromia (Bishoftu)",productName:w.productName,nameAm:w.nameAm,category:w.category,qtyKg:Number(w.qtyKg),pricePerKg:Number(w.pricePerKg),minOrderKg:Number(w.minOrderKg),latitude:w.latitude,longitude:w.longitude,distanceKm:w.distanceKm||45,photos:w.photos&&w.photos.length>0?w.photos:e.photos||["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:w.availableFrom,status:"active",grade:w.grade||e.grade||"Grade 1",ripeness:w.ripeness||e.ripeness||"Ready Today",isOrganic:w.isOrganic??e.isOrganic??!0,isAdvanceHarvest:w.isAdvanceHarvest??e.isAdvanceHarvest??!1,expectedHarvestDate:w.expectedHarvestDate||e.expectedHarvestDate,voiceNoteUrl:w.voiceNoteUrl||e.voiceNoteUrl,voiceNoteTranscript:w.voiceNoteTranscript||e.voiceNoteTranscript,marketBenchmarkPrice:w.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:w.createdAt||new Date().toISOString()}}}catch(E){console.warn("Create listing network call fallback to local state",E)}return a||(a={id:"list-local-"+Date.now(),farmerId:((c=this.currentUser)==null?void 0:c.id)||"11111111-1111-1111-1111-111111111111",farmerName:((n=this.currentUser)==null?void 0:n.name)||"Abebe Bekele",farmerNameAm:(f=this.currentUser)==null?void 0:f.nameAm,farmerPhone:((v=this.currentUser)==null?void 0:v.phone)||"+251911223344",region:((S=this.currentUser)==null?void 0:S.region)||"Oromia (Bishoftu)",productName:e.productName||"Fresh Farm Produce",nameAm:e.nameAm,category:e.category||"Vegetables",qtyKg:Number(e.qtyKg||1e3),pricePerKg:Number(e.pricePerKg||45),minOrderKg:Number(e.minOrderKg||100),latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,distanceKm:45,photos:e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],status:"active",grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate,voiceNoteUrl:e.voiceNoteUrl,voiceNoteTranscript:e.voiceNoteTranscript,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:new Date().toISOString()}),this.listings.unshift(a),this.notify(),a}async deleteListing(e){const t=await fetch(`/api/listings/${e}`,{method:"DELETE",headers:this.getAuthHeaders()}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a.error||"Could not delete the listing.");await this.fetchListings()}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(a=>{const s=Number(a.totalEtb),r=Number(a.farmerCut||s*.9),i=Number(a.driverCut||s*.05),o=Number(a.platformCut||s*.05),d=Math.round(s*.02),c=Math.round(o*.15);return{id:a.id,listingId:a.listingId,productName:a.productName,productNameAm:a.productNameAm,category:a.category,farmerId:a.farmerId,farmerName:a.farmerName,farmerNameAm:a.farmerNameAm,farmerPhone:a.farmerPhone,farmerRegion:a.farmerRegion,buyerId:a.buyerId,buyerName:a.buyerName,buyerPhone:a.buyerPhone,driverId:a.driverId,driverName:a.driverName,driverPhone:a.driverPhone,qtyKg:Number(a.qtyKg),pricePerKg:Number(a.pricePerKg),totalEtb:s,farmerCut:r,driverCut:i,platformCut:o,driverSubsidyEtb:Number(a.driverSubsidyEtb||150),withholdingTaxEtb:d,platformVatEtb:c,status:(a.status||"Pending").toLowerCase(),escrowHeld:a.escrowHeld,paymentRef:a.paymentRef||`TB-${a.id.slice(0,8).toUpperCase()}`,invoiceNumber:`ET-INV-2026-${a.id.slice(0,6).toUpperCase()}`,waybillNumber:`WB-FTA-${a.id.slice(0,6).toUpperCase()}`,contractNumber:`AGR-ET-${a.id.slice(0,6).toUpperCase()}`,arbitrationDecreeNumber:a.status==="disputed"?`ARB-DEC-${a.id.slice(0,6).toUpperCase()}`:void 0,pickupPhoto:a.pickupPhoto,deliveryPhoto:a.deliveryPhoto,deliveryGpsLat:a.deliveryGpsLat,deliveryGpsLng:a.deliveryGpsLng,deliveredAt:a.deliveredAt,deliveryAddress:a.deliveryAddress,deliveryNotes:a.deliveryNotes,disputeReason:a.disputeReason,disputePhoto:a.disputePhoto,requestedRefundPercent:a.requestedRefundPercent||100,disputeStatus:a.disputeStatus||"None",disputeResolutionNotes:a.disputeResolutionNotes,isRecurring:a.isRecurring||!1,recurringFrequency:a.recurringFrequency,confirmedAt:a.confirmedAt,createdAt:a.createdAt}}),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(a=>a.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(a=>a.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(a=>a.driverId===this.currentUser.id||a.status==="confirmed"&&!a.driverId):this.orders}async placeOrder(e,t,a,s=!1,r="Weekly",i){var c;if(!this.listings.find(n=>n.id===e))throw new Error("Listing not found");if(!(await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:a||((c=this.currentUser)==null?void 0:c.region)||"Addis Ababa (Bole)",paymentMethodId:i||null,isRecurring:s,recurringFrequency:s?r:null})})).ok)throw new Error("Failed to place order in database");return await this.fetchOrders(),await this.fetchListings(),this.orders[0]||this.orders.find(n=>n.listingId===e)}async confirmOrderByFarmer(e){await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders()}async pickupOrderByDriver(e,t){if(this.isOfflineMode){this.offlineQueue.push({id:"off-"+Date.now(),type:"pickup",orderId:e,timestamp:new Date().toISOString(),data:{photo:t},synced:!1}),this.saveOfflineQueue();const a=this.orders.find(s=>s.id===e);a&&(a.status="picked_up",a.pickupPhoto=t),this.notify();return}await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"})}),await this.fetchOrders()}async confirmDeliveryByBuyer(e,t,a,s){await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({deliveryPhoto:t||"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",deliveryGpsLat:a||9.03,deliveryGpsLng:s||38.74})}),await this.fetchOrders()}async disputeOrder(e,t,a,s=50){const r=await fetch(`/api/orders/${e}/dispute`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,disputePhoto:a||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",requestedRefundPercent:s})}),i=await r.json().catch(()=>({}));if(!r.ok)throw new Error(i.error||"Could not submit the dispute.");await this.fetchOrders()}async resolveDispute(e,t,a=50,s=50){const r=await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:`Arbitrated via Admin Console (${t})`,farmerSharePercent:a,buyerRefundPercent:s})}),i=await r.json().catch(()=>({}));if(!r.ok)throw new Error(i.error||"Could not resolve the dispute.");await this.fetchOrders()}getTaxInvoice(e){const t=this.orders.find(r=>r.id===e)||this.orders[0]||{id:e,productName:"Fresh Sholla Red Tomatoes",qtyKg:200,pricePerKg:45,totalEtb:9e3,farmerCut:8100,driverCut:450,platformCut:450,farmerName:"Abebe Bekele",farmerRegion:"Oromia (Bishoftu)",farmerPhone:"+251 911 223 344",buyerName:"Bethlehem Tilahun (FreshMart)",buyerPhone:"+251 955 667 788",paymentRef:"TB-TXN-98217391",invoiceNumber:"ET-INV-2026-001",createdAt:new Date().toISOString()},a=Math.round(t.platformCut*.15),s=Math.round(t.totalEtb*.02);return{invoiceNumber:t.invoiceNumber||`ET-INV-2026-${t.id.slice(0,6).toUpperCase()}`,orderId:t.id,issueDate:t.createdAt?new Date(t.createdAt).toLocaleDateString("en-GB"):new Date().toLocaleDateString("en-GB"),paymentRef:t.paymentRef||`TB-C2B-${t.id.slice(0,8).toUpperCase()}`,sellerName:t.farmerName,sellerTin:"TIN-FARM-8829104",sellerRegion:t.farmerRegion,sellerPhone:t.farmerPhone,sellerType:"Registered Agricultural Smallholder Producer",buyerName:t.buyerName,buyerTin:"TIN-ET-9912001",buyerRegion:"Addis Ababa (Bole)",buyerPhone:t.buyerPhone,productName:t.productName,productNameAm:t.productNameAm,grade:"Grade 1 (Certified Farm Standard)",qtyKg:t.qtyKg,unitPriceEtb:t.pricePerKg,grossAmountEtb:t.totalEtb,farmerPayoutEtb:t.farmerCut,driverFreightEtb:t.driverCut,platformServiceFeeEtb:t.platformCut,platformVatEtb:a,withholdingTaxEtb:s,totalPaidViaTelebirr:t.totalEtb,regulatoryAct:"Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)",qrVerificationCode:`ET-TAX-AUTH-2026-VERIFIED-${t.id.slice(0,8).toUpperCase()}`,isVatExemptAgriculturalGoods:!0}}getTransportWaybill(e){const t=this.orders.find(a=>a.id===e)||this.orders[0];return{waybillNumber:(t==null?void 0:t.waybillNumber)||`WB-FTA-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,dispatchDate:new Date().toLocaleDateString("en-GB"),consignorName:(t==null?void 0:t.farmerName)||"Abebe Bekele",consignorFarmLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu Green Farms, Oromia",consignorPhone:(t==null?void 0:t.farmerPhone)||"+251 911 223 344",consigneeName:(t==null?void 0:t.buyerName)||"FreshMart Central Wholesale Hub",consigneeDepotAddress:(t==null?void 0:t.deliveryAddress)||"Bole Depot, Addis Ababa",consigneePhone:(t==null?void 0:t.buyerPhone)||"+251 955 667 788",carrierDriverName:(t==null?void 0:t.driverName)||"Dawit Kebede",driverLicenseNumber:"ET-CDL-COMM-89104",vehiclePlateNumber:"ET-3-B98124-AA",vehicleModel:"Isuzu 5-Ton Commercial Freight Carrier",refrigerationStatus:"Ventilated Agri-Body Cargo (18°C)",insurancePolicyNumber:"NIC-ET-CARGO-771920",cargoDescription:`${(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes"} (Grade 1)`,packageCount:Math.ceil(((t==null?void 0:t.qtyKg)||200)/25),netWeightKg:(t==null?void 0:t.qtyKg)||200,grossWeightKg:((t==null?void 0:t.qtyKg)||200)+18,tareWeightKg:18,temperatureLogCelsius:17.5,farmerHandoffTimestamp:"06:30 AM (Farm Gate)",driverSignatureRef:"DAWIT-KEBEDE-VERIFIED-LOG",buyerReceivedTimestamp:(t==null?void 0:t.status)==="delivered"?"09:45 AM (Bole Depot)":void 0,transitStatus:(t==null?void 0:t.status)==="delivered"?"DeliveredWithGPS":(t==null?void 0:t.status)==="picked_up"?"InTransit":"Dispatched"}}getLegalContract(e){const t=this.orders.find(a=>a.id===e)||this.orders[0];return{contractNumber:(t==null?void 0:t.contractNumber)||`AGR-CONTR-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,agreementDate:new Date().toLocaleDateString("en-GB"),effectiveDate:new Date().toLocaleDateString("en-GB"),sellerName:(t==null?void 0:t.farmerName)||"Abebe Bekele",sellerIdNumber:"FAYDA-ET-8829104",sellerLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu, Oromia, Ethiopia",buyerName:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun (FreshMart Wholesale)",buyerTinNumber:"TIN-ET-9912001",buyerLocation:(t==null?void 0:t.deliveryAddress)||"Addis Ababa, Ethiopia",cropType:(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes",contractedQuantityKg:(t==null?void 0:t.qtyKg)||200,agreedPricePerKg:(t==null?void 0:t.pricePerKg)||45,totalContractValueEtb:(t==null?void 0:t.totalEtb)||9e3,qualityStandardClause:"Produce shall conform to Grade 1 Ethiopian Commodity Quality Standards (Maximum defect tolerance 2.5%, moisture within physiological thresholds).",deliveryTimeline:"Direct farm-to-depot transit guaranteed within 12 hours of farmer harvest confirmation.",escrowClauseText:"Purchase consideration is locked in Telebirr C2B Escrow and shall be automatically disbursed (90% Farmer / 5% Driver / 5% Platform) upon buyer delivery verification.",forceMajeureClauseText:"Neither party shall be liable for delivery failure caused by natural agricultural catastrophes, unseasonal frost, or national logistical force majeure.",disputeJurisdiction:"Federal Democratic Republic of Ethiopia Commercial Code and Ethiopian Agricultural Authority Arbitration Rules.",eSignatures:{sellerSigned:!0,sellerSignDate:"Digitally Authenticated via OTP/Fayda",buyerSigned:!0,buyerSignDate:"Digitally Authenticated via Telebirr Escrow Lock",platformWitnessHash:`EABC-FM-TRUST-SEAL-${e.slice(0,8).toUpperCase()}`}}}getDisputeMediationRecord(e){const t=this.orders.find(a=>a.id===e)||this.orders[0];return{caseNumber:(t==null?void 0:t.arbitrationDecreeNumber)||`ARB-CASE-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,filingDate:"Yesterday 3:15 PM",resolutionDate:(t==null?void 0:t.status)==="disputed"?void 0:"Today 11:30 AM",status:(t==null?void 0:t.status)==="disputed"?"UnderInvestigation":"Settled",claimantBuyer:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun",respondentFarmer:(t==null?void 0:t.farmerName)||"Chala Gemechu",freightCarrier:(t==null?void 0:t.driverName)||"Dawit Kebede",totalDisputedAmountEtb:(t==null?void 0:t.totalEtb)||9e3,disputeReason:(t==null?void 0:t.disputeReason)||"Delivered avocados were overripe and 20% bruised during transit from Hawassa.",claimedDefectPercentage:(t==null?void 0:t.requestedRefundPercent)||50,inspectionReport:"Independent physical inspection at Bole Cold Storage Depot confirmed 18.5% transit softening on batch packaging.",photoEvidenceUrl:(t==null?void 0:t.disputePhoto)||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",leadArbitratorName:"Sara Mengistu (Marketplace Compliance Arbitrator)",legalFindingSummary:"Partial packaging failure during transit. Fair 50/50 equitable split awarded under Ethiopian Commercial Code Art. 2289.",arbitrationVerdict:"FiftyFiftySplit",farmerSettlementEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),buyerRefundEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),platformDecreeHash:`LEGAL-DECREE-ARB-${e.slice(0,8).toUpperCase()}`}}getPriceBenchmarks(){return this.priceBenchmarks}getStandingOrders(){return this.standingOrders}addStandingOrder(e,t,a){const s=this.listings.find(i=>i.id===e),r={id:"so-"+Date.now(),listingId:e,productName:(s==null?void 0:s.productName)||"Fresh Produce",productNameAm:s==null?void 0:s.nameAm,farmerName:(s==null?void 0:s.farmerName)||"Abebe Bekele",qtyKg:t,pricePerKg:(s==null?void 0:s.pricePerKg)||45,frequency:a,nextDeliveryDate:a==="Weekly"?"Next Monday, 8:00 AM":"Every 2nd Thursday",active:!0,createdAt:new Date().toISOString()};return this.standingOrders.unshift(r),this.notify(),r}toggleStandingOrder(e){const t=this.standingOrders.find(a=>a.id===e);t&&(t.active=!t.active,this.notify())}getKycQueue(){return this.kycQueue}async verifyKyc(e,t){const a=this.kycQueue.find(s=>s.userId===e);if(a){a.status=t?"Verified":"Rejected";try{await fetch(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${a.status}`,{method:"PUT",headers:this.getAuthHeaders()})}catch(s){console.warn("KYC update remote failed, updating local state",s)}this.notify()}}getAnomalyAlerts(){return this.anomalyAlerts}getRegionalAnalytics(){return this.regionalAnalytics}getOptimizedRoute(){return{id:"route-oromia-addis-01",title:"Consolidated East Shewa Multi-Farm Route",totalDistanceKm:68.4,estimatedHours:2.5,totalWeightKg:2800,driverCommissionEtb:1450,ruralSubsidyEtb:350,stops:[{stopNumber:1,type:"pickup",locationName:"Bishoftu Green Farms (Abebe Bekele)",contactName:"Abebe Bekele",phone:"+251 911 223 344",cargoDetails:"Fresh Sholla Red Tomatoes",weightKg:1200,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Valley Farm (Almaz Hailu)",contactName:"Almaz Hailu",phone:"+251 922 334 455",cargoDetails:"Awash Valley Red Onions",weightKg:1600,completed:!1},{stopNumber:3,type:"dropoff",locationName:"FreshMart Central Wholesale Hub (Bole, Addis Ababa)",contactName:"Bethlehem Tilahun",phone:"+251 955 667 788",cargoDetails:"Consolidated Wholesale Dropoff (2,800 kg total)",weightKg:2800,completed:!1}]}}updateDriverVehicle(e,t,a){this.currentUser&&this.currentUser.role==="driver"&&(this.currentUser.vehicleType=e,this.currentUser.refrigerationType=t,this.currentUser.vehicleCapacityKg=a,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify())}toggleOfflineMode(){return this.isOfflineMode=!this.isOfflineMode,this.notify(),this.isOfflineMode}getIsOfflineMode(){return this.isOfflineMode}getOfflineQueue(){return this.offlineQueue}async syncOfflineQueue(){var a;const e=this.offlineQueue.filter(s=>!s.synced);for(const s of e)s.type==="pickup"&&await this.pickupOrderByDriver(s.orderId,(a=s.data)==null?void 0:a.photo),s.synced=!0;const t=e.length;return this.offlineQueue=[],this.saveOfflineQueue(),this.notify(),t}async sendInboundSms(e,t){try{const a=await fetch("/api/sms/inbound",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:e,body:t})});if(a.ok){const s=await a.json();return await this.refreshAllData(),s.response}}catch(a){console.warn("SMS Webhook call failed, simulating response",a)}return`[SIMULATED SMS ACK] Received: "${t}". Processed successfully in offline cache.`}simulateVoiceTranscription(e,t){return t==="am"?{productName:"Fresh Sholla Red Tomatoes",nameAm:"የሾላ ቀይ ቲማቲም",category:"Vegetables",qtyKg:1500,pricePerKg:45,region:"Oromia (Bishoftu)",transcript:"1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"}:t==="om"?{productName:"Awash Red Onions",nameAm:"የአዋሽ ቀይ ሽንኩርት",category:"Vegetables",qtyKg:2e3,pricePerKg:55,region:"Oromia (Adama)",transcript:"Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."}:{productName:"Grade 1 Specialty Green Coffee",nameAm:"የይርጋጨፌ ስፔሻሊቲ ቡና",category:"Coffee",qtyKg:800,pricePerKg:380,region:"SNNPR (Yirgacheffe)",transcript:"We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."}}requestWalletWithdrawal(e,t){return this.currentUser?(this.currentUser.walletBalanceEtb=Math.max(0,(this.currentUser.walletBalanceEtb||48200)-e),this.farmerSummary.releasedEtb+=e,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify(),!0):!1}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round(Number(t.totalEarnedEtb)*.02)}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount,ruralBonusEtb:1250}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount,totalMetricTonsMoved:Number(t.totalMetricTonsMoved||145.8),middlemanMarginSavedEtb:Number(t.middlemanMarginSavedEtb||48e4),totalVatRemittedEtb:Number(t.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:Number(t.totalTransactionVolumeEtb)*.02}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(s=>{var r;return s.farmerId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(s=>s.status==="delivered").reduce((s,r)=>s+r.farmerCut,0),a=e.filter(s=>s.status!=="delivered"&&s.status!=="cancelled").reduce((s,r)=>s+r.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:a||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(s=>s.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(s=>s.status!=="delivered"&&s.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round((t||this.farmerSummary.totalEarnedEtb)*.02)}}getDriverSummary(){const e=this.orders.filter(s=>{var r;return s.driverId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(s=>s.status==="delivered").reduce((s,r)=>s+r.driverCut,0),a=e.filter(s=>s.status!=="delivered"&&s.status!=="cancelled").reduce((s,r)=>s+r.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:a||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(s=>s.status==="delivered").length||this.driverSummary.deliveredTripsCount,ruralBonusEtb:1250}}getPlatformStats(){const e=this.orders.reduce((r,i)=>r+i.totalEtb,0),t=this.orders.filter(r=>r.status==="delivered").reduce((r,i)=>r+i.platformCut,0),a=this.orders.filter(r=>r.escrowHeld).reduce((r,i)=>r+i.totalEtb,0),s=this.orders.filter(r=>r.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:a||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:s||this.platformStats.disputedOrdersCount,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:(t||this.platformStats.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:(e||this.platformStats.totalTransactionVolumeEtb)*.02}}getNotifications(){return!this.isUserLoggedIn||!this.currentUser?[]:this.notifications.filter(e=>e.userId===this.currentUser.id||this.currentUser.role==="admin")}async broadcastSms(e,t,a){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:a})})}catch(s){console.warn("Broadcast SMS API call error",s)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${a.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${a}] ${t}`,read:!1,createdAt:new Date().toISOString()}),this.notify())}async submitVerificationDocuments(e,t){if(this.currentUser){this.currentUser.tinNumber=e,this.currentUser.verificationStatus="UnderReview",this.currentUser.rejectionReason=void 0;const a=t.map((i,o)=>({id:"doc-self-"+o+"-"+Date.now(),userId:this.currentUser.id,documentType:i.documentType,documentNumber:i.documentNumber,frontImageUrl:i.frontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:i.backImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}));this.currentUser.documents=a,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const s={userId:this.currentUser.id,userName:this.currentUser.name,userNameAm:this.currentUser.nameAm,userRole:this.currentUser.role.charAt(0).toUpperCase()+this.currentUser.role.slice(1),phone:this.currentUser.phone,region:this.currentUser.region,registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:e,registeredAt:"Just now",documents:a,reviews:[]},r=this.verificationQueue.findIndex(i=>i.userId===this.currentUser.id);r>=0?this.verificationQueue[r]=s:this.verificationQueue.unshift(s)}try{await fetch("/api/verification/submit",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({tinNumber:e,documents:t})})}catch(a){console.warn("Backend verification submit fallback to local state",a)}this.notify()}async agentRegisterFarmer(e){var d,c,n,f;const t=e.phone.startsWith("+251")?e.phone:"+251"+e.phone.replace(/^0+/,""),a="agent-f-"+Date.now(),s={id:a,name:e.name,nameAm:e.nameAm||e.name,phone:t,region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,status:"UnderReview",registeredAt:"Just now",faydaFrontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"};this.agentRegisteredFarmers.unshift(s);const r={userId:a,userName:e.name,userNameAm:e.nameAm,userRole:"Farmer",phone:t,region:e.region,registrationMethod:"Agent",registeredByAgentName:((d=this.currentUser)==null?void 0:d.name)||"Community Field Agent",verificationStatus:"UnderReview",tinNumber:e.tinNumber,registeredAt:"Just now",documents:[{id:"doc-ag-1-"+Date.now(),userId:a,documentType:"FaydaId",documentNumber:e.faydaId||"FAN-PENDING",frontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:e.faydaBackImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}],reviews:[]};this.verificationQueue.unshift(r);const i={id:a,name:e.name,nameAm:e.nameAm||e.name,phone:t,role:"farmer",region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,verified:!1,verificationStatus:"UnderReview",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},o=this.allUsers.findIndex(v=>v.id===a||v.phone===t);o!==-1?this.allUsers[o]={...this.allUsers[o],...i}:this.allUsers.unshift(i),this.saveUsersToStorage(),this.addAuditLog({actorId:((c=this.currentUser)==null?void 0:c.id)||"agent-01",actorName:((n=this.currentUser)==null?void 0:n.name)||"Field Agent",actorRole:((f=this.currentUser)==null?void 0:f.role)||"agent",action:"AGENT_ONBOARD_FARMER",category:"USER_CRUD",targetResource:"User",targetId:a,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Field agent onboarded farmer: ${e.name} (${t}) in ${e.region}.`});try{await fetch("/api/verification/agent-register",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(e)})}catch(v){console.warn("Agent register farmer fallback to local state",v)}return this.notify(),s}async reviewVerification(e,t,a,s){var o;const r=this.verificationQueue.find(d=>d.userId===e);r&&(r.verificationStatus=t==="Approve"?"Approved":"Rejected",r.rejectionReason=t==="Reject"?s||a||"Document image was illegible":void 0,r.reviews.unshift({id:"rev-"+Date.now(),userId:e,reviewerName:((o=this.currentUser)==null?void 0:o.name)||"Sara Mengistu (Admin)",actionTaken:t,notes:a||s||(t==="Approve"?"All records verified.":"Verification rejected."),timestamp:"Just now"}),r.documents.forEach(d=>{d.status=t==="Approve"?"Approved":"Rejected",d.rejectionReason=r.rejectionReason}));const i=this.agentRegisteredFarmers.find(d=>d.id===e);i&&(i.status=t==="Approve"?"Approved":"Rejected"),this.currentUser&&this.currentUser.id===e&&(this.currentUser.verificationStatus=t==="Approve"?"Approved":"Rejected",this.currentUser.verified=t==="Approve",this.currentUser.rejectionReason=r==null?void 0:r.rejectionReason,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)));try{await fetch(`/api/verification/${e}/review`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({action:t,notes:a,rejectionReason:s})})}catch(d){console.warn("Review verification remote call failed, updated local state",d)}this.notify()}getVerificationQueue(e,t){let a=[...this.verificationQueue];return e&&e!=="All"&&(a=a.filter(s=>s.userRole.toLowerCase()===e.toLowerCase())),t&&t!=="All"&&(a=a.filter(s=>s.verificationStatus===t)),a}async fetchVerificationQueue(){if(!this.isAuthenticated())return this.verificationQueue;try{const e=await fetch("/api/verification/queue",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();Array.isArray(t)&&t.length>0&&(this.verificationQueue=t,this.notify())}}catch(e){console.warn("Fetch verification queue failed, using local queue",e)}return this.verificationQueue}getAgentRegisteredFarmers(){return this.agentRegisteredFarmers}getVerificationStatus(e){var t,a;if(e){const s=this.verificationQueue.find(r=>r.userId===e);if(s)return s.verificationStatus}return((t=this.currentUser)==null?void 0:t.verificationStatus)||((a=this.currentUser)!=null&&a.verified?"Approved":"PendingSubmission")}async sendInboundUssdSimulation(e,t){return t.includes("*990#")||t.includes("*805#")?`Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit
Reply with number:`:t==="1"?"Welcome! Enter your Name & Woreda (e.g., Bekele Bishoftu):":t==="2"?"Enter your 16-digit Fayda ID Number or FAN-XXXX-XXXX-XXXX:":t==="3"?"Your Telebirr Escrow Balance is 48,200 ETB. Payout available at local agent.":t==="4"?"Agent Kassahun Tolessa (+251988776655) has been assigned to visit your farm within 48 hours.":`Farmer-to-Market: Command received. SMS confirmation dispatched to ${e}.`}saveUsersToStorage(){try{localStorage.setItem("farmerMarketAllUsers",JSON.stringify(this.allUsers))}catch(e){console.warn("Failed to persist users to localStorage",e)}}async fetchUsers(){try{const e=await fetch("/api/auth/demo-users");if(e.ok){const t=await e.json();if(Array.isArray(t)){let a=!1;t.forEach(s=>{const r=s.phone.replace(/\s+/g,"");if(!this.isDeletedUser(s.id,r)&&!this.allUsers.find(o=>o.phone.replace(/\s+/g,"")===r)){const o={id:s.id||"db-"+r.replace(/\D/g,""),phone:s.phone,name:s.name,nameAm:s.nameAm,role:(s.role||"buyer").toLowerCase(),region:s.region||"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",createdAt:new Date().toISOString()};this.allUsers.push(o),a=!0}}),a&&(this.saveUsersToStorage(),this.notify())}}}catch(e){console.warn("Fetch remote users failed, using local user list",e)}return this.getAllUsers()}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchSummaries(),this.fetchVerificationQueue(),this.fetchUsers()]),this.notify()}getAllUsers(){const e=new Map;if(this.allUsers.forEach(t=>{this.isDeletedUser(t.id,t.phone)||(t.phone?e.set(t.phone.replace(/\s+/g,""),t):t.id&&e.set(t.id,t))}),this.verificationQueue.forEach(t=>{var s,r;const a=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.userId,a))if(e.has(a)){const i=e.get(a);i.verificationStatus=t.verificationStatus,i.verified=t.verificationStatus==="Approved",t.tinNumber&&(i.tinNumber=t.tinNumber)}else{const i={id:t.userId||"vq-"+a.replace(/\D/g,""),name:t.userName,nameAm:t.userNameAm,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.verificationStatus==="Approved",verificationStatus:t.verificationStatus,status:"active",tinNumber:t.tinNumber,faydaId:(r=(s=t.documents)==null?void 0:s.find(o=>o.documentType==="FaydaId"))==null?void 0:r.documentNumber,createdAt:t.registeredAt||new Date().toISOString()};e.set(a,i),this.allUsers.push(i)}}),this.kycQueue.forEach(t=>{const a=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.userId,a)&&!e.has(a)){const s={id:t.userId||"kyc-"+a.replace(/\D/g,""),name:t.userName,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.status==="Verified",verificationStatus:t.status==="Verified"?"Approved":"UnderReview",status:"active",tinNumber:t.tinNumber,faydaId:t.documentNumber,createdAt:t.submittedAt||new Date().toISOString()};e.set(a,s),this.allUsers.push(s)}}),this.agentRegisteredFarmers.forEach(t=>{const a=t.phone.replace(/\s+/g,"");if(!this.isDeletedUser(t.id,a)&&!e.has(a)){const s={id:t.id,name:t.name,nameAm:t.nameAm,phone:t.phone,role:"farmer",region:t.region,kebele:t.kebele,primaryCrop:t.primaryCrop,faydaId:t.faydaId,tinNumber:t.tinNumber,verified:t.status==="Approved",verificationStatus:t.status,status:"active",createdAt:t.registeredAt||new Date().toISOString()};e.set(a,s),this.allUsers.push(s)}}),this.currentUser&&this.currentUser.phone&&!this.isDeletedUser(this.currentUser.id,this.currentUser.phone)){const t=this.currentUser.phone.replace(/\s+/g,"");e.has(t)||(e.set(t,this.currentUser),this.allUsers.push(this.currentUser))}return Array.from(e.values()).filter(t=>!this.isDeletedUser(t.id,t.phone))}getUserById(e){const t=(e||"").trim();if(t)return this.getAllUsers().find(a=>a.id===t||a.phone===t||a.phone.replace(/\s+/g,"")===t.replace(/\s+/g,""))}createUser(e){var s,r,i;const t=e.phone.startsWith("+251")?e.phone.replace(/\s+/g,""):"+251"+e.phone.replace(/^0+/,"").replace(/\s+/g,"");this.deletedUserIds.delete(t.toLowerCase()),this.deletedUserIds.delete(t.replace(/\D/g,"")),this.saveDeletedUsers();const a={id:crypto.randomUUID?crypto.randomUUID():"user-"+Date.now(),name:e.name,nameAm:e.nameAm,phone:t,role:e.role,region:e.region,verified:e.verified??!0,verificationStatus:e.verified??!0?"Approved":"PendingSubmission",status:e.status??"active",tinNumber:e.tinNumber,businessLicenseNumber:e.businessLicenseNumber,vehicleType:e.vehicleType,refrigerationType:e.refrigerationType,vehicleCapacityKg:e.vehicleCapacityKg,primaryCrop:e.primaryCrop,kebele:e.kebele,faydaId:e.faydaId,permissions:e.permissions,createdAt:new Date().toISOString()};return this.allUsers=this.allUsers.filter(o=>o.phone.replace(/\s+/g,"")!==t),this.allUsers.unshift(a),this.saveUsersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"00000000-0000-0000-0000-000000000001",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((i=this.currentUser)==null?void 0:i.role)||"superadmin",action:"CREATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:a.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Created new ${a.role.toUpperCase()} account: ${a.name} (${a.phone}) in ${a.region}.`}),this.notify(),a}updateUser(e,t){var o,d,c;let a=this.allUsers.findIndex(n=>n.id===e||n.phone===e||n.phone.replace(/\s+/g,"")===e.replace(/\s+/g,""));if(a===-1){const n=this.getUserById(e);n&&(this.allUsers.push(n),a=this.allUsers.length-1)}if(a===-1)throw new Error("User not found");const s={...this.allUsers[a]};this.allUsers[a]={...this.allUsers[a],...t};const r=this.allUsers[a],i=r.phone.replace(/\s+/g,"");return this.verificationQueue.forEach(n=>{(n.userId===r.id||n.phone.replace(/\s+/g,"")===i)&&(n.userName=r.name,r.nameAm&&(n.userNameAm=r.nameAm),n.userRole=r.role,n.region=r.region,r.tinNumber&&(n.tinNumber=r.tinNumber))}),this.currentUser&&(this.currentUser.id===r.id||this.currentUser.phone.replace(/\s+/g,"")===i)&&(this.currentUser={...this.currentUser,...r},localStorage.setItem("currentUser",JSON.stringify(this.currentUser))),this.saveUsersToStorage(),this.addAuditLog({actorId:((o=this.currentUser)==null?void 0:o.id)||"00000000-0000-0000-0000-000000000001",actorName:((d=this.currentUser)==null?void 0:d.name)||"Super Admin",actorRole:((c=this.currentUser)==null?void 0:c.role)||"superadmin",action:"UPDATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:r.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated user profile for ${r.name} (${r.role.toUpperCase()}, ${r.phone}). Status: ${r.status||"active"}.`,preState:s,postState:r}),this.notify(),r}deleteUser(e){var i,o,d;const t=this.getUserById(e);if(!t)return!1;const a=t.phone.replace(/\s+/g,""),s=t.id;return this.deletedUserIds.add(s.toLowerCase()),this.deletedUserIds.add(a.toLowerCase()),this.deletedUserIds.add(a.replace(/\D/g,"")),this.saveDeletedUsers(),this.allUsers=this.allUsers.filter(c=>c.id!==s&&c.phone.replace(/\s+/g,"")!==a),this.verificationQueue=this.verificationQueue.filter(c=>c.userId!==s&&c.phone.replace(/\s+/g,"")!==a),this.kycQueue=this.kycQueue.filter(c=>c.userId!==s&&c.phone.replace(/\s+/g,"")!==a),this.agentRegisteredFarmers=this.agentRegisteredFarmers.filter(c=>c.id!==s&&c.phone.replace(/\s+/g,"")!==a),this.currentUser&&(this.currentUser.id===s||this.currentUser.phone.replace(/\s+/g,"")===a)&&this.impersonationOriginalUser&&this.stopImpersonation(),this.saveUsersToStorage(),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)&&this.token&&fetch(`/api/superadmin/users/${s}`,{method:"DELETE",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}}).catch(c=>console.warn("Backend user delete sync skipped/failed:",c)),this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"00000000-0000-0000-0000-000000000001",actorName:((o=this.currentUser)==null?void 0:o.name)||"Super Admin",actorRole:((d=this.currentUser)==null?void 0:d.role)||"superadmin",action:"DELETE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:s,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Permanently deleted user account: ${t.name} (${t.role.toUpperCase()}, ${t.phone}).`}),this.notify(),!0}toggleUserSuspension(e,t){var o,d,c;let a=this.allUsers.find(n=>n.id===e||n.phone===e||n.phone.replace(/\s+/g,"")===e.replace(/\s+/g,""));if(a||(a=this.getUserById(e),a&&!this.allUsers.some(n=>n.id===a.id)&&this.allUsers.push(a)),!a)throw new Error("User not found");const s=t||(a.status==="suspended"?"active":"suspended");a.status=s;const r=a.phone.replace(/\s+/g,"");if(this.allUsers.forEach(n=>{(n.id===a.id||n.phone.replace(/\s+/g,"")===r)&&(n.status=s)}),this.currentUser&&(this.currentUser.id===a.id||this.currentUser.phone.replace(/\s+/g,"")===r)&&(this.currentUser.status=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser))),this.saveUsersToStorage(),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(a.id)&&this.token){const n=a.role==="admin"?`/api/superadmin/admins/${a.id}/status`:`/api/admin/users/${a.id}/status`;fetch(n,{method:"PUT",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"},body:JSON.stringify({status:s})}).catch(f=>console.warn("Backend user status sync skipped/failed:",f))}return this.addAuditLog({actorId:((o=this.currentUser)==null?void 0:o.id)||"00000000-0000-0000-0000-000000000001",actorName:((d=this.currentUser)==null?void 0:d.name)||"Super Admin",actorRole:((c=this.currentUser)==null?void 0:c.role)||"superadmin",action:s==="suspended"?"SUSPEND_USER_ACCOUNT":"REINSTATE_USER_ACCOUNT",category:"EMERGENCY",targetResource:"User",targetId:a.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${s==="suspended"?"Suspended account access":"Reinstated account access"} for ${a.name} (${a.role.toUpperCase()}, ${a.phone}).`}),this.notify(),a}startImpersonation(e){var a,s,r;const t=this.allUsers.find(i=>i.id===e);return t?(!this.impersonationOriginalUser&&((a=this.currentUser)==null?void 0:a.role)==="superadmin"&&(this.impersonationOriginalUser={...this.currentUser}),this.currentUser=t,localStorage.setItem("currentUser",JSON.stringify(t)),this.addAuditLog({actorId:((s=this.impersonationOriginalUser)==null?void 0:s.id)||"superadmin-01",actorName:((r=this.impersonationOriginalUser)==null?void 0:r.name)||"Super Admin",actorRole:"superadmin",action:"START_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin initiated live impersonation support session as '${t.name}' (${t.role}).`}),this.notify(),t):null}stopImpersonation(){if(!this.impersonationOriginalUser)return this.currentUser;const e={...this.impersonationOriginalUser},t=this.currentUser;return this.currentUser=e,this.impersonationOriginalUser=null,localStorage.setItem("currentUser",JSON.stringify(e)),this.addAuditLog({actorId:e.id,actorName:e.name,actorRole:"superadmin",action:"END_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t==null?void 0:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin exited impersonation session for '${t==null?void 0:t.name}'. Returned to Super Admin dashboard.`}),this.notify(),e}isImpersonating(){return!!this.impersonationOriginalUser}getOriginalSuperAdmin(){return this.impersonationOriginalUser}getPlatformConfig(){return this.platformConfig}updatePlatformConfig(e){var a,s,r;const t={...this.platformConfig};return this.platformConfig={...this.platformConfig,...e},this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"UPDATE_PLATFORM_CONFIG",category:"CONFIG",targetResource:"PlatformConfig",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated platform configuration: Escrow split (${this.platformConfig.farmerSharePercent}/${this.platformConfig.driverSharePercent}/${this.platformConfig.platformFeePercent}), Escrow Frozen: ${this.platformConfig.emergencyEscrowFrozen}.`,preState:t,postState:this.platformConfig}),this.notify(),this.platformConfig}getSystemAuditLogs(){return this.systemAuditLogs}addAuditLog(e){const t={...e,id:"log-"+(this.systemAuditLogs.length+101),timestamp:new Date().toLocaleString()};return this.systemAuditLogs.unshift(t),t}getDeliveryZones(){return this.deliveryZones}addDeliveryZone(e){var a,s,r;const t={...e,id:"zone-"+(this.deliveryZones.length+1)};return this.deliveryZones.push(t),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"ADD_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Added new regional delivery zone: ${t.name} (Base radius ${t.baseRadiusKm} km).`}),this.notify(),t}updateDeliveryZone(e,t){var s,r,i;const a=this.deliveryZones.findIndex(o=>o.id===e);if(a===-1)throw new Error("Zone not found");return this.deliveryZones[a]={...this.deliveryZones[a],...t},this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((i=this.currentUser)==null?void 0:i.role)||"superadmin",action:"UPDATE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated delivery zone '${this.deliveryZones[a].name}' configuration.`}),this.notify(),this.deliveryZones[a]}deleteDeliveryZone(e){var a,s,r;const t=this.deliveryZones.find(i=>i.id===e);return t?(this.deliveryZones=this.deliveryZones.filter(i=>i.id!==e),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"DELETE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted delivery zone: ${t.name}.`}),this.notify(),!0):!1}getFeatureFlags(){return this.featureFlags}toggleFeatureFlag(e,t){var s,r,i;const a=this.featureFlags.find(o=>o.key===e);if(!a)throw new Error("Feature flag not found");return a.enabled=t!==void 0?t:!a.enabled,this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((i=this.currentUser)==null?void 0:i.role)||"superadmin",action:"TOGGLE_FEATURE_FLAG",category:"CONFIG",targetResource:"FeatureFlag",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${a.enabled?"Enabled":"Disabled"} feature flag: ${a.name} (${e}).`}),this.notify(),a}getPendingPayoutApprovals(){return this.payoutApprovals}approvePayout(e,t){var s;const a=this.payoutApprovals.find(r=>r.id===e);return a?(a.status="Approved",a.reviewedBy=t,a.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"APPROVE_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Authorized high-value Telebirr payout of ${a.amountEtb.toLocaleString()} ETB for ${a.recipientName} (${a.recipientPhone}).`}),this.notify(),!0):!1}rejectPayout(e,t,a="High-risk audit anomaly"){var r;const s=this.payoutApprovals.find(i=>i.id===e);return s?(s.status="Rejected",s.reviewedBy=t,s.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"REJECT_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Declined payout of ${s.amountEtb.toLocaleString()} ETB for ${s.recipientName}. Reason: ${a}.`}),this.notify(),!0):!1}getGlobalBusinessRules(){return this.globalBusinessRules}updateGlobalBusinessRules(e){var t,a,s;return this.globalBusinessRules={...this.globalBusinessRules,...e},this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((s=this.currentUser)==null?void 0:s.role)||"superadmin",action:"UPDATE_BUSINESS_RULES",category:"CONFIG",targetResource:"GlobalBusinessRules",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated global trading rules: Min ${this.globalBusinessRules.minOrderKg} kg, Max ${this.globalBusinessRules.maxOrderKg} kg, Max Distance ${this.globalBusinessRules.maxDistanceKm} km.`}),this.notify(),this.globalBusinessRules}getBlacklist(){return this.blacklist}addToBlacklist(e){var a;const t={...e,id:"bl-"+(this.blacklist.length+1).toString().padStart(2,"0"),blacklistedAt:new Date().toISOString().split("T")[0]};return this.blacklist.unshift(t),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:e.blacklistedBy,actorRole:"superadmin",action:"ADD_TO_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Blacklisted ${t.type}: ${t.value}. Reason: ${t.reason}.`}),this.notify(),t}removeFromBlacklist(e){var a,s;const t=this.blacklist.find(r=>r.id===e);return t?(this.blacklist=this.blacklist.filter(r=>r.id!==e),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:"superadmin",action:"REMOVE_FROM_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Removed ${t.type} (${t.value}) from platform blacklist.`}),this.notify(),!0):!1}triggerDatabaseBackup(){var t,a;const e={backupId:"BK-PG16-"+Date.now(),sizeMb:248.5,timestamp:new Date().toLocaleString(),downloadUrl:"#pg-backup-download"};return this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:"superadmin",action:"TRIGGER_DATABASE_BACKUP",category:"CONFIG",targetResource:"PostgreSQL_Snapshot",targetId:e.backupId,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Generated encrypted PostgreSQL schema and transaction data snapshot (${e.backupId}, 248.5 MB).`}),this.notify(),e}exportPlatformData(e){var i,o;const t=`FarmerMarket_FullExport_${new Date().toISOString().split("T")[0]}.${e}`;let a="";e==="json"?a=JSON.stringify({users:this.allUsers,listings:this.listings,orders:this.orders,platformConfig:this.platformConfig,deliveryZones:this.deliveryZones,auditLogs:this.systemAuditLogs},null,2):a=`Type,Id,Name,Phone,Role,Region,Status,CreatedAt
`+this.allUsers.map(d=>`User,${d.id},"${d.name}",${d.phone},${d.role},"${d.region}",${d.status||"active"},${d.createdAt}`).join(`
`);const s=new Blob([a],{type:e==="json"?"application/json":"text/csv"}),r=URL.createObjectURL(s);return this.addAuditLog({actorId:((i=this.currentUser)==null?void 0:i.id)||"superadmin-01",actorName:((o=this.currentUser)==null?void 0:o.name)||"Super Admin",actorRole:"superadmin",action:"EXPORT_PLATFORM_DATA",category:"CONFIG",targetResource:"DataExport",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Exported full platform data snapshot in ${e.toUpperCase()} format (${t}).`}),{filename:t,dataUrl:r}}getBanners(){return[...this.banners].sort((e,t)=>t.priority-e.priority)}getActiveBanners(e="All",t="All"){return this.banners.filter(a=>a.isActive).filter(a=>a.targetAudience==="All"||a.targetAudience.toLowerCase()===e.toLowerCase()||e==="All").filter(a=>!a.targetRegion||a.targetRegion==="All"||a.targetRegion.toLowerCase()===t.toLowerCase()||t==="All").sort((a,s)=>s.priority-a.priority)}getBannerById(e){return this.banners.find(t=>t.id===e)}createBanner(e){var a,s,r,i;const t={id:crypto.randomUUID?crypto.randomUUID():"banner-"+Date.now(),title:e.title,titleAm:e.titleAm,subtitle:e.subtitle,subtitleAm:e.subtitleAm,badgeText:e.badgeText,badgeTextAm:e.badgeTextAm,imageUrl:e.imageUrl||"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",targetAudience:e.targetAudience||"All",targetRegion:e.targetRegion||"All",ctaText:e.ctaText,ctaTextAm:e.ctaTextAm,ctaLink:e.ctaLink||"marketplace",themeGradient:e.themeGradient||"from-emerald-900 via-teal-900 to-slate-900",priority:Number(e.priority)||5,isActive:e.isActive??!0,createdAt:new Date().toISOString(),createdBy:((a=this.currentUser)==null?void 0:a.name)||"Platform Admin"};return this.banners.unshift(t),this.saveBannersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((i=this.currentUser)==null?void 0:i.role)||"admin",action:"CREATE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Created promotional banner: "${t.title}" for audience: ${t.targetAudience}.`}),this.notify(),t}updateBanner(e,t){var s,r,i;const a=this.banners.findIndex(o=>o.id===e);return a===-1?null:(this.banners[a]={...this.banners[a],...t},this.saveBannersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((i=this.currentUser)==null?void 0:i.role)||"admin",action:"UPDATE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated promotional banner "${this.banners[a].title}". Status: ${this.banners[a].isActive?"Active":"Inactive"}.`}),this.notify(),this.banners[a])}toggleBannerStatus(e,t){var s,r,i;const a=this.banners.find(o=>o.id===e);return a?(a.isActive=t!==void 0?t:!a.isActive,this.saveBannersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"admin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Administrator",actorRole:((i=this.currentUser)==null?void 0:i.role)||"admin",action:a.isActive?"ACTIVATE_BANNER":"DEACTIVATE_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${a.isActive?"Activated":"Deactivated"} banner: "${a.title}".`}),this.notify(),!0):!1}deleteBanner(e){var a,s,r;const t=this.banners.find(i=>i.id===e);return t?(this.banners=this.banners.filter(i=>i.id!==e),this.saveBannersToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"admin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Administrator",actorRole:((r=this.currentUser)==null?void 0:r.role)||"admin",action:"DELETE_PROMOTIONAL_BANNER",category:"CONFIG",targetResource:"Banner",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted promotional banner: "${t.title}".`}),this.notify(),!0):!1}saveBannersToStorage(){try{localStorage.setItem("farmerMarketBanners",JSON.stringify(this.banners))}catch(e){console.warn("Failed to save banners to localStorage",e)}}adminDeleteListing(e,t="Violates marketplace standards"){var r,i,o;const a=this.listings.find(d=>d.id===e);return a?(this.listings=this.listings.filter(d=>d.id!==e),/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)&&this.token&&fetch(`/api/listings/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}}).catch(d=>console.warn("Backend listing delete failed/skipped:",d)),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"admin-01",actorName:((i=this.currentUser)==null?void 0:i.name)||"Administrator",actorRole:((o=this.currentUser)==null?void 0:o.role)||"admin",action:"DELETE_LISTING_POST",category:"USER_CRUD",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted listing post "${a.productName}" (Farmer: ${a.farmerName}, ${a.farmerPhone}). Reason: ${t}`}),this.notify(),!0):!1}adminUpdateListing(e,t){var o,d,c;const a=this.listings.findIndex(n=>n.id===e);if(a===-1)return null;const s={...this.listings[a]};this.listings[a]={...this.listings[a],...t};const r=this.listings[a];return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)&&this.token&&fetch(`/api/listings/${e}`,{method:"PUT",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"},body:JSON.stringify(t)}).catch(n=>console.warn("Backend listing update failed/skipped:",n)),this.addAuditLog({actorId:((o=this.currentUser)==null?void 0:o.id)||"admin-01",actorName:((d=this.currentUser)==null?void 0:d.name)||"Administrator",actorRole:((c=this.currentUser)==null?void 0:c.role)||"admin",action:"MODERATE_LISTING_POST",category:"USER_CRUD",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Moderated/Updated listing "${r.productName}". Price: ${r.pricePerKg} ETB/kg, Stock: ${r.qtyKg} kg, Status: ${r.moderationStatus||"Approved"}.`,preState:s,postState:r}),this.notify(),r}flagListingAnomaly(e,t="Severe Price Variance Detected",a,s=!0,r){var n,f,v;const i=this.listings.find(S=>S.id===e);if(!i)return!1;i.moderationStatus="Flagged";const o=r||i.marketBenchmarkPrice||50,d=Math.round((i.pricePerKg-o)/o*100),c={id:"ANOM-"+Date.now().toString().slice(-4),severity:"High",type:"PriceManipulation",title:`Price Anomaly: ${i.productName}`,description:`${i.productName} listed by ${i.farmerName} (${i.farmerPhone}) at ${i.pricePerKg} ETB/kg (${d>0?"+":""}${d}% vs benchmark of ${o} ETB/kg). ${t}`,entityType:"Listing",entityId:i.id,detectedAt:"Just now"};return this.anomalyAlerts.unshift(c),this.addAuditLog({actorId:((n=this.currentUser)==null?void 0:n.id)||"admin-01",actorName:((f=this.currentUser)==null?void 0:f.name)||"Administrator",actorRole:((v=this.currentUser)==null?void 0:v.role)||"admin",action:"FLAG_LISTING_ANOMALY",category:"EMERGENCY",targetResource:"Listing",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Flagged listing "${i.productName}" for price anomaly: ${d>0?"+":""}${d}% variance against benchmark.`}),this.notify(),!0}loadStoredRolePermissions(){try{const e=localStorage.getItem("farmerMarketRolePermissions");if(e){const t=JSON.parse(e),a=JSON.parse(JSON.stringify(oe.DEFAULT_ROLE_PERMISSIONS));for(const s of Object.keys(oe.DEFAULT_ROLE_PERMISSIONS))t[s]&&(a[s]={...a[s],...t[s]});return a}}catch(e){console.warn("Failed to parse stored role permissions, using defaults.",e)}return JSON.parse(JSON.stringify(oe.DEFAULT_ROLE_PERMISSIONS))}reloadRolePermissionsFromStorage(){return this.rolePermissions=this.loadStoredRolePermissions(),this.notify(),this.rolePermissions}saveRolePermissionsToStorage(){try{localStorage.setItem("farmerMarketRolePermissions",JSON.stringify(this.rolePermissions))}catch(e){console.error("Failed to persist role permissions to localStorage",e)}}getPermissionsList(){return oe.ALL_PERMISSIONS}getAllRolePermissions(){return this.rolePermissions}getRolePermissions(e){return this.rolePermissions[e]||oe.DEFAULT_ROLE_PERMISSIONS[e]}hasRolePermission(e,t){if(e==="superadmin")return!0;const a=this.rolePermissions[e]||oe.DEFAULT_ROLE_PERMISSIONS[e];return a?!!a[t]:!1}hasPermission(e,t){const a=t!==void 0?t:this.currentUser;if(!a)return!1;if(a.role==="superadmin")return!0;const s=this.rolePermissions[a.role]||oe.DEFAULT_ROLE_PERMISSIONS[a.role];return!!(s&&s[e]===!0||a.permissions&&Array.isArray(a.permissions)&&a.permissions.length>0&&a.permissions.includes(e))}hasEffectivePermission(e,t){if(this.isImpersonating())return this.hasPermission(e);const a=this.currentUser;return a&&a.role!=="superadmin"?this.hasPermission(e,a):t?this.hasRolePermission(t,e):this.hasPermission(e,a)}updateRolePermissionKey(e,t,a){var s,r,i;return this.rolePermissions[e]||(this.rolePermissions[e]={...oe.DEFAULT_ROLE_PERMISSIONS[e]}),this.rolePermissions[e][t]=a,this.saveRolePermissionsToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Administrator",actorRole:((i=this.currentUser)==null?void 0:i.role)||"superadmin",action:"UPDATE_ROLE_PERMISSION",category:"CONFIG",targetResource:`Role:${e}`,targetId:t,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Set permission "${t}" for role "${e}" to ${a?"ENABLED":"DISABLED"}.`}),this.notify(),!0}updateRolePermissions(e,t){var a,s,r;return this.rolePermissions[e]||(this.rolePermissions[e]={...oe.DEFAULT_ROLE_PERMISSIONS[e]}),this.rolePermissions[e]={...this.rolePermissions[e],...t},this.saveRolePermissionsToStorage(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Administrator",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"BATCH_UPDATE_ROLE_PERMISSIONS",category:"CONFIG",targetResource:`Role:${e}`,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated permission bundle for role "${e}".`}),this.notify(),!0}resetRolePermissions(){var e,t,a;return this.rolePermissions=JSON.parse(JSON.stringify(oe.DEFAULT_ROLE_PERMISSIONS)),this.saveRolePermissionsToStorage(),this.addAuditLog({actorId:((e=this.currentUser)==null?void 0:e.id)||"superadmin-01",actorName:((t=this.currentUser)==null?void 0:t.name)||"Super Administrator",actorRole:((a=this.currentUser)==null?void 0:a.role)||"superadmin",action:"RESET_ROLE_PERMISSIONS_TO_DEFAULT",category:"CONFIG",targetResource:"RBACMatrix",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:"Reset all platform RBAC role permissions to factory defaults."}),this.notify(),this.rolePermissions}};b(oe,"ALL_PERMISSIONS",[{key:"MANAGE_USERS",label:"User Master CRUD & Suspension",labelAm:"የተጠቃሚዎች አስተዳደር እና እገዳ",category:"Governance & Root",description:"Create, update, suspend, and delete users across all roles."},{key:"MANAGE_RBAC_PERMISSIONS",label:"RBAC Permission Matrix",labelAm:"የሚናዎች እና ፈቃዶች ማትሪክስ",category:"Governance & Root",description:"Configure and assign granular capabilities for roles and users."},{key:"MANAGE_PLATFORM_CONFIG",label:"Platform Financial Configuration",labelAm:"የፕላትፎርም የፋይናንስ ውቅር",category:"Governance & Root",description:"Adjust escrow split percentages (90/5/5), withholding tax, and gateway keys."},{key:"EMERGENCY_ESCROW_FREEZE",label:"Emergency Escrow Killswitch",labelAm:"የአስቸኳይ ጊዜ የገንዘብ እገዳ (Killswitch)",category:"Governance & Root",description:"Halt all Telebirr fund payouts and freeze system escrow in emergency."},{key:"APPROVE_HIGH_VALUE_PAYOUTS",label:"High-Value Payout Approval",labelAm:"ከፍተኛ የገንዘብ ክፍያዎችን ማጽደቅ",category:"Governance & Root",description:"Authorize manual audits for payouts exceeding platform threshold."},{key:"IMPERSONATE_USERS",label:"Shadow Impersonation Engine",labelAm:"የተጠቃሚ መለያዎችን በመወከል መግባት",category:"Governance & Root",description:"Log in as any user to inspect and debug live issues."},{key:"VIEW_AUDIT_LOGS",label:"System Audit Logs",labelAm:"የስርዓት ኦዲት ምዝግብ ማስታወሻዎች",category:"Governance & Root",description:"Review tamper-evident security audit trails and actor actions."},{key:"MANAGE_TRADE_ZONES",label:"Geo-Fenced Trade Corridors",labelAm:"የንግድ ኮሪደሮች እና የድንበር ዞኖች",category:"Governance & Root",description:"Configure transport corridors, checkpoints, and regional hubs."},{key:"MANAGE_BLACKLIST",label:"National Fraud Blacklist",labelAm:"የማጭበርበር ጥቁር መዝገብ",category:"Governance & Root",description:"Enforce restrictions on banned phone numbers, TINs, and Fayda IDs."},{key:"MODERATE_LISTINGS",label:"Produce Listing Moderation",labelAm:"የምርት ምዝገባ ቁጥጥር እና ማረም",category:"Operational Moderation",description:"Force edit price, stock, grade, and delete fraudulent produce posts."},{key:"MANAGE_BANNERS",label:"Promotional Marketing Banners",labelAm:"የማስተዋወቂያ ባነሮች አስተዳደር",category:"Operational Moderation",description:"Publish, edit, pause, and delete promotional announcements."},{key:"RESOLVE_DISPUTES",label:"Arbitrate Produce Disputes",labelAm:"የምርት አለመግባባቶችን መፍታት",category:"Operational Moderation",description:"Render legally binding arbitration decrees and execute escrow splits."},{key:"VERIFY_KYC",label:"KYC & Document Verification",labelAm:"የማንነት እና ሰነድ ማረጋገጫ",category:"Operational Moderation",description:"Approve or reject Fayda ID, TIN certificates, and vehicle logbooks."},{key:"BROADCAST_SMS",label:"Twilio Mass SMS Broadcast",labelAm:"የጅምላ ኤስኤምኤስ ማሰራጫ",category:"Operational Moderation",description:"Broadcast agricultural bulletins and alerts to farmers, drivers, and buyers."},{key:"VIEW_ANOMALY_ALERTS",label:"AI Anomaly Scanner",labelAm:"የዋጋ እና ማጭበርበር ስካነር",category:"Operational Moderation",description:"Monitor price spikes, duplicate photo proofs, and volume surges."},{key:"VIEW_TAX_COMPLIANCE",label:"Tax & Fiscal Compliance Invoicing",labelAm:"የግብር እና ህጋዊ ደረሰኝ",category:"Operational Moderation",description:"Inspect electronic tax invoices (e-VAT) and MOR 2% withholding receipts."},{key:"VIEW_REGIONAL_ANALYTICS",label:"Regional Analytics & Volume",labelAm:"የክልሎች የንግድ ትንታኔ",category:"Operational Moderation",description:"Analyze GMV, metric tons moved, and price averages per region."},{key:"FIELD_AGENT_ONBOARDING",label:"In-Field Farmer Onboarding",labelAm:"አርሶ አደሮችን በአካል መመዝገብ",category:"Field & Logistics",description:"Onboard smallholders with camera capture of Kebele ID & Fayda National ID."},{key:"EXECUTE_USSD",label:"Offline USSD Engine",labelAm:"ከኢንተርኔት ውጭ USSD መጠቀም",category:"Field & Logistics",description:"Execute *988# USSD command simulation for low-connectivity rural hubs."},{key:"VIEW_DELIVERY_ROUTES",label:"GPS Dispatch & Waybills",labelAm:"የማጓጓዣ መንገዶች እና ዌይቢል",category:"Field & Logistics",description:"Access multi-stop route optimization and cargo load manifests."},{key:"SUBMIT_DELIVERY_PROOF",label:"GPS Dropoff Photo Proof",labelAm:"የማድረሻ ፎቶ ማረጋገጫ ማስገባት",category:"Field & Logistics",description:"Submit geo-tagged timestamped photos of produce pickup & delivery."},{key:"OFFLINE_TRIP_SYNC",label:"Offline Trip Sync",labelAm:"የከመስመር ውጭ ጉዞ ማመሳሰል",category:"Field & Logistics",description:"Cache trip confirmations in localStorage and sync when cellular resumes."},{key:"PUBLISH_PRODUCE",label:"Publish Produce Listings",labelAm:"የእርሻ ምርት ለገበያ ማቅረብ",category:"Marketplace & Trade",description:"Post crops with pricing, stock quantity, and audio voice memo transcription."},{key:"MANAGE_FARM_ORDERS",label:"Confirm & Fulfill Farm Orders",labelAm:"የትዕዛዝ መቀበያ እና ማረጋገጫ",category:"Marketplace & Trade",description:"Accept purchase orders and prepare harvest for driver pickup."},{key:"REQUEST_WALLET_WITHDRAWAL",label:"Telebirr Instant Payouts",labelAm:"ገንዘብ ወደ ቴሌብር ማውጣት",category:"Marketplace & Trade",description:"Withdraw wallet balance directly to Telebirr mobile wallet."},{key:"PLACE_ORDERS",label:"Bulk Wholesale Ordering",labelAm:"የጅምላ ምርት መግዛት",category:"Marketplace & Trade",description:"Purchase fresh produce directly from verified farmers across Ethiopia."},{key:"TELEBIRR_CHECKOUT",label:"Telebirr C2B Escrow Checkout",labelAm:"በቴሌብር ክፍያ መፈጸም",category:"Marketplace & Trade",description:"Authorize secure payments held in Telebirr escrow."},{key:"CREATE_STANDING_ORDERS",label:"Recurring Standing Orders",labelAm:"ተደጋጋሚ ቋሚ ትዕዛዝ ማዘዝ",category:"Marketplace & Trade",description:"Schedule automatic weekly and bi-weekly harvest deliveries."},{key:"FILE_DISPUTES",label:"File Escrow Dispute",labelAm:"የቅሬታ ማመልከቻ ማስገባት",category:"Marketplace & Trade",description:"Report damaged goods or delivery delays to pause escrow release."}]),b(oe,"DEFAULT_ROLE_PERMISSIONS",{superadmin:{MANAGE_USERS:!0,MANAGE_RBAC_PERMISSIONS:!0,MANAGE_PLATFORM_CONFIG:!0,EMERGENCY_ESCROW_FREEZE:!0,APPROVE_HIGH_VALUE_PAYOUTS:!0,IMPERSONATE_USERS:!0,VIEW_AUDIT_LOGS:!0,MANAGE_TRADE_ZONES:!0,MANAGE_BLACKLIST:!0,MODERATE_LISTINGS:!0,MANAGE_BANNERS:!0,RESOLVE_DISPUTES:!0,VERIFY_KYC:!0,BROADCAST_SMS:!0,VIEW_ANOMALY_ALERTS:!0,VIEW_TAX_COMPLIANCE:!0,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!0,OFFLINE_TRIP_SYNC:!0,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!0,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!0,TELEBIRR_CHECKOUT:!0,CREATE_STANDING_ORDERS:!0,FILE_DISPUTES:!0},admin:{MANAGE_USERS:!0,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!0,MANAGE_TRADE_ZONES:!0,MANAGE_BLACKLIST:!0,MODERATE_LISTINGS:!0,MANAGE_BANNERS:!0,RESOLVE_DISPUTES:!0,VERIFY_KYC:!0,BROADCAST_SMS:!0,VIEW_ANOMALY_ALERTS:!0,VIEW_TAX_COMPLIANCE:!0,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!1,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},agent:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!0,FIELD_AGENT_ONBOARDING:!0,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},farmer:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!0,MANAGE_FARM_ORDERS:!0,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},driver:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!0,VIEW_DELIVERY_ROUTES:!0,SUBMIT_DELIVERY_PROOF:!0,OFFLINE_TRIP_SYNC:!0,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!0,PLACE_ORDERS:!1,TELEBIRR_CHECKOUT:!1,CREATE_STANDING_ORDERS:!1,FILE_DISPUTES:!1},buyer:{MANAGE_USERS:!1,MANAGE_RBAC_PERMISSIONS:!1,MANAGE_PLATFORM_CONFIG:!1,EMERGENCY_ESCROW_FREEZE:!1,APPROVE_HIGH_VALUE_PAYOUTS:!1,IMPERSONATE_USERS:!1,VIEW_AUDIT_LOGS:!1,MANAGE_TRADE_ZONES:!1,MANAGE_BLACKLIST:!1,MODERATE_LISTINGS:!1,MANAGE_BANNERS:!1,RESOLVE_DISPUTES:!1,VERIFY_KYC:!1,BROADCAST_SMS:!1,VIEW_ANOMALY_ALERTS:!1,VIEW_TAX_COMPLIANCE:!1,VIEW_REGIONAL_ANALYTICS:!1,FIELD_AGENT_ONBOARDING:!1,EXECUTE_USSD:!1,VIEW_DELIVERY_ROUTES:!1,SUBMIT_DELIVERY_PROOF:!1,OFFLINE_TRIP_SYNC:!1,PUBLISH_PRODUCE:!1,MANAGE_FARM_ORDERS:!1,REQUEST_WALLET_WITHDRAWAL:!1,PLACE_ORDERS:!0,TELEBIRR_CHECKOUT:!0,CREATE_STANDING_ORDERS:!0,FILE_DISPUTES:!0}});let _e=oe;const p=new _e,H={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",roleSuperAdmin:"Super Admin (Chief Platform Officer)",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLegalDocuments:"Contracts & Tax Invoices",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Full Produce & Photos",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cropDescription:"Produce Description & Origin Story",qualitySpecs:"Quality & Agricultural Specifications",packagingType:"Packaging & Handling",storageRecommendation:"Storage & Shelf Life",farmerProfile:"Verified Smallholder Producer",directContact:"Direct Producer Contact",callFarmer:"Call Farmer",smsInquiry:"SMS Inquiry",buyNowEscrow:"Instant Order (Telebirr Escrow)",selectOrderQty:"Select Order Quantity (kg)",marketComparison:"Regional Price Benchmark",belowMarketAvg:"Below Regional Wholesale Average",photoGallery:"Produce Photos & Inspection Angles",clickToEnlarge:"Click to view full photo & details",shareListing:"Share Listing",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",viewContractBtn:"View Sales Contract",viewInvoiceBtn:"Download Tax Invoice",viewWaybillBtn:"Transport Waybill (Manifest)",viewArbitrationBtn:"Arbitration Determination",printDocument:"Print / Save PDF",closeDocument:"Close Document",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Tax Statements (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",withholdingTaxReported:"Withholding Tax (2% Goods)",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release & Tax Log",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Cargo Manifest",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Governance, Law & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",statVatRemitted:"VAT on Platform Fees (15%)",statWithholding:"Withholding Tax (2%)",resolveDisputeTitle:"Escrow Legal Arbitration Console",disputeEvidence:"Evidence & Inspection Report",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Tiered KYC & Trade Registry Queue",approveKycBtn:"Approve Identity & License",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",roleAgent:"Field Agent",navAgentPortal:"Field Agent Portal",agentPortalTitle:"Community Field Agent Onboarding Console",agentOnboardFarmerBtn:"Register Smallholder Farmer",agentRosterTitle:"Farmers Onboarded in Your Woreda",agentCommissionEarned:"Agent Commission",agentSyncStatus:"Sync Status",agentRegisterSuccess:"Farmer registered and documents queued for verification!",verifyAccountTitle:"Account Identity & Regulatory Verification",verificationStatusLabel:"Verification Status",statusPendingSubmission:"Pending Submission",statusUnderReview:"Under Review by Admin",statusApproved:"Fully Approved & Compliant",statusRejected:"Verification Rejected",verificationBannerText:"Complete your Fayda ID & TIN verification to unlock full marketplace selling and bulk purchasing privileges.",startVerificationBtn:"Verify Account Now",faydaIdLabel:"Fayda National ID Number (FAN)",tinNumberLabel:"10-Digit Taxpayer ID (TIN)",kebeleIdLabel:"Kebele Resident / Farm ID",uploadFrontPhoto:"Upload Front ID Photo",uploadBackPhoto:"Upload Back ID Photo",rejectionReasonLabel:"Rejection Reason",resubmitDocsBtn:"Update & Resubmit Documents",sideBySideInspectionTitle:"Side-by-Side Document Inspection",approveVerificationAction:"Approve Identity & Tax License",rejectVerificationAction:"Reject & Request Clarification",sendSmsNoticeToggle:"Notify user immediately via bilingual SMS",superAdminTitle:"Super Admin Command Center & Governance",superAdminSubtitle:"Full System Access · User CRUD · RBAC · Platform Config · Emergency Controls",tabUserMaster:"User Master CRUD",tabBanners:"Banners & Announcements",tabModeration:"Content & Post Moderation",tabPermissions:"RBAC Permissions",tabPlatformConfig:"Platform Config & Escrow",tabFinancialOversight:"Financials & Payouts",tabAuditLogs:"System Audit Logs",tabZones:"Delivery Zones & PostGIS",tabFeatureFlags:"Feature Flags",tabEmergency:"Emergency & Blacklist",tabBusinessRules:"Global Rules",tabDbOps:"Database & Health",createBannerBtn:"Add Promotional Banner",editBannerBtn:"Edit Banner",deleteBannerBtn:"Delete Banner",moderatePostBtn:"Moderate / Edit Post",flagAnomalyBtn:"Flag Price Anomaly",deletePostBtn:"Delete Post",impersonateBtn:"Login As / Impersonate",exitImpersonation:"Exit Impersonation",createUserBtn:"Create New Account",editUserBtn:"Edit User",freezePlatformEscrow:"Emergency Platform Escrow Freeze",exportDataBtn:"Export Platform Data (CSV/JSON)",triggerBackupBtn:"Trigger DB Backup Snapshot",payoutApprovalTitle:"High-Value Payout Approvals (> 50,000 ETB)",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",roleSuperAdmin:"ዋና አድሚን (Super Admin)",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLegalDocuments:"ውሎች እና የግብር ደረሰኞች",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"ሙሉ የምርት ፎቶና ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cropDescription:"የምርት ዝርዝር ገለጻ እና መገኛ",qualitySpecs:"የጥራት እና የግብርና መረጃዎች",packagingType:"የማሸጊያ እና አያያዝ ሁኔታ",storageRecommendation:"የማስቀመጫ እና የመቆያ ጊዜ",farmerProfile:"የተረጋገጠ አርሶ አደር መረጃ",directContact:"አርሶ አደሩን በቀጥታ ያግኙ",callFarmer:"ይደውሉ",smsInquiry:"መልእክት ይላኩ",buyNowEscrow:"በቴሌብር ዋስትና አሁኑኑ ይዘዙ",selectOrderQty:"የትዕዛዝ መጠን ይምረጡ (ኪ.ግ)",marketComparison:"የክልላዊ ገበያ ዋጋ ንጽጽር",belowMarketAvg:"ከክልላዊ ገበያ አማካይ ያነሰ",photoGallery:"የምርት ፎቶዎች እና የምርመራ ማዕዘናት",clickToEnlarge:"ሙሉ ፎቶና ዝርዝር ለማየት ይጫኑ",shareListing:"ምርቱን ያጋሩ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",viewContractBtn:"የግብይት ውል ይመልከቱ",viewInvoiceBtn:"የግብር እና ሽያጭ ደረሰኝ (e-VAT)",viewWaybillBtn:"የጭነት ማጓጓዣ ሰነድ (Waybill)",viewArbitrationBtn:"የሽምግልና ውሳኔ ሰነድ",printDocument:"አትም / ፒዲኤፍ አስቀምጥ",closeDocument:"ሰነዱን ዝጋ",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የግብር መግለጫ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",withholdingTaxReported:"የተያዘ ግብር (2% Withholding)",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ እና የደረሰኝ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር፣ ህጋዊነት እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",statVatRemitted:"የተሰበሰበ የተጨማሪ እሴት ታክስ (15% VAT)",statWithholding:"የተያዘ ግብር (2% Withholding)",resolveDisputeTitle:"የህጋዊ ቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና የፍተሻ ሪፖርት",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የተጠቃሚዎች ህጋዊነት እና የንግድ ፈቃድ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ እና ፈቃድ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",roleAgent:"የግብርና ድጋፍ ኤጀንት",navAgentPortal:"የኤጀንት ክፍል",agentPortalTitle:"የማህበረሰብ ግብርና ኤጀንቶች የገበሬዎች መመዝገቢያ ክፍል",agentOnboardFarmerBtn:"አዲስ አርሶ አደር መዝግብ",agentRosterTitle:"በእርስዎ ወረዳ የተመዘገቡ አርሶ አደሮች",agentCommissionEarned:"የኤጀንት ክፍያ",agentSyncStatus:"የዳታ ሁኔታ",agentRegisterSuccess:"አርሶ አደሩ ተመዝግቧል! ሰነዱ ለማረጋገጫ ተልኳል።",verifyAccountTitle:"የመለያ ህጋዊነት እና የታክስ ማረጋገጫ",verificationStatusLabel:"የማረጋገጫ ሁኔታ",statusPendingSubmission:"ሰነድ አልገባም",statusUnderReview:"በአድሚን በመገምገም ላይ",statusApproved:"የተረጋገጠ እና የጸደቀ",statusRejected:"ውድቅ ተደርጓል",verificationBannerText:"ምርቶችን በቀጥታ ለመሸጥ እና ክፍያ ለመቀበል የፋይዳ (Fayda) መታወቂያ እና የታክስ መለያ (TIN) ያረጋግጡ።",startVerificationBtn:"መለያዎን አሁን ያረጋግጡ",faydaIdLabel:"የፋይዳ ብሔራዊ መታወቂያ ቁጥር (FAN)",tinNumberLabel:"የ10-ዲጂት የግብር ከፋይ መለያ (TIN)",kebeleIdLabel:"የቀበሌ ነዋሪነት / የእርሻ ማረጋገጫ",uploadFrontPhoto:"የመታወቂያ የፊት ገጽ ፎቶ",uploadBackPhoto:"የመታወቂያ የጀርባ ገጽ ፎቶ",rejectionReasonLabel:"ውድቅ የተደረገበት ምክንያት",resubmitDocsBtn:"ሰነዶችን አስተካክለው እንደገና ያስገቡ",sideBySideInspectionTitle:"የሰነዶች ጎን ለጎን ፍተሻ እና ማረጋገጫ",approveVerificationAction:"መታወቂያ እና የግብር ሰነድ አጽድቅ",rejectVerificationAction:"ውድቅ አድርግ / ማብራሪያ ጠይቅ",sendSmsNoticeToggle:"ለተጠቃሚው ወዲያውኑ በኤስኤምኤስ አሳውቅ",superAdminTitle:"የዋና አድሚን ቁጥጥር እና አስተዳደር ማዕከል",superAdminSubtitle:"ሙሉ የሲስተም ስልጣን · የተጠቃሚዎች CRUD · RBAC · የዋስትና ውቅር · የአደጋ ጊዜ መቆጣጠሪያ",tabUserMaster:"የተጠቃሚዎች አስተዳደር (CRUD)",tabBanners:"የማስታወቂያ ባነሮች",tabModeration:"የምርቶች ቁጥጥር እና ማስተካከያ",tabPermissions:"የፈቃዶች ማትሪክስ (RBAC)",tabPlatformConfig:"የሲስተም ውቅር እና የዋስትና ድርሻ",tabFinancialOversight:"የፋይናንስ እና ክፍያ ቁጥጥር",tabAuditLogs:"የሲስተም ኦዲት መዝገብ",tabZones:"የማድረሻ ዞኖች እና ካርታ",tabFeatureFlags:"የባህሪያት ማብሪያ/ማጥፊያ",tabEmergency:"የአደጋ ጊዜ መቆጣጠሪያ እና እገዳ",tabBusinessRules:"አጠቃላይ የንግድ ደንቦች",tabDbOps:"ዳታቤዝ እና የሲስተም ጤና",createBannerBtn:"አዲስ ባነር ጨምር",editBannerBtn:"ባነር አርትዕ",deleteBannerBtn:"ባነር ሰርዝ",moderatePostBtn:"ምርት አርትዕ/አስተካክል",flagAnomalyBtn:"ያልተገባ ዋጋ ጠቁም",deletePostBtn:"ምርት ሰርዝ",impersonateBtn:"በተጠቃሚው ስም ግባ",exitImpersonation:"ከተጠቃሚው ውጣ",createUserBtn:"አዲስ መለያ ፍጠር",editUserBtn:"ተጠቃሚ አርትዕ",freezePlatformEscrow:"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ",exportDataBtn:"መረጃ በCSV/JSON አውርድ",triggerBackupBtn:"የዳታቤዝ ምትክ ቅጂ ውሰድ",payoutApprovalTitle:"ከፍተኛ የገንዘብ ክፍያ ማረጋገጫ (> 50,000 ብር)",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function zt(l,e,t,a,s,r,i=""){const o=H[l],d=s.reduce((f,v)=>f+v.qtyKg,0),c={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},agent:{label:"Field Extension Agent",labelAm:"የግብርና ድጋፍ ኤጀንት",color:"bg-teal-100 text-teal-900 border-teal-300",icon:"fa-users-gear"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"},superadmin:{label:"Super Admin (Chief Platform Officer)",labelAm:"ዋና አድሚን (Super Admin)",color:"bg-rose-100 text-rose-900 border-rose-300",icon:"fa-crown"}},n=e?c[e.role]||c.buyer:null;return e&&localStorage.getItem("currentUser")&&JSON.parse(localStorage.getItem("currentUser")||"{}").phone!=="+251900000001"&&window.isSuperAdminImpersonating,`
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
                  ${o.brandName}
                </span>
                <span class="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-200">
                  ET
                </span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium ${l==="am"?"lang-am":""}">
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
                value="${i}" 
                oninput="window.setSearchQuery(this.value)"
                placeholder="${o.searchPlaceholder}"
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
              <span class="font-bold hidden sm:inline ${l==="am"?"lang-am":""}">${o.navCart}</span>
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
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="marketplace"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-store"></i> ${o.navMarketplace}
            </button>

            ${t&&(e==null?void 0:e.role)==="farmer"?`
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="farmer"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-tractor"></i> ${o.navFarmerPortal}
              </button>
              ${p.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?`
                <button onclick="window.toggleCreateListingModal()" 
                  class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${l==="am"?"lang-am":""}">
                  <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${o.postNewListing}
                </button>
              `:""}
            `:""}

            ${t&&(e==null?void 0:e.role)==="driver"?`
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="driver"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-truck"></i> ${o.navDriverPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="agent"?`
              <button onclick="window.navigateTab('agent')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="agent"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-users-gear text-teal-400"></i> ${o.navAgentPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="admin"?`
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${a==="admin"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-sliders"></i> ${o.navAdminPortal}
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
  `}function Yt(l,e,t,a,s,r,i,o,d,c=null,n=0,f="All",v="All",S=!1,E=!1,w="marketplace",x=p.getStandingOrders(),O=p.getOrders("buyer")){var se,ae;const y=H[l],R=[{key:"All",label:y.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:y.catVegetables,icon:"fa-carrot"},{key:"Grains",label:y.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:y.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:y.catCoffee,icon:"fa-mug-hot"}],j=r.reduce((A,K)=>A+K.qtyKg*K.listing.pricePerKg,0),z=Math.round(j*.9),Y=Math.round(j*.05),J=j-z-Y,ee=r.reduce((A,K)=>{const U=K.listing.farmerId;return A[U]||(A[U]={farmerName:K.listing.farmerName,farmerRegion:K.listing.region,items:[]}),A[U].items.push(K),A},{}),Q=p.getActiveBanners("Buyer",a),C=Q.length>0?Q[0]:null;return`
    <div class="space-y-8 pb-20">
      
      <!-- E-Commerce Hero Promotional Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>${C!=null&&C.badgeText?C.badgeText:"15M+ Ethiopian Smallholder Farmers Direct Network"}</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${l==="am"?"lang-am":""}">
              ${C?l==="am"&&C.titleAm?C.titleAm:C.title:y.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${l==="am"?"lang-am":""}">
              ${C?l==="am"&&C.subtitleAm?C.subtitleAm:C.subtitle||y.heroDesc:y.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> ${C!=null&&C.ctaText?l==="am"&&C.ctaTextAm?C.ctaTextAm:C.ctaText:"Browse Farm Deals"}
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${y.navOrders} & Invoices (${O.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${y.standingOrdersTitle}
              </button>
            </div>
          </div>

          <!-- Hero Promo Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3 relative overflow-hidden">
              ${C!=null&&C.imageUrl?`
                <img src="${C.imageUrl}" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
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
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${w==="marketplace"?"active":""}">
            <i class="fa-solid fa-store"></i>
            <span>${l==="am"?"የጅምላ ገበያ":"Wholesale Marketplace"}</span>
          </button>
          <button onclick="window.setBuyerSubTab('orders')" class="cat-pill ${w==="orders"?"active":""}">
            <i class="fa-solid fa-receipt"></i>
            <span>${y.navOrders} & ${y.navLegalDocuments} (${O.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${w==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${y.standingOrdersTitle} (${x.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${w==="standing_orders"?Xt(l,x):w==="orders"?Qt(l,O):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${R.map(A=>`
            <button onclick="window.setCategory('${A.key}')" 
              class="cat-pill ${t===A.key?"active":""} ${l==="am"?"lang-am":""}">
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
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${y.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0,25,50,100].map(A=>`
                <button onclick="window.setMaxDistanceKm(${A})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${n===A?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${A===0?"All":A+" km"}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${y.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${f==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${f==="Grade 1"?"selected":""}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${f==="Grade 2"?"selected":""}>Grade 2 (Value)</option>
              <option value="Export Grade" ${f==="Export Grade"?"selected":""}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${y.filterRipeness}:</span>
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
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${S?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${y.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${E?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
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
            ${e.map(A=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1">
                
                <div>
                  <!-- Clickable Image with Hover Inspector Overlay -->
                  <div 
                    onclick="window.openProduceDetail('${A.id}')" 
                    class="h-48 w-full relative overflow-hidden group cursor-pointer"
                    title="${y.clickToEnlarge||"Click to view full photos & produce details"}"
                  >
                    <img src="${A.photos[0]}" alt="${A.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" />
                    
                    <!-- Hover Quick Preview Overlay -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <span class="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3.5 py-2 rounded-full shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <i class="fa-solid fa-eye text-emerald-600"></i> ${y.viewDetails}
                      </span>
                    </div>

                    <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                      ${A.isAdvanceHarvest?`
                        <span class="advance-pill shadow-md">
                          <i class="fa-solid fa-calendar-check text-emerald-700"></i> Advance Harvest
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
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${A.distanceKm} km ${y.farmDistance}
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
                      class="font-extrabold text-slate-900 text-lg leading-snug hover:text-emerald-700 cursor-pointer transition-colors ${l==="am"?"lang-am":""}"
                    >
                      ${l==="am"&&A.nameAm?A.nameAm:A.productName}
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
                  <button onclick="${p.hasEffectivePermission("PLACE_ORDERS","buyer")?`window.addToCart('${A.id}')`:"window.alert('Permission Restricted: PLACE_ORDERS has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary py-2.5 text-xs font-extrabold shadow-sm cursor-pointer ${p.hasEffectivePermission("PLACE_ORDERS","buyer")?"":"opacity-60 border-dashed bg-slate-700"}">
                    <i class="fa-solid ${p.hasEffectivePermission("PLACE_ORDERS","buyer")?"fa-cart-plus":"fa-lock"} mr-1"></i> ${y.addToCart}
                  </button>
                </div>

              </div>
            `).join("")}
          </div>
        `}

      </section>
      `}

      <!-- Bulk Cart Drawer Modal -->
      ${i?`
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
                ${Object.entries(ee).map(([A,K])=>`
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                      <span><i class="fa-solid fa-seedling text-emerald-600 mr-1"></i> Farm Source: ${K.farmerName} (${K.farmerRegion})</span>
                      <span class="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Direct Gate Payout</span>
                    </div>

                    ${K.items.map(U=>`
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
                  <span>${y.farmerShare}:</span>
                  <strong class="text-emerald-900">${z.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${y.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${Y.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${y.platformFee}:</span>
                  <strong class="text-slate-800">${J.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${y.totalAmount}:</span>
                  <span class="text-emerald-800">${j.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${j})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
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
                ${p.getAccountData().addresses.length?`<select id="checkoutAddress" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"><option value="">Select a saved address</option>${p.getAccountData().addresses.map(A=>`<option value="${A.id}">${A.name} · ${A.street}, ${A.city}${A.isDefaultShipping?" · Default":""}</option>`).join("")}</select>`:`<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">Add a saved address before checkout. <button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="font-black underline">Manage addresses</button></div>`}
              </div>

              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-700">2. Payment method</label>
                <div class="space-y-2">${p.getAccountData().paymentMethods.length?p.getAccountData().paymentMethods.map(A=>`<label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-400"><input type="radio" name="checkoutPayment" value="${A.id}" ${A.isPrimary?"checked":""} required /><span class="text-xs font-bold">${A.provider} · ${A.maskedDisplay||"Provider wallet"}${A.isPrimary?" · Primary":""}</span></label>`).join(""):`<label class="flex items-center gap-3 p-3 rounded-xl border border-blue-300 bg-blue-50 cursor-pointer"><input type="radio" name="checkoutPayment" value="telebirr-wallet" checked required /><span class="text-xs font-bold">Telebirr wallet · ${((se=p.getCurrentUser())==null?void 0:se.phone)||"linked account"}</span></label><p class="text-[10px] text-slate-500">Payment is securely authorized by the configured gateway.</p>`}</div>
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
      ${o?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${y.orderTracking}</h3>
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
                <h4 class="font-bold text-slate-900 ${l==="am"?"lang-am":""}">${o.productName}</h4>
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
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${y.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${y.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${y.viewWaybillBtn}
              </button>

              ${o.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-money-bill-transfer text-emerald-700 mr-1"></i> Refund approved and returned through the original payment method.
                </div>
              `:o.status==="disputed"?`
                <button onclick="window.openArbitrationModal('${o.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
                  <i class="fa-solid fa-scale-balanced mr-1 text-red-600"></i> ${y.viewArbitrationBtn}
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
                  <h5 class="text-sm font-bold text-slate-900">${o.disputeStatus==="ResolvedRefundBuyer"?"Refund Completed & Order Closed":"Delivery Confirmation & Escrow Release"}</h5>
                  <p class="text-xs text-slate-500">${o.disputeStatus==="ResolvedRefundBuyer"?"Refund returned through the original payment method.":o.status==="delivered"?"90% released to farmer, 5% to driver":"Confirm on receipt to release funds"}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 border-t border-slate-200 flex items-center gap-3">
              ${o.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                  <i class="fa-solid fa-money-bill-transfer text-emerald-700"></i> Refund completed. Order closed.
                </div>
              `:o.status!=="delivered"&&o.status!=="disputed"?`
                <button onclick="window.confirmDelivery('${o.id}')" class="btn-primary flex-1 py-3 text-xs cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i> ${y.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${o.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${y.disputeBtn}
                </button>
              `:(ae=o.disputeStatus)!=null&&ae.startsWith("Resolved")?`
                <div class="w-full p-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs text-center">
                  <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Dispute resolved: ${o.disputeStatus.replace("Resolved","").replace("Buyer"," Buyer").replace("Farmer"," Farmer").replace("PartialSplit"," Partial Split")}.
                </div>
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
  `}function Qt(l,e){const t=H[l],a=[{key:"pending",label:"Order Placed",icon:"fa-lock",active:["pending","confirmed","PickedUp","picked_up","delivered"]},{key:"confirmed",label:"Farmer Confirmed",icon:"fa-tractor",active:["confirmed","PickedUp","picked_up","delivered"]},{key:"picked_up",label:"In Transit",icon:"fa-truck",active:["PickedUp","picked_up","delivered"]},{key:"delivered",label:"Delivered",icon:"fa-hand-holding-dollar",active:["delivered"]}];function s(o){const d=o==null?void 0:o.toLowerCase();return d==="delivered"?"text-emerald-700 bg-emerald-100 border-emerald-300":d==="picked_up"||d==="pickedup"?"text-blue-700 bg-blue-100 border-blue-300":d==="confirmed"?"text-amber-700 bg-amber-100 border-amber-300":d==="disputed"?"text-red-700 bg-red-100 border-red-300":"text-slate-600 bg-slate-100 border-slate-300"}function r(o,d){return o.some(c=>c.toLowerCase()===(d==null?void 0:d.toLowerCase()))}function i(o){const d=o==null?void 0:o.toLowerCase();return["confirmed","picked_up","pickedup"].includes(d)}return`
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
          ${e.map(o=>{var d,c;return`
            <div class="glass-card p-5 space-y-4 ${i(o.status)?"ring-1 ring-blue-300 shadow-blue-100":""}">

              <!-- Order Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  ${i(o.status)?`
                    <div class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800 text-[10px] font-extrabold">
                      <span class="pulse-dot" style="background:rgb(59,130,246)"></span> LIVE
                    </div>
                  `:""}
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-extrabold px-2 py-0.5 rounded-full border ${s(o.status)}">${o.status.toUpperCase()}</span>
                      <span class="font-bold text-slate-900 text-sm">${o.productName}</span>
                    </div>
                    <p class="text-xs text-slate-500 mt-0.5">
                      ${o.qtyKg} kg · Farmer: <strong class="text-slate-700">${o.farmerName}</strong> ·
                      <span class="text-emerald-800 font-bold">${o.totalEtb.toLocaleString()} ETB</span>
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 shrink-0">
                  <button onclick="window.openInvoiceModal('${o.id}')" class="btn-secondary text-xs py-1.5 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${t.viewInvoiceBtn}
                  </button>
                  <button onclick="window.viewOrder('${o.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                    <i class="fa-solid fa-satellite-dish mr-1"></i> Details
                  </button>
                </div>
              </div>

              <!-- Status Timeline -->
              <div class="relative flex items-start gap-0">
                ${a.map((n,f)=>{var E;const v=r(n.active,o.status),S=f===a.length-1;return`
                    <div class="flex-1 flex flex-col items-center">
                      <!-- Step circle -->
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all
                        ${v?"bg-emerald-600 text-white ring-2 ring-emerald-200":"bg-slate-100 text-slate-400 border border-slate-200"}">
                        <i class="fa-solid ${n.icon} text-[11px]"></i>
                      </div>
                      <!-- Connector line -->
                      ${S?"":`
                        <div class="absolute top-4 left-0 right-0 h-0.5 -z-10" style="left:calc(${f*100/(a.length-1)}% + 16px); width:calc(${100/(a.length-1)}% - 32px)">
                          <div class="h-full ${v&&r(((E=a[f+1])==null?void 0:E.active)??[],o.status)?"bg-emerald-400":"bg-slate-200"} rounded-full"></div>
                        </div>
                      `}
                      <!-- Step label -->
                      <span class="text-[9px] font-semibold mt-1.5 text-center leading-tight ${v?"text-emerald-800":"text-slate-400"}">
                        ${n.label}
                      </span>
                    </div>
                  `}).join("")}
              </div>

              <!-- Driver ETA (for in-transit orders) -->
              ${((d=o.status)==null?void 0:d.toLowerCase())==="picked_up"||((c=o.status)==null?void 0:c.toLowerCase())==="pickedup"?`
                <div class="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                  <i class="fa-solid fa-location-dot text-blue-600 text-base"></i>
                  <div>
                    <span class="font-bold text-blue-900">Driver is en route</span>
                    <span class="text-blue-700 ml-1.5">· ETA updates via live GPS</span>
                  </div>
                  <span id="eta-${o.id}" class="ml-auto font-extrabold text-blue-800">—</span>
                </div>
              `:""}

              <!-- Doc numbers footer -->
              <div class="flex items-center gap-3 text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                <span>INV: ${o.invoiceNumber||"ET-INV-001"}</span>
                <span>·</span>
                <span>CONTR: ${o.contractNumber||"AGR-ET-001"}</span>
                ${o.paymentRef?`<span>·</span><span>REF: ${o.paymentRef}</span>`:""}
              </div>

            </div>
          `}).join("")}
        </div>
      `}
    </div>
  `}function Xt(l,e){const t=H[l];return`
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
        ${e.map(a=>`
          <div class="glass-card p-5 space-y-4 border-l-4 ${a.active?"border-emerald-600":"border-slate-300"}">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${a.active?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-600"}">
                  ${a.frequency} Scheduled
                </span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">${l==="am"&&a.productNameAm?a.productNameAm:a.productName}</h3>
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
  `}function Zt(l,e,t,a,s,r="listings",i=p.getPriceBenchmarks(),o=p.getCurrentUser()){const d=H[l];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(o==null?void 0:o.region)||"Oromia (Bishoftu)"}
            </span>
            ${p.getVerificationStatus()==="Approved"?`
              <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
                <i class="fa-solid fa-circle-check text-emerald-600"></i> ${d.verifiedFayda} ${o!=null&&o.kycDocumentNumber?`(${o.kycDocumentNumber})`:""}
              </span>
              ${o!=null&&o.tinNumber?`
                <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
                  <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${o.tinNumber}
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
              <i class="fa-solid fa-users text-purple-600"></i> ${(o==null?void 0:o.repeatBuyerCount)||0} ${d.repeatBuyers}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> ${(o==null?void 0:o.onTimeDeliveryRate)||100}% ${d.onTimeRate}
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

          <button onclick="${p.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"window.toggleCreateListingModal()":"window.alert('Permission Restricted: PUBLISH_PRODUCE has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer ${p.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"":"opacity-60 border-dashed bg-slate-700"}">
            <i class="fa-solid ${p.hasEffectivePermission("PUBLISH_PRODUCE","farmer")?"fa-plus-circle":"fa-lock"}"></i>
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
                ${o!=null&&o.rejectionReason?`${d.rejectionReasonLabel}: ${o.rejectionReason}`:d.verificationBannerText}
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

      ${r==="wallet"?Jt(l,a,t,o):r==="sms"?es(l):`

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
          ${i.map(c=>`
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
            ${((o==null?void 0:o.walletBalanceEtb)||48200).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
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
      ${s?Qe(l):""}

    </div>
  `}function Jt(l,e,t,a){const s=H[l];return`
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
          <button onclick="${p.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"window.handleFarmerWithdrawal()":"window.alert('Permission Restricted: REQUEST_WALLET_WITHDRAWAL has been revoked by SuperAdmin RBAC policy.')"}" class="btn-primary bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg w-full sm:w-auto cursor-pointer ${p.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"":"opacity-50 border-dashed"}">
            <i class="fa-solid ${p.hasEffectivePermission("REQUEST_WALLET_WITHDRAWAL","farmer")?"fa-money-bill-transfer":"fa-lock"} mr-1 text-slate-950"></i> ${s.requestWithdrawal}
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
  `}function es(l){const e=H[l];return`
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
  `}function Qe(l,e){const t=H[l];return`
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
  `}function ts(l,e,t,a=p.getOptimizedRoute(),s=p.getCurrentUser(),r=p.getIsOfflineMode(),i=p.getOfflineQueue().length){const o=H[l],d=(s==null?void 0:s.vehicleCapacityKg)||5e3,c=Math.min(100,Math.round(a.totalWeightKg/d*100));return`
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

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">
            ${o.driverPortalTitle}
          </h1>
        </div>

        <!-- Offline-First Mode Controls -->
        <div class="flex items-center gap-3">
          <button onclick="window.toggleDriverOfflineMode()" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${r?"bg-amber-600 text-white border-amber-600 shadow-md":"bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}">
            <i class="fa-solid fa-wifi-slash mr-1"></i> ${r?"Offline Mode Active":"Online Mode"}
          </button>

          ${i>0?`
            <button onclick="window.syncDriverOfflineQueue()" class="btn-primary text-xs py-2 px-3.5 shadow-sm cursor-pointer animate-bounce">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${o.offlineSyncBtn} (${i})
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
              <h3 class="text-sm font-bold text-slate-900 ${l==="am"?"lang-am":""}">${o.vehicleProfileTitle}</h3>
              <p class="text-[11px] text-slate-500 font-medium">${(s==null?void 0:s.vehicleType)||"Isuzu 5-Ton"} · ${(s==null?void 0:s.refrigerationType)||"Ventilated Cargo"}</p>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-700">
            <span>Payload: <strong class="text-amber-800">${a.totalWeightKg.toLocaleString()} kg</strong> / ${d.toLocaleString()} kg (${c}%)</span>
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
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${a.title}</h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span><i class="fa-solid fa-road text-amber-600 mr-1"></i> ${a.totalDistanceKm} km</span>
            <span><i class="fa-solid fa-clock text-blue-600 mr-1"></i> ~${a.estimatedHours} hrs</span>
            <span><i class="fa-solid fa-coins text-emerald-600 mr-1"></i> ${(a.driverCommissionEtb+a.ruralSubsidyEtb).toLocaleString()} ETB Total</span>
          </div>
        </div>

        <div class="space-y-4">
          ${a.stops.map((n,f)=>`
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
          <i class="fa-solid fa-road text-amber-600 mr-2"></i> ${o.availableTrips}
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
                    <span class="text-xs text-slate-400 font-medium block">${o.tripCommission} + Rural Subsidy</span>
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
                      <i class="fa-solid fa-file-invoice mr-1 text-sky-600"></i> ${o.viewWaybillBtn}
                    </button>

                    <button onclick="window.openContractModal('${n.id}')" class="btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${o.viewContractBtn}
                    </button>

                    ${n.status==="confirmed"?`
                      <button onclick="${p.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?`window.driverPickupWithProof('${n.id}')`:"window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')"}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${p.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"":"opacity-60 border-dashed bg-slate-700"}">
                        <i class="fa-solid ${p.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"fa-camera":"fa-lock"} mr-1"></i> ${o.uploadProof} & Pickup
                      </button>
                    `:n.status==="picked_up"?`
                      <button onclick="${p.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?`window.driverCompleteDeliveryProof('${n.id}')`:"window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')"}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${p.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"":"opacity-60 border-dashed bg-slate-700"}">
                        <i class="fa-solid ${p.hasEffectivePermission("SUBMIT_DELIVERY_PROOF","driver")?"fa-location-crosshairs":"fa-lock"} mr-1"></i> Dropoff + GPS Proof
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
  `}function ss(l,e="users",t="all",a="all",s="admin"){const r=H[l],i=p.getAllUsers(),o=p.getBanners(),d=p.getListings(),c=p.getPlatformConfig(),n=p.getSystemAuditLogs(),f=p.getDeliveryZones(),v=p.getFeatureFlags(),S=p.getPendingPayoutApprovals(),E=p.getGlobalBusinessRules(),w=p.getBlacklist(),x=t==="all"?i:i.filter(R=>R.role.toLowerCase()===t.toLowerCase()),O=a==="all"?n:n.filter(R=>R.category.toLowerCase()===a.toLowerCase()),y={all:i.length,farmer:i.filter(R=>R.role==="farmer").length,buyer:i.filter(R=>R.role==="buyer").length,driver:i.filter(R=>R.role==="driver").length,agent:i.filter(R=>R.role==="agent").length,admin:i.filter(R=>R.role==="admin").length,superadmin:i.filter(R=>R.role==="superadmin").length};return`
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
          <span>${r.tabUserMaster} (${i.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('banners')" class="cat-pill ${e==="banners"?"active":""}">
          <i class="fa-solid fa-panorama text-emerald-500"></i>
          <span>${r.tabBanners} (${o.length})</span>
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
          <span>${r.tabFinancialOversight} (${S.filter(R=>R.status==="Pending").length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('audit')" class="cat-pill ${e==="audit"?"active":""}">
          <i class="fa-solid fa-clipboard-list text-blue-500"></i>
          <span>${r.tabAuditLogs} (${n.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('zones')" class="cat-pill ${e==="zones"?"active":""}">
          <i class="fa-solid fa-map-location-dot text-teal-500"></i>
          <span>${r.tabZones} (${f.length})</span>
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
      ${as(l,e,x,t,y,c,O,a,f,v,S,E,w,s)}

    </div>
  `}function as(l,e,t,a,s,r,i,o,d,c,n,f,v,S="admin"){switch(e){case"users":return qe(l,t,a,s);case"banners":return Xe(l);case"moderation":return Ze(l);case"permissions":return rs(l,S);case"config":return is(l,r);case"financials":return os(l,n);case"audit":return ns(l,i,o);case"zones":return ls(l,d);case"feature_flags":return ds(l,c);case"emergency":return cs(l,r,v);case"rules":return ps(l,f);case"db_ops":return us(l);default:return qe(l,t,a,s)}}function qe(l,e,t,a){const s=H[l];return`
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
              ${e.map(r=>`
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full ${ms(r.role)} flex items-center justify-center font-bold text-xs shrink-0">
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
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${fs(r.role)}">
                      ${gs(r.role)} ${r.role.toUpperCase()}
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
  `}function rs(l,e="admin"){var d,c;const t=p.getPermissionsList(),a=p.getAllRolePermissions(),s=p.getRolePermissions(e),r=[{key:"admin",label:"Marketplace Admin",icon:"fa-shield-halved text-purple-600",badgeCls:"bg-purple-100 text-purple-800",count:Object.values(a.admin||{}).filter(Boolean).length},{key:"agent",label:"Field Extension Agent",icon:"fa-users-gear text-teal-600",badgeCls:"bg-teal-100 text-teal-800",count:Object.values(a.agent||{}).filter(Boolean).length},{key:"farmer",label:"Smallholder Farmer",icon:"fa-seedling text-emerald-600",badgeCls:"bg-emerald-100 text-emerald-800",count:Object.values(a.farmer||{}).filter(Boolean).length},{key:"driver",label:"Logistics Transporter",icon:"fa-truck-fast text-amber-600",badgeCls:"bg-amber-100 text-amber-800",count:Object.values(a.driver||{}).filter(Boolean).length},{key:"buyer",label:"Commercial Buyer",icon:"fa-basket-shopping text-blue-600",badgeCls:"bg-blue-100 text-blue-800",count:Object.values(a.buyer||{}).filter(Boolean).length},{key:"superadmin",label:"Super Admin (Root)",icon:"fa-crown text-rose-600",badgeCls:"bg-rose-100 text-rose-900",count:t.length}],i=["Governance & Root","Operational Moderation","Field & Logistics","Marketplace & Trade"],o={"Governance & Root":"fa-crown text-rose-600","Operational Moderation":"fa-shield-halved text-purple-600","Field & Logistics":"fa-truck-ramp-box text-teal-600","Marketplace & Trade":"fa-cart-shopping text-emerald-600"};return`
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
        ${r.map(n=>{const f=n.key===e;return`
            <button onclick="window.setRbacSelectedRole('${n.key}')" class="p-3 rounded-2xl border transition-all text-left flex flex-col justify-between gap-2 cursor-pointer ${f?"bg-purple-900 text-white border-purple-800 shadow-md ring-2 ring-purple-600/30":"glass-card text-slate-700 hover:border-purple-300"}">
              <div class="flex items-center justify-between">
                <i class="fa-solid ${n.icon} text-base ${f?"text-purple-300":""}"></i>
                <span class="text-[10px] font-black px-1.5 py-0.5 rounded ${f?"bg-purple-800 text-purple-200":n.badgeCls}">
                  ${n.count}/${t.length}
                </span>
              </div>
              <div>
                <p class="text-xs font-black ${f?"text-white":"text-slate-900"}">${n.label}</p>
                <span class="text-[10px] font-mono opacity-70">${n.key.toUpperCase()}</span>
              </div>
            </button>
          `}).join("")}
      </div>

      <!-- Selected Role RBAC Configuration Card -->
      <div class="glass-card rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid ${((d=r.find(n=>n.key===e))==null?void 0:d.icon)||"fa-user-gear"}"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-slate-900">
                ${(c=r.find(n=>n.key===e))==null?void 0:c.label} Permissions
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
          ${i.map(n=>{const f=t.filter(v=>v.category===n);return f.length===0?"":`
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                  <i class="fa-solid ${o[n]||"fa-shield"}"></i>
                  <span>${n}</span>
                  <span class="text-[10px] text-slate-400 font-mono">(${f.length})</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  ${f.map(v=>{const S=e==="superadmin"?!0:!!s[v.key],E=e==="superadmin";return`
                      <div class="p-3.5 rounded-2xl border transition-all ${S?"bg-emerald-50/40 border-emerald-200 ring-1 ring-emerald-500/10":"bg-slate-50/60 border-slate-200 opacity-80"} flex flex-col justify-between gap-2.5">
                        <div class="flex items-start justify-between gap-2">
                          <div>
                            <p class="text-xs font-black text-slate-900">${l==="am"&&v.labelAm?v.labelAm:v.label}</p>
                            <span class="text-[10px] font-mono text-purple-700 font-semibold">${v.key}</span>
                          </div>

                          <label class="relative inline-flex items-center cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              ${S?"checked":""}
                              ${E?"disabled":""}
                              onchange="window.handleToggleRolePermission('${e}', '${v.key}', this.checked)"
                              class="sr-only peer"
                            />
                            <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 ${E?"opacity-60 cursor-not-allowed":""}"></div>
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
              ${t.map(n=>{var f,v,S,E,w;return`
                <tr class="hover:bg-slate-50/60 transition-colors">
                  <td class="py-2.5 px-3">
                    <span class="font-bold text-slate-900">${n.label}</span>
                    <span class="block text-[9px] text-purple-700 font-mono">${n.key}</span>
                  </td>
                  <td class="py-2.5 px-3">
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">${n.category}</span>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(f=a.admin)!=null&&f[n.key]?"fa-circle-check text-emerald-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(v=a.agent)!=null&&v[n.key]?"fa-circle-check text-teal-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(S=a.farmer)!=null&&S[n.key]?"fa-circle-check text-emerald-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(E=a.driver)!=null&&E[n.key]?"fa-circle-check text-amber-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <i class="fa-solid ${(w=a.buyer)!=null&&w[n.key]?"fa-circle-check text-blue-600":"fa-circle-xmark text-slate-300"} text-xs"></i>
                  </td>
                </tr>
              `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function is(l,e){return`
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
  `}function os(l,e){const t=e.filter(a=>a.status==="Pending");return`
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
            ${t.map(a=>`
              <div class="glass-card p-5 border-l-4 ${a.riskScore==="High"?"border-red-600":a.riskScore==="Medium"?"border-amber-600":"border-emerald-600"} space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-xs font-bold text-slate-900 block">${a.recipientName}</span>
                    <span class="text-[11px] text-slate-500 font-mono">${a.recipientPhone} · ${a.recipientRole.toUpperCase()}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-black ${a.riskScore==="High"?"bg-red-100 text-red-800":a.riskScore==="Medium"?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"}">
                    ${a.riskScore.toUpperCase()} RISK
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 font-medium">Requested Withdrawal:</span>
                    <span class="text-base font-black text-emerald-700">${a.amountEtb.toLocaleString()} ETB</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-1 font-semibold">Trigger: ${a.triggerReason}</p>
                </div>

                <div class="flex items-center gap-2 pt-1">
                  <button onclick="window.approveHighValuePayout('${a.id}')" class="btn-primary flex-1 py-2 text-xs font-bold cursor-pointer">
                    <i class="fa-solid fa-check mr-1"></i> Authorize Telebirr Payout
                  </button>
                  <button onclick="window.rejectHighValuePayout('${a.id}')" class="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer border border-red-200">
                    <i class="fa-solid fa-ban mr-1"></i> Decline
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>

    </div>
  `}function ns(l,e,t){return`
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
              ${e.map(a=>`
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5 text-[11px] text-slate-500 font-mono whitespace-nowrap">${a.timestamp}</td>
                  <td class="p-3.5">
                    <span class="font-bold text-slate-900 block leading-tight">${a.actorName}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${a.actorRole.toUpperCase()}</span>
                  </td>
                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black ${bs(a.category)}">
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
  `}function ls(l,e){return`
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
  `}function ds(l,e){return`
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
  `}function cs(l,e,t){return`
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
  `}function ps(l,e){return`
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
  `}function us(l){return`
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
  `}function ms(l){switch(l){case"superadmin":return"bg-rose-100 text-rose-800";case"admin":return"bg-purple-100 text-purple-800";case"farmer":return"bg-emerald-100 text-emerald-800";case"buyer":return"bg-blue-100 text-blue-800";case"driver":return"bg-amber-100 text-amber-800";case"agent":return"bg-teal-100 text-teal-800";default:return"bg-slate-100 text-slate-800"}}function fs(l){switch(l){case"superadmin":return"bg-rose-100 text-rose-900 border border-rose-300";case"admin":return"bg-purple-100 text-purple-900 border border-purple-300";case"farmer":return"bg-emerald-100 text-emerald-900 border border-emerald-300";case"buyer":return"bg-blue-100 text-blue-900 border border-blue-300";case"driver":return"bg-amber-100 text-amber-900 border border-amber-300";case"agent":return"bg-teal-100 text-teal-900 border border-teal-300";default:return"bg-slate-100 text-slate-800"}}function gs(l){switch(l){case"superadmin":return'<i class="fa-solid fa-crown text-rose-600"></i>';case"admin":return'<i class="fa-solid fa-shield-halved text-purple-600"></i>';case"farmer":return'<i class="fa-solid fa-seedling text-emerald-600"></i>';case"buyer":return'<i class="fa-solid fa-shopping-basket text-blue-600"></i>';case"driver":return'<i class="fa-solid fa-truck-fast text-amber-600"></i>';case"agent":return'<i class="fa-solid fa-users-gear text-teal-600"></i>';default:return'<i class="fa-solid fa-user"></i>'}}function bs(l){switch(l){case"USER_CRUD":return"bg-rose-100 text-rose-800";case"CONFIG":return"bg-purple-100 text-purple-800";case"FINANCE":return"bg-emerald-100 text-emerald-800";case"DISPUTE":return"bg-amber-100 text-amber-800";case"EMERGENCY":return"bg-red-100 text-red-800";case"IMPERSONATION":return"bg-blue-100 text-blue-800";default:return"bg-slate-100 text-slate-800"}}function Xe(l){const e=H[l],t=p.getBanners();return`
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${l==="am"?"lang-am":""}">
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
                <h4 class="text-sm font-black text-white leading-snug line-clamp-2">${l==="am"&&a.titleAm?a.titleAm:a.title}</h4>
                <p class="text-[11px] text-white/80 line-clamp-2 font-medium">${l==="am"&&a.subtitleAm?a.subtitleAm:a.subtitle||""}</p>
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
  `}function Ze(l){const e=H[l],t=p.getListings();return`
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
              `:t.map(a=>{const s=a.moderationStatus==="Flagged",r=a.marketBenchmarkPrice||50,i=Math.round((a.pricePerKg-r)/r*100);return`
                  <tr class="hover:bg-slate-50/60 transition-colors ${s?"bg-red-50/30":""}">
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-3">
                        <img src="${a.photos&&a.photos[0]?a.photos[0]:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200"}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0" />
                        <div>
                          <p class="font-bold text-slate-900 text-xs">${l==="am"&&a.nameAm?a.nameAm:a.productName}</p>
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
                        <div class="text-[10px] ${Math.abs(i)>30?"text-amber-700 font-bold":"text-slate-400"}">
                          ${i>0?`+${i}%`:`${i}%`} vs Avg (${r} ETB)
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
  `}function hs(l,e,t,a=p.getAnomalyAlerts(),s=p.getKycQueue(),r=p.getRegionalAnalytics(),i="disputes"){const o=H[l],d=p.getBanners(),c=p.getListings();return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance & Legal Compliance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${l==="am"?"lang-am":""}">
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

      <!-- Admin Tab Pills with RBAC status indicators -->
      ${(()=>{const n=p.hasEffectivePermission("RESOLVE_DISPUTES","admin"),f=p.hasEffectivePermission("MODERATE_LISTINGS","admin"),v=p.hasEffectivePermission("MANAGE_BANNERS","admin"),S=p.hasEffectivePermission("VIEW_ANOMALY_ALERTS","admin"),E=p.hasEffectivePermission("VERIFY_KYC","admin"),w=p.hasEffectivePermission("VIEW_TAX_COMPLIANCE","admin"),x=p.hasEffectivePermission("VIEW_REGIONAL_ANALYTICS","admin"),O=p.hasEffectivePermission("BROADCAST_SMS","admin");return`
          <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            <button onclick="window.setAdminTab('disputes')" class="cat-pill ${i==="disputes"?"active":""} ${n?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-scale-balanced"></i>
              <span>${o.resolveDisputeTitle} (${t.length})</span>
              ${n?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('moderation')" class="cat-pill ${i==="moderation"?"active":""} ${f?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-gavel text-purple-600"></i>
              <span>${o.tabModeration} (${c.length})</span>
              ${f?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('banners')" class="cat-pill ${i==="banners"?"active":""} ${v?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-panorama text-emerald-600"></i>
              <span>${o.tabBanners} (${d.length})</span>
              ${v?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${i==="anomalies"?"active":""} ${S?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
              <span>${o.anomalyScannerTitle} (${a.length})</span>
              ${S?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('kyc')" class="cat-pill ${i==="kyc"?"active":""} ${E?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-id-card"></i>
              <span>${o.kycQueueTitle} (${s.filter(y=>y.status==="Pending").length})</span>
              ${E?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('tax_compliance')" class="cat-pill ${i==="tax_compliance"?"active":""} ${w?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>Fiscal & Tax Invoicing</span>
              ${w?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('analytics')" class="cat-pill ${i==="analytics"?"active":""} ${x?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-chart-pie"></i>
              <span>${o.regionalAnalyticsTitle}</span>
              ${x?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
            <button onclick="window.setAdminTab('sms')" class="cat-pill ${i==="sms"?"active":""} ${O?"":"opacity-70 border-dashed"}">
              <i class="fa-solid fa-tower-broadcast"></i>
              <span>${o.broadcastSmsTitle}</span>
              ${O?"":'<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>'}
            </button>
          </div>
        `})()}

      <!-- Tab Content: Moderation & Banners with RBAC Checks -->
      ${i==="moderation"?p.hasEffectivePermission("MODERATE_LISTINGS","admin")?Ze(l):`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የምርት ቁጥጥር ፈቃድ ተገድቧል":"Produce Moderation Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MODERATE_LISTINGS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      ${i==="banners"?p.hasEffectivePermission("MANAGE_BANNERS","admin")?Xe(l):`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የባነር አስተዳደር ፈቃድ ተገድቧል":"Banner Management Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MANAGE_BANNERS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split with Legal Decrees) -->
      ${i==="disputes"?p.hasEffectivePermission("RESOLVE_DISPUTES","admin")?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
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
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የአለመግባባት ዳኝነት ፈቃድ ተገድቧል":"Dispute Arbitration Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'RESOLVE_DISPUTES' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 2: Fraud & Anomaly Detection Monitor -->
      ${i==="anomalies"?p.hasEffectivePermission("VIEW_ANOMALY_ALERTS","admin")?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> ${o.anomalyScannerTitle}
            </h2>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Active Heuristic Scanner
            </span>
          </div>

          <div class="space-y-3">
            ${a.map(n=>`
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
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የማጭበርበር ቅኝት ፈቃድ ተገድቧል":"Anomaly Scanner Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_ANOMALY_ALERTS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 3: Comprehensive Verification & Regulatory Audit Queue -->
      ${i==="kyc"?p.hasEffectivePermission("VERIFY_KYC","admin")?`
        <section class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
                <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${o.sideBySideInspectionTitle}
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
                      <span class="text-slate-500 block">${o.tinNumberLabel}:</span>
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
                        <strong>${o.rejectionReasonLabel}:</strong> ${n.rejectionReason}
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
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የKYC ማረጋገጫ ፈቃድ ተገድቧል":"KYC Verification Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VERIFY_KYC' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 4: Fiscal & Tax Invoicing Registry -->
      ${i==="tax_compliance"?p.hasEffectivePermission("VIEW_TAX_COMPLIANCE","admin")?`
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
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የግብር ሰነዶች ፈቃድ ተገድቧል":"Fiscal & Tax Compliance Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_TAX_COMPLIANCE' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 5: Regional Analytics & EABC Impact Dashboard -->
      ${i==="analytics"?p.hasEffectivePermission("VIEW_REGIONAL_ANALYTICS","admin")?`
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">
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
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የክልላዊ ትንታኔ ፈቃድ ተገድቧል":"Regional Analytics Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_REGIONAL_ANALYTICS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

      <!-- Tab Content 6: Broadcast Bilingual SMS (Twilio) -->
      ${i==="sms"?p.hasEffectivePermission("BROADCAST_SMS","admin")?`
        <section class="glass-card p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
              <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${l==="am"?"lang-am":""}">${o.broadcastSmsTitle}</h2>
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
      `:`
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${l==="am"?"የኤስኤምኤስ ስርጭት ፈቃድ ተገድቧል":"SMS Broadcast Restricted by RBAC Policy"}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'BROADCAST_SMS' permission. Please contact a Super Administrator.</p>
        </div>
      `:""}

    </div>
  `}class vs{constructor(e="en"){b(this,"currentLang","en");b(this,"activeTab","register");b(this,"ussdPhone","+251944556677");b(this,"ussdInput","*990#");b(this,"ussdScreenText",`Welcome to Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit`);this.currentLang=e}setLanguage(e){this.currentLang=e}render(){const e=H[this.currentLang];p.getCurrentUser();const t=p.getAgentRegisteredFarmers(),a=t.filter(r=>r.status==="Approved").length,s=t.length*250;return`
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
        ${this.activeTab==="register"?p.hasEffectivePermission("FIELD_AGENT_ONBOARDING","agent")?this.renderRegisterTab():`
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang==="am"?"የአርሶ አደር ምዝገባ ፈቃድ ተገድቧል":"Agent Onboarding Restricted"}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'FIELD_AGENT_ONBOARDING' permission. Please contact a Super Administrator.</p>
          </div>
        `:""}
        ${this.activeTab==="roster"?this.renderRosterTab(t):""}
        ${this.activeTab==="ussd_sim"?p.hasEffectivePermission("EXECUTE_USSD","agent")?this.renderUssdTab():`
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang==="am"?"የUSSD ክዋኔ ፈቃድ ተገድቧል":"USSD Execution Restricted"}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'EXECUTE_USSD' permission. Please contact a Super Administrator.</p>
          </div>
        `:""}

      </div>
    `}renderRegisterTab(){const e=H[this.currentLang];return`
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
    `}renderRosterTab(e){const t=H[this.currentLang];return`
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
    `}switchTab(e){this.activeTab=e}setUssdInput(e){this.ussdInput=e;const t=document.getElementById("ussdCodeInput");t&&(t.value=e)}async executeUssd(){const e=document.getElementById("ussdCodeInput"),t=(e==null?void 0:e.value)||this.ussdInput,a=await p.sendInboundUssdSimulation(this.ussdPhone,t);this.ussdScreenText=a;const s=document.getElementById("ussdDisplayScreen");s&&(s.innerText=a)}}class xs{constructor(e="en"){b(this,"currentLang","en");b(this,"isOpen",!1);b(this,"currentStep",1);b(this,"faydaNumber","");b(this,"tinNumber","");b(this,"kebeleNumber","");b(this,"frontImageUrl","https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80");b(this,"backImageUrl","https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80");this.currentLang=e}setLanguage(e){this.currentLang=e}open(e=1){this.isOpen=!0,this.currentStep=e;const t=p.getCurrentUser();t!=null&&t.tinNumber&&(this.tinNumber=t.tinNumber),this.render()}close(){this.isOpen=!1;const e=document.getElementById("verificationWizardModal");e&&(e.innerHTML="")}render(){const e=document.getElementById("verificationWizardModal");if(!e||!this.isOpen)return;const t=H[this.currentLang],a=p.getCurrentUser(),s=p.getVerificationStatus();e.innerHTML=`
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
    `}renderStepContent(){const e=H[this.currentLang],t=p.getCurrentUser();return this.currentStep===1?`
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
      `:""}getStatusBgColor(e){switch(e){case"Approved":return"rgba(16, 185, 129, 0.12)";case"UnderReview":return"rgba(234, 179, 8, 0.12)";case"Rejected":return"rgba(239, 68, 68, 0.12)";default:return"rgba(100, 116, 139, 0.1)"}}getStatusTextColor(e){switch(e){case"Approved":return"#047857";case"UnderReview":return"#b45309";case"Rejected":return"#b91c1c";default:return"#475569"}}getStatusIcon(e){switch(e){case"Approved":return"✅";case"UnderReview":return"⏳";case"Rejected":return"❌";default:return"📝"}}formatStatus(e){const t=H[this.currentLang];switch(e){case"Approved":return t.statusApproved;case"UnderReview":return t.statusUnderReview;case"Rejected":return t.statusRejected;default:return t.statusPendingSubmission}}updateField(e,t){e==="fayda"&&(this.faydaNumber=t),e==="tin"&&(this.tinNumber=t),e==="kebele"&&(this.kebeleNumber=t)}setStep(e){this.currentStep=e,this.render()}async submit(){const e=this.faydaNumber||"FAN-8812-4091-2810",t=this.tinNumber||"0099881122";await p.submitVerificationDocuments(t,[{documentType:"FaydaId",documentNumber:e,frontImageUrl:this.frontImageUrl,backImageUrl:this.backImageUrl},{documentType:"TinCertificate",documentNumber:t,frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"}]),this.close()}}function ys(l,e){return`
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
  `}function ws(l,e,t,a,s="",r="",i="",o=""){return`
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

          ${o?`
            <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <i class="fa-solid fa-circle-exclamation text-red-500 text-sm mt-0.5 shrink-0"></i>
              <div class="flex-1">
                <span class="font-bold block">${o}</span>
                ${e==="login"&&o.toLowerCase().includes("register")?`
                  <button type="button" onclick="window.switchToRegisterWithPhone('${a}')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
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
                      <span class="block font-bold">${r?`Account: <strong>${r}</strong> (${i})`:"SMS Dispatched via Twilio Gateway"}</span>
                      <span class="text-[11px] text-emerald-700 font-medium">Verified Phone: <strong>+251 ${a}</strong></span>
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
                    ${l==="am"?"የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ":"Enter 6-Digit Verification Code"}
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
                    <input type="tel" id="authPhoneInput" required placeholder="911 223 344" value="${a||""}"
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
                    <input type="tel" id="regPhone" required placeholder="911 000 111" value="${a||""}"
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
  `}class As{constructor(){b(this,"currentLang","en")}setLanguage(e){this.currentLang=e}renderInvoice(e){const t=this.currentLang==="am";return`
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
    `}}const ye=new As;class Ss{constructor(e="en"){b(this,"currentLang","en");b(this,"activePhotoIndex",0);b(this,"selectedQtyKg",50);this.currentLang=e}setLanguage(e){this.currentLang=e}setActivePhotoIndex(e){this.activePhotoIndex=e}setSelectedQtyKg(e){this.selectedQtyKg=Math.max(1,e)}render(e){if(!e)return"";const t=H[this.currentLang],a=this.currentLang==="am",s=e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=80"],r=Math.min(this.activePhotoIndex,s.length-1),i=s[r],o=Math.max(e.minOrderKg||10,this.selectedQtyKg||e.minOrderKg||50),d=o*e.pricePerKg,c=Math.round(d*.9),n=Math.round(d*.05),f=Math.round(d*.05),v=e.marketBenchmarkPrice||e.pricePerKg*1.15,S=Math.max(0,v-e.pricePerKg),E=v>0?Math.round(S/v*100):0,w=e.description||`Freshly harvested Grade 1 ${e.productName} cultivated directly by smallholder farmer ${e.farmerName} in ${e.region}. Verified under Ethiopian agricultural commodity standards with 90% direct farmer escrow payout.`,x=e.descriptionAm||`በ${e.region} በአርሶ አደር ${e.farmerNameAm||e.farmerName} የተመረተ ምርጥ ደረጃ ${e.nameAm||e.productName}። በቴሌብር ዋስትና 90% ቀጥታ ለአርሶ አደሩ የሚከፈልበት ተመራጭ ምርት።`;return`
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
                    src="${i}" 
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
                      <i class="fa-solid fa-images text-emerald-400"></i> ${r+1} / ${s.length}
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
                      ${s.map((O,y)=>`
                        <button 
                          onclick="window.selectProducePhoto(${y})" 
                          class="relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${y===r?"border-emerald-600 ring-2 ring-emerald-500/30 scale-102 shadow-md":"border-slate-200 hover:border-emerald-400 opacity-70 hover:opacity-100"}"
                        >
                          <img src="${O}" alt="Photo angle ${y+1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
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
                      <i class="fa-solid fa-arrow-down"></i> ${E}% Direct Savings
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
                    Eliminates 3 intermediary middleman margins. You save <strong class="text-emerald-800 font-bold">${S.toFixed(1)} ETB/kg</strong> while smallholder receives full 90% value.
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
                  ${w}
                </p>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-800 lang-am text-xs font-medium leading-relaxed">
                  <span class="font-bold text-emerald-800 block mb-1">የምርት ዝርዝር መግለጫ (አማርኛ)፡</span>
                  ${x}
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
                    onclick="window.setProduceOrderQty(${Math.max(e.minOrderKg,o-50)})" 
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
                      value="${o}" 
                      onchange="window.setProduceOrderQty(Number(this.value))"
                      class="w-full h-11 bg-white/10 border border-white/20 rounded-xl px-3 text-center text-white font-extrabold text-base focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                    <span class="absolute right-3 top-3 text-xs text-slate-400 font-bold pointer-events-none">kg</span>
                  </div>

                  <button 
                    onclick="window.setProduceOrderQty(${Math.min(e.qtyKg,o+50)})" 
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
                  onclick="window.addProduceDetailToCart('${e.id}', ${o})" 
                  class="btn-secondary py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <i class="fa-solid fa-cart-plus text-emerald-700"></i>
                  ${t.addToCart} (${o} kg)
                </button>

                <button 
                  onclick="window.buyProduceNow('${e.id}', ${o})" 
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
    `}}const ke=new Ss;function Es(l,e=!1,t=!1,a=null,s=!1,r=!1,i=!1,o=null,d=!1,c=null){return`
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
    ${t&&a?(()=>{const n=p.getUserById(a);return n?`
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
    ${i?(()=>{var f,v,S,E;const n=o?p.getBannerById(o):null;return`
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

            <form onsubmit="window.handleSaveBannerSubmit(event, '${o||""}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
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
                  <option value="from-blue-900 via-indigo-950 to-slate-900" ${(v=n==null?void 0:n.themeGradient)!=null&&v.includes("blue")?"selected":""}>🔷 Royal Blue & Indigo (Legal/Fayda)</option>
                  <option value="from-amber-900 via-orange-950 to-slate-900" ${(S=n==null?void 0:n.themeGradient)!=null&&S.includes("amber")?"selected":""}>🔶 Amber & Orange (Freight Logistics)</option>
                  <option value="from-rose-950 via-slate-900 to-purple-950" ${(E=n==null?void 0:n.themeGradient)!=null&&E.includes("rose")?"selected":""}>👑 Rose & Purple (Super Admin Spotlight)</option>
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
    ${d&&c?(()=>{var f,v,S;const n=p.getListings().find(E=>E.id===c);return n?`
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
                    <option value="Grade 2 (Standard Wholesale)" ${(v=n.grade)!=null&&v.includes("2")||!n.grade?"selected":""}>Grade 2 (Standard Wholesale)</option>
                    <option value="Grade 3 (Processing / Bulk)" ${(S=n.grade)!=null&&S.includes("3")?"selected":""}>Grade 3 (Processing / Bulk)</option>
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
  `}const Te=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function ks(l,e){return`<button onclick="window.setBuyerAccountTab('${l.id}')" class="account-nav-item ${e===l.id?"active":""}">
    <i class="fa-solid ${l.icon} w-5 text-center"></i><span>${l.label}</span>
  </button>`}function Ts(l,e){const t=e.filter(s=>!["delivered","cancelled"].includes(s.status)),a=e.filter(s=>s.status==="delivered").length;return`<div class="space-y-6 animate-fade-in">
    <div class="account-welcome">
      <div><p class="account-kicker">BUYER ACCOUNT</p><h1>Good morning, ${l.name.split(" ")[0]}</h1><p>Everything you need to source, receive, and manage your produce orders.</p></div>
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
  </div>`}function $s(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR ACCOUNT</p><h1>Profile & personalization</h1><p>Keep your identity and delivery preferences up to date.</p></div>
    <section class="account-section"><div class="profile-header"><div class="avatar-large">${l.name.charAt(0).toUpperCase()}</div><div><h2>${l.name}</h2><p>${l.phone} · ${l.region||"Ethiopia"}</p></div><button class="btn-secondary ml-auto" onclick="window.showAccountToast('Avatar upload is ready for blob storage integration.','fa-image')"><i class="fa-solid fa-camera"></i> Change photo</button></div>
      <form onsubmit="event.preventDefault(); window.saveBuyerProfile()" class="account-form"><label>Full name<input name="name" value="${l.name}" required /></label><label>Amharic name<input name="nameAm" value="${l.nameAm||""}" placeholder="Optional" /></label><label>Region<input name="region" value="${l.region||"Addis Ababa"}" required /></label><label>Email<input type="email" name="email" value="${l.email||""}" placeholder="Optional" /></label><label>Preferred currency<select name="currency"><option>ETB - Ethiopian Birr</option><option>USD - US Dollar</option><option>EUR - Euro</option></select></label><label>Preferred language<select name="languagePreference"><option value="en" ${l.languagePreference==="en"?"selected":""}>English</option><option value="am" ${l.languagePreference==="am"?"selected":""}>Amharic</option></select></label>
        <div class="form-wide location-field"><div><span class="field-label">Default delivery address</span><input name="savedDeliveryAddress" value="${l.savedDeliveryAddress||""}" placeholder="Street, city, region" /><p>Order locations are captured separately at checkout.</p></div><button type="button" class="btn-secondary" onclick="window.captureBuyerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Use current location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save changes</button></div></form>
    </section></div>`}function Is(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">PURCHASE HISTORY</p><h1>My orders & shipping</h1><p>Track every delivery from farmer confirmation to your doorstep.</p></div><div class="account-tabs"><button class="selected">All <b>${l.length}</b></button><button>To pay <b>0</b></button><button>In transit <b>${l.filter(e=>["confirmed","picked_up"].includes(e.status)).length}</b></button><button>Delivered <b>${l.filter(e=>e.status==="delivered").length}</b></button><button>Disputed <b>${l.filter(e=>e.status==="disputed").length}</b></button></div><section class="account-section"><div class="account-list">${l.length?l.map(e=>`<div class="order-card"><div class="order-row"><div class="order-product"><span class="order-thumb"><i class="fa-solid fa-carrot"></i></span><div><strong>${e.productName}</strong><small>Order #${e.id.slice(0,8).toUpperCase()} · Farmer: ${e.farmerName}</small></div></div><span class="badge-status status-${e.status}">${e.status.replace("_"," ")}</span></div><div class="tracking-line"><span class="done"><i class="fa-solid fa-check"></i> Order placed</span><span class="${["confirmed","picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-check"></i> Farmer confirmed</span><span class="${["picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-truck"></i> In transit</span><span class="${e.status==="delivered"?"done":""}"><i class="fa-solid fa-house"></i> Delivered</span></div><div class="order-footer"><span>${e.qtyKg} kg · ${e.totalEtb.toLocaleString()} ETB</span><span>Payment: ${e.paymentRef||"Telebirr escrow"}</span><button class="text-action" onclick="window.showAccountToast('Live driver location will appear here when assigned.','fa-map-location-dot')">Track delivery <i class="fa-solid fa-arrow-right"></i></button></div></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-box-open"></i><p>Your order history will appear here.</p></div>'}</div></section></div>`}function Rs(l,e,t){var i;if(l==="addresses")return Cs(t.addresses);if(l==="payments")return Ps(t.paymentMethods);if(l==="disputes")return Ns(e);const s={coupons:{kicker:"SAVINGS",title:"My coupons",description:"Use platform, farmer, and referral rewards at checkout.",icon:"fa-ticket",rows:t.coupons.length?t.coupons.map(o=>`${o.code} · ${o.value}${o.discountType==="Percent"?"%":" ETB"} · Expires ${new Date(o.expiresAt).toLocaleDateString()}`):["No coupons are currently available · Coupons will appear here when issued by the platform or a farmer"]},addresses:{kicker:"DELIVERY",title:"Saved addresses",description:"Manage shipping destinations with flexible Ethiopian address details.",icon:"fa-location-dot",rows:t.addresses.length?t.addresses.map(o=>`${o.name} · ${o.street}, ${o.city}, ${o.region}${o.isDefaultShipping?" · Default shipping":""}`):["No saved addresses yet · Add your first address to speed up checkout"]},payments:{kicker:"CHECKOUT",title:"Payment methods",description:"Payment details stay with Telebirr or Chapa. This account shows references attached to your orders.",icon:"fa-wallet",rows:t.paymentMethods.length?t.paymentMethods.map(o=>`${o.provider} · ${o.maskedDisplay||"Provider token linked"}${o.isPrimary?" · Primary":""}`):e.length?e.map(o=>`${o.paymentRef||"Payment reference pending"} · Order #${o.id.slice(0,8).toUpperCase()} · ${o.totalEtb.toLocaleString()} ETB`):["No payment methods are linked yet"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Open a case for an order that was damaged, missing, wrong, or below quality.",icon:"fa-rotate-left",rows:e.filter(o=>o.status==="disputed").length?e.filter(o=>o.status==="disputed").map(o=>`${o.productName} · Order #${o.id.slice(0,8).toUpperCase()} · ${o.disputeStatus||"Under review"}`):["No open disputes · Refunds return through the original Telebirr or Chapa method","Dispute window: 3 days after delivery · Proof supports up to 5 images and 1 video"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Choose how Farmer-to-Market keeps you informed and how your data is used.",icon:"fa-sliders",rows:t.notificationPreferences.length?t.notificationPreferences.map(o=>`${o.eventType} · SMS ${o.smsEnabled?"on":"off"} · In-app ${o.inAppEnabled?"on":"off"}`):["No notification preferences saved yet · Defaults are applied by the server"]},security:{kicker:"PROTECTION",title:"Security",description:"Keep your account protected with password, two-factor authentication, and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the form below",`Two-factor authentication · ${(i=t.twoFactor)!=null&&i.isEnabled?`${t.twoFactor.method} enabled`:"Not enabled"}`,`Active sessions · ${t.sessions.length} active session${t.sessions.length===1?"":"s"}`]}}[l],r=l==="security"?'<form onsubmit="event.preventDefault(); window.changeBuyerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required /></label><label>New password<input type="password" name="newPassword" minlength="8" required /></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form><button class="btn-secondary mt-4" onclick="window.revokeBuyerSessions()"><i class="fa-solid fa-right-from-bracket"></i> Log out all other sessions</button>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${s.kicker}</p><h1>${s.title}</h1><p>${s.description}</p></div><section class="account-section"><div class="module-list">${s.rows.map(o=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${s.icon}"></i></span><div><strong>${o.split(" · ")[0]}</strong><p>${o.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div></div>`).join("")}</div>${r}</section></div>`}function Cs(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">DELIVERY</p><h1>Saved addresses</h1><p>Manage shipping destinations. Postal codes remain optional.</p></div><section class="account-section"><div class="module-list">${l.length?l.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid fa-location-dot"></i></span><div><strong>${e.name} ${e.isDefaultShipping?'<em class="account-badge">Default shipping</em>':""}</strong><p>${e.street}, ${e.city}, ${e.region}, ${e.country}<br>${e.phone}${e.postalCode?` · ${e.postalCode}`:""}</p></div><button class="icon-button" title="Delete address" onclick="window.deleteBuyerAddress('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-location-dot"></i><p>No saved addresses yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerAddress()" class="account-form mt-6"><label>Address name<input name="name" placeholder="Wholesale hub" required></label><label>Phone<input name="phone" placeholder="+251 9•• ••• •••" required></label><label>Street<input name="street" required></label><label>City<input name="city" required></label><label>Region<input name="region" required></label><label>Postal code<input name="postalCode" placeholder="Optional"></label><label>Country<input name="country" value="Ethiopia" required></label><label class="flex items-center gap-2"><input type="checkbox" name="isDefaultShipping"> Default shipping</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-plus"></i> Add address</button></div></form></section></div>`}function Ps(l){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">CHECKOUT</p><h1>Payment methods</h1><p>Use Telebirr or Chapa hosted tokenization. Raw card numbers never reach this app.</p></div><section class="account-section"><div class="module-list">${l.length?l.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${e.provider==="Telebirr"?"fa-mobile-screen-button":"fa-credit-card"}"></i></span><div><strong>${e.provider} ${e.isPrimary?'<em class="account-badge">Primary</em>':""}</strong><p>${e.maskedDisplay||"Provider token linked"}${e.brand?` · ${e.brand}`:""}</p></div>${e.isPrimary?"":`<button class="icon-button" title="Set primary" onclick="window.setPrimaryBuyerPayment('${e.id}')"><i class="fa-solid fa-star"></i></button>`}<button class="icon-button" title="Remove payment method" onclick="window.deleteBuyerPayment('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-wallet"></i><p>No payment methods linked yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerPayment()" class="account-form mt-6"><label>Provider<select name="provider"><option>Telebirr</option><option>Chapa</option></select></label><label>Provider token<input name="providerToken" placeholder="Paste hosted-provider token" required></label><label>Masked display<input name="maskedDisplay" placeholder="•••• 4242" required></label><label>Brand<input name="brand" placeholder="Visa / Telebirr"></label><label>Expiry month<input type="number" name="expiryMonth" min="1" max="12"></label><label>Expiry year<input type="number" name="expiryYear" min="2026"></label><label class="flex items-center gap-2"><input type="checkbox" name="isPrimary"> Set as primary</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-link"></i> Link payment method</button></div></form></section></div>`}function Ns(l){const e=l.filter(t=>{var a;return t.status==="delivered"||t.status==="disputed"||((a=t.disputeStatus)==null?void 0:a.startsWith("Resolved"))});return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">RESOLUTION CENTER</p><h1>Refunds & disputes</h1><p>Submit a claim for a delivered order. Refunds return through the original payment provider.</p></div><section class="account-section"><div class="module-list">${e.length?e.map(t=>{var a;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${t.disputeStatus==="ResolvedRefundBuyer"?"fa-money-bill-transfer":"fa-box-open"}"></i></span><div><strong>${t.productName}</strong><p>Order #${t.id.slice(0,8).toUpperCase()} · ${t.disputeStatus==="ResolvedRefundBuyer"?"Refunded to original payment method":t.disputeStatus||(t.status==="disputed"?"Under review":"Eligible for dispute")}</p></div>${t.status==="delivered"&&!((a=t.disputeStatus)!=null&&a.startsWith("Resolved"))?`<button class="btn-secondary" onclick="window.submitBuyerDispute('${t.id}')"><i class="fa-solid fa-flag"></i> Open dispute</button>`:""}</div>`}).join(""):'<div class="empty-account"><i class="fa-solid fa-circle-check"></i><p>No delivered orders are currently eligible for a dispute.</p></div>'}</div></section></div>`}function _s(l,e,t,a,s){const r=Te.find(o=>o.id===a)||Te[0];let i=a==="overview"?Ts(e,t):a==="profile"?$s(e):a==="orders"?Is(t):Rs(a,t,s);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${Te.map((o,d)=>`${o.group&&(d===0||Te[d-1].group!==o.group)?`<p class="account-nav-group">${o.group}</p>`:""}${ks(o,a)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Need a hand?</strong><span>Visit the Help Center</span><button onclick="window.showAccountToast('Help Center CMS content will open here.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('marketplace')">Marketplace</button><i class="fa-solid fa-chevron-right"></i><span>${r.label}</span></div>${i}</main></div>`}const $e=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Ds(l,e){return`<button onclick="window.setFarmerAccountTab('${l.id}')" class="account-nav-item ${e===l.id?"active":""}"><i class="fa-solid ${l.icon} w-5 text-center"></i><span>${l.label}</span></button>`}function Bs(l){return`<section class="account-section"><div class="section-heading"><div><p class="account-kicker">SELLER CENTER</p><h2>My produce posts</h2></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="module-list mt-5">${l.length?l.map(e=>`<div class="module-row"><span class="order-thumb"><img src="${e.photos[0]}" alt="${e.productName}" class="w-full h-full object-cover rounded-lg"></span><div><strong>${e.productName}</strong><p>${e.qtyKg.toLocaleString()} kg available · ${e.pricePerKg} ETB/kg · ${e.status}</p></div><button class="icon-button" title="Delete post" onclick="window.deleteFarmerListing('${e.id}')"><i class="fa-solid fa-trash text-rose-600"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-seedling"></i><p>You have no active produce posts.</p></div>'}</div></section>`}function Ne(l,e,t){const a=t.filter(o=>{var d;return o.status==="disputed"||((d=o.disputeStatus)==null?void 0:d.startsWith("Resolved"))});if(l==="profile")return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR FARM ACCOUNT</p><h1>Profile & personalization</h1><p>Update the public identity buyers see and your farm operating region.</p></div><section class="account-section"><div class="profile-header"><div class="avatar-large">${e.name.charAt(0).toUpperCase()}</div><div><h2>${e.name}</h2><p>${e.phone} · ${e.region}</p></div><span class="account-badge">${e.verified?"Verified farmer":"Verification pending"}</span></div><form onsubmit="event.preventDefault(); window.saveFarmerProfile()" class="account-form"><label>Full name<input name="name" value="${e.name}" required></label><label>Amharic name<input name="nameAm" value="${e.nameAm||""}" placeholder="Optional"></label><label>Farm region<input name="region" value="${e.region||""}" required></label><label>Email<input type="email" name="email" value="${e.email||""}" placeholder="Optional"></label><label>Preferred language<select name="languagePreference"><option value="en" ${e.languagePreference==="en"?"selected":""}>English</option><option value="am" ${e.languagePreference==="am"?"selected":""}>Amharic</option></select></label><label>Primary produce<input name="primaryCrop" value="${e.primaryCrop||""}" placeholder="Tomatoes, teff, coffee"></label><div class="form-wide location-field"><div><span class="field-label">Farm pickup address</span><input name="savedDeliveryAddress" value="${e.savedDeliveryAddress||""}" placeholder="Woreda, kebele, pickup details"><p>Buyers and drivers use this as the default farm location.</p></div><button type="button" class="btn-secondary" onclick="window.captureFarmerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Capture location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save profile</button></div></form></section></div>`;const r={orders:{kicker:"FULFILLMENT",title:"Orders & tracking",description:"Orders appear here after buyers pay. Confirm them so available drivers can pick them up.",icon:"fa-box-open",rows:t.length?t.map(o=>`${o.productName} · ${o.qtyKg} kg · ${o.status.replace("_"," ")}`):["No buyer orders yet"]},coupons:{kicker:"SELLER SAVINGS",title:"My coupons",description:"Farmer-issued coupon management will use your payout share.",icon:"fa-ticket",rows:["No farmer-issued coupons yet · Coupon creation API is ready for the next seller release"]},addresses:{kicker:"FARM LOCATION",title:"Saved addresses",description:"Manage farm pickup locations and operating regions.",icon:"fa-location-dot",rows:[`${e.region} · Farm pickup region`,"Additional pickup-address management is pending the farm-location API"]},payments:{kicker:"PAYOUTS",title:"Payment methods",description:"Manage the Telebirr payout destination for your 90% settlement.",icon:"fa-wallet",rows:[`Telebirr payout · ${e.phone} · 90% farmer share`,"Bank fallback · Not configured"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Respond to buyer claims and track payout impact.",icon:"fa-rotate-left",rows:a.length?a.map(o=>`${o.productName} · Order #${o.id.slice(0,8).toUpperCase()} · ${o.disputeStatus==="ResolvedRefundBuyer"?"Refunded to buyer":o.disputeStatus||"Under review"}`):["No buyer disputes"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Configure seller notifications and auto-accept preferences.",icon:"fa-sliders",rows:["Order updates · In-app notifications on","Dispute updates · SMS on","Auto-accept orders · Configure quantity threshold"]},security:{kicker:"PROTECTION",title:"Security",description:"Protect your farmer account with password and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the security form","Two-factor authentication · SMS recommended","Active sessions · Manage from the security API"]}}[l],i=l==="security"?'<form onsubmit="event.preventDefault(); window.changeFarmerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required></label><label>New password<input type="password" name="newPassword" minlength="8" required></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${r.kicker}</p><h1>${r.title}</h1><p>${r.description}</p></div><section class="account-section"><div class="module-list">${r.rows.map((o,d)=>{var c;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${r.icon}"></i></span><div><strong>${o.split(" · ")[0]}</strong><p>${o.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div>${l==="orders"&&((c=t[d])==null?void 0:c.status)==="pending"?`<button class="btn-secondary" onclick="window.confirmFarmerOrder('${t[d].id}')"><i class="fa-solid fa-check"></i> Confirm</button>`:""}</div>`}).join("")}</div>${i}</section></div>`}function Os(l,e,t,a,s,r=!1,i=[]){const o=$e.find(c=>c.id===s)||$e[0],d=s==="overview"?`<div class="space-y-6 animate-fade-in"><div class="account-welcome"><div><p class="account-kicker">FARMER ACCOUNT</p><h1>Welcome back, ${e.name.split(" ")[0]}</h1><p>Manage your produce posts, buyer orders, and payouts.</p></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="account-stat-grid"><div class="account-stat"><span class="stat-icon green"><i class="fa-solid fa-seedling"></i></span><div><strong>${t.length}</strong><span>Active posts</span></div></div><div class="account-stat"><span class="stat-icon blue"><i class="fa-solid fa-box"></i></span><div><strong>${a.filter(c=>c.status==="pending").length}</strong><span>New orders</span></div></div><div class="account-stat"><span class="stat-icon gold"><i class="fa-solid fa-truck"></i></span><div><strong>${a.filter(c=>c.status==="picked_up").length}</strong><span>In transit</span></div></div><div class="account-stat"><span class="stat-icon rose"><i class="fa-solid fa-hand-holding-dollar"></i></span><div><strong>${(e.walletBalanceEtb||0).toLocaleString()}</strong><span>Wallet ETB</span></div></div></div>${Bs(t)}</div>`:Ne(s==="profile"?"profile":s==="orders"?"orders":s,e,a);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${$e.map((c,n)=>`${c.group&&(n===0||$e[n-1].group!==c.group)?`<p class="account-nav-group">${c.group}</p>`:""}${Ds(c,s)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Farmer support</strong><span>Get help with orders and payouts</span><button onclick="window.showAccountToast('Support center integration is available from the farmer portal.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('farmer')">Farmer dashboard</button><i class="fa-solid fa-chevron-right"></i><span>${o.label}</span></div>${d}</main>${r?Qe(l):""}</div>`}function h(l,e="fa-circle-check",t="border-emerald-500"){const a=document.getElementById("toast-container");if(!a)return;const s=document.createElement("div");s.className=`toast-msg border-l-4 ${t} shadow-2xl`,s.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${l}</span>
  `,a.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(100%)",s.style.transition="all 0.3s ease-out",setTimeout(()=>s.remove(),300)},3500)}class Ls{constructor(){b(this,"lang",localStorage.getItem("lang")||"en");b(this,"activeTab","marketplace");b(this,"activeCategory","All");b(this,"selectedRegion","All");b(this,"searchQuery","");b(this,"cart",[]);b(this,"isCartOpen",!1);b(this,"isNotificationsModalOpen",!1);b(this,"isCreateListingModalOpen",!1);b(this,"activeOrderModal",null);b(this,"activeTelebirrModal",null);b(this,"activeDisputeModal",null);b(this,"activeProduceModalId",null);b(this,"activeProducePhotoIndex",0);b(this,"produceOrderQty",50);b(this,"activeLegalDocModal",null);b(this,"maxDistanceKm",0);b(this,"activeGrade","All");b(this,"activeRipeness","All");b(this,"organicOnly",!1);b(this,"advanceOnly",!1);b(this,"activeBuyerSubTab","marketplace");b(this,"activeBuyerAccountTab","overview");b(this,"activeFarmerAccountTab","overview");b(this,"activeFarmerTab","listings");b(this,"activeAdminTab","disputes");b(this,"activeSuperAdminTab","users");b(this,"superAdminUserRoleFilter","all");b(this,"superAdminAuditCategoryFilter","all");b(this,"isSuperAdminCreateUserModalOpen",!1);b(this,"isSuperAdminEditUserModalOpen",!1);b(this,"editTargetUserId",null);b(this,"isSuperAdminAddZoneModalOpen",!1);b(this,"isSuperAdminAddBlacklistModalOpen",!1);b(this,"isSuperAdminBannerModalOpen",!1);b(this,"editTargetBannerId",null);b(this,"isListingEditModalOpen",!1);b(this,"editTargetListingId",null);b(this,"selectedRbacRole","admin");b(this,"isRecordingVoice",!1);b(this,"voiceRecordTimer",null);b(this,"isAuthModalOpen",!1);b(this,"authMode","login");b(this,"otpStep",!1);b(this,"pendingPhone","");b(this,"lastSentCode","");b(this,"matchedUserName","");b(this,"matchedUserRole","");b(this,"authErrorMessage","");b(this,"agentView",new vs(this.lang));b(this,"verificationWizardModal",new xs(this.lang));this.init()}async init(){this.attachGlobalWindowHandlers(),ue.startConnection(p.getToken()||void 0),ue.onOrderStatusChanged(async(s,r,i)=>{console.log(`[SignalR] Order ${s} → ${r}: ${i}`),this.activeOrderModal&&this.activeOrderModal.id===s&&(this.activeOrderModal.status=r),h(`Order #${s.slice(0,8).toUpperCase()} → ${r.toUpperCase()}`,"fa-bolt","border-blue-500"),await p.refreshAllData(),this.render()}),ue.onNewFarmerOrder((s,r,i)=>{h(`🌾 New order! ${i}kg of ${r} — check your dashboard`,"fa-basket-shopping","border-amber-500"),p.refreshAllData().then(()=>this.render())}),ue.onDeliveryConfirmed((s,r,i)=>{const o=p.getCurrentUser();(o==null?void 0:o.role)==="farmer"?h(`💰 ${r.toLocaleString()} ETB released to your wallet!`,"fa-hand-holding-dollar","border-emerald-500"):(o==null?void 0:o.role)==="driver"&&h(`💰 ${i.toLocaleString()} ETB delivery fee credited!`,"fa-hand-holding-dollar","border-emerald-500"),p.refreshAllData().then(()=>this.render())}),ue.setPollingCallback(async s=>{await p.refreshAllData(),this.render()});const e=p.getCurrentUser();e&&e.role,ue.onOrderTracking(s=>{const r=document.getElementById(`eta-${s.orderId}`);r&&s.estimatedArrivalMin!=null&&s.estimatedArrivalMin>0&&(r.textContent=`~${s.estimatedArrivalMin} min`)});const t=()=>{const s=document.getElementById("signalr-status-badge");if(!s)return;const r=ue.getConnectionState(),i={connected:{dot:"bg-emerald-500",label:"Live",cls:"bg-emerald-50 text-emerald-800 border-emerald-300"},reconnecting:{dot:"bg-amber-400",label:"Reconnecting",cls:"bg-amber-50 text-amber-800 border-amber-300"},polling:{dot:"bg-sky-400",label:"Polling",cls:"bg-sky-50 text-sky-800 border-sky-300"},disconnected:{dot:"bg-slate-400",label:"Offline",cls:"bg-slate-50 text-slate-500 border-slate-200"}},o=i[r]||i.disconnected;s.className=`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${o.cls}`,s.innerHTML=`<span class="w-1.5 h-1.5 rounded-full ${o.dot} inline-block"></span> ${o.label}`};setInterval(t,3e3),t(),p.subscribe(()=>{this.render()}),await p.refreshAllData();const a=p.getCurrentUser();a&&(a.role==="superadmin"?this.activeTab="superadmin":a.role==="farmer"?this.activeTab="farmer":a.role==="driver"?this.activeTab="driver":a.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){var d;const e=document.getElementById("app");if(!e)return;const t=p.getCurrentUser(),a=p.isAuthenticated(),s=p.getNotifications(),r=s.filter(c=>!c.read).length;ye.setLanguage(this.lang);const i=p.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let o="";if(this.activeTab==="farmer-account"&&a&&((t==null?void 0:t.role)==="farmer"||(t==null?void 0:t.role)==="superadmin"))o=Os(this.lang,t,p.getListings().filter(c=>c.farmerId===t.id),p.getOrders("farmer"),this.activeFarmerAccountTab,this.isCreateListingModalOpen,p.getPriceBenchmarks());else if(this.activeTab==="farmer"&&a&&((t==null?void 0:t.role)==="farmer"||(t==null?void 0:t.role)==="superadmin")){const c=p.getListings().filter(v=>v.farmerId===t.id),n=p.getOrders("farmer"),f=p.getFarmerSummary();o=Zt(this.lang,c.length?c:p.getListings().slice(0,3),n,f,this.isCreateListingModalOpen,this.activeFarmerTab,p.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&a&&((t==null?void 0:t.role)==="driver"||(t==null?void 0:t.role)==="superadmin")){const c=p.getOrders("driver"),n=p.getDriverSummary();o=ts(this.lang,c,n,p.getOptimizedRoute(),t,p.getIsOfflineMode(),p.getOfflineQueue().length)}else if(this.activeTab==="superadmin"||a&&(t==null?void 0:t.role)==="superadmin"&&this.activeTab==="superadmin")o=ss(this.lang,this.activeSuperAdminTab,this.superAdminUserRoleFilter,this.superAdminAuditCategoryFilter,this.selectedRbacRole);else if(this.activeTab==="admin"&&a&&((t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="superadmin")){const c=p.getPlatformStats(),n=p.getOrders().filter(f=>{var v;return f.status==="disputed"&&!((v=f.disputeStatus)!=null&&v.startsWith("Resolved"))});o=hs(this.lang,c,n,p.getAnomalyAlerts(),p.getKycQueue(),p.getRegionalAnalytics(),this.activeAdminTab)}else if(this.activeTab==="agent"||a&&((t==null?void 0:t.role)==="agent"||(t==null?void 0:t.role)==="superadmin")&&this.activeTab==="agent")this.agentView.setLanguage(this.lang),o=this.agentView.render();else if(this.activeTab==="account"&&a&&((t==null?void 0:t.role)==="buyer"||(t==null?void 0:t.role)==="superadmin"))o=_s(this.lang,t,p.getOrders("buyer"),this.activeBuyerAccountTab,p.getAccountData());else{const c=p.getOrders("buyer");o=Yt(this.lang,i,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,p.getStandingOrders(),c)}e.innerHTML=`
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

      ${zt(this.lang,t,a,this.activeTab,this.cart,r,this.searchQuery)}
      
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
      ${this.isAuthModalOpen?ws(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage):""}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen?ys(this.lang,s):""}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

      <!-- Produce Post & Farm Details Modal -->
      ${(()=>{if(!this.activeProduceModalId)return"";const c=p.getListingById(this.activeProduceModalId);return c?(ke.setLanguage(this.lang),ke.setActivePhotoIndex(this.activeProducePhotoIndex),ke.setSelectedQtyKg(this.produceOrderQty),ke.render(c)):""})()}

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
              ${this.activeLegalDocModal.type==="invoice"?ye.renderInvoice(p.getTaxInvoice(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="waybill"?ye.renderWaybill(p.getTransportWaybill(this.activeLegalDocModal.orderId)):this.activeLegalDocModal.type==="contract"?ye.renderContract(p.getLegalContract(this.activeLegalDocModal.orderId)):ye.renderArbitration(p.getDisputeMediationRecord(this.activeLegalDocModal.orderId))}
            </div>
          </div>
        </div>
      `:""}

      <!-- Super Admin Governance Modals -->
      ${Es(this.lang,this.isSuperAdminCreateUserModalOpen,this.isSuperAdminEditUserModalOpen,this.editTargetUserId,this.isSuperAdminAddZoneModalOpen,this.isSuperAdminAddBlacklistModalOpen,this.isSuperAdminBannerModalOpen,this.editTargetBannerId,this.isListingEditModalOpen,this.editTargetListingId)}
    `}attachGlobalWindowHandlers(){const e=window;window.addEventListener("storage",s=>{s.key==="farmerMarketRolePermissions"&&(p.reloadRolePermissionsFromStorage(),this.render())}),e.openProduceDetail=s=>{this.activeProduceModalId=s,this.activeProducePhotoIndex=0;const r=p.getListingById(s);this.produceOrderQty=(r==null?void 0:r.minOrderKg)||50,this.render()},e.closeProduceDetail=()=>{this.activeProduceModalId=null,this.render()},e.selectProducePhoto=s=>{this.activeProducePhotoIndex=s,this.render()},e.setProduceOrderQty=s=>{this.produceOrderQty=Math.max(1,s),this.render()},e.addProduceDetailToCart=(s,r)=>{const i=p.getListingById(s);if(!i)return;const o=r||this.produceOrderQty||i.minOrderKg||50,d=this.cart.find(c=>c.listing.id===s);d?d.qtyKg+=o:this.cart.push({listing:i,qtyKg:o}),this.activeProduceModalId=null,this.isCartOpen=!0,h(this.lang==="am"?`${o} ኪ.ግ ${i.nameAm||i.productName} ወደ ጋሪ ተጨምሯል`:`Added ${o} kg of ${i.productName} to bulk cart!`,"fa-cart-plus"),this.render()},e.buyProduceNow=(s,r)=>{const i=p.getListingById(s);if(!i)return;if(!p.isAuthenticated()){e.openAuthModal("login");return}this.activeProduceModalId=null;const o=r||this.produceOrderQty||i.minOrderKg||50,d=o*i.pricePerKg;this.activeTelebirrModal={isOpen:!0,totalEtb:d,listingId:s,qtyKg:o},this.render()},e.shareProduceListing=s=>{const r=p.getListingById(s);navigator.clipboard&&navigator.clipboard.writeText(window.location.href),h(`Copied direct produce link for ${(r==null?void 0:r.productName)||"listing"}!`,"fa-share-nodes","border-blue-500")},e.playSimulatedVoiceNote=s=>{const r=document.getElementById("voicePlayIcon-"+s),i=document.getElementById("voicePlayText-"+s);r&&i&&(r.className="fa-solid fa-spinner fa-spin text-[10px]",i.innerText="Playing Memo...",setTimeout(()=>{r.className="fa-solid fa-check text-[10px]",i.innerText="Memo Played",setTimeout(()=>{r.className="fa-solid fa-play text-[10px]",i.innerText="Play Voice Memo"},2500)},1800)),h("Playing farmer voice note recorded in Bishoftu farm hub.","fa-volume-high","border-emerald-500")},e.sendSmsInquiry=(s,r)=>{h(`Dispatched SMS inquiry for ${r} to ${s}`,"fa-paper-plane","border-emerald-500")},e.navigateTab=s=>{this.activeTab=s,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setBuyerAccountTab=s=>{this.activeBuyerAccountTab=s,this.activeTab="account",p.fetchAccountData().then(()=>this.render()).catch(r=>h(r.message||"Could not load account data.","fa-circle-xmark","border-rose-500")),this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setFarmerAccountTab=s=>{this.activeFarmerAccountTab=s,this.activeTab="farmer-account",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.deleteFarmerListing=async s=>{if(window.confirm("Delete this produce post? It will no longer be available for new orders."))try{await p.deleteListing(s),h("Produce post deleted.","fa-trash"),this.render()}catch(r){h(r.message||"Could not delete the produce post.","fa-circle-xmark","border-rose-500")}},e.changeFarmerPassword=async()=>{const s=document.querySelector(".account-form");if(!s)return;const r=new FormData(s);try{await p.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),s.reset()}catch(i){h(i.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}},e.saveFarmerProfile=async()=>{const s=document.querySelector(".account-form");if(!s)return;const r=new FormData(s);try{await p.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:s.dataset.defaultLat?Number(s.dataset.defaultLat):void 0,defaultDeliveryLng:s.dataset.defaultLng?Number(s.dataset.defaultLng):void 0}),h("Farmer profile saved to your account.","fa-circle-check"),this.render()}catch(i){h(i.message||"Could not save farmer profile.","fa-circle-xmark","border-rose-500")}},e.captureFarmerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(s=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(s.coords.latitude),r.dataset.defaultLng=String(s.coords.longitude)),h("Farm location captured. Save profile to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.showAccountToast=(s,r="fa-circle-check")=>{h(s,r,"border-emerald-500")},e.saveBuyerProfile=async()=>{const s=document.querySelector(".account-form");if(!s)return;const r=new FormData(s);try{await p.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:s.dataset.defaultLat?Number(s.dataset.defaultLat):void 0,defaultDeliveryLng:s.dataset.defaultLng?Number(s.dataset.defaultLng):void 0}),h("Profile changes saved to your account.","fa-circle-check"),this.render()}catch(i){h(i.message||"Could not save your profile.","fa-circle-xmark","border-rose-500")}},e.captureBuyerLocation=()=>{if(!navigator.geolocation){h("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(s=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(s.coords.latitude)),r&&(r.dataset.defaultLng=String(s.coords.longitude)),h("Location captured. Save changes to persist it.","fa-location-crosshairs")},()=>h("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.changeBuyerPassword=async()=>{const s=document.querySelector(".account-form");if(!s)return;const r=new FormData(s);try{await p.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),h("Password changed successfully.","fa-shield-check"),s.reset()}catch(i){h(i.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}};const t=async(s,r)=>{try{await s(),h(r,"fa-circle-check"),this.render()}catch(i){h(i.message||"Account action failed.","fa-circle-xmark","border-rose-500")}};e.addBuyerAddress=()=>{const s=document.querySelector(".account-form");if(!s)return;const r=new FormData(s);t(()=>p.saveAddress({name:String(r.get("name")||""),phone:String(r.get("phone")||""),street:String(r.get("street")||""),city:String(r.get("city")||""),region:String(r.get("region")||""),postalCode:String(r.get("postalCode")||"")||null,country:String(r.get("country")||"Ethiopia"),isDefaultShipping:r.has("isDefaultShipping"),isDefaultBilling:!1}),"Address added.")},e.deleteBuyerAddress=s=>t(()=>p.deleteAddress(s),"Address deleted."),e.addBuyerPayment=()=>{const s=document.querySelector(".account-form");if(!s)return;const r=new FormData(s);t(()=>p.addPaymentMethod({provider:String(r.get("provider")||""),providerToken:String(r.get("providerToken")||""),maskedDisplay:String(r.get("maskedDisplay")||""),brand:String(r.get("brand")||"")||null,expiryMonth:Number(r.get("expiryMonth"))||null,expiryYear:Number(r.get("expiryYear"))||null,isPrimary:r.has("isPrimary")}),"Payment method linked.")},e.setPrimaryBuyerPayment=s=>t(()=>p.setPrimaryPaymentMethod(s),"Primary payment method updated."),e.deleteBuyerPayment=s=>t(()=>p.deletePaymentMethod(s),"Payment method removed."),e.submitBuyerDispute=s=>{const r=window.prompt("Reason: Item not received, Damaged, Wrong item, or Quality issue");r&&t(()=>p.disputeOrder(s,r,void 0,100),"Dispute submitted for review.")},e.revokeBuyerSessions=async()=>{try{await p.revokeOtherSessions(),h("Other sessions have been revoked.","fa-shield-check"),this.render()}catch(s){h(s.message||"Could not revoke sessions.","fa-circle-xmark","border-rose-500")}},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),h(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=s=>{this.activeBuyerSubTab=s,this.render()},e.toggleFarmerTab=s=>{this.activeFarmerTab=s,this.render()},e.setAdminTab=s=>{this.activeAdminTab=s,this.render()},e.openInvoiceModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"invoice",orderId:s},this.render()},e.openContractModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"contract",orderId:s},this.render()},e.openWaybillModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"waybill",orderId:s},this.render()},e.openArbitrationModal=s=>{this.activeLegalDocModal={isOpen:!0,type:"arbitration",orderId:s},this.render()},e.closeLegalDocModal=()=>{this.activeLegalDocModal=null,this.render()},e.printOfficialDocument=()=>{window.print()},e.setMaxDistanceKm=s=>{this.maxDistanceKm=s,h(s===0?"Showing all produce across Ethiopia":`Filtering farms within ${s} km radius`,"fa-location-dot"),this.render()},e.setFilterGrade=s=>{this.activeGrade=s,this.render()},e.setFilterRipeness=s=>{this.activeRipeness=s,this.render()},e.toggleOrganicFilter=s=>{this.organicOnly=s,this.render()},e.toggleAdvanceFilter=s=>{this.advanceOnly=s,this.render()},e.setCategory=s=>{this.activeCategory=s,this.render()},e.resetFilters=()=>{this.activeCategory="All",this.selectedRegion="All",this.searchQuery="",this.maxDistanceKm=0,this.activeGrade="All",this.activeRipeness="All",this.organicOnly=!1,this.advanceOnly=!1,this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async s=>{var y,R,j,z,Y,J,ee,Q,C,se,ae,A;s.preventDefault();const r=(y=document.getElementById("newProdName"))==null?void 0:y.value,i=(R=document.getElementById("newProdNameAm"))==null?void 0:R.value,o=((j=document.getElementById("newCategory"))==null?void 0:j.value)||"Vegetables",d=Number(((z=document.getElementById("newQtyKg"))==null?void 0:z.value)||1e3),c=Number(((Y=document.getElementById("newPricePerKg"))==null?void 0:Y.value)||45),n=Number(((J=document.getElementById("newMinOrderKg"))==null?void 0:J.value)||50),f=((ee=document.getElementById("newGrade"))==null?void 0:ee.value)||"Grade 1",v=((Q=document.getElementById("newRipeness"))==null?void 0:Q.value)||"Ready Today",S=((C=document.getElementById("newIsAdvanceHarvest"))==null?void 0:C.checked)||!1,E=((se=document.getElementById("newExpectedHarvestDate"))==null?void 0:se.value)||void 0,w=((A=(ae=document.getElementById("voiceTranscriptText"))==null?void 0:ae.innerText)==null?void 0:A.replace(/^"|"$/g,""))||void 0,x=p.getCurrentUser(),O=await p.createListing({productName:r,nameAm:i||void 0,category:o,qtyKg:d,pricePerKg:c,minOrderKg:n,grade:f,ripeness:v,isAdvanceHarvest:S,expectedHarvestDate:E,voiceNoteTranscript:w,farmerId:x==null?void 0:x.id,farmerName:x==null?void 0:x.name,farmerNameAm:x==null?void 0:x.nameAm,farmerPhone:x==null?void 0:x.phone,region:x==null?void 0:x.region});this.isCreateListingModalOpen=!1,X({particleCount:90,spread:60,origin:{y:.6}}),h(this.lang==="am"?"አዲስ ምርት በተሳካ ሁኔታ ተመዝግቧል!":`Published ${O.productName} successfully!`,"fa-circle-check"),this.render()},e.handleVoiceRecordToggle=()=>{const s=document.getElementById("voiceRecordBtn"),r=document.getElementById("voiceRecordLabel"),i=document.getElementById("voiceWaveAnimation"),o=document.getElementById("voiceTranscriptionResult");document.getElementById("voiceTranscriptText"),this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription("am")):(this.isRecordingVoice=!0,r&&(r.innerText="Stop & Transcribe (አቁም)"),s&&(s.classList.remove("bg-emerald-600"),s.classList.add("bg-red-600")),i&&i.classList.remove("hidden"),o&&o.classList.add("hidden"),h("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription("am")},3500))},e.finishVoiceTranscription=s=>{this.isRecordingVoice=!1;const r=document.getElementById("voiceRecordLabel"),i=document.getElementById("voiceWaveAnimation"),o=document.getElementById("voiceTranscriptionResult"),d=document.getElementById("voiceTranscriptText");r&&(r.innerText="Record Voice Note (ድምጽ ቅጂ)"),i&&i.classList.add("hidden");const c=p.simulateVoiceTranscription(4,s),n=document.getElementById("newProdName"),f=document.getElementById("newProdNameAm"),v=document.getElementById("newCategory"),S=document.getElementById("newQtyKg"),E=document.getElementById("newPricePerKg");n&&(n.value=c.productName),f&&(f.value=c.nameAm),v&&(v.value=c.category),S&&(S.value=c.qtyKg.toString()),E&&(E.value=c.pricePerKg.toString()),o&&d&&(d.innerText=`"${c.transcript}"`,o.classList.remove("hidden")),X({particleCount:60,spread:50,origin:{y:.6}}),h("Voice Note Transcribed! Form auto-filled in Amharic.","fa-wand-magic-sparkles")},e.handleSimulateSms=async s=>{s.preventDefault();const r=document.getElementById("smsPhone").value,i=document.getElementById("smsCommand").value,o=document.getElementById("smsResponseBox"),d=document.getElementById("smsResponseText");o&&d&&(d.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',o.classList.remove("hidden"));const c=await p.sendInboundSms(r,i);d&&(d.innerHTML=`&gt; ${c}`),h("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const s=p.getCurrentUser(),r=(s==null?void 0:s.walletBalanceEtb)||48200;if(r<=0){h("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}p.requestWalletWithdrawal(r,(s==null?void 0:s.phone)||"+251911223344"),X({particleCount:100,spread:70,origin:{y:.6}}),h(`Instant Payout of ${r.toLocaleString()} ETB deposited to Telebirr (${(s==null?void 0:s.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=s=>{if(!p.isAuthenticated()){e.openAuthModal("login");return}p.addStandingOrder(s,150,"Weekly"),X({particleCount:70,spread:60,origin:{y:.6}}),h("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=s=>{p.toggleStandingOrder(s),h("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=s=>{const r=p.getOrders().find(i=>i.id===s);r&&(this.activeDisputeModal={isOpen:!0,order:r},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(s,r)=>{s.preventDefault();const i=document.getElementById("disputeReasonInput").value,o=document.getElementById("disputePhotoUrl").value,d=document.getElementById("disputeRefundSlider").value;await p.disputeOrder(r,i,o,parseInt(d,10)),this.activeDisputeModal=null,this.activeOrderModal=null,h("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const s=p.toggleOfflineMode();h(s?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const s=await p.syncOfflineQueue();h(`Synced ${s} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async s=>{const r=p.getOptimizedRoute();r.stops[s]&&(r.stops[s].completed=!0,X({particleCount:50,spread:50,origin:{y:.6}}),h(`Stop #${s+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async s=>{await p.pickupOrderByDriver(s,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),h("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async s=>{await p.confirmDeliveryByBuyer(s,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),X({particleCount:120,spread:70,origin:{y:.6}}),h("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(s,r)=>{await p.verifyKyc(s,r),h(r?"Identity & Documents Approved!":"KYC verification rejected",r?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=s=>{h(`Anomaly Alert #${s} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=s=>{h(`Audit trail opened for Anomaly #${s}`,"fa-magnifying-glass")},e.openAuthModal=(s="login")=>{this.authMode=s,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=s=>{this.authMode=s,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=s=>{this.pendingPhone=s.replace("+251","").trim(),this.authErrorMessage="",this.render();const r=document.getElementById("authPhoneInput");r&&(r.value=this.pendingPhone,r.focus())},e.switchToRegisterWithPhone=s=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=s.replace("+251","").trim(),this.render()},e.handleRequestOtp=async s=>{s.preventDefault();const r=document.getElementById("authPhoneInput").value.trim();if(!r||r.length<8){h("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const i=document.getElementById("requestOtpBtn");i&&(i.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',i.disabled=!0),this.pendingPhone=r,this.authErrorMessage="";try{const o=await p.requestOtp(r);this.lastSentCode=o.demoCode||"",this.matchedUserName=o.userName||"",this.matchedUserRole=o.role||"",this.otpStep=!0,h(`SMS verification code dispatched to +251 ${r}`,"fa-comment-sms","border-emerald-500")}catch(o){this.authErrorMessage=o.message||"No account registered with this phone number. Please register first."}this.render()},e.handleVerifyOtp=async s=>{var o;s.preventDefault();const r=(o=document.getElementById("authOtpInput")||document.getElementById("otpCodeInput"))==null?void 0:o.value.trim();if(!r||r.length!==6){h("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const i=document.getElementById("verifyOtpBtn");i&&(i.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',i.disabled=!0);try{const d=await p.verifyOtp(this.pendingPhone,r);this.isAuthModalOpen=!1,this.otpStep=!1,this.authErrorMessage="",d.role==="superadmin"?this.activeTab="superadmin":d.role==="farmer"?this.activeTab="farmer":d.role==="driver"?this.activeTab="driver":d.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",X({particleCount:100,spread:70,origin:{y:.6}}),h(`Welcome back, ${d.name}! (${d.role.toUpperCase()})`,"fa-circle-check","border-emerald-500")}catch(d){this.authErrorMessage=d.message||"Invalid OTP code. Please try again."}this.render()};const a=async s=>{var f,v,S,E,w;s.preventDefault();const r=((f=document.getElementById("regName"))==null?void 0:f.value.trim())||"",i=((v=document.getElementById("regNameAm"))==null?void 0:v.value.trim())||r,o=((S=document.getElementById("regPhone"))==null?void 0:S.value.trim())||"",d=((E=document.getElementById("regRegion"))==null?void 0:E.value)||"Oromia (Bishoftu)",c=((w=document.querySelector('input[name="regRole"]:checked'))==null?void 0:w.value)||"buyer",n=document.getElementById("registerSubmitBtn");n&&(n.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...',n.disabled=!0);try{const x=await p.registerUser(r,i,o,c,d);this.isAuthModalOpen=!1,this.authErrorMessage="",x.role==="farmer"?this.activeTab="farmer":x.role==="driver"?this.activeTab="driver":x.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",X({particleCount:150,spread:90,origin:{y:.6}}),h(`Welcome to Farmer-to-Market, ${x.name}!`,"fa-circle-check","border-emerald-500")}catch(x){this.authErrorMessage=x.message||"Registration failed. Please try a different phone number."}this.render()};e.handleRegisterUser=a,e.handleRegisterSubmit=a,e.handleLogout=()=>{p.logout(),this.activeTab="marketplace",this.cart=[],h("Logged out successfully","fa-arrow-right-from-bracket"),this.render()},e.switchDemoUser=async s=>{try{const r=await p.requestOtp(s);if(r.demoCode){const i=await p.verifyOtp(s,r.demoCode);i.role==="farmer"?this.activeTab="farmer":i.role==="driver"?this.activeTab="driver":i.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",X({particleCount:80,spread:60,origin:{y:.6}}),h(`Switched to profile: ${i.name} (${i.role.toUpperCase()})`,"fa-user-shield")}}catch(r){h("Demo switch failed: "+r.message,"fa-circle-xmark","border-red-500")}this.render()},e.addToCart=s=>{const r=p.getListingById(s);if(!r)return;const i=this.cart.find(o=>o.listing.id===s);i?i.qtyKg+=r.minOrderKg:this.cart.push({listing:r,qtyKg:r.minOrderKg}),h(`Added ${r.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(s,r)=>{const i=this.cart.find(o=>o.listing.id===s);i&&(r<=0?this.cart=this.cart.filter(o=>o.listing.id!==s):i.qtyKg=r),this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.openTelebirrModal=s=>{if(!p.isAuthenticated()){e.openAuthModal("login");return}this.activeTelebirrModal={isOpen:!0,totalEtb:s},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.handleTelebirrSubmit=async s=>{var r;s.preventDefault();try{const i=document.getElementById("checkoutAddress"),o=document.querySelector('input[name="checkoutPayment"]:checked'),d=i==null?void 0:i.value,c=p.getAccountData().addresses.find(S=>S.id===d);if(!c||!o){h("Choose a shipping address and payment method first.","fa-circle-exclamation","border-amber-500");return}const n=`${c.street}, ${c.city}, ${c.region}, ${c.country}`,f=this.cart.length?this.cart:(r=this.activeTelebirrModal)!=null&&r.listingId?[{listing:p.getListingById(this.activeTelebirrModal.listingId),qtyKg:this.activeTelebirrModal.qtyKg||0}]:[];if(!f.length||!f[0].listing)throw new Error("The selected produce is no longer available.");let v=null;for(const S of f){const E=S.listing;if(!E)throw new Error("The selected produce is no longer available.");v=await p.placeOrder(E.id,S.qtyKg,n,!1,"Weekly",o.value==="telebirr-wallet"?void 0:o.value)}this.cart=[],this.isCartOpen=!1,this.activeTelebirrModal=null,X({particleCount:150,spread:80,origin:{y:.6}}),h(`Payment authorized via ${o.value==="telebirr-wallet"?"Telebirr":"your selected provider"}. Farmer notified; driver follows after farmer confirmation.`,"fa-lock","border-blue-500"),v&&(this.activeOrderModal=v)}catch(i){h("Order placement failed: "+i.message,"fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=s=>{const i=p.getOrders().find(o=>o.id===s);i&&(this.activeOrderModal=i,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.confirmFarmerOrder=async s=>{await p.confirmOrderByFarmer(s),ue.joinOrder(s),h("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async s=>{await p.confirmDeliveryByBuyer(s),X({particleCount:150,spread:80,origin:{y:.6}}),h("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),this.render()},e.adminResolveDispute=async(s,r)=>{try{await p.resolveDispute(s,r),h(`Dispute resolved: ${r}. Buyer and farmer records updated.`,"fa-gavel","border-purple-500"),this.render()}catch(i){h(i.message||"Could not resolve the dispute.","fa-circle-xmark","border-rose-500")}},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async s=>{var w;s.preventDefault();const r=document.getElementById("newProdName").value,i=document.getElementById("newProdNameAm").value,o=document.getElementById("newCategory").value,d=parseFloat(document.getElementById("newQtyKg").value),c=parseFloat(document.getElementById("newPricePerKg").value),n=parseFloat(document.getElementById("newMinOrderKg").value),f=document.getElementById("newGrade").value,v=document.getElementById("newRipeness").value,S=document.getElementById("newIsAdvanceHarvest").checked,E=(w=document.getElementById("newExpectedHarvestDate"))==null?void 0:w.value;try{await p.createListing({productName:r,nameAm:i,category:o,qtyKg:d,pricePerKg:c,minOrderKg:n,grade:f,ripeness:v,isOrganic:!0,isAdvanceHarvest:S,expectedHarvestDate:S?E:void 0,availableFrom:S&&E?E:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,h(`Published ${r} to marketplace!`,"fa-cloud-arrow-up")}catch(x){h(x.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleAdminBroadcastSms=async s=>{s.preventDefault();const r=document.getElementById("smsTargetRole").value,i=document.getElementById("smsMsgEn").value,o=document.getElementById("smsMsgAm").value;await p.broadcastSms(i,o,r),h(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to smallholders via Twilio!","fa-paper-plane"),this.render()},e.openVerificationWizard=(s=1)=>{this.verificationWizardModal.setLanguage(this.lang),this.verificationWizardModal.open(s)},e.closeVerificationWizard=()=>{this.verificationWizardModal.close()},e.setWizardStep=s=>{this.verificationWizardModal.setStep(s)},e.updateWizardField=(s,r)=>{this.verificationWizardModal.updateField(s,r)},e.submitVerificationForm=async()=>{await this.verificationWizardModal.submit(),X({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"ሰነዶችዎ ደርሰውናል! በ24 ሰዓት ውስጥ ይገመገማሉ።":"Documents submitted! Verification under 24-hour review.","fa-shield-check","border-emerald-500"),this.render()},e.switchAgentTab=s=>{this.agentView.switchTab(s),this.render()},e.setUssdInput=s=>{this.agentView.setUssdInput(s)},e.sendUssdCommand=async()=>{await this.agentView.executeUssd()},e.sendInboundSms=async()=>{const s=document.getElementById("inboundSmsBody"),r=(s==null?void 0:s.value)||"FAYDA FAN-8812-4091-2810";h(this.lang==="am"?`የኤስኤምኤስ ትዕዛዝ ተቀብለናል፡ "${r}"`:`Inbound SMS processed: "${r}"`,"fa-comment-sms","border-blue-500"),await p.refreshAllData(),this.render()},e.handleAgentRegisterSubmit=async s=>{var S,E,w,x,O;s.preventDefault();const r=document.getElementById("agFarmerName").value,i=(S=document.getElementById("agFarmerNameAm"))==null?void 0:S.value,o=document.getElementById("agFarmerPhone").value,d=document.getElementById("agFarmerRegion").value,c=(E=document.getElementById("agFarmerKebele"))==null?void 0:E.value,n=(w=document.getElementById("agFarmerCrop"))==null?void 0:w.value,f=(x=document.getElementById("agFarmerFayda"))==null?void 0:x.value,v=(O=document.getElementById("agFarmerTin"))==null?void 0:O.value;try{await p.agentRegisterFarmer({name:r,nameAm:i,phone:o,region:d,kebele:c,primaryCrop:n,faydaId:f,tinNumber:v}),X({particleCount:120,spread:80,origin:{y:.6}}),h(this.lang==="am"?`${r} ተመዝግቧል! የማረጋገጫ ኤስኤምኤስ ተልኳል።`:`Farmer ${r} registered! Welcome SMS dispatched.`,"fa-user-check","border-emerald-500"),this.agentView.switchTab("roster"),this.render()}catch(y){h("Registration failed: "+y.message,"fa-circle-xmark","border-red-500")}},e.sendAgentFarmerSms=s=>{h(this.lang==="am"?`ኤስኤምኤስ ወደ ${s} ተልኳል!`:`SMS dispatch sent to ${s}!`,"fa-paper-plane","border-blue-500")},e.adminReviewVerification=async(s,r)=>{let i,o;if(r==="Reject"){if(o=prompt(this.lang==="am"?"እባክዎ ውድቅ የተደረገበትን ምክንያት ያስገቡ (ለምሳሌ፡ የፋይዳ ፎቶው ግልጽ አይደለም / የታክስ ቁጥር አልተገኘም):":"Enter rejection reason to notify the user via SMS (e.g. Blurry ID photo / TIN mismatch):","Blurry Fayda ID photo. Please re-upload clear image.")||void 0,!o)return}else i="Identity & TIN verified against Ministry of Revenues registry.";await p.reviewVerification(s,r,i,o),r==="Approve"?(X({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?"የተጠቃሚው ማረጋገጫ ጸድቋል! የኤስኤምኤስ መልእክት ተልኳል።":"User account APPROVED! SMS confirmation dispatched.","fa-circle-check","border-emerald-500")):h(this.lang==="am"?"ማረጋገጫው ውድቅ ተደርጓል፤ ምክንያቱ በኤስኤምኤስ ተልኳል።":"Verification rejected & reason SMS sent to user.","fa-triangle-exclamation","border-amber-500"),this.render()},e.setSuperAdminTab=s=>{this.activeSuperAdminTab=s,this.render()},e.setRbacSelectedRole=s=>{this.selectedRbacRole=s,this.render()},e.handleToggleRolePermission=(s,r,i)=>{p.updateRolePermissionKey(s,r,i),h(i?`Granted "${r}" to ${s.toUpperCase()}`:`Revoked "${r}" from ${s.toUpperCase()}`,"fa-shield-halved",i?"border-emerald-500":"border-amber-500"),this.render()},e.resetAllRolePermissions=()=>{confirm("Reset all roles to factory default permissions?")&&(p.resetRolePermissions(),X({particleCount:90,spread:60,origin:{y:.6}}),h("Reset all role permissions to factory defaults!","fa-rotate-left","border-emerald-500"),this.render())},e.setUserRoleFilter=s=>{this.superAdminUserRoleFilter=s,this.render()},e.setAuditCategoryFilter=s=>{this.superAdminAuditCategoryFilter=s,this.render()},e.openCreateUserModal=()=>{if(!p.hasPermission("MANAGE_USERS")){h("Unauthorized: You lack MANAGE_USERS permission.","fa-lock","border-red-500");return}this.isSuperAdminCreateUserModalOpen=!0,this.render()},e.openEditUserModal=s=>{if(!p.hasPermission("MANAGE_USERS")){h("Unauthorized: You lack MANAGE_USERS permission.","fa-lock","border-red-500");return}this.editTargetUserId=s,this.isSuperAdminEditUserModalOpen=!0,this.render()},e.openAddZoneModal=()=>{if(!p.hasPermission("MANAGE_TRADE_ZONES")){h("Unauthorized: You lack MANAGE_TRADE_ZONES permission.","fa-lock","border-red-500");return}this.isSuperAdminAddZoneModalOpen=!0,this.render()},e.openAddBlacklistModal=()=>{if(!p.hasPermission("MANAGE_BLACKLIST")){h("Unauthorized: You lack MANAGE_BLACKLIST permission.","fa-lock","border-red-500");return}this.isSuperAdminAddBlacklistModalOpen=!0,this.render()},e.openCreateBannerModal=()=>{if(!p.hasPermission("MANAGE_BANNERS")){h("Unauthorized: You lack MANAGE_BANNERS permission.","fa-lock","border-red-500");return}this.editTargetBannerId=null,this.isSuperAdminBannerModalOpen=!0,this.render()},e.openEditBannerModal=s=>{if(!p.hasPermission("MANAGE_BANNERS")){h("Unauthorized: You lack MANAGE_BANNERS permission.","fa-lock","border-red-500");return}this.editTargetBannerId=s,this.isSuperAdminBannerModalOpen=!0,this.render()},e.handleSaveBannerSubmit=(s,r)=>{var j,z,Y,J,ee,Q,C,se,ae,A,K,U,fe,Se;s.preventDefault();const i=(j=document.getElementById("bannerTitleInput"))==null?void 0:j.value,o=((z=document.getElementById("bannerTitleAmInput"))==null?void 0:z.value)||void 0,d=((Y=document.getElementById("bannerSubtitleInput"))==null?void 0:Y.value)||void 0,c=((J=document.getElementById("bannerSubtitleAmInput"))==null?void 0:J.value)||void 0,n=(ee=document.getElementById("bannerAudienceSelect"))==null?void 0:ee.value,f=((Q=document.getElementById("bannerRegionSelect"))==null?void 0:Q.value)||"All",v=Number((C=document.getElementById("bannerPriorityInput"))==null?void 0:C.value)||5,S=((se=document.getElementById("bannerBadgeInput"))==null?void 0:se.value)||void 0,E=((ae=document.getElementById("bannerBadgeAmInput"))==null?void 0:ae.value)||void 0,w=((A=document.getElementById("bannerCtaTextInput"))==null?void 0:A.value)||"Browse Marketplace",x=((K=document.getElementById("bannerCtaLinkSelect"))==null?void 0:K.value)||"marketplace",O=(U=document.getElementById("bannerImageUrlInput"))==null?void 0:U.value,y=(fe=document.getElementById("bannerGradientSelect"))==null?void 0:fe.value,R=((Se=document.getElementById("bannerIsActiveCheck"))==null?void 0:Se.checked)??!0;r?(p.updateBanner(r,{title:i,titleAm:o,subtitle:d,subtitleAm:c,targetAudience:n,targetRegion:f,priority:v,badgeText:S,badgeTextAm:E,ctaText:w,ctaLink:x,imageUrl:O,themeGradient:y,isActive:R}),h(`Updated promotional banner: "${i}"`,"fa-panorama","border-emerald-500")):(p.createBanner({title:i,titleAm:o,subtitle:d,subtitleAm:c,targetAudience:n,targetRegion:f,priority:v,badgeText:S,badgeTextAm:E,ctaText:w,ctaLink:x,imageUrl:O,themeGradient:y,isActive:R}),X({particleCount:90,spread:60,origin:{y:.6}}),h(`Published new banner: "${i}"!`,"fa-panorama","border-emerald-500")),this.isSuperAdminBannerModalOpen=!1,this.editTargetBannerId=null,this.render()},e.toggleBannerStatus=s=>{const r=p.getBannerById(s);if(!r)return;const i=!r.isActive;p.toggleBannerStatus(s,i),h(i?`Activated banner: "${r.title}"`:`Paused banner: "${r.title}"`,"fa-panorama",i?"border-emerald-500":"border-slate-500"),this.render()},e.deleteBanner=s=>{const r=p.getBannerById(s);r&&confirm(`Are you sure you want to delete banner "${r.title}"?`)&&(p.deleteBanner(s),h(`Deleted banner: "${r.title}"`,"fa-trash","border-red-500"),this.render())},e.openAdminEditListingModal=s=>{this.editTargetListingId=s,this.isListingEditModalOpen=!0,this.render()},e.handleAdminEditListingSubmit=(s,r)=>{var y,R,j,z,Y,J,ee,Q,C,se,ae,A;s.preventDefault();const i=(y=document.getElementById("listingNameInput"))==null?void 0:y.value,o=((R=document.getElementById("listingNameAmInput"))==null?void 0:R.value)||void 0,d=(j=document.getElementById("listingCategorySelect"))==null?void 0:j.value,c=(z=document.getElementById("listingGradeSelect"))==null?void 0:z.value,n=(Y=document.getElementById("listingModerationStatusSelect"))==null?void 0:Y.value,f=Number((J=document.getElementById("listingPriceInput"))==null?void 0:J.value),v=Number((ee=document.getElementById("listingQtyInput"))==null?void 0:ee.value),S=Number((Q=document.getElementById("listingMinOrderInput"))==null?void 0:Q.value)||50,E=(C=document.getElementById("listingRegionInput"))==null?void 0:C.value,w=((se=document.getElementById("listingDescInput"))==null?void 0:se.value)||void 0,x=((ae=document.getElementById("listingOrganicCheck"))==null?void 0:ae.checked)??!1,O=((A=document.getElementById("listingAdvanceHarvestCheck"))==null?void 0:A.checked)??!1;p.adminUpdateListing(r,{productName:i,nameAm:o,category:d,grade:c,moderationStatus:n,pricePerKg:f,qtyKg:v,minOrderKg:S,region:E,description:w,isOrganic:x,isAdvanceHarvest:O}),this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Saved moderation changes for "${i}"!`,"fa-gavel","border-purple-500"),this.render()},e.adminDeleteListing=s=>{const r=p.getListings().find(d=>d.id===s);if(!r)return;const i=prompt(this.lang==="am"?"እባክዎ የተሰረዘበትን ምክንያት ያስገቡ:":"Please enter the reason for removing this listing post:","Violates marketplace quality & pricing policies");if(i===null)return;p.adminDeleteListing(s,i)?(this.isListingEditModalOpen=!1,this.editTargetListingId=null,h(`Deleted produce post: "${r.productName}"`,"fa-trash","border-red-500")):h("Failed to delete produce post","fa-triangle-exclamation","border-red-500"),this.render()},e.flagListingAnomaly=s=>{const r=p.getListings().find(i=>i.id===s);r&&(p.flagListingAnomaly(s,"Manual Admin Anomaly Flag"),h(`Flagged "${r.productName}" for price/quality inspection!`,"fa-flag","border-amber-500"),this.render())},e.closeSuperAdminModal=()=>{this.isSuperAdminCreateUserModalOpen=!1,this.isSuperAdminEditUserModalOpen=!1,this.isSuperAdminAddZoneModalOpen=!1,this.isSuperAdminAddBlacklistModalOpen=!1,this.isSuperAdminBannerModalOpen=!1,this.isListingEditModalOpen=!1,this.editTargetUserId=null,this.editTargetBannerId=null,this.editTargetListingId=null,this.render()},e.handleRoleChangeInModal=s=>{const r=document.getElementById("roleSpecificFields");r&&(s==="farmer"?r.innerHTML=`
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
        `:s==="driver"?r.innerHTML=`
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
        `:s==="buyer"?r.innerHTML=`
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
        `:s==="admin"?r.innerHTML=`
          <div>
            <label class="block mb-2 font-bold text-slate-700">Admin Permissions Assigned</label>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Manage Users & KYC</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Arbitrate Disputes</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Broadcast SMS</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> View Tax Reports</label>
            </div>
          </div>
        `:s==="superadmin"&&(r.innerHTML=`
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
            👑 Grants full unrestricted platform access, killswitches, impersonation engine, and escrow governance.
          </div>
        `))},e.handleCreateUserSubmit=s=>{var R,j,z,Y,J,ee,Q,C,se,ae,A,K,U,fe;s.preventDefault();const r=(R=document.getElementById("newRoleSelect"))==null?void 0:R.value,i=(j=document.getElementById("newNameInput"))==null?void 0:j.value,o=((z=document.getElementById("newNameAmInput"))==null?void 0:z.value)||void 0,d=(Y=document.getElementById("newPhoneInput"))==null?void 0:Y.value,c=(J=document.getElementById("newRegionInput"))==null?void 0:J.value,n=((ee=document.getElementById("newVerifiedCheck"))==null?void 0:ee.checked)??!0,f=((Q=document.getElementById("newPrimaryCropInput"))==null?void 0:Q.value)||void 0,v=((C=document.getElementById("newKebeleInput"))==null?void 0:C.value)||void 0,S=((se=document.getElementById("newFaydaInput"))==null?void 0:se.value)||void 0,E=((ae=document.getElementById("newTinInput"))==null?void 0:ae.value)||void 0,w=((A=document.getElementById("newVehicleTypeInput"))==null?void 0:A.value)||void 0,x=Number((K=document.getElementById("newCapacityInput"))==null?void 0:K.value)||void 0,O=((U=document.getElementById("newRefrigInput"))==null?void 0:U.value)||void 0,y=((fe=document.getElementById("newLicenseInput"))==null?void 0:fe.value)||void 0;p.createUser({role:r,name:i,nameAm:o,phone:d,region:c,verified:n,status:"active",primaryCrop:f,kebele:v,faydaId:S,tinNumber:E,vehicleType:w,vehicleCapacityKg:x,refrigerationType:O,businessLicenseNumber:y}),this.isSuperAdminCreateUserModalOpen=!1,X({particleCount:100,spread:70,origin:{y:.6}}),h(this.lang==="am"?`አዲስ ${r.toUpperCase()} መለያ ተፈጥሯል: ${i}`:`Created ${r.toUpperCase()} account: ${i}!`,"fa-user-check","border-rose-500"),this.render()},e.handleEditUserSubmit=(s,r)=>{var S,E,w,x,O,y,R;s.preventDefault();const i=(S=document.getElementById("editNameInput"))==null?void 0:S.value,o=(E=document.getElementById("editPhoneInput"))==null?void 0:E.value,d=(w=document.getElementById("editRoleSelect"))==null?void 0:w.value,c=(x=document.getElementById("editStatusSelect"))==null?void 0:x.value,n=(O=document.getElementById("editRegionInput"))==null?void 0:O.value,f=((y=document.getElementById("editFaydaInput"))==null?void 0:y.value)||void 0,v=((R=document.getElementById("editTinInput"))==null?void 0:R.value)||void 0;p.updateUser(r,{name:i,phone:o,role:d,status:c,region:n,faydaId:f,tinNumber:v}),this.isSuperAdminEditUserModalOpen=!1,this.editTargetUserId=null,h(`Updated user profile: ${i}`,"fa-user-pen","border-emerald-500"),this.render()},e.toggleUserSuspension=s=>{try{const r=p.toggleUserSuspension(s),i=r.status==="suspended";h(i?this.lang==="am"?`የተጠቃሚ ${r.name} መለያ ታግዷል`:`Suspended account access for ${r.name}`:this.lang==="am"?`የተጠቃሚ ${r.name} መለያ እገዳ ተነስቷል`:`Reinstated account access for ${r.name}`,i?"fa-user-slash":"fa-user-check",i?"border-red-500":"border-emerald-500")}catch(r){h(r.message||"Error updating user status","fa-triangle-exclamation","border-red-500")}this.render()},e.deleteUserAccount=s=>{const r=p.getUserById(s);if(!r)return;const i=this.lang==="am"?`ተጠቃሚ '${r.name}' (${r.phone})ን በቋሚነት መሰረዝ ይፈልጋሉ? ይህ እርምጃ ሊመለስ አይችልም።`:`Are you sure you want to permanently delete user '${r.name}' (${r.phone})? This action cannot be undone.`;if(!confirm(i))return;p.deleteUser(s)?h(this.lang==="am"?`ተጠቃሚ '${r.name}' በቋሚነት ተሰርዟል`:`Permanently deleted user: ${r.name}`,"fa-trash","border-red-500"):h("Failed to delete user account","fa-triangle-exclamation","border-red-500"),this.render()},e.startSuperAdminImpersonation=s=>{const r=p.startImpersonation(s);r&&(window.isSuperAdminImpersonating=!0,h(`Logged in as ${r.name} (${r.role.toUpperCase()})`,"fa-user-secret","border-rose-500"),r.role==="farmer"?this.activeTab="farmer":r.role==="driver"?this.activeTab="driver":r.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.render(),window.scrollTo({top:0,behavior:"smooth"}))},e.stopSuperAdminImpersonation=()=>{p.stopImpersonation(),window.isSuperAdminImpersonating=!1,h("Exited impersonation. Returned to Super Admin dashboard.","fa-crown","border-rose-500"),this.activeTab="superadmin",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.updateEscrowSliders=s=>{const r=document.getElementById("farmerShareInput"),i=document.getElementById("driverShareInput"),o=document.getElementById("platformShareInput");if(!r||!i||!o)return;let d=Number(r.value),c=Number(i.value),n=Number(o.value);if(s==="farmer"){const f=100-d;c=Math.round(f/2),n=f-c,i.value=c.toString(),o.value=n.toString()}document.getElementById("farmerShareDisplay").innerText=`${r.value}%`,document.getElementById("driverShareDisplay").innerText=`${i.value}%`,document.getElementById("platformShareDisplay").innerText=`${o.value}%`},e.handleSaveSuperAdminConfig=s=>{var x,O,y,R,j,z,Y,J,ee,Q,C;s.preventDefault();const r=Number((x=document.getElementById("farmerShareInput"))==null?void 0:x.value)||90,i=Number((O=document.getElementById("driverShareInput"))==null?void 0:O.value)||5,o=Number((y=document.getElementById("platformShareInput"))==null?void 0:y.value)||5,d=Number((R=document.getElementById("cfgWithholdingTax"))==null?void 0:R.value)||2,c=Number((j=document.getElementById("cfgHighValueThreshold"))==null?void 0:j.value)||5e4,n=((z=document.getElementById("cfgTelebirrAppId"))==null?void 0:z.value)||"",f=((Y=document.getElementById("cfgTelebirrShortCode"))==null?void 0:Y.value)||"",v=((J=document.getElementById("cfgTelebirrApiKey"))==null?void 0:J.value)||"",S=((ee=document.getElementById("cfgTwilioSid"))==null?void 0:ee.value)||"",E=((Q=document.getElementById("cfgTwilioToken"))==null?void 0:Q.value)||"",w=((C=document.getElementById("cfgTwilioFrom"))==null?void 0:C.value)||"";p.updatePlatformConfig({farmerSharePercent:r,driverSharePercent:i,platformFeePercent:o,withholdingTaxPercent:d,highValuePayoutThresholdEtb:c,telebirrAppId:n,telebirrShortCode:f,telebirrApiKey:v,twilioAccountSid:S,twilioAuthToken:E,twilioFromNumber:w}),h("Platform configuration and escrow splits saved!","fa-floppy-disk","border-emerald-500"),this.render()},e.approveHighValuePayout=s=>{const r=p.getCurrentUser();p.approvePayout(s,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)")&&(X({particleCount:90,spread:60,origin:{y:.6}}),h("High-value Telebirr payout approved & released!","fa-circle-check","border-emerald-500"),this.render())},e.rejectHighValuePayout=s=>{const r=p.getCurrentUser();p.rejectPayout(s,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)","Manual Super Admin audit flag"),h("Payout declined & flagged for compliance investigation.","fa-ban","border-red-500"),this.render()},e.toggleFeatureFlag=s=>{const r=p.toggleFeatureFlag(s);h(`${r.name}: ${r.enabled?"ENABLED":"DISABLED"}`,"fa-toggle-on",r.enabled?"border-emerald-500":"border-slate-500"),this.render()},e.toggleEmergencyEscrowFreeze=()=>{const r=!p.getPlatformConfig().emergencyEscrowFrozen;p.updatePlatformConfig({emergencyEscrowFrozen:r}),r?(alert(`EMERGENCY ESCROW FREEZE ACTIVATED!
All automatic Telebirr payouts and order releases have been halted platform-wide.`),h("EMERGENCY ESCROW FREEZE ACTIVATED!","fa-lock","border-red-500")):h("Platform escrow unfrozen. Normal operations restored.","fa-lock-open","border-emerald-500"),this.render()},e.handleAddZoneSubmit=s=>{var f,v,S,E,w,x;s.preventDefault();const r=(f=document.getElementById("zoneNameInput"))==null?void 0:f.value,i=(v=document.getElementById("zoneHubInput"))==null?void 0:v.value,o=Number((S=document.getElementById("zoneLatInput"))==null?void 0:S.value),d=Number((E=document.getElementById("zoneLngInput"))==null?void 0:E.value),c=Number((w=document.getElementById("zoneRadiusInput"))==null?void 0:w.value),n=Number((x=document.getElementById("zoneBonusInput"))==null?void 0:x.value);p.addDeliveryZone({name:r,clusterHubName:i,centerLatitude:o,centerLongitude:d,baseRadiusKm:c,maxRadiusKm:c*2.5,ruralSubsidyEtb:n,active:!0,smallholdersCount:500}),this.isSuperAdminAddZoneModalOpen=!1,h(`Added regional delivery zone: ${r}`,"fa-map-location-dot","border-teal-500"),this.render()},e.deleteZone=s=>{p.deleteDeliveryZone(s),h("Delivery zone removed.","fa-trash","border-slate-500"),this.render()},e.handleAddBlacklistSubmit=s=>{var c,n,f;s.preventDefault();const r=(c=document.getElementById("blTypeSelect"))==null?void 0:c.value,i=(n=document.getElementById("blValueInput"))==null?void 0:n.value,o=(f=document.getElementById("blReasonInput"))==null?void 0:f.value,d=p.getCurrentUser();p.addToBlacklist({type:r,value:i,reason:o,blacklistedBy:(d==null?void 0:d.name)||"Super Admin",active:!0}),this.isSuperAdminAddBlacklistModalOpen=!1,h(`Entity blacklisted: ${i}`,"fa-ban","border-red-500"),this.render()},e.removeFromBlacklist=s=>{p.removeFromBlacklist(s),h("Entity removed from blacklist.","fa-circle-check","border-emerald-500"),this.render()},e.handleSaveBusinessRules=s=>{var c,n,f,v;s.preventDefault();const r=Number((c=document.getElementById("ruleMinOrderKg"))==null?void 0:c.value)||10,i=Number((n=document.getElementById("ruleMaxOrderKg"))==null?void 0:n.value)||5e4,o=Number((f=document.getElementById("ruleMaxDistanceKm"))==null?void 0:f.value)||450,d=Number((v=document.getElementById("rulePriceCeiling"))==null?void 0:v.value)||250;p.updateGlobalBusinessRules({minOrderKg:r,maxOrderKg:i,maxDistanceKm:o,priceCeilingVariancePercent:d}),h("Global trading business rules saved!","fa-gavel","border-emerald-500"),this.render()},e.triggerDbBackup=()=>{const s=p.triggerDatabaseBackup();X({particleCount:80,spread:60,origin:{y:.6}}),h(`PostgreSQL backup snapshot generated (${s.backupId})!`,"fa-database","border-blue-500"),this.render()},e.exportPlatformData=s=>{const r=p.exportPlatformData(s),i=document.createElement("a");i.href=r.dataUrl,i.download=r.filename,document.body.appendChild(i),i.click(),document.body.removeChild(i),h(`Downloaded full platform data export (${s.toUpperCase()})!`,"fa-download","border-emerald-500"),this.render()}}}new Ls;
