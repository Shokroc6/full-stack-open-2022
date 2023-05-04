import { createSlice } from '@reduxjs/toolkit'

const notificationSilce = createSlice({
  name: 'notification',
  initialState: 'render here notification...',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return 'render here notification...'
    }
  }
})

export const {setNotification, clearNotification} = notificationSilce.actions

export const autoNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSilce.reducer