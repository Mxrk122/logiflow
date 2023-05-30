import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './routes/Main'
import Login from './routes/Login'
import Register from './routes/Register'

const App = () => (
  <Routes>
    
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
)

export default App
