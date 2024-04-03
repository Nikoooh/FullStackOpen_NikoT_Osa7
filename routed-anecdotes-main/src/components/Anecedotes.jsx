import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => {

  const navigate = useNavigate()

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id}> 
            <Link to={`/anecdote/${anecdote.id}`}> 
              {anecdote.content} 
            </Link> 
          </li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList