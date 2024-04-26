var e=Object.defineProperty,t=(t,r,i)=>(((t,r,i)=>{r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[r]=i})(t,"symbol"!=typeof r?r+"":r,i),i),r=(e,t,r)=>new Promise(((i,n)=>{var s=e=>{try{l(r.next(e))}catch(e){n(e)}},a=e=>{try{l(r.throw(e))}catch(e){n(e)}},l=e=>e.done?i(e.value):Promise.resolve(e.value).then(s,a);l((r=r.apply(e,t)).next())})),i="v0.2",n="2024/04/26 15:53",s="https://github.com/LmanTW/Light-Framework",a=class{static createCustomElement(e,t){if(void 0!==l[e])throw new Error(`Custom Element Already Exist: "${e}"`);l[e]=t,customElements.define(`light-${e}`,t)}},l={};function c(e,t){if(void 0!==t.type){const r=Array.isArray(e)?"array":typeof e;if(!t.type.includes(r))return{error:!0,type:"type"}}return void 0===t.value||t.value.includes(e)?void 0===t.instanceOf||e instanceof t.instanceOf.instance?{error:!1}:{error:!0,type:"instanceOf"}:{error:!0,type:"value"}}var o={checkParameters:(e,t)=>{Object.keys(t).forEach((r=>{if(void 0===e[r])throw new Error(`Cannot Found Condition For "${r}"`);const i=c(t[r],e[r]);if(i.error){if("type"===i.type)throw new Error(`Parameter "${r}" Must Be ${e[r].type.length>1?e[r].type.map((e=>`<${e}>`)).join(" Or "):`A <${e[r].type[0]}>`}`);if("value"===i.type)throw new Error(`Parameter "${r}" Must Be ${e[r].value.join(" Or ")}`);if("instanceOf"===i.type)throw new Error(`Parameter "${r}" Must Be An Instance Of <${e[r].instanceOf.name}>`)}}))},checkObject:(e,t,r)=>{Object.keys(t).forEach((i=>{const n=c(r[i],t[i]);if(n.error){if("type"===n.type)throw new Error(`Value "${i}" In "${e}" Must Be ${t[i].type.length>1?t[i].type.map((e=>`<${e}>`)).join(" Or "):`A <${t[i].type[0]}>`}`);if("value"===n.type)throw new Error(`Value "${i}" In "${e}" Must Be ${t[i].value.join(" Or ")}`);if("instanceOf"===n.type)throw new Error(`Value "${i}" In ${e} Must Be An Instance Of <${t[i].instanceOf.name}>`)}}))},generateID:(e,t)=>{let r=0;for(;t.includes(r.toString().padStart(e,"0"));)r++;return r.toString().padStart(e,"0")}},h=class{constructor(e){t(this,"_Core"),t(this,"_attributes",{}),this._Core=e}createAttribute(e,t,r){if(o.checkParameters({name:{type:["string"]},callback:{type:["function"]},update:{type:["undefined","boolean"]}},{name:e,callback:t,update:r}),void 0!==this._attributes[e])throw new Error(`Attribute Already Exist: "${e}"`);this._attributes[e]=t,void 0!==r&&!1!==r||this._Core.Observer.checkChildren(this._Core.element)}deleteAttribute(e,t){if(o.checkParameters({name:{type:["string"]},update:{type:["undefined","boolean"]}},{name:e,update:t}),void 0===this._attributes[e])throw new Error(`Attribute Not Found: "${e}"`);delete this._attributes[e],void 0!==t&&!1!==t||this._Core.Observer.checkChildren(this._Core.element)}getAttribute(e){return o.checkParameters({name:{type:["string"]}},{name:e}),"light:"===e.substring(0,6)?this._attributes[e.substring(6,e.length)]:void 0}},u=class{constructor(){t(this,"_listeners",{})}listen(e,t,r,i){o.checkParameters({name:{type:["string"]},callback:{type:["function"]}},{name:t,callback:r}),void 0===i&&(i={});const n=o.generateID(5,Object.keys(this._listeners)),s=(...e)=>{i.once&&this.removeListener(n),r(...e)};return this._listeners[n]={target:e,name:t,callback:s,tag:i.tag},e.addEventListener(t,s,i),n}removeListener(e){if(o.checkParameters({id:{type:["string"]}},{id:e}),void 0===this._listeners[e])throw new Error(`Listener Not Found: "${e}"`);this._listeners[e].target.removeEventListener(this._listeners[e].name,this._listeners[e].callback)}removeAllListeners(){Object.keys(this._listeners).forEach((e=>this.removeListener(e)))}findListeners(e,t){const r=[];return Object.keys(this._listeners).forEach((i=>{this._listeners[i].target!==e||void 0!==t.name&&this._listeners[i].name!==t.name||void 0!==t.tag||this._listeners[i].tag!==t.tag||r.push(i)})),r}},m=class{constructor(){t(this,"_interval"),t(this,"_timers",{})}createTimeout(e,t){o.checkParameters({ms:{type:["number"]},callback:{type:["function"]}},{ms:e,callback:t});const r=o.generateID(5,Object.keys(this._timers));return this._timers[r]={times:1,interval:e,callback2:t,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),r}createInterval(e,t){o.checkParameters({interval:{type:["number"]},callback:{type:["function"]}},{interval:e,callback:t});const r=o.generateID(5,Object.keys(this._timers));return this._timers[r]={times:1/0,interval:e,callback:t,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),r}createLoop(e,t,r,i){o.checkParameters({times:{type:["number"]},interval:{type:["number"]},callback:{type:["function"]},callback2:{type:["undefined","function"]}},{times:e,interval:t,callback:r,callback2:i});const n=o.generateID(5,Object.keys(this._timers));return this._timers[n]={times:e,interval:t,callback:r,callback2:i,count:0,lastUpdateTime:performance.now()},void 0===this._interval&&this._start(),n}deleteTimer(e){if(o.checkParameters({id:{type:["string"]}},{id:e}),void 0===this._timers[e])throw new Error(`Timer Not Found: "${e}"`);delete this._timers[e]}deleteAllTimers(){Object.keys(this._timers).forEach((e=>this.deleteTimer(e)))}_start(){this._interval=setInterval((()=>{const e=performance.now();Object.keys(this._timers).forEach((t=>{const r=this._timers[t];void 0!==r&&e-r.lastUpdateTime>=r.interval&&(void 0!==r.callback&&r.callback(r.count),r.lastUpdateTime=e,r.times!==1/0&&(r.count++,r.count===r.times&&(void 0!==r.callback2&&r.callback2(),delete this._timers[t])))}))}),1)}},g=class{static createStyle(e,t,r){o.checkParameters({style:{type:["string"]},type:{type:["string"]},idFormat:{type:["string"]}},{style:e,type:t,idFormat:r}),void 0===y[t]&&(y[t]={idFormat:r,styles:{}});for(let r of Object.keys(y[t].styles))if(y[t].styles[r]===e)return`${t}-${r}`;const i=o.generateID(5,Object.keys(y[t].styles));return y[t].styles[i]=e,this.updateStyles(),`${t}-${i}`}static updateStyles(){const e=[];Object.keys(y).forEach((t=>{Object.keys(y[t].styles).forEach((r=>e.push(`.${y[t].idFormat.replace("<id>",r)} {${y[t].styles[r]}}`)))})),d.textContent=e.join("\n")}},d=document.head.appendChild(document.createElement("style")),y={},b=class{constructor(e){t(this,"_Core"),t(this,"_units",{}),this._Core=e}createUnit(e,t,r){if(o.checkParameters({name:{type:["string"]},callback:{type:["function"]},update:{type:["undefined","boolean"]}},{name:e,callback:t,update:r}),void 0!==this._units[e])throw new Error(`Unit Already Exist: "${e}"`);this._units[e]=t,void 0!==r&&!1!==r||this._Core.Observer.checkChildren(this._Core.element)}deleteUnit(e,t){if(o.checkParameters({name:{type:["string"]},update:{type:["undefined","boolean"]}},{name:e,update:t}),void 0===this._units[e])throw new Error(`Unit Not Found: "${e}"`);delete this._units[e],void 0!==t&&!1!==t||this._Core.Observer.checkChildren(this._Core.element)}parseStyleValue(e){if(e.includes("[")&&e.includes("]")){const t=Object.keys(this._units).sort(((e,t)=>t.length-e.length));let r,i="";for(let n=0;n<e.length;n++)if("["===e[n])r="";else if("]"===e[n]){if("$"===r[0])i+=`var(--${r.substring(1,r.length)})`;else for(let e of t){const t=r.substring(r.length-e.length,r.length);if(t===e){i+=this._units[t](r.substring(0,r.length-e.length));break}}r=void 0}else void 0===r?i+=e[n]:r+=e[n];return i}return e}};function p(e,t,r){o.checkParameters({tagName:{type:["string"]},attributes:{type:["undefined","object"]},children:{type:["undefined","array"]}},{tagName:e,attributes:t,children:r});const i="svg"===e?document.createElementNS("http://www.w3.org/2000/svg","svg"):document.createElement(e);return void 0!==t&&Object.keys(t).forEach((e=>{"innerHTML"===e?i.innerHTML=t[e]:i.setAttribute(e,t[e])})),void 0!==r&&r.forEach((e=>i.appendChild(e))),i}function f(e,t,i){return r(this,null,(function*(){o.checkParameters({src:{type:["string"]},attributes:{type:["object"]}},{src:e,attributes:t});const n=p("div",t);return void 0===i&&!1===i?fetch(e).then((e=>r(this,null,(function*(){return n.innerHTML=yield e.text()})))):n.innerHTML=yield(yield fetch(e)).text(),n}))}var v=class{constructor(e){t(this,"_Core"),t(this,"observer"),this._Core=e,this.observer=new MutationObserver((t=>{t.forEach((t=>{E.getComponentFromParent(t.target)===e.id&&("childList"===t.type?Array.from(t.addedNodes).forEach((e=>{void 0!==e.tagName&&this.checkChildren(e)})):"attributes"===t.type&&this.checkAttributes(t.target,t.attributeName))}))})),this.observer.observe(e.element,{subtree:!0,childList:!0,attributes:!0})}checkChildren(e){void 0!==e.tagName&&(this.checkAttributes(e),Array.from(e.children).forEach((e=>{void 0!==e.tagName&&null===e.getAttribute("light")&&this.checkChildren(e)})))}checkAttributes(e,t){if(o.checkParameters({attributeName:{type:["undefined","string"]}},{attributeName:t}),void 0!==e.tagName)if(void 0===t)e.getAttributeNames().forEach((t=>{const r=this._Core.AttributeManager.getAttribute(t);void 0!==r&&r(e,e.getAttribute(t))}));else{const r=this._Core.AttributeManager.getAttribute(t);void 0!==r&&r(e,e.getAttribute(t))}}},k=class{constructor(e,r,i){t(this,"_id"),t(this,"_element"),t(this,"API"),t(this,"data"),t(this,"ListenerManager"),t(this,"TimerManager"),t(this,"AttributeManager"),t(this,"UnitManager"),t(this,"Observer"),t(this,"PluginManager",M),t(this,"ComponentManager",E),t(this,"CustomElementManager",a),t(this,"StyleManager",g),o.checkParameters({API:{instanceOf:{instance:I,name:"Light"}},element:{instanceOf:{instance:HTMLElement,name:"HTMLElement"}}},{API:e,element:r}),this._id=E.registerComponent(this),this._element=r,this.API=e,this.data=i,this.ListenerManager=new u,this.TimerManager=new m,this.AttributeManager=new h(this),this.UnitManager=new b(this),this.Observer=new v(this),r.setAttribute("light",this._id),M.initializePlugins(this),this.Observer.checkChildren(this._element)}get id(){return this._id}get element(){return this._element}getElementByID(e){return o.checkParameters({id:{type:["string"]}},{id:e}),_(this._element,(t=>t.id===e),1)[0]}getElementsByClassName(e){return o.checkParameters({className:{type:["string"]}},{className:e}),_(this._element,(t=>Array.from(t.classList).includes(e)),1/0)}getElementsByTagName(e){return o.checkParameters({tagName:{type:["string"]}},{tagName:e}),_(this._element,(t=>t.tagName===e),1/0)}getAllElements(){return _(this._element,(()=>!0),1/0)}load(e){o.checkParameters({html:{type:["string"]}},{html:e}),A(this._element),this.ListenerManager.removeAllListeners(),this.TimerManager.deleteAllTimers();const t=p("div",{innerHTML:e}),i=_(t,(e=>"script"===e.localName),1/0).map((e=>(e.remove(),{type:e.getAttribute("type"),content:e.innerHTML})));this._element.innerHTML=t.innerHTML,i.forEach((e=>{"module"===e.type?new Function("Light","Component","Import",`(async()=>{${e.content}})()`)(I,this.API,(e=>r(this,null,(function*(){return yield import(e)})))):new Function("Light","Component",e.content)(I,this.API)}))}remove(){A(this._element),this.ListenerManager.removeAllListeners(),this.TimerManager.deleteAllTimers(),this.Observer.observer.disconnect(),E.unregisterComponent(this._id),this._id=void 0,this._element.setAttribute("light",null)}};function _(e,t,r){let i=[];for(const n of Array.from(e.children))if(t(n)&&i.push(n),i=i.concat(_(n,t,r-i.length)),i.length>=r)break;return i}function A(e){Array.from(e.children).forEach((e=>{null!==e.getAttribute("light")?E.getComponent(e.getAttribute("light")).remove():A(e)}))}var E=class{static registerComponent(e){o.checkParameters({Core:{instanceOf:{instance:k,name:"Core"}}},{Core:e});const t=o.generateID(5,Object.keys(C));return C[t]=e,t}static unregisterComponent(e){if(o.checkParameters({id:{type:["string"]}},{id:e}),void 0===C[e])throw new Error(`Component Not Found: "${e}"`);delete C[e]}static getComponent(e){return o.checkParameters({id:{type:["string"]}},{id:e}),C[e]}static getComponentFromParent(e){o.checkParameters({element:{instanceOf:{instance:HTMLElement,name:"HTMLElement"}}},{element:e});const t=e.getAttribute("light");return null!==t?t:null!==e.parentElement?this.getComponentFromParent(e.parentElement):void 0}},C={},M=class{static get plugin(){return Object.keys(w)}static addPlugin(e){if(o.checkParameters({Plugin:{type:["object"]}},{Plugin:e}),void 0!==w[e.id])throw new Error(`Plugin Is Already Added: "${e.id}"`);w[e.id]=e,void 0!==e.register&&e.register(I,{PluginManager:this,ComponentManager:E,CustomElementManager:a,Tools:o})}static removePlugin(e){if(o.checkParameters({id:{type:["string"]}},{id:e}),void 0===w[e])throw new Error(`Plugin Not Found: "${e}"`);delete w[e]}static initializePlugins(e){o.checkParameters({Core:{instanceOf:{instance:k,name:"Core"}}},{Core:e}),Object.keys(w).forEach((t=>{void 0!==w[t].init&&w[t].init(e)}))}},w={};function P(e){return O(e),Object.keys(e).map((t=>{let r="";for(let e=0;e<t.length;e++)T.includes(t[e])?r+=`-${t[e].toLowerCase()}`:r+=t[e];return`${r}:${e[t]}`})).join(";")}function O(e){if(void 0!==e.center){const t=e.center.split(" ");(t.includes("row")||t.includes("all"))&&("column"===e.flexDirection?e.alignItems="center":e.justifyContent="center"),(t.includes("column")||t.includes("all"))&&("column"===e.flexDirection?e.justifyContent="center":e.alignItems="center")}return e}function L(e){const t={};return e.split(";").forEach((e=>{if(e.length>0){const[r,i]=e.split(":");t[r.trim()]=i.trim()}})),t}var T="ABCDEFGHIJKLMNOPQRSTUVWXYZ";function $(e,t){let r=e.getAttribute("class");const i=null===r?[]:r.split(" ");i.includes(t)||i.push(t),e.setAttribute("class",i.join(" "))}var j={id:"Default",register:(e,t)=>{class i extends HTMLElement{constructor(){super()}connectedCallback(){return r(this,null,(function*(){void 0===N[this.getAttribute("src")]&&(N[this.getAttribute("src")]=yield(yield fetch(this.getAttribute("src"))).text());const e=p("div",{innerHTML:N[this.getAttribute("src")]});this.getAttributeNames().forEach((t=>e.setAttribute(t,this.getAttribute(t)))),this.replaceWith(e)}))}}t.CustomElementManager.createCustomElement("svg",i)},init:e=>{e.AttributeManager.createAttribute("style",((t,r)=>{const i=O(L(e.UnitManager.parseStyleValue(r))),n={};Object.keys(i).forEach((e=>{["transition","transitionDuration"].includes(e)&&(n[e]=i[e],delete i[e])}));const s=Array.from(t.classList).filter((e=>!e.includes("style-")));s.length>0?t.setAttribute("class",s.join(" ")):t.removeAttribute("class"),$(t,e.StyleManager.createStyle(P(i),"style","style-<id>")),window.requestAnimationFrame((()=>Object.keys(n).forEach((e=>t.style[e]=n[e]))))}),!1),e.AttributeManager.createAttribute("style:hover",((t,r)=>$(t,e.StyleManager.createStyle(e.UnitManager.parseStyleValue(r),"hover","hover-<id>:hover"))),!1),e.AttributeManager.createAttribute("style:hold",((t,r)=>$(t,e.StyleManager.createStyle(e.UnitManager.parseStyleValue(r),"hold","hold-<id>:active:hover"))),!1),e.AttributeManager.createAttribute("trigger",((e,t)=>{null===e.getAttribute("light:trigger-set")&&(e.innerHTML=p("a",{innerHTML:e.innerHTML,href:t,target:"_blank",style:P({all:"unset"})}).outerHTML,e.setAttribute("light:trigger-set","true"))}),!1),e.AttributeManager.createAttribute("url",((t,r)=>{if(null===t.getAttribute("light:url-set")){const i=p("a",{innerHTML:t.innerHTML,href:r,style:P({all:"unset"})});for(;t.firstChild;)t.firstChild.remove();t.appendChild(i),e.ListenerManager.listen(i,"click",(e=>e.preventDefault())),t.setAttribute("light:url-set","true")}})),e.UnitManager.createUnit("ps",(e=>`calc(calc(1vw + 1vh) * ${e})`))}},N={};console.log(`[ Light-Framework ]\n\n  Version: ${i}\n  Build: ${n}\n\n  Github: ${s}`);var I=class{constructor(e,r){t(this,"_Core"),t(this,"ListenerManager"),t(this,"TimerManager"),this._Core=new k(this,e,r),this.ListenerManager=this._Core.ListenerManager,this.TimerManager=this._Core.TimerManager}static get use(){return M.addPlugin}static get createElement(){return p}static get createSvgElement(){return f}static get createStyle(){return P}static setStyle(e,t,r){o.checkParameters({element:{instanceOf:{instance:HTMLElement,name:"HTMlElement"}},name:{type:["string"]},value:{type:["number","string"]}},{element:e,name:t,value:r});const i=null===e.getAttribute("light:style")?{}:L(e.getAttribute("light:style"));i[t]=r.toString(),e.setAttribute("light:style",P(i))}getElementByID(e){return this._Core.getElementByID(e)}getElementsByClassName(e){return this._Core.getElementsByClassName(e)}getElementsByTagName(e){return this._Core.getElementsByTagName(e)}get getAllElements(){return this._Core.getAllElements()}load(e){this._Core.load(e)}remove(){this._Core.remove()}};I.use(j);export{I as Light};