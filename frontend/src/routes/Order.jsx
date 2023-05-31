import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const Order = () => {
  const { user } = useContext(UserContext)

  const userId = (typeof user.userId === "object") ? user.userId.low : user.userId

  const [amount, setAmount] = useState()
  const [products, setProducts] = useState()
  const [priority, setPriority] = useState()
  const [isFragile, setIsFragile] = useState(false)
  const [price, setPrice] = useState()
  const [receivedBy, setReceivedBy] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    if (amount && priority) {
      console.log('priority', typeof priority)
      setPrice(amount * 1.12 * (1 + (priority / 50)))
      console.log(typeof price)
    }
  }, [amount, priority])

  const handleOrderSubmit = async () => {
    if (amount && products && priority && receivedBy) {
      const data = { userId, amount, products, priority, isFragile, receivedBy }
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create`, data)
      if (result.data) {
        alert('Tu pedido ha ingresado con éxito.')
        navigate('/landing')
      } else {
        alert('Ha ocurrido un error creando tu pedido.')
      }
    }
  }

  return (
    <>
      <h1>Order</h1>
      <form>
        <input
          type="number"
          placeholder="Ingrese el costo de su compra"
          onChange={(event) => setAmount(event.target.value)}
        />
        <input
          placeholder="Ingrese los productos de su compra separados por una coma"
          onChange={(event) => setProducts(event.target.value)}
        />
        <input
          placeholder="Ingrese el nombre del receptor del envío"
          onChange={(event) => setReceivedBy(event.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p>Urgencia del pedido</p>
          <input
            type="range"
            min="1"
            max="5"
            style={{ width: '200px' }}
            onChange={(event) => setPriority(parseInt(event.target.value))}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p>¿Frágil?</p>
          <input
            type="checkbox"
            value={isFragile}
            style={{ width: '20px', height: '20px' }}
            onChange={(event) => setIsFragile(event.target.value)}
          />
        </div>
      </form>
      <h3>Total del pedido: {price && `Q.${Math.round(price) - 1}.99`}</h3>
      <button onClick={handleOrderSubmit}>Ordenar</button>
      <Link to="/landing">Go Back</Link>
    </>
  )
}

export default Order
