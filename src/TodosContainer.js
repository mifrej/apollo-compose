import * as R from 'ramda'
import React from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

const ALL_TODOS = gql`
  {
    todos: allTodoes {
      id
      title
      completed
    }
  }
`

const CREATE_TODO = gql`
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`

const createTodo = ({ render }) => (
  <Mutation
    mutation={CREATE_TODO}
    update={(cache, { data: { createTodo } }) => {
      const query = ALL_TODOS
      const { todos } = cache.readQuery({ query })

      cache.writeQuery({
        query,
        data: { todos: R.concat(todos, [createTodo]) },
      })
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`

const updateTodo = ({ render }) => (
  <Mutation
    mutation={UPDATE_TODO}
    update={(cache, { data: { updateTodo } }) => {
      const query = ALL_TODOS
      const { todos } = cache.readQuery({ query })
      const idx = R.findIndex(R.propEq('id', updateTodo.id), todos)

      cache.writeQuery({
        query,
        data: { todos: R.update(idx, updateTodo, todos) },
      })
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

const deleteTodo = ({ render }) => (
  <Mutation
    mutation={DELETE_TODO}
    update={(cache, { data: { deleteTodo } }) => {
      const query = ALL_TODOS
      const { todos } = cache.readQuery({ query })
      const byTodoId = R.propEq('id', deleteTodo.id)

      cache.writeQuery({
        query,
        data: { todos: R.reject(byTodoId, todos) },
      })
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const TodosContainer = adopt({
  todos: <Query query={ALL_TODOS} />,
  createTodo,
  updateTodo,
  deleteTodo,
})
