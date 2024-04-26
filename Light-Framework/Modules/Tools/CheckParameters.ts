// Check Parameters
export default (conditions: Conditions, parameters: { [key: string]: any }): void => {
  Object.keys(parameters).forEach((name) => {
    if (conditions[name] === undefined) throw new Error(`Cannot Found Condition For "${name}"`)

    const result = checkValue(parameters[name], conditions[name])

    if (result.error) {
      if (result.type === 'type') throw new Error(`Parameter "${name}" Must Be ${(conditions[name].type.length > 1) ? conditions[name].type.map((typeName) => `<${typeName}>`).join(' Or ') : `A <${conditions[name].type[0]}>`}`)
      if (result.type === 'value') throw new Error(`Parameter "${name}" Must Be ${conditions[name].value.join(' Or ')}`)
      if (result.type === 'instanceOf') throw new Error(`Parameter "${name}" Must Be An Instance Of <${conditions[name].instanceOf.name}>`)
    }
  })
}

type Conditions = { [key: string]: Condition }

import { checkValue, Condition } from './CheckValue.ts'
