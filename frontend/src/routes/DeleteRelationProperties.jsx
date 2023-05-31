import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DeleteRelationProps = () => {
  const [orderId, setOrderId] = useState();
  const [property, setProperty] = useState();
  const [orders, setOrders] = useState([]);
  const [selectedRelationProps, setSelectedRelationProps] = useState({});

  const navigate = useNavigate();

  const handleDeleteRelationProps = async () => {
    console.log('orderId: ' + typeof(orderId));
    console.log('property: ' + typeof(property));
    if (orderId && property) { // Verificar si orderId y property están definidos
      const data = {
        orderId: orderId,
        property: property
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/branches/landing/deleteOrderBuildingRelationProperty`,
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

  const handleOrderChange = (event) => {
    const selectedOrderId = event.target.value;
    console.log(selectedOrderId);
    const selectedOrder = orders.find(
      (order) => order.orderId.toString() === selectedOrderId
    );
    console.log(selectedOrder);

    if (selectedOrder) {
      setSelectedRelationProps(selectedOrder.relationProperties);
      setProperty(""); // Reiniciar el valor de la propiedad seleccionada cuando se cambia de orden
    } else {
      setSelectedRelationProps({});
      setProperty(""); // Reiniciar el valor de la propiedad seleccionada cuando no hay orden seleccionada
    }
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/branches/orders/ordersWithBuildings`
        );
        // Normalizar los valores de vehicleId
        const orders = response.data.map((order) => {
          if (typeof order.orderId === 'object') {
            // Si orderID es un objeto, obtener el valor low
            order.orderId = order.orderId.low;
          }
          if (typeof order.relationProperties.orderPriority === 'object') {
            // Si orderPriority es un objeto, obtener el valor low
            order.relationProperties.orderPriority = order.relationProperties.orderPriority.low;
          }

          return order;
        });
        console.log(orders);
        setOrders(orders);
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
      <h1>Delete Order to Branch Relation Properties</h1>
      <div className='form-group'>
        <select
          value={orderId}
          onChange={(event) => {
            setOrderId(event.target.value);
            handleOrderChange(event);
          }}
        >
          <option value=''>Seleccionar Id de la orden</option>
          {orders .sort((a, b) => a.orderId - b.orderId).map((order, index) => (
            <option key={index} value={order.orderId}>
              {order.orderId}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <select
          value={property}
          onChange={(event) => {
            setProperty(event.target.value);
          }}
        >
          <option value=''>Seleccionar propiedad</option> {/* Agregar una opción para seleccionar una propiedad */}
          {Object.entries(selectedRelationProps).map(([key, value]) => (
            <option key={key} value={key}> {/* Guardar el nombre de la propiedad en lugar del valor */}
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <div className='button-group'>
          <Button text='Eliminar relacion' onClick={handleDeleteRelationProps} />
          <Button text='Return' onClick={handleReturn} />
        </div>
      </div>
    </div>
  );
};

export default DeleteRelationProps;
