import { LambdaHandler, LambdaMiddleware } from './types'

describe('core.types', () => {
  describe('#LambdaHandler', () => {
    it('exists', () => {
      const handler: LambdaHandler<{ a: number }, { b: number }, number> = ({ a }, { b }) =>
        Promise.resolve(a + b)

      expect(handler).toBeDefined()
    })
  })

  describe('#LambdaHandler', () => {
    it('exists', () => {
      const middleware: LambdaMiddleware<LambdaHandler<{ a: number }>, LambdaHandler<{ a: string }>> =
        (handler) => (event, context) =>
          handler({ a: parseInt(event.a) }, context)

      expect(middleware).toBeDefined()
    })
  })
})
