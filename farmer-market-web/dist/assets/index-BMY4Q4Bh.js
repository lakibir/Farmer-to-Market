var it=Object.defineProperty;var ot=(n,e,t)=>e in n?it(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var g=(n,e,t)=>ot(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();var Re={};(function n(e,t,s,a){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",i=(function(){if(!e.OffscreenCanvas)return!1;try{var m=new OffscreenCanvas(1,1),c=m.getContext("2d");c.fillRect(0,0,1,1);var k=m.transferToImageBitmap();c.createPattern(k,"no-repeat")}catch{return!1}return!0})();function l(){}function d(m){var c=t.exports.Promise,k=c!==void 0?c:e.Promise;return typeof k=="function"?new k(m):(m(l,l),null)}var u=(function(m,c){return{transform:function(k){if(m)return k;if(c.has(k))return c.get(k);var $=new OffscreenCanvas(k.width,k.height),I=$.getContext("2d");return I.drawImage(k,0,0),c.set(k,$),$},clear:function(){c.clear()}}})(i,new Map),h=(function(){var m=Math.floor(16.666666666666668),c,k,$={},I=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(c=function(P){var R=Math.random();return $[R]=requestAnimationFrame(function A(N){I===N||I+m-1<N?(I=N,delete $[R],P()):$[R]=requestAnimationFrame(A)}),R},k=function(P){$[P]&&cancelAnimationFrame($[P])}):(c=function(P){return setTimeout(P,m)},k=function(P){return clearTimeout(P)}),{frame:c,cancel:k}})(),x=(function(){var m,c,k={};function $(I){function P(R,A){I.postMessage({options:R||{},callback:A})}I.init=function(A){var N=A.transferControlToOffscreen();I.postMessage({canvas:N},[N])},I.fire=function(A,N,_){if(c)return P(A,null),c;var L=Math.random().toString(36).slice(2);return c=d(function(B){function F(G){G.data.callback===L&&(delete k[L],I.removeEventListener("message",F),c=null,u.clear(),_(),B())}I.addEventListener("message",F),P(A,L),k[L]=F.bind(null,{data:{callback:L}})}),c},I.reset=function(){I.postMessage({reset:!0});for(var A in k)k[A](),delete k[A]}}return function(){if(m)return m;if(!s&&r){var I=["var CONFETTI, SIZE = {}, module = {};","("+n.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{m=new Worker(URL.createObjectURL(new Blob([I])))}catch(P){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",P),null}$(m)}return m}})(),T={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function E(m,c){return c?c(m):m}function S(m){return m!=null}function v(m,c,k){return E(m&&S(m[c])?m[c]:T[c],k)}function j(m){return m<0?0:Math.floor(m)}function w(m,c){return Math.floor(Math.random()*(c-m))+m}function q(m){return parseInt(m,16)}function Q(m){return m.map(Z)}function Z(m){var c=String(m).replace(/[^0-9a-f]/gi,"");return c.length<6&&(c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2]),{r:q(c.substring(0,2)),g:q(c.substring(2,4)),b:q(c.substring(4,6))}}function J(m){var c=v(m,"origin",Object);return c.x=v(c,"x",Number),c.y=v(c,"y",Number),c}function se(m){m.width=document.documentElement.clientWidth,m.height=document.documentElement.clientHeight}function re(m){var c=m.getBoundingClientRect();m.width=c.width,m.height=c.height}function ee(m){var c=document.createElement("canvas");return c.style.position="fixed",c.style.top="0px",c.style.left="0px",c.style.pointerEvents="none",c.style.zIndex=m,c}function te(m,c,k,$,I,P,R,A,N){m.save(),m.translate(c,k),m.rotate(P),m.scale($,I),m.arc(0,0,1,R,A,N),m.restore()}function y(m){var c=m.angle*(Math.PI/180),k=m.spread*(Math.PI/180);return{x:m.x,y:m.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:m.startVelocity*.5+Math.random()*m.startVelocity,angle2D:-c+(.5*k-Math.random()*k),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:m.color,shape:m.shape,tick:0,totalTicks:m.ticks,decay:m.decay,drift:m.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:m.gravity*3,ovalScalar:.6,scalar:m.scalar,flat:m.flat}}function K(m,c){c.x+=Math.cos(c.angle2D)*c.velocity+c.drift,c.y+=Math.sin(c.angle2D)*c.velocity+c.gravity,c.velocity*=c.decay,c.flat?(c.wobble=0,c.wobbleX=c.x+10*c.scalar,c.wobbleY=c.y+10*c.scalar,c.tiltSin=0,c.tiltCos=0,c.random=1):(c.wobble+=c.wobbleSpeed,c.wobbleX=c.x+10*c.scalar*Math.cos(c.wobble),c.wobbleY=c.y+10*c.scalar*Math.sin(c.wobble),c.tiltAngle+=.1,c.tiltSin=Math.sin(c.tiltAngle),c.tiltCos=Math.cos(c.tiltAngle),c.random=Math.random()+2);var k=c.tick++/c.totalTicks,$=c.x+c.random*c.tiltCos,I=c.y+c.random*c.tiltSin,P=c.wobbleX+c.random*c.tiltCos,R=c.wobbleY+c.random*c.tiltSin;if(m.fillStyle="rgba("+c.color.r+", "+c.color.g+", "+c.color.b+", "+(1-k)+")",m.beginPath(),o&&c.shape.type==="path"&&typeof c.shape.path=="string"&&Array.isArray(c.shape.matrix))m.fill(ze(c.shape.path,c.shape.matrix,c.x,c.y,Math.abs(P-$)*.1,Math.abs(R-I)*.1,Math.PI/10*c.wobble));else if(c.shape.type==="bitmap"){var A=Math.PI/10*c.wobble,N=Math.abs(P-$)*.1,_=Math.abs(R-I)*.1,L=c.shape.bitmap.width*c.scalar,B=c.shape.bitmap.height*c.scalar,F=new DOMMatrix([Math.cos(A)*N,Math.sin(A)*N,-Math.sin(A)*_,Math.cos(A)*_,c.x,c.y]);F.multiplySelf(new DOMMatrix(c.shape.matrix));var G=m.createPattern(u.transform(c.shape.bitmap),"no-repeat");G.setTransform(F),m.globalAlpha=1-k,m.fillStyle=G,m.fillRect(c.x-L/2,c.y-B/2,L,B),m.globalAlpha=1}else if(c.shape==="circle")m.ellipse?m.ellipse(c.x,c.y,Math.abs(P-$)*c.ovalScalar,Math.abs(R-I)*c.ovalScalar,Math.PI/10*c.wobble,0,2*Math.PI):te(m,c.x,c.y,Math.abs(P-$)*c.ovalScalar,Math.abs(R-I)*c.ovalScalar,Math.PI/10*c.wobble,0,2*Math.PI);else if(c.shape==="star")for(var D=Math.PI/2*3,X=4*c.scalar,ie=8*c.scalar,oe=c.x,ce=c.y,pe=5,le=Math.PI/pe;pe--;)oe=c.x+Math.cos(D)*ie,ce=c.y+Math.sin(D)*ie,m.lineTo(oe,ce),D+=le,oe=c.x+Math.cos(D)*X,ce=c.y+Math.sin(D)*X,m.lineTo(oe,ce),D+=le;else m.moveTo(Math.floor(c.x),Math.floor(c.y)),m.lineTo(Math.floor(c.wobbleX),Math.floor(I)),m.lineTo(Math.floor(P),Math.floor(R)),m.lineTo(Math.floor($),Math.floor(c.wobbleY));return m.closePath(),m.fill(),c.tick<c.totalTicks}function U(m,c,k,$,I){var P=c.slice(),R=m.getContext("2d"),A,N,_=d(function(L){function B(){A=N=null,R.clearRect(0,0,$.width,$.height),u.clear(),I(),L()}function F(){s&&!($.width===a.width&&$.height===a.height)&&($.width=m.width=a.width,$.height=m.height=a.height),!$.width&&!$.height&&(k(m),$.width=m.width,$.height=m.height),R.clearRect(0,0,$.width,$.height),P=P.filter(function(G){return K(R,G)}),P.length?A=h.frame(F):B()}A=h.frame(F),N=B});return{addFettis:function(L){return P=P.concat(L),_},canvas:m,promise:_,reset:function(){A&&h.cancel(A),N&&N()}}}function he(m,c){var k=!m,$=!!v(c||{},"resize"),I=!1,P=v(c,"disableForReducedMotion",Boolean),R=r&&!!v(c||{},"useWorker"),A=R?x():null,N=k?se:re,_=m&&A?!!m.__confetti_initialized:!1,L=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,B;function F(D,X,ie){for(var oe=v(D,"particleCount",j),ce=v(D,"angle",Number),pe=v(D,"spread",Number),le=v(D,"startVelocity",Number),Xe=v(D,"decay",Number),Ze=v(D,"gravity",Number),Je=v(D,"drift",Number),Be=v(D,"colors",Q),et=v(D,"ticks",Number),Me=v(D,"shapes"),tt=v(D,"scalar"),at=!!v(D,"flat"),Oe=J(D),Le=oe,Ce=[],st=m.width*Oe.x,rt=m.height*Oe.y;Le--;)Ce.push(y({x:st,y:rt,angle:ce,spread:pe,startVelocity:le,color:Be[Le%Be.length],shape:Me[w(0,Me.length)],ticks:et,decay:Xe,gravity:Ze,drift:Je,scalar:tt,flat:at}));return B?B.addFettis(Ce):(B=U(m,Ce,N,X,ie),B.promise)}function G(D){var X=P||v(D,"disableForReducedMotion",Boolean),ie=v(D,"zIndex",Number);if(X&&L)return d(function(le){le()});k&&B?m=B.canvas:k&&!m&&(m=ee(ie),document.body.appendChild(m)),$&&!_&&N(m);var oe={width:m.width,height:m.height};A&&!_&&A.init(m),_=!0,A&&(m.__confetti_initialized=!0);function ce(){if(A){var le={getBoundingClientRect:function(){if(!k)return m.getBoundingClientRect()}};N(le),A.postMessage({resize:{width:le.width,height:le.height}});return}oe.width=oe.height=null}function pe(){B=null,$&&(I=!1,e.removeEventListener("resize",ce)),k&&m&&(document.body.contains(m)&&document.body.removeChild(m),m=null,_=!1)}return $&&!I&&(I=!0,e.addEventListener("resize",ce,!1)),A?A.fire(D,oe,pe):F(D,oe,pe)}return G.reset=function(){A&&A.reset(),B&&B.reset()},G}var ge;function ve(){return ge||(ge=he(null,{useWorker:!0,resize:!0})),ge}function ze(m,c,k,$,I,P,R){var A=new Path2D(m),N=new Path2D;N.addPath(A,new DOMMatrix(c));var _=new Path2D;return _.addPath(N,new DOMMatrix([Math.cos(R)*I,Math.sin(R)*I,-Math.sin(R)*P,Math.cos(R)*P,k,$])),_}function Qe(m){if(!o)throw new Error("path confetti are not supported in this browser");var c,k;typeof m=="string"?c=m:(c=m.path,k=m.matrix);var $=new Path2D(c),I=document.createElement("canvas"),P=I.getContext("2d");if(!k){for(var R=1e3,A=R,N=R,_=0,L=0,B,F,G=0;G<R;G+=2)for(var D=0;D<R;D+=2)P.isPointInPath($,G,D,"nonzero")&&(A=Math.min(A,G),N=Math.min(N,D),_=Math.max(_,G),L=Math.max(L,D));B=_-A,F=L-N;var X=10,ie=Math.min(X/B,X/F);k=[ie,0,0,ie,-Math.round(B/2+A)*ie,-Math.round(F/2+N)*ie]}return{type:"path",path:c,matrix:k}}function Ye(m){var c,k=1,$="#000000",I='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof m=="string"?c=m:(c=m.text,k="scalar"in m?m.scalar:k,I="fontFamily"in m?m.fontFamily:I,$="color"in m?m.color:$);var P=10*k,R=""+P+"px "+I,A=new OffscreenCanvas(P,P),N=A.getContext("2d");N.font=R;var _=N.measureText(c),L=Math.ceil(_.actualBoundingBoxRight+_.actualBoundingBoxLeft),B=Math.ceil(_.actualBoundingBoxAscent+_.actualBoundingBoxDescent),F=2,G=_.actualBoundingBoxLeft+F,D=_.actualBoundingBoxAscent+F;L+=F+F,B+=F+F,A=new OffscreenCanvas(L,B),N=A.getContext("2d"),N.font=R,N.fillStyle=$,N.fillText(c,G,D);var X=1/k;return{type:"bitmap",bitmap:A.transferToImageBitmap(),matrix:[X,0,0,X,-L*X/2,-B*X/2]}}t.exports=function(){return ve().apply(this,arguments)},t.exports.reset=function(){ve().reset()},t.exports.create=he,t.exports.shapeFromPath=Qe,t.exports.shapeFromText=Ye})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Re,!1);const z=Re.exports;Re.exports.create;class ue extends Error{constructor(e,t){const s=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=s}}class Ne extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class ne extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class nt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=s}}class lt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=s}}class dt extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=s}}class Fe extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class ct extends Error{constructor(e,t){const s=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=s}}class We{constructor(e,t,s){this.statusCode=e,this.statusText=t,this.content=s}}class Ee{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var f;(function(n){n[n.Trace=0]="Trace",n[n.Debug=1]="Debug",n[n.Information=2]="Information",n[n.Warning=3]="Warning",n[n.Error=4]="Error",n[n.Critical=5]="Critical",n[n.None=6]="None"})(f||(f={}));class ye{constructor(){}log(e,t){}}ye.instance=new ye;const pt="8.0.29";class V{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,s){if(!(e in t))throw new Error(`Unknown ${s} value: ${e}.`)}}class O{static get isBrowser(){return!O.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!O.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!O.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function we(n,e){let t="";return fe(n)?(t=`Binary data of length ${n.byteLength}`,e&&(t+=`. Content: '${ut(n)}'`)):typeof n=="string"&&(t=`String data of length ${n.length}`,e&&(t+=`. Content: '${n}'`)),t}function ut(n){const e=new Uint8Array(n);let t="";return e.forEach(s=>{const a=s<16?"0":"";t+=`0x${a}${s.toString(16)} `}),t.substr(0,t.length-1)}function fe(n){return n&&typeof ArrayBuffer<"u"&&(n instanceof ArrayBuffer||n.constructor&&n.constructor.name==="ArrayBuffer")}async function qe(n,e,t,s,a,r){const o={},[i,l]=be();o[i]=l,n.log(f.Trace,`(${e} transport) sending data. ${we(a,r.logMessageContent)}.`);const d=fe(a)?"arraybuffer":"text",u=await t.post(s,{content:a,headers:{...o,...r.headers},responseType:d,timeout:r.timeout,withCredentials:r.withCredentials});n.log(f.Trace,`(${e} transport) request complete. Response status: ${u.statusCode}.`)}function mt(n){return n===void 0?new Te(f.Information):n===null?ye.instance:n.log!==void 0?n:new Te(n)}class ft{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class Te{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const s=`[${new Date().toISOString()}] ${f[e]}: ${t}`;switch(e){case f.Critical:case f.Error:this.out.error(s);break;case f.Warning:this.out.warn(s);break;case f.Information:this.out.info(s);break;default:this.out.log(s);break}}}}function be(){let n="X-SignalR-User-Agent";return O.isNode&&(n="User-Agent"),[n,gt(pt,bt(),vt(),ht())]}function gt(n,e,t,s){let a="Microsoft SignalR/";const r=n.split(".");return a+=`${r[0]}.${r[1]}`,a+=` (${n}; `,e&&e!==""?a+=`${e}; `:a+="Unknown OS; ",a+=`${t}`,s?a+=`; ${s}`:a+="; Unknown Runtime Version",a+=")",a}function bt(){if(O.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function ht(){if(O.isNode)return process.versions.node}function vt(){return O.isNode?"NodeJS":"Browser"}function Ie(n){return n.stack?n.stack:n.message?n.message:`${n}`}function xt(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class yt extends Ee{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||O.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(xt());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new ne;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let s;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),s=new ne});let a=null;if(e.timeout){const l=e.timeout;a=setTimeout(()=>{t.abort(),this._logger.log(f.Warning,"Timeout from HTTP request."),s=new Ne},l)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},fe(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let r;try{r=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(l){throw s||(this._logger.log(f.Warning,`Error from HTTP request. ${l}.`),l)}finally{a&&clearTimeout(a),e.abortSignal&&(e.abortSignal.onabort=null)}if(!r.ok){const l=await Ue(r,"text");throw new ue(l||r.statusText,r.status)}const i=await Ue(r,e.responseType);return new We(r.status,r.statusText,i)}getCookieString(e){let t="";return O.isNode&&this._jar&&this._jar.getCookies(e,(s,a)=>t=a.join("; ")),t}}function Ue(n,e){let t;switch(e){case"arraybuffer":t=n.arrayBuffer();break;case"text":t=n.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=n.text();break}return t}class wt extends Ee{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new ne):e.method?e.url?new Promise((t,s)=>{const a=new XMLHttpRequest;a.open(e.method,e.url,!0),a.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,a.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(fe(e.content)?a.setRequestHeader("Content-Type","application/octet-stream"):a.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const r=e.headers;r&&Object.keys(r).forEach(o=>{a.setRequestHeader(o,r[o])}),e.responseType&&(a.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{a.abort(),s(new ne)}),e.timeout&&(a.timeout=e.timeout),a.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),a.status>=200&&a.status<300?t(new We(a.status,a.statusText,a.response||a.responseText)):s(new ue(a.response||a.responseText||a.statusText,a.status))},a.onerror=()=>{this._logger.log(f.Warning,`Error from HTTP request. ${a.status}: ${a.statusText}.`),s(new ue(a.statusText,a.status))},a.ontimeout=()=>{this._logger.log(f.Warning,"Timeout from HTTP request."),s(new Ne)},a.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class St extends Ee{constructor(e){if(super(),typeof fetch<"u"||O.isNode)this._httpClient=new yt(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new wt(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new ne):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class ae{static write(e){return`${e}${ae.RecordSeparator}`}static parse(e){if(e[e.length-1]!==ae.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(ae.RecordSeparator);return t.pop(),t}}ae.RecordSeparatorCode=30;ae.RecordSeparator=String.fromCharCode(ae.RecordSeparatorCode);class kt{writeHandshakeRequest(e){return ae.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,s;if(fe(e)){const i=new Uint8Array(e),l=i.indexOf(ae.RecordSeparatorCode);if(l===-1)throw new Error("Message is incomplete.");const d=l+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(i.slice(0,d))),s=i.byteLength>d?i.slice(d).buffer:null}else{const i=e,l=i.indexOf(ae.RecordSeparator);if(l===-1)throw new Error("Message is incomplete.");const d=l+1;t=i.substring(0,d),s=i.length>d?i.substring(d):null}const a=ae.parse(t),r=JSON.parse(a[0]);if(r.type)throw new Error("Expected a handshake response from the server.");return[s,r]}}var C;(function(n){n[n.Invocation=1]="Invocation",n[n.StreamItem=2]="StreamItem",n[n.Completion=3]="Completion",n[n.StreamInvocation=4]="StreamInvocation",n[n.CancelInvocation=5]="CancelInvocation",n[n.Ping=6]="Ping",n[n.Close=7]="Close",n[n.Ack=8]="Ack",n[n.Sequence=9]="Sequence"})(C||(C={}));class At{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new ft(this,e)}}class $t{constructor(e,t,s){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=s}async _send(e){const t=this._protocol.writeMessage(e);let s=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let a=()=>{},r=()=>{};fe(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(s=new Promise((o,i)=>{a=o,r=i})),this._messages.push(new Tt(t,this._totalMessageCount,a,r))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await s}_ack(e){let t=-1;for(let s=0;s<this._messages.length;s++){const a=this._messages[s];if(a._id<=e.sequenceId)t=s,fe(a._message)?this._bufferedByteCount-=a._message.byteLength:this._bufferedByteCount-=a._message.length,a._resolver();else if(this._bufferedByteCount<this._bufferSize)a._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==C.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:C.Sequence,sequenceId:e}));const t=this._messages;for(const s of t)await this._connection.send(s._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case C.Invocation:case C.StreamItem:case C.Completion:case C.StreamInvocation:case C.CancelInvocation:return!0;case C.Close:case C.Sequence:case C.Ping:case C.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:C.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class Tt{constructor(e,t,s,a){this._message=e,this._id=t,this._resolver=s,this._rejector=a}}const Et=30*1e3,Ct=15*1e3,It=1e5;var M;(function(n){n.Disconnected="Disconnected",n.Connecting="Connecting",n.Connected="Connected",n.Disconnecting="Disconnecting",n.Reconnecting="Reconnecting"})(M||(M={}));class De{static create(e,t,s,a,r,o,i){return new De(e,t,s,a,r,o,i)}constructor(e,t,s,a,r,o,i){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(f.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},V.isRequired(e,"connection"),V.isRequired(t,"logger"),V.isRequired(s,"protocol"),this.serverTimeoutInMilliseconds=r??Et,this.keepAliveIntervalInMilliseconds=o??Ct,this._statefulReconnectBufferSize=i??It,this._logger=t,this._protocol=s,this.connection=e,this._reconnectPolicy=a,this._handshakeProtocol=new kt,this.connection.onreceive=l=>this._processIncomingData(l),this.connection.onclose=l=>this._connectionClosed(l),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=M.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:C.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==M.Disconnected&&this._connectionState!==M.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==M.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=M.Connecting,this._logger.log(f.Debug,"Starting HubConnection.");try{await this._startInternal(),O.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=M.Connected,this._connectionStarted=!0,this._logger.log(f.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=M.Disconnected,this._logger.log(f.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,s)=>{this._handshakeResolver=t,this._handshakeRejecter=s});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const s={protocol:this._protocol.name,version:t};if(this._logger.log(f.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)),this._logger.log(f.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new $t(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(f.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===M.Disconnected)return this._logger.log(f.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===M.Disconnecting)return this._logger.log(f.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=M.Disconnecting,this._logger.log(f.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(f.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===M.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new ne("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createStreamInvocation(e,t,a);let o;const i=new At;return i.cancelCallback=()=>{const l=this._createCancelInvocation(r.invocationId);return delete this._callbacks[r.invocationId],o.then(()=>this._sendWithProtocol(l))},this._callbacks[r.invocationId]=(l,d)=>{if(d){i.error(d);return}else l&&(l.type===C.Completion?l.error?i.error(new Error(l.error)):i.complete():i.next(l.item))},o=this._sendWithProtocol(r).catch(l=>{i.error(l),delete this._callbacks[r.invocationId]}),this._launchStreams(s,o),i}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._sendWithProtocol(this._createInvocation(e,t,!0,a));return this._launchStreams(s,r),r}invoke(e,...t){const[s,a]=this._replaceStreamingParams(t),r=this._createInvocation(e,t,!1,a);return new Promise((i,l)=>{this._callbacks[r.invocationId]=(u,h)=>{if(h){l(h);return}else u&&(u.type===C.Completion?u.error?l(new Error(u.error)):i(u.result):l(new Error(`Unexpected message type: ${u.type}`)))};const d=this._sendWithProtocol(r).catch(u=>{l(u),delete this._callbacks[r.invocationId]});this._launchStreams(s,d)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const s=this._methods[e];if(s)if(t){const a=s.indexOf(t);a!==-1&&(s.splice(a,1),s.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const s of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(s)))switch(s.type){case C.Invocation:this._invokeClientMethod(s).catch(a=>{this._logger.log(f.Error,`Invoke client method threw error: ${Ie(a)}`)});break;case C.StreamItem:case C.Completion:{const a=this._callbacks[s.invocationId];if(a){s.type===C.Completion&&delete this._callbacks[s.invocationId];try{a(s)}catch(r){this._logger.log(f.Error,`Stream callback threw error: ${Ie(r)}`)}}break}case C.Ping:break;case C.Close:{this._logger.log(f.Information,"Close message received from server.");const a=s.error?new Error("Server returned an error on close: "+s.error):void 0;s.allowReconnect===!0?this.connection.stop(a):this._stopPromise=this._stopInternal(a);break}case C.Ack:this._messageBuffer&&this._messageBuffer._ack(s);break;case C.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(s);break;default:this._logger.log(f.Warning,`Invalid message type: ${s.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,s;try{[s,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(a){const r="Error parsing handshake response: "+a;this._logger.log(f.Error,r);const o=new Error(r);throw this._handshakeRejecter(o),o}if(t.error){const a="Server returned handshake error: "+t.error;this._logger.log(f.Error,a);const r=new Error(a);throw this._handshakeRejecter(r),r}else this._logger.log(f.Debug,"Server handshake complete.");return this._handshakeResolver(),s}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===M.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),s=this._methods[t];if(!s){this._logger.log(f.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(f.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const a=s.slice(),r=!!e.invocationId;let o,i,l;for(const d of a)try{const u=o;o=await d.apply(this,e.arguments),r&&o&&u&&(this._logger.log(f.Error,`Multiple results provided for '${t}'. Sending error to server.`),l=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),i=void 0}catch(u){i=u,this._logger.log(f.Error,`A callback for the method '${t}' threw error '${u}'.`)}l?await this._sendWithProtocol(l):r?(i?l=this._createCompletionMessage(e.invocationId,`${i}`,null):o!==void 0?l=this._createCompletionMessage(e.invocationId,null,o):(this._logger.log(f.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),l=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(l)):o&&this._logger.log(f.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(f.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new ne("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===M.Disconnecting?this._completeClose(e):this._connectionState===M.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===M.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=M.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),O.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(f.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let s=0,a=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),r=this._getNextRetryDelay(s++,0,a);if(r===null){this._logger.log(f.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=M.Reconnecting,e?this._logger.log(f.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(f.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(o=>o.apply(this,[e]))}catch(o){this._logger.log(f.Error,`An onreconnecting callback called with error '${e}' threw error '${o}'.`)}if(this._connectionState!==M.Reconnecting){this._logger.log(f.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;r!==null;){if(this._logger.log(f.Information,`Reconnect attempt number ${s} will start in ${r} ms.`),await new Promise(o=>{this._reconnectDelayHandle=setTimeout(o,r)}),this._reconnectDelayHandle=void 0,this._connectionState!==M.Reconnecting){this._logger.log(f.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=M.Connected,this._logger.log(f.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(o=>o.apply(this,[this.connection.connectionId]))}catch(o){this._logger.log(f.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${o}'.`)}return}catch(o){if(this._logger.log(f.Information,`Reconnect attempt failed because of error '${o}'.`),this._connectionState!==M.Reconnecting){this._logger.log(f.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===M.Disconnecting&&this._completeClose();return}a=o instanceof Error?o:new Error(o.toString()),r=this._getNextRetryDelay(s++,Date.now()-t,a)}}this._logger.log(f.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${s} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,s){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:s})}catch(a){return this._logger.log(f.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${a}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(s=>{const a=t[s];try{a(null,e)}catch(r){this._logger.log(f.Error,`Stream 'error' callback called with '${e}' threw error: ${Ie(r)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,s,a){if(s)return a.length!==0?{arguments:t,streamIds:a,target:e,type:C.Invocation}:{arguments:t,target:e,type:C.Invocation};{const r=this._invocationId;return this._invocationId++,a.length!==0?{arguments:t,invocationId:r.toString(),streamIds:a,target:e,type:C.Invocation}:{arguments:t,invocationId:r.toString(),target:e,type:C.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const s in e)e[s].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s)))},error:a=>{let r;a instanceof Error?r=a.message:a&&a.toString?r=a.toString():r="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(s,r)))},next:a=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(s,a)))}})}}_replaceStreamingParams(e){const t=[],s=[];for(let a=0;a<e.length;a++){const r=e[a];if(this._isObservable(r)){const o=this._invocationId;this._invocationId++,t[o]=r,s.push(o.toString()),e.splice(a,1)}}return[t,s]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,s){const a=this._invocationId;return this._invocationId++,s.length!==0?{arguments:t,invocationId:a.toString(),streamIds:s,target:e,type:C.StreamInvocation}:{arguments:t,invocationId:a.toString(),target:e,type:C.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:C.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:C.StreamItem}}_createCompletionMessage(e,t,s){return t?{error:t,invocationId:e,type:C.Completion}:{invocationId:e,result:s,type:C.Completion}}_createCloseMessage(){return{type:C.Close}}}const Pt=[0,2e3,1e4,3e4,null];class je{constructor(e){this._retryDelays=e!==void 0?[...e,null]:Pt}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class me{}me.Authorization="Authorization";me.Cookie="Cookie";class Rt extends Ee{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const s=await this._innerClient.send(e);return t&&s.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):s}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[me.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[me.Authorization]&&delete e.headers[me.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var H;(function(n){n[n.None=0]="None",n[n.WebSockets=1]="WebSockets",n[n.ServerSentEvents=2]="ServerSentEvents",n[n.LongPolling=4]="LongPolling"})(H||(H={}));var Y;(function(n){n[n.Text=1]="Text",n[n.Binary=2]="Binary"})(Y||(Y={}));let Nt=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class Ve{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,s){this._httpClient=e,this._logger=t,this._pollAbort=new Nt,this._options=s,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(V.isRequired(e,"url"),V.isRequired(t,"transferFormat"),V.isIn(t,Y,"transferFormat"),this._url=e,this._logger.log(f.Trace,"(LongPolling transport) Connecting."),t===Y.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[s,a]=be(),r={[s]:a,...this._options.headers},o={abortSignal:this._pollAbort.signal,headers:r,timeout:1e5,withCredentials:this._options.withCredentials};t===Y.Binary&&(o.responseType="arraybuffer");const i=`${e}&_=${Date.now()}`;this._logger.log(f.Trace,`(LongPolling transport) polling: ${i}.`);const l=await this._httpClient.get(i,o);l.statusCode!==200?(this._logger.log(f.Error,`(LongPolling transport) Unexpected response code: ${l.statusCode}.`),this._closeError=new ue(l.statusText||"",l.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,o)}async _poll(e,t){try{for(;this._running;)try{const s=`${e}&_=${Date.now()}`;this._logger.log(f.Trace,`(LongPolling transport) polling: ${s}.`);const a=await this._httpClient.get(s,t);a.statusCode===204?(this._logger.log(f.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):a.statusCode!==200?(this._logger.log(f.Error,`(LongPolling transport) Unexpected response code: ${a.statusCode}.`),this._closeError=new ue(a.statusText||"",a.statusCode),this._running=!1):a.content?(this._logger.log(f.Trace,`(LongPolling transport) data received. ${we(a.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(a.content)):this._logger.log(f.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(s){this._running?s instanceof Ne?this._logger.log(f.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=s,this._running=!1):this._logger.log(f.Trace,`(LongPolling transport) Poll errored after shutdown: ${s.message}`)}}finally{this._logger.log(f.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?qe(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(f.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(f.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,s]=be();e[t]=s;const a={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let r;try{await this._httpClient.delete(this._url,a)}catch(o){r=o}r?r instanceof ue&&(r.statusCode===404?this._logger.log(f.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(f.Trace,`(LongPolling transport) Error sending a DELETE request: ${r}`)):this._logger.log(f.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(f.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(f.Trace,e),this.onclose(this._closeError)}}}class Dt{constructor(e,t,s,a){this._httpClient=e,this._accessToken=t,this._logger=s,this._options=a,this.onreceive=null,this.onclose=null}async connect(e,t){return V.isRequired(e,"url"),V.isRequired(t,"transferFormat"),V.isIn(t,Y,"transferFormat"),this._logger.log(f.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((s,a)=>{let r=!1;if(t!==Y.Text){a(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let o;if(O.isBrowser||O.isWebWorker)o=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const i=this._httpClient.getCookieString(e),l={};l.Cookie=i;const[d,u]=be();l[d]=u,o=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...l,...this._options.headers}})}try{o.onmessage=i=>{if(this.onreceive)try{this._logger.log(f.Trace,`(SSE transport) data received. ${we(i.data,this._options.logMessageContent)}.`),this.onreceive(i.data)}catch(l){this._close(l);return}},o.onerror=i=>{r?this._close():a(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},o.onopen=()=>{this._logger.log(f.Information,`SSE connected to ${this._url}`),this._eventSource=o,r=!0,s()}}catch(i){a(i);return}})}async send(e){return this._eventSource?qe(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class _t{constructor(e,t,s,a,r,o){this._logger=s,this._accessTokenFactory=t,this._logMessageContent=a,this._webSocketConstructor=r,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=o}async connect(e,t){V.isRequired(e,"url"),V.isRequired(t,"transferFormat"),V.isIn(t,Y,"transferFormat"),this._logger.log(f.Trace,"(WebSockets transport) Connecting.");let s;return this._accessTokenFactory&&(s=await this._accessTokenFactory()),new Promise((a,r)=>{e=e.replace(/^http/,"ws");let o;const i=this._httpClient.getCookieString(e);let l=!1;if(O.isNode||O.isReactNative){const d={},[u,h]=be();d[u]=h,s&&(d[me.Authorization]=`Bearer ${s}`),i&&(d[me.Cookie]=i),o=new this._webSocketConstructor(e,void 0,{headers:{...d,...this._headers}})}else s&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(s)}`);o||(o=new this._webSocketConstructor(e)),t===Y.Binary&&(o.binaryType="arraybuffer"),o.onopen=d=>{this._logger.log(f.Information,`WebSocket connected to ${e}.`),this._webSocket=o,l=!0,a()},o.onerror=d=>{let u=null;typeof ErrorEvent<"u"&&d instanceof ErrorEvent?u=d.error:u="There was an error with the transport",this._logger.log(f.Information,`(WebSockets transport) ${u}.`)},o.onmessage=d=>{if(this._logger.log(f.Trace,`(WebSockets transport) data received. ${we(d.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(d.data)}catch(u){this._close(u);return}},o.onclose=d=>{if(l)this._close(d);else{let u=null;typeof ErrorEvent<"u"&&d instanceof ErrorEvent?u=d.error:u="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",r(new Error(u))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(f.Trace,`(WebSockets transport) sending data. ${we(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(f.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const Ke=100;class Bt{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,V.isRequired(e,"url"),this._logger=mt(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let s=null,a=null;if(O.isNode&&typeof require<"u"){const r=typeof __webpack_require__=="function"?__non_webpack_require__:require;s=r("ws"),a=r("eventsource")}!O.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:O.isNode&&!t.WebSocket&&s&&(t.WebSocket=s),!O.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:O.isNode&&!t.EventSource&&typeof a<"u"&&(t.EventSource=a),this._httpClient=new Rt(t.httpClient||new St(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||Y.Binary,V.isIn(e,Y,"transferFormat"),this._logger.log(f.Debug,`Starting connection with transfer format '${Y[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(f.Error,t),await this._stopPromise,Promise.reject(new ne(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(f.Error,t),Promise.reject(new ne(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new _e(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(f.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(f.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(f.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(f.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===H.WebSockets)this.transport=this._constructTransport(H.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let s=null,a=0;do{if(s=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new ne("The connection was stopped during negotiation.");if(s.error)throw new Error(s.error);if(s.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(s.url&&(t=s.url),s.accessToken){const r=s.accessToken;this._accessTokenFactory=()=>r,this._httpClient._accessToken=r,this._httpClient._accessTokenFactory=void 0}a++}while(s.url&&a<Ke);if(a===Ke&&s.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,s,e)}this.transport instanceof Ve&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(f.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(s){return this._logger.log(f.Error,"Failed to start the connection: "+s),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(s)}}async _getNegotiationResponse(e){const t={},[s,a]=be();t[s]=a;const r=this._resolveNegotiateUrl(e);this._logger.log(f.Debug,`Sending negotiation request: ${r}.`);try{const o=await this._httpClient.post(r,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(o.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${o.statusCode}'`));const i=JSON.parse(o.content);return(!i.negotiateVersion||i.negotiateVersion<1)&&(i.connectionToken=i.connectionId),i.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new Fe("Client didn't negotiate Stateful Reconnect but the server did.")):i}catch(o){let i="Failed to complete negotiation with the server: "+o;return o instanceof ue&&o.statusCode===404&&(i=i+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(f.Error,i),Promise.reject(new Fe(i))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,s,a){let r=this._createConnectUrl(e,s.connectionToken);if(this._isITransport(t)){this._logger.log(f.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(r,a),this.connectionId=s.connectionId;return}const o=[],i=s.availableTransports||[];let l=s;for(const d of i){const u=this._resolveTransportOrError(d,t,a,(l==null?void 0:l.useStatefulReconnect)===!0);if(u instanceof Error)o.push(`${d.transport} failed:`),o.push(u);else if(this._isITransport(u)){if(this.transport=u,!l){try{l=await this._getNegotiationResponse(e)}catch(h){return Promise.reject(h)}r=this._createConnectUrl(e,l.connectionToken)}try{await this._startTransport(r,a),this.connectionId=l.connectionId;return}catch(h){if(this._logger.log(f.Error,`Failed to start the transport '${d.transport}': ${h}`),l=void 0,o.push(new dt(`${d.transport} failed: ${h}`,H[d.transport])),this._connectionState!=="Connecting"){const x="Failed to select transport before stop() was called.";return this._logger.log(f.Debug,x),Promise.reject(new ne(x))}}}}return o.length>0?Promise.reject(new ct(`Unable to connect to the server with any of the available transports. ${o.join(" ")}`,o)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case H.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new _t(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case H.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new Dt(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case H.LongPolling:return new Ve(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async s=>{let a=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{a=!0}else{this._stopConnection(s);return}a&&this._stopConnection(s)}:this.transport.onclose=s=>this._stopConnection(s),this.transport.connect(e,t)}_resolveTransportOrError(e,t,s,a){const r=H[e.transport];if(r==null)return this._logger.log(f.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(Mt(t,r))if(e.transferFormats.map(i=>Y[i]).indexOf(s)>=0){if(r===H.WebSockets&&!this._options.WebSocket||r===H.ServerSentEvents&&!this._options.EventSource)return this._logger.log(f.Debug,`Skipping transport '${H[r]}' because it is not supported in your environment.'`),new nt(`'${H[r]}' is not supported in your environment.`,r);this._logger.log(f.Debug,`Selecting transport '${H[r]}'.`);try{return this.features.reconnect=r===H.WebSockets?a:void 0,this._constructTransport(r)}catch(i){return i}}else return this._logger.log(f.Debug,`Skipping transport '${H[r]}' because it does not support the requested transfer format '${Y[s]}'.`),new Error(`'${H[r]}' does not support ${Y[s]}.`);else return this._logger.log(f.Debug,`Skipping transport '${H[r]}' because it was disabled by the client.`),new lt(`'${H[r]}' is disabled by the client.`,r)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(f.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(f.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(f.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(f.Error,`Connection disconnected with error '${e}'.`):this._logger.log(f.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(f.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(f.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!O.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(f.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const s=new URLSearchParams(t.searchParams);return s.has("negotiateVersion")||s.append("negotiateVersion",this._negotiateVersion.toString()),s.has("useStatefulReconnect")?s.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&s.append("useStatefulReconnect","true"),t.search=s.toString(),t.toString()}}function Mt(n,e){return!n||(e&n)!==0}class _e{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new Se,this._transportResult=new Se,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new Se),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new Se;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):_e._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(s){e.reject(s)}}}static _concatBuffers(e){const t=e.map(r=>r.byteLength).reduce((r,o)=>r+o),s=new Uint8Array(t);let a=0;for(const r of e)s.set(new Uint8Array(r),a),a+=r.byteLength;return s.buffer}}class Se{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const Ot="json";class Lt{constructor(){this.name=Ot,this.version=2,this.transferFormat=Y.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=ye.instance);const s=ae.parse(e),a=[];for(const r of s){const o=JSON.parse(r);if(typeof o.type!="number")throw new Error("Invalid payload.");switch(o.type){case C.Invocation:this._isInvocationMessage(o);break;case C.StreamItem:this._isStreamItemMessage(o);break;case C.Completion:this._isCompletionMessage(o);break;case C.Ping:break;case C.Close:break;case C.Ack:this._isAckMessage(o);break;case C.Sequence:this._isSequenceMessage(o);break;default:t.log(f.Information,"Unknown message type '"+o.type+"' ignored.");continue}a.push(o)}return a}writeMessage(e){return ae.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const Ft={trace:f.Trace,debug:f.Debug,info:f.Information,information:f.Information,warn:f.Warning,warning:f.Warning,error:f.Error,critical:f.Critical,none:f.None};function Ut(n){const e=Ft[n.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${n}`)}class jt{configureLogging(e){if(V.isRequired(e,"logging"),Vt(e))this.logger=e;else if(typeof e=="string"){const t=Ut(e);this.logger=new Te(t)}else this.logger=new Te(e);return this}withUrl(e,t){return V.isRequired(e,"url"),V.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return V.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new je(e):this.reconnectPolicy=e:this.reconnectPolicy=new je,this}withServerTimeout(e){return V.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return V.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new Bt(this.url,e);return De.create(t,this.logger||ye.instance,this.protocol||new Lt,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function Vt(n){return n.log!==void 0}class Kt{constructor(){g(this,"hubConnection",null);g(this,"isConnected",!1);g(this,"reconnectAttempts",0);g(this,"maxReconnectAttempts",10);g(this,"statusListeners",[]);g(this,"trackingListeners",[]);g(this,"farmerOrderListeners",[]);g(this,"deliveryConfirmedListeners",[]);g(this,"pollingIntervals",new Map);g(this,"pollingCallback",null)}startConnection(e){if(!this.hubConnection)try{this.hubConnection=new jt().withUrl("/hubs/orders",{accessTokenFactory:()=>e||localStorage.getItem("token")||""}).withAutomaticReconnect({nextRetryDelayInMilliseconds:t=>Math.min(1e3*Math.pow(2,t.previousRetryCount),3e4)}).configureLogging(f.Warning).build(),this.hubConnection.on("OrderStatusChanged",t=>{const s={orderId:t.orderId,status:t.status,message:t.message,timestamp:new Date().toISOString()};this.statusListeners.forEach(a=>a(t.orderId,t.status,t.message)),this.trackingListeners.forEach(a=>a(s))}),this.hubConnection.on("NewOrderForFarmer",t=>{this.farmerOrderListeners.forEach(s=>s(t.orderId,t.productName,t.qtyKg))}),this.hubConnection.on("DeliveryConfirmed",t=>{this.deliveryConfirmedListeners.forEach(s=>s(t.orderId,t.farmerCut,t.driverCut))}),this.hubConnection.on("DriverLocationUpdate",t=>{const s={orderId:t.orderId,status:"PickedUp",message:`Driver is ${t.estimatedMinutes} minutes away`,gpsLat:t.lat,gpsLng:t.lng,estimatedArrivalMin:t.estimatedMinutes,timestamp:new Date().toISOString()};this.trackingListeners.forEach(a=>a(s))}),this.hubConnection.onreconnecting(()=>{this.isConnected=!1,this.reconnectAttempts++,console.log(`SignalR reconnecting (attempt ${this.reconnectAttempts})...`)}),this.hubConnection.onreconnected(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR reconnected successfully"),this.stopAllPolling()}),this.hubConnection.onclose(()=>{this.isConnected=!1,console.log("SignalR connection closed. Activating polling fallback."),this.activatePollingFallback()}),this.hubConnection.start().then(()=>{this.isConnected=!0,this.reconnectAttempts=0,console.log("SignalR connected to OrderHub")}).catch(t=>{console.log("SignalR hub connection failed — using polling fallback",t),this.activatePollingFallback()})}catch{console.log("SignalR unavailable — running in polling mode"),this.activatePollingFallback()}}stopConnection(){this.stopAllPolling(),this.hubConnection&&(this.hubConnection.stop(),this.hubConnection=null,this.isConnected=!1)}joinOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("JoinOrder",e).catch(console.error)}leaveOrder(e){this.hubConnection&&this.isConnected&&this.hubConnection.invoke("LeaveOrder",e).catch(console.error),this.stopPollingForOrder(e)}onOrderStatusChanged(e){return this.statusListeners.push(e),()=>{this.statusListeners=this.statusListeners.filter(t=>t!==e)}}onOrderTracking(e){return this.trackingListeners.push(e),()=>{this.trackingListeners=this.trackingListeners.filter(t=>t!==e)}}onNewFarmerOrder(e){return this.farmerOrderListeners.push(e),()=>{this.farmerOrderListeners=this.farmerOrderListeners.filter(t=>t!==e)}}onDeliveryConfirmed(e){return this.deliveryConfirmedListeners.push(e),()=>{this.deliveryConfirmedListeners=this.deliveryConfirmedListeners.filter(t=>t!==e)}}simulateLiveStatusChange(e,t,s){this.statusListeners.forEach(a=>a(e,t,s)),this.trackingListeners.forEach(a=>a({orderId:e,status:t,message:s,timestamp:new Date().toISOString()}))}setPollingCallback(e){this.pollingCallback=e}startPollingForOrder(e,t=15e3){if(this.pollingIntervals.has(e))return;const s=setInterval(async()=>{this.pollingCallback&&await this.pollingCallback(e)},t);this.pollingIntervals.set(e,s)}stopPollingForOrder(e){const t=this.pollingIntervals.get(e);t&&(clearInterval(t),this.pollingIntervals.delete(e))}stopAllPolling(){this.pollingIntervals.forEach(e=>clearInterval(e)),this.pollingIntervals.clear()}activatePollingFallback(){}getConnectionState(){return this.isConnected?"connected":this.reconnectAttempts>0&&this.reconnectAttempts<this.maxReconnectAttempts?"reconnecting":this.pollingIntervals.size>0?"polling":"disconnected"}}const de=new Kt;class Ht{constructor(){g(this,"token",localStorage.getItem("token")||null);g(this,"currentUser",this.loadStoredUser());g(this,"isUserLoggedIn",!!this.token&&!!this.currentUser);g(this,"listeners",[]);g(this,"impersonationOriginalUser",null);g(this,"listings",[]);g(this,"orders",[]);g(this,"notifications",[]);g(this,"standingOrders",[]);g(this,"anomalyAlerts",[]);g(this,"kycQueue",[]);g(this,"verificationQueue",[]);g(this,"agentRegisteredFarmers",[]);g(this,"regionalAnalytics",[]);g(this,"priceBenchmarks",[]);g(this,"offlineQueue",[]);g(this,"isOfflineMode",!1);g(this,"accountData",{addresses:[],paymentMethods:[],coupons:[],notificationPreferences:[],sessions:[],twoFactor:null});g(this,"allUsers",[]);g(this,"platformConfig",{farmerSharePercent:90,driverSharePercent:5,platformFeePercent:5,withholdingTaxPercent:2,vatOnCommissionPercent:15,highValuePayoutThresholdEtb:5e4,emergencyEscrowFrozen:!1,telebirrAppId:"",telebirrShortCode:"",telebirrApiKey:"",telebirrEscrowVaultKey:"",twilioAccountSid:"",twilioAuthToken:"",twilioFromNumber:"",mapsGeocodingApiKey:"",postgisSpatialIndexEnabled:!0});g(this,"systemAuditLogs",[]);g(this,"deliveryZones",[]);g(this,"featureFlags",[]);g(this,"payoutApprovals",[]);g(this,"globalBusinessRules",{minOrderKg:10,maxOrderKg:5e4,maxDistanceKm:450,priceFloorVariancePercent:-30,priceCeilingVariancePercent:250,requireFaydaForOrdersAboveKg:500,autoArbitrateAfterHours:48});g(this,"blacklist",[]);g(this,"farmerSummary",{totalEarnedEtb:48200,pendingEscrowEtb:14850,releasedEtb:48200,completedOrdersCount:18,pendingOrdersCount:1,totalWithholdingTaxPaidEtb:964});g(this,"driverSummary",{totalEarnedEtb:6450,pendingEtb:825,deliveredTripsCount:14,ruralBonusEtb:1250});g(this,"platformStats",{totalUsers:6,totalFarmers:3,totalBuyers:1,totalDrivers:1,totalListings:6,totalOrders:3,totalTransactionVolumeEtb:34500,totalPlatformCommissionEtb:1725,activeEscrowHeldEtb:25500,disputedOrdersCount:1,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:258.75,totalWithholdingReportedEtb:690});this.init()}loadStoredUser(){try{const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}catch{return null}}async init(){this.loadOfflineQueue(),this.initDefaultData(),this.token&&await this.fetchMe(),await this.refreshAllData(),this.token&&await this.fetchAccountData()}initDefaultData(){this.priceBenchmarks=[{cropName:"Fresh Sholla Red Tomatoes",cropNameAm:"ቀይ ቲማቲም",marketName:"Merkato Wholesale / Sholla",minPriceEtb:38,avgPriceEtb:45,maxPriceEtb:52,trend:"Down",lastUpdated:"Today 6:00 AM"},{cropName:"Organic Magna White Teff",cropNameAm:"የማኛ ነጭ ጤፍ",marketName:"EABC / Addis Depot",minPriceEtb:108,avgPriceEtb:115,maxPriceEtb:125,trend:"Up",lastUpdated:"Today 7:30 AM"},{cropName:"Awash Valley Red Onions",cropNameAm:"ቀይ ሽንኩርት",marketName:"Adama Wholesale Market",minPriceEtb:48,avgPriceEtb:55,maxPriceEtb:62,trend:"Stable",lastUpdated:"Today 6:15 AM"},{cropName:"Hawassa Hass Avocados",cropNameAm:"ሀስ አቮካዶ",marketName:"Hawassa Central / Merkato",minPriceEtb:50,avgPriceEtb:60,maxPriceEtb:72,trend:"Up",lastUpdated:"Today 8:00 AM"},{cropName:"Specialty Green Coffee Beans",cropNameAm:"ስፔሻሊቲ ቡና",marketName:"ECX Central Exchange",minPriceEtb:340,avgPriceEtb:380,maxPriceEtb:420,trend:"Up",lastUpdated:"Yesterday"},{cropName:"Bishoftu Sweet Strawberries",cropNameAm:"የቢሾፍቱ እንጆሪ",marketName:"Bole Fresh Produce Hub",minPriceEtb:85,avgPriceEtb:95,maxPriceEtb:110,trend:"Stable",lastUpdated:"Today 7:00 AM"}],this.standingOrders=[{id:"so-1",listingId:"a1b2c3d4-0001-0000-0000-000000000001",productName:"Fresh Sholla Red Tomatoes",productNameAm:"የሾላ ቀይ ቲማቲም",farmerName:"Abebe Bekele",qtyKg:150,pricePerKg:45,frequency:"Weekly",nextDeliveryDate:"Next Monday, 8:00 AM",active:!0,createdAt:new Date().toISOString()},{id:"so-2",listingId:"a1b2c3d4-0003-0000-0000-000000000003",productName:"Awash Valley Red Onions",productNameAm:"የአዋሽ ቀይ ሽንኩርት",farmerName:"Abebe Bekele",qtyKg:200,pricePerKg:55,frequency:"Bi-Weekly",nextDeliveryDate:"Next Thursday, 9:00 AM",active:!0,createdAt:new Date().toISOString()}],this.anomalyAlerts=[{id:"ANOM-101",severity:"High",type:"PriceManipulation",title:"Unusual Price Spike Detected",description:"Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",entityType:"Listing",entityId:"a1b2c3d4-0001-0000-0000-000000000001",detectedAt:"35 mins ago"},{id:"ANOM-102",severity:"Medium",type:"DuplicateProofPhoto",title:"Driver Proof Image Hash Match",description:"Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",entityType:"Order",entityId:"b1b2c3d4-0002-0000-0000-000000000002",detectedAt:"2 hours ago"},{id:"ANOM-103",severity:"Low",type:"FakeAccount",title:"Rapid Registration Cluster",description:"Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",entityType:"User",entityId:"44444444-4444-4444-4444-444444444444",detectedAt:"5 hours ago"}],this.kycQueue=[{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede (Driver)",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",documentType:"Commercial Vehicle Logbook & License",documentNumber:"ET-LOG-5T-98214",tinNumber:"TIN-DRV-981244",kycTier:3,status:"Pending",submittedAt:"Yesterday"},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele (Farmer)",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",documentType:"National ID (Fayda)",documentNumber:"FAYDA-ET-8829104",tinNumber:"TIN-FARM-882910",kycTier:2,status:"Verified",submittedAt:"3 days ago"},{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu (Farmer)",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",documentType:"National ID (Fayda)",documentNumber:"FAN-8812-4091-2810",tinNumber:"0099881122",kycTier:2,status:"Pending",submittedAt:"1 day ago"},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu (Farmer)",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",documentType:"Kebele Smallholder ID",documentNumber:"HAW-KEB-4410",kycTier:1,status:"Pending",submittedAt:"12 hours ago"}],this.verificationQueue=[{userId:"88888888-8888-8888-8888-888888888888",userName:"Girma Wondimu",userNameAm:"ግርማ ወንዲሙ",userRole:"Farmer",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",registrationMethod:"Agent",registeredByAgentName:"Kassahun Tolessa (Field Agent)",verificationStatus:"UnderReview",tinNumber:"0099881122",registeredAt:"Yesterday 4:15 PM",documents:[{id:"doc-1",userId:"88888888-8888-8888-8888-888888888888",documentType:"FaydaId",documentNumber:"FAN-8812-4091-2810",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"},{id:"doc-2",userId:"88888888-8888-8888-8888-888888888888",documentType:"TinCertificate",documentNumber:"0099881122",frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"Yesterday 4:15 PM"}],reviews:[]},{userId:"55555555-5555-5555-5555-555555555555",userName:"Dawit Kebede",userNameAm:"ዳዊት ከበደ",userRole:"Driver",phone:"+251977889900",region:"Addis Ababa (Kaliti)",registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:"TIN-DRV-981244",registeredAt:"2 days ago",documents:[{id:"doc-3",userId:"55555555-5555-5555-5555-555555555555",documentType:"VehicleLogbook",documentNumber:"ET-LOG-5T-98214",frontImageUrl:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"2 days ago"}],reviews:[]},{userId:"33333333-3333-3333-3333-333333333333",userName:"Chala Gemechu",userNameAm:"ጫላ ገመቹ",userRole:"Farmer",phone:"+251933445566",region:"Sidama (Hawassa)",registrationMethod:"Self",verificationStatus:"UnderReview",registeredAt:"3 days ago",documents:[{id:"doc-4",userId:"33333333-3333-3333-3333-333333333333",documentType:"KebeleId",documentNumber:"HAW-KEB-4410",frontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:"3 days ago"}],reviews:[]},{userId:"11111111-1111-1111-1111-111111111111",userName:"Abebe Bekele",userNameAm:"አበበ በቀለ",userRole:"Farmer",phone:"+251911223344",region:"Oromia (Bishoftu)",registrationMethod:"Self",verificationStatus:"Approved",tinNumber:"TIN-FARM-882910",registeredAt:"1 month ago",documents:[{id:"doc-5",userId:"11111111-1111-1111-1111-111111111111",documentType:"FaydaId",documentNumber:"FAYDA-ET-8829104",status:"Approved",submittedAt:"1 month ago"}],reviews:[{id:"rev-1",userId:"11111111-1111-1111-1111-111111111111",reviewerName:"Sara Mengistu",actionTaken:"Approved",notes:"National ID and Bishoftu farm registry confirmed.",timestamp:"1 month ago"}]}],this.agentRegisteredFarmers=[{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",region:"Oromia (Bishoftu / Ada'a)",kebele:"Ada'a Kebele 04",primaryCrop:"Magna Teff & Tomatoes",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",status:"UnderReview",registeredAt:"Yesterday 4:15 PM",faydaFrontImageUrl:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"},{id:"f-agent-02",name:"Tadesse Roba",nameAm:"ታደሰ ሮባ",phone:"+251911889900",region:"Oromia (Bishoftu)",kebele:"Bishoftu Rural Kebele 02",primaryCrop:"Red Onions & Garlic",faydaId:"FAN-1029-4819-2041",tinNumber:"0088772211",status:"Approved",registeredAt:"5 days ago"},{id:"f-agent-03",name:"Desta Wolde",nameAm:"ደስታ ወልዴ",phone:"+251922776655",region:"Oromia (Ada'a)",kebele:"Dukem Farm Zone",primaryCrop:"Wheat & Chickpeas",faydaId:"FAN-7766-5544-3322",status:"Approved",registeredAt:"1 week ago"}],this.regionalAnalytics=[{region:"Oromia (East Shewa / Bishoftu)",smallholdersCount:4200,volumeMetricTons:68.5,totalGmvEtb:385e4,topCrop:"Tomatoes & Onions"},{region:"Amhara (Debre Berhan / Gojjam)",smallholdersCount:3100,volumeMetricTons:42,totalGmvEtb:483e4,topCrop:"Magna White Teff"},{region:"Sidama (Hawassa / Yirgalem)",smallholdersCount:1950,volumeMetricTons:24.8,totalGmvEtb:1488e3,topCrop:"Hass Avocados & Fruits"},{region:"SNNPR (Gedeo / Yirgacheffe)",smallholdersCount:1400,volumeMetricTons:10.5,totalGmvEtb:399e4,topCrop:"Specialty Green Coffee"}],this.allUsers=[{id:"00000000-0000-0000-0000-000000000001",name:"Dr. Dawit Haile (Super Admin)",nameAm:"ዶ/ር ዳዊት ኃይሌ",phone:"+251900000001",role:"superadmin",region:"Addis Ababa (Headquarters)",verified:!0,verificationStatus:"Approved",status:"active",createdAt:"2025-01-01"},{id:"66666666-6666-6666-6666-666666666666",name:"Sara Mengistu (Marketplace Admin)",nameAm:"ሳራ መንግስቱ",phone:"+251900112233",role:"admin",region:"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",permissions:["users_manage","disputes_resolve","kyc_approve","sms_broadcast","reports_view"],createdAt:"2025-03-15"},{id:"77777777-7777-7777-7777-777777777777",name:"Kassahun Tolessa (Field Agent)",nameAm:"ካሳሁን ቶለሳ",phone:"+251988776655",role:"agent",region:"Oromia (East Shewa / Bishoftu)",verified:!0,verificationStatus:"Approved",status:"active",tinNumber:"TIN-AG-881920",createdAt:"2025-04-10"},{id:"11111111-1111-1111-1111-111111111111",name:"Abebe Bekele",nameAm:"አበበ በቀለ",phone:"+251911223344",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Fresh Sholla Tomatoes",faydaId:"FAN-1122-3344-5566",tinNumber:"0011223344",walletBalanceEtb:48200,createdAt:"2025-02-01"},{id:"22222222-2222-2222-2222-222222222222",name:"Almaz Tadesse",nameAm:"አልማዝ ታደሰ",phone:"+251922334455",role:"farmer",region:"Amhara (Debre Berhan / Basona)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Organic Magna White Teff",faydaId:"FAN-2233-4455-6677",tinNumber:"0022334455",walletBalanceEtb:62400,createdAt:"2025-02-15"},{id:"33333333-3333-3333-3333-333333333333",name:"Chala Gemechu",nameAm:"ጫላ ገመቹ",phone:"+251933445566",role:"farmer",region:"Sidama (Hawassa / Wondo Genet)",verified:!0,verificationStatus:"Approved",status:"active",primaryCrop:"Hawassa Hass Avocados",faydaId:"FAN-3344-5566-7788",tinNumber:"0033445566",walletBalanceEtb:39100,createdAt:"2025-03-01"},{id:"88888888-8888-8888-8888-888888888888",name:"Girma Wondimu",nameAm:"ግርማ ወንዲሙ",phone:"+251944556677",role:"farmer",region:"Oromia (Bishoftu / Ada'a)",verified:!1,verificationStatus:"UnderReview",status:"active",primaryCrop:"Magna Teff",faydaId:"FAN-8812-4091-2810",tinNumber:"0099881122",createdAt:"2026-08-20"},{id:"44444444-4444-4444-4444-444444444444",name:"Bethlehem Tsegaye",nameAm:"ቤተልሔም ፀጋዬ",phone:"+251912345678",role:"buyer",region:"Addis Ababa (Bole Sub-City)",verified:!0,verificationStatus:"Approved",status:"active",businessLicenseNumber:"BL-AA-998812",tinNumber:"0044556677",createdAt:"2025-01-20"},{id:"55555555-5555-5555-5555-555555555555",name:"Dawit Kebede (Freight Logistics)",nameAm:"ዳዊት ከበደ",phone:"+251977889900",role:"driver",region:"Addis Ababa / Oromia Freight Corridor",verified:!0,verificationStatus:"Approved",status:"active",vehicleType:"Isuzu 5-Ton Refrigerated",vehicleCapacityKg:5e3,refrigerationType:"Ventilated & Insulated",walletBalanceEtb:6450,createdAt:"2025-02-10"}];const e=localStorage.getItem("farmerMarketAllUsers");if(e)try{const t=JSON.parse(e);if(Array.isArray(t)&&t.length>0){const s=[...this.allUsers],a=[...t];s.forEach(r=>{a.some(o=>o.id===r.id||o.phone===r.phone)||a.push(r)}),this.allUsers=a}}catch(t){console.warn("Could not parse stored users, using default seed",t)}this.systemAuditLogs=[{id:"log-101",actorId:"00000000-0000-0000-0000-000000000001",actorName:"Dr. Dawit Haile (Super Admin)",actorRole:"superadmin",action:"INITIALIZE_PLATFORM_GOVERNANCE",category:"CONFIG",targetResource:"PlatformConfig",targetId:"ESCROW-90-5-5",ipAddress:"196.188.12.45 (Addis Ababa, Ethio Telecom)",userAgent:"Antigravity/2.0 Web Admin Engine",details:"Established baseline 90/5/5 escrow split, 15% VAT on platform fee, and MOR withholding tax schedule.",timestamp:"2026-08-23 08:30 AM"},{id:"log-102",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"APPROVE_KYC_VERIFICATION",category:"USER_CRUD",targetResource:"UserDocument",targetId:"11111111-1111-1111-1111-111111111111",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Approved Abebe Bekele Fayda National ID (FAN-1122-3344-5566) and TIN (0011223344).",timestamp:"2026-08-23 10:15 AM"},{id:"log-103",actorId:"66666666-6666-6666-6666-666666666666",actorName:"Sara Mengistu",actorRole:"admin",action:"DISPUTE_ARBITRATION_DECREE",category:"DISPUTE",targetResource:"Order",targetId:"ord-dispute-001",ipAddress:"196.189.44.12",userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",details:"Resolved moisture defect dispute with 50/50 partial split under EABC arbitration rules.",timestamp:"2026-08-23 11:45 AM"}],this.deliveryZones=[{id:"zone-1",name:"Oromia East Shewa Hub",nameAm:"ምስራቅ ሸዋ የግብርና ኮሪደር",centerLatitude:8.7522,centerLongitude:38.9785,baseRadiusKm:45,maxRadiusKm:120,ruralSubsidyEtb:150,active:!0,clusterHubName:"Bishoftu & Mojo Freight Terminal",smallholdersCount:4200},{id:"zone-2",name:"Addis Ababa Central Wholesale Depot",nameAm:"አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ",centerLatitude:9.0222,centerLongitude:38.7468,baseRadiusKm:25,maxRadiusKm:60,ruralSubsidyEtb:0,active:!0,clusterHubName:"Merkato & Jan Meda Distribution",smallholdersCount:850},{id:"zone-3",name:"Amhara Highland Grain Basin",nameAm:"የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ",centerLatitude:9.68,centerLongitude:39.53,baseRadiusKm:60,maxRadiusKm:180,ruralSubsidyEtb:250,active:!0,clusterHubName:"Debre Berhan & Shewa Robit Hub",smallholdersCount:3100},{id:"zone-4",name:"Sidama Rift Fruit & Vegetable Zone",nameAm:"የሲዳማ ፍራፍሬ እና አትክልት ዞን",centerLatitude:7.0504,centerLongitude:38.4955,baseRadiusKm:50,maxRadiusKm:150,ruralSubsidyEtb:200,active:!0,clusterHubName:"Hawassa Lakeview Terminal",smallholdersCount:1950},{id:"zone-5",name:"SNNPR Gedeo Specialty Coffee Zone",nameAm:"የጌዴኦ ስፔሻሊቲ ቡና ዞን",centerLatitude:6.1628,centerLongitude:38.2045,baseRadiusKm:40,maxRadiusKm:140,ruralSubsidyEtb:300,active:!0,clusterHubName:"Yirgacheffe Washing Station Depot",smallholdersCount:1400},{id:"zone-6",name:"Tigray Northern Transit Hub",nameAm:"የትግራይ ሰሜናዊ የንግድ ኮሪደር",centerLatitude:13.4967,centerLongitude:39.4753,baseRadiusKm:55,maxRadiusKm:160,ruralSubsidyEtb:350,active:!0,clusterHubName:"Mekelle Central Depot",smallholdersCount:1100}],this.featureFlags=[{key:"advance_harvest",name:"Advance Harvest Pre-Ordering",description:"Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","buyer","admin","superadmin"]},{key:"voice_note_transcription",name:"Voice Note Audio Memos & AI Transcription",description:"Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent","admin","superadmin"]},{key:"dynamic_price_benchmarking",name:"Real-time Wholesale Depot Price Benchmarking",description:"Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["buyer","farmer","superadmin"]},{key:"ussd_offline_gateway",name:"USSD Offline Gateway (*990# / *805#)",description:"Permits feature phone registration, balance checks, and SMS listing fallbacks.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["farmer","agent"]},{key:"multisig_escrow_protection",name:"High-Value Escrow Multi-Sig Authorization",description:"Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.",enabled:!0,rolloutPercentage:100,targetRegions:["all"],targetRoles:["admin","superadmin"]}],this.payoutApprovals=[{id:"payout-appr-001",recipientId:"22222222-2222-2222-2222-222222222222",recipientName:"Almaz Tadesse (Basona Teff Cooperative)",recipientPhone:"+251922334455",recipientRole:"farmer",amountEtb:62400,walletBalanceBefore:62400,riskScore:"Low",triggerReason:"Exceeds 50,000 ETB platform threshold (100 Quintals Teff Settlement)",status:"Pending",requestedAt:"Today 10:45 AM"},{id:"payout-appr-002",recipientId:"55555555-5555-5555-5555-555555555555",recipientName:"Dawit Kebede (Bulk Freight Fleet)",recipientPhone:"+251977889900",recipientRole:"driver",amountEtb:54200,walletBalanceBefore:54200,riskScore:"Medium",triggerReason:"High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips)",status:"Pending",requestedAt:"Today 01:20 PM"}],this.blacklist=[{id:"bl-01",type:"Phone",value:"+251911999888",reason:"Repeated fraudulent non-delivery claims in Adama market",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-15",active:!0},{id:"bl-02",type:"NationalId",value:"FAN-9999-0000-1111",reason:"Forged Kebele farming certification and duplicate TIN submission",blacklistedBy:"Dr. Dawit Haile (Super Admin)",blacklistedAt:"2026-08-18",active:!0}]}loadOfflineQueue(){try{const e=localStorage.getItem("offlineQueue");e&&(this.offlineQueue=JSON.parse(e))}catch{this.offlineQueue=[]}}saveOfflineQueue(){localStorage.setItem("offlineQueue",JSON.stringify(this.offlineQueue))}getAuthHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e())}isAuthenticated(){return this.isUserLoggedIn&&!!this.currentUser}getCurrentUser(){return this.currentUser}getToken(){return this.token}async fetchMe(){if(!this.token)return null;try{const e=await fetch("/api/auth/me",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json(),s=t.verificationStatus||(t.verified?"Approved":"PendingSubmission"),a={id:t.id,phone:t.phone,name:t.name,nameAm:t.nameAm,email:t.email,languagePreference:t.languagePreference,savedDeliveryAddress:t.savedDeliveryAddress,defaultDeliveryLat:t.defaultDeliveryLat,defaultDeliveryLng:t.defaultDeliveryLng,role:(t.role||"buyer").toLowerCase(),region:t.region,verified:t.verified??s==="Approved",verificationStatus:s,rejectionReason:t.rejectionReason,tinNumber:t.tinNumber||(s==="Approved"&&t.role==="buyer"?"TIN-ET-9912001":void 0),businessLicenseNumber:t.businessLicenseNumber||(s==="Approved"?"MOT-LIC-2026-98124":void 0),vehicleType:t.vehicleType||(t.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:t.refrigerationType||(t.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:t.vehicleCapacityKg||(t.role==="driver"?5e3:void 0),kycDocumentType:t.kycDocumentType||(s==="Approved"?"National ID (Fayda)":void 0),kycDocumentNumber:t.kycDocumentNumber,kycStatus:s==="Approved"?"Verified":"Pending",kycTier:t.kycTier||2,repeatBuyerCount:t.repeatBuyerCount||(t.role==="farmer"?14:void 0),onTimeDeliveryRate:t.onTimeDeliveryRate||(t.role==="farmer"||t.role==="driver"?99:void 0),walletBalanceEtb:t.walletBalanceEtb??0,createdAt:t.createdAt};return this.currentUser=a,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(a)),this.notify(),a}else e.status===401&&this.logout()}catch(e){console.warn("Could not fetch user profile from backend",e)}return this.currentUser}async updateProfile(e){if(!this.token)throw new Error("You must be signed in to update your profile.");const t=await fetch("/api/auth/profile",{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({Name:e.name,NameAm:e.nameAm||null,Region:e.region,Email:e.email||null,LanguagePreference:e.languagePreference||null,SavedDeliveryAddress:e.savedDeliveryAddress||null,DefaultDeliveryLat:e.defaultDeliveryLat??null,DefaultDeliveryLng:e.defaultDeliveryLng??null})}),s=await t.json().catch(()=>({}));if(!t.ok)throw new Error(s.error||"Could not save your profile.");return await this.fetchMe(),this.currentUser}async changePassword(e,t){if(!this.token)throw new Error("You must be signed in to change your password.");const s=await fetch("/api/auth/change-password",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({currentPassword:e,newPassword:t})}),a=await s.json().catch(()=>({}));if(!s.ok)throw new Error(a.error||"Could not change your password.")}async accountRequest(e,t){const s=await fetch(`/api/account/${e}`,{...t,headers:{...this.getAuthHeaders(),...(t==null?void 0:t.headers)||{}}}),a=await s.json().catch(()=>null);if(!s.ok)throw new Error((a==null?void 0:a.error)||"Account request failed.");return a}async fetchAccountData(){if(!this.token)return this.accountData;const[e,t,s,a,r,o]=await Promise.all([this.accountRequest("addresses"),this.accountRequest("payment-methods"),this.accountRequest("coupons"),this.accountRequest("notification-preferences"),this.accountRequest("sessions"),this.accountRequest("two-factor")]);return this.accountData={addresses:e,paymentMethods:t,coupons:s,notificationPreferences:a,sessions:r,twoFactor:o},this.accountData}getAccountData(){return this.accountData}async saveAddress(e){const t=await this.accountRequest("addresses",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateAddress(e,t){const s=await this.accountRequest(`addresses/${e}`,{method:"PUT",body:JSON.stringify(t)});return await this.fetchAccountData(),s}async deleteAddress(e){await this.accountRequest(`addresses/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async addPaymentMethod(e){const t=await this.accountRequest("payment-methods",{method:"POST",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async setPrimaryPaymentMethod(e){await this.accountRequest(`payment-methods/${e}/primary`,{method:"PUT"}),await this.fetchAccountData()}async deletePaymentMethod(e){await this.accountRequest(`payment-methods/${e}`,{method:"DELETE"}),await this.fetchAccountData()}async setNotificationPreference(e){const t=await this.accountRequest("notification-preferences",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async updateTwoFactor(e){const t=await this.accountRequest("two-factor",{method:"PUT",body:JSON.stringify(e)});return await this.fetchAccountData(),t}async revokeOtherSessions(){await this.accountRequest("sessions/revoke-others",{method:"POST"}),await this.fetchAccountData()}async requestOtp(e){const t=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const s=await fetch("/api/auth/request-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t})});if(s.ok)return await s.json();const a=this.allUsers.find(o=>o.phone.replace(/\s+/g,"")===t);if(a)return{demoCode:"888888",message:`Verification code dispatched via SMS simulator for ${a.name}.`,phone:t,userName:a.name,role:a.role};const r=await s.json().catch(()=>({error:"Failed to request OTP"}));throw new Error(r.error||"Failed to request OTP. Please check your phone number.")}catch(s){const a=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===t);if(a)return{demoCode:"888888",message:`Verification code dispatched via SMS simulator for ${a.name}.`,phone:t,userName:a.name,role:a.role};throw s}}async verifyOtp(e,t){const s=e.startsWith("+251")?e.replace(/\s+/g,""):"+251"+e.replace(/^0+/,"").replace(/\s+/g,"");try{const r=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:s,code:t.trim()})});if(r.ok){const o=await r.json();this.token=o.token,localStorage.setItem("token",o.token);const i=o.user.verificationStatus||(o.user.verified?"Approved":"PendingSubmission"),l={id:o.user.id,phone:o.user.phone,name:o.user.name,nameAm:o.user.nameAm,role:(o.user.role||"buyer").toLowerCase(),region:o.user.region,verified:o.user.verified??i==="Approved",verificationStatus:i,rejectionReason:o.user.rejectionReason,tinNumber:o.user.tinNumber,businessLicenseNumber:o.user.businessLicenseNumber,vehicleType:o.user.vehicleType||(o.user.role==="driver"?"Isuzu 5-Ton":void 0),refrigerationType:o.user.refrigerationType||(o.user.role==="driver"?"Ventilated":void 0),vehicleCapacityKg:o.user.vehicleCapacityKg||(o.user.role==="driver"?5e3:void 0),kycDocumentType:o.user.kycDocumentType,kycDocumentNumber:o.user.kycDocumentNumber,kycStatus:i==="Approved"?"Verified":"Pending",kycTier:2,repeatBuyerCount:o.user.repeatBuyerCount||(o.user.role==="farmer"?14:void 0),onTimeDeliveryRate:o.user.onTimeDeliveryRate||(o.user.role==="farmer"||o.user.role==="driver"?99:void 0),walletBalanceEtb:o.user.walletBalanceEtb??0,createdAt:o.user.createdAt};return this.currentUser=l,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(l)),de.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),l}}catch(r){console.warn("Network verifyOtp failed, checking local seed users",r)}const a=this.allUsers.find(r=>r.phone.replace(/\s+/g,"")===s);if(a)return this.currentUser=a,this.isUserLoggedIn=!0,this.token="demo-jwt-token-"+a.id,localStorage.setItem("token",this.token),localStorage.setItem("currentUser",JSON.stringify(a)),this.notify(),a;throw new Error("Invalid verification code or phone number.")}async registerUser(e,t,s,a,r){const o=s.startsWith("+251")?s.replace(/\s+/g,""):"+251"+s.replace(/^0+/,"").replace(/\s+/g,""),i=a.charAt(0).toUpperCase()+a.slice(1).toLowerCase();let l;try{const u=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,nameAm:t||null,phone:o,role:i,region:r})});if(u.ok){const h=await u.json();this.token=h.token,localStorage.setItem("token",h.token),l={id:h.user.id,phone:h.user.phone,name:h.user.name,nameAm:h.user.nameAm,role:(h.user.role||"buyer").toLowerCase(),region:h.user.region,verified:!1,verificationStatus:"PendingSubmission",status:"active",tinNumber:void 0,businessLicenseNumber:void 0,vehicleType:a==="driver"?"Isuzu 5-Ton":void 0,refrigerationType:a==="driver"?"Ventilated":void 0,vehicleCapacityKg:a==="driver"?5e3:void 0,kycDocumentType:void 0,kycDocumentNumber:void 0,kycStatus:"Pending",kycTier:1,repeatBuyerCount:0,onTimeDeliveryRate:100,walletBalanceEtb:0,createdAt:h.user.createdAt||new Date().toISOString()}}else{const h=await u.json().catch(()=>({error:"Registration failed"}));throw new Error(h.error||"Registration failed")}}catch(u){console.warn("Backend register call fallback to local state",u),l={id:"user-"+Date.now(),phone:o,name:e,nameAm:t||e,role:a,region:r,verified:!1,verificationStatus:"PendingSubmission",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},this.token="demo-jwt-token-"+l.id,localStorage.setItem("token",this.token)}this.currentUser=l,this.isUserLoggedIn=!0,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const d=this.allUsers.findIndex(u=>u.id===l.id||u.phone===l.phone);return d!==-1?this.allUsers[d]={...this.allUsers[d],...l}:this.allUsers.unshift(l),this.saveUsersToStorage(),this.addAuditLog({actorId:l.id,actorName:l.name,actorRole:l.role,action:"USER_REGISTRATION",category:"AUTH",targetResource:"User",targetId:l.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Self-registered new ${l.role.toUpperCase()} account: ${l.name} (${l.phone}) in ${l.region}.`}),de.startConnection(this.token||void 0),await this.refreshAllData(),this.notify(),this.currentUser}logout(){this.isUserLoggedIn=!1,this.currentUser=null,this.token=null,localStorage.removeItem("token"),localStorage.removeItem("currentUser"),this.notify()}async fetchListings(){try{const e=await fetch("/api/listings");if(e.ok){const t=await e.json(),s=Array.isArray(t)?t:t.items||[];return this.listings=s.map(a=>({id:a.id,farmerId:a.farmerId,farmerName:a.farmerName,farmerNameAm:a.farmerNameAm,farmerPhone:a.farmerPhone,region:a.region,productName:a.productName,nameAm:a.nameAm,category:a.category,qtyKg:Number(a.qtyKg),pricePerKg:Number(a.pricePerKg),minOrderKg:Number(a.minOrderKg),latitude:a.latitude,longitude:a.longitude,distanceKm:a.distanceKm,photos:a.photos&&a.photos.length>0?a.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:a.availableFrom||new Date().toISOString().split("T")[0],status:(a.status||"Active").toLowerCase(),grade:a.grade||"Grade 1",ripeness:a.ripeness||"Ready Today",isOrganic:a.isOrganic??!0,isAdvanceHarvest:a.isAdvanceHarvest??!1,expectedHarvestDate:a.expectedHarvestDate,voiceNoteUrl:a.voiceNoteUrl,voiceNoteTranscript:a.voiceNoteTranscript,marketBenchmarkPrice:a.marketBenchmarkPrice||a.pricePerKg,moderationStatus:a.moderationStatus||"Approved",farmerRating:a.farmerRating||4.9,reviewCount:a.reviewCount||14,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:a.createdAt})),this.notify(),this.listings}}catch(e){console.warn("Fetch listings from backend failed",e)}return this.listings}getListings(e,t,s,a,r,o,i,l){return this.listings.filter(d=>{if(d.status!=="active"||e&&e!=="All"&&d.category.toLowerCase()!==e.toLowerCase()||t&&t!=="All"&&!d.region.toLowerCase().includes(t.toLowerCase())||r&&r!=="All"&&d.grade!==r||o&&o!=="All"&&d.ripeness!==o||i&&!d.isOrganic||l&&!d.isAdvanceHarvest||a&&d.distanceKm&&d.distanceKm>a)return!1;if(s){const u=s.toLowerCase();if(!(d.productName.toLowerCase().includes(u)||d.nameAm&&d.nameAm.includes(u)||d.farmerName.toLowerCase().includes(u)||d.region.toLowerCase().includes(u)))return!1}return!0})}getListingById(e){return this.listings.find(t=>t.id===e)}async createListing(e){var a,r,o,i,l,d,u,h,x,T;const t={productName:e.productName,nameAm:e.nameAm||null,category:e.category||"Vegetables",qtyKg:e.qtyKg,pricePerKg:e.pricePerKg,minOrderKg:e.minOrderKg,latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,photos:e.photos,availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate||null,voiceNoteUrl:e.voiceNoteUrl||null,voiceNoteTranscript:e.voiceNoteTranscript||null,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg};let s=null;try{const E=await fetch("/api/listings",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(E.ok){const S=await E.json();s={id:S.id,farmerId:S.farmerId||((a=this.currentUser)==null?void 0:a.id)||"11111111-1111-1111-1111-111111111111",farmerName:S.farmerName||((r=this.currentUser)==null?void 0:r.name)||"Abebe Bekele",farmerNameAm:S.farmerNameAm||((o=this.currentUser)==null?void 0:o.nameAm),farmerPhone:S.farmerPhone||((i=this.currentUser)==null?void 0:i.phone)||"+251911223344",region:S.region||((l=this.currentUser)==null?void 0:l.region)||"Oromia (Bishoftu)",productName:S.productName,nameAm:S.nameAm,category:S.category,qtyKg:Number(S.qtyKg),pricePerKg:Number(S.pricePerKg),minOrderKg:Number(S.minOrderKg),latitude:S.latitude,longitude:S.longitude,distanceKm:S.distanceKm||45,photos:S.photos&&S.photos.length>0?S.photos:e.photos||["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:S.availableFrom,status:"active",grade:S.grade||e.grade||"Grade 1",ripeness:S.ripeness||e.ripeness||"Ready Today",isOrganic:S.isOrganic??e.isOrganic??!0,isAdvanceHarvest:S.isAdvanceHarvest??e.isAdvanceHarvest??!1,expectedHarvestDate:S.expectedHarvestDate||e.expectedHarvestDate,voiceNoteUrl:S.voiceNoteUrl||e.voiceNoteUrl,voiceNoteTranscript:S.voiceNoteTranscript||e.voiceNoteTranscript,marketBenchmarkPrice:S.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:S.createdAt||new Date().toISOString()}}}catch(E){console.warn("Create listing network call fallback to local state",E)}return s||(s={id:"list-local-"+Date.now(),farmerId:((d=this.currentUser)==null?void 0:d.id)||"11111111-1111-1111-1111-111111111111",farmerName:((u=this.currentUser)==null?void 0:u.name)||"Abebe Bekele",farmerNameAm:(h=this.currentUser)==null?void 0:h.nameAm,farmerPhone:((x=this.currentUser)==null?void 0:x.phone)||"+251911223344",region:((T=this.currentUser)==null?void 0:T.region)||"Oromia (Bishoftu)",productName:e.productName||"Fresh Farm Produce",nameAm:e.nameAm,category:e.category||"Vegetables",qtyKg:Number(e.qtyKg||1e3),pricePerKg:Number(e.pricePerKg||45),minOrderKg:Number(e.minOrderKg||100),latitude:e.latitude||8.7523,longitude:e.longitude||38.9785,distanceKm:45,photos:e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"],availableFrom:e.availableFrom||new Date().toISOString().split("T")[0],status:"active",grade:e.grade||"Grade 1",ripeness:e.ripeness||"Ready Today",isOrganic:e.isOrganic??!0,isAdvanceHarvest:e.isAdvanceHarvest??!1,expectedHarvestDate:e.expectedHarvestDate,voiceNoteUrl:e.voiceNoteUrl,voiceNoteTranscript:e.voiceNoteTranscript,marketBenchmarkPrice:e.marketBenchmarkPrice||e.pricePerKg,moderationStatus:"Approved",farmerRating:5,reviewCount:0,repeatBuyerCount:18,onTimeDeliveryRate:99,createdAt:new Date().toISOString()}),this.listings.unshift(s),this.notify(),s}async deleteListing(e){const t=await fetch(`/api/listings/${e}`,{method:"DELETE",headers:this.getAuthHeaders()}),s=await t.json().catch(()=>({}));if(!t.ok)throw new Error(s.error||"Could not delete the listing.");await this.fetchListings()}async fetchOrders(){if(!this.isAuthenticated())return this.orders=[],[];try{const e=await fetch("/api/orders",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();return this.orders=t.map(s=>{const a=Number(s.totalEtb),r=Number(s.farmerCut||a*.9),o=Number(s.driverCut||a*.05),i=Number(s.platformCut||a*.05),l=Math.round(a*.02),d=Math.round(i*.15);return{id:s.id,listingId:s.listingId,productName:s.productName,productNameAm:s.productNameAm,category:s.category,farmerId:s.farmerId,farmerName:s.farmerName,farmerNameAm:s.farmerNameAm,farmerPhone:s.farmerPhone,farmerRegion:s.farmerRegion,buyerId:s.buyerId,buyerName:s.buyerName,buyerPhone:s.buyerPhone,driverId:s.driverId,driverName:s.driverName,driverPhone:s.driverPhone,qtyKg:Number(s.qtyKg),pricePerKg:Number(s.pricePerKg),totalEtb:a,farmerCut:r,driverCut:o,platformCut:i,driverSubsidyEtb:Number(s.driverSubsidyEtb||150),withholdingTaxEtb:l,platformVatEtb:d,status:(s.status||"Pending").toLowerCase(),escrowHeld:s.escrowHeld,paymentRef:s.paymentRef||`TB-${s.id.slice(0,8).toUpperCase()}`,invoiceNumber:`ET-INV-2026-${s.id.slice(0,6).toUpperCase()}`,waybillNumber:`WB-FTA-${s.id.slice(0,6).toUpperCase()}`,contractNumber:`AGR-ET-${s.id.slice(0,6).toUpperCase()}`,arbitrationDecreeNumber:s.status==="disputed"?`ARB-DEC-${s.id.slice(0,6).toUpperCase()}`:void 0,pickupPhoto:s.pickupPhoto,deliveryPhoto:s.deliveryPhoto,deliveryGpsLat:s.deliveryGpsLat,deliveryGpsLng:s.deliveryGpsLng,deliveredAt:s.deliveredAt,deliveryAddress:s.deliveryAddress,deliveryNotes:s.deliveryNotes,disputeReason:s.disputeReason,disputePhoto:s.disputePhoto,requestedRefundPercent:s.requestedRefundPercent||100,disputeStatus:s.disputeStatus||"None",disputeResolutionNotes:s.disputeResolutionNotes,isRecurring:s.isRecurring||!1,recurringFrequency:s.recurringFrequency,confirmedAt:s.confirmedAt,createdAt:s.createdAt}}),this.notify(),this.orders}}catch(e){console.warn("Fetch orders failed",e)}return this.orders}getOrders(e){if(!this.currentUser)return[];const t=e||this.currentUser.role;return t==="farmer"?this.orders.filter(s=>s.farmerId===this.currentUser.id):t==="buyer"?this.orders.filter(s=>s.buyerId===this.currentUser.id):t==="driver"?this.orders.filter(s=>s.driverId===this.currentUser.id||s.status==="confirmed"&&!s.driverId):this.orders}async placeOrder(e,t,s,a=!1,r="Weekly",o){var d;if(!this.listings.find(u=>u.id===e))throw new Error("Listing not found");if(!(await fetch("/api/orders",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({listingId:e,qtyKg:t,deliveryAddress:s||((d=this.currentUser)==null?void 0:d.region)||"Addis Ababa (Bole)",paymentMethodId:o||null,isRecurring:a,recurringFrequency:a?r:null})})).ok)throw new Error("Failed to place order in database");return await this.fetchOrders(),await this.fetchListings(),this.orders[0]||this.orders.find(u=>u.listingId===e)}async confirmOrderByFarmer(e){await fetch(`/api/orders/${e}/confirm`,{method:"PUT",headers:this.getAuthHeaders()}),await this.fetchOrders()}async pickupOrderByDriver(e,t){if(this.isOfflineMode){this.offlineQueue.push({id:"off-"+Date.now(),type:"pickup",orderId:e,timestamp:new Date().toISOString(),data:{photo:t},synced:!1}),this.saveOfflineQueue();const s=this.orders.find(a=>a.id===e);s&&(s.status="picked_up",s.pickupPhoto=t),this.notify();return}await fetch(`/api/orders/${e}/pickup`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({pickupPhoto:t||"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"})}),await this.fetchOrders()}async confirmDeliveryByBuyer(e,t,s,a){await fetch(`/api/orders/${e}/deliver`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({deliveryPhoto:t||"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",deliveryGpsLat:s||9.03,deliveryGpsLng:a||38.74})}),await this.fetchOrders()}async disputeOrder(e,t,s,a=50){const r=await fetch(`/api/orders/${e}/dispute`,{method:"PUT",headers:this.getAuthHeaders(),body:JSON.stringify({reason:t,disputePhoto:s||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",requestedRefundPercent:a})}),o=await r.json().catch(()=>({}));if(!r.ok)throw new Error(o.error||"Could not submit the dispute.");await this.fetchOrders()}async resolveDispute(e,t,s=50,a=50){const r=await fetch(`/api/admin/orders/${e}/resolve-dispute`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({resolution:t,notes:`Arbitrated via Admin Console (${t})`,farmerSharePercent:s,buyerRefundPercent:a})}),o=await r.json().catch(()=>({}));if(!r.ok)throw new Error(o.error||"Could not resolve the dispute.");await this.fetchOrders()}getTaxInvoice(e){const t=this.orders.find(r=>r.id===e)||this.orders[0]||{id:e,productName:"Fresh Sholla Red Tomatoes",qtyKg:200,pricePerKg:45,totalEtb:9e3,farmerCut:8100,driverCut:450,platformCut:450,farmerName:"Abebe Bekele",farmerRegion:"Oromia (Bishoftu)",farmerPhone:"+251 911 223 344",buyerName:"Bethlehem Tilahun (FreshMart)",buyerPhone:"+251 955 667 788",paymentRef:"TB-TXN-98217391",invoiceNumber:"ET-INV-2026-001",createdAt:new Date().toISOString()},s=Math.round(t.platformCut*.15),a=Math.round(t.totalEtb*.02);return{invoiceNumber:t.invoiceNumber||`ET-INV-2026-${t.id.slice(0,6).toUpperCase()}`,orderId:t.id,issueDate:t.createdAt?new Date(t.createdAt).toLocaleDateString("en-GB"):new Date().toLocaleDateString("en-GB"),paymentRef:t.paymentRef||`TB-C2B-${t.id.slice(0,8).toUpperCase()}`,sellerName:t.farmerName,sellerTin:"TIN-FARM-8829104",sellerRegion:t.farmerRegion,sellerPhone:t.farmerPhone,sellerType:"Registered Agricultural Smallholder Producer",buyerName:t.buyerName,buyerTin:"TIN-ET-9912001",buyerRegion:"Addis Ababa (Bole)",buyerPhone:t.buyerPhone,productName:t.productName,productNameAm:t.productNameAm,grade:"Grade 1 (Certified Farm Standard)",qtyKg:t.qtyKg,unitPriceEtb:t.pricePerKg,grossAmountEtb:t.totalEtb,farmerPayoutEtb:t.farmerCut,driverFreightEtb:t.driverCut,platformServiceFeeEtb:t.platformCut,platformVatEtb:s,withholdingTaxEtb:a,totalPaidViaTelebirr:t.totalEtb,regulatoryAct:"Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)",qrVerificationCode:`ET-TAX-AUTH-2026-VERIFIED-${t.id.slice(0,8).toUpperCase()}`,isVatExemptAgriculturalGoods:!0}}getTransportWaybill(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{waybillNumber:(t==null?void 0:t.waybillNumber)||`WB-FTA-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,dispatchDate:new Date().toLocaleDateString("en-GB"),consignorName:(t==null?void 0:t.farmerName)||"Abebe Bekele",consignorFarmLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu Green Farms, Oromia",consignorPhone:(t==null?void 0:t.farmerPhone)||"+251 911 223 344",consigneeName:(t==null?void 0:t.buyerName)||"FreshMart Central Wholesale Hub",consigneeDepotAddress:(t==null?void 0:t.deliveryAddress)||"Bole Depot, Addis Ababa",consigneePhone:(t==null?void 0:t.buyerPhone)||"+251 955 667 788",carrierDriverName:(t==null?void 0:t.driverName)||"Dawit Kebede",driverLicenseNumber:"ET-CDL-COMM-89104",vehiclePlateNumber:"ET-3-B98124-AA",vehicleModel:"Isuzu 5-Ton Commercial Freight Carrier",refrigerationStatus:"Ventilated Agri-Body Cargo (18°C)",insurancePolicyNumber:"NIC-ET-CARGO-771920",cargoDescription:`${(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes"} (Grade 1)`,packageCount:Math.ceil(((t==null?void 0:t.qtyKg)||200)/25),netWeightKg:(t==null?void 0:t.qtyKg)||200,grossWeightKg:((t==null?void 0:t.qtyKg)||200)+18,tareWeightKg:18,temperatureLogCelsius:17.5,farmerHandoffTimestamp:"06:30 AM (Farm Gate)",driverSignatureRef:"DAWIT-KEBEDE-VERIFIED-LOG",buyerReceivedTimestamp:(t==null?void 0:t.status)==="delivered"?"09:45 AM (Bole Depot)":void 0,transitStatus:(t==null?void 0:t.status)==="delivered"?"DeliveredWithGPS":(t==null?void 0:t.status)==="picked_up"?"InTransit":"Dispatched"}}getLegalContract(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{contractNumber:(t==null?void 0:t.contractNumber)||`AGR-CONTR-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,agreementDate:new Date().toLocaleDateString("en-GB"),effectiveDate:new Date().toLocaleDateString("en-GB"),sellerName:(t==null?void 0:t.farmerName)||"Abebe Bekele",sellerIdNumber:"FAYDA-ET-8829104",sellerLocation:(t==null?void 0:t.farmerRegion)||"Bishoftu, Oromia, Ethiopia",buyerName:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun (FreshMart Wholesale)",buyerTinNumber:"TIN-ET-9912001",buyerLocation:(t==null?void 0:t.deliveryAddress)||"Addis Ababa, Ethiopia",cropType:(t==null?void 0:t.productName)||"Fresh Sholla Red Tomatoes",contractedQuantityKg:(t==null?void 0:t.qtyKg)||200,agreedPricePerKg:(t==null?void 0:t.pricePerKg)||45,totalContractValueEtb:(t==null?void 0:t.totalEtb)||9e3,qualityStandardClause:"Produce shall conform to Grade 1 Ethiopian Commodity Quality Standards (Maximum defect tolerance 2.5%, moisture within physiological thresholds).",deliveryTimeline:"Direct farm-to-depot transit guaranteed within 12 hours of farmer harvest confirmation.",escrowClauseText:"Purchase consideration is locked in Telebirr C2B Escrow and shall be automatically disbursed (90% Farmer / 5% Driver / 5% Platform) upon buyer delivery verification.",forceMajeureClauseText:"Neither party shall be liable for delivery failure caused by natural agricultural catastrophes, unseasonal frost, or national logistical force majeure.",disputeJurisdiction:"Federal Democratic Republic of Ethiopia Commercial Code and Ethiopian Agricultural Authority Arbitration Rules.",eSignatures:{sellerSigned:!0,sellerSignDate:"Digitally Authenticated via OTP/Fayda",buyerSigned:!0,buyerSignDate:"Digitally Authenticated via Telebirr Escrow Lock",platformWitnessHash:`EABC-FM-TRUST-SEAL-${e.slice(0,8).toUpperCase()}`}}}getDisputeMediationRecord(e){const t=this.orders.find(s=>s.id===e)||this.orders[0];return{caseNumber:(t==null?void 0:t.arbitrationDecreeNumber)||`ARB-CASE-2026-${e.slice(0,6).toUpperCase()}`,orderId:(t==null?void 0:t.id)||e,filingDate:"Yesterday 3:15 PM",resolutionDate:(t==null?void 0:t.status)==="disputed"?void 0:"Today 11:30 AM",status:(t==null?void 0:t.status)==="disputed"?"UnderInvestigation":"Settled",claimantBuyer:(t==null?void 0:t.buyerName)||"Bethlehem Tilahun",respondentFarmer:(t==null?void 0:t.farmerName)||"Chala Gemechu",freightCarrier:(t==null?void 0:t.driverName)||"Dawit Kebede",totalDisputedAmountEtb:(t==null?void 0:t.totalEtb)||9e3,disputeReason:(t==null?void 0:t.disputeReason)||"Delivered avocados were overripe and 20% bruised during transit from Hawassa.",claimedDefectPercentage:(t==null?void 0:t.requestedRefundPercent)||50,inspectionReport:"Independent physical inspection at Bole Cold Storage Depot confirmed 18.5% transit softening on batch packaging.",photoEvidenceUrl:(t==null?void 0:t.disputePhoto)||"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",leadArbitratorName:"Sara Mengistu (Marketplace Compliance Arbitrator)",legalFindingSummary:"Partial packaging failure during transit. Fair 50/50 equitable split awarded under Ethiopian Commercial Code Art. 2289.",arbitrationVerdict:"FiftyFiftySplit",farmerSettlementEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),buyerRefundEtb:Math.round(((t==null?void 0:t.totalEtb)||9e3)*.5),platformDecreeHash:`LEGAL-DECREE-ARB-${e.slice(0,8).toUpperCase()}`}}getPriceBenchmarks(){return this.priceBenchmarks}getStandingOrders(){return this.standingOrders}addStandingOrder(e,t,s){const a=this.listings.find(o=>o.id===e),r={id:"so-"+Date.now(),listingId:e,productName:(a==null?void 0:a.productName)||"Fresh Produce",productNameAm:a==null?void 0:a.nameAm,farmerName:(a==null?void 0:a.farmerName)||"Abebe Bekele",qtyKg:t,pricePerKg:(a==null?void 0:a.pricePerKg)||45,frequency:s,nextDeliveryDate:s==="Weekly"?"Next Monday, 8:00 AM":"Every 2nd Thursday",active:!0,createdAt:new Date().toISOString()};return this.standingOrders.unshift(r),this.notify(),r}toggleStandingOrder(e){const t=this.standingOrders.find(s=>s.id===e);t&&(t.active=!t.active,this.notify())}getKycQueue(){return this.kycQueue}async verifyKyc(e,t){const s=this.kycQueue.find(a=>a.userId===e);if(s){s.status=t?"Verified":"Rejected";try{await fetch(`/api/admin/users/${e}/verify?verified=${t}&kycStatus=${s.status}`,{method:"PUT",headers:this.getAuthHeaders()})}catch(a){console.warn("KYC update remote failed, updating local state",a)}this.notify()}}getAnomalyAlerts(){return this.anomalyAlerts}getRegionalAnalytics(){return this.regionalAnalytics}getOptimizedRoute(){return{id:"route-oromia-addis-01",title:"Consolidated East Shewa Multi-Farm Route",totalDistanceKm:68.4,estimatedHours:2.5,totalWeightKg:2800,driverCommissionEtb:1450,ruralSubsidyEtb:350,stops:[{stopNumber:1,type:"pickup",locationName:"Bishoftu Green Farms (Abebe Bekele)",contactName:"Abebe Bekele",phone:"+251 911 223 344",cargoDetails:"Fresh Sholla Red Tomatoes",weightKg:1200,completed:!0},{stopNumber:2,type:"pickup",locationName:"Mojo Valley Farm (Almaz Hailu)",contactName:"Almaz Hailu",phone:"+251 922 334 455",cargoDetails:"Awash Valley Red Onions",weightKg:1600,completed:!1},{stopNumber:3,type:"dropoff",locationName:"FreshMart Central Wholesale Hub (Bole, Addis Ababa)",contactName:"Bethlehem Tilahun",phone:"+251 955 667 788",cargoDetails:"Consolidated Wholesale Dropoff (2,800 kg total)",weightKg:2800,completed:!1}]}}updateDriverVehicle(e,t,s){this.currentUser&&this.currentUser.role==="driver"&&(this.currentUser.vehicleType=e,this.currentUser.refrigerationType=t,this.currentUser.vehicleCapacityKg=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify())}toggleOfflineMode(){return this.isOfflineMode=!this.isOfflineMode,this.notify(),this.isOfflineMode}getIsOfflineMode(){return this.isOfflineMode}getOfflineQueue(){return this.offlineQueue}async syncOfflineQueue(){var s;const e=this.offlineQueue.filter(a=>!a.synced);for(const a of e)a.type==="pickup"&&await this.pickupOrderByDriver(a.orderId,(s=a.data)==null?void 0:s.photo),a.synced=!0;const t=e.length;return this.offlineQueue=[],this.saveOfflineQueue(),this.notify(),t}async sendInboundSms(e,t){try{const s=await fetch("/api/sms/inbound",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:e,body:t})});if(s.ok){const a=await s.json();return await this.refreshAllData(),a.response}}catch(s){console.warn("SMS Webhook call failed, simulating response",s)}return`[SIMULATED SMS ACK] Received: "${t}". Processed successfully in offline cache.`}simulateVoiceTranscription(e,t){return t==="am"?{productName:"Fresh Sholla Red Tomatoes",nameAm:"የሾላ ቀይ ቲማቲም",category:"Vegetables",qtyKg:1500,pricePerKg:45,region:"Oromia (Bishoftu)",transcript:"1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"}:t==="om"?{productName:"Awash Red Onions",nameAm:"የአዋሽ ቀይ ሽንኩርት",category:"Vegetables",qtyKg:2e3,pricePerKg:55,region:"Oromia (Adama)",transcript:"Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."}:{productName:"Grade 1 Specialty Green Coffee",nameAm:"የይርጋጨፌ ስፔሻሊቲ ቡና",category:"Coffee",qtyKg:800,pricePerKg:380,region:"SNNPR (Yirgacheffe)",transcript:"We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."}}requestWalletWithdrawal(e,t){return this.currentUser?(this.currentUser.walletBalanceEtb=Math.max(0,(this.currentUser.walletBalanceEtb||48200)-e),this.farmerSummary.releasedEtb+=e,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)),this.notify(),!0):!1}async fetchSummaries(){if(this.currentUser)try{if(this.currentUser.role==="farmer"){const e=await fetch("/api/payments/farmer-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.farmerSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEscrowEtb:Number(t.pendingEscrowEtb),releasedEtb:Number(t.releasedEtb),completedOrdersCount:t.completedOrdersCount,pendingOrdersCount:t.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round(Number(t.totalEarnedEtb)*.02)}}}else if(this.currentUser.role==="driver"){const e=await fetch("/api/payments/driver-summary",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.driverSummary={totalEarnedEtb:Number(t.totalEarnedEtb),pendingEtb:Number(t.pendingEtb),deliveredTripsCount:t.deliveredTripsCount,ruralBonusEtb:1250}}}else if(this.currentUser.role==="admin"){const e=await fetch("/api/admin/stats",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();this.platformStats={totalUsers:t.totalUsers,totalFarmers:t.totalFarmers,totalBuyers:t.totalBuyers,totalDrivers:t.totalDrivers,totalListings:t.totalListings,totalOrders:t.totalOrders,totalTransactionVolumeEtb:Number(t.totalTransactionVolumeEtb),totalPlatformCommissionEtb:Number(t.totalPlatformCommissionEtb),activeEscrowHeldEtb:Number(t.activeEscrowHeldEtb),disputedOrdersCount:t.disputedOrdersCount,totalMetricTonsMoved:Number(t.totalMetricTonsMoved||145.8),middlemanMarginSavedEtb:Number(t.middlemanMarginSavedEtb||48e4),totalVatRemittedEtb:Number(t.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:Number(t.totalTransactionVolumeEtb)*.02}}}}catch(e){console.warn("Fetch summaries failed",e)}}getFarmerSummary(){const e=this.orders.filter(a=>{var r;return a.farmerId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.farmerCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.farmerCut,0);return{totalEarnedEtb:t||this.farmerSummary.totalEarnedEtb,pendingEscrowEtb:s||this.farmerSummary.pendingEscrowEtb,releasedEtb:t||this.farmerSummary.releasedEtb,completedOrdersCount:e.filter(a=>a.status==="delivered").length||this.farmerSummary.completedOrdersCount,pendingOrdersCount:e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").length||this.farmerSummary.pendingOrdersCount,totalWithholdingTaxPaidEtb:Math.round((t||this.farmerSummary.totalEarnedEtb)*.02)}}getDriverSummary(){const e=this.orders.filter(a=>{var r;return a.driverId===((r=this.currentUser)==null?void 0:r.id)}),t=e.filter(a=>a.status==="delivered").reduce((a,r)=>a+r.driverCut,0),s=e.filter(a=>a.status!=="delivered"&&a.status!=="cancelled").reduce((a,r)=>a+r.driverCut,0);return{totalEarnedEtb:t||this.driverSummary.totalEarnedEtb,pendingEtb:s||this.driverSummary.pendingEtb,deliveredTripsCount:e.filter(a=>a.status==="delivered").length||this.driverSummary.deliveredTripsCount,ruralBonusEtb:1250}}getPlatformStats(){const e=this.orders.reduce((r,o)=>r+o.totalEtb,0),t=this.orders.filter(r=>r.status==="delivered").reduce((r,o)=>r+o.platformCut,0),s=this.orders.filter(r=>r.escrowHeld).reduce((r,o)=>r+o.totalEtb,0),a=this.orders.filter(r=>r.status==="disputed").length;return{totalUsers:this.platformStats.totalUsers,totalFarmers:this.platformStats.totalFarmers,totalBuyers:this.platformStats.totalBuyers,totalDrivers:this.platformStats.totalDrivers,totalListings:this.listings.length||this.platformStats.totalListings,totalOrders:this.orders.length||this.platformStats.totalOrders,totalTransactionVolumeEtb:e||this.platformStats.totalTransactionVolumeEtb,totalPlatformCommissionEtb:t||this.platformStats.totalPlatformCommissionEtb,activeEscrowHeldEtb:s||this.platformStats.activeEscrowHeldEtb,disputedOrdersCount:a||this.platformStats.disputedOrdersCount,totalMetricTonsMoved:145.8,middlemanMarginSavedEtb:48e4,totalVatRemittedEtb:(t||this.platformStats.totalPlatformCommissionEtb)*.15,totalWithholdingReportedEtb:(e||this.platformStats.totalTransactionVolumeEtb)*.02}}getNotifications(){return!this.isUserLoggedIn||!this.currentUser?[]:this.notifications.filter(e=>e.userId===this.currentUser.id||this.currentUser.role==="admin")}async broadcastSms(e,t,s){try{await fetch("/api/admin/broadcast-sms",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({messageEn:e,messageAm:t,targetRole:s})})}catch(a){console.warn("Broadcast SMS API call error",a)}this.currentUser&&(this.notifications.unshift({id:"b-"+Date.now(),userId:this.currentUser.id,type:"broadcast",channel:"sms",messageEn:`[SMS to ${s.toUpperCase()}] ${e}`,messageAm:`[ኤስኤምኤስ ለ${s}] ${t}`,read:!1,createdAt:new Date().toISOString()}),this.notify())}async submitVerificationDocuments(e,t){if(this.currentUser){this.currentUser.tinNumber=e,this.currentUser.verificationStatus="UnderReview",this.currentUser.rejectionReason=void 0;const s=t.map((o,i)=>({id:"doc-self-"+i+"-"+Date.now(),userId:this.currentUser.id,documentType:o.documentType,documentNumber:o.documentNumber,frontImageUrl:o.frontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:o.backImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}));this.currentUser.documents=s,localStorage.setItem("currentUser",JSON.stringify(this.currentUser));const a={userId:this.currentUser.id,userName:this.currentUser.name,userNameAm:this.currentUser.nameAm,userRole:this.currentUser.role.charAt(0).toUpperCase()+this.currentUser.role.slice(1),phone:this.currentUser.phone,region:this.currentUser.region,registrationMethod:"Self",verificationStatus:"UnderReview",tinNumber:e,registeredAt:"Just now",documents:s,reviews:[]},r=this.verificationQueue.findIndex(o=>o.userId===this.currentUser.id);r>=0?this.verificationQueue[r]=a:this.verificationQueue.unshift(a)}try{await fetch("/api/verification/submit",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({tinNumber:e,documents:t})})}catch(s){console.warn("Backend verification submit fallback to local state",s)}this.notify()}async agentRegisterFarmer(e){var l,d,u,h;const t=e.phone.startsWith("+251")?e.phone:"+251"+e.phone.replace(/^0+/,""),s="agent-f-"+Date.now(),a={id:s,name:e.name,nameAm:e.nameAm||e.name,phone:t,region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,status:"UnderReview",registeredAt:"Just now",faydaFrontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"};this.agentRegisteredFarmers.unshift(a);const r={userId:s,userName:e.name,userNameAm:e.nameAm,userRole:"Farmer",phone:t,region:e.region,registrationMethod:"Agent",registeredByAgentName:((l=this.currentUser)==null?void 0:l.name)||"Community Field Agent",verificationStatus:"UnderReview",tinNumber:e.tinNumber,registeredAt:"Just now",documents:[{id:"doc-ag-1-"+Date.now(),userId:s,documentType:"FaydaId",documentNumber:e.faydaId||"FAN-PENDING",frontImageUrl:e.faydaFrontImageUrl||"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",backImageUrl:e.faydaBackImageUrl||"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",status:"UnderReview",submittedAt:new Date().toISOString()}],reviews:[]};this.verificationQueue.unshift(r);const o={id:s,name:e.name,nameAm:e.nameAm||e.name,phone:t,role:"farmer",region:e.region,kebele:e.kebele,primaryCrop:e.primaryCrop,faydaId:e.faydaId,tinNumber:e.tinNumber,verified:!1,verificationStatus:"UnderReview",status:"active",walletBalanceEtb:0,createdAt:new Date().toISOString()},i=this.allUsers.findIndex(x=>x.id===s||x.phone===t);i!==-1?this.allUsers[i]={...this.allUsers[i],...o}:this.allUsers.unshift(o),this.saveUsersToStorage(),this.addAuditLog({actorId:((d=this.currentUser)==null?void 0:d.id)||"agent-01",actorName:((u=this.currentUser)==null?void 0:u.name)||"Field Agent",actorRole:((h=this.currentUser)==null?void 0:h.role)||"agent",action:"AGENT_ONBOARD_FARMER",category:"USER_CRUD",targetResource:"User",targetId:s,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Field agent onboarded farmer: ${e.name} (${t}) in ${e.region}.`});try{await fetch("/api/verification/agent-register",{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify(e)})}catch(x){console.warn("Agent register farmer fallback to local state",x)}return this.notify(),a}async reviewVerification(e,t,s,a){var i;const r=this.verificationQueue.find(l=>l.userId===e);r&&(r.verificationStatus=t==="Approve"?"Approved":"Rejected",r.rejectionReason=t==="Reject"?a||s||"Document image was illegible":void 0,r.reviews.unshift({id:"rev-"+Date.now(),userId:e,reviewerName:((i=this.currentUser)==null?void 0:i.name)||"Sara Mengistu (Admin)",actionTaken:t,notes:s||a||(t==="Approve"?"All records verified.":"Verification rejected."),timestamp:"Just now"}),r.documents.forEach(l=>{l.status=t==="Approve"?"Approved":"Rejected",l.rejectionReason=r.rejectionReason}));const o=this.agentRegisteredFarmers.find(l=>l.id===e);o&&(o.status=t==="Approve"?"Approved":"Rejected"),this.currentUser&&this.currentUser.id===e&&(this.currentUser.verificationStatus=t==="Approve"?"Approved":"Rejected",this.currentUser.verified=t==="Approve",this.currentUser.rejectionReason=r==null?void 0:r.rejectionReason,localStorage.setItem("currentUser",JSON.stringify(this.currentUser)));try{await fetch(`/api/verification/${e}/review`,{method:"POST",headers:this.getAuthHeaders(),body:JSON.stringify({action:t,notes:s,rejectionReason:a})})}catch(l){console.warn("Review verification remote call failed, updated local state",l)}this.notify()}getVerificationQueue(e,t){let s=[...this.verificationQueue];return e&&e!=="All"&&(s=s.filter(a=>a.userRole.toLowerCase()===e.toLowerCase())),t&&t!=="All"&&(s=s.filter(a=>a.verificationStatus===t)),s}async fetchVerificationQueue(){if(!this.isAuthenticated())return this.verificationQueue;try{const e=await fetch("/api/verification/queue",{headers:this.getAuthHeaders()});if(e.ok){const t=await e.json();Array.isArray(t)&&t.length>0&&(this.verificationQueue=t,this.notify())}}catch(e){console.warn("Fetch verification queue failed, using local queue",e)}return this.verificationQueue}getAgentRegisteredFarmers(){return this.agentRegisteredFarmers}getVerificationStatus(e){var t,s;if(e){const a=this.verificationQueue.find(r=>r.userId===e);if(a)return a.verificationStatus}return((t=this.currentUser)==null?void 0:t.verificationStatus)||((s=this.currentUser)!=null&&s.verified?"Approved":"PendingSubmission")}async sendInboundUssdSimulation(e,t){return t.includes("*990#")||t.includes("*805#")?`Farmer-to-Market USSD
1. Register as Farmer
2. Submit Fayda ID
3. Check Escrow Balance
4. Request Extension Agent Visit
Reply with number:`:t==="1"?"Welcome! Enter your Name & Woreda (e.g., Bekele Bishoftu):":t==="2"?"Enter your 16-digit Fayda ID Number or FAN-XXXX-XXXX-XXXX:":t==="3"?"Your Telebirr Escrow Balance is 48,200 ETB. Payout available at local agent.":t==="4"?"Agent Kassahun Tolessa (+251988776655) has been assigned to visit your farm within 48 hours.":`Farmer-to-Market: Command received. SMS confirmation dispatched to ${e}.`}saveUsersToStorage(){try{localStorage.setItem("farmerMarketAllUsers",JSON.stringify(this.allUsers))}catch(e){console.warn("Failed to persist users to localStorage",e)}}async fetchUsers(){try{const e=await fetch("/api/auth/demo-users");if(e.ok){const t=await e.json();if(Array.isArray(t)){let s=!1;t.forEach(a=>{const r=a.phone;if(!this.allUsers.find(i=>i.phone===r)){const i={id:"db-"+r.replace(/\D/g,""),phone:a.phone,name:a.name,nameAm:a.nameAm,role:(a.role||"buyer").toLowerCase(),region:a.region||"Addis Ababa",verified:!0,verificationStatus:"Approved",status:"active",createdAt:new Date().toISOString()};this.allUsers.push(i),s=!0}}),s&&(this.saveUsersToStorage(),this.notify())}}}catch(e){console.warn("Fetch remote users failed, using local user list",e)}return this.allUsers}async refreshAllData(){await Promise.allSettled([this.fetchListings(),this.fetchOrders(),this.fetchSummaries(),this.fetchVerificationQueue(),this.fetchUsers()]),this.notify()}getAllUsers(){const e=new Map;if(this.allUsers.forEach(t=>{t.phone?e.set(t.phone.replace(/\s+/g,""),t):t.id&&e.set(t.id,t)}),this.verificationQueue.forEach(t=>{var a,r;const s=t.phone.replace(/\s+/g,"");if(!e.has(s))e.set(s,{id:t.userId||"vq-"+s.replace(/\D/g,""),name:t.userName,nameAm:t.userNameAm,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.verificationStatus==="Approved",verificationStatus:t.verificationStatus,status:"active",tinNumber:t.tinNumber,faydaId:(r=(a=t.documents)==null?void 0:a.find(o=>o.documentType==="FaydaId"))==null?void 0:r.documentNumber,createdAt:t.registeredAt||new Date().toISOString()});else{const o=e.get(s);o.verificationStatus=t.verificationStatus,o.verified=t.verificationStatus==="Approved",t.tinNumber&&(o.tinNumber=t.tinNumber)}}),this.kycQueue.forEach(t=>{const s=t.phone.replace(/\s+/g,"");e.has(s)||e.set(s,{id:t.userId||"kyc-"+s.replace(/\D/g,""),name:t.userName,phone:t.phone,role:(t.userRole||"farmer").toLowerCase(),region:t.region||"Addis Ababa",verified:t.status==="Verified",verificationStatus:t.status==="Verified"?"Approved":"UnderReview",status:"active",tinNumber:t.tinNumber,faydaId:t.documentNumber,createdAt:t.submittedAt||new Date().toISOString()})}),this.agentRegisteredFarmers.forEach(t=>{const s=t.phone.replace(/\s+/g,"");e.has(s)||e.set(s,{id:t.id,name:t.name,nameAm:t.nameAm,phone:t.phone,role:"farmer",region:t.region,kebele:t.kebele,primaryCrop:t.primaryCrop,faydaId:t.faydaId,tinNumber:t.tinNumber,verified:t.status==="Approved",verificationStatus:t.status,status:"active",createdAt:t.registeredAt||new Date().toISOString()})}),this.currentUser&&this.currentUser.phone){const t=this.currentUser.phone.replace(/\s+/g,"");e.has(t)||e.set(t,this.currentUser)}return Array.from(e.values())}getUserById(e){return this.getAllUsers().find(t=>t.id===e)}createUser(e){var s,a,r;const t={id:crypto.randomUUID?crypto.randomUUID():"user-"+Date.now(),name:e.name,nameAm:e.nameAm,phone:e.phone.startsWith("+251")?e.phone:"+251"+e.phone.replace(/^0+/,""),role:e.role,region:e.region,verified:e.verified??!0,verificationStatus:e.verified??!0?"Approved":"PendingSubmission",status:e.status??"active",tinNumber:e.tinNumber,businessLicenseNumber:e.businessLicenseNumber,vehicleType:e.vehicleType,refrigerationType:e.refrigerationType,vehicleCapacityKg:e.vehicleCapacityKg,primaryCrop:e.primaryCrop,kebele:e.kebele,faydaId:e.faydaId,permissions:e.permissions,createdAt:new Date().toISOString()};return this.allUsers.unshift(t),this.saveUsersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"CREATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Created new ${t.role.toUpperCase()} account: ${t.name} (${t.phone}) in ${t.region}.`}),this.notify(),t}updateUser(e,t){var r,o,i;const s=this.allUsers.findIndex(l=>l.id===e);if(s===-1)throw new Error("User not found");const a={...this.allUsers[s]};return this.allUsers[s]={...this.allUsers[s],...t},this.saveUsersToStorage(),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"superadmin-01",actorName:((o=this.currentUser)==null?void 0:o.name)||"Super Admin",actorRole:((i=this.currentUser)==null?void 0:i.role)||"superadmin",action:"UPDATE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated user ${this.allUsers[s].name} profile and credentials.`,preState:a,postState:this.allUsers[s]}),this.notify(),this.allUsers[s]}deleteUser(e){var s,a,r;const t=this.allUsers.find(o=>o.id===e);return t?(this.allUsers=this.allUsers.filter(o=>o.id!==e),this.saveUsersToStorage(),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"DELETE_USER_ACCOUNT",category:"USER_CRUD",targetResource:"User",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Permanently deleted user account: ${t.name} (${t.role}).`}),this.notify(),!0):!1}toggleUserSuspension(e,t){var r,o,i;const s=this.allUsers.find(l=>l.id===e);if(!s)throw new Error("User not found");const a=t||(s.status==="suspended"?"active":"suspended");return s.status=a,this.saveUsersToStorage(),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"superadmin-01",actorName:((o=this.currentUser)==null?void 0:o.name)||"Super Admin",actorRole:((i=this.currentUser)==null?void 0:i.role)||"superadmin",action:a==="suspended"?"SUSPEND_USER_ACCOUNT":"REINSTATE_USER_ACCOUNT",category:"EMERGENCY",targetResource:"User",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${a==="suspended"?"Suspended":"Reinstated"} access for ${s.name} (${s.phone}).`}),this.notify(),s}startImpersonation(e){var s,a,r;const t=this.allUsers.find(o=>o.id===e);return t?(!this.impersonationOriginalUser&&((s=this.currentUser)==null?void 0:s.role)==="superadmin"&&(this.impersonationOriginalUser={...this.currentUser}),this.currentUser=t,localStorage.setItem("currentUser",JSON.stringify(t)),this.addAuditLog({actorId:((a=this.impersonationOriginalUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.impersonationOriginalUser)==null?void 0:r.name)||"Super Admin",actorRole:"superadmin",action:"START_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin initiated live impersonation support session as '${t.name}' (${t.role}).`}),this.notify(),t):null}stopImpersonation(){if(!this.impersonationOriginalUser)return this.currentUser;const e={...this.impersonationOriginalUser},t=this.currentUser;return this.currentUser=e,this.impersonationOriginalUser=null,localStorage.setItem("currentUser",JSON.stringify(e)),this.addAuditLog({actorId:e.id,actorName:e.name,actorRole:"superadmin",action:"END_IMPERSONATION_SESSION",category:"IMPERSONATION",targetResource:"User",targetId:t==null?void 0:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Super Admin exited impersonation session for '${t==null?void 0:t.name}'. Returned to Super Admin dashboard.`}),this.notify(),e}isImpersonating(){return!!this.impersonationOriginalUser}getOriginalSuperAdmin(){return this.impersonationOriginalUser}getPlatformConfig(){return this.platformConfig}updatePlatformConfig(e){var s,a,r;const t={...this.platformConfig};return this.platformConfig={...this.platformConfig,...e},this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"UPDATE_PLATFORM_CONFIG",category:"CONFIG",targetResource:"PlatformConfig",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated platform configuration: Escrow split (${this.platformConfig.farmerSharePercent}/${this.platformConfig.driverSharePercent}/${this.platformConfig.platformFeePercent}), Escrow Frozen: ${this.platformConfig.emergencyEscrowFrozen}.`,preState:t,postState:this.platformConfig}),this.notify(),this.platformConfig}getSystemAuditLogs(){return this.systemAuditLogs}addAuditLog(e){const t={...e,id:"log-"+(this.systemAuditLogs.length+101),timestamp:new Date().toLocaleString()};return this.systemAuditLogs.unshift(t),t}getDeliveryZones(){return this.deliveryZones}addDeliveryZone(e){var s,a,r;const t={...e,id:"zone-"+(this.deliveryZones.length+1)};return this.deliveryZones.push(t),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"ADD_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Added new regional delivery zone: ${t.name} (Base radius ${t.baseRadiusKm} km).`}),this.notify(),t}updateDeliveryZone(e,t){var a,r,o;const s=this.deliveryZones.findIndex(i=>i.id===e);if(s===-1)throw new Error("Zone not found");return this.deliveryZones[s]={...this.deliveryZones[s],...t},this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((o=this.currentUser)==null?void 0:o.role)||"superadmin",action:"UPDATE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated delivery zone '${this.deliveryZones[s].name}' configuration.`}),this.notify(),this.deliveryZones[s]}deleteDeliveryZone(e){var s,a,r;const t=this.deliveryZones.find(o=>o.id===e);return t?(this.deliveryZones=this.deliveryZones.filter(o=>o.id!==e),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:((r=this.currentUser)==null?void 0:r.role)||"superadmin",action:"DELETE_DELIVERY_ZONE",category:"CONFIG",targetResource:"DeliveryZoneConfig",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Deleted delivery zone: ${t.name}.`}),this.notify(),!0):!1}getFeatureFlags(){return this.featureFlags}toggleFeatureFlag(e,t){var a,r,o;const s=this.featureFlags.find(i=>i.key===e);if(!s)throw new Error("Feature flag not found");return s.enabled=t!==void 0?t:!s.enabled,this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:((r=this.currentUser)==null?void 0:r.name)||"Super Admin",actorRole:((o=this.currentUser)==null?void 0:o.role)||"superadmin",action:"TOGGLE_FEATURE_FLAG",category:"CONFIG",targetResource:"FeatureFlag",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`${s.enabled?"Enabled":"Disabled"} feature flag: ${s.name} (${e}).`}),this.notify(),s}getPendingPayoutApprovals(){return this.payoutApprovals}approvePayout(e,t){var a;const s=this.payoutApprovals.find(r=>r.id===e);return s?(s.status="Approved",s.reviewedBy=t,s.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((a=this.currentUser)==null?void 0:a.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"APPROVE_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Authorized high-value Telebirr payout of ${s.amountEtb.toLocaleString()} ETB for ${s.recipientName} (${s.recipientPhone}).`}),this.notify(),!0):!1}rejectPayout(e,t,s="High-risk audit anomaly"){var r;const a=this.payoutApprovals.find(o=>o.id===e);return a?(a.status="Rejected",a.reviewedBy=t,a.reviewedAt=new Date().toLocaleString(),this.addAuditLog({actorId:((r=this.currentUser)==null?void 0:r.id)||"superadmin-01",actorName:t,actorRole:"superadmin",action:"REJECT_HIGH_VALUE_PAYOUT",category:"FINANCE",targetResource:"PayoutApproval",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Declined payout of ${a.amountEtb.toLocaleString()} ETB for ${a.recipientName}. Reason: ${s}.`}),this.notify(),!0):!1}getGlobalBusinessRules(){return this.globalBusinessRules}updateGlobalBusinessRules(e){var t,s,a;return this.globalBusinessRules={...this.globalBusinessRules,...e},this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:((a=this.currentUser)==null?void 0:a.role)||"superadmin",action:"UPDATE_BUSINESS_RULES",category:"CONFIG",targetResource:"GlobalBusinessRules",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Updated global trading rules: Min ${this.globalBusinessRules.minOrderKg} kg, Max ${this.globalBusinessRules.maxOrderKg} kg, Max Distance ${this.globalBusinessRules.maxDistanceKm} km.`}),this.notify(),this.globalBusinessRules}getBlacklist(){return this.blacklist}addToBlacklist(e){var s;const t={...e,id:"bl-"+(this.blacklist.length+1).toString().padStart(2,"0"),blacklistedAt:new Date().toISOString().split("T")[0]};return this.blacklist.unshift(t),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:e.blacklistedBy,actorRole:"superadmin",action:"ADD_TO_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:t.id,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Blacklisted ${t.type}: ${t.value}. Reason: ${t.reason}.`}),this.notify(),t}removeFromBlacklist(e){var s,a;const t=this.blacklist.find(r=>r.id===e);return t?(this.blacklist=this.blacklist.filter(r=>r.id!==e),this.addAuditLog({actorId:((s=this.currentUser)==null?void 0:s.id)||"superadmin-01",actorName:((a=this.currentUser)==null?void 0:a.name)||"Super Admin",actorRole:"superadmin",action:"REMOVE_FROM_BLACKLIST",category:"EMERGENCY",targetResource:"BlacklistEntry",targetId:e,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Removed ${t.type} (${t.value}) from platform blacklist.`}),this.notify(),!0):!1}triggerDatabaseBackup(){var t,s;const e={backupId:"BK-PG16-"+Date.now(),sizeMb:248.5,timestamp:new Date().toLocaleString(),downloadUrl:"#pg-backup-download"};return this.addAuditLog({actorId:((t=this.currentUser)==null?void 0:t.id)||"superadmin-01",actorName:((s=this.currentUser)==null?void 0:s.name)||"Super Admin",actorRole:"superadmin",action:"TRIGGER_DATABASE_BACKUP",category:"CONFIG",targetResource:"PostgreSQL_Snapshot",targetId:e.backupId,ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Generated encrypted PostgreSQL schema and transaction data snapshot (${e.backupId}, 248.5 MB).`}),this.notify(),e}exportPlatformData(e){var o,i;const t=`FarmerMarket_FullExport_${new Date().toISOString().split("T")[0]}.${e}`;let s="";e==="json"?s=JSON.stringify({users:this.allUsers,listings:this.listings,orders:this.orders,platformConfig:this.platformConfig,deliveryZones:this.deliveryZones,auditLogs:this.systemAuditLogs},null,2):s=`Type,Id,Name,Phone,Role,Region,Status,CreatedAt
`+this.allUsers.map(l=>`User,${l.id},"${l.name}",${l.phone},${l.role},"${l.region}",${l.status||"active"},${l.createdAt}`).join(`
`);const a=new Blob([s],{type:e==="json"?"application/json":"text/csv"}),r=URL.createObjectURL(a);return this.addAuditLog({actorId:((o=this.currentUser)==null?void 0:o.id)||"superadmin-01",actorName:((i=this.currentUser)==null?void 0:i.name)||"Super Admin",actorRole:"superadmin",action:"EXPORT_PLATFORM_DATA",category:"CONFIG",targetResource:"DataExport",ipAddress:"196.188.12.45",userAgent:navigator.userAgent,details:`Exported full platform data snapshot in ${e.toUpperCase()} format (${t}).`}),{filename:t,dataUrl:r}}}const p=new Ht,W={en:{brandName:"Farmer-to-Market",brandSubtitle:"Direct Produce Exchange · Ethiopia",tagline:"Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",heroTitle:"Fresh From Farm To Market · Zero Middlemen",heroDesc:"Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",roleFarmer:"Farmer",roleBuyer:"Wholesale Buyer",roleDriver:"Partner Driver",roleAdmin:"Platform Admin",roleSuperAdmin:"Super Admin (Chief Platform Officer)",switchRole:"Switch Demo Profile",currentRole:"Current Role",navMarketplace:"Marketplace",navFarmerPortal:"Farmer Dashboard",navDriverPortal:"Delivery Trips",navAdminPortal:"Admin Panel",navCart:"Bulk Cart",navOrders:"My Orders",navStandingOrders:"Standing Orders",navWallet:"Telebirr Wallet",navSmsConsole:"SMS Console",navLegalDocuments:"Contracts & Tax Invoices",navLogin:"Phone Login",navLogout:"Logout",catAll:"All Produce",catVegetables:"Vegetables",catGrains:"Grains & Teff",catFruits:"Fruits",catCoffee:"Specialty Coffee",catSpices:"Spices & Herbs",searchPlaceholder:"Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",filterRegion:"Filter by Region",filterPrice:"Max Price (ETB/kg)",filterDistance:"Proximity Radius",filterGrade:"Quality Grade",filterRipeness:"Ripeness State",filterOrganic:"Certified Organic Only",filterAdvance:"Advance Harvests Only",sortBy:"Sort By",allRegions:"All Regions",addisAbaba:"Addis Ababa",oromia:"Oromia",amhara:"Amhara",sidama:"Sidama",snnpr:"SNNPR",pricePerKg:"ETB / kg",availableStock:"Stock Available",minOrder:"Min. Order",harvestDate:"Harvest Date",farmDistance:"from Addis",verifiedFarmer:"Verified Smallholder",verifiedFayda:"Fayda ID Verified",repeatBuyers:"Repeat Buyers",onTimeRate:"On-Time Rate",advanceListingBadge:"Advance Harvest",readyInDays:"Harvest ready in",addToCart:"Add to Bulk Cart",viewDetails:"View Full Produce & Photos",farmerRating:"Rating",playVoiceMemo:"Listen to Farmer Voice Memo",cropDescription:"Produce Description & Origin Story",qualitySpecs:"Quality & Agricultural Specifications",packagingType:"Packaging & Handling",storageRecommendation:"Storage & Shelf Life",farmerProfile:"Verified Smallholder Producer",directContact:"Direct Producer Contact",callFarmer:"Call Farmer",smsInquiry:"SMS Inquiry",buyNowEscrow:"Instant Order (Telebirr Escrow)",selectOrderQty:"Select Order Quantity (kg)",marketComparison:"Regional Price Benchmark",belowMarketAvg:"Below Regional Wholesale Average",photoGallery:"Produce Photos & Inspection Angles",clickToEnlarge:"Click to view full photo & details",shareListing:"Share Listing",cartTitle:"Multi-Farmer Bulk Cart",cartEmpty:"Your bulk cart is currently empty.",cartSubtotal:"Produce Subtotal",deliveryEstimate:"Driver Cut (5%)",platformFee:"Platform Cut (5%)",ruralSubsidyBonus:"Rural Route Subsidy",farmerShare:"Farmer Payout (90%)",totalAmount:"Total Order (ETB)",checkoutTelebirr:"Pay Securely with Telebirr Escrow",orderQuantity:"Quantity (kg)",minOrderWarning:"Below minimum order threshold",groupedByFarmer:"Grouped by Farm Source",standingOrdersTitle:"Automated Recurring Standing Orders",createStandingOrder:"Set Up Weekly Standing Order",frequencyWeekly:"Weekly (Every Monday)",frequencyBiWeekly:"Bi-Weekly (Every 2 Weeks)",nextScheduledRun:"Next Scheduled Delivery",standingOrderActive:"Active Standing Order",telebirrTitle:"Telebirr C2B Escrow Checkout",telebirrDesc:"Your funds will be held in secure escrow until you inspect and confirm produce delivery.",enterPhone:"Telebirr Mobile Number",enterPin:"Telebirr 4-Digit PIN",escrowGuarantee:"Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",payNow:"Authorize Payment",processingPayment:"Processing with Telebirr...",orderTracking:"Live Order & Escrow Tracker",statusPending:"Order Placed (Escrow Held)",statusConfirmed:"Farmer Confirmed",statusPickedUp:"Driver Picked Up (In Transit)",statusDelivered:"Delivered (Escrow Released)",statusDisputed:"Dispute Under Admin Review",statusCancelled:"Cancelled / Refunded",confirmDeliveryBtn:"Confirm Delivery & Release Escrow",disputeBtn:"Raise Dispute / Partial Refund",submitDisputeTitle:"Submit Quality Dispute & Escrow Freeze",disputeReasonLabel:"Dispute Reason / Quality Discrepancy",disputePhotoLabel:"Proof Photo URL (Bruised/Damaged Produce)",refundPercentLabel:"Requested Refund Percentage",submitDisputeBtn:"Freeze Escrow & Alert Admin",viewContractBtn:"View Sales Contract",viewInvoiceBtn:"Download Tax Invoice",viewWaybillBtn:"Transport Waybill (Manifest)",viewArbitrationBtn:"Arbitration Determination",printDocument:"Print / Save PDF",closeDocument:"Close Document",farmerPortalTitle:"Farmer Produce & Earnings Portal",postNewListing:"Post New Produce Listing",voiceNoteTitle:"Voice-Note Listing Creator (ድምጽ ቅጂ)",voiceNoteDesc:"Speak in Amharic or Afaan Oromoo. Our system will transcribe and pre-fill your listing.",recordVoiceBtn:"Record Voice Note",stopRecordingBtn:"Stop & Transcribe",voiceRecordedSuccess:"Voice Note Recorded & Transcribed!",priceBenchmarkTitle:"Regional Market Price Benchmarking (የገበያ ዋጋ መረጃ)",benchmarkDesc:"Recent average market prices from Merkato, Sholla, and Adama depots to prevent underpricing.",advanceHarvestToggle:"List as Advance Harvest (2-4 weeks out)",expectedHarvestLabel:"Expected Harvest Date",productNameEn:"Product Name (English)",productNameAm:"Product Name (Amharic)",categoryLabel:"Category",qtyKgLabel:"Total Quantity (kg)",priceKgLabel:"Unit Price (ETB / kg)",minOrderLabel:"Minimum Bulk Order (kg)",gradeLabel:"Produce Quality Grade",ripenessLabel:"Ripeness Stage",farmLocationLabel:"Farm Location / Region",publishListingBtn:"Publish Listing to Marketplace",myActiveListings:"My Active Listings",incomingOrders:"Incoming Buyer Orders",confirmOrderAction:"Confirm Order for Pickup",walletTitle:"Telebirr Wallet & Tax Statements (የቴሌብር ሂሳብ)",walletBalance:"Available Telebirr Balance",pendingEscrow:"Held in Escrow (In Transit)",lifetimePayout:"Total Lifetime Payouts",withholdingTaxReported:"Withholding Tax (2% Goods)",requestWithdrawal:"Instant Telebirr Payout",payoutHistory:"Recent Escrow Release & Tax Log",smsConsoleTitle:"Twilio Bilingual SMS Command Console",smsConsoleDesc:"Test smallholder SMS fallback operations for offline feature parity.",smsSimulateInbound:"Send Inbound SMS Command",smsCommandPlaceholder:"e.g. LIST Tomato 1500 45 Bishoftu OR CONFIRM 0001",driverPortalTitle:"Driver Delivery Hub & Cargo Manifest",availableTrips:"Available Farm Pickups",routeOptimizerTitle:"Multi-Pickup Optimized Route Plan",totalTripDistance:"Total Route Distance",estimatedTransitTime:"Est. Transit Time",vehicleProfileTitle:"Vehicle & Capacity Profile",vehicleTypeLabel:"Vehicle Model",refrigerationMode:"Refrigeration Mode",cargoCapacity:"Payload Capacity",capacityUsed:"Payload Utilized",acceptTrip:"Accept Delivery Trip",uploadProof:"Capture Proof of Delivery + GPS",gpsTimestampVerified:"GPS Coordinates & Timestamp Enforced",offlineModeActive:"Offline Mode (Local Cache Active)",offlineSyncBtn:"Sync Offline Actions",tripCommission:"Driver Cut (5%)",ruralBonus:"Rural Route Incentive Bonus",totalDeliveredTrips:"Trips Completed",adminPortalTitle:"Marketplace Governance, Law & Compliance",statTotalVolume:"Total Transaction Volume",statPlatformRev:"Platform Commission (5%)",statActiveEscrow:"Active Escrow Held",statDisputes:"Active Disputes",statMetricTons:"Metric Tons Traded",statMiddlemanSavings:"Middleman Markup Saved",statVatRemitted:"VAT on Platform Fees (15%)",statWithholding:"Withholding Tax (2%)",resolveDisputeTitle:"Escrow Legal Arbitration Console",disputeEvidence:"Evidence & Inspection Report",releaseFarmerBtn:"Release 100% to Farmer",refundBuyerBtn:"Refund 100% to Buyer",splitFiftyFiftyBtn:"Arbitrate 50/50 Partial Split",anomalyScannerTitle:"Fraud & Anomaly Detection Monitor",kycQueueTitle:"Tiered KYC & Trade Registry Queue",approveKycBtn:"Approve Identity & License",rejectKycBtn:"Reject / Request Info",regionalAnalyticsTitle:"Regional Volume & EABC Impact Dashboard",broadcastSmsTitle:"Bilingual SMS Broadcaster",sendSmsBtn:"Broadcast SMS to Farmers",roleAgent:"Field Agent",navAgentPortal:"Field Agent Portal",agentPortalTitle:"Community Field Agent Onboarding Console",agentOnboardFarmerBtn:"Register Smallholder Farmer",agentRosterTitle:"Farmers Onboarded in Your Woreda",agentCommissionEarned:"Agent Commission",agentSyncStatus:"Sync Status",agentRegisterSuccess:"Farmer registered and documents queued for verification!",verifyAccountTitle:"Account Identity & Regulatory Verification",verificationStatusLabel:"Verification Status",statusPendingSubmission:"Pending Submission",statusUnderReview:"Under Review by Admin",statusApproved:"Fully Approved & Compliant",statusRejected:"Verification Rejected",verificationBannerText:"Complete your Fayda ID & TIN verification to unlock full marketplace selling and bulk purchasing privileges.",startVerificationBtn:"Verify Account Now",faydaIdLabel:"Fayda National ID Number (FAN)",tinNumberLabel:"10-Digit Taxpayer ID (TIN)",kebeleIdLabel:"Kebele Resident / Farm ID",uploadFrontPhoto:"Upload Front ID Photo",uploadBackPhoto:"Upload Back ID Photo",rejectionReasonLabel:"Rejection Reason",resubmitDocsBtn:"Update & Resubmit Documents",sideBySideInspectionTitle:"Side-by-Side Document Inspection",approveVerificationAction:"Approve Identity & Tax License",rejectVerificationAction:"Reject & Request Clarification",sendSmsNoticeToggle:"Notify user immediately via bilingual SMS",superAdminTitle:"Super Admin Command Center & Governance",superAdminSubtitle:"Full System Access · User CRUD · RBAC · Platform Config · Emergency Controls",tabUserMaster:"User Master CRUD",tabPermissions:"RBAC Permissions",tabPlatformConfig:"Platform Config & Escrow",tabFinancialOversight:"Financials & Payouts",tabAuditLogs:"System Audit Logs",tabZones:"Delivery Zones & PostGIS",tabFeatureFlags:"Feature Flags",tabEmergency:"Emergency & Blacklist",tabBusinessRules:"Global Rules",tabDbOps:"Database & Health",impersonateBtn:"Login As / Impersonate",exitImpersonation:"Exit Impersonation",createUserBtn:"Create New Account",editUserBtn:"Edit User",freezePlatformEscrow:"Emergency Platform Escrow Freeze",exportDataBtn:"Export Platform Data (CSV/JSON)",triggerBackupBtn:"Trigger DB Backup Snapshot",payoutApprovalTitle:"High-Value Payout Approvals (> 50,000 ETB)",liveAlert:"Live Update",smsSent:"Bilingual SMS Sent via Twilio",telebirrPaid:"Payment Secured via Telebirr Escrow",currency:"ETB"},am:{brandName:"ፋርመር-ቱ-ማርኬት (FarmerMarket)",brandSubtitle:"የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",tagline:"ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",heroTitle:"ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",heroDesc:"አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",roleFarmer:"አርሶ አደር",roleBuyer:"የጅምላ ገዢ",roleDriver:"አጓጓዥ ሹፌር",roleAdmin:"የሲስተም አስተዳዳሪ",roleSuperAdmin:"ዋና አድሚን (Super Admin)",switchRole:"የተጠቃሚ መለያ ቀይር",currentRole:"የአሁኑ መለያ",navMarketplace:"የምርት ገበያ",navFarmerPortal:"የአርሶ አደር ዳሽቦርድ",navDriverPortal:"የጭነት ጉዞዎች",navAdminPortal:"የአድሚን ክፍል",navCart:"የጅምላ ጋሪ",navOrders:"ትዕዛዞቼ",navStandingOrders:"ቋሚ ትዕዛዞች",navWallet:"የቴሌብር ሂሳብ",navSmsConsole:"የኤስኤምኤስ ክፍል",navLegalDocuments:"ውሎች እና የግብር ደረሰኞች",navLogin:"በስልክ ቁጥር መግቢያ",navLogout:"ውጣ",catAll:"ሁሉም ምርቶች",catVegetables:"አትክልቶች",catGrains:"እህሎች እና ጤፍ",catFruits:"ፍራፍሬዎች",catCoffee:"ልዩ የቡና ምርት",catSpices:"ቅመማ ቅመሞች",searchPlaceholder:"ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",filterRegion:"በክልል / ከተማ ምረጥ",filterPrice:"ከፍተኛ ዋጋ (ብር/ኪ.ግ)",filterDistance:"የእርሻ ርቀት (ኪ.ሜ)",filterGrade:"የምርት ደረጃ",filterRipeness:"የብስለት ደረጃ",filterOrganic:"ኦርጋኒክ ምርቶች ብቻ",filterAdvance:"የቅድመ ምርት ትዕዛዞች ብቻ",sortBy:"ደርድር በ",allRegions:"ሁሉም ክልሎች",addisAbaba:"አዲስ አበባ",oromia:"ኦሮሚያ",amhara:"አማራ",sidama:"ሲዳማ",snnpr:"ደቡብ ክልል",pricePerKg:"ብር / ኪ.ግ",availableStock:"ያለ ምርት መጠን",minOrder:"አነስተኛ ትዕዛዝ",harvestDate:"የተሰበሰበበት ቀን",farmDistance:"ከአዲስ አበባ",verifiedFarmer:"የተረጋገጠ አርሶ አደር",verifiedFayda:"የፋይዳ መታወቂያ የተረጋገጠ",repeatBuyers:"ቋሚ ደንበኞች",onTimeRate:"በሰዓቱ የማድረስ ምጣኔ",advanceListingBadge:"የቅድመ ምርት ትዕዛዝ",readyInDays:"ምርቱ የሚሰበሰበው በ",addToCart:"ወደ ግዢ ጋሪ ጨምር",viewDetails:"ሙሉ የምርት ፎቶና ዝርዝር ይመልከቱ",farmerRating:"ደረጃ",playVoiceMemo:"የአርሶ አደሩን የድምጽ መልእክት አድምጥ",cropDescription:"የምርት ዝርዝር ገለጻ እና መገኛ",qualitySpecs:"የጥራት እና የግብርና መረጃዎች",packagingType:"የማሸጊያ እና አያያዝ ሁኔታ",storageRecommendation:"የማስቀመጫ እና የመቆያ ጊዜ",farmerProfile:"የተረጋገጠ አርሶ አደር መረጃ",directContact:"አርሶ አደሩን በቀጥታ ያግኙ",callFarmer:"ይደውሉ",smsInquiry:"መልእክት ይላኩ",buyNowEscrow:"በቴሌብር ዋስትና አሁኑኑ ይዘዙ",selectOrderQty:"የትዕዛዝ መጠን ይምረጡ (ኪ.ግ)",marketComparison:"የክልላዊ ገበያ ዋጋ ንጽጽር",belowMarketAvg:"ከክልላዊ ገበያ አማካይ ያነሰ",photoGallery:"የምርት ፎቶዎች እና የምርመራ ማዕዘናት",clickToEnlarge:"ሙሉ ፎቶና ዝርዝር ለማየት ይጫኑ",shareListing:"ምርቱን ያጋሩ",cartTitle:"የጅምላ ግዢ ጋሪ (የተለያዩ አርሶ አደሮች)",cartEmpty:"የግዢ ጋሪዎ ባዶ ነው።",cartSubtotal:"የምርት ዋጋ ድምር",deliveryEstimate:"የአጓጓዥ ድርሻ (5%)",platformFee:"የሲስተም ክፍያ (5%)",ruralSubsidyBonus:"የገጠር መንገድ ማበረታቻ",farmerShare:"የአርሶ አደር ክፍያ (90%)",totalAmount:"ጠቅላላ ክፍያ (ብር)",checkoutTelebirr:"በቴሌብር ዋስትና (Escrow) ይክፈሉ",orderQuantity:"የትዕዛዝ መጠን (ኪ.ግ)",minOrderWarning:"ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",groupedByFarmer:"በአርሶ አደር የተከፋፈለ",standingOrdersTitle:"ሳምንታዊ ቋሚ የጅምላ ትዕዛዞች",createStandingOrder:"አዲስ ቋሚ ትዕዛዝ መዝግብ",frequencyWeekly:"በየሳምንቱ (ሰኞ)",frequencyBiWeekly:"በየሁለት ሳምንቱ",nextScheduledRun:"ቀጣይ የማድረሻ ቀን",standingOrderActive:"ትዕዛዙ ገቢር ነው",telebirrTitle:"የቴሌብር አስተማማኝ የክፍያ ዋስትና",telebirrDesc:"ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",enterPhone:"የቴሌብር ስልክ ቁጥር",enterPin:"የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",escrowGuarantee:"የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",payNow:"ክፍያውን አረጋግጥ",processingPayment:"ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",orderTracking:"የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",statusPending:"ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",statusConfirmed:"አርሶ አደሩ አረጋግጧል",statusPickedUp:"ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",statusDelivered:"ምርቱ ደርሷል (ገንዘብ ተለቋል)",statusDisputed:"ቅሬታ በአድሚን እየተመረመረ ነው",statusCancelled:"ተሰርዟል / ተመላሽ ተደርጓል",confirmDeliveryBtn:"ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",disputeBtn:"የጥራት ቅሬታ / ከፊል ተመላሽ ጠይቅ",submitDisputeTitle:"የምርት ጥራት ቅሬታ ማቅረቢያ",disputeReasonLabel:"የቅሬታው ምክንያት",disputePhotoLabel:"የተበላሸው ምርት ፎቶ ማስረጃ",refundPercentLabel:"የሚጠየቀው ተመላሽ ክፍያ በመቶኛ",submitDisputeBtn:"ክፍያውን አግድ እና ለአድሚን ላክ",viewContractBtn:"የግብይት ውል ይመልከቱ",viewInvoiceBtn:"የግብር እና ሽያጭ ደረሰኝ (e-VAT)",viewWaybillBtn:"የጭነት ማጓጓዣ ሰነድ (Waybill)",viewArbitrationBtn:"የሽምግልና ውሳኔ ሰነድ",printDocument:"አትም / ፒዲኤፍ አስቀምጥ",closeDocument:"ሰነዱን ዝጋ",farmerPortalTitle:"የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",postNewListing:"አዲስ ምርት ለገበያ አቅርብ",voiceNoteTitle:"በድምጽ ምርት መመዝገቢያ (Voice-Note)",voiceNoteDesc:"በአማርኛ ወይም በኦሮምኛ ይናገሩ፤ ሲስተሙ በራሱ ጽፎ ፎርሙን ይሞላልዎታል።",recordVoiceBtn:"ድምጽ መቅረጽ ጀምር",stopRecordingBtn:"አቁም እና ወደ ጽሑፍ ቀይር",voiceRecordedSuccess:"የድምጽ መልእክቱ ተቀርጾ ተመዝግቧል!",priceBenchmarkTitle:"የአካባቢ የገበያ ዋጋ መረጃ (መርካቶ/ሾላ)",benchmarkDesc:"አርሶ አደሩ ከደላላ ተጽዕኖ ውጪ ትክክለኛውን የገበያ ዋጋ እንዲያውቅ የቀረበ መረጃ።",advanceHarvestToggle:"የቅድመ ምርት (የሚሰበሰብበት ቀን) መዝግብ",expectedHarvestLabel:"ምርቱ የሚሰበሰብበት ቀን",productNameEn:"የምርት ስም (እንግሊዝኛ)",productNameAm:"የምርት ስም (አማርኛ)",categoryLabel:"የምርት ዘርፍ",qtyKgLabel:"ጠቅላላ መጠን (ኪ.ግ)",priceKgLabel:"የአንድ ኪ.ግ ዋጋ (ብር)",minOrderLabel:"አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",gradeLabel:"የምርት ጥራት ደረጃ",ripenessLabel:"የብስለት ሁኔታ",farmLocationLabel:"የእርሻ ቦታ / ክልል",publishListingBtn:"ምርቱን ለገበያ አውጣ",myActiveListings:"በገበያ ላይ ያሉ ምርቶቼ",incomingOrders:"የገዢዎች ትዕዛዞች",confirmOrderAction:"ትዕዛዙን አረጋግጥ",walletTitle:"የቴሌብር ሂሳብ እና የግብር መግለጫ",walletBalance:"ያለ የቴሌብር ሂሳብ",pendingEscrow:"በዋስትና የተያዘ (በጉዞ ላይ ያለ)",lifetimePayout:"ጠቅላላ የተከፈለ ገቢ",withholdingTaxReported:"የተያዘ ግብር (2% Withholding)",requestWithdrawal:"ወደ ቴሌብር ሂሳብ አስገባ",payoutHistory:"የቅርብ ጊዜ የክፍያ እና የደረሰኝ ታሪክ",smsConsoleTitle:"የTwilio ኤስኤምኤስ (SMS) መቆጣጠሪያ",smsConsoleDesc:"ስልክ ብቻ ለሚጠቀሙ አርሶ አደሮች የኤስኤምኤስ ትዕዛዞችን ይሞክሩ።",smsSimulateInbound:"የኤስኤምኤስ ትዕዛዝ ላክ",smsCommandPlaceholder:"ለምሳሌ: LIST Tomato 1500 45 Bishoftu ወይም CONFIRM 0001",driverPortalTitle:"የአጓጓዥ ሹፌር ክፍል እና የመንገድ እቅድ",availableTrips:"ዝግጁ የሆኑ የእርሻ ጭነቶች",routeOptimizerTitle:"የተቀናጀ የብዙ እርሻዎች የመንገድ እቅድ",totalTripDistance:"ጠቅላላ የጉዞ ርቀት",estimatedTransitTime:"የሚፈጀው ጊዜ",vehicleProfileTitle:"የተሽከርካሪ እና የማቀዝቀዣ መረጃ",vehicleTypeLabel:"የተሽከርካሪ አይነት",refrigerationMode:"የማቀዝቀዣ ሁኔታ",cargoCapacity:"የመጫን አቅም (ኪ.ግ)",capacityUsed:"የተጫነው ክብደት",acceptTrip:"ጭነቱን ተቀበል",uploadProof:"የጭነት ፎቶ + የGPS መገኛ መዝግብ",gpsTimestampVerified:"የጂፒኤስ (GPS) መገኛ ተረጋግጧል",offlineModeActive:"ኢንተርኔት የሌለበት ሁነታ (Offline)",offlineSyncBtn:"የተመዘገቡትን ወደ ሰርቨር ላክ",tripCommission:"የተረጋገጠ የጉዞ ክፍያ (5%)",ruralBonus:"የገጠር መንገድ ጉርሻ",totalDeliveredTrips:"ያደረስካቸው ጉዞዎች",adminPortalTitle:"የገበያ ቁጥጥር፣ ህጋዊነት እና አስተዳደር",statTotalVolume:"ጠቅላላ የግብይት መጠን",statPlatformRev:"የሲስተም ገቢ (5%)",statActiveEscrow:"በዋስትና የተያዘ ገንዘብ",statDisputes:"ያልተፈቱ ቅሬታዎች",statMetricTons:"የተሸጠ ምርት (በሜትሪክ ቶን)",statMiddlemanSavings:"የተዳነ የደላላ ክፍያ",statVatRemitted:"የተሰበሰበ የተጨማሪ እሴት ታክስ (15% VAT)",statWithholding:"የተያዘ ግብር (2% Withholding)",resolveDisputeTitle:"የህጋዊ ቅሬታዎች ውሳኔ መስጫ ኮንሶል",disputeEvidence:"የገዢው ማስረጃ እና የፍተሻ ሪፖርት",releaseFarmerBtn:"100% ለአርሶ አደሩ ይለቀቅ",refundBuyerBtn:"100% ለገዢው ይመለስ",splitFiftyFiftyBtn:"50/50 በፍትሃዊነት ይከፋፈል",anomalyScannerTitle:"አጠራጣሪ እንቅስቃሴዎችን መከታተያ (Fraud/Anomaly)",kycQueueTitle:"የተጠቃሚዎች ህጋዊነት እና የንግድ ፈቃድ ማረጋገጫ (KYC)",approveKycBtn:"መታወቂያ እና ፈቃድ አረጋግጥ",rejectKycBtn:"ውድቅ አድርግ",regionalAnalyticsTitle:"የክልሎች የምርት መጠን እና ተፅእኖ (EABC Impact)",broadcastSmsTitle:"የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",sendSmsBtn:"ኤስኤምኤስ ለአርሶ አደሮች ላክ",roleAgent:"የግብርና ድጋፍ ኤጀንት",navAgentPortal:"የኤጀንት ክፍል",agentPortalTitle:"የማህበረሰብ ግብርና ኤጀንቶች የገበሬዎች መመዝገቢያ ክፍል",agentOnboardFarmerBtn:"አዲስ አርሶ አደር መዝግብ",agentRosterTitle:"በእርስዎ ወረዳ የተመዘገቡ አርሶ አደሮች",agentCommissionEarned:"የኤጀንት ክፍያ",agentSyncStatus:"የዳታ ሁኔታ",agentRegisterSuccess:"አርሶ አደሩ ተመዝግቧል! ሰነዱ ለማረጋገጫ ተልኳል።",verifyAccountTitle:"የመለያ ህጋዊነት እና የታክስ ማረጋገጫ",verificationStatusLabel:"የማረጋገጫ ሁኔታ",statusPendingSubmission:"ሰነድ አልገባም",statusUnderReview:"በአድሚን በመገምገም ላይ",statusApproved:"የተረጋገጠ እና የጸደቀ",statusRejected:"ውድቅ ተደርጓል",verificationBannerText:"ምርቶችን በቀጥታ ለመሸጥ እና ክፍያ ለመቀበል የፋይዳ (Fayda) መታወቂያ እና የታክስ መለያ (TIN) ያረጋግጡ።",startVerificationBtn:"መለያዎን አሁን ያረጋግጡ",faydaIdLabel:"የፋይዳ ብሔራዊ መታወቂያ ቁጥር (FAN)",tinNumberLabel:"የ10-ዲጂት የግብር ከፋይ መለያ (TIN)",kebeleIdLabel:"የቀበሌ ነዋሪነት / የእርሻ ማረጋገጫ",uploadFrontPhoto:"የመታወቂያ የፊት ገጽ ፎቶ",uploadBackPhoto:"የመታወቂያ የጀርባ ገጽ ፎቶ",rejectionReasonLabel:"ውድቅ የተደረገበት ምክንያት",resubmitDocsBtn:"ሰነዶችን አስተካክለው እንደገና ያስገቡ",sideBySideInspectionTitle:"የሰነዶች ጎን ለጎን ፍተሻ እና ማረጋገጫ",approveVerificationAction:"መታወቂያ እና የግብር ሰነድ አጽድቅ",rejectVerificationAction:"ውድቅ አድርግ / ማብራሪያ ጠይቅ",sendSmsNoticeToggle:"ለተጠቃሚው ወዲያውኑ በኤስኤምኤስ አሳውቅ",superAdminTitle:"የዋና አድሚን ቁጥጥር እና አስተዳደር ማዕከል",superAdminSubtitle:"ሙሉ የሲስተም ስልጣን · የተጠቃሚዎች CRUD · RBAC · የዋስትና ውቅር · የአደጋ ጊዜ መቆጣጠሪያ",tabUserMaster:"የተጠቃሚዎች አስተዳደር (CRUD)",tabPermissions:"የፈቃዶች ማትሪክስ (RBAC)",tabPlatformConfig:"የሲስተም ውቅር እና የዋስትና ድርሻ",tabFinancialOversight:"የፋይናንስ እና ክፍያ ቁጥጥር",tabAuditLogs:"የሲስተም ኦዲት መዝገብ",tabZones:"የማድረሻ ዞኖች እና ካርታ",tabFeatureFlags:"የባህሪያት ማብሪያ/ማጥፊያ",tabEmergency:"የአደጋ ጊዜ መቆጣጠሪያ እና እገዳ",tabBusinessRules:"አጠቃላይ የንግድ ደንቦች",tabDbOps:"ዳታቤዝ እና የሲስተም ጤና",impersonateBtn:"በተጠቃሚው ስም ግባ",exitImpersonation:"ከተጠቃሚው ውጣ",createUserBtn:"አዲስ መለያ ፍጠር",editUserBtn:"ተጠቃሚ አርትዕ",freezePlatformEscrow:"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ",exportDataBtn:"መረጃ በCSV/JSON አውርድ",triggerBackupBtn:"የዳታቤዝ ምትክ ቅጂ ውሰድ",payoutApprovalTitle:"ከፍተኛ የገንዘብ ክፍያ ማረጋገጫ (> 50,000 ብር)",liveAlert:"የቀጥታ መረጃ",smsSent:"በTwilio ኤስኤምኤስ ተልኳል",telebirrPaid:"ክፍያ በቴሌብር ዋስትና ተይዟል",currency:"ብር"}};function Wt(n,e,t,s,a,r,o=""){const i=W[n],l=a.reduce((h,x)=>h+x.qtyKg,0),d={farmer:{label:"Farmer / Producer",labelAm:"አርሶ አደር",color:"bg-emerald-100 text-emerald-900 border-emerald-300",icon:"fa-seedling"},buyer:{label:"Wholesale Buyer",labelAm:"የጅምላ ገዢ",color:"bg-blue-100 text-blue-900 border-blue-300",icon:"fa-shopping-basket"},driver:{label:"Freight Driver",labelAm:"አጓጓዥ ሹፌር",color:"bg-amber-100 text-amber-900 border-amber-300",icon:"fa-truck-fast"},agent:{label:"Field Extension Agent",labelAm:"የግብርና ድጋፍ ኤጀንት",color:"bg-teal-100 text-teal-900 border-teal-300",icon:"fa-users-gear"},admin:{label:"Platform Admin",labelAm:"አድሚን",color:"bg-purple-100 text-purple-900 border-purple-300",icon:"fa-shield-halved"},superadmin:{label:"Super Admin (Chief Platform Officer)",labelAm:"ዋና አድሚን (Super Admin)",color:"bg-rose-100 text-rose-900 border-rose-300",icon:"fa-crown"}},u=e?d[e.role]||d.buyer:null;return e&&localStorage.getItem("currentUser")&&JSON.parse(localStorage.getItem("currentUser")||"{}").phone!=="+251900000001"&&window.isSuperAdminImpersonating,`
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
              <span>${n==="en"?"አማርኛ":"English"}</span>
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
                <span class="text-xl font-black tracking-tight text-slate-900 ${n==="am"?"lang-am":""}">
                  ${i.brandName}
                </span>
                <span class="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-200">
                  ET
                </span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium ${n==="am"?"lang-am":""}">
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
                class="w-full py-2.5 pr-3 text-sm focus:outline-none bg-transparent placeholder:text-slate-400 font-medium ${n==="am"?"lang-am":""}" />
              
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
                      ${n==="am"?"ሰላም,":"Hello,"}
                    </span>
                    <span class="text-xs font-black text-slate-900 block truncate max-w-[120px] leading-tight ${n==="am"?"lang-am":""}">
                      ${n==="am"&&e.nameAm?e.nameAm:e.name}
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
                        <span class="text-sm font-black text-slate-900 truncate ${n==="am"?"lang-am":""}">
                          ${n==="am"&&e.nameAm?e.nameAm:e.name}
                        </span>
                        <i class="fa-solid fa-circle-check text-emerald-600 text-xs" title="Verified Account"></i>
                      </div>
                      <span class="text-[11px] font-semibold text-slate-500 block truncate">${e.phone}</span>
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${(u==null?void 0:u.color)||"bg-slate-100 text-slate-800"}">
                        ${n==="am"?u==null?void 0:u.labelAm:u==null?void 0:u.label}
                      </span>
                    </div>
                  </div>

                  <!-- Verification Status Banner in Dropdown -->
                  <div class="p-2.5 rounded-xl ${e.verificationStatus==="Approved"||e.verified?"bg-emerald-50 border border-emerald-200":e.verificationStatus==="UnderReview"?"bg-amber-50 border border-amber-200":"bg-red-50 border border-red-200"} text-xs">
                    <div class="flex items-center justify-between">
                      <span class="font-bold ${e.verificationStatus==="Approved"||e.verified?"text-emerald-900":e.verificationStatus==="UnderReview"?"text-amber-900":"text-red-900"}">
                        ${e.verificationStatus==="Approved"||e.verified?"🛡️ "+(n==="am"?"የተረጋገጠ መለያ":"Fayda Verified"):e.verificationStatus==="UnderReview"?"⏳ "+(n==="am"?"በመገምገም ላይ":"Under Review"):"⚠️ "+(n==="am"?"ማረጋገጫ ያስፈልጋል":"Unverified Account")}
                      </span>
                      <button onclick="window.openVerificationWizard()" class="text-[10px] font-bold underline cursor-pointer text-emerald-800">
                        ${n==="am"?"ይመልከቱ":"Manage"}
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
                      <i class="fa-solid fa-id-card text-emerald-600"></i> ${n==="am"?"የፋይዳ / የታክስ ማረጋገጫ":"Fayda & TIN Verification"}
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
                      <span>${n==="am"?"ከመለያ ውጣ (Sign Out)":"Sign Out"}</span>
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
              <span class="font-bold hidden sm:inline ${n==="am"?"lang-am":""}">${i.navCart}</span>
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
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="marketplace"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${n==="am"?"lang-am":""}">
              <i class="fa-solid fa-store"></i> ${i.navMarketplace}
            </button>

            ${t&&(e==null?void 0:e.role)==="farmer"?`
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="farmer"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${n==="am"?"lang-am":""}">
                <i class="fa-solid fa-tractor"></i> ${i.navFarmerPortal}
              </button>
              <button onclick="window.toggleCreateListingModal()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${n==="am"?"lang-am":""}">
                <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${i.postNewListing}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="driver"?`
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="driver"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${n==="am"?"lang-am":""}">
                <i class="fa-solid fa-truck"></i> ${i.navDriverPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="agent"?`
              <button onclick="window.navigateTab('agent')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="agent"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${n==="am"?"lang-am":""}">
                <i class="fa-solid fa-users-gear text-teal-400"></i> ${i.navAgentPortal}
              </button>
            `:""}

            ${t&&(e==null?void 0:e.role)==="admin"?`
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${s==="admin"?"bg-emerald-900 text-white font-bold shadow-xs":"hover:bg-slate-200/70 text-slate-700"} ${n==="am"?"lang-am":""}">
                <i class="fa-solid fa-sliders"></i> ${i.navAdminPortal}
              </button>
            `:""}

            ${!t||(e==null?void 0:e.role)==="buyer"?`
              <button onclick="window.toggleCart()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-200/70 text-slate-700 ${n==="am"?"lang-am":""}">
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
  `}function qt(n,e,t,s,a,r,o,i,l,d=null,u=0,h="All",x="All",T=!1,E=!1,S="marketplace",v=p.getStandingOrders(),j=p.getOrders("buyer")){var ee,te;const w=W[n],q=[{key:"All",label:w.catAll,icon:"fa-boxes-stacked"},{key:"Vegetables",label:w.catVegetables,icon:"fa-carrot"},{key:"Grains",label:w.catGrains,icon:"fa-wheat-awn"},{key:"Fruits",label:w.catFruits,icon:"fa-apple-whole"},{key:"Coffee",label:w.catCoffee,icon:"fa-mug-hot"}],Q=r.reduce((y,K)=>y+K.qtyKg*K.listing.pricePerKg,0),Z=Math.round(Q*.9),J=Math.round(Q*.05),se=Q-Z-J,re=r.reduce((y,K)=>{const U=K.listing.farmerId;return y[U]||(y[U]={farmerName:K.listing.farmerName,farmerRegion:K.listing.region,items:[]}),y[U].items.push(K),y},{});return`
    <div class="space-y-8 pb-20">
      
      <!-- E-Commerce Hero Promotional Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>15M+ Ethiopian Smallholder Farmers Direct Network</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${n==="am"?"lang-am":""}">
              ${w.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${n==="am"?"lang-am":""}">
              ${w.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> Browse Farm Deals
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${w.navOrders} & Invoices (${j.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${w.standingOrdersTitle}
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
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${S==="marketplace"?"active":""}">
            <i class="fa-solid fa-store"></i>
            <span>${n==="am"?"የጅምላ ገበያ":"Wholesale Marketplace"}</span>
          </button>
          <button onclick="window.setBuyerSubTab('orders')" class="cat-pill ${S==="orders"?"active":""}">
            <i class="fa-solid fa-receipt"></i>
            <span>${w.navOrders} & ${w.navLegalDocuments} (${j.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${S==="standing_orders"?"active":""}">
            <i class="fa-solid fa-repeat"></i>
            <span>${w.standingOrdersTitle} (${v.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${S==="standing_orders"?zt(n,v):S==="orders"?Gt(n,j):`

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${q.map(y=>`
            <button onclick="window.setCategory('${y.key}')" 
              class="cat-pill ${t===y.key?"active":""} ${n==="am"?"lang-am":""}">
              <i class="fa-solid ${y.icon}"></i>
              <span>${y.label}</span>
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
              ${[0,25,50,100].map(y=>`
                <button onclick="window.setMaxDistanceKm(${y})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${u===y?"bg-emerald-600 text-white border-emerald-600":"bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}">
                  ${y===0?"All":y+" km"}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${w.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${h==="All"?"selected":""}>All Grades</option>
              <option value="Grade 1" ${h==="Grade 1"?"selected":""}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${h==="Grade 2"?"selected":""}>Grade 2 (Value)</option>
              <option value="Export Grade" ${h==="Export Grade"?"selected":""}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${w.filterRipeness}:</span>
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
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${T?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${w.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${E?"checked":""} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${w.filterAdvance}</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Produce Marketplace Grid -->
      <section class="space-y-4">
        
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${n==="am"?"lang-am":""}">
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
            ${e.map(y=>`
              <div class="glass-card overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1">
                
                <div>
                  <!-- Clickable Image with Hover Inspector Overlay -->
                  <div 
                    onclick="window.openProduceDetail('${y.id}')" 
                    class="h-48 w-full relative overflow-hidden group cursor-pointer"
                    title="${w.clickToEnlarge||"Click to view full photos & produce details"}"
                  >
                    <img src="${y.photos[0]}" alt="${y.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" />
                    
                    <!-- Hover Quick Preview Overlay -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <span class="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3.5 py-2 rounded-full shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <i class="fa-solid fa-eye text-emerald-600"></i> ${w.viewDetails}
                      </span>
                    </div>

                    <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                      ${y.isAdvanceHarvest?`
                        <span class="advance-pill shadow-md">
                          <i class="fa-solid fa-calendar-check text-emerald-700"></i> Advance Harvest
                        </span>
                      `:""}
                      ${y.isOrganic?`
                        <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                          Organic Certified
                        </span>
                      `:""}
                    </div>

                    <span class="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md z-10 pointer-events-none">
                      ${y.pricePerKg} ETB<span class="text-[10px] font-normal text-slate-300">/kg</span>
                    </span>

                    ${y.distanceKm?`
                      <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${y.distanceKm} km ${w.farmDistance}
                      </span>
                    `:""}

                    ${y.photos.length>1?`
                      <span class="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10 pointer-events-none">
                        <i class="fa-solid fa-images text-emerald-400 mr-1"></i> ${y.photos.length} photos
                      </span>
                    `:""}
                  </div>

                  <div class="p-5 space-y-3">
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span class="text-amber-700 font-bold"><i class="fa-solid fa-award mr-1"></i> ${y.grade||"Grade 1"}</span>
                      <span class="text-slate-600 font-medium">${y.ripeness||"Ready Today"}</span>
                    </div>

                    <h3 
                      onclick="window.openProduceDetail('${y.id}')"
                      class="font-extrabold text-slate-900 text-lg leading-snug hover:text-emerald-700 cursor-pointer transition-colors ${n==="am"?"lang-am":""}"
                    >
                      ${n==="am"&&y.nameAm?y.nameAm:y.productName}
                    </h3>

                    <!-- Farmer Credibility & Trust Badges -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800"><i class="fa-solid fa-user-check text-emerald-600 mr-1"></i> ${y.farmerName}</span>
                        <span class="text-amber-600 font-extrabold"><i class="fa-solid fa-star mr-1"></i> ${y.farmerRating}</span>
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                        <span><i class="fa-solid fa-location-dot text-emerald-600"></i> ${y.region}</span>
                        <span>·</span>
                        <span>${y.repeatBuyerCount||18} Repeat Wholesalers</span>
                      </div>
                    </div>

                    ${y.voiceNoteTranscript?`
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2 cursor-pointer hover:bg-emerald-100/70 transition-colors" onclick="window.openProduceDetail('${y.id}')">
                        <i class="fa-solid fa-microphone-lines text-emerald-700 text-sm mt-0.5"></i>
                        <span class="italic leading-tight truncate">"${y.voiceNoteTranscript}"</span>
                      </div>
                    `:""}

                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Available: <strong class="font-bold text-slate-900">${y.qtyKg.toLocaleString()} kg</strong></span>
                      <span>Min Order: <strong class="font-bold text-slate-900">${y.minOrderKg} kg</strong></span>
                    </div>

                  </div>
                </div>

                <!-- Action Buttons: View Details & Add to Bulk Cart -->
                <div class="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button onclick="window.openProduceDetail('${y.id}')" class="btn-secondary py-2.5 text-xs font-bold shadow-xs cursor-pointer hover:bg-slate-100">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> Details
                  </button>
                  <button onclick="window.addToCart('${y.id}')" class="btn-primary py-2.5 text-xs font-extrabold shadow-sm cursor-pointer">
                    <i class="fa-solid fa-cart-plus mr-1"></i> ${w.addToCart}
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
                  <h3 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">${w.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer checkout with Telebirr Escrow</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${r.length===0?`
              <div class="p-8 text-center text-slate-500 text-xs">
                <p>${w.cartEmpty}</p>
              </div>
            `:`
              <div class="space-y-4 max-h-80 overflow-y-auto pr-1">
                ${Object.entries(re).map(([y,K])=>`
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
                  <span>${w.farmerShare}:</span>
                  <strong class="text-emerald-900">${Z.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${w.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${J.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${w.platformFee}:</span>
                  <strong class="text-slate-800">${se.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${w.totalAmount}:</span>
                  <span class="text-emerald-800">${Q.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${Q})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
                <i class="fa-solid fa-arrow-right mr-1.5"></i> Choose shipping & payment
              </button>
            `}

          </div>
        </div>
      `:""}

      <!-- Telebirr Escrow Payment Modal -->
      ${l!=null&&l.isOpen?`
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
              <div class="text-3xl font-black text-blue-950">${l.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <span class="text-[11px] text-blue-800 font-semibold block">${w.escrowGuarantee}</span>
            </div>

            <form onsubmit="window.handleTelebirrSubmit(event)" class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between"><label class="block text-xs font-bold text-slate-700">1. Shipping address</label><button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="text-[10px] font-bold text-emerald-700">Add address</button></div>
                ${p.getAccountData().addresses.length?`<select id="checkoutAddress" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"><option value="">Select a saved address</option>${p.getAccountData().addresses.map(y=>`<option value="${y.id}">${y.name} · ${y.street}, ${y.city}${y.isDefaultShipping?" · Default":""}</option>`).join("")}</select>`:`<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">Add a saved address before checkout. <button type="button" onclick="window.navigateTab('account'); window.setBuyerAccountTab('addresses')" class="font-black underline">Manage addresses</button></div>`}
              </div>

              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-700">2. Payment method</label>
                <div class="space-y-2">${p.getAccountData().paymentMethods.length?p.getAccountData().paymentMethods.map(y=>`<label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-400"><input type="radio" name="checkoutPayment" value="${y.id}" ${y.isPrimary?"checked":""} required /><span class="text-xs font-bold">${y.provider} · ${y.maskedDisplay||"Provider wallet"}${y.isPrimary?" · Primary":""}</span></label>`).join(""):`<label class="flex items-center gap-3 p-3 rounded-xl border border-blue-300 bg-blue-50 cursor-pointer"><input type="radio" name="checkoutPayment" value="telebirr-wallet" checked required /><span class="text-xs font-bold">Telebirr wallet · ${((ee=p.getCurrentUser())==null?void 0:ee.phone)||"linked account"}</span></label><p class="text-[10px] text-slate-500">Payment is securely authorized by the configured gateway.</p>`}</div>
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
      ${d!=null&&d.isOpen?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-5">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${w.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${d.order.id.slice(0,8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${d.order.id}')" class="space-y-4 text-xs">
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
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${d.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
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
      ${i?`
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">${w.orderTracking}</h3>
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
                <h4 class="font-bold text-slate-900 ${n==="am"?"lang-am":""}">${i.productName}</h4>
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
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${w.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${w.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${w.viewWaybillBtn}
              </button>

              ${i.disputeStatus==="ResolvedRefundBuyer"?`
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-money-bill-transfer text-emerald-700 mr-1"></i> Refund approved and returned through the original payment method.
                </div>
              `:i.status==="disputed"?`
                <button onclick="window.openArbitrationModal('${i.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
                  <i class="fa-solid fa-scale-balanced mr-1 text-red-600"></i> ${w.viewArbitrationBtn}
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
                  <i class="fa-solid fa-circle-check"></i> ${w.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${i.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${w.disputeBtn}
                </button>
              `:(te=i.disputeStatus)!=null&&te.startsWith("Resolved")?`
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
  `}function Gt(n,e){const t=W[n],s=[{key:"pending",label:"Order Placed",icon:"fa-lock",active:["pending","confirmed","PickedUp","picked_up","delivered"]},{key:"confirmed",label:"Farmer Confirmed",icon:"fa-tractor",active:["confirmed","PickedUp","picked_up","delivered"]},{key:"picked_up",label:"In Transit",icon:"fa-truck",active:["PickedUp","picked_up","delivered"]},{key:"delivered",label:"Delivered",icon:"fa-hand-holding-dollar",active:["delivered"]}];function a(i){const l=i==null?void 0:i.toLowerCase();return l==="delivered"?"text-emerald-700 bg-emerald-100 border-emerald-300":l==="picked_up"||l==="pickedup"?"text-blue-700 bg-blue-100 border-blue-300":l==="confirmed"?"text-amber-700 bg-amber-100 border-amber-300":l==="disputed"?"text-red-700 bg-red-100 border-red-300":"text-slate-600 bg-slate-100 border-slate-300"}function r(i,l){return i.some(d=>d.toLowerCase()===(l==null?void 0:l.toLowerCase()))}function o(i){const l=i==null?void 0:i.toLowerCase();return["confirmed","picked_up","pickedup"].includes(l)}return`
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${n==="am"?"lang-am":""}">
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
          ${e.map(i=>{var l,d;return`
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
                ${s.map((u,h)=>{var E;const x=r(u.active,i.status),T=h===s.length-1;return`
                    <div class="flex-1 flex flex-col items-center">
                      <!-- Step circle -->
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all
                        ${x?"bg-emerald-600 text-white ring-2 ring-emerald-200":"bg-slate-100 text-slate-400 border border-slate-200"}">
                        <i class="fa-solid ${u.icon} text-[11px]"></i>
                      </div>
                      <!-- Connector line -->
                      ${T?"":`
                        <div class="absolute top-4 left-0 right-0 h-0.5 -z-10" style="left:calc(${h*100/(s.length-1)}% + 16px); width:calc(${100/(s.length-1)}% - 32px)">
                          <div class="h-full ${x&&r(((E=s[h+1])==null?void 0:E.active)??[],i.status)?"bg-emerald-400":"bg-slate-200"} rounded-full"></div>
                        </div>
                      `}
                      <!-- Step label -->
                      <span class="text-[9px] font-semibold mt-1.5 text-center leading-tight ${x?"text-emerald-800":"text-slate-400"}">
                        ${u.label}
                      </span>
                    </div>
                  `}).join("")}
              </div>

              <!-- Driver ETA (for in-transit orders) -->
              ${((l=i.status)==null?void 0:l.toLowerCase())==="picked_up"||((d=i.status)==null?void 0:d.toLowerCase())==="pickedup"?`
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
  `}function zt(n,e){const t=W[n];return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${n==="am"?"lang-am":""}">
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
                <h3 class="text-base font-extrabold text-slate-900 mt-1">${n==="am"&&s.productNameAm?s.productNameAm:s.productName}</h3>
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
  `}function Qt(n,e,t,s,a,r="listings",o=p.getPriceBenchmarks(),i=p.getCurrentUser()){const l=W[n];return`
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
                <i class="fa-solid fa-circle-check text-emerald-600"></i> ${l.verifiedFayda} ${i!=null&&i.kycDocumentNumber?`(${i.kycDocumentNumber})`:""}
              </span>
              ${i!=null&&i.tinNumber?`
                <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
                  <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${i.tinNumber}
                </span>
              `:""}
            `:p.getVerificationStatus()==="UnderReview"?`
              <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
                <i class="fa-solid fa-hourglass-half text-amber-600"></i> ${n==="am"?"ማረጋገጫ በመገምገም ላይ":"Verification Under Review"}
              </span>
            `:p.getVerificationStatus()==="Rejected"?`
              <span class="trust-badge text-red-800 bg-red-50 border-red-200">
                <i class="fa-solid fa-circle-xmark text-red-600"></i> ${n==="am"?"ማረጋገጫ አልጸደቀም":"Verification Rejected"}
              </span>
            `:`
              <span class="trust-badge text-slate-700 bg-slate-100 border-slate-200">
                <i class="fa-solid fa-shield-halved text-slate-500"></i> ${n==="am"?"ያልተረጋገጠ መለያ":"Unverified Account"}
              </span>
            `}
            <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
              <i class="fa-solid fa-users text-purple-600"></i> ${(i==null?void 0:i.repeatBuyerCount)||0} ${l.repeatBuyers}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> ${(i==null?void 0:i.onTimeDeliveryRate)||100}% ${l.onTimeRate}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${n==="am"?"lang-am":""}">
            ${l.farmerPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.toggleFarmerTab('sms')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-comment-sms text-emerald-600"></i>
            <span class="${n==="am"?"lang-am":""}">${l.navSmsConsole}</span>
          </button>

          <button onclick="window.toggleFarmerTab('wallet')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-wallet text-amber-600"></i>
            <span class="${n==="am"?"lang-am":""}">${l.navWallet}</span>
          </button>

          <button onclick="window.toggleCreateListingModal()" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer">
            <i class="fa-solid fa-plus-circle"></i>
            <span class="${n==="am"?"lang-am":""}">${l.postNewListing}</span>
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
                ${p.getVerificationStatus()==="UnderReview"?n==="am"?"ሰነዶችዎ በአድሚን በመገምገም ላይ ናቸው":"Fayda ID & TIN Verification Under Review":p.getVerificationStatus()==="Rejected"?n==="am"?"ማረጋገጫዎ አልጸደቀም፤ እባክዎ እንደገና ያስገቡ":"Verification Rejected - Action Required":n==="am"?"መለያዎን በፋይዳ (Fayda) እና በTIN ያረጋግጡ":"Complete Fayda ID & Taxpayer TIN Verification"}
              </h4>
              <p class="text-xs ${p.getVerificationStatus()==="UnderReview"?"text-amber-700":p.getVerificationStatus()==="Rejected"?"text-red-700":"text-emerald-700"}">
                ${i!=null&&i.rejectionReason?`${l.rejectionReasonLabel}: ${i.rejectionReason}`:l.verificationBannerText}
              </p>
            </div>
          </div>
          <button onclick="window.openVerificationWizard()" class="btn-primary text-xs py-2 px-4 shrink-0 shadow-xs cursor-pointer ${p.getVerificationStatus()==="UnderReview"?"bg-amber-700 hover:bg-amber-800":p.getVerificationStatus()==="Rejected"?"bg-red-700 hover:bg-red-800":"bg-emerald-700 hover:bg-emerald-800"}">
            <i class="fa-solid fa-id-card mr-1"></i> ${p.getVerificationStatus()==="Rejected"?l.resubmitDocsBtn:l.startVerificationBtn}
          </button>
        </div>
      `:""}

      <!-- Farmer Portal Navigation Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onclick="window.toggleFarmerTab('listings')" class="cat-pill ${r==="listings"?"active":""}">
          <i class="fa-solid fa-box-open"></i>
          <span>${n==="am"?"ምርቶች እና ትዕዛዞች":"Produce & Orders"}</span>
        </button>
        <button onclick="window.toggleFarmerTab('wallet')" class="cat-pill ${r==="wallet"?"active":""}">
          <i class="fa-solid fa-wallet"></i>
          <span>${l.walletTitle}</span>
        </button>
        <button onclick="window.toggleFarmerTab('sms')" class="cat-pill ${r==="sms"?"active":""}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${l.smsConsoleTitle}</span>
        </button>
      </div>

      ${r==="wallet"?Yt(n,s,t,i):r==="sms"?Xt(n):`

      <!-- Price Benchmark Advisory Banner -->
      <section class="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-lg space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-sm text-white ${n==="am"?"lang-am":""}">${l.priceBenchmarkTitle}</h3>
              <p class="text-[11px] text-emerald-200 font-medium">${l.benchmarkDesc}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-white/10 text-emerald-300 px-2.5 py-1 rounded-full border border-white/10">
            <i class="fa-solid fa-clock mr-1"></i> Live Merkato & Sholla Feeds
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          ${o.map(d=>`
            <div class="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div class="text-[11px] font-bold text-slate-300 truncate">${n==="am"?d.cropNameAm:d.cropName}</div>
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
            ${((i==null?void 0:i.walletBalanceEtb)||48200).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> Ready for instant withdrawal
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${l.pendingEscrow}</span>
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
            <span>${l.lifetimePayout}</span>
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
          <h2 class="text-xl font-bold text-slate-900 ${n==="am"?"lang-am":""}">
            <i class="fa-solid fa-clipboard-list text-emerald-600 mr-2"></i> ${l.incomingOrders}
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
                    <i class="fa-solid fa-file-contract mr-1"></i> ${l.viewContractBtn}
                  </button>

                  <button onclick="window.openInvoiceModal('${d.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer" title="Download Tax Exemption Receipt">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${l.viewInvoiceBtn}
                  </button>

                  <button onclick="window.openWaybillModal('${d.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer" title="View Transport Waybill">
                    <i class="fa-solid fa-truck-fast mr-1"></i> ${l.viewWaybillBtn}
                  </button>

                  ${d.status==="pending"?`
                    <button onclick="window.confirmFarmerOrder('${d.id}')" 
                      class="btn-primary text-xs py-1.5 px-4 shadow-sm cursor-pointer">
                      <i class="fa-solid fa-check mr-1"></i>
                      <span class="${n==="am"?"lang-am":""}">${l.confirmOrderAction}</span>
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
        <h2 class="text-xl font-bold text-slate-900 ${n==="am"?"lang-am":""}">
          <i class="fa-solid fa-box-open text-emerald-600 mr-2"></i> ${l.myActiveListings}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${e.map(d=>`
            <div 
              onclick="window.openProduceDetail('${d.id}')"
              class="glass-card overflow-hidden cursor-pointer hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 group"
              title="Click to view produce post details & photos"
            >
              <div class="h-44 w-full relative overflow-hidden">
                <img src="${d.photos[0]}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> View Post Details
                  </span>
                </div>

                <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
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

                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs z-10 pointer-events-none">
                  ${d.status.toUpperCase()}
                </span>
              </div>
              <div class="p-4 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span class="text-amber-600 font-bold"><i class="fa-solid fa-certificate mr-1"></i> ${d.grade||"Grade 1"}</span>
                  <span>${d.ripeness||"Ready Today"}</span>
                </div>

                <h3 class="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors ${n==="am"?"lang-am":""}">
                  ${n==="am"&&d.nameAm?d.nameAm:d.productName}
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
      ${a?Ge(n):""}

    </div>
  `}function Yt(n,e,t,s){const a=W[n];return`
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
          <h3 class="text-base font-bold text-slate-900 ${n==="am"?"lang-am":""}">
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
  `}function Xt(n){const e=W[n];return`
    <div class="glass-card p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      
      <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-comment-sms"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">${e.smsConsoleTitle}</h2>
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
  `}function Ge(n,e){const t=W[n];return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCreateListingModal()">
      <div class="modal-content p-6 sm:p-8 space-y-6 max-w-2xl">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">${t.postNewListing}</h3>
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
              <span class="font-extrabold text-xs text-emerald-950 ${n==="am"?"lang-am":""}">${t.voiceNoteTitle}</span>
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
  `}function Zt(n,e,t,s=p.getOptimizedRoute(),a=p.getCurrentUser(),r=p.getIsOfflineMode(),o=p.getOfflineQueue().length){const i=W[n],l=(a==null?void 0:a.vehicleCapacityKg)||5e3,d=Math.min(100,Math.round(s.totalWeightKg/l*100));return`
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

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${n==="am"?"lang-am":""}">
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
              <h3 class="text-sm font-bold text-slate-900 ${n==="am"?"lang-am":""}">${i.vehicleProfileTitle}</h3>
              <p class="text-[11px] text-slate-500 font-medium">${(a==null?void 0:a.vehicleType)||"Isuzu 5-Ton"} · ${(a==null?void 0:a.refrigerationType)||"Ventilated Cargo"}</p>
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
            <h2 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">${s.title}</h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span><i class="fa-solid fa-road text-amber-600 mr-1"></i> ${s.totalDistanceKm} km</span>
            <span><i class="fa-solid fa-clock text-blue-600 mr-1"></i> ~${s.estimatedHours} hrs</span>
            <span><i class="fa-solid fa-coins text-emerald-600 mr-1"></i> ${(s.driverCommissionEtb+s.ruralSubsidyEtb).toLocaleString()} ETB Total</span>
          </div>
        </div>

        <div class="space-y-4">
          ${s.stops.map((u,h)=>`
            <div class="flex items-start gap-4 p-4 rounded-2xl ${u.completed?"bg-emerald-50/60 border border-emerald-100":"bg-slate-50 border border-slate-200"}">
              <div class="w-8 h-8 rounded-full ${u.completed?"bg-emerald-600 text-white":u.type==="dropoff"?"bg-blue-600 text-white":"bg-amber-600 text-white"} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5">
                ${u.completed?'<i class="fa-solid fa-check"></i>':u.stopNumber}
              </div>

              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold ${u.type==="dropoff"?"text-blue-800":"text-amber-800"} uppercase">
                    ${u.type==="pickup"?"Stop "+u.stopNumber+": Farm Pickup":"Final Stop: Buyer Wholesale Depot"}
                  </span>
                  <span class="text-xs font-bold text-slate-500">${u.weightKg} kg</span>
                </div>

                <h4 class="text-sm font-extrabold text-slate-900 truncate">${u.locationName}</h4>
                <p class="text-xs text-slate-600"><i class="fa-solid fa-user text-slate-400 mr-1"></i> Contact: <strong class="text-slate-800">${u.contactName}</strong> (${u.phone})</p>
                <p class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-boxes-stacked text-slate-400 mr-1"></i> Cargo: ${u.cargoDetails}</p>
              </div>

              <div class="shrink-0">
                ${u.completed?`
                  <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <i class="fa-solid fa-check"></i> Picked Up
                  </span>
                `:`
                  <button onclick="window.handleDriverStopAction(${h})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
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
        <h2 class="text-xl font-bold text-slate-900 ${n==="am"?"lang-am":""}">
          <i class="fa-solid fa-road text-amber-600 mr-2"></i> ${i.availableTrips}
        </h2>

        ${e.length===0?`
          <div class="glass-card p-8 text-center text-slate-500 text-sm">
            No active trips assigned. Check back once farmers confirm incoming orders.
          </div>
        `:`
          <div class="space-y-4">
            ${e.map(u=>`
              <div class="glass-card p-5 space-y-4">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Waybill #${u.waybillNumber||"WB-FTA-001"}</span>
                    <h3 class="text-base font-extrabold text-slate-900 ${n==="am"?"lang-am":""}">${u.productName} (${u.qtyKg} kg)</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-slate-400 font-medium block">${i.tripCommission} + Rural Subsidy</span>
                    <span class="text-lg font-black text-amber-700">${(u.driverCut+(u.driverSubsidyEtb||150)).toLocaleString()} ETB</span>
                  </div>
                </div>

                <!-- Origin & Destination Route -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span class="font-bold text-emerald-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-dot text-emerald-600"></i> Farm Pickup Location
                    </span>
                    <p class="text-slate-800 font-semibold">${u.farmerRegion}</p>
                    <p class="text-slate-500 font-medium">Farmer: ${u.farmerName} (${u.farmerPhone})</p>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                    <span class="font-bold text-blue-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-location-pin text-blue-600"></i> Buyer Delivery Depot
                    </span>
                    <p class="text-slate-800 font-semibold">${u.deliveryAddress||"Addis Ababa"}</p>
                    <p class="text-slate-500 font-medium">Buyer: ${u.buyerName} (${u.buyerPhone})</p>
                  </div>
                </div>

                <!-- Driver Actions with Photo + GPS verification and Waybill Viewer -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>Status:</span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${u.status==="picked_up"?"bg-amber-100 text-amber-800":u.status==="delivered"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-800"}">${u.status.toUpperCase()}</span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button onclick="window.openWaybillModal('${u.id}')" class="btn-secondary text-xs py-2 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-sky-600"></i> ${i.viewWaybillBtn}
                    </button>

                    <button onclick="window.openContractModal('${u.id}')" class="btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${i.viewContractBtn}
                    </button>

                    ${u.status==="confirmed"?`
                      <button onclick="window.driverPickupWithProof('${u.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-camera mr-1"></i> ${i.uploadProof} & Pickup
                      </button>
                    `:u.status==="picked_up"?`
                      <button onclick="window.driverCompleteDeliveryProof('${u.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer">
                        <i class="fa-solid fa-location-crosshairs mr-1"></i> Dropoff + GPS Proof
                      </button>
                    `:`
                      <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Trip Completed · ${(u.driverCut+(u.driverSubsidyEtb||150)).toLocaleString()} ETB Deposited
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
  `}function Jt(n,e,t,s=p.getAnomalyAlerts(),a=p.getKycQueue(),r=p.getRegionalAnalytics(),o="disputes"){const i=W[n];return`
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance & Legal Compliance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${n==="am"?"lang-am":""}">
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
        <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${o==="anomalies"?"active":""}">
          <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
          <span>${i.anomalyScannerTitle} (${s.length})</span>
        </button>
        <button onclick="window.setAdminTab('kyc')" class="cat-pill ${o==="kyc"?"active":""}">
          <i class="fa-solid fa-id-card"></i>
          <span>${i.kycQueueTitle} (${a.filter(l=>l.status==="Pending").length})</span>
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

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split with Legal Decrees) -->
      ${o==="disputes"?`
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">
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
                        <i class="fa-solid fa-gavel mr-1"></i> ${i.viewArbitrationBtn}
                      </button>
                      <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold">
                        <i class="fa-solid fa-lock mr-1"></i> Frozen (${l.totalEtb.toLocaleString()} ETB)
                      </span>
                    </div>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${i.disputeEvidence}:</span>
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
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${i.releaseFarmerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${l.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${i.refundBuyerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${l.id}', 'PartialSplit')" class="btn-secondary text-xs py-2.5 px-4 text-purple-700 border-purple-300 hover:bg-purple-50 font-bold cursor-pointer">
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
            <h2 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> ${i.anomalyScannerTitle}
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

      <!-- Tab Content 3: Comprehensive Verification & Regulatory Audit Queue -->
      ${o==="kyc"?`
        <section class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">
                <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${i.sideBySideInspectionTitle}
              </h2>
              <p class="text-xs text-slate-500">
                ${n==="am"?"የፋይዳ (Fayda) ብሔራዊ መታወቂያ፣ የግብር ከፋይ ቁጥር (TIN) እና የአርሶ አደሮች ሰነዶች ማረጋገጫ":"Inspect high-res Fayda ID cards, MOR TIN numbers, and field agent submissions."}
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
            ${p.getVerificationQueue().map(l=>`
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
                      📋 ${n==="am"?"የመታወቂያ እና የታክስ መረጃ":"Identity & Tax Record"}
                    </div>
                    <div>
                      <span class="text-slate-500 block">${i.tinNumberLabel}:</span>
                      <strong class="font-mono text-emerald-800 text-sm">${l.tinNumber||"0099881122"}</strong>
                    </div>
                    ${l.documents.map(d=>`
                      <div class="pt-1">
                        <span class="text-slate-500 block">${d.documentType}:</span>
                        <strong class="font-mono text-slate-800">${d.documentNumber}</strong>
                      </div>
                    `).join("")}
                    ${l.rejectionReason?`
                      <div class="p-2 rounded bg-red-50 text-red-800 text-[11px] font-medium border border-red-200 mt-2">
                        <strong>${i.rejectionReasonLabel}:</strong> ${l.rejectionReason}
                      </div>
                    `:""}
                  </div>

                  <!-- Column 2 & 3: High-Res Document Photo Previews -->
                  <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${l.documents.flatMap(d=>[d.frontImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">🪪 ${d.documentType} (Front)</div>
                          <img src="${d.frontImageUrl}" alt="Document Front" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${d.frontImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      `:"",d.backImageUrl?`
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">📜 ${d.documentType} (Back)</div>
                          <img src="${d.backImageUrl}" alt="Document Back" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${d.backImageUrl}', '_blank')" />
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
                      onclick="window.adminReviewVerification('${l.userId}', 'Reject')" 
                      class="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
                    >
                      <i class="fa-solid fa-xmark mr-1"></i> ${i.rejectVerificationAction}
                    </button>
                    
                    <button 
                      onclick="window.adminReviewVerification('${l.userId}', 'Approve')" 
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
                  ${p.getOrders().map(l=>`
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
      `:""}

      <!-- Tab Content 5: Regional Analytics & EABC Impact Dashboard -->
      ${o==="analytics"?`
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">
              <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i> ${i.regionalAnalyticsTitle}
            </h2>
            <span class="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              EABC Regional Sourcing Impact
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${r.map(l=>`
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
      `:""}

      <!-- Tab Content 6: Broadcast Bilingual SMS (Twilio) -->
      ${o==="sms"?`
        <section class="glass-card p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
              <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${n==="am"?"lang-am":""}">${i.broadcastSmsTitle}</h2>
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
  `}class ea{constructor(e="en"){g(this,"currentLang","en");g(this,"activeTab","register");g(this,"ussdPhone","+251944556677");g(this,"ussdInput","*990#");g(this,"ussdScreenText",`Welcome to Farmer-to-Market USSD
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
    `}switchTab(e){this.activeTab=e}setUssdInput(e){this.ussdInput=e;const t=document.getElementById("ussdCodeInput");t&&(t.value=e)}async executeUssd(){const e=document.getElementById("ussdCodeInput"),t=(e==null?void 0:e.value)||this.ussdInput,s=await p.sendInboundUssdSimulation(this.ussdPhone,t);this.ussdScreenText=s;const a=document.getElementById("ussdDisplayScreen");a&&(a.innerText=s)}}class ta{constructor(e="en"){g(this,"currentLang","en");g(this,"isOpen",!1);g(this,"currentStep",1);g(this,"faydaNumber","");g(this,"tinNumber","");g(this,"kebeleNumber","");g(this,"frontImageUrl","https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80");g(this,"backImageUrl","https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80");this.currentLang=e}setLanguage(e){this.currentLang=e}open(e=1){this.isOpen=!0,this.currentStep=e;const t=p.getCurrentUser();t!=null&&t.tinNumber&&(this.tinNumber=t.tinNumber),this.render()}close(){this.isOpen=!1;const e=document.getElementById("verificationWizardModal");e&&(e.innerHTML="")}render(){const e=document.getElementById("verificationWizardModal");if(!e||!this.isOpen)return;const t=W[this.currentLang],s=p.getCurrentUser(),a=p.getVerificationStatus();e.innerHTML=`
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
      `:""}getStatusBgColor(e){switch(e){case"Approved":return"rgba(16, 185, 129, 0.12)";case"UnderReview":return"rgba(234, 179, 8, 0.12)";case"Rejected":return"rgba(239, 68, 68, 0.12)";default:return"rgba(100, 116, 139, 0.1)"}}getStatusTextColor(e){switch(e){case"Approved":return"#047857";case"UnderReview":return"#b45309";case"Rejected":return"#b91c1c";default:return"#475569"}}getStatusIcon(e){switch(e){case"Approved":return"✅";case"UnderReview":return"⏳";case"Rejected":return"❌";default:return"📝"}}formatStatus(e){const t=W[this.currentLang];switch(e){case"Approved":return t.statusApproved;case"UnderReview":return t.statusUnderReview;case"Rejected":return t.statusRejected;default:return t.statusPendingSubmission}}updateField(e,t){e==="fayda"&&(this.faydaNumber=t),e==="tin"&&(this.tinNumber=t),e==="kebele"&&(this.kebeleNumber=t)}setStep(e){this.currentStep=e,this.render()}async submit(){const e=this.faydaNumber||"FAN-8812-4091-2810",t=this.tinNumber||"0099881122";await p.submitVerificationDocuments(t,[{documentType:"FaydaId",documentNumber:e,frontImageUrl:this.frontImageUrl,backImageUrl:this.backImageUrl},{documentType:"TinCertificate",documentNumber:t,frontImageUrl:"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"}]),this.close()}}function aa(n,e){return`
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-envelope-open-text text-emerald-700 text-lg"></i>
            <h3 class="text-base font-bold text-slate-900">
              ${n==="am"?"የኤስኤምኤስ (SMS) እና የስርዓት መልእክቶች":"SMS & Push Notifications"}
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
                <p class="text-slate-800 font-medium leading-relaxed ${n==="am"?"lang-am":""}">
                  ${n==="am"&&t.messageAm?t.messageAm:t.messageEn}
                </p>
              </div>
            `).join("")}
          </div>
        `}

      </div>
    </div>
  `}function sa(n,e,t,s,a="",r="",o="",i=""){return`
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
              <h3 class="text-lg sm:text-xl font-black tracking-tight text-white ${n==="am"?"lang-am":""}">
                ${e==="login"?n==="am"?"ወደ መለያዎ ይግቡ":"Sign In to Your Account":n==="am"?"አዲስ የጅምላ መለያ ይመዝገቡ":"Create a Wholesale Account"}
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
              <i class="fa-solid fa-right-to-bracket text-emerald-700"></i> ${n==="am"?"ግባ (Sign In)":"Sign In (መግቢያ)"}
            </button>
            <button onclick="window.setAuthMode('register')" 
              class="flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${e==="register"?"bg-white text-emerald-950 shadow-sm border border-slate-200/60":"text-slate-500 hover:text-slate-900"}">
              <i class="fa-solid fa-user-plus text-emerald-700"></i> ${n==="am"?"ተመዝገብ (Join Free)":"Join Free (አዲስ መመዝገቢያ)"}
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
                    ${n==="am"?"የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ":"Enter 6-Digit Verification Code"}
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
                  <i class="fa-solid fa-circle-check mr-1.5"></i> ${n==="am"?"አረጋግጥና ግባ":"Verify Code & Sign In"}
                </button>
              </form>
            `:`
              <form onsubmit="window.handleRequestOtp(event)" class="space-y-4 pt-1">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="text-xs font-bold text-slate-800">
                      ${n==="am"?"የተመዘገበ የሞባይል ስልክ ቁጥር":"Registered Ethiopian Mobile Number"}
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
                    <i class="fa-solid fa-database text-emerald-600"></i> ${n==="am"?"በዳታቤዝ ውስጥ የተመዘገቡ ተጠቃሚዎች ብቻ መግባት ይችላሉ።":"Only existing registered accounts in the database can sign in."}
                  </p>
                </div>

                <button type="submit" id="requestOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${n==="am"?"የኤስኤምኤስ ማረጋገጫ ኮድ ላክ":"Verify & Send SMS Code"}
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
                  ${n==="am"?"የንግድ / የሥራ ዘርፍ ይምረጡ":"Select Your Business Role on the Exchange"}
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
                <i class="fa-solid fa-user-check mr-1.5"></i> ${n==="am"?"ይመዝገቡና ወደ መለያዎ ይግቡ":"Complete Registration & Sign In"}
              </button>
            </form>
          `}

        </div>
      </div>
    </div>
  `}class ra{constructor(){g(this,"currentLang","en")}setLanguage(e){this.currentLang=e}renderInvoice(e){const t=this.currentLang==="am";return`
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
    `}}const xe=new ra;class ia{constructor(e="en"){g(this,"currentLang","en");g(this,"activePhotoIndex",0);g(this,"selectedQtyKg",50);this.currentLang=e}setLanguage(e){this.currentLang=e}setActivePhotoIndex(e){this.activePhotoIndex=e}setSelectedQtyKg(e){this.selectedQtyKg=Math.max(1,e)}render(e){if(!e)return"";const t=W[this.currentLang],s=this.currentLang==="am",a=e.photos&&e.photos.length>0?e.photos:["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=80"],r=Math.min(this.activePhotoIndex,a.length-1),o=a[r],i=Math.max(e.minOrderKg||10,this.selectedQtyKg||e.minOrderKg||50),l=i*e.pricePerKg,d=Math.round(l*.9),u=Math.round(l*.05),h=Math.round(l*.05),x=e.marketBenchmarkPrice||e.pricePerKg*1.15,T=Math.max(0,x-e.pricePerKg),E=x>0?Math.round(T/x*100):0,S=e.description||`Freshly harvested Grade 1 ${e.productName} cultivated directly by smallholder farmer ${e.farmerName} in ${e.region}. Verified under Ethiopian agricultural commodity standards with 90% direct farmer escrow payout.`,v=e.descriptionAm||`በ${e.region} በአርሶ አደር ${e.farmerNameAm||e.farmerName} የተመረተ ምርጥ ደረጃ ${e.nameAm||e.productName}። በቴሌብር ዋስትና 90% ቀጥታ ለአርሶ አደሩ የሚከፈልበት ተመራጭ ምርት።`;return`
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
                      ${a.map((j,w)=>`
                        <button 
                          onclick="window.selectProducePhoto(${w})" 
                          class="relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${w===r?"border-emerald-600 ring-2 ring-emerald-500/30 scale-102 shadow-md":"border-slate-200 hover:border-emerald-400 opacity-70 hover:opacity-100"}"
                        >
                          <img src="${j}" alt="Photo angle ${w+1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
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
                      <i class="fa-solid fa-arrow-down"></i> ${E}% Direct Savings
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
                    Eliminates 3 intermediary middleman margins. You save <strong class="text-emerald-800 font-bold">${T.toFixed(1)} ETB/kg</strong> while smallholder receives full 90% value.
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
                  ${S}
                </p>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-800 lang-am text-xs font-medium leading-relaxed">
                  <span class="font-bold text-emerald-800 block mb-1">የምርት ዝርዝር መግለጫ (አማርኛ)፡</span>
                  ${v}
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
                      ${l.toLocaleString()} <span class="text-xs font-normal text-slate-300">ETB</span>
                    </div>
                  </div>

                  <div class="text-right text-[11px] text-slate-300 space-y-0.5 border-l border-white/10 pl-4">
                    <div>Farmer Payout (90%): <strong class="text-emerald-300 font-bold">${d.toLocaleString()} ETB</strong></div>
                    <div>Driver & Escrow (10%): <strong class="text-slate-200">${(u+h).toLocaleString()} ETB</strong></div>
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
    `}}const ke=new ia;function oa(n,e="users",t="all",s="all"){const a=W[n],r=p.getAllUsers(),o=p.getPlatformConfig(),i=p.getSystemAuditLogs(),l=p.getDeliveryZones(),d=p.getFeatureFlags(),u=p.getPendingPayoutApprovals(),h=p.getGlobalBusinessRules(),x=p.getBlacklist(),T=t==="all"?r:r.filter(v=>v.role.toLowerCase()===t.toLowerCase()),E=s==="all"?i:i.filter(v=>v.category.toLowerCase()===s.toLowerCase()),S={all:r.length,farmer:r.filter(v=>v.role==="farmer").length,buyer:r.filter(v=>v.role==="buyer").length,driver:r.filter(v=>v.role==="driver").length,agent:r.filter(v=>v.role==="agent").length,admin:r.filter(v=>v.role==="admin").length,superadmin:r.filter(v=>v.role==="superadmin").length};return`
    <div class="space-y-8 pb-24 animate-fadeIn">
      
      <!-- Top Super Admin Banner -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 rounded-3xl border border-rose-900/40 text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl pointer-events-none">
          <i class="fa-solid fa-crown"></i>
        </div>

        <div class="space-y-1 relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold mb-1">
            <i class="fa-solid fa-crown text-rose-400"></i> ${n==="am"?"የዋና አድሚን ቁጥጥር ማዕከል · ዶ/ር ዳዊት ኃይሌ":"Super Admin Root Governance · Dr. Dawit Haile"}
          </div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white ${n==="am"?"lang-am":""}">
            ${a.superAdminTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
            ${a.superAdminSubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 relative z-10">
          ${o.emergencyEscrowFrozen?`
            <span class="px-3 py-1.5 rounded-xl bg-red-600/90 text-white font-black text-xs border border-red-400 animate-pulse flex items-center gap-1.5">
              <i class="fa-solid fa-lock"></i> ESCROW FROZEN
            </span>
          `:`
            <span class="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-emerald-400"></i> Platform Active (90/5/5 Split)
            </span>
          `}
          <button onclick="window.triggerDbBackup()" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer shadow-xs">
            <i class="fa-solid fa-database text-rose-400"></i> ${n==="am"?"ዳታቤዝ ምትክ":"Backup DB"}
          </button>
          <button onclick="window.exportPlatformData('json')" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md">
            <i class="fa-solid fa-file-export"></i> ${n==="am"?"መረጃ አውርድ":"Export JSON"}
          </button>
        </div>
      </div>

      <!-- Super Admin Navigation Pills (10 Governance Panels) -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar text-xs font-bold">
        <button onclick="window.setSuperAdminTab('users')" class="cat-pill ${e==="users"?"active":""}">
          <i class="fa-solid fa-users-gear text-rose-500"></i>
          <span>${a.tabUserMaster} (${r.length})</span>
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
          <span>${a.tabFinancialOversight} (${u.filter(v=>v.status==="Pending").length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('audit')" class="cat-pill ${e==="audit"?"active":""}">
          <i class="fa-solid fa-clipboard-list text-blue-500"></i>
          <span>${a.tabAuditLogs} (${i.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('zones')" class="cat-pill ${e==="zones"?"active":""}">
          <i class="fa-solid fa-map-location-dot text-teal-500"></i>
          <span>${a.tabZones} (${l.length})</span>
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
      ${na(n,e,T,t,S,o,E,s,l,d,u,h,x)}

    </div>
  `}function na(n,e,t,s,a,r,o,i,l,d,u,h,x){switch(e){case"users":return He(n,t,s,a);case"permissions":return la(n);case"config":return da(n,r);case"financials":return ca(n,u);case"audit":return pa(n,o,i);case"zones":return ua(n,l);case"feature_flags":return ma(n,d);case"emergency":return fa(n,r,x);case"rules":return ga(n,h);case"db_ops":return ba(n);default:return He(n,t,s,a)}}function He(n,e,t,s){const a=W[n];return`
    <div class="space-y-6">
      
      <!-- User Summary & Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${n==="am"?"የተጠቃሚዎች ሙሉ አስተዳደር እና አዲስ መመዝገቢያ":"User Master Directory & Role Management"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${n==="am"?"ሁሉንም አርሶ አደሮች፣ ገዢዎች፣ ሹፌሮች እና አድሚኖች በቀጥታ ይመዝግቡ፣ ያርትዑ ወይም በእነርሱ ስም ይግቡ።":"Direct manual onboarding, full CRUD mutations, and 1-click live user impersonation."}
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
                      <div class="w-8 h-8 rounded-full ${ha(r.role)} flex items-center justify-center font-bold text-xs shrink-0">
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
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${va(r.role)}">
                      ${xa(r.role)} ${r.role.toUpperCase()}
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
  `}function la(n){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${n==="am"?"የሚናዎች እና ፈቃዶች ማትሪክስ (RBAC Matrix)":"Role-Based Access Control & Permission Matrix"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${n==="am"?"ለእያንዳንዱ አድሚን እና ኤጀንት የሚሰጡ ልዩ ፈቃዶችን ያስተካክሉ።":"Define and grant granular capabilities for Marketplace Admins, Field Extension Agents, and Financial Auditors."}
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
  `}function da(n,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${n==="am"?"የሲስተም ውቅር እና የቴሌብር ክፍያ ዋስትና ክፍፍል (Escrow 90/5/5)":"Platform Configuration & Escrow Split Governance"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${n==="am"?"የገበሬው፣ የአጓጓዡ እና የሲስተሙን የክፍያ መቶኛ እና የቴሌብር ኤፒአይ ቁልፎችን ያስተካክሉ።":"Control escrow splits, Telebirr merchant credentials, Twilio SMS keys, and geocoding settings."}
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
  `}function ca(n,e){const t=e.filter(s=>s.status==="Pending");return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${n==="am"?"የፋይናንስ ቁጥጥር እና ከፍተኛ ክፍያዎች ማረጋገጫ":"Financial Oversight & High-Value Payout Authorizations"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${n==="am"?"ከ50,000 ብር በላይ የሆኑ የጅምላ ክፍያዎች በዋና አድሚን ይፈቀዳሉ።":"Multi-sig authorization queue for high-volume transactions, commission reconciliation, and tax summaries."}
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
  `}function pa(n,e,t){return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${n==="am"?"የሲስተም ኦዲት መዝገብ እና የደህንነት ክትትል":"System-Wide Immutable Audit Trail & Security Monitor"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${n==="am"?"የአድሚን፣ የዋና አድሚን እና የሲስተም እንቅስቃሴዎችን በሙሉ በዝርዝር ይመልከቱ።":"Real-time tamper-evident logs of administrative actions, user mutations, escrow adjustments, and logins."}
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
                    <span class="px-2 py-0.5 rounded text-[10px] font-black ${ya(s.category)}">
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
  `}function ua(n,e){return`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${n==="am"?"የማድረሻ ዞኖች እና የፖስትጂአይኤስ (PostGIS) ድንበሮች":"Multi-Region Delivery Clusters & PostGIS Spatial Geofencing"}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${n==="am"?"የገጠር አርሶ አደሮች ማበረታቻ ክፍያ እና የማድረሻ ራዲየስን ያስተካክሉ።":"Configure regional delivery radius, PostGIS GPS bounds, and rural route subsidy incentives."}
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
  `}function ma(n,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${n==="am"?"የባህሪያት ማብሪያ/ማጥፊያ እና የክልላዊ ሙከራዎች":"Feature Flags & Regional Rollout Management"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${n==="am"?"አዳዲስ የሲስተም አገልግሎቶችን በቅድሚያ ለተመረጡ ክልሎች ወይም ተጠቃሚዎች ይልቀቁ።":"Instantly toggle platform capabilities in real time without redeploying code."}
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
  `}function fa(n,e,t){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-red-950">
          ${n==="am"?"የአደጋ ጊዜ መቆጣጠሪያ እና ዓለም አቀፍ እገዳ (Killswitch)":"Emergency Killswitches & Global Blacklist"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${n==="am"?"የአደጋ ጊዜ የክፍያ ዋስትና እገዳ እና አጠራጣሪ ተጠቃሚዎችን የማገድ እርምጃዎች።":"Immediate emergency transaction freeze and global blacklisting of fraudulent phone numbers or National IDs."}
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
  `}function ga(n,e){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${n==="am"?"አጠቃላይ የግብይት እና የዋጋ ደንቦች":"Global Marketplace Trading Rules & Pricing Caps"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${n==="am"?"አነስተኛ እና ከፍተኛ የትዕዛዝ መጠን እና የዋጋ ገደቦችን ያስተካክሉ።":"Establish wholesale order size thresholds, dynamic price floor/ceiling variances, and delivery radius constraints."}
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
  `}function ba(n){return`
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${n==="am"?"የዳታቤዝ ክዋኔዎች እና የሲስተም ጤና":"PostgreSQL 16 Database Operations & Infrastructure Health"}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${n==="am"?"የዳታቤዝ ግንኙነቶችን፣ የትራንዛክሽን ቅጂዎችን እና የሲስተም ፍጥነትን ይቆጣጠሩ።":"Database connection pool metrics, automated snapshots, and live telemetry."}
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
  `}function ha(n){switch(n){case"superadmin":return"bg-rose-100 text-rose-800";case"admin":return"bg-purple-100 text-purple-800";case"farmer":return"bg-emerald-100 text-emerald-800";case"buyer":return"bg-blue-100 text-blue-800";case"driver":return"bg-amber-100 text-amber-800";case"agent":return"bg-teal-100 text-teal-800";default:return"bg-slate-100 text-slate-800"}}function va(n){switch(n){case"superadmin":return"bg-rose-100 text-rose-900 border border-rose-300";case"admin":return"bg-purple-100 text-purple-900 border border-purple-300";case"farmer":return"bg-emerald-100 text-emerald-900 border border-emerald-300";case"buyer":return"bg-blue-100 text-blue-900 border border-blue-300";case"driver":return"bg-amber-100 text-amber-900 border border-amber-300";case"agent":return"bg-teal-100 text-teal-900 border border-teal-300";default:return"bg-slate-100 text-slate-800"}}function xa(n){switch(n){case"superadmin":return'<i class="fa-solid fa-crown text-rose-600"></i>';case"admin":return'<i class="fa-solid fa-shield-halved text-purple-600"></i>';case"farmer":return'<i class="fa-solid fa-seedling text-emerald-600"></i>';case"buyer":return'<i class="fa-solid fa-shopping-basket text-blue-600"></i>';case"driver":return'<i class="fa-solid fa-truck-fast text-amber-600"></i>';case"agent":return'<i class="fa-solid fa-users-gear text-teal-600"></i>';default:return'<i class="fa-solid fa-user"></i>'}}function ya(n){switch(n){case"USER_CRUD":return"bg-rose-100 text-rose-800";case"CONFIG":return"bg-purple-100 text-purple-800";case"FINANCE":return"bg-emerald-100 text-emerald-800";case"DISPUTE":return"bg-amber-100 text-amber-800";case"EMERGENCY":return"bg-red-100 text-red-800";case"IMPERSONATION":return"bg-blue-100 text-blue-800";default:return"bg-slate-100 text-slate-800"}}function wa(n,e=!1,t=!1,s=null,a=!1,r=!1){return`
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
    ${t&&s?(()=>{const o=p.getUserById(s);return o?`
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
  `}const Ae=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Sa(n,e){return`<button onclick="window.setBuyerAccountTab('${n.id}')" class="account-nav-item ${e===n.id?"active":""}">
    <i class="fa-solid ${n.icon} w-5 text-center"></i><span>${n.label}</span>
  </button>`}function ka(n,e){const t=e.filter(a=>!["delivered","cancelled"].includes(a.status)),s=e.filter(a=>a.status==="delivered").length;return`<div class="space-y-6 animate-fade-in">
    <div class="account-welcome">
      <div><p class="account-kicker">BUYER ACCOUNT</p><h1>Good morning, ${n.name.split(" ")[0]}</h1><p>Everything you need to source, receive, and manage your produce orders.</p></div>
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
  </div>`}function Aa(n){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR ACCOUNT</p><h1>Profile & personalization</h1><p>Keep your identity and delivery preferences up to date.</p></div>
    <section class="account-section"><div class="profile-header"><div class="avatar-large">${n.name.charAt(0).toUpperCase()}</div><div><h2>${n.name}</h2><p>${n.phone} · ${n.region||"Ethiopia"}</p></div><button class="btn-secondary ml-auto" onclick="window.showAccountToast('Avatar upload is ready for blob storage integration.','fa-image')"><i class="fa-solid fa-camera"></i> Change photo</button></div>
      <form onsubmit="event.preventDefault(); window.saveBuyerProfile()" class="account-form"><label>Full name<input name="name" value="${n.name}" required /></label><label>Amharic name<input name="nameAm" value="${n.nameAm||""}" placeholder="Optional" /></label><label>Region<input name="region" value="${n.region||"Addis Ababa"}" required /></label><label>Email<input type="email" name="email" value="${n.email||""}" placeholder="Optional" /></label><label>Preferred currency<select name="currency"><option>ETB - Ethiopian Birr</option><option>USD - US Dollar</option><option>EUR - Euro</option></select></label><label>Preferred language<select name="languagePreference"><option value="en" ${n.languagePreference==="en"?"selected":""}>English</option><option value="am" ${n.languagePreference==="am"?"selected":""}>Amharic</option></select></label>
        <div class="form-wide location-field"><div><span class="field-label">Default delivery address</span><input name="savedDeliveryAddress" value="${n.savedDeliveryAddress||""}" placeholder="Street, city, region" /><p>Order locations are captured separately at checkout.</p></div><button type="button" class="btn-secondary" onclick="window.captureBuyerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Use current location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save changes</button></div></form>
    </section></div>`}function $a(n){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">PURCHASE HISTORY</p><h1>My orders & shipping</h1><p>Track every delivery from farmer confirmation to your doorstep.</p></div><div class="account-tabs"><button class="selected">All <b>${n.length}</b></button><button>To pay <b>0</b></button><button>In transit <b>${n.filter(e=>["confirmed","picked_up"].includes(e.status)).length}</b></button><button>Delivered <b>${n.filter(e=>e.status==="delivered").length}</b></button><button>Disputed <b>${n.filter(e=>e.status==="disputed").length}</b></button></div><section class="account-section"><div class="account-list">${n.length?n.map(e=>`<div class="order-card"><div class="order-row"><div class="order-product"><span class="order-thumb"><i class="fa-solid fa-carrot"></i></span><div><strong>${e.productName}</strong><small>Order #${e.id.slice(0,8).toUpperCase()} · Farmer: ${e.farmerName}</small></div></div><span class="badge-status status-${e.status}">${e.status.replace("_"," ")}</span></div><div class="tracking-line"><span class="done"><i class="fa-solid fa-check"></i> Order placed</span><span class="${["confirmed","picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-check"></i> Farmer confirmed</span><span class="${["picked_up","delivered"].includes(e.status)?"done":""}"><i class="fa-solid fa-truck"></i> In transit</span><span class="${e.status==="delivered"?"done":""}"><i class="fa-solid fa-house"></i> Delivered</span></div><div class="order-footer"><span>${e.qtyKg} kg · ${e.totalEtb.toLocaleString()} ETB</span><span>Payment: ${e.paymentRef||"Telebirr escrow"}</span><button class="text-action" onclick="window.showAccountToast('Live driver location will appear here when assigned.','fa-map-location-dot')">Track delivery <i class="fa-solid fa-arrow-right"></i></button></div></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-box-open"></i><p>Your order history will appear here.</p></div>'}</div></section></div>`}function Ta(n,e,t){var o;if(n==="addresses")return Ea(t.addresses);if(n==="payments")return Ca(t.paymentMethods);if(n==="disputes")return Ia(e);const a={coupons:{kicker:"SAVINGS",title:"My coupons",description:"Use platform, farmer, and referral rewards at checkout.",icon:"fa-ticket",rows:t.coupons.length?t.coupons.map(i=>`${i.code} · ${i.value}${i.discountType==="Percent"?"%":" ETB"} · Expires ${new Date(i.expiresAt).toLocaleDateString()}`):["No coupons are currently available · Coupons will appear here when issued by the platform or a farmer"]},addresses:{kicker:"DELIVERY",title:"Saved addresses",description:"Manage shipping destinations with flexible Ethiopian address details.",icon:"fa-location-dot",rows:t.addresses.length?t.addresses.map(i=>`${i.name} · ${i.street}, ${i.city}, ${i.region}${i.isDefaultShipping?" · Default shipping":""}`):["No saved addresses yet · Add your first address to speed up checkout"]},payments:{kicker:"CHECKOUT",title:"Payment methods",description:"Payment details stay with Telebirr or Chapa. This account shows references attached to your orders.",icon:"fa-wallet",rows:t.paymentMethods.length?t.paymentMethods.map(i=>`${i.provider} · ${i.maskedDisplay||"Provider token linked"}${i.isPrimary?" · Primary":""}`):e.length?e.map(i=>`${i.paymentRef||"Payment reference pending"} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.totalEtb.toLocaleString()} ETB`):["No payment methods are linked yet"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Open a case for an order that was damaged, missing, wrong, or below quality.",icon:"fa-rotate-left",rows:e.filter(i=>i.status==="disputed").length?e.filter(i=>i.status==="disputed").map(i=>`${i.productName} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.disputeStatus||"Under review"}`):["No open disputes · Refunds return through the original Telebirr or Chapa method","Dispute window: 3 days after delivery · Proof supports up to 5 images and 1 video"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Choose how Farmer-to-Market keeps you informed and how your data is used.",icon:"fa-sliders",rows:t.notificationPreferences.length?t.notificationPreferences.map(i=>`${i.eventType} · SMS ${i.smsEnabled?"on":"off"} · In-app ${i.inAppEnabled?"on":"off"}`):["No notification preferences saved yet · Defaults are applied by the server"]},security:{kicker:"PROTECTION",title:"Security",description:"Keep your account protected with password, two-factor authentication, and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the form below",`Two-factor authentication · ${(o=t.twoFactor)!=null&&o.isEnabled?`${t.twoFactor.method} enabled`:"Not enabled"}`,`Active sessions · ${t.sessions.length} active session${t.sessions.length===1?"":"s"}`]}}[n],r=n==="security"?'<form onsubmit="event.preventDefault(); window.changeBuyerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required /></label><label>New password<input type="password" name="newPassword" minlength="8" required /></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form><button class="btn-secondary mt-4" onclick="window.revokeBuyerSessions()"><i class="fa-solid fa-right-from-bracket"></i> Log out all other sessions</button>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${a.kicker}</p><h1>${a.title}</h1><p>${a.description}</p></div><section class="account-section"><div class="module-list">${a.rows.map(i=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${a.icon}"></i></span><div><strong>${i.split(" · ")[0]}</strong><p>${i.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div></div>`).join("")}</div>${r}</section></div>`}function Ea(n){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">DELIVERY</p><h1>Saved addresses</h1><p>Manage shipping destinations. Postal codes remain optional.</p></div><section class="account-section"><div class="module-list">${n.length?n.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid fa-location-dot"></i></span><div><strong>${e.name} ${e.isDefaultShipping?'<em class="account-badge">Default shipping</em>':""}</strong><p>${e.street}, ${e.city}, ${e.region}, ${e.country}<br>${e.phone}${e.postalCode?` · ${e.postalCode}`:""}</p></div><button class="icon-button" title="Delete address" onclick="window.deleteBuyerAddress('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-location-dot"></i><p>No saved addresses yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerAddress()" class="account-form mt-6"><label>Address name<input name="name" placeholder="Wholesale hub" required></label><label>Phone<input name="phone" placeholder="+251 9•• ••• •••" required></label><label>Street<input name="street" required></label><label>City<input name="city" required></label><label>Region<input name="region" required></label><label>Postal code<input name="postalCode" placeholder="Optional"></label><label>Country<input name="country" value="Ethiopia" required></label><label class="flex items-center gap-2"><input type="checkbox" name="isDefaultShipping"> Default shipping</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-plus"></i> Add address</button></div></form></section></div>`}function Ca(n){return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">CHECKOUT</p><h1>Payment methods</h1><p>Use Telebirr or Chapa hosted tokenization. Raw card numbers never reach this app.</p></div><section class="account-section"><div class="module-list">${n.length?n.map(e=>`<div class="module-row"><span class="module-icon"><i class="fa-solid ${e.provider==="Telebirr"?"fa-mobile-screen-button":"fa-credit-card"}"></i></span><div><strong>${e.provider} ${e.isPrimary?'<em class="account-badge">Primary</em>':""}</strong><p>${e.maskedDisplay||"Provider token linked"}${e.brand?` · ${e.brand}`:""}</p></div>${e.isPrimary?"":`<button class="icon-button" title="Set primary" onclick="window.setPrimaryBuyerPayment('${e.id}')"><i class="fa-solid fa-star"></i></button>`}<button class="icon-button" title="Remove payment method" onclick="window.deleteBuyerPayment('${e.id}')"><i class="fa-solid fa-trash"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-wallet"></i><p>No payment methods linked yet.</p></div>'}</div><form onsubmit="event.preventDefault(); window.addBuyerPayment()" class="account-form mt-6"><label>Provider<select name="provider"><option>Telebirr</option><option>Chapa</option></select></label><label>Provider token<input name="providerToken" placeholder="Paste hosted-provider token" required></label><label>Masked display<input name="maskedDisplay" placeholder="•••• 4242" required></label><label>Brand<input name="brand" placeholder="Visa / Telebirr"></label><label>Expiry month<input type="number" name="expiryMonth" min="1" max="12"></label><label>Expiry year<input type="number" name="expiryYear" min="2026"></label><label class="flex items-center gap-2"><input type="checkbox" name="isPrimary"> Set as primary</label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-link"></i> Link payment method</button></div></form></section></div>`}function Ia(n){const e=n.filter(t=>{var s;return t.status==="delivered"||t.status==="disputed"||((s=t.disputeStatus)==null?void 0:s.startsWith("Resolved"))});return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">RESOLUTION CENTER</p><h1>Refunds & disputes</h1><p>Submit a claim for a delivered order. Refunds return through the original payment provider.</p></div><section class="account-section"><div class="module-list">${e.length?e.map(t=>{var s;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${t.disputeStatus==="ResolvedRefundBuyer"?"fa-money-bill-transfer":"fa-box-open"}"></i></span><div><strong>${t.productName}</strong><p>Order #${t.id.slice(0,8).toUpperCase()} · ${t.disputeStatus==="ResolvedRefundBuyer"?"Refunded to original payment method":t.disputeStatus||(t.status==="disputed"?"Under review":"Eligible for dispute")}</p></div>${t.status==="delivered"&&!((s=t.disputeStatus)!=null&&s.startsWith("Resolved"))?`<button class="btn-secondary" onclick="window.submitBuyerDispute('${t.id}')"><i class="fa-solid fa-flag"></i> Open dispute</button>`:""}</div>`}).join(""):'<div class="empty-account"><i class="fa-solid fa-circle-check"></i><p>No delivered orders are currently eligible for a dispute.</p></div>'}</div></section></div>`}function Pa(n,e,t,s,a){const r=Ae.find(i=>i.id===s)||Ae[0];let o=s==="overview"?ka(e,t):s==="profile"?Aa(e):s==="orders"?$a(t):Ta(s,t,a);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${Ae.map((i,l)=>`${i.group&&(l===0||Ae[l-1].group!==i.group)?`<p class="account-nav-group">${i.group}</p>`:""}${Sa(i,s)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Need a hand?</strong><span>Visit the Help Center</span><button onclick="window.showAccountToast('Help Center CMS content will open here.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('marketplace')">Marketplace</button><i class="fa-solid fa-chevron-right"></i><span>${r.label}</span></div>${o}</main></div>`}const $e=[{id:"overview",label:"Account overview",icon:"fa-grid-2"},{id:"profile",label:"Profile & personalization",icon:"fa-user-pen",group:"Your account"},{id:"orders",label:"My orders & tracking",icon:"fa-box-open",group:"Your account"},{id:"coupons",label:"My coupons",icon:"fa-ticket"},{id:"addresses",label:"Saved addresses",icon:"fa-location-dot"},{id:"payments",label:"Payment methods",icon:"fa-wallet"},{id:"disputes",label:"Refunds & disputes",icon:"fa-rotate-left"},{id:"settings",label:"Account settings",icon:"fa-sliders",group:"Preferences"},{id:"security",label:"Security",icon:"fa-shield-halved"}];function Ra(n,e){return`<button onclick="window.setFarmerAccountTab('${n.id}')" class="account-nav-item ${e===n.id?"active":""}"><i class="fa-solid ${n.icon} w-5 text-center"></i><span>${n.label}</span></button>`}function Na(n){return`<section class="account-section"><div class="section-heading"><div><p class="account-kicker">SELLER CENTER</p><h2>My produce posts</h2></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="module-list mt-5">${n.length?n.map(e=>`<div class="module-row"><span class="order-thumb"><img src="${e.photos[0]}" alt="${e.productName}" class="w-full h-full object-cover rounded-lg"></span><div><strong>${e.productName}</strong><p>${e.qtyKg.toLocaleString()} kg available · ${e.pricePerKg} ETB/kg · ${e.status}</p></div><button class="icon-button" title="Delete post" onclick="window.deleteFarmerListing('${e.id}')"><i class="fa-solid fa-trash text-rose-600"></i></button></div>`).join(""):'<div class="empty-account"><i class="fa-solid fa-seedling"></i><p>You have no active produce posts.</p></div>'}</div></section>`}function Pe(n,e,t){const s=t.filter(i=>{var l;return i.status==="disputed"||((l=i.disputeStatus)==null?void 0:l.startsWith("Resolved"))});if(n==="profile")return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">YOUR FARM ACCOUNT</p><h1>Profile & personalization</h1><p>Update the public identity buyers see and your farm operating region.</p></div><section class="account-section"><div class="profile-header"><div class="avatar-large">${e.name.charAt(0).toUpperCase()}</div><div><h2>${e.name}</h2><p>${e.phone} · ${e.region}</p></div><span class="account-badge">${e.verified?"Verified farmer":"Verification pending"}</span></div><form onsubmit="event.preventDefault(); window.saveFarmerProfile()" class="account-form"><label>Full name<input name="name" value="${e.name}" required></label><label>Amharic name<input name="nameAm" value="${e.nameAm||""}" placeholder="Optional"></label><label>Farm region<input name="region" value="${e.region||""}" required></label><label>Email<input type="email" name="email" value="${e.email||""}" placeholder="Optional"></label><label>Preferred language<select name="languagePreference"><option value="en" ${e.languagePreference==="en"?"selected":""}>English</option><option value="am" ${e.languagePreference==="am"?"selected":""}>Amharic</option></select></label><label>Primary produce<input name="primaryCrop" value="${e.primaryCrop||""}" placeholder="Tomatoes, teff, coffee"></label><div class="form-wide location-field"><div><span class="field-label">Farm pickup address</span><input name="savedDeliveryAddress" value="${e.savedDeliveryAddress||""}" placeholder="Woreda, kebele, pickup details"><p>Buyers and drivers use this as the default farm location.</p></div><button type="button" class="btn-secondary" onclick="window.captureFarmerLocation()"><i class="fa-solid fa-location-crosshairs"></i> Capture location</button></div><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-check"></i> Save profile</button></div></form></section></div>`;const r={orders:{kicker:"FULFILLMENT",title:"Orders & tracking",description:"Orders appear here after buyers pay. Confirm them so available drivers can pick them up.",icon:"fa-box-open",rows:t.length?t.map(i=>`${i.productName} · ${i.qtyKg} kg · ${i.status.replace("_"," ")}`):["No buyer orders yet"]},coupons:{kicker:"SELLER SAVINGS",title:"My coupons",description:"Farmer-issued coupon management will use your payout share.",icon:"fa-ticket",rows:["No farmer-issued coupons yet · Coupon creation API is ready for the next seller release"]},addresses:{kicker:"FARM LOCATION",title:"Saved addresses",description:"Manage farm pickup locations and operating regions.",icon:"fa-location-dot",rows:[`${e.region} · Farm pickup region`,"Additional pickup-address management is pending the farm-location API"]},payments:{kicker:"PAYOUTS",title:"Payment methods",description:"Manage the Telebirr payout destination for your 90% settlement.",icon:"fa-wallet",rows:[`Telebirr payout · ${e.phone} · 90% farmer share`,"Bank fallback · Not configured"]},disputes:{kicker:"RESOLUTION CENTER",title:"Refunds & disputes",description:"Respond to buyer claims and track payout impact.",icon:"fa-rotate-left",rows:s.length?s.map(i=>`${i.productName} · Order #${i.id.slice(0,8).toUpperCase()} · ${i.disputeStatus==="ResolvedRefundBuyer"?"Refunded to buyer":i.disputeStatus||"Under review"}`):["No buyer disputes"]},settings:{kicker:"PREFERENCES",title:"Account settings",description:"Configure seller notifications and auto-accept preferences.",icon:"fa-sliders",rows:["Order updates · In-app notifications on","Dispute updates · SMS on","Auto-accept orders · Configure quantity threshold"]},security:{kicker:"PROTECTION",title:"Security",description:"Protect your farmer account with password and session controls.",icon:"fa-shield-halved",rows:["Password · Change it through the security form","Two-factor authentication · SMS recommended","Active sessions · Manage from the security API"]}}[n],o=n==="security"?'<form onsubmit="event.preventDefault(); window.changeFarmerPassword()" class="account-form mt-6"><label>Current password<input type="password" name="currentPassword" required></label><label>New password<input type="password" name="newPassword" minlength="8" required></label><div class="form-wide flex justify-end"><button class="btn-primary" type="submit"><i class="fa-solid fa-key"></i> Change password</button></div></form>':"";return`<div class="space-y-6 animate-fade-in"><div class="account-page-title"><p class="account-kicker">${r.kicker}</p><h1>${r.title}</h1><p>${r.description}</p></div><section class="account-section"><div class="module-list">${r.rows.map((i,l)=>{var d;return`<div class="module-row"><span class="module-icon"><i class="fa-solid ${r.icon}"></i></span><div><strong>${i.split(" · ")[0]}</strong><p>${i.split(" · ").slice(1).join(" · ")||"Ready to configure"}</p></div>${n==="orders"&&((d=t[l])==null?void 0:d.status)==="pending"?`<button class="btn-secondary" onclick="window.confirmFarmerOrder('${t[l].id}')"><i class="fa-solid fa-check"></i> Confirm</button>`:""}</div>`}).join("")}</div>${o}</section></div>`}function Da(n,e,t,s,a,r=!1,o=[]){const i=$e.find(d=>d.id===a)||$e[0],l=a==="overview"?`<div class="space-y-6 animate-fade-in"><div class="account-welcome"><div><p class="account-kicker">FARMER ACCOUNT</p><h1>Welcome back, ${e.name.split(" ")[0]}</h1><p>Manage your produce posts, buyer orders, and payouts.</p></div><button class="btn-primary" onclick="window.toggleCreateListingModal()"><i class="fa-solid fa-plus"></i> Post produce</button></div><div class="account-stat-grid"><div class="account-stat"><span class="stat-icon green"><i class="fa-solid fa-seedling"></i></span><div><strong>${t.length}</strong><span>Active posts</span></div></div><div class="account-stat"><span class="stat-icon blue"><i class="fa-solid fa-box"></i></span><div><strong>${s.filter(d=>d.status==="pending").length}</strong><span>New orders</span></div></div><div class="account-stat"><span class="stat-icon gold"><i class="fa-solid fa-truck"></i></span><div><strong>${s.filter(d=>d.status==="picked_up").length}</strong><span>In transit</span></div></div><div class="account-stat"><span class="stat-icon rose"><i class="fa-solid fa-hand-holding-dollar"></i></span><div><strong>${(e.walletBalanceEtb||0).toLocaleString()}</strong><span>Wallet ETB</span></div></div></div>${Na(t)}</div>`:Pe(a==="profile"?"profile":a==="orders"?"orders":a,e,s);return`<div class="buyer-account-layout"><aside class="account-sidebar"><div class="account-sidebar-profile"><div class="avatar-medium">${e.name.charAt(0).toUpperCase()}</div><div><strong>${e.name}</strong><span>${e.phone}</span></div></div><div class="account-nav">${$e.map((d,u)=>`${d.group&&(u===0||$e[u-1].group!==d.group)?`<p class="account-nav-group">${d.group}</p>`:""}${Ra(d,a)}`).join("")}</div><div class="account-sidebar-help"><i class="fa-solid fa-headset"></i><strong>Farmer support</strong><span>Get help with orders and payouts</span><button onclick="window.showAccountToast('Support center integration is available from the farmer portal.','fa-circle-question')">Get help <i class="fa-solid fa-arrow-right"></i></button></div></aside><main class="account-content"><div class="account-breadcrumb"><button onclick="window.navigateTab('farmer')">Farmer dashboard</button><i class="fa-solid fa-chevron-right"></i><span>${i.label}</span></div>${l}</main>${r?Ge(n):""}</div>`}function b(n,e="fa-circle-check",t="border-emerald-500"){const s=document.getElementById("toast-container");if(!s)return;const a=document.createElement("div");a.className=`toast-msg border-l-4 ${t} shadow-2xl`,a.innerHTML=`
    <i class="fa-solid ${e} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${n}</span>
  `,s.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(100%)",a.style.transition="all 0.3s ease-out",setTimeout(()=>a.remove(),300)},3500)}class _a{constructor(){g(this,"lang",localStorage.getItem("lang")||"en");g(this,"activeTab","marketplace");g(this,"activeCategory","All");g(this,"selectedRegion","All");g(this,"searchQuery","");g(this,"cart",[]);g(this,"isCartOpen",!1);g(this,"isNotificationsModalOpen",!1);g(this,"isCreateListingModalOpen",!1);g(this,"activeOrderModal",null);g(this,"activeTelebirrModal",null);g(this,"activeDisputeModal",null);g(this,"activeProduceModalId",null);g(this,"activeProducePhotoIndex",0);g(this,"produceOrderQty",50);g(this,"activeLegalDocModal",null);g(this,"maxDistanceKm",0);g(this,"activeGrade","All");g(this,"activeRipeness","All");g(this,"organicOnly",!1);g(this,"advanceOnly",!1);g(this,"activeBuyerSubTab","marketplace");g(this,"activeBuyerAccountTab","overview");g(this,"activeFarmerAccountTab","overview");g(this,"activeFarmerTab","listings");g(this,"activeAdminTab","disputes");g(this,"activeSuperAdminTab","users");g(this,"superAdminUserRoleFilter","all");g(this,"superAdminAuditCategoryFilter","all");g(this,"isSuperAdminCreateUserModalOpen",!1);g(this,"isSuperAdminEditUserModalOpen",!1);g(this,"editTargetUserId",null);g(this,"isSuperAdminAddZoneModalOpen",!1);g(this,"isSuperAdminAddBlacklistModalOpen",!1);g(this,"isRecordingVoice",!1);g(this,"voiceRecordTimer",null);g(this,"isAuthModalOpen",!1);g(this,"authMode","login");g(this,"otpStep",!1);g(this,"pendingPhone","");g(this,"lastSentCode","");g(this,"matchedUserName","");g(this,"matchedUserRole","");g(this,"authErrorMessage","");g(this,"agentView",new ea(this.lang));g(this,"verificationWizardModal",new ta(this.lang));this.init()}async init(){this.attachGlobalWindowHandlers(),de.startConnection(p.getToken()||void 0),de.onOrderStatusChanged(async(a,r,o)=>{console.log(`[SignalR] Order ${a} → ${r}: ${o}`),this.activeOrderModal&&this.activeOrderModal.id===a&&(this.activeOrderModal.status=r),b(`Order #${a.slice(0,8).toUpperCase()} → ${r.toUpperCase()}`,"fa-bolt","border-blue-500"),await p.refreshAllData(),this.render()}),de.onNewFarmerOrder((a,r,o)=>{b(`🌾 New order! ${o}kg of ${r} — check your dashboard`,"fa-basket-shopping","border-amber-500"),p.refreshAllData().then(()=>this.render())}),de.onDeliveryConfirmed((a,r,o)=>{const i=p.getCurrentUser();(i==null?void 0:i.role)==="farmer"?b(`💰 ${r.toLocaleString()} ETB released to your wallet!`,"fa-hand-holding-dollar","border-emerald-500"):(i==null?void 0:i.role)==="driver"&&b(`💰 ${o.toLocaleString()} ETB delivery fee credited!`,"fa-hand-holding-dollar","border-emerald-500"),p.refreshAllData().then(()=>this.render())}),de.setPollingCallback(async a=>{await p.refreshAllData(),this.render()});const e=p.getCurrentUser();e&&e.role,de.onOrderTracking(a=>{const r=document.getElementById(`eta-${a.orderId}`);r&&a.estimatedArrivalMin!=null&&a.estimatedArrivalMin>0&&(r.textContent=`~${a.estimatedArrivalMin} min`)});const t=()=>{const a=document.getElementById("signalr-status-badge");if(!a)return;const r=de.getConnectionState(),o={connected:{dot:"bg-emerald-500",label:"Live",cls:"bg-emerald-50 text-emerald-800 border-emerald-300"},reconnecting:{dot:"bg-amber-400",label:"Reconnecting",cls:"bg-amber-50 text-amber-800 border-amber-300"},polling:{dot:"bg-sky-400",label:"Polling",cls:"bg-sky-50 text-sky-800 border-sky-300"},disconnected:{dot:"bg-slate-400",label:"Offline",cls:"bg-slate-50 text-slate-500 border-slate-200"}},i=o[r]||o.disconnected;a.className=`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${i.cls}`,a.innerHTML=`<span class="w-1.5 h-1.5 rounded-full ${i.dot} inline-block"></span> ${i.label}`};setInterval(t,3e3),t(),p.subscribe(()=>{this.render()}),await p.refreshAllData();const s=p.getCurrentUser();s&&(s.role==="superadmin"?this.activeTab="superadmin":s.role==="farmer"?this.activeTab="farmer":s.role==="driver"?this.activeTab="driver":s.role==="admin"?this.activeTab="admin":this.activeTab="marketplace"),this.render()}render(){var l;const e=document.getElementById("app");if(!e)return;const t=p.getCurrentUser(),s=p.isAuthenticated(),a=p.getNotifications(),r=a.filter(d=>!d.read).length;xe.setLanguage(this.lang);const o=p.getListings(this.activeCategory,this.selectedRegion,this.searchQuery,this.maxDistanceKm>0?this.maxDistanceKm:void 0,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly);let i="";if(this.activeTab==="farmer-account"&&s&&(t==null?void 0:t.role)==="farmer")i=Da(this.lang,t,p.getListings().filter(d=>d.farmerId===t.id),p.getOrders("farmer"),this.activeFarmerAccountTab,this.isCreateListingModalOpen,p.getPriceBenchmarks());else if(this.activeTab==="farmer"&&s&&(t==null?void 0:t.role)==="farmer"){const d=p.getListings().filter(x=>x.farmerId===t.id),u=p.getOrders("farmer"),h=p.getFarmerSummary();i=Qt(this.lang,d,u,h,this.isCreateListingModalOpen,this.activeFarmerTab,p.getPriceBenchmarks(),t)}else if(this.activeTab==="driver"&&s&&(t==null?void 0:t.role)==="driver"){const d=p.getOrders("driver"),u=p.getDriverSummary();i=Zt(this.lang,d,u,p.getOptimizedRoute(),t,p.getIsOfflineMode(),p.getOfflineQueue().length)}else if(this.activeTab==="superadmin"||s&&(t==null?void 0:t.role)==="superadmin"&&this.activeTab==="superadmin")i=oa(this.lang,this.activeSuperAdminTab,this.superAdminUserRoleFilter,this.superAdminAuditCategoryFilter);else if(this.activeTab==="admin"&&s&&(t==null?void 0:t.role)==="admin"){const d=p.getPlatformStats(),u=p.getOrders().filter(h=>{var x;return h.status==="disputed"&&!((x=h.disputeStatus)!=null&&x.startsWith("Resolved"))});i=Jt(this.lang,d,u,p.getAnomalyAlerts(),p.getKycQueue(),p.getRegionalAnalytics(),this.activeAdminTab)}else if(this.activeTab==="agent"||s&&(t==null?void 0:t.role)==="agent")this.agentView.setLanguage(this.lang),i=this.agentView.render();else if(this.activeTab==="account"&&s&&(t==null?void 0:t.role)==="buyer")i=Pa(this.lang,t,p.getOrders("buyer"),this.activeBuyerAccountTab,p.getAccountData());else{const d=p.getOrders("buyer");i=qt(this.lang,o,this.activeCategory,this.selectedRegion,this.searchQuery,this.cart,this.isCartOpen,this.activeOrderModal,this.activeTelebirrModal,this.activeDisputeModal,this.maxDistanceKm,this.activeGrade,this.activeRipeness,this.organicOnly,this.advanceOnly,this.activeBuyerSubTab,p.getStandingOrders(),d)}e.innerHTML=`
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

      ${Wt(this.lang,t,s,this.activeTab,this.cart,r,this.searchQuery)}
      
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
      ${this.isAuthModalOpen?sa(this.lang,this.authMode,this.otpStep,this.pendingPhone,this.lastSentCode,this.matchedUserName,this.matchedUserRole,this.authErrorMessage):""}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen?aa(this.lang,a):""}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

      <!-- Produce Post & Farm Details Modal -->
      ${(()=>{if(!this.activeProduceModalId)return"";const d=p.getListingById(this.activeProduceModalId);return d?(ke.setLanguage(this.lang),ke.setActivePhotoIndex(this.activeProducePhotoIndex),ke.setSelectedQtyKg(this.produceOrderQty),ke.render(d)):""})()}

      <!-- Official Legal Document Viewer Modal -->
      ${(l=this.activeLegalDocModal)!=null&&l.isOpen?`
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
      ${wa(this.lang,this.isSuperAdminCreateUserModalOpen,this.isSuperAdminEditUserModalOpen,this.editTargetUserId,this.isSuperAdminAddZoneModalOpen,this.isSuperAdminAddBlacklistModalOpen)}
    `}attachGlobalWindowHandlers(){const e=window;e.openProduceDetail=a=>{this.activeProduceModalId=a,this.activeProducePhotoIndex=0;const r=p.getListingById(a);this.produceOrderQty=(r==null?void 0:r.minOrderKg)||50,this.render()},e.closeProduceDetail=()=>{this.activeProduceModalId=null,this.render()},e.selectProducePhoto=a=>{this.activeProducePhotoIndex=a,this.render()},e.setProduceOrderQty=a=>{this.produceOrderQty=Math.max(1,a),this.render()},e.addProduceDetailToCart=(a,r)=>{const o=p.getListingById(a);if(!o)return;const i=r||this.produceOrderQty||o.minOrderKg||50,l=this.cart.find(d=>d.listing.id===a);l?l.qtyKg+=i:this.cart.push({listing:o,qtyKg:i}),this.activeProduceModalId=null,this.isCartOpen=!0,b(this.lang==="am"?`${i} ኪ.ግ ${o.nameAm||o.productName} ወደ ጋሪ ተጨምሯል`:`Added ${i} kg of ${o.productName} to bulk cart!`,"fa-cart-plus"),this.render()},e.buyProduceNow=(a,r)=>{const o=p.getListingById(a);if(!o)return;if(!p.isAuthenticated()){e.openAuthModal("login");return}this.activeProduceModalId=null;const i=r||this.produceOrderQty||o.minOrderKg||50,l=i*o.pricePerKg;this.activeTelebirrModal={isOpen:!0,totalEtb:l,listingId:a,qtyKg:i},this.render()},e.shareProduceListing=a=>{const r=p.getListingById(a);navigator.clipboard&&navigator.clipboard.writeText(window.location.href),b(`Copied direct produce link for ${(r==null?void 0:r.productName)||"listing"}!`,"fa-share-nodes","border-blue-500")},e.playSimulatedVoiceNote=a=>{const r=document.getElementById("voicePlayIcon-"+a),o=document.getElementById("voicePlayText-"+a);r&&o&&(r.className="fa-solid fa-spinner fa-spin text-[10px]",o.innerText="Playing Memo...",setTimeout(()=>{r.className="fa-solid fa-check text-[10px]",o.innerText="Memo Played",setTimeout(()=>{r.className="fa-solid fa-play text-[10px]",o.innerText="Play Voice Memo"},2500)},1800)),b("Playing farmer voice note recorded in Bishoftu farm hub.","fa-volume-high","border-emerald-500")},e.sendSmsInquiry=(a,r)=>{b(`Dispatched SMS inquiry for ${r} to ${a}`,"fa-paper-plane","border-emerald-500")},e.navigateTab=a=>{this.activeTab=a,this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setBuyerAccountTab=a=>{this.activeBuyerAccountTab=a,this.activeTab="account",p.fetchAccountData().then(()=>this.render()).catch(r=>b(r.message||"Could not load account data.","fa-circle-xmark","border-rose-500")),this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.setFarmerAccountTab=a=>{this.activeFarmerAccountTab=a,this.activeTab="farmer-account",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.deleteFarmerListing=async a=>{if(window.confirm("Delete this produce post? It will no longer be available for new orders."))try{await p.deleteListing(a),b("Produce post deleted.","fa-trash"),this.render()}catch(r){b(r.message||"Could not delete the produce post.","fa-circle-xmark","border-rose-500")}},e.changeFarmerPassword=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),b("Password changed successfully.","fa-shield-check"),a.reset()}catch(o){b(o.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}},e.saveFarmerProfile=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:a.dataset.defaultLat?Number(a.dataset.defaultLat):void 0,defaultDeliveryLng:a.dataset.defaultLng?Number(a.dataset.defaultLng):void 0}),b("Farmer profile saved to your account.","fa-circle-check"),this.render()}catch(o){b(o.message||"Could not save farmer profile.","fa-circle-xmark","border-rose-500")}},e.captureFarmerLocation=()=>{if(!navigator.geolocation){b("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(a=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(a.coords.latitude),r.dataset.defaultLng=String(a.coords.longitude)),b("Farm location captured. Save profile to persist it.","fa-location-crosshairs")},()=>b("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.showAccountToast=(a,r="fa-circle-check")=>{b(a,r,"border-emerald-500")},e.saveBuyerProfile=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.updateProfile({name:String(r.get("name")||""),nameAm:String(r.get("nameAm")||""),region:String(r.get("region")||""),email:String(r.get("email")||""),languagePreference:String(r.get("languagePreference")||""),savedDeliveryAddress:String(r.get("savedDeliveryAddress")||""),defaultDeliveryLat:a.dataset.defaultLat?Number(a.dataset.defaultLat):void 0,defaultDeliveryLng:a.dataset.defaultLng?Number(a.dataset.defaultLng):void 0}),b("Profile changes saved to your account.","fa-circle-check"),this.render()}catch(o){b(o.message||"Could not save your profile.","fa-circle-xmark","border-rose-500")}},e.captureBuyerLocation=()=>{if(!navigator.geolocation){b("Location is not available in this browser.","fa-location-dot","border-rose-500");return}navigator.geolocation.getCurrentPosition(a=>{const r=document.querySelector(".account-form");r&&(r.dataset.defaultLat=String(a.coords.latitude)),r&&(r.dataset.defaultLng=String(a.coords.longitude)),b("Location captured. Save changes to persist it.","fa-location-crosshairs")},()=>b("Location permission was not granted.","fa-location-dot","border-rose-500"))},e.changeBuyerPassword=async()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);try{await p.changePassword(String(r.get("currentPassword")||""),String(r.get("newPassword")||"")),b("Password changed successfully.","fa-shield-check"),a.reset()}catch(o){b(o.message||"Could not change your password.","fa-circle-xmark","border-rose-500")}};const t=async(a,r)=>{try{await a(),b(r,"fa-circle-check"),this.render()}catch(o){b(o.message||"Account action failed.","fa-circle-xmark","border-rose-500")}};e.addBuyerAddress=()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);t(()=>p.saveAddress({name:String(r.get("name")||""),phone:String(r.get("phone")||""),street:String(r.get("street")||""),city:String(r.get("city")||""),region:String(r.get("region")||""),postalCode:String(r.get("postalCode")||"")||null,country:String(r.get("country")||"Ethiopia"),isDefaultShipping:r.has("isDefaultShipping"),isDefaultBilling:!1}),"Address added.")},e.deleteBuyerAddress=a=>t(()=>p.deleteAddress(a),"Address deleted."),e.addBuyerPayment=()=>{const a=document.querySelector(".account-form");if(!a)return;const r=new FormData(a);t(()=>p.addPaymentMethod({provider:String(r.get("provider")||""),providerToken:String(r.get("providerToken")||""),maskedDisplay:String(r.get("maskedDisplay")||""),brand:String(r.get("brand")||"")||null,expiryMonth:Number(r.get("expiryMonth"))||null,expiryYear:Number(r.get("expiryYear"))||null,isPrimary:r.has("isPrimary")}),"Payment method linked.")},e.setPrimaryBuyerPayment=a=>t(()=>p.setPrimaryPaymentMethod(a),"Primary payment method updated."),e.deleteBuyerPayment=a=>t(()=>p.deletePaymentMethod(a),"Payment method removed."),e.submitBuyerDispute=a=>{const r=window.prompt("Reason: Item not received, Damaged, Wrong item, or Quality issue");r&&t(()=>p.disputeOrder(a,r,void 0,100),"Dispute submitted for review.")},e.revokeBuyerSessions=async()=>{try{await p.revokeOtherSessions(),b("Other sessions have been revoked.","fa-shield-check"),this.render()}catch(a){b(a.message||"Could not revoke sessions.","fa-circle-xmark","border-rose-500")}},e.toggleLanguage=()=>{this.lang=this.lang==="en"?"am":"en",localStorage.setItem("lang",this.lang),b(this.lang==="am"?"ቋንቋ ወደ አማርኛ ተቀይሯል":"Language switched to English","fa-globe"),this.render()},e.setBuyerSubTab=a=>{this.activeBuyerSubTab=a,this.render()},e.toggleFarmerTab=a=>{this.activeFarmerTab=a,this.render()},e.setAdminTab=a=>{this.activeAdminTab=a,this.render()},e.openInvoiceModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"invoice",orderId:a},this.render()},e.openContractModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"contract",orderId:a},this.render()},e.openWaybillModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"waybill",orderId:a},this.render()},e.openArbitrationModal=a=>{this.activeLegalDocModal={isOpen:!0,type:"arbitration",orderId:a},this.render()},e.closeLegalDocModal=()=>{this.activeLegalDocModal=null,this.render()},e.printOfficialDocument=()=>{window.print()},e.setMaxDistanceKm=a=>{this.maxDistanceKm=a,b(a===0?"Showing all produce across Ethiopia":`Filtering farms within ${a} km radius`,"fa-location-dot"),this.render()},e.setFilterGrade=a=>{this.activeGrade=a,this.render()},e.setFilterRipeness=a=>{this.activeRipeness=a,this.render()},e.toggleOrganicFilter=a=>{this.organicOnly=a,this.render()},e.toggleAdvanceFilter=a=>{this.advanceOnly=a,this.render()},e.setCategory=a=>{this.activeCategory=a,this.render()},e.resetFilters=()=>{this.activeCategory="All",this.selectedRegion="All",this.searchQuery="",this.maxDistanceKm=0,this.activeGrade="All",this.activeRipeness="All",this.organicOnly=!1,this.advanceOnly=!1,this.render()},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async a=>{var w,q,Q,Z,J,se,re,ee,te,y,K,U;a.preventDefault();const r=(w=document.getElementById("newProdName"))==null?void 0:w.value,o=(q=document.getElementById("newProdNameAm"))==null?void 0:q.value,i=((Q=document.getElementById("newCategory"))==null?void 0:Q.value)||"Vegetables",l=Number(((Z=document.getElementById("newQtyKg"))==null?void 0:Z.value)||1e3),d=Number(((J=document.getElementById("newPricePerKg"))==null?void 0:J.value)||45),u=Number(((se=document.getElementById("newMinOrderKg"))==null?void 0:se.value)||50),h=((re=document.getElementById("newGrade"))==null?void 0:re.value)||"Grade 1",x=((ee=document.getElementById("newRipeness"))==null?void 0:ee.value)||"Ready Today",T=((te=document.getElementById("newIsAdvanceHarvest"))==null?void 0:te.checked)||!1,E=((y=document.getElementById("newExpectedHarvestDate"))==null?void 0:y.value)||void 0,S=((U=(K=document.getElementById("voiceTranscriptText"))==null?void 0:K.innerText)==null?void 0:U.replace(/^"|"$/g,""))||void 0,v=p.getCurrentUser(),j=await p.createListing({productName:r,nameAm:o||void 0,category:i,qtyKg:l,pricePerKg:d,minOrderKg:u,grade:h,ripeness:x,isAdvanceHarvest:T,expectedHarvestDate:E,voiceNoteTranscript:S,farmerId:v==null?void 0:v.id,farmerName:v==null?void 0:v.name,farmerNameAm:v==null?void 0:v.nameAm,farmerPhone:v==null?void 0:v.phone,region:v==null?void 0:v.region});this.isCreateListingModalOpen=!1,z({particleCount:90,spread:60,origin:{y:.6}}),b(this.lang==="am"?"አዲስ ምርት በተሳካ ሁኔታ ተመዝግቧል!":`Published ${j.productName} successfully!`,"fa-circle-check"),this.render()},e.handleVoiceRecordToggle=()=>{const a=document.getElementById("voiceRecordBtn"),r=document.getElementById("voiceRecordLabel"),o=document.getElementById("voiceWaveAnimation"),i=document.getElementById("voiceTranscriptionResult");document.getElementById("voiceTranscriptText"),this.isRecordingVoice?(clearTimeout(this.voiceRecordTimer),e.finishVoiceTranscription("am")):(this.isRecordingVoice=!0,r&&(r.innerText="Stop & Transcribe (አቁም)"),a&&(a.classList.remove("bg-emerald-600"),a.classList.add("bg-red-600")),o&&o.classList.remove("hidden"),i&&i.classList.add("hidden"),b("Voice Recording in progress... Speak produce details.","fa-microphone","border-amber-500"),this.voiceRecordTimer=setTimeout(()=>{this.isRecordingVoice&&e.finishVoiceTranscription("am")},3500))},e.finishVoiceTranscription=a=>{this.isRecordingVoice=!1;const r=document.getElementById("voiceRecordLabel"),o=document.getElementById("voiceWaveAnimation"),i=document.getElementById("voiceTranscriptionResult"),l=document.getElementById("voiceTranscriptText");r&&(r.innerText="Record Voice Note (ድምጽ ቅጂ)"),o&&o.classList.add("hidden");const d=p.simulateVoiceTranscription(4,a),u=document.getElementById("newProdName"),h=document.getElementById("newProdNameAm"),x=document.getElementById("newCategory"),T=document.getElementById("newQtyKg"),E=document.getElementById("newPricePerKg");u&&(u.value=d.productName),h&&(h.value=d.nameAm),x&&(x.value=d.category),T&&(T.value=d.qtyKg.toString()),E&&(E.value=d.pricePerKg.toString()),i&&l&&(l.innerText=`"${d.transcript}"`,i.classList.remove("hidden")),z({particleCount:60,spread:50,origin:{y:.6}}),b("Voice Note Transcribed! Form auto-filled in Amharic.","fa-wand-magic-sparkles")},e.handleSimulateSms=async a=>{a.preventDefault();const r=document.getElementById("smsPhone").value,o=document.getElementById("smsCommand").value,i=document.getElementById("smsResponseBox"),l=document.getElementById("smsResponseText");i&&l&&(l.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...',i.classList.remove("hidden"));const d=await p.sendInboundSms(r,o);l&&(l.innerHTML=`&gt; ${d}`),b("SMS command executed via Twilio engine","fa-comment-sms")},e.handleFarmerWithdrawal=()=>{const a=p.getCurrentUser(),r=(a==null?void 0:a.walletBalanceEtb)||48200;if(r<=0){b("No available balance to withdraw","fa-triangle-exclamation","border-amber-500");return}p.requestWalletWithdrawal(r,(a==null?void 0:a.phone)||"+251911223344"),z({particleCount:100,spread:70,origin:{y:.6}}),b(`Instant Payout of ${r.toLocaleString()} ETB deposited to Telebirr (${(a==null?void 0:a.phone)||"+251911223344"})!`,"fa-money-bill-transfer"),this.render()},e.handleCreateStandingOrderModal=a=>{if(!p.isAuthenticated()){e.openAuthModal("login");return}p.addStandingOrder(a,150,"Weekly"),z({particleCount:70,spread:60,origin:{y:.6}}),b("Weekly Recurring Standing Order Scheduled!","fa-repeat"),this.activeBuyerSubTab="standing_orders",this.render()},e.toggleStandingOrderStatus=a=>{p.toggleStandingOrder(a),b("Standing order status updated","fa-check"),this.render()},e.openDisputeModal=a=>{const r=p.getOrders().find(o=>o.id===a);r&&(this.activeDisputeModal={isOpen:!0,order:r},this.render())},e.closeDisputeModal=()=>{this.activeDisputeModal=null,this.render()},e.handleDisputeSubmit=async(a,r)=>{a.preventDefault();const o=document.getElementById("disputeReasonInput").value,i=document.getElementById("disputePhotoUrl").value,l=document.getElementById("disputeRefundSlider").value;await p.disputeOrder(r,o,i,parseInt(l,10)),this.activeDisputeModal=null,this.activeOrderModal=null,b("Dispute filed! Escrow locked under Admin Arbitration.","fa-lock","border-red-500"),this.render()},e.toggleDriverOfflineMode=()=>{const a=p.toggleOfflineMode();b(a?"Switched to Offline Mode (Actions cached locally)":"Reconnected to Online Mode","fa-wifi"),this.render()},e.syncDriverOfflineQueue=async()=>{const a=await p.syncOfflineQueue();b(`Synced ${a} offline trip actions to server!`,"fa-cloud-arrow-up"),this.render()},e.handleDriverStopAction=async a=>{const r=p.getOptimizedRoute();r.stops[a]&&(r.stops[a].completed=!0,z({particleCount:50,spread:50,origin:{y:.6}}),b(`Stop #${a+1} verified with GPS timestamp!`,"fa-circle-check"),this.render())},e.driverPickupWithProof=async a=>{await p.pickupOrderByDriver(a,"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80"),b("Produce picked up with GPS photo proof! In transit.","fa-truck-fast"),this.render()},e.driverCompleteDeliveryProof=async a=>{await p.confirmDeliveryByBuyer(a,"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",9.03,38.74),z({particleCount:120,spread:70,origin:{y:.6}}),b("Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.","fa-hand-holding-dollar"),this.render()},e.adminVerifyKyc=async(a,r)=>{await p.verifyKyc(a,r),b(r?"Identity & Documents Approved!":"KYC verification rejected",r?"fa-user-check":"fa-user-xmark"),this.render()},e.handleDismissAnomaly=a=>{b(`Anomaly Alert #${a} dismissed by Admin`,"fa-check")},e.handleInvestigateAnomaly=a=>{b(`Audit trail opened for Anomaly #${a}`,"fa-magnifying-glass")},e.openAuthModal=(a="login")=>{this.authMode=a,this.otpStep=!1,this.authErrorMessage="",this.matchedUserName="",this.matchedUserRole="",this.isAuthModalOpen=!0,this.render()},e.closeAuthModal=()=>{this.isAuthModalOpen=!1,this.authErrorMessage="",this.render()},e.setAuthMode=a=>{this.authMode=a,this.otpStep=!1,this.authErrorMessage="",this.render()},e.resetOtpStep=()=>{this.otpStep=!1,this.authErrorMessage="",this.render()},e.quickFillPhone=a=>{this.pendingPhone=a.replace("+251","").trim(),this.authErrorMessage="",this.render();const r=document.getElementById("authPhoneInput");r&&(r.value=this.pendingPhone,r.focus())},e.switchToRegisterWithPhone=a=>{this.authMode="register",this.otpStep=!1,this.authErrorMessage="",this.pendingPhone=a.replace("+251","").trim(),this.render()},e.handleRequestOtp=async a=>{a.preventDefault();const r=document.getElementById("authPhoneInput").value.trim();if(!r||r.length<8){b("Please enter a valid Ethiopian mobile number (e.g. 0911223344)","fa-triangle-exclamation","border-red-500");return}const o=document.getElementById("requestOtpBtn");o&&(o.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...',o.disabled=!0),this.pendingPhone=r,this.authErrorMessage="";try{const i=await p.requestOtp(r);this.lastSentCode=i.demoCode||"",this.matchedUserName=i.userName||"",this.matchedUserRole=i.role||"",this.otpStep=!0,b(`SMS verification code dispatched to +251 ${r}`,"fa-comment-sms","border-emerald-500")}catch(i){this.authErrorMessage=i.message||"No account registered with this phone number. Please register first."}this.render()},e.handleVerifyOtp=async a=>{var i;a.preventDefault();const r=(i=document.getElementById("authOtpInput")||document.getElementById("otpCodeInput"))==null?void 0:i.value.trim();if(!r||r.length!==6){b("Please enter the 6-digit verification code","fa-triangle-exclamation","border-red-500");return}const o=document.getElementById("verifyOtpBtn");o&&(o.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...',o.disabled=!0);try{const l=await p.verifyOtp(this.pendingPhone,r);this.isAuthModalOpen=!1,this.otpStep=!1,this.authErrorMessage="",l.role==="superadmin"?this.activeTab="superadmin":l.role==="farmer"?this.activeTab="farmer":l.role==="driver"?this.activeTab="driver":l.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",z({particleCount:100,spread:70,origin:{y:.6}}),b(`Welcome back, ${l.name}! (${l.role.toUpperCase()})`,"fa-circle-check","border-emerald-500")}catch(l){this.authErrorMessage=l.message||"Invalid OTP code. Please try again."}this.render()};const s=async a=>{var h,x,T,E,S;a.preventDefault();const r=((h=document.getElementById("regName"))==null?void 0:h.value.trim())||"",o=((x=document.getElementById("regNameAm"))==null?void 0:x.value.trim())||r,i=((T=document.getElementById("regPhone"))==null?void 0:T.value.trim())||"",l=((E=document.getElementById("regRegion"))==null?void 0:E.value)||"Oromia (Bishoftu)",d=((S=document.querySelector('input[name="regRole"]:checked'))==null?void 0:S.value)||"buyer",u=document.getElementById("registerSubmitBtn");u&&(u.innerHTML='<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...',u.disabled=!0);try{const v=await p.registerUser(r,o,i,d,l);this.isAuthModalOpen=!1,this.authErrorMessage="",v.role==="farmer"?this.activeTab="farmer":v.role==="driver"?this.activeTab="driver":v.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",z({particleCount:150,spread:90,origin:{y:.6}}),b(`Welcome to Farmer-to-Market, ${v.name}!`,"fa-circle-check","border-emerald-500")}catch(v){this.authErrorMessage=v.message||"Registration failed. Please try a different phone number."}this.render()};e.handleRegisterUser=s,e.handleRegisterSubmit=s,e.handleLogout=()=>{p.logout(),this.activeTab="marketplace",this.cart=[],b("Logged out successfully","fa-arrow-right-from-bracket"),this.render()},e.switchDemoUser=async a=>{try{const r=await p.requestOtp(a);if(r.demoCode){const o=await p.verifyOtp(a,r.demoCode);o.role==="farmer"?this.activeTab="farmer":o.role==="driver"?this.activeTab="driver":o.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",z({particleCount:80,spread:60,origin:{y:.6}}),b(`Switched to profile: ${o.name} (${o.role.toUpperCase()})`,"fa-user-shield")}}catch(r){b("Demo switch failed: "+r.message,"fa-circle-xmark","border-red-500")}this.render()},e.addToCart=a=>{const r=p.getListingById(a);if(!r)return;const o=this.cart.find(i=>i.listing.id===a);o?o.qtyKg+=r.minOrderKg:this.cart.push({listing:r,qtyKg:r.minOrderKg}),b(`Added ${r.productName} to bulk cart`,"fa-cart-plus"),this.render()},e.updateCartQty=(a,r)=>{const o=this.cart.find(i=>i.listing.id===a);o&&(r<=0?this.cart=this.cart.filter(i=>i.listing.id!==a):o.qtyKg=r),this.render()},e.toggleCart=()=>{this.isCartOpen=!this.isCartOpen,this.render()},e.openTelebirrModal=a=>{if(!p.isAuthenticated()){e.openAuthModal("login");return}this.activeTelebirrModal={isOpen:!0,totalEtb:a},this.render()},e.closeTelebirrModal=()=>{this.activeTelebirrModal=null,this.render()},e.handleTelebirrSubmit=async a=>{var r;a.preventDefault();try{const o=document.getElementById("checkoutAddress"),i=document.querySelector('input[name="checkoutPayment"]:checked'),l=o==null?void 0:o.value,d=p.getAccountData().addresses.find(T=>T.id===l);if(!d||!i){b("Choose a shipping address and payment method first.","fa-circle-exclamation","border-amber-500");return}const u=`${d.street}, ${d.city}, ${d.region}, ${d.country}`,h=this.cart.length?this.cart:(r=this.activeTelebirrModal)!=null&&r.listingId?[{listing:p.getListingById(this.activeTelebirrModal.listingId),qtyKg:this.activeTelebirrModal.qtyKg||0}]:[];if(!h.length||!h[0].listing)throw new Error("The selected produce is no longer available.");let x=null;for(const T of h){const E=T.listing;if(!E)throw new Error("The selected produce is no longer available.");x=await p.placeOrder(E.id,T.qtyKg,u,!1,"Weekly",i.value==="telebirr-wallet"?void 0:i.value)}this.cart=[],this.isCartOpen=!1,this.activeTelebirrModal=null,z({particleCount:150,spread:80,origin:{y:.6}}),b(`Payment authorized via ${i.value==="telebirr-wallet"?"Telebirr":"your selected provider"}. Farmer notified; driver follows after farmer confirmation.`,"fa-lock","border-blue-500"),x&&(this.activeOrderModal=x)}catch(o){b("Order placement failed: "+o.message,"fa-circle-xmark","border-red-500")}this.render()},e.viewOrder=a=>{const o=p.getOrders().find(i=>i.id===a);o&&(this.activeOrderModal=o,this.render())},e.closeOrderModal=()=>{this.activeOrderModal=null,this.render()},e.confirmFarmerOrder=async a=>{await p.confirmOrderByFarmer(a),de.joinOrder(a),b("Order confirmed! Driver notified for farm pickup.","fa-circle-check"),this.render()},e.confirmDelivery=async a=>{await p.confirmDeliveryByBuyer(a),z({particleCount:150,spread:80,origin:{y:.6}}),b("Delivery Confirmed! 90% released to Farmer, 5% to Driver.","fa-hand-holding-dollar","border-emerald-500"),this.render()},e.adminResolveDispute=async(a,r)=>{try{await p.resolveDispute(a,r),b(`Dispute resolved: ${r}. Buyer and farmer records updated.`,"fa-gavel","border-purple-500"),this.render()}catch(o){b(o.message||"Could not resolve the dispute.","fa-circle-xmark","border-rose-500")}},e.toggleCreateListingModal=()=>{this.isCreateListingModalOpen=!this.isCreateListingModalOpen,this.render()},e.handleCreateListingSubmit=async a=>{var S;a.preventDefault();const r=document.getElementById("newProdName").value,o=document.getElementById("newProdNameAm").value,i=document.getElementById("newCategory").value,l=parseFloat(document.getElementById("newQtyKg").value),d=parseFloat(document.getElementById("newPricePerKg").value),u=parseFloat(document.getElementById("newMinOrderKg").value),h=document.getElementById("newGrade").value,x=document.getElementById("newRipeness").value,T=document.getElementById("newIsAdvanceHarvest").checked,E=(S=document.getElementById("newExpectedHarvestDate"))==null?void 0:S.value;try{await p.createListing({productName:r,nameAm:o,category:i,qtyKg:l,pricePerKg:d,minOrderKg:u,grade:h,ripeness:x,isOrganic:!0,isAdvanceHarvest:T,expectedHarvestDate:T?E:void 0,availableFrom:T&&E?E:new Date().toISOString().split("T")[0]}),this.isCreateListingModalOpen=!1,b(`Published ${r} to marketplace!`,"fa-cloud-arrow-up")}catch(v){b(v.message||"Failed to publish listing","fa-circle-xmark","border-red-500")}this.render()},e.handleAdminBroadcastSms=async a=>{a.preventDefault();const r=document.getElementById("smsTargetRole").value,o=document.getElementById("smsMsgEn").value,i=document.getElementById("smsMsgAm").value;await p.broadcastSms(o,i,r),b(this.lang==="am"?"የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!":"SMS Broadcast sent to smallholders via Twilio!","fa-paper-plane"),this.render()},e.openVerificationWizard=(a=1)=>{this.verificationWizardModal.setLanguage(this.lang),this.verificationWizardModal.open(a)},e.closeVerificationWizard=()=>{this.verificationWizardModal.close()},e.setWizardStep=a=>{this.verificationWizardModal.setStep(a)},e.updateWizardField=(a,r)=>{this.verificationWizardModal.updateField(a,r)},e.submitVerificationForm=async()=>{await this.verificationWizardModal.submit(),z({particleCount:100,spread:70,origin:{y:.6}}),b(this.lang==="am"?"ሰነዶችዎ ደርሰውናል! በ24 ሰዓት ውስጥ ይገመገማሉ።":"Documents submitted! Verification under 24-hour review.","fa-shield-check","border-emerald-500"),this.render()},e.switchAgentTab=a=>{this.agentView.switchTab(a),this.render()},e.setUssdInput=a=>{this.agentView.setUssdInput(a)},e.sendUssdCommand=async()=>{await this.agentView.executeUssd()},e.sendInboundSms=async()=>{const a=document.getElementById("inboundSmsBody"),r=(a==null?void 0:a.value)||"FAYDA FAN-8812-4091-2810";b(this.lang==="am"?`የኤስኤምኤስ ትዕዛዝ ተቀብለናል፡ "${r}"`:`Inbound SMS processed: "${r}"`,"fa-comment-sms","border-blue-500"),await p.refreshAllData(),this.render()},e.handleAgentRegisterSubmit=async a=>{var T,E,S,v,j;a.preventDefault();const r=document.getElementById("agFarmerName").value,o=(T=document.getElementById("agFarmerNameAm"))==null?void 0:T.value,i=document.getElementById("agFarmerPhone").value,l=document.getElementById("agFarmerRegion").value,d=(E=document.getElementById("agFarmerKebele"))==null?void 0:E.value,u=(S=document.getElementById("agFarmerCrop"))==null?void 0:S.value,h=(v=document.getElementById("agFarmerFayda"))==null?void 0:v.value,x=(j=document.getElementById("agFarmerTin"))==null?void 0:j.value;try{await p.agentRegisterFarmer({name:r,nameAm:o,phone:i,region:l,kebele:d,primaryCrop:u,faydaId:h,tinNumber:x}),z({particleCount:120,spread:80,origin:{y:.6}}),b(this.lang==="am"?`${r} ተመዝግቧል! የማረጋገጫ ኤስኤምኤስ ተልኳል።`:`Farmer ${r} registered! Welcome SMS dispatched.`,"fa-user-check","border-emerald-500"),this.agentView.switchTab("roster"),this.render()}catch(w){b("Registration failed: "+w.message,"fa-circle-xmark","border-red-500")}},e.sendAgentFarmerSms=a=>{b(this.lang==="am"?`ኤስኤምኤስ ወደ ${a} ተልኳል!`:`SMS dispatch sent to ${a}!`,"fa-paper-plane","border-blue-500")},e.adminReviewVerification=async(a,r)=>{let o,i;if(r==="Reject"){if(i=prompt(this.lang==="am"?"እባክዎ ውድቅ የተደረገበትን ምክንያት ያስገቡ (ለምሳሌ፡ የፋይዳ ፎቶው ግልጽ አይደለም / የታክስ ቁጥር አልተገኘም):":"Enter rejection reason to notify the user via SMS (e.g. Blurry ID photo / TIN mismatch):","Blurry Fayda ID photo. Please re-upload clear image.")||void 0,!i)return}else o="Identity & TIN verified against Ministry of Revenues registry.";await p.reviewVerification(a,r,o,i),r==="Approve"?(z({particleCount:100,spread:70,origin:{y:.6}}),b(this.lang==="am"?"የተጠቃሚው ማረጋገጫ ጸድቋል! የኤስኤምኤስ መልእክት ተልኳል።":"User account APPROVED! SMS confirmation dispatched.","fa-circle-check","border-emerald-500")):b(this.lang==="am"?"ማረጋገጫው ውድቅ ተደርጓል፤ ምክንያቱ በኤስኤምኤስ ተልኳል።":"Verification rejected & reason SMS sent to user.","fa-triangle-exclamation","border-amber-500"),this.render()},e.setSuperAdminTab=a=>{this.activeSuperAdminTab=a,this.render()},e.setUserRoleFilter=a=>{this.superAdminUserRoleFilter=a,this.render()},e.setAuditCategoryFilter=a=>{this.superAdminAuditCategoryFilter=a,this.render()},e.openCreateUserModal=()=>{this.isSuperAdminCreateUserModalOpen=!0,this.render()},e.openEditUserModal=a=>{this.editTargetUserId=a,this.isSuperAdminEditUserModalOpen=!0,this.render()},e.openAddZoneModal=()=>{this.isSuperAdminAddZoneModalOpen=!0,this.render()},e.openAddBlacklistModal=()=>{this.isSuperAdminAddBlacklistModalOpen=!0,this.render()},e.closeSuperAdminModal=()=>{this.isSuperAdminCreateUserModalOpen=!1,this.isSuperAdminEditUserModalOpen=!1,this.isSuperAdminAddZoneModalOpen=!1,this.isSuperAdminAddBlacklistModalOpen=!1,this.editTargetUserId=null,this.render()},e.handleRoleChangeInModal=a=>{const r=document.getElementById("roleSpecificFields");r&&(a==="farmer"?r.innerHTML=`
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
        `))},e.handleCreateUserSubmit=a=>{var q,Q,Z,J,se,re,ee,te,y,K,U,he,ge,ve;a.preventDefault();const r=(q=document.getElementById("newRoleSelect"))==null?void 0:q.value,o=(Q=document.getElementById("newNameInput"))==null?void 0:Q.value,i=((Z=document.getElementById("newNameAmInput"))==null?void 0:Z.value)||void 0,l=(J=document.getElementById("newPhoneInput"))==null?void 0:J.value,d=(se=document.getElementById("newRegionInput"))==null?void 0:se.value,u=((re=document.getElementById("newVerifiedCheck"))==null?void 0:re.checked)??!0,h=((ee=document.getElementById("newPrimaryCropInput"))==null?void 0:ee.value)||void 0,x=((te=document.getElementById("newKebeleInput"))==null?void 0:te.value)||void 0,T=((y=document.getElementById("newFaydaInput"))==null?void 0:y.value)||void 0,E=((K=document.getElementById("newTinInput"))==null?void 0:K.value)||void 0,S=((U=document.getElementById("newVehicleTypeInput"))==null?void 0:U.value)||void 0,v=Number((he=document.getElementById("newCapacityInput"))==null?void 0:he.value)||void 0,j=((ge=document.getElementById("newRefrigInput"))==null?void 0:ge.value)||void 0,w=((ve=document.getElementById("newLicenseInput"))==null?void 0:ve.value)||void 0;p.createUser({role:r,name:o,nameAm:i,phone:l,region:d,verified:u,status:"active",primaryCrop:h,kebele:x,faydaId:T,tinNumber:E,vehicleType:S,vehicleCapacityKg:v,refrigerationType:j,businessLicenseNumber:w}),this.isSuperAdminCreateUserModalOpen=!1,z({particleCount:100,spread:70,origin:{y:.6}}),b(this.lang==="am"?`አዲስ ${r.toUpperCase()} መለያ ተፈጥሯል: ${o}`:`Created ${r.toUpperCase()} account: ${o}!`,"fa-user-check","border-rose-500"),this.render()},e.handleEditUserSubmit=(a,r)=>{var T,E,S,v,j,w,q;a.preventDefault();const o=(T=document.getElementById("editNameInput"))==null?void 0:T.value,i=(E=document.getElementById("editPhoneInput"))==null?void 0:E.value,l=(S=document.getElementById("editRoleSelect"))==null?void 0:S.value,d=(v=document.getElementById("editStatusSelect"))==null?void 0:v.value,u=(j=document.getElementById("editRegionInput"))==null?void 0:j.value,h=((w=document.getElementById("editFaydaInput"))==null?void 0:w.value)||void 0,x=((q=document.getElementById("editTinInput"))==null?void 0:q.value)||void 0;p.updateUser(r,{name:o,phone:i,role:l,status:d,region:u,faydaId:h,tinNumber:x}),this.isSuperAdminEditUserModalOpen=!1,this.editTargetUserId=null,b(`Updated user profile: ${o}`,"fa-user-pen","border-emerald-500"),this.render()},e.toggleUserSuspension=a=>{const r=p.toggleUserSuspension(a);b(r.status==="suspended"?`Suspended account access for ${r.name}`:`Reinstated account access for ${r.name}`,r.status==="suspended"?"fa-user-slash":"fa-user-check",r.status==="suspended"?"border-red-500":"border-emerald-500"),this.render()},e.deleteUserAccount=a=>{const r=p.getUserById(a);r&&confirm(`Are you sure you want to permanently delete user '${r.name}' (${r.phone})? This action cannot be undone.`)&&(p.deleteUser(a),b(`Permanently deleted user: ${r.name}`,"fa-trash","border-red-500"),this.render())},e.startSuperAdminImpersonation=a=>{const r=p.startImpersonation(a);r&&(window.isSuperAdminImpersonating=!0,b(`Logged in as ${r.name} (${r.role.toUpperCase()})`,"fa-user-secret","border-rose-500"),r.role==="farmer"?this.activeTab="farmer":r.role==="driver"?this.activeTab="driver":r.role==="admin"?this.activeTab="admin":this.activeTab="marketplace",this.render(),window.scrollTo({top:0,behavior:"smooth"}))},e.stopSuperAdminImpersonation=()=>{p.stopImpersonation(),window.isSuperAdminImpersonating=!1,b("Exited impersonation. Returned to Super Admin dashboard.","fa-crown","border-rose-500"),this.activeTab="superadmin",this.render(),window.scrollTo({top:0,behavior:"smooth"})},e.updateEscrowSliders=a=>{const r=document.getElementById("farmerShareInput"),o=document.getElementById("driverShareInput"),i=document.getElementById("platformShareInput");if(!r||!o||!i)return;let l=Number(r.value),d=Number(o.value),u=Number(i.value);if(a==="farmer"){const h=100-l;d=Math.round(h/2),u=h-d,o.value=d.toString(),i.value=u.toString()}document.getElementById("farmerShareDisplay").innerText=`${r.value}%`,document.getElementById("driverShareDisplay").innerText=`${o.value}%`,document.getElementById("platformShareDisplay").innerText=`${i.value}%`},e.handleSaveSuperAdminConfig=a=>{var v,j,w,q,Q,Z,J,se,re,ee,te;a.preventDefault();const r=Number((v=document.getElementById("farmerShareInput"))==null?void 0:v.value)||90,o=Number((j=document.getElementById("driverShareInput"))==null?void 0:j.value)||5,i=Number((w=document.getElementById("platformShareInput"))==null?void 0:w.value)||5,l=Number((q=document.getElementById("cfgWithholdingTax"))==null?void 0:q.value)||2,d=Number((Q=document.getElementById("cfgHighValueThreshold"))==null?void 0:Q.value)||5e4,u=((Z=document.getElementById("cfgTelebirrAppId"))==null?void 0:Z.value)||"",h=((J=document.getElementById("cfgTelebirrShortCode"))==null?void 0:J.value)||"",x=((se=document.getElementById("cfgTelebirrApiKey"))==null?void 0:se.value)||"",T=((re=document.getElementById("cfgTwilioSid"))==null?void 0:re.value)||"",E=((ee=document.getElementById("cfgTwilioToken"))==null?void 0:ee.value)||"",S=((te=document.getElementById("cfgTwilioFrom"))==null?void 0:te.value)||"";p.updatePlatformConfig({farmerSharePercent:r,driverSharePercent:o,platformFeePercent:i,withholdingTaxPercent:l,highValuePayoutThresholdEtb:d,telebirrAppId:u,telebirrShortCode:h,telebirrApiKey:x,twilioAccountSid:T,twilioAuthToken:E,twilioFromNumber:S}),b("Platform configuration and escrow splits saved!","fa-floppy-disk","border-emerald-500"),this.render()},e.approveHighValuePayout=a=>{const r=p.getCurrentUser();p.approvePayout(a,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)")&&(z({particleCount:90,spread:60,origin:{y:.6}}),b("High-value Telebirr payout approved & released!","fa-circle-check","border-emerald-500"),this.render())},e.rejectHighValuePayout=a=>{const r=p.getCurrentUser();p.rejectPayout(a,(r==null?void 0:r.name)||"Dr. Dawit Haile (Super Admin)","Manual Super Admin audit flag"),b("Payout declined & flagged for compliance investigation.","fa-ban","border-red-500"),this.render()},e.toggleFeatureFlag=a=>{const r=p.toggleFeatureFlag(a);b(`${r.name}: ${r.enabled?"ENABLED":"DISABLED"}`,"fa-toggle-on",r.enabled?"border-emerald-500":"border-slate-500"),this.render()},e.toggleEmergencyEscrowFreeze=()=>{const r=!p.getPlatformConfig().emergencyEscrowFrozen;p.updatePlatformConfig({emergencyEscrowFrozen:r}),r?(alert(`EMERGENCY ESCROW FREEZE ACTIVATED!
All automatic Telebirr payouts and order releases have been halted platform-wide.`),b("EMERGENCY ESCROW FREEZE ACTIVATED!","fa-lock","border-red-500")):b("Platform escrow unfrozen. Normal operations restored.","fa-lock-open","border-emerald-500"),this.render()},e.handleAddZoneSubmit=a=>{var h,x,T,E,S,v;a.preventDefault();const r=(h=document.getElementById("zoneNameInput"))==null?void 0:h.value,o=(x=document.getElementById("zoneHubInput"))==null?void 0:x.value,i=Number((T=document.getElementById("zoneLatInput"))==null?void 0:T.value),l=Number((E=document.getElementById("zoneLngInput"))==null?void 0:E.value),d=Number((S=document.getElementById("zoneRadiusInput"))==null?void 0:S.value),u=Number((v=document.getElementById("zoneBonusInput"))==null?void 0:v.value);p.addDeliveryZone({name:r,clusterHubName:o,centerLatitude:i,centerLongitude:l,baseRadiusKm:d,maxRadiusKm:d*2.5,ruralSubsidyEtb:u,active:!0,smallholdersCount:500}),this.isSuperAdminAddZoneModalOpen=!1,b(`Added regional delivery zone: ${r}`,"fa-map-location-dot","border-teal-500"),this.render()},e.deleteZone=a=>{p.deleteDeliveryZone(a),b("Delivery zone removed.","fa-trash","border-slate-500"),this.render()},e.handleAddBlacklistSubmit=a=>{var d,u,h;a.preventDefault();const r=(d=document.getElementById("blTypeSelect"))==null?void 0:d.value,o=(u=document.getElementById("blValueInput"))==null?void 0:u.value,i=(h=document.getElementById("blReasonInput"))==null?void 0:h.value,l=p.getCurrentUser();p.addToBlacklist({type:r,value:o,reason:i,blacklistedBy:(l==null?void 0:l.name)||"Super Admin",active:!0}),this.isSuperAdminAddBlacklistModalOpen=!1,b(`Entity blacklisted: ${o}`,"fa-ban","border-red-500"),this.render()},e.removeFromBlacklist=a=>{p.removeFromBlacklist(a),b("Entity removed from blacklist.","fa-circle-check","border-emerald-500"),this.render()},e.handleSaveBusinessRules=a=>{var d,u,h,x;a.preventDefault();const r=Number((d=document.getElementById("ruleMinOrderKg"))==null?void 0:d.value)||10,o=Number((u=document.getElementById("ruleMaxOrderKg"))==null?void 0:u.value)||5e4,i=Number((h=document.getElementById("ruleMaxDistanceKm"))==null?void 0:h.value)||450,l=Number((x=document.getElementById("rulePriceCeiling"))==null?void 0:x.value)||250;p.updateGlobalBusinessRules({minOrderKg:r,maxOrderKg:o,maxDistanceKm:i,priceCeilingVariancePercent:l}),b("Global trading business rules saved!","fa-gavel","border-emerald-500"),this.render()},e.triggerDbBackup=()=>{const a=p.triggerDatabaseBackup();z({particleCount:80,spread:60,origin:{y:.6}}),b(`PostgreSQL backup snapshot generated (${a.backupId})!`,"fa-database","border-blue-500"),this.render()},e.exportPlatformData=a=>{const r=p.exportPlatformData(a),o=document.createElement("a");o.href=r.dataUrl,o.download=r.filename,document.body.appendChild(o),o.click(),document.body.removeChild(o),b(`Downloaded full platform data export (${a.toUpperCase()})!`,"fa-download","border-emerald-500"),this.render()}}}new _a;
