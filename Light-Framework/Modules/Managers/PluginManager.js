// Plugin Manager
export default class {
  static get plugins () {return plugins}

  // Add Plugin
  static addPlugin (plugin) {
    Tools.checkParameters({
      plugin: { type: ['object'] },
    }, { plugin })

    if (plugin.id === undefined) throw new Error('Could Not Verify Plugin (ID Not Found)')

    if (plugins[plugin.id] !== undefined) throw new Error(`Plugin Is Already Used: ${plugin.id}`)

    plugins[plugin.id] = plugin

    if (plugin.register !== undefined) {
      if (typeof plugin.register !== 'function') throw new Error(`Failed To Register Plugin: ${plugin.id}`)

      plugins[plugin.id].register(API, Tools)
    }
  }

  // Initialize Plugins
  static initializePlugins (Core) {
    Object.keys(plugins).forEach((id) => {
      if (plugins[id].init !== undefined) {
        if (typeof plugins[id].init !== 'function') throw new Error(`Failed To Register Plugin: ${id}`)

        plugins[id].init(Core, Tools)
      }
    })
  }
}

import Tools from '../Tools/Main.js'

import API from '../../API.js'

let plugins = {}
