# `@lambda-func/api-gateway`

[![https://img.shields.io/npm/v/@lambda-func/api-gateway](https://img.shields.io/npm/v/@lambda-func/api-gateway)](https://www.npmjs.com/package/@lambda-func/api-gateway)

```shell
npm i @lambda-func/api-gateway
```

This package contains a higher order function.

## Usage

```typescript
import { apiGateway } from '@lambda-func/api-gateway'
import { NotFound } from '@lambda-func/errors'

export const handler = apiGateway()(async (event) => {
  if (someCondition()) {
    // will map error to valid API Gatway Response
    throw new NotFound('Could not find resource')
  }

  return {
    // will map to valid API Gateway Response
    id: 'my_id'
  }
})
```

### Testing

This package also includes some testing utilities to make input mapping easier.

- `createParsedAPIGatewayEvent()` - mock the input for when used with `@lambda-func/body-to-json`
- `createAPIGatewayEvent()` - for raw event mocking
