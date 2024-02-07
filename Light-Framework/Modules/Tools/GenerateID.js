// Generate ID
export default (length, keys) => {
  let count = 0

  while (keys.includes(count.toString().padStart(length, '0'))) count++

  return count.toString().padStart(length, '0')
}
