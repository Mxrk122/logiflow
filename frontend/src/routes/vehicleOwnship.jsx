import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const VehicleOwns = () => {
  const [brand, setBrand] = useState('');
  const [capacity, setCapacity] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [vehicleId, setVehicleId] = useState();
  const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate()

  const handleDeleteOwnship = async () => {
    if (vehicleId) {
      const data = {
        vehicleId: vehicleId
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/branches/landing/deleteVehicleOwnship`,
          data
        );
        console.log(response.data);
        // Hacer algo con la respuesta, si es necesario
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Faltan datos');
    }
  };

  const handleVehicleChange = (event) => {
    const selectedVehicleId = event.target.value;
    console.log(selectedVehicleId)
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.vehicleId.toString() === selectedVehicleId
    );
    console.log(selectedVehicle)

    if (selectedVehicle) {
      setBrand(selectedVehicle.brand);
      setCapacity(selectedVehicle.capacity);
      setModel(selectedVehicle.model);
      setType(selectedVehicle.type);
      setYear(selectedVehicle.year);
    } else {
      setBrand('');
      setCapacity('');
      setModel('');
      setType('');
      setYear('');
    }
  };


  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/branches/landing/vehicleOwns/getVehicles`
        );
        console.log(response.data)
        // Normalizar los valores de vehicleId
        const vehicles = response.data.map((vehicle) => {
          if (typeof vehicle.vehicleId === 'object') {
            // Si vehicleId es un objeto, obtener el valor low
            vehicle.vehicleId = vehicle.vehicleId.low;
          }
          return vehicle;
        });

        setVehicles(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBuildings();
  }, []);

  const handleReturn = () => {
    navigate('/landing');
    };

    return (
      <div className='register-container'>
        <h1>Delete Vehicle Relation</h1>
        <div className='form-group'>
          <select
            value={vehicleId}
            onChange={(event) => {
              setVehicleId(event.target.value);
              handleVehicleChange(event);
            }}
          >
            <option value=''>Seleccionar vehiculo</option>
            {vehicles.map((vehicle, index) => (
              <option key={index} value={vehicle.vehicleId.toString()}>
                {vehicle.vehicleId}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <div>
            <strong>Car brand:</strong> <span>{brand}</span>
          </div>
        </div>
        <div className='form-group'>
          <div>
            <strong>Car capacity:</strong> <span>{capacity}</span>
          </div>
        </div>
        <div className='form-group'>
          <div>
            <strong>Car model:</strong> <span>{model}</span>
          </div>
        </div>
        <div className='form-group'>
          <div>
            <strong>Car type:</strong> <span>{type}</span>
          </div>
        </div>
        <div className='form-group'>
          <div>
            <strong>Car year:</strong> <span>{year}</span>
          </div>
        </div>
        <div className='form-group'>
          <div className='button-group'>
            <Button text='Eliminar relacion' onClick={handleDeleteOwnship} />
            <Button text='Return' onClick={handleReturn} />
          </div>
        </div>
      </div>
    );
  
};

export default VehicleOwns;
