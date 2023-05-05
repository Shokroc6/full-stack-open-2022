import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login} from '../reducers/userReducer'
import { autoNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userObject = { username, password }
    setUsername('')
    setPassword('')
    try {
      const user = await dispatch(login(userObject))
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      navigate('/')
    } catch (exception) {
      dispatch(autoNotification('Wrong credentials',5000))
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={
              (event) => {setUsername(event.target.value)}
            }
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={
              (event) => {setPassword(event.target.value)}
            }
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm