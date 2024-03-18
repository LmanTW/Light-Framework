// Plugin Manager
export default class {
  static get plugins () {return plugins}

  // Add Plugin
  static addPlugin (Plugin) {
    if (Plugin.id === undefined) throw new Error(`Could Not Verify The Plugin: ID Not Found`)

    if (plugins[Plugin.id] !== undefined) throw new Error(`Plugin Is Already Used: "${Plugin.id}"`)

    plugins[Plugin.id] = Plugin

    if (Plugin.register !== undefined) plugins[Plugin.id].register(API, Tools)
  }

  // Initialize Plugins
  static initializePlugins (Core) {
    Object.keys(plugins).forEach((id) => {
      if (plugins[id].init !== undefined) plugins[id].init(Core, Tools)
    })
  }
}

import Tools from '../Tools/Main.js'

import API from '../../API.js'

const plugins = {}
