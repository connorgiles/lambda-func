export type Maybe<T> = T | null | undefined

export const optionalJsonParse = (value: string): unknown => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
