// ../../Light-Framework/Info.json
var Info_default = {
  version: "v2 Beta 0.1",
  build: "2024/02/07 20:01",
  github: "https://github.com/LmanTW/Light-Framework"
};

// ../../Light-Framework/Modules/Tools/ParseObjectToCss.js
var ParseObjectToCss_default = (object) => {
  const styles2 = [];
  Object.keys(object).forEach((key) => {
    let name = [];
    key.split("").forEach((char) => {
      if (uppercaseLetters.includes(char)) {
        name.push("-");
        name.push(char.toLowerCase());
      } else
        name.push(char);
    });
    styles2.push(`${name.join("")}: ${object[key]}`);
  });
  return styles2.join("; ");
};
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ../../Light-Framework/Modules/Tools/ParseCssToObject.js
var ParseCssToObject_default = (style2) => {
  const object = {};
  style2.split(";").forEach((chunk) => {
    let [name, value] = chunk.split(":");
    if (value === void 0)
      return;
    name = name.replaceAll(" ", "").split("");
    while (name.includes("-")) {
      let index = name.indexOf("-");
      name[index + 1] = name[index + 1].toUpperCase();
      name.splice(index, 1);
    }
    while (value[0] === " ")
      value = value.substring(1, value.length);
    while (value[value.length - 1] === " ")
      value = value.substring(0, value.length - 1);
    object[name.join("")] = value;
  });
  return object;
};

// ../../Light-Framework/Modules/Tools/CheckValue.js
var CheckValue_default = (value, conditions) => {
  if (conditions.type !== void 0) {
    const type = Array.isArray(value) ? "array" : typeof value;
    if (!conditions.type.includes(type))
      return { error: true, type: "type" };
  }
  if (conditions.value !== void 0 && !conditions.value.includes(parameters))
    return { error: true, type: "value" };
  return { error: false };
};

// ../../Light-Framework/Modules/Tools/CheckParameters.js
var CheckParameters_default = (conditions, parameters2) => {
  Object.keys(parameters2).forEach((name) => {
    if (conditions[name] === void 0)
      throw new Error(`Cannot Found Condition For "${name}"`);
    const result = CheckValue_default(parameters2[name], conditions[name]);
    if (result.error) {
      if (result.type === "type")
        throw new Error(`Parameter "${name}" Must Be ${conditions[name].type.length > 1 ? conditions[name].type.map((typeName) => `<${typeName}>`).join(" Or ") : `A <${conditions[name].type[0]}>`}`);
      if (result.type === "value")
        throw new Error(`Parameter "${name}" Must Be ${conditions[name].value.join(" Or ")}`);
    }
  });
};

// ../../Light-Framework/Modules/Tools/ParseStyleValue.js
var ParseStyleValue_default = (value, units) => {
  if (value.includes("[") && value.includes("]")) {
    const unitList = Object.keys(units).sort((a, b) => b.length - a.length);
    for (let i = 0; i < value.length; i++) {
      if (value[i] === "[") {
        let chunk = "";
        while (value[i] !== "]" && i < value.length) {
          i++;
          if (value[i] !== "]")
            chunk += value[i];
        }
        if (chunk[0] === "$")
          value = value.replaceAll(`[${chunk}]`, `var(--${chunk.substring(1, chunk.length)})`);
        else {
          for (let unit of unitList) {
            if (chunk.substring(chunk.length - unit.length, chunk.length) === unit)
              value = value.replaceAll(`[${chunk}]`, units[unit](chunk.substring(0, chunk.length - unit.length)));
          }
        }
      }
    }
  }
  return value;
};

