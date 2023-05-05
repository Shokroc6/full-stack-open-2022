import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSilce = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const blogId = action.payload;
      return state.filter((blog) => blog.id !== blogId);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const index = state.findIndex((blog) => blog.id === updatedBlog.id)
      if (index !== -1) {
        state[index] = updatedBlog
      }
    },
  },
})

export const { appendBlog, setBlogs, removeBlog, updateBlog} = blogSilce.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteOne(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((blog) => blog.id === id)
    if (blog) {
      const updatedBlog = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1
      })
      dispatch(updateBlog(updatedBlog))
    }
  }
}

export default blogSilce.reducer