export default checkParameters

// Check Parameters Type
function checkParameters (conditions, parameters) {
  Object.keys(parameters).forEach((name) => {
    if (conditions[name] === undefined) throw new Error(`Cannot Found Condition For "${name}"`)

    if (conditions[name].type !== undefined) {
      let type
      
      if (Array.isArray(parameters[name])) type = array
      else type = typeof parameters[name]

      if (!conditions[name].type.includes(typeof parameters[name])) throw new Error(`Parameter "${name}" Must Be ${(conditions[name].type.length > 1) ? conditions[name].type.map((typeName) => `<${typeName}>`).join(' Or ') : `A <${conditions[name].type[0]}>`}`)
    }
    if (conditions[name].value !== undefined && !conditions[name].value.includes(parameters[name])) throw new Error(`Parameter "${name}" Must Be ${conditions[name].value.join(' Or ')}`)
    if (conditions[name].instance !== undefined) {
      for (let constructor in conditions[name].instance) {
        if (parameters[name] instanceof constructor) return true
      }

      throw new Error(`Parameter "${name}" Must Be An Instance Of ${conditions[name].instance.join(' Or ')}`)
    }
  })

  return true
}
