import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSilce = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  },
})

export const { appendAnecdote, setAnecdotes} = anecdoteSilce.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = id => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const anecdoteToChange = state.find(n => n.id === id)
    const changeAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    await anecdoteService.update(id, changeAnecdote)
    dispatch(setAnecdotes(state.map(anecdote =>
      anecdote.id !== id ? anecdote : changeAnecdote  
    )))
  }
}

export default anecdoteSilce.reducer