// Generate ID
export default (length, keys) => {
  let id = generateAnID(length)

  while (keys.includes(id)) id = generateAnID(length)

  return id
}

// Generate An ID
function generateAnID (length) {
  let string = ''

  for (let i = 0; i < length; i++) string+=letters[getRandom(0, letters.length-1)]

  return string
}

import getRandom from './GetRandom.js'

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
