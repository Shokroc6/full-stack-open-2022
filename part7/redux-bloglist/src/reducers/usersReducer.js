import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSilce = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSilce.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSilce.reducer