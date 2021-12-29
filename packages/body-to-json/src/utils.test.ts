import { optionalJsonParse } from './utils'

describe('utils', () => {
  describe('#optionalJsonParse', () => {
    it('parses valid JSON', () => {
      const test = { nested: { value: 5 } }
      expect(optionalJsonParse(JSON.stringify(test))).toStrictEqual(test)
    })

    it('returns value for invalid JSON', () => {
      const test = 'invalid'
      expect(optionalJsonParse(test)).toBe(test)
    })
  })
})
