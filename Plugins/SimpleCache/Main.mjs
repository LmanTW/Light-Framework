// Simple Cache
export default {
  id: 'SimpleCache',

  register: (API, Tools) => {
    let caches = {}

    API.Cache = class {
      static get size () {return Object.keys(caches)}

      // Get Cache
      static async get (key, callback) {
        Tools.checkParameters({
          key: { type: ['string'] },
          callback: { type: ['function'] }
        }, { key, callback })

        if (caches[key] === undefined) caches[key] = await callback(key)
        
        return caches[key]
      }

      // Clean
      static clean () {
        caches = {}
      }
    }
  } 
}
