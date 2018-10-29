import React from 'react'
import styled from 'react-emotion'
import { Github } from 'react-feather'

import { TodosContainer } from './TodosContainer'
import { TodosList } from './TodosList'
import { TodosFooter } from './TodosFooter'

const Heading = styled('h1')`
  font-size: 32px;
  margin: 30px 0 10px;
  padding: 0;
  color: #5f27cd;
`

const Wrapper = styled('div')`
  width: 300px;
  margin: 0 auto;
`

const Link = styled('a')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: #5f27cd;
  text-decoration: none;
`

export const App = () => (
  <TodosContainer>
    {({ todos: { loading, data } }) => (
      <Wrapper>
        <Heading>{loading ? 'Loading...' : 'Get things done'}</Heading>
        {!loading && <TodosList todos={data.todos} />}
        {!loading && <TodosFooter />}
        <Link href="http://github.com/pedronauck/react-adopt" target="_blank">
          <Github width={17} height={17} /> &nbsp; See on Github
        </Link>
      </Wrapper>
    )}
  </TodosContainer>
)
