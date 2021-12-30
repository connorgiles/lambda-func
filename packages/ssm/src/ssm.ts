import { SSM } from 'aws-sdk'
import { LambdaHandler } from '@lambda-func/core'
import { InternalServerError } from '@lambda-func/errors'

import { Cache, createCache } from './cache'

type SSMInputItem = {
  name: string
  decrypt?: boolean
}

export type SSMInput<TKey extends string> = {
  [k in TKey]: string | SSMInputItem
}

export type SSMOptions<TKey extends string> = {
  cache?: Cache<TKey, string>
  ssm?: Pick<SSM, 'getParameter'>
  ssmConfig?: SSM.ClientConfiguration
}

export type SSMContext<TContext, TKeys extends string> = TContext & {
  ssm: {
    [k in TKeys]: string
  }
}

export const ssm =
  <TKey extends string, TEvent, TContext = unknown, TResponse = unknown>(
    parameterNames: SSMInput<TKey>,
    { cache = createCache<TKey, string>(), ssm, ssmConfig }: SSMOptions<TKey> = {}
  ) =>
  (
    handler: LambdaHandler<TEvent, SSMContext<TContext, TKey>, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  async (event, context) => {
    const client = ssm ?? new SSM(ssmConfig)

    const parameters = await Promise.all(
      Object.keys(parameterNames).map(async (key): Promise<{ key: TKey; value: string }> => {
        const injectKey = key as TKey
        const value = parameterNames[injectKey]
        const { name, decrypt } = (typeof value === 'string' ? { name: value } : value) as SSMInputItem

        const cacheResult = cache.get(injectKey)
        if (cacheResult) {
          return { key: injectKey, value: cacheResult }
        }

        const result = await client
          .getParameter({
            Name: name,
            WithDecryption: decrypt
          })
          .promise()

        const parameterValue = result.Parameter?.Value
        if (!parameterValue) {
          throw new InternalServerError('Invalid Service Parameters')
        }

        cache.set(injectKey, parameterValue)
        return { key: injectKey, value: parameterValue }
      })
    )

    const ssmContext = parameters.reduce(
      (state, { key, value }) => Object.assign(state, { [key]: value }),
      {} as SSMContext<TContext, TKey>['ssm']
    )

    return handler(event, {
      ...context,
      ssm: ssmContext
    })
  }
