import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './routes/Main'
import Login from './routes/Login'
import Register from './routes/Register'
import Landing from './routes/Landing'
import Profile from './routes/Profile'
import MyShippings from './routes/MyShippings'
import CreateBuilding from './routes/CreateBuilding'

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="/landing/createbuilding" element={<CreateBuilding />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/my-shippings" element={<MyShippings />} />
  </Routes>
)

export default App
