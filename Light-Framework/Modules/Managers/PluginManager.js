// Plugin Manager
export default class {
  static get plugins () {return plugins}

  // Use Plugin
  static use (plugin) {
    Tools.checkParameters({
      plugin: { type: ['object'] },
    }, { plugin })

    if (plugin.id === undefined) throw new Error('Could Not Verify Plugin (ID Not Found)')
    if (plugin.init === undefined) throw new Error(`Failed To Initialize Plugin: ${plugin.id}`)

    if (plugins[plugin.id] !== undefined) throw new Error(`Plugin Is Already Used: ${plugin.id}`)

    plugins[plugin.id] = plugin

    if (plugin.register !== undefined) {
      if (typeof plugin.register !== 'function') throw new Error(`Failed To Register Plugin: ${plugin.id}`)

      plugins[plugin.id].register(API, Tools)
    }
  }

  // Initialize Plugins
  static initializePlugins (Core) {
    Object.keys(plugins).forEach((id) => plugins[id].init(Core, Tools))
  }
}

import Tools from '../Tools.js'

import API from '../../API.js'

let plugins = {}
