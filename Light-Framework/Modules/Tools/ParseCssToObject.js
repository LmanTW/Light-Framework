// Parse Style To Object
export default (style) => {
  let object = {}

  style.split(';').forEach((chunk) => {
    let [name, value] = chunk.split(':')

    name = name.replaceAll(' ', '')

    while (value[0] === ' ') value = value.substring(1, value.length)
    while (value[value.length-1] === ' ') value = value.substring(0, value.length-1)

    object[name] = value
  })

  return object
}
