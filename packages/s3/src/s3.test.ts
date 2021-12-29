import { createContext } from '@cg-lambda/core'
import { s3 } from './s3'
import { createS3Event } from './testing'

describe('s3', () => {
  it('iterates over each record in Records', async () => {
    const testEvent = createS3Event()

    await s3()(async (event) => {
      expect(event).toStrictEqual(testEvent.Records[0])
    })(testEvent, createContext())

    expect.hasAssertions()
  })
})
