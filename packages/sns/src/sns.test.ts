import { createContext } from '@lambda-func/core'
import { sns } from './sns'
import { createSNSEvent } from './testing'

describe('sns', () => {
  it('iterates over each record in Records', async () => {
    const body = { test: 'string' }
    const testEvent = createSNSEvent([{ Message: JSON.stringify(body) }])

    await sns()(async (event) => {
      expect(event.Sns.Message).toStrictEqual(body)
    })(testEvent, createContext())

    expect.hasAssertions()
  })
})
