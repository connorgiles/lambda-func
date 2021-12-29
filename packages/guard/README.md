# `@lambda-func/guard`

This package contains a middleware to use type guards for type narrowing.

## Usage

```typescript
import { guard } from '@lambda-func/guard'

const isString = (value: unknown): value is string => typeof value === 'string'

// will throw an error if not passed
export const handler = guard(isString)(async (event) => {
  return event.length
})

// can pass an alternate error handler
const throwCustomError = async () => {
  throw new CustomError()
}

export const handler = guard(isString, { onFailedPredicate: throwCustomError })(async (event) => {
  return event.length
})
```
