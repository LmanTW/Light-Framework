// Apply Style
export default (style) => {
  if (style.center !== undefined) {
    let types = style.center.split(' ')

    style.display = 'flex'

    if (types.includes('row')) {
      if (style.flexDirection === 'column') style.alignItems = 'center'
      else style.justifyContent = 'center'
    }

    if (types.includes('column')) {
      if (style.flexDirection === 'column') style.justifyContent = 'center'
      else style.alignItems = 'center'
    }

    delete style.center
  }

  webkit.forEach((name) => {
    if (style[name] !== undefined) style[`-webkit-${name}`] = style[name]
  })

  return style
}

const webkit = ['backdropFilter']
