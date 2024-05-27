// Create Element
function createElement (tagName: ElementTags, attributes?: ElementAttributes, children?: HTMLElement[]): HTMLElement {
  Tools.checkParameters({
    tagName: { type: ['string'] },
    attributes: { type: ['undefined', 'object'] },
    children: { type: ['undefined', 'array'] }
  }, { tagName, attributes, children })

  const element = (tagName === 'svg') ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(tagName)

  if (attributes !== undefined) {
    Object.keys(attributes).forEach((name) => {
      if (name === 'innerHTML') element.innerHTML = attributes[name]!
      else element.setAttribute(name, attributes[name]!)
    })
  }

  if (children !== undefined) children.forEach((child) => element.appendChild(child))

  return element as HTMLElement
}

// Create SVG Element
function createSvgElement (src: string, attributes?: ElementAttributes, wait?: true): HTMLElement
function createSvgElement (src: string, attributes?: ElementAttributes, wait?: false): Promise<HTMLElement>
function createSvgElement (src: string, attributes?: ElementAttributes, wait?: boolean): HTMLElement | Promise<HTMLElement> {
  Tools.checkParameters({
    src: { type: ['string'] },
    attributes: { type: ['object'] }
  }, { src, attributes })

  const element = createElement('div', attributes)

  if (wait === undefined || wait === false) {
    fetch(src).then(async (response) => element.innerHTML = await response.text())

    return element
  } else {
    return new Promise(async (resolve) => {
      element.innerHTML = await (await fetch(src)).text()

      resolve(element)
    })
  }
}

type ElementTags = 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'bdi' | 'bdo' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kdb' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'menu' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroupt' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'search' | 'section' | 'select' | 'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'svg' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr' | string

interface ElementAttributes {
  innerHTML?: string,

  accept?: string,
  'accept-charset'?: string,
  accesskey?: string,
  action?: string,
  alt?: string,
  async?: string,
  autocomplete?: string,
  autofocus?: string,
  autoplay?: string,
  bgcolor?: string,
  border?: string,
  charset?: string,
  checked?: string,
  cite?: string,
  class?: string,
  cols?: string,
  colspan?: string,
  content?: string,
  contenteditable?: string,
  controls?: string,
  coords?: string,
  data?: string,
  datetime?: string,
  default?: string,
  defer?: string,
  dir?: string,
  dirname?: string,
  disabled?: string,
  download?: string,
  draggable?: string,
  enctype?: string,
  enterkeyhint?: string,
  for?: string,
  form?: string,
  formaction?: string,
  headers?: string,
  height?: string,
  hidden?: string,
  high?: string,
  href?: string,
  hreflang?: string,
  'http-equiv'?: string,
  id?: string,
  inert?: string,
  inputmode?: string,
  ismap?: string,
  kind?: string,
  label?: string,
  lang?: string,
  list?: string,
  loop?: string,
  low?: string,
  max?: string,
  maxlength?: string,
  media?: string,
  method?: string,
  min?: string,
  multiple?: string,
  muted?: string,
  name?: string,
  novalidate?: string,
  open?: string,
  optimum?: string,
  pattern?: string,
  placeholder?: string,
  popover?: string,
  popovertarget?: string,
  popovertargetaction?: string,
  poster?: string,
  preload?: string,
  readonly?: string,
  rel?: string,
  required?: string,
  reversed?: string,
  rows?: string,
  rowspan?: string,
  sandbox?: string,
  scope?: string,
  selected?: string,
  shape?: string,
  size?: string,
  sizes?: string,
  span?: string,
  spellcheck?: string,
  src?: string,
  srcdoc?: string,
  srclang?: string,
  start?: string,
  step?: string,
  style?: string,
  tabindex?: string,
  target?: string,
  title?: string,
  translate?: string,
  type?: string,
  usemap?: string,
  value?: string,
  width?: string,
  wrap?: string,

  [key: string]: undefined | string
}

export { createElement, createSvgElement }

import Tools from './Tools/Main.ts'
