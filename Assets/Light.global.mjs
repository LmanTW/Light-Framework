var Light=(()=>{var e=Object.defineProperty,t=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,n=Object.prototype.hasOwnProperty,i=(t,r,n)=>(((t,r,n)=>{r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n})(t,"symbol"!=typeof r?r+"":r,n),n),s=(e,t,r)=>new Promise(((n,i)=>{var s=e=>{try{l(r.next(e))}catch(e){i(e)}},a=e=>{try{l(r.throw(e))}catch(e){i(e)}},l=e=>e.done?n(e.value):Promise.resolve(e.value).then(s,a);l((r=r.apply(e,t)).next())})),a={};((t,r)=>{for(var n in r)e(t,n,{get:r[n],enumerable:!0})})(a,{Light:()=>B});var l="v0.2",c="2024/05/01 11:26",o="https://github.com/LmanTW/Light-Framework";function h(e,t){if(void 0!==t.type){const r=Array.isArray(e)?"array":typeof e;if(!t.type.includes(r))return{error:!0,type:"type"}}return void 0===t.value||t.value.includes(e)?void 0===t.instanceOf||e instanceof t.instanceOf.instance?{error:!1}:{error:!0,type:"instanceOf"}:{error:!0,type:"value"}}var u={checkParameters:(e,t)=>{Object.keys(t).forEach((r=>{if(void 0===e[r])throw new Error(`Cannot Found Condition For "${r}"`);const n=h(t[r],e[r]);if(n.error){if("type"===n.type)throw new Error(`Parameter "${r}" Must Be ${e[r].type.length>1?e[r].type.map((e=>`<${e}>`)).join(" Or "):`A <${e[r].type[0]}>`}`);if("value"===n.type)throw new Error(`Parameter "${r}" Must Be ${e[r].value.join(" Or ")}`);if("instanceOf"===n.type)throw new Error(`Parameter "${r}" Must Be An Instance Of <${e[r].instanceOf.name}>`)}}))},checkObject:(e,t,r)=>{Object.keys(t).forEach((n=>{const i=h(r[n],t[n]);if(i.error){if("type"===i.type)throw new Error(`Value "${n}" In "${e}" Must Be ${t[n].type.length>1?t[n].type.map((e=>`<${e}>`)).join(" Or "):`A <${t[n].type[0]}>`}`);if("value"===i.type)throw new Error(`Value "${n}" In "${e}" Must Be ${t[n].value.join(" Or ")}`);if("instanceOf"===i.type)throw new Error(`Value "${n}" In ${e} Must Be An Instance Of <${t[n].instanceOf.name}>`)}}))},generateID:(e,t)=>{let r=0;for(;t.includes(r.toString().padStart(e,"0"));)r++;return r.toString().padStart(e,"0")}},m=class{constructor(e){i(this,"_Core"),i(this,"_attributes",{}),this._Core=e}createAttribute(e,t,r){if(u.checkParameters({name:{type:["string"]},callback:{type:["function"]},update:{type:["undefined","boolean"]}},{name:e,callback:t,update:r}),void 0!==this._attributes[e])throw new Error(`Attribute Already Exist: "${e}"`);this._attributes[e]=t,r&&this._Core.Observer.checkChildren(this._Core.element)}deleteAttribute(e,t){if(u.checkParameters({name:{type:["string"]},update:{type:["undefined","boolean"]}},{name:e,update:t}),void 0===this._attributes[e])throw new Error(`Attribute Not Found: "${e}"`);delete this._attributes[e],t&&this._Core.Observer.checkChildren(this._Core.element)}getAttribute(e){return u.checkParameters({name:{type:["string"]}},{name:e}),"light:"===e.substring(0,6)?this._attributes[e.substring(6,e.length)]:void 0}},g=class{constructor(){i(this,"_listeners",{})}listen(e,t,r,n){u.checkParameters({name:{type:["string"]},callback:{type:["function"]}},{name:t,callback:r}),void 0===n&&(n={});const i=u.generateID(5,Object.keys(this._listeners)),s=(...e)=>{n.once&&this.removeListener(i),r(...e)};return this._listeners[i]={target:e,name:t,callback:s,tag:n.tag},e.addEventListener(t,s,n),i}removeListener(e){if(u.checkParameters({id:{type:["string"]}},{id:e}),void 0===this._listeners[e])throw new Error(`Listener Not Found: "${e}"`);this._listeners[e].target.removeEventListener(this._listeners[e].name,this._listeners[e].callback)}removeAllListeners(){Object.keys(this._listeners).forEach((e=>this.removeListener(e)))}findListeners(e,t){const r=[];return Object.keys(this._listeners).forEach((n=>{this._listeners[n].target!==e||void 0!==t.name&&this._listeners[n].name!==t.name||void 0!==t.tag||this._listeners[n].tag!==t.tag||r.push(n)})),r}},d=class{constructor(){i(this,"_interval"),i(this,"_timers",{})}createTimeout(e,t){u.checkParameters({ms:{type:["number"]},callback:{type:["function"]}},{ms:e,callback:t});const r=u.generateID(5,Object.keys(this._timers));return this._timers[r]={times:1,interval:e,callback2:t,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),r}createInterval(e,t){u.checkParameters({interval:{type:["number"]},callback:{type:["function"]}},{interval:e,callback:t});const r=u.generateID(5,Object.keys(this._timers));return this._timers[r]={times:1/0,interval:e,callback:t,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),r}createLoop(e,t,r,n){u.checkParameters({times:{type:["number"]},interval:{type:["number"]},callback:{type:["function"]},callback2:{type:["undefined","function"]}},{times:e,interval:t,callback:r,callback2:n});const i=u.generateID(5,Object.keys(this._timers));return this._timers[i]={times:e,interval:t,callback:r,callback2:n,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),i}deleteTimer(e){if(u.checkParameters({id:{type:["string"]}},{id:e}),void 0===this._timers[e])throw new Error(`Timer Not Found: "${e}"`);delete this._timers[e]}deleteAllTimers(){Object.keys(this._timers).forEach((e=>this.deleteTimer(e)))}_start(){this._interval=setInterval((()=>{const e=performance.now();Object.keys(this._timers).forEach((t=>{const r=this._timers[t];void 0!==r&&e-r.lastUpdateTime>=r.interval&&(void 0!==r.callback&&r.callback(r.count),r.lastUpdateTime=e,r.times!==1/0&&(r.count++,r.count===r.times&&(void 0!==r.callback2&&r.callback2(),delete this._timers[t])))}))}),1)}},y=class{static createStyle(e,t,r){u.checkParameters({style:{type:["string"]},type:{type:["string"]},idFormat:{type:["string"]}},{style:e,type:t,idFormat:r}),void 0===b[t]&&(b[t]={idFormat:r,styles:{}});for(let r of Object.keys(b[t].styles))if(b[t].styles[r]===e)return`${t}-${r}`;const n=u.generateID(5,Object.keys(b[t].styles));return b[t].styles[n]=e,this.updateStyles(),`${t}-${n}`}static updateStyles(){const e=[];Object.keys(b).forEach((t=>{Object.keys(b[t].styles).forEach((r=>e.push(`.${b[t].idFormat.replace("<id>",r)} {${b[t].styles[r]}}`)))})),p.textContent=e.join("\n")}},p=document.head.appendChild(document.createElement("style")),b={},f=class{constructor(e){i(this,"_Core"),i(this,"_units",{}),this._Core=e}createUnit(e,t,r){if(u.checkParameters({name:{type:["string"]},callback:{type:["function"]},update:{type:["undefined","boolean"]}},{name:e,callback:t,update:r}),void 0!==this._units[e])throw new Error(`Unit Already Exist: "${e}"`);this._units[e]=t,r&&this._Core.Observer.checkChildren(this._Core.element)}deleteUnit(e,t){if(u.checkParameters({name:{type:["string"]},update:{type:["undefined","boolean"]}},{name:e,update:t}),void 0===this._units[e])throw new Error(`Unit Not Found: "${e}"`);delete this._units[e],t&&this._Core.Observer.checkChildren(this._Core.element)}parseStyleValue(e){if(e.includes("[")&&e.includes("]")){const t=Object.keys(this._units).sort(((e,t)=>t.length-e.length));let r,n="";for(let i=0;i<e.length;i++)if("["===e[i])r="";else if("]"===e[i]){if("$"===r[0])n+=`var(--${r.substring(1,r.length)})`;else for(let e of t){const t=r.substring(r.length-e.length,r.length);if(t===e){n+=this._units[t](r.substring(0,r.length-e.length));break}}r=void 0}else void 0===r?n+=e[i]:r+=e[i];return n}return e}};function v(e,t,r){u.checkParameters({tagName:{type:["string"]},attributes:{type:["undefined","object"]},children:{type:["undefined","array"]}},{tagName:e,attributes:t,children:r});const n="svg"===e?document.createElementNS("http://www.w3.org/2000/svg","svg"):document.createElement(e);return void 0!==t&&Object.keys(t).forEach((e=>{"innerHTML"===e?n.innerHTML=t[e]:n.setAttribute(e,t[e])})),void 0!==r&&r.forEach((e=>n.appendChild(e))),n}function _(e,t,r){u.checkParameters({src:{type:["string"]},attributes:{type:["object"]}},{src:e,attributes:t});const n=v("div",t);return void 0===r&&!1===r?(fetch(e).then((e=>s(this,null,(function*(){return n.innerHTML=yield e.text()})))),n):new Promise((t=>s(this,null,(function*(){n.innerHTML=yield(yield fetch(e)).text(),t(n)}))))}var k=class{constructor(e){i(this,"_Core"),i(this,"observer"),this._Core=e,this.observer=new MutationObserver((t=>{t.forEach((t=>{w.getComponentFromParent(t.target)===e.id&&("childList"===t.type?Array.from(t.addedNodes).forEach((e=>{void 0!==e.tagName&&this.checkChildren(e)})):"attributes"===t.type&&this.checkAttributes(t.target,t.attributeName))}))})),this.observer.observe(e.element,{subtree:!0,childList:!0,attributes:!0})}checkChildren(e){void 0!==e.tagName&&(this.checkAttributes(e),Array.from(e.children).forEach((e=>{void 0!==e.tagName&&null===e.getAttribute("light")&&this.checkChildren(e)})))}checkAttributes(e,t){if(u.checkParameters({attributeName:{type:["undefined","string"]}},{attributeName:t}),void 0!==e.tagName)if(void 0===t)e.getAttributeNames().forEach((t=>{const r=this._Core.AttributeManager.getAttribute(t);void 0!==r&&r(e,e.getAttribute(t))}));else{const r=this._Core.AttributeManager.getAttribute(t);void 0!==r&&r(e,e.getAttribute(t))}}},A=class{constructor(e,t,r){i(this,"_id"),i(this,"_element"),i(this,"_API"),i(this,"componentPath",window.location.pathname),i(this,"data"),i(this,"ListenerManager"),i(this,"TimerManager"),i(this,"AttributeManager"),i(this,"UnitManager"),i(this,"Observer"),i(this,"PluginManager",O),i(this,"ComponentManager",w),i(this,"StyleManager",y),u.checkParameters({API:{instanceOf:{instance:B,name:"Light"}},element:{instanceOf:{instance:HTMLElement,name:"HTMLElement"}}},{API:e,element:t}),this._id=w.registerComponent(this),this._element=t,this._API=e,this.data=r,this.ListenerManager=new g,this.TimerManager=new d,this.AttributeManager=new m(this),this.UnitManager=new f(this),this.Observer=new k(this),t.setAttribute("light",this._id),O.initializePlugins(this),this.Observer.checkChildren(this._element)}get id(){return this._id}get element(){return this._element}getElementByID(e){return u.checkParameters({id:{type:["string"]}},{id:e}),C(this._element,(t=>t.id===e),1)[0]}getElementsByClassName(e){return u.checkParameters({className:{type:["string"]}},{className:e}),C(this._element,(t=>Array.from(t.classList).includes(e)),1/0)}getElementsByTagName(e){return u.checkParameters({tagName:{type:["string"]}},{tagName:e}),C(this._element,(t=>t.tagName===e),1/0)}getAllElements(){return C(this._element,(()=>!0),1/0)}load(e,t){return s(this,null,(function*(){u.checkParameters({html:{type:["string"]},componentPath:{type:["undefined","string"]}},{html:e,componentPath:t}),M(this._element),this.ListenerManager.removeAllListeners(),this.TimerManager.deleteAllTimers();const r=v("div",{innerHTML:e}),n=C(r,(e=>"script"===e.localName),1/0).map((e=>(e.remove(),{src:e.getAttribute("src"),type:e.getAttribute("type"),content:e.innerHTML})));this._element.innerHTML=r.innerHTML;for(let e of n){null!==e.src&&"."===e.src[0]&&(e.src=E(t,e.src));const r=null===e.src?e.content:yield(yield fetch(e.src)).text();"module"===e.type?new Function("Light","Component","Import",`(async()=>{${r}})()`)(B,this._API,(e=>s(this,null,(function*(){return void 0!==t&&"."===e[0]&&(e=E(t,e)),yield import(e)})))):new Function("Light","Component",r)(B,this._API)}this.componentPath=t}))}remove(){M(this._element),this.ListenerManager.removeAllListeners(),this.TimerManager.deleteAllTimers(),this.Observer.observer.disconnect(),w.unregisterComponent(this._id),this._id=void 0,this._element.setAttribute("light",null)}};function C(e,t,r){let n=[];for(const i of Array.from(e.children))if(t(i)&&n.push(i),n=n.concat(C(i,t,r-n.length)),n.length>=r)break;return n}function M(e){Array.from(e.children).forEach((e=>{null!==e.getAttribute("light")?w.getComponent(e.getAttribute("light")).remove():M(e)}))}function E(e,t){const r=e.split("/");return t.split("/").forEach((e=>{"."===e?r.splice(t.length-1,1):".."===e?r.splice(t.length-2,2):r.push(e)})),r.join("/")}var w=class{static registerComponent(e){u.checkParameters({Core:{instanceOf:{instance:A,name:"Core"}}},{Core:e});const t=u.generateID(5,Object.keys(P));return P[t]=e,t}static unregisterComponent(e){if(u.checkParameters({id:{type:["string"]}},{id:e}),void 0===P[e])throw new Error(`Component Not Found: "${e}"`);delete P[e]}static getComponent(e){return u.checkParameters({id:{type:["string"]}},{id:e}),P[e]}static getComponentFromParent(e){u.checkParameters({element:{instanceOf:{instance:HTMLElement,name:"HTMLElement"}}},{element:e});const t=e.getAttribute("light");return null!==t?t:null!==e.parentElement?this.getComponentFromParent(e.parentElement):void 0}},P={},O=class{static get plugin(){return Object.keys(L)}static addPlugin(e){if(u.checkParameters({Plugin:{type:["object"]}},{Plugin:e}),void 0!==L[e.id])throw new Error(`Plugin Is Already Added: "${e.id}"`);L[e.id]=e,void 0!==e.register&&e.register(B,{PluginManager:this,ComponentManager:w,Tools:u})}static removePlugin(e){if(u.checkParameters({id:{type:["string"]}},{id:e}),void 0===L[e])throw new Error(`Plugin Not Found: "${e}"`);delete L[e]}static initializePlugins(e){u.checkParameters({Core:{instanceOf:{instance:A,name:"Core"}}},{Core:e}),Object.keys(L).forEach((t=>{void 0!==L[t].init&&L[t].init(e)}))}},L={};function T(e){return $(e),Object.keys(e).map((t=>{let r="";for(let e=0;e<t.length;e++)N.includes(t[e])?r+=`-${t[e].toLowerCase()}`:r+=t[e];return`${r}:${e[t]}`})).join(";")}function $(e){if(void 0!==e.center){const t=e.center.split(" ");(t.includes("row")||t.includes("all"))&&("column"===e.flexDirection?e.alignItems="center":e.justifyContent="center"),(t.includes("column")||t.includes("all"))&&("column"===e.flexDirection?e.justifyContent="center":e.alignItems="center"),delete e.center}return e}function j(e){const t={};return e.split(";").forEach((e=>{if(e.length>0){const[r,n]=e.split(":");t[r.trim()]=n.trim()}})),t}var N="ABCDEFGHIJKLMNOPQRSTUVWXYZ";function I(e,t){let r=e.getAttribute("class");const n=null===r?[]:r.split(" ");n.includes(t)||n.push(t),e.setAttribute("class",n.join(" "))}var H={id:"Default",register:(e,t)=>{class r extends HTMLElement{constructor(){super()}connectedCallback(){return s(this,null,(function*(){void 0===S[this.getAttribute("src")]&&(S[this.getAttribute("src")]=yield(yield fetch(this.getAttribute("src"))).text());const e=v("div",{innerHTML:S[this.getAttribute("src")]});this.getAttributeNames().forEach((t=>e.setAttribute(t,this.getAttribute(t)))),this.replaceWith(e)}))}}void 0===customElements.get("light-svg")&&customElements.define("light-svg",r)},init:e=>{e.AttributeManager.createAttribute("style",((t,r)=>{const n=$(j(e.UnitManager.parseStyleValue(r))),i={};Object.keys(n).forEach((e=>{["transition","transitionDuration"].includes(e)&&(i[e]=n[e],delete n[e])}));const s=Array.from(t.classList).filter((e=>!e.includes("style-")));s.length>0?t.setAttribute("class",s.join(" ")):t.removeAttribute("class"),I(t,e.StyleManager.createStyle(T(n),"style","style-<id>")),window.requestAnimationFrame((()=>Object.keys(i).forEach((e=>t.style[e]=i[e]))))})),e.AttributeManager.createAttribute("style:hover",((t,r)=>I(t,e.StyleManager.createStyle(e.UnitManager.parseStyleValue(r),"hover","hover-<id>:hover")))),e.AttributeManager.createAttribute("style:hold",((t,r)=>I(t,e.StyleManager.createStyle(e.UnitManager.parseStyleValue(r),"hold","hold-<id>:active:hover")))),e.AttributeManager.createAttribute("trigger:open",((e,t)=>{null===e.getAttribute("light:computed")&&(e.innerHTML=v("a",{innerHTML:e.innerHTML,href:t,target:"_blank",style:T({all:"inherit"})}).outerHTML,e.setAttribute("light:computed","true"))})),e.AttributeManager.createAttribute("trigger:goto",((e,t)=>{null===e.getAttribute("light:computed")&&(e.innerHTML=v("a",{innerHTML:e.innerHTML,href:t,style:T({all:"inherit"})}).outerHTML,e.setAttribute("light:computed","true"))})),e.AttributeManager.createAttribute("url",((t,r)=>{if(null===t.getAttribute("light:computed")){const n=v("a",{innerHTML:t.innerHTML,href:r,style:T({all:"inherit"})});for(;t.firstChild;)t.firstChild.remove();t.appendChild(n),e.ListenerManager.listen(n,"click",(e=>e.preventDefault())),t.setAttribute("light:computed","true")}})),e.UnitManager.createUnit("ps",(e=>`calc(calc(1vw + 1vh) * ${e})`))}},S={};console.log(`[ Light-Framework ]\n\n  Version: ${l}\n  Build: ${c}\n\n  Github: ${o}`);var F,B=class{constructor(e,t){i(this,"_Core"),i(this,"ListenerManager"),i(this,"TimerManager"),this._Core=new A(this,e,t),this.ListenerManager=this._Core.ListenerManager,this.TimerManager=this._Core.TimerManager}static get use(){return O.addPlugin}static get createElement(){return v}static get createSvgElement(){return _}static get createStyle(){return T}static setStyle(e,t,r){u.checkParameters({element:{instanceOf:{instance:HTMLElement,name:"HTMlElement"}},name:{type:["string"]},value:{type:["number","string"]}},{element:e,name:t,value:r});const n=null===e.getAttribute("light:style")?{}:j(e.getAttribute("light:style"));n[t]=r.toString(),e.setAttribute("light:style",T(n))}get id(){return this._Core.id}get data(){return this._Core.data}get element(){return this._Core.element}set data(e){this._Core.data=e}getElementByID(e){return this._Core.getElementByID(e)}getElementsByClassName(e){return this._Core.getElementsByClassName(e)}getElementsByTagName(e){return this._Core.getElementsByTagName(e)}getAllElements(){return this._Core.getAllElements()}load(e,t){this._Core.load(e,t)}remove(){this._Core.remove()}};return B.use(H),F=a,((i,s,a,l)=>{if(s&&"object"==typeof s||"function"==typeof s)for(let c of r(s))n.call(i,c)||c===a||e(i,c,{get:()=>s[c],enumerable:!(l=t(s,c))||l.enumerable});return i})(e({},"__esModule",{value:!0}),F)})().Light;