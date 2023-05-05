import { createSlice } from '@reduxjs/toolkit'

const notificationSilce = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSilce.actions

export const autoNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSilce.reducer