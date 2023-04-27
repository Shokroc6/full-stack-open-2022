import { useState } from 'react'

const Blog = ({ blog, like, remove }) => {
  const [visible, setVisible] = useState(false)

  return (
    <li className='blog'>
      {blog.title} {blog.author}
      <button id='view' onClick={() => setVisible(!visible)}>view</button>
      <button id='remove' onClick={() => remove(blog)}>remove</button>

      {visible && (<div className='detail'>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button id='like' onClick={() => like(blog)}>like</button>
        </p>
        <p></p>
      </div>)}
    </li>
  )
}

export default Blog