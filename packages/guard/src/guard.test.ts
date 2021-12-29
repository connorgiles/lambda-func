/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnprocessableEntity } from '@lambda-func/errors'

import { guard } from './guard'

describe('guard', () => {
  it('calls the handler if event meets type predicate', async () => {
    const testEvent = { test: { nested: 'test' } } as const
    const isTestEvent = (value: any): value is typeof testEvent => value?.test?.nested === 'test'

    await guard(isTestEvent)(async (event) => {
      expect(event).toStrictEqual(testEvent)
    })(testEvent, {})

    expect.hasAssertions()
  })

  it('throws an error if event does not meet type predicate', async () => {
    const testEvent = { test: { nested: 'test' } } as const
    const isNumber = (value: any): value is number => typeof value === 'number'

    try {
      await guard(isNumber)(async () => {
        /* do nothing */
      })(testEvent, {})
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntity)
      expect((<UnprocessableEntity>error).statusCode).toBe(422)
    }

    expect.hasAssertions()
  })

  it('calls onFailedPredicate if provided', async () => {
    const testEvent = { test: { nested: 'test' } } as const
    const isNumber = (value: any): value is number => typeof value === 'number'

    await guard(isNumber, {
      onFailedPredicate: async (event) => {
        expect(event).toStrictEqual(testEvent)
      }
    })(async () => {
      /* do nothing */
    })(testEvent, {})

    expect.hasAssertions()
  })
})
