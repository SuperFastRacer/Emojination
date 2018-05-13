import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import EmojiContainer from '../containers/emojiContainer'

const App = () => (
  <div className="todocontainer container">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <EmojiContainer />
  </div>
)

export default App
