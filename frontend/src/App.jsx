import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './routes/Main'
import Login from './routes/Login'
import Register from './routes/Register'
import MainPage from './routes/MainPage'
import CreateBuilding from  './routes/CreateBuilding'

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/mainpage" element={<MainPage />} />
    <Route path="/mainpage/addbuilding" element={<CreateBuilding />} />
  </Routes>
)

export default App
