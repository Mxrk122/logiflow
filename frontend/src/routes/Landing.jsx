import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'
import Button from '../components/Button'

const Landing = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='bg'>
      <div className='main-container'>
        <h1>Landing</h1>
        <Link to="/profile">Profile Here</Link>
        <Link to="/order">Make an Order here</Link>
        {user.admin ? <Link to="/landing/createbuilding">create building</Link> : null}
        {user.admin ? <Link to="/landing/addVehicle">add vehicle</Link> : null}
        {user.admin ? <Link to="/landing/vehicleOwns">Delete Vehicle</Link> : null}
        {user.admin ? <Link to="/landing/deletePropertie">Delete a relation property</Link> : null}
        {user.admin ? <Link to="/landing/dop">Delete order date</Link> : null}
      </div>
    </div>
  )
}

export default Landing