// ../../Light-Framework/Modules/Tools/CheckObject.js
var CheckObject_default = (objectName, conditions, object) => {
  Object.keys(conditions).forEach((key) => {
    const result = CheckValue_default(object[key], conditions[key]);
    if (result.error) {
      if (result.type === "type")
        throw new Error(`Value "${key}" In "${objectName}" Must Be ${conditions[key].type.length > 1 ? conditions[key].type.map((typeName) => `<${typeName}>`).join(" Or ") : `A <${conditions[key].type[0]}>`}`);
      if (result.type === "value")
        throw new Error(`Value "${key}" In "${objectName}" Must Be ${conditions[key].value.join(" Or ")}`);
    }
  });
};

// ../../Light-Framework/Modules/Tools/GenerateID.js
var GenerateID_default = (length, keys) => {
  let count = 0;
  while (keys.includes(new String(count).padStart(length, "0")))
    count++;
  return new String(count).padStart(length, "0");
};

// ../../Light-Framework/Modules/Tools/ApplyStyle.js
var ApplyStyle_default = (style2) => {
  if (style2.center !== void 0) {
    let types = style2.center.split(" ");
    style2.display = "flex";
    if (types.includes("row")) {
      if (style2.flexDirection === "column")
        style2.alignItems = "center";
      else
        style2.justifyContent = "center";
    }
    if (types.includes("column")) {
      if (style2.flexDirection === "column")
        style2.justifyContent = "center";
      else
        style2.alignItems = "center";
    }
    delete style2.center;
  }
  Object.keys((name) => style2[`-webkit-${name}`] = style2[name]);
  return style2;
};

// ../../Light-Framework/Modules/Tools/Main.js
var Main_default = {
  parseObjectToCss: ParseObjectToCss_default,
  parseCssToObject: ParseCssToObject_default,
  checkParameters: CheckParameters_default,
  parseStyleValue: ParseStyleValue_default,
  checkObject: CheckObject_default,
  generateID: GenerateID_default,
  applyStyle: ApplyStyle_default
};

// ../../Light-Framework/Modules/Managers/ComponentManager.js
var components = {};
var ComponentManager_default = class {
  // Create Component
  static createComponent(Component) {
    const id = Main_default.generateID(5, Object.keys(components));
    components[id] = Component;
    return id;
  }
  // Get Component From Parent
  static getComponentFromParent(element) {
    if (element === null)
      return;
    else if (element.getAttribute("light") === null) {
      if (element.parentNode === void 0)
        return;
      else
        return this.getComponentFromParent(element.parentNode);
    } else
      return element.getAttribute("light");
  }
  // Get Component
  static getComponent(id) {
    return components[id];
  }
};

// ../../Light-Framework/Modules/Managers/PluginManager.js
var PluginManager_default = class {
  static get plugins() {
    return plugins;
  }
  // Add Plugin
  static addPlugin(plugin) {
    Main_default.checkParameters({
      plugin: { type: ["object"] }
    }, { plugin });
    if (plugin.id === void 0)
      throw new Error("Could Not Verify Plugin (ID Not Found)");
    if (plugins[plugin.id] !== void 0)
      throw new Error(`Plugin Is Already Used: ${plugin.id}`);
    plugins[plugin.id] = plugin;
    if (plugin.register !== void 0) {
      if (typeof plugin.register !== "function")
        throw new Error(`Failed To Register Plugin: ${plugin.id}`);
      plugins[plugin.id].register(API_default, Main_default);
    }
  }
  // Initialize Plugins
  static initializePlugins(Core) {
    Object.keys(plugins).forEach((id) => {
      if (plugins[id].init !== void 0) {
        if (typeof plugins[id].init !== "function")
          throw new Error(`Failed To Register Plugin: ${id}`);
        plugins[id].init(Core, Main_default);
      }
    });
  }
};
var plugins = {};

