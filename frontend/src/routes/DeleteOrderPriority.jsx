import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const VehicleOwns = () => {
  const [date, setdate] = useState('');
  const [paymentStatus, setpaymentStatus] = useState('');
  const [products, setproducts] = useState([]);
  const [totalAmount, settotalAmount] = useState('');
  const [orderId, setorderId] = useState();
  const [orders, setorders] = useState([]);

  const navigate = useNavigate()

  const handleDeleteOwnship = async () => {
    if (orderId) {
      const data = {
        nodeId: orderId
      };

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/orders/dd`,
          data
        );
        console.log(response.data);
        window.location.reload()
        // Hacer algo con la respuesta, si es necesario
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Faltan datos');
    }
  };

  const handleVehicleChange = (event) => {
    const selectedorderId = event.target.value;
    console.log(selectedorderId)
    const selectedVehicle = orders.find(
      (vehicle) => vehicle.orderId.toString() === selectedorderId
    );
    console.log(selectedVehicle)

    if (selectedVehicle) {
      setdate(selectedVehicle.date);
      setpaymentStatus(toString(selectedVehicle.paymentStatus));
      setproducts(selectedVehicle.products);
      settotalAmount(selectedVehicle.totalAmount);
    } else {
      setdate('');
      setpaymentStatus('');
      setproducts('');
      settotalAmount('');
    }
  };


  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/`
        );
        console.log(response.data)
        // Normalizar los valores de orderId
        const orders = response.data.map((order) => {
          if (typeof order.orderId === 'object') {
            // Si orderId es un objeto, obtener el valor low
            order.orderId = order.orderId.low;
          } if (typeof order.totalAmount === 'object') {
            // Si orderId es un objeto, obtener el valor low
            order.totalAmount = order.totalAmount.low;
          }
          
          if (typeof order?.date === 'object') {
            // Si orderId es un objeto, obtener el valor low
            order.date.day = order.date.day.low;
            order.date.year = order.date.year.low;
            order.date.month = order.date.month.low;
          } else{
            const hasDateProperty = 'date' in order;
            
            if(hasDateProperty) {
                const date = order.date.split(' ')
                order.date = date
                order.date.day = order.date[2]
                order.date.month = order.date[1]
                order.date.year = order.date[3]
            }
            
          }

          return order;
        });

        setorders(orders);
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
        <h1>Delete Order Date</h1>
        <div className='form-group'>
          <select
            value={orderId}
            onChange={(event) => {
              setorderId(event.target.value);
              handleVehicleChange(event);
            }}
          >
            <option value=''>Seleccionar una orden</option>
            {orders.map((vehicle, index) => (
              <option key={index} value={vehicle.orderId.toString()}>
                {vehicle.orderId}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <div>
            <strong>Order date:</strong> <span>{date?.year}</span> <span>{date?.month}</span> <span>{date?.day}</span>
          </div>
        </div>
        <div className='form-group'>
        </div>
        <div className='form-group'>
          <div>
            <strong>Order paymentStatus:</strong> <span>{paymentStatus}</span>
          </div>
        </div>
        <div className='form-group'>
          <div>
            <strong>Order products:</strong> <span>{products.map( product => product )}</span>
          </div>
        </div>
        <div className='form-group'>
          <div>
            <strong>Order totalAmount:</strong> <span>{totalAmount}</span>
          </div>
        </div>
        <div className='form-group'>
          <div className='button-group'>
            <Button text='Eliminar fecha' onClick={handleDeleteOwnship} />
            <Button text='Return' onClick={handleReturn} />
          </div>
        </div>
      </div>
    );
  
};

export default VehicleOwns;
