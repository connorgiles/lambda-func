# `@lambda-func/select`

[![https://img.shields.io/npm/v/@lambda-func/select](https://img.shields.io/npm/v/@lambda-func/select)](https://www.npmjs.com/package/@lambda-func/select)

```shell
npm i @lambda-func/select
```

This package provides a middleware to provide a selector for the incoming event.

## Usage

```typescript
import { select } from '@lambda-func/select'

export const handler = select((event) => event.body)(async (body) => {
  return body
})
```
