var Ye=Object.defineProperty;var Ze=(o,e,t)=>e in o?Ye(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var S=(o,e,t)=>Ze(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();var me={};(function o(e,t,s,r){var a=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),n=typeof Path2D=="function"&&typeof DOMMatrix=="function",l=(function(){if(!e.OffscreenCanvas)return!1;try{var d=new OffscreenCanvas(1,1),c=d.getContext("2d");c.fillRect(0,0,1,1);var g=d.transferToImageBitmap();c.createPattern(g,"no-repeat")}catch{return!1}return!0})();function i(){}function f(d){var c=t.exports.Promise,g=c!==void 0?c:e.Promise;return typeof g=="function"?new g(d):(d(i,i),null)}var p=(function(d,c){return{transform:function(g){if(d)return g;if(c.has(g))return c.get(g);var v=new OffscreenCanvas(g.width,g.height),k=v.getContext("2d");return k.drawImage(g,0,0),c.set(g,v),v},clear:function(){c.clear()}}})(l,new Map),$=(function(){var d=Math.floor(16.666666666666668),c,g,v={},k=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(c=function(_){var C=Math.random();return v[C]=requestAnimationFrame(function b(T){k===T||k+d-1<T?(k=T,delete v[C],_()):v[C]=requestAnimationFrame(b)}),C},g=function(_){v[_]&&cancelAnimationFrame(v[_])}):(c=function(_){return setTimeout(_,d)},g=function(_){return clearTimeout(_)}),{frame:c,cancel:g}})(),m=(function(){var d,c,g={};function v(k){function _(C,b){k.postMessage({options:C||{},callback:b})}k.init=function(b){var T=b.transferControlToOffscreen();k.postMessage({canvas:T},[T])},k.fire=function(b,T,A){if(c)return _(b,null),c;var R=Math.random().toString(36).slice(2);return c=f(function(D){function O(N){N.data.callback===R&&(delete g[R],k.removeEventListener("message",O),c=null,p.clear(),A(),D())}k.addEventListener("message",O),_(b,R),g[R]=O.bind(null,{data:{callback:R}})}),c},k.reset=function(){k.postMessage({reset:!0});for(var b in g)g[b](),delete g[b]}}return function(){if(d)return d;if(!s&&a){var k=["var CONFETTI, SIZE = {}, module = {};","("+o.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{d=new Worker(URL.createObjectURL(new Blob([k])))}catch(_){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",_),null}v(d)}return d}})(),W={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function K(d,c){return c?c(d):d}function G(d){return d!=null}function h(d,c,g){return K(d&&G(d[c])?d[c]:W[c],g)}function J(d){return d<0?0:Math.floor(d)}function le(d,c){return Math.floor(Math.random()*(c-d))+d}function w(d){return parseInt(d,16)}function X(d){return d.map(Ie)}function Ie(d){var c=String(d).replace(/[^0-9a-f]/gi,"");return c.length<6&&(c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2]),{r:w(c.substring(0,2)),g:w(c.substring(2,4)),b:w(c.substring(4,6))}}function Me(d){var c=h(d,"origin",Object);return c.x=h(c,"x",Number),c.y=h(c,"y",Number),c}function Re(d){d.width=document.documentElement.clientWidth,d.height=document.documentElement.clientHeight}function Oe(d){var c=d.getBoundingClientRect();d.width=c.width,d.height=c.height}function Be(d){var c=document.createElement("canvas");return c.style.position="fixed",c.style.top="0px",c.style.left="0px",c.style.pointerEvents="none",c.style.zIndex=d,c}function Le(d,c,g,v,k,_,C,b,T){d.save(),d.translate(c,g),d.rotate(_),d.scale(v,k),d.arc(0,0,1,C,b,T),d.restore()}function Ne(d){var c=d.angle*(Math.PI/180),g=d.spread*(Math.PI/180);return{x:d.x,y:d.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:d.startVelocity*.5+Math.random()*d.startVelocity,angle2D:-c+(.5*g-Math.random()*g),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:d.color,shape:d.shape,tick:0,totalTicks:d.ticks,decay:d.decay,drift:d.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:d.gravity*3,ovalScalar:.6,scalar:d.scalar,flat:d.flat}}function Fe(d,c){c.x+=Math.cos(c.angle2D)*c.velocity+c.drift,c.y+=Math.sin(c.angle2D)*c.velocity+c.gravity,c.velocity*=c.decay,c.flat?(c.wobble=0,c.wobbleX=c.x+10*c.scalar,c.wobbleY=c.y+10*c.scalar,c.tiltSin=0,c.tiltCos=0,c.random=1):(c.wobble+=c.wobbleSpeed,c.wobbleX=c.x+10*c.scalar*Math.cos(c.wobble),c.wobbleY=c.y+10*c.scalar*Math.sin(c.wobble),c.tiltAngle+=.1,c.tiltSin=Math.sin(c.tiltAngle),c.tiltCos=Math.cos(c.tiltAngle),c.random=Math.random()+2);var g=c.tick++/c.totalTicks,v=c.x+c.random*c.tiltCos,k=c.y+c.random*c.tiltSin,_=c.wobbleX+c.random*c.tiltCos,C=c.wobbleY+c.random*c.tiltSin;if(d.fillStyle="rgba("+c.color.r+", "+c.color.g+", "+c.color.b+", "+(1-g)+")",d.beginPath(),n&&c.shape.type==="path"&&typeof c.shape.path=="string"&&Array.isArray(c.shape.matrix))d.fill(He(c.shape.path,c.shape.matrix,c.x,c.y,Math.abs(_-v)*.1,Math.abs(C-k)*.1,Math.PI/10*c.wobble));else if(c.shape.type==="bitmap"){var b=Math.PI/10*c.wobble,T=Math.abs(_-v)*.1,A=Math.abs(C-k)*.1,R=c.shape.bitmap.width*c.scalar,D=c.shape.bitmap.height*c.scalar,O=new DOMMatrix([Math.cos(b)*T,Math.sin(b)*T,-Math.sin(b)*A,Math.cos(b)*A,c.x,c.y]);O.multiplySelf(new DOMMatrix(c.shape.matrix));var N=d.createPattern(p.transform(c.shape.bitmap),"no-repeat");N.setTransform(O),d.globalAlpha=1-g,d.fillStyle=N,d.fillRect(c.x-R/2,c.y-D/2,R,D),d.globalAlpha=1}else if(c.shape==="circle")d.ellipse?d.ellipse(c.x,c.y,Math.abs(_-v)*c.ovalScalar,Math.abs(C-k)*c.ovalScalar,Math.PI/10*c.wobble,0,2*Math.PI):Le(d,c.x,c.y,Math.abs(_-v)*c.ovalScalar,Math.abs(C-k)*c.ovalScalar,Math.PI/10*c.wobble,0,2*Math.PI);else if(c.shape==="star")for(var E=Math.PI/2*3,j=4*c.scalar,U=8*c.scalar,q=c.x,Q=c.y,Y=5,z=Math.PI/Y;Y--;)q=c.x+Math.cos(E)*U,Q=c.y+Math.sin(E)*U,d.lineTo(q,Q),E+=z,q=c.x+Math.cos(E)*j,Q=c.y+Math.sin(E)*j,d.lineTo(q,Q),E+=z;else d.moveTo(Math.floor(c.x),Math.floor(c.y)),d.lineTo(Math.floor(c.wobbleX),Math.floor(k)),d.lineTo(Math.floor(_),Math.floor(C)),d.lineTo(Math.floor(v),Math.floor(c.wobbleY));return d.closePath(),d.fill(),c.tick<c.totalTicks}function je(d,c,g,v,k){var _=c.slice(),C=d.getContext("2d"),b,T,A=f(function(R){function D(){b=T=null,C.clearRect(0,0,v.width,v.height),p.clear(),k(),R()}function O(){s&&!(v.width===r.width&&v.height===r.height)&&(v.width=d.width=r.width,v.height=d.height=r.height),!v.width&&!v.height&&(g(d),v.width=d.width,v.height=d.height),C.clearRect(0,0,v.width,v.height),_=_.filter(function(N){return Fe(C,N)}),_.length?b=$.frame(O):D()}b=$.frame(O),T=D});return{addFettis:function(R){return _=_.concat(R),A},canvas:d,promise:A,reset:function(){b&&$.cancel(b),T&&T()}}}function ve(d,c){var g=!d,v=!!h(c||{},"resize"),k=!1,_=h(c,"disableForReducedMotion",Boolean),C=a&&!!h(c||{},"useWorker"),b=C?m():null,T=g?Re:Oe,A=d&&b?!!d.__confetti_initialized:!1,R=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,D;function O(E,j,U){for(var q=h(E,"particleCount",J),Q=h(E,"angle",Number),Y=h(E,"spread",Number),z=h(E,"startVelocity",Number),Ue=h(E,"decay",Number),qe=h(E,"gravity",Number),Ve=h(E,"drift",Number),ye=h(E,"colors",X),ze=h(E,"ticks",Number),ke=h(E,"shapes"),Ge=h(E,"scalar"),Je=!!h(E,"flat"),_e=Me(E),Se=q,he=[],Qe=d.width*_e.x,Xe=d.height*_e.y;Se--;)he.push(Ne({x:Qe,y:Xe,angle:Q,spread:Y,startVelocity:z,color:ye[Se%ye.length],shape:ke[le(0,ke.length)],ticks:ze,decay:Ue,gravity:qe,drift:Ve,scalar:Ge,flat:Je}));return D?D.addFettis(he):(D=je(d,he,T,j,U),D.promise)}function N(E){var j=_||h(E,"disableForReducedMotion",Boolean),U=h(E,"zIndex",Number);if(j&&R)return f(function(z){z()});g&&D?d=D.canvas:g&&!d&&(d=Be(U),document.body.appendChild(d)),v&&!A&&T(d);var q={width:d.width,height:d.height};b&&!A&&b.init(d),A=!0,b&&(d.__confetti_initialized=!0);function Q(){if(b){var z={getBoundingClientRect:function(){if(!g)return d.getBoundingClientRect()}};T(z),b.postMessage({resize:{width:z.width,height:z.height}});return}q.width=q.height=null}function Y(){D=null,v&&(k=!1,e.removeEventListener("resize",Q)),g&&d&&(document.body.contains(d)&&document.body.removeChild(d),d=null,A=!1)}return v&&!k&&(k=!0,e.addEventListener("resize",Q,!1)),b?b.fire(E,q,Y):O(E,q,Y)}return N.reset=function(){b&&b.reset(),D&&D.reset()},N}var ue;function we(){return ue||(ue=ve(null,{useWorker:!0,resize:!0})),ue}function He(d,c,g,v,k,_,C){var b=new Path2D(d),T=new Path2D;T.addPath(b,new DOMMatrix(c));var A=new Path2D;return A.addPath(T,new DOMMatrix([Math.cos(C)*k,Math.sin(C)*k,-Math.sin(C)*_,Math.cos(C)*_,g,v])),A}function We(d){if(!n)throw new Error("path confetti are not supported in this browser");var c,g;typeof d=="string"?c=d:(c=d.path,g=d.matrix);var v=new Path2D(c),k=document.createElement("canvas"),_=k.getContext("2d");if(!g){for(var C=1e3,b=C,T=C,A=0,R=0,D,O,N=0;N<C;N+=2)for(var E=0;E<C;E+=2)_.isPointInPath(v,N,E,"nonzero")&&(b=Math.min(b,N),T=Math.min(T,E),A=Math.max(A,N),R=Math.max(R,E));D=A-b,O=R-T;var j=10,U=Math.min(j/D,j/O);g=[U,0,0,U,-Math.round(D/2+b)*U,-Math.round(O/2+T)*U]}return{type:"path",path:c,matrix:g}}function Ke(d){var c,g=1,v="#000000",k='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof d=="string"?c=d:(c=d.text,g="scalar"in d?d.scalar:g,k="fontFamily"in d?d.fontFamily:k,v="color"in d?d.color:v);var _=10*g,C=""+_+"px "+k,b=new OffscreenCanvas(_,_),T=b.getContext("2d");T.font=C;var A=T.measureText(c),R=Math.ceil(A.actualBoundingBoxRight+A.actualBoundingBoxLeft),D=Math.ceil(A.actualBoundingBoxAscent+A.actualBoundingBoxDescent),O=2,N=A.actualBoundingBoxLeft+O,E=A.actualBoundingBoxAscent+O;R+=O+O,D+=O+O,b=new OffscreenCanvas(R,D),T=b.getContext("2d"),T.font=C,T.fillStyle=v,T.fillText(c,N,E);var j=1/g;return{type:"bitmap",bitmap:b.transferToImageBitmap(),matrix:[j,0,0,j,-R*j/2,-D*j/2]}}t.exports=function(){return we().apply(this,arguments)},t.exports.reset=function(){we().reset()},t.exports.create=ve,t.exports.shapeFromPath=We,t.exports.shapeFromText=Ke})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),me,!1);const re=me.exports;me.exports.create;class Z extends Error{constructor(e,t){const s=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=s}}class ge extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class V extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class et extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=s}}class tt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=s}}class st extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=s}}class $e extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class rt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=s}}class Ae{constructor(e,t,s){this.statusCode=e,this.statusText=t,this.content=s}}class pe{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var u;(function(o){o[o.Trace=0]="Trace",o[o.Debug=1]="Debug",o[o.Information=2]="Information",o[o.Warning=3]="Warning",o[o.Error=4]="Error",o[o.Critical=5]="Critical",o[o.None=6]="None"})(u||(u={}));class ie{constructor(){}log(e,t){}}ie.instance=new ie;const at="8.0.29";class B{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,s){if(!(e in t))throw new Error(`Unknown ${s} value: ${e}.`)}}class M{static get isBrowser(){return!M.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!M.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!M.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function oe(o,e){let t="";return te(o)?(t=`Binary data of length ${o.byteLength}`,e&&(t+=`. Content: '${it(o)}'`)):typeof o=="string"&&(t=`String data of length ${o.length}`,e&&(t+=`. Content: '${o}'`)),t}function it(o){const e=new Uint8Array(o);let t="";return e.forEach(s=>{const r=s<16?"0":"";t+=`0x${r}${s.toString(16)} `}),t.substr(0,t.length-1)}function te(o){return o&&typeof ArrayBuffer<"u"&&(o instanceof ArrayBuffer||o.constructor&&o.constructor.name==="ArrayBuffer")}async function De(o,e,t,s,r,a){const n={},[l,i]=se();n[l]=i,o.log(u.Trace,`(${e} transport) sending data. ${oe(r,a.logMessageContent)}.`);const f=te(r)?"arraybuffer":"text",p=await t.post(s,{content:r,headers:{...n,...a.headers},responseType:f,timeout:a.timeout,withCredentials:a.withCredentials});o.log(u.Trace,`(${e} transport) request complete. Response status: ${p.statusCode}.`)}function ot(o){return o===void 0?new de(u.Information):o===null?ie.instance:o.log!==void 0?o:new de(o)}class nt{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class de{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const s=`[${new Date().toISOString()}] ${u[e]}: ${t}`;switch(e){case u.Critical:case u.Error:this.out.error(s);break;case u.Warning:this.out.warn(s);break;case u.Information:this.out.info(s);break;default:this.out.log(s);break}}}}function se(){let o="X-SignalR-User-Agent";return M.isNode&&(o="User-Agent"),[o,lt(at,ct(),pt(),dt())]}function lt(o,e,t,s){let r="Microsoft SignalR/";const a=o.split(".");return r+=`${a[0]}.${a[1]}`,r+=` (${o}; `,e&&e!==""?r+=`${e}; `:r+="Unknown OS; ",r+=`${t}`,s?r+=`; ${s}`:r+="; Unknown Runtime Version",r+=")",r}function ct(){if(M.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function dt(){if(M.isNode)return process.versions.node}function pt(){return M.isNode?"NodeJS":"Browser"}function fe(o){return o.stack?o.stack:o.message?o.message:`${o}`}function ut(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class ht extends pe{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||M.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(ut());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new V;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let s;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),s=new V});let r=null;if(e.timeout){const i=e.timeout;r=setTimeout(()=>{t.abort(),this._logger.log(u.Warning,"Timeout from HTTP request."),s=new ge},i)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},te(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let a;try{a=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(i){throw s||(this._logger.log(u.Warning,`Error from HTTP request. ${i}.`),i)}finally{r&&clearTimeout(r),e.abortSignal&&(e.abortSignal.onabort=null)}if(!a.ok){const i=await Ce(a,"text");throw new Z(i||a.statusText,a.status)}const l=await Ce(a,e.responseType);return new Ae(a.status,a.statusText,l)}getCookieString(e){let t="";return M.isNode&&this._jar&&this._jar.getCookies(e,(s,r)=>t=r.join("; ")),t}}function Ce(o,e){let t;switch(e){case"arraybuffer":t=o.arrayBuffer();break;case"text":t=o.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=o.text();break}return t}class ft extends pe{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new V):e.method?e.url?new Promise((t,s)=>{const r=new XMLHttpRequest;r.open(e.method,e.url,!0),r.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,r.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(te(e.content)?r.setRequestHeader("Content-Type","application/octet-stream"):r.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const a=e.headers;a&&Object.keys(a).forEach(n=>{r.setRequestHeader(n,a[n])}),e.responseType&&(r.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{r.abort(),s(new V)}),e.timeout&&(r.timeout=e.timeout),r.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),r.status>=200&&r.status<300?t(new Ae(r.status,r.statusText,r.response||r.responseText)):s(new Z(r.response||r.responseText||r.statusText,r.status))},r.onerror=()=>{this._logger.log(u.Warning,`Error from HTTP request. ${r.status}: ${r.statusText}.`),s(new Z(r.statusText,r.status))},r.ontimeout=()=>{this._logger.log(u.Warning,"Timeout from HTTP request."),s(new ge)},r.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class mt extends pe{constructor(e){if(super(),typeof fetch<"u"||M.isNode)this._httpClient=new ht(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new ft(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new V):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class H{static write(e){return`${e}${H.RecordSeparator}`}static parse(e){if(e[e.length-1]!==H.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(H.RecordSeparator);return t.pop(),t}}H.RecordSeparatorCode=30;H.RecordSeparator=String.fromCharCode(H.RecordSeparatorCode);class gt{writeHandshakeRequest(e){return H.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,s;if(te(e)){const l=new Uint8Array(e),i=l.indexOf(H.RecordSeparatorCode);if(i===-1)throw new Error("Message is incomplete.");const f=i+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(l.slice(0,f))),s=l.byteLength>f?l.slice(f).buffer:null}else{const l=e,i=l.indexOf(H.RecordSeparator);if(i===-1)throw new Error("Message is incomplete.");const f=i+1;t=l.substring(0,f),s=l.length>f?l.substring(f):null}const r=H.parse(t),a=JSON.parse(r[0]);if(a.type)throw new Error("Expected a handshake response from the server.");return[s,a]}}var y;(function(o){o[o.Invocation=1]="Invocation",o[o.StreamItem=2]="StreamItem",o[o.Completion=3]="Completion",o[o.StreamInvocation=4]="StreamInvocation",o[o.CancelInvocation=5]="CancelInvocation",o[o.Ping=6]="Ping",o[o.Close=7]="Close",o[o.Ack=8]="Ack",o[o.Sequence=9]="Sequence"})(y||(y={}));class bt{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new nt(this,e)}}class xt{constructor(e,t,s){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=s}async _send(e){const t=this._protocol.writeMessage(e);let s=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let r=()=>{},a=()=>{};te(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(s=new Promise((n,l)=>{r=n,a=l})),this._messages.push(new vt(t,this._totalMessageCount,r,a))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await s}_ack(e){let t=-1;for(let s=0;s<this._messages.length;s++){const r=this._messages[s];if(r._id<=e.sequenceId)t=s,te(r._message)?this._bufferedByteCount-=r._message.byteLength:this._bufferedByteCount-=r._message.length,r._resolver();else if(this._bufferedByteCount<this._bufferSize)r._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==y.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:y.Sequence,sequenceId:e}));const t=this._messages;for(const s of t)await this._connection.send(s._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case y.Invocation:case y.StreamItem:case y.Completion:case y.StreamInvocation:case y.CancelInvocation:return!0;case y.Close:case y.Sequence:case y.Ping:case y.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:y.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class vt{constructor(e,t,s,r){this._message=e,this._id=t,this._resolver=s,this._rejector=r}}const wt=30*1e3,yt=15*1e3,kt=1e5;var I;(function(o){o.Disconnected="Disconnected",o.Connecting="Connecting",o.Connected="Connected",o.Disconnecting="Disconnecting",o.Reconnecting="Reconnecting"})(I||(I={}));class be{static create(e,t,s,r,a,n,l){return new be(e,t,s,r,a,n,l)}constructor(e,t,s,r,a,n,l){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(u.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},B.isRequired(e,"connection"),B.isRequired(t,"logger"),B.isRequired(s,"protocol"),this.serverTimeoutInMilliseconds=a??wt,this.keepAliveIntervalInMilliseconds=n??yt,this._statefulReconnectBufferSize=l??kt,this._logger=t,this._protocol=s,this.connection=e,this._reconnectPolicy=r,this._handshakeProtocol=new gt,this.connection.onreceive=i=>this._processIncomingData(i),this.connection.onclose=i=>this._connectionClosed(i),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=I.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:y.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==I.Disconnected&&this._connectionState!==I.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==I.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=I.Connecting,this._logger.log(u.Debug,"Starting HubConnection.");try{await this._startInternal(),M.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=I.Connected,this._connectionStarted=!0,this._logger.log(u.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=I.Disconnected,this._logger.log(u.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,s)=>{this._handshakeResolver=t,this._handshakeRejecter=s});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const s={protocol:this._protocol.name,version:t};if(this._logger.log(u.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)),this._logger.log(u.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new xt(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(u.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===I.Disconnected)return this._logger.log(u.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===I.Disconnecting)return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=I.Disconnecting,this._logger.log(u.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(u.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===I.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new V("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[s,r]=this._replaceStreamingParams(t),a=this._createStreamInvocation(e,t,r);let n;const l=new bt;return l.cancelCallback=()=>{const i=this._createCancelInvocation(a.invocationId);return delete this._callbacks[a.invocationId],n.then(()=>this._sendWithProtocol(i))},this._callbacks[a.invocationId]=(i,f)=>{if(f){l.error(f);return}else i&&(i.type===y.Completion?i.error?l.error(new Error(i.error)):l.complete():l.next(i.item))},n=this._sendWithProtocol(a).catch(i=>{l.error(i),delete this._callbacks[a.invocationId]}),this._launchStreams(s,n),l}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[s,r]=this._replaceStreamingParams(t),a=this._sendWithProtocol(this._createInvocation(e,t,!0,r));return this._launchStreams(s,a),a}invoke(e,...t){const[s,r]=this._replaceStreamingParams(t),a=this._createInvocation(e,t,!1,r);return new Promise((l,i)=>{this._callbacks[a.invocationId]=(p,$)=>{if($){i($);return}else p&&(p.type===y.Completion?p.error?i(new Error(p.error)):l(p.result):i(new Error(`Unexpected message type: ${p.type}`)))};const f=this._sendWithProtocol(a).catch(p=>{i(p),delete this._callbacks[a.invocationId]});this._launchStreams(s,f)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const s=this._methods[e];if(s)if(t){const r=s.indexOf(t);r!==-1&&(s.splice(r,1),s.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const s of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(s)))switch(s.type){case y.Invocation:this._invokeClientMethod(s).catch(r=>{this._logger.log(u.Error,`Invoke client method threw error: ${fe(r)}`)});break;case y.StreamItem:case y.Completion:{const r=this._callbacks[s.invocationId];if(r){s.type===y.Completion&&delete this._callbacks[s.invocationId];try{r(s)}catch(a){this._logger.log(u.Error,`Stream callback threw error: ${fe(a)}`)}}break}case y.Ping:break;case y.Close:{this._logger.log(u.Information,"Close message received from server.");const r=s.error?new Error("Server returned an error on close: "+s.error):void 0;s.allowReconnect===!0?this.connection.stop(r):this._stopPromise=this._stopInternal(r);break}case y.Ack:this._messageBuffer&&this._messageBuffer._ack(s);break;case y.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(s);break;default:this._logger.log(u.Warning,`Invalid message type: ${s.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,s;try{[s,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(r){const a="Error parsing handshake response: "+r;this._logger.log(u.Error,a);const n=new Error(a);throw this._handshakeRejecter(n),n}if(t.error){const r="Server returned handshake error: "+t.error;this._logger.log(u.Error,r);const a=new Error(r);throw this._handshakeRejecter(a),a}else this._logger.log(u.Debug,"Server handshake complete.");return this._handshakeResolver(),s}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===I.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),s=this._methods[t];if(!s){this._logger.log(u.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(u.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const r=s.slice(),a=!!e.invocationId;let n,l,i;for(const f of r)try{const p=n;n=await f.apply(this,e.arguments),a&&n&&p&&(this._logger.log(u.Error,`Multiple results provided for '${t}'. Sending error to server.`),i=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),l=void 0}catch(p){l=p,this._logger.log(u.Error,`A callback for the method '${t}' threw error '${p}'.`)}i?await this._sendWithProtocol(i):a?(l?i=this._createCompletionMessage(e.invocationId,`${l}`,null):n!==void 0?i=this._createCompletionMessage(e.invocationId,null,n):(this._logger.log(u.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),i=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(i)):n&&this._logger.log(u.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(u.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new V("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===I.Disconnecting?this._completeClose(e):this._connectionState===I.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===I.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=I.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),M.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(u.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let s=0,r=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),a=this._getNextRetryDelay(s++,0,r);if(a===null){this._logger.log(u.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=I.Reconnecting,e?this._logger.log(u.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(u.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(n=>n.apply(this,[e]))}catch(n){this._logger.log(u.Error,`An onreconnecting callback called with error '${e}' threw error '${n}'.`)}if(this._connectionState!==I.Reconnecting){this._logger.log(u.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;a!==null;){if(this._logger.log(u.Information,`Reconnect attempt number ${s} will start in ${a} ms.`),await new Promise(n=>{this._reconnectDelayHandle=setTimeout(n,a)}),this._reconnectDelayHandle=void 0,this._connectionState!==I.Reconnecting){this._logger.log(u.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=I.Connected,this._logger.log(u.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(n=>n.apply(this,[this.connection.connectionId]))}catch(n){this._logger.log(u.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${n}'.`)}return}catch(n){if(this._logger.log(u.Information,`Reconnect attempt failed because of error '${n}'.`),this._connectionState!==I.Reconnecting){this._logger.log(u.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===I.Disconnecting&&this._completeClose();return}r=n instanceof Error?n:new Error(n.toString()),a=this._getNextRetryDelay(s++,Date.now()-t,r)}}this._logger.log(u.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${s} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,s){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:s})}catch(r){return this._logger.log(u.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${r}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(s=>{const r=t[s];try{r(null,e)}catch(a){this._logger.log(u.Error,`Stream 'error' callback called with '${e}' threw error: ${fe(a)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,s,r){if(s)return r.length!==0?{arguments:t,streamIds:r,target:e,type:y.Invocation}:{arguments:t,target:e,type:y.Invocation};{const a=this._invocationId;return this._invocationId++,r.length!==0?{arguments:t,invocationId:a.toString(),streamIds:r,target:e,type:y.Invocation}:{arguments:t,invocationId:a.toString(),target:e,type:y.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const s in e)e[s].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s)))},error:r=>{let a;r instanceof Error?a=r.message:r&&r.toString?a=r.toString():a="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s,a)))},next:r=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(s,r)))}})}}_replaceStreamingParams(e){const t=[],s=[];for(let r=0;r<e.length;r++){const a=e[r];if(this._isObservable(a)){const n=this._invocationId;this._invocationId++,t[n]=a,s.push(n.toString()),e.splice(r,1)}}return[t,s]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,s){const r=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:r.toString(),streamIds:s,target:e,type:y.StreamInvocation}:{arguments:t,invocationId:r.toString(),target:e,type:y.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:y.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:y.StreamItem}}_createCompletionMessage(e,t,s){return t?{error:t,invocationId:e,type:y.Completion}:{invocationId:e,result:s,type:y.Completion}}_createCloseMessage(){return{type:y.Close}}}const _t=[0,2e3,1e4,3e4,null];class Te{constructor(e){this._retryDelays=e!==void 0?[...e,null]:_t}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class ee{}ee.Authorization="Authorization";ee.Cookie="Cookie";class St extends pe{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const s=await this._innerClient.send(e);return t&&s.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):s}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[ee.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[ee.Authorization]&&delete e.headers[ee.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var L;(function(o){o[o.None=0]="None",o[o.WebSockets=1]="WebSockets",o[o.ServerSentEvents=2]="ServerSentEvents",o[o.LongPolling=4]="LongPolling"})(L||(L={}));var F;(function(o){o[o.Text=1]="Text",o[o.Binary=2]="Binary"})(F||(F={}));let $t=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class Ee{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,s){this._httpClient=e,this._logger=t,this._pollAbort=new $t,this._options=s,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(B.isRequired(e,"url"),B.isRequired(t,"transferFormat"),B.isIn(t,F,"transferFormat"),this._url=e,this._logger.log(u.Trace,"(LongPolling transport) Connecting."),t===F.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[s,r]=se(),a={[s]:r,...this._options.headers},n={abortSignal:this._pollAbort.signal,headers:a,timeout:1e5,withCredentials:this._options.withCredentials};t===F.Binary&&(n.responseType="arraybuffer");const l=`${e}&_=${Date.now()}`;this._logger.log(u.Trace,`(LongPolling transport) polling: ${l}.`);const i=await this._httpClient.get(l,n);i.statusCode!==200?(this._logger.log(u.Error,`(LongPolling transport) Unexpected response code: ${i.statusCode}.`),this._closeError=new Z(i.statusText||"",i.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,n)}async _poll(e,t){try{for(;this._running;)try{const s=`${e}&_=${Date.now()}`;this._logger.log(u.Trace,`(LongPolling transport) polling: ${s}.`);const r=await this._httpClient.get(s,t);r.statusCode===204?(this._logger.log(u.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):r.statusCode!==200?(this._logger.log(u.Error,`(LongPolling transport) Unexpected response code: ${r.statusCode}.`),this._closeError=new Z(r.statusText||"",r.statusCode),this._running=!1):r.content?(this._logger.log(u.Trace,`(LongPolling transport) data received. ${oe(r.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(r.content)):this._logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(s){this._running?s instanceof ge?this._logger.log(u.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=s,this._running=!1):this._logger.log(u.Trace,`(LongPolling transport) Poll errored after shutdown: ${s.message}`)}}finally{this._logger.log(u.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?De(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(u.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(u.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,s]=se();e[t]=s;const r={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let a;try{await this._httpClient.delete(this._url,r)}catch(n){a=n}a?a instanceof Z&&(a.statusCode===404?this._logger.log(u.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(u.Trace,`(LongPolling transport) Error sending a DELETE request: ${a}`)):this._logger.log(u.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(u.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(u.Trace,e),this.onclose(this._closeError)}}}class Ct{constructor(e,t,s,r){this._httpClient=e,this._accessToken=t,this._logger=s,this._options=r,this.onreceive=null,this.onclose=null}async connect(e,t){return B.isRequired(e,"url"),B.isRequired(t,"transferFormat"),B.isIn(t,F,"transferFormat"),this._logger.log(u.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((s,r)=>{let a=!1;if(t!==F.Text){r(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let n;if(M.isBrowser||M.isWebWorker)n=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const l=this._httpClient.getCookieString(e),i={};i.Cookie=l;const[f,p]=se();i[f]=p,n=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...i,...this._options.headers}})}try{n.onmessage=l=>{if(this.onreceive)try{this._logger.log(u.Trace,`(SSE transport) data received. ${oe(l.data,this._options.logMessageContent)}.`),this.onreceive(l.data)}catch(i){this._close(i);return}},n.onerror=l=>{a?this._close():r(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},n.onopen=()=>{this._logger.log(u.Information,`SSE connected to ${this._url}`),this._eventSource=n,a=!0,s()}}catch(l){r(l);return}})}async send(e){return this._eventSource?De(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class Tt{constructor(e,t,s,r,a,n){this._logger=s,this._accessTokenFactory=t,this._logMessageContent=r,this._webSocketConstructor=a,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=n}async connect(e,t){B.isRequired(e,"url"),B.isRequired(t,"transferFormat"),B.isIn(t,F,"transferFormat"),this._logger.log(u.Trace,"(WebSockets transport) Connecting.");let s;return this._accessTokenFactory&&(s=await this._accessTokenFactory()),new Promise((r,a)=>{e=e.replace(/^http/,"ws");let n;const l=this._httpClient.getCookieString(e);let i=!1;if(M.isNode||M.isReactNative){const f={},[p,$]=se();f[p]=$,s&&(f[ee.Authorization]=`Bearer ${s}`),l&&(f[ee.Cookie]=l),n=new this._webSocketConstructor(e,void 0,{headers:{...f,...this._headers}})}else s&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(s)}`);n||(n=new this._webSocketConstructor(e)),t===F.Binary&&(n.binaryType="arraybuffer"),n.onopen=f=>{this._logger.log(u.Information,`WebSocket connected to ${e}.`),this._webSocket=n,i=!0,r()},n.onerror=f=>{let p=null;typeof ErrorEvent<"u"&&f instanceof ErrorEvent?p=f.error:p="There was an error with the transport",this._logger.log(u.Information,`(WebSockets transport) ${p}.`)},n.onmessage=f=>{if(this._logger.log(u.Trace,`(WebSockets transport) data received. ${oe(f.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(f.data)}catch(p){this._close(p);return}},n.onclose=f=>{if(i)this._close(f);else{let p=null;typeof ErrorEvent<"u"&&f instanceof ErrorEvent?p=f.error:p="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",a(new Error(p))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(u.Trace,`(WebSockets transport) sending data. ${oe(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(u.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const Pe=100;class Et{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,B.isRequired(e,"url"),this._logger=ot(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let s=null,r=null;if(M.isNode&&typeof require<"u"){const a=typeof __webpack_require__=="function"?__non_webpack_require__:require;s=a("ws"),r=a("eventsource")}!M.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:M.isNode&&!t.WebSocket&&s&&(t.WebSocket=s),!M.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:M.isNode&&!t.EventSource&&typeof r<"u"&&(t.EventSource=r),this._httpClient=new St(t.httpClient||new mt(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||F.Binary,B.isIn(e,F,"transferFormat"),this._logger.log(u.Debug,`Starting connection with transfer format '${F[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(u.Error,t),await this._stopPromise,Promise.reject(new V(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(u.Error,t),Promise.reject(new V(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new xe(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(u.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(u.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(u.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===L.WebSockets)this.transport=this._constructTransport(L.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let s=null,r=0;do{if(s=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new V("The connection was stopped during negotiation.");if(s.error)throw new Error(s.error);if(s.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(s.url&&(t=s.url),s.accessToken){const a=s.accessToken;this._accessTokenFactory=()=>a,this._httpClient._accessToken=a,this._httpClient._accessTokenFactory=void 0}r++}while(s.url&&r<Pe);if(r===Pe&&s.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,s,e)}this.transport instanceof Ee&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(u.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(s){return this._logger.log(u.Error,"Failed to start the connection: "+s),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(s)}}async _getNegotiationResponse(e){const t={},[s,r]=se();t[s]=r;const a=this._resolveNegotiateUrl(e);this._logger.log(u.Debug,`Sending negotiation request: ${a}.`);try{const n=await this._httpClient.post(a,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(n.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${n.statusCode}'`));const l=JSON.parse(n.content);return(!l.negotiateVersion||l.negotiateVersion<1)&&(l.connectionToken=l.connectionId),l.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new $e("Client didn't negotiate Stateful Reconnect but the server did.")):l}catch(n){let l="Failed to complete negotiation with the server: "+n;return n instanceof Z&&n.statusCode===404&&(l=l+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(u.Error,l),Promise.reject(new $e(l))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,s,r){let a=this._createConnectUrl(e,s.connectionToken);if(this._isITransport(t)){this._logger.log(u.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(a,r),this.connectionId=s.connectionId;return}const n=[],l=s.availableTransports||[];let i=s;for(const f of l){const p=this._resolveTransportOrError(f,t,r,(i==null?void 0:i.useStatefulReconnect)===!0);if(p instanceof Error)n.push(`${f.transport} failed:`),n.push(p);else if(this._isITransport(p)){if(this.transport=p,!i){try{i=await this._getNegotiationResponse(e)}catch($){return Promise.reject($)}a=this._createConnectUrl(e,i.connectionToken)}try{await this._startTransport(a,r),this.connectionId=i.connectionId;return}catch($){if(this._logger.log(u.Error,`Failed to start the transport '${f.transport}': ${$}`),i=void 0,n.push(new st(`${f.transport} failed: ${$}`,L[f.transport])),this._connectionState!=="Connecting"){const m="Failed to select transport before stop() was called.";return this._logger.log(u.Debug,m),Promise.reject(new V(m))}}}}return n.length>0?Promise.reject(new rt(`Unable to connect to the server with any of the available transports. ${n.join(" ")}`,n)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case L.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new Tt(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case L.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Ct(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case L.LongPolling:return new Ee(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async s=>{let r=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{r=!0}else{this._stopConnection(s);return}r&&this._stopConnection(s)}:this.transport.onclose=s=>this._stopConnection(s),this.transport.connect(e,t)}_resolveTransportOrError(e,t,s,r){const a=L[e.transport];if(a==null)return this._logger.log(u.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Pt(t,a))if(e.transferFormats.map(l=>F[l]).indexOf(s)>=0){if(a===L.WebSockets&&!this._options.WebSocket||a===L.ServerSentEvents&&!this._options.EventSource)return this._logger.log(u.Debug,`Skipping transport '${L[a]}' because it is not supported in your environment.'`),new et(`'${L[a]}' is not supported in your environment.`,a);this._logger.log(u.Debug,`Selecting transport '${L[a]}'.`);try{return this.features.reconnect=a===L.WebSockets?r:void 0,this._constructTransport(a)}catch(l){return l}}else return this._logger.log(u.Debug,`Skipping transport '${L[a]}' because it does not support the requested transfer format '${F[s]}'.`),new Error(`'${L[a]}' does not support ${F[s]}.`);else return this._logger.log(u.Debug,`Skipping transport '${L[a]}' because it was disabled by the client.`),new tt(`'${L[a]}' is disabled by the client.`,a)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(u.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(u.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(u.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(u.Error,`Connection disconnected with error '${e}'.`):this._logger.log(u.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(u.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(u.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!M.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(u.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const s=new URLSearchParams(t.searchParams);return s.has("negotiateVersion")||s.append("negotiateVersion",this._negotiateVersion.toString()),s.has("useStatefulReconnect")?s.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&s.append("useStatefulReconnect","true"),t.search=s.toString(),t.toString()}}function Pt(o,e){return!o||(e&o)!==0}class xe{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new ce,this._transportResult=new ce,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new ce),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new ce;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):xe._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(s){e.reject(s)}}}static _concatBuffers(e){const t=e.map(a=>a.byteLength).reduce((a,n)=>a+n),s=new Uint8Array(t);let r=0;for(const a of e)s.set(new Uint8Array(a),r),r+=a.byteLength;return s.buffer}}class ce{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const At="json";class Dt{constructor(){this.name=At,this.version=2,this.transferFormat=F.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=ie.instance);const s=H.parse(e),r=[];for(const a of s){const n=JSON.parse(a);if(typeof n.type!="number")throw new Error("Invalid payload.");switch(n.type){case y.Invocation:this._isInvocationMessage(n);break;case y.StreamItem:this._isStreamItemMessage(n);break;case y.Completion:this._isCompletionMessage(n);break;case y.Ping:break;case y.Close:break;case y.Ack:this._isAckMessage(n);break;case y.Sequence:this._isSequenceMessage(n);break;default:t.log(u.Information,"Unknown message type '"+n.type+"' ignored.");continue}r.push(n)}return r}writeMessage(e){return H.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const It={trace:u.Trace,debug:u.Debug,info:u.Information,information:u.Information,warn:u.Warning,warning:u.Warning,error:u.Error,critical:u.Critical,none:u.None};function Mt(o){const e=It[o.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${o}`)}class Rt{configureLogging(e){if(B.isRequired(e,"logging"),Ot(e))this.logger=e;else if(typeof e=="string"){const t=Mt(e);this.logger=new de(t)}else this.logger=new de(e);return this}withUrl(e,t){return B.isRequired(e,"url"),B.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return B.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new Te(e):this.reconnectPolicy=e:this.reconnectPolicy=new Te,this}withServerTimeout(e){return B.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return B.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new Et(this.url,e);return be.create(t,this.logger||ie.instance,this.protocol||new Dt,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Ot(o){return o.log!==void 0}class Bt{constructor(){S(this,"hubConnection",null);S(this,"isConnected",!1);S(this,"statusListeners",[])}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new Rt().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect().configureLogging(u.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{this.statusListeners.forEach(s=>s(t.orderId,t.status,t.message))}),this.hubConnection.start().then(()=>{this.isConnected=!0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection fallback active (sandbox mode)",t)})}catch{console.log("SignalR running in local simulated mode")}}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,s){this.statusListeners.forEach(r=>r(e,t,s))}}const ae=new Bt;class Lt{constructor(){S(this,"token",localStorage.getItem("token")||null);S(this,"currentUser",this.loadStoredUser());S(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);S(this,"listeners",[]);S(this,"listings",[]);S(this,"orders",[]);S(this,"adminUsers",[]);S(this,"regionalHubs",[]);S(this,"notifications",[]);S(this,"farmerSummary",{totalEarnedEtb:0,pendingEscrowEtb:0,releasedEtb:0,completedOrdersCount:0,pendingOrdersCount:0});S(this,"driverSummary",{totalEarnedEtb:0,pendingEtb:0,deliveredTripsCount:0});S(this,"platformStats",{totalUsers:0,totalFarmers:0,totalBuyers:0,totalDrivers:0,totalListings:0,totalOrders:0,totalTransactionVolumeEtb:0,totalPlatformCommissionEtb:0,activeEscrowHeldEtb:0,disputedOrdersCount:0});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}async init(){this.token&&await this.fetchMe(),await this.refreshAllData()}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),s={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,businessName:t.businessName,role:(t.role||"buyer").toLowerCase(),region:t.region,preferredLanguage:t.preferredLanguage,verified:t.verified,isOnline:t.isOnline,vehicleType:t.vehicleType,licensePlate:t.licensePlate,createdAt:t.createdAt};return this.currentUser=s,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(s)),this.notify(),s}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async requestOtp(e){const t=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),s=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(!s.ok){const r=await s.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(r.error||"Failed to request OTP. Please check your phone number.")}return await s.json()}async verifyOtp(e,t){const s=e.startsWith("+251")?e:"+251"+e.replace(/^0+/,""),r=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:s,code:t.trim()})});if(!r.ok){const l=await r.json().catch(()=>({error:"Invalid verification code or phone"}));throw new Error(l.error||"Authentication failed")}const a=await r.json();this.token=a.token,localStorage.setItem("token",a.token);const n={id:a.user.id,phone:a.user.phone,name:a.user.name,nameAm:a.user.nameAm,businessName:a.user.businessName,role:(a.user.role||"buyer").toLowerCase(),region:a.user.region,preferredLanguage:a.user.preferredLanguage,verified:a.user.verified,isOnline:a.user.isOnline,vehicleType:a.user.vehicleType,licensePlate:a.user.licensePlate,createdAt:a.user.createdAt};return this.currentUser=n,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(n)),ae.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),n}async registerUser(e,t,s,r,a,n,l,i){const f=r.startsWith("+251")?r:"+251"+r.replace(/^0+/,""),p=a.charAt(0).toUpperCase()+a.slice(1).toLowerCase(),$=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,businessName:s||null,phone:f,role:p,region:n,vehicleType:l||null,licensePlate:i||null})});if(!$.ok){const K=await $.json().catch(()=>({error:"Registration failed"}));throw new Error(K.error||"Registration failed")}const m=await $.json();this.token=m.token,localStorage.setItem("token",m.token);const W={id:m.user.id,phone:m.user.phone,name:m.user.name,nameAm:m.user.nameAm,businessName:m.user.businessName,role:(m.user.role||"buyer").toLowerCase(),region:m.user.region,preferredLanguage:m.user.preferredLanguage,verified:m.user.verified,isOnline:m.user.isOnline,vehicleType:m.user.vehicleType,licensePlate:m.user.licensePlate,createdAt:m.user.createdAt};return this.currentUser=W,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),ae.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}async updateProfile(e){if(!this.currentUser)return;const t=await fetch("/api/auth/profile",{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify(e)});if(t.ok){const s=await t.json();this.currentUser={...this.currentUser,businessName:s.businessName??this.currentUser.businessName,preferredLanguage:s.preferredLanguage??this.currentUser.preferredLanguage,isOnline:s.isOnline??this.currentUser.isOnline,vehicleType:s.vehicleType??this.currentUser.vehicleType,licensePlate:s.licensePlate??this.currentUser.licensePlate},localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify()}}async fetchDemoUsers(){try{const e=await fetch("/api/auth/demo-users");if(e.ok)return await e.json()}catch(e){console.warn("Could not fetch demo users",e)}return[{phone:"+251911223344",name:"Abebe Bekele",nameAm:"አበበ በቀለ",businessName:"Abebe Organic Co-op",role:"Farmer",region:"Oromia (Bishoftu)"},{phone:"+251955667788",name:"Bethlehem Tilahun",nameAm:"ቤተልሔም ጥላሁን",businessName:"FreshMart Supermarkets",role:"Buyer",region:"Addis Ababa (Bole)"},{phone:"+251977889900",name:"Dawit Kebede",nameAm:"ዳዊት ከበደ",businessName:"Dawit Logistics",role:"Driver",region:"Addis Ababa (Kaliti)"},{phone:"+251900112233",name:"Sara Mengistu",nameAm:"ሳራ መንግስቱ",businessName:"Marketplace Governance",role:"Admin",region:"Addis Ababa"}]}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(e,t,s,r,a,n,l){try{const i=new URLSearchParams;e&&e!=="All"&&i.append("category",e),t&&t!=="All"&&i.append("region",t),s&&i.append("search",s),r&&i.append("minPrice",r.toString()),a&&i.append("maxPrice",a.toString()),n&&i.append("maxMinOrderKg",n.toString()),l&&i.append("sortBy",l);const f=await fetch(`/api/listings?${i.toString()}`);if(f.ok){const p=await f.json(),$=Array.isArray(p)?p:p.items||[];return this.listings=$.map(m=>({id:m.id,farmerId:m.farmerId,farmerName:m.farmerName,farmerNameAm:m.farmerNameAm,farmerPhone:m.farmerPhone,region:m.region,farmerVerified:m.farmerVerified??!0,productName:m.productName,nameAm:m.nameAm,category:m.category,qtyKg:Number(m.qtyKg),pricePerKg:Number(m.pricePerKg),minOrderKg:Number(m.minOrderKg),latitude:m.latitude,longitude:m.longitude,distanceKm:m.distanceKm,photos:m.photos&&m.photos.length>0?m.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:m.availableFrom||new Date().toISOString().split("T")[0],status:(m.status||"Active").toLowerCase(),farmerRating:m.farmerRating||5,reviewCount:m.reviewCount||0,createdAt:m.createdAt})),this.notify(),this.listings}}catch(i){console.warn("Fetch listings from backend failed",i)}return this.listings}getListings(e,t,s,r,a,n){let l=this.listings.filter(i=>{if(i.status!=="active"||e&&e!=="All"&&i.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!i.region.toLowerCase().includes(t.toLowerCase())||r&&i.pricePerKg>r||a&&i.minOrderKg>a)return!1;if(s){const f=s.toLowerCase();if(!(i.productName.toLowerCase().includes(f)||i.nameAm&&i.nameAm.includes(f)||i.farmerName.toLowerCase().includes(f)||i.region.toLowerCase().includes(f)))return!1}return!0});return n==="price_asc"?l.sort((i,f)=>i.pricePerKg-f.pricePerKg):n==="price_desc"?l.sort((i,f)=>f.pricePerKg-i.pricePerKg):n==="rating"?l.sort((i,f)=>(f.farmerRating||0)-(i.farmerRating||0)):n==="distance"&&l.sort((i,f)=>(i.distanceKm||999)-(f.distanceKm||999)),l}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var n,l,i,f,p;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category,qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude,longitude:e.longitude,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0]},s=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(!s.ok)throw new Error("Failed to create listing in database");const r=await s.json(),a={id:r.id,farmerId:r.farmerId,farmerName:r.farmerName||((n=this.currentUser)==null?void 0:n.name)||"Farmer",farmerNameAm:r.farmerNameAm||((l=this.currentUser)==null?void 0:l.nameAm),farmerPhone:r.farmerPhone||((i=this.currentUser)==null?void 0:i.phone)||"",region:r.region||((f=this.currentUser)==null?void 0:f.region)||"Addis Ababa",farmerVerified:((p=this.currentUser)==null?void 0:p.verified)??!0,productName:r.productName,nameAm:r.nameAm,category:r.category,qtyKg:Number(r.qtyKg),pricePerKg:Number(r.pricePerKg),minOrderKg:Number(r.minOrderKg),latitude:r.latitude,longitude:r.longitude,distanceKm:r.distanceKm,photos:r.photos&&r.photos.length>0?r.photos:e.photos,availableFrom:r.availableFrom,status:"active",farmerRating:5,reviewCount:0,createdAt:r.createdAt};return this.listings.unshift(a),this.notify(),a}async updateListing(e,t){(await fetch(`/api/listings/${e}`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify(t)})).ok&&await this.fetchListings()}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(s=>({id:s.id,listingId:s.listingId,productName:s.productName,productNameAm:s.productNameAm,category:s.category,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,farmerRegion:s.farmerRegion,buyerId:s.buyerId,buyerName:s.buyerName,buyerPhone:s.buyerPhone,driverId:s.driverId,driverName:s.driverName,driverPhone:s.driverPhone,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),totalEtb:Number(s.totalEtb),farmerCut:Number(s.farmerCut),driverCut:Number(s.driverCut),platformCut:Number(s.platformCut),status:(s.status||"Pending").toLowerCase(),escrowHeld:s.escrowHeld,paymentRef:s.paymentRef,pickupPhoto:s.pickupPhoto,deliveryAddress:s.deliveryAddress,deliveryNotes:s.deliveryNotes,disputeReason:s.disputeReason,disputeResolution:s.disputeResolution,disputeEvidencePhoto:s.disputeEvidencePhoto,confirmedAt:s.confirmedAt,deliveredAt:s.deliveredAt,createdAt:s.createdAt})),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(s=>s.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(s=>s.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(s=>s.driverId===this.currentUser.id||s.status==="confirmed"&&!s.driverId):this.orders}async placeOrder(e,t,s){var n;if(!this.listings.find(l=>l.id===e))throw new Error("Listing not found");if(!(await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:s||((n=this.currentUser)==null?void 0:n.region)||"Addis Ababa"})})).ok)throw new Error("Failed to place order in database");return await this.fetchOrders(),await this.fetchListings(),this.orders[0]||this.orders.find(l=>l.listingId===e)}async confirmOrderByFarmer(e){await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders()}async rejectOrderByFarmer(e,t){await fetch(`/api/orders/${e}/reject`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t})}),await this.fetchOrders(),await this.fetchListings()}async assignDriverToOrder(e,t){await fetch(`/api/orders/${e}/assign-driver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({driverId:t})}),await this.fetchOrders()}async pickupOrderByDriver(e,t){await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||null})}),await this.fetchOrders()}async confirmDeliveryByBuyer(e){await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders(),await this.fetchSummaries()}async disputeOrder(e,t,s){await fetch(`/api/orders/${e}/dispute`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,evidencePhoto:s||null})}),await this.fetchOrders()}async resolveDispute(e,t,s="Arbitrated by platform administrator"){await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:s})}),await this.fetchOrders(),await this.fetchSummaries()}async submitReview(e,t,s,r){(await fetch("/api/reviews",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({orderId:e,revieweeId:t,rating:s,comment:r||null})})).ok&&await this.fetchListings()}async fetchAdminUsers(e){try{const t=e?`/api/admin/users?role=${e}`:"/api/admin/users",s=await fetch(t,{headers:this.getAuthHeaders()});if(s.ok){const r=await s.json();return this.adminUsers=r.map(a=>({id:a.id,phone:a.phone,name:a.name,nameAm:a.nameAm,businessName:a.businessName,role:a.role.toLowerCase(),region:a.region,preferredLanguage:a.preferredLanguage,verified:a.verified,isOnline:a.isOnline,vehicleType:a.vehicleType,licensePlate:a.licensePlate,createdAt:a.createdAt})),this.notify(),this.adminUsers}}catch(t){console.warn("Fetch admin users failed",t)}return this.adminUsers}async verifyUser(e,t=!0){await fetch(`/api/admin/users/${e}/verify?verified=${t}`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchAdminUsers()}async fetchRegionalHubs(){try{const e=await fetch("/api/admin/regional-hubs",{headers:this.getAuthHeaders()});if(e.ok)return this.regionalHubs=await e.json(),this.notify(),this.regionalHubs}catch(e){console.warn("Fetch regional hubs failed",e)}return this.regionalHubs}exportCsv(e){let t="",s=`ethiopian_farm_market_${e}_${new Date().toISOString().split("T")[0]}.csv`;if(e==="orders"){const n=["OrderId","Date","Product","Category","Farmer","FarmerPhone","Buyer","BuyerPhone","Driver","QtyKg","PricePerKg","TotalEtb","FarmerPayout90","DriverCut5","PlatformCut5","Status","EscrowHeld","DeliveryAddress"],l=this.orders.map(i=>[i.id,i.createdAt,`"${i.productName.replace(/"/g,'""')}"`,i.category,`"${i.farmerName.replace(/"/g,'""')}"`,i.farmerPhone,`"${i.buyerName.replace(/"/g,'""')}"`,i.buyerPhone,`"${(i.driverName||"Unassigned").replace(/"/g,'""')}"`,i.qtyKg,i.pricePerKg,i.totalEtb,i.farmerCut,i.driverCut,i.platformCut,i.status,i.escrowHeld,`"${(i.deliveryAddress||"").replace(/"/g,'""')}"`]);t=[n.join(","),...l.map(i=>i.join(","))].join(`
`)}else if(e==="payouts"){const n=["OrderId","Date","RecipientType","RecipientName","TelebirrPhone","PayoutAmountEtb","PaymentRef","Status"],l=[];this.orders.forEach(i=>{l.push([i.id,i.confirmedAt||i.createdAt,"Farmer (90%)",`"${i.farmerName.replace(/"/g,'""')}"`,i.farmerPhone,i.farmerCut.toString(),i.paymentRef||"TB-ESCROW",i.status==="delivered"?"Paid (Released)":"Escrow Held"]),i.driverName&&l.push([i.id,i.confirmedAt||i.createdAt,"Driver (5%)",`"${i.driverName.replace(/"/g,'""')}"`,i.driverPhone||"",i.driverCut.toString(),i.paymentRef||"TB-ESCROW",i.status==="delivered"?"Paid (Released)":"Escrow Held"])}),t=[n.join(","),...l.map(i=>i.join(","))].join(`
`)}else if(e==="users"){const n=["UserId","Name","BusinessName","Role","Phone","Region","Verified","IsOnline","VehicleType","LicensePlate","JoinedDate"],l=this.adminUsers.map(i=>[i.id,`"${i.name.replace(/"/g,'""')}"`,`"${(i.businessName||"").replace(/"/g,'""')}"`,i.role,i.phone,`"${i.region.replace(/"/g,'""')}"`,i.verified,i.isOnline??!1,`"${(i.vehicleType||"").replace(/"/g,'""')}"`,`"${(i.licensePlate||"").replace(/"/g,'""')}"`,i.createdAt]);t=[n.join(","),...l.map(i=>i.join(","))].join(`
`)}const r=new Blob([t],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(r),a.download=s,a.click()}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(r=>{var a;return r.farmerId===((a=this.currentUser)==null?void 0:a.id)}),t=e.filter(r=>r.status==="delivered").reduce((r,a)=>r+a.farmerCut,0),s=e.filter(r=>r.status!=="delivered"&&r.status!=="cancelled").reduce((r,a)=>r+a.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:s||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(r=>r.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(r=>r.status!=="delivered"&&r.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount}}getDriverSummary(){const e=this.orders.filter(r=>{var a;return r.driverId===((a=this.currentUser)==null?void 0:a.id)}),t=e.filter(r=>r.status==="delivered").reduce((r,a)=>r+a.driverCut,0),s=e.filter(r=>r.status!=="delivered"&&r.status!=="cancelled").reduce((r,a)=>r+a.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:s||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(r=>r.status==="delivered").length||this.driverSummary.deliveredTripsCount}}getPlatformStats(){const e=this.orders.reduce((a,n)=>a+n.totalEtb,0),t=this.orders.filter(a=>a.status==="delivered").reduce((a,n)=>a+n.platformCut,0),s=this.orders.filter(a=>a.escrowHeld).reduce((a,n)=>a+n.totalEtb,0),r=this.orders.filter(a=>a.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:s||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:r||this.platformStats.disputedOrdersCount}}getNotifications(){return!this.isUserLoggedIn||!this.currentUser?[]:this.notifications.filter(e=>e.userId===this.currentUser.id||this.currentUser.role==="admin")}async broadcastSms(e,t,s){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:s})})}catch(r){console.warn("Broadcast SMS API call error",r)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${s.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${s}] ${t}`,read:!1,sentAt:new Date().toISOString()}),this.notify())}async refreshAllData(){var e;await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchSummaries()]),((e=this.currentUser)==null?void 0:e.role)==="admin"&&await Promise.allSettled([this.fetchAdminUsers(),this.fetchRegionalHubs()]),this.notify()}}const x=new Lt,ne={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Max Distance (km)",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",addToCart:"Add to Bulk Cart",viewDetails:"View Farm Details",farmerRating:"Rating",cartTitle:"Bulk Produce Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you confirm delivery from the farmer.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Issue / Dispute",rateFarmer:"Rate Farmer Quality",submitReview:"Submit 5-Star Review",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",earningsToday:"Today's Earnings",earningsThisWeek:"This Week",earningsThisMonth:"This Month",telebirrWalletStatus:"Telebirr Wallet Active",depositedToWallet:"Deposited to Wallet",driverPortalTitle:"Driver Delivery Hub",availableTrips:"Available Farm Pickups",acceptTrip:"Accept Delivery Trip",uploadProof:"Upload Pickup Photo",navigateBuyer:"Navigate to Buyer Depot",markCompleted:"Complete Delivery",tripCommission:"Guaranteed Driver Cut (5%)",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Management & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",verifyUsersTitle:"Farmer & Driver Verification Queue",verifyBtn:"Approve & Verify ID",resolveDisputeTitle:"Escrow Dispute Arbitration",releaseFarmerBtn:"Release Funds to Farmer",refundBuyerBtn:"Refund 100% to Buyer",broadcastSmsTitle:"Bilingual SMS Announcement Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",orderHistoryTitle:"Wholesale Order History & Live Tracking",repeatOrderBtn:"Re-Order from Farmer",rateFarmerDriverBtn:"Rate Farmer & Driver",reviewModalTitle:"Rate & Review Your Experience",farmerRatingLabel:"Farmer Produce Quality Rating",driverRatingLabel:"Driver Freight & Punctuality Rating",reviewCommentPlaceholder:"Share feedback on produce freshness, weight accuracy, packaging...",submitFeedbackBtn:"Submit Rating & Feedback",filterMinOrderKg:"Min Order (kg)",sortNewest:"Newest Harvests",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortRating:"Highest Rated Farmers",sortDistance:"Nearest Farm Proximity",verifiedFarmerBadge:"Verified Smallholder Producer",unverifiedFarmerNotice:"Identity Verification Pending Admin Review",editListing:"Edit Produce Listing",deactivateListing:"Deactivate Listing",activateListing:"Activate Listing",rejectOrderAction:"Decline Order",rejectReasonPrompt:"Reason for declining (e.g. Stock shortage, harvest delay)",payoutHistoryTitle:"Telebirr 90% Escrow Payout History",earningsWeek:"This Week's Net Cut",earningsMonth:"This Month's Net Cut",driverOnline:"Online & Available for Trips",driverOffline:"Offline",vehicleDetailsLabel:"Vehicle & Fleet Credentials",gpsRouteNav:"Open Farm GPS Route",earningsLedgerTitle:"Driver 5% Commission Payout Ledger",userVerificationQueue:"User Identity Verification Center",approveUserBtn:"Approve Identity",revokeUserBtn:"Revoke Verification",activeOrdersOversight:"Master Order Oversight & Escrow Ledger",disputeEvidenceTitle:"Dispute Evidence & Arbitration Inspector",evidencePhotoLabel:"Attached Evidence Photo",exportCsvTitle:"Stakeholder & Partner Data Export (USAID / SNV / Investors)",exportTransactionsBtn:"Export Transactions CSV",exportPayoutsBtn:"Export Payouts CSV",exportUsersBtn:"Export User Activity CSV",regionalHubsTitle:"Regional Expansion Hub Rollout Manager",activeHub:"Active Hub",inactiveHub:"Planned Rollout",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"ከፍተኛ ርቀት (ኪ.ሜ)",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"የእርሻ ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",cartTitle:"የጅምላ ግዢ ጋሪ",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"ቅሬታ አስገባ",rateFarmer:"የምርቱን ጥራት ደረጃ ይስጡ",submitReview:"የ5-ኮከብ ግምገማ ላክ",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",earningsToday:"የዛሬ ገቢ",earningsThisWeek:"የዚህ ሳምንት ገቢ",earningsThisMonth:"የዚህ ወር ገቢ",telebirrWalletStatus:"የቴሌብር አካውንት ገቢር ነው",depositedToWallet:"ወደ ቴሌብር አካውንት የገባ",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ አንሳ",navigateBuyer:"ወደ ገዢው መጋዘን አጓጉዝ",markCompleted:"ማድረስህን አረጋግጥ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",verifyUsersTitle:"የአርሶ አደሮች እና ሹፌሮች ማረጋገጫ",verifyBtn:"መታወቂያ አረጋግጥ",resolveDisputeTitle:"የቅሬታዎች ውሳኔ መስጫ",releaseFarmerBtn:"ገንዘቡ ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",orderHistoryTitle:"የትዕዛዝ ታሪክ እና የቀጥታ መከታተያ",repeatOrderBtn:"እንደገና እዘዝ",rateFarmerDriverBtn:"ለአርሶ አደሩና ለአጓጓዡ ደረጃ ይስጡ",reviewModalTitle:"የምርት ጥራት እና የአገልግሎት ግምገማ",farmerRatingLabel:"የአርሶ አደር ምርት ጥራት ደረጃ",driverRatingLabel:"የአጓጓዥ ሹፌር ፍጥነትና ጥንቃቄ ደረጃ",reviewCommentPlaceholder:"ስለ ምርቱ ትኩስነት፣ ክብደት እና ማሸጊያ አስተያየትዎን ይጻፉ...",submitFeedbackBtn:"ደረጃና አስተያየት ላክ",filterMinOrderKg:"አነስተኛ ትዕዛዝ (ኪ.ግ)",sortNewest:"አዳዲስ ምርቶች",sortPriceAsc:"ዋጋ: ከዝቅተኛ ወደ ከፍተኛ",sortPriceDesc:"ዋጋ: ከከፍተኛ ወደ ዝቅተኛ",sortRating:"ከፍተኛ ደረጃ የተሰጣቸው አርሶ አደሮች",sortDistance:"በጣም ቅርብ የሆኑ እርሻዎች",verifiedFarmerBadge:"የተረጋገጠ አርሶ አደር",unverifiedFarmerNotice:"መታወቂያ በአድሚን ማረጋገጫ በመጠባበቅ ላይ ነው",editListing:"ምርቱን አስተካክል",deactivateListing:"ምርቱን ለጊዜው አቁም",activateListing:"ምርቱን መልሰህ አንቃ",rejectOrderAction:"ትዕዛዙን ሰርዝ",rejectReasonPrompt:"ትዕዛዙን የሰረዙበት ምክንያት (ለምሳሌ: ምርቱ አልቋል)",payoutHistoryTitle:"የቴሌብር 90% የተከፈለ ገንዘብ ዝርዝር",earningsWeek:"የዚህ ሳምንት ጠቅላላ ገቢ",earningsMonth:"የዚህ ወር ጠቅላላ ገቢ",driverOnline:"በመስመር ላይ / ለጉዞ ዝግጁ",driverOffline:"ከመስመር ውጭ",vehicleDetailsLabel:"የተሽከርካሪ እና የመንጃ ፍቃድ መረጃ",gpsRouteNav:"የእርሻ ቦታ ጂፒኤስ (GPS) ካርታ",earningsLedgerTitle:"የአጓጓዥ 5% የጉዞ ክፍያ ታሪክ",userVerificationQueue:"የተጠቃሚዎች ማንነት ማረጋገጫ ክፍል",approveUserBtn:"ማንነትን አረጋግጥ",revokeUserBtn:"ማረጋገጫን አንሳ",activeOrdersOversight:"ጠቅላላ ንቁ ትዕዛዞች እና የዋስትና ክፍያ ቁጥጥር",disputeEvidenceTitle:"የቅሬታ ማስረጃ እና ውሳኔ መስጫ",evidencePhotoLabel:"የተያያዘ የቅሬታ ፎቶ ማስረጃ",exportCsvTitle:"የዳታ ሪፖርት ማውረጃ (ለባለሀብቶች / ለSNV / ለUSAID)",exportTransactionsBtn:"የትዕዛዞች CSV አውርድ",exportPayoutsBtn:"የክፍያዎች CSV አውርድ",exportUsersBtn:"የተጠቃሚዎች CSV አውርድ",regionalHubsTitle:"የክልል ማዕከላት ማስፋፊያ አስተዳደር",activeHub:"የሚሰራ ማዕከል",inactiveHub:"በእቅድ ላይ ያለ ማዕከል",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function Nt(o,e,t,s,r,a,n=""){const l=ne[o],i=r.reduce(($,m)=>$+m.qtyKg,0),f={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"}},p=e?f[e.role]||f.buyer:null;return`
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
                  ${l.brandName}
                </span>
                <span class="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-200">
                  ET
                </span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium ${o==="am"?"lang-am":""}">
                ${l.brandSubtitle}
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
                placeholder="${l.searchPlaceholder}"
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
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${(p==null?void 0:p.color)||"bg-slate-100 text-slate-800"}">
                        ${o==="am"?p==null?void 0:p.labelAm:p==null?void 0:p.label}
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
              <span class="font-bold hidden sm:inline ${o==="am"?"lang-am":""}">${l.navCart}</span>
              <span class="bg-amber-400 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                ${i>0?`${i} kg`:"0"}
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
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="marketplace"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-store"></i> ${l.navMarketplace}
            </button>

            ${t&&(e==null?void 0:e.role)==="farmer"?`
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="farmer"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-tractor"></i> ${l.navFarmerPortal}
              </button>
              <button onclick="window.toggleCreateListingModal()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${l.postNewListing}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="driver"?`
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="driver"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-truck"></i> ${l.navDriverPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="admin"?`
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="admin"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-sliders"></i> ${l.navAdminPortal}
              </button>
            `:""}

            ${!t||(e==null?void 0:e.role)==="buyer"?`
              <button onclick="window.toggleCart()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-200/70 text-slate-700 ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Wholesale Bulk Cart (${i} kg)
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
  `}function Ft(o,e,t,s,r,a,n,l,i,f){const p=ne[o],$=[{key:"All",label:p.catAll,icon:"fa-boxes-stacked",count:e.length},{key:"Vegetables",label:p.catVegetables,icon:"fa-carrot",count:e.filter(h=>h.category==="Vegetables").length},{key:"Grains",label:p.catGrains,icon:"fa-wheat-awn",count:e.filter(h=>h.category==="Grains").length},{key:"Fruits",label:p.catFruits,icon:"fa-apple-whole",count:e.filter(h=>h.category==="Fruits").length},{key:"Coffee",label:p.catCoffee,icon:"fa-mug-hot",count:e.filter(h=>h.category==="Coffee").length},{key:"Spices",label:p.catSpices,icon:"fa-pepper-hot",count:e.filter(h=>h.category==="Spices").length}],m=t.reduce((h,J)=>h+J.qtyKg*J.listing.pricePerKg,0),W=Math.round(m*.9),K=Math.round(m*.05),G=m-W-K;return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Sourcing Hero Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>15M+ Ethiopian Smallholder Farmers Direct Network</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${o==="am"?"lang-am":""}">
              ${p.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${o==="am"?"lang-am":""}">
              ${p.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setBuyerTab('catalog')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-basket-shopping mr-1.5 text-amber-900"></i> ${o==="am"?"ምርቶችን አስስ":"Explore Produce Catalog"}
              </button>
              <button onclick="window.setBuyerTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-clock-rotate-left mr-1.5 text-emerald-300"></i> ${p.orderHistoryTitle} (${n.length})
              </button>
            </div>
          </div>

          <!-- Hero Value Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3">
              <div class="flex items-center justify-between text-xs font-bold text-emerald-200">
                <span><i class="fa-solid fa-bolt text-amber-400"></i> Escrow Guarantee</span>
                <span class="telebirr-badge text-[10px]">Telebirr C2B</span>
              </div>
              <div class="text-2xl font-black text-white">90% Direct to Farmer</div>
              <p class="text-xs text-emerald-100/90 leading-relaxed">
                Wholesale bulk buyers (restaurants, hotels, exporters, supermarkets) get direct farm-gate pricing with zero intermediary markup.
              </p>
              <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                <span>Escrow Hold: <strong class="text-white">Active</strong></span>
                <span>Payout Cut: <strong class="text-white">90% / 5% / 5%</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- View Switcher Tabs (Catalog vs Orders) -->
      <section class="flex items-center justify-between border-b border-slate-200 pb-2">
        <div class="flex items-center gap-3">
          <button onclick="window.setBuyerTab('catalog')" 
            class="px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2 ${l.activeTab==="catalog"?"bg-emerald-800 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
            <i class="fa-solid fa-store"></i>
            <span>${o==="am"?"የምርት ገበያ ማውጫ":"Produce Discovery"}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] ${l.activeTab==="catalog"?"bg-emerald-950 text-emerald-200":"bg-slate-200 text-slate-700"}">${e.length}</span>
          </button>

          <button onclick="window.setBuyerTab('orders')" 
            class="px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2 ${l.activeTab==="orders"?"bg-emerald-800 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
            <i class="fa-solid fa-receipt"></i>
            <span>${p.orderHistoryTitle}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] ${l.activeTab==="orders"?"bg-emerald-950 text-emerald-200":"bg-slate-200 text-slate-700"}">${n.length}</span>
          </button>
        </div>

        <button onclick="window.toggleCart()" class="btn-primary text-xs py-2 px-4 shadow-sm flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-cart-shopping"></i>
          <span>${p.navCart}</span>
          <span class="bg-emerald-950 text-amber-300 font-black px-2 py-0.5 rounded-full text-[10px]">${t.reduce((h,J)=>h+J.qtyKg,0)} kg</span>
        </button>
      </section>

      ${l.activeTab==="catalog"?`
        <!-- Category & Sourcing Filter Bar -->
        <section class="space-y-4">
          <!-- Category Filter Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            ${$.map(h=>`
              <button onclick="window.setCategory('${h.key}')" 
                class="cat-pill ${l.category===h.key?"active":""} ${o==="am"?"lang-am":""}">
                <i class="fa-solid ${h.icon}"></i>
                <span>${h.label}</span>
              </button>
            `).join("")}
          </div>

          <!-- Advanced Discovery Controls (Region, Sort, MinOrder, Price) -->
          <div class="glass-card p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            
            <!-- Region Filter -->
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">${p.filterRegion}</label>
              <select onchange="window.setRegion(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer">
                <option value="All">${p.allRegions}</option>
                <option value="Addis" ${l.region==="Addis"?"selected":""}>${p.addisAbaba}</option>
                <option value="Oromia" ${l.region==="Oromia"?"selected":""}>${p.oromia} (Bishoftu / Adama)</option>
                <option value="Amhara" ${l.region==="Amhara"?"selected":""}>${p.amhara} (Debre Berhan)</option>
                <option value="Sidama" ${l.region==="Sidama"?"selected":""}>${p.sidama} (Hawassa / Yirgacheffe)</option>
                <option value="Dire Dawa" ${l.region==="Dire Dawa"?"selected":""}>Dire Dawa Eastern Corridor</option>
              </select>
            </div>

            <!-- Sort By -->
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">${p.sortBy}</label>
              <select onchange="window.setSortBy(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer">
                <option value="newest" ${l.sortBy==="newest"?"selected":""}>${p.sortNewest}</option>
                <option value="price_asc" ${l.sortBy==="price_asc"?"selected":""}>${p.sortPriceAsc}</option>
                <option value="price_desc" ${l.sortBy==="price_desc"?"selected":""}>${p.sortPriceDesc}</option>
                <option value="rating" ${l.sortBy==="rating"?"selected":""}>${p.sortRating}</option>
                <option value="distance" ${l.sortBy==="distance"?"selected":""}>${p.sortDistance}</option>
              </select>
            </div>

            <!-- Min Order Filter -->
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">${p.filterMinOrderKg}</label>
              <select onchange="window.setMaxMinOrderKg(this.value ? Number(this.value) : undefined)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer">
                <option value="">Any Minimum Order</option>
                <option value="50" ${l.maxMinOrderKg===50?"selected":""}>≤ 50 kg</option>
                <option value="100" ${l.maxMinOrderKg===100?"selected":""}>≤ 100 kg</option>
                <option value="200" ${l.maxMinOrderKg===200?"selected":""}>≤ 200 kg</option>
              </select>
            </div>

            <!-- Price Threshold Filter -->
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">${p.filterPrice}: <span class="text-emerald-800 font-extrabold">${l.maxPrice||500} ETB</span></label>
              <input type="range" min="30" max="500" step="10" value="${l.maxPrice||500}" onchange="window.setMaxPrice(Number(this.value))" class="w-full accent-emerald-700 cursor-pointer" />
            </div>

          </div>
        </section>

        <!-- Main Produce Grid -->
        <section>
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 ${o==="am"?"lang-am":""}">
              ${o==="am"?"የቀጥታ የጅምላ ምርቶች ዝርዝር":"Verified Farm Produce Catalog"}
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
              <h3 class="text-base font-bold text-slate-800">No Produce Listings Found</h3>
              <p class="text-xs text-slate-500">Try adjusting your category, price range, or regional filter.</p>
            </div>
          `:`
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${e.map(h=>`
                <div class="glass-card overflow-hidden flex flex-col justify-between group hover:border-emerald-300 transition-all duration-300">
                  
                  <div>
                    <!-- Product Image with Badges -->
                    <div class="relative h-52 w-full overflow-hidden bg-slate-100">
                      <img src="${h.photos[0]}" alt="${h.productName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      
                      <div class="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span class="escrow-pill shadow-xs">
                          <i class="fa-solid fa-shield-halved text-amber-600"></i> Telebirr Escrow
                        </span>
                        ${h.farmerVerified?`
                          <span class="bg-emerald-800/90 backdrop-blur-md text-emerald-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs border border-emerald-500/40">
                            <i class="fa-solid fa-badge-check"></i> ${p.verifiedFarmerBadge}
                          </span>
                        `:""}
                      </div>

                      <div class="absolute top-3 right-3">
                        <span class="bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs border border-emerald-200">
                          ${h.category}
                        </span>
                      </div>

                      <!-- Region & Distance Overlay -->
                      <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <span><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> ${h.region}</span>
                        <span class="text-emerald-300">${h.distanceKm?`~${h.distanceKm} km away`:"Direct Farm"}</span>
                      </div>
                    </div>

                    <!-- Product Info -->
                    <div class="p-5 space-y-3">
                      
                      <div>
                        <div class="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                          <span class="text-amber-500 flex items-center gap-1 font-bold">
                            <i class="fa-solid fa-star"></i> ${h.farmerRating} <span class="text-slate-400 font-medium">(${h.reviewCount} reviews)</span>
                          </span>
                          <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            <i class="fa-solid fa-check-circle"></i> Ready Today
                          </span>
                        </div>

                        <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors ${o==="am"?"lang-am":""}">
                          ${o==="am"&&h.nameAm?h.nameAm:h.productName}
                        </h3>
                        ${o==="en"&&h.nameAm?`<p class="text-xs text-slate-400 font-medium lang-am">${h.nameAm}</p>`:""}
                      </div>

                      <!-- Farmer Badge -->
                      <div class="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div class="flex items-center gap-2 truncate">
                          <div class="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                            <i class="fa-solid fa-user"></i>
                          </div>
                          <span class="font-bold text-slate-800 truncate ${o==="am"?"lang-am":""}">${o==="am"&&h.farmerNameAm?h.farmerNameAm:h.farmerName}</span>
                        </div>
                        <span class="text-emerald-700 text-[11px] font-bold shrink-0">Verified Farm</span>
                      </div>

                      <!-- Stock Progress Indicator -->
                      <div class="space-y-1 text-xs">
                        <div class="flex justify-between font-semibold text-slate-600">
                          <span>Stock: <strong class="text-slate-900 font-black">${h.qtyKg.toLocaleString()} kg</strong></span>
                          <span class="text-slate-400 font-medium">Min: ${h.minOrderKg} kg</span>
                        </div>
                        <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div class="h-full bg-emerald-600 rounded-full" style="width: 85%;"></div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <!-- Price & Add To Cart Stepper -->
                  <div class="p-5 pt-0">
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span class="text-xs font-bold text-slate-400 uppercase block leading-none">Unit Price</span>
                        <div class="flex items-baseline gap-1 mt-0.5">
                          <span class="text-2xl font-black text-emerald-800 leading-none">${h.pricePerKg}</span>
                          <span class="text-xs font-extrabold text-slate-600">ETB / kg</span>
                        </div>
                      </div>

                      <button onclick="window.quickBuy('${h.id}')" 
                        class="btn-primary text-xs py-2.5 px-4 shadow-sm hover:shadow-md cursor-pointer">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span class="${o==="am"?"lang-am":""}">${p.addToCart}</span>
                      </button>
                    </div>
                  </div>

                </div>
              `).join("")}
            </div>
          `}
        </section>
      `:`
        <!-- Wholesale Buyer Order History & Tracking Section -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">${p.orderHistoryTitle}</h2>
              <p class="text-xs text-slate-500">Track real-time delivery status, inspect Telebirr escrow states, and re-order produce from verified farms.</p>
            </div>
            <button onclick="window.api.exportCsv('orders')" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer">
              <i class="fa-solid fa-file-csv text-emerald-700"></i>
              <span>${p.exportTransactionsBtn}</span>
            </button>
          </div>

          ${n.length===0?`
            <div class="glass-card p-12 text-center space-y-3">
              <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                <i class="fa-solid fa-clipboard-list"></i>
              </div>
              <h3 class="text-base font-bold text-slate-800">No Orders Placed Yet</h3>
              <p class="text-xs text-slate-500">Select fresh produce from the marketplace catalog to place your first wholesale escrow order.</p>
              <button onclick="window.setBuyerTab('catalog')" class="btn-primary text-xs py-2.5 px-5 mt-2 cursor-pointer">Browse Farm Catalog</button>
            </div>
          `:`
            <div class="space-y-4">
              ${n.map(h=>`
                <div class="glass-card p-5 space-y-4 border-l-4 ${h.status==="delivered"?"border-l-emerald-600":h.status==="disputed"?"border-l-red-500":"border-l-amber-500"}">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-black text-slate-900 uppercase">Order #${h.id.slice(0,8)}</span>
                        <span class="status-badge status-${h.status}">${h.status.toUpperCase()}</span>
                        <span class="escrow-pill text-[10px]">${h.escrowHeld?"Escrow Held":"Released"}</span>
                      </div>
                      <h4 class="text-base font-bold text-slate-900 mt-1">${h.productName} (${h.qtyKg} kg @ ${h.pricePerKg} ETB/kg)</h4>
                      <p class="text-xs text-slate-500">Farmer: <strong class="text-slate-800">${h.farmerName}</strong> · Driver: <strong class="text-slate-800">${h.driverName||"Dispatching Driver"}</strong></p>
                    </div>

                    <div class="text-left sm:text-right shrink-0">
                      <span class="text-lg font-black text-emerald-900 block">${h.totalEtb.toLocaleString()} ETB</span>
                      <span class="text-[11px] text-slate-400 font-semibold">${new Date(h.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-[10px] font-bold text-slate-400 block uppercase">Destination Depot</span>
                      <span class="font-bold text-slate-800">${h.deliveryAddress||"Central Wholesale Depot"}</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-[10px] font-bold text-slate-400 block uppercase">Telebirr Ref</span>
                      <span class="font-bold text-slate-800">${h.paymentRef||"TB-ESCROW-LOCKED"}</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-[10px] font-bold text-slate-400 block uppercase">Escrow Breakdown</span>
                      <span class="font-bold text-emerald-800">Farmer 90% (${h.farmerCut.toLocaleString()} ETB) · Driver 5% (${h.driverCut.toLocaleString()} ETB)</span>
                    </div>
                  </div>

                  <!-- Action Bar -->
                  <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div class="flex items-center gap-2">
                      <button onclick="window.openOrderModal('${h.id}')" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-satellite-dish text-emerald-700"></i> Live Tracking
                      </button>
                      <button onclick="window.repeatOrder('${h.listingId}', ${h.qtyKg})" class="btn-secondary text-xs py-2 px-3 text-emerald-800 hover:bg-emerald-50 flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-repeat"></i> ${p.repeatOrderBtn}
                      </button>
                    </div>

                    <div class="flex items-center gap-2">
                      ${h.status==="delivered"?`
                        <button onclick="window.openReviewModal('${h.id}')" class="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer">
                          <i class="fa-solid fa-star text-amber-300"></i> ${p.rateFarmerDriverBtn}
                        </button>
                      `:h.status!=="cancelled"?`
                        <button onclick="window.confirmDelivery('${h.id}')" class="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 cursor-pointer">
                          <i class="fa-solid fa-check"></i> ${p.confirmDeliveryBtn}
                        </button>
                        <button onclick="window.openDisputeModal('${h.id}')" class="btn-secondary text-xs py-2 px-3 text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1.5 cursor-pointer">
                          <i class="fa-solid fa-triangle-exclamation"></i> ${p.disputeBtn}
                        </button>
                      `:""}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </section>
      `}

      <!-- Bulk Cart Slide-over Drawer -->
      ${s?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCart()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${p.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Wholesale direct produce escrow checkout</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${t.length===0?`
              <div class="py-12 text-center space-y-3">
                <i class="fa-solid fa-basket-shopping text-4xl text-slate-300"></i>
                <p class="text-sm font-semibold text-slate-500 ${o==="am"?"lang-am":""}">${p.cartEmpty}</p>
              </div>
            `:`
              <div class="space-y-3 max-h-72 overflow-y-auto pr-1">
                ${t.map(h=>`
                  <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
                    <img src="${h.listing.photos[0]}" class="w-14 h-14 rounded-xl object-cover shrink-0" />
                    
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-bold text-slate-900 truncate ${o==="am"?"lang-am":""}">
                        ${o==="am"&&h.listing.nameAm?h.listing.nameAm:h.listing.productName}
                      </h4>
                      <p class="text-xs text-emerald-800 font-extrabold">${h.listing.pricePerKg} ETB / kg</p>
                      
                      <div class="flex items-center gap-2 mt-2">
                        <button onclick="window.updateCartQty('${h.listing.id}', -25)" class="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">-</button>
                        <span class="text-xs font-black text-slate-900 px-1">${h.qtyKg} kg</span>
                        <button onclick="window.updateCartQty('${h.listing.id}', 25)" class="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">+</button>
                        ${h.qtyKg<h.listing.minOrderKg?`
                          <span class="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">Min ${h.listing.minOrderKg}kg</span>
                        `:""}
                      </div>
                    </div>

                    <div class="text-right shrink-0">
                      <span class="text-sm font-black text-slate-900 block">${(h.qtyKg*h.listing.pricePerKg).toLocaleString()} ETB</span>
                      <button onclick="window.removeFromCart('${h.listing.id}')" class="text-xs text-red-600 hover:text-red-700 font-semibold mt-1 cursor-pointer">Remove</button>
                    </div>
                  </div>
                `).join("")}
              </div>

              <!-- 90/5/5 Escrow Transparent Breakdown Card -->
              <div class="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2 text-xs">
                <div class="flex items-center justify-between text-slate-600">
                  <span>${p.farmerShare}</span>
                  <span class="font-black text-emerald-900">${W.toLocaleString()} ETB</span>
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span>${p.deliveryEstimate}</span>
                  <span class="font-bold text-slate-800">${K.toLocaleString()} ETB</span>
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span>${p.platformFee}</span>
                  <span class="font-bold text-slate-800">${G.toLocaleString()} ETB</span>
                </div>
                <div class="pt-2 border-t border-emerald-300/60 flex items-center justify-between text-sm font-black text-slate-900">
                  <span>${p.totalAmount}</span>
                  <span class="text-emerald-900 text-base font-black">${m.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal()" 
                class="btn-telebirr w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer">
                <i class="fa-solid fa-lock"></i>
                <span class="${o==="am"?"lang-am":""}">${p.checkoutTelebirr}</span>
              </button>
            `}

          </div>
        </div>
      `:""}

      <!-- Telebirr Escrow Interactive Checkout Modal -->
      ${a&&a.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeTelebirrModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-400 text-white flex items-center justify-center mx-auto text-3xl font-black shadow-lg shadow-blue-900/20">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">${p.telebirrTitle}</h3>
              <p class="text-xs text-slate-500 ${o==="am"?"lang-am":""}">${p.telebirrDesc}</p>
            </div>

            <!-- Amount Card -->
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <span class="text-xs font-bold text-blue-700 uppercase tracking-wider">Escrow Lock Amount</span>
              <div class="text-3xl font-black text-blue-950">${a.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <p class="text-[11px] text-blue-600 font-semibold">Funds locked in escrow until you confirm delivery</p>
            </div>

            <form onsubmit="window.processTelebirrPayment(event)" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1">${p.enterPhone}</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">+251</span>
                  <input type="text" value="955667788" required class="w-full pl-14 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block mb-1">${p.enterPin}</label>
                <input type="password" maxlength="4" value="1234" required class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-center text-xl tracking-widest font-black focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium flex items-start gap-2">
                <i class="fa-solid fa-shield-check text-amber-700 text-sm mt-0.5"></i>
                <span class="${o==="am"?"lang-am":""}">${p.escrowGuarantee}</span>
              </div>

              <button type="submit" id="telebirrSubmitBtn" class="btn-telebirr w-full py-3.5 text-sm cursor-pointer">
                <i class="fa-solid fa-check-double"></i> ${p.payNow} (${a.totalEtb.toLocaleString()} ETB)
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Live Order SignalR Tracking Modal -->
      ${r?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">${p.orderTracking}</h3>
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
                  ${r.escrowHeld?"Escrow Held":"Funds Released"}
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
                  <p class="text-xs text-slate-500">Telebirr transaction verified (${r.paymentRef||"TB-20260819"})</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["confirmed","picked_up","delivered"].includes(r.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-tractor"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Farmer Confirmation</h5>
                  <p class="text-xs text-slate-500">${["confirmed","picked_up","delivered"].includes(r.status)?"Produce harvested and ready at farm":"Awaiting farmer acceptance via SMS/App"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${["picked_up","delivered"].includes(r.status)?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-truck"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Driver Pickup & Transit</h5>
                  <p class="text-xs text-slate-500">${["picked_up","delivered"].includes(r.status)?`Partner driver ${r.driverName||"Dawit Kebede"} in transit to ${r.deliveryAddress||"Depot"}`:"Driver assignment in progress"}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${r.status==="delivered"?"bg-emerald-600 text-white":"bg-slate-200 text-slate-500"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Delivery Confirmation & Escrow Release</h5>
                  <p class="text-xs text-slate-500">${r.status==="delivered"?"90% released to farmer, 5% to driver":"Confirm on receipt to release funds"}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 border-t border-slate-200 flex items-center gap-3">
              ${r.status!=="delivered"&&r.status!=="disputed"?`
                <button onclick="window.confirmDelivery('${r.id}')" class="btn-primary flex-1 py-3 text-xs cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i> ${p.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${r.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${p.disputeBtn}
                </button>
              `:`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                  <i class="fa-solid fa-check-double text-emerald-700"></i> Delivery Completed & Escrow Released to Farmer
                </div>
              `}
            </div>

          </div>
        </div>
      `:""}

      <!-- Review & Feedback Modal -->
      ${i&&i.isOpen&&i.order?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeReviewModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl font-black">
                <i class="fa-solid fa-star"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">${p.reviewModalTitle}</h3>
              <p class="text-xs text-slate-500">Order #${i.order.id.slice(0,8)} · Farmer ${i.order.farmerName}</p>
            </div>

            <form onsubmit="window.handleReviewSubmit(event, '${i.order.id}', '${i.order.farmerId}')" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-2 font-bold">${p.farmerRatingLabel}</label>
                <div class="flex items-center justify-center gap-3 text-2xl text-amber-400 py-2">
                  <button type="button" onclick="window.setStarRating(1)" class="cursor-pointer hover:scale-125 transition-transform"><i class="fa-solid fa-star"></i></button>
                  <button type="button" onclick="window.setStarRating(2)" class="cursor-pointer hover:scale-125 transition-transform"><i class="fa-solid fa-star"></i></button>
                  <button type="button" onclick="window.setStarRating(3)" class="cursor-pointer hover:scale-125 transition-transform"><i class="fa-solid fa-star"></i></button>
                  <button type="button" onclick="window.setStarRating(4)" class="cursor-pointer hover:scale-125 transition-transform"><i class="fa-solid fa-star"></i></button>
                  <button type="button" onclick="window.setStarRating(5)" class="cursor-pointer hover:scale-125 transition-transform"><i class="fa-solid fa-star"></i></button>
                </div>
                <input type="hidden" id="selectedStarRating" value="5" />
              </div>

              <div>
                <label class="block mb-1 font-bold">Feedback Comments</label>
                <textarea id="reviewCommentInput" rows="3" placeholder="${p.reviewCommentPlaceholder}" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"></textarea>
              </div>

              <button type="submit" class="btn-primary w-full py-3 text-xs cursor-pointer">
                <i class="fa-solid fa-paper-plane"></i> ${p.submitFeedbackBtn}
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Dispute Modal with Reason & Evidence Photo -->
      ${f&&f.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto text-2xl font-black">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">${p.disputeBtn}</h3>
              <p class="text-xs text-slate-500">Escrow funds will be frozen while platform administrators review the evidence.</p>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${f.orderId}')" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1 font-bold">Dispute Reason</label>
                <select id="disputeReasonSelect" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 focus:outline-none">
                  <option value="Damaged Produce / Spoilage">Damaged Produce / Spoilage in Transit</option>
                  <option value="Quantity / Weight Discrepancy">Quantity / Weight Discrepancy</option>
                  <option value="Wrong Grade / Variety Delivered">Wrong Grade / Variety Delivered</option>
                  <option value="Driver Delivery Delay">Severe Driver Delivery Delay</option>
                  <option value="Other Issue">Other Issue</option>
                </select>
              </div>

              <div>
                <label class="block mb-1 font-bold">Dispute Evidence Photo URL (Optional)</label>
                <input type="text" id="disputePhotoInput" placeholder="https://..." class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900">
                <i class="fa-solid fa-shield-halved text-red-700 mr-1"></i>
                Admin arbitration team will inspect the case within 2 hours.
              </div>

              <button type="submit" class="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs cursor-pointer">
                <i class="fa-solid fa-gavel mr-1"></i> Submit Dispute for Arbitration
              </button>
            </form>

          </div>
        </div>
      `:""}

    </div>
  `}function jt(o,e,t,s,r,a){var W,K,G,h,J,le;const n=ne[o],l=(e==null?void 0:e.verified)??!0,i=s.filter(w=>w.status==="delivered"),f=i.reduce((w,X)=>w+X.farmerCut,0)*.4,p=i.reduce((w,X)=>w+X.farmerCut,0)*.8,$=i.reduce((w,X)=>w+X.farmerCut,0)||r.totalEarnedEtb,m=a.earningsTab==="today"?f:a.earningsTab==="week"?p:$;return`
    <div class="space-y-8 pb-20">
      
      <!-- Farmer Status & Verification Header Banner -->
      <div class="glass-card p-6 border-l-4 border-l-emerald-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${(e==null?void 0:e.region)||"Oromia (Bishoftu)"}
            </span>
            ${l?`
              <span class="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
                <i class="fa-solid fa-badge-check text-emerald-600"></i> ${n.verifiedFarmerBadge}
              </span>
            `:`
              <span class="text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full flex items-center gap-1">
                <i class="fa-solid fa-clock text-amber-600"></i> ${n.unverifiedFarmerNotice}
              </span>
            `}
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 ${o==="am"?"lang-am":""}">
            ${(e==null?void 0:e.businessName)||(o==="am"&&(e!=null&&e.nameAm)?e==null?void 0:e.nameAm:(e==null?void 0:e.name)||"Farmer Portal")}
          </h1>
          <p class="text-xs text-slate-500 font-medium">
            Telebirr Registered: <strong class="text-slate-800">${(e==null?void 0:e.phone)||"+251911223344"}</strong> · 90% Direct Producer Escrow Net Revenue
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button onclick="window.toggleCreateListingModal()" class="btn-primary text-xs py-3 px-5 shadow-md flex items-center gap-2 cursor-pointer">
            <i class="fa-solid fa-plus-circle"></i>
            <span class="${o==="am"?"lang-am":""}">${n.postNewListing}</span>
          </button>
        </div>
      </div>

      <!-- Farmer 90% Escrow Earnings Hub with Today/Week/Month Tabs -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-wallet text-emerald-700"></i> ${n.payoutHistoryTitle}
          </h2>

          <!-- Time Tabs -->
          <div class="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button onclick="window.setFarmerEarningsTab('today')" class="px-3 py-1.5 rounded-lg transition-all cursor-pointer ${a.earningsTab==="today"?"bg-white text-emerald-900 shadow-xs":"text-slate-500 hover:text-slate-800"}">
              ${n.earningsToday}
            </button>
            <button onclick="window.setFarmerEarningsTab('week')" class="px-3 py-1.5 rounded-lg transition-all cursor-pointer ${a.earningsTab==="week"?"bg-white text-emerald-900 shadow-xs":"text-slate-500 hover:text-slate-800"}">
              ${n.earningsWeek}
            </button>
            <button onclick="window.setFarmerEarningsTab('month')" class="px-3 py-1.5 rounded-lg transition-all cursor-pointer ${a.earningsTab==="month"?"bg-white text-emerald-900 shadow-xs":"text-slate-500 hover:text-slate-800"}">
              ${n.earningsMonth}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div class="glass-card p-5 border-l-4 border-l-emerald-600 space-y-1">
            <div class="flex items-center justify-between text-xs font-bold text-slate-500">
              <span class="uppercase tracking-wider">Telebirr Net Deposited</span>
              <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr 90%</span>
            </div>
            <div class="text-3xl font-black text-slate-900">
              ${Math.round(m).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
            </div>
            <p class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <i class="fa-solid fa-circle-check"></i> ${n.depositedToWallet} (90% Direct Cut)
            </p>
          </div>

          <div class="glass-card p-5 border-l-4 border-l-amber-500 space-y-1">
            <div class="flex items-center justify-between text-xs font-bold text-slate-500">
              <span class="uppercase tracking-wider">Pending Escrow Release</span>
              <span class="escrow-badge text-[10px]">Active Escrow</span>
            </div>
            <div class="text-3xl font-black text-slate-900">
              ${r.pendingEscrowEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
            </div>
            <p class="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
              <i class="fa-solid fa-hourglass-half"></i> Releases automatically on buyer delivery receipt
            </p>
          </div>

          <div class="glass-card p-5 border-l-4 border-l-blue-600 space-y-1">
            <div class="flex items-center justify-between text-xs font-bold text-slate-500">
              <span class="uppercase tracking-wider">Total Bulk Orders</span>
              <span class="text-xs text-blue-600 font-bold">100% Verified</span>
            </div>
            <div class="text-3xl font-black text-slate-900">
              ${s.length} <span class="text-sm font-bold text-slate-500">Orders</span>
            </div>
            <p class="text-[11px] text-blue-700 font-semibold flex items-center gap-1">
              <i class="fa-solid fa-truck-ramp-box"></i> Direct wholesale restaurant & export fulfillment
            </p>
          </div>

        </div>
      </section>

      <!-- Incoming Orders & Fulfillment -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-bell text-amber-500"></i> ${n.incomingOrders}
          </h2>
          <span class="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
            ${s.filter(w=>w.status==="pending").length} Awaiting Confirmation
          </span>
        </div>

        ${s.length===0?`
          <div class="glass-card p-10 text-center text-slate-500 text-sm space-y-2">
            <i class="fa-solid fa-inbox text-3xl text-slate-300"></i>
            <p>No incoming orders at the moment. Post new listings to receive buyer demand.</p>
          </div>
        `:`
          <div class="space-y-3">
            ${s.map(w=>`
              <div class="glass-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 ${w.status==="pending"?"border-l-amber-500":w.status==="confirmed"?"border-l-blue-500":"border-l-emerald-500"}">
                
                <div class="space-y-1.5">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-base font-extrabold text-slate-900 ${o==="am"?"lang-am":""}">
                      ${w.productName}
                    </span>
                    <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                      ${w.qtyKg} kg
                    </span>
                    <span class="status-badge status-${w.status}">${w.status.toUpperCase()}</span>
                    <span class="escrow-pill text-[10px]">
                      <i class="fa-solid fa-shield-check text-amber-600"></i> ${w.farmerCut.toLocaleString()} ETB (90% Net Cut)
                    </span>
                  </div>

                  <p class="text-xs text-slate-600">
                    <i class="fa-solid fa-building text-slate-400 mr-1"></i> Buyer: <strong class="text-slate-800">${w.buyerName}</strong> (${w.buyerPhone})
                  </p>
                  <p class="text-xs text-slate-500">
                    <i class="fa-solid fa-location-dot text-slate-400 mr-1"></i> Delivery to: ${w.deliveryAddress||"Addis Ababa Bole Wholesale Depot"}
                  </p>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
                  ${w.status==="pending"?`
                    <button onclick="window.confirmFarmerOrder('${w.id}')" 
                      class="btn-primary text-xs py-2 px-4 shadow-sm flex items-center gap-1.5 cursor-pointer">
                      <i class="fa-solid fa-check"></i>
                      <span class="${o==="am"?"lang-am":""}">${n.confirmOrderAction}</span>
                    </button>
                    <button onclick="window.openFarmerRejectModal('${w.id}')" 
                      class="btn-secondary text-xs py-2 px-3 text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1 cursor-pointer">
                      <i class="fa-solid fa-xmark"></i>
                      <span>${n.rejectOrderAction}</span>
                    </button>
                  `:`
                    <div class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5">
                      <i class="fa-solid fa-truck-fast text-emerald-600"></i>
                      <span>Driver: ${w.driverName||"Dawit Kebede"}</span>
                    </div>
                  `}
                  
                  <button onclick="window.openOrderModal('${w.id}')" class="btn-secondary text-xs py-2 px-3 cursor-pointer" title="View details">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>

              </div>
            `).join("")}
          </div>
        `}
      </section>

      <!-- My Active Produce Listings -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-box-open text-emerald-600"></i> ${n.myActiveListings}
          </h2>
          <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            ${t.length} Active Listings
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${t.map(w=>`
            <div class="glass-card overflow-hidden flex flex-col justify-between">
              <div>
                <div class="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img src="${w.photos[0]}" class="w-full h-full object-cover" />
                  <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-800 text-white shadow-xs">
                    ${w.status.toUpperCase()}
                  </span>
                  <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/60 backdrop-blur-md text-white">
                    <i class="fa-solid fa-location-dot text-emerald-400"></i> ${w.region}
                  </span>
                </div>
                
                <div class="p-5 space-y-2">
                  <h3 class="font-bold text-slate-900 text-base ${o==="am"?"lang-am":""}">
                    ${o==="am"&&w.nameAm?w.nameAm:w.productName}
                  </h3>
                  <div class="flex items-center justify-between text-xs text-slate-600">
                    <span>Price: <strong class="text-emerald-800 font-black text-base">${w.pricePerKg} ETB</strong>/kg</span>
                    <span>Stock: <strong class="font-bold text-slate-800">${w.qtyKg.toLocaleString()} kg</strong></span>
                  </div>
                  <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Min order: <strong class="text-slate-700">${w.minOrderKg} kg</strong></span>
                    <span><i class="fa-solid fa-calendar text-emerald-600 mr-1"></i> ${w.availableFrom}</span>
                  </div>
                </div>
              </div>

              <div class="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <span class="text-xs text-amber-500 font-bold">
                  <i class="fa-solid fa-star"></i> ${w.farmerRating} (${w.reviewCount})
                </span>
                <div class="flex items-center gap-2">
                  <button onclick="window.openEditListingModal('${w.id}')" class="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 cursor-pointer">
                    <i class="fa-solid fa-pen-to-square"></i> ${n.editListing}
                  </button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Post / Edit Produce Listing Modal -->
      ${a.isCreateModalOpen||a.editingListing?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeListingModal()">
          <div class="modal-content max-w-xl p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                  <i class="fa-solid ${a.editingListing?"fa-pen-to-square":"fa-plus"}"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">
                    ${a.editingListing?n.editListing:n.postNewListing}
                  </h3>
                  <p class="text-xs text-slate-500 font-medium">Publish directly to wholesale buyers across Ethiopia</p>
                </div>
              </div>
              <button onclick="window.closeListingModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleSaveListing(event, '${a.editingListing?a.editingListing.id:""}')" class="space-y-4 text-xs font-semibold text-slate-700">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-1">${n.productNameEn}</label>
                  <input type="text" id="newProdName" required value="${a.editingListing?a.editingListing.productName:""}" placeholder="e.g. Fresh Sholla Tomatoes" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block mb-1">${n.productNameAm}</label>
                  <input type="text" id="newProdNameAm" value="${((W=a.editingListing)==null?void 0:W.nameAm)||""}" placeholder="ለምሳሌ: የሾላ ቀይ ቲማቲም" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none lang-am" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block mb-1">${n.categoryLabel}</label>
                  <select id="newProdCategory" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="Vegetables" ${((K=a.editingListing)==null?void 0:K.category)==="Vegetables"?"selected":""}>Vegetables / አትክልት</option>
                    <option value="Grains" ${((G=a.editingListing)==null?void 0:G.category)==="Grains"?"selected":""}>Grains / እህል</option>
                    <option value="Fruits" ${((h=a.editingListing)==null?void 0:h.category)==="Fruits"?"selected":""}>Fruits / ፍራፍሬ</option>
                    <option value="Coffee" ${((J=a.editingListing)==null?void 0:J.category)==="Coffee"?"selected":""}>Coffee / ቡና</option>
                    <option value="Spices" ${((le=a.editingListing)==null?void 0:le.category)==="Spices"?"selected":""}>Spices / ቅመማ ቅመም</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1">${n.qtyKgLabel}</label>
                  <input type="number" id="newProdQty" required min="10" value="${a.editingListing?a.editingListing.qtyKg:2500}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block mb-1">${n.priceKgLabel}</label>
                  <input type="number" id="newProdPrice" required min="1" value="${a.editingListing?a.editingListing.pricePerKg:45}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-1">${n.minOrderLabel}</label>
                  <input type="number" id="newProdMinOrder" required min="1" value="${a.editingListing?a.editingListing.minOrderKg:50}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block mb-1">${n.farmLocationLabel}</label>
                  <input type="text" id="newProdRegion" value="${a.editingListing?a.editingListing.region:(e==null?void 0:e.region)||"Oromia (Bishoftu)"}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block mb-1">Produce Photo URL</label>
                <input type="text" id="newProdPhoto" value="${a.editingListing?a.editingListing.photos[0]:"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>

              <button type="submit" class="btn-primary w-full py-3.5 text-sm mt-4 cursor-pointer">
                <i class="fa-solid fa-cloud-arrow-up"></i> ${a.editingListing?"Update Produce Listing":n.publishListingBtn}
              </button>
            </form>

          </div>
        </div>
      `:""}

      <!-- Decline Order Modal -->
      ${a.rejectingOrder?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeFarmerRejectModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            <div class="text-center space-y-2">
              <div class="w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto text-2xl font-black">
                <i class="fa-solid fa-ban"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900">${n.rejectOrderAction}</h3>
              <p class="text-xs text-slate-500">Declining will restore your inventory and issue an instant 100% refund to the buyer.</p>
            </div>

            <form onsubmit="window.handleFarmerRejectSubmit(event, '${a.rejectingOrder.id}')" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1 font-bold">${n.rejectReasonPrompt}</label>
                <textarea id="farmerRejectReason" rows="3" required placeholder="e.g. Quantity committed to earlier contract or harvest weather delay" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
              </div>

              <button type="submit" class="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs cursor-pointer">
                Confirm Decline & Process Refund
              </button>
            </form>
          </div>
        </div>
      `:""}

    </div>
  `}function Ht(o,e,t,s,r){const a=ne[o],n=(e==null?void 0:e.isOnline)??!0;return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Driver Header & Availability Toggle -->
      <div class="glass-card p-6 border-l-4 border-l-amber-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1.5">
              <i class="fa-solid fa-truck text-amber-700"></i> ${(e==null?void 0:e.vehicleType)||"Isuzu 5-Ton NPR Truck"}
            </span>
            <span class="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Plate: ${(e==null?void 0:e.licensePlate)||"ET-3-84920"}
            </span>
            <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <i class="fa-solid fa-check-circle"></i> Verified Freight Carrier
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 ${o==="am"?"lang-am":""}">
            ${(e==null?void 0:e.businessName)||(o==="am"&&(e!=null&&e.nameAm)?e==null?void 0:e.nameAm:(e==null?void 0:e.name)||"Dawit Freight Logistics")}
          </h1>
          <p class="text-xs text-slate-500 font-medium">
            Telebirr Payout Wallet: <strong class="text-slate-800">${(e==null?void 0:e.phone)||"+251977889900"}</strong> · 5% Guaranteed Freight Commission
          </p>
        </div>

        <!-- Online/Offline Switcher -->
        <div class="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 shrink-0">
          <span class="text-xs font-extrabold ${n?"text-emerald-700":"text-slate-500"}">
            ${n?a.driverOnline:a.driverOffline}
          </span>
          <button onclick="window.toggleDriverOnlineStatus(${!n})" 
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${n?"bg-emerald-600":"bg-slate-300"}">
            <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${n?"translate-x-6":"translate-x-1"}"></span>
          </button>
        </div>
      </div>

      <!-- Driver Earnings Overview (5% Trip Cut) -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-l-amber-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span class="uppercase tracking-wider">Telebirr Freight Cut</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr 5%</span>
          </div>
          <div class="text-3xl font-black text-slate-900">
            ${s.totalEarnedEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
            <i class="fa-solid fa-circle-check"></i> Deposited directly to Telebirr wallet
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-l-emerald-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span class="uppercase tracking-wider">Pending Trip Escrow</span>
            <span class="escrow-badge text-[10px]">In Transit</span>
          </div>
          <div class="text-3xl font-black text-slate-900">
            ${s.pendingEtb.toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <i class="fa-solid fa-hourglass-half"></i> Releases when buyer accepts delivery
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-l-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span class="uppercase tracking-wider">${a.totalDeliveredTrips}</span>
            <span class="text-xs text-blue-600 font-bold">100% On-Time</span>
          </div>
          <div class="text-3xl font-black text-slate-900">
            ${s.deliveredTripsCount} <span class="text-sm font-bold text-slate-500">Completed Trips</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold flex items-center gap-1">
            <i class="fa-solid fa-star text-amber-500"></i> 4.9 Rating (from Farmers & Buyers)
          </p>
        </div>

      </section>

      <!-- Active / Available Delivery Trips -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2 ${o==="am"?"lang-am":""}">
            <i class="fa-solid fa-road text-amber-600"></i> ${a.availableTrips}
          </h2>
          <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            ${t.length} Active Dispatch Routes
          </span>
        </div>

        ${t.length===0?`
          <div class="glass-card p-10 text-center text-slate-500 text-sm space-y-2">
            <i class="fa-solid fa-truck-loading text-3xl text-slate-300"></i>
            <p>No delivery trips currently assigned. Stay online to receive dispatch alerts.</p>
          </div>
        `:`
          <div class="space-y-4">
            ${t.map(l=>`
              <div class="glass-card p-5 space-y-4 border-l-4 ${l.status==="confirmed"?"border-l-amber-500":l.status==="picked_up"?"border-l-blue-500":"border-l-emerald-500"}">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-black text-amber-700 uppercase tracking-wider">Freight Trip #${l.id.slice(0,8).toUpperCase()}</span>
                      <span class="status-badge status-${l.status}">${l.status.toUpperCase()}</span>
                    </div>
                    <h3 class="text-base font-extrabold text-slate-900 mt-1 ${o==="am"?"lang-am":""}">${l.productName} (${l.qtyKg} kg)</h3>
                  </div>
                  <div class="text-left sm:text-right shrink-0">
                    <span class="text-xs text-slate-400 font-medium block">${a.tripCommission}</span>
                    <span class="text-xl font-black text-amber-700">${l.driverCut.toLocaleString()} ETB</span>
                  </div>
                </div>

                <!-- Origin Farm & Destination Depot Route Details -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                    <div class="flex items-center justify-between">
                      <span class="font-black text-emerald-900 flex items-center gap-1.5">
                        <i class="fa-solid fa-seedling text-emerald-600"></i> 1. Farm Pickup Origin
                      </span>
                      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.farmerRegion)}" target="_blank" class="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                        <i class="fa-solid fa-diamond-turn-right text-xs"></i> GPS Map
                      </a>
                    </div>
                    <p class="text-slate-900 font-bold">${l.farmerRegion}</p>
                    <p class="text-slate-600 font-medium">Farmer: <strong class="text-slate-800">${l.farmerName}</strong> (<a href="tel:${l.farmerPhone}" class="text-emerald-800 underline">${l.farmerPhone}</a>)</p>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1.5">
                    <div class="flex items-center justify-between">
                      <span class="font-black text-blue-900 flex items-center gap-1.5">
                        <i class="fa-solid fa-location-dot text-blue-600"></i> 2. Buyer Delivery Destination
                      </span>
                      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.deliveryAddress||"Addis Ababa")}" target="_blank" class="text-blue-700 font-bold hover:underline flex items-center gap-1">
                        <i class="fa-solid fa-diamond-turn-right text-xs"></i> GPS Map
                      </a>
                    </div>
                    <p class="text-slate-900 font-bold">${l.deliveryAddress||"Addis Ababa Central Wholesale Depot"}</p>
                    <p class="text-slate-600 font-medium">Buyer: <strong class="text-slate-800">${l.buyerName}</strong> (<a href="tel:${l.buyerPhone}" class="text-blue-800 underline">${l.buyerPhone}</a>)</p>
                  </div>
                </div>

                <!-- Driver Actions -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="text-xs font-bold text-slate-500">
                    Total produce freight weight: <strong class="text-slate-900 font-black">${l.qtyKg} kg</strong>
                  </div>

                  <div class="flex items-center gap-2 w-full sm:w-auto">
                    ${l.status==="confirmed"?`
                      <button onclick="window.openDriverPickupModal('${l.id}')" class="btn-primary w-full sm:w-auto text-xs py-2.5 px-4 shadow-sm flex items-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-camera"></i> ${a.uploadProof} & Mark Picked Up
                      </button>
                    `:l.status==="picked_up"?`
                      <button onclick="window.driverCompleteDelivery('${l.id}')" class="btn-primary w-full sm:w-auto text-xs py-2.5 px-4 shadow-sm flex items-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-circle-check"></i> ${a.markCompleted}
                      </button>
                    `:`
                      <span class="text-xs text-emerald-700 font-black flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <i class="fa-solid fa-circle-check text-emerald-600"></i> Trip Completed · ${l.driverCut} ETB Credited to Telebirr
                      </span>
                    `}
                    
                    <button onclick="window.openOrderModal('${l.id}')" class="btn-secondary text-xs py-2.5 px-3 cursor-pointer" title="View live timeline">
                      <i class="fa-solid fa-satellite-dish text-emerald-700"></i>
                    </button>
                  </div>
                </div>

              </div>
            `).join("")}
          </div>
        `}
      </section>

      <!-- Pickup Photo Upload Modal -->
      ${r?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDriverPickupModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            <div class="text-center space-y-2">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl font-black">
                <i class="fa-solid fa-camera"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900">${a.uploadProof}</h3>
              <p class="text-xs text-slate-500">Trip #${r.id.slice(0,8)} · ${r.productName} (${r.qtyKg} kg)</p>
            </div>

            <form onsubmit="window.handleDriverPickupSubmit(event, '${r.id}')" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1 font-bold">Proof of Pickup / Farm Loading Photo URL</label>
                <input type="text" id="pickupPhotoUrlInput" value="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>

              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
                <i class="fa-solid fa-info-circle text-amber-700 mr-1"></i>
                Marking picked up will alert the wholesale buyer that produce is in transit.
              </div>

              <button type="submit" class="btn-primary w-full py-3 text-xs cursor-pointer">
                Confirm Pickup & Start Freight Delivery
              </button>
            </form>
          </div>
        </div>
      `:""}

    </div>
  `}function Wt(o,e,t,s,r,a){const n=ne[o],l=t.filter(i=>i.status==="disputed");return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="glass-card p-6 border-l-4 border-l-purple-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance Lead · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 ${o==="am"?"lang-am":""}">
            ${n.adminPortalTitle}
          </h1>
          <p class="text-xs text-slate-500 font-medium">
            Ethiopian Produce Exchange Operations · Telebirr Escrow Compliance & Regional Rollout Oversight
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button onclick="window.api.exportCsv('orders')" class="btn-secondary text-xs py-2.5 px-3 flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-file-csv text-emerald-700"></i> ${n.exportTransactionsBtn}
          </button>
          <button onclick="window.api.exportCsv('payouts')" class="btn-secondary text-xs py-2.5 px-3 flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-file-invoice-dollar text-amber-700"></i> ${n.exportPayoutsBtn}
          </button>
          <button onclick="window.api.exportCsv('users')" class="btn-secondary text-xs py-2.5 px-3 flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-users text-blue-700"></i> ${n.exportUsersBtn}
          </button>
        </div>
      </div>

      <!-- Navigation Sub-Tabs -->
      <section class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        <button onclick="window.setAdminTab('overview')" class="px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${a.activeTab==="overview"?"bg-purple-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
          <i class="fa-solid fa-chart-pie mr-1.5"></i> Operations KPI
        </button>
        <button onclick="window.setAdminTab('users')" class="px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${a.activeTab==="users"?"bg-purple-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
          <i class="fa-solid fa-user-check mr-1.5"></i> ${n.userVerificationQueue} (${s.length})
        </button>
        <button onclick="window.setAdminTab('orders')" class="px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${a.activeTab==="orders"?"bg-purple-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
          <i class="fa-solid fa-receipt mr-1.5"></i> ${n.activeOrdersOversight} (${t.length})
        </button>
        <button onclick="window.setAdminTab('disputes')" class="px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${a.activeTab==="disputes"?"bg-purple-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
          <i class="fa-solid fa-scale-balanced mr-1.5"></i> ${n.resolveDisputeTitle} (${l.length})
        </button>
        <button onclick="window.setAdminTab('hubs')" class="px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${a.activeTab==="hubs"?"bg-purple-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
          <i class="fa-solid fa-map-location-dot mr-1.5"></i> ${n.regionalHubsTitle} (${r.length})
        </button>
        <button onclick="window.setAdminTab('sms')" class="px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${a.activeTab==="sms"?"bg-purple-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
          <i class="fa-solid fa-tower-broadcast mr-1.5"></i> ${n.broadcastSmsTitle}
        </button>
      </section>

      ${a.activeTab==="overview"?`
        <!-- Platform Analytics KPI Cards -->
        <section class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
            <span class="text-xs font-bold text-slate-500">${n.statTotalVolume}</span>
            <div class="text-xl sm:text-2xl font-black text-slate-900">
              ${e.totalTransactionVolumeEtb.toLocaleString()} <span class="text-xs font-bold text-emerald-700">ETB</span>
            </div>
            <p class="text-[11px] text-emerald-700 font-semibold">100% via Telebirr Escrow</p>
          </div>

          <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
            <span class="text-xs font-bold text-slate-500">${n.statPlatformRev}</span>
            <div class="text-xl sm:text-2xl font-black text-purple-900">
              ${e.totalPlatformCommissionEtb.toLocaleString()} <span class="text-xs font-bold text-purple-700">ETB</span>
            </div>
            <p class="text-[11px] text-purple-700 font-semibold">5% standard platform take</p>
          </div>

          <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
            <span class="text-xs font-bold text-slate-500">${n.statActiveEscrow}</span>
            <div class="text-xl sm:text-2xl font-black text-slate-900">
              ${e.activeEscrowHeldEtb.toLocaleString()} <span class="text-xs font-bold text-amber-700">ETB</span>
            </div>
            <p class="text-[11px] text-amber-700 font-semibold">Secured in Telebirr vault</p>
          </div>

          <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
            <span class="text-xs font-bold text-slate-500">Registered Marketplace Users</span>
            <div class="text-xl sm:text-2xl font-black text-slate-900">
              ${s.length||e.totalUsers}
            </div>
            <p class="text-[11px] text-blue-700 font-semibold">${e.totalFarmers} Farmers · ${e.totalBuyers} Buyers · ${e.totalDrivers} Drivers</p>
          </div>
        </section>

        <!-- Escrow Split Architecture Summary -->
        <section class="glass-card p-6 space-y-4">
          <h3 class="text-base font-bold text-slate-900">Telebirr 90 / 5 / 5 Escrow Split Summary</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span class="font-black text-emerald-900 text-sm">90% Direct Farmer Payout</span>
              <p class="text-slate-600">Disbursed directly into the smallholder farmer's Telebirr account upon verified buyer receipt.</p>
              <div class="text-lg font-black text-emerald-800 pt-1">${(e.totalTransactionVolumeEtb*.9).toLocaleString()} ETB Total</div>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <span class="font-black text-amber-900 text-sm">5% Partner Freight Driver Cut</span>
              <p class="text-slate-600">Guaranteed trip compensation for Isuzu partner truck drivers providing reliable farm pickup.</p>
              <div class="text-lg font-black text-amber-800 pt-1">${(e.totalTransactionVolumeEtb*.05).toLocaleString()} ETB Total</div>
            </div>

            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
              <span class="font-black text-purple-900 text-sm">5% Marketplace Sustainability Fee</span>
              <p class="text-slate-600">Funds SMS gateways, PostGIS location servers, and quality compliance field staff.</p>
              <div class="text-lg font-black text-purple-800 pt-1">${e.totalPlatformCommissionEtb.toLocaleString()} ETB Total</div>
            </div>
          </div>
        </section>
      `:""}

      ${a.activeTab==="users"?`
        <!-- Identity Verification Queue -->
        <section class="glass-card p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900">${n.userVerificationQueue}</h2>
              <p class="text-xs text-slate-500">Review National IDs, Kebele certificates, and Driver freight licenses for platform verification.</p>
            </div>
            <button onclick="window.api.exportCsv('users')" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
              <i class="fa-solid fa-file-csv text-emerald-700"></i> ${n.exportUsersBtn}
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left text-slate-700">
              <thead class="bg-slate-100/80 text-slate-800 uppercase text-[10px] font-black">
                <tr>
                  <th class="p-3">User & Organization</th>
                  <th class="p-3">Role</th>
                  <th class="p-3">Phone & Language</th>
                  <th class="p-3">Region / Fleet</th>
                  <th class="p-3">Status</th>
                  <th class="p-3 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/60">
                ${s.map(i=>`
                  <tr class="hover:bg-slate-50">
                    <td class="p-3">
                      <strong class="font-bold text-slate-900 block">${i.name}</strong>
                      <span class="text-slate-500 text-[11px]">${i.businessName||"Individual Entity"}</span>
                    </td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded-md font-extrabold uppercase text-[10px] ${i.role==="farmer"?"bg-emerald-100 text-emerald-800":i.role==="driver"?"bg-amber-100 text-amber-800":i.role==="buyer"?"bg-blue-100 text-blue-800":"bg-purple-100 text-purple-800"}">
                        ${i.role}
                      </span>
                    </td>
                    <td class="p-3">
                      <strong class="text-slate-800">${i.phone}</strong>
                      <span class="block text-[10px] text-slate-400 font-semibold uppercase">Lang: ${i.preferredLanguage||"en"}</span>
                    </td>
                    <td class="p-3">
                      <span>${i.region}</span>
                      ${i.vehicleType?`<span class="block text-[10px] text-amber-700 font-bold">${i.vehicleType} (${i.licensePlate||"ET"})</span>`:""}
                    </td>
                    <td class="p-3">
                      ${i.verified?`
                        <span class="text-emerald-700 font-bold flex items-center gap-1">
                          <i class="fa-solid fa-check-circle"></i> Verified
                        </span>
                      `:`
                        <span class="text-amber-700 font-bold flex items-center gap-1">
                          <i class="fa-solid fa-clock"></i> Pending
                        </span>
                      `}
                    </td>
                    <td class="p-3 text-right">
                      <button onclick="window.adminToggleUserVerification('${i.id}', ${!i.verified})" 
                        class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${i.verified?"bg-red-50 text-red-700 border border-red-200 hover:bg-red-100":"bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"}">
                        ${i.verified?n.revokeUserBtn:n.approveUserBtn}
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </section>
      `:""}

      ${a.activeTab==="orders"?`
        <!-- Master Order Oversight & Escrow Ledger -->
        <section class="glass-card p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900">${n.activeOrdersOversight}</h2>
              <p class="text-xs text-slate-500">Live monitoring of all marketplace produce orders, driver dispatch, and escrow release checkpoints.</p>
            </div>
            <button onclick="window.api.exportCsv('orders')" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
              <i class="fa-solid fa-file-csv text-emerald-700"></i> ${n.exportTransactionsBtn}
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left text-slate-700">
              <thead class="bg-slate-100/80 text-slate-800 uppercase text-[10px] font-black">
                <tr>
                  <th class="p-3">Order ID & Date</th>
                  <th class="p-3">Produce & Qty</th>
                  <th class="p-3">Farmer & Phone</th>
                  <th class="p-3">Buyer & Destination</th>
                  <th class="p-3">Assigned Driver</th>
                  <th class="p-3">Total (ETB)</th>
                  <th class="p-3">Escrow Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/60">
                ${t.map(i=>`
                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-mono font-bold text-slate-900">
                      #${i.id.slice(0,8).toUpperCase()}
                      <span class="block text-[10px] text-slate-400 font-sans font-medium">${new Date(i.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td class="p-3 font-bold text-slate-800">
                      ${i.productName}
                      <span class="block text-[10px] text-emerald-700">${i.qtyKg} kg @ ${i.pricePerKg} ETB</span>
                    </td>
                    <td class="p-3">
                      <strong>${i.farmerName}</strong>
                      <span class="block text-slate-400 text-[10px]">${i.farmerPhone}</span>
                    </td>
                    <td class="p-3">
                      <strong>${i.buyerName}</strong>
                      <span class="block text-slate-400 text-[10px]">${i.deliveryAddress||"Addis Ababa"}</span>
                    </td>
                    <td class="p-3">
                      <span class="font-semibold text-slate-800">${i.driverName||"Unassigned / Auto"}</span>
                    </td>
                    <td class="p-3 font-black text-emerald-900">
                      ${i.totalEtb.toLocaleString()} ETB
                    </td>
                    <td class="p-3">
                      <span class="status-badge status-${i.status}">${i.status.toUpperCase()}</span>
                      <span class="escrow-pill text-[9px] block mt-1">${i.escrowHeld?"Escrow Held":"Released"}</span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </section>
      `:""}

      ${a.activeTab==="disputes"?`
        <!-- Dispute Resolution & Evidence Inspection -->
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-900 ${o==="am"?"lang-am":""}">
                <i class="fa-solid fa-scale-balanced text-purple-600 mr-2"></i> ${n.resolveDisputeTitle}
              </h2>
              <p class="text-xs text-slate-500">Inspect evidence photos, timestamps, and order claims before executing Telebirr release or refund.</p>
            </div>
            <span class="text-xs font-bold px-3 py-1 ${l.length>0?"bg-red-100 text-red-800":"bg-slate-100 text-slate-600"} rounded-full">
              ${l.length} Pending Arbitration
            </span>
          </div>

          ${l.length===0?`
            <div class="glass-card p-8 text-center text-slate-500 text-xs space-y-2">
              <i class="fa-solid fa-circle-check text-emerald-500 text-3xl mb-1 block"></i>
              <p class="font-bold text-slate-800 text-sm">Zero Active Disputes</p>
              <p>All marketplace transactions are proceeding smoothly with automated Telebirr escrow releases.</p>
            </div>
          `:`
            <div class="space-y-4">
              ${l.map(i=>`
                <div class="glass-card p-6 border border-red-200 bg-red-50/20 space-y-4">
                  <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-red-100">
                    <div>
                      <span class="text-xs font-black text-red-700 uppercase tracking-wider">Dispute on Order #${i.id.slice(0,8).toUpperCase()}</span>
                      <h3 class="text-base font-extrabold text-slate-900">${i.productName} (${i.qtyKg} kg · ${i.totalEtb.toLocaleString()} ETB)</h3>
                      <p class="text-xs text-slate-600">Buyer: <strong class="text-slate-800">${i.buyerName}</strong> (${i.buyerPhone}) · Farmer: <strong class="text-slate-800">${i.farmerName}</strong> (${i.farmerPhone})</p>
                    </div>

                    <div class="text-right">
                      <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold block">Escrow Frozen</span>
                      <span class="text-sm font-black text-red-900 mt-1 block">${i.totalEtb.toLocaleString()} ETB</span>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-3.5 rounded-xl bg-white border border-red-200 space-y-1">
                      <span class="font-bold text-red-800 block uppercase text-[10px]">Buyer Dispute Claim</span>
                      <p class="text-slate-900 font-semibold">${i.disputeReason||"Produce damaged in transit or weight mismatch"}</p>
                      <p class="text-[11px] text-slate-400">Timestamp: ${new Date(i.createdAt).toLocaleString()}</p>
                    </div>

                    <div class="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span class="font-bold text-slate-700 block uppercase text-[10px]">${n.evidencePhotoLabel}</span>
                      ${i.disputeEvidencePhoto?`
                        <a href="${i.disputeEvidencePhoto}" target="_blank" class="text-blue-600 underline font-semibold flex items-center gap-1">
                          <i class="fa-solid fa-image"></i> View Attached Evidence Photo
                        </a>
                      `:`
                        <span class="text-slate-400 font-medium italic">No photographic evidence attached</span>
                      `}
                    </div>
                  </div>

                  <div class="flex items-center justify-end gap-3 pt-2">
                    <button onclick="window.adminResolveDispute('${i.id}', 'ReleaseToFarmer')" class="btn-primary text-xs py-2.5 px-4 cursor-pointer">
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${n.releaseFarmerBtn} (90%)
                    </button>
                    <button onclick="window.adminResolveDispute('${i.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-100 cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${n.refundBuyerBtn} (100%)
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </section>
      `:""}

      ${a.activeTab==="hubs"?`
        <!-- Regional Expansion Hubs Manager -->
        <section class="glass-card p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900">${n.regionalHubsTitle}</h2>
              <p class="text-xs text-slate-500">Manage regional rollout clusters, aggregation depots, and supply chain expansion corridors.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${r.map(i=>`
              <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-slate-900 text-sm">${i.hubName}</span>
                  <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full ${i.isActive?"bg-emerald-100 text-emerald-800":"bg-slate-200 text-slate-600"}">
                    ${i.isActive?n.activeHub:n.inactiveHub}
                  </span>
                </div>
                <p class="text-xs text-slate-500 font-medium">Region: <strong class="text-slate-800">${i.region}</strong></p>

                <div class="grid grid-cols-3 gap-2 text-center text-xs py-1 border-y border-slate-200/60">
                  <div>
                    <span class="text-[10px] text-slate-400 block font-bold">Farmers</span>
                    <strong class="text-slate-800 font-black">${i.farmerCount}</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 block font-bold">Buyers</span>
                    <strong class="text-slate-800 font-black">${i.buyerCount}</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 block font-bold">Drivers</span>
                    <strong class="text-slate-800 font-black">${i.driverCount}</strong>
                  </div>
                </div>

                <div class="flex items-center justify-between text-xs pt-1">
                  <span class="text-slate-500">Trade Volume:</span>
                  <span class="font-black text-emerald-800">${i.totalVolumeEtb.toLocaleString()} ETB</span>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `:""}

      ${a.activeTab==="sms"?`
        <!-- Bilingual SMS Announcement Broadcaster -->
        <section class="glass-card p-6 space-y-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 ${o==="am"?"lang-am":""}">
              <i class="fa-solid fa-tower-broadcast text-emerald-600 mr-2"></i> ${n.broadcastSmsTitle}
            </h2>
            <p class="text-xs text-slate-500">Send market advisories or weather alerts via Twilio SMS to smallholders in low-connectivity rural woredas.</p>
          </div>

          <form onsubmit="window.handleBroadcastSms(event)" class="space-y-4 text-xs font-semibold text-slate-700">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-bold">Message in English</label>
                <textarea id="broadcastEn" rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Market advisory: High demand for Red Onions in Addis wholesale depots."></textarea>
              </div>
              <div>
                <label class="block mb-1 font-bold">መልእክት በአማርኛ (Amharic Message)</label>
                <textarea id="broadcastAm" rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none lang-am" placeholder="የገበያ መረጃ: በአዲስ አበባ የጅምላ ገበያዎች የቀይ ሽንኩርት ፍላጎት ከፍተኛ ሆኗል።"></textarea>
              </div>
            </div>

            <div class="flex items-center justify-between pt-2">
              <select id="broadcastTarget" class="py-2.5 px-3.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white">
                <option value="farmer">Target: All Smallholder Farmers</option>
                <option value="buyer">Target: All Wholesale Buyers</option>
                <option value="driver">Target: All Partner Drivers</option>
                <option value="all">Target: All Registered Users</option>
              </select>

              <button type="submit" class="btn-primary text-xs py-2.5 px-5 shadow-sm cursor-pointer">
                <i class="fa-solid fa-paper-plane"></i> ${n.sendSmsBtn}
              </button>
            </div>
          </form>
        </section>
      `:""}

    </div>
  `}function Kt(o,e){return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-envelope-open-text text-emerald-700 text-lg"></i>
            <h3 class="text-base font-bold text-slate-900">
              ${o==="am"?"የኤስኤምኤስ (SMS) እና የስርዓት መልእክቶች":"SMS & Push Notifications"}
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
                <p class="text-slate-800 font-medium leading-relaxed ${o==="am"?"lang-am":""}">
                  ${o==="am"&&t.messageAm?t.messageAm:t.messageEn}
                </p>
              </div>
            `).join("")}
          </div>
        `}

      </div>
    </div>
  `}function Ut(o,e,t,s,r="",a="",n="",l=""){return`
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

          ${l?`
            <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <i class="fa-solid fa-circle-exclamation text-red-500 text-sm mt-0.5 shrink-0"></i>
              <div class="flex-1">
                <span class="font-bold block">${l}</span>
                ${e==="login"&&l.toLowerCase().includes("register")?`
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
                      <span class="block font-bold">${a?`Account: <strong>${a}</strong> (${n})`:"SMS Dispatched via Twilio Gateway"}</span>
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
                    ${o==="am"?"የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ":"Enter 6-Digit Verification Code"}
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
                    <input type="tel" id="authPhoneInput" required placeholder="911 223 344" value="${s||""}"
                      class="w-full pl-24 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white transition-all tracking-wide" />
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <i class="fa-solid fa-database text-emerald-600"></i> ${o==="am"?"በዳታቤዝ ውስጥ የተመዘገቡ ተጠቃሚዎች ብቻ መግባት ይችላሉ።":"Only existing registered accounts in the database can sign in."}
                  </p>
                </div>

                <button type="submit" id="requestOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${o==="am"?"የኤስኤምኤስ ማረጋገጫ ኮድ ላክ":"Verify & Send SMS Code"}
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
                  <label class="block mb-1 font-bold text-slate-800">Business / Trade Name</label>
                  <input type="text" id="regBusinessName" placeholder="e.g. FreshMart Supermarkets / Farm Co-op" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium" />
                </div>

                <div>
                  <label class="block mb-1 font-bold text-slate-800">Preferred Language</label>
                  <select id="regLanguage" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 font-medium">
                    <option value="am" ${o==="am"?"selected":""}>አማርኛ (Amharic)</option>
                    <option value="en" ${o==="en"?"selected":""}>English</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-800">Region / Hub Location</label>
                  <select id="regRegion" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 font-medium">
                    <option value="Oromia (Bishoftu)">Oromia (Bishoftu / Ada'a)</option>
                    <option value="Addis Ababa (Bole)">Addis Ababa (Bole Commercial)</option>
                    <option value="Amhara (Debre Berhan)">Amhara (Debre Berhan / Shewa)</option>
                    <option value="Sidama (Hawassa)">Sidama (Hawassa Lake Region)</option>
                    <option value="Oromia (Adama)">Oromia (Adama Depot)</option>
                    <option value="Dire Dawa (Eastern)">Dire Dawa Eastern Corridor</option>
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

              <!-- Driver Specific Fleet Inputs -->
              <div id="driverFleetInputs" class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <div>
                  <label class="block mb-1 font-bold text-amber-950 text-xs">Vehicle / Fleet Type</label>
                  <input type="text" id="regVehicleType" placeholder="e.g. Isuzu 5-Ton NPR Truck" value="Isuzu 5-Ton NPR Truck"
                    class="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-amber-950 text-xs">License Plate Number</label>
                  <input type="text" id="regLicensePlate" placeholder="e.g. ET-3-84920" value="ET-3-84920"
                    class="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-mono" />
                </div>
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
  `}function P(o,e="fa-circle-check",t="border-emerald-500"){const s=document.getElementById("toast-container");if(!s)return;const r=document.createElement("div");r.className=`toast-msg border-l-4 ${t} shadow-2xl`,r.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${o}</span>
  `,s.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateX(100%)",r.style.transition="all 0.3s ease-out",setTimeout(()=>r.remove(),300)},3500)}class qt{constructor(){S(this,"lang",localStorage.getItem("lang")||"en");S(this,"activeTab","marketplace");S(this,"cart",[]);S(this,"isCartOpen",!1);S(this,"isNotificationsModalOpen",!1);S(this,"activeOrderModal",null);S(this,"activeTelebirrModal",null);S(this,"buyerFilter",{category:"All",region:"All",searchQuery:"",minPrice:void 0,maxPrice:500,maxMinOrderKg:void 0,sortBy:"newest",activeTab:"catalog"});S(this,"activeReviewModal",null);S(this,"activeDisputeModal",null);S(this,"farmerState",{earningsTab:"today",isCreateModalOpen:!1,editingListing:null,rejectingOrder:null});S(this,"pickupModalOrder",null);S(this,"adminState",{activeTab:"overview"});S(this,"isAuthModalOpen",!1);S(this,"authMode","login");S(this,"otpStep",!1);S(this,"pendingPhone","");S(this,"lastSentCode","");S(this,"matchedUserName","");S(this,"matchedUserRole","");S(this,"authErrorMessage","");this.init()}async init(){this.attachGlobalWindowHandlers(),ae.startConnection(x.getToken()||void 0),ae.onOrderStatusChanged(async(t,s,r)=>{console.log(`[SignalR Live Status Update] Order ${t} -> ${s}: ${r}`),this.activeOrderModal&&this.activeOrderModal.id===t&&(this.activeOrderModal.status=s),P(`Live Update: Order #${t.slice(0,8).toUpperCase()} is now ${s.toUpperCase()}`,"fa-bolt","border-blue-500"),await x.refreshAllData(),this.render()}),x.subscribe(()=>{this.render()}),await x.refreshAllData();const e=x.getCurrentUser();e&&(e.role==="farmer"?this.activeTab="farmer":e.role==="driver"?this.activeTab="driver":e.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){const e=document.getElementById("app");if(!e)return;const t=x.getCurrentUser(),s=x.isAuthenticated(),r=x.getNotifications(),a=r.filter(i=>!i.read).length,n=x.getListings(this.buyerFilter.category,this.buyerFilter.region,this.buyerFilter.searchQuery,this.buyerFilter.maxPrice,this.buyerFilter.maxMinOrderKg,this.buyerFilter.sortBy);let l="";if(this.activeTab==="farmer"&&s&&(t==null?void 0:t.role)==="farmer"){const i=x.getListings().filter($=>$.farmerId===t.id),f=x.getOrders("farmer"),p=x.getFarmerSummary();l=jt(this.lang,t,i,f,p,this.farmerState)}else if(this.activeTab==="driver"&&s&&(t==null?void 0:t.role)==="driver"){const i=x.getOrders("driver"),f=x.getDriverSummary();l=Ht(this.lang,t,i,f,this.pickupModalOrder)}else if(this.activeTab==="admin"&&s&&(t==null?void 0:t.role)==="admin"){const i=x.getPlatformStats(),f=x.getOrders(),p=x.adminUsers||[],$=x.regionalHubs||[];l=Wt(this.lang,i,f,p,$,this.adminState)}else{const i=x.getOrders("buyer");l=Ft(this.lang,n,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,i,this.buyerFilter,this.activeReviewModal,this.activeDisputeModal)}e.innerHTML=`
      ${Nt(this.lang,t,s,this.activeTab,this.cart,a,this.buyerFilter.searchQuery)}
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        ${l}
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
            <span>Clean Architecture · ASP.NET Core 9 / .NET 10 · SignalR · Telebirr Escrow</span>
          </div>
        </div>
      </footer>

      <!-- Real Authentication Modal -->
      ${this.isAuthModalOpen?Ut(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage):""}
      ${this.isNotificationsModalOpen?Kt(this.lang,r):""}
    `}attachGlobalWindowHandlers(){const e=window;e.api=x,e.navigateTab=t=>{this.activeTab=t,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),P(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerTab=t=>{this.buyerFilter.activeTab=t,this.render()},e.setCategory=t=>{this.buyerFilter.category=t,this.render()},e.setRegion=t=>{this.buyerFilter.region=t,this.render()},e.setSortBy=t=>{this.buyerFilter.sortBy=t,this.render()},e.setMaxMinOrderKg=t=>{this.buyerFilter.maxMinOrderKg=t,this.render()},e.setMaxPrice=t=>{this.buyerFilter.maxPrice=t,this.render()},e.setSearchQuery=t=>{this.buyerFilter.searchQuery=t,this.render()},e.repeatOrder=(t,s)=>{const r=x.getListingById(t);if(!r){P("Produce listing no longer available in catalog","fa-triangle-exclamation","border-amber-500");return}this.cart=[{listing:r,qtyKg:s}],this.isCartOpen=!0,P(`Re-order configured for ${s}kg of ${r.productName}`,"fa-repeat","border-emerald-500"),this.render()},e.openReviewModal=t=>{const s=x.getOrders().find(r=>r.id===t)||null;this.activeReviewModal={isOpen:!0,order:s},this.render()},e.closeReviewModal=()=>{this.activeReviewModal=null,this.render()},e.setStarRating=t=>{const s=document.getElementById("selectedStarRating");s&&(s.value=t.toString()),P(`Rated: ${t} Stars`,"fa-star","border-amber-500")},e.handleReviewSubmit=async(t,s,r)=>{var l,i;t.preventDefault();const a=parseInt(((l=document.getElementById("selectedStarRating"))==null?void 0:l.value)||"5"),n=((i=document.getElementById("reviewCommentInput"))==null?void 0:i.value)||"";await x.submitReview(s,r,a,n),this.activeReviewModal=null,re({particleCount:80,spread:60,origin:{y:.6}}),P("Thank you for rating your farm produce quality!","fa-circle-check"),this.render()},e.openDisputeModal=t=>{this.activeDisputeModal={isOpen:!0,orderId:t},this.render()},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(t,s)=>{var n;t.preventDefault();const r=document.getElementById("disputeReasonSelect").value,a=(n=document.getElementById("disputePhotoInput"))==null?void 0:n.value;await x.disputeOrder(s,r,a),this.activeDisputeModal=null,P("Dispute registered. Escrow frozen under Admin review.","fa-triangle-exclamation","border-red-500"),this.render()},e.setFarmerEarningsTab=t=>{this.farmerState.earningsTab=t,this.render()},e.toggleCreateListingModal=()=>{this.farmerState.isCreateModalOpen=!this.farmerState.isCreateModalOpen,this.farmerState.editingListing=null,this.render()},e.openEditListingModal=t=>{const s=x.getListingById(t);s&&(this.farmerState.editingListing=s,this.farmerState.isCreateModalOpen=!1,this.render())},e.closeListingModal=()=>{this.farmerState.isCreateModalOpen=!1,this.farmerState.editingListing=null,this.render()},e.handleSaveListing=async(t,s)=>{t.preventDefault();const r=document.getElementById("newProdName").value,a=document.getElementById("newProdNameAm").value,n=document.getElementById("newProdCategory").value,l=parseFloat(document.getElementById("newProdQty").value),i=parseFloat(document.getElementById("newProdPrice").value),f=parseFloat(document.getElementById("newProdMinOrder").value),p=document.getElementById("newProdRegion").value,$=document.getElementById("newProdPhoto").value;s?(await x.updateListing(s,{productName:r,nameAm:a,category:n,qtyKg:l,pricePerKg:i,minOrderKg:f,region:p,photos:[$]}),P("Listing updated successfully","fa-circle-check")):(await x.createListing({productName:r,nameAm:a,category:n,qtyKg:l,pricePerKg:i,minOrderKg:f,region:p,farmerNameAm:a?"አበበ በቀለ":void 0,latitude:8.7523,longitude:38.9785,photos:[$],availableFrom:new Date().toISOString().split("T")[0]}),P(`Published ${r} to marketplace!`,"fa-cloud-arrow-up")),this.farmerState.isCreateModalOpen=!1,this.farmerState.editingListing=null,this.render()},e.openFarmerRejectModal=t=>{const s=x.getOrders().find(r=>r.id===t)||null;this.farmerState.rejectingOrder=s,this.render()},e.closeFarmerRejectModal=()=>{this.farmerState.rejectingOrder=null,this.render()},e.handleFarmerRejectSubmit=async(t,s)=>{t.preventDefault();const r=document.getElementById("farmerRejectReason").value;await x.rejectOrderByFarmer(s,r),this.farmerState.rejectingOrder=null,P("Order declined. 100% refund processed to buyer.","fa-circle-check","border-amber-500"),this.render()},e.toggleDriverOnlineStatus=async t=>{await x.updateProfile({isOnline:t}),P(t?"You are now Online for dispatch trips":"You are now Offline","fa-truck"),this.render()},e.openDriverPickupModal=t=>{const s=x.getOrders().find(r=>r.id===t)||null;this.pickupModalOrder=s,this.render()},e.closeDriverPickupModal=()=>{this.pickupModalOrder=null,this.render()},e.handleDriverPickupSubmit=async(t,s)=>{t.preventDefault();const r=document.getElementById("pickupPhotoUrlInput").value;await x.pickupOrderByDriver(s,r),this.pickupModalOrder=null,P("Produce marked as Picked Up! Out for delivery.","fa-truck-fast","border-emerald-500"),this.render()},e.setAdminTab=t=>{this.adminState.activeTab=t,this.render()},e.adminToggleUserVerification=async(t,s)=>{await x.verifyUser(t,s),P(s?"User identity approved!":"Verification revoked","fa-badge-check"),this.render()},e.openAuthModal=(t="login")=>{this.authMode=t,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=t=>{this.authMode=t,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=t=>{this.pendingPhone=t.replace("+251","").trim(),this.authErrorMessage="",this.render();const s=document.getElementById("authPhoneInput");s&&(s.value=this.pendingPhone,s.focus())},e.switchToRegisterWithPhone=t=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=t.replace("+251","").trim(),this.render()},e.handleRequestOtp=async t=>{t.preventDefault();const s=document.getElementById("authPhoneInput").value.trim();if(!s||s.length<8){P("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const r=document.getElementById("requestOtpBtn");r&&(r.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',r.disabled=!0),this.pendingPhone=s,this.authErrorMessage="";try{const a=await x.requestOtp(s);this.lastSentCode=a.demoCode||"",this.matchedUserName=a.userName||"",this.matchedUserRole=a.role||"",this.otpStep=!0,P(`SMS verification code dispatched to +251 ${s}`,"fa-comment-sms","border-emerald-500")}catch(a){this.authErrorMessage=a.message||"No account registered with this phone number. Please register first.",this.otpStep=!1,P(this.authErrorMessage,"fa-circle-xmark","border-red-500")}this.render()},e.handleVerifyOtp=async t=>{t.preventDefault();const s=document.getElementById("authOtpInput").value.trim();if(!s){P("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const r=document.getElementById("verifyOtpBtn");r&&(r.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',r.disabled=!0);try{const a=await x.verifyOtp(this.pendingPhone,s);this.isAuthModalOpen=!1,this.authErrorMessage="",a.role==="farmer"?this.activeTab="farmer":a.role==="driver"?this.activeTab="driver":a.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",re({particleCount:100,spread:60,origin:{y:.6}}),P(`Welcome back, ${a.name}!`,"fa-user-check")}catch(a){this.authErrorMessage=a.message||"Invalid verification code. Please check your SMS or try again.",P(this.authErrorMessage,"fa-circle-xmark","border-red-500")}this.render()},e.handleRegisterUser=async t=>{var m,W,K,G;t.preventDefault();const s=document.getElementById("regName").value.trim(),r=document.getElementById("regNameAm").value.trim(),a=(m=document.getElementById("regBusinessName"))==null?void 0:m.value.trim(),n=document.getElementById("regPhone").value.trim(),l=document.getElementById("regRegion").value,i=((W=document.querySelector('input[name="regRole"]:checked'))==null?void 0:W.value)||"farmer",f=(K=document.getElementById("regVehicleType"))==null?void 0:K.value,p=(G=document.getElementById("regLicensePlate"))==null?void 0:G.value;if(!s||!n){P("Please fill in all required fields","fa-triangle-exclamation","border-red-500");return}const $=document.getElementById("registerSubmitBtn");$&&($.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in Database...',$.disabled=!0),this.authErrorMessage="";try{const h=await x.registerUser(s,r,a,n,i,l,f,p);this.isAuthModalOpen=!1,h.role==="farmer"?this.activeTab="farmer":h.role==="driver"?this.activeTab="driver":h.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",re({particleCount:140,spread:80,origin:{y:.6}}),P(`Registration Complete! Welcome to Farmer-to-Market, ${s}.`,"fa-champagne-glasses")}catch(h){this.authErrorMessage=h.message||"Registration failed. Please try again.",P(this.authErrorMessage,"fa-circle-xmark","border-red-500")}this.render()},e.handleLogout=()=>{x.logout(),this.activeTab="marketplace",P("You have been signed out.","fa-arrow-right-from-bracket","border-slate-500"),this.render()},e.openNotificationsModal=()=>{this.isNotificationsModalOpen=!0,this.render()},e.closeNotificationsModal=()=>{this.isNotificationsModalOpen=!1,this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.quickBuy=t=>{if(!x.isAuthenticated()){e.openAuthModal("login"),P("Please sign in to place wholesale orders","fa-right-to-bracket","border-amber-500");return}const s=x.getListingById(t);if(!s)return;const r=this.cart.find(a=>a.listing.id===t);r?r.qtyKg+=s.minOrderKg:this.cart.push({listing:s,qtyKg:s.minOrderKg}),this.isCartOpen=!0,P(`Added ${s.minOrderKg}kg of ${s.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(t,s)=>{const r=this.cart.find(a=>a.listing.id===t);r&&(r.qtyKg=Math.max(r.listing.minOrderKg,r.qtyKg+s),this.render())},e.removeFromCart=t=>{this.cart=this.cart.filter(s=>s.listing.id!==t),P("Item removed from cart","fa-trash-can","border-red-500"),this.render()},e.openTelebirrModal=()=>{if(!x.isAuthenticated()){e.openAuthModal("login");return}const t=this.cart.reduce((s,r)=>s+r.qtyKg*r.listing.pricePerKg,0);this.activeTelebirrModal={isOpen:!0,totalEtb:t},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.processTelebirrPayment=async t=>{t.preventDefault();const s=document.getElementById("telebirrSubmitBtn");s&&(s.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Authorizing with Telebirr Escrow...',s.disabled=!0);try{let r=null;for(const a of this.cart)r=await x.placeOrder(a.listing.id,a.qtyKg);this.cart=[],this.isCartOpen=!1,this.activeTelebirrModal=null,re({particleCount:120,spread:70,origin:{y:.6}}),P("Payment secured via Telebirr Escrow! Order dispatched to farmer.","fa-lock","border-blue-500"),r&&(this.activeOrderModal=r)}catch(r){P(r.message||"Payment authorization failed.","fa-circle-xmark","border-red-500")}this.render()},e.openOrderModal=t=>{const r=x.getOrders().find(a=>a.id===t);r&&(this.activeOrderModal=r,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.confirmFarmerOrder=async t=>{await x.confirmOrderByFarmer(t),ae.joinOrder(t),P("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.driverCompleteDelivery=t=>{P("Trip destination reached. Awaiting buyer confirmation.","fa-location-dot"),this.render()},e.confirmDelivery=async t=>{await x.confirmDeliveryByBuyer(t),re({particleCount:150,spread:80,origin:{y:.6}}),P("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),this.render()},e.adminResolveDispute=async(t,s)=>{await x.resolveDispute(t,s),P(`Dispute resolved: ${s}`,"fa-gavel","border-purple-500"),this.render()},e.handleBroadcastSms=async t=>{t.preventDefault();const s=document.getElementById("broadcastEn").value,r=document.getElementById("broadcastAm").value,a=document.getElementById("broadcastTarget").value;await x.broadcastSms(s,r,a),P(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to all registered farmers via Twilio!","fa-paper-plane"),this.render()}}}new qt;
