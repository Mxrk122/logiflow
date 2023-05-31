import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const AccountUpdate = () => {
  const { user, setUser } = useContext(UserContext)

  const userId = (typeof user.userId === "object") ? user.userId.low : user.userId

  const [newUsername, setNewUsername] = useState()
  const [newPhone, setNewPhone] = useState()

  const navigate = useNavigate()

  const handleAccountUpdate = async () => {
    const username = newUsername || user.username
    const phone = newPhone || user.phone
    const data = { username, phone }
    const result = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, data)
    if (result.data) {
      setUser({ ...user, username, phone })
      alert('Tus datos se han actualizado.')
      navigate('/profile')
    } else {
      alert('Ha ocurrido un error actualizando tus datos.')
    }
  }

  return (
    <>
      <h1>Update Your Account</h1>
      <form>
        <input
          placeholder="Ingresa tu nuevo nombre de usuario"
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <input
          placeholder="Ingresa tu nuevo teléfono"
          onChange={(event) => setNewPhone(event.target.value)}
        />
      </form>
      <button onClick={handleAccountUpdate}>Send</button>
      <Link to="/profile">Back</Link>
    </>
  )
}

export default AccountUpdate
