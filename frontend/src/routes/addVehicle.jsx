import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AddVehicle = () => {
  const [brand, setBrand] = useState('');
  const [capacity, setCapacity] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [buildings, setBuildings] = useState([]);

  const navigate = useNavigate()

  const handleAddVehicle = async () => {
    if (brand && capacity && model && type && year && buildingName) {
      const data = {
        brand: brand,
        capacity: capacity,
        model: model,
        type: type,
        year: year,
        buildingName: buildingName
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/branches/addVehicle`,
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

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/branches/`
        );
        console.log(response.data);
        setBuildings(response.data);
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
    <div className='register-containter'>
      <h1>Add Vehicle</h1>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Car brand'
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Car capacity'
          value={capacity}
          onChange={(event) => setCapacity(event.target.value)}
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Car model'
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Car type'
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Car year'
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
      </div>
      <div className='form-group'>
        <p>Escoge el Branch al que pertenece el vehículo:</p>
        <select
          value={buildingName}
          onChange={(event) => setBuildingName(event.target.value)}
        >
          <option value=''>Seleccionar edificio</option>
          {buildings.map((building, index) => (
            <option key={index} value={building.name}>
              {building.name}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <div className='button-group'>
            <Button text='Ingresar vehiculo' onClick={handleAddVehicle} />
            <Button text="Return" onClick={handleReturn}/>
        </div>
        
      </div>
    </div>
  );
};

export default AddVehicle;
