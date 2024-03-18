// Apply Style
export default (styleObject) => {
  if (styleObject.center !== undefined) {
    let types = styleObject.center.split(' ')

    styleObject.display = 'flex'

    if (types.includes('row')) {
      if (styleObject.flexDirection === 'column') styleObject.alignItems = 'center'
      else styleObject.justifyContent = 'center'
    }

    if (types.includes('column')) {
      if (styleObject.flexDirection === 'column') styleObject.justifyContent = 'center'
      else styleObject.alignItems = 'center'
    }

    delete styleObject.center
  }

  return styleObject 
}
