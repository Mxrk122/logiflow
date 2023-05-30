import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './routes/Main'
import Login from './routes/Login'
import Register from './routes/Register'
<<<<<<< HEAD
import MainPage from './routes/MainPage'
import CreateBuilding from  './routes/CreateBuilding'
=======
import Landing from './routes/Landing'
import Profile from './routes/Profile'
import MyShippings from './routes/MyShippings'
>>>>>>> 22b38fdb6fa571d8bfcbfcda352567d45ee36ab7

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
<<<<<<< HEAD
    <Route path="/mainpage" element={<MainPage />} />
    <Route path="/mainpage/addbuilding" element={<CreateBuilding />} />
=======
    <Route path="/landing" element={<Landing />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/my-shippings" element={<MyShippings />} />
>>>>>>> 22b38fdb6fa571d8bfcbfcda352567d45ee36ab7
  </Routes>
)

export default App
