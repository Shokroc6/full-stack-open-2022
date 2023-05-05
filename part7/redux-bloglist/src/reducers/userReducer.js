import loginService from '../services/login'
import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const userSilce = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      blogService.setToken(user.token)
      return user
    },
    deleteUser(state, action) {
      return null
    },
  },
})

export const { setUser, deleteUser } = userSilce.actions 

export const login = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      dispatch(setUser(user))
      return user
    } catch (error) {
      console.error('Login error:', error)
      return Promise.reject(new Error('Login failed'))
    }
  };
};


export default userSilce.reducer