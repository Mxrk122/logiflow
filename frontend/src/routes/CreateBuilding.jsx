import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import { UserContext } from '../providers/UserProvider'
import '../css/Register.css'; 

const Register = () => {
    const [name, setname] = useState()
    const [ownsBuilding, setownsBuilding] = useState(false)
    const [type, settype] = useState()

    const handleCheckboxChange = (event) => {
        setownsBuilding(event.target.checked);
      };

    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const handleRegister = async () => {
        let data = {}
        if (
            name &&
            ownsBuilding &&
            type
        ) {
            console.log("name: "+ name)
            console.log("ownsBuilding: " + ownsBuilding)
            console.log("type: "+ type)
            data = {
                name: name,
                ownsBuilding: ownsBuilding,
                type: type,
            };
        } else {
            console.log("error faltan datos")
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/buildings/create`, data)
        if (response.data) {
            console.log(response.data)
            navigate('/mainpage')
        } else {
            alert('User not found.')
        }
    }

    return (
        <div className='register-containter'>
            <h1>Create a building</h1>
            <div className='form-group'>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                /> 
            </div>
            <div className='form-group'>
                <p>own: 
                <label>
                    <input
                    type="checkbox"
                    checked={ownsBuilding}
                    onChange={handleCheckboxChange}
                    />
                </label>
                </p>
            </div>
            <div className='form-group'>
                <input
                    type="type"
                    placeholder="type"
                    onChange={(event) => settype(event.target.value)}
                />
            </div>
            <div className='form-group'>
                <Button
                    text="Send"
                    onClick={handleRegister}
                />
            </div>
            
        </div>
    )
}

export default Register
