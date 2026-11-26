import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import type { Request, Response } from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export async function getGraphQLConfig(): Promise<ApolloDriverConfig> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: true,
    graphiql: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
  };
}
