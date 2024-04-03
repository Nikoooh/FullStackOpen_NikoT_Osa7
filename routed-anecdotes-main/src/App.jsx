import { useState } from 'react'
import CreateNew from './components/CreateAnecdotes'
import Footer from './components/Footer'
import AnecdoteList from './components/Anecedotes'
import About from './components/About'
import Menu from './components/Menu'
import { Route, Routes, useMatch } from 'react-router-dom'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const match = useMatch('/anecdote/:id')
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null

  //const vote = (id) => {
  //  const anecdote = anecdoteById(id)
  //
  //  const voted = {
  //    ...anecdote,
  //    votes: anecdote.votes + 1
  //  }
  //
  //  setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  //}

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}/>
        <Route path='/anecdote/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew setAnecdotes={setAnecdotes} anecdotes={anecdotes} setNotification={setNotification}/>}/>
      </Routes>   
      <Footer />
    </div>
  )
}

export default App
