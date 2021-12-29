import { bodyToJson } from './bodyToJson'

describe('inject', () => {
  it('parses body of provided event', async () => {
    await bodyToJson()(async (event) => {
      expect(event.body).toStrictEqual({ test: 'hello' })
    })({ body: '{"test": "hello"}' }, {})

    expect.hasAssertions()
  })

  it('returns same body for invalid JSON', async () => {
    await bodyToJson()(async (event) => {
      expect(event.body).toStrictEqual('invalid')
    })({ body: 'invalid' }, {})

    expect.hasAssertions()
  })

  it('throws error on invalidJson if throwOnFailure is true', async () => {
    try {
      await bodyToJson({ throwOnFailure: true })(async () => {
        /* do nothing */
      })({ body: 'invalid' }, {})
    } catch (error) {
      expect(error).toBeDefined()
    }

    expect.hasAssertions()
  })
})
