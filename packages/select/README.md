# `@lambda-func/select`

This package provides a middleware to provide a selector for the incoming event.

## Usage

```typescript
import { select } from '@lambda-func/select'

export const handler = select((event) => event.body)(async (body) => {
  return body
})
```
