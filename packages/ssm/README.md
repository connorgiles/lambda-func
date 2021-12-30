# `@lambda-func/ssm`

[![https://img.shields.io/npm/v/@lambda-func/ssm](https://img.shields.io/npm/v/@lambda-func/ssm)](https://www.npmjs.com/package/@lambda-func/ssm)

```shell
npm i @lambda-func/ssm
```

This package contains a higher order function to resolve, cache and inject SSM parameters.

## Usage

```typescript
import { ssm } from '@lambda-func/ssm'

export const handler = ssm({
  apiKey: '/dev/api-key',
  another: { name: '/dev/another', decrypt: true }
})(async (_, context) => {
  expect(context.ssm.apiKey).toBeDefined()
})
```
