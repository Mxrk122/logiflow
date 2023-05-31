import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const Landing = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='bg'>
      <div className='main-container'>
        <h1>Landing</h1>
        <Link to="/profile">Profile Here</Link>
        {user.admin ? <Link to="/landing/createbuilding">create building</Link> : null}
        {user.admin ? <Link to="/landing/addVehicle">add vehicle</Link> : null}
        {user.admin ? <Link to="/landing/vehicleOwns">Delete Vehicle</Link> : null}
      </div>
    </div>
  )
}

export default Landing
