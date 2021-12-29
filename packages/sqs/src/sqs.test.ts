import { createContext } from '@lambda-func/core'
import { sqs } from './sqs'
import { createSQSEvent } from './testing'

describe('sqs', () => {
  it('iterates over each record in Records', async () => {
    const body = { test: 'string' }
    const testEvent = createSQSEvent([{ body: JSON.stringify(body) }])

    await sqs()(async (event) => {
      expect(event.body).toStrictEqual(body)
    })(testEvent, createContext())

    expect.hasAssertions()
  })
})
