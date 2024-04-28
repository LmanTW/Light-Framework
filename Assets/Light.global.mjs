var Light=(()=>{var e=Object.defineProperty,t=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,n=Object.prototype.hasOwnProperty,i=(t,r,n)=>(((t,r,n)=>{r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n})(t,"symbol"!=typeof r?r+"":r,n),n),s=(e,t,r)=>new Promise(((n,i)=>{var s=e=>{try{l(r.next(e))}catch(e){i(e)}},a=e=>{try{l(r.throw(e))}catch(e){i(e)}},l=e=>e.done?n(e.value):Promise.resolve(e.value).then(s,a);l((r=r.apply(e,t)).next())})),a={};((t,r)=>{for(var n in r)e(t,n,{get:r[n],enumerable:!0})})(a,{Light:()=>D});var l="v0.2",o="2024/04/28 23:10",c="https://github.com/LmanTW/Light-Framework",h=class{static createCustomElement(e,t){if(void 0!==u[e])throw new Error(`Custom Element Already Exist: "${e}"`);u[e]=t,customElements.define(`light-${e}`,t)}},u={};function m(e,t){if(void 0!==t.type){const r=Array.isArray(e)?"array":typeof e;if(!t.type.includes(r))return{error:!0,type:"type"}}return void 0===t.value||t.value.includes(e)?void 0===t.instanceOf||e instanceof t.instanceOf.instance?{error:!1}:{error:!0,type:"instanceOf"}:{error:!0,type:"value"}}var g={checkParameters:(e,t)=>{Object.keys(t).forEach((r=>{if(void 0===e[r])throw new Error(`Cannot Found Condition For "${r}"`);const n=m(t[r],e[r]);if(n.error){if("type"===n.type)throw new Error(`Parameter "${r}" Must Be ${e[r].type.length>1?e[r].type.map((e=>`<${e}>`)).join(" Or "):`A <${e[r].type[0]}>`}`);if("value"===n.type)throw new Error(`Parameter "${r}" Must Be ${e[r].value.join(" Or ")}`);if("instanceOf"===n.type)throw new Error(`Parameter "${r}" Must Be An Instance Of <${e[r].instanceOf.name}>`)}}))},checkObject:(e,t,r)=>{Object.keys(t).forEach((n=>{const i=m(r[n],t[n]);if(i.error){if("type"===i.type)throw new Error(`Value "${n}" In "${e}" Must Be ${t[n].type.length>1?t[n].type.map((e=>`<${e}>`)).join(" Or "):`A <${t[n].type[0]}>`}`);if("value"===i.type)throw new Error(`Value "${n}" In "${e}" Must Be ${t[n].value.join(" Or ")}`);if("instanceOf"===i.type)throw new Error(`Value "${n}" In ${e} Must Be An Instance Of <${t[n].instanceOf.name}>`)}}))},generateID:(e,t)=>{let r=0;for(;t.includes(r.toString().padStart(e,"0"));)r++;return r.toString().padStart(e,"0")}},d=class{constructor(e){i(this,"_Core"),i(this,"_attributes",{}),this._Core=e}createAttribute(e,t,r){if(g.checkParameters({name:{type:["string"]},callback:{type:["function"]},update:{type:["undefined","boolean"]}},{name:e,callback:t,update:r}),void 0!==this._attributes[e])throw new Error(`Attribute Already Exist: "${e}"`);this._attributes[e]=t,r&&this._Core.Observer.checkChildren(this._Core.element)}deleteAttribute(e,t){if(g.checkParameters({name:{type:["string"]},update:{type:["undefined","boolean"]}},{name:e,update:t}),void 0===this._attributes[e])throw new Error(`Attribute Not Found: "${e}"`);delete this._attributes[e],t&&this._Core.Observer.checkChildren(this._Core.element)}getAttribute(e){return g.checkParameters({name:{type:["string"]}},{name:e}),"light:"===e.substring(0,6)?this._attributes[e.substring(6,e.length)]:void 0}},y=class{constructor(){i(this,"_listeners",{})}listen(e,t,r,n){g.checkParameters({name:{type:["string"]},callback:{type:["function"]}},{name:t,callback:r}),void 0===n&&(n={});const i=g.generateID(5,Object.keys(this._listeners)),s=(...e)=>{n.once&&this.removeListener(i),r(...e)};return this._listeners[i]={target:e,name:t,callback:s,tag:n.tag},e.addEventListener(t,s,n),i}removeListener(e){if(g.checkParameters({id:{type:["string"]}},{id:e}),void 0===this._listeners[e])throw new Error(`Listener Not Found: "${e}"`);this._listeners[e].target.removeEventListener(this._listeners[e].name,this._listeners[e].callback)}removeAllListeners(){Object.keys(this._listeners).forEach((e=>this.removeListener(e)))}findListeners(e,t){const r=[];return Object.keys(this._listeners).forEach((n=>{this._listeners[n].target!==e||void 0!==t.name&&this._listeners[n].name!==t.name||void 0!==t.tag||this._listeners[n].tag!==t.tag||r.push(n)})),r}},b=class{constructor(){i(this,"_interval"),i(this,"_timers",{})}createTimeout(e,t){g.checkParameters({ms:{type:["number"]},callback:{type:["function"]}},{ms:e,callback:t});const r=g.generateID(5,Object.keys(this._timers));return this._timers[r]={times:1,interval:e,callback2:t,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),r}createInterval(e,t){g.checkParameters({interval:{type:["number"]},callback:{type:["function"]}},{interval:e,callback:t});const r=g.generateID(5,Object.keys(this._timers));return this._timers[r]={times:1/0,interval:e,callback:t,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),r}createLoop(e,t,r,n){g.checkParameters({times:{type:["number"]},interval:{type:["number"]},callback:{type:["function"]},callback2:{type:["undefined","function"]}},{times:e,interval:t,callback:r,callback2:n});const i=g.generateID(5,Object.keys(this._timers));return this._timers[i]={times:e,interval:t,callback:r,callback2:n,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),i}deleteTimer(e){if(g.checkParameters({id:{type:["string"]}},{id:e}),void 0===this._timers[e])throw new Error(`Timer Not Found: "${e}"`);delete this._timers[e]}deleteAllTimers(){Object.keys(this._timers).forEach((e=>this.deleteTimer(e)))}_start(){this._interval=setInterval((()=>{const e=performance.now();Object.keys(this._timers).forEach((t=>{const r=this._timers[t];void 0!==r&&e-r.lastUpdateTime>=r.interval&&(void 0!==r.callback&&r.callback(r.count),r.lastUpdateTime=e,r.times!==1/0&&(r.count++,r.count===r.times&&(void 0!==r.callback2&&r.callback2(),delete this._timers[t])))}))}),1)}},p=class{static createStyle(e,t,r){g.checkParameters({style:{type:["string"]},type:{type:["string"]},idFormat:{type:["string"]}},{style:e,type:t,idFormat:r}),void 0===v[t]&&(v[t]={idFormat:r,styles:{}});for(let r of Object.keys(v[t].styles))if(v[t].styles[r]===e)return`${t}-${r}`;const n=g.generateID(5,Object.keys(v[t].styles));return v[t].styles[n]=e,this.updateStyles(),`${t}-${n}`}static updateStyles(){const e=[];Object.keys(v).forEach((t=>{Object.keys(v[t].styles).forEach((r=>e.push(`.${v[t].idFormat.replace("<id>",r)} {${v[t].styles[r]}}`)))})),f.textContent=e.join("\n")}},f=document.head.appendChild(document.createElement("style")),v={},_=class{constructor(e){i(this,"_Core"),i(this,"_units",{}),this._Core=e}createUnit(e,t,r){if(g.checkParameters({name:{type:["string"]},callback:{type:["function"]},update:{type:["undefined","boolean"]}},{name:e,callback:t,update:r}),void 0!==this._units[e])throw new Error(`Unit Already Exist: "${e}"`);this._units[e]=t,r&&this._Core.Observer.checkChildren(this._Core.element)}deleteUnit(e,t){if(g.checkParameters({name:{type:["string"]},update:{type:["undefined","boolean"]}},{name:e,update:t}),void 0===this._units[e])throw new Error(`Unit Not Found: "${e}"`);delete this._units[e],t&&this._Core.Observer.checkChildren(this._Core.element)}parseStyleValue(e){if(e.includes("[")&&e.includes("]")){const t=Object.keys(this._units).sort(((e,t)=>t.length-e.length));let r,n="";for(let i=0;i<e.length;i++)if("["===e[i])r="";else if("]"===e[i]){if("$"===r[0])n+=`var(--${r.substring(1,r.length)})`;else for(let e of t){const t=r.substring(r.length-e.length,r.length);if(t===e){n+=this._units[t](r.substring(0,r.length-e.length));break}}r=void 0}else void 0===r?n+=e[i]:r+=e[i];return n}return e}};function k(e,t,r){g.checkParameters({tagName:{type:["string"]},attributes:{type:["undefined","object"]},children:{type:["undefined","array"]}},{tagName:e,attributes:t,children:r});const n="svg"===e?document.createElementNS("http://www.w3.org/2000/svg","svg"):document.createElement(e);return void 0!==t&&Object.keys(t).forEach((e=>{"innerHTML"===e?n.innerHTML=t[e]:n.setAttribute(e,t[e])})),void 0!==r&&r.forEach((e=>n.appendChild(e))),n}function A(e,t,r){g.checkParameters({src:{type:["string"]},attributes:{type:["object"]}},{src:e,attributes:t});const n=k("div",t);return void 0===r&&!1===r?(fetch(e).then((e=>s(this,null,(function*(){return n.innerHTML=yield e.text()})))),n):new Promise((t=>s(this,null,(function*(){n.innerHTML=yield(yield fetch(e)).text(),t(n)}))))}var C=class{constructor(e){i(this,"_Core"),i(this,"observer"),this._Core=e,this.observer=new MutationObserver((t=>{t.forEach((t=>{P.getComponentFromParent(t.target)===e.id&&("childList"===t.type?Array.from(t.addedNodes).forEach((e=>{void 0!==e.tagName&&this.checkChildren(e)})):"attributes"===t.type&&this.checkAttributes(t.target,t.attributeName))}))})),this.observer.observe(e.element,{subtree:!0,childList:!0,attributes:!0})}checkChildren(e){void 0!==e.tagName&&(this.checkAttributes(e),Array.from(e.children).forEach((e=>{void 0!==e.tagName&&null===e.getAttribute("light")&&this.checkChildren(e)})))}checkAttributes(e,t){if(g.checkParameters({attributeName:{type:["undefined","string"]}},{attributeName:t}),void 0!==e.tagName)if(void 0===t)e.getAttributeNames().forEach((t=>{const r=this._Core.AttributeManager.getAttribute(t);void 0!==r&&r(e,e.getAttribute(t))}));else{const r=this._Core.AttributeManager.getAttribute(t);void 0!==r&&r(e,e.getAttribute(t))}}},E=class{constructor(e,t,r){i(this,"_id"),i(this,"_element"),i(this,"_API"),i(this,"data"),i(this,"ListenerManager"),i(this,"TimerManager"),i(this,"AttributeManager"),i(this,"UnitManager"),i(this,"Observer"),i(this,"PluginManager",L),i(this,"ComponentManager",P),i(this,"CustomElementManager",h),i(this,"StyleManager",p),g.checkParameters({API:{instanceOf:{instance:D,name:"Light"}},element:{instanceOf:{instance:HTMLElement,name:"HTMLElement"}}},{API:e,element:t}),this._id=P.registerComponent(this),this._element=t,this._API=e,this.data=r,this.ListenerManager=new y,this.TimerManager=new b,this.AttributeManager=new d(this),this.UnitManager=new _(this),this.Observer=new C(this),t.setAttribute("light",this._id),L.initializePlugins(this),this.Observer.checkChildren(this._element)}get id(){return this._id}get element(){return this._element}getElementByID(e){return g.checkParameters({id:{type:["string"]}},{id:e}),M(this._element,(t=>t.id===e),1)[0]}getElementsByClassName(e){return g.checkParameters({className:{type:["string"]}},{className:e}),M(this._element,(t=>Array.from(t.classList).includes(e)),1/0)}getElementsByTagName(e){return g.checkParameters({tagName:{type:["string"]}},{tagName:e}),M(this._element,(t=>t.tagName===e),1/0)}getAllElements(){return M(this._element,(()=>!0),1/0)}load(e,t){g.checkParameters({html:{type:["string"]},componentPath:{type:["undefined","string"]}},{html:e,componentPath:t}),w(this._element),this.ListenerManager.removeAllListeners(),this.TimerManager.deleteAllTimers();const r=k("div",{innerHTML:e}),n=M(r,(e=>"script"===e.localName),1/0).map((e=>(e.remove(),{type:e.getAttribute("type"),content:e.innerHTML})));this._element.innerHTML=r.innerHTML,n.forEach((e=>{"module"===e.type?new Function("Light","Component","Import",`(async()=>{${e.content}})()`)(D,this._API,(e=>s(this,null,(function*(){if(void 0!==t&&"."===e[0]){const r=t.split("/");e.split("/").forEach((e=>{"."===e?r.splice(r.length-1,1):".."===e?r.splice(r.length-2,2):r.push(e)})),e=r.join("/")}return yield import(e)})))):new Function("Light","Component",e.content)(D,this._API)}))}remove(){w(this._element),this.ListenerManager.removeAllListeners(),this.TimerManager.deleteAllTimers(),this.Observer.observer.disconnect(),P.unregisterComponent(this._id),this._id=void 0,this._element.setAttribute("light",null)}};function M(e,t,r){let n=[];for(const i of Array.from(e.children))if(t(i)&&n.push(i),n=n.concat(M(i,t,r-n.length)),n.length>=r)break;return n}function w(e){Array.from(e.children).forEach((e=>{null!==e.getAttribute("light")?P.getComponent(e.getAttribute("light")).remove():w(e)}))}var P=class{static registerComponent(e){g.checkParameters({Core:{instanceOf:{instance:E,name:"Core"}}},{Core:e});const t=g.generateID(5,Object.keys(O));return O[t]=e,t}static unregisterComponent(e){if(g.checkParameters({id:{type:["string"]}},{id:e}),void 0===O[e])throw new Error(`Component Not Found: "${e}"`);delete O[e]}static getComponent(e){return g.checkParameters({id:{type:["string"]}},{id:e}),O[e]}static getComponentFromParent(e){g.checkParameters({element:{instanceOf:{instance:HTMLElement,name:"HTMLElement"}}},{element:e});const t=e.getAttribute("light");return null!==t?t:null!==e.parentElement?this.getComponentFromParent(e.parentElement):void 0}},O={},L=class{static get plugin(){return Object.keys(T)}static addPlugin(e){if(g.checkParameters({Plugin:{type:["object"]}},{Plugin:e}),void 0!==T[e.id])throw new Error(`Plugin Is Already Added: "${e.id}"`);T[e.id]=e,void 0!==e.register&&e.register(D,{PluginManager:this,ComponentManager:P,CustomElementManager:h,Tools:g})}static removePlugin(e){if(g.checkParameters({id:{type:["string"]}},{id:e}),void 0===T[e])throw new Error(`Plugin Not Found: "${e}"`);delete T[e]}static initializePlugins(e){g.checkParameters({Core:{instanceOf:{instance:E,name:"Core"}}},{Core:e}),Object.keys(T).forEach((t=>{void 0!==T[t].init&&T[t].init(e)}))}},T={};function $(e){return j(e),Object.keys(e).map((t=>{let r="";for(let e=0;e<t.length;e++)I.includes(t[e])?r+=`-${t[e].toLowerCase()}`:r+=t[e];return`${r}:${e[t]}`})).join(";")}function j(e){if(void 0!==e.center){const t=e.center.split(" ");(t.includes("row")||t.includes("all"))&&("column"===e.flexDirection?e.alignItems="center":e.justifyContent="center"),(t.includes("column")||t.includes("all"))&&("column"===e.flexDirection?e.justifyContent="center":e.alignItems="center"),delete e.center}return e}function N(e){const t={};return e.split(";").forEach((e=>{if(e.length>0){const[r,n]=e.split(":");t[r.trim()]=n.trim()}})),t}var I="ABCDEFGHIJKLMNOPQRSTUVWXYZ";function S(e,t){let r=e.getAttribute("class");const n=null===r?[]:r.split(" ");n.includes(t)||n.push(t),e.setAttribute("class",n.join(" "))}var H={id:"Default",register:(e,t)=>{class r extends HTMLElement{constructor(){super()}connectedCallback(){return s(this,null,(function*(){void 0===F[this.getAttribute("src")]&&(F[this.getAttribute("src")]=yield(yield fetch(this.getAttribute("src"))).text());const e=k("div",{innerHTML:F[this.getAttribute("src")]});this.getAttributeNames().forEach((t=>e.setAttribute(t,this.getAttribute(t)))),this.replaceWith(e)}))}}t.CustomElementManager.createCustomElement("svg",r)},init:e=>{e.AttributeManager.createAttribute("style",((t,r)=>{const n=j(N(e.UnitManager.parseStyleValue(r))),i={};Object.keys(n).forEach((e=>{["transition","transitionDuration"].includes(e)&&(i[e]=n[e],delete n[e])}));const s=Array.from(t.classList).filter((e=>!e.includes("style-")));s.length>0?t.setAttribute("class",s.join(" ")):t.removeAttribute("class"),S(t,e.StyleManager.createStyle($(n),"style","style-<id>")),window.requestAnimationFrame((()=>Object.keys(i).forEach((e=>t.style[e]=i[e]))))}),!1),e.AttributeManager.createAttribute("style:hover",((t,r)=>S(t,e.StyleManager.createStyle(e.UnitManager.parseStyleValue(r),"hover","hover-<id>:hover"))),!1),e.AttributeManager.createAttribute("style:hold",((t,r)=>S(t,e.StyleManager.createStyle(e.UnitManager.parseStyleValue(r),"hold","hold-<id>:active:hover"))),!1),e.AttributeManager.createAttribute("trigger",((e,t)=>{null===e.getAttribute("light:trigger-set")&&(e.innerHTML=k("a",{innerHTML:e.innerHTML,href:t,target:"_blank",style:$({all:"unset"})}).outerHTML,e.setAttribute("light:trigger-set","true"))}),!1),e.AttributeManager.createAttribute("url",((t,r)=>{if(null===t.getAttribute("light:url-set")){const n=k("a",{innerHTML:t.innerHTML,href:r,style:$({all:"unset"})});for(;t.firstChild;)t.firstChild.remove();t.appendChild(n),e.ListenerManager.listen(n,"click",(e=>e.preventDefault())),t.setAttribute("light:url-set","true")}})),e.UnitManager.createUnit("ps",(e=>`calc(calc(1vw + 1vh) * ${e})`))}},F={};console.log(`[ Light-Framework ]\n\n  Version: ${l}\n  Build: ${o}\n\n  Github: ${c}`);var B,D=class{constructor(e,t){i(this,"_Core"),i(this,"ListenerManager"),i(this,"TimerManager"),this._Core=new E(this,e,t),this.ListenerManager=this._Core.ListenerManager,this.TimerManager=this._Core.TimerManager}static get use(){return L.addPlugin}static get createElement(){return k}static get createSvgElement(){return A}static get createStyle(){return $}static setStyle(e,t,r){g.checkParameters({element:{instanceOf:{instance:HTMLElement,name:"HTMlElement"}},name:{type:["string"]},value:{type:["number","string"]}},{element:e,name:t,value:r});const n=null===e.getAttribute("light:style")?{}:N(e.getAttribute("light:style"));n[t]=r.toString(),e.setAttribute("light:style",$(n))}get id(){return this._Core.id}get data(){return this._Core.data}get element(){return this._Core.element}set data(e){this._Core.data=e}getElementByID(e){return this._Core.getElementByID(e)}getElementsByClassName(e){return this._Core.getElementsByClassName(e)}getElementsByTagName(e){return this._Core.getElementsByTagName(e)}getAllElements(){return this._Core.getAllElements()}load(e,t){this._Core.load(e,t)}remove(){this._Core.remove()}};return D.use(H),B=a,((i,s,a,l)=>{if(s&&"object"==typeof s||"function"==typeof s)for(let o of r(s))n.call(i,o)||o===a||e(i,o,{get:()=>s[o],enumerable:!(l=t(s,o))||l.enumerable});return i})(e({},"__esModule",{value:!0}),B)})().Light;