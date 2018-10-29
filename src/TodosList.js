import React from 'react'

import { TodoItem } from './TodoItem'

export const TodosList = ({ loading, todos }) =>
  !loading && todos.map(todo => <TodoItem key={todo.id} {...todo} />)
