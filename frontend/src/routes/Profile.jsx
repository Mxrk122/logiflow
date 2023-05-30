import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const Profile = () => {
  const { user } = useContext(UserContext)

  const userId = user.userId.low

  const [userDirection, setUserDirection] = useState()

  useEffect(() => {
    const getUserDirection = async () => {
      const userDirectionResult = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/lives-in`)
      console.log(userDirectionResult.data)
      setUserDirection(userDirectionResult.data)
    }
    getUserDirection()
  }, [])

  return (
    <>
      <h1>Profile</h1>
      <h2>{user.firstName + ' ' + user.lastName}</h2>
      <h3>{user.gender}</h3>
      <h4>{user.phone}</h4>
      <h1>{userId}</h1>
      {(userDirection) ? (
        <>
          <h1>{userDirection.relationship.exactAddress}</h1>
          <h2>{userDirection.location.zipcode}</h2>
        </>
      ) : (
        <>
          <h1>Configura tu dirección</h1>
          <Link to="/address-configuration">Aquí</Link>
        </>
      )}
    </>
  )
}

export default Profile
