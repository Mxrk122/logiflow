import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Main = () => (
  <>
    <h1>Main</h1>
    <view>
      <Link to="/login">
        <Button
          text="LOGIN"
        />
      </Link>
    </view>
    <view>
      <Link to ="/register">
        <Button 
          text="REGISTER"
        />
      </Link>
    </view>
    
  </>
)

export default Main
