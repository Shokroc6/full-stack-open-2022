import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BlogList = () => {
  const blogs = useSelector(({blogs}) => 
    [...blogs].sort((a, b) => b.likes - a.likes)
  )
  return (
  <div>
    <h2>Blogs</h2>
    <ul>
      {blogs.map(blog => 
        <li key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </li>
      )}
    </ul>
  </div>
)}
export default BlogList