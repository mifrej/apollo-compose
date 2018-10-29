import React from 'react'
import styled from 'react-emotion'
import { adopt } from 'react-adopt'
import { Value } from 'react-powerplug'
import { Check, Trash2 } from 'react-feather'
import { Flex } from 'grid-styled'

import { TodosContainer } from './TodosContainer'

const Item = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  opacity: ${p => (p.loading ? 0.2 : 1)};
`

const Title = styled('span')`
  flex: 1;
  text-align: left;
  margin: 0 0 0 10px;
  color: #8395a7;
  text-decoration: ${p => (p.completed ? 'line-through' : 'none')};
`

const ButtonLink = styled('button')`
  display: flex;
  outline: none;
  background: none;
  border: none;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;

  &:hover {
    cursor: pointer;
  }
`

const Composed = adopt({
  container: <TodosContainer />,
  loading: <Value initial={false} />,
})

export const TodoItem = ({ id, title, completed }) => (
  <Composed>
    {({ container: { updateTodo, deleteTodo }, loading }) => {
      const toggleLoading = value => loading.setValue(value)

      const handleComplete = async () => {
        toggleLoading(true)
        await updateTodo.mutation({ variables: { id, completed: !completed } })
        toggleLoading(false)
      }

      const handleRemove = async () => {
        toggleLoading(true)
        await deleteTodo.mutation({ variables: { id } })
        toggleLoading(false)
      }

      return (
        <Item loading={loading.value}>
          <ButtonLink onClick={handleComplete}>
            <Check
              width={17}
              height={17}
              stroke={completed ? '#1dd1a1' : '#c8d6e5'}
            />
            <Title completed={completed}>{title}</Title>
          </ButtonLink>
          <ButtonLink onClick={handleRemove}>
            <Trash2 width={15} height={15} stroke="#c8d6e5" />
          </ButtonLink>
        </Item>
      )
    }}
  </Composed>
)
