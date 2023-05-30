import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const Landing = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <h1>Landing</h1>
      <Link to="/profile">Profile Here</Link>
    </>
  )
}

export default Landing
