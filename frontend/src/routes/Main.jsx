import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Main = () => (
  <>
    <h1>Main</h1>
    <Link to="/login">
      <Button
        text="Hello"
      />
    </Link>
  </>
)

export default Main
