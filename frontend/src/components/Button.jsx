import React from 'react'
import '../styles/button.sass'

const Button = ({ onClick, type, text }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: type,
    }}
  >
    {text}
  </button>
)

export default Button
