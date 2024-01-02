export { createComponent, deleteComponent, getComponentIdFromParent, getComponent }

import generateID from './Tools/GenerateID.js'

let components = {}

// Create Component
function createComponent (component) {
  let id = generateID(5, Object.keys(components))

  components[id] = component
  
  return id
}

// Delete Component
function deleteComponent (id) {
  delete components[id]
}

// Get Component ID From Parent
function getComponentIdFromParent (parent) {
  if (parent.getAttribute('light') === null) {
    if (parent.parentElement === undefined) return
    else return getComponentIdFromParent(parent.parentElement)
  } else return parent.getAttribute('light')
}

// Get Component
function getComponent (id) {
  return components[id]
}
