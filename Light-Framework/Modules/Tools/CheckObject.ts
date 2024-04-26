// Check Object
export default (objectName: string, conditions: Conditions, object: { [key: string]: any }): void => {
  Object.keys(conditions).forEach((key) => {
    const result = checkValue(object[key], conditions[key])

    if (result.error) {
      if (result.type === 'type') throw new Error(`Value "${key}" In "${objectName}" Must Be ${(conditions[key].type.length > 1) ? conditions[key].type.map((typeName) => `<${typeName}>`).join(' Or ') : `A <${conditions[key].type[0]}>`}`)
      if (result.type === 'value') throw new Error(`Value "${key}" In "${objectName}" Must Be ${conditions[key].value.join(' Or ')}`)
      if (result.type === 'instanceOf') throw new Error(`Value "${key}" In ${objectName} Must Be An Instance Of <${conditions[key].instanceOf.name}>`)
    }
  })
}

type Conditions = { [key: string]: Condition }

import { checkValue, Condition } from './CheckValue.ts'
