import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'
import '../scss/Profile.scss'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)

  const userId = (typeof user.userId === "object") ? user.userId.low : user.userId

  const [userDirection, setUserDirection] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const getUserDirection = async () => {
      console.log(typeof user.userId)
      const userDirectionResult = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/lives-in`)
      setUserDirection(userDirectionResult.data)
    }
    getUserDirection()
  }, [])

  const handleDelete = async () => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/users/delete/${userId}`)
    console.log(result)
    setUser(null)
    navigate("/")
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>{user.firstName + ' ' + user.lastName}</h1>
        <h3>{user.username} | {user.gender}</h3>
        <h3>{user.phone}</h3>
        {(userDirection) ? (
          <>
            <h4>Dirección: {userDirection.relationship.exactAddress}</h4>
            <h4>Código postal: {userDirection.location.zipcode}</h4>
          </>
        ) : (
          <Link to="/address-config">Configura tu dirección aquí</Link>
        )}
        <Link to="/my-shippings">Mira tus pedidos aquí</Link>
        <p> </p>
        <Button text="Eliminar mi perfil" onClick={handleDelete}/>
      </div>
    </div>
  )
}

export default Profile
