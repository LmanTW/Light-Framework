// Parse Style Value
export default (value, units) => {
  if (value.includes('[') && value.includes(']')) {
    let unitList = Object.keys(units).sort((a, b) => b.length-a.length)

    for (let i = 0; i < value.length; i++) {
      if (value[i] === '[') {
        let chunk = ''

        while (value[i] !== ']' && i < value.length) {
          i++

          if (value[i] !== ']') chunk+=value[i]
        }

        if (chunk[0] === '$') value = value.replaceAll(`[${chunk}]`, `var(--${chunk.substring(1, chunk.length)})`)
        else {
          for (let unit of unitList) {
            if (chunk.substring(chunk.length-unit.length, chunk.length) === unit) value = value.replaceAll(`[${chunk}]`, units[unit](chunk))
          }
        }
      }
    }
  }

  return value
}
