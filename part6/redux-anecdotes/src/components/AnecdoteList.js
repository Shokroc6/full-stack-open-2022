import { useSelector, useDispatch } from 'react-redux'
import { vote} from '../reducers/anecdoteReducer'
import { deleteNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => 
    anecdotes.filter(value => value.content.includes(filter)).sort((a,b) => b.votes - a.votes)
  )
  console.log('an', anecdotes)
  const dispatch = useDispatch()

  const voteTo = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(function (){dispatch(deleteNotification())}, 5000)
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteTo(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList