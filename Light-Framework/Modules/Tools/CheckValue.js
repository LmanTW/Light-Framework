// Check Value
export default (value, conditions) => {
  if (conditions.type !== undefined) {
    const type = (Array.isArray(value)) ? 'array' : typeof value
 
    if (!conditions.type.includes(type)) return { error: true, type: 'type' }
  }

  if (conditions.value !== undefined && !conditions.value.includes(parameters)) return { error: true, type: 'value' }

  return { error: false }
}
