import { select } from './util'

describe('util', () => {
  it('select works', async () => {
    const testEvent = { test: { nested: 'test' } } as const
    const selectNested = (input: typeof testEvent) => input.test.nested

    await select(selectNested)(async (event) => {
      expect(event).toBe(testEvent.test.nested)
    })(testEvent, {})

    expect.hasAssertions()
  })
})
