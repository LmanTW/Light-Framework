// Generate ID
export default (length, keys) => {
  let count = 0

  while (keys.includes(new String(count).padStart(length, '0'))) count++

  return new String(count).padStart(length, '0') 
}
