import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import '../scss/Main.scss'

const Main = () => (
  <div className="bg">
    <div className="main-container">
      <h1>LogiFlow</h1>
      <div className="button-group">
        <Link to="/login">
          <Button text="LOGIN" />
        </Link>
        <Link to="/register">
          <Button text="REGISTER" />
        </Link>
      </div>
    </div>
  </div>
)

export default Main
