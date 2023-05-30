import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import { UserContext } from '../providers/UserProvider'
import "../scss/Login.scss"
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleLogin = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${username}/${password}`)
    if (response.data) {
      console.log(response.data)
      setUser(response.data)
      navigate('/')
    } else {
      alert('User not found.')
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => setUsername(event.target.value)}
      /> 
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className='form-group'>
        <div className="button-group">
          <Button
            text="Ingresar"
            onClick={handleLogin}
          />
          <Link to="/register">
            <Button
                text="Register"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
