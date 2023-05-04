import { useNotificationDispatch } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './request'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  const queryClient =  useQueryClient() 
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notificationDispatch({type: 'SET_MESSAGE', message: `added '${newAnecdote.content}'`})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR_MESSAGE'})
      }, 5000)
    },
    onError: () => {
      notificationDispatch({type: 'SET_MESSAGE', message: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR_MESSAGE'})
      }, 5000)
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content);
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updateAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({type: 'SET_MESSAGE', message: `voted to '${updateAnecdote.content}'`})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR_MESSAGE' })
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery('anecdotes', getAnecdotes)
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data





  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
