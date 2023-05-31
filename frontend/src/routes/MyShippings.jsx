import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../providers/UserProvider';
import '../scss/MyShipping.scss';

const MyShippings = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId.low;
  const [userShipping, setUserShipping] = useState([]);

  useEffect(() => {
    const getUserDirection = async () => {
      const userShippingResult = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/my-shippings`
      );
      console.log('userShippingResult.data:', userShippingResult.data);
      setUserShipping(userShippingResult.data);
    };
    getUserDirection();
  }, []);

  return (
    <>
      <h1>My Shippings</h1>
      {userShipping.length > 0 ? (
        <table className="shipping-table">
          <thead>
            <tr>
              <th>Shipping ID</th>
              <th>Estado</th>
              <th>Products</th>
              {/* <th>Order Date</th>
              <th>Total Price</th> */}
              <th>Vehicle Brand</th>
              <th>Vehicle Model</th>
              <th>Local Name</th>
            </tr>
          </thead>
          <tbody>
            {userShipping.map((shipping, index) => (
              <tr key={index}>
                <td>{shipping.shipping.shippingId.low}</td>
                <td>{shipping.shipping.status ? 'Delivered' : 'Undelivered'}</td>
                <td>{shipping.shipping.products.join(', ')}</td>
                {/* <td>
                  {shipping.orders.date.year.low}-{shipping.orders.date.month.low}-
                  {shipping.orders.date.day.low}
                </td>
                <td>{shipping.orders.totalAmount}</td> */}
                <td>{shipping.assetVehicle.brand}</td>
                <td>{shipping.assetVehicle.model}</td>
                <td>{shipping.branchBuilding.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No shippings found.</p>
      )}
      <Link to="/profile">Regresar</Link>
    </>
  );
};

export default MyShippings;
