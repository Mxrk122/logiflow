import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import { UserContext } from '../providers/UserProvider'
import '../css/Register.css'; 

const Register = () => {
    
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
    console.log(user);

    return (
        <div className='mainpage-container'>
            {user.admin ? <button onClick={event => navigate("/mainpage/addbuilding")}>Add building</button> : null}      
        </div>
    )
}

export default Register
