import { z } from 'zod'
import { zodParser } from './zod'

describe('zodParser', () => {
  it('validates event with zod object', async () => {
    const Request = z.object({ hello: z.string() })

    await zodParser(Request)(async (event) => {
      expect(event.hello).toBe('world')
    })({ hello: 'world' }, {})

    expect.hasAssertions()
  })
})
