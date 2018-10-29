import React from 'react'
import styled from 'react-emotion'
import { adopt } from 'react-adopt'
import { Value } from 'react-powerplug'
import { Flex } from 'grid-styled'

import { TodosContainer } from './TodosContainer'

const Form = styled('form')`
  display: flex;
  margin: 15px 0 0;
  justify-content: space-between;
`

const Input = styled('input')`
  flex: 1;
  outline: none;
  padding: 7px 10px;
  font-size: 14px;
  color: #8395a7;
`

const Button = styled('button')`
  padding: 0 15px;
  margin: 0 0 0 5px;
  border: none;
  background: #5f27cd;
  border-radius: 3px;
  font-size: 10px;
  text-transform: uppercase;
  color: white;
`

const Composed = adopt({
  input: <Value initial="" />,
  container: <TodosContainer />,
})

export const TodosFooter = () => (
  <Composed>
    {({ container: { createTodo }, input }) => {
      const handleAdd = ev => {
        createTodo.mutation({
          variables: { title: input.value },
        })

        input.setValue('')
        ev.preventDefault()
      }

      return (
        <Form onSubmit={handleAdd}>
          <Input
            type="text"
            value={input.value}
            onChange={ev => input.setValue(ev.target.value)}
          />
          <Button type="submit">add</Button>
        </Form>
      )
    }}
  </Composed>
)
