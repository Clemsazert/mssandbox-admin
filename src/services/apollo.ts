import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `${process.env.REACT_APP_EXPRESS_API_URL || 'http://localhost:8000'}/graphql`,
  cache: new InMemoryCache()
});
