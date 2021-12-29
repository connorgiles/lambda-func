# `@lambda-func/zod`

[![https://img.shields.io/npm/v/@lambda-func/zod](https://img.shields.io/npm/v/@lambda-func/zod)](https://www.npmjs.com/package/@lambda-func/zod)

```shell
npm i @lambda-func/zod
```

This package contains a middleware to use [zod](https://github.com/colinhacks/zod) for type parsing.

## Usage

```typescript
import { z } from 'zod'
import { zodParser } from '@lambda-func/zod'

const Request = z.object({
  name: z.string()
})

// will throw an error if not value Request
export const handler = zodParser(Request)(async (event) => {
  return event.name
})
```
