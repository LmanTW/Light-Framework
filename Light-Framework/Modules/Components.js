export { createComponent, deleteComponent, getComponentIdFromParent, getComponent }

import Tools from './Tools.js'

let components = {}

// Create Component
function createComponent (component) {
  let id = Tools.generateID(5, Object.keys(components))

  components[id] = component
  
  return id
}

// Delete Component
function deleteComponent (id) {
  delete components[id]
}

// Get Component ID From element
function getComponentIdFromParent (element) {
  console.log(element)
  if (element.getAttribute('light') === null) {
    if (element.parentNode === undefined) return
    else return getComponentIdFromParent(element.parentNode)
  } else return element.getAttribute('light')
}

// Get Component
function getComponent (id) {
  return components[id]
}
