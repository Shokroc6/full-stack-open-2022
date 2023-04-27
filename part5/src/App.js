import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const allblogs = await blogService.getAll()
      setBlogs( allblogs.sort((a, b) => b.likes - a.likes) )
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const creatBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
    setErrorMessage('blog added!')
  }

  const  like = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes+1 })
    const blogIndex = blogs.findIndex(b => b.id === blog.id)
    if (blogIndex !== -1) {
      const updatedBlogs = [...blogs]
      updatedBlogs[blogIndex] = updatedBlog
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    }
  }

  const remove = async (blogToRemove) => {
    if (window.confirm(`Delete ${blogToRemove.title} ?`)) {
      await blogService.deleteBlog(blogToRemove.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    }
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>
      }
      {user && <div>
        <p>{user.name} logged-in
          <button onClick={() => {
            window.localStorage.clear()
            setUser(null)
          }}>
              logout
          </button>
        </p>
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm creatBlog={creatBlog} />
        </Togglable>
      </div>
      }

      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Blog  blog={blog} like={like} remove={remove}/>
          </li>

        )}

      </ul>
    </div>
  )
}

export default App