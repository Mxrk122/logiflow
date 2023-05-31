import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './routes/Main'
import Login from './routes/Login'
import Register from './routes/Register'
import Landing from './routes/Landing'
import Profile from './routes/Profile'
import Order from './routes/Order'
import AccountUpdate from './routes/AccountUpdate'
import AddressUpdate from './routes/AddressUpdate'
import AddressConfig from './routes/AddressConfig'
import MyShippings from './routes/MyShippings'
import CreateBuilding from './routes/CreateBuilding'
import AddVehicle from './routes/addVehicle'
import VehicleOwns from './routes/vehicleOwnship'
import DeleteOrderPriority from './routes/DeleteOrderPriority'
import './scss/Styles.scss'

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="/landing/addVehicle" element={<AddVehicle />} />
    <Route path="/landing/vehicleOwns" element={<VehicleOwns />} />
    <Route path="/landing/dop" element={<DeleteOrderPriority />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/order" element={<Order />} />
    <Route path="/account-update" element={<AccountUpdate />} />
    <Route path="/address-update" element={<AddressUpdate />} />
    <Route path="/address-config" element={<AddressConfig />} />
    <Route path="/my-shippings" element={<MyShippings />} />
    <Route path="/landing/createbuilding" element={<CreateBuilding />} />
  </Routes>
)

export default App
