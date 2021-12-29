# `@lambda-func/handler`

This package contains a higher order function.

## Usage

```typescript
import { handler } from '@lambda-func/handler'

export const handler = inject()(async (event) => {
  return event.body
})
```
