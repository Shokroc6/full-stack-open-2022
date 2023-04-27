import { useState } from 'react'

const Blog = ({ blog, like, remove }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      {blog.title}
      <button onClick={() => setVisible(!visible)}>view</button>
      <button onClick={() => remove(blog)}>remove</button>

      {visible && (<div>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={() => like(blog)}>like</button>
        </p>
        <p>{blog.author}</p>
      </div>)}
    </div>
  )
}

export default Blog