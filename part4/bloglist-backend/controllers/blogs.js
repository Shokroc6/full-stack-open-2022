const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const saveBlog = await blog.save()
  response.status(201).json(saveBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = request.body

  const updateBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogToUpdate,
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updateBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})



module.exports = blogsRouter