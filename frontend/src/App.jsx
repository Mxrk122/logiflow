import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './routes/Main'
import Login from './routes/Login'
import Register from './routes/Register'
import Landing from './routes/Landing'
import Profile from './routes/Profile'
import AddressConfig from './routes/AddressConfig'
import MyShippings from './routes/MyShippings'
import CreateBuilding from './routes/CreateBuilding'
import AddVehicle from './routes/addVehicle'
import VehicleOwns from './routes/vehicleOwnship'
import './scss/Styles.scss'

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="/landing/createbuilding" element={<CreateBuilding />} />
    <Route path="/landing/addVehicle" element={<AddVehicle />} />
    <Route path="/landing/vehicleOwns" element={<VehicleOwns />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/address-config" element={<AddressConfig />} />
    <Route path="/my-shippings" element={<MyShippings />} />
  </Routes>
)

export default App
