import { bodyToJson } from './bodyToJson'

describe('inject', () => {
  it('parses body of provided event', async () => {
    await bodyToJson()(async (event) => {
      expect(event.body).toStrictEqual({ test: 'hello' })
    })({ body: '{"test": "hello"}' }, {})

    expect.hasAssertions()
  })
})
