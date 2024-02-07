// Check Parameters
export default (conditions, parameters) => {
  Object.keys(parameters).forEach((name) => {
    if (conditions[name] === undefined) throw new Error(`Cannot Found Condition For "${name}"`)

    const result = checkValue(parameters[name], conditions[name])

    if (result.error) {
      if (result.type === 'type') throw new Error(`Parameter "${name}" Must Be ${(conditions[name].type.length > 1) ? conditions[name].type.map((typeName) => `<${typeName}>`).join(' Or ') : `A <${conditions[name].type[0]}>`}`)
      if (result.type === 'value') throw new Error(`Parameter "${name}" Must Be ${conditions[name].value.join(' Or ')}`)
    }
  })
}

import checkValue from './CheckValue.js'
