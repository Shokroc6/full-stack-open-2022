import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#title-input')
  await user.type(title, 'qwq' )
  const author = container.querySelector('#author-input')
  await user.type(author, 'me' )
  const url = container.querySelector('#url-input')
  await user.type(url, 'http://qwq' )

  const sendButton = screen.getByText('save')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('qwq' )
})