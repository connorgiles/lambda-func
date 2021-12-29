# Lambda Middleware

This monorepo contains the a set of higher order functions and utilities to create composable middleware for lambda functions.

## Usage

```typescript
import { z } from 'zod'
import { compose, Controller } from '@cg-lambda/core'
import { sqs } from '@cg-lambda/sqs'
import { inject } from '@cg-lambda/inject'
import { select } from '@cg-lambda/select'
import { zodParser } from '@cg-lambda/zod'

import { Database, Logger } from '../services'

const wrapper = compose(
  sqs(),
  select((record) => record.body),
  zodParser(
    z.object({
      id: z.string(),
      name: z.string()
    })
  ),
  inject('db', Database),
  inject('logger', Logger)
)

// easily testable controller
export const controller: Controller<typeof wrapper> = async (record, { logger, db }) => {
  logger.info('Saving record to database')
  await db.save(record)
}

export const handler = wrapper(controller)
```

## Rush

This repo uses [rush](https://rushjs.io/) to maintain a monorepo of packages. [Learn the basics 👉](https://rushjs.io/pages/developer/new_developer/)

### Installation

```
npm i -g @microsoft/rush
```

### Commands

- `rush build` - build pacakges that need it
- `rush test` - test all packages
- `rush rebuild` - builds all packages
- `rush publish` - publish all packages

### Installing Dependencies

With rush, you often will work from the directory of the individual "project" (package) you are working on. If you want to add a dependency to to that project then you run `rush add --package example-package (--dev)`.
