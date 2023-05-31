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
        <div className='button-group'>
          <Link to="/profile"><Button text='Profile Here' /></Link>
          <Link to="/order"><Button text='Make an Order here' /></Link>
          {user.admin ? <Link to="/landing/createbuilding"><Button text='create building' /></Link> : null}
          {user.admin ? <Link to="/landing/addVehicle"><Button text='add vehicle' /></Link> : null}
          {user.admin ? <Link to="/landing/vehicleOwns"><Button text='Delete Vehicle' /></Link> : null}
          {user.admin ? <Link to="/landing/dop"><Button text='Delete order priority' /></Link> : null}
        </div>
      </div>
    </div>
  )
}

export default Landing
