// Check Value
function checkValue (value: any, condition: Condition): { error: boolean, type?: 'type' | 'value' | 'instanceOf' } {
  if (condition.type !== undefined) {
    const type: Types = (Array.isArray(value)) ? 'array' : typeof value
 
    if (!condition.type.includes(type)) return { error: true, type: 'type' }
  }

  if (condition.value !== undefined && !condition.value.includes(value)) return { error: true, type: 'value' }

  if (condition.instanceOf !== undefined && !(value instanceof condition.instanceOf.instance)) return { error: true, type: 'instanceOf' }

  return { error: false }
}

// Conditions
interface Condition {
  type?: Types[],
  value?: string[],

  instanceOf?: { instance: any, name: string }
}

type Types = 'boolean' | 'number' | 'bigint' | 'null' | 'undefined' | 'string' | 'symbol' | 'array' | 'object' | 'function'

export { checkValue, Condition }
