import { compose, Controller } from '@lambda-func/core'
import { inject } from '@lambda-func/inject'
import { bodyToJson } from '@lambda-func/body-to-json'
import { zodParser } from '@lambda-func/zod'
import { z } from 'zod'

describe('example', () => {
  it('composes function together', async () => {
    const Request = z.object({
      body: z.object({
        test: z.string(),
        nested: z.object({
          string: z.string()
        })
      })
    })

    type Request = z.infer<typeof Request>

    const body: Request['body'] = {
      test: 'body',
      nested: {
        string: ''
      }
    }

    const wrapper = compose(
      bodyToJson(),
      zodParser(Request),
      inject('test', { value: 5 }),
      inject('hello', { world: 'tada' })
    )

    const controller: Controller<typeof wrapper> = async (event, context) => {
      expect(context.test.value).toBe(5)
      expect(context.hello.world).toBe('tada')
      expect(event.body).toStrictEqual(body)
    }

    await wrapper(controller)({ body: JSON.stringify(body) }, {})

    expect.hasAssertions()
  })
})
