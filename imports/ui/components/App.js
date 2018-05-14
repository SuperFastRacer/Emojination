import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import EmojiKeyboard from '../containers/emojiKeyboard/emojiKeyboard'

const App = () => (
  <div className="todocontainer container">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <EmojiKeyboard />
  </div>
)

export default App
