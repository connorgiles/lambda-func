import { LambdaHandler } from './types'

describe('core.types', () => {
  describe('#LambdaHandler', () => {
    it('exists', () => {
      const handler: LambdaHandler<{ a: number }, { b: number }, number> = ({ a }, { b }) =>
        Promise.resolve(a + b)

      expect(handler).toBeDefined()
    })
  })
})
