import { createSlice } from '@reduxjs/toolkit'

const notificationSilce = createSlice({
  name: 'notification',
  initialState: 'render here notification...',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    deleteNotification(state, action) {
      return 'render here notification...'
    }
  }
})

export const {setNotification, deleteNotification} = notificationSilce.actions
export default notificationSilce.reducer