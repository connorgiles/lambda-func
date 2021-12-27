/* eslint-disable @typescript-eslint/no-unused-vars */
import { select } from './select'

describe('select', () => {
  it('injects dependency in to handler', async () => {
    const testEvent = { test: { nested: 'test' } } as const
    const selectNested = (input: typeof testEvent) => input.test.nested

    await select(selectNested)(async (event) => {
      expect(event).toBe(testEvent.test.nested)
    })(testEvent, {})

    expect.hasAssertions()
  })
})
