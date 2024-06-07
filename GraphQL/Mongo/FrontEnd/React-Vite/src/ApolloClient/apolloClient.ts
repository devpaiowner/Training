import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_API_URL } from '../Config/Config';

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache()
});

export default client;