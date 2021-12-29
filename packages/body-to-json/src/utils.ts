export const optionalJsonParse = (value: string): unknown => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
