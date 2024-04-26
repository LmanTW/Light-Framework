// Generate ID
export default (length: number, keys: string[]): string => {
  let count: number = 0

  while (keys.includes(count.toString().padStart(length, '0'))) count++

  return count.toString().padStart(length, '0') 
}
