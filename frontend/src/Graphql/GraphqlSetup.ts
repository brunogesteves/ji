import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
// import * as dotenv from 'dotenv';

const link = createUploadLink({
  // uri: `${process.env.REACT_APP_API_URL}`,
  uri: process.env.REACT_APP_API_URL
  // uri: `http://localhost:4000/graphql`
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});
