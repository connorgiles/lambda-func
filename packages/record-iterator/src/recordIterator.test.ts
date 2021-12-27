import { recordIterator } from './recordIterator'

describe('recordIterator', () => {
  it('iterates over each record in Records', async () => {
    const event = { Records: [1, 1, 1] }
    let count = 0

    await recordIterator<{ Records: number[] }>()(async (event) => {
      expect(event).toBe(1)

      count += event
    })(event, {})

    expect.hasAssertions()
    expect(count).toBe(event.Records.length)
  })
})
