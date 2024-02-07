// Check Object
export default (objectName, conditions, object) => {
  Object.keys(conditions).forEach((key) => {
    const result = checkValue(object[key], conditions[key])

    if (result.error) {
      if (result.type === 'type') throw new Error(`Value "${key}" In "${objectName}" Must Be ${(conditions[key].type.length > 1) ? conditions[key].type.map((typeName) => `<${typeName}>`).join(' Or ') : `A <${conditions[key].type[0]}>`}`)
      if (result.type === 'value') throw new Error(`Value "${key}" In "${objectName}" Must Be ${conditions[key].value.join(' Or ')}`)
    }
  })
}

import checkValue from './CheckValue.js'
