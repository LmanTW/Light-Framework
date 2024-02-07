// Parse Object To CSS
export default (object) => {
  const styles = []

  Object.keys(object).forEach((key) => {
    let name = []

    key.split('').forEach((char) => {
      if (uppercaseLetters.includes(char)) {
        name.push('-')
        name.push(char.toLowerCase())
      } else name.push(char)
    })

    styles.push(`${name.join('')}: ${object[key]}`)
  })
  
  return styles.join('; ')
}

const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
