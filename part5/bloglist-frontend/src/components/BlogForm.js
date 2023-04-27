import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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