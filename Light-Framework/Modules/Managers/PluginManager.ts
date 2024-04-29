// Plugin Manager
class PluginManager {
  public static get plugin () {return Object.keys(plugins)}

  // Add Plugin
  public static addPlugin (Plugin: Plugin): void {
    Tools.checkParameters({
      Plugin: { type: ['object'] }
    }, { Plugin })

    if (plugins[Plugin.id] !== undefined) throw new Error(`Plugin Is Already Added: "${Plugin.id}"`)

    plugins[Plugin.id] = Plugin

    if (Plugin.register !== undefined) Plugin.register(Light, { PluginManager: this, ComponentManager, Tools })
  }

  // Remove Plugin
  public static removePlugin (id: string): void {
    Tools.checkParameters({
      id: { type: ['string'] }
    }, { id })

    if (plugins[id] === undefined) throw new Error(`Plugin Not Found: "${id}"`)

    delete plugins[id]
  }

  // Initialize Plugins
  public static initializePlugins (Core: Core_): void {
    Tools.checkParameters({
      Core: { instanceOf: { instance: Core_, name: 'Core' }}
    }, { Core })

    Object.keys(plugins).forEach((id) => {
      if (plugins[id].init !== undefined) plugins[id].init(Core)
    })
  }
}

// Plugin
interface Plugin {
  id: string,

  register?: (API: typeof Light, Utilities: Utilities) => any,
  init?: (Core: Core_) => any 
}

// Utilities
interface Utilities {
  PluginManager: typeof PluginManager,
  ComponentManager: typeof ComponentManager,
  Tools: typeof Tools
}

export { PluginManager, Plugin }

import ComponentManager from './ComponentManager.ts'
import { Light } from '../../API.ts'
import Tools from '../Tools/Main.ts'
import Core_ from '../Core.ts'

const plugins: { [key: string]: Plugin } = {}