// ../../Light-Framework/Modules/CreateElement.js
var CreateElement_default = (tagName, options, children) => {
  Main_default.checkParameters({
    tagName: { type: ["string"] },
    options: { type: ["undefined", "object"] },
    children: { type: ["undefined", "array"] }
  }, { tagName, options, children });
  const element = tagName === "svg" ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : document.createElement(tagName);
  if (options !== void 0) {
    if (options.class !== void 0)
      options.classList = options.class;
    Object.keys(options).forEach((key) => {
      if (key === "innerHTML")
        element.innerHTML = options[key];
      else if (specialAttributes[key] !== void 0)
        element.setAttribute(specialAttributes[key], ["style", "hover"].includes(key) ? Main_default.parseObjectToCss(Main_default.applyStyle(options[key])) : options[key]);
      else
        element.setAttribute(key, options[key]);
    });
  }
  if (children !== void 0)
    children.forEach((child) => element.appendChild(child));
  return element;
};
var specialAttributes = {
  style: "light:style",
  hover: "light:style:hover",
  trigger: "light:trigger"
};

// ../../Light-Framework/Modules/CreateSvgElement.js
var CreateSvgElement_default = async (src, options) => {
  CheckParameters_default({
    src: { type: ["string"] },
    options: { type: ["undefined", "object"] }
  }, { src, options });
  if (window.svgCache[src] === void 0)
    window.svgCache[src] = await (await fetch(src)).text();
  const svgImage = CreateElement_default("div", { innerHTML: window.svgCache[src] }).children[0];
  let viewBox = `${svgImage.viewBox.baseVal.x} ${svgImage.viewBox.baseVal.y} ${svgImage.viewBox.baseVal.width} ${svgImage.viewBox.baseVal.height}`;
  options = options === void 0 ? { xmlns: "http://www.w3.org/2000/svg", viewBox, innerHTML: svgImage.innerHTML } : Object.assign(options, { xmlns: "http://www.w3.org/2000/svg", viewBox, innerHTML: svgImage.innerHTML });
  return CreateElement_default("svg", options);
};

// ../../Light-Framework/Modules/DefaultPlugin.js
var DefaultPlugin_default = {
  id: "Default",
  register: (_, Tools) => {
    window.svgCache = {};
    class SvgElement extends HTMLElement {
      constructor() {
        super();
      }
      async connectedCallback() {
        if (window.svgCache[this.getAttribute("src")] === void 0)
          window.svgCache[this.getAttribute("src")] = await (await fetch(this.getAttribute("src"))).text();
        const element = CreateElement_default("div", { innerHTML: window.svgCache[this.getAttribute("src")] }).children[0];
        this.getAttributeNames().forEach((name) => {
          if (name !== "src")
            element.setAttribute(name, this.getAttribute(name));
        });
        if (this.parentNode !== null)
          this.outerHTML = element.outerHTML;
      }
    }
    customElements.define("light-svg", SvgElement);
  },
  init: (Core, Tools) => {
    Core.AttributeManager.createAttribute("style", (element, value) => {
      if (element.tagName === "STYLE")
        element.innerHTML = Tools.parseStyleValue(element.innerHTML, Core.UnitManager.units);
      else {
        let styles2 = Tools.applyStyle(Tools.parseCssToObject(Tools.parseStyleValue(value, Core.UnitManager.units)));
        const lateStyles = {};
        Object.keys(styles2).forEach((name) => {
          if (["transition", "transitionDuration"].includes(name)) {
            lateStyles[name] = styles2[name];
            delete styles2[name];
          }
        });
        let classList = Array.from(element.classList).filter((className) => !className.includes("style-"));
        if (classList.length > 0)
          element.setAttribute("class", classList.join(" "));
        else
          element.removeAttribute("class");
        addClass(element, Core.StyleManager.createStyle(Tools.parseObjectToCss(styles2)));
        window.requestAnimationFrame(() => Object.keys(lateStyles).forEach((name) => element.style[name] = lateStyles[name]));
      }
    }, false);
    Core.AttributeManager.createAttribute("style:hover", (element, value) => addClass(element, Core.StyleManager.createHoverStyle(Tools.parseStyleValue(value, Core.UnitManager.units))), false);
    Core.AttributeManager.createAttribute("trigger", (element, value) => Core.ListenerManager.listen(element, "click", () => {
      if (value[0] === "/")
        window.location.href = value;
      else if (value.substring(0, 7) === "http://" || value.substring(0, 8) === "https://")
        window.open(value);
      else
        document.head.appendChild(CreateElement_default("script", { type: "module", innerHTML: value })).remove();
    }), false);
    Core.UnitManager.createUnit("ps", (value) => `calc(calc(1vw + 1vh) * ${value})`);
  }
};
function addClass(element, className) {
  let classList = element.getAttribute("class");
  if (classList === null)
    classList = [];
  else
    classList = classList.split(" ");
  if (!classList.includes(className))
    classList.push(className);
  element.setAttribute("class", classList.join(" "));
}

