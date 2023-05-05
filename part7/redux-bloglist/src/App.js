import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import User from './components/User'
import { initializeBlogs} from './reducers/blogReducer' 
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, setUser } from './reducers/userReducer'
import {
  Routes, Route, Link, Navigate, useMatch
} from 'react-router-dom'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import {initializeUsers } from './reducers/usersReducer'
import { Button } from 'react-bootstrap'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({blogs}) => 
    [...blogs].sort((a, b) => b.likes - a.likes)
  )
  const user = useSelector(({user}) => user)
  const users = useSelector(({users}) => users)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('hasLocalStorage')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const padding = {
    padding: 5
  }

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useMatch('/users/:id')  
  const userOne = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null


  return (
    <div className="container">
      <div>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>

        {!user && <Link style={padding} to="/login"> log in </Link>}
        {user && 
          <em>{user.name} logged-in 
            <Button onClick={() => {
              window.localStorage.clear()
              dispatch(deleteUser())
            }}>logout</Button> </em>
        }
      </div>

      <h1>blog app</h1>

      <Notification />

      {user && <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>}

      <Routes>
        <Route path="/" element={<BlogList/>}/>
        <Route path="/blogs" element={<BlogList/>}/>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={user ? <UserList /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={<User user={userOne} />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </div>
  )
}

export default App