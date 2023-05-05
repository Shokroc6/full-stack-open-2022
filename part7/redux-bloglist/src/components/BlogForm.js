import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { autoNotification} from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer' 

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    dispatch(createBlog(newBlog))
    blogFormRef.current.toggleVisibility()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    dispatch(autoNotification(`you added '${newBlog.title}'`, 5000))
  }

  return (
    <form onSubmit={ addBlog }>
      <div>
        title:
        <input
          id='title-input'
          value={newTitle}
          onChange={
            (event) => {setNewTitle(event.target.value)}
          }
        />
      </div>
      <div>
        author:
        <input
          id='author-input'
          value={newAuthor}
          onChange={
            (event) => {setNewAuthor(event.target.value)}
          }
        />
      </div>
      <div>
        url:
        <input
          id='url-input'
          value={newUrl}
          onChange={
            (event) => {setNewUrl(event.target.value)}
          }
        />
      </div>

      <button type="submit">save</button>
    </form>
  )
}
export default BlogForm