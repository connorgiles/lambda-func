export type Cache<TKeys extends string, TValue = unknown> = {
  get: (key: TKeys) => TValue | undefined
  set: (key: TKeys, value: TValue) => void
}

export const createCache = <TKeys extends string, TValue>(): Cache<TKeys, TValue> => {
  const cache = <Record<TKeys, TValue>>{}
  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value
    }
  }
}
