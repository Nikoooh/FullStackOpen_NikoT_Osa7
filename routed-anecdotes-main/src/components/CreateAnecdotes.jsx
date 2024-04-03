import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNew = ({ setAnecdotes, anecdotes, setNotification }) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
    
    const navigate = useNavigate()

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`new anecdote ${anecdote.content} created`)
        setTimeout(() => {
          setNotification('')
        }, 5000)
        navigate('/')
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content,
        author,
        info,
        votes: 0
      })
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            url for more info
            <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  
}

export default CreateNew