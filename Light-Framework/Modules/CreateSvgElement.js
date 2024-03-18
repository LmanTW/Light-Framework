// Create Svg Image
export default async (src, options) => {
  if (window.svgCache[src] === undefined) window.svgCache[src] = await (await fetch(src)).text()

  const svgImage = createElemnet('div', { innerHTML: window.svgCache[src] }).children[0]

  const viewBox = `${svgImage.viewBox.baseVal.x} ${svgImage.viewBox.baseVal.y} ${svgImage.viewBox.baseVal.width} ${svgImage.viewBox.baseVal.height}`
  
  options = (options === undefined) ? { xmlns: 'http://www.w3.org/2000/svg', viewBox, innerHTML: svgImage.innerHTML } : Object.assign(options, { xmlns: 'http://www.w3.org/2000/svg', viewBox, innerHTML: svgImage.innerHTML })

  return createElemnet('svg', options)
}

import createElemnet from './CreateElement.js'
