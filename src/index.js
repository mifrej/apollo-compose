import './styles'

import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import { App } from './App'

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjfitlb222zju01860wc988f6',
})

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
)

render(ApolloApp(App), document.getElementById('root'))
