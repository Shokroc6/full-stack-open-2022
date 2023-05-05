import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer' 
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const queryClient =  useQueryClient() 
  const like = (id) => {
    dispatch(likeBlog(id))
  }

  const remove = (blogToRemove) => {
    if (window.confirm(`Delete ${blogToRemove.title} ?`)) {
      dispatch(deleteBlog(blogToRemove.id))
    }
  }

  const newCommentMutation = useMutation(
    (comment) => axios.post(`/api/blogs/${blog.id}/comments`, {comment}).then(res => {console.log(res); return res.data}), 
    { onSuccess: (newComment) => {
      const comments = queryClient.getQueryData('comments')
      console.log(newComment);
      queryClient.setQueryData('comments', comments.concat(newComment))
    }
  })

  const addComment = async (event) => {
    event.preventDefault()
    const comment = newComment
    setNewComment('')
    console.log(comment)
    newCommentMutation.mutate(comment)
  }


  const result = useQuery('comments', () => axios.get(`/api/blogs/${blog.id}/comments`).then(res => res.data))
  console.log(result)

  const comments = result.data

  const [newComment, setNewComment] = useState('')
  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  }

  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>      
      <p>likes {blog.likes}
        <button 
          id='like' 
          onClick={() => like(blog.id)}>
            like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      <h4>comments</h4>
      <input
        name="comment"
        value={newComment}
        onChange={handleInputChange}
      />
      <button onClick={addComment}>add comment</button>
      <ul>
      {comments && comments.map(comment =>
        <li key={comment}>
          {comment}
        </li>
      )}
      </ul>
    </div>
  )
}

export default Blog