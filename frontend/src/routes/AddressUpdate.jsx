import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const AddressUpdate = () => {
  const { user } = useContext(UserContext)

  const userId = (typeof user.userId === "object") ? user.userId.low : user.userId

  const [newAddress, setNewAddress] = useState()

  const navigate = useNavigate()

  const handleAddressUpdate = async () => {
    if (newAddress) {
      const address = newAddress
      const since = new Date().getFullYear()
      const data = { address, since }
      const result = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}/lives-in`, data)
      if (result.data) {
        alert('Tus datos se han actualizado.')
        navigate('/profile')
      } else {
        alert('Ha ocurrido un error actualizando tus datos.')
      }
    }
  }

  return (
    <>
      <h1>Update Your Account</h1>
      <form>
        <input
          placeholder="Ingresa tu nueva dirección"
          onChange={(event) => setNewAddress(event.target.value)}
        />
      </form>
      <button onClick={handleAddressUpdate}>Send</button>
      <Link to="/profile">Back</Link>
    </>
  )
}

export default AddressUpdate
