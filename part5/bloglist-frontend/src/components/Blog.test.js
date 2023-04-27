import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'qwq',
    url: 'http://1.www',
    likes: 7
  }

  beforeEach(() => {
  })

  test('renders blog', () => {
    render(<Blog blog={blog} />)
    const element = screen.findByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
  })

  test('display title and author', () => {
    render(<Blog blog={blog} />)
    const title = screen.queryByText('Component testing is done with react-testing-library')
    expect(title).toBeDefined()
    const author = screen.queryByText('qwq')
    expect(author).toBeDefined()
  })

  test('default not display url and likes', () => {
    const { container } = render(<Blog blog={blog} />)
    const detail = container.querySelector('.detail')
    expect(detail).toBeNull()
  })

  test('clicking the button display likes and url', async () => {
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likes = screen.queryByText('7')
    expect(likes).toBeDefined()
    const url = screen.queryByText('http://1.www')
    expect(url).toBeDefined()
  })

  test('clicking twice the like button calls event handler twice', async () => {
    const mockHandler = jest.fn()
    render(
      <Blog blog={blog} like={mockHandler} />
    )
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})