// ../../Light-Framework/Modules/SetStyle.js
var SetStyle_default = (target, name, value) => {
  Main_default.checkParameters({
    target: { instance: [HTMLElement] },
    name: { type: ["string"] },
    value: { type: ["undefined", "string", "number"] }
  }, { target, name, value });
  const component = ComponentManager_default.getComponent(ComponentManager_default.getComponentFromParent(target));
  if (component === void 0)
    throw new Error("Cannot Find Component");
  let styles2 = Main_default.parseCssToObject(target.getAttribute("light:style") === null ? "" : target.getAttribute("light:style"));
  if (value === void 0)
    delete styles2[name];
  else
    styles2[name] = value;
  target.setAttribute("light:style", Main_default.parseObjectToCss(styles2));
};

// ../../Light-Framework/Modules/Managers/AttributeManager.js
var AttributeManager_default = class {
  #Core;
  #attributes = {};
  constructor(Core) {
    this.#Core = Core;
  }
  get attributes() {
    return this.#attributes;
  }
  // Create Attribute
  createAttribute(name, callback, reload) {
    Main_default.checkParameters({
      name: { type: ["string"] },
      callback: { type: ["function"] },
      reload: { type: ["undefined", "boolean"] }
    }, { name, callback });
    if (this.#attributes[name] !== void 0)
      throw new Error(`Attribute Named "${name}" Already Exist`);
    this.#attributes[name] = callback;
    if (reload === void 0 || reload === true)
      this.#Core.Observer.checkChildren(this.#Core.root);
  }
  // Delete Attribute
  deleteAttribute(name, reload) {
    Main_default.checkParameters({
      name: { type: ["string"] },
      reload: { type: ["undefined", "boolean"] }
    }, { name });
    if (this.#attributes[name] === void 0)
      throw new Error(`Attribute Named "${name}" Not Found`);
    delete this.#attributes[name];
    if (reload === void 0 || reload === true)
      this.#Core.Observer.checkChildren(this.#Core.root);
  }
};

// ../../Light-Framework/Modules/Managers/ListenerManager.js
var ListenerManager_default = class {
  #events = {};
  // Listen
  listen(target, name, callback, options) {
    Main_default.checkParameters({
      name: { type: ["string"] },
      callback: { type: ["function"] },
      options: { type: ["undefined", "object"] }
    }, { name, callback });
    const id = Main_default.generateID(5, Object.keys(this.#events));
    this.#events[id] = { target, name, callback };
    target.addEventListener(name, callback, options);
  }
  // Remove Listener
  remove(id) {
    Main_default.checkParameters({
      id: { type: ["undefined", "string"] }
    }, { id });
    this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback);
  }
  // Remove All Listeners
  removeAllListeners() {
    Object.keys(this.#events).forEach((id) => this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback));
  }
};

// ../../Light-Framework/Modules/Managers/TimerManager.js
var TimerManager_default = class {
  #interval;
  #timers = {};
  // Start Timer
  startTimer() {
    this.#interval = setInterval(() => {
      const time = performance.now();
      Object.keys(this.#timers).forEach((id) => {
        const timer = this.#timers[id];
        if (time - timer.lastUpdateTime >= timer.interval) {
          timer.callback(timer.count);
          timer.lastUpdateTime = time;
          if (timer.times !== Infinity) {
            timer.count++;
            if (timer.count >= timer.times) {
              if (timer.callback2 !== void 0)
                timer.callback2();
              delete this.#timers[id];
            }
          }
        }
      });
    }, 1);
  }
  // Create Timeout
  createTimeout(time, callback) {
    Main_default.checkParameters({
      time: { type: ["number"] },
      callback: { type: ["function"] }
    }, { time, callback });
    const id = Main_default.generateID(5, Object.keys(this.#timers));
    this.#timers[id] = {
      interval: time,
      times: 1,
      callback: () => {
      },
      callback2: callback,
      count: 0,
      lastUpdateTime: performance.now()
    };
    if (this.#interval === void 0)
      this.startTimer();
    return id;
  }
  // Create Interval
  createInterval(interval, callback, instantStart) {
    Main_default.checkParameters({
      interval: { type: ["number"] },
      callback: { type: ["function"] },
      instantStart: { type: ["undefined", "boolean"] }
    }, { interval, callback, instantStart });
    const id = Main_default.generateID(5, Object.keys(this.#timers));
    this.#timers[id] = {
      interval,
      times: Infinity,
      callback,
      count: 0,
      lastUpdateTime: instantStart === true ? performance.now() - interval : performance.now()
    };
    if (this.#interval === void 0)
      this.startTimer();
    return id;
  }
  // Create Loop
  createLoop(interval, times, callback, callback2, instantStart) {
    Main_default.checkParameters({
      interval: { type: ["number"] },
      times: { type: ["number"] },
      callback: { type: ["function"] },
      callback2: { type: ["undefined", "function"] },
      instantStart: { type: ["undefined", "boolean"] }
    }, { interval, times, callback, callback2, instantStart });
    const id = Main_default.generateID(5, Object.keys(this.#timers));
    this.#timers[id] = {
      interval,
      times,
      callback,
      callback2,
      count: 0,
      lastUpdateTime: instantStart === true ? performance.now() - interval : performance.now()
    };
    if (this.#interval === void 0)
      this.startTimer();
    return id;
  }
  // Delete Timer
  deleteTimer(id) {
    Main_default.checkParameters({
      id: { type: ["string"] }
    }, { id });
    if (this.#timers[id] === void 0)
      throw new Error(`Timer Not Found: ${id}`);
    delete this.#timers[id];
    if (Object.keys(this.#timers).length < 1) {
      clearInterval(this.#interval);
      this.#interval = void 0;
    }
  }
  // Delete All Timers
  deleteAllTimers() {
    Object.keys(this.#timers).forEach((id) => this.deleteTimer(id));
  }
};

// ../../Light-Framework/Modules/Managers/StyleManager.js
var style = document.head.appendChild(document.createElement("style"));
var styles = {
  style: {},
  hover: {}
};
var StyleManager_default = class {
  // Create Style
  createStyle(style2) {
    Main_default.checkParameters({
      style: { type: ["string"] }
    }, { style: style2 });
    for (let id2 of Object.keys(styles.style)) {
      if (styles.style[id2] === style2)
        return `style-${id2}`;
    }
    const id = Main_default.generateID(5, Object.keys(styles.style));
    styles.style[id] = style2;
    compileStyle();
    return `style-${id}`;
  }
  // Create Hover Style
  createHoverStyle(style2) {
    Main_default.checkParameters({
      style: { type: ["string"] }
    }, { style: style2 });
    for (let id2 of Object.keys(styles.hover)) {
      if (styles.hover[id2] === style2)
        return `hover-${id2}`;
    }
    const id = Main_default.generateID(5, Object.keys(styles.hover));
    styles.hover[id] = style2;
    compileStyle();
    return `hover-${id}`;
  }
};
function compileStyle() {
  const chunks = [];
  Object.keys(styles.style).forEach((id) => chunks.push(`.style-${id} {${styles.style[id]}}`));
  Object.keys(styles.hover).forEach((id) => chunks.push(`.hover-${id}:hover {${styles.hover[id]}}`));
  style.textContent = chunks.join("");
}

// ../../Light-Framework/Modules/Managers/UnitManager.js
var UnitManager_default = class {
  #Core;
  #units = {};
  constructor(Core) {
    this.#Core = Core;
  }
  get units() {
    return this.#units;
  }
  // Create Unit
  createUnit(name, callback, reload) {
    Main_default.checkParameters({
      name: { type: ["string"] },
      callback: { type: ["function"] },
      reload: { type: ["undefined", "boolean"] }
    }, { name, callback });
    if (this.#units[name] !== void 0)
      throw new Error(`Unit Named "${name}" Already Exist`);
    this.#units[name] = callback;
    if (reload === void 0 || reload === true)
      this.#Core.Observer.checkChildren(this.#Core.root);
  }
  // Delete Unit
  deleteUnit(name, reload) {
    Main_default.checkParameters({
      name: { type: ["string"] },
      reload: { type: ["undefined", "boolean"] }
    }, { name });
    if (this.#units[name] === void 0)
      throw new Error(`Unit Named "${name}" Not Found`);
    delete this.#units[name];
    if (reload === void 0 || reload === true)
      this.#Core.Observer.checkChildren(this.#Core.root);
  }
};

// ../../Light-Framework/Modules/Observer.js
var Observer_default = class {
  #Core;
  #observer;
  constructor(Core) {
    this.#Core = Core;
    this.#observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (ComponentManager_default.getComponentFromParent(mutation.target) === Core.id) {
          if (mutation.type === "childList")
            Array.from(mutation.addedNodes).forEach((element) => this.checkChildren(element, true));
          else if (mutation.type === "attributes" && mutation.attributeName.substring(0, 6) === "light:" && this.#Core.AttributeManager.attributes[mutation.attributeName.substring(6, mutation.attributeName.length)] !== void 0)
            this.checkAttribute(mutation.target, mutation.attributeName.substring(6, mutation.attributeName.length));
        }
      });
    });
    this.#observer.observe(Core.root, { childList: true, subtree: true, attributes: true });
  }
  // Check Children
  checkChildren(element) {
    if (element.tagName !== void 0) {
      this.checkAttribute(element);
      Array.from(element.children).forEach((child) => {
        if (child.getAttribute("light") === null)
          this.checkChildren(child);
      });
    }
  }
  // Check Attribute
  checkAttribute(element, attributeName) {
    if (element.tagName !== void 0) {
      if (attributeName === void 0) {
        element.getAttributeNames().forEach((name) => {
          if (name.substring(0, 6) === "light:" && this.#Core.AttributeManager.attributes[name.substring(6, name.length)] !== void 0)
            this.#Core.AttributeManager.attributes[name.substring(6, name.length)](element, element.getAttribute(name));
        });
      } else if (this.#Core.AttributeManager.attributes[attributeName] !== void 0)
        this.#Core.AttributeManager.attributes[attributeName](element, element.getAttribute(`light:${attributeName}`));
    }
  }
};

// ../../Light-Framework/Modules/Core.js
var Core_default = class {
  #id;
  #root;
  #data;
  #finishCallback;
  constructor(Component, target, data) {
    if (typeof target !== "string" && !(target instanceof HTMLElement))
      throw new Error('Parameter "target" Must Be A <string> Or An Instance Of HTMLElement');
    Main_default.checkParameters({
      data: { type: ["undefined", "object"] }
    }, { data });
    this.#data = data === void 0 ? {} : data;
    this.#root = typeof target === "string" ? document.querySelector(target) : target;
    if (this.#root === null)
      throw new Error(`Target Not Found: ${target}`);
    if (this.#root.getAttribute("light") !== null)
      throw new Error("Target Is Already A Light Component");
    this.#id = ComponentManager_default.createComponent(Component);
    this.ListenerManager = new ListenerManager_default();
    this.TimerManager = new TimerManager_default();
    this.AttributeManager = new AttributeManager_default(this);
    this.UnitManager = new UnitManager_default(this);
    this.StyleManager = new StyleManager_default(this);
    this.Observer = new Observer_default(this);
    this.#root.setAttribute("light", this.#id);
    PluginManager_default.initializePlugins(this);
  }
  get root() {
    return this.#root;
  }
  get id() {
    return this.#id;
  }
  get data() {
    return this.#data;
  }
  // Load Component From URl
  async load(html, wait) {
    Main_default.checkParameters({
      html: { type: ["string"] },
      wait: { type: ["undefined", "boolean"] }
    }, { html, wait });
    this.ListenerManager.removeAllListeners();
    this.TimerManager.deleteAllTimers();
    return new Promise((resolve) => {
      const content = CreateElement_default("div", { innerHTML: html });
      const newRoot = document.body.appendChild(CreateElement_default("div", { light: this.#id }));
      newRoot.style.position = "fixed";
      newRoot.style.bottom = "0px";
      newRoot.style.width = "0px";
      newRoot.style.height = "0px";
      newRoot.style.overflow = "hidden";
      Array.from(content.children).forEach((child) => {
        if (child.tagName !== "SCRIPT")
          newRoot.appendChild(child);
      });
      Array.from(content.children).forEach((child) => {
        if (child.tagName === "SCRIPT") {
          const script = CreateElement_default("script", { innerHTML: child.innerHTML });
          child.getAttributeNames().forEach((name) => script.setAttribute(name, child.getAttribute(name)));
          newRoot.appendChild(script);
        }
      });
      if (wait === true)
        this.#finishCallback = () => updateRoot(this.#root);
      else
        updateRoot(this.#root);
      function updateRoot(root) {
        while (root.firstChild)
          root.firstChild.remove();
        Array.from(newRoot.children).forEach((child) => {
          root.appendChild(child);
        });
        newRoot.remove();
        resolve();
      }
    });
  }
  // Remove Component
  remove() {
    deleteComponent(this.#id);
    this.ListenerManager.removeAllListeners();
    this.TimerManager.deleteAllTimers();
  }
  // Finish Loading
  finish() {
    if (this.#finishCallback !== void 0) {
      this.#finishCallback();
      this.#finishCallback = void 0;
    }
  }
};

// ../../Light-Framework/API.js
if (window.light === void 0) {
  console.log(`[ Light-Framework ]

  Version: ${Info_default.version}
  Build: ${Info_default.build}

  Github: ${Info_default.github}`);
  window.light = true;
}
var API = class {
  static get use() {
    return PluginManager_default.addPlugin;
  }
  static get createElement() {
    return CreateElement_default;
  }
  static get createSvgElement() {
    return CreateSvgElement_default;
  }
  static get setStyle() {
    return SetStyle_default;
  }
  // Get Component
  static getComponent(element) {
    Main_default.checkParameters({
      element: { instance: [HTMLElement] }
    }, { element });
    let id = ComponentManager_default.getComponentFromParent(element);
    return ComponentManager_default.getComponent(id);
  }
  #Core;
  constructor(target, options) {
    this.#Core = new Core_default(this, target, options);
    this.Event = this.#Core.ListenerManager;
    this.Timer = this.#Core.TimerManager;
  }
  async load(html, wait) {
    await this.#Core.load(html, wait);
  }
  remove() {
    this.#Core.remove();
  }
  finish() {
    this.#Core.finish();
  }
};
var API_default = API;
PluginManager_default.addPlugin(DefaultPlugin_default);
export {
  API_default as default
};
