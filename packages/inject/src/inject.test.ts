/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from './inject'

describe('inject', () => {
  it('injects dependency in to handler', async () => {
    const injection = { countOf: jest.fn((_id: string): Promise<number> => Promise.resolve(1234)) }

    await inject(
      'db',
      injection
    )(async (_, { db }) => {
      expect(db).toStrictEqual(injection)
    })({}, {})

    expect.hasAssertions()
  })

  it('dependency maintains strict types', async () => {
    const injection = { countOf: jest.fn((_id: string): Promise<number> => Promise.resolve(1234)) }

    const result = await inject(
      'db',
      injection
    )(async (_, { db }): Promise<number> => {
      return await db.countOf('4321')
    })({}, {})

    expect(result).toBe(1234)
  })
})
