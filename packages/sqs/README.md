# `@lambda-func/sqs`

[![https://img.shields.io/npm/v/@lambda-func/sqs](https://img.shields.io/npm/v/@lambda-func/sqs)](https://www.npmjs.com/package/@lambda-func/sqs)

```shell
npm i @lambda-func/sqs
```

This package contains a set of utilities for when working with SQS handlers.

## Usage

```typescript
import { sqs } from '@lambda-func/sqs'

export const handler = sqs()(async (event) => {
  expect(typeof event).toBe('object')
})
```

### Testing

This package also includes some testing utilities to make input mapping easier.

- `createParsedSQSRecord()` - mock the input event for the middleware stack

#### Other Options

- `createSQSEvent()` - for raw event mocking
- `createSQSRecord()` - after record iteration
