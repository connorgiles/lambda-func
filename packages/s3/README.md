# Lambda Middleware - Inject

This package contains an higher order function based middleware to provie dependency injection.

## Usage

```typescript
import { inject } from '@lambda-func/inject'
import { db } from '../db'

export const handler = inject(
  'database',
  db
)(async (event, { database }) => {
  await database.save(event)
})
```
