// Create Svg Image
export default async (url, options) => {
  checkParameters({
    url: { type: ['string'] },
    options: { type: ['undefined', 'object'] }
  }, { url, options })

  if (cache[url] === undefined) cache[url] = await (await fetch(url)).text()

  const svgImage = createElemnet('div', { innerHTML: cache[url] }).children[0]
  let viewBox = `${svgImage.viewBox.baseVal.x} ${svgImage.viewBox.baseVal.y} ${svgImage.viewBox.baseVal.width} ${svgImage.viewBox.baseVal.height}`
  
  options = (options === undefined) ? { xmlns: 'http://www.w3.org/2000/svg', viewBox, innerHTML: svgImage.innerHTML } : Object.assign(options, { xmlns: 'http://www.w3.org/2000/svg', viewBox, innerHTML: svgImage.innerHTML })

  return createElemnet('svg', options)
}

import checkParameters from './Tools/CheckParameters.js'

import createElemnet from './CreateElement.js'

let cache = {}
