import { APIGatewayProxyEvent } from 'aws-lambda'

export type ParsedAPIGatewayProxyEvent<TBody> = Omit<APIGatewayProxyEvent, 'body'> & { body: TBody }
