import { compose, Controller } from '@cg-lambda/core'
import { inject } from '@cg-lambda/inject'
import { bodyToJson } from '@cg-lambda/body-to-json'

describe('example', () => {
  it('composes function together', async () => {
    const wrapper = compose(
      bodyToJson(),
      inject('test', { value: 5 }),
      inject('hello', { world: 'tada' }),
      inject('another', { world: 'tada' })
    )

    const body = { test: 'body' }

    const controller: Controller<typeof wrapper> = async (event, context) => {
      expect(context.test.value).toBe(5)
      expect(context.hello.world).toBe('tada')
      expect(event.body).toStrictEqual(body)
    }

    await wrapper(controller)({ body: JSON.stringify(body) }, {})

    expect.hasAssertions()
  })
})
