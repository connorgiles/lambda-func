# `@lambda-func/inject`

![https://img.shields.io/npm/v/@lambda-func/inject](https://img.shields.io/npm/v/@lambda-func/inject)

```shell
npm i @lambda-func/inject
```

This package contains a higher order function based middleware for dependency injection.

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
