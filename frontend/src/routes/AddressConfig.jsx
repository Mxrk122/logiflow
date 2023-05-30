import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const AddressConfig = () => {
  const { user } = useContext(UserContext)

  const [locations, setLocations] = useState()
  const [address, setAddress] = useState()
  const [since, setSince] = useState()
  const [location, setLocation] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const getLocations = async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/locations`)
      console.log(result.data)
      setLocations(result.data)
    }
    getLocations()
  }, [])

  useEffect(() => {
    console.log(user, location, address, since)
  }, [location])

  const handleAddressConfig = async () => {
    if (address && since && location) {
      const data = { userId: user.userId, address, since, location }
      console.log(data)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/config-address`, data)
      if (response.data) {
        navigate('/profile')
      }
    } else {
      alert('Faltan datos necesarios para configurar tu dirección.')
    }
  }

  return (
    <>
      <h1>Configura tu dirección</h1>
      <Link to="/profile">Regresar</Link>
      <form>
        <input
          placeholder="Ingresa tu dirección exacta"
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          placeholder="¿Desde cuándo vives aquí?"
          onChange={(event) => setSince(event.target.value)}
        />
        <p>Selecciona tu localización más cercana: 
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            <>
              {locations && locations.map((currLocation, index) => (
                <option key={index} value={currLocation.address}>{currLocation.address}</option>
              ))}
            </>
          </select>
        </p>
      </form>
      <button onClick={handleAddressConfig}>Send</button>
    </>
  )
}

export default AddressConfig
