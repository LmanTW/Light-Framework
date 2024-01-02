// Parse Style To Object
export default (style) => {
  let object = {}

  style.split(';').forEach((chunk) => {
    let [name, value] = chunk.split(':')

    if (value === undefined) return

    name = name.replaceAll(' ', '').split('')

    while (name.includes('-')) {
      let index = name.indexOf('-')

      name[index+1] = name[index+1].toUpperCase()
      name.splice(index, 1)
    }

    while (value[0] === ' ') value = value.substring(1, value.length)
    while (value[value.length-1] === ' ') value = value.substring(0, value.length-1)

    object[name.join('')] = value
  })

  return object
}
