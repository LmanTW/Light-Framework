import info from './Info.json' with { type: 'json' }

console.log(`[ Light-Framework ]

  Version: ${info.version}
  Build: ${info.build}

  Github: ${info.github}`)

// API 
class Light {
  public static get use () {return PluginManager.addPlugin}

  public static get createElement () {return createElement}
  public static get createSvgElement () {return createSvgElement}
  public static get createStyle () {return createStyle}
  public static setStyle (element: HTMLElement, name: string, value: number | string) {
    Tools.checkParameters({
      element: { instanceOf: { instance: HTMLElement, name: 'HTMlElement' }},
      name: { type: ['string'] },
      value: { type: ['number', 'string'] }
    }, { element, name, value })

    const properties = (element.getAttribute('light:style') === null) ? {} : parseStyle(element.getAttribute('light:style'))

    properties[name] = value.toString()

    element.setAttribute('light:style', createStyle(properties))
  } 

  private _Core!: Core

  public ListenerManager!: ListenerManager
  public TimerManager!: TimerManager

  constructor (element: HTMLElement, data: any) {
    this._Core = new Core(this, element, data)

    this.ListenerManager = this._Core.ListenerManager 
    this.TimerManager = this._Core.TimerManager
  }

  // Get Element By Id
  public getElementByID (id: string): undefined | HTMLElement {
    return this._Core.getElementByID(id)
  }

  // Get Elements By Class Name
  public getElementsByClassName (className: string): HTMLElement[] {
    return this._Core.getElementsByClassName(className)
  }

  // Get Elements By Tag Name
  public getElementsByTagName (tagName: string): HTMLElement[] {
    return this._Core.getElementsByTagName(tagName)
  }

  public get getAllElements (): HTMLElement[] {
    return this._Core.getAllElements()
  }

  // Load The Component
  public load (html: string): void {
    this._Core.load(html)
  }

  public remove (): void {
    this._Core.remove()
  }
}

export { Light, Plugin }

import { PluginManager, Plugin } from './Modules/Managers/PluginManager.ts'
import { createElement, createSvgElement } from './Modules/Element.ts'
import ListenerManager from './Modules/Managers/ListenerManager.ts'
import TimerManager from './Modules/Managers/TimerManager.ts'
import { createStyle, parseStyle } from './Modules/Style.ts'
import DefaultPlugin from './Modules/DefaultPlugin.ts'
import Tools from './Modules/Tools/Main.ts'

Light.use(DefaultPlugin)
import Core from './Modules/Core.ts'
