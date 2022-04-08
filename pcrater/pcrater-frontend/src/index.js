//Credits:
//Apollo Authentication: https://www.apollographql.com/docs/react/networking/authentication/

import React from 'react';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import { setContext } from '@apollo/client/link/context';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';


Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const httpLink = createHttpLink({
  uri: 'https://pcrater.me/api'
  // uri: 'http://localhost:5000'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
