# `@lambda-func/sns`

[![https://img.shields.io/npm/v/@lambda-func/sns](https://img.shields.io/npm/v/@lambda-func/sns)](https://www.npmjs.com/package/@lambda-func/sns)

```shell
npm i @lambda-func/sns
```

This package contains a set of utilities for when working with SNS handlers.

## Usage

```typescript
import { sns } from '@lambda-func/sns'

export const handler = sns()(async (event) => {
  expect(typeof event).toBe('object')
})
```

### Testing

This package also includes some testing utilities to make input mapping easier.

- `createParsedSNSRecord()` - mock the input event for the middleware stack

#### Other Options

- `createSNSEvent()` - for raw event mocking
- `createSNSRecord()` - after record iteration
