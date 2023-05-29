import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const handleLogin = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${username}/${password}`)
    console.log(response.data)
    if (response.data) {
      navigate('/')
    }
  }

  return (
    <>
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
      <Button
        text="Send"
        onClick={handleLogin}
      />
    </>
  )
}

export default Login
