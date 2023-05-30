import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const MyShippings = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <h1>MyShippings</h1>
      <Link to="/profile">Regresar</Link>
    </>
  )
}

export default MyShippings
