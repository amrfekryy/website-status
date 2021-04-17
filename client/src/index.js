import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pages from './pages'

// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client"
// import { createUploadLink } from 'apollo-upload-client'


// export const client = new ApolloClient({
//   link: createUploadLink({ uri: "http://localhost:4000/graphql" }),
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  // <ApolloProvider client={{}}>
  // </ApolloProvider>,
  <Pages />,
  document.getElementById("root")
);
