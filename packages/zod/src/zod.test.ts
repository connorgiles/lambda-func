import { z } from 'zod'

import { HandlerErrorIssue, UnprocessableEntity } from '@lambda-func/errors'

import { zodParser } from './zod'

describe('zodParser', () => {
  it('calls controlleer with event on valid event', async () => {
    const Request = z.object({ hello: z.string() })

    await zodParser(Request)(async (event: { hello: string }) => {
      expect(event.hello).toBe('world')
    })({ hello: 'world' }, {})

    expect.hasAssertions()
  })

  it('throws error if not valid event', async () => {
    try {
      const Request = z.object({ hello: z.string() })

      await zodParser(Request)(async () => {
        /* do nothing */
      })({ other: 'world' }, {})
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntity)
      expect((<UnprocessableEntity>error).statusCode).toBe(422)
      expect((<UnprocessableEntity>error).issues).toStrictEqual<HandlerErrorIssue[]>([
        {
          code: 'invalid_type',
          message: 'Required',
          path: 'hello'
        }
      ])
    }

    expect.hasAssertions()
  })
})
